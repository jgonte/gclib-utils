import DataRecord from "../../../record/DataRecord";
import { ValidationContext } from "../../Interfaces";
import { ValidatorOptions } from "../Validator";
import RecordValidator from "./RecordValidator";

export interface CustomRecordValidatorOptions extends ValidatorOptions {

    validateFcn: Function;
}

export default class CustomRecordValidator extends RecordValidator {

    validateFcn: Function;

    constructor(options: CustomRecordValidatorOptions) {

        super(options);

        this.validateFcn = options.validateFcn;
    }

    validate(record: DataRecord, context: ValidationContext): boolean {

        const data = record.getData();

        var valid = this.validateFcn.call(this, data);

        if (!valid) {

            this.emitMessage(context, { });
        }

        return valid;
    }

    
}