import {EventEmitter} from 'events';

/**
 * @class MessageBroker
 * @description Publish-subscribe message broker.
 */
export class MessageBroker extends EventEmitter {
    constructor() {
        super();
    }

    publish(eventType, event) {
        this.emit(eventType, event);
    }

    subscribe(eventType, callback) {
        this.on(eventType, callback);
    }
}