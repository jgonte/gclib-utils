import {
    IsEqualFilter,
    IsGreaterThanFilter,
    IsLessThanFilter,
} from '../../../../src/data/transfer/filters/ComparisonFilter';

import {
    AndFilter,
    OrFilter
} from '../../../../src/data/transfer/filters/LogicalFilter';

describe("AndFilter test", () => {

    it("builds a filter string for different filters", async () => {

        const filter = new AndFilter([
            new IsEqualFilter('field1', 123),
            new IsGreaterThanFilter('field2', 'some text')
        ]);

        expect(filter.build()).toEqual("field1 eq 123 and field2 gt 'some text'");
    });  

});

describe("OrFilter test", () => {

    it("builds a filter string for different filters", async () => {

        const filter = new OrFilter([
            new IsEqualFilter('field1', 123),
            new IsLessThanFilter('field2', 'some text')
        ]);

        expect(filter.build()).toEqual("field1 eq 123 or field2 lt 'some text'");
    });  

});