# RitehMaps

The goal of this project is to provide easy-to-use indoor navigation without using real-time positioning data. It is primarily developed for [the Faculty of Engineering, Rijeka](http://www.riteh.uniri.hr/).

## Installation

To install the code open a terminal and run `git clone git@github.com:JakovTomasic/RitehMaps.git` command. A directory `RitehMaps` with all files (from the main branch) will be created. Simply run `cd RitehMaps` to enter the directory.

Before running the project you will need to locally install node_modules. To do that, enter the client folder by running `cd client` command from the RitehMaps directory. Then enter command `yarn install` and press enter. All dependencies should be installed.

If you are having problems running the `yarn install` command on Windows due to execution policy, follow this [tutorial](https://bobbyhadz.com/blog/yarn-cannot-be-loaded-running-scripts-disabled).

## Run

`npm run dev` at the root of the project runs everything:
- *client* on 5173
- *api* on 3000; vite proxies `/api` -> 3000.

Or you can `cd` into the client directory and see respective README files.

## Tests

The tests (jest + ts-jest) live in `client/tests/` and cover the pathfinding logic. Run them from the client directory (see client [README.md](./client/README.md))

The api has no unit tests yet, only the default NestJS e2e scaffold.

## Adding dependencies

In order to add new dependencies, `cd` into client directory and then run `yarn add [package-name]` command.

## Deploy

Steps for deploying the website:
1. Set the admin password **before the first run**. There is no default password: until the server has one, every admin request is rejected. From the `api` directory run `npm run hash-password`, type the password, and set the printed `ADMIN_PASSWORD_HASH` env var on the server. (Once the password is changed through the admin UI, the hash in the storage file takes over and the env var is only the fallback.)
2. Build: run `npm run build` from the project's root directory
3. Run with command `npm run start`
4. Copy content of the latest json file from `/examples` and save (refresh to see if the data persisted)

### Vercel

Create a vercel project.
- to avoid GitHub integration and force manual production updates create project by running `npx vercel --prod` saying "no" when asked to link to another project and enter the new project name.

Only the client is deployed this way. See [API](#api-own-server) below.

1. install vercel CLI `npm i -g vercel` (if using Nix, enter shell `nix-shell -p nodePackages.vercel` or just run `npx vercel`)
2. build the project by running `npm run build` from the directory you want to deploy
3. in the dir you want to deploy run `npx vercel --prod` (non-prod urls won't be public so you can't curl or fetch from them - and also use the shorter domain, not the temporary ones)


#### Client

Point `API_URL` in `client/src/server.ts` at the production api before building; it is committed pointing at the local dev server.

From the client root directory, run:
```bash
rm -rf dist/ # this may not be needed
npm run build # this may not be needed
npx vercel --prod
```
Then click on the inspect link and open the shorter linke there - real production link.


### Cloudflare pages

I've setup everything to pull from Github `prod` branch. It should be automatic.


### API (own server)

The API keeps the map in `longterm_storage.json` on disk, so it needs a host with a real filesystem. It is deployed **standalone**: no monorepo scaffolding, no client.

#### Generating the lock file

There is no `api/package-lock.json` in the repo. `client` and `api` are npm workspaces, so the single lock at the repo root covers both of them. Running `npm install --package-lock-only` inside `api/` does **not** create one: npm walks up, finds `"workspaces"` in the root `package.json` and updates the root lock instead. Generate it outside the workspace tree:

```bash
cd api/
rm -rf /tmp/api-lock && mkdir /tmp/api-lock
cp package.json /tmp/api-lock/
( cd /tmp/api-lock && npm install --package-lock-only )
cp /tmp/api-lock/package-lock.json .
```

Delete the lock file after deploying.

#### Deploy

From the api root directory, run:
```bash
cd api/
rm -rf dist/
npm run build
# put it on the server
scp -r dist/ scripts/ package.json package-lock.json deployuser@<server ip addr>:/srv/ritehmaps-api/
rm package-lock.json
# first deploy only — this is live data, don't overwrite it on later deploys
scp longterm_storage.json deployuser@<server ip addr>:/srv/ritehmaps-api/longterm_storage.json
```

The storage file is looked up next to `dist/`, not inside it, so the layout on the server has to be:

```
/srv/ritehmaps-api/
├── dist/main.js
├── longterm_storage.json
├── package.json
├── package-lock.json
└── scripts/hash-password.js
```

Then, on the server:
```bash
cd /srv/ritehmaps-api
npm ci --omit=dev
node dist/main.js # or automate this with a service
```

Never copy `node_modules/` up from your machine: `bcrypt` is a native module and has to be built against the server's Node. For the same reason `npm ci` needs `python3` and a C++ toolchain on the server if no prebuilt binary matches its Node version.

Environment:
- `ADMIN_PASSWORD_HASH` — see step 1 above. `npm run hash-password` also works on the server, since `bcrypt` is a runtime dependency.
- `PORT` — the port to listen on, defaults to `3000`.
- `NODE_ENV=production` — also drops `http://localhost:5173` from the CORS allowlist.

Allowed browser origins are compiled in (`ALLOWED_ORIGINS` in `src/constants.ts`), not read from the environment: if the client is served from anywhere other than `https://ritehmaps.pages.dev`, add the domain there and rebuild.

#### Redeploying

Rebuild, `scp -r dist/`, `systemctl restart ritehmaps-api`. Re-run `npm ci --omit=dev` only when `package.json` changed (regenerate the lock first), and never copy `longterm_storage.json` up again — that would overwrite the live map with your local copy.
