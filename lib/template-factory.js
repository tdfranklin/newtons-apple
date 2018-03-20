'use strict';

const componentTemplate = require('../templates/component');
const dumbComponentTemplate = require('../templates/dumb-component');
const componentTestTemplate = require('../templates/component-test');

const templateFactory = (template, ...args) => {
    console.log(...args)
    switch (template) {
        case 'COMPONENT':
            return componentTemplate(...args);
        case 'DUMB_COMPONENT':
            return dumbComponentTemplate(...args);
        case 'COMPONENT_TEST':
            return componentTestTemplate(...args);
        default:
            throw Error('A valid template string must be passed as the first arguement');
    }
};

module.exports = templateFactory;

