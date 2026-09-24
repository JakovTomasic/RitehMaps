# RitehMaps

Indoor campus navigation app for the Rijeka Faculty of Engineering. Turbo monorepo:
`client/` (React + TS + Vite + wouter + d3, all the pathfinding logic lives here) and
`api/` (NestJS, basically a guarded JSON store).

`npm run dev` at the root runs both (client on 5173, api on 3000; vite proxies `/api` → 3000).
Client tests: `cd client && npm test` (jest, `client/tests/`).

## Data flow
- The api serves the whole map at `GET /api/allData` and takes admin writes at `/api/login`,
  `/api/save`, `/api/changePassword`. Storage is one JSON file (`api/data/longterm_storage.json`),
  written atomically by `JsonStorageService`; sample/backup dumps live in `examples/`.
- `App.tsx` fetches that once, zod-parses it and passes it down to every page. Nothing else fetches.
- `client/src/data/ServerData.ts` and `api/src/data/ServerData.ts` are **mirrored by hand** - the
  shared zod schemas and the numeric `NodeType` values must stay identical; change both in one commit.
- `client/src/server.ts` is a manual switch between local/prod `API_URL`. Easy to commit by accident.
- Floor images are hardcoded in `client/src/data/submaps.ts` (SVGs in `client/public/submaps/`) and
  keyed by `submapId` from the server data. Adding a floor means touching both. The same file also
  hardcodes which building and floor each submap id is (`buildings`) - captions are shown, never
  parsed, since they're free text an admin can reword.
- The graph is rebuilt in the browser from nodes/edges/hallways (`logic/impl/graph/GraphFactory.ts`):
  hallways become lines, nodes get projected onto them, then Dijkstra runs over the result.

## Routing (client)
- `wouter` v3, mounted in `App.tsx`. Routes: `/` (Home), `/nav` (`NAVIGATION_PATH`),
  `/map` (`MAP_PATH`, the plain browsable map behind the navbar's "Map"), `/admin`.
- Link pattern that works: `<Link href={string}><button>...</button></Link>` - string `href` only,
  no `{pathname, query}` objects, no `asChild`.

## Navigation modes
- One `Navigation` page at `/nav`, mode chosen by query params: `startId`, `endId`, `endName`,
  `mode` (`"floor"` | `"step"`). Build the URL with `createNavigationUrl`, never by hand.
- Mode only picks the pathfinding call on `MapNavigatorImpl`: `findShortestPath` (step-by-step) vs
  `findShortestPathForFloorByFloor` (one step per floor). `findShortestPathForCompassMode` exists but
  is not wired into any UI. All three return `NavigationDirections`, so they're drop-in compatible.
- **Compass mode is not one of those modes**: it's a header toggle (off by default) that only changes
  how the current route is *shown*, so toggling it can't shuffle the steps under the user.
  The `/map` page (`pages/map.tsx`) has the same toggle, and shares the header bits with the
  navigation screen (`CompassToggleButton`, `CompassFacingOverlay`, `Banner`).
  `utils/Compass.ts` (`useCompass`) owns the sensor and has to guess whether a compass exists at all
  by listening for a few seconds - nothing else distinguishes a desktop from a phone. Heading changes
  many times a second, so keep d3 out of it: `MyMap` skips its redraw when only `rotateAngle` changed,
  and `navigation.tsx` memoizes `mapDrawProps`.
- `GoShareButtons.tsx` ("Quick"/"Detailed") is the entry point into `/nav`.

## Map drawing (`components/Map.tsx`)
- `MyMap` draws the floor image plus a d3 overlay (`g.map-overlay`, rebuilt every update;
  `g.map-clicked-dots` from the admin click tool is a separate layer that survives redraws).
- Input is `MapDrawElement[]` (`MapDot` / `MapPathLine`). `UiMapConverterImpl` decides roles and
  colors; `Map.tsx` owns everything visual (casing, halo, dash, arrows, markers).
- **Sizes (`MapPathLine.width`, `MapDot.radius`) are percent of the _visible_ map diagonal**, not of
  the whole submap - `MyMap.visibleDiagonal()` picks the basis: the crop when zoom is off (the step is
  zoomed `stepScale` times), the full submap when `enableZoom` is on. Both give the same on-screen
  size (~1 pct ≈ 3 css px on a phone); mixing them up makes the route a hairline or makes its
  thickness swing from step to step. The zoomed out view then scales everything by
  `ZOOMED_OUT_SIZE_FACTOR`, because a whole floor needs a thinner route than a single step does.
- Consecutive lines sharing a `chainId` (= step index) and touching endpoints merge into one
  `RouteChain` drawn as a single rounded-corner `<path>`, so corners are smooth and one arrow
  animation runs through the whole step.
- The active chain gets flowing white chevrons (SMIL `animateMotion`). A chain can be 0 px long
  (start == end) - those fall back to a pulse; `prefers-reduced-motion` falls back to static chevrons.
