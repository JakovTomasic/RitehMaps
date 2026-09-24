
/**
 * What the arrival screen calls the destination. Always built from the map data, never from a url.
 * Url can't be trusted because user can modify it.
 */
export type DestinationNode = {
    name: string,
    /** The office, set only when `name` is a person rather than a room. */
    room?: string,
}
