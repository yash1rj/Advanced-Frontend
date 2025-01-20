function flattenObject(input, prefix = '') {
    return Object.keys(input).reduce((acc, key) => {
        const pre = prefix.length ? prefix + '_' : '';
        if (typeof input[key] === 'object' && input[key] !== null) {
            Object.assign(acc, flattenObject(input[key], pre + key));
        } else {
            acc[pre + key] = input[key];
        }
        return acc;
    }, {});
}

console.log(flattenObject({
    'a': {
        'b': 2
    },
    'c': 'apple',
    'd': {
        'e': {
            'f': 'ball'
        }
    }
}))