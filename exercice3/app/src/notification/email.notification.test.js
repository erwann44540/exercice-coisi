import {describe, it, expect, beforeEach, vi} from 'vitest';

import {EmailNotification} from './email.notification.js';

describe("EmailNotification", () => {
    let emailNotification;

    beforeEach(() => {
        emailNotification = new EmailNotification();
    });

    describe("sendNotification", () => {
        it("should send an email notification with the correct message", async () => {
            //Given
            const message = "Your order has been placed successfully.";
            const consoleLogSpy = vi.spyOn(console, 'log');

            //When
            await emailNotification.sendNotification(message);

            //Then
            expect(consoleLogSpy).toHaveBeenCalledWith(`Sending email notification: ${message}`);
        });
    });
});