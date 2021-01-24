import { IDataField } from "../../../record/Interfaces";
import { ValidationContext } from "../../Interfaces";
import { ValidatorOptions } from "../Validator";
import FieldValidator from "./FieldValidator";

export interface RequiredValidatorOptions extends ValidatorOptions {

    /** If true, allows '' as a valid value */
    allowEmpty?: boolean;
}

export default class RequiredValidator extends FieldValidator {

    /** If true, allows '' as a valid value */
    allowEmpty: boolean;

    constructor(options: RequiredValidatorOptions = {}) {

        if (options.message === undefined) {

            options.message ='{{name}} is required';
        }

        super(options);

        this.allowEmpty = options.allowEmpty || false;
    }

    validate(field: IDataField, context: ValidationContext): boolean {

        const {
            name,
            value
        } = field;

        var valid = !(value === undefined || value === null);

        if (valid === true && this.allowEmpty === false) {

            valid = value !== '';
        }

        if (!valid) {

            this.emitMessage(context, { name });
        }

        return valid;
    }
}