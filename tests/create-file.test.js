const createFile = require('../lib/create-file');
const { formatCompPath } = require('../lib/helpers');
const fs = require('fs-extra');
const path = require('path');
const Configstore = require('configstore');

describe('createFile', () => {
    let compName,
        options,
        includedMethods,
        tempTestsDirPath,
        testFilePath,
        pathCheck,
        readFile,
        timeOut,
        nappConfig;
    beforeAll(() => {
        compName = 'EvilButton';
        options = {
            dumb: false,
            all: false,
            none: false,
            create: false,
            overwrite: false,
            test: false
        };
        includedMethods = {
            componentWillMount: true,
            componentWillReceiveProps: true,
            shouldComponentUpdate: false,
            componentWillUpdate: true,
            componentDidMount: true,
            componentDidUpdate: false,
            componentWillUnmount: true,
            componentDidCatch: false
        };
        tempTestsDirPath = path.normalize(
            path.resolve(__dirname, 'temp-create-file-directory')
        );
        testFilePath = path.normalize(path.resolve(tempTestsDirPath, compName));

        pathCheck = aPath => {
            return fs.pathExists(aPath);
        };

        readFile = async (file) => {
            return await fs.readFile(file, 'utf8');
        };

        timeOut = async () => {
            return new Promise(resolve => {
                setTimeout(() => resolve(), 100);
            });
        };

        nappConfig = new Configstore('cf-napp-config');
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

    beforeEach(() => fs.mkdirs(tempTestsDirPath));
    afterEach(() => fs.remove(tempTestsDirPath));

    it('creates a component file with requested lifecycle methods included', async () => {
        const expectedFileContent =
`import React, { Component } from 'react';

class ${compName} extends Component {
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

    componentWillUnmount() {
    }
}

export default ${compName};`;
        let check1 = await pathCheck(`${testFilePath}.js`);
        let check2;

        expect(check1).toBe(false);

        createFile('COMPONENT', compName, testFilePath, options, includedMethods);

        // wait before running check2
        return await timeOut().then(async () => {
            check2 = await pathCheck(`${testFilePath}.js`);
            expect(check2).toBe(true);
            let contents = await readFile(`${testFilePath}.js`).then(res => {
                expect(res).toEqual(expectedFileContent);
            });
            fs.emptyDir(tempTestsDirPath);
        });
    });

    it('creates the correct type of component', async () => {
        const expectedFileContent =
`import React from 'react';

const ${compName} = (props) => {
    return (
        <div>
            <h3>Hello World</h3>
        </div>
    );
};

export default ${compName};`;
        let check1 = await pathCheck(`${testFilePath}.js`);
        let check2;

        expect(check1).toBe(false);

        createFile('DUMB_COMPONENT', compName, testFilePath, options, includedMethods);

        // wait before running check2
        return await timeOut().then(async () => {
            check2 = await pathCheck(`${testFilePath}.js`);
            expect(check2).toBe(true);
            let contents = await readFile(`${testFilePath}.js`).then(res => {
                expect(res).toEqual(expectedFileContent);
            });
            fs.emptyDir(tempTestsDirPath);
            options.dumb = false;
        });
    });

    it('creates a component test file', async () => {
        const expectedFileContent =
`import React from 'react';
import ReactDOM from 'react-dom';
import ${compName} from '${formatCompPath(compName, nappConfig)}';

describe('${compName}', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<${compName} />, div);
    });
});`;
        let check1 = await pathCheck(`${testFilePath}.test.js`);
        let check2;

        expect(check1).toBe(false);

        createFile('COMPONENT_TEST', compName, testFilePath, options, {}, nappConfig);

        // wait before running check2
        return await timeOut().then(async () => {
            check2 = await pathCheck(`${testFilePath}.test.js`);
            expect(check2).toBe(true);
            let contents = await readFile(`${testFilePath}.test.js`).then(res => {
                expect(res).toEqual(expectedFileContent);
            });
            fs.emptyDir(tempTestsDirPath);
        });
    });

    it('throws an error if type argument passed is not an accepted case', () => {
        expect(() => createFile('component_test', compName, testFilePath))
            .toThrowError('A valid fileType string must be passed as the first argument');
    });
});
