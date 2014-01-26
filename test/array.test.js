/*jslint node: true */
/*global window: false, describe, it */
"use strict";

// typed-javascript array unit tests
// run with mocha test/*.test.js

// Load Node.js assert library
var assert = require("assert");

// Load type library
var T = require("../typed");


describe('array tests', function() {
    it('should support the array type', function() {
        var list = [];

        list = T.Array(list);
    });

    it('should support the array type in a function parameter', function() {
        var list = [],
            arrayFunc;

        // Define a test function
        arrayFunc = T.fn(T.Array, function(testarray) {
            return testarray;
        });

        arrayFunc(list);
    });

    it('should throw an exception because the object is not an array', function(done) {
        var notlist = {};

        try {
            notlist = T.Array(notlist);
        } catch (error) {
            done();
        }
    });

    it('should throw an exception because the function parameter is not an array', function(done) {
        var notlist = {},
            arrayFunc;

        // Define a test function
        arrayFunc = T.fn(T.Array, function(testarray) {
            return testarray;
        });

        try {
            arrayFunc(notlist);
        } catch (error) {
            done();
        }
    });
});