"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const toolkit = require("literal-toolkit");

/**
 * @param {Function} ctor 
 * @param {Function} base 
 */
function inherit(ctor, base) {
    let isSet = base === Set || base.prototype instanceof Set;

    Object.setPrototypeOf(ctor, base);
    Object.setPrototypeOf(ctor.prototype, base.prototype);
    Object.defineProperties(ctor.prototype, {
        size: {
            get() {
                return this[module.exports.values].length;
            }
        },
        values: {
            value: function* values() {
                for (let value of this[module.exports.values]) {
                    yield value;
                }
            }
        }
    });
    Object.defineProperty(ctor.prototype, Symbol.iterator, {
        value: isSet ? ctor.prototype.values : ctor.prototype.entries
    });

    if (isSet) {
        Object.defineProperty(ctor.prototype, "keys", {
            value: ctor.prototype.values
        });
    }

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

function fixToStringTag(ctor) {
    Object.defineProperty(ctor.prototype, Symbol.toStringTag, {
        value: ctor.name
    });

    return ctor;
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
    keys: Symbol("keys"),
    values: Symbol("values"),
    inherit,
    labelize,
    fixToStringTag,
    throwNotEntryError,
    throwNotIterableError
};