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
        it("should publish a valid event", async () => {
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
    });
});
