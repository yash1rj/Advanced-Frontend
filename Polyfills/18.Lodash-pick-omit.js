// _.pick(object, [paths])
// Creates a new object composed of the picked object properties.

/**
 * @param {object} object // The source object.
 * @param {string[]} paths // The property paths to pick.
 * @return {Object} // Returns the new object.
 */
function lodashPick(object, ...keysToPick) {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    const result = {};

    for (const key of keysToPick) {
        if (object.hasOwnProperty(key)) {
            result[key] = object[key];
        }
    }

    return result;
}


// ***********************************************************************
// _.omit() method is used to return a copy of the object 
// that is composed of the own and inherited enumerable property paths 
// of the given object that are not omitted. 
// It is the opposite of the _.pick() method.

/**
 * @param {object} object // The source object.
 * @param {string[]} paths // The property paths to pick.
 * @return {Object} // Returns the new object.
 */
function lodashOmit(object, ...keysToOmit) {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    const result = {};

    for (const key in object) {
        if (object.hasOwnProperty(key) && !keysToOmit.includes(key)) {
            result[key] = object[key];
        }
    }

    return result;
}