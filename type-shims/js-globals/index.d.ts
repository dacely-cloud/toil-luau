/**
 * JS-global declarations for the vendored React 19 CJS (allowJs, noLib).
 *
 * roblox-ts compiles JS with the TS type program: every global identifier a
 * JS file references must have a symbol (or the compiler asserts), and the
 * type should be real (not `any`, or every use emits a noAny diagnostic).
 *
 * Deliberately NOT declared here (already provided by @rbxts):
 *   Array, Map, Set, WeakMap, WeakSet, Promise, Symbol  (compiler-types,
 *   with the matching roblox-ts macros) and all Luau/Roblox globals
 *   (lua.d.ts / roblox.d.ts).
 *
 * The runtime VALUES for these globals are installed by src/polyfills.ts,
 * which the app requires before any @toil/* module loads.
 */

declare const console: {
	log(...args: Array<unknown>): void;
	warn(...args: Array<unknown>): void;
	error(...args: Array<unknown>): void;
	info(...args: Array<unknown>): void;
	debug(...args: Array<unknown>): void;
	trace(...args: Array<unknown>): void;
	group(...args: Array<unknown>): void;
	groupEnd(...args: Array<unknown>): void;
	time(...args: Array<unknown>): void;
	timeEnd(...args: Array<unknown>): void;
};

declare const process: {
	env: {
		NODE_ENV: string;
	};
};

declare const performance: {
	now(): number;
};

declare const queueMicrotask: (fn: () => void) => void;
declare const setTimeout: (fn: () => void, ms?: number) => number;
declare const clearTimeout: (id?: number) => void;
declare const setImmediate: (fn: () => void) => number;
declare const clearImmediate: (id?: number) => void;

/** A function (so `typeof Object === "function"` holds), carrying the statics. */
declare const Object: {
	(...args: Array<unknown>): unknown;
	assign(target: unknown, ...sources: Array<unknown>): unknown;
	keys(o: unknown): Array<string>;
	values(o: unknown): Array<unknown>;
	entries(o: unknown): Array<[string, unknown]>;
	defineProperty(o: unknown, key: string, descriptor: unknown): unknown;
	defineProperties(o: unknown, descriptors: unknown): unknown;
	freeze(o: unknown): unknown;
	seal(o: unknown): unknown;
	preventExtensions(o: unknown): unknown;
	is(a: unknown, b: unknown): boolean;
	hasOwnProperty(o: unknown, key: string): boolean;
	getOwnPropertyDescriptor(o: unknown, key: string): unknown;
	getPrototypeOf(o: unknown): unknown;
	create(o: unknown, props?: unknown): unknown;
	/** The vendor transform renames `.prototype` to `.__proto`. */
	__proto: {
		hasOwnProperty(obj: unknown, key: string): boolean;
		toString(value: unknown): string;
	};
};

declare const String: {
	(...args: Array<unknown>): string;
	fromCharCode(...codes: Array<number>): string;
	__proto: unknown;
};
declare const Number: {
	(...args: Array<unknown>): number;
	isNaN(v: unknown): boolean;
	isFinite(v: unknown): boolean;
	parseInt(s: string, base?: number): number;
	parseFloat(s: string): number;
	__proto: unknown;
};
declare const Boolean: {
	(...args: Array<unknown>): boolean;
	__proto: unknown;
};
declare const RegExp: {
	(pattern: string, flags?: string): unknown;
	__proto: unknown;
};
declare const JSON: {
	stringify(v: unknown): string;
	parse(s: string): unknown;
};
declare const Math: {
	random(): number;
	floor(v: number): number;
	ceil(v: number): number;
	round(v: number): number;
	abs(v: number): number;
	max(...values: Array<number>): number;
	min(...values: Array<number>): number;
	pow(base: number, exp: number): number;
	sqrt(v: number): number;
	sign(v: number): number;
	trunc(v: number): number;
	clz32(v: number): number;
	imul(a: number, b: number): number;
	PI: number;
};
declare const Date: {
	now(): number;
	__proto: unknown;
};

declare const Reflect: {
	construct(target: unknown, args: Array<unknown>): unknown;
	apply(fn: unknown, thisArg: unknown, args: Array<unknown>): unknown;
};

/** Browser global; absent in the Luau runtime (guards short-circuit). */
declare const window: unknown;
declare const globalThis: Record<string, unknown>;
declare const __REACT_DEVTOOLS_GLOBAL_HOOK__: unknown;

/**
 * JS globals the vendored React 19 CJS references that are neither Luau/Roblox builtins nor
 * provided by @rbxts. roblox-ts asserts (NO SYMBOL) on any free identifier without a global
 * symbol, so each must be declared here. Runtime values come from src/polyfills.ts.
 */
declare const Error: {
	(...args: Array<unknown>): unknown;
	prototype: unknown;
	name: string;
	message: string;
	(stack?: string): void;
};
declare const Function: {
	(...args: Array<unknown>): unknown;
	prototype: unknown;
	bind(thisArg: unknown, ...args: Array<unknown>): unknown;
};
/** CJS module object; roblox-ts rewrites member accesses to a local, but the id needs a symbol. */
declare const module: {
	id: string;
	uri: string;
	exports: Record<string, unknown>;
};
declare const exports: Record<string, unknown> & {
	__esModule: boolean;
	default: unknown;
};
declare const MessageChannel: {
	new (): {
		port1: {
			onmessage: ((event: { data: unknown }) => void) | null;
			close(): void;
		};
		port2: {
			postMessage(message: unknown): void;
			close(): void;
		};
	};
};
declare const AbortController: {
	new (): {
		signal: { aborted: boolean; onabort: unknown };
		abort(reason?: unknown): void;
	};
};
declare const AggregateError: {
	(errors: Array<unknown>, message?: string): unknown;
	prototype: unknown;
};
declare const reportError: (error: unknown) => void;
declare const IS_REACT_ACT_ENVIRONMENT: boolean;
declare const Proxy: unknown;
declare const self: unknown;
declare const document: unknown;
declare const BigInt: (value: unknown) => unknown;
declare const WeakRef: {
	new (target: unknown): { deref(): unknown };
};
declare const Atomics: Record<string, unknown>;
declare const SharedArrayBuffer: {
	new (byteLength: number): unknown;
};

declare const isNaN: (v: unknown) => boolean;
declare const isFinite: (v: unknown) => boolean;
declare const parseInt: (s: string, base?: number) => number;
declare const parseFloat: (s: string) => number;
declare const encodeURIComponent: (s: string) => string;
declare const decodeURIComponent: (s: string) => string;
declare const Infinity: number;
declare const NaN: number;

/**
 * Luau builtin globals the engine (src/css/engine.ts) uses directly. They are
 * real in the Luau VM; declared here only so roblox-ts resolves the symbols.
 * `next` iterates a table's keys (the Luau replacement for Object.keys).
 */
declare const next: (t: Record<string, unknown>, key?: string) => string;
declare const table: {
	insert(t: Array<unknown>, pos: number, value: unknown): unknown;
	remove(t: Array<unknown>, pos?: number): unknown;
};

/**
 * Helpers installed by src/polyfills.ts that the vendor transform rewrites
 * JS syntax into (the transform layer in scripts/tame-vendor.mjs).
 */
declare const typeOfJS: (value: unknown) => string;
declare const isArray: (value: unknown) => boolean;
declare const __len: (value: unknown) => number;
declare const __str: (value: unknown) => string;
declare const __num: (value: unknown) => number;
declare const __objIs: (a: unknown, b: unknown) => boolean;
declare const __arrFrom: (value: unknown) => Array<unknown>;
declare const __splice: (arr: Array<unknown>, start: number, count: number, ...items: Array<unknown>) => Array<unknown>;
declare const __slice: (arr: Array<unknown>, start?: number, end?: number) => Array<unknown>;
declare const __map: <T, U>(arr: Array<T>, fn: (value: T, index: number) => U) => Array<U>;
declare const __concat: (arr: Array<unknown>, other: unknown) => Array<unknown>;
declare const __strSplit: (s: string, sep: string) => Array<string>;
declare const __strReplace: (s: string, from: unknown, to: unknown) => string;
declare const __strTrim: (s: string) => string;
declare const __strLower: (s: string) => string;
declare const __strMatch: (s: string, pattern: unknown) => Array<string> | undefined;
declare const __numToBase: (n: number, radix: number) => string;
declare const __re: (pattern: string, flags?: string) => { pattern: string; flags: string };
declare const __partial: (fn: (...args: Array<unknown>) => unknown, ...args: Array<unknown>) => (...rest: Array<unknown>) => unknown;
declare const __callFn: (fn: unknown, thisArg: unknown, ...args: Array<unknown>) => unknown;
declare const __applyFn: (fn: unknown, thisArg: unknown, args: Array<unknown>) => unknown;
declare const __fwd: (fn: unknown) => (...args: Array<unknown>) => unknown;

/**
 * The remaining `__*` helpers emitted by the tame transform (scripts/tame-vendor.mjs).
 * Every free `__<name>` identifier the vendor CJS references must resolve to a global symbol or
 * roblox-ts asserts in transformIdentifier; the runtime values are installed by src/polyfills.ts.
 * Signatures are loose on purpose (vendor code is checkJs: false) but never `any`.
 */
declare const __cat: (a: unknown, b: unknown) => unknown;
/** 0-based element access on the tamer's unified argument list (`arguments[e]`). */
declare const __argAt: (args: Array<unknown>, index: number) => unknown;
declare const __in: (key: unknown, obj: unknown) => boolean;
declare const __lenSet: (value: unknown, length: number) => number;
declare const __push: (arr: Array<unknown>, item: unknown) => number;
declare const __pop: (arr: Array<unknown>) => unknown;
declare const __new: (ctor: unknown, ...args: Array<unknown>) => unknown;
declare const __protoOf: (ctor: unknown) => Record<string, unknown>;
declare const __protoSet: (ctor: unknown, proto: unknown) => unknown;
declare const __forEach: (arr: Array<unknown>, fn: (value: unknown, index: number) => void) => void;
declare const __join: (arr: Array<unknown>, sep?: string) => string;
declare const __repeat: (s: string, count: number) => string;
declare const __indexOf: (arr: Array<unknown>, item: unknown, from?: number) => number;
declare const __includes: (value: unknown, item: unknown) => boolean;
declare const __replace: (value: unknown, from: unknown, to: unknown) => unknown;
declare const __toLowerCase: (s: string) => string;
declare const __toUpperCase: (s: string) => string;
declare const __split: (s: string, sep: string) => Array<string>;
declare const __trim: (s: string) => string;
declare const __match: (s: string, pattern: unknown) => Array<string> | undefined;
declare const __filter: (arr: Array<unknown>, fn: (value: unknown, index: number) => unknown) => Array<unknown>;
declare const __charCodeAt: (s: string, index: number) => number;
declare const __charAt: (s: string, index: number) => string;
declare const __startsWith: (s: string, prefix: string) => boolean;
declare const __endsWith: (s: string, suffix: string) => boolean;
declare const __sort: (arr: Array<unknown>, cmp?: (a: unknown, b: unknown) => number) => Array<unknown>;
declare const __reverse: (arr: Array<unknown>) => Array<unknown>;
declare const __fill: (arr: Array<unknown>, value: unknown, start?: number, end?: number) => Array<unknown>;
declare const __flat: (arr: Array<unknown>) => Array<unknown>;
declare const __flatMap: (arr: Array<unknown>, fn: (value: unknown, index: number) => unknown) => Array<unknown>;
declare const __find: (arr: Array<unknown>, fn: (value: unknown, index: number) => unknown) => unknown;
declare const __findIndex: (arr: Array<unknown>, fn: (value: unknown, index: number) => unknown) => number;
declare const __every: (arr: Array<unknown>, fn: (value: unknown, index: number) => unknown) => boolean;
declare const __some: (arr: Array<unknown>, fn: (value: unknown, index: number) => unknown) => boolean;
declare const __at: (arr: Array<unknown>, index: number) => unknown;
declare const __substring: (s: string, start: number, end?: number) => string;
declare const __search: (s: string, pattern: unknown) => number;
declare const __unshift: (arr: Array<unknown>, ...items: Array<unknown>) => number;
/** Build a marked JS array (the vendor transform turns every `[...]` literal into this). */
declare const __arrNew: (...items: Array<unknown>) => Array<unknown>;
// Spike runtime store: convention-tolerant assignment of factory-scope
// values onto the __ST table (functions accept a leading receiver argument).
declare const __spikeSetST: (st: object, name: string, value: unknown) => unknown;
