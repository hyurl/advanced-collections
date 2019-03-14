"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

if (!Array.prototype.includes) {
    Array.prototype.includes = function includes(value, fromIndex = 0) {
        return this.indexOf(value, fromIndex) !== -1;
    }
}

module.exports = Object.assign({
    utils: require("./lib/utils")
},
    require("./lib/bidirectional-map"),
    require("./lib/sorted-map"),
    require("./lib/sorted-set")
);