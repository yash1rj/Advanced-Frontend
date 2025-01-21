// Implement a function that will halt the operation for X amount of time
// if it fails for Y count

const circuitBreaker = (fn, failureCount = 3, timeThreshold = 200) => {
    let failures = 0;
    let timeSinceLastFailure = 0;
    let isServiceClosed = false;

    return async function (...args) {
        if (isServiceClosed) {
            const diff = Date.now() - timeSinceLastFailure;

            if (diff > timeThreshold) {
                isServiceClosed = false; // Reset circuit breaker after timeout
            } else {
                console.log("Service Unavailable");
                return;
            }
        }

        try {
            const result = await fn(...args);
            failures = 0; // Reset failure count on success
            return result;
        } catch (err) {
            failures++;
            timeSinceLastFailure = Date.now();

            if (failures >= failureCount) {
                isServiceClosed = true;
                console.log('Circuit Breaker: Tripped due to exceeding failure threshold');
            }
            console.log("Error : ", err);
        }
    }
}


// ***********************************************************************
// test function
const testFunction = () => {
    let count = 0;

    return function () {
        count++;
        if (count < 4) {
            throw "failed";
        } else {
            return "hello";
        }
    }
};


let t = testFunction();
let c = circuitBreaker(t, 3, 200);

c(); // "error"
c(); // "error"
c(); // "error"

// service is closed for 200 MS
c(); // "service unavailable" 
c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"

// service becomes available after 300ms
setTimeout(() => { console.log(c()); }, 300); // "hello";