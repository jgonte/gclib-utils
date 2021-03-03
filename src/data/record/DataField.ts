import { DataFieldDescriptor, IDataField } from "./Interfaces";
import Observer from "../../observer/Observer";
import Subscriber from "../../observer/Subscriber";
import { ValidationContext } from "../validation/Interfaces";
import FieldValidator from "../validation/validators/field/FieldValidator";
import Validator from "../validation/validators/Validator";
import createValidator from "../validation/createValidator";

function toTypeOf(typeFunction: Function) {

    switch (typeFunction) {
        case String: return 'string';
        case Boolean: return 'boolean';
        case Number: return 'number';
        case BigInt: return 'bigint';
        default: return 'object';
    }
}

/**
 * The field that is stored in a record of a store
 */
export default class DataField implements IDataField {

    /**
     * The descriptor of the field
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

    /** The validators of the field */
    private _validators?: FieldValidator[];

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

        return this._fieldDescriptor.isId;
    }

    initialize(value: any) {

        // Convert the value if its type is different from the expected type of the field descriptor
        if (value !== undefined &&
            value != null &&
            typeof value !== toTypeOf(this._fieldDescriptor.type)) {

            value = this._fieldDescriptor.converter!.fromString(value, this._fieldDescriptor.type);
        }

        this._value = value;

        this._initialValue = value;
    }

    set value(value: any) {

        const oldValue = this._value;

        // Convert the value if its type is different from the expected type of the field descriptor
        if (value !== undefined &&
            value != null &&
            typeof value !== toTypeOf(this._fieldDescriptor.type)) {

            value = this._fieldDescriptor.converter!.fromString(value, this._fieldDescriptor.type);
        }

        this._value = value;

        this._observer.notify(
            this._fieldDescriptor,
            this._value,
            oldValue,
            this._initialValue
        );
    }

    get value() {

        return this._value;
    }

    reset() {

        this.value = this._initialValue;
    }

    validate(context: ValidationContext): boolean {

        const {
            validators,
            validationFailedHandler
        } = this._fieldDescriptor;

        if (validators === undefined) {

            return true;
        }

        let valid = true;

        const length = validators.length;

        for (let i = 0; i < length; ++i) {

            let validator = validators[i];

            if (!(validator instanceof Validator)) {

                validator = createValidator(validator);
            }

            const r = (validator as Validator).validate(this, context);

            if (r === false) {

                if (valid === true) {

                    valid = false; // Set it once to invalid

                    validationFailedHandler.onValidationFailed(context.errors[context.errors.length - 1]);
                }

                if (context.stopWhenInvalid === true) {

                    break;
                }
            }
        }

        return valid;
    }
}