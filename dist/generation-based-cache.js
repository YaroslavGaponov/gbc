"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenerationBasedCache = /** @class */ (function () {
    function GenerationBasedCache(size, gen) {
        if (size === void 0) { size = 500; }
        if (gen === void 0) { gen = 3; }
        this.gen = gen;
        this.caches = new Array(gen).fill(null).map(function () { return new Map(); });
        this.maxGenSize = Math.ceil(size / gen);
    }
    GenerationBasedCache.prototype.clear = function () {
        this.caches.forEach(function (cache) { return cache.clear(); });
    };
    GenerationBasedCache.prototype.has = function (key) {
        return this.caches.some(function (cache) { return cache.has(key); });
    };
    GenerationBasedCache.prototype.set = function (key, value) {
        this.delete(key);
        this.caches[0].set(key, value);
        if (this.caches[0].size > this.maxGenSize) {
            this.clean();
        }
    };
    GenerationBasedCache.prototype.get = function (key) {
        for (var i = 0; i < this.gen; i++) {
            if (this.caches[i].has(key)) {
                var value = this.caches[i].get(key);
                if (i > 0) {
                    this.caches[i - 1].set(key, value);
                    this.caches[i].delete(key);
                }
                return value;
            }
        }
    };
    GenerationBasedCache.prototype.delete = function (key) {
        return this.caches.map(function (cache) { return cache.delete(key); }).some(function (result) { return !!result; });
    };
    GenerationBasedCache.prototype.clean = function () {
        this.caches.unshift(new Map());
        this.caches.pop();
    };
    return GenerationBasedCache;
}());
exports.GenerationBasedCache = GenerationBasedCache;
//# sourceMappingURL=generation-based-cache.js.map