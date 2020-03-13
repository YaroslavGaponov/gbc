"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generation_based_cache_1 = require("../generation-based-cache");
it("simple #1", function () {
    var cache = new generation_based_cache_1.GenerationBasedCache();
    for (var i = 0; i < 100; i++) {
        expect(cache.has("key" + i)).toBeFalsy();
        cache.set("key" + i, "value" + i);
        expect(cache.has("key" + i)).toBeTruthy();
    }
});
it("simple #2", function () {
    var cache = new generation_based_cache_1.GenerationBasedCache(60, 3);
    for (var i = 0; i < 100; i++) {
        cache.set("key" + i, "value" + i);
        expect(cache.has("key" + i)).toBeTruthy();
    }
    for (var i = 0; i < 100; i++) {
        if (i < 30) {
            expect(cache.has("key" + i)).toBeFalsy();
        }
        if (i > 50) {
            expect(cache.has("key" + i)).toBeTruthy();
        }
    }
});
//# sourceMappingURL=generation-based-cache.test.js.map