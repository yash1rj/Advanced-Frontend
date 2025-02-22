// Browser history functionality, where we can navigate through the browsed history. 

// visit(url): Marks the entry of the URL in the history.
// current(): Returns the URL of the current page.
// backward(): Navigate to the previous url.
// forward(): Navigate to the next url.


// We can implement this easily with the help of an array and index tracker for navigation.

// For each visit, add the URL in the next index, 
// while navigating backward return the URL at the previous index, 
// going forward return the URL at the next index.
// Add checks to prevent the under and overflowing of the indexes.


// ***********************************************************************
function BrowserHistory() {
    // track history
    this.history = [];
    this.index = -1;

    // add new url at next index
    this.visit = function (url) {
        this.history[++this.index] = url;
        this.history.length = this.index + 1;
    }

    // return the url of the current index
    this.current = function () {
        return this.history[this.index];
    }

    // go to previous entry
    this.backward = function () {
        this.index = Math.max(0, --this.index);
    }

    // go to next entry
    this.forward = function () {
        this.index = Math.min(this.history.length - 1, ++this.index);
    }
}


// ***********************************************************************
// Input:
const bh = new BrowserHistory();

bh.visit('A');
console.log(bh.current());

bh.visit('B');
console.log(bh.current());

bh.visit('C');
console.log(bh.current());

bh.backward();
console.log(bh.current());

bh.visit('D');
console.log(bh.current());

bh.backward();
console.log(bh.current());

bh.forward();
console.log(bh.current());