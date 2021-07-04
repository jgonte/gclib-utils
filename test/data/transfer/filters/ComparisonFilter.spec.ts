import {
    IsEqualFilter,
    IsNotEqualFilter,
    IsGreaterThanFilter,
    IsGreaterOrEqualFilter,
    IsLessThanFilter,
    IsLessOrEqualFilter
} from '../../../../src/data/transfer/filters/ComparisonFilter';

import createFilter from '../../../../src/data/transfer/helpers/createFilter';

describe("IsEqualFilter test", () => {

    it("builds a filter string for a numeric value", async () => {

        const filter = new IsEqualFilter('field1', 123);

        expect(filter.build()).toEqual('field1 eq 123');
    }); 

    it("builds a filter string for a text value", async () => {

        const filter = new IsEqualFilter('field1', 'some text');

        expect(filter.build()).toEqual("field1 eq 'some text'");
    }); 

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            field: 'field1',
            operator: 'eq',
            value: 'some text'
        });
        
        expect(filter.build()).toEqual("field1 eq 'some text'");
    });
});

describe("IsNotEqualFilter test", () => {

    it("builds a filter string for a numeric value", async () => {

        const filter = new IsNotEqualFilter('field1', 123);

        expect(filter.build()).toEqual('field1 ne 123');
    }); 

    it("builds a filter string for a text value", async () => {

        const filter = new IsNotEqualFilter('field1', 'some text');

        expect(filter.build()).toEqual("field1 ne 'some text'");
    }); 

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            field: 'field1',
            operator: 'ne',
            value: 'some text'
        });
        
        expect(filter.build()).toEqual("field1 ne 'some text'");
    }); 
});

describe("IsGreaterThanFilter test", () => {

    it("builds a filter string for a numeric value", async () => {

        const filter = new IsGreaterThanFilter('field1', 123);

        expect(filter.build()).toEqual('field1 gt 123');
    }); 

    it("builds a filter string for a text value", async () => {

        const filter = new IsGreaterThanFilter('field1', 'some text');

        expect(filter.build()).toEqual("field1 gt 'some text'");
    }); 

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            field: 'field1',
            operator: 'gt',
            value: 'some text'
        });
        
        expect(filter.build()).toEqual("field1 gt 'some text'");
    }); 
});

describe("IsGreaterOrEqualFilter test", () => {

    it("builds a filter string for a numeric value", async () => {

        const filter = new IsGreaterOrEqualFilter('field1', 123);

        expect(filter.build()).toEqual('field1 ge 123');
    }); 

    it("builds a filter string for a text value", async () => {

        const filter = new IsGreaterOrEqualFilter('field1', 'some text');

        expect(filter.build()).toEqual("field1 ge 'some text'");
    }); 

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            field: 'field1',
            operator: 'ge',
            value: 'some text'
        });
        
        expect(filter.build()).toEqual("field1 ge 'some text'");
    });
});

describe("IsLessThanFilter test", () => {

    it("builds a filter string for a numeric value", async () => {

        const filter = new IsLessThanFilter('field1', 123);

        expect(filter.build()).toEqual('field1 lt 123');
    }); 

    it("builds a filter string for a text value", async () => {

        const filter = new IsLessThanFilter('field1', 'some text');

        expect(filter.build()).toEqual("field1 lt 'some text'");
    }); 

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            field: 'field1',
            operator: 'lt',
            value: 'some text'
        });
        
        expect(filter.build()).toEqual("field1 lt 'some text'");
    });
});

describe("IsLessOrEqualFilter test", () => {

    it("builds a filter string for a numeric value", async () => {

        const filter = new IsLessOrEqualFilter('field1', 123);

        expect(filter.build()).toEqual('field1 le 123');
    }); 

    it("builds a filter string for a text value", async () => {

        const filter = new IsLessOrEqualFilter('field1', 'some text');

        expect(filter.build()).toEqual("field1 le 'some text'");
    }); 

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            field: 'field1',
            operator: 'le',
            value: 'some text'
        });
        
        expect(filter.build()).toEqual("field1 le 'some text'");
    });
});