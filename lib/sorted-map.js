"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { keys, values, fixToStringTag } = require("./utils");
const { BaseMap } = require("./base-map");

/**
 * @extends {Map}
 */
class SortedMap extends BaseMap {
    /**
     * @param {Iterable<[any, any]>} iterable 
     * @param {(a: any, b: any) => -1 | 0 | 1} comparator
     */
    constructor(iterable, comparator = (a, b) => String(a) - String(b)) {
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
            let size = this.size;

            if (size === 0) {
                this[keys].push(key);
                this[values].push(value);
            } else {
                let res = this.comparator(key, this[keys][0]);

                if (res < 0) {
                    this[keys].unshift(key);
                    this[values].unshift(value);
                } else if (
                    size === 1 ||
                    (res = this.comparator(key, this[keys][size - 1])) >= 0
                ) {
                    this[keys].push(key);
                    this[values].push(value);
                } else {
                    this[keys].push(key);
                    this[keys].sort(this.comparator);

                    let i = this[keys].indexOf(key);
                    let values1 = this[values].splice(0, i);

                    values1.push(value);
                    this[values] = values1.concat(this[values]);
                }
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