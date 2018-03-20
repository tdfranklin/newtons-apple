const questions = require('../bin/questions');

describe('questions', () => {
    it('holds the correct value', () => {
        const expectedVal = [
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

        expect(questions).toEqual(expectedVal);
    });
});
