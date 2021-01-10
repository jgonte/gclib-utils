import Class from '../../src/class-builder/Class';

describe("Class tests", () => {

    it("should create a derived class based on the base one", () => {

        let constructorCalledInBase = false;

        let constructorCalledInDerived = false;

        let sameFunctionNameCalledInBase = false;

        let sameFunctionNameCalledInDerived = false;

        class Base {

            static static1 = 'static1';

            constructor() {

                //console.log('constructor Base');

                (this as any).member1 = 'member1';

                constructorCalledInBase = true;
            }

            function1() {

                //console.log('function1');
            }

            sameFunctionName() {

                //console.log('Base::sameFunctionName');

                sameFunctionNameCalledInBase = true;
            }
        }

        const Derived = Class.create({
            name: 'Derived',
            base: Base,
            properties: {

                static: {

                    static2: 'static2'
                },

                constructor() {

                    Base.apply(this); // Call the base constructor

                    //console.log('constructor Derived');

                    (this as any).member2 = 'member2';

                    constructorCalledInDerived = true;
                },

                function2() {

                    //console.log('function2');
                },

                sameFunctionName() {

                    Base.prototype.sameFunctionName.apply(this);

                    //console.log('Derived::sameFunctionName');

                    sameFunctionNameCalledInDerived = true;
                }
            }
        });

        expect(Object.getPrototypeOf(Derived.prototype)).toEqual(Base.prototype);

        expect(Base.prototype.constructor).toEqual(Base);

        //@ts-ignore
        expect(Derived.prototype.constructor).toEqual(Derived);

        const staticKeys = Object.keys(Derived);

        expect(staticKeys).toEqual([
            'static1',
            'static2'
        ]);

        expect(Derived.static1).toEqual('static1');

        expect(Derived.static2).toEqual('static2');

        const derived = new Derived() as any;

        expect(constructorCalledInBase).toEqual(true);

        expect(constructorCalledInDerived).toEqual(true);

        expect(derived.__proto__).toEqual(Derived.prototype);

        const spyFunction1 = jest.spyOn(derived, 'function1');

        derived.function1();

        expect(spyFunction1).toHaveBeenCalledTimes(1);

        const spyFunction2 = jest.spyOn(derived, 'function2');

        derived.function2();

        expect(spyFunction2).toHaveBeenCalledTimes(1);

        const spySameFunctionName = jest.spyOn(derived, 'sameFunctionName');

        derived.sameFunctionName();

        expect(spySameFunctionName).toHaveBeenCalledTimes(1);

        expect(sameFunctionNameCalledInBase).toEqual(true);

        expect(sameFunctionNameCalledInDerived).toEqual(true);

        const keys = [];

        for (const key in derived) {

            keys.push(key);
        }

        const objectKeys = Object.keys(derived);

        expect(keys).toEqual([
            "member1",
            "member2",
            "function1",
            "function2",
            "sameFunctionName",
            "constructor",
        ]);
    });

    it("create a class with the mixins applied", () => {

        let constructorCalledInMixin1 = false;

        let constructorCalledInMixin2 = false;

        let constructorCalledInDerived = false;

        let sameFunctionNameCalledInMixin1 = false;

        let sameFunctionNameCalledInMixin2 = false;

        let sameFunctionNameCalledInDerived = false;

        class Mixin1 {

            static static1 = 'static1';

            constructor() {

                //console.log('constructor Mixin1');

                (this as any).member1 = 'member1';

                constructorCalledInMixin1 = true;
            }

            function1() {

                //console.log('function1');
            }

            sameFunctionName() {

                //console.log('Mixin1::sameFunctionName');

                sameFunctionNameCalledInMixin1 = true;
            }
        }

        class Mixin2 {

            static static2 = 'static2';

            constructor() {

                //console.log('constructor Mixin2');

                (this as any).member2 = 'member2';

                constructorCalledInMixin2 = true;
            }

            function2() {

                //console.log('function2');
            }

            sameFunctionName() {

                //console.log('Mixin2::sameFunctionName');

                sameFunctionNameCalledInMixin2 = true;
            }
        }

        const Derived = Class.create({
            name: 'Derived',
            mixins: [Mixin1, Mixin2],
            properties: {

                static: {
                    static3: 'static3'
                },

                constructor() {

                    //console.log('constructor Derived');

                    (this as any).member3 = 'member3';

                    constructorCalledInDerived = true;
                },

                function3() {

                    //console.log('Derived:function3');
                },

                sameFunctionName() {

                    //console.log('Derived::sameFunctionName');

                    sameFunctionNameCalledInDerived = true;
                }
            }
        });

        const staticKeys = Object.keys(Derived);

        expect(staticKeys).toEqual([
            'static1',
            'static2',
            'static3'
        ]);

        const derived = new Derived() as any;

        expect(constructorCalledInMixin1).toEqual(true);

        expect(constructorCalledInMixin2).toEqual(true);

        expect(constructorCalledInDerived).toEqual(true);

        expect(derived.__proto__).toEqual(Derived.prototype);

        const spyFunction1 = jest.spyOn(derived, 'function1');

        derived.function1();

        expect(spyFunction1).toHaveBeenCalledTimes(1);

        const spyFunction2 = jest.spyOn(derived, 'function2');

        derived.function2();

        expect(spyFunction2).toHaveBeenCalledTimes(1);

        const spyFunction3 = jest.spyOn(derived, 'function3');

        derived.function3();

        expect(spyFunction3).toHaveBeenCalledTimes(1);

        const spySameFunctionName = jest.spyOn(derived, 'sameFunctionName');

        derived.sameFunctionName();

        expect(spySameFunctionName).toHaveBeenCalledTimes(1);

        expect(sameFunctionNameCalledInMixin1).toEqual(true);

        expect(sameFunctionNameCalledInMixin2).toEqual(true);

        expect(sameFunctionNameCalledInDerived).toEqual(true);

        const keys = [];

        for (const key in derived) {

            keys.push(key);
        }

        // const keys = Object.keys(derived);

        expect(keys).toEqual([
            "member1",
            "member2",
            "member3",
            "function1",
            "function2",
            "function3",
            "sameFunctionName",
        ]);
    });

    it("should create a derived class based on the base one and apply the mixins", () => {

        let constructorCalledInBase = false;

        let constructorCalledInMixin1 = false;

        let constructorCalledInMixin2 = false;

        let constructorCalledInDerived = false;

        let sameFunctionNameCalledInBase = false;

        let sameFunctionNameCalledInMixin1 = false;

        let sameFunctionNameCalledInMixin2 = false;

        let sameFunctionNameCalledInDerived = false;

        class Base {

            static static1 = 'static1';

            constructor() {

                //console.log('constructor Base');

                (this as any).member = 'member';

                constructorCalledInBase = true;
            }

            functionBase() {

                //console.log('functionBase');
            }

            sameFunctionName() {

                //console.log('Base::sameFunctionName');

                sameFunctionNameCalledInBase = true;
            }
        }

        class Mixin1 {

            static static2 = 'static2';

            constructor() {

                //console.log('constructor Mixin1');

                (this as any).member1 = 'member1';

                constructorCalledInMixin1 = true;
            }

            function1() {

                //console.log('function1');
            }

            sameFunctionName() {

                //console.log('Mixin1::sameFunctionName');

                sameFunctionNameCalledInMixin1 = true;
            }
        }

        class Mixin2 {

            static static3 = 'static3';

            constructor() {

                //console.log('constructor Mixin2');

                (this as any).member2 = 'member2';

                constructorCalledInMixin2 = true;
            }

            function2() {

                //console.log('function2');
            }

            sameFunctionName() {

                //console.log('Mixin2::sameFunctionName');

                sameFunctionNameCalledInMixin2 = true;
            }
        }

        const Derived = Class.create({
            name: 'Derived',
            base: Base,
            mixins: [Mixin1, Mixin2],
            properties: {

                static: {

                    static4: 'static4'
                },

                constructor() {

                    //console.log('constructor Derived');

                    (this as any).member3 = 'member3';

                    constructorCalledInDerived = true;
                },

                function3() {

                    //console.log('function3');
                },

                sameFunctionName() {

                    //console.log('Derived::sameFunctionName');

                    sameFunctionNameCalledInDerived = true;
                }
            }
        });

        expect(Object.getPrototypeOf(Derived.prototype)).toEqual(Base.prototype);

        expect(Base.prototype.constructor).toEqual(Base);

        //@ts-ignore
        expect(Derived.prototype.constructor).toEqual(Derived);

        const staticKeys = Object.keys(Derived);

        expect(staticKeys).toEqual([
            'static1',
            'static2',
            'static3',
            'static4'
        ]);

        const derived = new Derived() as any;

        expect(constructorCalledInBase).toEqual(true);

        expect(constructorCalledInMixin1).toEqual(true);

        expect(constructorCalledInMixin2).toEqual(true);

        expect(constructorCalledInDerived).toEqual(true);

        expect(derived.__proto__).toEqual(Derived.prototype);

        const spyFunctionBase = jest.spyOn(derived, 'functionBase');

        derived.functionBase();

        expect(spyFunctionBase).toHaveBeenCalledTimes(1);

        const spyFunction1 = jest.spyOn(derived, 'function1');

        derived.function1();

        expect(spyFunction1).toHaveBeenCalledTimes(1);

        const spyFunction2 = jest.spyOn(derived, 'function2');

        derived.function2();

        expect(spyFunction2).toHaveBeenCalledTimes(1);

        const spyFunction3 = jest.spyOn(derived, 'function3');

        derived.function3();

        expect(spyFunction3).toHaveBeenCalledTimes(1);

        const spySameFunctionName = jest.spyOn(derived, 'sameFunctionName');

        derived.sameFunctionName();

        expect(spySameFunctionName).toHaveBeenCalledTimes(1);

        expect(sameFunctionNameCalledInBase).toEqual(true);

        expect(sameFunctionNameCalledInMixin1).toEqual(true);

        expect(sameFunctionNameCalledInMixin2).toEqual(true);

        expect(sameFunctionNameCalledInDerived).toEqual(true);

        const keys = [];

        for (const key in derived) {

            keys.push(key);
        }

        // const keys = Object.keys(derived);

        expect(keys).toEqual([
            "member",
            "member1",
            "member2",
            "member3",
            "functionBase",
            "function1",
            "function2",
            "function3",
            "sameFunctionName",
            "constructor",
        ]);
    });

    it("should build a custom element with its mixins", () => {

        let constructorCalledInBase = false;

        let constructorCalledInMixin1 = false;

        let constructorCalledInMixin2 = false;

        let constructorCalledInDerived = false;

        let connectedCallbackCalledInBase = false;

        let connectedCallbackCalledInMixin1 = false;

        let connectedCallbackCalledInMixin2 = false;

        let connectedCallbackCalledInDerived = false;

        // Fake the HTMLElement
        class HTMLElement { }

        class CustomElement extends HTMLElement {

            static isCustomElement = true;

            constructor() {

                super();

                //console.log(`CustomElement constructor`);

                constructorCalledInBase = true;
            }

            connectedCallback() {

                //console.log(`CustomElement connectedCallback`);

                connectedCallbackCalledInBase = true;
            } 
        }

        class Mixin1 {

            static properties = {

                mixin1Prop: {
                    type: Boolean,
                    value: false,
                    mutable: true,
                    reflect: true
                }
            };

            static state = {

                mixin1State: {
                    value: "mixin1State"
                }
            }

            constructor() {

                //console.log(`Mixin1 constructor`);

                constructorCalledInMixin1 = true;
            }

            connectedCallback() {

                //console.log(`Mixin1 connectedCallback`);

                connectedCallbackCalledInMixin1 = true;
            }
        }

        class Mixin2 {

            static properties = {

                mixin2Prop: {
                    type: Boolean,
                    value: false,
                    mutable: true,
                    reflect: true
                }
            };

            static state = {

                mixin2State: {
                    value: "mixin2State"
                }
            }

            constructor() {

                //console.log(`Mixin2 constructor`);

                constructorCalledInMixin2 = true;
            }

            connectedCallback() {

                //console.log(`Mixin2 connectedCallback`);

                connectedCallbackCalledInMixin2 = true;
            }
        }

        const Component = Class.create({
            name: 'Component',
            base: CustomElement,
            mixins: [Mixin1, Mixin2],
            properties: {

                static: {

                    isComponent: true,

                    component: {
                        styleUrls: [
                            'components/Component.css'
                        ]
                    },

                    properties: {

                        componentProp: {
                            type: Boolean,
                            value: false,
                            mutable: true,
                            reflect: true
                        }
                    },

                    state: {

                        componentState: {
                            value: "componentState"
                        }
                    }
                },

                constructor() {

                    //console.log(`Component constructor`);

                    constructorCalledInDerived = true;
                },

                connectedCallback() {

                    //console.log(`Component connectedCallback`);

                    connectedCallbackCalledInDerived = true;
                }
            }
        });

        expect(Component.isCustomElement).toEqual(true);

        expect(Component.isComponent).toEqual(true);

        const componentMeta = Component.component;

        expect(componentMeta).toEqual({
            styleUrls: [
                'components/Component.css'
            ]
        });

        const propertiesMeta = Component.properties;

        expect(propertiesMeta).toEqual({
            componentProp: {
                mutable: true,
                reflect: true,
                type: Boolean,
                value: false,
            },
            mixin1Prop: {
                mutable: true,
                reflect: true,
                type: Boolean,
                value: false,
            },
            mixin2Prop: {
                mutable: true,
                reflect: true,
                type: Boolean,
                value: false,
            },
        });

        const stateMeta = Component.state;

        expect(stateMeta).toEqual({
            componentState: {
                value: "componentState",
            },
            mixin1State: {
                value: "mixin1State",
            },
            mixin2State: {
                value: "mixin2State",
            },
        });

        const component = new Component();

        expect(constructorCalledInBase).toEqual(true);

        expect(constructorCalledInMixin1).toEqual(true);

        expect(constructorCalledInMixin2).toEqual(true);

        expect(constructorCalledInDerived).toEqual(true);

        const spyConnectedCallback = jest.spyOn(component, 'connectedCallback');

        component.connectedCallback();

        expect(spyConnectedCallback).toHaveBeenCalledTimes(1);

        expect(connectedCallbackCalledInBase).toEqual(true);

        expect(connectedCallbackCalledInMixin1).toEqual(true);

        expect(connectedCallbackCalledInMixin2).toEqual(true);

        expect(connectedCallbackCalledInDerived).toEqual(true);
    });
});
