export async function retry(operation, maxAttempts, delay) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }

            console.warn(`Attempt ${attempt} failed. Retrying in progress.`);

            await new Promise(resolve =>
                setTimeout(resolve, delay * attempt)
            );
        }
    }
}
