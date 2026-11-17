import {describe, it, expect, beforeEach, vi} from 'vitest';
import {MessageBroker} from './message.broker.js';
import {EVENT_TYPES} from '../constants/event.types.js';

describe("MessageBroker", () => {
    let messageBroker;

    beforeEach(() => {
        messageBroker = new MessageBroker();
    });

    describe("publish", () => {
        it("should emit an event with the correct type and payload", () => {
            //Given
            const callback = vi.fn();
            const event = {orderId: 'ORDER-1'};

            messageBroker.subscribe(EVENT_TYPES.ORDER_PLACED, callback);

            //When
            messageBroker.publish(EVENT_TYPES.ORDER_PLACED, event);

            //Then
            expect(callback).toHaveBeenCalledWith(event);
        });
    });

    describe("subscribe", () => {
        it("should register a callback for the specified event type", () => {
            //Given
            const callback = vi.fn();
            const event = {orderId: 'ORDER-1'}; 

            messageBroker.subscribe(EVENT_TYPES.ORDER_PLACED, callback);
            
            //When
            messageBroker.publish(EVENT_TYPES.ORDER_PLACED, event);

            //Then
            expect(callback).toHaveBeenCalledWith(event);
        });
    });
});