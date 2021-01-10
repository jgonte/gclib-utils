import { Observer, Subscriber } from "../gclib-utils";
import { DataFieldDescriptor } from "./Interfaces";

/**
 * The field that is stored in a record of a store
 */
export default class DataField {

    /**
     * The name of the field
     */
    private _fieldDescriptor: DataFieldDescriptor;

    /** The current value */
    private _value?: any;

    /** 
     * The initial value of the field 
     * The initial value is the one set on the initialize function and
     * corresponds to the value of the field of an empty record or a loaded one.
     * A field is considered "modified" if its current value is different from the "initial" one
     */
    private _initialValue?: any;

    /** The observer to notify when the value of the field changed */
    private _observer: Observer = new Observer('onValueSet');

    constructor(fieldDescriptor: DataFieldDescriptor, subscriber: Subscriber) {
        
        this._fieldDescriptor = fieldDescriptor;

        if (fieldDescriptor.value !== undefined) {

            this.initialize(fieldDescriptor.value);
        }
        
        this._observer.subscribe(subscriber);
    }

    get name() {

        return this._fieldDescriptor.name;
    }

    get isId() {

        return this._fieldDescriptor.id;
    }

    initialize(value: any) {

        this._value = value;

        this._initialValue = value;
    }

    set value(value: any) {

        const oldValue = this._value;

        this._value = value;

        this._observer.notify(this._fieldDescriptor, this._value, oldValue, this._initialValue);
    }

    get value() {
        
        return this._value;
    }

    reset() {

        this.value = this._initialValue;
    }
}