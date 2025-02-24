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
function BrowserHistoryFn() {
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
const bh = new BrowserHistoryFn();

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


// ***********************************************************************
// Class based approach
// The implementation mimics real browser behavior where:

// You can't go back beyond the first page
// You can't go forward beyond the last page
// Visiting a new page while in the middle of history clears all forward history

class BrowserHistory {
    constructor() {
        // Array to store all URLs
        this.history = [];
        // Current position in history
        this.currentIndex = -1;
    }

    /**
     * Add new URL to history
     * @param {string} url - URL to visit
     */
    visit(url) {
        // When we visit a new URL, we need to:
        // 1. Remove all forward history
        // 2. Add new URL
        // 3. Update current position

        // Remove all entries after current position
        this.history = this.history.slice(0, this.currentIndex + 1);

        // Add new URL
        this.history.push(url);

        // Update position
        this.currentIndex++;
    }

    /**
     * Get current URL
     * @returns {string|null} Current URL or null if history is empty
     */
    current() {
        if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
            return this.history[this.currentIndex];
        }
        return null;
    }

    /**
     * Navigate backwards in history
     * @returns {string|null} Previous URL or null if at start
     */
    backward() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.current();
        }
        return null;
    }

    /**
     * Navigate forwards in history
     * @returns {string|null} Next URL or null if at end
     */
    forward() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return this.current();
        }
        return null;
    }
}

// Test cases
const history = new BrowserHistory();

// Test case 1: Basic navigation
console.log('Test Case 1: Basic Navigation');
history.visit('google.com');
history.visit('facebook.com');
history.visit('youtube.com');
console.log(history.current());  // youtube.com
console.log(history.backward()); // facebook.com
console.log(history.backward()); // google.com
console.log(history.forward());  // facebook.com

// Test case 2: Navigation limits
console.log('\nTest Case 2: Navigation Limits');
console.log(history.backward()); // google.com
console.log(history.backward()); // null (can't go back further)
console.log(history.forward()); // facebook.com
console.log(history.forward()); // youtube.com
console.log(history.forward()); // null (can't go forward further)

// Test case 3: New visit clears forward history
console.log('\nTest Case 3: New Visit Clears Forward History');
console.log(history.backward()); // facebook.com
history.visit('twitter.com');
console.log(history.forward());  // null (forward history was cleared)
console.log(history.current());  // twitter.com