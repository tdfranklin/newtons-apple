const Configstore = require('configstore');
const { formatCompPath } = require('../lib/helpers');
const templateFactory = require('../lib/template-factory');

describe('getComponentTemplate', () => {
    let includedMethods, nappConfig;

    beforeAll(() => {
        includedMethods = {
            componentWillMount: true,
            componentWillReceiveProps: true,
            shouldComponentUpdate: true,
            componentWillUpdate: true,
            componentDidMount: true,
            componentDidUpdate: true,
            componentWillUnmount: true,
            componentDidCatch: true
        };
        nappConfig = new Configstore('test-napp-config');
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

    it('calls the dumbComponentTemplate correctly', () => {
        const componentName = 'UglyButton';
        const returnedTemplate = templateFactory(
            'DUMB_COMPONENT',
            componentName
        );
        const expectedTemplate =
`import React from 'react';

const ${componentName} = (props) => {
    return (
        <div>
            <h3>Hello World</h3>
        </div>
    );
};

export default ${componentName};`;

        expect(returnedTemplate).toBe(expectedTemplate);
    });

    it('calls the componentTemplate correctly', () => {
        const componentName = 'ComplicatedButton';
        const returnedTemplate = templateFactory(
            'COMPONENT',
            componentName,
            includedMethods
        );
        const expectedTemplate =
`import React, { Component } from 'react';

class ${componentName} extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    static defaultProps = {
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
    }

    componentWillUpdate(nextProps, nextState) {
    }

    render() {
        return (
            <div>
                <h3>Hello World</h3>
            </div>
        );
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }

    componentDidCatch(error, info) {
    }
}

export default ${componentName};`;

        expect(returnedTemplate).toBe(expectedTemplate);
    });

    it('calls the componentTestTemplate correctly', () => {
        const componentName = 'UglyButton';
        const returnedTemplate = templateFactory(
            'COMPONENT_TEST',
            componentName,
            nappConfig
        );
        const expectedTemplate =
`import React from 'react';
import ReactDOM from 'react-dom';
import ${componentName} from './${componentName}';

describe('${componentName}', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<${componentName} />, div);
    });
});`;

        expect(returnedTemplate).toBe(expectedTemplate);
    });

    it('throws an error if template argument passed is not an accepted case', () => {
        expect(() => templateFactory('class_component')).toThrowError('A valid template string must be passed as the first arguement');
    });
});
