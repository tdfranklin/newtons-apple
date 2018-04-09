'use strict';

const fs = require('fs-extra');
const path = require('path');
const createFile = require('./create-file');

const processConfig = (type, name, options, config) => {
    let filePath;
    let fileName = path.parse(name).name;

    if (config.currentProject) {
        let projectName = config.currentProject;
        let project = config.projects[projectName];
        switch (type) {
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
                throw Error('A valid type string must be passed as the first arguement');
        }
    } else {
        filePath = path.normalize(path.resolve(name));
    }

    createFile(type, fileName, filePath, options, config);
};

module.exports = processConfig;
