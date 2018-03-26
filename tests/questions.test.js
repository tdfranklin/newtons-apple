const {selectQuestions} = require('../bin/questions');

describe('questions', () => {
    it('holds the correct value', () => {
        const expectedVal = [
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

        expect(selectQuestions).toEqual(expectedVal);
    });
});
