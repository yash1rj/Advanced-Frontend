// Purpose: 
// This function takes a function (fn) and a delay time in milliseconds as input. 
// It returns a new function that, when called, will only execute the 
// original function (fn) after the specified delay has elapsed without any further calls.


const debounce = function (fn, delay) {
    let timer;

    return function () {
        let context = this,
            args = arguments;

        // Clear any existing timeout, preventing multiple executions within the delay period.
        clearTimeout(timer);

        time = setTimeout(() => {
            // ensures that the original function is called 
            // with the correct this context and arguments.
            fn.apply(context, args);
        }, delay);
    };
}

let counter = 0;
const getData = () => {
    // calls an API and gets data
    console.log("Fetching data ...", counter++);
}

const debouncedFunction = debounce(getData, 300);