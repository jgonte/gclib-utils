import Subscriber from "../../observer/Subscriber";
import DataField from "./DataField";
import DataRecordDescriptor from "./DataRecordDescriptor";
import { DataFieldDescriptor, DataProvider, DataSetter } from "./Interfaces";
import areEqual from "../../utils/areEqual";

/**
 * Keeps information about a sigle set of fields
 */
export default class DataRecord implements DataProvider, DataSetter, Subscriber {
    
    private _fields: Record<string, DataField> = {};

    private _modifiedFields: Record<string, DataField> = {};

    private _recordDescriptor?: DataRecordDescriptor;

    /**
     * The cached id of the record
     */
    private _id: any;

    /**
     * The cached data of the record
     */
    private _data?: any = undefined;

    constructor(recordDescriptor?: DataRecordDescriptor) {

        this._recordDescriptor = recordDescriptor;
    }

    /**
     * Initializes the data record with the data passed in
     * If the field descriptors are undefined, it creates them
     * @param data The data to initialize the data record with
     */
    initialize(data: any) {

        const {
            _fields
        } = this;

        this._recordDescriptor = this._recordDescriptor || new DataRecordDescriptor();

        for (const key in data) {

            if (data.hasOwnProperty(key)) {

                if (!_fields.hasOwnProperty(key)) { // The field does not exist, create it

                    const value = data[key];

                    let fieldDescriptor = this._recordDescriptor.getFieldDescriptor(key);

                    if (fieldDescriptor === undefined) {

                        fieldDescriptor = this._recordDescriptor.addFieldDescriptor(key, data[key]);
                    }

                    _fields[key] = new DataField(fieldDescriptor, this);
                }

                _fields[key].initialize(data[key]);
            }
        }

        this._id = undefined;

        this._data = undefined;

        this._modifiedFields = {};
    }

    getData(): any {

        const {
            _data,
            _fields
        } = this;

        if (_data !== undefined) {

            return _data;
        }

        if (Object.keys(_fields).length === 0) { // Need to create the record

            this._recordDescriptor!.createFields(_fields, this);
        }

        const data: any = {};

        for (const key in _fields) {

            if (_fields.hasOwnProperty(key)) {

                data[key] = _fields[key].value;
            }
        }

        this._data = data;

        return data;
    }

    set id(id: any) {

        this._id = id;
    }

    get id() {

        const {
            _fields
        } = this;

        if (this._id === undefined) {

            const idInfo = this._recordDescriptor!.getId(_fields, (f: { value: any; }) => f.value);

            this._id = idInfo.value;
        }

        return this._id;
    }

    get isModified() {

        return Object.keys(this._modifiedFields).length > 0;
    }

    setData(data: any): void {

        for (const key in data) {

            if (data.hasOwnProperty(key)) {

                this._fields[key].value = data[key];
            }
        }

        this._id = undefined;
    }

    reset() {

        if (!this.isModified) {

            return;
        }

        const {
            _fields
        } = this;

        for (const key in _fields) {

            if (_fields.hasOwnProperty(key)) {

                _fields[key].reset();            
            }
        }

        //this._modifiedFields = {}; It should be empty
    }

    onValueSet(descriptor: DataFieldDescriptor, value: any, oldValue: any, initialValue: any) {

        if (areEqual(value, oldValue)) {

            return; // Nothing to change
        }

        const {
            name
        } = descriptor;

        const {
            _fields,
            _modifiedFields
        } = this;

        if (!areEqual(value, initialValue)) {

            // Reference the field in the modified set
            _modifiedFields[name] = _fields[name];
        }
        else {

            // Remove it from the modified fields
            delete _modifiedFields[name];
        }

        // Clear the data cache to get new data
        this._data = undefined;
    }

    commit(callback: (record: any) => void) {

        if (!this.isModified) {

            return;
        }

        callback(this._data);

        this.initialize(this._data);
    }
}