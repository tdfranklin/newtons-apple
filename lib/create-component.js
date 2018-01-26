'use strict';

const fs = require('fs');
const getTemplate = require('./template-factory');

const createComponent = (name, options) => {
    let path = process.cwd();
    let template = getTemplate(name, options);
    fs.writeFile(`${path}/${name}.js`, template, (err) => {
        if (err)
            throw err;
    });
}

module.exports = createComponent;