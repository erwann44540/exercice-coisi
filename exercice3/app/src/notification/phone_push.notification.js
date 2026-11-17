import {NotificationInterface} from '../interfaces/notification.interfaces.js';

/**
 * @class PhonePushNotification
 * @description Send a phone push notification.
 */
export class PhonePushNotification extends NotificationInterface {
    async sendNotification(message) {
        console.log(`Sending phone push notification: ${message}`);
    }
}