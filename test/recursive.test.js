/*jslint node: true */
/*global window: false, describe, it */
"use strict";

// typed-javascript recursive type unit tests
// run with mocha tests.js

// Load Node.js assert library
var assert = require("assert");

// Load type library
var T = require("../typed");


describe('typed-javascript main tests', function() {
    it('should allow a recursive type defition', function() {
        T.define("A", { a : null });
        T.define("B", { a : T.A });
    });

    it('should allow a recursive type defition', function() {
        T.define("C", { c : null });
        T.define("D", { d : T.C });
        T.define("E", { e : T.D });
    });

    it('should allow a recursive type defition', function() {
        var g = { g : { f : "abc" }};
        T.define("F", { f : null });
        T.define("G", { g : T.F });
        assert(T.G(g) === g);
    });

    it('should allow a recursive type with a primitive', function() {
        var i =
                {
                    i : { h : "abc", name : "xyz" },
                    foo : "bar"
                };

        T.define("H", { h : T.string, name : null });
        T.define("I", { i : T.H, foo : null });
        assert(T.I(i) === i);
    });

    it('should throw error because of missing property', function(done) {
        var i =
                {
                    i : { h : "abc" },
                    foo : "bar"
                };
        try {
            assert(T.I(i) === i);
        } catch (error) {
            done();
        }
    });

    it('should throw error because of missing property', function(done) {
        var i =
                {
                    i : { name : "xyz" },
                    foo : "bar"
                };
        try {
            assert(T.I(i) === i);
        } catch (error) {
            done();
        }
    });

    it('should be possible to define a type using an object without recursion', function() {
        var a = { a : "", b : null, c : null, d : NaN, e: 15, f: false };
        T.define("J", a);
        assert(T.J(a) === a);

        // Test that there's no error
        T.J({ a : null, b : null, c : null, d : null, e : null, f : null });
    });

});
