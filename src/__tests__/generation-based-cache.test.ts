import { GenerationBasedCache } from "../generation-based-cache"

it("simple #1", () => {

    const cache = new GenerationBasedCache();

    for (let i = 0; i < 100; i++) {
        expect(cache.has(`key${i}`)).toBeFalsy();
        cache.set(`key${i}`, `value${i}`);
        expect(cache.has(`key${i}`)).toBeTruthy();
    }
})


it("simple #2", () => {

    const cache = new GenerationBasedCache(60, 3);

    for (let i = 0; i < 100; i++) {
        cache.set(`key${i}`, `value${i}`);
        expect(cache.has(`key${i}`)).toBeTruthy();
    }

    for (let i = 0; i < 100; i++) {
        if (i < 30) {
            expect(cache.has(`key${i}`)).toBeFalsy();
        }
        if (i > 50) {
            expect(cache.has(`key${i}`)).toBeTruthy();
        }
    }

})
