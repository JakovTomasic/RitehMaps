# RitehMaps

The goal of this project is to provide easy-to-use indoor navigation without using real-time positioning data. It is primarily developed for [the Faculty of Engineering, Rijeka](http://www.riteh.uniri.hr/).

Please read the [wiki](https://github.com/JakovTomasic/RitehMaps/wiki) before contributing to the project.

## Installation

To install the code open a terminal and run `git clone https://github.com/JakovTomasic/RitehMaps.git` command. A directory `RitehMaps` with all files (from the main branch) will be created. Simply run `cd RitehMaps` to enter the directory.

Before running the project you will need to locally install node_modules. To do that, enter the client folder by running `cd client` command from the RitehMaps directory. Then enter command `yarn install` and press enter. All dependencies should be installed.

If you are having problems running the `yarn install` command on Windows due to execution policy, follow this [tutorial](https://bobbyhadz.com/blog/yarn-cannot-be-loaded-running-scripts-disabled).

## Run

To start the web application `cd` into the client directory and run `yarn run dev` command. The website should be accessible from [http://localhost:3000/](http://localhost:3000/)

## Adding dependencies

In order to add new dependencies, `cd` into client directory and then run `yarn add [package-name]` command.
