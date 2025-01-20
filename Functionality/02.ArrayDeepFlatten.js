// ***********************************************************************
// Using ES6

function flatten(arr) {
    return arr.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr), []);
}

const arr = [1, [2, 3, [4, 5]]];
const flattened = flatten(arr);
console.log(flattened);


// ***********************************************************************
// Non-recursive deep array flatten using a stack

// Note : 
// the depth control is hard/inefficient as we will need to tag each value with its own depth
// also possible w/o reversing on shift/unshift,
// but array o/p's on the end tends to be faster

function flatten2(input) {
    const stack = [...input];
    const res = [];

    while (stack.length) {
        // pop value from stack
        const next = stack.pop();
        if (Array.isArray(next)) {
            // push back array items, wont modify the original input
            stack.push(...next);
        } else {
            res.push(next);
        }
    }

    // reverse to restore input order
    return res.reverse();
}