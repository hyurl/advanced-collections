"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const {
    keys,
    values,
    throwNotEntryError,
    throwNotIterableError,
    inherit,
    fixToStringTag
} = require("./utils");

/**
 * @abstract
 * @extends {Map}
 */
class BaseMap {
    /**
     * @param {Iterable<[any, any]>} iterable 
     */
    constructor(iterable, props = {}) {
        this[keys] = [];
        this[values] = [];

        Object.assign(this, props);

        if (iterable !== undefined && iterable !== null) {
            if (typeof iterable[Symbol.iterator] === "function") {
                for (let item of iterable) {
                    if (typeof item !== "object" || !("length" in item)) {
                        throwNotEntryError(item);
                    } else {
                        this.set(item[0], item[1]);
                    }
                }
            } else {
                throwNotIterableError(iterable);
            }
        }
    }

    get(key) {
        let i = this[keys].indexOf(key);
        return i === -1 ? void 0 : this[values][i];
    }

    has(key) {
        return this[keys].includes(key);
    }

    /**
     * @param {number} index 
     */
    removeByIndex(index) {
        if (index >= 0) {
            this[keys].splice(index, 1);
            this[values].splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    delete(key) {
        return this.removeByIndex(this[keys].indexOf(key));
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
        for (let [key, value] of this.entries()) {
            callback.call(thisArg, value, key, this);
        }
    }
}

inherit(BaseMap, Map);
fixToStringTag(BaseMap);
exports.BaseMap = BaseMap;