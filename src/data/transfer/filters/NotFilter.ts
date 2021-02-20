import { FilterUrlBuilder } from "../Interfaces";

/**
 * A 'not' filter
 */
export class NotFilter implements FilterUrlBuilder {

	constructor(

		/**
		 * The child filter of this filter
		 */
		public filter: FilterUrlBuilder
	) { }

	build(): string {

		if (this.filter === undefined) {

			throw Error(`'Not' filter requires one child filter.`);
		}

		const childFilter = this.filter.build(); // Recurse

		return `not ${childFilter}`;
	}
}
