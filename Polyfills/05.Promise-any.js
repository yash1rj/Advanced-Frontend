// Promise.any takes an array of promises as input and returns a new promise.
// The returned promise is resolved as soon as any of the input promises resolves.
// Else if all of the input promises are rejected then the returned promise is rejected 
// with the array of all the input promises reasons (AggregateError).


/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function promise_any(promises) {
    if (promises.length === 0) {
        return Promise.resolve([]);
    }

    const promiseErrors = Array(promises.length);
    let numOfRejectedPromise = 0;

    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(resolve) // resolve, when any of the input promise resolves
                .catch((error) => {
                    promiseErrors[index] = error;
                    numOfRejectedPromise += 1;

                    if (numOfRejectedPromise === promiseErrors.length) {
                        // all promises rejected
                        reject(new AggregateError(promiseErrors, "All promises rejected !"));
                    }
                });
        });
    });
}

const promise1 = Promise.reject(new Error("Promise 1 rejected"));
const promise2 = Promise.reject(new Error("Promise 2 rejected"));
const promise3 = Promise.reject(new Error("Promise 3 rejected"));
// const promise4 = Promise.resolve("Success");

promise_any([promise1, promise2, promise3])
    .then(value => console.log("Success:", value))
    .catch(error => console.error("Error:", error));

Promise.any([promise1, promise2, promise3])
    .then(value => console.log("Success:", value))
    .catch(error => console.error("Error:", error)); 