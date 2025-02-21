// ClearAllTimeout clears all the setTimeout which are active.

// setTimeout is an asynchronous function that executes a function or a piece of code 
// after a specified amount of time.

// setTimeout method returns a unique Id when it is invoked, which can be used to 
// cancel the timer anytime using the clearTimeout method which is inbuilt.

// we have to clear all the active timers 
// and the same can be done by clearing all timeoutIds using clearTimeout.

// But to clear all the timeoutIds at once, we will need to store them somewhere, 
// let’s say in an array. For which we will override the existing setTimeout method 
// and collect all the timeoutIds in an array.


// ***********************************************************************
window.timeoutIds = [];

// store the original method
const originalTimeoutFn = window.setTimeout;

//over-writing the original method
window.setTimeout = function (fn, delay) {
    const id = originalTimeoutFn(fn, delay);
    timeoutIds.push(id);

    //return the id so that it can be originally cleared
    return id;
}


window.clearAllTimeouts = function () {
    //clear all timeouts
    while (timeoutIds.length) {
        clearTimeout(timeoutIds.pop());
    }
}