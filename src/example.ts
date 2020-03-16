import { GenerationBasedCache } from ".";
import assert from "assert";

// 3 generations of 7
const CACHE_SIZE = 21;
const CACHE_GENERATIONS = 3;
const cache = new GenerationBasedCache<string, string>(CACHE_SIZE, CACHE_GENERATIONS);

const SIZE = 13 * CACHE_SIZE; // fill all generations before cleaning

// 1. simple check
for (let i = 0; i < SIZE; i++) {
    cache.set(`key${i}`, `value${i}`);

    const isFound = cache.has(`key${i}`);
    assert(isFound);

    const value = cache.get(`key${i}`);
    assert.equal(value, `value${i}`);

    const isDeleted = cache.delete(`key${i}`);
    assert(isDeleted);
}


// 2.1 fill ip
for (let i = 0; i < SIZE; i++) {
    cache.set(`key${i}`, `value${i}`);
}

// 2.2 print
// tslint:disable-next-line:no-console
console.log(cache);

// 2.3 check cache
for (let i = 0; i < SIZE; i++) {
    const isFound = cache.has(`key${i}`);
    assert(i >= (SIZE - CACHE_SIZE) ? isFound : !isFound);

}

