/**
 * Spike: does the real React 19 runtime (vendored as @toil/*) run on Roblox
 * Luau when compiled by roblox-ts?
 *
 * We render a Counter component through react-reconciler onto a tiny
 * table-based host tree, click the button once, and check that
 *  - the initial tree renders,
 *  - the state update re-renders the label to "1",
 *  - the passive effect ran twice (mount + update).
 *
 * roblox-ts flavor notes (what changed from idiomatic TS):
 *  - `#x` (length) is written `x.size()`; roblox-ts emits it as `#x`.
 *  - `Array<T>` is 0-based in TS; roblox-ts emits 1-based Lua tables and
 *    shifts the indexing for us. Appends use `arr[arr.size()] = v` or `.push`.
 *  - `new Error(msg)` is the Luau builtin `error(msg)` (no global Error class).
 *  - `String(x)` is `tostring(x)`.
 *  - The reconciler module is a FACTORY: it takes a host config and returns
 *    the renderer instance.
 */

import { drainTasks, log, taskLog } from "./polyfills";
import * as React from "@toil/react";
import { useEffect, useState } from "@toil/react";
import ReactReconciler from "@toil/react-reconciler";

type HostNodeKind = "root" | "host" | "text";

interface HostNode {
	kind: HostNodeKind;
	nodeType: string;
	props: Record<string, unknown>;
	text: string;
	children: Array<HostNode>;
	parent: HostNode | undefined;
}

function makeNode(kind: HostNodeKind, nodeType: string): HostNode {
	return { kind: kind, nodeType: nodeType, props: {}, text: "", children: [], parent: undefined };
}

/** Remove `child` from whatever parent currently holds it. */
function detach(child: HostNode): void {
	const parent = child.parent;
	if (parent === undefined) {
		return;
	}
	const idx = parent.children.indexOf(child);
	if (idx >= 0) {
		parent.children.remove(idx);
	}
	child.parent = undefined;
}

/**
 * Place `child` into `parent.children`, before `before` (or at the end when
 * `before` is undefined). Re-parents the child.
 */
function insert(parent: HostNode, child: HostNode, before: HostNode | undefined): void {
	detach(child);
	let idx: number;
	if (before === undefined) {
		idx = parent.children.size();
	} else {
		const bi = parent.children.indexOf(before);
		idx = bi >= 0 ? bi : parent.children.size();
	}
	parent.children.insert(idx, child);
	child.parent = parent;
}

function isRefCallback(value: unknown): value is (node: HostNode) => void {
	return typeIs(value, "function");
}

function applyProps(instance: HostNode, props: Record<string, unknown>): void {
	instance.props = props;
	const ref = props["ref"];
	if (isRefCallback(ref)) {
		ref(instance);
	}
}

function getTextContentImpl(node: HostNode): string {
	if (node.kind === "text") {
		return node.text;
	}
	let out = "";
	const kids = node.children;
	for (let i = 0; i < kids.size(); i++) {
		out += getTextContentImpl(kids[i]);
	}
	return out;
}

/** The host config handed to the reconciler factory, fully typed. */
interface SpikeHostConfig
	extends ReactReconciler.HostConfig<
		string, // Type
		Record<string, unknown>, // Props
		HostNode, // Container
		HostNode, // Instance
		HostNode, // TextInstance
		HostNode, // SuspenseInstance
		HostNode, // HydratableInstance
		HostNode, // FormInstance
		HostNode, // PublicInstance
		unknown, // HostContext
		unknown, // ChildSet
		number, // TimeoutHandle
		number, // NoTimeout
		number // TransitionStatus
	> {}

/**
 * Minimal host-transition context to satisfy the reconciler's HostConfig.
 * Not exercised by the counter spike, so a self-referential stub suffices.
 */
const hostTransitionContext: ReactReconciler.ReactContext<number> = {
	$$typeof: 0,
	Consumer: undefined as unknown as ReactReconciler.ReactContext<number>,
	Provider: {
		$$typeof: 0,
		_context: undefined as unknown as ReactReconciler.ReactContext<number>,
	},
	_currentValue: 0,
	_currentValue2: 0,
	_threadCount: 0,
};
hostTransitionContext.Consumer = hostTransitionContext;
hostTransitionContext.Provider._context = hostTransitionContext;

const hostConfig: SpikeHostConfig = {
	// --- modes
	supportsMutation: true,
	supportsPersistence: false,
	supportsHydration: false,
	isPrimaryRenderer: true,

	// --- core
	createInstance: (nodeType: string): HostNode => {
		return makeNode("host", nodeType);
	},
	createTextInstance: (text: string): HostNode => {
		const node = makeNode("text", "#text");
		node.text = text;
		return node;
	},
	appendInitialChild: (parentInstance: HostNode, child: HostNode): void => {
		insert(parentInstance, child, undefined);
	},
	finalizeInitialChildren: (instance: HostNode, _type: string, props: Record<string, unknown>): boolean => {
		applyProps(instance, props);
		return false;
	},
	shouldSetTextContent: (nodeType: string): boolean => {
		return nodeType === "#text";
	},
	getRootHostContext: (): unknown => {
		return {};
	},
	getChildHostContext: (parentHostContext: unknown): unknown => {
		return parentHostContext;
	},
	getPublicInstance: (instance: HostNode): HostNode => {
		return instance;
	},
	prepareForCommit: (): Record<string, unknown> | undefined => {
		return undefined;
	},
	resetAfterCommit: (): void => {
		// Nothing to reset.
	},
	preparePortalMount: (): void => {
		// No portals in the spike.
	},
	scheduleTimeout: (fn: (delay?: number) => void, delay?: number): number => {
		// React only calls these for Suspense/timeouts; run synchronously.
		fn(delay);
		return 0;
	},
	cancelTimeout: (_id: number): void => {
		// No-op.
	},
	noTimeout: -1,

	// --- ref / scope / instance plumbing
	getInstanceFromNode: (_node: unknown): undefined => {
		return undefined;
	},
	beforeActiveInstanceBlur: (): void => {
		// No-op.
	},
	afterActiveInstanceBlur: (): void => {
		// No-op.
	},
	prepareScopeUpdate: (_scopeInstance: unknown, _instance: unknown): void => {
		// No Offscreen scopes in the spike.
	},
	getInstanceFromScope: (_scopeInstance: unknown): undefined => {
		return undefined;
	},
	detachDeletedInstance: (_node: HostNode): void => {
		// GC handles the subtree.
	},

	// --- mutation
	appendChild: (parentInstance: HostNode, child: HostNode): void => {
		insert(parentInstance, child, undefined);
	},
	appendChildToContainer: (container: HostNode, child: HostNode): void => {
		insert(container, child, undefined);
	},
	insertBefore: (parentInstance: HostNode, child: HostNode, beforeChild: HostNode): void => {
		insert(parentInstance, child, beforeChild);
	},
	insertInContainerBefore: (container: HostNode, child: HostNode, beforeChild: HostNode): void => {
		insert(container, child, beforeChild);
	},
	removeChild: (_parentInstance: HostNode, child: HostNode): void => {
		detach(child);
	},
	removeChildFromContainer: (_container: HostNode, child: HostNode): void => {
		detach(child);
	},
	resetTextContent: (instance: HostNode): void => {
		instance.text = "";
	},
	commitTextUpdate: (textInstance: HostNode, _oldText: string, newText: string): void => {
		textInstance.text = newText;
	},
	commitMount: (instance: HostNode, _type: string, props: Record<string, unknown>): void => {
		applyProps(instance, props);
	},
	commitUpdate: (
		instance: HostNode,
		_type: string,
		_prevProps: Record<string, unknown>,
		nextProps: Record<string, unknown>
	): void => {
		applyProps(instance, nextProps);
	},
	hideInstance: (instance: HostNode): void => {
		instance.props["hidden"] = true;
	},
	unhideInstance: (instance: HostNode): void => {
		instance.props["hidden"] = false;
	},
	clearContainer: (container: HostNode): void => {
		const kids = container.children;
		for (let i = kids.size() - 1; i >= 0; i--) {
			detach(kids[i]);
		}
	},

	// --- transitions / update priority / forms
	NotPendingTransition: undefined,
	HostTransitionContext: hostTransitionContext,
	setCurrentUpdatePriority: (_newPriority: number): void => {
		// No-op.
	},
	getCurrentUpdatePriority: (): number => {
		return 1;
	},
	resolveUpdatePriority: (): number => {
		return 1;
	},
	resetFormInstance: (_form: HostNode): void => {
		// No forms in the spike.
	},
	requestPostPaintCallback: (_callback: (time: number) => void): void => {
		// No-op.
	},
	shouldAttemptEagerTransition: (): boolean => {
		return false;
	},
	trackSchedulerEvent: (): void => {
		// No-op.
	},
	resolveEventType: (): undefined => {
		return undefined;
	},
	resolveEventTimeStamp: (): number => {
		return 0;
	},

	// --- suspense-commit (none in the spike)
	maySuspendCommit: (_type: string): boolean => {
		return false;
	},
	preloadInstance: (_instance: unknown, _type: string, _props: Record<string, unknown>): boolean => {
		return false;
	},
	startSuspendingCommit: (): void => {
		// No suspense in the spike.
	},
	suspendInstance: (_instance: HostNode, _priority: number): void => {
		// No suspense in the spike.
	},
	waitForCommitToBeReady: (): undefined => {
		return undefined;
	},
};

function summarize(node: HostNode): string {
	if (node.kind === "text") {
		return '"' + node.text + '"';
	}
	if (node.children.size() === 0) {
		return node.nodeType;
	}
	let out = node.nodeType + "[";
	const kids = node.children;
	for (let i = 0; i < kids.size(); i++) {
		out += summarize(kids[i]);
	}
	return out + "]";
}

function findNode(node: HostNode, nodeType: string): HostNode | undefined {
	if (node.nodeType === nodeType) {
		return node;
	}
	const kids = node.children;
	for (let i = 0; i < kids.size(); i++) {
		const hit = findNode(kids[i], nodeType);
		if (hit !== undefined) {
			return hit;
		}
	}
	return undefined;
}

function isBumpHandler(value: unknown): value is (event: unknown) => void {
	return typeIs(value, "function");
}

function Counter(props: { start: number }): React.JSX.Element {
	// The runtime returns hook tuples as plain 1-based tables, which is
	// exactly what roblox-ts tuple destructuring reads (it shifts the TS
	// indices [0]/[1] to Luau's [1]/[2]).
	const [count, setCount] = useState<number>(props.start);
	useEffect((): (() => void) => {
		log("effect:count=" + tostring(count));
		return (): void => {
			// No cleanup work.
		};
	}, __arrNew(count));
	return (
		<panel>
			<caption>Count: </caption>
			<counterButton label={tostring(count)} onBump={() => setCount(count + 1)} />
		</panel>
	);
}

// ---------------------------------------------------------------- main

const container = makeNode("root", "#container");

// The module is a factory: give it the host config, get the renderer.
const reconciler = ReactReconciler(hostConfig);

// createContainer(containerInfo, tag, hydrationCallbacks, isStrictMode,
//   concurrentUpdatesByDefaultOverride, identifierPrefix,
//   onUncaughtError, onCaughtError, onRecoverableError,
//   onDefaultTransitionIndicator)
const root = reconciler.createContainer(
	container,
	0,
	undefined,
	false,
	undefined,
	"",
	(errorValue: unknown, _info: unknown): void => {
		log("uncaught:" + tostring(errorValue));
	},
	(errorValue: unknown, _info: unknown): void => {
		log("caught:" + tostring(errorValue));
	},
	(errorValue: unknown, _info: unknown): void => {
		log("recoverable:" + tostring(errorValue));
	},
	(): void => {
		log("default-indicator");
	}
);

const _taskLogStart = taskLog.size();
reconciler.updateContainer(<Counter start={0} />, root, undefined, undefined);
drainTasks();
log("initial:" + summarize(container));

const button = findNode(container, "counterButton");
if (button === undefined) {
	error("button not found in rendered tree");
}

const onBump = button.props["onBump"];
if (!isBumpHandler(onBump)) {
	error("onBump handler missing on button");
}
onBump({});
drainTasks();

const afterLabel = tostring(button.props["label"]);
log("after-click:" + summarize(container));
log("clicks-visible-label:" + afterLabel);

const effects: Array<string> = [];
for (let i = _taskLogStart; i < taskLog.size(); i++) {
	const entry = taskLog[i];
	if (string.sub(entry, 1, 7) === "effect:") {
		effects.push(entry);
	}
}
log("effects:" + effects.join("|"));

if (afterLabel !== "1") {
	error("expected button label 1 after click, got: " + afterLabel);
}
if (effects.size() !== 2) {
	error("expected 2 effect runs, got: " + tostring(effects.size()));
}
log("SPIKE-OK");