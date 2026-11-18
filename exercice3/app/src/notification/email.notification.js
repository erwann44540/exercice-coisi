import {NotificationInterface} from '../interfaces/notification.interfaces.js';

/**
 * @class EmailNotification
 * @description Send an email notification.
 */
export class EmailNotification extends NotificationInterface {
    async sendNotification(message) {
        console.log(`Sending email notification: ${message}`);
    }
}