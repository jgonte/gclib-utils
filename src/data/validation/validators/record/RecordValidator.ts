import Validator from "../Validator";
import DataRecord from "../../../record/DataRecord";
import { ValidationContext } from "../../Interfaces";

export default abstract class RecordValidator extends Validator {

    abstract validate(record: DataRecord, context: ValidationContext): boolean;
}