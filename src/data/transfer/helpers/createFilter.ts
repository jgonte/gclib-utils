import { ComparisonOperators, LogicalOperators, MultiValueOperators, StringFunctions } from "../../../gclib-utils";
import { IsEqualFilter, IsGreaterOrEqualFilter, IsGreaterThanFilter, IsLessOrEqualFilter, IsLessThanFilter, IsNotEqualFilter } from "../filters/ComparisonFilter";
import { AndFilter, OrFilter } from "../filters/LogicalFilter";
import { InFilter, NotInFilter } from "../filters/MultiValueFilter";
import { NotFilter } from "../filters/NotFilter";
import { ContainsStringFilter, EndsWithStringFilter, StartsWithStringFilter } from "../filters/StringFilter";
import { FilterUrlBuilder } from "../Interfaces";

export default function createFilter(filter: any): FilterUrlBuilder {

    const operator = filter.operator.trim().toLowerCase();

    switch (operator) {
        case LogicalOperators.And:
            return new AndFilter(filter.filters.map((f: any) => createFilter(f)));
        case LogicalOperators.Or:
            return new OrFilter(filter.filters.map((f: any) => createFilter(f)));
        case LogicalOperators.Not:
            return new NotFilter(createFilter(filter.filter));
        case MultiValueOperators.In:
            {
                const values = typeof filter.values === 'function' ?
                    filter.values() :
                    filter.values;

                return new InFilter(filter.field, values);
            }
        case MultiValueOperators.NotIn:
            {
                const values = typeof filter.values === 'function' ?
                    filter.values() :
                    filter.values;

                return new NotInFilter(filter.field, values);
            }
        case ComparisonOperators.IsEqual:
            return new IsEqualFilter(filter.field, filter.value);
        case ComparisonOperators.IsNotEqual:
            return new IsNotEqualFilter(filter.field, filter.value);
        case ComparisonOperators.IsGreaterThan:
            return new IsGreaterThanFilter(filter.field, filter.value);
        case ComparisonOperators.IsGreaterThanOrEqual:
            return new IsGreaterOrEqualFilter(filter.field, filter.value);
        case ComparisonOperators.IsLessThan:
            return new IsLessThanFilter(filter.field, filter.value);
        case ComparisonOperators.IsLessThanOrEqual:
            return new IsLessOrEqualFilter(filter.field, filter.value);
        // case 'in': // in
        // case 'ni': // not in
        // case 'bw': // begins with
        // case 'bn': // does not begin with
        // case 'ew': // ends with
        // case 'en': // does not end with
        //case 'nc': // does not contain
        case StringFunctions.Contains:
            return new ContainsStringFilter(filter.field, filter.value);
        case StringFunctions.StartsWith:
            return new StartsWithStringFilter(filter.field, filter.value);
        case StringFunctions.EndsWith:
            return new EndsWithStringFilter(filter.field, filter.value);
        // case 'nu': // is null
        // case 'nn': // is not null
        //     {
        //         if (!filter.fieldName) {

        //             throw new Error(`Operator: '${filter.operator}' requires a field.`);
        //         }

        //         return `${filter.fieldName} ${operator}`;
        //     }

        default: throw new Error(`Unknown operator: '${filter.operator}' in filter.`);
    }
}