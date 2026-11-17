
import { MessageBroker } from '../brokers/message.broker.js';
import { EventService } from '../services/event.service.js';
import { EmailNotification } from '../notification/email.notification.js';
import { SMSNotification } from '../notification/sms.notification.js';
import { PhonePushNotification } from '../notification/phone_push.notification.js';
import { EVENT_TYPES } from '../constants/event.types.js';

const messageBroker = new MessageBroker();
const eventService = new EventService(messageBroker);

const canal = {
    email: new EmailNotification(),
    sms: new SMSNotification(),
    push_phone: new PhonePushNotification(),
};

const enabledCanals = ['email', 'sms', 'push_phone'];

async function dispatchNotification(notification) {
    return Promise.allSettled(enabledCanals.map(async (canalName) => {
            const canalInstance = canal[canalName];

            if (!canalInstance) {
                throw new Error(`Canal not found: ${canalName}`);
            }

            await canalInstance.sendNotification(notification.message);

            return canalName;
        })
    );
}

for (const eventType of Object.values(EVENT_TYPES)) {
    messageBroker.subscribe(eventType, (notification) => {
        void dispatchNotification(notification)
            .then(results => console.log('Notification results:', results))
            .catch(console.error);
    });
}

export { eventService };
