# RitehMaps

The goal of this project is to provide easy-to-use indoor navigation without using real-time positioning data. It is primarily developed for [the Faculty of Engineering, Rijeka](http://www.riteh.uniri.hr/).

Please read the [wiki](https://github.com/JakovTomasic/RitehMaps/wiki) before contributing to the project.

## Installation

To install the code open a terminal and run `git clone git@github.com:JakovTomasic/RitehMaps.git` command. A directory `RitehMaps` with all files (from the main branch) will be created. Simply run `cd RitehMaps` to enter the directory.

Before running the project you will need to locally install node_modules. To do that, enter the client folder by running `cd client` command from the RitehMaps directory. Then enter command `yarn install` and press enter. All dependencies should be installed.

If you are having problems running the `yarn install` command on Windows due to execution policy, follow this [tutorial](https://bobbyhadz.com/blog/yarn-cannot-be-loaded-running-scripts-disabled).

## Run

To start the web application `cd` into the client directory and run `yarn run dev` command. The website should be accessible from [http://localhost:3000/](http://localhost:3000/)

### New instructions

- run `npm run dev` and then for every change in client folder run `npm run build`
- for developing client just go into client folder and run `npm run dev`

## Adding dependencies

In order to add new dependencies, `cd` into client directory and then run `yarn add [package-name]` command.

## Deploy

Steps for deploying the website:
1. Build: run `npm run build` from the project's root directory
2. Run with command `npm run start`
3. Copy content of the latest json file from `/examples` and save (refresh to see if the data persisted)
4. Change password from the default empty password
