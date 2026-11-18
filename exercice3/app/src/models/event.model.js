/**
 * Interface for an event.
 * @class
 * @param {string} type : it's an type of event.
 * @param {string|null} orderId : it's an order id.
 */
export class Event {
    constructor(type, orderId = null){
        this.type = type;
        this.orderId = orderId;
    }
}

