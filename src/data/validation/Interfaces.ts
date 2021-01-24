export interface ValidationContext {

    /** The error messages */
    errors: string[];

    /** Whether to stop validating if the last validation failed */
    stopWhenInvalid: boolean;
}