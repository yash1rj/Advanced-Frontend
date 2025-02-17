// The setInterval() method of the Window interface repeatedly calls a function 
// or executes a code snippet, with a fixed time delay between each call.

// This method returns an interval ID which uniquely identifies the interval, 
// so we can remove it later by calling clearInterval().

// setInterval(func, delay, arg1, arg2, /* …, */ argN)

// func
// A function to be executed every delay milliseconds. 
// The first execution happens after delay milliseconds.

// delay (Optional)
// The time, in milliseconds, the timer should delay in between executions 
// of the specified function or code. Defaults to 0 if not specified.

// arg1, …, argN Optional
// Additional arguments which are passed through to the function specified 
// by func once the timer expires.


// ***********************************************************************
class IntervalManager {
    constructor() {
        this.intervals = new Map();
        this.currentId = 0;
    }

    setInterval(callback, delay, ...args) {
        const id = this.currentId++;
        const interval = new Interval(
            callback,
            delay,
            args,
            () => this.intervals.delete(id)
        );
        this.intervals.set(id, interval);
        return id;
    }

    clearInterval(id) {
        if (this.intervals.has(id)) {
            this.intervals.get(id).cancel();
            this.intervals.delete(id);
        }
    }
}

class Interval {
    constructor(callback, delay, args, cleanup) {
        this.callback = callback;
        this.delay = delay;
        this.args = args;
        this.cleanup = cleanup;
        this.startTime = Date.now();
        this.isActive = true;
        this.handle = null;
        this.iterations = 0;
        this.loop();
    }

    loop = () => {
        if (!this.isActive) return;

        const currentTime = Date.now();
        const expectedTime = this.startTime + (this.iterations + 1) * this.delay;

        if (currentTime >= expectedTime) {
            this.callback.apply(null, this.args);
            this.iterations++;
        }

        this.handle = requestAnimationFrame(this.loop);
    }

    cancel() {
        this.isActive = false;
        if (this.handle) {
            cancelAnimationFrame(this.handle);
            this.handle = null;
        }
    }
}

// For Node.js environment
const requestAnimationFrame = callback => setTimeout(() => callback(Date.now()), 1000 / 60);
const cancelAnimationFrame = id => clearTimeout(id);

// Usage example
const intervalManager = new IntervalManager();
const id = intervalManager.setInterval(() => console.log('Tick'), 1000);
// intervalManager.clearInterval(id);


// ***********************************************************************
// Key points about iterations:

// Purpose:
// Maintains consistent timing between interval executions
// Prevents timing drift that would accumulate over time
// Ensures callbacks execute at expected intervals

// How it works:

// Starts at 0 and increments after each callback execution
// Used to calculate next expected execution time
// Helps adjust timing if execution is delayed

// Example calculation for 1000ms interval :
// iterations = 0: expectedTime = startTime + (0 + 1) * 1000 // 1000ms
// iterations = 1: expectedTime = startTime + (1 + 1) * 1000 // 2000ms
// iterations = 2: expectedTime = startTime + (2 + 1) * 1000 // 3000ms