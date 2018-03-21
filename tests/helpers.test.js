const { changeAllSettings } = require('../bin/helpers');
const { writeFile } = require('../bin/helpers');
const Configstore = require('configstore');
const fs = require('fs-extra');
const path = require('path');

describe('changeAllSettings', () => {
    let conf, settings;
    beforeAll(() => {
        conf = new Configstore('test-napp-config');
        settings = {
            componentWillMount: false,
            componentWillReceiveProps: false,
            shouldComponentUpdate: false,
            componentWillUpdate: false,
            componentDidMount: false,
            componentDidUpdate: false,
            componentWillUnmount: false,
            componentDidCatch: false
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
            componentDidCatch: true
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
            componentDidCatch: false
        };

        expect(conf.all).toEqual(settings);
        changeAllSettings(false, conf);
        expect(conf.all).toEqual(expectedSettings);
    });
});

describe('writeFile', () => {
    let compName, template, tempTestsDirPath, testFilePath, pathCheck, readFile, timeOut;
    beforeAll(() => {
        compName = 'AngryButton';
        template = `${compName} has been written`
        tempTestsDirPath = path.normalize(
            path.resolve(__dirname, 'temp-write-file-directory')
        );
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