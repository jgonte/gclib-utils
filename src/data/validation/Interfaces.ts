export interface ValidatorConfig {

    /** The type of validator to create */
    type: string;
}

/**
 * Handle of a failed validation
 */
export interface ValidationFailedHandler {

    onValidationFailed(error: string): void;
}

export interface ValidationContext {

    /** The error messages */
    errors: string[];

    /** Whether to stop validating if the last validation failed */
    stopWhenInvalid: boolean;
}