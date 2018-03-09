'use strict';

const componentTemplate = require ('../templates/component');

const getComponentTemplate = (componentName, includedMethods) => {
    return componentTemplate(componentName, includedMethods);
}

module.exports = getComponentTemplate;