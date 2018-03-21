const createFile = require('../lib/create-file');
const fs = require('fs-extra');
const path = require('path');

describe('createFile', () => {
    let compName,
        options,
        tempTestsDirPath,
        testFilePath,
        pathCheck,
        readFile,
        timeOut;
    beforeAll(() => {
        compName = 'EvilButton';
        options = {
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

        createFile('COMPONENT', testFilePath, false, false, false, options);

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

        createFile('COMPONENT', testFilePath, true, false, false);

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

    it('creates a component test file', async () => {
        const expectedFileContent =
`import React from 'react';
import ReactDOM from 'react-dom';
import ${compName} from './${compName}';

describe('${compName}', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<${compName} />, div);
    });
});`;
        let check1 = await pathCheck(`${testFilePath}.test.js`);
        let check2;

        expect(check1).toBe(false);

        createFile('COMPONENT_TEST', testFilePath, false);

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
});
