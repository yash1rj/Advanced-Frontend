// _.get(object, path, [defaultValue]) is a handy method to help retrieving data 
// from an arbitrary object. 
// if the resolved value from path is undefined, defaultValue is returned.

const obj = {
    a: {
        b: {
            c: [1, 2, 3]
        }
    }
};

// get(obj, 'a.b.c') // [1,2,3]
// get(obj, 'a.b.c.0') // 1
// get(obj, 'a.b.c[1]') // 2
// get(obj, ['a', 'b', 'c', '2']) // 3
// get(obj, 'a.b.c[3]') // undefined
// get(obj, 'a.c', 'apple') // 'apple'


// ***********************************************************************
/**
 * @param {object} source
 * @param {string | string[]} path
 * @param {any} [defaultValue]
 * @return {any}
 */
function lodashGet(source, path, defaultValue = undefined) {
    // get array of string properties, no special chars
    const pathArr = Array.isArray(path)
        ? path
        : path
            .replaceAll("[", ".")
            .replaceAll("]", "")
            .split(".");

    if (pathArr.length === 0) {
        return defaultValue;
    }

    // iterate over pathArr and check the current value of path in source object
    for (const path of pathArr) {
        if (source[path] === undefined) {
            return defaultValue;
        }
        source = source[path];
    }

    return source;
}

console.log(lodashGet(obj, 'a.b.c')); // [1,2,3]
console.log(lodashGet(obj, 'a.b.c.0')); // 1
console.log(lodashGet(obj, 'a.b.c[1]')); // 2
console.log(lodashGet(obj, ['a', 'b', 'c', '2'])); // 3
console.log(lodashGet(obj, 'a.b.c[3]')); // undefined
console.log(lodashGet(obj, 'a.c', 'apple')); // 'apple'
