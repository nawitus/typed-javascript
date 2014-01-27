/*jslint node: true */
/*global window: false */
"use strict";

// Global Type object
//
// Example usage:
// First, define a type:
// T.define("Person", { name : null, age : null })
//
// T.person({ name : "foo" }) // throws error
// T.person({ name : "foo", age : 50 }) // returns the object
//
// Not implemented yet: support for basic types (string etc.)
var T = (function() {
    var my = {},
        primitiveType,
        objectType,
        types = [];

    my.define = function(typename, type) {
        if (this.loglevel) {
            my.logfunction("Creating type " + typename + " for " + JSON.stringify(type));
        }

        // Check that the type doesn't exist
        if (this[typename]) {
            throw "Error! " + typename + " is reserved!";
        }

        // Enforce first digit to be upper case
        if (!/[A-Z]/.test(typename[0])) {
            throw "Error! " + typename + " should be " + typename[0].toUpperCase() + typename.slice(1);
        }

        // Create the type according to the type definition
        this[typename] = (function() {
            var typelist = [],
                recursiveTypelist = [],
                property,
                typefunc = function(obj) {
                    if (!my.disabled) {
                        // Ensure that the object follows the type
                        typelist.forEach(function(type) {
                            if (!obj.hasOwnProperty(type)) {
                                throw "Error! Object " + JSON.stringify(obj) + " lacks " + type + "!";
                            }
                        });

                        // Ensure that recursive types are followed
                        recursiveTypelist.forEach(function(typeObject) {
                            typeObject.type(obj[typeObject.typename]);
                        });
                    }

                    // Return object
                    return obj;
                };

            // Add required types to typelist
            for (property in type) {
                // Only checking own properties to increase performance
                if (type.hasOwnProperty(property)) {
                    // Check that the value of the type is not a recursive type definition
                    if (types.indexOf(type[property]) === -1) {
                        typelist.push(property);
                    } else {
                        // Add recursive types to it's own list
                        // Store a reference to the type object and the name of the property
                        recursiveTypelist.push({ "type" : type[property], "typename" : property });
                    }
                }
            }

            return typefunc;
        }());

        // Add type to type list
        types.push(this[typename]);
    };

    // Define a type tested function
    //
    // Usage example:
    //var test2 = T.fn(T.Person, T.Country, function(person, country) { /* code */ };
    my.fn = function() {
        var typeargs = Array.prototype.slice.call(arguments),
            testfunction;

        // This function first tests that the types are correct, and then
        // calls the main function.
        testfunction = function() {
            var i;

            // Loop through all the arguments except the last one,
            // which is the main function
            for (i = 0; i < typeargs.length - 1; i += 1) {
                // Test the type by calling the type function
                typeargs[i](arguments[i]);
            }

            // Call the main function with the provided arguments
            typeargs[typeargs.length - 1].apply(this, arguments);
        };

        if (my.disabled) {
            testfunction = typeargs[typeargs.length - 1];
        }

        return testfunction;
    };

    // Function builder for testing primitive types
    primitiveType = function(typename) {
        var typeFunc = function(obj) {
            if (typeof obj !== typename) {
                throw "Error! Object " + JSON.stringify(obj) + " is not a " + typename + " primitive!";
            }

            return obj;
        };

        // Add type to type list
        types.push(typeFunc);

        return typeFunc;
    };

    // Function builder for testing object types for primitives
    objectType = function(typename) {
        var typeFunc = function(obj) {
            // We need to test both the .call and typeof to be certain that it's not a primitive type
            if (Object.prototype.toString.call(obj) !== "[object " + typename + "]" || typeof obj !== "object") {
                throw "Error! Object " + JSON.stringify(obj) + " is not a " + typename + " object!";
            }

            return obj;
        };

        // Add type to type list
        types.push(typeFunc);

        return typeFunc;
    };


    // Define primitive types
    my.string = primitiveType("string");
    my.number = primitiveType("number");
    my.boolean = primitiveType("boolean");

    // Define corresponding object types
    my.String = objectType("String");
    my.Number = objectType("Number");
    my.Boolean = objectType("Boolean");

    // Define the Array type
    my.Array = function(obj) {
        if (Object.prototype.toString.call(obj) !== "[object Array]") {
            throw "Error! Object " + JSON.stringify(obj) + " is not an array!";
        }

        return obj;
    };
    types.push(my.Array);


    // Define the Any type
    my.Any = function(obj) {
        return obj;
    };
    types.push(my.Any);

    // Define log level.
    // 0 => No logging
    // 1 => Logging to console.log (default)
    my.loglevel = 0;

    // Define logging function
    my.logfunction = console.log;

    // Set true to disable type checking for performance gains
    my.disabled = false;

    return my;
}());

// Node.JS module export
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = T;
}
