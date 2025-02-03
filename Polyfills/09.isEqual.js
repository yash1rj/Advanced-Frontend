// _.isEqual is useful when we want to compare complex data types by value not the reference.


// ***********************************************************************
// Circular References
// We use a Map called visited to track objects we've already encountered 
// to handle circular references.

// Circular references occur when an object refers to itself 
// or has nested objects that refer back to it. 
// Without this check, the recursion would loop infinitely.

// if (visited.has(a)) {
//     return isEqual(visited.get(a), b, visited);
// }
// visited.set(a, b);


// ***********************************************************************
function isEqual(firstItem, secondItem, visited = new Map()) {
    // Type checking
    if (typeof firstItem !== typeof secondItem) return false;

    // Primitive types value checking (string, boolean, number)
    if (a === b) return true;

    // NaN
    if (Number.isNaN(firstItem) && Number.isNaN(secondItem)) return true;

    // undefined
    if (firstItem === 'undefined' || secondItem === 'undefined') return firstItem === secondItem;

    // null
    if (firstItem === 'null' || secondItem === 'null') return firstItem === secondItem;

    // Non-primitive data types (objects, arrays, maps, etc.)
    if (typeof firstItem === 'object' && typeof secondItem === 'object') {
        // Circular reference check: 
        // If we've already encountered 'firstItem' before, skip to avoid infinite recursion
        if (visited.has(firstItem)) {
            // Compare previously visited object with 'secondItem'
            return isEqual(visited.get(firstItem), secondItem, visited);
        }
        // Mark 'firstItem' as visited to handle circular references
        visited.set(firstItem, secondItem);

        // Date
        if (firstItem instanceof Date) {
            return secondItem instanceof Date && firstItem.toString() === secondItem.toString();
        }

        // Regex
        if (firstItem instanceof RegExp) {
            return secondItem instanceof RegExp && firstItem.toString() === secondItem.toString();
        }

        // Error object
        if (firstItem instanceof Error) {
            return secondItem instanceof Error
                && (firstItem.name === secondItem.name)
                && (firstItem.message === secondItem.message);
        }

        // Map comparison: 
        // Check if both 'firstItem' and 'secondItem' are Map objects, and compare their size and key-value pairs
        if (firstItem instanceof Map) {
            if (!(secondItem instanceof Map) || firstItem.size !== secondItem.size) {
                return false; // If 'secondItem' is not a Map or the sizes don't match, return false
            }
            // Iterate over each key-value pair in 'firstItem' and compare with 'secondItem'
            for (let [key, val] of firstItem) {
                if (!secondItem.has(key) || !isEqual(val, secondItem.get(key), visited)) {
                    return false; // If key is missing or values don't match, return false
                }
            }
            return true;
        }

        // Set comparison: 
        // Check if both 'firstItem' and 'secondItem' are Set objects, and compare their size and elements
        if (firstItem instanceof Set) {
            if (!(secondItem instanceof Set) || firstItem.size !== secondItem.size) {
                return false; // If 'secondItem' is not a Set or the sizes don't match, return false
            }
            // Iterate over elements of 'firstItem' and check if each element is present in 'secondItem'
            for (let val of firstItem) {
                let found = false;
                for (let valB of secondItem) {
                    if (isEqual(val, valB, visited)) {
                        found = true; // If element is found, break the inner loop
                        break;
                    }
                }
                if (!found) return false; // If element is not found in 'secondItem', return false
            }
            return true;
        }

        // Array
        if (Array.isArray(firstItem) && Array.isArray(secondItem)) {
            if (firstItem.length !== secondItem.length) return false;
            for (let i = 0; i < firstItem.length; i++) {
                if (!isEqual(firstItem[i], secondItem[i], visited)) return false;
            }
            return true;
        }
        if (Array.isArray(firstItem) || Array.isArray(secondItem)) {
            return false;
        }

        // Object
        if (typeof firstItem === 'object' && typeof secondItem === 'object') {
            const objOneKeys = Object.keys(firstItem);
            const objTwoKeys = Object.keys(secondItem);
            if (objOneKeys.length !== objTwoKeys.length) return false;
            for (const key of objOneKeys) {
                if (objTwoKeys.indexOf(key) === -1) return false;
                if (!isEqual(firstItem[key], secondItem[key], visited)) return false;
            }
            return true;
        }
    }
    // If we reach this point, 'firstItem' and 'secondItem' are not equal
    return false;
}