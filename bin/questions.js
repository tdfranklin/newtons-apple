'use strict';

const QUESTIONS = [
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
]

module.exports = QUESTIONS;