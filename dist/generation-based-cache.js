"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenerationBasedCache = /** @class */ (function () {
    function GenerationBasedCache(size, gens) {
        if (size === void 0) { size = 500; }
        if (gens === void 0) { gens = 3; }
        this.gens = gens;
        this.caches = new Array(gens).fill(null).map(function () { return new Map(); });
        this.maxGenSize = Math.ceil(size / gens);
    }
    GenerationBasedCache.prototype.clear = function () {
        this.caches.forEach(function (cache) { return cache.clear(); });
    };
    GenerationBasedCache.prototype.has = function (key) {
        return this.caches.some(function (cache) { return cache.has(key); });
    };
    GenerationBasedCache.prototype.set = function (key, value) {
        this.delete(key);
        if (this.caches[0].size >= this.maxGenSize) {
            this.clean();
        }
        this.caches[0].set(key, value);
    };
    GenerationBasedCache.prototype.get = function (key) {
        for (var i = 0; i < this.gens; i++) {
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