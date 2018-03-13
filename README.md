# NEWTON'S APPLE
[![GitHub package version](https://img.shields.io/github/package-json/v/tdfranklin/newtons-apple.svg)]()
[![npm](https://img.shields.io/npm/dt/newtons-apple.svg)]()
[![npm](https://img.shields.io/npm/l/newtons-apple.svg)]()
[![GitHub issues](https://img.shields.io/github/issues/tdfranklin/newtons-apple.svg)]()
[![CircleCI](https://img.shields.io/circleci/project/github/tdfranklin/newtons-apple.svg)]()

[![NPM](https://nodei.co/npm/newtons-apple.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/newtons-apple/)

Newton's Apple is a Command Line Interface(CLI) tool to simplify component creation for developers working on ReactJS projects.  Running a simple command, it will create a file with the name you specify and generate the boilerplate code for a typical React component.

# Installation

To install, first make sure you have Node installed.  If you see a version number, you will be able to install Newton's Apple via NPM as below:

```
$ node -v
v8.9.4
$ npm install -g newtons-apple
```

# Usage

## TLDR

---

Read below for detailed instructions on how to use Newton's Apple and the flags that you can include.  However, you can also use the -h or --help flag to see your various options:

```
$ napp -h

    Usage: napp [options] [command] <arg>

    Options:
        -v, --version  output the version number
        -h, --help     output usage information

    Commands:
        new [options] <component-name>  create new component in either current directory or provided path
        setup                           select lifecycle methods to be included when creating components
```

```
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

To use this tool, simply run the `napp new` command and it will create a file using the componentName that you specify (myComponent.js) and inside of the file will already be the boilerplate code for a typical React component, including state, default props, lifecycle methods, import and export lines.  The component itself will also be named based off the name you specify.

### Example

```
$ napp new myComponent
```

This will create a file called componentName.js in your current directory with all of the boilerplate code for a React component:

``` javascript
import React, { Component } from 'react';

class myComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    static defaultProps = {
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps){
    }

    shouldComponentUpdate(nextProps, nextState){
    }

    componentWillUpdate(nextProps, nextState){
    }

    render() {
        return (
            <div>
                <h3>Hello World</h3>
            </div>
        );
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState){
    }

    componentWillUnmount() {
    }

    componentDidCatch(error, info){
    }
}

export default myComponent;
```

If you want to create the file in another directory, simply include the path from your current directory in with the command like below:

```
$ napp new dirOne/dirTwo/componentName
```

This will create the component in current_directory/dirOne/dirTwo/componentName.js.  You will get an error back if either that directory does not exist OR if there is already a file in that directory with the name you specified.  However, there are two options you can pass to resolve these issues.

---
### CREATE PATH

If you would like to create the directory path if it doesn't already exist, just make sure to add the -c or --create option on the command:

```
$ napp new dirOne/dirTwo/componentName -c
```

This will check to see if current_directory/dirOne/dirTwo exists.  If it exists already, it will create componentName.js in this directory.  If it doesn't exist, it will create the directories, then create componentName.js.

---
### OVERWRITE FILE

If you would like to overwrite the file if it already exists, simply pass the -o or --overwrite option.

```
$ napp new dirOne/dirTwo/componentName -o
```

---
---
## Lifecycle Method Options

By default, all React lifecycle methods are included when you create a new component.  However, you can customize this in two ways.

First, to disable all lifecycle methods, and thereby create a component with only the state, default props, render method, import and export lines, you can just pass either -n or --none to the command.  To enable all lifecycle methods, pass the -a or --all option:

### Example

```
$ napp new componentName --none
$ napp new componentName -a
```

A file with no lifecycle methods will look like:

``` javascript
import React, { Component } from 'react';

class myComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    static defaultProps = {
    }

    render() {
        return (
            <div>
                <h3>Hello World</h3>
            </div>
        );
    }
}

export default myComponent;
```

You are also able to chain multiple options together:

```
$ napp new dirOne/dirTwo/componentName -aco
```

The above command would create a file current_directory/dirOne/dirTwo/componentName.js with all lifecycle methods added.  It would create the path if it did not exist and if there was already a file called componentName.js in that path, it would overwrite it.

---
## NAPP SETUP

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

Also please note that when you make a change, those changes will be saved.  So all components you create with 'napp new' will include those methods until you either run setup again or pass -a/-n options to the napp new command.

---
## Dumb/Stateless Components

If you want to create a stateless component, simply pass the -d or --dumb flag to the command:

```
$ napp new myDumbComponent -d
```

Will create a file named myDumbComponent.js that looks like this:

```javascript
import React from 'react';

const myDumbComponent = (props) => {
  return (
    <div>
      <h3>Hello World</h3>
    </div>
  );
};

export default myDumbComponent;
```

# Issues

If you run into any issues using this tool, please first search the issues in the repo to make sure it has not already been reported.  If you don't find anything, please feel free to open a new issue.

# Contributing

I welcome anyone who is interested to come help contribute on this project.  The most important contribution you can make is to install and test the app.  Please leave feedback on what you like, didn't like, any features you would like to see added, and create issues for any bugs you find!

If you would like to resolve any issues or add a feature yourself, please be sure to read the [Code of Conduct](https://github.com/tdfranklin/newtons-apple/blob/master/CODE_OF_CONDUCT.md) and [Contributing](https://github.com/tdfranklin/newtons-apple/blob/master/CONTRIBUTING.md) before submitting any pull requests.

# Upcoming Features

I will try to keep an updated list here of features I plan to implement in this CLI.

1. Jest support (create boilerplate for Jest tests for components).
2. Redux support (create boilerplate code for projects that use Redux). 
3. Add default file structure support.
4. Add custom methods to be included in component creation.