/**
 * @interface NotificationInterface
 * @description Interface for notification services.
 */
export class NotificationInterface {
    async sendNotification(message) {
        throw new Error('Method not implemented.');
    }
}