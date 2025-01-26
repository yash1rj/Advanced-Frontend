// Promise.allSettled takes an array of promises as input and returns a promise object.
// The returned promise will be resolved when all the promises in the input array are settled.
// The returned promise will be resolved with an array of objects 
// that each describes the outcome of each promise in the input array.


/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function promise_allSettled(promises) {
    if (promises.length === 0) {
        return Promise.resolve([]);
    }

    const results = Array(promises.length);
    let numOfSettledPromise = 0;

    return new Promise((resolve, reject) => {
        promises.forEach((promise, i) => {
            if (!(promise instanceof Promise)) {
                promise = Promise.resolve(promise);
            }

            promise.then(
                (value) => {
                    results[i] = {
                        status: 'fulfilled',
                        value
                    };

                    numOfSettledPromise++;
                    if (numOfSettledPromise === promises.length) {
                        resolve(results);
                    }
                },
                (reason) => {
                    results[i] = {
                        status: 'rejected',
                        reason
                    };

                    numOfSettledPromise++;
                    if (numOfSettledPromise === promises.length) {
                        resolve(results);
                    }
                }
            );
        });
    });
}

// Input:
const a = new Promise((resolve) => setTimeout(() => { resolve(3) }, 200));
const b = new Promise((resolve, reject) => reject(9));
const c = new Promise((resolve) => resolve(5));

promise_allSettled([a, b, c]).then((val) => { console.log(val) });

// Output:
// [
//     {
//         "status": "fulfilled",
//         "value": 3
//     },
//     {
//         "status": "rejected",
//         "reason": 9
//     },
//     {
//         "status": "fulfilled",
//         "value": 5
//     }
// ]