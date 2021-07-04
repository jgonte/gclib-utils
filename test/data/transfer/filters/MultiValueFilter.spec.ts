import {
    InFilter,
    NotInFilter
} from '../../../../src/data/transfer/filters/MultiValueFilter';

import createFilter from '../../../../src/data/transfer/helpers/createFilter';

describe("InFilter test", () => {

    it("builds a filter string for a numeric values", async () => {

        const filter = new InFilter('field1', [123, 'some text']);

        expect(filter.build()).toEqual("field1 in (123, 'some text')");
    }); 

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            field: 'field1',
            operator: 'in',
            values: [123, 'some text']
        });
        
        expect(filter.build()).toEqual("field1 in (123, 'some text')");
    });
});

describe("NotInFilter test", () => {

    it("builds a filter string for a numeric value", async () => {

        const filter = new NotInFilter('field1', [123, 'some text']);

        expect(filter.build()).toEqual("field1 not in (123, 'some text')");
    }); 

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            field: 'field1',
            operator: 'not in',
            values: [123, 'some text']
        });
        
        expect(filter.build()).toEqual("field1 not in (123, 'some text')");
    });
});