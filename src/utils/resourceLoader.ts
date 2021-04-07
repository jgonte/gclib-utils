const cache = {};

export const resourceLoader = {

    /**
     * Gets the resource
     * @param path The path to the resource
     */
    async get(path: any) {

        let content = (cache as any)[path];

        if (content !== undefined) {

            return content;
        }

        const response = await fetch(path);

        // Right now we are only interested in the text response
        
        content = await response.text();

        (cache as any)[path] = content;

        return content;
    }

};