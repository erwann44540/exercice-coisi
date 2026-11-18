import { describe, it, expect, vi } from 'vitest';
import { retry } from './retry.js';

describe('Retry', () => {

    describe('retry operation', () => {

        it('should succeed on first attempt', async () => {
            // Given
            const operation = vi.fn().mockResolvedValue('success');

            // When
            const result = await retry(operation, 3, 1);

            // Then
            expect(result).toBe('success');
            expect(operation).toHaveBeenCalledOnce();
        });

        it('should succeed after two failures', async () => {
            // Given
            const operation = vi.fn()
                .mockRejectedValueOnce(new Error('Failed'))
                .mockRejectedValueOnce(new Error('Failed'))
                .mockResolvedValueOnce('success');

            // When
            const result = await retry(operation, 3, 1);

            // Then
            expect(result).toBe('success');
            expect(operation).toHaveBeenCalledTimes(3);
        });

        it('should fail after maximum attempts', async () => {
            // Given
            const operation = vi.fn().mockRejectedValue(new Error('Provider unavailable'));

            // When / Then
            await expect(retry(operation, 3, 1)).rejects.toThrow('Provider unavailable');

            expect(operation).toHaveBeenCalledTimes(3);
        });
    });
});
