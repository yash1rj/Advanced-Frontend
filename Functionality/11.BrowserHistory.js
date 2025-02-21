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