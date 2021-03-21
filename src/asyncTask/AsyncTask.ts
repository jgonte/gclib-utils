export interface AsyncTaskConfig {

    /**
     * The function that returns the promise that runs async
     */
    run: () => Promise<any>;

    /**
     * The callback to execute when success
     */
    success: (...args: any[]) => void;

    /**
     * The callback to execute when error
     */
    error?: (err: any) => void;

    /**
    * The callback to execute regardless of the try and catch result
    */
    always?: () => void;
}

export default class AsyncTask {

    /**
     * The function that returns the promise that runs async
     */
    _run: () => Promise<any>;

    /**
     * The callback to execute when success
     */
    _success: (...args: any[]) => void;

    /**
     * The callback to execute when error
     */
    _error?: (err: any) => void;

    /**
    * The callback to execute regardless of the try and catch result
    */
    _always?: () => void;

    constructor(cfg: AsyncTaskConfig) {

        this._run = cfg.run;

        this._success = cfg.success;

        this._error = cfg.error;

        this._always = cfg.always;
    }

    async execute() {

        const {
            _run,
            _success,
            _error,
            _always
        } = this;

        try {

            await _run().then(args => _success(args));
        }
        catch (err) {
            
            _error?.(err);
        }
        finally {

            _always?.();
        }
    }
}