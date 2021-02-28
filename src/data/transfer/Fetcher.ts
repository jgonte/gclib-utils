import deserializeXmlDocument from "../../utils/deserializeXmlDocument";
import template from "../../utils/template";
import { ErrorResponse, FetchCallbacks, FetchRequest } from "./Interfaces";

export default class Fetcher implements FetchCallbacks {

    onResponse?: (response: Response) => void;

    onError?: (error: ErrorResponse) => void;

    onData?: (data: Record<string, any>) => void;

    constructor(

        onResponse?: (response: Response) => void,

        onError?: (error: ErrorResponse) => void,

        onData?: (data: Record<string, any>) => void
    ) {

        if (onResponse !== undefined) {

            this.onResponse = onResponse.bind(this);
        }

        if (onError !== undefined) {

            this.onError = onError.bind(this);
        }

        if (onData !== undefined) {

            this.onData = onData.bind(this);
        }
    }
    async fetch(request: FetchRequest) {

        const {
            method = 'GET',
            cors,
            authProvider
        } = request;

        const url = this.buildUrl(request);

        try {

            const response = await fetch(url, {
                method,
                headers: await this.buildHeaders(request),
                body: this.buildBody(request),
                mode: cors === false ? 'same-origin' : 'cors',
                credentials: authProvider !== undefined ? 'include' : undefined
            });

            if (response.status != 204) { // No content

                await this.processResponse(response);
            }
        }
        catch (error) {

            this.handleError(error);
        }
    }

    /**
     * Replaces any template in the URL with the parameters of the request
     * @param request
     */
    buildUrl(request: FetchRequest): string {

        const {
            url,
            params
        } = request;

        const {
            text,
            keysNotInData
        } = template(url, params);

        const qs: string[] = [];

        // Add the parameters not found in the template to the query
        const queryParams = keysNotInData
            .map(key => `${key}=${params[key]}`)
            .join('&');

        return text!.indexOf('?') > -1 ? `${text}&${queryParams}` : `${text}?${queryParams}`;
    }

    /**
     * Builds the headers to be sent from the key-value pair headers of the configuration
     * @param request
     */
    async buildHeaders(request: FetchRequest): Promise<HeadersInit> {

        const requestHeaders = request.headers || {};

        let contentTypeHeader;

        for (const key in requestHeaders) {
            
            if (key.toLowerCase() === 'content-type')
            {
                contentTypeHeader = requestHeaders[key];
            }
        }

        if (contentTypeHeader === undefined) {

            requestHeaders['content-type'] = 'application/json';
        }

        const headers = new Headers();

        // Append the headers from the configuration
        for (const key in requestHeaders) {

            if (requestHeaders.hasOwnProperty(key)) {

                headers.append(key, requestHeaders[key]);
            }
        }
 
        // Add the authorization header
        if (request.authProvider) {

            const authHeader = await request.authProvider.authorize();

            if (authHeader) {

                for (const key in authHeader) {

                    if (authHeader.hasOwnProperty(key)) {

                        headers.append(key, authHeader[key]);
                    }
                }
            }
        }

        return headers;
    }

    buildBody(request: FetchRequest) {

        const {
            data
        } = request;

        return data !== undefined ? JSON.stringify(data) : undefined;
    }

    async processResponse(response: Response) {

        if (this.onResponse) {

            this.onResponse(response);
        }

        if (response.status > 299) {

            const error = {
                status: response.status,
                statusText: response.statusText,
                payload: await this.parseContent(response)
            };

            this.handleError(error);

            return;
        }

        if (this.onData !== undefined) {

            this.onData({
                headers: response.headers,
                payload: await this.parseContent(response)
            });
        }
    }

    /**
     * Converts the content to an object if possible according to the content type returned from the server
     */
    async parseContent(response: Response) {

        let contentType: string | null = response.headers.get('content-type');

        const content = await response.text();

        if (contentType !== null) {

            contentType = contentType.split(';')[0].trim();

            switch (contentType) {
                case 'application/json': return JSON.parse(content);
                case 'application/xml': {

                    const document: Document = (new window.DOMParser()).parseFromString(content, "text/xml");

                    return deserializeXmlDocument(document);
                }
                default: return content;
            }
        }
        else { // Default to text

            return content;
        }
    }

    handleError(error: ErrorResponse) {

        if (this.onError !== undefined) {

            this.onError(error);
        }
        else {

            throw error;
        }
    }
}