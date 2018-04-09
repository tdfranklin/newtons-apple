'use strict';

const { formatCompPath } = require('../lib/helpers');

const componentTestTemplate = (name, config) => {
    let template =
`import React from 'react';
import ReactDOM from 'react-dom';
import ${name} from '${formatCompPath(name, config)}';

describe('${name}', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<${name} />, div);
    });
});`;

    return template;
};

module.exports = componentTestTemplate;
