import { AllMapsData } from "./data/ServerData";

/**
 * bcrypt work factor. 12 costs a few hundred ms per hash, which is irrelevant
 * for an endpoint that is hit a handful of times a day and expensive for anyone
 * working through a password list.
 */
export const BCRYPT_ROUNDS = 12;

/**
 * Env var holding a bcrypt hash of the admin password. It bootstraps the admin
 * account when the storage file doesn't carry a hash yet; once the password is
 * changed through the API the stored hash wins. Generate one with
 * `npm run hash-password`. There is deliberately no default: with no hash from
 * either source the admin endpoints stay locked.
 */
export const ADMIN_PASSWORD_HASH_ENV = "ADMIN_PASSWORD_HASH";

/**
 * Body size cap for the JSON parser. A full map save is ~84kb today, well over
 * the 100kb Nest defaults to once the data grows a little, so this is set high
 * enough to leave room without accepting arbitrarily large uploads.
 */
export const MAX_REQUEST_BODY_SIZE = "5mb";

/**
 * Browser origins allowed to call this API. Anything else is rejected by CORS.
 * Entries may be exact strings or patterns; `cors` accepts both.
 */
export const ALLOWED_ORIGINS: (string | RegExp)[] = [
    "https://ritehmaps.pages.dev",
    // Cloudflare Pages preview deployments: every push gets its own subdomain,
    // either a deploy hash (95c0f601.ritehmaps.pages.dev) or a branch alias
    // (some-branch.ritehmaps.pages.dev). Anchored at both ends and with the dots
    // escaped on purpose - an unanchored version would also match origins like
    // https://ritehmaps.pages.dev.evil.com.
    /^https:\/\/[a-z0-9-]+\.ritehmaps\.pages\.dev$/,
    // Faculty/university hosting: uniri.hr itself plus any subdomain at any depth
    // (ritehmaps.uniri.hr, riteh.uniri.hr, www.riteh.uniri.hr, ...). The path is
    // irrelevant here - an Origin header is only scheme + host + port, so this one
    // entry already covers riteh.uniri.hr/maps and any other path on that host.
    // Same anchoring rules as above: `^`/`$` and escaped dots keep out both
    // https://uniri.hr.evil.com and https://notuniri.hr. Plain http is left out so
    // the api is never reachable from a page that was served over a downgradeable
    // connection.
    /^https:\/\/([a-z0-9-]+\.)*uniri\.hr$/,
    // The vite dev server, so the admin page works locally.
    ...(process.env.NODE_ENV === "production" ? [] : ["http://localhost:5173"]),
];

export const EMPTY_DATA: AllMapsData = {
    nodes: [],
    edges: [],
    hallways: [],
    submaps: [],
    professors: [],
}
