import { ComparisonOperators } from "../../../../utils/operators/ComparisonOperators";
import DataRecord from "../../../record/DataRecord";
import { ValidationContext } from "../../Interfaces";
import { ValidatorOptions } from "../Validator";
import RecordValidator from "./RecordValidator";

export interface CompareValidatorOptions extends ValidatorOptions {

    /**
     * The name of the property to validate
     */
    propertyToValidate: string;

    /**
     * The name of the property to compare against
     */
    propertyToCompare: string;

    /**
     * The operator to perform the comparison
     */
    operator: ComparisonOperators;
}

export default class CompareValidator extends RecordValidator {

    private _propertyToValidate: string;

    private _propertyToCompare: string;

    private _operator: ComparisonOperators;

    constructor(options: CompareValidatorOptions) {

        super(options);

        this._propertyToValidate = options.propertyToValidate;

        this._propertyToCompare = options.propertyToCompare;

        this._operator = options.operator;
    }

    validate(record: DataRecord, context: ValidationContext): boolean {

        const {
            _propertyToValidate,
            _propertyToCompare,
            _operator
        } = this;

        const data = record.getData();

        const valueToValidate = data[_propertyToValidate];

        const valueToCompare = data[_propertyToCompare];

        const valid = this._compare(valueToValidate, valueToCompare, _operator);

        if (!valid) {

            this.emitMessage(context, {
                propertyToValidate: _propertyToValidate,
                valueToValidate,
                propertyToCompare: _propertyToCompare,
                valueToCompare,
                operator: _operator
            });
        }

        return valid;
    }
    
    private _compare(valueToValidate: any, valueToCompare: any, operator: ComparisonOperators) : boolean {

        switch(operator) {
            case ComparisonOperators.Equal: return valueToValidate === valueToCompare;
            case ComparisonOperators.NotEqual: return valueToValidate !== valueToCompare;
            case ComparisonOperators.GreaterThan: return valueToValidate > valueToCompare;
            case ComparisonOperators.GreaterOrEqual: return valueToValidate >= valueToCompare;
            case ComparisonOperators.LessThan: return valueToValidate < valueToCompare;
            case ComparisonOperators.LessThanOrEqual: return valueToValidate <= valueToCompare;
            default:throw Error(`Invalid comparison operator: ${operator}`);
        }
    }
    
}