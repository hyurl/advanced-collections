"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const util = require("./util");
const keys = util.keys;
const values = util.values;

/**
 * @abstract
 * @extends {Map}
 */
class BaseMap {
    /**
     * @param {Iterable<[any, any]>} iterable 
     */
    constructor(iterable) {
        this[keys] = [];
        this[values] = [];

        if (iterable !== undefined && iterable !== null) {
            if (typeof iterable[Symbol.iterable] === "function") {
                for (let item of iterable) {
                    if (typeof item !== "object" || !("length" in item)) {
                        util.throwNotEntryError(item);
                    } else {
                        this.set(item[0], item[1]);
                    }
                }
            } else {
                util.throwNotIterableError(iterable);
            }
        }
    }

    get(key) {
        let i = this[keys].indexOf(key);
        return i === -1 ? void 0 : this[values][i];
    }

    has(key) {
        return this[keys].indexOf(key) !== -1;
    }

    /**
     * @param {number} index 
     */
    removeIndexOf(index) {
        if (index !== -1) {
            this[keys].splice(index, 1);
            this[values].splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    delete(key) {
        return this.removeIndexOf(this[keys].indexOf(key));
    }

    clear() {
        // Fast clear, reset the keys and values.
        this[keys] = [];
        this[values] = [];
    }

    *keys() {
        for (let key of this[keys]) {
            yield key;
        }
    }

    *entries() {
        for (let i = 0; i < this[keys].length; i++) {
            yield [this[keys][i], this[values][i]];
        }
    }

    /**
     * @param {(value: any, key: any, map: Map) => void} callback 
     * @param {any} thisArg 
     */
    forEach(callback, thisArg) {
        for (let [key, value] of this) {
            callback.call(thisArg, value, key, this);
        }
    }
}

util.inherit(BaseMap, Map);
exports.BaseMap = BaseMap;