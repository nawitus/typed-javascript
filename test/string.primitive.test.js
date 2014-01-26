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
        stringFunc = T.fn(T.string, function(teststr) {
            return teststr;
        });

        stringFunc("abc");
    });

    it('should throw an exception because the object is not a string primitive', function(done) {
        var notStringPrimitive = new String("abc");

        try {
            notStringPrimitive = T.string(notStringPrimitive);
        } catch (error) {
            done();
        }
    });

    it('should throw an exception because the function parameter is not a string primitive', function(done) {
        var notStringPrimitive = new String("abc"),
            stringFunc;

        // Define a test function
        stringFunc = T.fn(T.string, function(teststring) {
            return teststring;
        });

        try {
            stringFunc(notStringPrimitive);
        } catch (error) {
            done();
        }
    });
});