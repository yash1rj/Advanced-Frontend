// The typeof operator returns a string indicating the type of the operand's value.

// // The following table summarizes the possible return values of typeof.
// Type	                Result
// ================================
// Undefined	        "undefined"
// Null	                "object"
// Boolean	            "boolean"
// Number	            "number"
// BigInt	            "bigint"
// String	            "string"
// Symbol	            "symbol"
// Function/Class       "function"
// Any other object	    "object"


// ***********************************************************************
function custom_typeof(value) {
    switch (Object.prototype.toString.call(value)) {
        case '[object Undefined]':
            return "undefined";
        case '[object Null]':
            return "object";
        case '[object Boolean]':
            return "boolean";
        case '[object Number]':
            return "number";
        case '[object BigInt]':
            return "bigint";
        case '[object String]':
            return "string";
        case '[object Symbol]':
            return "symbol";
        case '[object Function]':
            return "function";
        default:
            return "object";
    }
}