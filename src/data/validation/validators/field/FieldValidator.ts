import { IDataField } from "../../../record/Interfaces";
import { ValidationContext } from "../../Interfaces";
import Validator from "../Validator";

export default abstract class FieldValidator extends Validator {

    abstract validate(field: IDataField, context: ValidationContext): boolean;
}