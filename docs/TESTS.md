# CREATE TESTS

## NAVIGATION

* [Home](../README.md)
* [Basic Usage (napp new)](./BASIC-USAGE.md)
* [Lifecycle Methods (napp select)](./LIFECYCLE-METHODS.md)
* [Tests](#create-tests)
  * [Test Library](#test-library)
  * [Test Template](#test-template)
  * [Generate Test](#generate-test)
  * [Auto Generate](#auto-generate)
  * [Test Directory](#test-directory)
* [Configuration (napp setup)](./CONFIGURATION.md)
* [View Config File (napp config)](./CONFIG.md)

---

## TEST LIBRARY

Currently, Newton's Apple is only generating tests using the Jest testing suite, but we plan to create support for other popular libraries (Mocha/Chai, Jasmine, etc) in the near future.  If there is a particular suite you would like to see us add support for, please open an issue and we will make sure to prioritize getting that added for you.

---

## TEST TEMPLATE

When you create a test, the filename will be the same as your component name only with the .test.js affix.  For instance, if you run `napp new MyComponent -t`, not only will it create a file for the component (`current_directory/MyComponent.js`), but it will also create a test file (`current_directory/MyComponent.test.js`).  The template inside of the file will be:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MyComponent />, div);
    });
});
```

---

## GENERATE TEST

As already stated above, the default way to create a test file is to pass the -t or --test flag to the `napp new` command.  This will create the file in the same directory as your component.  You can also run `napp setup` to have NAPP automatically generate tests with every component you create and/or save them in a different directory.  Read on for more information.

---

## AUTO GENERATE

If you want to generate a test file every time you create a component, but get tired of having to pass the -t flag each time, you can simply run `napp setup` and tell it auto generate tests for you.

``` shell
~/root/myWebApp: napp setup

? Is (~/root/myWebApp) the project root directory? Yes
? You are currently working in (MyWebApp) - would you like to change projects? No
? Would you like to set or change a default path to save components? No
? Would you like to auto-generate tests? Yes
? Would you like to set or change a default path to save tests? No
```

Once you have set this option, until you turn it off, every component you create with the `napp new` command will also generate a test file.  To disable, simply run `napp setup` again and answer "No" to the question.

---

## TEST DIRECTORY

If you have a separate test folder where you want your tests stored, simply run `napp setup` and declare the path to that folder when asked and then until you disable the feature or change projects, all test files will be created in that folder.  This works very similarly to the way [component directories](./CONFIGURATION.md#component-directory) work.

### Example:

Let's say you are working in ~/root/myWebApp and run `napp setup`:

``` shell
~/root/myWebApp: napp setup

? Is (~/root/myWebApp) the project root directory? Yes
? Please create a name for this project where settings will be saved: MyWebApp
? Would you like to set or change a default path to save components? Yes
? Please type the path (from current directory) to component folder: app/components
? Would you like to auto-generate tests? Yes
? Would you like to set or change a default path to save tests? Yes
? Please type the path (from current directory) to tests folder: app/tests

~/current/directory: napp new MyComponent
```

This will create two files since auto-generate is enabled (otherwise it would only create the component unless you pass the -t or --test flag) - `~/root/myWebApp/app/components/MyComponent.js` and `~/root/myWebApp/app/tests/MyComponent.test.js`.

>### Quick Tip:
>When the test file is created, the import line to import the component will be the correct relative path to where your component is saved, even if they are in different directories.

---