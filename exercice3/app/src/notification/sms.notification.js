import {NotificationInterface} from '../interfaces/notification.interfaces.js';

/**
 * @class SMSNotification
 * @description Send a sms notification.
 */
export class SMSNotification extends NotificationInterface {
    async sendNotification(message) {
        console.log(`Sending SMS notification: ${message}`);
    }
}