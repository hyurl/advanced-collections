"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const util = require("./util");
const BaseMap = require("./base-map").BaseMap;
const keys = util.keys;
const values = util.values;

class BiMap extends BaseMap {
    getKey(value) {
        let i = this[values].indexOf(value);
        return i === -1 ? void 0 : this[keys][i];
    }

    hasValue(value) {
        return this[values].indexOf(value) !== -1;
    }

    deleteValue(value) {
        return this.removeIndexOf(this[values].indexOf(value));
    }

    set(key, value) {
        let i = this[values].indexOf(value);

        if (i !== -1) {
            // Values must be unique in order to search inversely.
            throw new Error(`value ${util.labelize(value)} already exists`);
        } else {
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