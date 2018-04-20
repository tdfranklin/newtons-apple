
const { changeAllSettings, ifPathExists, setupProject } = require('../bin/configstore');
const path = require('path');
const Configstore = require('configstore');

let configuration, nappConfig, fileType, projectName, filePath;
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
    nappConfig = new Configstore('test-napp-config');
    nappConfig.set(configuration);
    fileType = 'COMPONENT';
    projectName = 'principia';
    filePath = 'Users/newton/mathematica/principia';
});

afterAll(() => {
    nappConfig.clear()
});

describe('nappConfig', () => {
    it('contains the correct properties', () => {
        const expectedConfig = {
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

        for (let key in expectedConfig) {
            expect(nappConfig.has(key)).toBe(true);
        }
    });
});
/*
describe('changeAllSettings', () => {
    it('changes configuration lifecycle methods to true', () => {
        const expectedConfig = {
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

        expect(nappConfig.all).toEqual(configuration);
        changeAllSettings(true, nappConfig);
        expect(nappConfig.all).toEqual(expectedConfig);
        configuration = expectedConfig;
    });

    it('changes configuration lifecycle methods to false', () => {
        const expectedConfig = {
            componentWillMount: false,
            componentWillReceiveProps: false,
            shouldComponentUpdate: false,
            componentWillUpdate: false,
            componentDidMount: false,
            componentDidUpdate: false,
            componentWillUnmount: false,
            componentDidCatch: false,
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

        expect(nappConfig.all).toEqual(configuration);
        changeAllSettings(false, nappConfig);
        expect(nappConfig.all).toEqual(expectedConfig);
    });
});

describe('ifPathExists', () => {
    it('returns filePath if a valid filePath string is passed in', () => {
        const result = ifPathExists(fileType, configuration.projects, projectName, filePath);

        expect(result).toEqual(filePath);
    });

    it('returns the project component directory path if it exists and not filePath is passed in', () => {
        const result = ifPathExists(fileType, configuration.projects, projectName);
        const expectedPath = configuration.projects.principia.componentDir;

        expect(result).toEqual(expectedPath);
    });

    it('returns the project test directory path if it exists and not filePath is passed in', () => {
        const result = ifPathExists('TEST', configuration.projects, projectName);
        const expectedPath = configuration.projects.principia.testsDir;

        expect(result).toEqual(expectedPath);
    });

    it("throws an error if a valid filePath or fileType isn't passed in", () => {
        const result = () => ifPathExists('TESTING', configuration.projects, projectName);

        expect(result).toThrow('A valid type string must be passed in as the first argument');
    });
});

describe('setupProject', () => {
    it("set's the currentProject property of configstore to name", () => {
        const newProjectName = 'Arithmetica Universalis';

        expect(nappConfig.get('currentProject')).toEqual(projectName);
        setupProject(false, newProjectName, null, null, nappConfig);
        expect(nappConfig.get('currentProject')).toEqual(newProjectName);
    });

    it('creates a new project and sets it as a property of the configstore projects property', () => {
        const newProjectName = 'Arithmetica Universalis';
        const newProjectRootDir = path.resolve(process.cwd());
        const newProjectCompPath = path.resolve(
            process.cwd(),
            'newton/mathematica/arithmetica-universalis/components'
        );
        const newProjectTestsPath = path.resolve(
            process.cwd(),
            'newton/mathematica/arithmetica-universalis/tests'
        );

        const expectedConfig = {
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
                },
                [newProjectName]: {
                    rootDir: newProjectRootDir,
                    componentDir: newProjectCompPath,
                    testsDir: newProjectTestsPath
                }
            }
        };

        expect(nappConfig.get('projects')['Arithmetica Universalis']).not.toBeDefined();
        setupProject(
            false,
            newProjectName,
            newProjectCompPath,
            newProjectTestsPath,
            nappConfig
        );
        expect(nappConfig.get('projects')).toEqual(expectedConfig.projects);
    });
});
*/
