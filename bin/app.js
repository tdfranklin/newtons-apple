#!/usr/bin/env node
'use strict';

const program = require ('commander');
const fs = require ('fs');
const createComponent = require ('../lib/create-component');

program
    .version('0.0.2', '-v, --version')
    .command('new <component-name>')
    .action( component => createComponent(component));

program.parse(process.argv);