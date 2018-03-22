'use strict';

const templateFactory = require('./template-factory');
const { writeFile } = require('../lib/lib-helpers');
const path = require('path');

const createComponent = (name, isDumb, createDir, overwriteFile, options) => {
    let dirPath = path.normalize(path.resolve(name));
    let file = `${dirPath}.js`;
    let compName = path.basename(name);
    let template = isDumb
        ? templateFactory('DUMB_COMPONENT', compName)
        : templateFactory('COMPONENT', compName, options);

    writeFile(file, template, overwriteFile, createDir);
};

const createTest = (name, overwriteFile) => {
    let dirPath = path.normalize(path.resolve(name));
    let file = `${dirPath}.test.js`;
    let compName = path.basename(name);
    let template = templateFactory('COMPONENT_TEST', compName);

    writeFile(file, template, overwriteFile);
};

const createFile = (type, ...args) => {
    switch (type) {
        case 'COMPONENT':
            createComponent(...args);
            return;
        case 'COMPONENT_TEST':
            createTest(...args);
            return;
        default:
            throw Error(
                'A valid type string must be passed as the first arguement'
            );
    }
};

module.exports = createFile;
