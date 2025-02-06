// The instanceof operator tests to see if the prototype property 
// of a constructor appears anywhere in the prototype chain of an object. 
// The return value is a boolean value. 
// Its behavior can be customized with Symbol.hasInstance.

// From the definition, we can derive that to create a custom instanceof method 
// we will have to check if the prototype property of a constructor appears anywhere 
// in the prototype chain of an object.

// Thus we will have first to check if the provided input is an object or not 
// and later keep checking if the prototype property appears anywhere in the prototype chain.

// To get the prototype of a constructor we can use __proto__ or getPrototypeOf(object) method.


// ***********************************************************************
function instanceof_iterative(obj, target) {
    // if provided input is not object type, return false
    if (obj === null || typeof obj !== 'object') return false;

    if (typeof target !== 'function') {
        throw new TypeError('Second argument to instanceof must be a constructor');
    }

    // keep checking in the prototype chain
    while (obj) {
        if (obj.__proto__ === target.prototype) return true;
        obj = obj.__proto__;
    }

    return false;
}


// ***********************************************************************
function instanceof_recursive(obj, target) {
    // if provided input is not object type, return false
    if (obj == null || typeof obj !== 'object') return false;

    if (typeof target !== 'function') {
        throw new TypeError('Second argument to instanceof must be a constructor');
    }

    // get the prototype 
    const proto = Object.getPrototypeOf(obj);

    // recursively test if prototype matches to the target's prototype
    return proto === target.prototype ? true : instanceof_recursive(proto, target);
}


// ***********************************************************************
// Test Case:
let instanceOf = instanceof_recursive;
class P { }
class Q extends P { }

const q = new Q()
console.log(instanceOf(q, Q)) // true
console.log(instanceOf(q, P)) // true
console.log(instanceOf(q, Object)) // true

function R() { }
console.log(instanceOf(q, R)) // false
R.prototype = Q.prototype
console.log(instanceOf(q, R)) // true
R.prototype = {}
console.log(instanceOf(q, R)) // false