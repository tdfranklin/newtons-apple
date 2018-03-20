const componentTestTemplate = require('../templates/component-test');

describe('componentTestTemplate', () => {
    it('includes the correct name variable', () => {
        const name = 'ComplicatedButton';
        const compTestReturnVal = componentTestTemplate(name);
        const expectedTemplate =
`import React from 'react';
import ReactDOM from 'react-dom';
import ${name} from './${name}';

describe('${name}', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<${name} />, div);
    });
});`;

        expect(compTestReturnVal).toBe(expectedTemplate);
    });
});