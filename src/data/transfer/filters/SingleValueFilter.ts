import { FilterUrlBuilder } from "../Interfaces";

export default class SingleValueFilter implements FilterUrlBuilder {

	build(): string {

		throw new Error('Method not implemented.');

		// case 'nu': // is null
		// case 'nn': // is not null
		//     {
		//         if (!filter.fieldName) {

		//             throw new Error(`Operator: '${filter.operator}' requires a field.`);
		//         }

		//         return `${filter.fieldName} ${operator}`;
		//     }
	}
}
