export interface ICache<K, V> {
    clear(): void;
    has(key: K): boolean;
    set(key: K, value: V): void;
    get(key: K): V | undefined;
    delete(key: K): boolean;
}
