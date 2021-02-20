import { FilterUrlBuilder } from "../Interfaces";

abstract class StringFilter implements FilterUrlBuilder {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The function of the filter
		 */
		public fcn: 'contains' | 'startswith' | 'endswith',

		/**
		 * The value to filter by
		 */
		public value: string
	) { }

	build(): string {

		if (!this.field) {

			throw new Error(`String filter with function: '${this.fcn}' requires a field.`);
		}

		if (!this.value) {

			throw new Error(`String filter for field: '${this.field}' requires a value.`);
		}

		return `${this.fcn}(${this.field}, ${`'${this.value}'`})`;
	}
}

export class ContainsStringFilter extends StringFilter {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The value to filter by
		 */
		public value: string
	) {

		super(field, 'contains', value);
	}
}

export class StartsWithStringFilter extends StringFilter {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The value to filter by
		 */
		public value: string
	) {

		super(field, 'startswith', value);
	}
}

export class EndsWithStringFilter extends StringFilter {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The value to filter by
		 */
		public value: string
	) {

		super(field, 'endswith', value);
	}
}
