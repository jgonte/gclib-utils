import { Subscriber } from "../gclib-utils";
import DataField from "./DataField";
import { DataFieldDescriptor, IdentifierInfo } from "./Interfaces";

function getType(value: any): Function {

    const type = typeof value;

    switch (type) {
        case 'boolean': return Boolean;
        case 'number': return Number;
        case 'bigint': return BigInt;
        case 'string': return String;
        case 'object': {

            if (value instanceof Date) {

                return Date;
            }
            else {

                throw Error(`Not implemented for type: '${type}'`);
            }
        }
        default: throw Error(`Not implemented for type: '${type}'`);
        // "symbol" | "undefined" | "function"
    }
}

export default class DataRecordDescriptor {

    /**
     * The descriptors of the field of the record
     */
    private _fieldDescriptors: DataFieldDescriptor[] = [];

    getFieldDescriptor(name: string): DataFieldDescriptor | undefined {

        const descriptors = this._fieldDescriptors.filter(d => d.name === name);

        return descriptors.length > 0 ?
            descriptors[0] :
            undefined;
    }

    /**
     * Creates the record descriptor from a model
     * @param model 
     */
    fromModel(model: any): void {

        for (const key in model) {

            if (model.hasOwnProperty(key)) {

                const f: any = model[key];

                const fieldDescriptor: DataFieldDescriptor = {
                    name: key,
                    id: f.id || false,
                    type: f.type || String, // Default to string
                    value: f.value || undefined,
                    validators: f.validators || []
                };

                this._fieldDescriptors.push(fieldDescriptor);
            }
        }
    }

    addFieldDescriptor(key: string, value: any): DataFieldDescriptor {

        const fieldDescriptor = {
            id: false,
            name: key,
            type: getType(value),
            value,
            validators: []
        };

        this._fieldDescriptors.push(fieldDescriptor);

        return fieldDescriptor;
    }

    /**
     * Creates the fields from the descriptors
     * @param fields
     * @param subscriber 
     */
    createFields(fields: any, subscriber: Subscriber) {

        this._fieldDescriptors.forEach(fieldDescriptor =>
            fields[fieldDescriptor.name] = new DataField(fieldDescriptor, subscriber)
        );
    }

    /**
     * Creates an id object from the data using the field descriptors id property
     * @param data 
     * @param fcn A function to process the data further if necessary
     */
    getId(data: any, fcn?: Function) : IdentifierInfo {

        const id: Record<string, any> = {};

        const idDescriptors = this._fieldDescriptors.filter(f => f.id === true);

        const { length } = idDescriptors;

        let hasUndefinedIdentifiers = false;

        if (length > 0) { // There are some field(s) that compose an identifier

            for (let i = 0; i < length; ++i) {

                const descriptor = idDescriptors[i];

                const {
                    name
                } = descriptor;

                if (data.hasOwnProperty(name)) {

                    const value = fcn !== undefined ? fcn(data[name]) : data[name];

                    if (value === undefined) {

                        hasUndefinedIdentifiers = true;

                        break;
                    }

                    id[name] = value;
                }
                else { // No data property for that id descriptor

                    id[name] = undefined;

                    hasUndefinedIdentifiers = true;

                    break;
                }
            }

            if (hasUndefinedIdentifiers) { // No field serves a an identifier, create one using all the fields for (hopefully) uniqueness

                for (const key in data) {

                    if (data.hasOwnProperty(key)) {

                        const value = fcn !== undefined ? fcn(data[key]) : data[key];

                        id[key] = value;
                    }
                }
            }

        }
        else { // No field serves a an identifier, create one using all the fields for (hopefully) uniqueness

            for (const key in data) {

                if (data.hasOwnProperty(key)) {

                    const value = fcn !== undefined ? fcn(data[key]) : data[key];

                    id[key] = value;
                }
            }
        }

        return {
            value: id,
            noDescriptorsId: length === 0,
            hasUndefinedIdentifiers: length > 0 && hasUndefinedIdentifiers === true
        };
    }
}