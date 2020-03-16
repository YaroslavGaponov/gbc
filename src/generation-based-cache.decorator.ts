import { GenerationBasedCache } from ".";

export function Cache(size: number, gens: number) {
    return (target: any, propertyKey: string | symbol): void => {
        target[propertyKey] = new GenerationBasedCache(size, gens);
    }
}
