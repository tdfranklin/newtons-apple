#!/usr/bin/env node
'use strict';

const program = require('commander');
const inquirer = require('inquirer');
const pkg = require('../package.json');
const processConfig = require('../lib/process-config');
const { selectQuestions, setupQuestions } = require('./questions');
const { changeAllSettings, nappConfig, setupProject } = require('./configstore');
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
        if (options.all) changeAllSettings(true);
        if (options.none) changeAllSettings(false);

        argValue = 'new';
        const componentType = options.dumb ? 'DUMB_COMPONENT' : 'COMPONENT';

        processConfig(componentType, componentName, options, nappConfig.all);
        if (nappConfig.get('autoGenerateTests') || options.test) {
            processConfig('COMPONENT_TEST', componentName, options, nappConfig.all);
        }
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
    .description("configure options for Newton's Apple")
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

program.arguments('<arg>').action(arg => {
    argValue = arg;
    console.error(
        `Sorry, ${arg} is not a valid command!  Please use -h or --help for valid commands.`
    );
});

program.parse(process.argv);

if (typeof argValue === 'undefined') {
    console.error('No command given!  Please use -h or --help for valid commands.');
    process.exit(1);
}
