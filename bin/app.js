#!/usr/bin/env node
'use strict';

const program = require ('commander');
const Configstore = require('configstore');
const inquirer = require('inquirer');
const pkg = require('../package.json');
const createComponent = require('../lib/create-component');
const questions = require('../lib/questions');
const changeAllSettings = require('./helpers');
let argValue;
// const util = require('util');

const conf = new Configstore('napp-config', {
    componentWillMount: true,
    componentWillReceiveProps: true,
    shouldComponentUpdate: true,
    componentWillUpdate: true,
    componentDidMount: true,
    componentDidUpdate: true,
    componentWillUnmount: true,
    componentDidCatch: true
});

program
    .version(pkg.version, '-v, --version')
    .command('new <component-name>')
    .description('create new component in current directory')
    .option("-a, --all", "enable all methods")
    .option("-n, --none", "disable all methods")
    .action( (component, options) => {
        if (options.all)
            changeAllSettings(true);
        if (options.none)
            changeAllSettings(false);
        createComponent(component, conf.all)
    });
    // .action( component => {
    //     console.log(util.inspect(conf, {showHidden: true, depth: null}));
    // });

program
    .command('setup')
    .description('select lifecycle methods to be included when creating components')
    .action( () => {
        inquirer.prompt(questions).then((answers) => {
            changeAllSettings(false);
            for (let answer of answers.methods) {
                conf.set(answer, true);
            }
        });
    });

program
    .arguments('<arg>')
    .action((arg) => {
        argValue = arg;
        console.error(`Sorry, ${arg} is not a valid command!  Please use -h or --help for valid commands.`);
    });

program.parse(process.argv);

if (typeof argValue === 'undefined') {
    console.error('No command given!  Please use -h or --help for valid commands.');
    process.exit(1);
}