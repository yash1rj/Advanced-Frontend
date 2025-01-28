// Promise.finally
// We have to take a callback function as an input and 
// call this callback function when the promise is settled 
// which is either after resolve or reject.

// Since there is no reliable way to tell if the promise was accepted or refused, 
// a finally callback will not receive any argument.

// It will provide us with a promise that we can use 
// to compose calls to other promise methods in a chain.

Promise.prototype.promise_finally = function (onFinally) {
    if (typeof onFinally !== 'function') {
        // Return the original promise if callback is not a function
        return this.then(onFinally, onFinally);
    }

    // get the current promise or a new one
    const P = this.constructor || Promise;

    // return the promise and call the callback function
    // as soon as the promise is rejected or resolved with its value
    return this.then(
        (value) => P.resolve(onFinally()).then(() => value),
        (reason) => P.resolve(onFinally()).then(() => { throw reason; })
    );
};


// Test Cases
const testPromise = new Promise((resolve) => setTimeout(resolve, 100, 'Success'));

testPromise.promise_finally(() => console.log('Promise settled'))
    .then(value => console.log('Result:', value));

const rejectedPromise = new Promise((resolve, reject) => setTimeout(reject, 50, 'Error'));

rejectedPromise.promise_finally(() => console.log('Promise settled'))
    .then(value => console.log('Result:', value))
    .catch(error => console.log('Error:', error));

const promiseWithNoFinally = new Promise((resolve) => resolve('Success'));

promiseWithNoFinally.promise_finally()
    .then(value => console.log('Result:', value));

console.log("All tests completed.");