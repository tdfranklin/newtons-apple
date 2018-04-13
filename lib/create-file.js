'use strict';

const templateFactory = require('./template-factory');
const { writeFile, formatFilePath } = require('../lib/helpers');
const path = require('path');

const createFile = (fileType, ...args) => {
    let [fileName, filePath, options, projectConfig, configstore] = args;
    filePath = formatFilePath(fileType, fileName, filePath);

    let template;
    switch (fileType) {
        case 'COMPONENT':
            template = templateFactory(fileType, fileName, projectConfig);
            break;
        case 'DUMB_COMPONENT':
            template = templateFactory(fileType, fileName)
            break;
        case 'COMPONENT_TEST':
            template = templateFactory(fileType, fileName, configstore);
            break;
        default:
            throw Error('A valid fileType string must be passed as the first argument');
    }

    writeFile(filePath, template, options.overwrite, options.create);
};

module.exports = createFile;
