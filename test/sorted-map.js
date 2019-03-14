"use strict";

const assert = require("assert");
const { SortedMap } = require("..");
const { utils } = require("..");

describe("SortedMap", () => {
    it("should create a asc sorted map as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        assert.deepStrictEqual(map[utils.keys], [1, 2, 3]);
        assert.deepStrictEqual(map[utils.values], ["hello", "hi", "world"]);
    });

    it("should create a desc sorted map as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]], (a, b) => b - a);

        assert.deepStrictEqual(map[utils.keys], [3, 2, 1]);
        assert.deepStrictEqual(map[utils.values], ["world", "hi", "hello"]);
    });

    it("should create a sorted map without initial data as expected", () => {
        var map = new SortedMap((a, b) => b - a);

        map.set(1, "hello").set(3, "world").set(2, "hi");

        assert.deepStrictEqual(map[utils.keys], [3, 2, 1]);
        assert.deepStrictEqual(map[utils.values], ["world", "hi", "hello"]);
    });

    it("should get the size of the map as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        assert.strictEqual(map.size, 3);
    });

    it("should add new item to the map as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        map.set(4, "Ayon");

        assert.deepStrictEqual(map[utils.keys], [1, 2, 3, 4]);
        assert.deepStrictEqual(map[utils.values], ["hello", "hi", "world", "Ayon"]);
    });

    it("should add new item to the map as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        map.set(3, "Ayon");

        assert.deepStrictEqual(map[utils.keys], [1, 2, 3]);
        assert.deepStrictEqual(map[utils.values], ["hello", "hi", "Ayon"]);
    });

    it("should check if a key exists in the map as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        assert.ok(map.has(1));
        assert.ok(!map.has("1"));
    });

    it("should get a value from the map as expected", () => {
        var map = new SortedMap([[1, "hello"], [2, "hi"], [3, "world"]]);

        assert.strictEqual(map.get(1), "hello");
    });

    it("should delete an item in the map as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        map.delete(1);

        assert.ok(!map.has(1));
    });

    it("should clear the map as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        map.clear();

        assert.strictEqual(map.size, 0);
    });

    it("should get a reversed sorted map as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]], (a, b) => b - a);
        var rmap = map.reverse();

        rmap.set(4, "Ayon");

        assert.deepStrictEqual(rmap[utils.keys], [1, 2, 3, 4]);
        assert.deepStrictEqual(rmap[utils.values], ["hello", "hi", "world", "Ayon"]);
    });

    it("should get an iterator of keys as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);
        var keys = [];

        for (let key of map.keys()) {
            keys.push(key);
        }

        assert.deepStrictEqual(keys, [1, 2, 3]);
    });

    it("should get an iterator of values as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);
        var values = [];

        for (let value of map.values()) {
            values.push(value);
        }

        assert.deepStrictEqual(values, ["hello", "hi", "world"]);
    });

    it("should get an iterator of entries as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);
        var keys = [];
        var values = [];

        for (let item of map.entries()) {
            assert.strictEqual(item.length, 2);
            keys.push(item[0]);
            values.push(item[1]);
        }

        assert.deepStrictEqual(keys, [1, 2, 3]);
        assert.deepStrictEqual(values, ["hello", "hi", "world"]);
    });

    it("should travels the map in a for...of... loop as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);
        var keys = [];
        var values = [];

        for (let [key, value] of map) {
            keys.push(key);
            values.push(value);
        }

        assert.deepStrictEqual(keys, [1, 2, 3]);
        assert.deepStrictEqual(values, ["hello", "hi", "world"]);
    });

    it("should implement the forEach method as expected", () => {
        var map = new SortedMap([[1, "hello"], [3, "world"], [2, "hi"]]);
        var keys = [];
        var values = [];

        map.forEach((value, key, _map) => {
            keys.push(key);
            values.push(value);
            assert.ok(Object.is(_map, map));
        });

        assert.deepStrictEqual(keys, [1, 2, 3]);
        assert.deepStrictEqual(values, ["hello", "hi", "world"]);
    });

    it("should pass instanceof checking as expected", () => {
        assert.ok(new SortedMap() instanceof Map);
    });
});