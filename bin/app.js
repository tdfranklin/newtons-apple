#!/usr/bin/env node
'use strict';

const program = require ('commander');
const Configstore = require('configstore');
const inquirer = require('inquirer');
const pkg = require('../package.json');
const createComponent = require('../lib/create-component');
const questions = require('./questions');
const changeAllSettings = require('./helpers');
let argValue;

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
    .description('create new component in either current directory or provided path')
    .option("-d, --dumb", "set component type to dumb, i.e. functional/stateless")
    .option("-a, --all", "enable all methods")
    .option("-n, --none", "disable all methods")
    .option("-c, --create", "creates directories if they don't exist")
    .option("-o, --overwrite", "overwrites file if it exists")
    .action( (component, options) => {
        if (options.all)
            changeAllSettings(true);
        if (options.none)
            changeAllSettings(false);
        argValue = 'new';
        createComponent(component, options.dumb, options.create, options.overwrite, conf.all)
    });

program
    .command('setup')
    .description('select lifecycle methods to be included when creating components')
    .action( () => {
        argValue = 'setup';
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