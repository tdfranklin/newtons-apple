# NEWTON'S APPLE
[![GitHub package version](https://img.shields.io/github/package-json/v/tdfranklin/newtons-apple.svg)]()
[![npm](https://img.shields.io/npm/dt/newtons-apple.svg)]()
[![npm](https://img.shields.io/npm/l/newtons-apple.svg)]()
[![GitHub issues](https://img.shields.io/github/issues/tdfranklin/newtons-apple.svg)]()
[![CircleCI](https://img.shields.io/circleci/project/github/tdfranklin/newtons-apple.svg)]()

[![NPM](https://nodei.co/npm/newtons-apple.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/newtons-apple/)

Newton's Apple(NAPP) is a Command Line Interface(CLI) tool to simplify component creation for developers working on ReactJS projects.  Running a simple command, it will create a file with the name you specify and generate the boilerplate code for a typical React component.

You can also configure default path's on where to save files created with NAPP.  And soon NAPP will provide the ability to create other files commonly used with React (tests, Redux files, etc).  Please read the docs thoroughly to learn more.

---

## NAVIGATION

* [Home](#newtons-apple)
  * [Installation](#installation)
  * [Help Menu](#help-menu)
  * [Issues](#issues)
  * [Contributing](#contributing)
  * [Upcoming Features](#upcoming-features)
* [Basic Usage (napp new)](./docs/BASIC-USAGE.md)
* [Lifecycle Methods (napp select)](./docs/LIFECYCLE-METHODS.md)
* [Configuration (napp setup)](./docs/CONFIGURATION.md)

---

## INSTALLATION

To install, first make sure you have Node installed.  If you see a version number, you will be able to install Newton's Apple via NPM as below:

``` shell
$ node -v
v8.9.4
$ npm install -g newtons-apple
```

---

## HELP MENU

There are a lot of commands and options in NAPP and more are being added all the time, so it's understandable that you won't be able to remember them all off the top of your head.  Hopefully, the in-app help menu will help you there.  Simply use the -h or --help flag to see your various options:

``` shell
$ napp -h

    Usage: napp [options] [command] <arg>

    Options:
        -v, --version  output the version number
        -h, --help     output usage information

    Commands:
        new [options] <component-name>  create new component in either current directory or provided path
        select                          select lifecycle methods to be included when creating components
        setup                           configure options for Newton's Apple
```

``` shell
$ napp new --help

    Usage: new [options] <component-name>

    create new component in either current directory or provided path

    Options:

        -d, --dumb       set component type to dumb, i.e. functional/stateless
        -a, --all        enable all methods
        -n, --none       disable all methods
        -c, --create     creates directories if they don't exist
        -o, --overwrite  overwrites file if it exists
        -h, --help       output usage information
```

---

## ISSUES

If you run into any issues using this tool, please first search the issues in the repo to make sure it has not already been reported.  If you don't find anything, please feel free to open a new issue.

---

## CONTRIBUTING

I welcome anyone who is interested to come help contribute on this project.  The most important contribution you can make is to install and test the app.  Please leave feedback on what you like, didn't like, any features you would like to see added, and create issues for any bugs you find!

If you would like to resolve any issues or add a feature yourself, please be sure to read the [Code of Conduct](./CODE_OF_CONDUCT.md) and [Contributing](./CONTRIBUTING.md) before submitting any pull requests.

---

## UPCOMING FEATURES

I will try to keep an updated list here of features I plan to implement in this CLI.

1. Jest support (create boilerplate for Jest tests for components).
2. Redux support (create boilerplate code for projects that use Redux).
3. Add custom methods to be included in component creation.

---