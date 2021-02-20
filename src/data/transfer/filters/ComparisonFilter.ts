import { FilterUrlBuilder } from "../Interfaces";

abstract class ComparisonFilter implements FilterUrlBuilder {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The operator of the filter
		 */
		public operator: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le',

		/**
		 * The value to filter by
		 */
		public value: any
	) { }

	build(): string {

		if (this.field === undefined) {

			throw Error(`Comparison filter with operator: '${this.operator}' requires a field.`);
		}

		if (this.value === undefined) {

			throw new Error(`Comparison filter for field: '${this.field}' requires a value.`);
		}

		const value = typeof this.value === 'number' ? this.value : `'${this.value}'`;

		return `${this.field} ${this.operator} ${value}`;
	}
}

export class IsEqualFilter extends ComparisonFilter {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The value to filter by
		 */
		public value: any
	) {

		super(field, 'eq', value);
	}
}

export class IsNotEqualFilter extends ComparisonFilter {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The value to filter by
		 */
		public value: any
	) {

		super(field, 'ne', value);
	}
}

export class IsGreaterThanFilter extends ComparisonFilter {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The value to filter by
		 */
		public value: any
	) {

		super(field, 'gt', value);
	}
}

export class IsGreaterOrEqualFilter extends ComparisonFilter {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The value to filter by
		 */
		public value: any
	) {

		super(field, 'ge', value);
	}
}

export class IsLessThanFilter extends ComparisonFilter {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The value to filter by
		 */
		public value: any
	) {

		super(field, 'lt', value);
	}
}

export class IsLessOrEqualFilter extends ComparisonFilter {

	constructor(

		/**
		 * The name of the field to filter
		 */
		public field: string,

		/**
		 * The value to filter by
		 */
		public value: any
	) {

		super(field, 'le', value);
	}
}
