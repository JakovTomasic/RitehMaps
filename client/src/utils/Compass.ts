import { useCallback, useEffect, useRef, useState } from "react";
import { radiansToDegrees } from "./Math";
import { fixAngleBetweenZeroAnd360, shortestAngleDifference } from "./Geometry";

/**
 * The device compass, as far as a browser can reach it.
 *
 * Turning a sensor reading into a heading is the same everywhere, but getting one at all is not:
 *  - ios (safari, and every other browser there, since they all run webkit) has only the
 *    `deviceorientation` event, never fires `deviceorientationabsolute`, needs
 *    `DeviceOrientationEvent.requestPermission()` called from inside a tap handler, and reports
 *    the heading in its own `webkitCompassHeading` property. Its `alpha` is measured from
 *    wherever the device happened to point when the page loaded, so it is worthless for a compass.
 *  - android fires `deviceorientationabsolute` with `alpha` measured from north, and also has
 *    `AbsoluteOrientationSensor`. Firefox instead fires a plain `deviceorientation` marked
 *    `absolute`.
 *  - brave keeps the sensors behind its fingerprinting shield, and a blocked sensor there doesn't
 *    fail, it simply never says anything.
 *  - a desktop has all the constructors and no magnetometer, so nothing ever fires. There is no
 *    flag to ask, the only way to tell it apart from a phone is to listen for a while and see
 *    whether a heading shows up - which is why {@link CompassAvailability.Unknown} exists.
 *
 * So both sources are started at once and nothing a browser claims is taken as final: asking for
 * a permission is best effort, and what settles it is a heading arriving, or failing to. When
 * none does, whatever the sensors said on their way out picks the message - that is the only way
 * a user can be told the difference between a device that has no compass and a browser that is
 * sitting on one.
 */
export enum CompassAvailability {
    /** Still listening for a first heading - we don't know yet whether this device has a compass. */
    Unknown = "unknown",
    /** A heading arrived, or the browser will send one as soon as the user allows it. */
    Available = "available",
    /** No sensor, no https, or nothing arrived for long enough to give up on it. */
    Unavailable = "unavailable",
}

export type Compass = {
    availability: CompassAvailability,
    /** True while the user has compass mode turned on. */
    enabled: boolean,
    /**
     * Degrees, clockwise from north, that the top of the screen points at. Null while compass
     * mode is off or before the first reading arrives.
     */
    heading: number | null,
    /** True while the device is held too steep for its heading to mean anything. */
    tilted: boolean,
    /** Why turning the compass on didn't work, ready to be shown to the user. */
    error: string | null,
    /** Turns compass mode on (asking for the permission first, where there is one) or off. */
    toggle: () => void,
}

/** How long a device gets to send its first heading before we decide it has no compass. */
const PROBE_TIMEOUT_MS = 2500;
/** The same, but after the user asked for the compass - a just permitted sensor can be slow. */
const FIRST_READING_TIMEOUT_MS = 5000;
/** The same again, after a browser that refused access - it is only getting a chance to surprise us. */
const REFUSED_READING_TIMEOUT_MS = 1500;
/** How long an error stays on screen. */
const ERROR_TIMEOUT_MS = 8000;
/** Readings per second asked of the orientation sensor - the map is smoothed onto frames anyway. */
const SENSOR_FREQUENCY_HZ = 30;

/**
 * Weight of the newest reading in the smoothed heading, the rest being the previous one.
 * A raw magnetometer heading jitters by a couple of degrees even on a device lying still, and
 * every one of those degrees would shake the whole map.
 */
const SMOOTHING = 0.25;
/** Once this close to the reading the smoothing stops and the heading snaps onto it. */
const SNAP_DEGREES = 0.3;
/** Smallest heading change worth a re-render. */
const EMIT_STEP_DEGREES = 0.4;
/** Tilt away from flat above which a heading is too unreliable to point the map with. */
const TILT_WARNING_DEGREES = 60;
/**
 * The warning only goes away once the device is back well below the threshold, so that holding
 * the phone right at the limit doesn't flash it on and off.
 */
const TILT_RECOVERY_DEGREES = 50;

/** What the sensors had to say for themselves when no heading came, worst last. */
enum CompassFailure {
    /** Nothing arrived and nothing said why. */
    Silent = "silent",
    /** There is no such sensor in this device. */
    Missing = "missing",
    /** The device reports which way it turns, but not where north is. */
    NoNorth = "noNorth",
    /** The browser, or the user, refuses to hand the sensors over. */
    Blocked = "blocked",
}

/** Least to most telling: a later one replaces an earlier one as the reason to report. */
const FAILURE_ORDER = [CompassFailure.Silent, CompassFailure.Missing, CompassFailure.NoNorth, CompassFailure.Blocked];

/**
 * "Motion sensors" is the browser wide setting behind all of this on chromium, and Brave ships it
 * turned off - which is why turning its Shields off for the site changes nothing, and why every
 * message that could mean "blocked" points at it.
 */
const SENSOR_SETTING_HINT = "in Brave: Settings, Site settings, Motion sensors";

const FAILURE_MESSAGES: Record<CompassFailure, string> = {
    [CompassFailure.Silent]:
        "No compass reading. This device may have no compass, or the browser is blocking motion "
        + `sensors (${SENSOR_SETTING_HINT}).`,
    [CompassFailure.Missing]:
        "This device has no compass sensor.",
    [CompassFailure.NoNorth]:
        "This browser reports which way the phone turns but not where north is, so compass mode can't work in it.",
    [CompassFailure.Blocked]:
        `The browser is blocking the motion sensors. Turn them on in its settings (${SENSOR_SETTING_HINT}) `
        + "and reload the page.",
};

const INSECURE_ERROR = "The compass only works over a secure (https) connection.";

/** Sensor error names that mean "you may not", as opposed to "there is none". */
const BLOCKED_ERROR_NAMES = ["NotAllowedError", "SecurityError", "PermissionDeniedError"];

/** A single sensor reading, as it came in. */
type Reading = {
    heading: number,
    /** How far from flat the device is held, in degrees. */
    tilt: number,
}

/** What the screen shows: a heading with the jitter taken out of it. */
type SmoothedReading = {
    heading: number,
    tilted: boolean,
}

/** Why no heading came, and the technical detail behind it, for the user to pass on to us. */
type Failure = {
    reason: CompassFailure,
    detail: string,
}

type HeadingSink = {
    onReading: (reading: Reading) => void,
    onFailure: (failure: Failure) => void,
}

/** Tracks the device heading, and whether there is a compass to track it with at all. */
export function useCompass(): Compass {

    const [availability, setAvailability] = useState<CompassAvailability>(initialAvailability);
    /** True while a permission dialog is up - nothing can be concluded until the user answers it. */
    const [askingPermission, setAskingPermission] = useState(false);
    /** True when the browser said no the last time it was asked. Only shortens the wait below. */
    const [permissionRefused, setPermissionRefused] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [reading, setReading] = useState<SmoothedReading | null>(null);
    const [error, setError] = useState<string | null>(null);

    // The smoothing runs between renders, on animation frames, so its state lives in refs.
    const latestReading = useRef<Reading | null>(null);
    const smoothedHeading = useRef<number | null>(null);
    const frame = useRef<number | null>(null);
    /** The most telling thing the sensors said since the last attempt, see FAILURE_ORDER. */
    const failure = useRef<Failure | null>(null);

    const hasReading = reading != null;
    /** True where the browser hands out headings only after being asked (ios, and the like). */
    const needsPermission = permissionRequest() != null;
    /** True while we are subscribed only to find out whether a heading ever arrives. */
    const probing = availability === CompassAvailability.Unknown;
    // Subscribing before a permission comes back is harmless - the readings simply start flowing
    // the moment it is granted, and never if it isn't.
    const listening = probing || enabled;

    const smooth = useCallback(() => {

        frame.current = null;
        const target = latestReading.current;
        if (target == null) {
            return;
        }

        const previous = smoothedHeading.current;
        const difference = previous == null ? 0 : shortestAngleDifference(previous, target.heading);
        const settled = previous == null || Math.abs(difference) <= SNAP_DEGREES;
        const heading = settled
            ? target.heading
            : fixAngleBetweenZeroAnd360(previous + difference * SMOOTHING);

        smoothedHeading.current = heading;

        setReading(shown => {
            const tilted = target.tilt > (shown?.tilted === true ? TILT_RECOVERY_DEGREES : TILT_WARNING_DEGREES);
            // Returning the very same object tells react there is nothing to re-render, which is
            // what keeps a sensor firing 60 times a second from redrawing the map 60 times a second.
            const unchanged = shown != null && shown.tilted === tilted
                && Math.abs(shortestAngleDifference(shown.heading, heading)) < EMIT_STEP_DEGREES;
            return unchanged ? shown : { heading: heading, tilted: tilted };
        });

        if (!settled) {
            frame.current = window.requestAnimationFrame(smooth);
        }
    }, []);

    const onReading = useCallback((next: Reading) => {
        latestReading.current = next;
        setAvailability(CompassAvailability.Available);
        if (frame.current == null) {
            frame.current = window.requestAnimationFrame(smooth);
        }
    }, [smooth]);

    const onFailure = useCallback((next: Failure) => {
        const known = failure.current;
        if (known == null || FAILURE_ORDER.indexOf(next.reason) > FAILURE_ORDER.indexOf(known.reason)) {
            failure.current = next;
        }
    }, []);

    // The sources are subscribed to by `listening` alone, and reach the callbacks through this -
    // re-subscribing on every render would drop readings for nothing.
    const sinkRef = useRef<HeadingSink>({ onReading, onFailure });
    sinkRef.current = { onReading, onFailure };

    useEffect(() => {
        if (!listening) {
            return;
        }
        const stopListening = startHeadingSources({
            onReading: next => sinkRef.current.onReading(next),
            onFailure: next => sinkRef.current.onFailure(next),
        });
        return () => {
            stopListening();
            if (frame.current != null) {
                window.cancelAnimationFrame(frame.current);
                frame.current = null;
            }
        };
    }, [listening]);

    // Nothing announces a missing (or withheld) compass, silence is the only symptom - so a
    // reading that never comes is what settles it, whatever the browser claimed before.
    useEffect(() => {
        if (!listening || hasReading || askingPermission) {
            return;
        }
        // A sensor that needs no permission is already running and answers within a frame or two;
        // one that was just granted can take its time starting up.
        const timeoutMs = permissionRefused ? REFUSED_READING_TIMEOUT_MS
            : (enabled && needsPermission) ? FIRST_READING_TIMEOUT_MS
            : PROBE_TIMEOUT_MS;

        const timeout = window.setTimeout(() => {
            setAvailability(CompassAvailability.Unavailable);
            setEnabled(false);
            // Probing happens on its own, without the user asking for anything, and an error
            // popping up out of nowhere would only confuse them.
            if (enabled) {
                setError(failureMessage(failure.current));
            }
        }, timeoutMs);

        return () => window.clearTimeout(timeout);
    }, [listening, hasReading, askingPermission, enabled, permissionRefused, needsPermission]);

    useEffect(() => {
        if (error == null) {
            return;
        }
        const timeout = window.setTimeout(() => setError(null), ERROR_TIMEOUT_MS);
        return () => window.clearTimeout(timeout);
    }, [error]);

    const toggle = useCallback(() => {

        setError(null);

        if (enabled) {
            setEnabled(false);
            return;
        }

        setPermissionRefused(false);
        const request = permissionRequest();

        if (request == null && availability === CompassAvailability.Unavailable) {
            // Nothing left to ask for and a probe that already came up empty: this one really has
            // no compass, so say it now instead of turning a dead mode on for a few seconds. The
            // second look is for the device that was merely slow, or in the background - if a
            // heading does turn up, the button quietly comes back to life.
            setError(failureMessage(failure.current));
            failure.current = null;
            setAvailability(CompassAvailability.Unknown);
            return;
        }

        // Otherwise every attempt runs the same course, whatever we think we learned last time:
        // ask, if there is anything to ask, listen, and let the watchdog above have the last
        // word - a browser that refused a minute ago may have been given its permission since.
        failure.current = null;
        if (availability !== CompassAvailability.Available) {
            setAvailability(CompassAvailability.Unknown);
        }
        setEnabled(true);

        if (request != null) {
            // The dialog only opens from inside a tap handler, which is exactly where we are.
            setAskingPermission(true);
            askPermission(request).then(granted => {
                setPermissionRefused(!granted);
                if (!granted) {
                    sinkRef.current.onFailure({ reason: CompassFailure.Blocked, detail: "permission refused" });
                }
                setAskingPermission(false);
            });
        }

    }, [enabled, availability]);

    return {
        availability: availability,
        enabled: enabled,
        heading: enabled ? reading?.heading ?? null : null,
        tilted: enabled && reading != null && reading.tilted,
        error: error,
        toggle: toggle,
    };
}

/**
 * Starts every way this browser might have of telling us where north is, at once.
 *
 * The events stay in charge whenever they work: they are the path this app has actually been
 * walked around the building with. The sensor is here for the browsers that keep the events to
 * themselves - and for its errors, which are the only ones that ever say why.
 */
function startHeadingSources(sink: HeadingSink): () => void {

    let eventsAnswered = false;

    const stopEvents = listenToOrientationEvents({
        onReading: reading => {
            eventsAnswered = true;
            sink.onReading(reading);
        },
        onFailure: sink.onFailure,
    });

    const stopSensor = startOrientationSensor({
        onReading: reading => {
            if (!eventsAnswered) {
                sink.onReading(reading);
            }
        },
        onFailure: sink.onFailure,
    });

    return () => {
        stopEvents();
        stopSensor();
    };
}

/** `webkitCompassHeading` is Apple's own, so the standard event type knows nothing about it. */
type OrientationEvent = DeviceOrientationEvent & {
    webkitCompassHeading?: number,
    webkitCompassAccuracy?: number,
}

/** The device orientation events - the old way, and the only one webkit has. */
function listenToOrientationEvents(sink: HeadingSink): () => void {

    const handle = (event: Event, fromAbsoluteEvent: boolean) => {
        const orientationEvent = event as OrientationEvent;
        const heading = readHeading(orientationEvent, fromAbsoluteEvent);
        if (heading != null) {
            sink.onReading({ heading: heading, tilt: tiltFromFlat(orientationEvent) });
        } else if (orientationEvent.alpha != null) {
            // Orientation, but measured from wherever the device was pointing at page load. A
            // browser that only ever sends these (brave farbles the magnetometer away, for one)
            // can turn a model on screen but cannot point at north.
            sink.onFailure({ reason: CompassFailure.NoNorth, detail: "orientation is relative" });
        }
    };

    const onAbsolute = (event: Event) => handle(event, true);
    const onPlain = (event: Event) => handle(event, false);

    // Both at once on purpose: browsers support one or the other, and the plain event is ignored
    // unless it says it is absolute, so the two can never disagree about where north is.
    window.addEventListener("deviceorientationabsolute", onAbsolute);
    window.addEventListener("deviceorientation", onPlain);

    return () => {
        window.removeEventListener("deviceorientationabsolute", onAbsolute);
        window.removeEventListener("deviceorientation", onPlain);
    };
}

/** The typings for this one aren't in lib.dom, so here are the parts we use. */
type OrientationSensor = {
    quaternion: number[] | null,
    start: () => void,
    stop: () => void,
    addEventListener: (type: string, listener: (event: Event) => void) => void,
    removeEventListener: (type: string, listener: (event: Event) => void) => void,
}
type OrientationSensorConstructor = new (options: { frequency?: number, referenceFrame?: string })
    => OrientationSensor;

/**
 * `AbsoluteOrientationSensor`, the way chromium would rather a page did this. Worth starting
 * alongside the events because it is a separate permission and a separate code path in the
 * browser - and, unlike the events, it says out loud when it is refused instead of going quiet.
 *
 * `referenceFrame: "screen"` makes it report the rotation of the screen rather than of the device,
 * which is the screen orientation correction the event path has to do by hand.
 */
function startOrientationSensor(sink: HeadingSink): () => void {

    const noop = () => {};

    const constructor = (window as unknown as { AbsoluteOrientationSensor?: OrientationSensorConstructor })
        .AbsoluteOrientationSensor;
    if (typeof constructor !== "function") {
        sink.onFailure({ reason: CompassFailure.Silent, detail: "no AbsoluteOrientationSensor" });
        return noop;
    }

    let sensor: OrientationSensor;
    try {
        sensor = new constructor({ frequency: SENSOR_FREQUENCY_HZ, referenceFrame: "screen" });
    } catch (thrown) {
        sink.onFailure(sensorFailure(thrown));
        return noop;
    }

    const onSensorReading = () => {
        const reading = readSensor(sensor);
        if (reading != null) {
            sink.onReading(reading);
        }
    };
    const onSensorError = (event: Event) => {
        sink.onFailure(sensorFailure((event as Event & { error?: unknown }).error));
    };

    sensor.addEventListener("reading", onSensorReading);
    sensor.addEventListener("error", onSensorError);

    try {
        sensor.start();
    } catch (thrown) {
        sink.onFailure(sensorFailure(thrown));
    }

    return () => {
        sensor.removeEventListener("reading", onSensorReading);
        sensor.removeEventListener("error", onSensorError);
        try {
            sensor.stop();
        } catch {
            // Stopping one that never started throws, and there is nothing to do about it.
        }
    };
}

/** Sorts a sensor's complaint into "you may not" and "there is none". */
function sensorFailure(thrown: unknown): Failure {
    const name = (thrown as { name?: string } | undefined)?.name ?? "unknown error";
    const reason = BLOCKED_ERROR_NAMES.includes(name) ? CompassFailure.Blocked : CompassFailure.Missing;
    return { reason: reason, detail: `sensor: ${name}` };
}

/**
 * The heading out of an orientation sensor's rotation quaternion.
 *
 * The quaternion turns screen coordinates into world ones, where x points east and y north. So
 * running the top of the screen (0, 1, 0) through it says which way the user is looking, and the
 * screen's own normal (0, 0, 1) says how far from flat they are holding the device.
 */
function readSensor(sensor: OrientationSensor): Reading | null {

    const quaternion = sensor.quaternion;
    if (quaternion == null || quaternion.length < 4 || !quaternion.every(Number.isFinite)) {
        return null;
    }

    const [x, y, z, w] = quaternion;

    const east = 2*(x*y - w*z);
    const north = 1 - 2*(x*x + z*z);
    const up = 1 - 2*(x*x + y*y);

    if (east === 0 && north === 0) {
        // Screen pointing straight up or down: it isn't facing anywhere in particular.
        return null;
    }

    return {
        heading: fixAngleBetweenZeroAnd360(radiansToDegrees(Math.atan2(east, north))),
        tilt: radiansToDegrees(Math.acos(Math.min(Math.max(up, -1), 1))),
    };
}

/** The heading of the top of the screen, in degrees clockwise from north, or null if unusable. */
function readHeading(event: OrientationEvent, fromAbsoluteEvent: boolean): number | null {

    const compassHeading = event.webkitCompassHeading;
    if (typeof compassHeading === "number" && Number.isFinite(compassHeading)
            && (event.webkitCompassAccuracy == null || event.webkitCompassAccuracy >= 0)) {
        // ios. A negative accuracy means the sensor knows its own reading is meaningless.
        return fixAngleBetweenZeroAnd360(compassHeading + screenAngle());
    }

    // Everywhere else alpha counts counterclockwise from north - but only when the reading is
    // absolute, otherwise it counts from whichever way the device was pointing at page load.
    if (event.alpha != null && (fromAbsoluteEvent || event.absolute === true)) {
        return fixAngleBetweenZeroAnd360(360 - event.alpha + screenAngle());
    }

    return null;
}

/**
 * How far the page is rotated inside the device, in degrees clockwise.
 *
 * Event headings are measured for the top of the *device* as it is held in its natural
 * orientation. Turn the phone into landscape and the top of the *screen* is no longer the top of
 * the device, so it points somewhere else entirely - by exactly this much.
 */
function screenAngle(): number {
    const angle = window.screen?.orientation?.angle;
    if (typeof angle === "number") {
        return angle;
    }
    // ios before 16.4 has no screen.orientation, only the deprecated (and negative) window.orientation.
    const legacyAngle = (window as unknown as { orientation?: number }).orientation;
    return typeof legacyAngle === "number" ? fixAngleBetweenZeroAnd360(legacyAngle) : 0;
}

/**
 * How far from lying flat the device is held, in degrees. A phone held upright reports whatever
 * heading it likes, so past a point the user has to be told to level it.
 */
function tiltFromFlat(event: DeviceOrientationEvent): number {
    return Math.max(Math.abs(event.beta ?? 0), Math.abs(event.gamma ?? 0));
}

function initialAvailability(): CompassAvailability {
    if (typeof window === "undefined" || typeof window.DeviceOrientationEvent === "undefined") {
        return CompassAvailability.Unavailable;
    }
    if (window.isSecureContext === false) {
        // Browsers keep the sensors to themselves on an insecure page, and stay quiet about it.
        return CompassAvailability.Unavailable;
    }
    if (permissionRequest() != null) {
        // A browser that wants to be asked sends nothing at all until it is, so there is no point
        // in probing - it gets the benefit of the doubt until the user taps the button.
        return CompassAvailability.Available;
    }
    return CompassAvailability.Unknown;
}

type PermissionRequest = () => Promise<"granted" | "denied" | "default">;

function permissionRequest(): PermissionRequest | null {
    if (typeof window === "undefined" || typeof window.DeviceOrientationEvent === "undefined") {
        return null;
    }
    const request = (window.DeviceOrientationEvent as unknown as { requestPermission?: PermissionRequest })
        .requestPermission;
    return typeof request === "function" ? request : null;
}

async function askPermission(request: PermissionRequest): Promise<boolean> {
    try {
        return await request.call(window.DeviceOrientationEvent) === "granted";
    } catch {
        // Thrown when the call didn't come from a user gesture, and when the page isn't allowed
        // to ask at all. Neither is a promise that nothing will arrive, so we listen either way.
        return false;
    }
}

/**
 * What to tell the user, with the technical detail in brackets - which is the only thing they can
 * pass on to us when a browser blocks the sensors in some new way of its own.
 */
function failureMessage(failure: Failure | null): string {
    if (typeof window !== "undefined" && window.isSecureContext === false) {
        return INSECURE_ERROR;
    }
    if (failure == null) {
        return FAILURE_MESSAGES[CompassFailure.Silent];
    }
    return `${FAILURE_MESSAGES[failure.reason]} (${failure.detail})`;
}
