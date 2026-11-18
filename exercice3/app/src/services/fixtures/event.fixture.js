import {EVENT_TYPES} from '../../constants/event.types.js';

export class Events {

    createOrderPlaced(){
        return {
            type: EVENT_TYPES.ORDER_PLACED,
            orderId: 'ORDER-1'
        };
    }

    createOrderShipped(){
        return {
            type: EVENT_TYPES.ORDER_SHIPPED,
            orderId: 'ORDER-1'
        };
    }

    createOrderDelivered(){
        return {
            type: EVENT_TYPES.ORDER_DELIVERED,
            orderId: 'ORDER-1'
        };
    }

    createProductPromotion(){
        return {
            type: EVENT_TYPES.PRODUCT_PROMOTION,
            orderId: 'ORDER-1'
        };
    }

    createInvalidEventType(){
        return {
            type: 'INVALID_EVENT_TYPE',
            orderId: 'ORDER-1'
        };
    }

    createEventWithoutType(){
        return {
            orderId: 'ORDER-1'
        };
    }

    createEventWithoutOrderId(){
        return {
            type: EVENT_TYPES.ORDER_PLACED
        };
    }  
}