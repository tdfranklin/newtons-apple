# BASIC USAGE

## NAVIGATION

* [Home](../README.md)
* [Basic Usage (napp new)](#basic-usage)
  * [Napp New Command](#napp-new-command)
  * [Custom Extension](#custom-extension)
  * [Include Path](#include-path)
  * [Create Path](#create-path)
  * [Overwrite File](#overwrite-file)
  * [Dumb Components](#dumb-components)
  * [Chain Commands](#chain-commands)
* [Lifecycle Methods (napp select)](./LIFECYCLE-METHODS.md)
* [Configuration (napp setup)](./CONFIGURATION.md)

---

## NAPP NEW COMMAND

To use this tool, simply run the `napp new` command and it will create a file using the componentName that you specify (MyComponent.js) and inside of the file will already be the boilerplate code for a typical React component, including state, default props, lifecycle methods, import and export lines.  The component itself will also be named based off the name you specify.

>### Quick Tip:
>By default, components created with NAPP are smart (stateful) components.  However, you can create a dumb (stateless) component by passing the -d or --dumb flag (more info [here](#dumb-components)]).  Also, by default all of the React lifecycle methods are included, but this can also easily be customized (read about it [here](./LIFECYCLE-METHODS.md)).

### Example

``` shell
$ napp new MyComponent
```

This will create a file named MyComponent.js in your current directory with all of the boilerplate code for a React component:

``` javascript
import React, { Component } from 'react';

class MyComponent extends Component {
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

export default MyComponent;
```

---

## CUSTOM EXTENSION

By default, all files created by NAPP include the .js extension.  If you would like the file to have a custom extension (like .jsx), simply include it with your component name.  For Example:

``` shell
$ napp new MyComponent.jsx
```

This will create the file `current_directory/MyComponent.jsx`.

---

## INCLUDE PATH

If you want to create the file in another directory, simply include the path from your current directory in with the command like below:

``` shell
$ napp new dirOne/dirTwo/ComponentName
```

This will create the component in `current_directory/dirOne/dirTwo/ComponentName.js`.  You will get an error back if either that directory does not exist OR if there is already a file in that directory with the name you specified.  However, there are two options you can pass to resolve these issues.

---

### CREATE PATH

If you would like to create the directory path if it doesn't already exist, just make sure to add the -c or --create option on the command:

``` shell
$ napp new dirOne/dirTwo/ComponentName -c
```

This will check to see if `current_directory/dirOne/dirTwo` exists.  If it exists already, it will create `ComponentName.js` in the `dirTwo` directory.  If it doesn't exist, it will create the path, then create `ComponentName.js` in the `dirTwo` directory.

---

### OVERWRITE FILE

If you would like to overwrite the file if it already exists, simply pass the -o or --overwrite option.

``` shell
$ napp new dirOne/dirTwo/ComponentName -o
```

---

## DUMB COMPONENTS

If you want to create a dumb (stateless) component, simply pass the -d or --dumb flag to the command:

``` shell
$ napp new MyDumbComponent -d
```

Will create a file named myDumbComponent.js that looks like this:

```javascript
import React from 'react';

const MyDumbComponent = (props) => {
    return (
        <div>
            <h3>Hello World</h3>
        </div>
    );
};

export default MyDumbComponent;
```

---

## CHAIN COMMANDS

You are also able to chain multiple options together:

``` shell
$ napp new dirOne/dirTwo/ComponentName -cod
```

The above command would create a dumb component at `current_directory/dirOne/dirTwo/ComponentName.js`.  It would create the path if it did not exist and if there was already a file called ComponentName.js in that path, it would overwrite it.

---