'use strict';

const fs = require('fs');
const getTemplate = require('./template-factory');

const createComponent = (name) => {
    let path = process.cwd();
    let template = getTemplate('component');
    fs.writeFile(`${path}/${name}.js`, template, (err) => {
        if (err)
            throw err;
    });
}

module.exports = createComponent;