import {EventService} from '../services/event.service.js';
import {EVENT_TYPES} from '../constants/event.types.js';
import {EVENTS_MESSAGES} from '../constants/event_messages.types.js';

export class EventService extends EventServiceInterface {
    async publishEvent(event) {
        if (!event) {
            throw new Error('Event is required.');
        }

        if (!EVENT_TYPES[event.type]) {
            throw new Error(`Invalid event type: ${event.type}`);
        }

        return {
            type: event.type,
            orderId: event.orderId,
            message: EVENTS_MESSAGES[event.type],
        }
    }
}

