'use strict';

const Configstore = require('configstore');
const path = require('path');
const nappConfig = new Configstore('napp-config', {
    componentWillMount: true,
    componentWillReceiveProps: true,
    shouldComponentUpdate: true,
    componentWillUpdate: true,
    componentDidMount: true,
    componentDidUpdate: true,
    componentWillUnmount: true,
    componentDidCatch: true,
    autoGenerateTests: false,
    currentProject: null,
    projects: {}
});

const changeAllSettings = (bool, store = nappConfig) => {
    store.set({
        componentWillMount: bool,
        componentWillReceiveProps: bool,
        shouldComponentUpdate: bool,
        componentWillUpdate: bool,
        componentDidMount: bool,
        componentDidUpdate: bool,
        componentWillUnmount: bool,
        componentDidCatch: bool
    });
};

const ifPathExists = (fileType, projects, projectName, filePath) => {
    if (filePath) {
        return filePath;
    }

    let project = projects[projectName];

    switch (fileType) {
        case 'COMPONENT':
            return project ? project.componentDir : null;
        case 'TEST':
            return project ? project.testsDir : null;
        default:
            throw Error('A valid type string must be passed in as the first argument');
    }
};

const setupProject = (changeProject, name, componentPath, testsPath, config = nappConfig) => {
    let rootDir = path.resolve(process.cwd());
    let currentProject = config.get('currentProject') || name;
    let projectName = name || currentProject;
    let projects = config.get('projects');
    let compPath = ifPathExists('COMPONENT', projects, projectName, componentPath);
    let componentDir = compPath ? path.resolve(rootDir, compPath) : null;
    let testPath = ifPathExists('TEST', projects, projectName, testsPath);
    let testsDir = testPath ? path.resolve(rootDir, testPath) : null;

    let newProject = {
        ...projects,
        [projectName]: {
            rootDir,
            componentDir,
            testsDir
        }
    };

    config.set({
        currentProject: projectName,
        projects: newProject
    });
};

const processConfigView = (project, options) => {
    console.log('------------------------------');
    if (project) {
        const projects = nappConfig.get('projects');
        const currentProject = projects[project];
        console.log(`SETTINGS FOR ${project}:`);
        for (let key in currentProject) {
            console.log(`${key}: ${currentProject[key]}`);
        }
        console.log('------------------------------');
    }

    if (options.current) {
        const currentProject = nappConfig.get('currentProject');
        console.log(`CURRENT PROJECT: ${currentProject}`);
        console.log('------------------------------');
    }

    if (options.projects) {
        console.log('PROJECT NAMES:');
        const projects = nappConfig.get('projects');
        for (let key in projects) {
            console.log(key);
        }
        console.log('------------------------------');
    }

    if (options.methods) {
        console.log('LIFECYCLE METHOD SETTINGS:')
        for (let key in nappConfig.all) {
            if (key === 'autoGenerateTests') break;
            console.log(`${key}: ${nappConfig.all[key]}`);
        }
        console.log('------------------------------');
    }

    if (options.test) {
        console.log('TEST SETTINGS:')
        let message = nappConfig.get('autoGenerateTests') ?
            'You are currently automatically generating tests' : 
            'You are not currently generating tests automatically';
        console.log(message);
        console.log('------------------------------')
    }

    if (options.show) {
        console.log('PATH TO CONFIG FILE:');
        console.log(nappConfig.path);
        console.log('------------------------------');
    }
    
    if (options.open) {
        const filePath = nappConfig.path;
        const exec = require('child_process').exec;

        const getCommandLine = () => {
            switch(process.platform) {
                case 'darwin' : return 'open';
                case 'win32' : return 'start';
                case 'win64' : return 'start';
                default : return 'xdg-open';
            }
        };

        const child = exec(`${getCommandLine()} ${filePath}`, (err, stdout, stderr) => {
            if (err) console.error(err);
        });
        child.on('close', (code) => {
            console.log('config opening...');
        });
    }

    if (!project && !options.current && !options.projects && !options.methods && !options.test && !options.show && !options.open) {
        console.log(nappConfig.all);
        console.log('------------------------------');
    }
};

module.exports = { nappConfig, changeAllSettings, ifPathExists, setupProject, processConfigView };
