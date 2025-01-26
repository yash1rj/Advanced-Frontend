// The Promise.all() method takes an iterable of promises as an input, 
// and returns a single Promise that resolves to an array of the results of the input promises
// It rejects when any of the input's promises rejects, with this first rejection reason.


/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function promise_all(promises) {
    if (promises.length === 0) {
        return Promise.resolve([]);
    }

    const results = Array(promises.length);
    let promisesCompleted = 0; //to track how many promises have completed

    return new Promise((resolve, reject) => {
        promises.forEach((promise, i) => {
            if (!(promise instanceof Promise)) {
                promise = Promise.resolve(promise);
            }

            promise
                .then((res) => {
                    results[i] = res;
                    promisesCompleted++;

                    if (promisesCompleted === promises.length) {
                        resolve(results);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    });
}


// ***********************************************************************
// TC 1
// Input:
function task(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(time);
        }, time);
    });
}

const taskList = [task(1000), task(5000), task(3000)];

//run promise.all
promise_all(taskList)
    .then(results => {
        console.log("got results", results)
    })
    .catch(console.error);

// Output:
//"got results" [1000,5000,3000]


// ***********************************************************************
// TC 2
// Input:
function task2(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (time < 3000) {
                reject("Rejected");
            } else {
                resolve(time);
            }
        }, time);
    });
}

const taskList2 = [task2(1000), task2(5000), task2(3000)];

//run promise.all
promise_all(taskList2)
    .then(results => {
        console.log("got results", results)
    })
    .catch(console.error);

// Output:
"Rejected"