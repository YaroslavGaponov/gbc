"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var assert_1 = __importDefault(require("assert"));
// 3 generations of 7
var CACHE_SIZE = 21;
var CACHE_GENERATIONS = 3;
var cache = new _1.GenerationBasedCache(CACHE_SIZE, CACHE_GENERATIONS);
var SIZE = 13 * CACHE_SIZE; // fill all generations before cleaning
// 1. simple check
for (var i = 0; i < SIZE; i++) {
    cache.set("key" + i, "value" + i);
    var isFound = cache.has("key" + i);
    assert_1.default(isFound);
    var value = cache.get("key" + i);
    assert_1.default.equal(value, "value" + i);
    var isDeleted = cache.delete("key" + i);
    assert_1.default(isDeleted);
}
// 2.1 fill ip
for (var i = 0; i < SIZE; i++) {
    cache.set("key" + i, "value" + i);
}
// 2.2 print
// tslint:disable-next-line:no-console
console.log(cache);
// 2.3 check cache
for (var i = 0; i < SIZE; i++) {
    var isFound = cache.has("key" + i);
    assert_1.default(i >= (SIZE - CACHE_SIZE) ? isFound : !isFound);
}
//# sourceMappingURL=example.js.map