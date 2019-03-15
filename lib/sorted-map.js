"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const {
    keys,
    values,
    defaultComparator,
    findInsertIndex,
    fixToStringTag
} = require("./utils");
const { BaseMap } = require("./base-map");

/**
 * @extends {Map}
 */
class SortedMap extends BaseMap {
    /**
     * @param {Iterable<[any, any]>} iterable 
     * @param {(a: any, b: any) => -1 | 0 | 1} comparator
     */
    constructor(iterable, comparator = defaultComparator) {
        if (typeof iterable === "function") {
            comparator = iterable;
            iterable = [];
        }

        super(iterable, { comparator });
    }

    set(key, value) {
        let i = this[keys].indexOf(key);

        if (i !== -1) {
            this[values][i] = value;
        } else {
            let index = findInsertIndex(key, this[keys], this.comparator);

            if (index === -1) {
                this[keys].unshift(key);
                this[values].unshift(value);
            } else if (index === this.size) {
                this[keys].push(key);
                this[values].push(value);
            } else {
                this[keys].splice(index, 0, key);
                this[values].splice(index, 0, value);
            }
        }

        return this;
    }

    reverse() {
        // Fast reverse, create a new instance without calling the constructor,
        // and assign the reversed values and comparator of the current instance
        // to the new instance directly.
        let map = Object.create(SortedMap.prototype);

        map[keys] = Array.from(this[keys]).reverse();
        map[values] = Array.from(this[values]).reverse();
        map.comparator = (a, b) => -this.comparator(a, b);

        return map;
    }
}

fixToStringTag(SortedMap);
exports.SortedMap = SortedMap;