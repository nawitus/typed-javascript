typed-javascript
=========

Simple dynamic type checking for JavaScript. Runs in Node.js and in browser, and can be set off for production.

Include in Node.js:
```javascript
var T = require("./typed");
```

Include in browser
```html
<script src="typed.js"></script>
```

See example.js for additional examples and typed.js for the source.

```javascript
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
    console.log(person.name + " is from " + country.name + ".");
});

test({ name : "foo", age : 20});
test2({ name : "bar", age : 30}, { name : "Internet" });
```
