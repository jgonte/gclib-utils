import { FieldValidationContext } from "../../Interfaces";
import Validator from "../Validator";

export interface SingleValueFieldValidationContext extends FieldValidationContext {

    /** The value to validate */
    value?: any
}

export default abstract class SingleValueFieldValidator extends Validator {}