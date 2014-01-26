/*jslint node: true */
/*global window: false, describe, it */
"use strict";

// typed-javascript unit tests
// run with mocha tests.js

// Load Node.js assert library
var assert = require("assert");

// Load type library
var T = require("../typed");


describe('typed-javascript main tests', function() {
    it('should return the type module', function() {
        assert(T !== undefined && T !== null);
    });

    it('should return define and fn', function() {
        assert(T.define);
        assert(T.fn);
    });

    it('should return config options', function() {
        assert(typeof T.loglevel === "number");
        assert(T.logfunction !== undefined);
        assert(typeof T.disabled === "boolean");
    });

    it('should return the object', function() {
        var foo = { a : 10 };
        T.define("Foo", { a : null });

        assert(T.Foo(foo) === foo);
    });

    it('should return the object', function() {
        var bar = { a : 10, b : 20 },
            barFunc;
        T.define("Bar", { a : null, b : null });

        assert(T.Bar(bar) === bar);

        // Define a test function
        barFunc = T.fn(T.Bar, function(testbar) {
            assert(testbar.a !== undefined && testbar.b !== undefined);
        });

        barFunc(bar);
    });

    it('should throw an exception because of invalid type name', function(done) {
        try {
            T.define("foo", { a: null });
        } catch (error) {
            done();
        }
    });

    it('should throw an exception because of missing property', function(done) {
        try {
            T.define("FooBar", { a: null, b: null});
            T.FooBar({ a: 10 });
        } catch (error) {
            done();
        }
    });

    it('should throw an exception because of undefined type', function(done) {
        try {
            T.UndefinedTypeName({ a: 10 });
        } catch (error) {
            done();
        }
    });

    it('should throw an exception because of missing property in a function call', function(done) {
        var testFunc;
        try {
            T.define("TestFuncType", { abc: null, def: null });

            testFunc = T.fn(T.TestFuncType, function(testf) {
                return testf;
            });

            testFunc({ def: null });
        } catch (error) {
            done();
        }
    });

    it('should not throw an exception because type checking is disabled', function() {
        T.disabled = true;
        T.define("FooBarTwo", { a: null, b: null});
        T.FooBarTwo({ a: 10 });
        T.disabled = false;
    });
});
