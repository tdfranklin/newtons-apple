'use strict';

const fs = require('fs-extra');
const path = require('path');
const { changeAllSettings } = require('../bin/configstore');
const createFile = require('./create-file');

const processConfig = (fileType, name, options, config) => {
    let filePath;
    let fileName = path.parse(name).name;

    if (options.all) changeAllSettings(true);
    if (options.none) changeAllSettings(false);

    if (config.get('currentProject')) {
        let projectName = config.get('currentProject');
        let project = config.get('projects')[projectName];
        switch (fileType) {
            case 'COMPONENT':
                filePath = project.componentDir
                    ? path.resolve(project.componentDir, name)
                    : path.resolve(project.rootDir, name);
                break;
            case 'COMPONENT_TEST':
                filePath = project.testsDir
                    ? path.resolve(project.testsDir, name)
                    : path.resolve(project.rootDir, name);
                break;
            default:
                throw Error('A valid type string must be passed as the first argument');
        }
    } else {
        filePath = path.normalize(path.resolve(name));
    }

    if (options.dumb) fileType = 'DUMB_COMPONENT';

    createFile(fileType, fileName, filePath, options, config.all);
    if (fileType !== 'COMPONENT_TEST' && (config.get('autoGenerateTests') || options.test)) {
        processConfig('COMPONENT_TEST', fileName, options, config);
    }
};

module.exports = processConfig;
