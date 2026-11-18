import {describe, it, expect, beforeEach, vi} from 'vitest';

import { EmailNotification } from '../notification/email.notification.js';
import { SMSNotification } from '../notification/sms.notification.js';
import { PhonePushNotification } from '../notification/phone_push.notification.js'
import { Events } from '../services/fixtures/event.fixture.js';

describe('NotificationConfig', () => {
    let eventService;
    let events;
    let emailMock;
    let smsMock;
    let pushMobileMock;

    beforeEach(async () => {
        emailMock = vi.spyOn(EmailNotification.prototype, 'sendNotification').mockResolvedValue(undefined);
        
        smsMock = vi.spyOn(SMSNotification.prototype, 'sendNotification').mockResolvedValue(undefined);
        
        pushMobileMock = vi.spyOn(PhonePushNotification.prototype, 'sendNotification').mockResolvedValue(undefined);

        const config = await import('./notification.config.js');
 
        eventService = config.eventService;
        events = new Events();

        vi.spyOn(console, 'log').mockImplementation(() => {});
    })

    describe('Notification dispatch', () => {

        it('should send notifications through all enabled canals', async () => {
            // Given
            const event = events.createOrderPlaced();

            // When
            await eventService.publishEvent(event);

            // Then
            expect(emailMock).toHaveBeenCalledWith(
                expect.any(String)
            );

            expect(smsMock).toHaveBeenCalledWith(
                expect.any(String)
            );

            expect(pushMobileMock).toHaveBeenCalledWith(
                expect.any(String)
            );
        });

        it('should continue sending when SMS fails', async () => {
            // Given
            const event = events.createOrderPlaced();

            smsMock.mockRejectedValue(
                new Error('SMS provider unavailable')
            );

            // When
            await eventService.publishEvent(event);

            // Then
            expect(emailMock).toHaveBeenCalledOnce();
            expect(smsMock).toHaveBeenCalledOnce();
            expect(pushMobileMock).toHaveBeenCalledOnce();
        });
    });
    
})