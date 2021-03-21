import AsyncTask from '../../src/asyncTask/AsyncTask';

let output: any = undefined;

beforeEach(() => {

    output = undefined;
})

describe('AsyncTask test', () => {

    it('executes an async task that resolves (succeeds)', async () => {

        const asyncTask = new AsyncTask({

            run: () => new Promise((resolve, reject) => resolve("Some content here!")),

            success: content => output = content
        });
        
        await asyncTask.execute();

        expect(output).toEqual("Some content here!");
    });

    it('executes an async task that resolves (succeeds) and calls the always function', async () => {

        const asyncTask = new AsyncTask({

            run: () => new Promise((resolve, reject) => resolve("Some content here!")),

            success: content => output = content,

            always: () => output = output + ' + Always'
        });
        
        await asyncTask.execute();

        expect(output).toEqual("Some content here! + Always");
    });

    it('executes an async task that rejects (fails)', async () => {

        const asyncTask = new AsyncTask({

            run: () => new Promise((resolve, reject) => reject("Some error here!")),

            success: content => output = content,

            error: err => output = err
        });
        
        await asyncTask.execute();

        expect(output).toEqual("Some error here!");
    });

    it('executes an async task that rejects (fails) and calls the always function', async () => {

        const asyncTask = new AsyncTask({

            run: () => new Promise((resolve, reject) => reject("Some error here!")),

            success: content => output = content,

            error: err => output = err,

            always: () => output = output + ' + Always'
        });
        
        await asyncTask.execute();

        expect(output).toEqual("Some error here! + Always");
    });

});
