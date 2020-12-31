import CallSequence from '../../src/class-builder/CallSequence';

describe("CallSequence tests", () => {

    it("it should return a function that when called executes all the calls and returns undefined", () => {

        const callSequence = new CallSequence();

        const o1 = {
            call: () => {}
        }

        const spyCall1 = jest.spyOn(o1, 'call');

        callSequence.addCall(o1.call);

        const o2 = {
            call: () => {}
        }

        const spyCall2 = jest.spyOn(o2, 'call');

        callSequence.addCall(o2.call);

        const o3 = {
            call: () => {}
        }

        const spyCall3 = jest.spyOn(o3, 'call');

        callSequence.addCall(o3.call);

        const fcn = callSequence.wrap();

        fcn();

        expect(spyCall1).toHaveBeenCalledTimes(1);

        expect(spyCall2).toHaveBeenCalledTimes(1);

        expect(spyCall3).toHaveBeenCalledTimes(1);
    });

    it("it should return a function that when called executes all the calls and returns an object", () => {

        const callSequence = new CallSequence();

        const o1 = {
            call: () => {

                return {
                    prop1: 'prop1'
                };
            }
        }

        const spyCall1 = jest.spyOn(o1, 'call');

        callSequence.addCall(o1.call);

        const o2 = {
            call: () => {

                return {
                    prop2: 'prop2'
                };
            }
        }

        const spyCall2 = jest.spyOn(o2, 'call');

        callSequence.addCall(o2.call);

        const o3 = {
            call: () => {

                return {
                    prop3: 'prop3'
                };
            }
        }

        const spyCall3 = jest.spyOn(o3, 'call');

        callSequence.addCall(o3.call);

        const fcn = callSequence.wrap();

        const o = fcn();

        expect(o).toEqual({
            prop1: 'prop1',
            prop2: 'prop2',
            prop3: 'prop3'
        });

        expect(spyCall1).toHaveBeenCalledTimes(1);

        expect(spyCall2).toHaveBeenCalledTimes(1);

        expect(spyCall3).toHaveBeenCalledTimes(1);
    });

    it("it should return a function that when called executes all the calls and returns an array", () => {

        const callSequence = new CallSequence();

        const o1 = {
            call: () => {

                return ['prop1'];
            }
        }

        const spyCall1 = jest.spyOn(o1, 'call');

        callSequence.addCall(o1.call);

        const o2 = {
            call: () => {

                return ['prop2'];
            }
        }

        const spyCall2 = jest.spyOn(o2, 'call');

        callSequence.addCall(o2.call);

        const o3 = {
            call: () => {

                return ['prop3'];
            }
        }

        const spyCall3 = jest.spyOn(o3, 'call');

        callSequence.addCall(o3.call);

        const fcn = callSequence.wrap();

        const o = fcn();

        expect(o).toEqual(['prop1', 'prop2', 'prop3']);

        expect(spyCall1).toHaveBeenCalledTimes(1);

        expect(spyCall2).toHaveBeenCalledTimes(1);

        expect(spyCall3).toHaveBeenCalledTimes(1);
    });
});
