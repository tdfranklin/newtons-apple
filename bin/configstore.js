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
    currentProject: null,
    projects: {}
});

const changeAllSettings = (bool, store=nappConfig) => {
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

const ifPathExists = (projects, projectName, path) => {
    if (path) {return path};

    let project = projects[projectName];

    return project ? project.componentDir : null;
}

const setupProject = (changeProject, name, componentPath) => {
    let rootDir = path.resolve(process.cwd());
    let currentProject = nappConfig.get('currentProject') || name;
    let projectName = name || currentProject;
    let projects = nappConfig.get('projects');
    let compPath = ifPathExists(projects, projectName, componentPath);
    let componentDir = compPath ? path.resolve(rootDir, compPath) : null;

    let newProject = {
        ...projects,
        [projectName]: {
            rootDir,
            componentDir
        }
    }

    nappConfig.set({
        currentProject: projectName,
        projects: newProject
    });
};

module.exports = {nappConfig, changeAllSettings, setupProject};