#!/usr/bin/env node
'use strict';

const program = require('commander');
const inquirer = require('inquirer');
const pkg = require('../package.json');
const processConfig = require('../lib/process-config');
const { selectQuestions, setupQuestions } = require('./questions');
const { changeAllSettings, nappConfig, setupProject, processConfigView } = require('./configstore');
let argValue;

program
    .version(pkg.version, '-v, --version')
    .command('new <component-name>')
    .description('create new component in either current directory or provided path')
    .option('-d, --dumb', 'set component type to dumb, i.e. functional/stateless')
    .option('-a, --all', 'enable all methods')
    .option('-n, --none', 'disable all methods')
    .option('-c, --create', "creates directories if they don't exist")
    .option('-o, --overwrite', 'overwrites file if it exists')
    .option('-t, --test', 'creates test file for new component')
    .action((componentName, options) => {
        argValue = 'new';
        processConfig('COMPONENT', componentName, options, nappConfig);
    });

program
    .command('select')
    .description('select lifecycle methods to be included when creating components')
    .action(() => {
        argValue = 'select';
        inquirer.prompt(selectQuestions).then(answers => {
            changeAllSettings(false);
            for (let answer of answers.methods) {
                nappConfig.set(answer, true);
            }
        });
    });

program
    .command('setup')
    .description('configure options for Newton\'s Apple')
    .action(() => {
        argValue = 'setup';
        inquirer.prompt(setupQuestions).then(answers => {
            if (!answers.correctDir) {
                console.log('Please run napp setup again from the root directory');
                return;
            }
            nappConfig.set('autoGenerateTests', answers.autoGenerateTests);
            setupProject(
                answers.changeProject,
                answers.projectName,
                answers.componentPath,
                answers.testsPath
            );
        });
    });

program
    .command('config [project]')
    .description('view the options in your config file - including a project name will list the defaults for that project')
    .option('-c, --current', 'show current project name')
    .option('-p, --projects', 'show all project names')
    .option('-m, --methods', 'show lifecycle methods')
    .option('-t, --test', 'show test options')
    .option('-s, --show', 'show path to config file')
    .option('-o, --open', 'open config file')
    .action((project, options) => {
        argValue = 'config';
        processConfigView(project, options);
    });

program
    .command('reset')
    .description('reset NAPP to default usage where it only creates files in current directory')
    .action(() => {
        argValue = 'reset';
        nappConfig.set('currentProject', null);
        console.log('Reset complete.  You can re-run napp setup at anytime to re-enable it\'s features');
    });

program.arguments('<arg>').action(arg => {
    argValue = arg;
    console.error(`Sorry, ${arg} is not a valid command!  Please use -h or --help for valid commands.`);
});

program.parse(process.argv);

if (typeof argValue === 'undefined') {
    console.error('No command given!  Please use -h or --help for valid commands.');
    process.exit(1);
}