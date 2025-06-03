// database-connection.js
class DatabaseConnection {
    constructor() {
        // Check if an instance already exists
        if (DatabaseConnection.instance) {
            console.log("Returning existing database connection");
            return DatabaseConnection.instance;
        }

        // If this is the first time, initialize the connection
        this.connectionId = Math.floor(Math.random() * 1000);
        this.isConnected = false;

        console.log(`Creating new database connection (ID: ${this.connectionId})`);

        // Store the instance
        DatabaseConnection.instance = this;
    }

    connect() {
        if (this.isConnected) {
            console.log(`Already connected to database (ID: ${this.connectionId})`);
            return;
        }

        // Simulate connection delay
        console.log(`Connecting to database (ID: ${this.connectionId})...`);
        setTimeout(() => {
            this.isConnected = true;
            console.log(`Connected to database (ID: ${this.connectionId})`);
        }, 500);
    }

    query(sql) {
        if (!this.isConnected) {
            console.log("Error: Connect to the database before querying");
            return null;
        }

        console.log(`Executing query on connection ${this.connectionId}: ${sql}`);
        return `Results for "${sql}"`;
    }

    disconnect() {
        if (!this.isConnected) {
            console.log("Error: Not connected to a database");
            return;
        }

        console.log(`Disconnecting from database (ID: ${this.connectionId})...`);
        this.isConnected = false;
        console.log("Database connection closed");
    }
}

// -----------------------------------------------------------------
// Usage example in different parts of our application
// -----------------------------------------------------------------

// app.js
console.log("Starting application...");

// In module 1 of our app
function initializeUserModule() {
    console.log("Initializing user module...");
    const dbConnection = new DatabaseConnection();
    dbConnection.connect();

    const users = dbConnection.query("SELECT * FROM users");
    console.log("User module initialized");
}

// In module 2 of our app
function initializeProductModule() {
    console.log("Initializing product module...");
    const dbConnection = new DatabaseConnection();
    // No need to connect again - it's the same instance!

    const products = dbConnection.query("SELECT * FROM products");
    console.log("Product module initialized");
}

// Run the example
initializeUserModule();
console.log("-----------------------");
initializeProductModule();
console.log("-----------------------");

// At the end of the app
function shutdownApp() {
    console.log("Shutting down application...");
    const dbConnection = new DatabaseConnection();
    dbConnection.disconnect();
    console.log("Application shutdown complete");
}

shutdownApp();

/*
Expected output:
---------------
Starting application...
Initializing user module...
Creating new database connection (ID: 123)
Connecting to database (ID: 123)...
Connected to database (ID: 123)
Executing query on connection 123: SELECT * FROM users
User module initialized
-----------------------
Initializing product module...
Returning existing database connection
Executing query on connection 123: SELECT * FROM products
Product module initialized
-----------------------
Shutting down application...
Returning existing database connection
Disconnecting from database (ID: 123)...
Database connection closed
Application shutdown complete
*/