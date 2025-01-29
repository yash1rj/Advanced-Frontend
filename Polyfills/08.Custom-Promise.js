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