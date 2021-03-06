import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import TestAuthProvider from '../TestAuthProvider';
import SingleRecordLoader from '../../../../src/data/transfer/loaders/SingleRecordLoader';
import { ErrorResponse } from '../../../../src/data/transfer/Interfaces';

enableFetchMocks();

beforeEach(() => {
	fetchMock.resetMocks();
});

// Initialize the authProvider
const authProvider = new TestAuthProvider();

/**
 * SingleRecordLoader test
 */
describe("SingleRecordLoader test", () => {

	it("loads a single item as JSON", async () => {

		fetchMock.mockResponse(JSON.stringify(
			{
				id: 1,
				name: 'Sarah'
			}),
			{
				headers: { "content-type": "application/json; charset=utf-8" }
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

		const singleRecordLoader = new SingleRecordLoader({
			onData: (d: any) => data = d.payload
		});

		await singleRecordLoader.load(request);

		expect(data.id).toEqual(1);

		expect(data.name).toEqual('Sarah');

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

	it("loads a single item as XML", async () => {

		fetchMock.mockResponse(`
			<person>
				<id>1</id>
				<name>Sarah</name>
			</person>`,
			{
				headers: { "content-type": "application/xml" }
			});

		const request = {
			url: 'https://someurl.dev',
			headers: {
				Header1: 'abc',
				"content-type": "application/xml"
			},
			params: {
				param1: 34,
				param2: 'some text'
			},
			authProvider
		};

		let data: any;

		const singleRecordLoader = new SingleRecordLoader({
			onData: (d: any) => data = d.payload
		});

		await singleRecordLoader.load(request);

		expect(data.id).toEqual('1');

		expect(data.name).toEqual('Sarah');

		const headers = new Headers();

		headers.append('Header1', 'abc');

		headers.append('content-type', 'application/xml');

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

	it("loads a single item as JSON using select parameters", async () => {

		fetchMock.mockResponse(JSON.stringify(
			{
				id: 1,
				name: 'Sarah'
			}),
			{
				headers: { "content-type": "application/json" }
			});

		let data: any;

		const request = {
			url: 'https://someurl.dev',
			headers: {
				Header1: 'abc'
			},
			params: {
				param1: 34,
				param2: 'some text'
			},
			select: [
				"field1",
				"field2",
				"field3"
			],
			authProvider
		};

		const singleRecordLoader = new SingleRecordLoader({
			onData: (d: any) => data = d.payload
		});

		await singleRecordLoader.load(request);

		expect(data.id).toEqual(1);

		expect(data.name).toEqual('Sarah');

		const headers = new Headers();

		headers.append('Header1', 'abc');

		//headers.append('content-type', 'application/json'); Not set by default

		headers.append('Authorization', 'Bearer eyJhGci0i');

		expect(fetchMock).toHaveBeenCalledWith(
			"https://someurl.dev?$select=field1,field2,field3&param1=34&param2=some text", {
			headers,
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			body: undefined
		});

	});

	it("calls the onError function when there is an error", async () => {

		fetchMock.mockReject(() => Promise.reject('invalid content type'));

		let error: ErrorResponse | undefined;

		const request = {
			url: 'https://someurl.dev'
		};

		const singleRecordLoader = new SingleRecordLoader({
			onError: (err: ErrorResponse) => error = err
		});

		await singleRecordLoader.load(request);

		expect(error).toEqual('invalid content type');

	});

});
