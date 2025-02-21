// An Event Emitter is a programming pattern that implements the 
// publish-subscribe (pub-sub) design pattern. It's a fundamental concept in 
// event-driven programming, especially in JavaScript and Node.js environments.

// At its core, an Event Emitter:

// - Allows objects to register as listeners for specific events
// - Provides a mechanism to trigger (emit) those events
// - Executes all registered callbacks when an event occurs

// The key components are:

// Events: Named signals that indicate something happened
// Listeners/Handlers: Functions that execute in response to events
// Emitter: The object that manages event registration and triggering

// Real-world parallels:

// Think of it like a newspaper subscription - you subscribe to topics you're interested in, 
// and the publisher delivers content when it's available
// Or a radio station broadcasting on different frequencies - only receivers tuned 
// to that frequency pick up the signal


// ***********************************************************************
/**
 * Simple Event Emitter Implementation
 */
class EventEmitter {
    constructor() {
        // Store event listeners
        this.events = new Map();
        // Store "once" event flags
        this.onceFlags = new Set();
    }

    /**
     * Subscribe to an event
     * @param {string} eventName - Name of the event to listen for
     * @param {Function} listener - Function to call when event is emitted
     * @returns {EventEmitter} - Returns this for chaining
     */
    on(eventName, listener) {
        if (typeof listener !== 'function') {
            throw new TypeError('Listener must be a function');
        }

        // Initialize event array if it doesn't exist
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        // Add listener
        const listeners = this.events.get(eventName);
        listeners.push(listener);

        return this;
    }

    /**
     * Subscribe to an event for one-time execution
     * @param {string} eventName - Name of the event to listen for
     * @param {Function} listener - Function to call when event is emitted
     * @returns {EventEmitter} - Returns this for chaining
     */
    once(eventName, listener) {
        this.on(eventName, listener);
        this.onceFlags.add(listener);
        return this;
    }

    /**
     * Unsubscribe from an event
     * @param {string} eventName - Name of the event
     * @param {Function} listenerToRemove - Listener to remove
     * @returns {EventEmitter} - Returns this for chaining
     */
    off(eventName, listenerToRemove) {
        if (!this.events.has(eventName)) return this;

        const listeners = this.events.get(eventName);
        const filteredListeners = listeners.filter(
            listener => listener !== listenerToRemove
        );

        if (filteredListeners.length > 0) {
            this.events.set(eventName, filteredListeners);
        } else {
            this.events.delete(eventName);
        }

        // Clean up once flag
        if (this.onceFlags.has(listenerToRemove)) {
            this.onceFlags.delete(listenerToRemove);
        }

        return this;
    }

    /**
     * Emit an event with data
     * @param {string} eventName - Name of the event to emit
     * @param {...any} args - Arguments to pass to listeners
     * @returns {boolean} - Whether any listeners were called
     */
    emit(eventName, ...args) {
        if (!this.events.has(eventName)) return false;

        const listeners = this.events.get(eventName);
        const onceListeners = [];

        // Call each listener
        for (const listener of listeners) {
            listener.apply(this, args);

            // Track once listeners for later removal
            if (this.onceFlags.has(listener)) {
                onceListeners.push(listener);
            }
        }

        // Remove once listeners after all have executed
        for (const listener of onceListeners) {
            this.off(eventName, listener);
        }

        return true;
    }
}


// ***********************************************************************
// Usage examples
const emitter = new EventEmitter();

// Basic usage
emitter.on('test', (data) => console.log('Received:', data));
emitter.emit('test', 'Hello world'); // Logs: Received: Hello world

// Once listener
emitter.once('login', (user) => console.log(`${user} logged in`));
emitter.emit('login', 'Alice'); // Logs: Alice logged in
emitter.emit('login', 'Bob');   // Nothing happens, listener already removed

// Multiple listeners for same event
let count = 0;
emitter.on('increment', () => count++);
emitter.on('increment', () => console.log(`Count is now ${count}`));
emitter.emit('increment'); // Logs: Count is now 1

// Unsubscribing
const handler = () => console.log('This should not be seen');
emitter.on('message', handler);
emitter.off('message', handler);
emitter.emit('message'); // Nothing happens, listener was removed