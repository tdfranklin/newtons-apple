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

module.exports = { nappConfig, changeAllSettings, ifPathExists, setupProject };
