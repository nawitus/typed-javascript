/*jslint node: true */
/*global window: false, describe, it */
"use strict";

// typed-javascript Number object type unit tests
// run with mocha test/*.test.js

// Load Node.js assert library
var assert = require("assert");

// Load type library
var T = require("../typed");



describe('number object type tests', function() {
    it('should support the Number object type', function() {
        var num = new Number(15);
        assert(T.Number(num) === num);
    });

    it('should support the Number object type in a function parameter', function() {
        var numFunc;

        // Define a test function
        numFunc = T.fn(T.Number, function(testnum) {
            return testnum;
        });

        numFunc(new Number(15));
    });

    it('should throw an exception because the object is not a Number object', function(done) {
        var num = 15;

        try {
            num = T.Number(num);
        } catch (error) {
            done();
        }
    });

    it('should throw an exception because the function parameter is not a Number object', function(done) {
        var num = 5,
            numFunc;

        // Define a test function
        numFunc = T.fn(T.Number, function(testnum) {
            return testnum;
        });

        try {
            numFunc(num);
        } catch (error) {
            done();
        }
    });
});