// Here is an example of a simple Promise :

let p1 = new Promise((resolve, reject) => resolve('This promise resolves'));
let p2 = new Promise((resolve, reject) => reject('This promise rejects'));

p1.then((data) => console.log(data));
// Output - This promise resolves

p2.catch((err) => console.log(err));
// Output - This promise rejects


// ***********************************************************************
// We will create the polyfill by first observing the actual Promise, 
// listing out requirements and then solving each requirement one by one. 

// Observing the basic example above, below are the minimum requirements to create a Promise:

// 1. Promise is a function which takes an executor function.

// 2. The executor function takes 2 callback functions as params, 
// resolve (we will refer to this as resolver) and reject(we will refer to this as rejecter). 
// The resolver and rejecter take the arguments data or error received 
// from the execution of the executor respectively.

// 3. A promise object has 2 properties then and catch that can also be chained infinitely. 
// The then and catch functions take callback functions 
// to define what will happen onResolve or onReject of the promise.

// 4. The resolver calls the onResolve defined in then function and 
// the rejecter calls the onReject defined in the catch function 
// with the result of the executor function as data or error respectively.

// 5. Handle the promise for both synchronous and asynchronous tasks.


// ***********************************************************************
// Step 1: Create a Promise function that takes an executor function

function customPromise(executor) {
    executor();
}


// ***********************************************************************
// Step 2: Define resolver and rejecter for the executor function

function customPromise(executor) {
    // Resolver function
    function resolver(data) { }

    // Rejecter function
    function rejecter(error) { }

    // Calling the executor function with resolver and rejecter
    executor(resolver, rejecter);
}


// ***********************************************************************
// Step 3: Defining the then and catch functions

function customPromise(executor) {
    let onResolve, onReject;

    // Then function for handling successfull promise execution
    this.then = function (resolveCallback) {
        // Storing resolve callback function
        onResolve = resolveCallback;

        // Returning this to enable chaining of then
        return this;
    }

    // Catch function for handling errors in promise execution
    this.catch = function (rejectCallback) {
        // Storing reject callback function
        onReject = rejectCallback;

        // Returning this to enable chaining of catch
        return this;
    }

    // Resolver function
    function resolver(data) { }

    // Rejecter function
    function rejecter(error) { }

    // Calling the executor function with resolver and rejecter
    executor(resolver, rejecter);
}

// The basic structure of our promise is complete. 
// Now we will add the logic to handle the executor result.


// ***********************************************************************
// Step 4: Add logic for resolver and rejecter functions

// The resolver calls the onResolve function with the result received from the 
// successful execution of the executor. 
// Similarly, the rejecter calls the onReject function with the error.

function customPromise(executor) {
    let onResolve, onReject;

    // Then function for handling successfull promise execution
    this.then = function (resolveCallback) {
        // Storing resolve callback function
        onResolve = resolveCallback;

        // Returning this to enable chaining of then
        return this;
    }

    // Catch function for handling errors in promise execution
    this.catch = function (rejectCallback) {
        // Storing reject callback function
        onReject = rejectCallback;

        // Returning this to enable chaining of catch
        return this;
    }

    // Resolver function
    function resolver(data) {
        // Calling the resolve function with data
        onResolve(data);
    }

    // Rejecter function
    function rejecter(error) {
        // Calling the reject function with error
        onReject(error);
    }

    // Calling the executor function with resolver and rejecter
    executor(resolver, rejecter);
}


// ***********************************************************************
// Our promise polyfill is ready to be tested, so let’s write a simple test:

let testPromise = new customPromise(
    (resolve, reject) => setTimeout(() => resolve('Resolved successfully'), 1000)
);
testPromise.then((data) => console.log(data));
// Output - Resolved successfully

let testPromise2 = new customPromise(
    (resolve, reject) => resolve('Resolved right away')
);
testPromise2.then((data) => console.log(data));
// TypeError: onResolve is not a function


// ***********************************************************************
// The current implementation has 2 issues :

// 1. It works for asynchronous tasks because 
// onResolve and onReject functions are not called right away. 
// Since the executor function here (setTimeout) is an asynchronous function, 
// the then and catch , being synchronous, functions are already executed 
// and onResolve and onReject are defined and available for resolver and rejecter. 
// However, the above code will break for synchronous executor functions 
// as the onResolve and onReject would not have been defined.

// 2. The actual promise is only either resolved or rejected. 
// Once resolved it cannot be rejected and vice-versa. 
// The current implementation doesn't check if this promise has resolved or rejected once in the past.


// ***********************************************************************
// Step 5: Handling both synchronous and asynchronous tasks

// To handle the synchronous tasks, we need to do the following steps:

// 1. Introduce an 'isCalled' flag which will be used to check 
// if the promise has either been resolved or rejected in the past.

// 2. Check and resolve/reject the promise only if the isCalled flag is false 
// and the then and catch functions have been called at least once, 
// i.e., the onResolve and onReject functions have been defined.
// Also, mark the isCalled flag as true before calling onResolve and onReject.

// 3. Now for synchronous executor functions, 
// the onResolve and onReject will not be called as per the above condition.
// To fix this, we will call these functions in the then and catch functions 
// only if the promise has not yet been resolved/rejected, i.e., the isCalled flag is false.
// However, we also need to determine if the executor has fulfilled or rejected and with what result,
// therefore, we will store all this info in isFulfilled, isRejected,
// output and err and use these for calling onResolve and onReject functions.


function customPromise(executor) {
    let onResolve, onReject,
        isCalled = false, isFulfilled = false, isRejected = false,
        output, err;

    // Then function for handling successfull promise execution
    this.then = function (resolveCallback) {
        // Storing resolve callback function
        onResolve = resolveCallback;

        // Check if the promise has not yet resolved/rejected and executor isFulfilled
        if (!isCalled && isFulfilled) {
            // Mark the promise as resolved
            isCalled = true;
            onResolve(output);
        }

        // Returning this to enable chaining of then
        return this;
    }

    // Catch function for handling errors in promise execution
    this.catch = function (rejectCallback) {
        // Storing reject callback function
        onReject = rejectCallback;

        if (!isCalled && isRejected) {
            // Mark the promise as rejected
            isCalled = true;
            onReject(err);
        }

        // Returning this to enable chaining of catch
        return this;
    }

    // Resolver function
    function resolver(data) {
        // Mark the isFulfilled flag as true since the executor work isFulfilled 
        // and store result in output
        isFulfilled = true;
        output = data;

        // Calling the resolve function with data
        if (typeof onResolve === 'function' && !isCalled) {
            isCalled = true;
            onResolve(data);
        }
    }

    // Rejecter function
    function rejecter(error) {
        // Mark the isRejected flag as true since the executor work isRejected 
        // and store result in err
        isRejected = true;
        err = error;

        // Calling the reject function with error
        if (typeof onReject === 'function' && !isCalled) {
            isCalled = true;
            onReject(error);
        }
    }

    // Calling the executor function with resolver and rejecter
    executor(resolver, rejecter);
}


// ***********************************************************************
// Finally, our Promise polyfill is completed 
// and ready to be tested for both asynchronous and synchronous promises.

let tp1 = new customPromise(
    (resolve, reject) => setTimeout(() => resolve('Resolved successfully'), 1000)
);
tp1.then((data) => console.log(data));
// Output - Resolved successfully

let tp2 = new customPromise(
    (resolve, reject) => resolve('Resolved right away')
);
tp2.then((data) => console.log(data));
// Output - Resolved right away


// ***********************************************************************
// Step 6: Adding resolve and reject static methods

// Promise.resolve is a static method which takes a parameter that can 
// either be a promise or a simple value. 
// If the provided argument is a promise, then it is directly returned, 
// otherwise, the provided value is wrapped in a promise and then 
// returned which can be extracted later using the .then() handler. 
// For this, we can simply add a resolve method to our customPromise that 
// returns a promise resolving the provided value.


customPromise.resolve = function (promise) {
    return new customPromise((resolve, reject) => resolve(promise));
}


// Similar to Promise.resolve() , Promise.reject() is a static method 
// that will return a promise that will always be rejected. 
// The rejected value can be later extracted using the .catch() handler. 
// Similar to the above, we can add a reject method to our customPromise.


customPromise.reject = function (promise) {
    return new customPromise((resolve, reject) => reject(promise));
}