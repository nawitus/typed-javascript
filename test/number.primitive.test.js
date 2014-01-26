/*jslint node: true */
/*global window: false, describe, it */
"use strict";

// typed-javascript number primitive type unit tests
// run with mocha test/*.test.js

// Load Node.js assert library
var assert = require("assert");

// Load type library
var T = require("../typed");



describe('number primitive type tests', function() {
    it('should support the number primitive type', function() {
        assert(T.number(15) === 15);
    });

    it('should support the number primitive type in a function parameter', function() {
        var numFunc;

        // Define a test function
        numFunc = T.fn(T.number, function(testnum) {
            return testnum;
        });

        numFunc(15);
    });

    it('should throw an exception because the object is not a number primitive', function(done) {
        var notNumberPrimitive = new Number(5);

        try {
            notNumberPrimitive = T.number(notNumberPrimitive);
        } catch (error) {
            done();
        }
    });

    it('should throw an exception because the function parameter is not a number primitive', function(done) {
        var notNumberPrimitive = new Number("abc"),
            numFunc;

        // Define a test function
        numFunc = T.fn(T.number, function(testnum) {
            return testnum;
        });

        try {
            numFunc(notNumberPrimitive);
        } catch (error) {
            done();
        }
    });
});