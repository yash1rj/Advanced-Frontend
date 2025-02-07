// forEach
// The forEach() method of Array instances executes a 
// provided function once for each array element.

const array1 = ['a', 'b', 'c'];
function consoleItem(input) {
    console.log(input);
}

array1.forEach(consoleItem);

Array.prototype.ourForEach = function (callBack) {
    if (typeof callBack !== "function") {
        throw new TypeError(`${callBack} is not a function`);
    }

    if (this === null || this === undefined) {
        throw new TypeError("Cannot reduce array on null or undefined");
    }

    for (let i = 0; i < this.length; i++) {
        callBack(this[i]);
    }
};

array1.ourForEach(consoleItem);


// ***********************************************************************
// map
// The map() method of Array instances creates a new array populated 
// with the results of calling a provided function on every element in the calling array.

const users = [1, 2, 3, 4, 5];
function double(x) {
    return x * 2;
}

const newUsers = users.map(double);

Array.prototype.ourMap = function (callBack) {
    if (typeof callBack !== "function") {
        throw new TypeError(`${callBack} is not a function`);
    }

    if (this === null || this === undefined) {
        throw new TypeError("Cannot reduce array on null or undefined");
    }

    const newArray = [];
    for (let i = 0; i < this.length; i++) {
        newArray.push(callBack(this[i]));
    }
    return newArray;
};

console.log(newUsers);
console.log(users.ourMap(double));


// ***********************************************************************
// reduce
// The reduce() method of Array instances executes a user-supplied "reducer" callback function 
// on each element of the array, in order, passing in the return value 
// from the calculation on the preceding element. 
// The final result of running the reducer across all elements of the array is a single value.

// The first time that the callback is run there is 
// no "return value of the previous calculation". 
// If supplied, an initial value may be used in its place. 
// Otherwise the array element at index 0 is used as the initial value 
// and iteration starts from the next element (index 1 instead of index 0).

const numbers = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
);

console.log(sumWithInitial);
// Expected output: 10


Array.prototype.ourReduce = function (callBack, initialValue) {
    if (typeof callBack !== "function") {
        throw new TypeError(`${callBack} is not a function`);
    }

    if (this === null || this === undefined) {
        throw new TypeError("Cannot reduce array on null or undefined");
    }

    let accumulator;
    let startIndex;

    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        if (this.length === 0) {
            throw new TypeError("Reduce of empty array with no initial value");
        }
        accumulator = this[0];
        startIndex = 1;
    }


    for (let i = startIndex; i < this.length; i++) {
        if (accumulator !== undefined) {
            // Arguments to the callback:
            // accumulator: The current accumulated value.
            // this[i]: The current element of the array being iterated over.
            // i: The current index of the element in the array.
            // this: The array itself (since the reduce method is called on the array).

            accumulator = callBack.call(undefined, accumulator, this[i], i, this);

            // In this case, undefined is passed as the first argument to call(). 
            // This means that the this value within the callback function will be undefined. 
            // This is generally the desired behavior for reduce 
            // since the this value within the callback usually doesn't have a 
            // specific meaning in this context.
        } else {
            accumulator = this[i];
        }
    }
    return accumulator;
};

console.log(numbers.ourReduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue)
);


// ***********************************************************************
// filter

// The filter() method of Array instances creates a shallow copy of a portion 
// of a given array, filtered down to just the elements from the given array 
// that pass the test implemented by the provided function.

const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

Array.prototype.ourFilter = function (callBack) {
    if (typeof callBack !== "function") {
        throw new TypeError(`${callBack} is not a function`);
    }

    if (this === null || this === undefined) {
        throw new TypeError("Cannot reduce array on null or undefined");
    }

    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callBack.call(undefined, this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
}

const filtered = words.ourFilter((word) => word.length > 6);
console.log(filtered)