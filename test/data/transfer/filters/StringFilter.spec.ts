import {
    ContainsStringFilter,
    StartsWithStringFilter,
    EndsWithStringFilter
} from '../../../../src/data/transfer/filters/StringFilter';

import createFilter from '../../../../src/data/transfer/helpers/createFilter';

describe("ContainsStringFilter test", () => {

    it("builds a filter string for a text value", async () => {

        const filter = new ContainsStringFilter('field1', 'some text');

        expect(filter.build()).toEqual("contains(field1, 'some text')");
    }); 

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            field: 'field1',
            operator: 'contains',
            value: 'some text'
        });
        
        expect(filter.build()).toEqual("contains(field1, 'some text')");
    });

});

describe("StartsWithStringFilter test", () => {

    it("builds a filter string for a text value", async () => {

        const filter = new StartsWithStringFilter('field1', 'some text');

        expect(filter.build()).toEqual("startswith(field1, 'some text')");
    }); 

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            field: 'field1',
            operator: 'startswith',
            value: 'some text'
        });
        
        expect(filter.build()).toEqual("startswith(field1, 'some text')");
    });
});

describe("EndsWithStringFilter test", () => {

    it("builds a filter string for a text value", async () => {

        const filter = new EndsWithStringFilter('field1', 'some text');

        expect(filter.build()).toEqual("endswith(field1, 'some text')");
    }); 

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            field: 'field1',
            operator: 'endswith',
            value: 'some text'
        });
        
        expect(filter.build()).toEqual("endswith(field1, 'some text')");
    });
});
