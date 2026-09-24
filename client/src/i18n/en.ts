/**
 * The browser wide setting all of this hangs off on chromium. Brave ships it turned off, which is
 * why turning its Shields off changes nothing - so every message that could mean "blocked"
 * points at it. Kept next to the messages: a translation may want to name it differently.
 */
const SENSOR_SETTING_HINT = "in Brave: Settings, Site settings, Motion sensors";

/**
 * Every string the app shows, in English. This object is the contract - `Translations` is derived
 * from it, so another language is a file that has to fill in exactly these keys or it won't compile.
 *
 * A string taking a value is a function rather than a template with placeholders in it: the
 * substitution is then type checked, and word order stays the translator's to choose.
 *
 * Map data (room, professor, building and floor plan names) is not in here. It comes from the
 * server and is shown the way an admin wrote it, in whatever language they wrote it in.
 */
export const en = {

    /** In its own language on purpose: it has to be readable to someone who can't read the other. */
    languageName: "EN",
    languageSwitcherLabel: "Language",

    notFound: "404: No such page!",

    navbar: {
        map: "Map",
    },

    home: {
        about: "About",
    },

    about: {
        title: "About Riteh maps",
        subtitle: "Indoor navigation for the Faculty of Engineering, Rijeka.",
        /** The sentence runs into the GitHub link, so the link's own text is a separate key. */
        madeBy: (authors: string) => `Made by ${authors}. And other helpers on`,
        github: "GitHub",
        disclaimer: "The map is maintained by hand, so a room may have been renamed or a professor "
            + "may have moved to a new office since it was last updated. Also, the app does not "
            + "track where you are.",
        close: "Close",
    },

    search: {
        startLabel: "Where are you now?",
        destinationLabel: "Where do you want to go?",
        /** Only a hint of what a start looks like - the real name of that node comes from the map data. */
        startPlaceholder: "entrance",
        destinationPlaceholder: "Search",
        swap: "Swap start and destination",
        clear: "Clear",
        nearestToilet: "Nearest toilet",
        men: "Men",
        women: "Women",
        /** These two are also the names the shortcuts are found by when typed into the destination field. */
        nearestMenToilet: "Nearest men toilet",
        nearestWomenToilet: "Nearest women toilet",
        quick: "Quick",
        detailed: "Detailed",
        copyLink: "Copy link to this route",
        linkCopied: "URL copied!",
    },

    navigation: {
        editSearch: "Edit search",
        back: "Back",
        next: "Next",
        finish: "Finish",
        stepLabel: "Step",
        stepValue: (current: number, total: number) => `${current} of ${total}`,
        arrivedAt: "You have arrived at",
        room: (room: string) => `Room ${room}`,
        arrived: "You have reached your destination",
        backToMap: "Back to map",
        newSearch: "New search",
        /** The screen has nothing to draw - a route that came out empty. */
        error: "Error",
        /** Alt text of the zoom button's icon. */
        zoom: "expand",
    },

    map: {
        backToSearch: "Search",
        floorDown: "Go one floor down",
        floorUp: "Go one floor up",
        floor: (label: string) => `Floor ${label}`,
        noFloorPlans: "No floor plans to show.",
        /** The buildings are hardcoded in the client (see data/submaps.ts), so their names are ui text. */
        mainBuilding: "Main Building",
        labBuilding: "Lab Building",
    },

    compass: {
        unavailable: "Compass mode - not available on this device",
        turnOff: "Turn compass mode off",
        turnOn: "Turn compass mode on - the map follows the way you are facing",
        facingThisWay: "You are facing this way",
        tapToStart: "Tap the map to start the compass",
        keepLevel: "Please keep your device parallel to the ground",
        failureSilent: "No compass reading. This device may have no compass, or the browser is "
            + `blocking motion sensors (${SENSOR_SETTING_HINT}).`,
        failureMissing: "This device has no compass sensor.",
        failureNoNorth: "This browser reports which way the phone turns but not where north is, "
            + "so compass mode can't work in it.",
        failureBlocked: "The browser is blocking the motion sensors. Turn them on in its settings "
            + `(${SENSOR_SETTING_HINT}) and reload the page.`,
        insecure: "The compass only works over a secure (https) connection.",
    },
};

export type Translations = typeof en;
