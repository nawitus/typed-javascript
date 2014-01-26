/*jslint node: true */
/*global window: false, describe, it */
"use strict";

// typed-javascript any type unit tests
// run with mocha test/*.test.js

// Load Node.js assert library
var assert = require("assert");

// Load type library
var T = require("./typed");



describe('any type tests', function() {
    it('should support the Any type', function() {
        var foo = {
            a: 10
        };
        assert(T.Any(foo) === foo);
    });

    it('should support the Any type in a function parameter', function() {
        var any = {
            a: 10
        },
            anyFunc;

        // Define a test function
        anyFunc = T.fn(T.Any, function(testany) {
            return testany;
        });

        anyFunc(any);
    });
});