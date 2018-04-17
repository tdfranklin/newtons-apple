# VIEW CONFIG FILE

## NAVIGATION

* [Home](../README.md)
* [Basic Usage (napp new)](./BASIC-USAGE.md)
* [Lifecycle Methods (napp select)](./LIFECYCLE-METHODS.md)
* [Create Tests](./TESTS.md)
* [Configuration (napp setup)](./CONFIGURATION.md)
* [View Config File (napp config)](#view-config-file)
  * [Help Menu](#help-menu)
  * [View Specific Project](#view-specific-project)
  * [Current Project](#current-project)
  * [All Projects](#all-projects)
  * [Lifecycle Methods](#lifecycle-methods)
  * [Test Options](#test-options)
  * [Path to Config File](#path-to-config-file)
  * [Open Config File](#open-config-file)
  * [Chaining Options](#chaining-options)
  * [View Entire File](#view-entire-file)

---

## HELP MENU

Newton's Apple works with the help of a config file that is saved on your local machine.  It is simply a small .json file that holds your settings and preferences, but we wanted to create a way for you to view those settings.  `napp config` will allow you to view any or all of those settings or even open the config file itself.  There are a lot of options for this command, so just a quick reminder that using the -h or --help flag will allow you to see all of the available options:

```shell
$ napp config -h

    Usage: config [options] [project]

    view the options in your config file - including a project name will list the defaults for  that project

    Options:

        -c, --current   show current project name
        -p, --projects  show all project names
        -m, --methods   show lifecycle methods
        -t, --test      show test options
        -s, --show      show path to config file
        -o, --open      open config file
        -h, --help      output usage information
```

---

## VIEW SPECIFIC PROJECT

If you want to see the settings for a specific project, just include the project name:

```shell
$ napp config MyWebApp

    ------------------------------
    SETTINGS FOR MyWebApp:
    rootDir: /root/myWebApp/app
    componentDir: /root/myWebApp/app/components
    testsDir: /root/myWebApp/app/tests
    ------------------------------
```

---

## CURRENT PROJECT

Pass the -c or --current flag to see the name of your current project:

```shell
$ napp config -c

    ------------------------------
    CURRENT PROJECT: MyWebApp
    ------------------------------
```

---

## ALL PROJECTS

Pass the -p or --projects flag to see a list of all your project names:

```shell
$ napp config -p

    ------------------------------
    PROJECT NAMES:
    MyWebApp
    Project Two
    projectThree
    Project Name
    ------------------------------
```

---

## LIFECYCLE METHODS

Pass the -m or --methods flag to see your settings for lifecycle methods:

```shell
$ napp config -m

    ------------------------------
    LIFECYCLE METHOD SETTINGS:
    componentWillMount: true
    componentWillReceiveProps: true
    shouldComponentUpdate: false
    componentWillUpdate: true
    componentDidMount: true
    componentDidUpdate: false
    componentWillUnmount: true
    componentDidCatch: false
    ------------------------------
```

---

## TEST OPTIONS

Pass the -t or --test flag to see if you have auto generate enabled for tests or not:

```shell
$ napp config -t

    ------------------------------
    TEST SETTINGS:
    You are not currently generating tests automatically
    ------------------------------
```

---

## PATH TO CONFIG FILE

Pass the -s or --show flag to show the path where your config file is saved:

```shell
$ napp config -s

    ------------------------------
    PATH TO CONFIG FILE:
    /path/to/config/file/napp-config.json
    ------------------------------
```

---

## OPEN CONFIG FILE

Pass the -o or --open flag to open your config file in whatever your default program is to view .json files.  

Please note that this is experimental and may not work on all systems and configurations.  If this option does not work for your system, please open an issue and make sure to include your Operating System as well as any details you can provide.

---

## CHAINING OPTIONS

If you want to view multiple options, don't forget that you can chain commands together!

```shell
$ napp config MyWebApp -cpt

    ------------------------------
    SETTINGS FOR MyWebApp:
    rootDir: /root/myWebApp/app
    componentDir: /root/myWebApp/app/components
    testsDir: /root/myWebApp/app/tests
    ------------------------------
    CURRENT PROJECT: MyWebApp
    ------------------------------
    PROJECT NAMES:
    MyWebApp
    Project Two
    projectThree
    Project Name
    ------------------------------
    TEST SETTINGS:
    You are not currently generating tests automatically
    ------------------------------
```

---

## VIEW ENTIRE FILE

If you just want to view the entire .json file in your console, simply don't pass any flags:

```shell
$ napp config

    ------------------------------
    { componentWillMount: true,
      componentWillReceiveProps: true,
      shouldComponentUpdate: false,
      componentWillUpdate: true,
      componentDidMount: true,
      componentDidUpdate: false,
      componentWillUnmount: true,
      componentDidCatch: false,
      autoGenerateTests: false,
      currentProject: 'MyWebApp',
      projects:
       { 'MyWebApp':
          { rootDir: '/root/myWebApp/app',
            componentDir: '/root/myWebApp/app/components',
            testsDir: '/root/myWebApp/app/tests' },
         'Project Two':
          { rootDir: '/root/projectTwo/app',
            componentDir: '/root/projectTwo/app/components' },
         'projectThree':
          { rootDir: '/root/projectThree/app',
         'Project Name':
          { rootDir: '/root/projectName/app',
            componentDir: '/root/projectName/app/components',
            testsDir: '/root/projectName/app/tests' } } }
    ------------------------------
```

---