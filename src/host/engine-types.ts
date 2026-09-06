/**
 * Public type surface of the CSS engine (src/css/engine.ts), written in
 * parallel. The host depends only on this surface: when the real engine is
 * present, src/host/index.ts passes the engine created by the real
 * `createEngine(rules)` through this interface; while it is being written,
 * these declarations are the contract.
 *
 * Computed style values are CANONICAL STRINGS ("2px", "#ff0004", "0.5",
 * "flex", "ease-in-out", "infinite"). Keys with the "tr:" prefix hold
 * transform tokens; the "anim:" key holds a parsed animation spec string.
 * The host must not couple to those internals beyond reading the values.
 */

/** A single parsed CSS rule, as handed to the engine. */
export interface StyleRule {
	selector: string;
	declarations?: Record<string, string>;
	media?: string;
	/**
	 * @keyframes set: either the raw keyframes body string (offsets as keys,
	 * "prop: value" as values) or pre-parsed frames.
	 */
	keyframes?: string | Array<KeyframeFrame>;
	importFrom?: string;
}

/** One keyframe frame: property -> canonical value string. */
export interface KeyframeFrame {
	offset: number;
	styles: Record<string, string>;
}

/** A named @keyframes set: frames in offset order. */
export interface KeyframeSet {
	name: string;
	frames: Array<KeyframeFrame>;
}

/** One parsed animation declaration (one of a comma list). */
export interface AnimationSpec {
	name: string;
	duration: number;
	timingFunction: string;
	delay: number;
	iterationCount: number | string;
	direction: string;
	fillMode: string;
	playState: string;
}

/** The engine's evaluation of one animation at time t (seconds). */
export interface AnimationSample {
	styles: Record<string, string>;
}

/** One transition declaration for a single property. */
export interface TransitionSpec {
	property: string;
	duration: number;
	timingFunction: string;
	delay: number;
}

/** Identity of one element for cascade/selector matching. */
export interface ElementIdentity {
	tagName: string;
	id?: string;
	classList: Array<string>;
	attributes: Record<string, string>;
	states: Array<string>;
}

/** The engine handle the host drives. */
export interface Engine {
	/**
	 * Compute the cascade for one element: matched rules + inline style,
	 * resolved to a canonical property table. `siblingIndex`/`siblingCount`
	 * are 0-based positional info for :nth-child selectors.
	 */
	computedStyle: (
		identity: ElementIdentity,
		ancestors: Array<ElementIdentity>,
		siblingIndex: number,
		siblingCount: number,
		inline?: Record<string, string>
	) => Record<string, string>;
	/** Look up a keyframes set by name (undefined if absent). */
	keyframes: (name: string) => KeyframeSet | undefined;
	/** Parse an `animation` shorthand value (one or more comma-separated). */
	parseAnimation: (value: string) => Array<AnimationSpec>;
	/**
	 * Sample one animation's keyframes at time t (seconds into the
	 * animation, before iteration/direction mapping). Returns the
	 * interpolated canonical style values for the animated properties.
	 */
	evaluateAnimation: (anim: AnimationSpec, kf: KeyframeSet, t: number) => AnimationSample;
	/** Parse a `transition` shorthand into per-property specs. */
	parseTransition: (value: string) => Array<TransitionSpec>;
	/** Sample a timing function at progress p in [0, 1]. */
	sampleTiming: (fn: string, p: number) => number;
}
