'use strict';

const componentTestTemplate = name => {
    let template =
`import React from 'react';
import ReactDOM from 'react-dom';
import ${name} from './${name}';

describe('${name}', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<${name} />, div);
    });
});`;

    return template;
};

module.exports = componentTestTemplate;