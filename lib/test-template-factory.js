'use strict';

const componentTestTemplate = require('../templates/component-test');

const getTestTemplate = componentName => {
    return componentTestTemplate(componentName);
};

module.exports = getTestTemplate;
