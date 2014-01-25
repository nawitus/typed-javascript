/*jslint node: true */
"use strict";


// Load type module
var T = require("./typed");

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

// Test types automatically
var test2 = T.fn(T.Person, T.Country, function(person, country) {
    JSON.stringify(person);
    JSON.stringify(country);
    console.log(person.name + " is from " + country.name + ".");
});

test({ name : "foo", age : 20});
test2({ name : "bar", age : 30}, { name : "Internet" });

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