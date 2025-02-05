// The JSON.parse() static method parses a JSON string, c
// onstructing the JavaScript value or object described by the string. 

// An optional reviver function can be provided to perform a transformation 
// on the resulting object before it is returned. - ignoring in this implementation

// only a simple solution
// will fail for complex inputs such as array of objects
function json_parse(str) {
    // errors where required
    if (str === '') throw Error('Unexpected end of JSON input');
    if (str[0] === "'") throw Error(`Unexpected token ''', "'" is not valid JSON`);

    // null check
    if (str === 'null') return null;

    // empty array/object
    if (str === '{}') return {};
    if (str === '[]') return [];

    // stringified boolean
    if (str === 'true') return true;
    if (str === 'false') return false;

    // remove extra quotes
    if (str[0] === '"') return str.slice(1, -1);

    // number
    if (+str === +str) return Number(str);

    // object
    if (str[0] === '{') {
        // remove opening bracket
        // split by comma
        return str.slice(1, -1).split(',').reduce((acc, item) => {
            // find index of colon
            // left of colon will be key
            // right of colon will be the corresponding value
            const index = item.indexOf(':');
            const key = item.slice(0, index)
            const value = item.slice(index + 1);

            // add the parsed key value pair to acc for collection
            acc[json_parse(key)] = json_parse(value);
            return acc;
        }, {});
    }

    // array
    if (str[0] === '[') {
        // remove opening bracket
        // split by comma
        // map over to get the parsed values
        return str.slice(1, -1).split(',').map((value) => json_parse(value));
    }
}