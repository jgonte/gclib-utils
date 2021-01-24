import { IDataField } from "../../../record/Interfaces";
import { ValidationContext } from "../../Interfaces";
import { ValidatorOptions } from "../Validator";
import FieldValidator from "./FieldValidator";

export interface RegexValidatorOptions extends ValidatorOptions {

    regex: RegExp;
}

export default class RegexValidator extends FieldValidator {

    _regex: RegExp;

    constructor(options: RegexValidatorOptions) {

        super(options);

        this._regex = options.regex!;
    }

    validate(field: IDataField, context: ValidationContext): boolean {

        const {
            name,
            value
        } = field;

        var valid = this._regex.test(value);

        if (!valid) {

            this.emitMessage(context, { name });
        }

        return valid;
    }
}