import { ICache } from "./cache.interface";

export class GenerationBasedCache<K, V> implements ICache<K, V> {

    private readonly caches: Map<K, V>[];
    private readonly maxGenSize: number;

    constructor(size: number = 500, private readonly gen: number = 3) {
        this.caches = new Array(gen).fill(null).map(() => new Map());
        this.maxGenSize = Math.ceil(size / gen);
    }

    clear(): void {
        this.caches.forEach(cache => cache.clear());
    }

    has(key: K): boolean {
        return this.caches.some(cache => cache.has(key));
    }

    set(key: K, value: V): void {
        this.delete(key);
        this.caches[0].set(key, value);
        if (this.caches[0].size > this.maxGenSize) {
            this.clean();
        }
    }

    get(key: K): V | undefined {
        for (let i = 0; i < this.gen; i++) {
            if (this.caches[i].has(key)) {
                const value = this.caches[i].get(key) as V;
                if (i > 0) {
                    this.caches[i - 1].set(key, value);
                    this.caches[i].delete(key);
                }
                return value;
            }
        }
    }

    delete(key: K): boolean {
        return this.caches.map(cache => cache.delete(key)).some(result => !!result);
    }

    clean() {
        this.caches.unshift(new Map());
        this.caches.pop();
    }

}
