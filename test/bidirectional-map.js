"use strict";

const assert = require("assert");
const { BiMap } = require("..");
const { utils } = require("..");

describe("BiMap", () => {
    it("should create a bidirectional map as expected", () => {
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);

        assert.deepStrictEqual(map[utils.keys], [1, 2, 3]);
        assert.deepStrictEqual(map[utils.values], ["hello", "hi", "world"]);
    });

    it("should create a bidirectional map without initial data as expected", () => {
        var map = new BiMap();

        map.set(1, "hello").set(2, "hi").set(3, "world");

        assert.deepStrictEqual(map[utils.keys], [1, 2, 3]);
        assert.deepStrictEqual(map[utils.values], ["hello", "hi", "world"]);
    });

    it("should get the size of the map as expected", () => {
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);

        assert.strictEqual(map.size, 3);
    });

    it("should throw value duplicated error as expected", () => {
        let map, err;

        try {
            map = new BiMap([[1, "hello"], [2, "world"], [3, "world"]]);
        } catch (e) {
            err = e;
        }

        assert.ok(err instanceof Error);
        assert.strictEqual(err.message, "value 'world' is duplicated");

        map = new BiMap([[1, "hello"]]);

        try {
            map.set(2, "hello");
        } catch (e) {
            err = e;
        }

        assert.strictEqual(err.message, "value 'hello' is duplicated");
    });

    it("should add new item to the map as expected", () => {
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);

        map.set(4, "Ayon");

        assert.deepStrictEqual(map[utils.keys], [1, 2, 3, 4]);
        assert.deepStrictEqual(map[utils.values], ["hello", "hi", "world", "Ayon"]);
    });

    it("should reset existing item to the map as expected", () => {
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);

        map.set(3, "Ayon");

        assert.deepStrictEqual(map[utils.keys], [1, 2, 3]);
        assert.deepStrictEqual(map[utils.values], ["hello", "hi", "Ayon"]);
    });

    it("should check if a key exists in the map as expected", () => {
        var map = new BiMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        assert.ok(map.has(1));
        assert.ok(!map.has("1"));
    });

    it("should check if a value exists in the map as expected", () => {
        var map = new BiMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        assert.ok(map.hasValue("hello"));
        assert.ok(!map.hasValue(1));
    });

    it("should get a value from the map as expected", () => {
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);

        assert.strictEqual(map.get(1), "hello");
    });

    it("should get a key via value from the map as expected", () => {
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);

        assert.strictEqual(map.getKey("hello"), 1);
    });

    it("should delete an item via key in the map as expected", () => {
        var map = new BiMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        map.delete(1);

        assert.ok(!map.has(1));
    });

    it("should delete an item via value in the map as expected", () => {
        var map = new BiMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        map.deleteValue("hello");

        assert.ok(!map.has(1));
    });

    it("should clear the map as expected", () => {
        var map = new BiMap([[1, "hello"], [3, "world"], [2, "hi"]]);

        map.clear();

        assert.strictEqual(map.size, 0);
    });

    it("should get a inversed bidirectional map as expected", () => {
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);
        var rmap = map.inverse();

        rmap.set("Ayon", 4);

        assert.deepStrictEqual(rmap[utils.keys], ["hello", "hi", "world", "Ayon"]);
        assert.deepStrictEqual(rmap[utils.values], [1, 2, 3, 4]);
    });

    it("should get an iterator of keys as expected", () => {
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);
        var keys = [];

        for (let key of map.keys()) {
            keys.push(key);
        }

        assert.deepStrictEqual(keys, [1, 2, 3]);
    });

    it("should get an iterator of values as expected", () => {
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);
        var values = [];

        for (let value of map.values()) {
            values.push(value);
        }

        assert.deepStrictEqual(values, ["hello", "hi", "world"]);
    });

    it("should get an iterator of entries as expected", () => {
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);
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
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);
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
        var map = new BiMap([[1, "hello"], [2, "hi"], [3, "world"]]);
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
        assert.ok(new BiMap() instanceof Map);
    });
});