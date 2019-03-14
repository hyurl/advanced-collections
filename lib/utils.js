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

/**
 * @param {any[]} container
 * @returns {number} -1: unshift, Infinity: push, others: split
 */
function findInsertIndex(item, container, comparator) {
    let size = container.length;

    if (size === 0) {
        // If the container is empty, should push the new item into the end of
        // the container directly.
        return Infinity;
    } else {
        let res = comparator(item, container[0]);

        if (res < 0) {
            // If new item is smaller than the the first item in the container,
            // should put/unshift the new item into the head of the container.
            return -1;
        } else if (
            size === 1 ||
            (res = comparator(item, container[size - 1])) >= 0
        ) {
            // If there is only one item in the container and the new item is
            // larger than it, or the new item is larger than the last item in
            // the container, should push the new item into the end of the 
            // container.
            return Infinity;
        } else {
            let index = size - 1;
            let dec = 0;
            let res = 0;

            // Finding the index via dichotomy.
            while (size = size / 2) {
                dec = Math.floor(size);
                size = Math.ceil(size);
                index -= dec;
                res = comparator(item, container[index]);

                if (size === 1) {
                    return res === -1 ? index : index + 1;

                    // When a specific index is returned, the caller should 
                    // insert the new item to the index of the container via the
                    // splice method.
                } else if (res >= 0) {
                    index += dec;
                }
            }
        }
    }
}

module.exports = {
    keys: Symbol("keys"),
    values: Symbol("values"),
    inherit,
    labelize,
    fixToStringTag,
    throwNotEntryError,
    throwNotIterableError,
    findInsertIndex
};