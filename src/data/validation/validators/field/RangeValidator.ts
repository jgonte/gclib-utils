import { IDataField } from "../../../record/Interfaces";
import { ValidationContext } from "../../Interfaces";
import { ValidatorOptions } from "../Validator";
import FieldValidator from "./FieldValidator";

export interface RangeValidatorOptions extends ValidatorOptions {

    minValue?: any;

    maxValue?: any;
}

export default class RangeValidator extends FieldValidator {

    minValue: any;

    maxValue: any;

    constructor(options: RangeValidatorOptions = {}) {

        if (options.message === undefined) {

            options.message ='{{name}} is not in range from :{{minValue}} to {{maxValue}}';
        }

        super(options);

        this.minValue = options.minValue;

        this.maxValue = options.maxValue;
    }

    validate(field: IDataField, context: ValidationContext): boolean {

        const {
            name,
            value
        } = field;

        const {
            minValue,
            maxValue
        } = this;

        var valid = value >= minValue && value <= maxValue;

        if (!valid) {

            this.emitMessage(context, { name });
        }

        return valid;
    }
}