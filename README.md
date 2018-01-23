# NEWTONS APPLE

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

To use this tool, simply move into the directory you want the component installed and then run the napp component command and it will create a file using the compoenntName that you specify (componentName.js) and inside of the file will already be the boilerplate code for a typical React component, including state, lifecycle methods, import, and export lines.  The component itself will also be named based off the name you specify.

### Example

```
$ cd projectName/components
$ napp new componentName
```

# Issues

If you run into any issues using this tool, please first search the issues in the repo to make sure it has not already been reported.  If you don't find anything, please feel free to open a new issue.

# Contributing

I welcome anyone who is interested to come help contribute on this project.  Please be sure to read the [Code of Conduct](https://github.com/tdfranklin/newtons-apple/blob/master/CODE_OF_CONDUCT.md) before contributing.  More information available [here](https://github.com/tdfranklin/newtons-apple/blob/master/CONTRIBUTING.md).

# Upcoming Features

I will try to keep an updated list here of features I plan to implement in this CLI.

1. Set default lifecycle methods included when creating component.
2. Add custom methods to be included in component creation.
3. Redux support (create boilerplate code for projects that use Redux).
4. Add default file structure support so command can be run from home directory and create files in correct location.