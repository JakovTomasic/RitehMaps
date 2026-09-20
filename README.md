# RitehMaps

The goal of this project is to provide easy-to-use indoor navigation without using real-time positioning data. It is primarily developed for [the Faculty of Engineering, Rijeka](http://www.riteh.uniri.hr/).

Please read the [wiki](https://github.com/JakovTomasic/RitehMaps/wiki) before contributing to the project.

## Installation

To install the code open a terminal and run `git clone git@github.com:JakovTomasic/RitehMaps.git` command. A directory `RitehMaps` with all files (from the main branch) will be created. Simply run `cd RitehMaps` to enter the directory.

Before running the project you will need to locally install node_modules. To do that, enter the client folder by running `cd client` command from the RitehMaps directory. Then enter command `yarn install` and press enter. All dependencies should be installed.

If you are having problems running the `yarn install` command on Windows due to execution policy, follow this [tutorial](https://bobbyhadz.com/blog/yarn-cannot-be-loaded-running-scripts-disabled).

## Run

To start the web application `cd` into the client directory and see respective README files.

## Adding dependencies

In order to add new dependencies, `cd` into client directory and then run `yarn add [package-name]` command.

## Deploy

Steps for deploying the website:
1. Set the admin password **before the first run**. There is no default password: until the server has one, every admin request is rejected. From the `api` directory run `npm run hash-password`, type the password, and set the printed `ADMIN_PASSWORD_HASH` env var on the server. (Once the password is changed through the admin UI, the hash in the storage file takes over and the env var is only the fallback.)
2. Build: run `npm run build` from the project's root directory
3. Run with command `npm run start`
4. Copy content of the latest json file from `/examples` and save (refresh to see if the data persisted)

### Vercel

Create two vercel projects. One for the api and one for the client. (I had some problems setting them up in the same repo.)
- to avoid GitHub integration and force manual production updates create project by running `npx vercel --prod` saying "no" when asked to link to another project and enter the new project name.

You can deploy both front-end and back-end to Vercel.

1. install vercel CLI `npm i -g vercel` (if using Nix, enter shell `nix-shell -p nodePackages.vercel` or just run `npx vercel`)
2. build the project by running `npm run build` from the directory you want to deploy
3. in the dir you want to deploy run `npx vercel --prod` (non-prod urls won't be public so you can't curl or fetch from them - and also use the shorter domain, not the temporary ones)


#### Client

Put API path to production api (vercel link)

From api root directory, run:
```bash
rm -rf dist/ # this may not be needed
npm run build # this may not be needed
npx vercel --prod
```
Then click on the inspect link and open the shorter linke there - real production link.


### API

From api root directory, run:
```bash
rm -rf dist/ # this may not be needed
npm run build # this may not be needed
# put it on the server
```
