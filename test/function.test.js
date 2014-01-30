/*jslint node: true */
/*global window: false, describe, it */
"use strict";

// typed-javascript function type unit tests
// run with mocha test/*.test.js

// Load Node.js assert library
var assert = require("assert");

// Load type library
var T = require("../typed");



describe('function type tests', function() {
    it('should support the function type', function() {
        var fn = function () {
            return true;
        };
        assert(T['function'](fn) === fn);
    });

    it('should support the function type in a function parameter', function() {
        var func;

        // Define a test function
        func = T.fn(T['function'], function(fn) {
            fn();
        });

        func(function() {
            return true;
        });
    });

    it('should throw an exception because the object is not a function', function(done) {
        var notfn = false;

        try {
            bool = T['function'](notfn);
        } catch (error) {
            done();
        }
    });

    it('should throw an exception because the function parameter is not a function', function(done) {
        var fn = false,
            func;

        // Define a test function
        func = T.fn(T['function'], function(testfn) {
            testfn();
        });

        try {
            func(fn);
        } catch (error) {
            done();
        }
    });
});