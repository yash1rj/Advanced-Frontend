// ***********************************************************************
// The call() method of Function instances calls this function with 
// a given this value and arguments provided individually.

function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = "food";
}

console.log(new Food("cheese", 5).name);
// Expected output: "cheese"


// ***********************************************************************
Function.prototype.myCall = function (thisArg, ...args) {
    // If thisArg is null or undefined, default to global object
    thisArg = thisArg || globalThis;

    // Create a unique property on thisArg to store this function
    const uniqueKey = Symbol('uniqueKey');

    // Assign the function to the unique property
    thisArg[uniqueKey] = this;

    // Execute the function with thisArg as its context
    const result = thisArg[uniqueKey](...args);

    // Clean up by removing the temporary property
    delete thisArg[uniqueKey];

    // Return the result
    return result;
};


// ***********************************************************************
// The apply() method of Function instances calls this function with 
// a given this value, and arguments provided as an array.

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max);
// Expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// Expected output: 2


// ***********************************************************************
Function.prototype.myApply = function (thisArg, argsArray = []) {
    // If thisArg is null or undefined, default to global object
    thisArg = thisArg || globalThis;

    // Create a unique property on thisArg to store this function
    const uniqueKey = Symbol('uniqueKey');

    // Assign the function to the unique property
    thisArg[uniqueKey] = this;

    // Execute the function with thisArg as its context
    const result = thisArg[uniqueKey](...argsArray);

    // Clean up by removing the temporary property
    delete thisArg[uniqueKey];

    // Return the result
    return result;
};


// ***********************************************************************
// The bind() method of Function instances creates a new function that, when called, 
// calls this function with its this keyword set to the provided value, and 
// a given sequence of arguments preceding any provided when the new function is called.

const module = {
    x: 42,
    getX: function () {
        return this.x;
    },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// Expected output: 42


// ***********************************************************************
Function.prototype.myBind = function (thisArg, ...boundArgs) {
    if (typeof this !== "function") {
        throw new Error(this + "cannot be bound as it's not callable");
    }

    // Store reference to the original function
    const originalFunction = this;

    // Return a new function
    return function (...args) {
        // Combine the bound arguments with those passed to the new function
        const allArgs = [...boundArgs, ...args];

        // Use our myCall implementation to invoke the original function
        return originalFunction.myCall(thisArg, ...allArgs);
    };
};