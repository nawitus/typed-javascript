/*jslint node: true */
/*global window: false, describe, it */
"use strict";

// typed-javascript Boolean object type unit tests
// run with mocha test/*.test.js

// Load Node.js assert library
var assert = require("assert");

// Load type library
var T = require("../typed");



describe('boolean object type tests', function() {
    it('should support the Boolean object type', function() {
        var bool = new Boolean(true);
        assert(T.Boolean(bool) === bool);
    });

    it('should support the Boolean object type in a function parameter', function() {
        var boolFunc;

        // Define a test function
        boolFunc = T.fn(T.Boolean, function(testbool) {
            return testbool;
        });

        boolFunc(new Boolean(true));
    });

    it('should throw an exception because the object is not a Boolean object', function(done) {
        var bool = false;

        try {
            bool = T.Boolean(bool);
        } catch (error) {
            done();
        }
    });

    it('should throw an exception because the function parameter is not a Boolean object', function(done) {
        var bool = false,
            boolFunc;

        // Define a test function
        boolFunc = T.fn(T.Boolean, function(testbool) {
            return testbool;
        });

        try {
            boolFunc(bool);
        } catch (error) {
            done();
        }
    });
});