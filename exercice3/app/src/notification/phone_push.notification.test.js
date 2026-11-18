import {describe, it, expect, beforeEach, vi} from 'vitest';

import {PhonePushNotification} from './phone_push.notification';

describe("PhonePushNotification", () => {
    let phonePushNotification;

    beforeEach(() => {
        phonePushNotification = new PhonePushNotification();
    });

    describe("sendNotification", () => {
        it("should be send a phone push notification with the correct message", async () => {
            //Given
            const message = "Your order has been placed successfully.";
            const consoleLogSpy = vi.spyOn(console, 'log');

            //When
            await phonePushNotification.sendNotification(message);

            //Then
            expect(consoleLogSpy).toHaveBeenCalledWith(`Sending phone push notification: ${message}`)
        });
    });
});
