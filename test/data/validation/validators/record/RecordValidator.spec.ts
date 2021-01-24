import DataRecord from "../../../../../src/data/record/DataRecord";
import DataRecordDescriptor from "../../../../../src/data/record/DataRecordDescriptor";
import { ValidationContext } from "../../../../../src/data/validation/Interfaces";
import CompareValidator from "../../../../../src/data/validation/validators/record/CompareValidator";
import { ComparisonOperators } from "../../../../../src/utils/operators/ComparisonOperators";

describe("RecordValidator tests", () => {

    it("CompareValidator tests", () => {

        const recordDescriptor = new DataRecordDescriptor();

        recordDescriptor.fromModel({
            password: {
                type: String
            },
            verifyPassword: {
                type: String
            }
        })

        const dataRecord = new DataRecord(recordDescriptor);
        
        const validator = new CompareValidator({
            
            propertyToValidate: 'password',
            propertyToCompare: 'verifyPassword',
            operator: ComparisonOperators.Equal,
            message: 'Password must match'
        });

        let validationContext : ValidationContext = {
            errors: [],
            stopWhenInvalid: false
        };

        // Validation fails because the values of the properties are not equal
        dataRecord.initialize({
            password: 'pass1',
            verifyPassword: 'pass2'
        });

        let valid = validator.validate(dataRecord, validationContext);

        expect(valid).toEqual(false);

        expect(validationContext.errors[0]).toEqual('Password must match');

        // Reset the validation context
        validationContext = {
            errors: [],
            stopWhenInvalid: false
        };

        // Validation succeeds because the values of the properties are equal
        dataRecord.initialize({
            password: 'pass1',
            verifyPassword: 'pass1'
        });

        valid = validator.validate(dataRecord, validationContext);

        expect(valid).toEqual(true);

        expect(validationContext.errors.length).toEqual(0);
    });
});