/*jslint node: true */
/*global window: false, describe, it */
"use strict";

// typed-javascript String object type unit tests
// run with mocha test/*.test.js

// Load Node.js assert library
var assert = require("assert");

// Load type library
var T = require("../typed");



describe('string object type tests', function() {
    it('should support the String object type', function() {
        var str = new String("abc");
        assert(T.String(str) === str);
    });

    it('should support the String object type in a function parameter', function() {
        var stringFunc;

        // Define a test function
        stringFunc = T.fn(T.String, function(teststr) {
            return teststr;
        });

        stringFunc(new String("abc"));
    });

    it('should throw an exception because the object is not a String object', function(done) {
        var str = "abc";

        try {
            str = T.String(str);
        } catch (error) {
            done();
        }
    });

    it('should throw an exception because the function parameter is not a String object', function(done) {
        var str = "abc",
            stringFunc;

        // Define a test function
        stringFunc = T.fn(T.String, function(teststring) {
            return teststring;
        });

        try {
            stringFunc(str);
        } catch (error) {
            done();
        }
    });
});