'use strict';

const QUESTIONS = [
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