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