/**
 * A simple implementation of cancelable promises using a signal pattern
 */


// createCancelSignal() creates an object with:
// A signal Promise that can be rejected to indicate cancellation
// A cancel() function that rejects this Promise

/**
 * Creates a cancelable signal
 * @returns {Object} An object containing a signal promise and a cancel function
 */
function createCancelSignal() {
    // Initialize the controller object
    const controller = {};

    // Create a promise that never resolves on its own
    // We'll only use its rejection capability for cancellation
    controller.signal = new Promise((resolve, reject) => {
        // Expose the reject function as the cancel method
        controller.cancel = () => {
            reject(new Error("Operation canceled"));
        };
    });

    return controller;
}

// cancelable() wraps an async function with cancellation support:
// It ensures the Promise settles only once (avoiding race conditions)
// It handles both normal resolution/rejection and cancellation
// It uses the signal to detect cancellation requests

/**
 * Creates a promise that can be canceled via a signal
 * @param {Function} fn The async function to execute
 * @param {Promise} signal A promise that rejects when cancellation is requested
 * @returns {Promise} A promise that can be canceled
 */
function cancelable(fn, signal) {
    return new Promise((resolve, reject) => {
        // Track whether we've settled this promise already
        let settled = false;

        // Execute the provided function and handle its result
        Promise.resolve(fn())
            .then(result => {
                // Only resolve if we haven't been canceled yet
                if (!settled) {
                    settled = true;
                    resolve(result);
                }
            })
            .catch(error => {
                // Only reject if we haven't been canceled yet
                if (!settled) {
                    settled = true;
                    reject(error);
                }
            });

        // Listen for cancellation
        signal.catch(cancelError => {
            // Only reject if we haven't settled yet
            if (!settled) {
                settled = true;
                reject(cancelError);
            }
        });
    });
}


// ***********************************************************************
// Demonstrating a practical example using wait method

// wait() demonstrates a practical example:
// It sets up a timer that resolves after a delay
// It properly cleans up resources (clearing the timeout) when canceled
// It propagates the cancellation error

/**
 * Creates a promise that resolves after a specified delay, but can be canceled
 * @param {Number} ms Milliseconds to wait
 * @param {Promise} signal A promise that rejects when cancellation is requested
 * @returns {Promise} A promise that resolves after the delay unless canceled
 */
function wait(ms, signal) {
    return new Promise((resolve, reject) => {
        // Set up the timer
        const timer = setTimeout(() => {
            resolve(`Completed after ${ms}ms`);
        }, ms);

        // Set up cancellation
        signal.catch(error => {
            // Clean up the timer
            clearTimeout(timer);
            // Propagate the cancellation
            reject(error);
        });
    });
}

// Example usage
async function example() {
    try {
        // Create a cancel signal
        const { signal, cancel } = createCancelSignal();

        console.log("Starting a 5-second operation...");

        // Set up cancellation after 2 seconds
        setTimeout(() => {
            console.log("Canceling operation after 2 seconds");
            cancel();
        }, 2000);

        // Wait for 5 seconds (but will be canceled after 2)
        const result = await wait(5000, signal);
        console.log("This line won't execute because of cancellation");

    } catch (error) {
        console.log(`Operation was canceled: ${error.message}`);
    }
}

example();


// Additional example with multiple cancelable operations
async function advancedExample() {
    // Create a single cancel signal for multiple operations
    const { signal, cancel } = createCancelSignal();

    try {
        // Start multiple operations with the same cancel signal
        const promise1 = wait(1000, signal);
        const promise2 = wait(2000, signal);

        // Cancel after 500ms
        setTimeout(cancel, 500);

        // Wait for both (both will be canceled)
        const results = await Promise.all([promise1, promise2]);
        console.log("This won't execute");
    } catch (error) {
        console.log("All operations were canceled simultaneously");
    }
}

advancedExample();


// ***********************************************************************
// Demo using cancelable method

/**
 * Simulates a network request that takes time to complete
 * @param {string} url The URL to fetch
 * @param {number} simulatedDelay The simulated response time in ms
 * @returns {Promise} A promise that resolves with the response data
 */
function fetchData(url, simulatedDelay = 2000) {
    return new Promise((resolve) => {
        console.log(`Starting fetch from ${url}...`);

        setTimeout(() => {
            const responseData = {
                url,
                data: "Sample response data",
                timestamp: new Date().toISOString()
            };

            console.log(`Fetch from ${url} completed!`);
            resolve(responseData);
        }, simulatedDelay);
    });
}

/**
 * Example 1: Basic usage of cancelable function
 */
async function basicExample() {
    console.log("\n=== Basic Example ===");

    // Create a cancel signal
    const { signal, cancel } = createCancelSignal();

    try {
        console.log("Starting a cancelable operation...");

        // Create a cancelable operation that fetches data
        const promise = cancelable(() => {
            return fetchData("https://api.example.com/data", 3000);
        }, signal);

        // Set up cancellation after 1.5 seconds
        setTimeout(() => {
            console.log("Canceling the operation...");
            cancel();
        }, 1500);

        // Wait for the operation to complete or be canceled
        const result = await promise;
        console.log("Result:", result);
    } catch (error) {
        console.log(`Operation failed: ${error.message}`);
    }
}

/**
 * Example 2: Multiple operations with the same cancel signal
 */
async function multipleOperationsExample() {
    console.log("\n=== Multiple Operations Example ===");

    // Create a single cancel signal for multiple operations
    const { signal, cancel } = createCancelSignal();

    try {
        // Start multiple operations with the same cancel signal
        const operation1 = cancelable(() => {
            return fetchData("https://api.example.com/users", 2000);
        }, signal);

        const operation2 = cancelable(() => {
            return fetchData("https://api.example.com/products", 4000);
        }, signal);

        console.log("Starting multiple operations...");

        // Cancel all operations after 1 second
        setTimeout(() => {
            console.log("Canceling all operations...");
            cancel();
        }, 1000);

        // Wait for both operations (both will be canceled)
        const results = await Promise.all([operation1, operation2]);
        console.log("Results:", results);
    } catch (error) {
        console.log(`All operations were canceled: ${error.message}`);
    }
}

/**
 * Example 3: Handling successful completion
 */
async function successfulCompletionExample() {
    console.log("\n=== Successful Completion Example ===");

    // Create a cancel signal
    const { signal, cancel } = createCancelSignal();

    try {
        console.log("Starting a quick operation...");

        // Create a cancelable operation that completes quickly
        const promise = cancelable(() => {
            return fetchData("https://api.example.com/quick", 500);
        }, signal);

        // Set up cancellation after 2 seconds (operation will complete before this)
        setTimeout(() => {
            console.log("Attempting to cancel, but operation has already completed");
            cancel();
        }, 2000);

        // Wait for the operation to complete (should succeed)
        const result = await promise;
        console.log("Operation completed successfully!");
        console.log("Result:", result);
    } catch (error) {
        console.log(`Operation failed: ${error.message}`);
    }
}

// Run all examples sequentially
async function runAllExamples() {
    await basicExample();
    await successfulCompletionExample();
    await multipleOperationsExample();

    console.log("\nAll examples completed!");
}

// Run the examples
runAllExamples();


// ***********************************************************************
// In multipleOperationsExample(), operations are canceled after 1000ms
// The cancellation rejects the promises, 
// causing the catch block to execute with "Operation canceled"
// However, the setTimeout timers for each fetch (2000ms and 4000ms) continue to run
// When those timers complete, they log the "Fetch completed" messages

// The current implementation is still useful though - it prevents our code from waiting 
// for results we no longer need, even if the underlying operation completes in the background.


// If we want to truly abort the underlying operations, we would need to:
// Modify fetchData() to accept a signal
// Use that signal to clear the timeout if cancellation occurs
// Return without calling resolve

// Added an isCanceled flag to the controller object to track cancellation state
function createCancelSignal2() {
    // Initialize the controller object
    const controller = {
        isCanceled: false
    };

    // Create a promise that never resolves on its own
    // We'll only use its rejection capability for cancellation
    controller.signal = new Promise((resolve, reject) => {
        // Expose the reject function as the cancel method
        controller.cancel = () => {
            controller.isCanceled = true;
            reject(new Error("Operation canceled"));
        };
    });

    return controller;
}

// Updated the cancelable() function to:
// Pass the controller to the function being executed
// This allows the underlying operation to check cancellation state
function cancelable2(fn, controller) {
    return new Promise((resolve, reject) => {
        // Track whether we've settled this promise already
        let settled = false;

        // Execute the provided function and handle its result
        // Pass the controller so the function can check isCanceled
        Promise.resolve(fn(controller))
            .then(result => {
                // Only resolve if we haven't been canceled yet
                if (!settled) {
                    settled = true;
                    resolve(result);
                }
            })
            .catch(error => {
                // Only reject if we haven't been canceled yet
                if (!settled) {
                    settled = true;
                    reject(error);
                }
            });

        // Listen for cancellation
        controller.signal.catch(cancelError => {
            // Only reject if we haven't settled yet
            if (!settled) {
                settled = true;
                reject(cancelError);
            }
        });
    });
}

// Modified the fetchData() function to:
// Accept the controller object
// Store the timeout ID so it can be cleared
// Check the cancellation state before resolving
// Add an abort handler that clears the timeout and logs the abortion
function fetchData2(url, simulatedDelay = 2000, controller) {
    return new Promise((resolve) => {
        console.log(`Starting fetch from ${url}...`);

        // Store the timeout ID so we can clear it if canceled
        const timeoutId = setTimeout(() => {
            // Before resolving, check if we've been canceled
            if (!controller.isCanceled) {
                const responseData = {
                    url,
                    data: "Sample response data",
                    timestamp: new Date().toISOString()
                };

                console.log(`Fetch from ${url} completed!`);
                resolve(responseData);
            }
        }, simulatedDelay);

        // Add an abort function to clear the timeout if canceled
        controller.signal.catch(() => {
            clearTimeout(timeoutId);
            console.log(`Fetch from ${url} aborted!`);
        });
    });
}

// Update examples to pass the controller through to the operations
async function multipleOperationsExample2() {
    console.log("\n=== Multiple Operations Example 2 ===");

    // Create a single cancel signal for multiple operations
    const controller = createCancelSignal2();

    try {
        // Start multiple operations with the same cancel signal
        const operation1 = cancelable2((ctrl) => {
            return fetchData2("https://api.example.com/users", 2000, ctrl);
        }, controller);

        const operation2 = cancelable2((ctrl) => {
            return fetchData2("https://api.example.com/products", 4000, ctrl);
        }, controller);

        console.log("Starting multiple operations...");

        // Cancel all operations after 1 second
        setTimeout(() => {
            console.log("Canceling all operations...");
            controller.cancel();
        }, 1000);

        // Wait for both operations (both will be canceled)
        const results = await Promise.all([operation1, operation2]);
        console.log("Results:", results);
    } catch (error) {
        console.log(`All operations were canceled: ${error.message}`);
    }
}


// Run all examples sequentially
async function runV2Example() {
    await multipleOperationsExample2();

    console.log("\nAll v2 examples completed!");
}

// Run the v2 examples
runV2Example();

// With these changes, when cancellation occurs:
// The promise chain is rejected
// The underlying timeouts are cleared
// "Fetch aborted" messages are logged instead of "Fetch completed"

// This implementation now more closely matches how AbortController 
// works in modern browsers with fetch requests. 
// The underlying operations are truly aborted rather than just having their results ignored.


// ***********************************************************************
// We can make one more modification to make the code more leaner

function createCancelController() {
    let rejectPlaceholder;
    const controller = {
        isCanceled: false,
        signal: new Promise((_, reject) => { rejectPlaceholder = reject; })
    };

    controller.cancel = () => {
        controller.isCanceled = true;
        rejectPlaceholder(new Error("Operation canceled"));
    };

    return controller;
}

async function cancelable3(asyncFn, controller) {
    // Create a race between our function and the cancel signal
    try {
        // We use Promise.race to compete between:
        // 1. Our async function (which receives the controller)
        // 2. The cancellation signal (which rejects when canceled)
        return await Promise.race([
            asyncFn(controller),
            controller.signal
        ]);
    } catch (error) {
        // If either promise rejects, we'll end up here
        if (controller.isCanceled) {
            throw new Error("Operation canceled");
        }
        // Otherwise, pass through the original error
        throw error;
    }
}

// The fetchData method or the async method to be wrapped with cancelable will remain same :
// - Usage of  if (!controller.isCanceled) consition while resolving response
// - Usage of controller.signal.catch method to set up cleanup for cancellation