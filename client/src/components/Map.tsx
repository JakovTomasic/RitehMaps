import { Component } from 'react';
import * as d3 from 'd3';
import ZoomableSVG from './ZoomableSVG';
import { round } from '../utils/Math';
import { CentroidScale } from '../types/navigation/CentroidScale';
import { Dot } from '../types/general/Dot';
import { MapDrawElement } from '../types/map_draw_elements/MapDrawElement';
import { MapDot, MapDotKind } from '../types/map_draw_elements/MapDot';
import { MapPathLine, PathSegmentRole } from '../types/map_draw_elements/MapPathLine';

type Prop = {
    layoutImage: string;
    width: number;
    height: number;
    centroidCrop: CentroidScale;
    rotateAngle: number;
    drawElements: MapDrawElement[];
    enableDrawNodes?: boolean;
    enableZoom?: boolean;
}

type State = {
    clickedCoordinates: string,
}

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

/**
 * All sizes below are percentages of the *visible* (cropped) map diagonal, not of the whole submap.
 */
const CLICK_DOT_RADIUS = 0.5;
/** Soft dark shadow drawn under the route, so it stays readable over dark parts of the image. */
const HALO_COLOR = "#0F172A";
/** White outline drawn under the route, so it stays readable over light parts of the image. */
const CASING_COLOR = "#FFFFFF";
const ARROW_COLOR = "#FFFFFF";
const CORNER_ROUNDING = 1.6;

type SegmentStyle = {
    /** Width of the white casing, per side, added to the line width. */
    casing: number,
    casingOpacity: number,
    /** Width of the dark halo, per side, added to the casing. */
    halo: number,
    haloOpacity: number,
    lineOpacity: number,
    dash: number[] | null,
    /** Whether arrows flow along the segment. */
    animated: boolean,
}

const SEGMENT_STYLES: Record<PathSegmentRole, SegmentStyle> = {
    [PathSegmentRole.Active]: {
        casing: 0.6, casingOpacity: 0.95, halo: 0.5, haloOpacity: 0.22,
        lineOpacity: 1, dash: null, animated: true,
    },
    [PathSegmentRole.Upcoming]: {
        casing: 0.45, casingOpacity: 0.8, halo: 0.3, haloOpacity: 0.1,
        lineOpacity: 0.55, dash: [2.6, 2.4], animated: false,
    },
    [PathSegmentRole.Completed]: {
        casing: 0.4, casingOpacity: 0.7, halo: 0, haloOpacity: 0,
        lineOpacity: 0.45, dash: null, animated: false,
    },
    [PathSegmentRole.Plain]: {
        casing: 0, casingOpacity: 0, halo: 0, haloOpacity: 0,
        lineOpacity: 1, dash: null, animated: false,
    },
}

/** Distance between two arrows flowing along the active route. */
const ARROW_SPACING = 20;
/** How fast the arrows travel, per second. */
const ARROW_SPEED = 26;
const ARROW_MIN_DURATION = 1.2;
const ARROW_MAX_DURATION = 4.5;
const ARROW_MAX_COUNT = 5;
const PULSE_DURATION = 2.2;

type Point = {
    x: number,
    y: number,
}

/** One or more connected path segments of the same kind, drawn as a single continuous line. */
type RouteChain = {
    role: PathSegmentRole,
    color: string,
    width: number,
    points: Point[],
}

type Group = d3.Selection<SVGGElement, unknown, null, undefined>;

type Layers = {
    halo: Group,
    casing: Group,
    line: Group,
    arrow: Group,
    marker: Group,
}


export default class MyMap extends Component<Prop, State>{

    mapRef!: SVGSVGElement

    constructor(props: Prop) {
        super(props);
        this.state = { clickedCoordinates: "" };
    }

    /** Length of the map diagonal that is currently visible, in map units. */
    private visibleDiagonal(): number {
        const width = this.props.centroidCrop?.scaledWidth || this.props.width;
        const height = this.props.centroidCrop?.scaledHeight || this.props.height;
        return Math.sqrt(width*width + height*height) / Math.SQRT2;
    }

    /** Converts a size given in percent of the visible map diagonal into map units. */
    private units(percent: number): number {
        return percent / 100 * this.visibleDiagonal();
    }

    /** Converts a dot (relative, in percent) into map units. */
    private point(dot: Dot): Point {
        return { x: dot.x / 100 * this.props.width, y: dot.y / 100 * this.props.height };
    }

    private drawMap(){

        const svgElement = d3.select(this.mapRef)
        .attr("viewBox", [0, 0, this.props.width, this.props.height])

        svgElement.selectAll("image.map-layout").remove()

        svgElement.insert("image", ":first-child")
        .attr("class", "map-layout")
        .attr("xlink:href", this.props.layoutImage)
        .attr("width", "100%")
        .attr("height", "100%")
    }


    private drawNodesOnClick(){

        const width = this.props.width;
        const height = this.props.height;

        const svg = d3.select(this.mapRef)
        svg.on("click", (event: any) => {

            const clickedX = d3.pointer(event)[0];
            const clickedY = d3.pointer(event)[1];

            const relativeX = round(clickedX / width * 100, 2);
            const relativeY = round(clickedY / height * 100, 2);

            this.clickedDotsLayer().append("circle")
            .attr("cx", clickedX)
            .attr("cy", clickedY)
            .attr("r", this.units(CLICK_DOT_RADIUS))
            .attr("fill","#41C7F7")
            .attr("stroke", CASING_COLOR)
            .attr("stroke-opacity", 1)
            .attr("stroke-width", this.units(CLICK_DOT_RADIUS) * 0.35)

            this.setState({ clickedCoordinates: `x: ${relativeX}\ny: ${relativeY}` });

        })
    }

    /** Dots added by clicking live in their own layer, so redrawing the route doesn't erase them. */
    private clickedDotsLayer(): Group {
        const svg = d3.select(this.mapRef);
        const existing = svg.select<SVGGElement>("g.map-clicked-dots");
        return existing.empty() ? svg.append("g").attr("class", "map-clicked-dots") : existing;
    }

    private coordinatesOverlap(x1: number, x2: number, y1: number, y2: number): boolean {
        return (round(x1, 2) == round(x2, 2) && round(y1, 2) == round(y2, 2));
    }

    /**
     * Merges the flat list of path segments into continuous chains. Segments belong to the same
     * chain when they were produced for the same step (same chainId), look the same and the
     * previous one ends where the next one starts.
     */
    private buildChains(): RouteChain[] {

        const chains: RouteChain[] = [];
        let currentChain: RouteChain | null = null;
        let currentChainId: number | null = null;
        let currentEnd: Dot | null = null;

        for (const element of this.props.drawElements) {

            if (!(element instanceof MapPathLine)) continue;

            const continuesChain = currentChain != null && currentEnd != null
                && element.chainId != null && element.chainId === currentChainId
                && element.role === currentChain.role && element.color === currentChain.color
                && this.coordinatesOverlap(currentEnd.x, element.line.dot1.x, currentEnd.y, element.line.dot1.y);

            if (continuesChain) {
                appendPoint(currentChain!.points, this.point(element.line.dot2));
            } else {
                currentChain = {
                    role: element.role,
                    color: element.color,
                    width: element.width,
                    points: [this.point(element.line.dot1)],
                };
                appendPoint(currentChain.points, this.point(element.line.dot2));
                currentChainId = element.chainId;
                chains.push(currentChain);
            }
            currentEnd = element.line.dot2;
        }

        return chains;
    }

    private drawChain(layers: Layers, chain: RouteChain){

        const style = SEGMENT_STYLES[chain.role] ?? SEGMENT_STYLES[PathSegmentRole.Plain];
        const lineWidth = this.units(chain.width);
        const pathData = toPathData(chain.points, lineWidth * CORNER_ROUNDING);

        if (style.haloOpacity > 0) {
            layers.halo.append("path")
            .attr("d", pathData)
            .attr("fill", "none")
            .attr("stroke", HALO_COLOR)
            .attr("stroke-opacity", style.haloOpacity)
            .attr("stroke-width", lineWidth + 2*this.units(style.casing + style.halo))
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
        }

        if (style.casingOpacity > 0) {
            layers.casing.append("path")
            .attr("d", pathData)
            .attr("fill", "none")
            .attr("stroke", CASING_COLOR)
            .attr("stroke-opacity", style.casingOpacity)
            .attr("stroke-width", lineWidth + 2*this.units(style.casing))
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
        }

        const line = layers.line.append("path")
        .attr("d", pathData)
        .attr("fill", "none")
        .attr("stroke", chain.color)
        .attr("stroke-opacity", style.lineOpacity)
        .attr("stroke-width", lineWidth)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")

        if (style.dash != null) {
            line.attr("stroke-dasharray", style.dash.map(value => this.units(value)).join(" "))
        }
    }

    /**
     * Arrows travelling along the active chain, rotating with it through every corner.
     * Very short (or zero length - start and end are the same spot) chains can't carry a
     * travelling arrow, those get a pulse instead.
     */
    private drawChainArrows(layers: Layers, chain: RouteChain){

        const lineWidth = this.units(chain.width);
        const arrowSize = Math.max(lineWidth * 1.35, this.units(1.3));
        const length = polylineLength(chain.points);
        const lastPoint = chain.points[chain.points.length - 1];

        if (length < arrowSize * 1.8) {
            if (!this.hasMarkerAt(lastPoint)) {
                this.drawPulse(layers.arrow, lastPoint, chain.color, Math.max(lineWidth, arrowSize * 0.6));
            }
            return;
        }

        const pathData = toPathData(chain.points, lineWidth * CORNER_ROUNDING);
        const duration = clamp(length / this.units(ARROW_SPEED), ARROW_MIN_DURATION, ARROW_MAX_DURATION);
        const count = clamp(Math.round(length / this.units(ARROW_SPACING)), 1, ARROW_MAX_COUNT);
        const shape = arrowShape(arrowSize);

        for (let index = 0; index < count; index++) {

            const arrow = layers.arrow.append("g").attr("opacity", 0);

            arrow.append("path")
            .attr("d", shape)
            .attr("fill", "none")
            .attr("stroke", HALO_COLOR)
            .attr("stroke-opacity", 0.28)
            .attr("stroke-width", arrowSize * 0.55)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")

            arrow.append("path")
            .attr("d", shape)
            .attr("fill", "none")
            .attr("stroke", ARROW_COLOR)
            .attr("stroke-width", arrowSize * 0.32)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")

            const arrowNode = arrow.node()!;

            if (prefersReducedMotion()) {
                // No animation: spread the arrows out along the path and leave them there.
                const sample = sampleAlongPolyline(chain.points, length * (index + 0.5) / count);
                arrow.attr("opacity", 1)
                .attr("transform", `translate(${format(sample.x)}, ${format(sample.y)}) rotate(${format(sample.angle)})`)
                continue;
            }

            // Negative begin => the arrows are spread out along the path from the very first frame.
            const begin = `${format(-duration * index / count, 3)}s`;

            appendAnimation(arrowNode, "animateMotion", {
                "path": pathData,
                "dur": `${duration}s`,
                "begin": begin,
                "repeatCount": "indefinite",
                "rotate": "auto",
            });
            appendAnimation(arrowNode, "animate", {
                "attributeName": "opacity",
                "values": "0;1;1;0",
                "keyTimes": "0;0.15;0.85;1",
                "dur": `${duration}s`,
                "begin": begin,
                "repeatCount": "indefinite",
            });
        }
    }

    /** Rings growing out of a point - "you are here" / "this is the spot". */
    private drawPulse(layer: Group, point: Point, color: string, radius: number){

        if (prefersReducedMotion()) return;

        for (let index = 0; index < 2; index++) {

            const ring = layer.append("circle")
            .attr("cx", format(point.x))
            .attr("cy", format(point.y))
            .attr("r", radius)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", radius * 0.45)
            .attr("opacity", 0)

            const begin = `${format(-index * PULSE_DURATION / 2, 3)}s`;

            appendAnimation(ring.node()!, "animate", {
                "attributeName": "r",
                "values": `${format(radius)};${format(radius * 2.6)}`,
                "dur": `${PULSE_DURATION}s`,
                "begin": begin,
                "repeatCount": "indefinite",
            });
            appendAnimation(ring.node()!, "animate", {
                "attributeName": "opacity",
                "values": "0.7;0",
                "dur": `${PULSE_DURATION}s`,
                "begin": begin,
                "repeatCount": "indefinite",
            });
        }
    }

    /** True when a route marker (not a plain graph dot) sits on that spot. */
    private hasMarkerAt(point: Point): boolean {
        return this.props.drawElements.some(element =>
            element instanceof MapDot
            && element.kind !== MapDotKind.Plain
            && this.coordinatesOverlap(this.point(element.dot).x, point.x, this.point(element.dot).y, point.y)
        );
    }

    private drawDot(layers: Layers, element: MapDot){

        const point = this.point(element.dot);
        const radius = this.units(element.radius);

        const marker = layers.marker.append("g").attr("opacity", element.opacity);

        const circle = (r: number, fill: string) => marker.append("circle")
            .attr("cx", format(point.x))
            .attr("cy", format(point.y))
            .attr("r", format(r))
            .attr("fill", fill);

        if (element.kind === MapDotKind.Plain) {
            circle(radius, element.color);
            return;
        }

        // Soft shadow, so the marker doesn't melt into the floor image.
        circle(radius * 1.1 + this.units(0.4), HALO_COLOR).attr("opacity", 0.18);

        switch (element.kind) {
            case MapDotKind.Start:
                this.drawPulse(marker, point, element.color, radius);
                circle(radius, CASING_COLOR);
                circle(radius * 0.58, element.color);
                break;
            case MapDotKind.StepEnd:
                circle(radius, CASING_COLOR);
                circle(radius * 0.7, "none")
                .attr("stroke", element.color)
                .attr("stroke-width", radius * 0.5);
                break;
            case MapDotKind.Destination:
                circle(radius * 1.1, CASING_COLOR);
                circle(radius * 0.82, element.color);
                circle(radius * 0.3, CASING_COLOR);
                break;
        }
    }

    private drawElements(){

        const svg = d3.select(this.mapRef)
        svg.selectAll("g.map-overlay").remove()

        // The overlay goes under the clicked dots (admin tool), but over the floor image.
        const clickedDots = svg.select("g.map-clicked-dots");
        const overlay = (clickedDots.empty() ? svg.append("g") : svg.insert("g", "g.map-clicked-dots"))
            .attr("class", "map-overlay")
            .attr("pointer-events", "none");

        // Every kind of stroke gets its own layer, so a later chain's casing can never
        // paint over an earlier chain's line.
        const layers: Layers = {
            halo: overlay.append("g"),
            casing: overlay.append("g"),
            line: overlay.append("g"),
            arrow: overlay.append("g"),
            marker: overlay.append("g"),
        };

        const chains = this.buildChains();
        chains.forEach(chain => this.drawChain(layers, chain));
        chains.filter(chain => SEGMENT_STYLES[chain.role]?.animated)
            .forEach(chain => this.drawChainArrows(layers, chain));

        this.props.drawElements.forEach(element => {
            if (element instanceof MapDot) {
                this.drawDot(layers, element);
            }
        });
    }


    componentDidMount() {

        this.drawMap()
        if (this.props.enableDrawNodes == true)
            this.drawNodesOnClick()
        this.drawElements()
    }

    componentDidUpdate(prevProps: Readonly<Prop>) {

        if(prevProps.layoutImage != this.props.layoutImage){
            this.drawMap()
        }

        this.drawElements()
    }

    render() {

        return(
            <>
                <ZoomableSVG width={this.props.width} height={this.props.height}
                    centroidCrop={this.props.centroidCrop} rotateAngle={this.props.rotateAngle}
                    enableZoom={this.props.enableZoom}
                >
                    <svg ref={(mapRef: SVGSVGElement) => this.mapRef = mapRef}>

                    </svg>
                </ZoomableSVG>
                { this.state.clickedCoordinates }
            </>
        )
    }

}


function format(value: number, decimals: number = 2): number {
    return round(value, decimals);
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function distance(from: Point, to: Point): number {
    return Math.sqrt((to.x - from.x)**2 + (to.y - from.y)**2);
}

/** Adds a point unless it repeats the previous one (a segment can be 0 units long). */
function appendPoint(points: Point[], point: Point){
    const last = points[points.length - 1];
    if (last != null && distance(last, point) < 1e-6) return;
    points.push(point);
}

function polylineLength(points: Point[]): number {
    let length = 0;
    for (let index = 1; index < points.length; index++) {
        length += distance(points[index - 1], points[index]);
    }
    return length;
}

/** Point and heading (degrees) at the given distance from the start of the polyline. */
function sampleAlongPolyline(points: Point[], distanceFromStart: number): { x: number, y: number, angle: number } {
    let travelled = 0;
    for (let index = 1; index < points.length; index++) {
        const from = points[index - 1];
        const to = points[index];
        const segmentLength = distance(from, to);
        if (segmentLength <= 0) continue;
        if (travelled + segmentLength >= distanceFromStart || index === points.length - 1) {
            const ratio = clamp((distanceFromStart - travelled) / segmentLength, 0, 1);
            return {
                x: from.x + (to.x - from.x) * ratio,
                y: from.y + (to.y - from.y) * ratio,
                angle: Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI,
            };
        }
        travelled += segmentLength;
    }
    return { x: points[0].x, y: points[0].y, angle: 0 };
}

/** A chevron pointing towards +x, which is the direction an arrow travels in. */
function arrowShape(size: number): string {
    return `M ${format(-0.5*size)},${format(-0.55*size)} L ${format(0.42*size)},0 `
        + `L ${format(-0.5*size)},${format(0.55*size)}`;
}

/**
 * Builds the `d` of a polyline whose corners are rounded off - looks better than a sharp
 * kink and, more importantly, lets an arrow rotate smoothly while it drives through a corner.
 */
function toPathData(points: Point[], cornerRadius: number): string {

    if (points.length === 0) return "";

    const start = points[0];
    // A zero length path still shows up as a dot thanks to the round line caps.
    if (points.length === 1) return `M ${format(start.x)},${format(start.y)} L ${format(start.x)},${format(start.y)}`;

    let pathData = `M ${format(start.x)},${format(start.y)}`;

    for (let index = 1; index < points.length; index++) {

        const previous = points[index - 1];
        const corner = points[index];
        const next: Point | undefined = points[index + 1];

        const radius = next === undefined ? 0 : Math.min(
            cornerRadius,
            distance(previous, corner) * 0.4,
            distance(corner, next) * 0.4,
        );

        if (radius <= 1e-6) {
            pathData += ` L ${format(corner.x)},${format(corner.y)}`;
            continue;
        }

        const incoming = direction(previous, corner);
        const outgoing = direction(corner, next!);
        const arcStart = { x: corner.x - incoming.x*radius, y: corner.y - incoming.y*radius };
        const arcEnd = { x: corner.x + outgoing.x*radius, y: corner.y + outgoing.y*radius };

        pathData += ` L ${format(arcStart.x)},${format(arcStart.y)}`
            + ` Q ${format(corner.x)},${format(corner.y)} ${format(arcEnd.x)},${format(arcEnd.y)}`;
    }

    return pathData;
}

function direction(from: Point, to: Point): Point {
    const length = distance(from, to);
    if (length <= 0) return { x: 0, y: 0 };
    return { x: (to.x - from.x) / length, y: (to.y - from.y) / length };
}

/**
 * SMIL animation elements (`animate`, `animateMotion`) - created by hand because d3's
 * typings only know about the regular drawing elements.
 */
function appendAnimation(parent: SVGElement, tag: string, attributes: Record<string, string>){
    const element = document.createElementNS(SVG_NAMESPACE, tag);
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    parent.appendChild(element);
}

function prefersReducedMotion(): boolean {
    return typeof window !== "undefined"
        && typeof window.matchMedia === "function"
        && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
