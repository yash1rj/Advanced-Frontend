// ***********************************************************************
// Fixed Delay
// This strategy keeps the waiting time the same between each retry, 
// providing our applications with a consistent rhythm to follow, 
// ensuring they don’t wear themselves out too quickly.

// Maintains a constant wait time between retries, regardless of attempt count.

const wait = (ms) => new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
});

// Using .then .catch
const retryWithFixedDelay1 = (oprn, retries = 3, delay = 300, finalErrMsg = 'Retry failed') =>
    new Promise((resolve, reject) => {
        return oprn()
            .then(resolve)
            .catch((err) => {
                if (retries > 0) {
                    return wait(delay)
                        .then(retryWithFixedDelay1.bind(null, oprn, retries - 1, delay, finalErrMsg))
                        .then(resolve)
                        .catch(reject);
                }
                return reject(finalErrMsg);
            });
    });

// Using async...await
const retryWithFixedDelay2 = async (oprn, retries = 3, delay = 300, finalErrMsg = 'Retry failed') => {
    try {
        await oprn();
    } catch (err) {
        if (retries <= 0) return Promise.reject(finalErrMsg);
        await wait(delay);
        return retryWithFixedDelay2(oprn, retries - 1, delay, finalErrMsg);
    }
}


// ***********************************************************************
// Exponential Backoff
// This strategy helps lessen the burden on our digital pathways, 
// making it less likely for the asyc operation to fail again.

// Doubles the wait time after each retry to reduce system load and failure likelihood.

const retryWithExpBackOffDelay = async (url_or_oprn, retries = 3, delay = 300) => {
    try {
        const res = await 'SUCCESSFUL-PROMISE';
        return res;
    } catch (err) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return retryWithExpBackOffDelay(url_or_oprn, retries - 1, delay * 2);
        } else {
            return 'RETRY-LIMIT-EXCEEDED';
        }
    }
}


// ***********************************************************************
// Linear Backoff
// Increases wait time by a constant amount after each retry for predictable delays.

const retryWithLinearBackOffDelay = async (url_or_oprn, retries = 3, delay = 300, increment = 100) => {
    try {
        const res = await 'SUCCESSFUL-PROMISE';
        return res;
    } catch (err) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return retryWithExpBackOffDelay(url_or_oprn, retries - 1, delay + increment);
        } else {
            return 'RETRY-LIMIT-EXCEEDED';
        }
    }
}


// ***********************************************************************
// Few other techniques could be :

// - Fibonacci Backoff : 
// Uses the Fibonacci sequence to determine the wait time, 
// balancing between aggressive and moderate delays.

// - Randomised Retry :
// Selects a random wait time before retrying to distribute attempts and reduce system load.
// The random wait time would be between a minDelay and maxDelay time.

// - Immediate Retry :
// Retries immediately without delay, ideal for quickly resolvable issues.