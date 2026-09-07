/**
 * Spike polyfills: run the React 19 runtime (@toil/*) on Roblox Luau.
 *
 * This module must be required before any @toil/* module is loaded, because
 * the runtime reads process / performance at init and schedules work through
 * queueMicrotask / setTimeout / setImmediate.
 *
 * roblox-ts flavor notes:
 *  - A missing global is `nil` in Luau, which roblox-ts maps to `null`
 *    (so absence checks compare to null, not "undefined").
 *  - `#x` is `x.size()`; Array is 0-based in TS (roblox-ts emits 1-based).
 *  - The Luau runtime is single-threaded and the mock never yields, so the
 *    polyfill queues are drained by drainTasks() instead of running
 *    asynchronously.
 */

interface SpikeProcessEnv {
	readonly NODE_ENV: string;
}

interface SpikeProcess {
	readonly env: SpikeProcessEnv;
}

interface SpikeClock {
	now(): number;
}

interface SpikeGlobal {
	__spikeTaskLog?: Array<string>;
	__spikeMicrotasks?: TaskQueue;
	__spikeMacrotasks?: TaskQueue;
	process?: SpikeProcess;
	queueMicrotask?: (fn: () => void) => void;
	setTimeout?: (fn: () => void, ms?: number) => number;
	clearTimeout?: (id?: number) => void;
	setImmediate?: (fn: () => void) => number;
	clearImmediate?: (id?: number) => void;
	performance?: SpikeClock;
}

declare const _G: SpikeGlobal;

type TaskQueue = Array<() => void>;

const microtasks: TaskQueue = [];
const macrotasks: TaskQueue = [];

/** Remove and return the first queued task. O(n), fine for a spike. */
function dequeue(arr: TaskQueue): () => void {
	const fn = arr.shift();
	if (fn === undefined) {
		error("dequeue: task queue is empty");
	}
	return fn;
}

if (_G.process === undefined) {
	_G.process = { env: { NODE_ENV: "development" } };
}

if (_G.queueMicrotask === undefined) {
	_G.queueMicrotask = (fn: () => void): void => {
		microtasks.push(fn);
	};
}

if (_G.setTimeout === undefined) {
	_G.setTimeout = (fn: () => void, _ms?: number): number => {
		macrotasks.push(fn);
		return macrotasks.size();
	};
	_G.clearTimeout = (_id?: number): void => {
		// The mock never cancels; the queue is drained whole.
	};
	_G.setImmediate = (fn: () => void): number => {
		// React's scheduler treats immediates as urgent macrotasks: prepend so
		// they run before later-scheduled work.
		const existing: TaskQueue = [];
		const macs = macrotasks;
		for (let i = 0; i < macs.size(); i++) {
			existing.push(macs[i]);
		}
		macrotasks.clear();
		macrotasks.push(fn);
		for (let i = 0; i < existing.size(); i++) {
			macrotasks.push(existing[i]);
		}
		return macrotasks.size();
	};
	_G.clearImmediate = (_id?: number): void => {
		// The mock never cancels; the queue is drained whole.
	};
}

if (_G.performance === undefined) {
	let ticks = 0;
	_G.performance = {
		now(): number {
			ticks += 1;
			return ticks;
		},
	};
}

/**
 * Run queued micro- and macrotasks until both queues are empty.
 * Microtasks are always drained before the next macrotask, mirroring the
 * event-loop ordering React relies on.
 */
export function drainTasks(): void {
	// The runtime (loaded before this module) owns the real queues: the
	// scheduler captured setImmediate / setTimeout / queueMicrotask from the
	// runtime's globals, so those tasks land in __spike* queues, not in the
	// local arrays above. Microtasks always run before the next macrotask.
	const micro = _G.__spikeMicrotasks ?? [];
	const macro = _G.__spikeMacrotasks ?? [];
	let guard = 0;
	let drained = 0;
	for (;;) {
		if (guard > 2000) {
			error("drainTasks: task queue did not empty within 2000 steps");
		}
		if (micro.size() > 0) {
			const fn = dequeue(micro);
			fn();
			guard += 1;
			drained += 1;
			continue;
		}
		if (macro.size() > 0) {
			const fn = dequeue(macro);
			fn();
			guard += 1;
			drained += 1;
			continue;
		}
		break;
	}
	if (drained > 0) {
		log("drainTasks: drained " + drained + " tasks");
	}
}

export const taskLog: Array<string> = [];

_G.__spikeTaskLog = taskLog;

export function log(msg: string): void {
	taskLog.push(msg);
}