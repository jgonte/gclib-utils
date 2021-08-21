import isPrimitive from '../../src/utils/isPrimitive';

describe('isPrimitive tests', () => {

	it('it should return true for a string', () => {

		expect(isPrimitive('Some text')).toEqual(true);
	});

    it('it should return true for a number', () => {

		expect(isPrimitive(26)).toEqual(true);
	});

    it('it should return true for a boolean', () => {

		expect(isPrimitive(false)).toEqual(true);
	});

    it('it should return true for a bigint', () => {

		expect(isPrimitive(BigInt(1))).toEqual(true);
	});

    it('it should return false for an object', () => {

		expect(isPrimitive({})).toEqual(false);
	});

    it('it should return false for an array', () => {

		expect(isPrimitive([])).toEqual(false);
	});

    it('it should return false for a function', () => {

		expect(isPrimitive(() => {})).toEqual(false);
	});
});