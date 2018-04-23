const { writeFile, formatCompPath, formatFilePath } = require('../lib/helpers');
const fs = require('fs-extra');
const path = require('path');
const Configstore = require('configstore');

describe('writeFile', () => {
    let compName, template, tempTestsDirPath, testFilePath, pathCheck, readFile, timeOut;
    beforeAll(() => {
        compName = 'AngryButton';
        template = `${compName} has been written`;
        tempTestsDirPath = path.normalize(path.resolve(__dirname, 'temp-write-file-directory'));
        testFilePath = path.normalize(path.resolve(tempTestsDirPath, `${compName}.js`));

        pathCheck = aPath => {
            return fs.pathExists(aPath);
        };

        readFile = async () => {
            return await fs.readFile(testFilePath, 'utf8');
        };

        timeOut = async () => {
            return new Promise(resolve => {
                setTimeout(() => resolve(), 100);
            });
        };
    });

    beforeEach(() => fs.mkdirs(tempTestsDirPath));
    afterEach(() => fs.remove(tempTestsDirPath));

    it('creates a file in the correct directory', async () => {
        let check1 = await pathCheck(testFilePath);
        let check2;

        expect(check1).toBe(false);

        writeFile(testFilePath, template, false);

        // wait before running check2
        return await timeOut().then(async () => {
            check2 = await pathCheck(testFilePath);
            expect(check2).toBe(true);
            fs.emptyDir(tempTestsDirPath);
        });
    });

    it("doesn't create a file if it already exists", async () => {
        await fs.writeFile(testFilePath, 'Beat you to it');
        let contents = await readFile().then(res => {
            expect(res).toEqual('Beat you to it');
        });

        writeFile(testFilePath, template, false);

        contents = await readFile().then(res => {
            expect(res).toEqual('Beat you to it');
        });
    });

    it('overwrites a pre-exisiting file if overWriteFile is true', async () => {
        await fs.writeFile(testFilePath, 'Beat you to it');
        let contents = await readFile().then(res => {
            expect(res).toEqual('Beat you to it');
        });

        writeFile(testFilePath, template, true);

        contents = await readFile().then(res => {
            expect(res).not.toEqual('Beat you to it');
        });
    });

    it('creates directory/directories if createDir is true', async () => {
        const fileWithDirPath = path.normalize(
            path.resolve(testFilePath, 'i-am-your-father', compName)
        );
        let check1 = await pathCheck(fileWithDirPath);
        let check2;
        expect(check1).toBe(false);

        writeFile(fileWithDirPath, template, false, true);

        // wait before running check2
        return await timeOut().then(async () => {
            check2 = await pathCheck(fileWithDirPath);
            expect(check2).toBe(true);
            fs.emptyDir(tempTestsDirPath);
        });
    });
});

describe('formatCompPath', () => {
    let configuration, testNappConfig;
    beforeEach(() => {
        configuration = {
            componentWillMount: true,
            componentWillReceiveProps: true,
            shouldComponentUpdate: true,
            componentWillUpdate: true,
            componentDidMount: true,
            componentDidUpdate: true,
            componentWillUnmount: true,
            componentDidCatch: true,
            autoGenerateTests: false,
            currentProject: 'principia',
            projects: {
                principia: {
                    rootDir: 'Users/newton/mathematica/principia',
                    componentDir: 'Users/newton/mathematica/principia/components',
                    testsDir: 'Users/newton/mathematica/principia/tests'
                }
            }
        };

        testNappConfig = new Configstore('fcp-napp-config');
        testNappConfig.set(configuration);
    });

    it('returns relative path to component if project exists & componentDir is set', () => {
        const expectedResult = '../components/DeMotuCorporum';
        const result = formatCompPath('DeMotuCorporum', testNappConfig);

        expect(result).toEqual(expectedResult);
    });

    it('returns path to component if currentProject exists & componentDir is same as testsDir', () => {
        testNappConfig.set({
            componentWillMount: true,
            componentWillReceiveProps: true,
            shouldComponentUpdate: true,
            componentWillUpdate: true,
            componentDidMount: true,
            componentDidUpdate: true,
            componentWillUnmount: true,
            componentDidCatch: true,
            autoGenerateTests: false,
            currentProject: 'principia',
            projects: {
                principia: {
                    rootDir: 'Users/newton/mathematica/principia',
                    componentDir: 'Users/newton/mathematica/principia',
                    testsDir: 'Users/newton/mathematica/principia'
                }
            }
        });
        const expectedResult = './DeMotuCorporum';
        const result = formatCompPath('DeMotuCorporum', testNappConfig);

        expect(result).toEqual(expectedResult);
    });

    it("returns path to component if currentProject doesn't exists", () => {
        testNappConfig.set({
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
            projects: {}
        });
        const expectedResult = './DeMotuCorporum';
        const result = formatCompPath('DeMotuCorporum', testNappConfig);

        expect(result).toEqual(expectedResult);
    });
});

describe('formatFilePath', () => {
    let fileName, componentsPath, testsPath;
    beforeAll(() => {
        fileName = 'DeMotuCorporum';
        componentsPath = 'Users/newton/mathematica/principia/components/DeMotuCorporum';
        testsPath = 'newton/mathematica/principia/tests/DeMotuCorporum';
    });

    it('returns a formatted component file path', () => {
        const expectedResult = `${componentsPath}.js`;
        const result = formatFilePath('COMPONENT', fileName, componentsPath);

        expect(result).toEqual(expectedResult);
    });

    it('returns a formatted dumb component file path', () => {
        const expectedResult = `${componentsPath}.js`;
        const result = formatFilePath('DUMB_COMPONENT', fileName, componentsPath);

        expect(result).toEqual(expectedResult);
    });

    it('returns a formatted component file path with provided extension', () => {
        const expectedResult = `${componentsPath}.jsx`;
        const result = formatFilePath('COMPONENT', fileName, `${componentsPath}.jsx`);

        expect(result).toEqual(expectedResult);
    });

    it('returns a formatted dumb component file path with provided extension', () => {
        const expectedResult = `${componentsPath}.jsx`;
        const result = formatFilePath('DUMB_COMPONENT', fileName, `${componentsPath}.jsx`);

        expect(result).toEqual(expectedResult);
    });

    it('returns a formatted test file path', () => {
        const expectedResult = path.resolve(process.cwd(),`${testsPath}.test.js`);
        const result = formatFilePath('COMPONENT_TEST', fileName, testsPath);

        expect(result).toEqual(expectedResult);
    });

    it("throws an error if a valid fileType isn't passed in", () => {
        const result = () => formatFilePath('COMP_TEST', fileName, testsPath);

        expect(result).toThrow('A valid fileType string must be passed as the first argument');
    });
});
