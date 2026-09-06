/**
 * Type surface for the vendored @toil/react-reconciler (React 19.2).
 *
 * Mirrors the relevant part of the canonical @types/react-reconciler with one
 * deliberate change: every callable member is declared as a function PROPERTY
 * (arrow type) rather than method syntax.
 *
 * Why: the vendored runtime implements these as plain functions
 * (`exports.createContainer = function (...)`), and roblox-ts emits a COLON
 * (self-passing) call for method-typed properties but a DOT call for function
 * properties. The runtime never receives `self`, so the type surface must say
 * "function property" to keep the emitted calls in dot form. The same rule
 * applies to the host config: the reconciler destructures host-config
 * functions to bare locals and calls them with dot syntax.
 *
 * `any` in the canonical types becomes `unknown` (typescript-law). `null` in
 * positions becomes `undefined` (roblox-ts has no `null` value).
 */
import type { ReactNode } from "react";

type OpaqueRoot = { current: unknown };

type ReactContext<T> = {
	$$typeof: number;
	Consumer: ReactContext<T>;
	Provider: {
		$$typeof: number;
		_context: ReactContext<T>;
	};
	_currentValue: T;
	_currentValue2: T;
	_threadCount: number;
};

interface Reconciler<Container, Instance, TextInstance, SuspenseInstance, FormInstance, PublicInstance> {
	/** Create a root for the given container. `tag` is a RootTag (0/1/2/3). */
	createContainer: (
		containerInfo: Container,
		tag: number,
		hydrationCallbacks?: unknown,
		isStrictMode?: boolean,
		concurrentUpdatesByDefaultOverride?: boolean,
		identifierPrefix?: string,
		onUncaughtError?: (error: unknown, info: unknown) => void,
		onCaughtError?: (error: unknown, info: unknown) => void,
		onRecoverableError?: (error: unknown, info: unknown) => void,
		onDefaultTransitionIndicator?: () => void
	) => OpaqueRoot;

	/** Schedule a render of `element` into the root. */
	updateContainer: (
		element: ReactNode,
		container: OpaqueRoot,
		parentComponent?: unknown,
		callback?: (() => void) | undefined
	) => void;

	/** Synchronous variant of updateContainer. */
	updateContainerSync: (
		element: ReactNode,
		container: OpaqueRoot,
		parentComponent?: unknown,
		callback?: (() => void) | undefined
	) => void;

	/** The public instance at the top of the rendered tree, if any. */
	getPublicRootInstance: (container: OpaqueRoot) => PublicInstance | undefined;

	/** Flush passive effects that are waiting. */
	flushPassiveEffects: () => boolean;

	/** Flush work synchronously. */
	flushSync: <R>(fn?: (() => R) | undefined) => R;

	/** Create a React portal (React 19 portals are renderer-owned). */
	createPortal: (children: ReactNode, containerInfo: unknown, implementation?: unknown, key?: string) => unknown;

	/** Hook for React DevTools. */
	injectIntoDevTools: () => boolean;
}

interface HostConfig<
	Type,
	Props,
	Container,
	Instance,
	TextInstance,
	SuspenseInstance,
	HydratableInstance,
	FormInstance,
	PublicInstance,
	HostContext,
	ChildSet,
	TimeoutHandle,
	NoTimeout,
	TransitionStatus
> {
	// --- modes
	supportsMutation: boolean;
	supportsPersistence: boolean;
	supportsHydration: boolean;
	isPrimaryRenderer: boolean;

	// --- core
	createInstance: (
		type: Type,
		props: Props,
		rootContainerInstance: Container,
		hostContext: HostContext,
		internalInstanceHandle: unknown
	) => Instance;
	createTextInstance: (
		text: string,
		type: Type,
		props: Props,
		rootContainerInstance: Container,
		hostContext: HostContext,
		internalInstanceHandle: unknown,
		isHydrating: boolean
	) => TextInstance;
	appendInitialChild: (parentInstance: Instance, child: Instance | TextInstance) => void;
	finalizeInitialChildren: (
		instance: Instance,
		type: Type,
		props: Props,
		rootContainerInstance: Container,
		hostContext: HostContext,
		internalInstanceHandle: unknown
	) => boolean;
	shouldSetTextContent: (type: Type, props: Props) => boolean;
	getRootHostContext: (container: Container) => HostContext;
	getChildHostContext: (parentHostContext: HostContext, type: Type, instance: Instance) => HostContext;
	getPublicInstance: (instance: Instance) => PublicInstance;
	prepareForCommit: (container: Container) => unknown;
	resetAfterCommit: (
		container: Container,
		newRootHostContext: HostContext,
		finishedWork: Instance | TextInstance
	) => void;
	preparePortalMount: (portalContainerNode: unknown) => void;
	scheduleTimeout: (fn: (delay?: number) => void, delay?: number) => TimeoutHandle;
	cancelTimeout: (handle: TimeoutHandle) => void;
	noTimeout: NoTimeout;

	// --- refs / scopes
	getInstanceFromNode: (node: unknown) => Instance | undefined;
	beforeActiveInstanceBlur: () => void;
	afterActiveInstanceBlur: () => void;
	prepareScopeUpdate: (scopeInstance: unknown, instance: Instance) => void;
	getInstanceFromScope: (scopeInstance: unknown) => Instance | undefined;
	detachDeletedInstance: (node: Instance) => void;

	// --- mutation
	appendChild: (parentInstance: Instance, child: Instance | TextInstance) => void;
	appendChildToContainer: (container: Container, child: Instance | TextInstance) => void;
	insertBefore: (
		parentInstance: Instance,
		child: Instance | TextInstance,
		beforeChild: Instance | TextInstance
	) => void;
	insertInContainerBefore: (
		container: Container,
		child: Instance | TextInstance,
		beforeChild: Instance | TextInstance
	) => void;
	removeChild: (parentInstance: Instance, child: Instance | TextInstance) => void;
	removeChildFromContainer: (container: Container, child: Instance | TextInstance) => void;
	resetTextContent: (textInstance: TextInstance) => void;
	commitTextUpdate: (textInstance: TextInstance, oldText: string, newText: string) => void;
	commitMount: (instance: Instance, type: Type, props: Props, rootContainerInstance: Container) => void;
	commitUpdate: (instance: Instance, type: Type, oldProps: Props, newProps: Props) => void;
	hideInstance: (instance: Instance | TextInstance) => void;
	unhideInstance: (instance: Instance | TextInstance) => void;
	clearContainer: (container: Container) => void;

	// --- transitions / update priority / forms
	NotPendingTransition: TransitionStatus | undefined;
	HostTransitionContext: ReactContext<TransitionStatus>;
	setCurrentUpdatePriority: (newPriority: number) => void;
	getCurrentUpdatePriority: () => number;
	resolveUpdatePriority: () => number;
	resetFormInstance: (form: FormInstance) => void;
	requestPostPaintCallback: (callback: (time: number) => void) => void;
	shouldAttemptEagerTransition: () => boolean;
	trackSchedulerEvent: (event: unknown, time: number) => void;
	resolveEventType: (event: unknown) => string | undefined;
	resolveEventTimeStamp: (event: unknown, eventType: unknown) => number;

	// --- suspense-commit
	maySuspendCommit: (type: Type, props: Props, instance: Instance) => boolean;
	preloadInstance: (instance: unknown, type: Type, props: Props) => boolean;
	startSuspendingCommit: (instance: Instance) => void;
	suspendInstance: (instance: Instance, priority: number) => void;
	waitForCommitToBeReady: () => unknown;
}

declare function ReactReconciler<
	Type,
	Props,
	Container,
	Instance,
	TextInstance,
	SuspenseInstance,
	HydratableInstance,
	FormInstance,
	PublicInstance,
	HostContext,
	ChildSet,
	TimeoutHandle,
	NoTimeout,
	TransitionStatus
>(
	config: ReactReconciler.HostConfig<
		Type,
		Props,
		Container,
		Instance,
		TextInstance,
		SuspenseInstance,
		HydratableInstance,
		FormInstance,
		PublicInstance,
		HostContext,
		ChildSet,
		TimeoutHandle,
		NoTimeout,
		TransitionStatus
	>
): ReactReconciler.Reconciler<Container, Instance, TextInstance, SuspenseInstance, FormInstance, PublicInstance>;

declare namespace ReactReconciler {
	export {
		HostConfig,
		OpaqueRoot,
		ReactContext,
		Reconciler,
	};
}

export = ReactReconciler;