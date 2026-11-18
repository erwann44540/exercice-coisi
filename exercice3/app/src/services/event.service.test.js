import {describe, it, expect, beforeEach, vi} from 'vitest';

import {EventService} from './event.service.js';
import {Events} from './fixtures/event.fixture.js';
import {EVENT_TYPES} from '../constants/event.types.js';
import {EVENTS_MESSAGES} from '../constants/event_messages.types.js';

describe("EventService", () => {
    let eventService;
    let messageBrokerMock;
    let events;

    beforeEach(() => {
        messageBrokerMock = {
            publish: vi.fn()
        };

        eventService = new EventService(messageBrokerMock);

        events = new Events();
    });

    describe("publishEvent", () => {
        it("should publish an order placed event", async () => {
            //Given
            const event = events.createOrderPlaced();

            //When
            const notification = await eventService.publishEvent(event);

            //Then
            expect(notification).toEqual({
                type: EVENT_TYPES.ORDER_PLACED,
                orderId: 'ORDER-1',
                message: EVENTS_MESSAGES[EVENT_TYPES.ORDER_PLACED],
            });

            expect(messageBrokerMock.publish).toHaveBeenCalledWith(
                EVENT_TYPES.ORDER_PLACED,
                notification
            );
        });

        it("should publish an order shipped event", async () => {
            //Given
            const event = events.createOrderShipped();

            //When
            const notification = await eventService.publishEvent(event);
            
            //Then
            expect(notification).toEqual({
                type: EVENT_TYPES.ORDER_SHIPPED,
                orderId: 'ORDER-1',
                message: EVENTS_MESSAGES[EVENT_TYPES.ORDER_SHIPPED],
            });

            expect(messageBrokerMock.publish).toHaveBeenCalledWith(
                EVENT_TYPES.ORDER_SHIPPED,
                notification
            );
        });

        it("should publish an order delivered event", async () => {
            //Given
            const event = events.createOrderDelivered();

            //When
            const notification = await eventService.publishEvent(event);
            
            //Then
            expect(notification).toEqual({
                type: EVENT_TYPES.ORDER_DELIVERED,
                orderId: 'ORDER-1',
                message: EVENTS_MESSAGES[EVENT_TYPES.ORDER_DELIVERED],
            });

            expect(messageBrokerMock.publish).toHaveBeenCalledWith(
                EVENT_TYPES.ORDER_DELIVERED,
                notification
            );
        });

        it("should publish a product promotion event", async () => {
            //Given
            const event = events.createProductPromotion();

            //When
            const notification = await eventService.publishEvent(event);

            //Then
            expect(notification).toEqual({
                type: EVENT_TYPES.PRODUCT_PROMOTION,
                orderId: 'ORDER-1',
                message: EVENTS_MESSAGES[EVENT_TYPES.PRODUCT_PROMOTION],
            });

            expect(messageBrokerMock.publish).toHaveBeenCalledWith(
                EVENT_TYPES.PRODUCT_PROMOTION,
                notification
            );
        });

        it("should return an error for an invalid event type", async () => {
            //Given
            const event = events.createInvalidEventType();

            //When & Then
            await expect(eventService.publishEvent(event)).rejects.toThrowError(`Invalid event type: ${event.type}`);
        });

        it("should return an error for an event without type", async () => {
            //Given
            const event = events.createEventWithoutType();

            //When & Then
            await expect(eventService.publishEvent(event)).rejects.toThrowError(`Invalid event type: undefined`);
        });      
    });
});
