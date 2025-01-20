// ***********************************************************************
// Pipe :
// pipe executes functions from left to right.
// The output of the first function is passed as input to the second, and so on.


const pipe = (...fns) => (x) => fns.reduce((v, fn) => fn(v), x);

const addOne = (x) => x + 1;
const multiplyByTwo = (x) => x * 2;

const piped = pipe(addOne, multiplyByTwo);
console.log(piped(3)); // Output: 8


// ***********************************************************************
// Compose :
// compose executes functions from right to left.
// The output of the last function is passed as input to the second-to-last function, and so on.


const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const composed = compose(addOne, multiplyByTwo);
console.log(composed(3)); // Output: 7


// ***********************************************************************
// Benefits of Using Pipe and Compose:

// Improved Code Readability: Breaks down complex operations into smaller, more manageable functions.
// Increased Modularity: Allows for easier testing and reuse of individual functions.
// Enhanced Code Maintainability: Makes code more flexible and easier to modify.


// ***********************************************************************
// Example usage of pipe

const schools = [
    { name: "Hogwarts School of Witchcraft and Wizardry", address: "Hogwarts, Scotland" },
    { name: "Ilvermorny School of Witchcraft and Wizardry", address: "Ilvermorny, North America" },
    { name: "Beauxbatons Academy of Magic", address: "Beauxbatons, France" },
    { name: "Uagadou School of Magic", address: "Mountains of the Moon, Africa" }
];

// Iterate over array of schools
// Make a li element contaning the school name and adress separated by '-'
// Append li to ul with an id of 'school-list'

const makeListElem = (schoolObj) => {
    const newLi = document.createElement('li');
    newLi.appendChild(document.createTextNode(`${schoolObj.name} - ${schoolObj.address}`));
    return newLi;
}

const appendListElemToList = (li) => {
    let schoolList = document.querySelector('#school-list');
    return schoolList.appendChild(li);
}

const generateListElem = pipe(makeListElem, appendListElemToList);

schools.forEach((school) => generateListElem(school));