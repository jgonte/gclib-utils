const defaultValueConverter = {

    fromString: (value: any, type: Function) => {

        switch (type) {
            case Boolean:
                return value !== null && value !== 'false';
            case Number:
                return value === null ? null : Number(value);
            case Date:
                return new Date(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }

        return value;
    },

    toString: (value: any, type: Function) => {

        switch (type) {
            case Boolean:
            case Number:
                return value.toString();
            case Date:
                return value.toISOString();
            case Object:
            case Array:
                return value == null ? value : JSON.stringify(value);
        }

        return value;
    }
};

export default defaultValueConverter;