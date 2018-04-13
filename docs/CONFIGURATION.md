# CONFIGURATION

## NAVIGATION

* [Home](../README.md)
* [Basic Usage (napp new)](./BASIC-USAGE.md)
* [Lifecycle Methods (napp select)](./LIFECYCLE-METHODS.md)
* [Create Tests](./TESTS.md)
* [Configuration (napp setup)](#configuration)
  * [NAPP Setup](#napp-setup)
  * [Project Name](#project-name)
  * [Component Directory](#component-directory)
  * [Examples](#examples)
  * [Change Project](#change-project)
  * [Generate Tests](#generate-tests)
  * [Disable Pathing](#napp-reset)
* [View Config File (napp config)](./CONFIG.md)

---

## NAPP SETUP

NAPP Setup is an advanced feature of Newton's Apple that will allow you to specify certain default behavior on how you want NAPP to handle creating files.

First, make sure you run this command from the root directory of the project you plan to use as that is how NAPP will decide the path to use to create files.

``` shell
$ napp setup

? Is (~/current/directory) the project root directory? Yes
```

If you answer "No", then setup will exit and you will be asked to move into the correct directory and run `napp setup` again.

---

## PROJECT NAME

Creating a name for your project is very important as this will be how NAPP determines which project you are working on and which paths to use.  You can name the project anything you like, just make sure it's something you can easily remember in the future.

>### Quick Tip:
>You can save and work on multiple projects with NAPP and quickly swap between them.  Read below for more info.

``` shell
$ napp setup

? Is (~/current/directory) the project root directory? Yes
? Please create a name for this project where settings will be saved: Project Name
```

---

## COMPONENT DIRECTORY

You are then given the option on if you want to save a component directory or not.  If you answer "Yes", you then have to type a path to save as your component directory.  In the example below, this directory would be `~/current/directory/app/components`.  Once you save this option, this means that anytime you run the `napp new` command, the component will automatically be created in this folder instead of the current directory of your shell.

``` shell
$ napp setup

? Is (~/current/directory) the project root directory? Yes
? Please create a name for this project where settings will be saved: Project Name
? Would you like to set or change a default path to save components? Yes
? Please type the path (from current directory) to component folder: app/components
```

---

## EXAMPLES

So the default behavior of Newton's Apple is to create components in the current directory your terminal is in (or in the path passed).  So for example:

``` shell
~/current/directory: napp new my/other/dir/TestComponent
```

>The above command would create the file `~/current/directory/my/other/dir/TestComponent.js`.

This default behavior changes once you run `napp setup`.  Instead, it will first try to create the component in the component directory you specify.  If you did not specify a component directory, then it will instead create it in the root directory that was saved when you ran the command.

For instance, let's say that you ran `napp setup` like the following:

``` shell
~/root/myWebApp: napp setup

? Is (~/root/myWebApp) the project root directory? Yes
? Please create a name for this project where settings will be saved: MyWebApp
? Would you like to set or change a default path to save components? Yes
? Please type the path (from current directory) to component folder: app/home/components

~/current/directory: napp new other/dir/TestComponent
```

>The above command would create the file `~/root/myWebApp/app/home/components/other/dir/TestComponent.js` even though you are not in that directory when using the `napp new` command.  Had you run `napp setup` as above but instead answered "No" on saving a default path for components, it instead would have created the file `~/root/myWebApp/other/dir/TestComponent.js`.
---

## CHANGE PROJECT

After you have saved a project, you can run `napp setup` again to either change settings on the current project or create and swap to a new project.  Using the example from above:

``` shell
~/root/myWebApp: napp setup

? Is (~/root/myWebApp) the project root directory? Yes
? You are currently working in (MyWebApp) - would you like to change projects? No
? Would you like to set or change a default path to save components? Yes
? Please type the path (from current directory) to component folder: app/components
```

If you answer "No" when asked if you want to change projects, you will just be able to update your root and component paths (as seen above).  This would change your component directory to `~/root/myWebApp/app/components`.


``` shell
~/root/newApp: napp setup

? Is (~/root/newApp) the project root directory? Yes
? You are currently working in (MyWebApp) - would you like to change projects? Yes
? Please type the name of the project you would like to use: New App
? Would you like to set or change a default path to save components? Yes
? Please type the path (from current directory) to component folder: home/comp
```

This would create a new project called `New App` and set it's component directory to `~/root/newApp/home/comp` and also change your current project to "New App".  So until you run `napp setup` again and change projects, all components you create will be created in this folder.

>### Quick Tip:
>All projects you create are saved in your config file, so if you want to move back to a previously created project, answer that you want to swap projects then type the name of a previously created project and it will still have the previous information you saved (such as the component directory path).  That way, you do not have to specify that information again.

---

## GENERATE TESTS

You will also be given options to automatically generate tests and also set a default folder to save tests.  Continuing with the example above:

``` shell
~/root/myWebApp: napp setup

? Is (~/root/myWebApp) the project root directory? Yes
? You are currently working in (MyWebApp) - would you like to change projects? No
? Would you like to set or change a default path to save components? Yes
? Please type the path (from current directory) to component folder: app/components
? Would you like to auto-generate tests? Yes
? Would you like to set or change a default path to save tests? Yes
? Please type the path (from current directory) to tests folder: app/tests
```

First, `Would you like to auto-generate tests?`  If you answer yes to this question, then until you turn it off, anytime you create a component, a test file will also be generated.  If you set a path, the test will be created in that directory otherwise it will be created in the same directory as the component.  You can read more about tests and see what the file will look like [here](./TESTS.md).

---

## NAPP RESET

NAPP setup is a useful feature, but if you would like to turn it off and go back to the default usage of Newton's Apple (where the files are created in your current directory), you can simply run `napp reset`.  This will turn off all the default pathing created by running `napp setup` and it will simply go back to creating the files either in your current directory or in the directory you pass with the `napp new` command.

>### Quick Tip:
>Please note that the projects you have saved and paths you have set will not be deleted or altered in any way by running this command, only disabled.  You can easily re-enable the pathing by running `napp setup` again and passing in the project name for the project you wish to work on.

---