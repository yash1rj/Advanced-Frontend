// Purpose:
// Currying is a technique in functional programming where a 
// function that takes multiple arguments is transformed into a 
// sequence of functions, each taking a single argument.


// ***********************************************************************
// Basic currying

function curryAdd(x) {
    return function (y) {
        return x + y;
    }
}

const add5 = curryAdd(5);
console.log(add5(3)); // 8


// ***********************************************************************
// Currying with arrow fns

const curryMultiply = (x) => (y) => x * y;

const multiplyBy2 = curryMultiply(2);
console.log(multiplyBy2(5)); // 10


// ***********************************************************************
// Currying implementation for multi-argument functions

function curry(func) {
    return function curried(...args) {
        // Check if the number of arguments collected so far (args.length) 
        // is greater than or equal to the number of arguments expected by the original function
        if (args.length >= func.length) {
            // If enough arguments have been collected:
            // Execute the original function func with the collected arguments (args) 
            // and the current this context.
            return func.apply(this, args);
        } else {
            // If not enough arguments have been collected:
            // Return a new curried function.  
            return function next(...nextArgs) {
                // Concatenate the previously collected arguments (args) 
                // with the newly provided arguments
                // Recursively calls the curried function with the combined arguments.
                return curried.apply(this, args.concat(nextArgs));
            }
        }
    };
}

// In essence:
// The curry function creates a chain of functions.
// Each call to the curried function adds more arguments to the chain.
// When all the necessary arguments have been provided, the original function is executed.

function sum(a, b, c) {
    return a + b + c;
}
let curriedSum = curry(sum);
console.log(curriedSum(1, 2, 3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
console.log(curriedSum(1)(2)(3)); // 6


// ***********************************************************************
// Currying with placeholder

const join = (a, b, c) => {
    return `${a}_${b}_${c}`;
}

const curriedJoin = curryWithPlaceholder(join);
const _ = curryWithPlaceholder.placeholder;

curriedJoin(1, 2, 3) // '1_2_3'
curriedJoin(_, 2)(1, 3) // '1_2_3'
curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'

function curryWithPlaceholder(fn) {
    return function curried(...args) {
        const cleanedArgs = args.slice(0, fn.length);
        const hasPlaceholder = cleanedArgs.some((arg) => arg === curryWithPlaceholder.placeholder);

        if (!hasPlaceholder && cleanedArgs.length === fn.length) {
            return fn.apply(this, cleanedArgs);
        } else {
            return function next(...nextArgs) {
                return curried.apply(this, mergeArgs(cleanedArgs, nextArgs));
            };
        }
    };
}

curryWithPlaceholder.placeholder = Symbol();

function mergeArgs(args, nextArgs) {
    let result = [];

    // iterate over args (because we need to replace from it)
    // in each iteration, if we find element == curry.placeholder
    // then we replace that placeholder with first element from nextArgs
    // else we put current element
    args.forEach(arg => {
        if (arg === curryWithPlaceholder.placeholder && nextArgs.length) {
            result.push(nextArgs.shift());
        } else {
            result.push(arg);
        }
    });

    // merge result and nextArgs together, and return it
    return [...result, ...nextArgs];
}


// ***********************************************************************
// Examples of currying

// Logging
const curryLog = (prefix) => (message) => console.log(`${prefix} : ${message}`);
const logInfo = curryLog('INFO');
logInfo('Application started'); // INFO : Application started


// Dynamic UI components

// without currying
const createButton = (text, color, onClick) => {
    // Button creation logic
};

// with currying
const curryCreateButton = (color) => (text) => (onClick) => {
    // Button creation logic
};

const createRedButton = curryCreateButton('red');
const createBlueButton = curryCreateButton('blue');

const redButton = createRedButton('Click me')(handleClick);
const blueButton = createBlueButton('Press')(handlePress);


// Styling utilities

// without currying
const applyStyles = (element, styles) => {
    // Apply styling logic
};

// with currying
const curryApplyStyles = (styles) => (element) => {
    // Apply styling logic
};

const applyButtonStyles = curryApplyStyles({ color: 'blue', fontSize: '16px' });
applyButtonStyles(buttonElement);