(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AdvancedCollections"] = factory();
	else
		root["AdvancedCollections"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

if (!Array.prototype.includes) {
    Array.prototype.includes = function includes(value, fromIndex = 0) {
        return this.indexOf(value, fromIndex) !== -1;
    }
}

module.exports = Object.assign({
    utils: __webpack_require__(/*! ./lib/utils */ "./lib/utils.js")
},
    __webpack_require__(/*! ./lib/bidirectional-map */ "./lib/bidirectional-map.js"),
    __webpack_require__(/*! ./lib/sorted-map */ "./lib/sorted-map.js"),
    __webpack_require__(/*! ./lib/sorted-set */ "./lib/sorted-set.js")
);

/***/ }),

/***/ "./lib/base-map.js":
/*!*************************!*\
  !*** ./lib/base-map.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const {
    keys,
    values,
    throwNotEntryError,
    throwNotIterableError,
    inherit,
    fixToStringTag
} = __webpack_require__(/*! ./utils */ "./lib/utils.js");

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

/***/ }),

/***/ "./lib/bidirectional-map.js":
/*!**********************************!*\
  !*** ./lib/bidirectional-map.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const { keys, values, labelize, fixToStringTag } = __webpack_require__(/*! ./utils */ "./lib/utils.js");
const { BaseMap } = __webpack_require__(/*! ./base-map */ "./lib/base-map.js");

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

        map[keys] = Array.from(this[values]);
        map[values] = Array.from(this[keys]);

        return map;
    }
}

fixToStringTag(BiMap);
exports.BiMap = BiMap;

/***/ }),

/***/ "./lib/sorted-map.js":
/*!***************************!*\
  !*** ./lib/sorted-map.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const { keys, values, findInsertIndex, fixToStringTag } = __webpack_require__(/*! ./utils */ "./lib/utils.js");
const { BaseMap } = __webpack_require__(/*! ./base-map */ "./lib/base-map.js");

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
            let index = findInsertIndex(key, this[keys], this.comparator);

            if (index === -1) {
                this[keys].unshift(key);
                this[values].unshift(value);
            } else if (index === this.size) {
                this[keys].push(key);
                this[values].push(value);
            } else {
                this[keys].splice(index, 0, key);
                this[values].splice(index, 0, value);
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

/***/ }),

/***/ "./lib/sorted-set.js":
/*!***************************!*\
  !*** ./lib/sorted-set.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const {
    values,
    throwNotIterableError,
    findInsertIndex,
    inherit,
    fixToStringTag
} = __webpack_require__(/*! ./utils */ "./lib/utils.js");

/**
 * @extends {Set}
 */
class SortedSet {
    /**
     * @param {Iterable<any>} iterable 
     * @param {(a: any, b: any) => -1 | 0 | 1} comparator
     */
    constructor(iterable, comparator = (a, b) => String(a) - String(b)) {
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

/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const toolkit = __webpack_require__(/*! literal-toolkit */ "./node_modules/literal-toolkit/index.js");

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
 * @returns {number} -1: unshift, size: push, others: split
 */
function findInsertIndex(item, container, comparator) {
    let size = container.length;

    if (size === 0) {
        // If the container is empty, should push the new item into the end of
        // the container directly.
        return size;
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
            return size;
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

/***/ }),

/***/ "./node_modules/literal-toolkit/index.js":
/*!***********************************************!*\
  !*** ./node_modules/literal-toolkit/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

exports.string = __webpack_require__(/*! ./lib/string */ "./node_modules/literal-toolkit/lib/string.js");
exports.number = __webpack_require__(/*! ./lib/number */ "./node_modules/literal-toolkit/lib/number.js");
exports.keyword = __webpack_require__(/*! ./lib/keyword */ "./node_modules/literal-toolkit/lib/keyword.js");
exports.regexp = __webpack_require__(/*! ./lib/regexp */ "./node_modules/literal-toolkit/lib/regexp.js");
exports.comment = __webpack_require__(/*! ./lib/comment */ "./node_modules/literal-toolkit/lib/comment.js");

/***/ }),

/***/ "./node_modules/literal-toolkit/lib/comment.js":
/*!*****************************************************!*\
  !*** ./node_modules/literal-toolkit/lib/comment.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var INLINE_COMMENT = /^\s*\/\/.*\n*?/;
var BLOCK_COMMENT = /^\s*\/\*[\s\S]*?\*\//;

exports.parseToken = parseToken;
/**
 * @param {string} str
 * @returns {{ source: string, offset: number, length: number, value: string, type: "//" | "/*" | "/**" }} 
 */
function parseToken(str) {
    var token = { source: "", offset: 0, length: 0, value: "", type: "" };
    var match = INLINE_COMMENT.exec(str) || BLOCK_COMMENT.exec(str);

    if (match) {
        token.offset = match[0].indexOf("/");
        token.length = match[0].length - token.offset;
        token.source = token.value = match[0].slice(token.offset);

        if (token.value[1] === "/") {
            token.type = "//";
        } else if (token.value.slice(1, 3) === "**") {
            token.type = "/**"
        } else {
            token.type = "/*";
        }

        return token;
    } else {
        return null;
    }
}

/**
 * 
 * @param {string} str 
 * @param {boolean} strip Strip meaningless characters.
 */
exports.parse = function parse(str, strip) {
    var token = parseToken(str);

    if (!token) return;

    if (!strip) {
        return token.value;
    } else if (token.type === "//") {
        return token.value.replace(/^\/\/\s*/, "");
    } else {
        var lines = token.value.replace(/\s*\*\/$/, "").split("\n");
        var value = lines[0].replace(/^\/\*\s*/, "");
        var isNewLine = false;

        for (var i = 1; i < lines.length; i++) {
            if (/^[\s\*]*$/.test(lines[i])) {
                if (!isNewLine) {
                    value += "\n";
                    isNewLine = true;
                }
            } else {
                value += (isNewLine ? "" : " ") + lines[i].replace(/^[\s\*]*/, "");
                isNewLine = false;
            }
        }

        return value;
    }
};

/**
 * @param {string} str
 * @param {"//" | "/*" | "/**"} type
 * @param {string} indent Indent all rest lines of the comment with the given spaces.
 */
exports.toLiteral = function toLiteral(str, type, indent) {
    type = type || "//";
    indent = indent || "";

    var hasMultiLine = str.indexOf("\n") >= 0;

    if (!hasMultiLine) {
        if (type === "//") {
            return "// " + str;
        } else {
            return type + " " + str + " */";
        }
    } else {
        var lines = str.split("\n");

        if (type === "//") {
            lines[0] = "// " + lines[0];
        } else {
            lines.unshift(type);
        }

        for (var i = 1; i < lines.length; i++) {
            lines[i] = lines[i].replace(/^\s*/, "");

            if (type == "//") {
                lines[i] = indent + "// " + lines[i];
            } else {
                lines[i] = indent + " * " + lines[i];
            }
        }

        if (type !== "//") {
            lines.push(indent + " */");
        }

        return lines.join("\n");
    }
};

/***/ }),

/***/ "./node_modules/literal-toolkit/lib/keyword.js":
/*!*****************************************************!*\
  !*** ./node_modules/literal-toolkit/lib/keyword.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var KEYWORDS = /^\s*(true|false|null|NaN|Infinity)(\s*[,;)\]}]|\s*$)/;

exports.parseToken = parseToken;
/**
 * @param {string} str
 * @returns {{ source: string, offset: number, length: number, value: true | false | null | NaN | Infinity }} 
 */
function parseToken(str) {
    var match = KEYWORDS.exec(str);

    if (match) {
        var value;

        switch (match[1]) {
            case "true":
                value = true;
                break;
            case "false":
                value = false;
                break;
            case "NaN":
            case "Infinity":
                value = Number(match[1]);
                break;
            default:
                value = null;
                break;
        }

        return {
            source: match[1],
            offset: str.indexOf(match[1]),
            length: match[1].length,
            value: value
        };
    } else {
        return null;
    }
}

/**
 * @param {string} str 
 */
exports.parse = function parse(str) {
    var token = parseToken(str);
    return token ? token.value : undefined;
};

/**
 * @param {true | false | null | NaN | Infinity} keyword
 */
exports.toLiteral = function toLiteral(keyword) {
    return String(keyword);
};

/***/ }),

/***/ "./node_modules/literal-toolkit/lib/number.js":
/*!****************************************************!*\
  !*** ./node_modules/literal-toolkit/lib/number.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var strictMatch = __webpack_require__(/*! ./util */ "./node_modules/literal-toolkit/lib/util.js").strictMatch;

var NUM_SEQUENCE = "0123456789abcdefinox-+.";
var BOUNDARIES = /^\s*[,;:)\]}\/]|^\s*$/;
var OTCAL_MARK = /0o/i;

exports.BIN = 2;
exports.OCT = 8;
exports.DEC = 10;
exports.HEX = 16;

function isHead(matches, char) {
    char = char || "";
    return matches === char || matches === "+" + char || matches === "-" + char;
}

exports.parseToken = parseToken;
/**
 * @param {string} str
 * @param {boolean} allowTrailings
 * @returns {{ source: string, offset: number, length: number, value: number, radix: 2 | 8 | 10 | 16 }} 
 */
function parseToken(str) {
    var allowTrailings = arguments[1] || false;
    var matches = "";
    var token = { source: "", offset: -1, length: 0, value: NaN, radix: 0 };

    for (var i = 0; i < str.length; ++i) {
        var char = str[i];

        if (char != false || char === "0") {
            if (token.offset === -1) {
                token.offset = i;
            }

            var _char = char.toLowerCase();
            var pos = NUM_SEQUENCE.indexOf(_char);

            if (pos === -1) {
                break;
            } else if (_char === "e") { // exponential
                if (token.radix === 16 || (
                    token.radix === 10 && matches.indexOf(char) === -1)
                ) {
                    matches += char;
                } else {
                    break;
                }
            } else if (_char === "b" || _char === "o" || _char === "x") { // non-decimal
                if (isHead(matches, "0")) {
                    token.radix = ({ b: 2, o: 8, x: 16 })[_char];
                    matches += char;
                } else if (_char === "b" && token.radix === 16) {
                    matches += char;
                } else {
                    break;
                }
            } else if (pos < 8) { // octal
                if (isHead(matches)) {
                    if (char === "0") {
                        token.radix = 8;
                    } else {
                        token.radix = 10;
                    }
                }
                matches += char;
            } else if (pos < 10) { // decimal
                if (token.radix === 2 || token.radix === 8) {
                    token.radix = 10;
                }
                matches += char;
            } else if (pos < 16) { // hexdecimal
                if (token.radix === 16) {
                    matches += char;
                } else {
                    break;
                }
            } else if (char === "n") { // bigint
                if (matches[0] === "+"
                    || (
                        token.radix === 8 && OTCAL_MARK.test(matches) === false
                    ) || (
                        token.radix === 10 && matches.indexOf(".") >= 0
                    )) {
                    // bigint doesn't support plus sign, non-standard octal 
                    // number and float number.
                    return null;
                } else {
                    matches += char;
                    break;
                }
            } else if (char === ".") { // float
                if (isHead(matches)) {
                    token.radix = 10;
                    matches += char;
                } else if (token.radix === 10 && matches.indexOf(".") === -1) {
                    matches += char;
                } else {
                    break;
                }
            } else if (isHead(char)) { // - or +
                if (matches === "" || ( // signed number
                    str[i - 1] === "e" || str[i - 1] === "E" // scientific notation
                )) {
                    matches += char;
                } else {
                    break;
                }
            } else {
                if (isHead(matches)) {
                    if (str.slice(i, i + 3) === "NaN") { // NaN
                        matches += "NaN";
                    } else if (str.slice(i, i + 8) === "Infinity") { // Infinity
                        matches += "Infinity";
                    } else {
                        return null;
                    }
                }
                break;
            }
        }
    }

    token.source = matches;
    token.length = matches.length;
    token.offset = token.offset === -1 ? 0 : token.offset;
    token.radix = token.radix || 10;

    if (matches) {
        if (token.radix === 8 && OTCAL_MARK.test(matches) === false) {
            token.value = parseInt(matches, 8);
        } else {
            var isBigInt = matches[matches.length - 1] === "n";

            if (isBigInt && typeof BigInt !== "function") {
                // If the environment doesn't support BigInt, don't parse.
                return null;
            }

            var parse = isBigInt ? BigInt : Number;
            var source = isBigInt ? matches.slice(0, -1) : matches;

            if (matches[0] === "-") { // minus
                token.value = -parse(source.slice(1));
            } else if (matches[0] === "+") { // plus
                token.value = parse(source.slice(1));
            } else {
                token.value = parse(source);
            }
        }
    }

    if (!allowTrailings && !strictMatch(str, token, BOUNDARIES)) {
        return null;
    } else {
        return token;
    }
}

exports.parse = parse;
/**
 * @param {string} str 
 * @param {boolean} strict 
 */
function parse(str, strict) {
    var token = parseToken(str, !strict);
    return token ? token.value : undefined;
}

function isRadix(str, radix) {
    var token = parseToken(str);
    return token ? token.radix == radix : false;
}

/**
 * @param {string} str 
 */
exports.isBin = function isBin(str) {
    return isRadix(str, 2);
};

/**
 * @param {string} str 
 */
exports.isOct = function isOct(str) {
    return isRadix(str, 8);
};

/**
 * @param {string} str 
 */
exports.isDec = function isDec(str) {
    return isRadix(str, 10);
};

/**
 * @param {string} str 
 */
exports.isHex = function isHex(str) {
    return isRadix(str, 16);
};

/**
 * @param {string} str 
 */
exports.isNaN = function isNaN(str) {
    var value = parse(str, true);
    return value === undefined || Number.isNaN(value);
};

/**
 * @param {string} str 
 */
exports.isFinite = function isFinite(str) {
    return Number.isFinite(parse(str, true));
};

/**
 * @param {string} str
 */
exports.isBigInt = function isBigInt(str) {
    return typeof parse(str, true) === "bigint";
};

/**
 * @param {number | bigint} num
 * @param {2 | 8 | 10 | 16} radix
 */
exports.toLiteral = function toLiteral(num, radix) {
    radix = radix || 10;

    let head = ({ 2: "0b", 8: "0o", 10: "", 16: "0x" })[radix];
    let str = num.toString(radix) + (typeof num === "bigint" ? "n" : "");

    return str[0] === "-" ? ("-" + head + str.slice(1)) : (head + str);
};

/***/ }),

/***/ "./node_modules/literal-toolkit/lib/regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/literal-toolkit/lib/regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var strictMatch = __webpack_require__(/*! ./util */ "./node_modules/literal-toolkit/lib/util.js").strictMatch;

var LEADING_SLASH = /^\s*(\/)/;
var EOL = /[\n\r]/;
var FLAGS = "gimsuy";

/**
 * @param {string} str 
 * @returns {{ offset: number, source: string }}
 */
function getSlashedBlock(str) {
    var matches = str.match(LEADING_SLASH);

    if (matches) {
        var offset = str.indexOf(matches[1]),
            index = offset,
            source = matches[1];

        str = str.slice(offset + 1);

        while (-1 !== (index = str.indexOf(matches[1]))) {
            source += str.slice(0, index + 1);

            if (source[source.length - 2] !== "\\") {
                return { offset, source };
            } else {
                str = str.slice(index + 1);
            }
        }
    }

    return null;
}

/**
 * @param {string} str
 * @returns {string} 
 */
function getFlags(str) {
    var flags = "";

    for (let i = 0, len = str.length; i < len; ++i) {
        if (FLAGS.indexOf(str[i]) >= 0 && flags.indexOf(str[i]) === -1) {
            flags += str[i];
        } else {
            break;
        }
    }

    return flags;
}

exports.parseToken = parseToken;
/**
 * 
 * @param {string} str 
 * @returns {{ source: string, offset: number, length: number, value: RegExp }}
 */
function parseToken(str) {
    var block = getSlashedBlock(str);

    if (block && block.source !== "//" && EOL.test(block.source) === false) {
        try {
            var flags = getFlags(str.slice(block.offset + block.source.length));
            var value = new RegExp(block.source.slice(1, -1), flags);
            var token = {
                source: block.source + flags,
                offset: block.offset,
                length: block.source.length + flags.length,
                value: value
            };

            if (strictMatch(str, token)) {
                return token;
            }
        } catch (e) { }
    }

    return null;
}

/**
 * @param {string} str
 */
exports.parse = function parse(str) {
    var token = parseToken(str);
    return token ? token.value : undefined;
};

/**
 * @param {RegExp} re
 */
exports.toLiteral = function toLiteral(re) {
    return String(re);
}

/***/ }),

/***/ "./node_modules/literal-toolkit/lib/string.js":
/*!****************************************************!*\
  !*** ./node_modules/literal-toolkit/lib/string.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var strictMatch = __webpack_require__(/*! ./util */ "./node_modules/literal-toolkit/lib/util.js").strictMatch;
var escape = exports.escape = __webpack_require__(/*! safe-string-literal */ "./node_modules/safe-string-literal/index.js").escape;
var unescape = exports.unescape = __webpack_require__(/*! safe-string-literal */ "./node_modules/safe-string-literal/index.js").unescape;

exports.SINGLE_QUOTE = "'";
exports.DOUBLE_QUOTE = '"';
exports.BACK_QUOTE = "`";

var LEADING_QUOTES = /^\s*("|'|`)/;
var BOUNDARIES = /^\s*[,;:)\]}\/]|^\s*$/;

/**
 * @param {string} str 
 * @returns {{ quote: string, offset: number, source: string }}
 */
function getQuotedBlock(str) {
    var matches = str.match(LEADING_QUOTES);

    if (matches) {
        var quote = matches[1],
            offset = str.indexOf(quote),
            index = offset,
            source = quote;

        str = str.slice(offset + 1);

        while (-1 !== (index = str.indexOf(quote))) {
            source += str.slice(0, index + 1);

            if (source[source.length - 2] !== "\\") {
                return { quote, offset, source };
            } else {
                str = str.slice(index + 1);
            }
        }
    }

    return null;
}

/**
 * @param {string} str 
 */
function removeUnusedEscapes(str) {
    var exludes = "\\'\"`bfnrtux";
    return String(str).replace(/\\\S/g, function (chars) {
        if (!~exludes.indexOf(chars[1])) {
            return chars[1];
        } else {
            return chars;
        }
    });
}

exports.parseToken = parseToken;
/**
 * @param {string} str
 * @returns {{ source: string, offset: number, length: number, value: string, quote: "'" | "\"" | "`" }} 
 */
function parseToken(str) {
    var block = getQuotedBlock(str);

    if (block) {
        var value;
        var lines = block.source.slice(1, -1).split("\n");

        if (lines.length === 1) {
            value = unescape(removeUnusedEscapes(lines[0]));
        } else {
            for (var i = lines.length - 1; i--;) {
                if (lines[i][lines[i].length - 1] === "\\") {
                    lines[i] = lines[i].slice(0, -1);
                } else if (block.quote === "`") {
                    lines[i] += "\n";
                } else {
                    return null; // invalid new line
                }
            }

            value = unescape(removeUnusedEscapes(lines.join("")));
        }

        var token = Object.assign(block, {
            length: block.source.length,
            value: value
        });

        if (strictMatch(str, token, BOUNDARIES)) {
            return token;
        }
    }

    return null;
}

exports.parse = parse;
/**
 * @param {string} str 
 */
function parse(str) {
    var token = parseToken(str);
    return token ? token.value : undefined;
}

exports.toLiteral = toLiteral;
/**
 * @param {string} str 
 * @param {"'" | "\"" | "`"} quote 
 */
function toLiteral(str, quote) {
    var exclues;
    quote = quote || '"';

    if (quote === "'")
        exclues = '"`';
    else if (quote === '"')
        exclues = "'`";
    else if (quote === "`")
        exclues = "'\"\n";

    return quote + escape(str, exclues) + quote;
}

/***/ }),

/***/ "./node_modules/literal-toolkit/lib/util.js":
/*!**************************************************!*\
  !*** ./node_modules/literal-toolkit/lib/util.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var BOUNDARIES = /^\s*[,;)\]}\/]|^\s*$/;

exports.strictMatch = strictMatch;
/**
 * @param {string} str 
 * @param {{ offset: number, length: number }} token 
 */
function strictMatch(str, token) {
    var boundaries = arguments[2] || BOUNDARIES;
    var leftOver = str.slice(token.offset + token.length);
    return !leftOver || boundaries.test(leftOver);
}

/***/ }),

/***/ "./node_modules/safe-string-literal/index.js":
/*!***************************************************!*\
  !*** ./node_modules/safe-string-literal/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

/**
 * @param {string} str 
 * @param {string|string[]} excludes 
 */
function escape(str, excludes) {
    return String(str).replace(/["'`\\\b\f\n\r\t\u2028\u2029]/g, function (char) {
        if (excludes && excludes.indexOf(char) >= 0)
            return char;

        switch (char) {
            case '"':
            case "'":
            case '`':
            case "\\":
                return "\\" + char;
            case "\b":
                return "\\b";
            case "\f":
                return "\\f";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\t":
                return "\\t";
            case "\u2028":
                return "\\u2028";
            case "\u2029":
                return "\\u2029";
        }
    });
}

/**
 * @param {string} str 
 */
function unescape(str) {
    return String(str).replace(/\\["'`\\bfnrt]|\\u2028|\\u2029/g, function (chars) {
        switch (chars) {
            case '\\"':
            case "\\'":
            case "\\`":
            case "\\\\":
                return chars[1];
            case "\\b":
                return "\b";
            case "\\f":
                return "\f";
            case "\\n":
                return "\n";
            case "\\r":
                return "\r";
            case "\\t":
                return "\t";
            case "\\u2028":
                return "\u2028";
            case "\\u2029":
                return "\u2029";
        }
    });
}

exports.escape = escape;
exports.unescape = unescape;

/***/ })

/******/ });
});
//# sourceMappingURL=advanced-collections.js.map