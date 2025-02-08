// _.set(object, path, value) is a handy method to updating an object 
// without checking the property existence.

const obj = {
    a: {
        b: {
            c: [1, 2, 3]
        }
    }
};
// set(obj, 'a.b.c', 'apple')
// console.log(obj.a.b.c) // "apple"
// set(obj, 'a.b.c.0', 'apple')
// console.log(obj.a.b.c[0]) // "apple"
// set(obj, 'a.b.c[1]', 'apple')
// console.log(obj.a.b.c[1]) // "apple"
// set(obj, ['a', 'b', 'c', '2'], 'apple')
// console.log(obj.a.b.c[2]) // "apple"
// set(obj, 'a.b.c[3]', 'apple')
// console.log(obj.a.b.c[3]) // "apple"
// set(obj, 'a.c.d[0]', 'apple')
// // valid digits treated as array elements
// console.log(obj.a.c.d[0]) // "apple"
// set(obj, 'a.c.d.01', 'apple')
// // invalid digits treated as property string
// console.log(obj.a.c.d['01']) // "apple"


// ***********************************************************************
function lodashSet(obj, path, value) {
    let pathArr = Array.isArray(path)
        ? path
        : path
            .replace('[', '.')
            .replace(']', '')
            .split('.');
    let src = obj;

    pathArr.forEach((key, index, array) => {
        if (index == pathArr.length - 1) {
            src[key] = value;
        } else {
            // if the key doesn't exist on object
            if (!src.hasOwnProperty(key)) {
                const next = array[index + 1];
                src[key] = String(Number(next)) === next ? [] : {};
            }
            // Updating current to point to the next level in the object structure.
            src = src[key];
        }
    });
}
