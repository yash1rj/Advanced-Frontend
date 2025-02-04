// The Object.assign() method copies all enumerable own properties 
// from one or more source objects to a target object. It returns the modified target object.

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target); // { a: 1, b: 4, c: 5 }
console.log(returnedTarget === target); // true


// ***********************************************************************
function object_assign(target, ...sources) {
    if (target == null) throw Error(); // cannot assign properties to a non-existent object

    target = Object(target); // ensures that the target is an object

    for (const source of sources) {
        // If the current source object is null or undefined, 
        // the loop skips to the next source object
        if (source == null) continue;

        // Add all key-value pairs of source to target
        merge(Object.keys(source), source);

        // Add all symbol-value pairs of source to target
        // The Object.getOwnPropertySymbols() static method 
        // returns an array of all symbol properties found directly upon a given object.
        merge(Object.getOwnPropertySymbols(source), source);
    }

    function merge(keys = [], currSource) {
        for (const key of keys) {
            target[key] = currSource[key];
            if (target[key] !== currSource[key]) {
                // indicate issue with the object or the assignment process
                throw Error();
            }
        }
    }

    // returns the modified target object, 
    // which now contains the properties from all the source objects
    return target;
}