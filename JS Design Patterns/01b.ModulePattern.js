// Shopping Cart Module with Revealing Module Pattern
const ShoppingCart = (function () {
    // Private variables
    let items = [];
    let total = 0;

    // Private methods
    function calculateTotal() {
        total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return total;
    }

    function validateItem(item) {
        if (!item.name || item.price <= 0 || item.quantity <= 0) {
            throw new Error('Invalid item details');
        }
    }

    // Public interface
    return {
        // Add item to cart
        addItem: function (item) {
            try {
                validateItem(item);

                // Check if item already exists
                const existingItem = items.find(i => i.name === item.name);

                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    items.push(item);
                }

                return calculateTotal();
            } catch (error) {
                console.error('Add Item Error:', error.message);
                return total;
            }
        },

        // Remove item from cart
        removeItem: function (itemName) {
            items = items.filter(item => item.name !== itemName);
            return calculateTotal();
        },

        // Get current cart total
        getTotal: function () {
            return total;
        },

        // Get current cart items
        getItems: function () {
            return [...items]; // Return a copy to prevent direct mutation
        },

        // Clear the entire cart
        clearCart: function () {
            items = [];
            total = 0;
            return total;
        }
    };
})();

// Example Usage
try {
    // Adding items
    ShoppingCart.addItem({ name: 'Laptop', price: 1000, quantity: 1 });
    ShoppingCart.addItem({ name: 'Mouse', price: 50, quantity: 2 });

    console.log('Cart Total:', ShoppingCart.getTotal()); // 1100
    console.log('Cart Items:', ShoppingCart.getItems());

    // Removing an item
    ShoppingCart.removeItem('Mouse');

    console.log('Updated Cart Total:', ShoppingCart.getTotal()); // 1000

    // Clearing cart
    ShoppingCart.clearCart();
    console.log('Cart after clearing:', ShoppingCart.getItems()); // []
} catch (error) {
    console.error('Shopping Cart Error:', error);
}