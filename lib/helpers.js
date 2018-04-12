'use strict';

const fs = require('fs-extra');
const path = require('path');
const { nappConfig } = require('../bin/configstore');

const writeFile = (file, template, overwriteFile, createDir = null) => {
    fs.pathExists(file, (err, exists) => {
        if (err) {
            console.error(err.message);
            return;
        }
        if (exists && !overwriteFile) {
            console.error('A file with that name already exists.  Rerun the command with -o or --overwrite to overwrite the file');
            return;
        } else {
            if (createDir) {
                fs.outputFile(file, template, err => {
                    if (err) console.error(err.message);
                    return;
                });
            } else {
                fs.writeFile(file, template, err => {
                    if (err)
                        if (err.code === 'ENOENT') {
                            console.error('That path does not exist.  Rerun the command with -c or --create to create the path');
                            return;
                        } else {
                            console.error(err.message);
                            return;
                        }
                });
            }
        }
    });
};

const formatCompPath = (componentName, config = nappConfig) => {
    let currentProject = config.get('currentProject');
    let componentPath;

    if (currentProject) {
        let project = config.get('projects')[currentProject];

        if (project.componentDir) {
            if (project.componentDir === project.testsDir) {
                componentPath = `./${componentName}`;
            } else {
                componentPath = `${path.relative(project.testsDir, project.componentDir)}/${componentName}`;
            }
        }
    } else {
        componentPath = `./${componentName}`;
    }

    return componentPath;
};

const formatFilePath = (fileType, fileName, filePath) => {
    let parsedPathObj = path.parse(filePath);
    switch (fileType) {
        case 'COMPONENT':
            return parsedPathObj.ext ? filePath : `${filePath}.js`;
        case 'DUMB_COMPONENT':
            return parsedPathObj.ext ? filePath : `${filePath}.js`;
        case 'COMPONENT_TEST':
            return path.resolve(parsedPathObj.dir, `${fileName}.test.js`);
        default:
            throw Error('A valid fileType string must be passed as the first argument');
    }
};

module.exports = { writeFile, formatCompPath, formatFilePath };
