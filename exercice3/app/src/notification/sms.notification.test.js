import {describe, it, expect, beforeEach, vi} from 'vitest';

import {SMSNotification} from "./sms.notification"

describe("SMSNotification", () => {
    let smsNotification;

    beforeEach(() => {
        smsNotification = new SMSNotification();
    });

    describe("sendNotification", () => {
        it("should send an sms notification with the correct message", async () => {
            //Given
            const message = "Your order has been placed successfully.";
            const consoleLogSpy = vi.spyOn(console, 'log');

            //When
            await smsNotification.sendNotification(message);

            //Then
            expect(consoleLogSpy).toHaveBeenCalledWith(`Sending SMS notification: ${message}`);
        });
    });
});