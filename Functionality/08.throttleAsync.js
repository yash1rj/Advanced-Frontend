// Executing Promises in Batches with JavaScript

// When working with asynchronous operations in JavaScript, such as API calls, 
// there are times when we need to limit the number of concurrent operations 
// to prevent overloading our system or third-party services. 
// A common scenario is executing a large number of promises in manageable batches.

// Imagine we have an array of tasks where each task is an asynchronous operation,
// such as making API calls. 
// Executing all these operations simultaneously could overwhelm the system or lead to rate limiting. 
// Instead, it’s often better to throttle these operations — processing them in smaller batches.


// ***********************************************************************

// Function that returns a promise that resolves after a set time
async function task(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Resolved promise in time: ${time}`);
        }, time);
    });
}

// Array of promises generated by the task function
const callAPIs = [task(100), task(200), task(300), task(400), task(500), task(600)];

// Function to execute promises in batches
async function throttleAsync(promises, batchSize) {
    let result = [];

    for (let i = 0; i < promises.length; i += batchSize) {
        const batch = promises.slice(i, i + batchSize);
        // Execute the current batch and wait for all of them to complete
        let batchResult = await Promise.all(batch.map(p => p));
        result.push(...batchResult);
    }

    return result;
}


// ***********************************************************************
// How `throttleAsync` Works ?

// 1. Batching Promises:
// — The function accepts an array of promises (`promises`) and a `batchSize`, 
// indicating how many promises should be processed concurrently.
// — It slices the array into smaller batches of the specified size.

// 2. Executing Batches:
// — Inside the loop, each batch is processed by `Promise.all()`, 
// which waits for all promises in the current batch to resolve.
// — The results of each batch are collected and stored in the `result` array.

// 3. Returning the Results:
// — After all batches have been processed, the accumulated results are returned.


// ***********************************************************************
// Calling the function with the API promises array and batch size of 2
throttleAsync(callAPIs, 2).then((resolve) => {
    console.log(resolve);
}).catch((error) => {
    console.log(error);
});


// ***********************************************************************
// Why Use `throttleAsync`?

// - Resource Management: 
// Limits the number of concurrent operations, which is crucial when dealing with 
// APIs that have rate limits or when system resources are constrained.

// - Better Performance: 
// By controlling the flow of operations, we can achieve better performance, 
// especially in environments where concurrency might otherwise lead to issues 
// like rate limiting or memory exhaustion.