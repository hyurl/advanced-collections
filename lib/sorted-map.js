"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const util = require("./util");

const keys = util.keys;
const values = util.values;

/**
 * @extends {Map}
 */
class SortedMap extends BaseMap {
    /**
     * @param {Iterable<[any, any]>} iterable 
     * @param {(a: any, b: any) => -1 | 0 | 1} comparator
     */
    constructor(iterable, comparator) {
        if (typeof iterable === "function") {
            comparator = iterable;
            iterable = [];
        }

        super(iterable);

        this.comparator = comparator;
    }

    set(key, value) {
        let size = this.size;

        if (size === 0) {
            this[keys].push(key);
            this[values].push(value);
        } else {
            let keys = Array.from(this[keys]);

            while (size = Math.ceil(size / 2)) {
                let keys1 = keys.splice(0, size);
                let res = this.comparator(keys1[keys1.length - 1], key);

                if (res === 0) {
                    let values1 = this[values].splice(0, size);

                    keys1.push(key);
                    values1.push(value);

                    this[keys] = keys1.concat(keys);
                    this[values] = values1.concat(this[values]);
                } else if (res < 0) {
                    keys = keys1;
                }
            }
        }
    }

    reverse() {
        let map = new Map();
        let keys = Array.from(this[keys]).reverse();
        let values = Array.from(this[values]).reverse();

        for (let i = 0; i < keys.length; i++) {
            map.set(keys[i], values[i]);
        }

        return map;
    }
}

exports.SortedMap = SortedMap;