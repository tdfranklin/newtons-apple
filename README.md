# NEWTONS APPLE
[![npm version](https://badge.fury.io/js/newtons-apple.svg)](https://badge.fury.io/js/newtons-apple)
[![npm](https://img.shields.io/npm/dt/newtons-apple.svg)]()
[![npm](https://img.shields.io/npm/l/newtons-apple.svg)]()
[![CircleCI](https://img.shields.io/circleci/project/github/tdfranklin/newtons-apple.svg)]()

Newton's Apple is a simple CLI to simplify component creation for developers working on ReactJS projects.  Running a simple command, it will create a file with the name you specify and generate all of the boilerplate code for a React component.

# Installation

To install, first make sure you have Node installed:

```
$ node -v
```

If you get back a version number, you have Node installed and can install this via NPM:

```
$ npm install -g newtons-apple
```

# Usage

To use this tool, simply run the napp new command and it will create a file using the componentName that you specify (componentName.js) and inside of the file will already be the boilerplate code for a typical React component, including state, default props, lifecycle methods, import and export lines.  The component itself will also be named based off the name you specify.

### Example

```
$ napp new componentName
```

This will create a file called componentName.js in your current directory with all of the boilerplate code for a React component.  If you want to create the file in another directory, simply include the path from your current directory in with the command like below:

```
$ napp new dirOne/dirTwo/componentName
```

This will create the component in current_directory/dirOne/dirTwo/componentName.js if that directory exists.  If you would like to create the directory path if it doesn't already exist, just make sure to add the -c or --create option on the command:

```
$ napp new dirOne/dirTwo/componentName -c
```

---
---

By default, all React lifecycle methods are included.  However, you can customize this in two ways.  To disable all lifecycle methods, and thereby create a component with only the state, default props, render method, import and export lines, you can just pass either -n or --none to the command or to enable all lifecycle methods, pass -a or --all:

### Example

```
$ napp new componentName -n
$ napp new componentName -a
```

Lastly, if you only want to include certain lifecycle methods, you can customize by doing napp setup before creating your component:

### Example

```
$ napp setup
? Choose lifecycle methods (Press <space> to select, <a> to toggle all, <i> to inverse selection)
❯◯ componentWillMount
 ◯ componentWillReceiveProps
 ◯ shouldComponentUpdate
 ◯ componentWillUpdate
 ◯ componentDidMount
 ◯ componentDidUpdate
 ◯ componentWillUnmount
(Move up and down to reveal more choices)

$ napp new componentName
```
Also please note that when you make a change, those changes will be saved as your default so all components you create will include those methods until you run setup again or pass --all or --none to the new command.

# Issues

If you run into any issues using this tool, please first search the issues in the repo to make sure it has not already been reported.  If you don't find anything, please feel free to open a new issue.

# Contributing

I welcome anyone who is interested to come help contribute on this project.  Please be sure to read the [Code of Conduct](https://github.com/tdfranklin/newtons-apple/blob/master/CODE_OF_CONDUCT.md) before contributing.  More information available [here](https://github.com/tdfranklin/newtons-apple/blob/master/CONTRIBUTING.md).

# Upcoming Features

I will try to keep an updated list here of features I plan to implement in this CLI.

1. Add custom methods to be included in component creation.
2. Redux support (create boilerplate code for projects that use Redux).
3. Add default file structure support so command can be run from home directory and create files in correct location.