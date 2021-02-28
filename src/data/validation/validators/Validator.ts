import template from "../../../utils/template";
import DataRecord from "../../record/DataRecord";
import { IDataField } from "../../record/Interfaces";
import { ValidationContext } from "../Interfaces";

export interface ValidatorOptions {

    message?: string;
}

export default abstract class Validator {

    /** The message to add to the validation context */
    message?: string;

    constructor(options: ValidatorOptions) {

        this.message = options?.message;
    }

    abstract validate(fieldOrRecord: IDataField | DataRecord, context: ValidationContext): boolean;

    emitMessage(context: ValidationContext, data: any) {

        const result = template(this.message!, data);

        context.errors.push(result.text!);
    }
}