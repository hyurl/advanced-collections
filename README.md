# Advanced-Collections

**Advanced collections like BiMap, SortedMap and SortedSet.**

## API declarations

```typescript
export declare namespace utils {
    const keys: symbol;
    const values: symbol;
    function inherit<T, S>(ctor: T, base: S): S & T;
    function labelize(value: any): string;
    function findInsertIndex<T>(item: T, container: T[], comparator: (a: T, b: T) => number): number;
    function fixToStringTag<T>(ctor: T): T;
    function throwNotEntryError(item: any): never;
    function throwNotIterableError(input: any): never;
}

export declare abstract class BaseMap<K, V> extends Map<K, V> {
    protected [utils.keys]: K[];
    protected [utils.values]: V[];
    constructor(iterable: Iterable<K, V>, props?: any);
    protected removeByIndex(index: number): boolean;
    abstract set(key: K, value: V): this;
}

export declare class BiMap<K = any, V = any> extends BaseMap<K, V> {
    constructor(iterable?: Iterable<[K, V]>);
    getKey(value: V): K;
    hasValue(value: V): boolean;
    deleteValue(value: V): boolean;
    inverse(): BiMap<V, K>;
    forEach(callback: (value: V, key: K, map: BiMap<K, V>) => void, thisArg?: any): void;
}

export declare class SortedMap<K = any, V = any> extends BaseMap<K, V> {
    protected comparator: (a: K, b: K) => number;
    constructor(comparator?: (a: K, b: K) => number);
    constructor(iterable: Iterable<[K, V]>, comparator?: (a: K, b: k) => number);
    reverse(): SortedMap<K, V>;
    forEach(callback: (value: V, key: K, map: SortedMap<K, V>) => void, thisArg?: any): void;
}

export declare class SortedSet<T = any> extends Set<T> {
    protected [utils.values]: T[];
    protected comparator: (a: T, b: T) => number;
    constructor(comparator?: (a: T, b: T) => number);
    constructor(iterable: Iterable<T>, comparator?: (a: T, b: T) => number);
    reverse(): SortedSet<T>;
    forEach(callback: (value: T, value2: T, set: SortedSet<T>) => void, thisArg?: any): void;
}
```