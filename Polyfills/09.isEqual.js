// _.isEqual is useful when we want to compare complex data types by value not the reference.

function isEqual(firstItem, secondItem) {
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
    if (typeof a === 'object' && typeof b === 'object') {
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

        // Array
        if (Array.isArray(firstItem) && Array.isArray(secondItem)) {
            if (firstItem.length !== secondItem.length) return false;
            for (let i = 0; i < firstItem.length; i++) {
                if (!isEqual(firstItem[i], secondItem[i])) return false;
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
                if (!isEqual(firstItem[key], secondItem[key])) return false;
            }
            return true;
        }
    }
    // If we reach this point, 'firstItem' and 'secondItem' are not equal
    return false;
}