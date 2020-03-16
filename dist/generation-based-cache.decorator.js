"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
function Cache(size, gens) {
    return function (target, propertyKey) {
        target[propertyKey] = new _1.GenerationBasedCache(size, gens);
    };
}
exports.Cache = Cache;
//# sourceMappingURL=generation-based-cache.decorator.js.map