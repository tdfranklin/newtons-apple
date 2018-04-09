const {changeAllSettings} = require('../bin/configstore');
const Configstore = require('configstore');

describe('changeAllSettings', () => {
    let conf, settings;
    beforeAll(() => {
        conf = new Configstore('test-napp-config');
        settings = {
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
        };

        conf.set(settings);
    });

    it('changes settings to true', () => {
        const expectedSettings = {
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
        };

        expect(conf.all).toEqual(settings);
        changeAllSettings(true, conf);
        expect(conf.all).toEqual(expectedSettings);
        settings = expectedSettings;
    });

    it('changes settings to false', () => {
        const expectedSettings = {
            componentWillMount: false,
            componentWillReceiveProps: false,
            shouldComponentUpdate: false,
            componentWillUpdate: false,
            componentDidMount: false,
            componentDidUpdate: false,
            componentWillUnmount: false,
            componentDidCatch: false,
            autoGenerateTests: false,
            currentProject: null,
            projects: {
                testing: {
                    rootDir: null,
                    componentDir: null,
                    testsDir: null
                }
            }
        };

        expect(conf.all).toEqual(settings);
        changeAllSettings(false, conf);
        expect(conf.all).toEqual(expectedSettings);
    });
});
