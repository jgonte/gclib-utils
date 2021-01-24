import DataField from "../../../../../src/data/record/DataField";
import { DataFieldDescriptor } from "../../../../../src/data/record/Interfaces";
import { ValidationContext } from "../../../../../src/data/validation/Interfaces";
import Subscriber from "../../../../../src/observer/Subscriber";
import RequiredValidator from "../../../../../src/data/validation/validators/field/RequiredValidator";
import EmailValidator from "../../../../../src/data/validation/validators/field/EmailValidator";

describe("FieldValidator tests", () => {

    it("RequiredValidator tests", () => {

        const validator = new RequiredValidator();

        let validationContext : ValidationContext = {
            errors: [],
            stopWhenInvalid: false
        };

        const fieldDescriptor : DataFieldDescriptor = {
            name: 'name',
            type: String
        };

        const subscriber: Subscriber = {

            onValueSet(descriptor: DataFieldDescriptor, value: any, oldValue: any, initialValue: any) {
                // Do nothing
            }
        };

        const dataField = new DataField(fieldDescriptor, subscriber);

        // Test the validation fails because the value is undefined
        expect(dataField.value).toEqual(undefined);

        let valid = validator.validate(dataField, validationContext);

        expect(valid).toEqual(false);

        expect(validationContext.errors[0]).toEqual('name is required');

        // Reset the validation context
        validationContext = {
            errors: [],
            stopWhenInvalid: false
        };

        // Test the validation fails because the value is null
        dataField.value = null;

        expect(dataField.value).toEqual(null);

        valid = validator.validate(dataField, validationContext);

        expect(valid).toEqual(false);

        expect(validationContext.errors[0]).toEqual('name is required');

        // Reset the validation context
        validationContext = {
            errors: [],
            stopWhenInvalid: false
        };

        // Test the validation succeeds because the value is not undefined or null although it could be ''
        dataField.value = 'Sarah';

        valid = validator.validate(dataField, validationContext);

        expect(valid).toEqual(true);

        expect(validationContext.errors.length).toEqual(0);

        // Reset the validation context
        validationContext = {
            errors: [],
            stopWhenInvalid: false
        };

        // Test the validation fails because the value is '' and allowEmpty is false by default
        dataField.value = '';

        expect(validator.allowEmpty).toEqual(false);

        valid = validator.validate(dataField, validationContext);

        expect(valid).toEqual(false);

        expect(validationContext.errors[0]).toEqual('name is required');

        // Reset the validation context
        validationContext = {
            errors: [],
            stopWhenInvalid: false
        };

        // Test the validation succeeds because the value is '' but allowEmpty is set to true
        dataField.value = '';

        validator.allowEmpty = true;

        valid = validator.validate(dataField, validationContext);

        expect(valid).toEqual(true);

        expect(validationContext.errors.length).toEqual(0);
    });

    it("EmailValidator tests", () => {

        const validator = new EmailValidator();

        let validationContext : ValidationContext = {
            errors: [],
            stopWhenInvalid: false
        };

        const fieldDescriptor : DataFieldDescriptor = {
            name: 'email',
            type: String
        };

        const subscriber: Subscriber = {

            onValueSet(descriptor: DataFieldDescriptor, value: any, oldValue: any, initialValue: any) {
                // Do nothing
            }
        };

        const dataField = new DataField(fieldDescriptor, subscriber);

        dataField.value = "invalid.email";

        // Test the validation fails because the email is invalid
        let valid = validator.validate(dataField, validationContext);

        expect(valid).toEqual(false);

        expect(validationContext.errors[0]).toEqual('Email is invalid');

        // Reset the validation context
        validationContext = {
            errors: [],
            stopWhenInvalid: false
        };

        // Test the validation fails because the value is null
        dataField.value = "a@b.com";

        valid = validator.validate(dataField, validationContext);

        expect(valid).toEqual(true);

        expect(validationContext.errors.length).toEqual(0);
    });
});