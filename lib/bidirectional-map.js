"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { keys, values, labelize } = require("./utils");
const { BaseMap } = require("./base-map");

class BiMap extends BaseMap {
    constructor(iterable) {
        super(iterable);
    }

    getKey(value) {
        let i = this[values].indexOf(value);
        return i === -1 ? void 0 : this[keys][i];
    }

    hasValue(value) {
        return this[values].includes(value);
    }

    deleteValue(value) {
        return this.removeByIndex(this[values].indexOf(value));
    }

    set(key, value) {
        let i = this[values].indexOf(value);

        if (i !== -1 && this[keys][i] !== key) {
            // Values must be unique in order to search inversely.
            throw new Error(`value ${labelize(value)} is duplicated`);
        } else if (i === -1) {
            let j = this[keys].indexOf(key);

            if (j === -1) {
                this[keys].push(key);
                this[values].push(value);
            } else {
                this[values][j] = value;
            }
        }

        return this;
    }

    inverse() {
        // Fast inverse, create a new instance without calling the constructor,
        // and assign keys and values of the current instance to the new 
        // instance as its values and keys directly.
        let map = Object.create(BiMap.prototype);

        map[keys] = this[values];
        map[values] = this[keys];

        return map;
    }
}

exports.BiMap = BiMap;