'use strict';

const {nappConfig} = require('./configstore');
const projectName = nappConfig.get('currentProject');

const selectQuestions = [
    {
        type: 'confirm',
        message: 'Would you like to auto-generate tests?',
        name: 'autoGenerateTests'
    },
    {
        type: 'checkbox',
        message: 'Choose lifecycle methods',
        name: 'methods',
        choices: [
            'componentWillMount',
            'componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentDidMount',
            'componentDidUpdate',
            'componentWillUnmount',
            'componentDidCatch'
        ]
    }
];

const correctDir = (confirm = 'correctDir') => {
    return (answers) => {
        return answers[confirm];
    }
};

const validateData = () => {
    return (value) => {
        return (value && value !== '') ? true : 'That is not a valid entry, please try again.';
    }
};

const checkForProject = () => {
    return (answers) => {
        return (!answers.correctDir || projectName) ? false : true;
    }
};

const changeProject = () => {
    return (answers) => {
        return (answers.correctDir && !answers.projectName) ? true : false;
    }
}

const setupQuestions = [
    {
        type: 'confirm',
        message: `Is (${process.cwd()}) the project root directory?`,
        name: 'correctDir',
        default: false
    },
    {
        type: 'input',
        message: 'Please create a name for this project where settings will be saved:',
        name: 'projectName',
        validate: validateData(),
        when: checkForProject()
    },
    {
        type: 'confirm',
        message: `You are currently working in (${projectName}) - would you like to change projects?`,
        name: 'changeProject',
        default: false,
        when: changeProject()
    },
    {
        type: 'input',
        message: 'Please type the name of the project you would like to use:',
        name: 'projectName',
        when: correctDir('changeProject')
    },
    {
        type: 'confirm',
        message: "Would you like to set or change a default path to save components?",
        name: 'changeCompPath',
        default: false,
        when: correctDir()
    },
    {
        type: 'input',
        message: 'Please type the path (from current directory) to component folder:',
        name: 'componentPath',
        validate: validateData(),
        when: correctDir('changeCompPath')
    }
];

module.exports = {selectQuestions, setupQuestions};