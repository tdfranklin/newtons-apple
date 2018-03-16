'use strict';

const componentTemplate = require ('../templates/component');
const dumbComponentTemplate = require ('../templates/dumb-component');

const getComponentTemplate = (componentName, isDumb, includedMethods) => {
    if (isDumb) {
        return dumbComponentTemplate(componentName);
    } else {
        return componentTemplate(componentName, includedMethods);
    }
}

module.exports = getComponentTemplate;