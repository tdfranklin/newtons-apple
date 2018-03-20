const createTest = require('../lib/create-test');
const fs = require('fs-extra');
const path = require('path');

describe('createTest', () => {
    let compName, tempTestsDirPath, testFilePath, pathCheck, readFile, timeOut;
    beforeAll(() => {
        compName = 'UglyButton';
        tempTestsDirPath = path.normalize(
            path.resolve(__dirname, 'test-components')
        );
        testFilePath = path.normalize(path.resolve(tempTestsDirPath, compName));

        pathCheck = aPath => {
            return fs.pathExists(`${aPath}.test.js`);
        };

        readFile = async () => {
            return await fs.readFile(`${testFilePath}.test.js`, 'utf8');
        };

        timeOut = async () => {
            return new Promise(resolve => {
                setTimeout(() => resolve(), 1000);
            });
        };
    });

    beforeEach(() => fs.mkdirs(tempTestsDirPath));
    afterEach(() => fs.remove(tempTestsDirPath));

    it('creates a test file in the correct directory', async () => {
        let check1 = await pathCheck(testFilePath);
        let check2;

        expect(check1).toBe(false);

        createTest(testFilePath, false, false);

        // wait a second before running check2
        return await timeOut().then(async () => {
            check2 = await pathCheck(testFilePath);
            expect(check2).toBe(true);
            fs.emptyDir(tempTestsDirPath);
        });
    });

    it("doesn't create a test file if it already exists", async () => {
        await fs.writeFile(`${testFilePath}.test.js`, 'Beat you to it');
        let contents = await readFile().then(res => {
            expect(res).toEqual('Beat you to it');
        });

        createTest(testFilePath, false, false);

        contents = await readFile().then(res => {
            expect(res).toEqual('Beat you to it');
        });
    });

    it('overwrites a pre-exisiting test file if overWriteFile is true', async () => {
        await fs.writeFile(`${testFilePath}.test.js`, 'Beat you to it');
        let contents = await readFile().then(res => {
            expect(res).toEqual('Beat you to it');
        });

        createTest(testFilePath, false, true);

        contents = await readFile().then(res => {
            expect(res).not.toEqual('Beat you to it');
        });
    });

    it('creates directory/directories if createDir is true', async () => {
        const testWithDirPath = path.normalize(
            path.resolve(tempTestsDirPath, 'i-am-your-father', compName)
        );
        let check1 = await pathCheck(testWithDirPath);
        let check2;
        expect(check1).toBe(false);

        createTest(testWithDirPath, true, false);

        // wait a second before running check2
        return await timeOut().then(async () => {
            check2 = await pathCheck(testWithDirPath);
            expect(check2).toBe(true);
            fs.emptyDir(tempTestsDirPath);
        });
    });
});
