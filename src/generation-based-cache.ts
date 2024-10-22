import { ICache } from "./cache.interface";

export class GenerationBasedCache<K, V> implements ICache<K, V> {

    private readonly caches: Map<K, V>[];
    private readonly maxGenSize: number;

    constructor(size: number = 500, private readonly gens = 3) {
        this.caches = new Array(gens).fill(null).map(() => new Map());
        this.maxGenSize = Math.ceil(size / gens);
    }

    clear(): void {
        this.caches.forEach(cache => cache.clear());
    }

    has(key: K): boolean {
        return this.caches.some(cache => cache.has(key));
    }

    set(key: K, value: V): void {
        this.delete(key);
        if (this.caches[0].size >= this.maxGenSize) {
            this.clean();
        }
        this.caches[0].set(key, value);
    }

    get(key: K): V | undefined {
        for (let i = 0; i < this.gens; i++) {
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
