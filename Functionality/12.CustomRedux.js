// Redux is a predictable state management library commonly used 
// with JavaScript applications, especially React. 
// Its core ideas revolve around a single source of truth (the store), 
// state being read-only, and changes made via pure reducer functions. 
// 
// Trying to build a simplified version from scratch 
// so we can see how it works under the hood.

// First, let’s outline the key components we need:

// A Store - Holds the state and provides methods to interact with it.
// A Reducer - A pure function that specifies how state changes.
// Dispatch - A way to send actions to update the state.
// Subscribe - A mechanism for listeners to react to state changes.


// Step 1: Create the Store
// createStore:

// Takes a reducer as an argument.
// Holds the state privately (not directly accessible outside the store).
// Maintains an array of listeners for subscriptions.
// Provides three methods:
// getState: Returns the current state.
// dispatch: Updates the state via the reducer and notifies listeners.
// subscribe: Adds a listener and returns an unsubscribe function.
// Initializes the state with a dummy @@INIT action to ensure the reducer sets a default state.

function createStore(reducer) {
    let state; // Private state variable
    let listeners = []; // Array to hold subscriber functions

    // Get the current state
    function getState() {
        return state;
    }

    // Dispatch an action to update the state
    // Sends an action to the reducer, which computes the new state.
    // Triggers all subscribed listeners after the state updates.
    function dispatch(action) {
        state = reducer(state, action); // Update state with reducer
        listeners.forEach(listener => listener()); // Notify all subscribers
    }

    // Subscribe to state changes
    function subscribe(listener) {
        listeners.push(listener);
        // Return an unsubscribe function
        return function unsubscribe() {
            listeners = listeners.filter(l => l !== listener);
        };
    }

    // Initialize the state by dispatching a dummy action
    dispatch({ type: '@@INIT' });

    // Return the store's public API
    return {
        getState,
        dispatch,
        subscribe
    };
}

// Method for combining multiple reducers
// combineReducers(reducers):

// Takes an object of reducers as input.
// Returns a single reducer function that combines the individual reducers.
// When the combined reducer is called, it calls each individual reducer 
// with the corresponding slice of the state.
// Returns a new state object that combines the results of the individual reducers.

function combineReducers(reducers) {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, {});
    };
}

// Step 2: Define a Reducer
// Reducer:

// A pure function (no side effects, predictable output).
// Takes the current state and an action object (with a type property).
// Returns the new state based on the action type.
// Uses a default parameter (state = 0) to set the initial state if undefined.

function counterReducer(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state; // Return unchanged state for unknown actions
    }
}

function todoReducer(state = [], action) {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, action.payload];
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    counter: counterReducer,
    todos: todoReducer,
});

// Step 3: Use the Simplified Redux
const store = createStore(rootReducer, { counter: 0, todos: [] });

// Testing
console.log(store.getState()); // { counter: 0, todos: [] } (initial state)

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
    console.log('State changed:', store.getState());
});

// Dispatch some actions
store.dispatch({ type: 'INCREMENT' }); // Logs: State changed: {counter: 1, todos: []}
store.dispatch({ type: 'INCREMENT' }); // Logs: State changed: {counter: 2, todos: []}
store.dispatch({ type: 'DECREMENT' }); // Logs: State changed: {counter: 1, todos: []}

store.dispatch({ type: 'ADD_TODO', payload: 'Learn Redux' });
// Logs: State changed: {counter: 1, todos: ['Learn Redux']}

// Unsubscribe and test again
unsubscribe();
store.dispatch({ type: 'INCREMENT' }); // No log, since unsubscribed
console.log(store.getState()); // {counter: 2, todos: ['Learn Redux']}
