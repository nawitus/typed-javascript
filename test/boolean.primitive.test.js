/*jslint node: true */
/*global window: false, describe, it */
"use strict";

// typed-javascript boolean primitive type unit tests
// run with mocha test/*.test.js

// Load Node.js assert library
var assert = require("assert");

// Load type library
var T = require("../typed");



describe('boolean primitive type tests', function() {
    it('should support the boolean primitive type', function() {
        assert(T.boolean(false) === false);
    });

    it('should support the boolean primitive type in a function parameter', function() {
        var boolFunc;

        // Define a test function
        boolFunc = T.fn(T.boolean, function(testbool) {
            return testbool;
        });

        boolFunc(false);
    });

    it('should throw an exception because the object is not a boolean primitive', function(done) {
        var notBooleanPrimitive = new Boolean(false);

        try {
            notBooleanPrimitive = T.boolean(notBooleanPrimitive);
        } catch (error) {
            done();
        }
    });

    it('should throw an exception because the function parameter is not a boolean primitive', function(done) {
        var notBooleanPrimitive = new Boolean(false),
            boolFunc;

        // Define a test function
        boolFunc = T.fn(T.boolean, function(testbool) {
            return testbool;
        });

        try {
            boolFunc(notBooleanPrimitive);
        } catch (error) {
            done();
        }
    });
});