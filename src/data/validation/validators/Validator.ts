import template from "../../../utils/template";
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

    emitMessage(context: ValidationContext, data: any) {

        const result = template(this.message!, data);

        context.errors.push(result.text!);
    }
}