import formatDate from '../../src/utils/formatDate';

describe('formatDate tests', () => {

	it('formats the date to a short locale by default', () => {

		const formattedDate = formatDate('2021-02-23T10:07:26.6782684-05:00');

		expect(formattedDate).toEqual('2/23/2021');
	});

});