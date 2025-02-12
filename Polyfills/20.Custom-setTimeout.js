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

// Features:
// - Millisecond precision timing using requestAnimationFrame
// - Memory-safe implementation with automatic cleanup
// - Support for timer arguments
// - Class-based architecture for better organization


// ***********************************************************************

// Polyfill for requestAnimationFrame in Node
// requestAnimationFrame is a browser API

// Browser requestAnimationFrame:

// - Syncs with screen refresh rate (typically 60Hz)
// - Pauses when tab/window inactive
// - Has GPU/hardware acceleration
// - Built-in frame timing optimization

const requestAnimationFrame = callback => {
    return setTimeout(() => {
        callback(Date.now());
    }, 1000 / 60); // Simulating 60 FPS
};

const cancelAnimationFrame = id => {
    clearTimeout(id);
};


// ***********************************************************************

class Timer {
    constructor(callback, delay, args, cleanup) {
        this.callback = callback;
        this.delay = delay;
        this.args = args;
        this.cleanup = cleanup;

        // Track start time for calculating elapsed time
        this.startTime = Date.now();
        this.isActive = true;

        // Store animation frame handle for cancellation
        this.handle = null;
        this.loop();
    }

    // Arrow function to preserve 'this' context
    loop = () => {
        if (!this.isActive) return;

        const elapsed = Date.now() - this.startTime;
        if (elapsed >= this.delay) {
            // Execute callback with stored arguments
            this.callback.apply(null, this.args);
            this.cancel();
            this.cleanup();
        } else {
            // Continue loop until delay is reached
            this.handle = requestAnimationFrame(this.loop);
        }
    }

    // Cancels the timer and cleans up resources
    cancel() {
        this.isActive = false;
        if (this.handle) {
            cancelAnimationFrame(this.handle);
            this.handle = null;
        }
    }
}

class TimerManager {
    constructor() {
        // Store active timers with their IDs
        this.timers = new Map();
        // Counter for generating unique timer IDs
        this.currentId = 0;
    }

    /**
     * Creates a new timer with specified delay
     * @param {Function} callback - Function to execute after delay
     * @param {number} delay - Delay in milliseconds
     * @param {...any} args - Arguments to pass to callback
     * @returns {number} Timer ID for cancellation
     */
    setTimeout(callback, delay, ...args) {
        const id = this.currentId++;
        // Create new timer instance with cleanup function
        const timer = new Timer(
            callback,
            delay,
            args,
            // Cleanup callback removes timer from Map when done
            () => this.timers.delete(id)
        );
        this.timers.set(id, timer);
        return id;
    }

    /**
     * Cancels a running timer
     * @param {number} id - Timer ID to cancel
     */
    clearTimeout(id) {
        if (this.timers.has(id)) {
            this.timers.get(id).cancel();
            this.timers.delete(id);
        }
    }
}

// Usage example
const timerManager = new TimerManager();
const id = timerManager.setTimeout(() => console.log('Done!'), 1000);