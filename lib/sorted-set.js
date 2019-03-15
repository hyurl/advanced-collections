"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const {
    values,
    defaultComparator,
    throwNotIterableError,
    findInsertIndex,
    inherit,
    fixToStringTag
} = require("./utils");

/**
 * @extends {Set}
 */
class SortedSet {
    /**
     * @param {Iterable<any>} iterable 
     * @param {(a: any, b: any) => -1 | 0 | 1} comparator
     */
    constructor(iterable, comparator = defaultComparator) {
        if (typeof iterable === "function") {
            comparator = iterable;
            iterable = [];
        }

        this[values] = [];
        this.comparator = comparator;

        if (iterable !== undefined && iterable !== null) {
            if (typeof iterable[Symbol.iterator] === "function") {
                for (let item of iterable) {
                    this.add(item);
                }
            } else {
                throwNotIterableError(iterable);
            }
        }
    }

    add(value) {
        if (!this.has(value)) {
            let index = findInsertIndex(value, this[values], this.comparator);

            if (index === -1) {
                this[values].unshift(value);
            } else if (index === this.size) {
                this[values].push(value);
            } else {
                this[values].splice(index, 0, value);
            }
        }

        return this;
    }

    has(value) {
        return this[values].includes(value);
    }

    delete(value) {
        let i = this[values].indexOf(value);

        if (i !== -1) {
            this[values].splice(i, 1);
            return true;
        } else {
            return false;
        }
    }

    clear() {
        this[values] = [];
    }

    reverse() {
        // Fast reverse, create a new instance without calling the constructor,
        // and assign the reversed values and comparator of the current instance
        // to the new instance directly.
        let set = Object.create(SortedSet.prototype);

        set[values] = Array.from(this[values]).reverse();
        set.comparator = (a, b) => -this.comparator(a, b);

        return set;
    }

    *entries() {
        for (let item of this[values]) {
            yield [item, item];
        }
    }

    forEach(callback, thisArg) {
        for (let [key, value] of this.entries()) {
            callback.call(thisArg, value, key, this);
        }
    }
}

inherit(SortedSet, Set);
fixToStringTag(SortedSet);
exports.SortedSet = SortedSet;