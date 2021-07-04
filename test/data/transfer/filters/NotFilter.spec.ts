import { IsEqualFilter, IsGreaterThanFilter } from '../../../../src/data/transfer/filters/ComparisonFilter';
import { AndFilter } from '../../../../src/data/transfer/filters/LogicalFilter';
import { NotFilter } from '../../../../src/data/transfer/filters/NotFilter';

import createFilter from '../../../../src/data/transfer/helpers/createFilter';

describe("NotFilter test", () => {

    it("builds a filter string for different filters", async () => {

        const filter = new NotFilter(
            new AndFilter([
                new IsEqualFilter('field1', 123),
                new IsGreaterThanFilter('field2', 'some text')
            ])
        );

        expect(filter.build()).toEqual("not field1 eq 123 and field2 gt 'some text'");
    });

    it("builds a filter using the createFilter helper", async () => {

        const filter = createFilter({
            operator: 'not',
            filter:
            {
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
            }
        });

        expect(filter.build()).toEqual("not field1 eq 123 and field2 gt 'some text'");
    });

});