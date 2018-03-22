'use strict';

const Configstore = require('configstore');
const conf = new Configstore('napp-config');

const helper = {
    changeAllSettings(bool, store = conf) {
        store.set({
            componentWillMount: bool,
            componentWillReceiveProps: bool,
            shouldComponentUpdate: bool,
            componentWillUpdate: bool,
            componentDidMount: bool,
            componentDidUpdate: bool,
            componentWillUnmount: bool,
            componentDidCatch: bool
        });
    }
};

module.exports = helper;
