// Purpose:
// This function implements a rate-limiting mechanism. 
// It takes a function (func) and a limit time in milliseconds as input. 

// It returns a new function that, when called, will:

// Execute the original function (func) only once within the specified limit period.

// Prevent subsequent calls to the original function within 
// the limit period after the initial execution.

// Allow subsequent calls to the original function to execute again 
// after the limit period has elapsed.


const throttle = (func, limit) => {
    let flag = true;

    return function () {
        let context = this,
            args = arguments;

        if (flag) {
            func.apply(context, args);
            flag = false;

            // allow the function to be executed again after the specified interval.
            setTimeout(() => {
                flag = true;
            }, limit);
        }
    };
}

// The throttling technique can be useful in various scenarios to 
// improve performance and user experience, such as:

// Event Handling: 
// Limiting the frequency of event handlers 
// (e.g., resize, scroll, mousemove) to prevent excessive processing.

// API Calls: 
// Reducing the number of API calls to a server to 
// prevent overloading it and improve response times.

// Animations: 
// Smoothing out animations by limiting the rate at which they are updated.