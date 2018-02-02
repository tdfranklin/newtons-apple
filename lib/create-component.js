'use strict';

const fs = require('fs');
const getComponentTemplate = require('./template-factory');
const path = require('path');

const createComponent = (name, createDir, options) => {
    let dirPath = path.normalize(path.resolve(name));
    let compName = path.basename(name);
    let template = getComponentTemplate(compName, options);

    if (createDir) {
        fs.mkdir(path.dirname(dirPath), 0o777, (err) => {
            if (err)
                if (err.code !== 'EEXIST')
                    throw err;
        });
    }
    
    fs.writeFile(`${dirPath}.js`, template, (err) => {
        if (err)
            if (err.code === 'ENOENT')
                throw 'That path does not exist.  Rerun the command with -c to create the path';
            else
                throw err;
    });
}

module.exports = createComponent;