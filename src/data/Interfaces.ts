export interface DataFieldDescriptor {

    /**
     * Whether the field is an identifier of the record
     */
    id: boolean;

    /**
     * The name of the field
     */
    name: string;

    /**
     * The type of the field
     */
    type: Function;

    /**
     * The default value of the field
     */
    value: any;

    /**
     * The validators of the field
     */
    validators: any[];
}

export interface IdentifierInfo {

    /**
     * The value of the identifier
     */
    value: any;

    /**
     * Whether there is no id field in the field descriptors
     */
    noDescriptorsId: boolean;

    /**
     * Whether has id fields in the field descriptors but one or more id field values are undefined
     */
    hasUndefinedIdentifiers: boolean;
}

export interface DataProvider {

    getData() : any;
}

export interface DataSetter {

    setData(data: any) : void;
}
