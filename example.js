/*jslint node: true */
/*global window: false */
"use strict";


// Load type module in Node.js, in browsers, assume it exists
// in the global namespace
if (typeof window === "undefined" && typeof require !== "undefined") {
    var T = require("./typed");
}

// Print logging information
T.loglevel = 1;

// Other settings:
// T.logfunction =  myCustomLogger;
// T.disabled = true; // Disable test for production

// Define two simple types
T.define("Person", {
    name: null,
    age: null
});


T.define("Country", {
    name: null
});

// Test type using in a normal JavaScript function
var test = function (person) {
    // Ensure type
    person = T.Person(person);

    console.log(person.name + " is " + person.age + " years old.");
};

// Test types automatically, Any is for any type
var test2 = T.fn(T.Person, T.Country, T.Any, function(person, country, any) {
    console.log(person.name + " is from " + country.name + " and " + any + ".");
});

// Function calls
test({ name : "foo", age : 20});
test2({ name : "bar", age : 30}, { name : "Internet" }, "somewhere");

// Define a new person with type checking
var aperson = T.Person({ name : "foobar", age : 25 });

// Define an array
var list = T.Array([]);

// Define a string primitive
var stringPrimitive = T.string("abc");

// Define a String object
var stringObject = T.String(new String("abc"));

// Define a number primitive
var numberPrimitive = T.number(5);

// Define a Number object
var numberObject = T.Number(new Number(5));

// Error examples:

// Define the same type again -> throw error
// T.define("Person", {
//     name: null
// });

// Define a lower case type -> throw error
// T.define("Person", {
//     name: null
// });

// Call with wrong or missing parameters -> throw error
// test2({ name : "bar", age : 30}, { namef : "Internet" });
// test2({ name : "bar", age : 30});
// test2({ name : "bar"}, { name : "Internet" });
