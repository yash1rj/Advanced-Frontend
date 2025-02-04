// The JSON.stringify() static method converts a JavaScript value to a JSON string, 
// optionally replacing values if a replacer function is specified 
// or optionally including only the specified properties if a replacer array is specified.

console.log(JSON.stringify({ x: 5, y: 6 }));
// Expected output: '{"x":5,"y":6}'

console.log(
    JSON.stringify([new Number(3), new String('false'), new Boolean(false)]),
);
// Expected output: '[3,"false",false]'

console.log(JSON.stringify({ x: [10, undefined, function () { }, Symbol('')] }));
// Expected output: '{"x":[10,null,null,null]}'

console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// Expected output: '"2006-01-02T15:04:05.000Z"'


// ***********************************************************************

// Primitive types :
// Strings, Numbers and Booleans : Returns their string representation
// Null and Undefined : Returns the string "null".

// Special Cases:
// BigInt: Throws an error, indicating that BigInt is not supported by JSON.stringify.
// Infinity and -Infinity: Returns "null".
// NaN: Returns "null".
// Date: Converts Date objects to ISO formatted strings (toISOString)

// Symbol Handling:
// Returns undefined for symbols as direct data
// Returns null for symbol as an array element

// Array Handling:
// Recursively calls stringify for each element in the array.

// Object Handling:
// Recursively calls stringify for each value.
// Constructs a string with key-value pairs enclosed in double quotes and separated by commas.
// Encloses the resulting string within curly braces ({}).


// ***********************************************************************
function json_stringify(data) {
    if (typeof data === 'bigint') {
        throw new Error('BigInt is not supported by JSON.stringify');
    }

    if (typeof data === 'string') {
        return `"${data}"`;
    }

    if (typeof data === 'function' || data === 'symbol') {
        return undefined;
    }

    if (Number.isNaN(data) || data === null || data === undefined || data === Infinity || data === -Infinity) {
        return 'null';
    }

    if (typeof data === 'number' || typeof data === 'boolean') {
        return `${data}`;
    }

    if (data instanceof Date) {
        return `"${data.toISOString()}"`;
    }

    if (Array.isArray(data)) {
        const arr = data.map((el) => {
            return typeof el === 'symbol' ? 'null' : stringify(el);
        });
        return `[${arr.join(',')}]`;
    }

    if (typeof data === 'object') {
        const keyValPair = Object.entries(data).reduce((acc, [key, value]) => {
            if (value === undefined) {
                return acc;
            }
            acc.push(`"${key}":${stringify(value)}`);
            return acc;
        }, [])
        return `{${keyValPair.join(',')}}`;
    }
}