'use strict';

const componentTemplate = require ('../templates/component');
const dumbComponentTemplate = require ('../templates/dumbComponent');

const getComponentTemplate = (componentName, dumb, includedMethods) => {
    if (dumb) {
        return dumbComponentTemplate(componentName);
    } else {
        return componentTemplate(componentName, includedMethods);
    }
}

module.exports = getComponentTemplate;