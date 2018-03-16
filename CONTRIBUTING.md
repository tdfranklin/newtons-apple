# Contributing

If you would like to contribute to this project, please follow a few simple rules below.

1. First, and most importantly, make sure you read and follow the [Code of Conduct](https://github.com/tdfranklin/newtons-apple/blob/master/CODE_OF_CONDUCT.md).  Let's make sure we treat everyone with respect.

2. Secondly, I would like to keep Newton's Apple as simple and lightweight as possible, so try to avoid adding dependencies where possible.  With that said, I also want it to be as useful as possible for React developers, so I'd much rather add more dependencies to achieve that goal.

3. File structure - while I'm sure this will change a good bit over time, currently the structure I'm following is:

   * /bin - files that deal directly with the CLI features (namely Commander and Inquirer).
   * /lib - files that deal with creating files/templates, logic, etc.
   * /templates - files that are the actual boilerplate code to input into files.

4. Just to keep things consistent, the naming convention I'm using for Newton's Apple is snake-case for file names and camelCase for function/variable names.  Please try to stay with this convention where possible, but if there's some issue with that, just let me know and we can discuss it.

5. Please use ES6 as allowed by Node.  You can read the docs [here](https://nodejs.org/en/docs/es6/).

6. Make sure any changes you make will work correctly in Windows, Linux, and OSX.  Node's path module is your friend!

7. Don't be afraid to ask questions or make suggestions, even if you don't want to code it yourself!  I would love to hear your feedback!  Or if you need help getting started, don't be afraid to ask me and I'll be more than happy to help as much as I can!

---

To get started, just fork this repository, pull down to your local machine and start coding.  Once you have finished writing and testing, feel free to send a pull request and I'll take a look!  Hopefully before long I'll have several other collaborator's and we'll be able to really turn Newton's Apple into something great!