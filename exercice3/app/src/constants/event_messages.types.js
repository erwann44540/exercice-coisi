import { EVENT_TYPES } from './event.types.js';

export const EVENTS_MESSAGES = {
    [EVENT_TYPES.ORDER_PLACED]: 'You have successfully placed your order.',
    [EVENT_TYPES.ORDER_DELIVERED]: 'Your order has just been delivered.',
    [EVENT_TYPES.ORDER_SHIPPED]: 'Your order has just been shipped.',
    [EVENT_TYPES.PRODUCT_PROMOTION]: 'An item you recently viewed is currently on sale.',
};