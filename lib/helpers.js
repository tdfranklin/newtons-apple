'use strict';

const fs = require('fs-extra');
const path = require('path');
const { nappConfig } = require('../bin/configstore');

const helpers = {
    writeFile(file, template, overwriteFile, createDir = null) {
        fs.pathExists(file, (err, exists) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (exists && !overwriteFile) {
                console.error(
                    'A file with that name already exists.  Rerun the command with -o or --overwrite to overwrite the file'
                );
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
                                console.error(
                                    'That path does not exist.  Rerun the command with -c or --create to create the path'
                                );
                                return;
                            } else {
                                console.error(err.message);
                                return;
                            }
                    });
                }
            }
        });
    },
    formatCompPath(name, config = nappConfig) {
        let currentProject = config.get('currentProject');
        let compPath;

        if (currentProject) {
            let project = config.get('projects')[currentProject];
            let rootDir = path.basename(project.rootDir);
            let splitTestsPath = project.testsDir.split('/');
            let compDirPath = '';
            for (let i = splitTestsPath.length - 1; i > 0; i--) {
                if (splitTestsPath[i] === rootDir) {
                    break;
                } else {
                    compDirPath += '../';
                }
            }

            compDirPath += project.componentDir.split(`${rootDir}/`)[1];
            compPath = project.componentDir
                ? `${compDirPath}/${name}`
                : path.resolve(project.rootDir, name);
        } else {
            compPath = `./${name}`;
        }

        return compPath;
    }
};

module.exports = helpers;
