import { FilterUrlBuilder } from "../Interfaces";

abstract class MultiValueFilter implements FilterUrlBuilder {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The operator of the filter
		 */
		public operator: 'in' | 'not in',

		/**
		 * The values to filter by
		 */
		public values: any[]
	) { }

	build(): string {

		if (this.field === undefined) {

			throw Error('Multivalue filter requires a field name.');
		}

		const values = this.values.map(v => (typeof v === 'number' ? v : `'${v}'`)).join(', ');

		return `${this.field} ${this.operator} (${values})`;
	}
}

export class InFilter extends MultiValueFilter {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The values to filter by
		 */
		public values: any[]
	) {

		super(field, 'in', values);
	}
}

export class NotInFilter extends MultiValueFilter {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The values to filter by
		 */
		public values: any[]
	) {

		super(field, 'not in', values);
	}
}
