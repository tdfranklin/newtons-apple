'use strict';

const componentTemplate = require ('../templates/component');

const getTemplate = (componentName, includedMethods) => {
    let willMount = includedMethods.componentWillMount;
    let willReceiveProps = includedMethods.componentWillReceiveProps;
    let shouldUpdate = includedMethods.shouldComponentUpdate;
    let willUpdate = includedMethods.componentWillUpdate;
    let didMount = includedMethods.componentDidMount;
    let didUpdate = includedMethods.componentDidUpdate;
    let willUnmount = includedMethods.componentWillUnmount;
    let didCatch = includedMethods.componentDidCatch;

    return componentTemplate(componentName, willMount, willReceiveProps, shouldUpdate, 
        willUpdate, didMount, didUpdate, willUnmount, didCatch);
}

module.exports = getTemplate;