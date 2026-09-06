/**
 * Types for the vendored @toil/scheduler package (React 19's scheduler).
 *
 * The React 19.2 scheduler ships its public surface under `unstable_*` names;
 * the reconciler reads `Scheduler.unstable_scheduleCallback`,
 * `Scheduler.unstable_now`, etc. Declared as plain function/const exports
 * (function declarations are non-methods in roblox-ts, so call sites compile
 * to dot calls, matching the plain-function CJS implementations).
 */
/** Schedules a callback at the given priority. Returns a callback node. */
export function unstable_scheduleCallback(priority: number, callback: (...args: Array<unknown>) => unknown, options?: unknown): unknown;
/** Cancels a scheduled callback. */
export function unstable_cancelCallback(callbackNode: unknown): void;
/** True when the current task should yield (frame slice used up). */
export function unstable_shouldYield(): boolean;
/** Monotonic clock in milliseconds. */
export function unstable_now(): number;
/** Wraps fn to run at NormalPriority. */
export function unstable_next<T>(fn: (...args: Array<unknown>) => T): (...args: Array<unknown>) => T;
/** Runs fn at the given priority. */
export function unstable_runWithPriority(priority: number, fn: (...args: Array<unknown>) => unknown, ...args: Array<unknown>): unknown;
/** Wraps a callback to re-run at its original priority. */
export function unstable_wrapCallback<T>(fn: (...args: Array<unknown>) => T): (...args: Array<unknown>) => T;
/** Request a paint (no-op on most platforms). */
export function unstable_requestPaint(): void;
/** Profiling hooks object. */
export const unstable_Profiling: unknown;
/** Priority level: time-sensitive, input-blocking work. */
export const unstable_ImmediatePriority: number;
/** Priority level: user-perceptible work (input, gestures). */
export const unstable_UserBlockingPriority: number;
/** Priority level: default. */
export const unstable_NormalPriority: number;
/** Priority level: below the fold, non-urgent. */
export const unstable_LowPriority: number;
/** Priority level: background, cancelable. */
export const unstable_IdlePriority: number;