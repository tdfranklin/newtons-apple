'use strict';

const templateFactory = require('./template-factory');
const { writeFile } = require('../lib/helpers');
const path = require('path');

const createComponent = (fileName, filePath, options, configObj) => {
    let fileObj = path.parse(filePath);
    filePath = fileObj.ext ? filePath : `${filePath}.js`;
    let template = options.dumb
        ? templateFactory('DUMB_COMPONENT', fileName)
        : templateFactory('COMPONENT', fileName, configObj);

    writeFile(filePath, template, options.overwrite, options.createDir);
};

const createTest = (fileName, filePath, options, configObj, configStore) => {
    let dirPath = path.dirname(filePath);
    filePath = path.resolve(dirPath, `${fileName}.test.js`);
    let template = templateFactory('COMPONENT_TEST', fileName, configStore);

    writeFile(filePath, template, options.overwrite);
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
            throw Error('A valid type string must be passed as the first arguement');
    }
};

module.exports = createFile;
