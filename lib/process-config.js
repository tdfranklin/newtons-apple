'use strict';

const fs = require('fs-extra');
const getComponentTemplate = require('./template-factory');
const path = require('path');

const createFile = (file, template, options) => {
    fs.pathExists(file, (err, exists) => {
        if (err) {
            console.error(err.message);
            return;
        }
        if (exists && !options.overwrite) {
            console.error('A file with that name already exists.  Rerun the command with -o or --overwrite to overwrite the file');
            return;
        } else {
            if (options.create) {
                fs.outputFile(file, template, (err) => {
                    if (err)
                        console.error(err.message);
                        return;
                });
            } else {
                fs.writeFile(file, template, (err) => {
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

const processConfig = (name, options, config) => {
    let filePath;
    let fileName = path.parse(name);
    let template = getComponentTemplate(fileName.name, options.isDumb, config);

    if (config.currentProject) {
        let projectName = config.currentProject;
        let project = config.projects[projectName];
        filePath = project.componentDir ? 
            path.resolve(project.componentDir, name) : 
            path.resolve(project.rootDir, name);
    } else {
        filePath = path.normalize(path.resolve(name));
    }

    let file = fileName.ext ? filePath : `${filePath}.js`;
    createFile(file, template, options);
};

module.exports = processConfig;