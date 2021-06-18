import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import TestAuthProvider from "../TestAuthProvider";
import CollectionLoader from '../../../../src/data/transfer/loaders/CollectionLoader';
import { AndFilter } from '../../../../src/data/transfer/filters/LogicalFilter';
import { IsEqualFilter, IsGreaterOrEqualFilter, IsGreaterThanFilter, IsLessOrEqualFilter, IsLessThanFilter, IsNotEqualFilter } from '../../../../src/data/transfer/filters/ComparisonFilter';

enableFetchMocks();

beforeEach(() => {
	fetchMock.resetMocks();
});

// Initialize the authProvider
const authProvider = new TestAuthProvider();

/**
 * CollectionLoader test
 */
describe("CollectionLoader test", () => {

	it("loads a collection as JSON", async () => {

		fetchMock.mockResponse(JSON.stringify([
			{
				id: 1,
				name: 'Sarah'
			},
			{
				id: 2,
				name: 'Mark'
			},
			{
				id: 3,
				name: 'Yana'
			}
		]), {
			headers: { "content-type": "application/json" }
		});

		const request = {
			url: 'https://someurl.dev',
			headers: {
				Header1: 'abc'
			},
			params: {
				param1: 34,
				param2: 'some text'
			},
			authProvider
		};

		let data: any;

		const collectionLoader = new CollectionLoader({
			onData: (d: any) => data = d.payload
		});

		await collectionLoader.load(request);

		expect(data.length).toEqual(3);

		expect(data[0].id).toEqual(1);

		expect(data[0].name).toEqual('Sarah');

		expect(data[1].id).toEqual(2);

		expect(data[1].name).toEqual('Mark');

		expect(data[2].id).toEqual(3);

		expect(data[2].name).toEqual('Yana');

		const headers = new Headers();

		headers.append('Header1', 'abc');

		//headers.append('content-type', 'application/json');

		headers.append('Authorization', 'Bearer eyJhGci0i');

		expect(fetchMock).toHaveBeenCalledWith(
			'https://someurl.dev?param1=34&param2=some text', {
			headers,
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			body: undefined
		});

	});

	it("loads a collection using extended parameters", async () => {

		fetchMock.mockResponse(JSON.stringify([
			{
				id: 1,
				name: 'Sarah'
			},
			{
				id: 2,
				name: 'Mark'
			},
			{
				id: 3,
				name: 'Yana'
			}
		]), {
			headers: { "content-type": "application/json" }
		});

		const request = {
			url: 'https://someurl.dev',
			headers: {
				Header1: 'abc'
			},
			params: {
				param1: 34,
				param2: 'some text'
			},
			authProvider,
			top: 10,
			skip: 20,
			select: [
				"field1",
				"field2",
				"field3"
			],
			filter: new AndFilter(
				[
					new IsEqualFilter("field1", 123),
					new IsNotEqualFilter("field2", "expired"),
					new IsGreaterThanFilter("field3", new Date(2002, 4, 25).toLocaleDateString()),
					new IsGreaterOrEqualFilter("field1", 123),
					new IsLessThanFilter("field1", 456),
					new IsLessOrEqualFilter("field3", new Date(2102, 4, 25).toLocaleDateString()),
				]),
			orderBy: [
				{
					field: "field1",
					order: "asc"
				},
				{
					field: "field2",
					order: "desc"
				}
			]
		};

		let data: any;

		const collectionLoader = new CollectionLoader({
			onData: (d: any) => data = d.payload
		});

		await collectionLoader.load(request);

		expect(data.length).toEqual(3);

		expect(data[0].id).toEqual(1);

		expect(data[0].name).toEqual('Sarah');

		expect(data[1].id).toEqual(2);

		expect(data[1].name).toEqual('Mark');

		expect(data[2].id).toEqual(3);

		expect(data[2].name).toEqual('Yana');

		const headers = new Headers();

		headers.append('Header1', 'abc');

		//headers.append('content-type', 'application/json');

		headers.append('Authorization', 'Bearer eyJhGci0i');

		expect(fetchMock).toHaveBeenCalledWith(
			"https://someurl.dev?$select=field1,field2,field3&$top=10&$skip=20&$filter=field1 eq 123 and field2 ne 'expired' and field3 gt '5/25/2002' and field1 ge 123 and field1 lt 456 and field3 le '5/25/2102'&$orderby=field1 asc, field2 desc&param1=34&param2=some text",
			{
				headers,
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				body: undefined
			});

	});

	it("calls the onError function when there is an error", async () => {

		fetchMock.mockReject(() => Promise.reject('invalid content type'));

		let error: Error | undefined;

		const request = {
			url: 'https://someurl.dev'
		};

		const collectionLoader = new CollectionLoader({
			onError: (err: any) => error = err
		});

		await collectionLoader.load(request);

		expect(error).toEqual('invalid content type');

	});

});
