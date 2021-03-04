import Validator from "../Validator";
import { ValidationContext } from "../../Interfaces";
import { DataProvider } from "../../../record/Interfaces";

export interface RecordValidationContext extends ValidationContext {

    dataProvider: DataProvider;
}

export default abstract class RecordValidator extends Validator {

    abstract validate(context: RecordValidationContext): boolean;

    getData(context: RecordValidationContext): any {

        const {
            dataProvider
        } = context;

        return dataProvider.getData();
    }
}