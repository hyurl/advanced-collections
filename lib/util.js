"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const toolkit = require("literal-toolkit");
const keys = Symbol("keys");
const values = Symbol("values");

/**
 * @param {Function} ctor 
 * @param {Function} base 
 */
function inherit(ctor, base) {
    Object.setPrototypeOf(ctor, base);
    Object.setPrototypeOf(ctor.prototype, base.prototype);
    Object.defineProperties(ctor.prototype, {
        size: {
            get() {
                return this[values].length;
            }
        },
        values: {
            value: function* values() {
                for (let value of this[values]) {
                    yield value;
                }
            }
        },
        [Symbol.iterator]: {
            value: ctor.prototype.entries
        },
        [Symbol.toStringTag]: {
            value: ctor.name
        }
    });

    return ctor;
}

function labelize(value) {
    if (value === null) {
        return "null";
    } else if (value instanceof RegExp) {
        return toolkit.regexp.toLiteral(value);
    }

    let type = typeof value;

    switch (type) {
        case "string":
            return toolkit.string.toLiteral(value, "'");

        case "number":
        case "bigint":
            return toolkit.number.toLiteral(value);

        case "function":
            return "[Function" + (value.name ? `: ${value.name}` : "") + "]";

        case "object":
            return "[Object]";

        case "symbol":
            return `[${String(value)}]`;

        // undefined, boolean
        default:
            return String(value);
    }
}

/**
 * @returns {never}
 */
function throwNotEntryError(item) {
    throw new TypeError(
        `Iterator value ${labelize(item)} is not an entry object`
    );
}

/**
 * @returns {never}
 */
function throwNotIterableError(input) {
    throw new TypeError(`${labelize(input)} is not iterable`);
}

module.exports = {
    keys: keys,
    values: values,
    inherit: inherit,
    labelize: labelize,
    throwNotEntryError: throwNotEntryError,
    throwNotIterableError: throwNotIterableError
};