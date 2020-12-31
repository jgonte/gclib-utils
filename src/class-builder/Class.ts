import CallSequence from "./CallSequence";

/**
 * What action to take when the name of the property is a function and it exists on the base class
 * or mixins
 */
export enum ShadowOptions {
    /**
     * Ignore the duplicated name and therefore the last overwrite shadows all the previous ones
     */
    Shadow = 1,

    /**
     * Create a call sequence to combine all the calls into one
     */
    Combine,

    /**
     * Throw an error
     */
    Error
}

interface CreateClassOptions {

    /**
     * The name of the class to create
     */
    name: string;

    /**
     * The configuration with the properties of the class to create
     */
    properties: any;

    /**
     * The base class to extend from
     */
    base?: Function;

    /**
     * The mixins to copy to the class
     */
    mixins?: any[];

    /**
     * The options to deal with duplicate properties
     */
    shadowOptions?: any
}

const skipProperties: string[] = [
    'constructor',
    'prototype'
];

/**
 * The actions or phases required to create a class
 */
enum CreateClassActions {

    /**
     * Linking to the base prototype
     */
    Extend = 1,

    /**
     * Copying the mixins
     */
    Mixin,

    /**
     * Applying the properties of the derived object
     */
    Property
}

const defaultShadowOptionsWithoutMixins: any = {

    [CreateClassActions.Extend]: ShadowOptions.Shadow,

    [CreateClassActions.Mixin]: ShadowOptions.Combine,

    [CreateClassActions.Property]: ShadowOptions.Shadow
}

const defaultShadowOptionsWithMixins: any = {

    [CreateClassActions.Extend]: ShadowOptions.Combine,

    [CreateClassActions.Mixin]: ShadowOptions.Combine,

    [CreateClassActions.Property]: ShadowOptions.Combine
}

function getShadowOption(
    shadowOptionsMap: Map<string | CreateClassActions, ShadowOptions>,
    key: string,
    action: CreateClassActions): ShadowOptions | undefined {

    let shadowOption = shadowOptionsMap.get(key);

    if (shadowOption === undefined) {

        shadowOption = shadowOptionsMap.get(action.toString());
    }

    return shadowOption;
}

const Class = {

    create(options: CreateClassOptions): any {

        const {
            name,
            properties,
            base,
            mixins,
            shadowOptions
        } = options;

        const shadowOptionsMap = new Map<string, ShadowOptions>();

        // Set the shadow options provided in the class
        if (shadowOptions !== undefined) {

            for (const key in shadowOptions) {

                if (shadowOptions.hasOwnProperty(key) &&
                    !shadowOptionsMap.has(key)) {

                    shadowOptionsMap.set(key, shadowOptions[key]);
                }
            }
        }

        const defaultShadowOptions = mixins === undefined ?
            defaultShadowOptionsWithoutMixins :
            defaultShadowOptionsWithMixins;

        // Set default shadow options if not set already
        for (const key in defaultShadowOptions) {

            if (defaultShadowOptions.hasOwnProperty(key) &&
                !shadowOptionsMap.has(key)) {

                shadowOptionsMap.set(key, defaultShadowOptions[key]);
            }
        }

        const combineConstructorExtend =
            base !== undefined &&
            getShadowOption(shadowOptionsMap, 'constructor', CreateClassActions.Extend) === ShadowOptions.Combine;

        const combineConstructorMixin =
            mixins !== undefined &&
            getShadowOption(shadowOptionsMap, 'constructor', CreateClassActions.Mixin) === ShadowOptions.Combine;

        function F() {

            if (combineConstructorExtend) {

                //@ts-ignore
                base.apply(this, arguments);
            }

            if (combineConstructorMixin) {

                for (let i = 0; i < mixins!.length; ++i) {

                    const mixin = mixins![i];

                    //@ts-ignore
                    mixin.apply(this, arguments);
                }
            }

            // Call the derived constructor regardless of the shadow option
            //@ts-ignore
            properties.constructor.apply(this, arguments);
        }

        const callSequences = new Map();

        // Link to the prototype of the base class
        if (base !== undefined) {

            this.extend(F, base, callSequences, shadowOptionsMap);
        }

        // Apply the mixins
        if (mixins !== undefined) {

            for (let i = 0; i < mixins.length; ++i) {

                const mixin = mixins[i];

                // Static properties
                for (const key in mixin) {

                    this.copyProperty(
                        key,
                        mixin,
                        F,
                        callSequences,
                        shadowOptionsMap,
                        CreateClassActions.Mixin
                    );
                }

                // Non static properties
                for (const key in mixin.prototype) {

                    if (skipProperties.includes(key)) {

                        continue;
                    }

                    if (mixin.prototype.hasOwnProperty(key)) {

                        this.copyProperty(
                            key,
                            mixin.prototype,
                            F.prototype,
                            callSequences,
                            shadowOptionsMap,
                            CreateClassActions.Mixin
                        );
                    }
                }
            }
        }

        // Apply the properties of the class
        // Copy the non static properties from the class config
        for (const key in properties) {

            if (skipProperties.includes(key)) {

                continue;
            }

            if (properties.hasOwnProperty(key)) {

                if (key === 'static') {

                    for (const staticKey in properties.static) {

                        this.copyProperty(
                            staticKey,
                            properties.static,
                            F,
                            callSequences,
                            shadowOptionsMap,
                            CreateClassActions.Property
                        );
                    }
                }
                else {
                    this.copyProperty(
                        key,
                        properties,
                        F.prototype,
                        callSequences,
                        shadowOptionsMap,
                        CreateClassActions.Property
                    );
                }
            }
        }

        // We have all the call sequences built
        // Lets replace the original functions of the target with the wrappers
        callSequences.forEach((callSequence, name) => {

            F.prototype[name] = callSequence.wrap();
        });

        // Rename the function to the name of the class
        Object.defineProperty(F, 'name', {
            value: name,
            writable: false
        });

        return F;
    },

    extend(
        derived: any,
        base: any,
        callSequences: Map<string, CallSequence>,
        shadowOptions: Map<string, ShadowOptions>): void {

        // Copy the (static) properties of derived
        for (const key in base) {

            this.copyProperty(
                key,
                base,
                derived,
                callSequences,
                shadowOptions,
                CreateClassActions.Extend
            );
        }

        const prototype = Object.create(base.prototype);

        // Copy the properties of the original prototype
        for (const key in derived.prototype) {

            if (skipProperties.includes(key)) {

                continue;
            }

            this.copyProperty(
                key,
                derived.prototype,
                prototype,
                callSequences,
                shadowOptions,
                CreateClassActions.Extend
            );
        }

        // Wrap the duplicate property functions in one
        callSequences.forEach((callSequence, key) => {

            prototype[key] = callSequence.wrap();
        });

        // // Set the constructor
        // if (base.constructor !== undefined) {

        //     if (derived.constructor !== undefined) {

        //         prototype.constructor = function () {

        //             base.apply(this, arguments);

        //             derived.apply(this, arguments);
        //         };
        //     }
        //     else {

        //         prototype.constructor = base;
        //     }
        // }
        // else {

        //     prototype.constructor = derived;
        // }

        // Fix the "constructor"
        prototype.constructor = derived;

        // Set the prototype of the derived function
        derived.prototype = prototype;
    },

    // createExtendConstructor(derived: Function, base: Function) {

    //     function F() {

    //         //@ts-ignore
    //         base.apply(this, arguments);

    //         //@ts-ignore
    //         derived.apply(this, arguments);
    //     }

    //     // Rename the function to the name of the class
    //     Object.defineProperty(F, 'name', {
    //         value: derived.name,
    //         writable: false
    //     });

    //     return F;
    // },

    copyProperty(
        key: string,
        source: any,
        target: any,
        /**
         * The existing call sequences to add the call sequence to
         */
        callSequences: Map<string, CallSequence>,
        shadowOptionsMap: Map<string, ShadowOptions>,
        /**
         * The action being currently performed: extend, mixins
         */
        action: CreateClassActions
    ) {

        if (key in target) { // The member exists in the target

            const shadowOption = getShadowOption(shadowOptionsMap, key, action);

            const targetValue = target[key];

            if (typeof targetValue === 'function') {

                switch (shadowOption) {

                    case ShadowOptions.Shadow:
                        {
                            target[key] = source[key];
                        }
                        break;
                    case ShadowOptions.Combine:
                        {
                            let callSequence = callSequences.get(key);

                            if (callSequence === undefined) {

                                callSequence = new CallSequence();

                                callSequence.addCall(targetValue);
                            }

                            callSequence.addCall(source[key]);

                            callSequences.set(key, callSequence);
                        }
                        break;
                    default:
                        {
                            throw Error(`Duplicate property: '${key}' while creating class: '${target.constructor.name}' in action: '${action}'`);
                        }
                        break;
                }

            }
            else { // The member exists but it is not a function

                if (typeof targetValue === 'object') {

                    const sourceValue = source[key];

                    if (typeof sourceValue === 'object') {

                        // Combine the objects
                        target[key] = Object.assign(targetValue, sourceValue);
                    }
                    else {
                    
                        throw Error('Not implemented');
                    }
                }
                else {
                    
                    throw Error('Not implemented');
                }                
            }
        }
        else { // Member does not exist

            target[key] = source[key];
        }
    }
};

export default Class;