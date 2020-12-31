export default class CallSequence {

    /**
     * The calls to perform for functions that have the same member name across the different mixins
     */
    _calls: Function[] = [];

    addCall(call: Function) {

        this._calls.push(call);
    }

    /**
     * Returns a function that performs the call 
     */
    wrap() {

        const me = this; // this -> FunctionList

        return function () {

            const calls = me._calls;

            // Execute the first one to get the value so we can analyze its type
            //@ts-ignore
            let returnValue = calls[0].apply(this, arguments);

            const returnType = typeof returnValue;

            // Execute the rest of the functions
            const length = calls.length;

            for (let i = 1; i < length; ++i) {

                //@ts-ignore
                const tempValue = calls[i].apply(this, arguments);

                if (returnType !== undefined &&
                    tempValue !== undefined) {

                    if (Array.isArray(returnValue)) {

                        returnValue = returnValue.concat(tempValue);
                    }
                    else {
                        
                        returnValue = Object.assign(returnValue, tempValue);
                    }
                }               
            }

            return returnValue;
        }
    }
}