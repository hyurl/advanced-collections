"use strict";

const assert = require("assert");
const { SortedSet } = require("..");
const { utils } = require("..");

describe("SortedSet", () => {
    it("should create a asc sorted set as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8]);

        assert.deepStrictEqual(set[utils.values], [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should create a desc sorted set as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8], (a, b) => b - a);

        assert.deepStrictEqual(set[utils.values], [9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

    it("should create a sorted set without initial data as expected", () => {
        var set = new SortedSet((a, b) => b - a);

        set.add(1).add(3).add(2).add(9).add(5).add(4).add(6).add(7).add(8);

        assert.deepStrictEqual(set[utils.values], [9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

    it("should get the size of the set as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8]);

        assert.strictEqual(set.size, 9);
    });

    it("should add new value to the set as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8, 11]);

        set.add(10);

        assert.deepStrictEqual(set[utils.values], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });

    it("should check if a value exists in the set as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8, 11]);

        assert.ok(set.has(1));
        assert.ok(!set.has("1"));
    });

    it("should delete a value in the set as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8, 11]);

        set.delete(1);

        assert.ok(!set.has(1));
    });

    it("should clear the set as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8, 11]);

        set.clear();

        assert.strictEqual(set.size, 0);
    });

    it("should get a reversed sorted set as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8, 11], (a, b) => b - a);
        var rset = set.reverse();

        rset.add(10);

        assert.deepStrictEqual(rset[utils.values], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });

    it("should get an iterator of values as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8, 11]);
        var values = [];

        for (let value of set.values()) {
            values.push(value);
        }

        assert.deepStrictEqual(values, [1, 2, 3, 4, 5, 6, 7, 8, 9, 11]);
    });

    it("should get an iterator of entries as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8, 11]);
        var keys = [];
        var values = [];

        for (let item of set.entries()) {
            assert.strictEqual(item.length, 2);
            keys.push(item[0]);
            values.push(item[1]);
        }

        assert.deepStrictEqual(keys, [1, 2, 3, 4, 5, 6, 7, 8, 9, 11]);
        assert.deepStrictEqual(values, [1, 2, 3, 4, 5, 6, 7, 8, 9, 11]);
    });

    it("should travels the set in a for...of... loop as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8, 11]);
        var values = [];

        for (let value of set) {
            values.push(value);
        }

        assert.deepStrictEqual(values, [1, 2, 3, 4, 5, 6, 7, 8, 9, 11]);
    });

    it("should implement the forEach method as expected", () => {
        var set = new SortedSet([1, 3, 2, 9, 5, 4, 6, 7, 8, 11]);
        var keys = [];
        var values = [];

        set.forEach((value, key, _set) => {
            keys.push(key);
            values.push(value);
            assert.ok(Object.is(_set, set));
        });

        assert.deepStrictEqual(keys, [1, 2, 3, 4, 5, 6, 7, 8, 9, 11]);
        assert.deepStrictEqual(values, [1, 2, 3, 4, 5, 6, 7, 8, 9, 11]);
    });

    it("should implement the keys method as the same values method as expected", () => {
        var set = new SortedSet();

        assert.strictEqual(set.keys, set.values);
    });

    it("should pass instanceof checking as expected", () => {
        assert.ok(new SortedSet() instanceof Set);
    });
});