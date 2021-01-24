import { IDataField } from "../../../record/Interfaces";
import { ValidationContext } from "../../Interfaces";
import { ValidatorOptions } from "../Validator";
import FieldValidator from "./FieldValidator";

export interface CustomFieldValidatorOptions extends ValidatorOptions {

    validateFcn: Function;
}

export default class CustomFieldValidator extends FieldValidator {

    validateFcn: Function;

    constructor(options: CustomFieldValidatorOptions) {

        super(options);

        this.validateFcn = options.validateFcn;
    }

    validate(field: IDataField, context: ValidationContext): boolean {

        const {
            name,
            value
        } = field;

        var valid = this.validateFcn.call(this, value);

        if (!valid) {

            this.emitMessage(context, { name });
        }

        return valid;
    }
}