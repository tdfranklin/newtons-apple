const Configstore = require('configstore');
const { formatCompPath } = require('../lib/helpers');
const componentTestTemplate = require('../templates/component-test');

describe('componentTestTemplate', () => {
    let nappConfig;
    beforeAll(() => {
        nappConfig = new Configstore('ctt-napp-config');
        nappConfig.set({
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
            projects: {
                testing: {
                    rootDir: null,
                    componentDir: null,
                    testsDir: null
                }
            }
        });
    });

    afterAll(() => {
        nappConfig.clear()
    });

    it('includes the correct name variable', () => {
        const name = 'ComplicatedButton';
        const compTestReturnVal = componentTestTemplate(name, nappConfig);
        const expectedTemplate =
`import React from 'react';
import ReactDOM from 'react-dom';
import ${name} from '${formatCompPath(name, nappConfig)}';

describe('${name}', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<${name} />, div);
    });
});`;

        expect(compTestReturnVal).toBe(expectedTemplate);
    });
});