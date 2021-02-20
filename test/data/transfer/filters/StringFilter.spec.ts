import {
    ContainsStringFilter,
    StartsWithStringFilter,
    EndsWithStringFilter
} from '../../../../src/data/transfer/filters/StringFilter';

describe("ContainsStringFilter test", () => {

    it("builds a filter string for a text value", async () => {

        const filter = new ContainsStringFilter('field1', 'some text');

        expect(filter.build()).toEqual("contains(field1, 'some text')");
    }); 

});

describe("StartsWithStringFilter test", () => {

    it("builds a filter string for a text value", async () => {

        const filter = new StartsWithStringFilter('field1', 'some text');

        expect(filter.build()).toEqual("startswith(field1, 'some text')");
    }); 

});

describe("EndsWithStringFilter test", () => {

    it("builds a filter string for a text value", async () => {

        const filter = new EndsWithStringFilter('field1', 'some text');

        expect(filter.build()).toEqual("endswith(field1, 'some text')");
    }); 

});
