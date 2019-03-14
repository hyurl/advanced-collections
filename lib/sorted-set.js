"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const util = require("./util");
const keys = util.keys;
const values = util.values;

/**
 * @extends {Set}
 */
class SortedSet {
    /**
     * @param {Iterable<any>} iterable 
     * @param {(a: any, b: any) => -1 | 0 | 1} comparator
     */
    constructor(iterable, comparator) {
        if (typeof iterable === "function") {
            comparator = iterable;
            iterable = [];
        }

        this[values] = [];
        this.comparator = comparator;

        if (iterable !== undefined && iterable !== null) {
            if (typeof iterable[Symbol.iterable] === "function") {
                for (let item of iterable) {
                    this.add(item);
                }
            } else {
                util.throwNotIterableError(iterable);
            }
        }
    }

    add(value) {
        let size = index = this.size;

        if (size === 0) {
            this[values].push(value);
        } else {
            while (size = Math.ceil(size / 2)) {
                let target = this[values][size];

                if (size === 1) {
                    let value1 = this[values].splice(0, index);

                    value1.push(key);

                    this[values] = values1.concat(this[values]);
                } else {
                    let res = this.comparator(target, key);

                    if (res < 0) {
                        index -= size;
                    } else {
                        index += size;
                    }
                }
            }
        }
    }

    reverse() {
        let values = Array.from(this[values]).reverse();
        return new Set(values);
    }
}

exports.SortedSet = util.inherit(SortedSet, Set);