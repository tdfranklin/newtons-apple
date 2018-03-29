# LIFECYCLE METHODS

## NAVIGATION

* [Home](../README.md)
* [Basic Usage (napp new)](./BASIC-USAGE.md)
* [Lifecycle Methods (napp select)](#lifecycle-methods)
  * [All/None Options](#options)
  * [NAPP Select](#napp-select)
* [Configuration (napp setup)](./CONFIGURATION.md)

---

## OPTIONS

By default, all React lifecycle methods are included when you create a new component.  However, you can customize this in two ways.

First, to disable all lifecycle methods, and thereby create a component with only the state, default props, render method, import and export lines, you can just pass either -n or --none to the command.  To enable all lifecycle methods, pass the -a or --all option:

### Example

``` shell
$ napp new ComponentName --none
$ napp new ComponentName -a
```

A file with no lifecycle methods will look like:

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

    render() {
        return (
            <div>
                <h3>Hello World</h3>
            </div>
        );
    }
}

export default MyComponent;
```

---

## NAPP SELECT

You can customize your component even further to only include certain lifecycle methods, by using `napp select` before creating your component:

### Example

```
$ napp select
? Choose lifecycle methods (Press <space> to select, <a> to toggle all, <i> to inverse selection)
❯◯ componentWillMount
 ◯ componentWillReceiveProps
 ◯ shouldComponentUpdate
 ◯ componentWillUpdate
 ◯ componentDidMount
 ◯ componentDidUpdate
 ◯ componentWillUnmount
(Move up and down to reveal more choices)

$ napp new ComponentName
```

>### Quick Tip:
>Also please note that when you make a change with `napp select`, those changes will be saved to your config.  So all components you create with `napp new` will include those methods until you either run select again or pass the -a or -n options to the `napp new` command.

---