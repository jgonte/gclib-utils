import RequiredValidator from "../../../../../src/data/validation/validators/field/RequiredValidator";
import { SingleValueFieldValidationContext } from "../../../../../src/data/validation/validators/field/SingleValueFieldValidator";

describe("RequiredValidator tests", () => {

    it("RequiredValidator with undefined value should emit an error", () => {

        const validator = new RequiredValidator();

        let validationContext : SingleValueFieldValidationContext = {
            label: 'First Name',
            errors: [],
            warnings: [],
            value: undefined
        };

        let valid = validator.validate(validationContext);

        expect(valid).toEqual(false);

        expect(validationContext.errors[0]).toEqual('First Name is required');
    });

    it("RequiredValidator with a defined value should emit no errors", () => {

        const validator = new RequiredValidator();

        let validationContext : SingleValueFieldValidationContext = {
            label: 'First Name',
            errors: [],
            warnings: [],
            value: 'Sarah'
        };

        let valid = validator.validate(validationContext);

        expect(valid).toEqual(true);

        expect(validationContext.errors.length).toEqual(0);
    });
});