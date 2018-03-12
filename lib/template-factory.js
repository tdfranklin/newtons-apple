'use strict';

const componentTemplate = require ('../templates/component');
const dumbComponentTemplate = require ('../templates/dumbComponent');

const getComponentTemplate = (componentName, isDumb, includedMethods) => {
    if (isDumb) {
        return dumbComponentTemplate(componentName);
    } else {
        return componentTemplate(componentName, includedMethods);
    }
}

module.exports = getComponentTemplate;