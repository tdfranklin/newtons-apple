const processConfig = require('../lib/process-config');
const fs = require('fs-extra');
const path = require('path');

describe('processConfig', () => {
    let name, config, options, testCompsPath, compPath, pathCheck, readFile, timeOut;
    beforeAll(() => {
        name = 'ComplicatedButton';
        config = {
            componentWillMount: true,
            componentWillReceiveProps: true,
            shouldComponentUpdate: true,
            componentWillUpdate: true,
            componentDidMount: true,
            componentDidUpdate: true,
            componentWillUnmount: true,
            componentDidCatch: true
        };
        options = {
            dumb: false,
            create: false,
            overwrite: false
        };
        testCompsPath = path.normalize(
            path.resolve(__dirname, 'test-components')
        );
        compPath = path.normalize(path.resolve(testCompsPath, name));

        pathCheck = aPath => {
            return fs.pathExists(`${aPath}.js`);
        };

        readFile = async () => {
            return await fs.readFile(`${compPath}.js`, 'utf8');
        };

        timeOut = async () => {
            return new Promise(resolve => {
                setTimeout(() => resolve(), 1000);
            });
        };
    });

    beforeEach(() => fs.mkdirs(testCompsPath));
    afterEach(() => fs.remove(testCompsPath));

    it('creates a component file in the correct directory', async () => {
        let check1 = await pathCheck(compPath);
        let check2;

        expect(check1).toBe(false);

        processConfig(compPath, options, config);

        // wait a second before running check2
        return await timeOut().then(async () => {
            check2 = await pathCheck(compPath);
            expect(check2).toBe(true);
            fs.emptyDir(testCompsPath);
        });
    });

    it("doesn't create a component if it already exists", async () => {
        await fs.writeFile(`${compPath}.js`, 'Beat you to it');
        let contents = await readFile().then(res => {
            expect(res).toEqual('Beat you to it');
        });

        processConfig(compPath, options, config);

        contents = await readFile().then(res => {
            expect(res).toEqual('Beat you to it');
        });
    });

    it('overwrites a pre-exisiting component if overWriteFile is true', async () => {
        await fs.writeFile(`${compPath}.js`, 'Beat you to it');
        let contents = await readFile().then(res => {
            expect(res).toEqual('Beat you to it');
        });

        options.overwrite = true;
        processConfig(compPath, options, config);

        contents = await readFile().then(res => {
            expect(res).not.toEqual('Beat you to it');
        });
    });

    it('creates directory/directories if createDir is true', async () => {
        console.error = jest.fn();
        const compWithDirPath = path.normalize(
            path.resolve(testCompsPath, 'i-am-your-father', name)
        );
        let check1 = await pathCheck(compPath);
        let check2;
        expect(check1).toBe(false);

        options.create = true;
        processConfig(compPath, options, config);

        // wait a second before running check2
        return await timeOut().then(async () => {
            check2 = await pathCheck(compPath);
            expect(check2).toBe(true);
            fs.emptyDir(testCompsPath);
        });
    });
});
