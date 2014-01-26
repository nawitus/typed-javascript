/*jslint node: true */
/*global window: false, describe, it */
"use strict";

// typed-javascript string primitive type unit tests
// run with mocha test/*.test.js

// Load Node.js assert library
var assert = require("assert");

// Load type library
var T = require("../typed");



describe('string primitive type tests', function() {
    it('should support the string primitive type', function() {
        assert(T.string("abc") === "abc");
    });

    it('should support the string primitive type in a function parameter', function() {
        var stringFunc;

        // Define a test function
        stringFunc = T.fn(T.string, function(testany) {
            return testany;
        });

        stringFunc("abc");
    });
});