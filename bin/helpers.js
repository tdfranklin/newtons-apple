'use strict';

const Configstore = require('configstore');
const conf = new Configstore('napp-config');

const changeAllSettings = (bool) => {
    conf.set({
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

module.exports = changeAllSettings;