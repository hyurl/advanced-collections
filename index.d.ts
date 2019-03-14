export declare abstract class BaseMap extends Map<K, V> {
    protected removeIndexOf(index: number): boolean;
    abstract set(key: K, value: V): this;
}

export declare class BiMap<K = any, V = any> extends BaseMap<K, V> {
    getKey(value: V): K;
    hasValue(value: V): boolean;
    deleteValue(value: V): boolean;
    inverse(): BiMap<V, K>;
    forEach(callback: (value: V, key: K, map: BiMap<K, V>) => void, thisArg?: any): void;
}

export declare class SortedMap<K, V> extends BaseMap<K, V> {
    constructor(comparator: (a: K, b: K) => -1 | 0 | 1);
    constructor(iterable: Iterable<[K, V]>, comparator: (a: K, b: k) => -1 | 0 | 1);
    reverse(): Map<K, V>;
    forEach(callback: (value: V, key: K, map: SortedMap<K, V>) => void, thisArg?: any): void;
}

export declare class SortedSet<T> extends Set<T> {
    constructor(comparator: (a: Iterable<T>, b: Iterable<T>) => -1 | 0 | 1);
    constructor(iterable: Iterable<T>, comparator: (a: T, b: T) => -1 | 0 | 1);
    reverse(): Set<T>;
    forEach(callback: (value: T, value2: T, set: SortedSet<T>) => void, thisArg?: any): void;
}