// Promise.any It returns a promise.
// The returned promise fulfills or rejects as soon as 
// any one of the input promises fulfills or rejects.
// Returned promise resolves with the value of the input promise 
// or rejects with the reason of the input promise.

/**
 * @param {Array<any>} promises - An array of promises or values.
 * @returns {Promise<any>} - A Promise that resolves with the value of the first promise that settles (resolves or rejects).
 */
function promise_race(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
            Promise.resolve(promise)
                .then(resolve, reject) // resolve, when any of the input promise resolves
                .catch(reject); // reject, when any of the input promise rejects
        });
    });
}

const promise1 = Promise.reject(new Error("Promise 1 rejected"));
const promise2 = Promise.reject(new Error("Promise 2 rejected"));
// const promise3 = Promise.reject(new Error("Promise 3 rejected"));
const promise3 = Promise.resolve("Success");

promise_race([promise1, promise2, promise3])
    .then(value => console.log("Success:", value))
    .catch(error => console.error("Error:", error));

Promise.race([promise1, promise2, promise3])
    .then(value => console.log("Success:", value))
    .catch(error => console.error("Error:", error)); 