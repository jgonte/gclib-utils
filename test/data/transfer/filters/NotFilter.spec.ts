import { IsEqualFilter, IsGreaterThanFilter } from '../../../../src/data/transfer/filters/ComparisonFilter';
import { AndFilter } from '../../../../src/data/transfer/filters/LogicalFilter';
import { NotFilter } from '../../../../src/data/transfer/filters/NotFilter';

describe("AndFilter test", () => {

    it("builds a filter string for different filters", async () => {

        const filter = new NotFilter(
            new AndFilter([
                new IsEqualFilter('field1', 123),
                new IsGreaterThanFilter('field2', 'some text')
            ])
        );

        expect(filter.build()).toEqual("not field1 eq 123 and field2 gt 'some text'");
    });

});