// A Proxy object wraps another object and intercepts operations, 
// like reading/writing properties and others, optionally handling them on its own, 
// or transparently allowing the object to handle them.

// Proxies are used in many libraries and some browser frameworks.

// The syntax:

// let proxy = new Proxy(target, handler);

// target :
// is an object to wrap, can be anything, including functions.
// handler :
// proxy configuration: an object with “traps”, methods that intercept operations. 
// e.g. - 
// get trap for reading a property of target, 
// set trap for writing a property into target, and so on.


const letters = ['a', 'b', 'c', 'd', 'e'];

const arrayProxyWithNegativeIndexing = new Proxy(letters, {
    get(target, prop) {
        if (!isNaN(prop)) {
            prop = parseInt(prop, 10);

            if (prop < 0) {
                prop += target.length;
            }
        }

        return target[prop];
    }
});

console.log(arrayProxyWithNegativeIndexing[0]);  // a
console.log(arrayProxyWithNegativeIndexing[-1]); // e
console.log(arrayProxyWithNegativeIndexing[-2]); // d