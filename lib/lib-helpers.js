'use strict';

const fs = require('fs-extra');

const helper = {
    writeFile(file, template, overwriteFile, createDir=null) {
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
    }
};

module.exports = helper;