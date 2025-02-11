// RequestAnimationFrame:
// It is a highly efficient JavaScript method that prompts the browser 
// to run a callback before the next screen repaint. 
// By syncing with the display's refresh rate (usually 60 FPS), it ensures 
// smooth animations and is more effective for animations than setTimeout or setInterval.

// Use cases:

// If we want to have fading effects like screen resize.
// Obtain smooth scrolls animations.
// Custom throttle or debouce.
// For our custom implementation of setTimeoutAnd clearTimeout 
// we would use requestAnimationFrame in a recursive way.


// ***********************************************************************
// SetTimeout Custom implementation

// Functionality: 
// setTimeout is a function that instructs the JavaScript engine to 
// execute a callback function after a specified time interval.

// Parameters/ Arguments: 
// the first is the callback function, and the second is the time interval (in milliseconds).

// Asynchronous behaviour: 
// setTimeout is a browser-provided function that operates asynchronously. 
// It sits in the task queue and is executed after the specified interval has passed.


// ***********************************************************************