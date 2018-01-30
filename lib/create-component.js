'use strict';

const fs = require('fs');
const getTemplate = require('./template-factory');
const path = require('path');

const createComponent = (name, options) => {
    let dirPath = path.normalize(path.resolve(name));
    let compName = path.basename(name);
    let template = getTemplate(compName, options);
    fs.writeFile(`${dirPath}.js`, template, (err) => {
        if (err)
            throw err;
    });
}

module.exports = createComponent;