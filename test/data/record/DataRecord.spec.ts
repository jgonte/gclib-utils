import DataRecord from '../../../src/data/record/DataRecord';
import DataRecordDescriptor from '../../../src/data/record/DataRecordDescriptor';

describe("DataRecord tests", () => {

    it("should support the operations of a DataRecord with reset", () => {

        const recordDescriptor = new DataRecordDescriptor();

        recordDescriptor.fromModel({
            field1: {
                id: true,
                type: String,
                value: 'field1',
                validators: [
                    {
                        type: 'required'
                    }
                ]
            },
            field2: {
                type: Number,
                value: 3,
                validators: [
                    {
                        type: 'required'
                    }
                ]
            },
            field3: {
                type: Date,
                value: new Date(2002, 4, 25),
                validators: [
                    {
                        type: 'required'
                    }
                ]
            },
            field4: {
                type: Boolean,
                value: true,
                validators: [
                    {
                        type: 'required'
                    }
                ]
            }
        });

        const dataRecord = new DataRecord(recordDescriptor);

        expect(dataRecord.getData()).toEqual({
            field1: "field1",
            field2: 3,
            field3: new Date(2002, 4, 25),
            field4: true
        });

        expect(dataRecord.isModified).toEqual(false);

        dataRecord.setData({
            field1: "field11",
            field2: 32,
            field3: new Date(1928, 4, 24),
            field4: false
        });

        expect(dataRecord.isModified).toEqual(true);

        // Verify it returns the changed data
        expect(dataRecord.getData()).toEqual({
            field1: "field11",
            field2: 32,
            field3: new Date(1928, 4, 24),
            field4: false
        });

        let record = undefined; 

        dataRecord.commit(r => {

            record = r;
        });

        expect(record).toEqual({
            field1: "field11",
            field2: 32,
            field3: new Date(1928, 4, 24),
            field4: false
        });

        // Verify the record is not modified when commit
        expect(dataRecord.isModified).toEqual(false);

        // Verify it returns the initial data
        expect(dataRecord.getData()).toEqual({
            field1: "field11",
            field2: 32,
            field3: new Date(1928, 4, 24),
            field4: false
        });
    });

    it("should support the operations of a DataRecord with commit", () => {

        const recordDescriptor = new DataRecordDescriptor();

        recordDescriptor.fromModel({
            field1: {
                id: true,
                type: String,
                value: 'field1',
                validators: [
                    {
                        type: 'required'
                    }
                ]
            },
            field2: {
                type: Number,
                value: 3,
                validators: [
                    {
                        type: 'required'
                    }
                ]
            },
            field3: {
                type: Date,
                value: new Date(2002, 4, 25),
                validators: [
                    {
                        type: 'required'
                    }
                ]
            },
            field4: {
                type: Boolean,
                value: true,
                validators: [
                    {
                        type: 'required'
                    }
                ]
            }
        });

        const dataRecord = new DataRecord(recordDescriptor);

        expect(dataRecord.getData()).toEqual({
            field1: "field1",
            field2: 3,
            field3: new Date(2002, 4, 25),
            field4: true
        });

        expect(dataRecord.isModified).toEqual(false);

        dataRecord.setData({
            field1: "field11",
            field2: 32,
            field3: new Date(1928, 4, 24),
            field4: false
        });

        expect(dataRecord.isModified).toEqual(true);

        // Verify it returns the changed data
        expect(dataRecord.getData()).toEqual({
            field1: "field11",
            field2: 32,
            field3: new Date(1928, 4, 24),
            field4: false
        });

        dataRecord.reset();

        // Verify the record is not modified when reset
        expect(dataRecord.isModified).toEqual(false);

        // Verify it returns the initial data
        expect(dataRecord.getData()).toEqual({
            field1: "field1",
            field2: 3,
            field3: new Date(2002, 4, 25),
            field4: true
        });
    });

    it("should create default field descriptor when initialize is called", () => {

        const dataRecord = new DataRecord();

        dataRecord.initialize({
            field1: "field1",
            field2: 3,
            field3: new Date(2002, 4, 25),
            field4: true
        });

        // Verify that when initialized is not modified
        expect(dataRecord.isModified).toEqual(false);

        // Verify it returns the initial data
        expect(dataRecord.getData()).toEqual({
            field1: "field1",
            field2: 3,
            field3: new Date(2002, 4, 25),
            field4: true
        });

        dataRecord.setData({
            field1: "field11",
            field2: 32,
            field3: new Date(1928, 4, 24),
            field4: false
        });

        expect(dataRecord.isModified).toEqual(true);

        // Verify it returns the changed data
        expect(dataRecord.getData()).toEqual({
            field1: "field11",
            field2: 32,
            field3: new Date(1928, 4, 24),
            field4: false
        });

        dataRecord.reset();

        // Verify the record is not modified when reset
        expect(dataRecord.isModified).toEqual(false);

        // Verify it returns the initial data
        expect(dataRecord.getData()).toEqual({
            field1: "field1",
            field2: 3,
            field3: new Date(2002, 4, 25),
            field4: true
        });
    });

    it("should convert the values if necessary", () => {

        const recordDescriptor = new DataRecordDescriptor();

        recordDescriptor.fromModel({
            field1: {
                id: true,
                type: String,
                value: 'field1',
                validators: [
                    {
                        type: 'required'
                    }
                ]
            },
            field2: {
                type: Number,
                value: 3,
                validators: [
                    {
                        type: 'required'
                    }
                ]
            },
            field3: {
                type: Date,
                value: new Date(2002, 4, 25),
                validators: [
                    {
                        type: 'required'
                    }
                ]
            },
            field4: {
                type: Boolean,
                value: true,
                validators: [
                    {
                        type: 'required'
                    }
                ]
            }
        });

        const dataRecord = new DataRecord(recordDescriptor);

        // Simulate an API web response with fields being returned with string values
        const response = JSON.parse('{"field1":"field1","field2":"3","field3":"2002-05-25T04:00:00.000Z","field4":"true"}');

        dataRecord.initialize(response);

        // Verify that when initialized is not modified
        expect(dataRecord.isModified).toEqual(false);

        // Verify it returns the initial data
        expect(dataRecord.getData()).toEqual({
            field1: "field1",
            field2: 3,
            field3: new Date(2002, 4, 25),
            field4: true
        });

    });
});