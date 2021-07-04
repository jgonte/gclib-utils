import {
    IsEqualFilter,
    IsGreaterThanFilter,
    IsLessThanFilter,
} from '../../../../src/data/transfer/filters/ComparisonFilter';

import {
    AndFilter,
    OrFilter
} from '../../../../src/data/transfer/filters/LogicalFilter';

import createFilter from '../../../../src/data/transfer/helpers/createFilter';

describe("AndFilter test", () => {

    it("builds a filter string for different filters", async () => {

        const filter = new AndFilter([
            new IsEqualFilter('field1', 123),
            new IsGreaterThanFilter('field2', 'some text')
        ]);

        expect(filter.build()).toEqual("field1 eq 123 and field2 gt 'some text'");
    });  

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            operator: 'and',
            filters: [
                {
                    field: 'field1',
                    operator: 'eq',
                    value: 123
                },
                {
                    field: 'field2',
                    operator: 'gt',
                    value: 'some text'
                }
            ]
        });
        
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
    
    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            operator: 'or',
            filters: [
                {
                    field: 'field1',
                    operator: 'eq',
                    value: 123
                },
                {
                    field: 'field2',
                    operator: 'gt',
                    value: 'some text'
                }
            ]
        });
        
        expect(filter.build()).toEqual("field1 eq 123 or field2 gt 'some text'");
    });

});