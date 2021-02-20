import { FilterUrlBuilder } from "../Interfaces";

/**
 * An 'and' / 'or' filter builder
 */
abstract class LogicalFilter implements FilterUrlBuilder {

	constructor(

		/**
		 * The operator of the logical filter
		 */
		public operator: 'and' | 'or',

		/**
		 * The children filters of this filter
		 */
		public filters: FilterUrlBuilder[]
	) { }

	build(): string {

		const filters = this.filters

		// TODO: Add checking for invalid parameters. In this case it must only be operator and filters

		if (!filters.length) {

			throw new Error(`Operator: '${this.operator}' requires at least one child filter.`)
		}

		return this.filters.map(item => item.build()).join(` ${this.operator} `) // Recurse
	}
}

export class AndFilter extends LogicalFilter {

	constructor(

		/**
		 * The children filters of this filter
		 */
		public filters: FilterUrlBuilder[]
	) {

		super('and', filters);
	}
}

export class OrFilter extends LogicalFilter {

	constructor(

		/**
		 * The children filters of this filter
		 */
		public filters: FilterUrlBuilder[]
	) {

		super('or', filters);
	}
}
