/**
 * @license React
 * react-reconciler.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

import React from "@toil/react";
import Scheduler from "@toil/scheduler";
let __exports = {};
"production" !== process.env.NODE_ENV && (__exports = function (___config) {
  let __exports, assign, REACT_LEGACY_ELEMENT_TYPE, REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE, REACT_FRAGMENT_TYPE, REACT_STRICT_MODE_TYPE, REACT_PROFILER_TYPE, REACT_CONSUMER_TYPE, REACT_CONTEXT_TYPE, REACT_FORWARD_REF_TYPE, REACT_SUSPENSE_TYPE, REACT_SUSPENSE_LIST_TYPE, REACT_MEMO_TYPE, REACT_LAZY_TYPE, REACT_ACTIVITY_TYPE, REACT_MEMO_CACHE_SENTINEL, MAYBE_ITERATOR_SYMBOL, REACT_CLIENT_REFERENCE, isArrayImpl, ReactSharedInternals, rendererVersion, rendererPackageName, extraDevToolsConfig, getPublicInstance, getRootHostContext, getChildHostContext, prepareForCommit, resetAfterCommit, createInstance, appendInitialChild, finalizeInitialChildren, shouldSetTextContent, createTextInstance, scheduleTimeout, cancelTimeout, noTimeout, isPrimaryRenderer, supportsMutation, supportsPersistence, supportsHydration, getInstanceFromNode, preparePortalMount, setCurrentUpdatePriority, getCurrentUpdatePriority, resolveUpdatePriority, trackSchedulerEvent, resolveEventType, resolveEventTimeStamp, shouldAttemptEagerTransition, detachDeletedInstance, maySuspendCommit, maySuspendCommitOnUpdate, maySuspendCommitInSyncRender, preloadInstance, startSuspendingCommit, suspendInstance, waitForCommitToBeReady, getSuspendedCommitReason, NotPendingTransition, HostTransitionContext, resetFormInstance, bindToConsole, supportsMicrotasks, scheduleMicrotask, supportsTestSelectors, findFiberRoot, getBoundingRect, getTextContent, isHiddenSubtree, matchAccessibilityRole, setFocusIfFocusable, setupIntersectionObserver, appendChild, appendChildToContainer, commitTextUpdate, commitMount, commitUpdate, insertBefore, insertInContainerBefore, removeChild, removeChildFromContainer, resetTextContent, hideInstance, hideTextInstance, unhideInstance, unhideTextInstance, clearContainer, cloneInstance, createContainerChildSet, appendChildToContainerChildSet, finalizeContainerChildren, replaceContainerChildren, cloneHiddenInstance, cloneHiddenTextInstance, isSuspenseInstancePending, isSuspenseInstanceFallback, getSuspenseInstanceFallbackErrorDetails, registerSuspenseInstanceRetry, canHydrateFormStateMarker, isFormStateMarkerMatching, getNextHydratableSibling, getNextHydratableSiblingAfterSingleton, getFirstHydratableChild, getFirstHydratableChildWithinContainer, getFirstHydratableChildWithinActivityInstance, getFirstHydratableChildWithinSuspenseInstance, getFirstHydratableChildWithinSingleton, canHydrateInstance, canHydrateTextInstance, canHydrateActivityInstance, canHydrateSuspenseInstance, hydrateInstance, hydrateTextInstance, hydrateActivityInstance, hydrateSuspenseInstance, getNextHydratableInstanceAfterActivityInstance, getNextHydratableInstanceAfterSuspenseInstance, commitHydratedInstance, commitHydratedContainer, commitHydratedActivityInstance, commitHydratedSuspenseInstance, finalizeHydratedChildren, flushHydrationEvents, clearSuspenseBoundary, clearSuspenseBoundaryFromContainer, hideDehydratedBoundary, unhideDehydratedBoundary, shouldDeleteUnhydratedTailInstances, diffHydratedPropsForDevWarnings, diffHydratedTextForDevWarnings, describeHydratableInstanceForDevWarnings, validateHydratableInstance, validateHydratableTextInstance, supportsResources, isHostHoistableType, getHoistableRoot, getResource, acquireResource, releaseResource, hydrateHoistable, mountHoistable, unmountHoistable, createHoistableInstance, prepareToCommitHoistables, mayResourceSuspendCommit, preloadResource, suspendResource, supportsSingletons, resolveSingletonInstance, acquireSingletonInstance, releaseSingletonInstance, isHostSingletonType, isSingletonScope, valueStack, fiberStack, index_jscomp_0, emptyContextObject, clz32, log_1, LN2, nextTransitionUpdateLane, nextTransitionDeferredLane, nextRetryLane, scheduleCallback_3, cancelCallback_1, shouldYield, requestPaint, now_1, ImmediatePriority, UserBlockingPriority, NormalPriority_1, IdlePriority, log, unstable_setDisableYieldValue, rendererID, injectedHook, hasLoggedError, isDevToolsPresent, lastResetTime, localPerformance, getCurrentTime, localDate, objectIs, reportGlobalError, hasOwnProperty, supportsUserTiming, currentTrack, alreadyWarnedForDeepEquality, reusableComponentDevToolDetails, reusableComponentOptions, resuableChangedPropsEntry, reusableDeeplyEqualPropsEntry, disabledDepth, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd, prefix, suffix, reentry, componentFrameCache, CapturedStacks, forkStack, forkStackIndex, treeForkProvider, treeForkCount, idStack, idStackIndex, treeContextProvider, treeContextId, treeContextOverflow, contextStackCursor, contextFiberStackCursor, rootInstanceStackCursor, hostTransitionProviderCursor, needsEscaping, current, isRendering, hydrationParentFiber, nextHydratableInstance, isHydrating, didSuspendOrErrorDEV, hydrationDiffRootDEV, hydrationErrors, rootOrSingletonContext, HydrationMismatchException, NoMode, valueCursor, rendererCursorDEV, renderer2CursorDEV, rendererSigil, currentlyRenderingFiber_1, lastContextDependency, isDisallowedContextReadInDEV, AbortControllerLocal, scheduleCallback_2, NormalPriority, CacheContext, now, createTask, renderStartTime, commitStartTime, commitEndTime, commitErrors, profilerStartTime, profilerEffectDuration, componentEffectDuration, componentEffectStartTime, componentEffectEndTime, componentEffectErrors, componentEffectSpawnedUpdate, blockingClampTime, blockingUpdateTime, blockingUpdateTask, blockingUpdateType, blockingUpdateMethodName, blockingUpdateComponentName, blockingEventTime, blockingEventType, blockingEventRepeatTime, blockingSuspendedTime, transitionClampTime, transitionStartTime, transitionUpdateTime, transitionUpdateType, transitionUpdateTask, transitionUpdateMethodName, transitionUpdateComponentName, transitionEventTime, transitionEventType, transitionEventRepeatTime, transitionSuspendedTime, animatingTask, yieldReason, yieldStartTime, currentUpdateIsNested, nestedUpdateScheduled, firstScheduledRoot, lastScheduledRoot, didScheduleMicrotask, didScheduleMicrotask_act, mightHavePendingSyncWork, isFlushingWork, currentEventTransitionLane, fakeActCallbackNode_1, currentEntangledListeners, currentEntangledPendingCount, currentEntangledLane, currentEntangledActionThenable, prevOnStartTransitionFinish, resumedCache, ReactStrictModeWarnings, pendingComponentWillMountWarnings, pendingUNSAFE_ComponentWillMountWarnings, pendingComponentWillReceivePropsWarnings, pendingUNSAFE_ComponentWillReceivePropsWarnings, pendingComponentWillUpdateWarnings, pendingUNSAFE_ComponentWillUpdateWarnings, didWarnAboutUnsafeLifecycles, pendingLegacyContextWarning, didWarnAboutLegacyContext, callComponent, callComponentInDEV, callRender, callRenderInDEV, callComponentDidMount, callComponentDidMountInDEV, callComponentDidUpdate, callComponentDidUpdateInDEV, callComponentDidCatch, callComponentDidCatchInDEV, callComponentWillUnmount, callComponentWillUnmountInDEV, callCreate, callCreateInDEV, callDestroy, callDestroyInDEV, callLazyInit, callLazyInitInDEV, SuspenseException, SuspenseyCommitException, SuspenseActionException, noopSuspenseyCommitThenable, suspendedThenable, needsToResetSuspendedThenableDEV, thenableState_1, thenableIndexCounter_1, currentDebugInfo, didWarnAboutMaps, didWarnAboutGenerators, ownerHasKeyUseWarning, ownerHasFunctionTypeWarning, ownerHasSymbolTypeWarning, reconcileChildFibers, mountChildFibers, OffscreenVisible, OffscreenPassiveEffectsConnected, concurrentQueues, concurrentQueuesIndex, concurrentlyUpdatedLanes, UpdateState, ReplaceState, ForceUpdate, CaptureUpdate, hasForceUpdate, didWarnUpdateInsideUpdate, currentlyProcessingQueue, didReadFromEntangledAsyncAction, currentTreeHiddenStackCursor, prevEntangledRenderLanesCursor, suspenseHandlerStackCursor, shellBoundary, SubtreeSuspenseContextMask, ForceSuspenseFallback, suspenseStackCursor, NoFlags, HasEffect, Insertion, Layout, Passive, didWarnUncachedGetSnapshot, didWarnAboutMismatchedHooksForComponent, didWarnAboutUseWrappedInTryCatch, didWarnAboutAsyncClientComponent, didWarnAboutUseFormState, renderLanes, currentlyRenderingFiber, currentHook, workInProgressHook, didScheduleRenderPhaseUpdate, didScheduleRenderPhaseUpdateDuringThisPass, shouldDoubleInvokeUserFnsInHooksDEV, localIdCounter, thenableIndexCounter, thenableState, globalClientIdCounter, RE_RENDER_LIMIT, currentHookNameInDev, hookTypesDev, hookTypesUpdateIndexDev, ignorePreviousDependencies, ContextOnlyDispatcher, HooksDispatcherOnMountInDEV, HooksDispatcherOnMountWithHookTypesInDEV, HooksDispatcherOnUpdateInDEV, HooksDispatcherOnRerenderInDEV, InvalidNestedHooksDispatcherOnMountInDEV, InvalidNestedHooksDispatcherOnUpdateInDEV, InvalidNestedHooksDispatcherOnRerenderInDEV, fakeInternalInstance, didWarnAboutStateAssignmentForComponent, didWarnAboutUninitializedState, didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate, didWarnAboutLegacyLifecyclesAndDerivedState, didWarnAboutDirectlyAssigningPropsToState, didWarnAboutUndefinedDerivedState, didWarnAboutContextTypes_1, didWarnAboutChildContextTypes, didWarnAboutInvalidateContextType, didWarnOnInvalidCallback, classComponentUpdater, componentName, errorBoundaryName, SelectiveHydrationException, didReceiveUpdate, didWarnAboutBadClass, didWarnAboutContextTypeOnFunctionComponent, didWarnAboutContextTypes, didWarnAboutGetDerivedStateOnFunctionComponent, didWarnAboutReassigningProps, didWarnAboutRevealOrder, didWarnAboutTailOptions, SUSPENDED_MARKER, hasWarnedAboutUsingNoValuePropOnContextProvider, didWarnAboutUndefinedSnapshotBeforeUpdate, offscreenSubtreeIsHidden, offscreenSubtreeWasHidden, needsFormReset, PossiblyWeakSet, nextEffect, inProgressLanes, inProgressRoot, hostParent, hostParentIsContainer, currentHoistableRoot, inHydratedSubtree, suspenseyCommitFlag, DefaultAsyncDispatcher, COMPONENT_TYPE, HAS_PSEUDO_CLASS_TYPE, ROLE_TYPE, TEST_NAME_TYPE, TEXT_TYPE, symbolFor, commitHooks, PossiblyWeakMap, NoContext, RenderContext, CommitContext, RootInProgress, RootFatalErrored, RootErrored, RootSuspended, RootSuspendedWithDelay, RootSuspendedAtTheShell, RootCompleted, executionContext, workInProgressRoot, workInProgress, workInProgressRootRenderLanes, NotSuspended, SuspendedOnError, SuspendedOnData, SuspendedOnImmediate, SuspendedOnInstance, SuspendedOnInstanceAndReadyToContinue, SuspendedOnDeprecatedThrowPromise, SuspendedAndReadyToContinue, SuspendedOnHydration, SuspendedOnAction, workInProgressSuspendedReason, workInProgressThrownValue, workInProgressRootDidSkipSuspendedSiblings, workInProgressRootIsPrerendering, workInProgressRootDidAttachPingListener, entangledRenderLanes, workInProgressRootExitStatus, workInProgressRootSkippedLanes, workInProgressRootInterleavedUpdatedLanes, workInProgressRootPingedLanes, workInProgressDeferredLane, workInProgressSuspendedRetryLanes, workInProgressRootConcurrentErrors, workInProgressRootRecoverableErrors, workInProgressRootDidIncludeRecursiveRenderUpdate, globalMostRecentFallbackTime, globalMostRecentTransitionTime, FALLBACK_THROTTLE_MS, workInProgressRootRenderTargetTime, RENDER_TIMEOUT_MS, workInProgressTransitions, workInProgressUpdateTask, legacyErrorBoundariesThatAlreadyFailed, IMMEDIATE_COMMIT, ABORTED_VIEW_TRANSITION_COMMIT, DELAYED_PASSIVE_COMMIT, ANIMATION_STARTED_COMMIT, NO_PENDING_EFFECTS, PENDING_MUTATION_PHASE, PENDING_LAYOUT_PHASE, PENDING_AFTER_MUTATION_PHASE, PENDING_SPAWNED_WORK, PENDING_PASSIVE_PHASE, pendingEffectsStatus, pendingEffectsRoot, pendingFinishedWork, pendingEffectsLanes, pendingEffectsRemainingLanes, pendingEffectsRenderEndTime, pendingPassiveTransitions, pendingRecoverableErrors, pendingSuspendedCommitReason, pendingDelayedCommitReason, pendingSuspendedViewTransitionReason, NESTED_UPDATE_LIMIT, nestedUpdateCount, rootWithNestedUpdates, isFlushingPassiveEffects, didScheduleUpdateDuringPassiveEffects, NESTED_PASSIVE_UPDATE_LIMIT, nestedPassiveUpdateCount, rootWithPassiveNestedUpdates, isRunningInsertionEffect, didWarnStateUpdateForNotYetMountedComponent, didWarnAboutUpdateInRender, didWarnAboutUpdateInRenderForAnotherComponent, fakeActCallbackNode, resolveFamily, failedBoundaries, hasBadMapPolyfill, nonExtensibleObject, didWarnAboutNestedUpdates, didWarnAboutFindNodeInStrictMode, overrideHookState, overrideHookStateDeletePath, overrideHookStateRenamePath, overrideProps, overridePropsDeletePath, overridePropsRenamePath, scheduleUpdate, scheduleRetry, setErrorHandler, setSuspenseHandler;
  function findHook(fiber, id) {
    for (fiber = fiber.memoizedState; undefined !== fiber && 0 < id;) fiber = fiber.next, id--;
    return fiber;
  }
  function copyWithSetImpl(obj, path, index, value) {
    let key, updated;
    if (index >= __len(path)) return value;
    key = path[index];
    updated = isArrayImpl(obj) ? __slice(obj) : assign({}, obj);
    updated[key] = copyWithSetImpl(obj[key], path, __cat(index, 1), value);
    return updated;
  }
  function copyWithRename(obj, oldPath, newPath) {
    let i;
    if (__len(oldPath) !== __len(newPath)) console.warn("copyWithRename() expects paths of the same length");else {
      for (i = 0; i < __len(newPath) - 1; i++) if (oldPath[i] !== newPath[i]) {
        console.warn("copyWithRename() expects paths to be the same except for the deepest key");
        return;
      }
      return copyWithRenameImpl(obj, oldPath, newPath, 0);
    }
  }
  function copyWithRenameImpl(obj, oldPath, newPath, index) {
    let oldKey, updated;
    oldKey = oldPath[index];
    updated = isArrayImpl(obj) ? __slice(obj) : assign({}, obj);
    __cat(index, 1) === __len(oldPath) ? (updated[newPath[index]] = updated[oldKey], isArrayImpl(updated) ? __splice(updated, oldKey, 1) : delete updated[oldKey]) : updated[oldKey] = copyWithRenameImpl(obj[oldKey], oldPath, newPath, __cat(index, 1));
    return updated;
  }
  function copyWithDeleteImpl(obj, path, index) {
    let key, updated;
    key = path[index];
    updated = isArrayImpl(obj) ? __slice(obj) : assign({}, obj);
    if (__cat(index, 1) === __len(path)) return isArrayImpl(updated) ? __splice(updated, key, 1) : delete updated[key], updated;
    updated[key] = copyWithDeleteImpl(obj[key], path, __cat(index, 1));
    return updated;
  }
  function shouldSuspendImpl() {
    return !1;
  }
  function shouldErrorImpl() {
    return undefined;
  }
  function createFiber(tag, pendingProps, key, mode) {
    return __new(FiberNode, tag, pendingProps, key, mode);
  }
  function scheduleRoot(root, element) {
    root.context === emptyContextObject && (updateContainerSync(element, root, undefined, undefined), flushSyncWork());
  }
  function scheduleRefresh(root, update) {
    let staleFamilies;
    if (undefined !== resolveFamily) {
      staleFamilies = update.staleFamilies;
      update = update.updatedFamilies;
      flushPendingEffects();
      scheduleFibersWithFamiliesRecursively(root.current, update, staleFamilies);
      flushSyncWork();
    }
  }
  function setRefreshHandler(handler) {
    resolveFamily = handler;
  }
  function warnInvalidHookAccess() {
    console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks");
  }
  function warnInvalidContextAccess() {
    console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
  }
  function noop() {}
  function warnForMissingKey() {}
  function setToSortedString(set) {
    let array;
    array = __arrNew();
    __forEach(set, function (value) {
      __push(array, value);
    });
    return __join(__sort(array), ", ");
  }
  function getNearestMountedFiber(fiber) {
    let node, nearestMounted;
    node = fiber;
    nearestMounted = fiber;
    if (fiber.alternate) for (; node.return;) node = node.return;else {
      fiber = node;
      do node = fiber, 0 !== (node.flags & 4098) && (nearestMounted = node.return), fiber = node.return; while (fiber);
    }
    return 3 === node.tag ? nearestMounted : undefined;
  }
  function assertIsMounted(fiber) {
    if (getNearestMountedFiber(fiber) !== fiber) throw Error("Unable to find node on an unmounted component.");
  }
  function findCurrentFiberUsingSlowPath(fiber) {
    let alternate, a, b, parentA, parentB, didFindChild, _child;
    alternate = fiber.alternate;
    if (!alternate) {
      alternate = getNearestMountedFiber(fiber);
      if (undefined === alternate) throw Error("Unable to find node on an unmounted component.");
      return alternate !== fiber ? undefined : fiber;
    }
    for (a = fiber, b = alternate;;) {
      parentA = a.return;
      if (undefined === parentA) break;
      parentB = parentA.alternate;
      if (undefined === parentB) {
        b = parentA.return;
        if (undefined !== b) {
          a = b;
          continue;
        }
        break;
      }
      if (parentA.child === parentB.child) {
        for (parentB = parentA.child; parentB;) {
          if (parentB === a) return assertIsMounted(parentA), fiber;
          if (parentB === b) return assertIsMounted(parentA), alternate;
          parentB = parentB.sibling;
        }
        throw Error("Unable to find node on an unmounted component.");
      }
      if (a.return !== b.return) a = parentA, b = parentB;else {
        for (didFindChild = !1, _child = parentA.child; _child;) {
          if (_child === a) {
            didFindChild = !0;
            a = parentA;
            b = parentB;
            break;
          }
          if (_child === b) {
            didFindChild = !0;
            b = parentA;
            a = parentB;
            break;
          }
          _child = _child.sibling;
        }
        if (!didFindChild) {
          for (_child = parentB.child; _child;) {
            if (_child === a) {
              didFindChild = !0;
              a = parentB;
              b = parentA;
              break;
            }
            if (_child === b) {
              didFindChild = !0;
              b = parentB;
              a = parentA;
              break;
            }
            _child = _child.sibling;
          }
          if (!didFindChild) throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
        }
      }
      if (a.alternate !== b) throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
    }
    if (3 !== a.tag) throw Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? fiber : alternate;
  }
  function findCurrentHostFiber(parent) {
    parent = findCurrentFiberUsingSlowPath(parent);
    return undefined !== parent ? findCurrentHostFiberImpl(parent) : undefined;
  }
  function findCurrentHostFiberImpl(node) {
    let tag;
    tag = node.tag;
    if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
    for (node = node.child; undefined !== node;) {
      tag = findCurrentHostFiberImpl(node);
      if (undefined !== tag) return tag;
      node = node.sibling;
    }
    return undefined;
  }
  function findCurrentHostFiberWithNoPortalsImpl(node) {
    let tag;
    tag = node.tag;
    if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
    for (node = node.child; undefined !== node;) {
      if (4 !== node.tag && (tag = findCurrentHostFiberWithNoPortalsImpl(node), undefined !== tag)) return tag;
      node = node.sibling;
    }
    return undefined;
  }
  function getIteratorFn(maybeIterable) {
    if (undefined === maybeIterable || "object" !== typeOfJS(maybeIterable)) return undefined;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeOfJS(maybeIterable) ? maybeIterable : undefined;
  }
  function getComponentNameFromType(__type) {
    let innerType;
    if (__type === undefined) return undefined;
    if ("function" === typeOfJS(__type)) return __type.$$typeof === REACT_CLIENT_REFERENCE ? undefined : __type.displayName || __type.name || undefined;
    if ("string" === typeOfJS(__type)) return __type;
    switch (__type) {
      case REACT_FRAGMENT_TYPE:
        return "Fragment";
      case REACT_PROFILER_TYPE:
        return "Profiler";
      case REACT_STRICT_MODE_TYPE:
        return "StrictMode";
      case REACT_SUSPENSE_TYPE:
        return "Suspense";
      case REACT_SUSPENSE_LIST_TYPE:
        return "SuspenseList";
      case REACT_ACTIVITY_TYPE:
        return "Activity";
    }
    if ("object" === typeOfJS(__type)) switch ("number" === typeOfJS(__type.tag) && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), __type.$$typeof) {
      case REACT_PORTAL_TYPE:
        return "Portal";
      case REACT_CONTEXT_TYPE:
        return __type.displayName || "Context";
      case REACT_CONSUMER_TYPE:
        return __cat(__type._context.displayName || "Context", ".Consumer");
      case REACT_FORWARD_REF_TYPE:
        innerType = __type.render;
        __type = __type.displayName;
        __type || (__type = innerType.displayName || innerType.name || "", __type = "" !== __type ? __cat(__cat("ForwardRef(", __type), ")") : "ForwardRef");
        return __type;
      case REACT_MEMO_TYPE:
        return innerType = __type.displayName || undefined, undefined !== innerType ? innerType : getComponentNameFromType(__type.type) || "Memo";
      case REACT_LAZY_TYPE:
        innerType = __type._payload;
        __type = __type._init;
        try {
          return getComponentNameFromType(__type(innerType));
        } catch (x) {}
    }
    return undefined;
  }
  function getComponentNameFromFiber(fiber) {
    let __type, i;
    __type = fiber.type;
    switch (fiber.tag) {
      case 31:
        return "Activity";
      case 24:
        return "Cache";
      case 9:
        return __cat(__type._context.displayName || "Context", ".Consumer");
      case 10:
        return __type.displayName || "Context";
      case 18:
        return "DehydratedFragment";
      case 11:
        return fiber = __type.render, fiber = fiber.displayName || fiber.name || "", __type.displayName || ("" !== fiber ? __cat(__cat("ForwardRef(", fiber), ")") : "ForwardRef");
      case 7:
        return "Fragment";
      case 26:
      case 27:
      case 5:
        return __type;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return getComponentNameFromType(__type);
      case 8:
        return __type === REACT_STRICT_MODE_TYPE ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 14:
      case 15:
        if ("function" === typeOfJS(__type)) return __type.displayName || __type.name || undefined;
        if ("string" === typeOfJS(__type)) return __type;
        break;
      case 29:
        __type = fiber._debugInfo;
        if (__type !== undefined) for (i = __len(__type) - 1; 0 <= i; i--) if ("string" === typeOfJS(__type[i].name)) return __type[i].name;
        if (undefined !== fiber.return) return getComponentNameFromFiber(fiber.return);
    }
    return undefined;
  }
  function createCursor(defaultValue) {
    return {
      current: defaultValue
    };
  }
  function pop(cursor, fiber) {
    0 > index_jscomp_0 ? console.error("Unexpected pop.") : (fiber !== fiberStack[index_jscomp_0] && console.error("Unexpected Fiber popped."), cursor.current = valueStack[index_jscomp_0], valueStack[index_jscomp_0] = undefined, fiberStack[index_jscomp_0] = undefined, index_jscomp_0--);
  }
  function push(cursor, value, fiber) {
    index_jscomp_0++;
    valueStack[index_jscomp_0] = cursor.current;
    fiberStack[index_jscomp_0] = fiber;
    cursor.current = value;
  }
  function clz32Fallback(x) {
    x >>>= 0;
    return 0 === x ? 32 : 31 - (log_1(x) / LN2 | 0) | 0;
  }
  function getHighestPriorityLanes(lanes) {
    let pendingSyncLanes;
    pendingSyncLanes = lanes & 42;
    if (0 !== pendingSyncLanes) return pendingSyncLanes;
    switch (lanes & -lanes) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return lanes & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return lanes & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return lanes & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return console.error("Should have found matching lanes. This is a bug in React."), lanes;
    }
  }
  function getNextLanes(root, wipLanes, rootHasPendingCommit) {
    let pendingLanes, nextLanes, suspendedLanes, pingedLanes, nonIdlePendingLanes;
    pendingLanes = root.pendingLanes;
    if (0 === pendingLanes) return 0;
    nextLanes = 0;
    suspendedLanes = root.suspendedLanes;
    pingedLanes = root.pingedLanes;
    root = root.warmLanes;
    nonIdlePendingLanes = pendingLanes & 134217727;
    0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
    return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
  }
  function checkIfRootIsPrerendering(root, renderLanes) {
    return 0 === (root.pendingLanes & ~(root.suspendedLanes & ~root.pingedLanes) & renderLanes);
  }
  function computeExpirationTime(lane, currentTime) {
    switch (lane) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return __cat(currentTime, 250);
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return __cat(currentTime, 5e3);
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return console.error("Should have found matching lanes. This is a bug in React."), -1;
    }
  }
  function claimNextRetryLane() {
    let lane;
    lane = nextRetryLane;
    nextRetryLane <<= 1;
    0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
    return lane;
  }
  function createLaneMap(initial) {
    let laneMap, i;
    for (laneMap = __arrNew(), i = 0; 31 > i; i++) __push(laneMap, initial);
    return laneMap;
  }
  function markRootUpdated_1(root, updateLane) {
    root.pendingLanes |= updateLane;
    268435456 !== updateLane && (root.suspendedLanes = 0, root.pingedLanes = 0, root.warmLanes = 0);
  }
  function markRootFinished(root, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
    let previouslyPendingLanes, entanglements, expirationTimes, hiddenUpdates, index, lane, hiddenUpdatesForLane, update;
    previouslyPendingLanes = root.pendingLanes;
    root.pendingLanes = remainingLanes;
    root.suspendedLanes = 0;
    root.pingedLanes = 0;
    root.warmLanes = 0;
    root.expiredLanes &= remainingLanes;
    root.entangledLanes &= remainingLanes;
    root.errorRecoveryDisabledLanes &= remainingLanes;
    root.shellSuspendCounter = 0;
    entanglements = root.entanglements;
    expirationTimes = root.expirationTimes;
    hiddenUpdates = root.hiddenUpdates;
    for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes;) {
      index = 31 - clz32(remainingLanes);
      lane = 1 << index;
      entanglements[index] = 0;
      expirationTimes[index] = -1;
      hiddenUpdatesForLane = hiddenUpdates[index];
      if (undefined !== hiddenUpdatesForLane) for (hiddenUpdates[index] = undefined, index = 0; index < __len(hiddenUpdatesForLane); index++) {
        update = hiddenUpdatesForLane[index];
        undefined !== update && (update.lane &= -536870913);
      }
      remainingLanes &= ~lane;
    }
    0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, 0);
    0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root.tag && (root.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
  }
  function markSpawnedDeferredLane(root, spawnedLane, entangledLanes) {
    let spawnedLaneIndex;
    root.pendingLanes |= spawnedLane;
    root.suspendedLanes &= ~spawnedLane;
    spawnedLaneIndex = 31 - clz32(spawnedLane);
    root.entangledLanes |= spawnedLane;
    root.entanglements[spawnedLaneIndex] = root.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
  }
  function markRootEntangled(root, entangledLanes) {
    let rootEntangledLanes, index, lane;
    rootEntangledLanes = root.entangledLanes |= entangledLanes;
    for (root = root.entanglements; rootEntangledLanes;) {
      index = 31 - clz32(rootEntangledLanes);
      lane = 1 << index;
      lane & entangledLanes | root[index] & entangledLanes && (root[index] |= entangledLanes);
      rootEntangledLanes &= ~lane;
    }
  }
  function getBumpedLaneForHydration(root, renderLanes) {
    let renderLane;
    renderLane = renderLanes & -renderLanes;
    renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
    return 0 !== (renderLane & (root.suspendedLanes | renderLanes)) ? 0 : renderLane;
  }
  function getBumpedLaneForHydrationByLane(lane) {
    switch (lane) {
      case 2:
        lane = 1;
        break;
      case 8:
        lane = 4;
        break;
      case 32:
        lane = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        lane = 128;
        break;
      case 268435456:
        lane = 134217728;
        break;
      default:
        lane = 0;
    }
    return lane;
  }
  function addFiberToLanesMap(root, fiber, lanes) {
    let index, lane;
    if (isDevToolsPresent) for (root = root.pendingUpdatersLaneMap; 0 < lanes;) {
      index = 31 - clz32(lanes);
      lane = 1 << index;
      root[index].add(fiber);
      lanes &= ~lane;
    }
  }
  function movePendingFibersToMemoized(root, lanes) {
    let pendingUpdatersLaneMap, memoizedUpdaters, index;
    if (isDevToolsPresent) for (pendingUpdatersLaneMap = root.pendingUpdatersLaneMap, memoizedUpdaters = root.memoizedUpdaters; 0 < lanes;) {
      index = 31 - clz32(lanes);
      root = 1 << index;
      index = pendingUpdatersLaneMap[index];
      0 < index.size && (__forEach(index, function (fiber) {
        let alternate;
        alternate = fiber.alternate;
        undefined !== alternate && memoizedUpdaters.has(alternate) || memoizedUpdaters.add(fiber);
      }), index.clear());
      lanes &= ~root;
    }
  }
  function lanesToEventPriority(lanes) {
    lanes &= -lanes;
    return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
  }
  function injectInternals(internals) {
    let hook;
    if ("undefined" === typeOfJS(__REACT_DEVTOOLS_GLOBAL_HOOK__)) return !1;
    hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (hook.isDisabled) return !0;
    if (!hook.supportsFiber) return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"), !0;
    try {
      rendererID = hook.inject(internals), injectedHook = hook;
    } catch (err) {
      console.error("React instrumentation encountered an error: %o.", err);
    }
    return hook.checkDCE ? !0 : !1;
  }
  function setIsStrictModeForDevtools(newIsStrictMode) {
    "function" === typeOfJS(log) && unstable_setDisableYieldValue(newIsStrictMode);
    if (injectedHook && "function" === typeOfJS(injectedHook.setStrictMode)) try {
      injectedHook.setStrictMode(rendererID, newIsStrictMode);
    } catch (err) {
      hasLoggedError || (hasLoggedError = !0, console.error("React instrumentation encountered an error: %o", err));
    }
  }
  function is(x, y) {
    return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
  }
  function getArrayKind(array) {
    let kind, i, value;
    for (kind = 0, i = 0; i < __len(array); i++) {
      value = array[i];
      if ("object" === typeOfJS(value) && undefined !== value) {
        if (isArrayImpl(value) && 2 === __len(value) && "string" === typeOfJS(value[0])) {
          if (0 !== kind && 3 !== kind) return 1;
          kind = 3;
        } else return 1;
      } else {
        if ("function" === typeOfJS(value) || "string" === typeOfJS(value) && 50 < __len(value) || 0 !== kind && 2 !== kind) return 1;
        kind = 2;
      }
    }
    return kind;
  }
  function addObjectToProperties(object, properties, indent, prefix) {
    let key;
    for (const __k of Object.keys(object)) {
      key = __k;
      __callFn(hasOwnProperty, object, key) && "_" !== key[0] && addValueToProperties(key, object[key], properties, indent, prefix);
    }
  }
  function addValueToProperties(_propertyName, value, properties, indent, prefix) {
    let typeName, key, propsKeys, propsLength, propKey;
    switch (typeOfJS(value)) {
      case "object":
        if (undefined === value) {
          value = "null";
          break;
        } else {
          if (value.$$typeof === REACT_ELEMENT_TYPE) {
            typeName = getComponentNameFromType(value.type) || "\u2026";
            key = value.key;
            value = value.props;
            propsKeys = Object.keys(value);
            propsLength = __len(propsKeys);
            if (key === undefined && 0 === propsLength) {
              value = __cat(__cat("<", typeName), " />");
              break;
            }
            if (3 > indent || 1 === propsLength && "children" === propsKeys[0] && key === undefined) {
              value = __cat(__cat("<", typeName), " \u2026 />");
              break;
            }
            __push(properties, __arrNew(__cat(__cat(prefix, __repeat("\u00a0\u00a0", indent)), _propertyName), __cat("<", typeName)));
            undefined !== key && addValueToProperties("key", key, properties, __cat(indent, 1), prefix);
            _propertyName = !1;
            for (const __k of Object.keys(value)) {
              propKey = __k;
              "children" === propKey ? value.children !== undefined && (!isArrayImpl(value.children) || 0 < __len(value.children)) && (_propertyName = !0) : __callFn(hasOwnProperty, value, propKey) && "_" !== propKey[0] && addValueToProperties(propKey, value[propKey], properties, __cat(indent, 1), prefix);
            }
            __push(properties, __arrNew("", _propertyName ? __cat(__cat(">\u2026</", typeName), ">") : "/>"));
            return;
          }
          typeName = __callFn(__protoOf(Object).toString, value);
          typeName = __slice(typeName, 8, __len(typeName) - 1);
          if ("Array" === typeName) if (propKey = getArrayKind(value), 2 === propKey || 0 === propKey) {
            value = JSON.stringify(value);
            break;
          } else if (3 === propKey) {
            __push(properties, __arrNew(__cat(__cat(prefix, __repeat("\u00a0\u00a0", indent)), _propertyName), ""));
            for (let _propertyName = 0; _propertyName < __len(value); _propertyName++) typeName = value[_propertyName], addValueToProperties(typeName[0], typeName[1], properties, __cat(indent, 1), prefix);
            return;
          }
          if ("Promise" === typeName) {
            if ("fulfilled" === value.status) {
              if (typeName = __len(properties), addValueToProperties(_propertyName, value.value, properties, indent, prefix), __len(properties) > typeName) {
                properties = properties[typeName];
                properties[1] = __cat(__cat("Promise<", properties[1] || "Object"), ">");
                return;
              }
            } else if ("rejected" === value.status && (typeName = __len(properties), addValueToProperties(_propertyName, value.reason, properties, indent, prefix), __len(properties) > typeName)) {
              properties = properties[typeName];
              properties[1] = __cat(__cat("Rejected Promise<", properties[1]), ">");
              return;
            }
            __push(properties, __arrNew(__cat(__repeat("\u00a0\u00a0", indent), _propertyName), "Promise"));
            return;
          }
          "Object" === typeName && (propKey = Object.getPrototypeOf(value)) && "function" === typeOfJS(propKey.constructor) && (typeName = propKey.constructor.name);
          __push(properties, __arrNew(__cat(__cat(prefix, __repeat("\u00a0\u00a0", indent)), _propertyName), "Object" === typeName ? 3 > indent ? "" : "\u2026" : typeName));
          3 > indent && addObjectToProperties(value, properties, __cat(indent, 1), prefix);
          return;
        }
      case "function":
        value = "" === value.name ? "() => {}" : __cat(value.name, "() {}");
        break;
      case "string":
        value = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects." === value ? "\u2026" : JSON.stringify(value);
        break;
      case "undefined":
        value = "undefined";
        break;
      case "boolean":
        value = value ? "true" : "false";
        break;
      default:
        value = String(value);
    }
    __push(properties, __arrNew(__cat(__cat(prefix, __repeat("\u00a0\u00a0", indent)), _propertyName), value));
  }
  function addObjectDiffToProperties(prev, __next, properties, indent) {
    let isDeeplyEqual, _key, key, nextValue, prevKind, nextKind;
    isDeeplyEqual = !0;
    for (const __k of Object.keys(prev)) {
      key = __k;
      __in(key, __next) || (__push(properties, __arrNew(__cat(__cat("\u2013\u00a0", __repeat("\u00a0\u00a0", indent)), key), "\u2026")), isDeeplyEqual = !1);
    }
    for (const __k of Object.keys(__next)) {
      _key = __k;
      if (__in(_key, prev)) {
        key = prev[_key];
        nextValue = __next[_key];
        if (key !== nextValue) {
          if (0 === indent && "children" === _key) isDeeplyEqual = __cat(__repeat("\u00a0\u00a0", indent), _key), __push(properties, __arrNew(__cat("\u2013\u00a0", isDeeplyEqual), "\u2026"), __arrNew(__cat("+\u00a0", isDeeplyEqual), "\u2026"));else {
            if (!(3 <= indent)) if ("object" === typeOfJS(key) && "object" === typeOfJS(nextValue) && undefined !== key && undefined !== nextValue && key.$$typeof === nextValue.$$typeof) {
              if (nextValue.$$typeof === REACT_ELEMENT_TYPE) {
                if (key.type === nextValue.type && key.key === nextValue.key) {
                  key = getComponentNameFromType(nextValue.type) || "\u2026";
                  isDeeplyEqual = __cat(__repeat("\u00a0\u00a0", indent), _key);
                  key = __cat(__cat("<", key), " \u2026 />");
                  __push(properties, __arrNew(__cat("\u2013\u00a0", isDeeplyEqual), key), __arrNew(__cat("+\u00a0", isDeeplyEqual), key));
                  isDeeplyEqual = !1;
                  continue;
                }
              } else {
                prevKind = __callFn(__protoOf(Object).toString, key);
                nextKind = __callFn(__protoOf(Object).toString, nextValue);
                if (prevKind === nextKind && ("[object Object]" === nextKind || "[object Array]" === nextKind)) {
                  prevKind = __arrNew(__cat(__cat("\u2007\u00a0", __repeat("\u00a0\u00a0", indent)), _key), "[object Array]" === nextKind ? "Array" : "");
                  __push(properties, prevKind);
                  nextKind = __len(properties);
                  addObjectDiffToProperties(key, nextValue, properties, __cat(indent, 1)) ? nextKind === __len(properties) && (prevKind[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : isDeeplyEqual = !1;
                  continue;
                }
              }
            } else if ("function" === typeOfJS(key) && "function" === typeOfJS(nextValue) && key.name === nextValue.name && __len(key) === __len(nextValue) && (prevKind = __callFn(__protoOf(Function).toString, key), nextKind = __callFn(__protoOf(Function).toString, nextValue), prevKind === nextKind)) {
              key = "" === nextValue.name ? "() => {}" : __cat(nextValue.name, "() {}");
              __push(properties, __arrNew(__cat(__cat("\u2007\u00a0", __repeat("\u00a0\u00a0", indent)), _key), __cat(key, " Referentially unequal function closure. Consider memoization.")));
              continue;
            }
            addValueToProperties(_key, key, properties, indent, "\u2013\u00a0");
            addValueToProperties(_key, nextValue, properties, indent, "+\u00a0");
          }
          isDeeplyEqual = !1;
        }
      } else __push(properties, __arrNew(__cat(__cat("+\u00a0", __repeat("\u00a0\u00a0", indent)), _key), "\u2026")), isDeeplyEqual = !1;
    }
    return isDeeplyEqual;
  }
  function setCurrentTrackFromLanes(lanes) {
    currentTrack = lanes & 63 ? "Blocking" : lanes & 64 ? "Gesture" : lanes & 4194176 ? "Transition" : lanes & 62914560 ? "Suspense" : lanes & 2080374784 ? "Idle" : "Other";
  }
  function logComponentTrigger(fiber, startTime, endTime, trigger) {
    supportsUserTiming && (reusableComponentOptions.start = startTime, reusableComponentOptions.end = endTime, reusableComponentDevToolDetails.color = "warning", reusableComponentDevToolDetails.tooltipText = trigger, reusableComponentDevToolDetails.properties = undefined, (fiber = fiber._debugTask) ? fiber.run(__partial((..._bindArgs) => __applyFn(performance.measure, ..._bindArgs), performance, trigger, reusableComponentOptions)) : performance.measure(trigger, reusableComponentOptions));
  }
  function logComponentReappeared(fiber, startTime, endTime) {
    logComponentTrigger(fiber, startTime, endTime, "Reconnect");
  }
  function logComponentRender(fiber, startTime, endTime, wasHydrated, committedLanes) {
    let name, alternate, selfTime, child, props;
    name = getComponentNameFromFiber(fiber);
    if (undefined !== name && supportsUserTiming) {
      alternate = fiber.alternate;
      selfTime = fiber.actualDuration;
      if (undefined === alternate || alternate.child !== fiber.child) for (child = fiber.child; undefined !== child; child = child.sibling) selfTime -= child.actualDuration;
      wasHydrated = 0.5 > selfTime ? wasHydrated ? "tertiary-light" : "primary-light" : 10 > selfTime ? wasHydrated ? "tertiary" : "primary" : 100 > selfTime ? wasHydrated ? "tertiary-dark" : "primary-dark" : "error";
      props = fiber.memoizedProps;
      selfTime = fiber._debugTask;
      undefined !== props && undefined !== alternate && alternate.memoizedProps !== props ? (child = __arrNew(resuableChangedPropsEntry), props = addObjectDiffToProperties(alternate.memoizedProps, props, child, 0), 1 < __len(child) && (props && !alreadyWarnedForDeepEquality && 0 === (alternate.lanes & committedLanes) && 100 < fiber.actualDuration ? (alreadyWarnedForDeepEquality = !0, child[0] = reusableDeeplyEqualPropsEntry, reusableComponentDevToolDetails.color = "warning", reusableComponentDevToolDetails.tooltipText = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.") : (reusableComponentDevToolDetails.color = wasHydrated, reusableComponentDevToolDetails.tooltipText = name), reusableComponentDevToolDetails.properties = child, reusableComponentOptions.start = startTime, reusableComponentOptions.end = endTime, selfTime !== undefined ? selfTime.run(__partial((..._bindArgs2) => __applyFn(performance.measure, ..._bindArgs2), performance, __cat("\u200b", name), reusableComponentOptions)) : performance.measure(__cat("\u200b", name), reusableComponentOptions))) : selfTime !== undefined ? selfTime.run(__partial((..._bindArgs3) => __applyFn(console.timeStamp, ..._bindArgs3), console, name, startTime, endTime, "Components \u269b", void 0, wasHydrated)) : console.timeStamp(name, startTime, endTime, "Components \u269b", void 0, wasHydrated);
    }
  }
  function logComponentErrored(fiber, startTime, endTime, errors) {
    let name, debugTask, properties, i, capturedValue;
    if (supportsUserTiming) {
      name = getComponentNameFromFiber(fiber);
      if (undefined !== name) {
        for (debugTask = undefined, properties = __arrNew(), i = 0; i < __len(errors); i++) {
          capturedValue = errors[i];
          debugTask === undefined && undefined !== capturedValue.source && (debugTask = capturedValue.source._debugTask);
          capturedValue = capturedValue.value;
          __push(properties, __arrNew("Error", "object" === typeOfJS(capturedValue) && undefined !== capturedValue && "string" === typeOfJS(capturedValue.message) ? String(capturedValue.message) : String(capturedValue)));
        }
        undefined !== fiber.key && addValueToProperties("key", fiber.key, properties, 0, "");
        undefined !== fiber.memoizedProps && addObjectToProperties(fiber.memoizedProps, properties, 0, "");
        debugTask === undefined && (debugTask = fiber._debugTask);
        fiber = {
          start: startTime,
          end: endTime,
          detail: {
            devtools: {
              color: "error",
              track: "Components \u269b",
              tooltipText: 13 === fiber.tag ? "Hydration failed" : "Error boundary caught an error",
              properties: properties
            }
          }
        };
        debugTask ? debugTask.run(__partial((..._bindArgs4) => __applyFn(performance.measure, ..._bindArgs4), performance, __cat("\u200b", name), fiber)) : performance.measure(__cat("\u200b", name), fiber);
      }
    }
  }
  function logComponentEffect(fiber, startTime, endTime, selfTime, errors) {
    let name, i, __error;
    if (undefined !== errors) {
      if (supportsUserTiming) {
        name = getComponentNameFromFiber(fiber);
        if (undefined !== name) {
          selfTime = __arrNew();
          for (i = 0; i < __len(errors); i++) {
            __error = errors[i].value;
            __push(selfTime, __arrNew("Error", "object" === typeOfJS(__error) && undefined !== __error && "string" === typeOfJS(__error.message) ? String(__error.message) : String(__error)));
          }
          undefined !== fiber.key && addValueToProperties("key", fiber.key, selfTime, 0, "");
          undefined !== fiber.memoizedProps && addObjectToProperties(fiber.memoizedProps, selfTime, 0, "");
          startTime = {
            start: startTime,
            end: endTime,
            detail: {
              devtools: {
                color: "error",
                track: "Components \u269b",
                tooltipText: "A lifecycle or effect errored",
                properties: selfTime
              }
            }
          };
          (fiber = fiber._debugTask) ? fiber.run(__partial((..._bindArgs5) => __applyFn(performance.measure, ..._bindArgs5), performance, __cat("\u200b", name), startTime)) : performance.measure(__cat("\u200b", name), startTime);
        }
      }
    } else name = getComponentNameFromFiber(fiber), undefined !== name && supportsUserTiming && (errors = 1 > selfTime ? "secondary-light" : 100 > selfTime ? "secondary" : 500 > selfTime ? "secondary-dark" : "error", (fiber = fiber._debugTask) ? fiber.run(__partial((..._bindArgs6) => __applyFn(console.timeStamp, ..._bindArgs6), console, name, startTime, endTime, "Components \u269b", void 0, errors)) : console.timeStamp(name, startTime, endTime, "Components \u269b", void 0, errors));
  }
  function logRenderPhase(startTime, endTime, lanes, debugTask) {
    let color;
    if (supportsUserTiming && !(endTime <= startTime)) {
      color = (lanes & 738197653) === lanes ? "tertiary-dark" : "primary-dark";
      lanes = (lanes & 536870912) === lanes ? "Prepared" : (lanes & 201326741) === lanes ? "Hydrated" : "Render";
      debugTask ? debugTask.run(__partial((..._bindArgs7) => __applyFn(console.timeStamp, ..._bindArgs7), console, lanes, startTime, endTime, currentTrack, "Scheduler \u269b", color)) : console.timeStamp(lanes, startTime, endTime, currentTrack, "Scheduler \u269b", color);
    }
  }
  function logSuspendedRenderPhase(startTime, endTime, lanes, debugTask) {
    !supportsUserTiming || endTime <= startTime || (lanes = (lanes & 738197653) === lanes ? "tertiary-dark" : "primary-dark", debugTask ? debugTask.run(__partial((..._bindArgs8) => __applyFn(console.timeStamp, ..._bindArgs8), console, "Prewarm", startTime, endTime, currentTrack, "Scheduler \u269b", lanes)) : console.timeStamp("Prewarm", startTime, endTime, currentTrack, "Scheduler \u269b", lanes));
  }
  function logSuspendedWithDelayPhase(startTime, endTime, lanes, debugTask) {
    !supportsUserTiming || endTime <= startTime || (lanes = (lanes & 738197653) === lanes ? "tertiary-dark" : "primary-dark", debugTask ? debugTask.run(__partial((..._bindArgs9) => __applyFn(console.timeStamp, ..._bindArgs9), console, "Suspended", startTime, endTime, currentTrack, "Scheduler \u269b", lanes)) : console.timeStamp("Suspended", startTime, endTime, currentTrack, "Scheduler \u269b", lanes));
  }
  function logRecoveredRenderPhase(startTime, endTime, lanes, recoverableErrors, hydrationFailed, debugTask) {
    let i, __error;
    if (supportsUserTiming && !(endTime <= startTime)) {
      lanes = __arrNew();
      for (i = 0; i < __len(recoverableErrors); i++) {
        __error = recoverableErrors[i].value;
        __push(lanes, __arrNew("Recoverable Error", "object" === typeOfJS(__error) && undefined !== __error && "string" === typeOfJS(__error.message) ? String(__error.message) : String(__error)));
      }
      startTime = {
        start: startTime,
        end: endTime,
        detail: {
          devtools: {
            color: "primary-dark",
            track: currentTrack,
            trackGroup: "Scheduler \u269b",
            tooltipText: hydrationFailed ? "Hydration Failed" : "Recovered after Error",
            properties: lanes
          }
        }
      };
      debugTask ? debugTask.run(__partial((..._bindArgs0) => __applyFn(performance.measure, ..._bindArgs0), performance, "Recovered", startTime)) : performance.measure("Recovered", startTime);
    }
  }
  function logErroredRenderPhase(startTime, endTime, lanes, debugTask) {
    !supportsUserTiming || endTime <= startTime || (debugTask ? debugTask.run(__partial((..._bindArgs1) => __applyFn(console.timeStamp, ..._bindArgs1), console, "Errored", startTime, endTime, currentTrack, "Scheduler \u269b", "error")) : console.timeStamp("Errored", startTime, endTime, currentTrack, "Scheduler \u269b", "error"));
  }
  function logSuspendedCommitPhase(startTime, endTime, reason, debugTask) {
    !supportsUserTiming || endTime <= startTime || (debugTask ? debugTask.run(__partial((..._bindArgs10) => __applyFn(console.timeStamp, ..._bindArgs10), console, reason, startTime, endTime, currentTrack, "Scheduler \u269b", "secondary-light")) : console.timeStamp(reason, startTime, endTime, currentTrack, "Scheduler \u269b", "secondary-light"));
  }
  function logCommitErrored(startTime, endTime, errors, passive, debugTask) {
    let properties, i, __error;
    if (supportsUserTiming && !(endTime <= startTime)) {
      for (properties = __arrNew(), i = 0; i < __len(errors); i++) {
        __error = errors[i].value;
        __push(properties, __arrNew("Error", "object" === typeOfJS(__error) && undefined !== __error && "string" === typeOfJS(__error.message) ? String(__error.message) : String(__error)));
      }
      startTime = {
        start: startTime,
        end: endTime,
        detail: {
          devtools: {
            color: "error",
            track: currentTrack,
            trackGroup: "Scheduler \u269b",
            tooltipText: passive ? "Remaining Effects Errored" : "Commit Errored",
            properties: properties
          }
        }
      };
      debugTask ? debugTask.run(__partial((..._bindArgs11) => __applyFn(performance.measure, ..._bindArgs11), performance, "Errored", startTime)) : performance.measure("Errored", startTime);
    }
  }
  function disabledLog() {}
  function disableLogs() {
    let props;
    if (0 === disabledDepth) {
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd;
      props = {
        configurable: !0,
        enumerable: !0,
        value: disabledLog,
        writable: !0
      };
      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
    }
    disabledDepth++;
  }
  function reenableLogs() {
    let props;
    disabledDepth--;
    if (0 === disabledDepth) {
      props = {
        configurable: !0,
        enumerable: !0,
        writable: !0
      };
      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
    }
    0 > disabledDepth && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
  }
  function formatOwnerStack(__error) {
    let prevPrepareStackTrace;
    prevPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    __error = __error.stack;
    Error.prepareStackTrace = prevPrepareStackTrace;
    __startsWith(__error, "Error: react-stack-top-frame\n") && (__error = __slice(__error, 29));
    prevPrepareStackTrace = __indexOf(__error, "\n");
    -1 !== prevPrepareStackTrace && (__error = __slice(__error, __cat(prevPrepareStackTrace, 1)));
    prevPrepareStackTrace = __indexOf(__error, "react_stack_bottom_frame");
    -1 !== prevPrepareStackTrace && (prevPrepareStackTrace = __error.lastIndexOf("\n", prevPrepareStackTrace));
    if (-1 !== prevPrepareStackTrace) __error = __slice(__error, 0, prevPrepareStackTrace);else return "";
    return __error;
  }
  function describeBuiltInComponentFrame(name) {
    let match;
    if (void 0 === prefix) try {
      throw Error();
    } catch (x) {
      match = __match(__trim(x.stack), __re("\\n( *(at )?)", ""));
      prefix = match && match[1] || "";
      suffix = -1 < __indexOf(x.stack, "\n    at") ? " (<anonymous>)" : -1 < __indexOf(x.stack, "@") ? "@unknown:0:0" : "";
    }
    return __cat(__cat(__cat("\n", prefix), name), suffix);
  }
  function describeNativeComponentFrame(fn, construct) {
    let frame, previousDispatcher, RunInRootFrame, namePropDescriptor, _RunInRootFrame_Deter, sampleStack, controlStack, sampleLines, controlLines, _frame;
    if (!fn || reentry) return "";
    frame = componentFrameCache.get(fn);
    if (void 0 !== frame) return frame;
    reentry = !0;
    frame = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    previousDispatcher = undefined;
    previousDispatcher = ReactSharedInternals.H;
    ReactSharedInternals.H = undefined;
    disableLogs();
    try {
      RunInRootFrame = {
        DetermineComponentFrameRoot: function () {
          let Fake, control;
          try {
            if (construct) {
              Fake = function () {
                throw Error();
              };
              Object.defineProperty(__protoOf(Fake), "props", {
                set: function () {
                  throw Error();
                }
              });
              if ("object" === typeOfJS(Reflect) && Reflect.construct) {
                try {
                  Reflect.construct(Fake, __arrNew());
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, __arrNew(), Fake);
              } else {
                try {
                  __callFn(Fake);
                } catch (x_0) {
                  control = x_0;
                }
                __callFn(fn, __protoOf(Fake));
              }
            } else {
              try {
                throw Error();
              } catch (x_1) {
                control = x_1;
              }
              (Fake = fn()) && "function" === typeOfJS(Fake.catch) && Fake.catch(function () {});
            }
          } catch (sample) {
            if (sample && control && "string" === typeOfJS(sample.stack)) return __arrNew(sample.stack, control.stack);
          }
          return __arrNew(undefined, undefined);
        }
      };
      RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
      namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot"
      });
      _RunInRootFrame_Deter = RunInRootFrame.DetermineComponentFrameRoot();
      sampleStack = _RunInRootFrame_Deter[0];
      controlStack = _RunInRootFrame_Deter[1];
      if (sampleStack && controlStack) {
        sampleLines = __split(sampleStack, "\n");
        controlLines = __split(controlStack, "\n");
        for (_RunInRootFrame_Deter = namePropDescriptor = 0; namePropDescriptor < __len(sampleLines) && !__includes(sampleLines[namePropDescriptor], "DetermineComponentFrameRoot");) namePropDescriptor++;
        for (; _RunInRootFrame_Deter < __len(controlLines) && !__includes(controlLines[_RunInRootFrame_Deter], "DetermineComponentFrameRoot");) _RunInRootFrame_Deter++;
        if (namePropDescriptor === __len(sampleLines) || _RunInRootFrame_Deter === __len(controlLines)) for (namePropDescriptor = __len(sampleLines) - 1, _RunInRootFrame_Deter = __len(controlLines) - 1; 1 <= namePropDescriptor && 0 <= _RunInRootFrame_Deter && sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame_Deter];) _RunInRootFrame_Deter--;
        for (; 1 <= namePropDescriptor && 0 <= _RunInRootFrame_Deter; namePropDescriptor--, _RunInRootFrame_Deter--) if (sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame_Deter]) {
          if (1 !== namePropDescriptor || 1 !== _RunInRootFrame_Deter) {
            do if (namePropDescriptor--, _RunInRootFrame_Deter--, 0 > _RunInRootFrame_Deter || sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame_Deter]) {
              _frame = __cat("\n", __replace(sampleLines[namePropDescriptor], " at new ", " at "));
              fn.displayName && __includes(_frame, "<anonymous>") && (_frame = __replace(_frame, "<anonymous>", fn.displayName));
              "function" === typeOfJS(fn) && componentFrameCache.set(fn, _frame);
              return _frame;
            } while (1 <= namePropDescriptor && 0 <= _RunInRootFrame_Deter);
          }
          break;
        }
      }
    } finally {
      reentry = !1, ReactSharedInternals.H = previousDispatcher, reenableLogs(), Error.prepareStackTrace = frame;
    }
    sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(sampleLines) : "";
    "function" === typeOfJS(fn) && componentFrameCache.set(fn, sampleLines);
    return sampleLines;
  }
  function describeFiber(fiber, childFiber) {
    switch (fiber.tag) {
      case 26:
      case 27:
      case 5:
        return describeBuiltInComponentFrame(fiber.type);
      case 16:
        return describeBuiltInComponentFrame("Lazy");
      case 13:
        return fiber.child !== childFiber && undefined !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
      case 19:
        return describeBuiltInComponentFrame("SuspenseList");
      case 0:
      case 15:
        return describeNativeComponentFrame(fiber.type, !1);
      case 11:
        return describeNativeComponentFrame(fiber.type.render, !1);
      case 1:
        return describeNativeComponentFrame(fiber.type, !0);
      case 31:
        return describeBuiltInComponentFrame("Activity");
      default:
        return "";
    }
  }
  function getStackByFiberInDevAndProd(workInProgress) {
    let info, previous, debugInfo, i, entry, JSCompiler_temp_const, name, env, location, childStack, idx, lastLine, JSCompiler_inline_result;
    try {
      info = "";
      previous = undefined;
      do {
        info += describeFiber(workInProgress, previous);
        debugInfo = workInProgress._debugInfo;
        if (debugInfo) for (i = __len(debugInfo) - 1; 0 <= i; i--) {
          entry = debugInfo[i];
          if ("string" === typeOfJS(entry.name)) {
            JSCompiler_temp_const = info;
            {
              let __lb_20 = false,
                __lc_20 = false;
              while (!__lb_20) {
                {
                  name = entry.name;
                  env = entry.env;
                  location = entry.debugLocation;
                  if (location !== undefined) {
                    childStack = formatOwnerStack(location);
                    idx = childStack.lastIndexOf("\n");
                    lastLine = -1 === idx ? childStack : __slice(childStack, __cat(idx, 1));
                    if (-1 !== __indexOf(lastLine, name)) {
                      JSCompiler_inline_result = __cat("\n", lastLine);
                      {
                        __lb_20 = true;
                        break;
                      }
                    }
                  }
                  JSCompiler_inline_result = describeBuiltInComponentFrame(__cat(name, env ? __cat(__cat(" [", env), "]") : ""));
                }
                break;
              }
            }
            info = __cat(JSCompiler_temp_const, JSCompiler_inline_result);
          }
        }
        previous = workInProgress;
        workInProgress = workInProgress.return;
      } while (workInProgress);
      return info;
    } catch (x) {
      return __cat(__cat(__cat("\nError generating stack: ", x.message), "\n"), x.stack);
    }
  }
  function describeFunctionComponentFrameWithoutLineNumber(fn) {
    return (fn = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(fn) : "";
  }
  function createCapturedValueAtFiber(value, source) {
    let existing;
    if ("object" === typeOfJS(value) && undefined !== value) {
      existing = CapturedStacks.get(value);
      if (void 0 !== existing) return existing;
      source = {
        value: value,
        source: source,
        stack: getStackByFiberInDevAndProd(source)
      };
      CapturedStacks.set(value, source);
      return source;
    }
    return {
      value: value,
      source: source,
      stack: getStackByFiberInDevAndProd(source)
    };
  }
  function pushTreeFork(workInProgress, totalChildren) {
    warnIfNotHydrating();
    forkStack[forkStackIndex++] = treeForkCount;
    forkStack[forkStackIndex++] = treeForkProvider;
    treeForkProvider = workInProgress;
    treeForkCount = totalChildren;
  }
  function pushTreeId(workInProgress, totalChildren, index) {
    let baseIdWithLeadingBit, baseLength, length, numberOfOverflowBits;
    warnIfNotHydrating();
    idStack[idStackIndex++] = treeContextId;
    idStack[idStackIndex++] = treeContextOverflow;
    idStack[idStackIndex++] = treeContextProvider;
    treeContextProvider = workInProgress;
    baseIdWithLeadingBit = treeContextId;
    workInProgress = treeContextOverflow;
    baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
    baseIdWithLeadingBit &= ~(1 << baseLength);
    index += 1;
    length = __cat(32 - clz32(totalChildren), baseLength);
    if (30 < length) {
      numberOfOverflowBits = baseLength - baseLength % 5;
      length = __numToBase(baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1, 32);
      baseIdWithLeadingBit >>= numberOfOverflowBits;
      baseLength -= numberOfOverflowBits;
      treeContextId = 1 << __cat(32 - clz32(totalChildren), baseLength) | index << baseLength | baseIdWithLeadingBit;
      treeContextOverflow = __cat(length, workInProgress);
    } else treeContextId = 1 << length | index << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress;
  }
  function pushMaterializedTreeId(workInProgress) {
    warnIfNotHydrating();
    undefined !== workInProgress.return && (pushTreeFork(workInProgress, 1), pushTreeId(workInProgress, 1, 0));
  }
  function popTreeContext(workInProgress) {
    for (; workInProgress === treeForkProvider;) treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = undefined, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = undefined;
    for (; workInProgress === treeContextProvider;) treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = undefined, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = undefined, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = undefined;
  }
  function getSuspendedTreeContext() {
    warnIfNotHydrating();
    return undefined !== treeContextProvider ? {
      id: treeContextId,
      overflow: treeContextOverflow
    } : undefined;
  }
  function restoreSuspendedTreeContext(workInProgress, suspendedContext) {
    warnIfNotHydrating();
    idStack[idStackIndex++] = treeContextId;
    idStack[idStackIndex++] = treeContextOverflow;
    idStack[idStackIndex++] = treeContextProvider;
    treeContextId = suspendedContext.id;
    treeContextOverflow = suspendedContext.overflow;
    treeContextProvider = workInProgress;
  }
  function warnIfNotHydrating() {
    isHydrating || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  function requiredContext(c) {
    undefined === c && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return c;
  }
  function pushHostContainer(fiber, nextRootInstance) {
    push(rootInstanceStackCursor, nextRootInstance, fiber);
    push(contextFiberStackCursor, fiber, fiber);
    push(contextStackCursor, undefined, fiber);
    nextRootInstance = getRootHostContext(nextRootInstance);
    pop(contextStackCursor, fiber);
    push(contextStackCursor, nextRootInstance, fiber);
  }
  function popHostContainer(fiber) {
    pop(contextStackCursor, fiber);
    pop(contextFiberStackCursor, fiber);
    pop(rootInstanceStackCursor, fiber);
  }
  function getHostContext() {
    return requiredContext(contextStackCursor.current);
  }
  function pushHostContext(fiber) {
    let context, nextContext;
    undefined !== fiber.memoizedState && push(hostTransitionProviderCursor, fiber, fiber);
    context = requiredContext(contextStackCursor.current);
    nextContext = getChildHostContext(context, fiber.type);
    context !== nextContext && (push(contextFiberStackCursor, fiber, fiber), push(contextStackCursor, nextContext, fiber));
  }
  function popHostContext(fiber) {
    contextFiberStackCursor.current === fiber && (pop(contextStackCursor, fiber), pop(contextFiberStackCursor, fiber));
    hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor, fiber), isPrimaryRenderer ? HostTransitionContext._currentValue = NotPendingTransition : HostTransitionContext._currentValue2 = NotPendingTransition);
  }
  function findNotableNode(node, indent) {
    return void 0 === node.serverProps && 0 === __len(node.serverTail) && 1 === __len(node.children) && 3 < node.distanceFromLeaf && node.distanceFromLeaf > 15 - indent ? findNotableNode(node.children[0], indent) : node;
  }
  function indentation(indent) {
    return __cat("  ", __repeat("  ", indent));
  }
  function added(indent) {
    return __cat("+ ", __repeat("  ", indent));
  }
  function removed(indent) {
    return __cat("- ", __repeat("  ", indent));
  }
  function describeFiberType(fiber) {
    switch (fiber.tag) {
      case 26:
      case 27:
      case 5:
        return fiber.type;
      case 16:
        return "Lazy";
      case 31:
        return "Activity";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 0:
      case 15:
        return fiber = fiber.type, fiber.displayName || fiber.name || undefined;
      case 11:
        return fiber = fiber.type.render, fiber.displayName || fiber.name || undefined;
      case 1:
        return fiber = fiber.type, fiber.displayName || fiber.name || undefined;
      default:
        return undefined;
    }
  }
  function describeTextNode(content, maxLength) {
    return needsEscaping.test(content) ? (content = JSON.stringify(content), __len(content) > maxLength - 2 ? 8 > maxLength ? '{"..."}' : __cat(__cat("{", __slice(content, 0, maxLength - 7)), '..."}') : __cat(__cat("{", content), "}")) : __len(content) > maxLength ? 5 > maxLength ? '{"..."}' : __cat(__slice(content, 0, maxLength - 3), "...") : content;
  }
  function describeTextDiff(clientText, serverProps, indent) {
    let maxLength, firstDiff;
    maxLength = 120 - 2 * indent;
    if (undefined === serverProps) return __cat(__cat(added(indent), describeTextNode(clientText, maxLength)), "\n");
    if ("string" === typeOfJS(serverProps)) {
      for (firstDiff = 0; firstDiff < __len(serverProps) && firstDiff < __len(clientText) && __charCodeAt(serverProps, firstDiff) === __charCodeAt(clientText, firstDiff); firstDiff++);
      firstDiff > maxLength - 8 && 10 < firstDiff && (clientText = __cat("...", __slice(clientText, firstDiff - 8)), serverProps = __cat("...", __slice(serverProps, firstDiff - 8)));
      return __cat(__cat(__cat(__cat(__cat(added(indent), describeTextNode(clientText, maxLength)), "\n"), removed(indent)), describeTextNode(serverProps, maxLength)), "\n");
    }
    return __cat(__cat(indentation(indent), describeTextNode(clientText, maxLength)), "\n");
  }
  function objectName(object) {
    return __replace(__callFn(__protoOf(Object).toString, object), __re("^\\[object (.*)\\]$", ""), function (m, p0) {
      return p0;
    });
  }
  function describeValue(value, maxLength) {
    let name, propName, jsonPropName;
    switch (typeOfJS(value)) {
      case "string":
        return value = JSON.stringify(value), __len(value) > maxLength ? 5 > maxLength ? '"..."' : __cat(__slice(value, 0, maxLength - 4), '..."') : value;
      case "object":
        if (undefined === value) return "null";
        if (isArrayImpl(value)) return "[...]";
        if (value.$$typeof === REACT_ELEMENT_TYPE) return (maxLength = getComponentNameFromType(value.type)) ? __cat(__cat("<", maxLength), ">") : "<...>";
        name = objectName(value);
        if ("Object" === name) {
          name = "";
          maxLength -= 2;
          for (const __k of Object.keys(value)) {
            propName = __k;
            if (Object.hasOwnProperty(value, propName)) {
              jsonPropName = JSON.stringify(propName);
              jsonPropName !== __cat(__cat('"', propName), '"') && (propName = jsonPropName);
              maxLength -= __len(propName) - 2;
              jsonPropName = describeValue(value[propName], 15 > maxLength ? maxLength : 15);
              maxLength -= __len(jsonPropName);
              if (0 > maxLength) {
                name += "" === name ? "..." : ", ...";
                break;
              }
              name += __cat(__cat(__cat("" === name ? "" : ",", propName), ":"), jsonPropName);
            }
          }
          return __cat(__cat("{", name), "}");
        }
        return name;
      case "function":
        return (maxLength = value.displayName || value.name) ? __cat("function ", maxLength) : "function";
      default:
        return String(value);
    }
  }
  function describePropValue(value, maxLength) {
    return "string" !== typeOfJS(value) || needsEscaping.test(value) ? __cat(__cat("{", describeValue(value, maxLength - 2)), "}") : __len(value) > maxLength - 2 ? 5 > maxLength ? '"..."' : __cat(__cat('"', __slice(value, 0, maxLength - 5)), '..."') : __cat(__cat('"', value), '"');
  }
  function describeExpandedElement(__type, props, rowPrefix) {
    let remainingRowLength, properties, propName, propValue;
    remainingRowLength = 120 - __len(rowPrefix) - __len(__type);
    properties = __arrNew();
    for (const __k of Object.keys(props)) {
      propName = __k;
      if (Object.hasOwnProperty(props, propName) && "children" !== propName) {
        propValue = describePropValue(props[propName], 120 - __len(rowPrefix) - __len(propName) - 1);
        remainingRowLength -= __cat(__cat(__len(propName), __len(propValue)), 2);
        __push(properties, __cat(__cat(propName, "="), propValue));
      }
    }
    return 0 === __len(properties) ? __cat(__cat(__cat(rowPrefix, "<"), __type), ">\n") : 0 < remainingRowLength ? __cat(__cat(__cat(__cat(__cat(rowPrefix, "<"), __type), " "), __join(properties, " ")), ">\n") : __cat(__cat(__cat(__cat(__cat(__cat(__cat(__cat(__cat(rowPrefix, "<"), __type), "\n"), rowPrefix), "  "), __join(properties, __cat(__cat("\n", rowPrefix), "  "))), "\n"), rowPrefix), ">\n");
  }
  function describePropertiesDiff(clientObject, serverObject, indent) {
    let properties, remainingServerProperties, propName, maxLength, clientPropValue, _propName;
    properties = "";
    remainingServerProperties = assign({}, serverObject);
    for (const __k of Object.keys(clientObject)) {
      propName = __k;
      if (Object.hasOwnProperty(clientObject, propName)) {
        delete remainingServerProperties[propName];
        maxLength = 120 - 2 * indent - __len(propName) - 2;
        clientPropValue = describeValue(clientObject[propName], maxLength);
        Object.hasOwnProperty(serverObject, propName) ? (maxLength = describeValue(serverObject[propName], maxLength), properties += __cat(__cat(__cat(__cat(added(indent), propName), ": "), clientPropValue), "\n"), properties += __cat(__cat(__cat(__cat(removed(indent), propName), ": "), maxLength), "\n")) : properties += __cat(__cat(__cat(__cat(added(indent), propName), ": "), clientPropValue), "\n");
      }
    }
    for (const __k of Object.keys(remainingServerProperties)) {
      _propName = __k;
      Object.hasOwnProperty(remainingServerProperties, _propName) && (clientObject = describeValue(remainingServerProperties[_propName], 120 - 2 * indent - __len(_propName) - 2), properties += __cat(__cat(__cat(__cat(removed(indent), _propName), ": "), clientObject), "\n"));
    }
    return properties;
  }
  function describeElementDiff(__type, clientProps, serverProps, indent) {
    let content, serverPropNames, _propName2, maxLength_jscomp_0, serverPropName, propName_jscomp_0, clientPropValue;
    content = "";
    serverPropNames = __new(Map);
    for (const __k of Object.keys(serverProps)) {
      propName_jscomp_0 = __k;
      Object.hasOwnProperty(serverProps, propName_jscomp_0) && serverPropNames.set(__toLowerCase(propName_jscomp_0), propName_jscomp_0);
    }
    if (1 === serverPropNames.size && serverPropNames.has("children")) content += describeExpandedElement(__type, clientProps, indentation(indent));else {
      for (const __k of Object.keys(clientProps)) {
        _propName2 = __k;
        if (Object.hasOwnProperty(clientProps, _propName2) && "children" !== _propName2) {
          maxLength_jscomp_0 = 120 - 2 * __cat(indent, 1) - __len(_propName2) - 1;
          serverPropName = serverPropNames.get(__toLowerCase(_propName2));
          if (void 0 !== serverPropName) {
            serverPropNames.delete(__toLowerCase(_propName2));
            propName_jscomp_0 = clientProps[_propName2];
            serverPropName = serverProps[serverPropName];
            clientPropValue = describePropValue(propName_jscomp_0, maxLength_jscomp_0);
            maxLength_jscomp_0 = describePropValue(serverPropName, maxLength_jscomp_0);
            "object" === typeOfJS(propName_jscomp_0) && undefined !== propName_jscomp_0 && "object" === typeOfJS(serverPropName) && undefined !== serverPropName && "Object" === objectName(propName_jscomp_0) && "Object" === objectName(serverPropName) && (2 < __len(Object.keys(propName_jscomp_0)) || 2 < __len(Object.keys(serverPropName)) || -1 < __indexOf(clientPropValue, "...") || -1 < __indexOf(maxLength_jscomp_0, "...")) ? content += __cat(__cat(__cat(__cat(__cat(indentation(__cat(indent, 1)), _propName2), "={{\n"), describePropertiesDiff(propName_jscomp_0, serverPropName, __cat(indent, 2))), indentation(__cat(indent, 1))), "}}\n") : (content += __cat(__cat(__cat(__cat(added(__cat(indent, 1)), _propName2), "="), clientPropValue), "\n"), content += __cat(__cat(__cat(__cat(removed(__cat(indent, 1)), _propName2), "="), maxLength_jscomp_0), "\n"));
          } else content += __cat(__cat(__cat(__cat(indentation(__cat(indent, 1)), _propName2), "="), describePropValue(clientProps[_propName2], maxLength_jscomp_0)), "\n");
        }
      }
      __forEach(serverPropNames, function (propName) {
        let maxLength;
        if ("children" !== propName) {
          maxLength = 120 - 2 * __cat(indent, 1) - __len(propName) - 1;
          content += __cat(__cat(__cat(__cat(removed(__cat(indent, 1)), propName), "="), describePropValue(serverProps[propName], maxLength)), "\n");
        }
      });
      content = "" === content ? __cat(__cat(__cat(indentation(indent), "<"), __type), ">\n") : __cat(__cat(__cat(__cat(__cat(__cat(indentation(indent), "<"), __type), "\n"), content), indentation(indent)), ">\n");
    }
    __type = serverProps.children;
    clientProps = clientProps.children;
    if ("string" === typeOfJS(__type) || "number" === typeOfJS(__type) || "bigint" === typeOfJS(__type)) {
      serverPropNames = "";
      if ("string" === typeOfJS(clientProps) || "number" === typeOfJS(clientProps) || "bigint" === typeOfJS(clientProps)) serverPropNames = __cat("", clientProps);
      content += describeTextDiff(serverPropNames, __cat("", __type), __cat(indent, 1));
    } else if ("string" === typeOfJS(clientProps) || "number" === typeOfJS(clientProps) || "bigint" === typeOfJS(clientProps)) content = __type === undefined ? __cat(content, describeTextDiff(__cat("", clientProps), undefined, __cat(indent, 1))) : __cat(content, describeTextDiff(__cat("", clientProps), void 0, __cat(indent, 1)));
    return content;
  }
  function describeSiblingFiber(fiber, indent) {
    let __type;
    __type = describeFiberType(fiber);
    if (undefined === __type) {
      __type = "";
      for (fiber = fiber.child; fiber;) __type += describeSiblingFiber(fiber, indent), fiber = fiber.sibling;
      return __type;
    }
    return __cat(__cat(__cat(indentation(indent), "<"), __type), ">\n");
  }
  function describeNode(_node2, indent) {
    let skipToNode, debugInfo, i, serverComponentName, maxLength, content, propValue, propName;
    skipToNode = findNotableNode(_node2, indent);
    if (skipToNode !== _node2 && (1 !== __len(_node2.children) || _node2.children[0] !== skipToNode)) return __cat(__cat(indentation(indent), "...\n"), describeNode(skipToNode, __cat(indent, 1)));
    skipToNode = "";
    debugInfo = _node2.fiber._debugInfo;
    if (debugInfo) for (i = 0; i < __len(debugInfo); i++) {
      serverComponentName = debugInfo[i].name;
      "string" === typeOfJS(serverComponentName) && (skipToNode += __cat(__cat(__cat(indentation(indent), "<"), serverComponentName), ">\n"), indent++);
    }
    debugInfo = "";
    i = _node2.fiber.pendingProps;
    if (6 === _node2.fiber.tag) debugInfo = describeTextDiff(i, _node2.serverProps, indent), indent++;else if (serverComponentName = describeFiberType(_node2.fiber), undefined !== serverComponentName) if (void 0 === _node2.serverProps) {
      debugInfo = indent;
      maxLength = 120 - 2 * debugInfo - __len(serverComponentName) - 2;
      content = "";
      for (const __k of Object.keys(i)) {
        propName = __k;
        if (Object.hasOwnProperty(i, propName) && "children" !== propName) {
          propValue = describePropValue(i[propName], 15);
          maxLength -= __cat(__cat(__len(propName), __len(propValue)), 2);
          if (0 > maxLength) {
            content += " ...";
            break;
          }
          content += __cat(__cat(__cat(" ", propName), "="), propValue);
        }
      }
      debugInfo = __cat(__cat(__cat(__cat(indentation(debugInfo), "<"), serverComponentName), content), ">\n");
      indent++;
    } else undefined === _node2.serverProps ? (debugInfo = describeExpandedElement(serverComponentName, i, added(indent)), indent++) : "string" === typeOfJS(_node2.serverProps) ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (debugInfo = describeElementDiff(serverComponentName, i, _node2.serverProps, indent), indent++);
    propName = "";
    i = _node2.fiber.child;
    for (serverComponentName = 0; i && serverComponentName < __len(_node2.children);) maxLength = _node2.children[serverComponentName], maxLength.fiber === i ? (propName += describeNode(maxLength, indent), serverComponentName++) : propName += describeSiblingFiber(i, indent), i = i.sibling;
    i && 0 < __len(_node2.children) && (propName += __cat(indentation(indent), "...\n"));
    i = _node2.serverTail;
    undefined === _node2.serverProps && indent--;
    for (let _node2 = 0; _node2 < __len(i); _node2++) serverComponentName = i[_node2], propName = "string" === typeOfJS(serverComponentName) ? __cat(propName, __cat(__cat(removed(indent), describeTextNode(serverComponentName, 120 - 2 * indent)), "\n")) : __cat(propName, describeExpandedElement(serverComponentName.type, serverComponentName.props, removed(indent)));
    return __cat(__cat(skipToNode, debugInfo), propName);
  }
  function describeDiff(rootNode) {
    try {
      return __cat("\n\n", describeNode(rootNode, 0));
    } catch (x) {
      return "";
    }
  }
  function getCurrentFiberStackInDev() {
    let workInProgress, info, fiber, debugStack, formattedStack, ownerStack, JSCompiler_inline_result;
    if (undefined === current) return "";
    workInProgress = current;
    try {
      info = "";
      6 === workInProgress.tag && (workInProgress = workInProgress.return);
      switch (workInProgress.tag) {
        case 26:
        case 27:
        case 5:
          info += describeBuiltInComponentFrame(workInProgress.type);
          break;
        case 13:
          info += describeBuiltInComponentFrame("Suspense");
          break;
        case 19:
          info += describeBuiltInComponentFrame("SuspenseList");
          break;
        case 31:
          info += describeBuiltInComponentFrame("Activity");
          break;
        case 30:
        case 0:
        case 15:
        case 1:
          workInProgress._debugOwner || "" !== info || (info += describeFunctionComponentFrameWithoutLineNumber(workInProgress.type));
          break;
        case 11:
          workInProgress._debugOwner || "" !== info || (info += describeFunctionComponentFrameWithoutLineNumber(workInProgress.type.render));
      }
      for (; workInProgress;) if ("number" === typeOfJS(workInProgress.tag)) {
        fiber = workInProgress;
        workInProgress = fiber._debugOwner;
        debugStack = fiber._debugStack;
        if (workInProgress && debugStack) {
          formattedStack = formatOwnerStack(debugStack);
          "" !== formattedStack && (info += __cat("\n", formattedStack));
        }
      } else if (workInProgress.debugStack !== undefined) {
        ownerStack = workInProgress.debugStack;
        (workInProgress = workInProgress.owner) && ownerStack && (info += __cat("\n", formatOwnerStack(ownerStack)));
      } else break;
      JSCompiler_inline_result = info;
    } catch (x) {
      JSCompiler_inline_result = __cat(__cat(__cat("\nError generating stack: ", x.message), "\n"), x.stack);
    }
    return JSCompiler_inline_result;
  }
  function runWithFiberInDEV(fiber, callback, arg0, arg1, arg2, arg3, arg4) {
    let previousFiber;
    previousFiber = current;
    setCurrentFiber(fiber);
    try {
      return undefined !== fiber && fiber._debugTask ? fiber._debugTask.run(__partial((..._bindArgs12) => __applyFn(callback, ..._bindArgs12), undefined, arg0, arg1, arg2, arg3, arg4)) : callback(arg0, arg1, arg2, arg3, arg4);
    } finally {
      setCurrentFiber(previousFiber);
    }
    throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
  }
  function setCurrentFiber(fiber) {
    ReactSharedInternals.getCurrentStack = undefined === fiber ? undefined : getCurrentFiberStackInDev;
    isRendering = !1;
    current = fiber;
  }
  function buildHydrationDiffNode(fiber, distanceFromLeaf) {
    let siblings;
    if (undefined === fiber.return) {
      if (undefined === hydrationDiffRootDEV) hydrationDiffRootDEV = {
        fiber: fiber,
        children: __arrNew(),
        serverProps: void 0,
        serverTail: __arrNew(),
        distanceFromLeaf: distanceFromLeaf
      };else {
        if (hydrationDiffRootDEV.fiber !== fiber) throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");
        hydrationDiffRootDEV.distanceFromLeaf > distanceFromLeaf && (hydrationDiffRootDEV.distanceFromLeaf = distanceFromLeaf);
      }
      return hydrationDiffRootDEV;
    }
    siblings = buildHydrationDiffNode(fiber.return, __cat(distanceFromLeaf, 1)).children;
    if (0 < __len(siblings) && siblings[__len(siblings) - 1].fiber === fiber) return siblings = siblings[__len(siblings) - 1], siblings.distanceFromLeaf > distanceFromLeaf && (siblings.distanceFromLeaf = distanceFromLeaf), siblings;
    distanceFromLeaf = {
      fiber: fiber,
      children: __arrNew(),
      serverProps: void 0,
      serverTail: __arrNew(),
      distanceFromLeaf: distanceFromLeaf
    };
    __push(siblings, distanceFromLeaf);
    return distanceFromLeaf;
  }
  function warnIfHydrating() {
    isHydrating && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function warnNonHydratedInstance(fiber, rejectedCandidate) {
    didSuspendOrErrorDEV || (fiber = buildHydrationDiffNode(fiber, 0), fiber.serverProps = undefined, undefined !== rejectedCandidate && (rejectedCandidate = describeHydratableInstanceForDevWarnings(rejectedCandidate), __push(fiber.serverTail, rejectedCandidate)));
  }
  function throwOnHydrationMismatch(fiber, ...__args) {
    let __allArgs = __arrNew(fiber, ...__args);
    let fromText, diff, diffRoot;
    fromText = 1 < __len(__allArgs) && void 0 !== __argAt(__allArgs, 1) ? __argAt(__allArgs, 1) : !1;
    diff = "";
    diffRoot = hydrationDiffRootDEV;
    undefined !== diffRoot && (hydrationDiffRootDEV = undefined, diff = describeDiff(diffRoot));
    queueHydrationError(createCapturedValueAtFiber(Error(__cat(__cat(__cat("Hydration failed because the server rendered ", fromText ? "text" : "HTML"), " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch"), diff)), fiber));
    throw HydrationMismatchException;
  }
  function prepareToHydrateHostInstance(fiber, hostContext) {
    if (!supportsHydration) throw Error("Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
    hydrateInstance(fiber.stateNode, fiber.type, fiber.memoizedProps, hostContext, fiber) || throwOnHydrationMismatch(fiber, !0);
  }
  function popToNextHostParent(fiber) {
    for (hydrationParentFiber = fiber.return; hydrationParentFiber;) switch (hydrationParentFiber.tag) {
      case 5:
      case 31:
      case 13:
        rootOrSingletonContext = !1;
        return;
      case 27:
      case 3:
        rootOrSingletonContext = !0;
        return;
      default:
        hydrationParentFiber = hydrationParentFiber.return;
    }
  }
  function popHydrationState(fiber) {
    let tag;
    if (!supportsHydration || fiber !== hydrationParentFiber) return !1;
    if (!isHydrating) return popToNextHostParent(fiber), isHydrating = !0, !1;
    tag = fiber.tag;
    supportsSingletons ? 3 !== tag && 27 !== tag && (5 !== tag || shouldDeleteUnhydratedTailInstances(fiber.type) && !shouldSetTextContent(fiber.type, fiber.memoizedProps)) && nextHydratableInstance && (warnIfUnhydratedTailNodes(fiber), throwOnHydrationMismatch(fiber)) : 3 !== tag && (5 !== tag || shouldDeleteUnhydratedTailInstances(fiber.type) && !shouldSetTextContent(fiber.type, fiber.memoizedProps)) && nextHydratableInstance && (warnIfUnhydratedTailNodes(fiber), throwOnHydrationMismatch(fiber));
    popToNextHostParent(fiber);
    if (13 === tag) {
      if (!supportsHydration) throw Error("Expected skipPastDehydratedSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
      fiber = fiber.memoizedState;
      fiber = undefined !== fiber ? fiber.dehydrated : undefined;
      if (!fiber) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      nextHydratableInstance = getNextHydratableInstanceAfterSuspenseInstance(fiber);
    } else if (31 === tag) {
      fiber = fiber.memoizedState;
      fiber = undefined !== fiber ? fiber.dehydrated : undefined;
      if (!fiber) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      nextHydratableInstance = getNextHydratableInstanceAfterActivityInstance(fiber);
    } else nextHydratableInstance = supportsSingletons && 27 === tag ? getNextHydratableSiblingAfterSingleton(fiber.type, nextHydratableInstance) : hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : undefined;
    return !0;
  }
  function warnIfUnhydratedTailNodes(fiber) {
    let nextInstance, diffNode, description;
    for (nextInstance = nextHydratableInstance; nextInstance;) {
      diffNode = buildHydrationDiffNode(fiber, 0);
      description = describeHydratableInstanceForDevWarnings(nextInstance);
      __push(diffNode.serverTail, description);
      nextInstance = "Suspense" === description.type ? getNextHydratableInstanceAfterSuspenseInstance(nextInstance) : getNextHydratableSibling(nextInstance);
    }
  }
  function resetHydrationState() {
    supportsHydration && (nextHydratableInstance = hydrationParentFiber = undefined, didSuspendOrErrorDEV = isHydrating = !1);
  }
  function upgradeHydrationErrorsToRecoverable() {
    let queuedErrors;
    queuedErrors = hydrationErrors;
    undefined !== queuedErrors && (undefined === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : __applyFn(workInProgressRootRecoverableErrors.push, workInProgressRootRecoverableErrors, queuedErrors), hydrationErrors = undefined);
    return queuedErrors;
  }
  function queueHydrationError(__error) {
    undefined === hydrationErrors ? hydrationErrors = __arrNew(__error) : __push(hydrationErrors, __error);
  }
  function emitPendingHydrationWarnings() {
    let diffRoot, diff;
    diffRoot = hydrationDiffRootDEV;
    if (undefined !== diffRoot) {
      hydrationDiffRootDEV = undefined;
      for (diff = describeDiff(diffRoot); 0 < __len(diffRoot.children);) diffRoot = diffRoot.children[0];
      runWithFiberInDEV(diffRoot.fiber, function () {
        console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", diff);
      });
    }
  }
  function resetContextDependencies() {
    lastContextDependency = currentlyRenderingFiber_1 = undefined;
    isDisallowedContextReadInDEV = !1;
  }
  function pushProvider(providerFiber, context, nextValue) {
    isPrimaryRenderer ? (push(valueCursor, context._currentValue, providerFiber), context._currentValue = nextValue, push(rendererCursorDEV, context._currentRenderer, providerFiber), void 0 !== context._currentRenderer && undefined !== context._currentRenderer && context._currentRenderer !== rendererSigil && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer = rendererSigil) : (push(valueCursor, context._currentValue2, providerFiber), context._currentValue2 = nextValue, push(renderer2CursorDEV, context._currentRenderer2, providerFiber), void 0 !== context._currentRenderer2 && undefined !== context._currentRenderer2 && context._currentRenderer2 !== rendererSigil && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer2 = rendererSigil);
  }
  function popProvider(context, providerFiber) {
    let currentValue;
    currentValue = valueCursor.current;
    isPrimaryRenderer ? (context._currentValue = currentValue, currentValue = rendererCursorDEV.current, pop(rendererCursorDEV, providerFiber), context._currentRenderer = currentValue) : (context._currentValue2 = currentValue, currentValue = renderer2CursorDEV.current, pop(renderer2CursorDEV, providerFiber), context._currentRenderer2 = currentValue);
    pop(valueCursor, providerFiber);
  }
  function scheduleContextWorkOnParentPath(parent, renderLanes, propagationRoot) {
    let alternate;
    for (; undefined !== parent;) {
      alternate = parent.alternate;
      (parent.childLanes & renderLanes) !== renderLanes ? (parent.childLanes |= renderLanes, undefined !== alternate && (alternate.childLanes |= renderLanes)) : undefined !== alternate && (alternate.childLanes & renderLanes) !== renderLanes && (alternate.childLanes |= renderLanes);
      if (parent === propagationRoot) break;
      parent = parent.return;
    }
    parent !== propagationRoot && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function propagateContextChanges(workInProgress, contexts, renderLanes, forcePropagateEntireTree) {
    let fiber, list, nextFiber, dependency, i;
    fiber = workInProgress.child;
    undefined !== fiber && (fiber.return = workInProgress);
    for (; undefined !== fiber;) {
      list = fiber.dependencies;
      if (undefined !== list) {
        nextFiber = fiber.child;
        list = list.firstContext;
        {
          let __lb_19 = false,
            __lc_19 = false;
          while (!__lb_19) {
            __lc_19 = false;
            while (undefined !== list) {
              {
                dependency = list;
                list = fiber;
                for (i = 0; i < __len(contexts); i++) if (dependency.context === contexts[i]) {
                  list.lanes |= renderLanes;
                  dependency = list.alternate;
                  undefined !== dependency && (dependency.lanes |= renderLanes);
                  scheduleContextWorkOnParentPath(list.return, renderLanes, workInProgress);
                  forcePropagateEntireTree || (nextFiber = undefined);
                  {
                    __lb_19 = true;
                    break;
                  }
                }
                if (__lb_19 || __lc_19) {
                  break;
                }
                list = dependency.next;
              }
              ;
            }
            if (__lc_19) {
              __lc_19 = false;
              ;
              continue;
            }
            break;
          }
        }
      } else if (18 === fiber.tag) {
        nextFiber = fiber.return;
        if (undefined === nextFiber) throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        nextFiber.lanes |= renderLanes;
        list = nextFiber.alternate;
        undefined !== list && (list.lanes |= renderLanes);
        scheduleContextWorkOnParentPath(nextFiber, renderLanes, workInProgress);
        nextFiber = undefined;
      } else nextFiber = fiber.child;
      if (undefined !== nextFiber) nextFiber.return = fiber;else for (nextFiber = fiber; undefined !== nextFiber;) {
        if (nextFiber === workInProgress) {
          nextFiber = undefined;
          break;
        }
        fiber = nextFiber.sibling;
        if (undefined !== fiber) {
          fiber.return = nextFiber.return;
          nextFiber = fiber;
          break;
        }
        nextFiber = nextFiber.return;
      }
      fiber = nextFiber;
    }
  }
  function propagateParentContextChanges(current, workInProgress, renderLanes, forcePropagateEntireTree) {
    let parent, isInsidePropagationBailout, currentParent, context;
    current = undefined;
    for (parent = workInProgress, isInsidePropagationBailout = !1; undefined !== parent;) {
      if (!isInsidePropagationBailout) if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = !0;else if (0 !== (parent.flags & 262144)) break;
      if (10 === parent.tag) {
        currentParent = parent.alternate;
        if (undefined === currentParent) throw Error("Should have a current fiber. This is a bug in React.");
        currentParent = currentParent.memoizedProps;
        if (undefined !== currentParent) {
          context = parent.type;
          objectIs(parent.pendingProps.value, currentParent.value) || (undefined !== current ? __push(current, context) : current = __arrNew(context));
        }
      } else if (parent === hostTransitionProviderCursor.current) {
        currentParent = parent.alternate;
        if (undefined === currentParent) throw Error("Should have a current fiber. This is a bug in React.");
        currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (undefined !== current ? __push(current, HostTransitionContext) : current = __arrNew(HostTransitionContext));
      }
      parent = parent.return;
    }
    undefined !== current && propagateContextChanges(workInProgress, current, renderLanes, forcePropagateEntireTree);
    workInProgress.flags |= 262144;
  }
  function checkIfContextChanged(currentDependencies) {
    let context;
    for (currentDependencies = currentDependencies.firstContext; undefined !== currentDependencies;) {
      context = currentDependencies.context;
      if (!objectIs(isPrimaryRenderer ? context._currentValue : context._currentValue2, currentDependencies.memoizedValue)) return !0;
      currentDependencies = currentDependencies.next;
    }
    return !1;
  }
  function prepareToReadContext(workInProgress) {
    currentlyRenderingFiber_1 = workInProgress;
    lastContextDependency = undefined;
    workInProgress = workInProgress.dependencies;
    undefined !== workInProgress && (workInProgress.firstContext = undefined);
  }
  function readContext(context) {
    isDisallowedContextReadInDEV && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    return readContextForConsumer(currentlyRenderingFiber_1, context);
  }
  function readContextDuringReconciliation(consumer, context) {
    undefined === currentlyRenderingFiber_1 && prepareToReadContext(consumer);
    return readContextForConsumer(consumer, context);
  }
  function readContextForConsumer(consumer, context) {
    let value;
    value = isPrimaryRenderer ? context._currentValue : context._currentValue2;
    context = {
      context: context,
      memoizedValue: value,
      next: undefined
    };
    if (undefined === lastContextDependency) {
      if (undefined === consumer) throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      lastContextDependency = context;
      consumer.dependencies = {
        lanes: 0,
        firstContext: context,
        _debugThenableState: undefined
      };
      consumer.flags |= 524288;
    } else lastContextDependency = lastContextDependency.next = context;
    return value;
  }
  function createCache() {
    return {
      controller: __new(AbortControllerLocal),
      data: __new(Map),
      refCount: 0
    };
  }
  function retainCache(cache) {
    cache.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React.");
    cache.refCount++;
  }
  function releaseCache(cache) {
    cache.refCount--;
    0 > cache.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React.");
    0 === cache.refCount && scheduleCallback_2(NormalPriority, function () {
      cache.controller.abort();
    });
  }
  function startUpdateTimerByLane(lane, method, fiber) {
    if (0 !== (lane & 127)) 0 > blockingUpdateTime && (blockingUpdateTime = now(), blockingUpdateTask = createTask(method), blockingUpdateMethodName = method, fiber !== undefined && (blockingUpdateComponentName = getComponentNameFromFiber(fiber)), isAlreadyRendering() && (componentEffectSpawnedUpdate = !0, blockingUpdateType = 1), lane = resolveEventTimeStamp(), method = resolveEventType(), lane !== blockingEventRepeatTime || method !== blockingEventType ? blockingEventRepeatTime = -1.1 : undefined !== method && (blockingUpdateType = 1), blockingEventTime = lane, blockingEventType = method);else if (0 !== (lane & 4194048) && 0 > transitionUpdateTime && (transitionUpdateTime = now(), transitionUpdateTask = createTask(method), transitionUpdateMethodName = method, fiber !== undefined && (transitionUpdateComponentName = getComponentNameFromFiber(fiber)), 0 > transitionStartTime)) {
      lane = resolveEventTimeStamp();
      method = resolveEventType();
      if (lane !== transitionEventRepeatTime || method !== transitionEventType) transitionEventRepeatTime = -1.1;
      transitionEventTime = lane;
      transitionEventType = method;
    }
  }
  function startHostActionTimer(fiber) {
    let newEventTime, newEventType;
    if (0 > blockingUpdateTime) {
      blockingUpdateTime = now();
      blockingUpdateTask = fiber._debugTask !== undefined ? fiber._debugTask : undefined;
      isAlreadyRendering() && (blockingUpdateType = 1);
      newEventTime = resolveEventTimeStamp();
      newEventType = resolveEventType();
      newEventTime !== blockingEventRepeatTime || newEventType !== blockingEventType ? blockingEventRepeatTime = -1.1 : undefined !== newEventType && (blockingUpdateType = 1);
      blockingEventTime = newEventTime;
      blockingEventType = newEventType;
    }
    if (0 > transitionUpdateTime && (transitionUpdateTime = now(), transitionUpdateTask = fiber._debugTask !== undefined ? fiber._debugTask : undefined, 0 > transitionStartTime)) {
      fiber = resolveEventTimeStamp();
      newEventTime = resolveEventType();
      if (fiber !== transitionEventRepeatTime || newEventTime !== transitionEventType) transitionEventRepeatTime = -1.1;
      transitionEventTime = fiber;
      transitionEventType = newEventTime;
    }
  }
  function pushNestedEffectDurations() {
    let prevEffectDuration;
    prevEffectDuration = profilerEffectDuration;
    profilerEffectDuration = 0;
    return prevEffectDuration;
  }
  function popNestedEffectDurations(prevEffectDuration) {
    let elapsedTime;
    elapsedTime = profilerEffectDuration;
    profilerEffectDuration = prevEffectDuration;
    return elapsedTime;
  }
  function bubbleNestedEffectDurations(prevEffectDuration) {
    let elapsedTime;
    elapsedTime = profilerEffectDuration;
    profilerEffectDuration += prevEffectDuration;
    return elapsedTime;
  }
  function resetComponentEffectTimers() {
    componentEffectEndTime = componentEffectStartTime = -1.1;
  }
  function pushComponentEffectStart() {
    let prevEffectStart;
    prevEffectStart = componentEffectStartTime;
    componentEffectStartTime = -1.1;
    return prevEffectStart;
  }
  function popComponentEffectStart(prevEffectStart) {
    0 <= prevEffectStart && (componentEffectStartTime = prevEffectStart);
  }
  function pushComponentEffectDuration() {
    let prevEffectDuration;
    prevEffectDuration = componentEffectDuration;
    componentEffectDuration = -0;
    return prevEffectDuration;
  }
  function popComponentEffectDuration(prevEffectDuration) {
    0 <= prevEffectDuration && (componentEffectDuration = prevEffectDuration);
  }
  function pushComponentEffectErrors() {
    let prevErrors;
    prevErrors = componentEffectErrors;
    componentEffectErrors = undefined;
    return prevErrors;
  }
  function pushComponentEffectDidSpawnUpdate() {
    let prev;
    prev = componentEffectSpawnedUpdate;
    componentEffectSpawnedUpdate = !1;
    return prev;
  }
  function startProfilerTimer(fiber) {
    profilerStartTime = now();
    0 > fiber.actualStartTime && (fiber.actualStartTime = profilerStartTime);
  }
  function stopProfilerTimerIfRunningAndRecordDuration(fiber) {
    let elapsedTime;
    if (0 <= profilerStartTime) {
      elapsedTime = now() - profilerStartTime;
      fiber.actualDuration += elapsedTime;
      fiber.selfBaseDuration = elapsedTime;
      profilerStartTime = -1;
    }
  }
  function stopProfilerTimerIfRunningAndRecordIncompleteDuration(fiber) {
    let elapsedTime;
    if (0 <= profilerStartTime) {
      elapsedTime = now() - profilerStartTime;
      fiber.actualDuration += elapsedTime;
      profilerStartTime = -1;
    }
  }
  function recordEffectDuration() {
    let endTime, elapsedTime;
    if (0 <= profilerStartTime) {
      endTime = now();
      elapsedTime = endTime - profilerStartTime;
      profilerStartTime = -1;
      profilerEffectDuration += elapsedTime;
      componentEffectDuration += elapsedTime;
      componentEffectEndTime = endTime;
    }
  }
  function recordEffectError(errorInfo) {
    undefined === componentEffectErrors && (componentEffectErrors = __arrNew());
    __push(componentEffectErrors, errorInfo);
    undefined === commitErrors && (commitErrors = __arrNew());
    __push(commitErrors, errorInfo);
  }
  function startEffectTimer() {
    profilerStartTime = now();
    0 > componentEffectStartTime && (componentEffectStartTime = profilerStartTime);
  }
  function transferActualDuration(fiber) {
    let child;
    for (child = fiber.child; child;) fiber.actualDuration += child.actualDuration, child = child.sibling;
  }
  function noop_1() {}
  function ensureRootIsScheduled(root) {
    root !== lastScheduledRoot && undefined === root.next && (undefined === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root : lastScheduledRoot = lastScheduledRoot.next = root);
    mightHavePendingSyncWork = !0;
    undefined !== ReactSharedInternals.actQueue ? didScheduleMicrotask_act || (didScheduleMicrotask_act = !0, scheduleImmediateRootScheduleTask()) : didScheduleMicrotask || (didScheduleMicrotask = !0, scheduleImmediateRootScheduleTask());
  }
  function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
    let didPerformSomeWork, root, pendingLanes, nextLanes, suspendedLanes, pingedLanes;
    if (!isFlushingWork && mightHavePendingSyncWork) {
      isFlushingWork = !0;
      do {
        didPerformSomeWork = !1;
        for (root = firstScheduledRoot; undefined !== root;) {
          if (!onlyLegacy) if (0 !== syncTransitionLanes) {
            pendingLanes = root.pendingLanes;
            if (0 === pendingLanes) {
              nextLanes = 0;
            } else {
              suspendedLanes = root.suspendedLanes;
              pingedLanes = root.pingedLanes;
              nextLanes = (1 << __cat(31 - clz32(42 | syncTransitionLanes), 1)) - 1;
              nextLanes &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
              nextLanes = nextLanes & 201326741 ? nextLanes & 201326741 | 1 : nextLanes ? nextLanes | 2 : 0;
            }
            0 !== nextLanes && (didPerformSomeWork = !0, performSyncWorkOnRoot(root, nextLanes));
          } else nextLanes = workInProgressRootRenderLanes, nextLanes = getNextLanes(root, root === workInProgressRoot ? nextLanes : 0, undefined !== root.cancelPendingCommit || root.timeoutHandle !== noTimeout), 0 === (nextLanes & 3) || checkIfRootIsPrerendering(root, nextLanes) || (didPerformSomeWork = !0, performSyncWorkOnRoot(root, nextLanes));
          root = root.next;
        }
      } while (didPerformSomeWork);
      isFlushingWork = !1;
    }
  }
  function processRootScheduleInImmediateTask() {
    trackSchedulerEvent();
    processRootScheduleInMicrotask();
  }
  function processRootScheduleInMicrotask() {
    let syncTransitionLanes, currentTime, prev, root, __next, nextLanes;
    mightHavePendingSyncWork = didScheduleMicrotask_act = didScheduleMicrotask = !1;
    syncTransitionLanes = 0;
    0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
    for (currentTime = now_1(), prev = undefined, root = firstScheduledRoot; undefined !== root;) {
      __next = root.next;
      nextLanes = scheduleTaskForRootDuringMicrotask(root, currentTime);
      if (0 === nextLanes) root.next = undefined, undefined === prev ? firstScheduledRoot = __next : prev.next = __next, undefined === __next && (lastScheduledRoot = prev);else if (prev = root, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3)) mightHavePendingSyncWork = !0;
      root = __next;
    }
    pendingEffectsStatus !== NO_PENDING_EFFECTS && pendingEffectsStatus !== PENDING_PASSIVE_PHASE || flushSyncWorkAcrossRoots_impl(syncTransitionLanes, !1);
    0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
  }
  function scheduleTaskForRootDuringMicrotask(root, currentTime) {
    let suspendedLanes, pingedLanes, expirationTimes, lanes, index, lane, expirationTime;
    for (suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes, expirationTimes = root.expirationTimes, lanes = root.pendingLanes & -62914561; 0 < lanes;) {
      index = 31 - clz32(lanes);
      lane = 1 << index;
      expirationTime = expirationTimes[index];
      if (-1 === expirationTime) {
        if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes)) expirationTimes[index] = computeExpirationTime(lane, currentTime);
      } else expirationTime <= currentTime && (root.expiredLanes |= lane);
      lanes &= ~lane;
    }
    currentTime = workInProgressRoot;
    suspendedLanes = workInProgressRootRenderLanes;
    suspendedLanes = getNextLanes(root, root === currentTime ? suspendedLanes : 0, undefined !== root.cancelPendingCommit || root.timeoutHandle !== noTimeout);
    pingedLanes = root.callbackNode;
    if (0 === suspendedLanes || root === currentTime && (workInProgressSuspendedReason === SuspendedOnData || workInProgressSuspendedReason === SuspendedOnAction) || undefined !== root.cancelPendingCommit) return undefined !== pingedLanes && cancelCallback(pingedLanes), root.callbackNode = undefined, root.callbackPriority = 0;
    if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root, suspendedLanes)) {
      currentTime = suspendedLanes & -suspendedLanes;
      if (currentTime !== root.callbackPriority || undefined !== ReactSharedInternals.actQueue && pingedLanes !== fakeActCallbackNode_1) cancelCallback(pingedLanes);else return currentTime;
      switch (lanesToEventPriority(suspendedLanes)) {
        case 2:
        case 8:
          suspendedLanes = UserBlockingPriority;
          break;
        case 32:
          suspendedLanes = NormalPriority_1;
          break;
        case 268435456:
          suspendedLanes = IdlePriority;
          break;
        default:
          suspendedLanes = NormalPriority_1;
      }
      pingedLanes = __partial((..._bindArgs13) => __applyFn(performWorkOnRootViaSchedulerTask, ..._bindArgs13), undefined, root);
      undefined !== ReactSharedInternals.actQueue ? (__push(ReactSharedInternals.actQueue, pingedLanes), suspendedLanes = fakeActCallbackNode_1) : suspendedLanes = scheduleCallback_3(suspendedLanes, pingedLanes);
      root.callbackPriority = currentTime;
      root.callbackNode = suspendedLanes;
      return currentTime;
    }
    undefined !== pingedLanes && cancelCallback(pingedLanes);
    root.callbackPriority = 2;
    root.callbackNode = undefined;
    return 2;
  }
  function performWorkOnRootViaSchedulerTask(root, didTimeout) {
    let originalCallbackNode, workInProgressRootRenderLanes_jscomp_0;
    nestedUpdateScheduled = currentUpdateIsNested = !1;
    trackSchedulerEvent();
    if (pendingEffectsStatus !== NO_PENDING_EFFECTS && pendingEffectsStatus !== PENDING_PASSIVE_PHASE) return root.callbackNode = undefined, root.callbackPriority = 0, undefined;
    originalCallbackNode = root.callbackNode;
    pendingDelayedCommitReason === IMMEDIATE_COMMIT && (pendingDelayedCommitReason = DELAYED_PASSIVE_COMMIT);
    if (flushPendingEffects() && root.callbackNode !== originalCallbackNode) return undefined;
    workInProgressRootRenderLanes_jscomp_0 = workInProgressRootRenderLanes;
    workInProgressRootRenderLanes_jscomp_0 = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes_jscomp_0 : 0, undefined !== root.cancelPendingCommit || root.timeoutHandle !== noTimeout);
    if (0 === workInProgressRootRenderLanes_jscomp_0) return undefined;
    performWorkOnRoot(root, workInProgressRootRenderLanes_jscomp_0, didTimeout);
    scheduleTaskForRootDuringMicrotask(root, now_1());
    return root.callbackNode !== undefined && root.callbackNode === originalCallbackNode ? __partial((..._bindArgs14) => __applyFn(performWorkOnRootViaSchedulerTask, ..._bindArgs14), undefined, root) : undefined;
  }
  function performSyncWorkOnRoot(root, lanes) {
    if (flushPendingEffects()) return undefined;
    currentUpdateIsNested = nestedUpdateScheduled;
    nestedUpdateScheduled = !1;
    performWorkOnRoot(root, lanes, !0);
  }
  function cancelCallback(callbackNode) {
    callbackNode !== fakeActCallbackNode_1 && undefined !== callbackNode && cancelCallback_1(callbackNode);
  }
  function scheduleImmediateRootScheduleTask() {
    undefined !== ReactSharedInternals.actQueue && __push(ReactSharedInternals.actQueue, function () {
      processRootScheduleInMicrotask();
      return undefined;
    });
    supportsMicrotasks ? scheduleMicrotask(function () {
      (executionContext & (RenderContext | CommitContext)) !== NoContext ? scheduleCallback_3(ImmediatePriority, processRootScheduleInImmediateTask) : processRootScheduleInMicrotask();
    }) : scheduleCallback_3(ImmediatePriority, processRootScheduleInImmediateTask);
  }
  function requestTransitionLane() {
    let actionScopeLane;
    if (0 === currentEventTransitionLane) {
      actionScopeLane = currentEntangledLane;
      0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
      currentEventTransitionLane = actionScopeLane;
    }
    return currentEventTransitionLane;
  }
  function entangleAsyncAction(transition, thenable) {
    let entangledListeners;
    if (undefined === currentEntangledListeners) {
      entangledListeners = currentEntangledListeners = __arrNew();
      currentEntangledPendingCount = 0;
      currentEntangledLane = requestTransitionLane();
      currentEntangledActionThenable = {
        status: "pending",
        value: void 0,
        then: function (resolve) {
          __push(entangledListeners, resolve);
        }
      };
    }
    currentEntangledPendingCount++;
    thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
    return thenable;
  }
  function pingEngtangledActionScope() {
    let listeners, i;
    if (0 === --currentEntangledPendingCount && (-1 < transitionUpdateTime || (transitionStartTime = -1.1), undefined !== currentEntangledListeners)) {
      undefined !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
      listeners = currentEntangledListeners;
      currentEntangledListeners = undefined;
      currentEntangledLane = 0;
      currentEntangledActionThenable = undefined;
      for (i = 0; i < __len(listeners); i++) (0, listeners[i])();
    }
  }
  function chainThenableValue(thenable, result) {
    let listeners, thenableWithOverride;
    listeners = __arrNew();
    thenableWithOverride = {
      status: "pending",
      value: undefined,
      reason: undefined,
      then: function (resolve) {
        __push(listeners, resolve);
      }
    };
    thenable.then(function () {
      let i;
      thenableWithOverride.status = "fulfilled";
      thenableWithOverride.value = result;
      for (i = 0; i < __len(listeners); i++) (0, listeners[i])(result);
    }, function (_error) {
      thenableWithOverride.status = "rejected";
      thenableWithOverride.reason = _error;
      for (let _error = 0; _error < __len(listeners); _error++) (0, listeners[_error])(void 0);
    });
    return thenableWithOverride;
  }
  function peekCacheFromPool() {
    let cacheResumedFromPreviousRender;
    cacheResumedFromPreviousRender = resumedCache.current;
    return undefined !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
  }
  function pushTransition(offscreenWorkInProgress, prevCachePool) {
    undefined === prevCachePool ? push(resumedCache, resumedCache.current, offscreenWorkInProgress) : push(resumedCache, prevCachePool.pool, offscreenWorkInProgress);
  }
  function getSuspendedCache() {
    let cacheFromPool;
    cacheFromPool = peekCacheFromPool();
    return undefined === cacheFromPool ? undefined : {
      parent: isPrimaryRenderer ? CacheContext._currentValue : CacheContext._currentValue2,
      pool: cacheFromPool
    };
  }
  function shallowEqual(objA, objB) {
    let keysA, keysB, currentKey;
    if (objectIs(objA, objB)) return !0;
    if ("object" !== typeOfJS(objA) || undefined === objA || "object" !== typeOfJS(objB) || undefined === objB) return !1;
    keysA = Object.keys(objA);
    keysB = Object.keys(objB);
    if (__len(keysA) !== __len(keysB)) return !1;
    for (keysB = 0; keysB < __len(keysA); keysB++) {
      currentKey = keysA[keysB];
      if (!__callFn(hasOwnProperty, objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey])) return !1;
    }
    return !0;
  }
  function createThenableState() {
    return {
      didWarnAboutUncachedPromise: !1,
      thenables: __arrNew()
    };
  }
  function isThenableResolved(thenable) {
    thenable = thenable.status;
    return "fulfilled" === thenable || "rejected" === thenable;
  }
  function trackUsedThenable(thenableState, thenable, index) {
    let trackedThenables, ioInfo;
    undefined !== ReactSharedInternals.actQueue && (ReactSharedInternals.didUsePromise = !0);
    trackedThenables = thenableState.thenables;
    index = trackedThenables[index];
    void 0 === index ? __push(trackedThenables, thenable) : index !== thenable && (thenableState.didWarnAboutUncachedPromise || (thenableState.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), thenable.then(noop_1, noop_1), thenable = index);
    if (void 0 === thenable._debugInfo) {
      thenableState = performance.now();
      trackedThenables = thenable.displayName;
      ioInfo = {
        name: "string" === typeOfJS(trackedThenables) ? trackedThenables : "Promise",
        start: thenableState,
        end: thenableState,
        value: thenable
      };
      thenable._debugInfo = __arrNew({
        awaited: ioInfo
      });
      "fulfilled" !== thenable.status && "rejected" !== thenable.status && (thenableState = function () {
        ioInfo.end = performance.now();
      }, thenable.then(thenableState, thenableState));
    }
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenableState = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState), thenableState;
      default:
        if ("string" === typeOfJS(thenable.status)) thenable.then(noop_1, noop_1);else {
          thenableState = workInProgressRoot;
          if (undefined !== thenableState && 100 < thenableState.shellSuspendCounter) throw Error("An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
          thenableState = thenable;
          thenableState.status = "pending";
          thenableState.then(function (fulfilledValue) {
            let fulfilledThenable;
            if ("pending" === thenable.status) {
              fulfilledThenable = thenable;
              fulfilledThenable.status = "fulfilled";
              fulfilledThenable.value = fulfilledValue;
            }
          }, function (__error) {
            let rejectedThenable;
            if ("pending" === thenable.status) {
              rejectedThenable = thenable;
              rejectedThenable.status = "rejected";
              rejectedThenable.reason = __error;
            }
          });
        }
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenableState = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState), thenableState;
        }
        suspendedThenable = thenable;
        needsToResetSuspendedThenableDEV = !0;
        throw SuspenseException;
    }
  }
  function resolveLazy(lazyType) {
    try {
      return callLazyInitInDEV(lazyType);
    } catch (x) {
      if (undefined !== x && "object" === typeOfJS(x) && "function" === typeOfJS(x.then)) throw suspendedThenable = x, needsToResetSuspendedThenableDEV = !0, SuspenseException;
      throw x;
    }
  }
  function getSuspendedThenable() {
    let thenable;
    if (undefined === suspendedThenable) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
    thenable = suspendedThenable;
    suspendedThenable = undefined;
    needsToResetSuspendedThenableDEV = !1;
    return thenable;
  }
  function checkIfUseWrappedInAsyncCatch(rejectedReason) {
    if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
  }
  function pushDebugInfo(debugInfo) {
    let previousDebugInfo;
    previousDebugInfo = currentDebugInfo;
    debugInfo !== undefined && (currentDebugInfo = undefined === previousDebugInfo ? debugInfo : __concat(previousDebugInfo, debugInfo));
    return previousDebugInfo;
  }
  function getCurrentDebugTask() {
    let debugInfo, i, debugTask;
    debugInfo = currentDebugInfo;
    if (debugInfo !== undefined) for (i = __len(debugInfo) - 1; 0 <= i; i--) if (debugInfo[i].name !== undefined) {
      debugTask = debugInfo[i].debugTask;
      if (debugTask !== undefined) return debugTask;
    }
    return undefined;
  }
  function validateFragmentProps(element, fiber, returnFiber) {
    let keys, i, key;
    for (keys = Object.keys(element.props), i = 0; i < __len(keys); i++) {
      key = keys[i];
      if ("children" !== key && "key" !== key) {
        undefined === fiber && (fiber = createFiberFromElement(element, returnFiber.mode, 0), fiber._debugInfo = currentDebugInfo, fiber.return = returnFiber);
        runWithFiberInDEV(fiber, function (erroredKey) {
          console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", erroredKey);
        }, key);
        break;
      }
    }
  }
  function unwrapThenable(thenable) {
    let index;
    index = thenableIndexCounter_1;
    thenableIndexCounter_1 += 1;
    undefined === thenableState_1 && (thenableState_1 = createThenableState());
    return trackUsedThenable(thenableState_1, thenable, index);
  }
  function coerceRef(workInProgress, element) {
    element = element.props.ref;
    workInProgress.ref = void 0 !== element ? element : undefined;
  }
  function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
    if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE) throw Error('A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.');
    returnFiber = __callFn(__protoOf(Object).toString, newChild);
    throw Error(__cat(__cat("Objects are not valid as a React child (found: ", "[object Object]" === returnFiber ? __cat(__cat("object with keys {", __join(Object.keys(newChild), ", ")), "}") : returnFiber), "). If you meant to render a collection of children, use an array instead."));
  }
  function throwOnInvalidObjectType(returnFiber, newChild) {
    let debugTask;
    debugTask = getCurrentDebugTask();
    undefined !== debugTask ? debugTask.run(__partial((..._bindArgs15) => __applyFn(throwOnInvalidObjectTypeImpl, ..._bindArgs15), undefined, returnFiber, newChild)) : throwOnInvalidObjectTypeImpl(returnFiber, newChild);
  }
  function warnOnFunctionTypeImpl(returnFiber, invalidChild) {
    let parentName;
    parentName = getComponentNameFromFiber(returnFiber) || "Component";
    ownerHasFunctionTypeWarning[parentName] || (ownerHasFunctionTypeWarning[parentName] = !0, invalidChild = invalidChild.displayName || invalidChild.name || "Component", 3 === returnFiber.tag ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", invalidChild, invalidChild, invalidChild) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", invalidChild, invalidChild, parentName, invalidChild, parentName));
  }
  function warnOnFunctionType(returnFiber, invalidChild) {
    let debugTask;
    debugTask = getCurrentDebugTask();
    undefined !== debugTask ? debugTask.run(__partial((..._bindArgs16) => __applyFn(warnOnFunctionTypeImpl, ..._bindArgs16), undefined, returnFiber, invalidChild)) : warnOnFunctionTypeImpl(returnFiber, invalidChild);
  }
  function warnOnSymbolTypeImpl(returnFiber, invalidChild) {
    let parentName;
    parentName = getComponentNameFromFiber(returnFiber) || "Component";
    ownerHasSymbolTypeWarning[parentName] || (ownerHasSymbolTypeWarning[parentName] = !0, invalidChild = String(invalidChild), 3 === returnFiber.tag ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", invalidChild) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", parentName, invalidChild, parentName));
  }
  function warnOnSymbolType(returnFiber, invalidChild) {
    let debugTask;
    debugTask = getCurrentDebugTask();
    undefined !== debugTask ? debugTask.run(__partial((..._bindArgs17) => __applyFn(warnOnSymbolTypeImpl, ..._bindArgs17), undefined, returnFiber, invalidChild)) : warnOnSymbolTypeImpl(returnFiber, invalidChild);
  }
  function createChildReconciler(shouldTrackSideEffects) {
    function deleteChild(returnFiber, childToDelete) {
      let deletions;
      if (shouldTrackSideEffects) {
        deletions = returnFiber.deletions;
        undefined === deletions ? (returnFiber.deletions = __arrNew(childToDelete), returnFiber.flags |= 16) : __push(deletions, childToDelete);
      }
    }
    function deleteRemainingChildren(returnFiber, currentFirstChild) {
      if (!shouldTrackSideEffects) return undefined;
      for (; undefined !== currentFirstChild;) deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      return undefined;
    }
    function mapRemainingChildren(currentFirstChild) {
      let existingChildren;
      for (existingChildren = __new(Map); undefined !== currentFirstChild;) undefined !== currentFirstChild.key ? existingChildren.set(currentFirstChild.key, currentFirstChild) : existingChildren.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      return existingChildren;
    }
    function useFiber(fiber, pendingProps) {
      fiber = createWorkInProgress(fiber, pendingProps);
      fiber.index = 0;
      fiber.sibling = undefined;
      return fiber;
    }
    function placeChild(newFiber, lastPlacedIndex, newIndex) {
      newFiber.index = newIndex;
      if (!shouldTrackSideEffects) return newFiber.flags |= 1048576, lastPlacedIndex;
      newIndex = newFiber.alternate;
      if (undefined !== newIndex) return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 67108866, lastPlacedIndex) : newIndex;
      newFiber.flags |= 67108866;
      return lastPlacedIndex;
    }
    function placeSingleChild(newFiber) {
      shouldTrackSideEffects && undefined === newFiber.alternate && (newFiber.flags |= 67108866);
      return newFiber;
    }
    function updateTextNode(returnFiber, current, textContent, lanes) {
      if (undefined === current || 6 !== current.tag) return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current._debugOwner = returnFiber, current._debugTask = returnFiber._debugTask, current._debugInfo = currentDebugInfo, current;
      current = useFiber(current, textContent);
      current.return = returnFiber;
      current._debugInfo = currentDebugInfo;
      return current;
    }
    function updateElement(returnFiber, current, element, lanes) {
      let elementType;
      elementType = element.type;
      if (elementType === REACT_FRAGMENT_TYPE) return current = updateFragment(returnFiber, current, element.props.children, lanes, element.key), validateFragmentProps(element, current, returnFiber), current;
      if (undefined !== current && (current.elementType === elementType || isCompatibleFamilyForHotReloading(current, element) || "object" === typeOfJS(elementType) && undefined !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type)) return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current._debugOwner = element._owner, current._debugInfo = currentDebugInfo, current;
      current = createFiberFromElement(element, returnFiber.mode, lanes);
      coerceRef(current, element);
      current.return = returnFiber;
      current._debugInfo = currentDebugInfo;
      return current;
    }
    function updatePortal(returnFiber, current, portal, lanes) {
      if (undefined === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current._debugInfo = currentDebugInfo, current;
      current = useFiber(current, portal.children || __arrNew());
      current.return = returnFiber;
      current._debugInfo = currentDebugInfo;
      return current;
    }
    function updateFragment(returnFiber, current, fragment, lanes, key) {
      if (undefined === current || 7 !== current.tag) return current = createFiberFromFragment(fragment, returnFiber.mode, lanes, key), current.return = returnFiber, current._debugOwner = returnFiber, current._debugTask = returnFiber._debugTask, current._debugInfo = currentDebugInfo, current;
      current = useFiber(current, fragment);
      current.return = returnFiber;
      current._debugInfo = currentDebugInfo;
      return current;
    }
    function createChild(returnFiber, newChild, lanes) {
      let _prevDebugInfo;
      if ("string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild)) return newChild = createFiberFromText(__cat("", newChild), returnFiber.mode, lanes), newChild.return = returnFiber, newChild._debugOwner = returnFiber, newChild._debugTask = returnFiber._debugTask, newChild._debugInfo = currentDebugInfo, newChild;
      if ("object" === typeOfJS(newChild) && undefined !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return lanes = createFiberFromElement(newChild, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = pushDebugInfo(newChild._debugInfo), lanes._debugInfo = currentDebugInfo, currentDebugInfo = returnFiber, lanes;
          case REACT_PORTAL_TYPE:
            return newChild = createFiberFromPortal(newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild._debugInfo = currentDebugInfo, newChild;
          case REACT_LAZY_TYPE:
            _prevDebugInfo = pushDebugInfo(newChild._debugInfo);
            newChild = resolveLazy(newChild);
            returnFiber = createChild(returnFiber, newChild, lanes);
            currentDebugInfo = _prevDebugInfo;
            return returnFiber;
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild)) return lanes = createFiberFromFragment(newChild, returnFiber.mode, lanes, undefined), lanes.return = returnFiber, lanes._debugOwner = returnFiber, lanes._debugTask = returnFiber._debugTask, returnFiber = pushDebugInfo(newChild._debugInfo), lanes._debugInfo = currentDebugInfo, currentDebugInfo = returnFiber, lanes;
        if ("function" === typeOfJS(newChild.then)) return _prevDebugInfo = pushDebugInfo(newChild._debugInfo), returnFiber = createChild(returnFiber, unwrapThenable(newChild), lanes), currentDebugInfo = _prevDebugInfo, returnFiber;
        if (newChild.$$typeof === REACT_CONTEXT_TYPE) return createChild(returnFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
        throwOnInvalidObjectType(returnFiber, newChild);
      }
      "function" === typeOfJS(newChild) && warnOnFunctionType(returnFiber, newChild);
      "symbol" === typeOfJS(newChild) && warnOnSymbolType(returnFiber, newChild);
      return undefined;
    }
    function updateSlot(returnFiber, oldFiber, newChild, lanes) {
      let key;
      key = undefined !== oldFiber ? oldFiber.key : undefined;
      if ("string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild)) return undefined !== key ? undefined : updateTextNode(returnFiber, oldFiber, __cat("", newChild), lanes);
      if ("object" === typeOfJS(newChild) && undefined !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return newChild.key === key ? (key = pushDebugInfo(newChild._debugInfo), returnFiber = updateElement(returnFiber, oldFiber, newChild, lanes), currentDebugInfo = key, returnFiber) : undefined;
          case REACT_PORTAL_TYPE:
            return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : undefined;
          case REACT_LAZY_TYPE:
            return key = pushDebugInfo(newChild._debugInfo), newChild = resolveLazy(newChild), returnFiber = updateSlot(returnFiber, oldFiber, newChild, lanes), currentDebugInfo = key, returnFiber;
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild)) {
          if (undefined !== key) return undefined;
          key = pushDebugInfo(newChild._debugInfo);
          returnFiber = updateFragment(returnFiber, oldFiber, newChild, lanes, undefined);
          currentDebugInfo = key;
          return returnFiber;
        }
        if ("function" === typeOfJS(newChild.then)) return key = pushDebugInfo(newChild._debugInfo), returnFiber = updateSlot(returnFiber, oldFiber, unwrapThenable(newChild), lanes), currentDebugInfo = key, returnFiber;
        if (newChild.$$typeof === REACT_CONTEXT_TYPE) return updateSlot(returnFiber, oldFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
        throwOnInvalidObjectType(returnFiber, newChild);
      }
      "function" === typeOfJS(newChild) && warnOnFunctionType(returnFiber, newChild);
      "symbol" === typeOfJS(newChild) && warnOnSymbolType(returnFiber, newChild);
      return undefined;
    }
    function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
      let _prevDebugInfo7;
      if ("string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild)) return existingChildren = existingChildren.get(newIdx) || undefined, updateTextNode(returnFiber, existingChildren, __cat("", newChild), lanes);
      if ("object" === typeOfJS(newChild) && undefined !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return newIdx = existingChildren.get(undefined === newChild.key ? newIdx : newChild.key) || undefined, existingChildren = pushDebugInfo(newChild._debugInfo), returnFiber = updateElement(returnFiber, newIdx, newChild, lanes), currentDebugInfo = existingChildren, returnFiber;
          case REACT_PORTAL_TYPE:
            return existingChildren = existingChildren.get(undefined === newChild.key ? newIdx : newChild.key) || undefined, updatePortal(returnFiber, existingChildren, newChild, lanes);
          case REACT_LAZY_TYPE:
            _prevDebugInfo7 = pushDebugInfo(newChild._debugInfo);
            newChild = resolveLazy(newChild);
            returnFiber = updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes);
            currentDebugInfo = _prevDebugInfo7;
            return returnFiber;
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild)) return newIdx = existingChildren.get(newIdx) || undefined, existingChildren = pushDebugInfo(newChild._debugInfo), returnFiber = updateFragment(returnFiber, newIdx, newChild, lanes, undefined), currentDebugInfo = existingChildren, returnFiber;
        if ("function" === typeOfJS(newChild.then)) return _prevDebugInfo7 = pushDebugInfo(newChild._debugInfo), returnFiber = updateFromMap(existingChildren, returnFiber, newIdx, unwrapThenable(newChild), lanes), currentDebugInfo = _prevDebugInfo7, returnFiber;
        if (newChild.$$typeof === REACT_CONTEXT_TYPE) return updateFromMap(existingChildren, returnFiber, newIdx, readContextDuringReconciliation(returnFiber, newChild), lanes);
        throwOnInvalidObjectType(returnFiber, newChild);
      }
      "function" === typeOfJS(newChild) && warnOnFunctionType(returnFiber, newChild);
      "symbol" === typeOfJS(newChild) && warnOnSymbolType(returnFiber, newChild);
      return undefined;
    }
    function warnOnInvalidKey(returnFiber, workInProgress, child, knownKeys) {
      let key;
      if ("object" !== typeOfJS(child) || undefined === child) return knownKeys;
      switch (child.$$typeof) {
        case REACT_ELEMENT_TYPE:
        case REACT_PORTAL_TYPE:
          warnForMissingKey(returnFiber, workInProgress, child);
          key = child.key;
          if ("string" !== typeOfJS(key)) break;
          if (undefined === knownKeys) {
            knownKeys = __new(Set);
            knownKeys.add(key);
            break;
          }
          if (!knownKeys.has(key)) {
            knownKeys.add(key);
            break;
          }
          runWithFiberInDEV(workInProgress, function () {
            console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted \u2014 the behavior is unsupported and could change in a future version.", key);
          });
          break;
        case REACT_LAZY_TYPE:
          child = resolveLazy(child), warnOnInvalidKey(returnFiber, workInProgress, child, knownKeys);
      }
      return knownKeys;
    }
    function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
      let knownKeys, resultingFirstChild, previousNewFiber, oldFiber, newIdx, nextOldFiber, newFiber;
      for (knownKeys = undefined, resultingFirstChild = undefined, previousNewFiber = undefined, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = undefined; undefined !== oldFiber && newIdx < __len(newChildren); newIdx++) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = undefined) : nextOldFiber = oldFiber.sibling;
        newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);
        if (undefined === newFiber) {
          undefined === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        knownKeys = warnOnInvalidKey(returnFiber, newFiber, newChildren[newIdx], knownKeys);
        shouldTrackSideEffects && oldFiber && undefined === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        undefined === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (newIdx === __len(newChildren)) return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (undefined === oldFiber) {
        for (; newIdx < __len(newChildren); newIdx++) oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), undefined !== oldFiber && (knownKeys = warnOnInvalidKey(returnFiber, oldFiber, newChildren[newIdx], knownKeys), currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); newIdx < __len(newChildren); newIdx++) nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], lanes), undefined !== nextOldFiber && (knownKeys = warnOnInvalidKey(returnFiber, nextOldFiber, newChildren[newIdx], knownKeys), shouldTrackSideEffects && undefined !== nextOldFiber.alternate && oldFiber.delete(undefined === nextOldFiber.key ? newIdx : nextOldFiber.key), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
      shouldTrackSideEffects && __forEach(oldFiber, function (child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
      let resultingFirstChild, previousNewFiber, oldFiber, newIdx, nextOldFiber, knownKeys, step, newFiber;
      if (newChildren === undefined) throw Error("An iterable object provided no iterator.");
      for (resultingFirstChild = undefined, previousNewFiber = undefined, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = undefined, knownKeys = undefined, step = newChildren.next(); undefined !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = undefined) : nextOldFiber = oldFiber.sibling;
        newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
        if (undefined === newFiber) {
          undefined === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        knownKeys = warnOnInvalidKey(returnFiber, newFiber, step.value, knownKeys);
        shouldTrackSideEffects && oldFiber && undefined === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        undefined === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (step.done) return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (undefined === oldFiber) {
        for (; !step.done; newIdx++, step = newChildren.next()) oldFiber = createChild(returnFiber, step.value, lanes), undefined !== oldFiber && (knownKeys = warnOnInvalidKey(returnFiber, oldFiber, step.value, knownKeys), currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next()) nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), undefined !== nextOldFiber && (knownKeys = warnOnInvalidKey(returnFiber, nextOldFiber, step.value, knownKeys), shouldTrackSideEffects && undefined !== nextOldFiber.alternate && oldFiber.delete(undefined === nextOldFiber.key ? newIdx : nextOldFiber.key), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
      shouldTrackSideEffects && __forEach(oldFiber, function (child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
      let prevDebugInfo, key, newChildren;
      "object" === typeOfJS(newChild) && undefined !== newChild && newChild.type === REACT_FRAGMENT_TYPE && undefined === newChild.key && (validateFragmentProps(newChild, undefined, returnFiber), newChild = newChild.props.children);
      if ("object" === typeOfJS(newChild) && undefined !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            prevDebugInfo = pushDebugInfo(newChild._debugInfo);
            {
              let __lb_18 = false,
                __lc_18 = false;
              while (!__lb_18) {
                {
                  for (key = newChild.key; undefined !== currentFirstChild;) {
                    if (currentFirstChild.key === key) {
                      key = newChild.type;
                      if (key === REACT_FRAGMENT_TYPE) {
                        if (7 === currentFirstChild.tag) {
                          deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                          lanes = useFiber(currentFirstChild, newChild.props.children);
                          lanes.return = returnFiber;
                          lanes._debugOwner = newChild._owner;
                          lanes._debugInfo = currentDebugInfo;
                          validateFragmentProps(newChild, lanes, returnFiber);
                          returnFiber = lanes;
                          {
                            __lb_18 = true;
                            break;
                          }
                        }
                      } else if (currentFirstChild.elementType === key || isCompatibleFamilyForHotReloading(currentFirstChild, newChild) || "object" === typeOfJS(key) && undefined !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                        deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                        lanes = useFiber(currentFirstChild, newChild.props);
                        coerceRef(lanes, newChild);
                        lanes.return = returnFiber;
                        lanes._debugOwner = newChild._owner;
                        lanes._debugInfo = currentDebugInfo;
                        returnFiber = lanes;
                        {
                          __lb_18 = true;
                          break;
                        }
                      }
                      deleteRemainingChildren(returnFiber, currentFirstChild);
                      break;
                    } else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  if (__lb_18 || __lc_18) {
                    break;
                  }
                  newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(newChild.props.children, returnFiber.mode, lanes, newChild.key), lanes.return = returnFiber, lanes._debugOwner = returnFiber, lanes._debugTask = returnFiber._debugTask, lanes._debugInfo = currentDebugInfo, validateFragmentProps(newChild, lanes, returnFiber), returnFiber = lanes) : (lanes = createFiberFromElement(newChild, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes._debugInfo = currentDebugInfo, returnFiber = lanes);
                }
                break;
              }
            }
            returnFiber = placeSingleChild(returnFiber);
            currentDebugInfo = prevDebugInfo;
            return returnFiber;
          case REACT_PORTAL_TYPE:
            {
              let __lb_17 = false,
                __lc_17 = false;
              while (!__lb_17) {
                {
                  prevDebugInfo = newChild;
                  for (newChild = prevDebugInfo.key; undefined !== currentFirstChild;) {
                    if (currentFirstChild.key === newChild) {
                      if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === prevDebugInfo.containerInfo && currentFirstChild.stateNode.implementation === prevDebugInfo.implementation) {
                        deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                        lanes = useFiber(currentFirstChild, prevDebugInfo.children || __arrNew());
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        {
                          __lb_17 = true;
                          break;
                        }
                      } else {
                        deleteRemainingChildren(returnFiber, currentFirstChild);
                        break;
                      }
                    } else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  if (__lb_17 || __lc_17) {
                    break;
                  }
                  lanes = createFiberFromPortal(prevDebugInfo, returnFiber.mode, lanes);
                  lanes.return = returnFiber;
                  returnFiber = lanes;
                }
                break;
              }
            }
            return placeSingleChild(returnFiber);
          case REACT_LAZY_TYPE:
            return prevDebugInfo = pushDebugInfo(newChild._debugInfo), newChild = resolveLazy(newChild), returnFiber = reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes), currentDebugInfo = prevDebugInfo, returnFiber;
        }
        if (isArrayImpl(newChild)) return prevDebugInfo = pushDebugInfo(newChild._debugInfo), returnFiber = reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes), currentDebugInfo = prevDebugInfo, returnFiber;
        if (getIteratorFn(newChild)) {
          prevDebugInfo = pushDebugInfo(newChild._debugInfo);
          key = getIteratorFn(newChild);
          if ("function" !== typeOfJS(key)) throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
          newChildren = __callFn(key, newChild);
          if (newChildren === newChild) {
            if (0 !== returnFiber.tag || "[object GeneratorFunction]" !== __callFn(__protoOf(Object).toString, returnFiber.type) || "[object Generator]" !== __callFn(__protoOf(Object).toString, newChildren)) didWarnAboutGenerators || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), didWarnAboutGenerators = !0;
          } else newChild.entries !== key || didWarnAboutMaps || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0);
          returnFiber = reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes);
          currentDebugInfo = prevDebugInfo;
          return returnFiber;
        }
        if ("function" === typeOfJS(newChild.then)) return prevDebugInfo = pushDebugInfo(newChild._debugInfo), returnFiber = reconcileChildFibersImpl(returnFiber, currentFirstChild, unwrapThenable(newChild), lanes), currentDebugInfo = prevDebugInfo, returnFiber;
        if (newChild.$$typeof === REACT_CONTEXT_TYPE) return reconcileChildFibersImpl(returnFiber, currentFirstChild, readContextDuringReconciliation(returnFiber, newChild), lanes);
        throwOnInvalidObjectType(returnFiber, newChild);
      }
      if ("string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild)) return prevDebugInfo = __cat("", newChild), undefined !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, prevDebugInfo), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(prevDebugInfo, returnFiber.mode, lanes), lanes.return = returnFiber, lanes._debugOwner = returnFiber, lanes._debugTask = returnFiber._debugTask, lanes._debugInfo = currentDebugInfo, returnFiber = lanes), placeSingleChild(returnFiber);
      "function" === typeOfJS(newChild) && warnOnFunctionType(returnFiber, newChild);
      "symbol" === typeOfJS(newChild) && warnOnSymbolType(returnFiber, newChild);
      return deleteRemainingChildren(returnFiber, currentFirstChild);
    }
    return function (returnFiber, currentFirstChild, newChild, lanes) {
      let prevDebugInfo, firstChildFiber, fiber, debugInfo, i;
      prevDebugInfo = currentDebugInfo;
      currentDebugInfo = undefined;
      try {
        thenableIndexCounter_1 = 0;
        firstChildFiber = reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
        thenableState_1 = undefined;
        return firstChildFiber;
      } catch (x) {
        if (x === SuspenseException || x === SuspenseActionException) throw x;
        fiber = createFiber(29, x, undefined, returnFiber.mode);
        fiber.lanes = lanes;
        fiber.return = returnFiber;
        debugInfo = fiber._debugInfo = currentDebugInfo;
        fiber._debugOwner = returnFiber._debugOwner;
        fiber._debugTask = returnFiber._debugTask;
        if (debugInfo !== undefined) for (i = __len(debugInfo) - 1; 0 <= i; i--) if ("string" === typeOfJS(debugInfo[i].stack)) {
          fiber._debugOwner = debugInfo[i];
          fiber._debugTask = debugInfo[i].debugTask;
          break;
        }
        return fiber;
      } finally {
        currentDebugInfo = prevDebugInfo;
      }
    };
  }
  function validateSuspenseListNestedChild(childSlot, index) {
    let isAnArray;
    isAnArray = isArrayImpl(childSlot);
    childSlot = !isAnArray && "function" === typeOfJS(getIteratorFn(childSlot));
    return isAnArray || childSlot ? (isAnArray = isAnArray ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", isAnArray, index, isAnArray), !1) : !0;
  }
  function finishQueueingConcurrentUpdates() {
    let endIndex, i, fiber, queue, update, lane, pending;
    for (endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex;) {
      fiber = concurrentQueues[i];
      concurrentQueues[i++] = undefined;
      queue = concurrentQueues[i];
      concurrentQueues[i++] = undefined;
      update = concurrentQueues[i];
      concurrentQueues[i++] = undefined;
      lane = concurrentQueues[i];
      concurrentQueues[i++] = undefined;
      if (undefined !== queue && undefined !== update) {
        pending = queue.pending;
        undefined === pending ? update.next = update : (update.next = pending.next, pending.next = update);
        queue.pending = update;
      }
      0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
    }
  }
  function enqueueUpdate_1(fiber, queue, update, lane) {
    concurrentQueues[concurrentQueuesIndex++] = fiber;
    concurrentQueues[concurrentQueuesIndex++] = queue;
    concurrentQueues[concurrentQueuesIndex++] = update;
    concurrentQueues[concurrentQueuesIndex++] = lane;
    concurrentlyUpdatedLanes |= lane;
    fiber.lanes |= lane;
    fiber = fiber.alternate;
    undefined !== fiber && (fiber.lanes |= lane);
  }
  function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
    enqueueUpdate_1(fiber, queue, update, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function enqueueConcurrentRenderForLane(fiber, lane) {
    enqueueUpdate_1(fiber, undefined, undefined, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
    let alternate, isHidden, parent;
    sourceFiber.lanes |= lane;
    alternate = sourceFiber.alternate;
    undefined !== alternate && (alternate.lanes |= lane);
    for (isHidden = !1, parent = sourceFiber.return; undefined !== parent;) parent.childLanes |= lane, alternate = parent.alternate, undefined !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, undefined === sourceFiber || sourceFiber._visibility & OffscreenVisible || (isHidden = !0)), sourceFiber = parent, parent = parent.return;
    return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && undefined !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], undefined === alternate ? sourceFiber[isHidden] = __arrNew(update) : __push(alternate, update), update.lane = lane | 536870912), parent) : undefined;
  }
  function getRootForUpdatedFiber(sourceFiber) {
    let node, parent;
    if (nestedUpdateCount > NESTED_UPDATE_LIMIT) throw nestedPassiveUpdateCount = nestedUpdateCount = 0, rootWithPassiveNestedUpdates = rootWithNestedUpdates = undefined, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    nestedPassiveUpdateCount > NESTED_PASSIVE_UPDATE_LIMIT && (nestedPassiveUpdateCount = 0, rootWithPassiveNestedUpdates = undefined, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    undefined === sourceFiber.alternate && 0 !== (sourceFiber.flags & 4098) && warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
    for (node = sourceFiber, parent = node.return; undefined !== parent;) undefined === node.alternate && 0 !== (node.flags & 4098) && warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber), node = parent, parent = node.return;
    return 3 === node.tag ? node.stateNode : undefined;
  }
  function initializeUpdateQueue(fiber) {
    fiber.updateQueue = {
      baseState: fiber.memoizedState,
      firstBaseUpdate: undefined,
      lastBaseUpdate: undefined,
      shared: {
        pending: undefined,
        lanes: 0,
        hiddenCallbacks: undefined
      },
      callbacks: undefined
    };
  }
  function cloneUpdateQueue(current, workInProgress) {
    current = current.updateQueue;
    workInProgress.updateQueue === current && (workInProgress.updateQueue = {
      baseState: current.baseState,
      firstBaseUpdate: current.firstBaseUpdate,
      lastBaseUpdate: current.lastBaseUpdate,
      shared: current.shared,
      callbacks: undefined
    });
  }
  function createUpdate(lane) {
    return {
      lane: lane,
      tag: UpdateState,
      payload: undefined,
      callback: undefined,
      next: undefined
    };
  }
  function enqueueUpdate(fiber, update, lane) {
    let updateQueue, componentName;
    updateQueue = fiber.updateQueue;
    if (undefined === updateQueue) return undefined;
    updateQueue = updateQueue.shared;
    if (currentlyProcessingQueue === updateQueue && !didWarnUpdateInsideUpdate) {
      componentName = getComponentNameFromFiber(fiber);
      console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", componentName);
      didWarnUpdateInsideUpdate = !0;
    }
    if ((executionContext & RenderContext) !== NoContext) return componentName = updateQueue.pending, undefined === componentName ? update.next = update : (update.next = componentName.next, componentName.next = update), updateQueue.pending = update, update = getRootForUpdatedFiber(fiber), markUpdateLaneFromFiberToRoot(fiber, undefined, lane), update;
    enqueueUpdate_1(fiber, updateQueue, update, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function entangleTransitions(root, fiber, lane) {
    let queueLanes;
    fiber = fiber.updateQueue;
    if (undefined !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
      queueLanes = fiber.lanes;
      queueLanes &= root.pendingLanes;
      lane |= queueLanes;
      fiber.lanes = lane;
      markRootEntangled(root, lane);
    }
  }
  function enqueueCapturedUpdate(workInProgress, capturedUpdate) {
    let queue, current, newFirst, newLast, clone;
    queue = workInProgress.updateQueue;
    current = workInProgress.alternate;
    if (undefined !== current && (current = current.updateQueue, queue === current)) {
      newFirst = undefined;
      newLast = undefined;
      queue = queue.firstBaseUpdate;
      if (undefined !== queue) {
        do {
          clone = {
            lane: queue.lane,
            tag: queue.tag,
            payload: queue.payload,
            callback: undefined,
            next: undefined
          };
          undefined === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
          queue = queue.next;
        } while (undefined !== queue);
        undefined === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
      } else newFirst = newLast = capturedUpdate;
      queue = {
        baseState: current.baseState,
        firstBaseUpdate: newFirst,
        lastBaseUpdate: newLast,
        shared: current.shared,
        callbacks: current.callbacks
      };
      workInProgress.updateQueue = queue;
      return;
    }
    workInProgress = queue.lastBaseUpdate;
    undefined === workInProgress ? queue.firstBaseUpdate = capturedUpdate : workInProgress.next = capturedUpdate;
    queue.lastBaseUpdate = capturedUpdate;
  }
  function suspendIfUpdateReadFromEntangledAsyncAction() {
    let entangledActionThenable;
    if (didReadFromEntangledAsyncAction) {
      entangledActionThenable = currentEntangledActionThenable;
      if (undefined !== entangledActionThenable) throw entangledActionThenable;
    }
  }
  function processUpdateQueue(workInProgress, props, instance_jscomp_0, renderLanes) {
    let queue, firstBaseUpdate, lastBaseUpdate, pendingQueue, lastPendingUpdate, firstPendingUpdate, current, newState, updateLane, isHiddenUpdate, partialState, nextProps, instance, nextState;
    didReadFromEntangledAsyncAction = !1;
    queue = workInProgress.updateQueue;
    hasForceUpdate = !1;
    currentlyProcessingQueue = queue.shared;
    firstBaseUpdate = queue.firstBaseUpdate;
    lastBaseUpdate = queue.lastBaseUpdate;
    pendingQueue = queue.shared.pending;
    if (undefined !== pendingQueue) {
      queue.shared.pending = undefined;
      lastPendingUpdate = pendingQueue;
      firstPendingUpdate = lastPendingUpdate.next;
      lastPendingUpdate.next = undefined;
      undefined === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
      lastBaseUpdate = lastPendingUpdate;
      current = workInProgress.alternate;
      undefined !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (undefined === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
    }
    if (undefined !== firstBaseUpdate) {
      newState = queue.baseState;
      lastBaseUpdate = 0;
      current = firstPendingUpdate = lastPendingUpdate = undefined;
      pendingQueue = firstBaseUpdate;
      do {
        updateLane = pendingQueue.lane & -536870913;
        isHiddenUpdate = updateLane !== pendingQueue.lane;
        if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
          0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = !0);
          undefined !== current && (current = current.next = {
            lane: 0,
            tag: pendingQueue.tag,
            payload: pendingQueue.payload,
            callback: undefined,
            next: undefined
          });
          {
            let __lb_16 = false,
              __lc_16 = false;
            while (!__lb_16) {
              {
                updateLane = workInProgress;
                partialState = pendingQueue;
                nextProps = props;
                instance = instance_jscomp_0;
                switch (partialState.tag) {
                  case ReplaceState:
                    partialState = partialState.payload;
                    if ("function" === typeOfJS(partialState)) {
                      isDisallowedContextReadInDEV = !0;
                      nextState = __callFn(partialState, instance, newState, nextProps);
                      if (updateLane.mode & 8) {
                        setIsStrictModeForDevtools(!0);
                        try {
                          __callFn(partialState, instance, newState, nextProps);
                        } finally {
                          setIsStrictModeForDevtools(!1);
                        }
                      }
                      isDisallowedContextReadInDEV = !1;
                      newState = nextState;
                      {
                        __lb_16 = true;
                        break;
                      }
                    }
                    newState = partialState;
                    {
                      __lb_16 = true;
                      break;
                    }
                  case CaptureUpdate:
                    updateLane.flags = updateLane.flags & -65537 | 128;
                  case UpdateState:
                    nextState = partialState.payload;
                    if ("function" === typeOfJS(nextState)) {
                      isDisallowedContextReadInDEV = !0;
                      partialState = __callFn(nextState, instance, newState, nextProps);
                      if (updateLane.mode & 8) {
                        setIsStrictModeForDevtools(!0);
                        try {
                          __callFn(nextState, instance, newState, nextProps);
                        } finally {
                          setIsStrictModeForDevtools(!1);
                        }
                      }
                      isDisallowedContextReadInDEV = !1;
                    } else partialState = nextState;
                    if (undefined === partialState || void 0 === partialState) {
                      __lb_16 = true;
                      break;
                    }
                    newState = assign({}, newState, partialState);
                    {
                      __lb_16 = true;
                      break;
                    }
                  case ForceUpdate:
                    hasForceUpdate = !0;
                }
              }
              break;
            }
          }
          updateLane = pendingQueue.callback;
          undefined !== updateLane && (workInProgress.flags |= 64, isHiddenUpdate && (workInProgress.flags |= 8192), isHiddenUpdate = queue.callbacks, undefined === isHiddenUpdate ? queue.callbacks = __arrNew(updateLane) : __push(isHiddenUpdate, updateLane));
        } else isHiddenUpdate = {
          lane: updateLane,
          tag: pendingQueue.tag,
          payload: pendingQueue.payload,
          callback: pendingQueue.callback,
          next: undefined
        }, undefined === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
        pendingQueue = pendingQueue.next;
        if (undefined === pendingQueue) if (pendingQueue = queue.shared.pending, undefined === pendingQueue) break;else isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = undefined, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = undefined;
      } while (1);
      undefined === current && (lastPendingUpdate = newState);
      queue.baseState = lastPendingUpdate;
      queue.firstBaseUpdate = firstPendingUpdate;
      queue.lastBaseUpdate = current;
      undefined === firstBaseUpdate && (queue.shared.lanes = 0);
      workInProgressRootSkippedLanes |= lastBaseUpdate;
      workInProgress.lanes = lastBaseUpdate;
      workInProgress.memoizedState = newState;
    }
    currentlyProcessingQueue = undefined;
  }
  function callCallback(callback, context) {
    if ("function" !== typeOfJS(callback)) throw Error(__cat("Invalid argument passed as callback. Expected a function. Instead received: ", callback));
    __callFn(callback, context);
  }
  function commitHiddenCallbacks(updateQueue, context) {
    let hiddenCallbacks;
    hiddenCallbacks = updateQueue.shared.hiddenCallbacks;
    if (undefined !== hiddenCallbacks) for (updateQueue.shared.hiddenCallbacks = undefined, updateQueue = 0; updateQueue < __len(hiddenCallbacks); updateQueue++) callCallback(hiddenCallbacks[updateQueue], context);
  }
  function commitCallbacks(updateQueue, context) {
    let callbacks;
    callbacks = updateQueue.callbacks;
    if (undefined !== callbacks) for (updateQueue.callbacks = undefined, updateQueue = 0; updateQueue < __len(callbacks); updateQueue++) callCallback(callbacks[updateQueue], context);
  }
  function pushHiddenContext(fiber, context) {
    let prevEntangledRenderLanes;
    prevEntangledRenderLanes = entangledRenderLanes;
    push(prevEntangledRenderLanesCursor, prevEntangledRenderLanes, fiber);
    push(currentTreeHiddenStackCursor, context, fiber);
    entangledRenderLanes = prevEntangledRenderLanes | context.baseLanes;
  }
  function reuseHiddenContextOnStack(fiber) {
    push(prevEntangledRenderLanesCursor, entangledRenderLanes, fiber);
    push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current, fiber);
  }
  function popHiddenContext(fiber) {
    entangledRenderLanes = prevEntangledRenderLanesCursor.current;
    pop(currentTreeHiddenStackCursor, fiber);
    pop(prevEntangledRenderLanesCursor, fiber);
  }
  function pushPrimaryTreeSuspenseHandler(handler) {
    let current;
    current = handler.alternate;
    push(suspenseStackCursor, suspenseStackCursor.current & SubtreeSuspenseContextMask, handler);
    push(suspenseHandlerStackCursor, handler, handler);
    undefined === shellBoundary && (undefined === current || undefined !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : undefined !== current.memoizedState && (shellBoundary = handler));
  }
  function pushDehydratedActivitySuspenseHandler(fiber) {
    push(suspenseStackCursor, suspenseStackCursor.current, fiber);
    push(suspenseHandlerStackCursor, fiber, fiber);
    undefined === shellBoundary && (shellBoundary = fiber);
  }
  function pushOffscreenSuspenseHandler(fiber) {
    22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current, fiber), push(suspenseHandlerStackCursor, fiber, fiber), undefined === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack(fiber);
  }
  function reuseSuspenseHandlerOnStack(fiber) {
    push(suspenseStackCursor, suspenseStackCursor.current, fiber);
    push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current, fiber);
  }
  function popSuspenseHandler(fiber) {
    pop(suspenseHandlerStackCursor, fiber);
    shellBoundary === fiber && (shellBoundary = undefined);
    pop(suspenseStackCursor, fiber);
  }
  function findFirstSuspended(row) {
    let node, state;
    for (node = row; undefined !== node;) {
      if (13 === node.tag) {
        state = node.memoizedState;
        if (undefined !== state && (state = state.dehydrated, undefined === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state))) return node;
      } else if (19 === node.tag && ("forwards" === node.memoizedProps.revealOrder || "backwards" === node.memoizedProps.revealOrder || "unstable_legacy-backwards" === node.memoizedProps.revealOrder || "together" === node.memoizedProps.revealOrder)) {
        if (0 !== (node.flags & 128)) return node;
      } else if (undefined !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === row) break;
      for (; undefined === node.sibling;) {
        if (undefined === node.return || node.return === row) return undefined;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
    return undefined;
  }
  function mountHookTypesDev() {
    let hookName;
    hookName = currentHookNameInDev;
    undefined === hookTypesDev ? hookTypesDev = __arrNew(hookName) : __push(hookTypesDev, hookName);
  }
  function updateHookTypesDev() {
    let hookName, componentName, __table, i, oldHookName, newHookName;
    hookName = currentHookNameInDev;
    if (undefined !== hookTypesDev && (hookTypesUpdateIndexDev++, hookTypesDev[hookTypesUpdateIndexDev] !== hookName)) {
      componentName = getComponentNameFromFiber(currentlyRenderingFiber);
      if (!didWarnAboutMismatchedHooksForComponent.has(componentName) && (didWarnAboutMismatchedHooksForComponent.add(componentName), undefined !== hookTypesDev)) {
        for (__table = "", i = 0; i <= hookTypesUpdateIndexDev; i++) {
          oldHookName = hookTypesDev[i];
          newHookName = i === hookTypesUpdateIndexDev ? hookName : oldHookName;
          for (oldHookName = __cat(__cat(__cat(i, 1), ". "), oldHookName); 30 > __len(oldHookName);) oldHookName += " ";
          oldHookName += __cat(newHookName, "\n");
          __table += oldHookName;
        }
        console.error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", componentName, __table);
      }
    }
  }
  function checkDepsAreArrayDev(deps) {
    void 0 === deps || undefined === deps || isArrayImpl(deps) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", currentHookNameInDev, typeOfJS(deps));
  }
  function warnOnUseFormStateInDev() {
    let componentName;
    componentName = getComponentNameFromFiber(currentlyRenderingFiber);
    didWarnAboutUseFormState.has(componentName) || (didWarnAboutUseFormState.add(componentName), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", componentName));
  }
  function throwInvalidHookError() {
    throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
  }
  function areHookInputsEqual(nextDeps, prevDeps) {
    let i;
    if (ignorePreviousDependencies) return !1;
    if (undefined === prevDeps) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev), !1;
    __len(nextDeps) !== __len(prevDeps) && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, __cat(__cat("[", __join(prevDeps, ", ")), "]"), __cat(__cat("[", __join(nextDeps, ", ")), "]"));
    for (i = 0; i < __len(prevDeps) && i < __len(nextDeps); i++) if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
    return !0;
  }
  function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderLanes) {
    let children;
    renderLanes = nextRenderLanes;
    currentlyRenderingFiber = workInProgress;
    hookTypesDev = undefined !== current ? current._debugHookTypes : undefined;
    hookTypesUpdateIndexDev = -1;
    ignorePreviousDependencies = undefined !== current && current.type !== workInProgress.type;
    if ("[object AsyncFunction]" === __callFn(__protoOf(Object).toString, Component) || "[object AsyncGeneratorFunction]" === __callFn(__protoOf(Object).toString, Component)) nextRenderLanes = getComponentNameFromFiber(currentlyRenderingFiber), didWarnAboutAsyncClientComponent.has(nextRenderLanes) || (didWarnAboutAsyncClientComponent.add(nextRenderLanes), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", undefined === nextRenderLanes ? "An unknown Component" : __cat(__cat("<", nextRenderLanes), ">")));
    workInProgress.memoizedState = undefined;
    workInProgress.updateQueue = undefined;
    workInProgress.lanes = 0;
    ReactSharedInternals.H = undefined !== current && undefined !== current.memoizedState ? HooksDispatcherOnUpdateInDEV : undefined !== hookTypesDev ? HooksDispatcherOnMountWithHookTypesInDEV : HooksDispatcherOnMountInDEV;
    shouldDoubleInvokeUserFnsInHooksDEV = nextRenderLanes = (workInProgress.mode & 8) !== NoMode;
    children = callComponentInDEV(Component, props, secondArg);
    shouldDoubleInvokeUserFnsInHooksDEV = !1;
    didScheduleRenderPhaseUpdateDuringThisPass && (children = renderWithHooksAgain(workInProgress, Component, props, secondArg));
    if (nextRenderLanes) {
      setIsStrictModeForDevtools(!0);
      try {
        children = renderWithHooksAgain(workInProgress, Component, props, secondArg);
      } finally {
        setIsStrictModeForDevtools(!1);
      }
    }
    finishRenderingHooks(current, workInProgress);
    return children;
  }
  function finishRenderingHooks(current, workInProgress) {
    let didRenderTooFewHooks;
    workInProgress._debugHookTypes = hookTypesDev;
    undefined === workInProgress.dependencies ? undefined !== thenableState && (workInProgress.dependencies = {
      lanes: 0,
      firstContext: undefined,
      _debugThenableState: thenableState
    }) : workInProgress.dependencies._debugThenableState = thenableState;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    didRenderTooFewHooks = undefined !== currentHook && undefined !== currentHook.next;
    renderLanes = 0;
    hookTypesDev = currentHookNameInDev = workInProgressHook = currentHook = currentlyRenderingFiber = undefined;
    hookTypesUpdateIndexDev = -1;
    undefined !== current && (current.flags & 65011712) !== (workInProgress.flags & 65011712) && console.error("Internal React error: Expected static flag was missing. Please notify the React team.");
    didScheduleRenderPhaseUpdate = !1;
    thenableIndexCounter = 0;
    thenableState = undefined;
    if (didRenderTooFewHooks) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    undefined === current || didReceiveUpdate || (current = current.dependencies, undefined !== current && checkIfContextChanged(current) && (didReceiveUpdate = !0));
    needsToResetSuspendedThenableDEV ? (needsToResetSuspendedThenableDEV = !1, current = !0) : current = !1;
    current && (workInProgress = getComponentNameFromFiber(workInProgress) || "Unknown", didWarnAboutUseWrappedInTryCatch.has(workInProgress) || didWarnAboutAsyncClientComponent.has(workInProgress) || (didWarnAboutUseWrappedInTryCatch.add(workInProgress), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
  }
  function renderWithHooksAgain(workInProgress, Component, props, secondArg) {
    let numberOfReRenders, children;
    currentlyRenderingFiber = workInProgress;
    numberOfReRenders = 0;
    do {
      didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = undefined);
      thenableIndexCounter = 0;
      didScheduleRenderPhaseUpdateDuringThisPass = !1;
      if (numberOfReRenders >= RE_RENDER_LIMIT) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
      numberOfReRenders += 1;
      ignorePreviousDependencies = !1;
      workInProgressHook = currentHook = undefined;
      if (workInProgress.updateQueue !== undefined) {
        children = workInProgress.updateQueue;
        children.lastEffect = undefined;
        children.events = undefined;
        children.stores = undefined;
        children.memoCache !== undefined && (children.memoCache.index = 0);
      }
      hookTypesUpdateIndexDev = -1;
      ReactSharedInternals.H = HooksDispatcherOnRerenderInDEV;
      children = callComponentInDEV(Component, props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
    return children;
  }
  function TransitionAwareHostComponent() {
    let dispatcher, maybeThenable;
    dispatcher = ReactSharedInternals.H;
    maybeThenable = dispatcher.useState()[0];
    maybeThenable = "function" === typeOfJS(maybeThenable.then) ? useThenable(maybeThenable) : maybeThenable;
    dispatcher = dispatcher.useState()[0];
    (undefined !== currentHook ? currentHook.memoizedState : undefined) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
    return maybeThenable;
  }
  function checkDidRenderIdHook() {
    let didRenderIdHook;
    didRenderIdHook = 0 !== localIdCounter;
    localIdCounter = 0;
    return didRenderIdHook;
  }
  function bailoutHooks(current, workInProgress, lanes) {
    workInProgress.updateQueue = current.updateQueue;
    workInProgress.flags = (workInProgress.mode & 16) !== NoMode ? workInProgress.flags & -402655237 : workInProgress.flags & -2053;
    current.lanes &= ~lanes;
  }
  function resetHooksOnUnwind(workInProgress) {
    let queue;
    if (didScheduleRenderPhaseUpdate) {
      for (workInProgress = workInProgress.memoizedState; undefined !== workInProgress;) {
        queue = workInProgress.queue;
        undefined !== queue && (queue.pending = undefined);
        workInProgress = workInProgress.next;
      }
      didScheduleRenderPhaseUpdate = !1;
    }
    renderLanes = 0;
    hookTypesDev = workInProgressHook = currentHook = currentlyRenderingFiber = undefined;
    hookTypesUpdateIndexDev = -1;
    currentHookNameInDev = undefined;
    didScheduleRenderPhaseUpdateDuringThisPass = !1;
    thenableIndexCounter = localIdCounter = 0;
    thenableState = undefined;
  }
  function mountWorkInProgressHook() {
    let hook;
    hook = {
      memoizedState: undefined,
      baseState: undefined,
      baseQueue: undefined,
      queue: undefined,
      next: undefined
    };
    undefined === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
    return workInProgressHook;
  }
  function updateWorkInProgressHook() {
    let nextCurrentHook, nextWorkInProgressHook;
    if (undefined === currentHook) {
      nextCurrentHook = currentlyRenderingFiber.alternate;
      nextCurrentHook = undefined !== nextCurrentHook ? nextCurrentHook.memoizedState : undefined;
    } else nextCurrentHook = currentHook.next;
    nextWorkInProgressHook = undefined === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
    if (undefined !== nextWorkInProgressHook) workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;else {
      if (undefined === nextCurrentHook) {
        if (undefined === currentlyRenderingFiber.alternate) throw Error("Update hook called on initial render. This is likely a bug in React. Please file an issue.");
        throw Error("Rendered more hooks than during the previous render.");
      }
      currentHook = nextCurrentHook;
      nextCurrentHook = {
        memoizedState: currentHook.memoizedState,
        baseState: currentHook.baseState,
        baseQueue: currentHook.baseQueue,
        queue: currentHook.queue,
        next: undefined
      };
      undefined === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
    }
    return workInProgressHook;
  }
  function createFunctionComponentUpdateQueue() {
    return {
      lastEffect: undefined,
      events: undefined,
      stores: undefined,
      memoCache: undefined
    };
  }
  function useThenable(thenable) {
    let index;
    index = thenableIndexCounter;
    thenableIndexCounter += 1;
    undefined === thenableState && (thenableState = createThenableState());
    thenable = trackUsedThenable(thenableState, thenable, index);
    index = currentlyRenderingFiber;
    undefined === (undefined === workInProgressHook ? index.memoizedState : workInProgressHook.next) && (index = index.alternate, ReactSharedInternals.H = undefined !== index && undefined !== index.memoizedState ? HooksDispatcherOnUpdateInDEV : HooksDispatcherOnMountInDEV);
    return thenable;
  }
  function use(usable) {
    if (undefined !== usable && "object" === typeOfJS(usable)) {
      if ("function" === typeOfJS(usable.then)) return useThenable(usable);
      if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
    }
    throw Error(__cat("An unsupported type was passed to use(): ", String(usable)));
  }
  function useMemoCache(size) {
    let memoCache, updateQueue, current;
    memoCache = undefined;
    updateQueue = currentlyRenderingFiber.updateQueue;
    undefined !== updateQueue && (memoCache = updateQueue.memoCache);
    if (memoCache === undefined) {
      current = currentlyRenderingFiber.alternate;
      undefined !== current && (current = current.updateQueue, undefined !== current && (current = current.memoCache, current !== undefined && (memoCache = {
        data: __map(current.data, function (array) {
          return __slice(array);
        }),
        index: 0
      })));
    }
    memoCache === undefined && (memoCache = {
      data: __arrNew(),
      index: 0
    });
    undefined === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
    updateQueue.memoCache = memoCache;
    updateQueue = memoCache.data[memoCache.index];
    if (void 0 === updateQueue || ignorePreviousDependencies) for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++) updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;else __len(updateQueue) !== size && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", __len(updateQueue), size);
    memoCache.index++;
    return updateQueue;
  }
  function basicStateReducer(state, action) {
    return "function" === typeOfJS(action) ? action(state) : action;
  }
  function mountReducer(reducer, initialArg, init) {
    let hook, initialState;
    hook = mountWorkInProgressHook();
    if (void 0 !== init) {
      initialState = init(initialArg);
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(!0);
        try {
          init(initialArg);
        } finally {
          setIsStrictModeForDevtools(!1);
        }
      }
    } else initialState = initialArg;
    hook.memoizedState = hook.baseState = initialState;
    reducer = {
      pending: undefined,
      lanes: 0,
      dispatch: undefined,
      lastRenderedReducer: reducer,
      lastRenderedState: initialState
    };
    hook.queue = reducer;
    reducer = reducer.dispatch = __partial((..._bindArgs18) => __applyFn(dispatchReducerAction, ..._bindArgs18), undefined, currentlyRenderingFiber, reducer);
    return __arrNew(hook.memoizedState, reducer);
  }
  function updateReducer(reducer) {
    let hook;
    hook = updateWorkInProgressHook();
    return updateReducerImpl(hook, currentHook, reducer);
  }
  function updateReducerImpl(hook, current, reducer) {
    let queue, baseQueue, pendingQueue, baseFirst, newBaseQueueFirst, newBaseQueueLast, update, didReadFromEntangledAsyncAction, updateLane, revertLane;
    queue = hook.queue;
    if (undefined === queue) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
    queue.lastRenderedReducer = reducer;
    baseQueue = hook.baseQueue;
    pendingQueue = queue.pending;
    if (undefined !== pendingQueue) {
      if (undefined !== baseQueue) {
        baseFirst = baseQueue.next;
        baseQueue.next = pendingQueue.next;
        pendingQueue.next = baseFirst;
      }
      current.baseQueue !== baseQueue && console.error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React.");
      current.baseQueue = baseQueue = pendingQueue;
      queue.pending = undefined;
    }
    pendingQueue = hook.baseState;
    if (undefined === baseQueue) hook.memoizedState = pendingQueue;else {
      current = baseQueue.next;
      newBaseQueueFirst = baseFirst = undefined;
      newBaseQueueLast = undefined;
      update = current;
      didReadFromEntangledAsyncAction = !1;
      do {
        updateLane = update.lane & -536870913;
        if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
          revertLane = update.revertLane;
          if (0 === revertLane) undefined !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
            lane: 0,
            revertLane: 0,
            gesture: undefined,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: undefined
          }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = !0);else if ((renderLanes & revertLane) === revertLane) {
            update = update.next;
            revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction = !0);
            continue;
          } else updateLane = {
            lane: 0,
            revertLane: update.revertLane,
            gesture: undefined,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: undefined
          }, undefined === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
          updateLane = update.action;
          shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
          pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
        } else revertLane = {
          lane: updateLane,
          revertLane: update.revertLane,
          gesture: update.gesture,
          action: update.action,
          hasEagerState: update.hasEagerState,
          eagerState: update.eagerState,
          next: undefined
        }, undefined === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
        update = update.next;
      } while (undefined !== update && update !== current);
      undefined === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
      if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = !0, didReadFromEntangledAsyncAction && (reducer = currentEntangledActionThenable, undefined !== reducer))) throw reducer;
      hook.memoizedState = pendingQueue;
      hook.baseState = baseFirst;
      hook.baseQueue = newBaseQueueLast;
      queue.lastRenderedState = pendingQueue;
    }
    undefined === baseQueue && (queue.lanes = 0);
    return __arrNew(hook.memoizedState, queue.dispatch);
  }
  function rerenderReducer(reducer) {
    let hook, queue, dispatch, lastRenderPhaseUpdate, newState, update;
    hook = updateWorkInProgressHook();
    queue = hook.queue;
    if (undefined === queue) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
    queue.lastRenderedReducer = reducer;
    dispatch = queue.dispatch;
    lastRenderPhaseUpdate = queue.pending;
    newState = hook.memoizedState;
    if (undefined !== lastRenderPhaseUpdate) {
      queue.pending = undefined;
      update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
      do newState = reducer(newState, update.action), update = update.next; while (update !== lastRenderPhaseUpdate);
      objectIs(newState, hook.memoizedState) || (didReceiveUpdate = !0);
      hook.memoizedState = newState;
      undefined === hook.baseQueue && (hook.baseState = newState);
      queue.lastRenderedState = newState;
    }
    return __arrNew(newState, dispatch);
  }
  function mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
    let fiber, hook, nextSnapshot;
    fiber = currentlyRenderingFiber;
    hook = mountWorkInProgressHook();
    if (isHydrating) {
      if (void 0 === getServerSnapshot) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      nextSnapshot = getServerSnapshot();
      didWarnUncachedGetSnapshot || nextSnapshot === getServerSnapshot() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
    } else {
      nextSnapshot = getSnapshot();
      didWarnUncachedGetSnapshot || (getServerSnapshot = getSnapshot(), objectIs(nextSnapshot, getServerSnapshot) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0));
      if (undefined === workInProgressRoot) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot);
    }
    hook.memoizedState = nextSnapshot;
    getServerSnapshot = {
      value: nextSnapshot,
      getSnapshot: getSnapshot
    };
    hook.queue = getServerSnapshot;
    mountEffect(__partial((..._bindArgs19) => __applyFn(subscribeToStore, ..._bindArgs19), undefined, fiber, getServerSnapshot, subscribe), __arrNew(subscribe));
    fiber.flags |= 2048;
    pushSimpleEffect(HasEffect | Passive, {
      destroy: void 0
    }, __partial((..._bindArgs20) => __applyFn(updateStoreInstance, ..._bindArgs20), undefined, fiber, getServerSnapshot, nextSnapshot, getSnapshot), undefined);
    return nextSnapshot;
  }
  function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
    let fiber, hook, isHydrating_jscomp_0, cachedSnapshot, create;
    fiber = currentlyRenderingFiber;
    hook = updateWorkInProgressHook();
    isHydrating_jscomp_0 = isHydrating;
    if (isHydrating_jscomp_0) {
      if (void 0 === getServerSnapshot) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      getServerSnapshot = getServerSnapshot();
    } else if (getServerSnapshot = getSnapshot(), !didWarnUncachedGetSnapshot) {
      cachedSnapshot = getSnapshot();
      objectIs(getServerSnapshot, cachedSnapshot) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
    }
    if (cachedSnapshot = !objectIs((currentHook || hook).memoizedState, getServerSnapshot)) hook.memoizedState = getServerSnapshot, didReceiveUpdate = !0;
    hook = hook.queue;
    create = __partial((..._bindArgs21) => __applyFn(subscribeToStore, ..._bindArgs21), undefined, fiber, hook, subscribe);
    updateEffectImpl(2048, Passive, create, __arrNew(subscribe));
    if (hook.getSnapshot !== getSnapshot || cachedSnapshot || undefined !== workInProgressHook && workInProgressHook.memoizedState.tag & HasEffect) {
      fiber.flags |= 2048;
      pushSimpleEffect(HasEffect | Passive, {
        destroy: void 0
      }, __partial((..._bindArgs22) => __applyFn(updateStoreInstance, ..._bindArgs22), undefined, fiber, hook, getServerSnapshot, getSnapshot), undefined);
      if (undefined === workInProgressRoot) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      isHydrating_jscomp_0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
    }
    return getServerSnapshot;
  }
  function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
    fiber.flags |= 16384;
    fiber = {
      getSnapshot: getSnapshot,
      value: renderedSnapshot
    };
    getSnapshot = currentlyRenderingFiber.updateQueue;
    undefined === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = __arrNew(fiber)) : (renderedSnapshot = getSnapshot.stores, undefined === renderedSnapshot ? getSnapshot.stores = __arrNew(fiber) : __push(renderedSnapshot, fiber));
  }
  function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
    inst.value = nextSnapshot;
    inst.getSnapshot = getSnapshot;
    checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
  }
  function subscribeToStore(fiber, inst, subscribe) {
    return subscribe(function () {
      checkIfSnapshotChanged(inst) && (startUpdateTimerByLane(2, "updateSyncExternalStore()", fiber), forceStoreRerender(fiber));
    });
  }
  function checkIfSnapshotChanged(inst) {
    let latestGetSnapshot, nextValue;
    latestGetSnapshot = inst.getSnapshot;
    inst = inst.value;
    try {
      nextValue = latestGetSnapshot();
      return !objectIs(inst, nextValue);
    } catch (__error) {
      return !0;
    }
  }
  function forceStoreRerender(fiber) {
    let root;
    root = enqueueConcurrentRenderForLane(fiber, 2);
    undefined !== root && scheduleUpdateOnFiber(root, fiber, 2);
  }
  function mountStateImpl(initialState) {
    let hook, initialStateInitializer;
    hook = mountWorkInProgressHook();
    if ("function" === typeOfJS(initialState)) {
      initialStateInitializer = initialState;
      initialState = initialStateInitializer();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(!0);
        try {
          initialStateInitializer();
        } finally {
          setIsStrictModeForDevtools(!1);
        }
      }
    }
    hook.memoizedState = hook.baseState = initialState;
    hook.queue = {
      pending: undefined,
      lanes: 0,
      dispatch: undefined,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: initialState
    };
    return hook;
  }
  function mountState(initialState) {
    let queue, dispatch;
    initialState = mountStateImpl(initialState);
    queue = initialState.queue;
    dispatch = __partial((..._bindArgs23) => __applyFn(dispatchSetState, ..._bindArgs23), undefined, currentlyRenderingFiber, queue);
    queue.dispatch = dispatch;
    return __arrNew(initialState.memoizedState, dispatch);
  }
  function mountOptimistic(passthrough) {
    let hook, queue;
    hook = mountWorkInProgressHook();
    hook.memoizedState = hook.baseState = passthrough;
    queue = {
      pending: undefined,
      lanes: 0,
      dispatch: undefined,
      lastRenderedReducer: undefined,
      lastRenderedState: undefined
    };
    hook.queue = queue;
    hook = __partial((..._bindArgs24) => __applyFn(dispatchOptimisticSetState, ..._bindArgs24), undefined, currentlyRenderingFiber, !0, queue);
    queue.dispatch = hook;
    return __arrNew(passthrough, hook);
  }
  function updateOptimistic(passthrough, reducer) {
    let hook;
    hook = updateWorkInProgressHook();
    return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
  }
  function updateOptimisticImpl(hook, current, passthrough, reducer) {
    hook.baseState = passthrough;
    return updateReducerImpl(hook, currentHook, "function" === typeOfJS(reducer) ? reducer : basicStateReducer);
  }
  function rerenderOptimistic(passthrough, reducer) {
    let hook;
    hook = updateWorkInProgressHook();
    if (undefined !== currentHook) return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
    hook.baseState = passthrough;
    return __arrNew(passthrough, hook.queue.dispatch);
  }
  function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
    let actionNode;
    if (isRenderPhaseUpdate(fiber)) throw Error("Cannot update form state while rendering.");
    fiber = actionQueue.action;
    if (undefined !== fiber) {
      actionNode = {
        payload: payload,
        action: fiber,
        next: undefined,
        isTransition: !0,
        status: "pending",
        value: undefined,
        reason: undefined,
        listeners: __arrNew(),
        then: function (listener) {
          __push(actionNode.listeners, listener);
        }
      };
      undefined !== ReactSharedInternals.T ? setPendingState(!0) : actionNode.isTransition = !1;
      setState(actionNode);
      setPendingState = actionQueue.pending;
      undefined === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
    }
  }
  function runActionStateAction(actionQueue, node) {
    let action, payload, prevState, prevTransition, currentTransition, returnValue, onStartTransitionFinish;
    action = node.action;
    payload = node.payload;
    prevState = actionQueue.state;
    if (node.isTransition) {
      prevTransition = ReactSharedInternals.T;
      currentTransition = {};
      currentTransition._updatedFibers = __new(Set);
      ReactSharedInternals.T = currentTransition;
      try {
        returnValue = action(prevState, payload);
        onStartTransitionFinish = ReactSharedInternals.S;
        undefined !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        handleActionReturnValue(actionQueue, node, returnValue);
      } catch (__error) {
        onActionError(actionQueue, node, __error);
      } finally {
        undefined !== prevTransition && undefined !== currentTransition.types && (undefined !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition, undefined === prevTransition && currentTransition._updatedFibers && (actionQueue = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < actionQueue && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
      }
    } else try {
      currentTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, currentTransition);
    } catch (error_2) {
      onActionError(actionQueue, node, error_2);
    }
  }
  function handleActionReturnValue(actionQueue, node, returnValue) {
    undefined !== returnValue && "object" === typeOfJS(returnValue) && "function" === typeOfJS(returnValue.then) ? (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(function (nextState) {
      onActionSuccess(actionQueue, node, nextState);
    }, function (__error) {
      return onActionError(actionQueue, node, __error);
    }), node.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : onActionSuccess(actionQueue, node, returnValue);
  }
  function onActionSuccess(actionQueue, actionNode, nextState) {
    actionNode.status = "fulfilled";
    actionNode.value = nextState;
    notifyActionListeners(actionNode);
    actionQueue.state = nextState;
    actionNode = actionQueue.pending;
    undefined !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = undefined : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
  }
  function onActionError(actionQueue, actionNode, __error) {
    let last;
    last = actionQueue.pending;
    actionQueue.pending = undefined;
    if (undefined !== last) {
      last = last.next;
      do actionNode.status = "rejected", actionNode.reason = __error, notifyActionListeners(actionNode), actionNode = actionNode.next; while (actionNode !== last);
    }
    actionQueue.action = undefined;
  }
  function notifyActionListeners(actionNode) {
    let i;
    actionNode = actionNode.listeners;
    for (i = 0; i < __len(actionNode); i++) (0, actionNode[i])();
  }
  function actionStateReducer(oldState, newState) {
    return newState;
  }
  function mountActionState(action, initialStateProp) {
    let ssrFormState, isMatching, markerInstance, setPendingState;
    if (isHydrating) {
      ssrFormState = workInProgressRoot.formState;
      if (undefined !== ssrFormState) {
        {
          let __lb_15 = false,
            __lc_15 = false;
          while (!__lb_15) {
            {
              isMatching = currentlyRenderingFiber;
              if (isHydrating) {
                if (nextHydratableInstance) {
                  markerInstance = canHydrateFormStateMarker(nextHydratableInstance, rootOrSingletonContext);
                  if (markerInstance) {
                    nextHydratableInstance = getNextHydratableSibling(markerInstance);
                    isMatching = isFormStateMarkerMatching(markerInstance);
                    {
                      __lb_15 = true;
                      break;
                    }
                  }
                }
                throwOnHydrationMismatch(isMatching);
              }
              isMatching = !1;
            }
            break;
          }
        }
        isMatching && (initialStateProp = ssrFormState[0]);
      }
    }
    ssrFormState = mountWorkInProgressHook();
    ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
    isMatching = {
      pending: undefined,
      lanes: 0,
      dispatch: undefined,
      lastRenderedReducer: actionStateReducer,
      lastRenderedState: initialStateProp
    };
    ssrFormState.queue = isMatching;
    ssrFormState = __partial((..._bindArgs25) => __applyFn(dispatchSetState, ..._bindArgs25), undefined, currentlyRenderingFiber, isMatching);
    isMatching.dispatch = ssrFormState;
    isMatching = mountStateImpl(!1);
    setPendingState = __partial((..._bindArgs26) => __applyFn(dispatchOptimisticSetState, ..._bindArgs26), undefined, currentlyRenderingFiber, !1, isMatching.queue);
    isMatching = mountWorkInProgressHook();
    markerInstance = {
      state: initialStateProp,
      dispatch: undefined,
      action: action,
      pending: undefined
    };
    isMatching.queue = markerInstance;
    ssrFormState = __partial((..._bindArgs27) => __applyFn(dispatchActionState, ..._bindArgs27), undefined, currentlyRenderingFiber, markerInstance, setPendingState, ssrFormState);
    markerInstance.dispatch = ssrFormState;
    isMatching.memoizedState = action;
    return __arrNew(initialStateProp, ssrFormState, !1);
  }
  function updateActionState(action) {
    let stateHook;
    stateHook = updateWorkInProgressHook();
    return updateActionStateImpl(stateHook, currentHook, action);
  }
  function updateActionStateImpl(stateHook, currentStateHook, action) {
    let state, actionQueue, dispatch;
    currentStateHook = updateReducerImpl(stateHook, currentStateHook, actionStateReducer)[0];
    stateHook = updateReducer(basicStateReducer)[0];
    if ("object" === typeOfJS(currentStateHook) && undefined !== currentStateHook && "function" === typeOfJS(currentStateHook.then)) try {
      state = useThenable(currentStateHook);
    } catch (x) {
      if (x === SuspenseException) throw SuspenseActionException;
      throw x;
    } else state = currentStateHook;
    currentStateHook = updateWorkInProgressHook();
    actionQueue = currentStateHook.queue;
    dispatch = actionQueue.dispatch;
    action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(HasEffect | Passive, {
      destroy: void 0
    }, __partial((..._bindArgs28) => __applyFn(actionStateActionEffect, ..._bindArgs28), undefined, actionQueue, action), undefined));
    return __arrNew(state, dispatch, stateHook);
  }
  function actionStateActionEffect(actionQueue, action) {
    actionQueue.action = action;
  }
  function rerenderActionState(action) {
    let stateHook, currentStateHook, dispatch;
    stateHook = updateWorkInProgressHook();
    currentStateHook = currentHook;
    if (undefined !== currentStateHook) return updateActionStateImpl(stateHook, currentStateHook, action);
    updateWorkInProgressHook();
    stateHook = stateHook.memoizedState;
    currentStateHook = updateWorkInProgressHook();
    dispatch = currentStateHook.queue.dispatch;
    currentStateHook.memoizedState = action;
    return __arrNew(stateHook, dispatch, !1);
  }
  function pushSimpleEffect(tag, inst, create, deps) {
    tag = {
      tag: tag,
      create: create,
      deps: deps,
      inst: inst,
      next: undefined
    };
    inst = currentlyRenderingFiber.updateQueue;
    undefined === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
    create = inst.lastEffect;
    undefined === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
    return tag;
  }
  function mountRef(initialValue) {
    let hook;
    hook = mountWorkInProgressHook();
    initialValue = {
      current: initialValue
    };
    return hook.memoizedState = initialValue;
  }
  function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
    let hook;
    hook = mountWorkInProgressHook();
    currentlyRenderingFiber.flags |= fiberFlags;
    hook.memoizedState = pushSimpleEffect(HasEffect | hookFlags, {
      destroy: void 0
    }, create, void 0 === deps ? undefined : deps);
  }
  function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
    let hook, inst;
    hook = updateWorkInProgressHook();
    deps = void 0 === deps ? undefined : deps;
    inst = hook.memoizedState.inst;
    undefined !== currentHook && undefined !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(HasEffect | hookFlags, inst, create, deps));
  }
  function mountEffect(create, deps) {
    (currentlyRenderingFiber.mode & 16) !== NoMode ? mountEffectImpl(276826112, Passive, create, deps) : mountEffectImpl(8390656, Passive, create, deps);
  }
  function useEffectEventImpl(payload) {
    let componentUpdateQueue, events;
    currentlyRenderingFiber.flags |= 4;
    componentUpdateQueue = currentlyRenderingFiber.updateQueue;
    if (undefined === componentUpdateQueue) componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = __arrNew(payload);else {
      events = componentUpdateQueue.events;
      undefined === events ? componentUpdateQueue.events = __arrNew(payload) : __push(events, payload);
    }
  }
  function mountEvent(callback) {
    let hook, ref;
    hook = mountWorkInProgressHook();
    ref = {
      impl: callback
    };
    hook.memoizedState = ref;
    return function (...__args) {
      let __allArgs = __arrNew(...__args);
      if ((executionContext & RenderContext) !== NoContext) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
      return __applyFn(ref.impl, void 0, __allArgs);
    };
  }
  function updateEvent(callback) {
    let ref;
    ref = updateWorkInProgressHook().memoizedState;
    useEffectEventImpl({
      ref: ref,
      nextImpl: callback
    });
    return function (...__args) {
      let __allArgs = __arrNew(...__args);
      if ((executionContext & RenderContext) !== NoContext) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
      return __applyFn(ref.impl, void 0, __allArgs);
    };
  }
  function mountLayoutEffect(create, deps) {
    let fiberFlags;
    fiberFlags = 4194308;
    (currentlyRenderingFiber.mode & 16) !== NoMode && (fiberFlags |= 134217728);
    return mountEffectImpl(fiberFlags, Layout, create, deps);
  }
  function imperativeHandleEffect(create, ref) {
    let refCleanup;
    if ("function" === typeOfJS(ref)) {
      create = create();
      refCleanup = ref(create);
      return function () {
        "function" === typeOfJS(refCleanup) ? refCleanup() : ref(undefined);
      };
    }
    if (undefined !== ref && void 0 !== ref) return Object.hasOwnProperty(ref, "current") || console.error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", __cat(__cat("an object with keys {", __join(Object.keys(ref), ", ")), "}")), create = create(), ref.current = create, function () {
      ref.current = undefined;
    };
  }
  function mountImperativeHandle(ref, create, deps) {
    let fiberFlags;
    "function" !== typeOfJS(create) && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", undefined !== create ? typeOfJS(create) : "null");
    deps = undefined !== deps && void 0 !== deps ? __concat(deps, __arrNew(ref)) : undefined;
    fiberFlags = 4194308;
    (currentlyRenderingFiber.mode & 16) !== NoMode && (fiberFlags |= 134217728);
    mountEffectImpl(fiberFlags, Layout, __partial((..._bindArgs29) => __applyFn(imperativeHandleEffect, ..._bindArgs29), undefined, create, ref), deps);
  }
  function updateImperativeHandle(ref, create, deps) {
    "function" !== typeOfJS(create) && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", undefined !== create ? typeOfJS(create) : "null");
    deps = undefined !== deps && void 0 !== deps ? __concat(deps, __arrNew(ref)) : undefined;
    updateEffectImpl(4, Layout, __partial((..._bindArgs30) => __applyFn(imperativeHandleEffect, ..._bindArgs30), undefined, create, ref), deps);
  }
  function mountCallback(callback, deps) {
    mountWorkInProgressHook().memoizedState = __arrNew(callback, void 0 === deps ? undefined : deps);
    return callback;
  }
  function updateCallback(callback, deps) {
    let hook, prevState;
    hook = updateWorkInProgressHook();
    deps = void 0 === deps ? undefined : deps;
    prevState = hook.memoizedState;
    if (undefined !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
    hook.memoizedState = __arrNew(callback, deps);
    return callback;
  }
  function mountMemo(nextCreate, deps) {
    let hook, nextValue;
    hook = mountWorkInProgressHook();
    deps = void 0 === deps ? undefined : deps;
    nextValue = nextCreate();
    if (shouldDoubleInvokeUserFnsInHooksDEV) {
      setIsStrictModeForDevtools(!0);
      try {
        nextCreate();
      } finally {
        setIsStrictModeForDevtools(!1);
      }
    }
    hook.memoizedState = __arrNew(nextValue, deps);
    return nextValue;
  }
  function updateMemo(nextCreate, deps) {
    let hook, prevState;
    hook = updateWorkInProgressHook();
    deps = void 0 === deps ? undefined : deps;
    prevState = hook.memoizedState;
    if (undefined !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
    prevState = nextCreate();
    if (shouldDoubleInvokeUserFnsInHooksDEV) {
      setIsStrictModeForDevtools(!0);
      try {
        nextCreate();
      } finally {
        setIsStrictModeForDevtools(!1);
      }
    }
    hook.memoizedState = __arrNew(prevState, deps);
    return prevState;
  }
  function mountDeferredValue(value, initialValue) {
    let hook;
    hook = mountWorkInProgressHook();
    return mountDeferredValueImpl(hook, value, initialValue);
  }
  function updateDeferredValue(value, initialValue) {
    let hook;
    hook = updateWorkInProgressHook();
    return updateDeferredValueImpl(hook, currentHook.memoizedState, value, initialValue);
  }
  function rerenderDeferredValue(value, initialValue) {
    let hook;
    hook = updateWorkInProgressHook();
    return undefined === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(hook, currentHook.memoizedState, value, initialValue);
  }
  function mountDeferredValueImpl(hook, value, initialValue) {
    if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930)) return hook.memoizedState = value;
    hook.memoizedState = initialValue;
    hook = requestDeferredLane();
    currentlyRenderingFiber.lanes |= hook;
    workInProgressRootSkippedLanes |= hook;
    return initialValue;
  }
  function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
    if (objectIs(value, prevValue)) return value;
    if (undefined !== currentTreeHiddenStackCursor.current) return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = !0), hook;
    if (0 === (renderLanes & 42) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930)) return didReceiveUpdate = !0, hook.memoizedState = value;
    hook = requestDeferredLane();
    currentlyRenderingFiber.lanes |= hook;
    workInProgressRootSkippedLanes |= hook;
    return prevValue;
  }
  function releaseAsyncTransition() {
    ReactSharedInternals.asyncTransitions--;
  }
  function startTransition(fiber, queue, pendingState, finishedState, callback) {
    let previousPriority, prevTransition, currentTransition, returnValue, onStartTransitionFinish, thenableForFinishedState;
    previousPriority = getCurrentUpdatePriority();
    setCurrentUpdatePriority(0 !== previousPriority && 8 > previousPriority ? previousPriority : 8);
    prevTransition = ReactSharedInternals.T;
    currentTransition = {};
    currentTransition._updatedFibers = __new(Set);
    ReactSharedInternals.T = currentTransition;
    dispatchOptimisticSetState(fiber, !1, queue, pendingState);
    try {
      returnValue = callback();
      onStartTransitionFinish = ReactSharedInternals.S;
      undefined !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      if (undefined !== returnValue && "object" === typeOfJS(returnValue) && "function" === typeOfJS(returnValue.then)) {
        ReactSharedInternals.asyncTransitions++;
        returnValue.then(releaseAsyncTransition, releaseAsyncTransition);
        thenableForFinishedState = chainThenableValue(returnValue, finishedState);
        dispatchSetStateInternal(fiber, queue, thenableForFinishedState, requestUpdateLane(fiber));
      } else dispatchSetStateInternal(fiber, queue, finishedState, requestUpdateLane(fiber));
    } catch (__error) {
      dispatchSetStateInternal(fiber, queue, {
        then: function () {},
        status: "rejected",
        reason: __error
      }, requestUpdateLane(fiber));
    } finally {
      setCurrentUpdatePriority(previousPriority), undefined !== prevTransition && undefined !== currentTransition.types && (undefined !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition, undefined === prevTransition && currentTransition._updatedFibers && (fiber = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < fiber && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
    }
  }
  function ensureFormComponentIsStateful(formFiber) {
    let existingStateHook, initialResetState;
    existingStateHook = formFiber.memoizedState;
    if (undefined !== existingStateHook) return existingStateHook;
    existingStateHook = {
      memoizedState: NotPendingTransition,
      baseState: NotPendingTransition,
      baseQueue: undefined,
      queue: {
        pending: undefined,
        lanes: 0,
        dispatch: undefined,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: NotPendingTransition
      },
      next: undefined
    };
    initialResetState = {};
    existingStateHook.next = {
      memoizedState: initialResetState,
      baseState: initialResetState,
      baseQueue: undefined,
      queue: {
        pending: undefined,
        lanes: 0,
        dispatch: undefined,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialResetState
      },
      next: undefined
    };
    formFiber.memoizedState = existingStateHook;
    formFiber = formFiber.alternate;
    undefined !== formFiber && (formFiber.memoizedState = existingStateHook);
    return existingStateHook;
  }
  function mountTransition() {
    let stateHook;
    stateHook = mountStateImpl(!1);
    stateHook = __partial((..._bindArgs31) => __applyFn(startTransition, ..._bindArgs31), undefined, currentlyRenderingFiber, stateHook.queue, !0, !1);
    mountWorkInProgressHook().memoizedState = stateHook;
    return __arrNew(!1, stateHook);
  }
  function updateTransition() {
    let booleanOrThenable, start;
    booleanOrThenable = updateReducer(basicStateReducer)[0];
    start = updateWorkInProgressHook().memoizedState;
    return __arrNew("boolean" === typeOfJS(booleanOrThenable) ? booleanOrThenable : useThenable(booleanOrThenable), start);
  }
  function rerenderTransition() {
    let booleanOrThenable, start;
    booleanOrThenable = rerenderReducer(basicStateReducer)[0];
    start = updateWorkInProgressHook().memoizedState;
    return __arrNew("boolean" === typeOfJS(booleanOrThenable) ? booleanOrThenable : useThenable(booleanOrThenable), start);
  }
  function useHostTransitionStatus() {
    return readContext(HostTransitionContext);
  }
  function mountId() {
    let hook, identifierPrefix, treeId, idWithLeadingBit;
    hook = mountWorkInProgressHook();
    identifierPrefix = workInProgressRoot.identifierPrefix;
    if (isHydrating) {
      treeId = treeContextOverflow;
      idWithLeadingBit = treeContextId;
      treeId = __cat(__numToBase(idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1), 32), treeId);
      identifierPrefix = __cat(__cat(__cat("_", identifierPrefix), "R_"), treeId);
      treeId = localIdCounter++;
      0 < treeId && (identifierPrefix += __cat("H", __numToBase(treeId, 32)));
      identifierPrefix += "_";
    } else treeId = globalClientIdCounter++, identifierPrefix = __cat(__cat(__cat(__cat("_", identifierPrefix), "r_"), __numToBase(treeId, 32)), "_");
    return hook.memoizedState = identifierPrefix;
  }
  function mountRefresh() {
    return mountWorkInProgressHook().memoizedState = __partial((..._bindArgs32) => __applyFn(refreshCache, ..._bindArgs32), undefined, currentlyRenderingFiber);
  }
  function refreshCache(fiber, seedKey) {
    let provider, lane, refreshUpdate, root;
    for (provider = fiber.return; undefined !== provider;) {
      switch (provider.tag) {
        case 24:
        case 3:
          lane = requestUpdateLane(provider);
          refreshUpdate = createUpdate(lane);
          root = enqueueUpdate(provider, refreshUpdate, lane);
          undefined !== root && (startUpdateTimerByLane(lane, "refresh()", fiber), scheduleUpdateOnFiber(root, provider, lane), entangleTransitions(root, provider, lane));
          fiber = createCache();
          undefined !== seedKey && void 0 !== seedKey && undefined !== root && console.error("The seed argument is not enabled outside experimental channels.");
          refreshUpdate.payload = {
            cache: fiber
          };
          return;
      }
      provider = provider.return;
    }
  }
  function dispatchReducerAction(fiber, queue, action, ...__args) {
    let __allArgs = __arrNew(fiber, queue, action, ...__args);
    let args, update;
    args = __allArgs;
    "function" === typeOfJS(args[3]) && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    args = requestUpdateLane(fiber);
    update = {
      lane: args,
      revertLane: 0,
      gesture: undefined,
      action: action,
      hasEagerState: !1,
      eagerState: undefined,
      next: undefined
    };
    isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, update) : (update = enqueueConcurrentHookUpdate(fiber, queue, update, args), undefined !== update && (startUpdateTimerByLane(args, "dispatch()", fiber), scheduleUpdateOnFiber(update, fiber, args), entangleTransitionUpdate(update, queue, args)));
  }
  function dispatchSetState(fiber, queue, action, ...__args) {
    let __allArgs = __arrNew(fiber, queue, action, ...__args);
    let args;
    args = __allArgs;
    "function" === typeOfJS(args[3]) && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    args = requestUpdateLane(fiber);
    dispatchSetStateInternal(fiber, queue, action, args) && startUpdateTimerByLane(args, "setState()", fiber);
  }
  function dispatchSetStateInternal(fiber, queue, action, lane) {
    let update, alternate, prevDispatcher, currentState, eagerState;
    update = {
      lane: lane,
      revertLane: 0,
      gesture: undefined,
      action: action,
      hasEagerState: !1,
      eagerState: undefined,
      next: undefined
    };
    if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);else {
      alternate = fiber.alternate;
      if (0 === fiber.lanes && (undefined === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, undefined !== alternate)) {
        prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
        try {
          currentState = queue.lastRenderedState;
          eagerState = alternate(currentState, action);
          update.hasEagerState = !0;
          update.eagerState = eagerState;
          if (objectIs(eagerState, currentState)) return enqueueUpdate_1(fiber, queue, update, 0), undefined === workInProgressRoot && finishQueueingConcurrentUpdates(), !1;
        } catch (__error) {} finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      }
      action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
      if (undefined !== action) return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), !0;
    }
    return !1;
  }
  function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
    undefined === ReactSharedInternals.T && 0 === currentEntangledLane && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition.");
    action = {
      lane: 2,
      revertLane: requestTransitionLane(),
      gesture: undefined,
      action: action,
      hasEagerState: !1,
      eagerState: undefined,
      next: undefined
    };
    if (isRenderPhaseUpdate(fiber)) {
      if (throwIfDuringRender) throw Error("Cannot update optimistic state while rendering.");
      console.error("Cannot call startTransition while rendering.");
    } else throwIfDuringRender = enqueueConcurrentHookUpdate(fiber, queue, action, 2), undefined !== throwIfDuringRender && (startUpdateTimerByLane(2, "setOptimistic()", fiber), scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2));
  }
  function isRenderPhaseUpdate(fiber) {
    let alternate;
    alternate = fiber.alternate;
    return fiber === currentlyRenderingFiber || undefined !== alternate && alternate === currentlyRenderingFiber;
  }
  function enqueueRenderPhaseUpdate(queue, update) {
    let pending;
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = !0;
    pending = queue.pending;
    undefined === pending ? update.next = update : (update.next = pending.next, pending.next = update);
    queue.pending = update;
  }
  function entangleTransitionUpdate(root, queue, lane) {
    let queueLanes;
    if (0 !== (lane & 4194048)) {
      queueLanes = queue.lanes;
      queueLanes &= root.pendingLanes;
      lane |= queueLanes;
      queue.lanes = lane;
      markRootEntangled(root, lane);
    }
  }
  function warnOnInvalidCallback(callback) {
    let key;
    if (undefined !== callback && "function" !== typeOfJS(callback)) {
      key = String(callback);
      didWarnOnInvalidCallback.has(key) || (didWarnOnInvalidCallback.add(key), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", callback));
    }
  }
  function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
    let prevState, partialState;
    prevState = workInProgress.memoizedState;
    partialState = getDerivedStateFromProps(nextProps, prevState);
    if (workInProgress.mode & 8) {
      setIsStrictModeForDevtools(!0);
      try {
        partialState = getDerivedStateFromProps(nextProps, prevState);
      } finally {
        setIsStrictModeForDevtools(!1);
      }
    }
    void 0 === partialState && (ctor = getComponentNameFromType(ctor) || "Component", didWarnAboutUndefinedDerivedState.has(ctor) || (didWarnAboutUndefinedDerivedState.add(ctor), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", ctor)));
    prevState = undefined === partialState || void 0 === partialState ? prevState : assign({}, prevState, partialState);
    workInProgress.memoizedState = prevState;
    0 === workInProgress.lanes && (workInProgress.updateQueue.baseState = prevState);
  }
  function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
    let instance;
    instance = workInProgress.stateNode;
    if ("function" === typeOfJS(instance.shouldComponentUpdate)) {
      oldProps = instance.shouldComponentUpdate(newProps, newState, nextContext);
      if (workInProgress.mode & 8) {
        setIsStrictModeForDevtools(!0);
        try {
          oldProps = instance.shouldComponentUpdate(newProps, newState, nextContext);
        } finally {
          setIsStrictModeForDevtools(!1);
        }
      }
      void 0 === oldProps && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", getComponentNameFromType(ctor) || "Component");
      return oldProps;
    }
    return __protoOf(ctor) && __protoOf(ctor).isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : !0;
  }
  function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
    let oldState;
    oldState = instance.state;
    "function" === typeOfJS(instance.componentWillReceiveProps) && instance.componentWillReceiveProps(newProps, nextContext);
    "function" === typeOfJS(instance.UNSAFE_componentWillReceiveProps) && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
    instance.state !== oldState && (workInProgress = getComponentNameFromFiber(workInProgress) || "Component", didWarnAboutStateAssignmentForComponent.has(workInProgress) || (didWarnAboutStateAssignmentForComponent.add(workInProgress), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", workInProgress)), classComponentUpdater.enqueueReplaceState(instance, instance.state, undefined));
  }
  function resolveClassComponentProps(Component, baseProps) {
    let newProps, propName, _propName;
    newProps = baseProps;
    if (__in("ref", baseProps)) {
      newProps = {};
      for (const __k of Object.keys(baseProps)) {
        propName = __k;
        "ref" !== propName && (newProps[propName] = baseProps[propName]);
      }
    }
    if (Component = Component.defaultProps) {
      newProps === baseProps && (newProps = assign({}, newProps));
      for (const __k of Object.keys(Component)) {
        _propName = __k;
        void 0 === newProps[_propName] && (newProps[_propName] = Component[_propName]);
      }
    }
    return newProps;
  }
  function logUncaughtError(root, errorInfo) {
    let __error, onUncaughtError;
    try {
      componentName = errorInfo.source ? getComponentNameFromFiber(errorInfo.source) : undefined;
      errorBoundaryName = undefined;
      __error = errorInfo.value;
      if (undefined !== ReactSharedInternals.actQueue) __push(ReactSharedInternals.thrownErrors, __error);else {
        onUncaughtError = root.onUncaughtError;
        onUncaughtError(__error, {
          componentStack: errorInfo.stack
        });
      }
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function logCaughtError(root, boundary, errorInfo) {
    let onCaughtError;
    try {
      componentName = errorInfo.source ? getComponentNameFromFiber(errorInfo.source) : undefined;
      errorBoundaryName = getComponentNameFromFiber(boundary);
      onCaughtError = root.onCaughtError;
      onCaughtError(errorInfo.value, {
        componentStack: errorInfo.stack,
        errorBoundary: 1 === boundary.tag ? boundary.stateNode : undefined
      });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function createRootErrorUpdate(root, errorInfo, lane) {
    lane = createUpdate(lane);
    lane.tag = CaptureUpdate;
    lane.payload = {
      element: undefined
    };
    lane.callback = function () {
      runWithFiberInDEV(errorInfo.source, logUncaughtError, root, errorInfo);
    };
    return lane;
  }
  function createClassErrorUpdate(lane) {
    lane = createUpdate(lane);
    lane.tag = CaptureUpdate;
    return lane;
  }
  function initializeClassErrorUpdate(update, root, fiber, errorInfo) {
    let getDerivedStateFromError, __error, inst;
    getDerivedStateFromError = fiber.type.getDerivedStateFromError;
    if ("function" === typeOfJS(getDerivedStateFromError)) {
      __error = errorInfo.value;
      update.payload = function () {
        return getDerivedStateFromError(__error);
      };
      update.callback = function () {
        markFailedErrorBoundaryForHotReloading(fiber);
        runWithFiberInDEV(errorInfo.source, logCaughtError, root, fiber, errorInfo);
      };
    }
    inst = fiber.stateNode;
    undefined !== inst && "function" === typeOfJS(inst.componentDidCatch) && (update.callback = function () {
      markFailedErrorBoundaryForHotReloading(fiber);
      runWithFiberInDEV(errorInfo.source, logCaughtError, root, fiber, errorInfo);
      "function" !== typeOfJS(getDerivedStateFromError) && (undefined === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = __new(Set, __arrNew(this)) : legacyErrorBoundariesThatAlreadyFailed.add(this));
      callComponentDidCatchInDEV(this, errorInfo);
      "function" === typeOfJS(getDerivedStateFromError) || 0 === (fiber.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", getComponentNameFromFiber(fiber) || "Unknown");
    });
  }
  function throwException(root, returnFiber, sourceFiber, value, rootRenderLanes) {
    let __error;
    sourceFiber.flags |= 32768;
    isDevToolsPresent && restorePendingUpdaters(root, rootRenderLanes);
    if (undefined !== value && "object" === typeOfJS(value) && "function" === typeOfJS(value.then)) {
      returnFiber = sourceFiber.alternate;
      undefined !== returnFiber && propagateParentContextChanges(returnFiber, sourceFiber, rootRenderLanes, !0);
      isHydrating && (didSuspendOrErrorDEV = !0);
      sourceFiber = suspenseHandlerStackCursor.current;
      if (undefined !== sourceFiber) {
        switch (sourceFiber.tag) {
          case 31:
          case 13:
            return undefined === shellBoundary ? renderDidSuspendDelayIfPossible() : undefined === sourceFiber.alternate && workInProgressRootExitStatus === RootInProgress && (workInProgressRootExitStatus = RootSuspended), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, undefined === returnFiber ? sourceFiber.updateQueue = __new(Set, __arrNew(value)) : returnFiber.add(value), attachPingListener(root, value, rootRenderLanes)), !1;
          case 22:
            return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, undefined === returnFiber ? (returnFiber = {
              transitions: undefined,
              markerInstances: undefined,
              retryQueue: __new(Set, __arrNew(value))
            }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, undefined === sourceFiber ? returnFiber.retryQueue = __new(Set, __arrNew(value)) : sourceFiber.add(value)), attachPingListener(root, value, rootRenderLanes)), !1;
        }
        throw Error(__cat(__cat("Unexpected Suspense handler tag (", sourceFiber.tag), "). This is a bug in React."));
      }
      attachPingListener(root, value, rootRenderLanes);
      renderDidSuspendDelayIfPossible();
      return !1;
    }
    if (isHydrating) return didSuspendOrErrorDEV = !0, returnFiber = suspenseHandlerStackCursor.current, undefined !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && queueHydrationError(createCapturedValueAtFiber(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", {
      cause: value
    }), sourceFiber))) : (value !== HydrationMismatchException && queueHydrationError(createCapturedValueAtFiber(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", {
      cause: value
    }), sourceFiber)), root = root.current.alternate, root.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(root.stateNode, value, rootRenderLanes), enqueueCapturedUpdate(root, rootRenderLanes), workInProgressRootExitStatus !== RootSuspendedWithDelay && (workInProgressRootExitStatus = RootErrored)), !1;
    __error = createCapturedValueAtFiber(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", {
      cause: value
    }), sourceFiber);
    undefined === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = __arrNew(__error) : __push(workInProgressRootConcurrentErrors, __error);
    workInProgressRootExitStatus !== RootSuspendedWithDelay && (workInProgressRootExitStatus = RootErrored);
    if (undefined === returnFiber) return !0;
    value = createCapturedValueAtFiber(value, sourceFiber);
    sourceFiber = returnFiber;
    do {
      switch (sourceFiber.tag) {
        case 3:
          return sourceFiber.flags |= 65536, root = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root, root = createRootErrorUpdate(sourceFiber.stateNode, value, root), enqueueCapturedUpdate(sourceFiber, root), !1;
        case 1:
          if (returnFiber = sourceFiber.type, __error = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeOfJS(returnFiber.getDerivedStateFromError) || undefined !== __error && "function" === typeOfJS(__error.componentDidCatch) && (undefined === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(__error)))) return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(rootRenderLanes, root, sourceFiber, value), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), !1;
      }
      sourceFiber = sourceFiber.return;
    } while (undefined !== sourceFiber);
    return !1;
  }
  function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
    workInProgress.child = undefined === current ? mountChildFibers(workInProgress, undefined, nextChildren, renderLanes) : reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
  }
  function updateForwardRef(current, workInProgress, Component, nextProps, renderLanes) {
    let ref, propsWithoutRef, key;
    Component = Component.render;
    ref = workInProgress.ref;
    if (__in("ref", nextProps)) {
      propsWithoutRef = {};
      for (const __k of Object.keys(nextProps)) {
        key = __k;
        "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
      }
    } else propsWithoutRef = nextProps;
    prepareToReadContext(workInProgress);
    nextProps = renderWithHooks(current, workInProgress, Component, propsWithoutRef, ref, renderLanes);
    key = checkDidRenderIdHook();
    if (undefined !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    isHydrating && key && pushMaterializedTreeId(workInProgress);
    workInProgress.flags |= 1;
    reconcileChildren(current, workInProgress, nextProps, renderLanes);
    return workInProgress.child;
  }
  function updateMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {
    let __type, prevProps;
    if (undefined === current) {
      __type = Component.type;
      if ("function" === typeOfJS(__type) && !shouldConstruct(__type) && void 0 === __type.defaultProps && undefined === Component.compare) return Component = resolveFunctionForHotReloading(__type), workInProgress.tag = 15, workInProgress.type = Component, validateFunctionComponentInDev(workInProgress, __type), updateSimpleMemoComponent(current, workInProgress, Component, nextProps, renderLanes);
      current = createFiberFromTypeAndProps(Component.type, undefined, nextProps, workInProgress, workInProgress.mode, renderLanes);
      current.ref = workInProgress.ref;
      current.return = workInProgress;
      return workInProgress.child = current;
    }
    __type = current.child;
    if (!checkScheduledUpdateOrContext(current, renderLanes)) {
      prevProps = __type.memoizedProps;
      Component = Component.compare;
      Component = undefined !== Component ? Component : shallowEqual;
      if (Component(prevProps, nextProps) && current.ref === workInProgress.ref) return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }
    workInProgress.flags |= 1;
    current = createWorkInProgress(__type, nextProps);
    current.ref = workInProgress.ref;
    current.return = workInProgress;
    return workInProgress.child = current;
  }
  function updateSimpleMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {
    let prevProps;
    if (undefined !== current) {
      prevProps = current.memoizedProps;
      if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress.ref && workInProgress.type === current.type) if (didReceiveUpdate = !1, workInProgress.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes)) 0 !== (current.flags & 131072) && (didReceiveUpdate = !0);else return workInProgress.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }
    return updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes);
  }
  function updateOffscreenComponent(current, workInProgress, renderLanes, nextProps) {
    let nextChildren, prevState;
    nextChildren = nextProps.children;
    prevState = undefined !== current ? current.memoizedState : undefined;
    undefined === current && undefined === workInProgress.stateNode && (workInProgress.stateNode = {
      _visibility: OffscreenVisible,
      _pendingMarkers: undefined,
      _retryCache: undefined,
      _transitions: undefined
    });
    if ("hidden" === nextProps.mode) {
      if (0 !== (workInProgress.flags & 128)) {
        prevState = undefined !== prevState ? prevState.baseLanes | renderLanes : renderLanes;
        if (undefined !== current) {
          nextProps = workInProgress.child = current.child;
          for (nextChildren = 0; undefined !== nextProps;) nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
          nextProps = nextChildren & ~prevState;
        } else nextProps = 0, workInProgress.child = undefined;
        return deferHiddenOffscreenComponent(current, workInProgress, prevState, renderLanes, nextProps);
      }
      if (0 !== (renderLanes & 536870912)) workInProgress.memoizedState = {
        baseLanes: 0,
        cachePool: undefined
      }, undefined !== current && pushTransition(workInProgress, undefined !== prevState ? prevState.cachePool : undefined), undefined !== prevState ? pushHiddenContext(workInProgress, prevState) : reuseHiddenContextOnStack(workInProgress), pushOffscreenSuspenseHandler(workInProgress);else return nextProps = workInProgress.lanes = 536870912, deferHiddenOffscreenComponent(current, workInProgress, undefined !== prevState ? prevState.baseLanes | renderLanes : renderLanes, renderLanes, nextProps);
    } else undefined !== prevState ? (pushTransition(workInProgress, prevState.cachePool), pushHiddenContext(workInProgress, prevState), reuseSuspenseHandlerOnStack(workInProgress), workInProgress.memoizedState = undefined) : (undefined !== current && pushTransition(workInProgress, undefined), reuseHiddenContextOnStack(workInProgress), reuseSuspenseHandlerOnStack(workInProgress));
    reconcileChildren(current, workInProgress, nextChildren, renderLanes);
    return workInProgress.child;
  }
  function bailoutOffscreenComponent(current, workInProgress) {
    undefined !== current && 22 === current.tag || undefined !== workInProgress.stateNode || (workInProgress.stateNode = {
      _visibility: OffscreenVisible,
      _pendingMarkers: undefined,
      _retryCache: undefined,
      _transitions: undefined
    });
    return workInProgress.sibling;
  }
  function deferHiddenOffscreenComponent(current, workInProgress, nextBaseLanes, renderLanes, remainingChildLanes) {
    let JSCompiler_inline_result;
    JSCompiler_inline_result = peekCacheFromPool();
    JSCompiler_inline_result = undefined === JSCompiler_inline_result ? undefined : {
      parent: isPrimaryRenderer ? CacheContext._currentValue : CacheContext._currentValue2,
      pool: JSCompiler_inline_result
    };
    workInProgress.memoizedState = {
      baseLanes: nextBaseLanes,
      cachePool: JSCompiler_inline_result
    };
    undefined !== current && pushTransition(workInProgress, undefined);
    reuseHiddenContextOnStack(workInProgress);
    pushOffscreenSuspenseHandler(workInProgress);
    undefined !== current && propagateParentContextChanges(current, workInProgress, renderLanes, !0);
    workInProgress.childLanes = remainingChildLanes;
    return undefined;
  }
  function mountActivityChildren(workInProgress, nextProps) {
    let hiddenProp;
    hiddenProp = nextProps.hidden;
    void 0 !== hiddenProp && console.error('<Activity> doesn\'t accept a hidden prop. Use mode="hidden" instead.\n- <Activity %s>\n+ <Activity %s>', !0 === hiddenProp ? "hidden" : !1 === hiddenProp ? "hidden={false}" : "hidden={...}", hiddenProp ? 'mode="hidden"' : 'mode="visible"');
    nextProps = mountWorkInProgressOffscreenFiber({
      mode: nextProps.mode,
      children: nextProps.children
    }, workInProgress.mode);
    nextProps.ref = workInProgress.ref;
    workInProgress.child = nextProps;
    nextProps.return = workInProgress;
    return nextProps;
  }
  function retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes) {
    reconcileChildFibers(workInProgress, current.child, undefined, renderLanes);
    current = mountActivityChildren(workInProgress, workInProgress.pendingProps);
    current.flags |= 2;
    popSuspenseHandler(workInProgress);
    workInProgress.memoizedState = undefined;
    return current;
  }
  function updateActivityComponent(current, workInProgress, renderLanes) {
    let nextProps, didSuspend, prevState, activityInstance;
    nextProps = workInProgress.pendingProps;
    didSuspend = 0 !== (workInProgress.flags & 128);
    workInProgress.flags &= -129;
    if (undefined === current) {
      if (isHydrating) {
        if ("hidden" === nextProps.mode) return current = mountActivityChildren(workInProgress, nextProps), workInProgress.lanes = 536870912, bailoutOffscreenComponent(undefined, current);
        pushDehydratedActivitySuspenseHandler(workInProgress);
        (current = nextHydratableInstance) ? (renderLanes = canHydrateActivityInstance(current, rootOrSingletonContext), undefined !== renderLanes && (nextProps = {
          dehydrated: renderLanes,
          treeContext: getSuspendedTreeContext(),
          retryLane: 536870912,
          hydrationErrors: undefined
        }, workInProgress.memoizedState = nextProps, nextProps = createFiberFromDehydratedFragment(renderLanes), nextProps.return = workInProgress, workInProgress.child = nextProps, hydrationParentFiber = workInProgress, nextHydratableInstance = undefined)) : renderLanes = undefined;
        if (undefined === renderLanes) throw warnNonHydratedInstance(workInProgress, current), throwOnHydrationMismatch(workInProgress);
        workInProgress.lanes = 536870912;
        return undefined;
      }
      return mountActivityChildren(workInProgress, nextProps);
    }
    prevState = current.memoizedState;
    if (undefined !== prevState) {
      activityInstance = prevState.dehydrated;
      pushDehydratedActivitySuspenseHandler(workInProgress);
      if (didSuspend) {
        if (workInProgress.flags & 256) workInProgress.flags &= -257, workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);else if (undefined !== workInProgress.memoizedState) workInProgress.child = current.child, workInProgress.flags |= 128, workInProgress = undefined;else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
      } else if (warnIfHydrating(), 0 !== (renderLanes & 536870912) && markRenderDerivedCause(workInProgress), didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, !1), didSuspend = 0 !== (renderLanes & current.childLanes), didReceiveUpdate || didSuspend) {
        nextProps = workInProgressRoot;
        if (undefined !== nextProps && (activityInstance = getBumpedLaneForHydration(nextProps, renderLanes), 0 !== activityInstance && activityInstance !== prevState.retryLane)) throw prevState.retryLane = activityInstance, enqueueConcurrentRenderForLane(current, activityInstance), scheduleUpdateOnFiber(nextProps, current, activityInstance), SelectiveHydrationException;
        renderDidSuspendDelayIfPossible();
        workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);
      } else current = prevState.treeContext, supportsHydration && (nextHydratableInstance = getFirstHydratableChildWithinActivityInstance(activityInstance), hydrationParentFiber = workInProgress, isHydrating = !0, hydrationErrors = undefined, didSuspendOrErrorDEV = !1, hydrationDiffRootDEV = undefined, rootOrSingletonContext = !1, undefined !== current && restoreSuspendedTreeContext(workInProgress, current)), workInProgress = mountActivityChildren(workInProgress, nextProps), workInProgress.flags |= 4096;
      return workInProgress;
    }
    prevState = current.child;
    nextProps = {
      mode: nextProps.mode,
      children: nextProps.children
    };
    0 !== (renderLanes & 536870912) && 0 !== (renderLanes & current.lanes) && markRenderDerivedCause(workInProgress);
    current = createWorkInProgress(prevState, nextProps);
    current.ref = workInProgress.ref;
    workInProgress.child = current;
    current.return = workInProgress;
    return current;
  }
  function markRef(current, workInProgress) {
    let ref;
    ref = workInProgress.ref;
    if (undefined === ref) undefined !== current && undefined !== current.ref && (workInProgress.flags |= 4194816);else {
      if ("function" !== typeOfJS(ref) && "object" !== typeOfJS(ref)) throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
      if (undefined === current || current.ref !== ref) workInProgress.flags |= 4194816;
    }
  }
  function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {
    let componentName;
    if (__protoOf(Component) && "function" === typeOfJS(__protoOf(Component).render)) {
      componentName = getComponentNameFromType(Component) || "Unknown";
      didWarnAboutBadClass[componentName] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName), didWarnAboutBadClass[componentName] = !0);
    }
    workInProgress.mode & 8 && ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, undefined);
    undefined === current && (validateFunctionComponentInDev(workInProgress, workInProgress.type), Component.contextTypes && (componentName = getComponentNameFromType(Component) || "Unknown", didWarnAboutContextTypes[componentName] || (didWarnAboutContextTypes[componentName] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", componentName))));
    prepareToReadContext(workInProgress);
    Component = renderWithHooks(current, workInProgress, Component, nextProps, void 0, renderLanes);
    nextProps = checkDidRenderIdHook();
    if (undefined !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    isHydrating && nextProps && pushMaterializedTreeId(workInProgress);
    workInProgress.flags |= 1;
    reconcileChildren(current, workInProgress, Component, renderLanes);
    return workInProgress.child;
  }
  function replayFunctionComponent(current, workInProgress, nextProps, Component, secondArg, renderLanes) {
    prepareToReadContext(workInProgress);
    hookTypesUpdateIndexDev = -1;
    ignorePreviousDependencies = undefined !== current && current.type !== workInProgress.type;
    workInProgress.updateQueue = undefined;
    nextProps = renderWithHooksAgain(workInProgress, Component, nextProps, secondArg);
    finishRenderingHooks(current, workInProgress);
    Component = checkDidRenderIdHook();
    if (undefined !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    isHydrating && Component && pushMaterializedTreeId(workInProgress);
    workInProgress.flags |= 1;
    reconcileChildren(current, workInProgress, nextProps, renderLanes);
    return workInProgress.child;
  }
  function updateClassComponent(current, workInProgress, Component, nextProps, renderLanes) {
    let _instance, state, lane, foundWillUpdateName, newApiName, unresolvedOldProps, oldContext, oldState, newState;
    switch (shouldErrorImpl(workInProgress)) {
      case !1:
        _instance = workInProgress.stateNode;
        state = __new(workInProgress.type, workInProgress.memoizedProps, _instance.context).state;
        _instance.updater.enqueueSetState(_instance, state, undefined);
        break;
      case !0:
        workInProgress.flags |= 128;
        workInProgress.flags |= 65536;
        _instance = Error("Simulated error coming from DevTools");
        lane = renderLanes & -renderLanes;
        workInProgress.lanes |= lane;
        state = workInProgressRoot;
        if (undefined === state) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        lane = createClassErrorUpdate(lane);
        initializeClassErrorUpdate(lane, state, workInProgress, createCapturedValueAtFiber(_instance, workInProgress));
        enqueueCapturedUpdate(workInProgress, lane);
    }
    prepareToReadContext(workInProgress);
    if (undefined === workInProgress.stateNode) {
      state = emptyContextObject;
      _instance = Component.contextType;
      __in("contextType", Component) && undefined !== _instance && (void 0 === _instance || _instance.$$typeof !== REACT_CONTEXT_TYPE) && !didWarnAboutInvalidateContextType.has(Component) && (didWarnAboutInvalidateContextType.add(Component), lane = void 0 === _instance ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : "object" !== typeOfJS(_instance) ? __cat(__cat(" However, it is set to a ", typeOfJS(_instance)), ".") : _instance.$$typeof === REACT_CONSUMER_TYPE ? " Did you accidentally pass the Context.Consumer instead?" : __cat(__cat(" However, it is set to an object with keys {", __join(Object.keys(_instance), ", ")), "}."), console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(Component) || "Component", lane));
      "object" === typeOfJS(_instance) && undefined !== _instance && (state = readContext(_instance));
      _instance = __new(Component, nextProps, state);
      if (workInProgress.mode & 8) {
        setIsStrictModeForDevtools(!0);
        try {
          _instance = __new(Component, nextProps, state);
        } finally {
          setIsStrictModeForDevtools(!1);
        }
      }
      state = workInProgress.memoizedState = undefined !== _instance.state && void 0 !== _instance.state ? _instance.state : undefined;
      _instance.updater = classComponentUpdater;
      workInProgress.stateNode = _instance;
      _instance._reactInternals = workInProgress;
      _instance._reactInternalInstance = fakeInternalInstance;
      "function" === typeOfJS(Component.getDerivedStateFromProps) && undefined === state && (state = getComponentNameFromType(Component) || "Component", didWarnAboutUninitializedState.has(state) || (didWarnAboutUninitializedState.add(state), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", state, undefined === _instance.state ? "null" : "undefined", state)));
      if ("function" === typeOfJS(Component.getDerivedStateFromProps) || "function" === typeOfJS(_instance.getSnapshotBeforeUpdate)) {
        foundWillUpdateName = lane = state = undefined;
        "function" === typeOfJS(_instance.componentWillMount) && !0 !== _instance.componentWillMount.__suppressDeprecationWarning ? state = "componentWillMount" : "function" === typeOfJS(_instance.UNSAFE_componentWillMount) && (state = "UNSAFE_componentWillMount");
        "function" === typeOfJS(_instance.componentWillReceiveProps) && !0 !== _instance.componentWillReceiveProps.__suppressDeprecationWarning ? lane = "componentWillReceiveProps" : "function" === typeOfJS(_instance.UNSAFE_componentWillReceiveProps) && (lane = "UNSAFE_componentWillReceiveProps");
        "function" === typeOfJS(_instance.componentWillUpdate) && !0 !== _instance.componentWillUpdate.__suppressDeprecationWarning ? foundWillUpdateName = "componentWillUpdate" : "function" === typeOfJS(_instance.UNSAFE_componentWillUpdate) && (foundWillUpdateName = "UNSAFE_componentWillUpdate");
        if (undefined !== state || undefined !== lane || undefined !== foundWillUpdateName) {
          _instance = getComponentNameFromType(Component) || "Component";
          newApiName = "function" === typeOfJS(Component.getDerivedStateFromProps) ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          didWarnAboutLegacyLifecyclesAndDerivedState.has(_instance) || (didWarnAboutLegacyLifecyclesAndDerivedState.add(_instance), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", _instance, newApiName, undefined !== state ? __cat("\n  ", state) : "", undefined !== lane ? __cat("\n  ", lane) : "", undefined !== foundWillUpdateName ? __cat("\n  ", foundWillUpdateName) : ""));
        }
      }
      _instance = workInProgress.stateNode;
      state = getComponentNameFromType(Component) || "Component";
      _instance.render || (__protoOf(Component) && "function" === typeOfJS(__protoOf(Component).render) ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", state) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", state));
      !_instance.getInitialState || _instance.getInitialState.isReactClassApproved || _instance.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", state);
      _instance.getDefaultProps && !_instance.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", state);
      _instance.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", state);
      Component.childContextTypes && !didWarnAboutChildContextTypes.has(Component) && (didWarnAboutChildContextTypes.add(Component), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", state));
      Component.contextTypes && !didWarnAboutContextTypes_1.has(Component) && (didWarnAboutContextTypes_1.add(Component), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", state));
      "function" === typeOfJS(_instance.componentShouldUpdate) && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", state);
      __protoOf(Component) && __protoOf(Component).isPureReactComponent && "undefined" !== typeOfJS(_instance.shouldComponentUpdate) && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(Component) || "A pure component");
      "function" === typeOfJS(_instance.componentDidUnmount) && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", state);
      "function" === typeOfJS(_instance.componentDidReceiveProps) && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", state);
      "function" === typeOfJS(_instance.componentWillRecieveProps) && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", state);
      "function" === typeOfJS(_instance.UNSAFE_componentWillRecieveProps) && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", state);
      lane = _instance.props !== nextProps;
      void 0 !== _instance.props && lane && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", state);
      _instance.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", state, state);
      "function" !== typeOfJS(_instance.getSnapshotBeforeUpdate) || "function" === typeOfJS(_instance.componentDidUpdate) || didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(Component) || (didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(Component), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(Component)));
      "function" === typeOfJS(_instance.getDerivedStateFromProps) && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", state);
      "function" === typeOfJS(_instance.getDerivedStateFromError) && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", state);
      "function" === typeOfJS(Component.getSnapshotBeforeUpdate) && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", state);
      (lane = _instance.state) && ("object" !== typeOfJS(lane) || isArrayImpl(lane)) && console.error("%s.state: must be set to an object or null", state);
      "function" === typeOfJS(_instance.getChildContext) && "object" !== typeOfJS(Component.childContextTypes) && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", state);
      _instance = workInProgress.stateNode;
      _instance.props = nextProps;
      _instance.state = workInProgress.memoizedState;
      _instance.refs = {};
      initializeUpdateQueue(workInProgress);
      state = Component.contextType;
      _instance.context = "object" === typeOfJS(state) && undefined !== state ? readContext(state) : emptyContextObject;
      _instance.state === nextProps && (state = getComponentNameFromType(Component) || "Component", didWarnAboutDirectlyAssigningPropsToState.has(state) || (didWarnAboutDirectlyAssigningPropsToState.add(state), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", state)));
      workInProgress.mode & 8 && ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, _instance);
      ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress, _instance);
      _instance.state = workInProgress.memoizedState;
      state = Component.getDerivedStateFromProps;
      "function" === typeOfJS(state) && (applyDerivedStateFromProps(workInProgress, Component, state, nextProps), _instance.state = workInProgress.memoizedState);
      "function" === typeOfJS(Component.getDerivedStateFromProps) || "function" === typeOfJS(_instance.getSnapshotBeforeUpdate) || "function" !== typeOfJS(_instance.UNSAFE_componentWillMount) && "function" !== typeOfJS(_instance.componentWillMount) || (state = _instance.state, "function" === typeOfJS(_instance.componentWillMount) && _instance.componentWillMount(), "function" === typeOfJS(_instance.UNSAFE_componentWillMount) && _instance.UNSAFE_componentWillMount(), state !== _instance.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromFiber(workInProgress) || "Component"), classComponentUpdater.enqueueReplaceState(_instance, _instance.state, undefined)), processUpdateQueue(workInProgress, nextProps, _instance, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction(), _instance.state = workInProgress.memoizedState);
      "function" === typeOfJS(_instance.componentDidMount) && (workInProgress.flags |= 4194308);
      (workInProgress.mode & 16) !== NoMode && (workInProgress.flags |= 134217728);
      _instance = !0;
    } else if (undefined === current) {
      _instance = workInProgress.stateNode;
      unresolvedOldProps = workInProgress.memoizedProps;
      lane = resolveClassComponentProps(Component, unresolvedOldProps);
      _instance.props = lane;
      oldContext = _instance.context;
      foundWillUpdateName = Component.contextType;
      state = emptyContextObject;
      "object" === typeOfJS(foundWillUpdateName) && undefined !== foundWillUpdateName && (state = readContext(foundWillUpdateName));
      newApiName = Component.getDerivedStateFromProps;
      foundWillUpdateName = "function" === typeOfJS(newApiName) || "function" === typeOfJS(_instance.getSnapshotBeforeUpdate);
      unresolvedOldProps = workInProgress.pendingProps !== unresolvedOldProps;
      foundWillUpdateName || "function" !== typeOfJS(_instance.UNSAFE_componentWillReceiveProps) && "function" !== typeOfJS(_instance.componentWillReceiveProps) || (unresolvedOldProps || oldContext !== state) && callComponentWillReceiveProps(workInProgress, _instance, nextProps, state);
      hasForceUpdate = !1;
      oldState = workInProgress.memoizedState;
      _instance.state = oldState;
      processUpdateQueue(workInProgress, nextProps, _instance, renderLanes);
      suspendIfUpdateReadFromEntangledAsyncAction();
      oldContext = workInProgress.memoizedState;
      unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeOfJS(newApiName) && (applyDerivedStateFromProps(workInProgress, Component, newApiName, nextProps), oldContext = workInProgress.memoizedState), (lane = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, lane, nextProps, oldState, oldContext, state)) ? (foundWillUpdateName || "function" !== typeOfJS(_instance.UNSAFE_componentWillMount) && "function" !== typeOfJS(_instance.componentWillMount) || ("function" === typeOfJS(_instance.componentWillMount) && _instance.componentWillMount(), "function" === typeOfJS(_instance.UNSAFE_componentWillMount) && _instance.UNSAFE_componentWillMount()), "function" === typeOfJS(_instance.componentDidMount) && (workInProgress.flags |= 4194308), (workInProgress.mode & 16) !== NoMode && (workInProgress.flags |= 134217728)) : ("function" === typeOfJS(_instance.componentDidMount) && (workInProgress.flags |= 4194308), (workInProgress.mode & 16) !== NoMode && (workInProgress.flags |= 134217728), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), _instance.props = nextProps, _instance.state = oldContext, _instance.context = state, _instance = lane) : ("function" === typeOfJS(_instance.componentDidMount) && (workInProgress.flags |= 4194308), (workInProgress.mode & 16) !== NoMode && (workInProgress.flags |= 134217728), _instance = !1);
    } else {
      _instance = workInProgress.stateNode;
      cloneUpdateQueue(current, workInProgress);
      state = workInProgress.memoizedProps;
      foundWillUpdateName = resolveClassComponentProps(Component, state);
      _instance.props = foundWillUpdateName;
      newApiName = workInProgress.pendingProps;
      oldState = _instance.context;
      oldContext = Component.contextType;
      lane = emptyContextObject;
      "object" === typeOfJS(oldContext) && undefined !== oldContext && (lane = readContext(oldContext));
      unresolvedOldProps = Component.getDerivedStateFromProps;
      (oldContext = "function" === typeOfJS(unresolvedOldProps) || "function" === typeOfJS(_instance.getSnapshotBeforeUpdate)) || "function" !== typeOfJS(_instance.UNSAFE_componentWillReceiveProps) && "function" !== typeOfJS(_instance.componentWillReceiveProps) || (state !== newApiName || oldState !== lane) && callComponentWillReceiveProps(workInProgress, _instance, nextProps, lane);
      hasForceUpdate = !1;
      oldState = workInProgress.memoizedState;
      _instance.state = oldState;
      processUpdateQueue(workInProgress, nextProps, _instance, renderLanes);
      suspendIfUpdateReadFromEntangledAsyncAction();
      newState = workInProgress.memoizedState;
      state !== newApiName || oldState !== newState || hasForceUpdate || undefined !== current && undefined !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeOfJS(unresolvedOldProps) && (applyDerivedStateFromProps(workInProgress, Component, unresolvedOldProps, nextProps), newState = workInProgress.memoizedState), (foundWillUpdateName = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, foundWillUpdateName, nextProps, oldState, newState, lane) || undefined !== current && undefined !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeOfJS(_instance.UNSAFE_componentWillUpdate) && "function" !== typeOfJS(_instance.componentWillUpdate) || ("function" === typeOfJS(_instance.componentWillUpdate) && _instance.componentWillUpdate(nextProps, newState, lane), "function" === typeOfJS(_instance.UNSAFE_componentWillUpdate) && _instance.UNSAFE_componentWillUpdate(nextProps, newState, lane)), "function" === typeOfJS(_instance.componentDidUpdate) && (workInProgress.flags |= 4), "function" === typeOfJS(_instance.getSnapshotBeforeUpdate) && (workInProgress.flags |= 1024)) : ("function" !== typeOfJS(_instance.componentDidUpdate) || state === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeOfJS(_instance.getSnapshotBeforeUpdate) || state === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = newState), _instance.props = nextProps, _instance.state = newState, _instance.context = lane, _instance = foundWillUpdateName) : ("function" !== typeOfJS(_instance.componentDidUpdate) || state === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeOfJS(_instance.getSnapshotBeforeUpdate) || state === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), _instance = !1);
    }
    lane = _instance;
    markRef(current, workInProgress);
    state = 0 !== (workInProgress.flags & 128);
    if (lane || state) {
      lane = workInProgress.stateNode;
      setCurrentFiber(workInProgress);
      if (state && "function" !== typeOfJS(Component.getDerivedStateFromError)) Component = undefined, profilerStartTime = -1;else if (Component = callRenderInDEV(lane), workInProgress.mode & 8) {
        setIsStrictModeForDevtools(!0);
        try {
          callRenderInDEV(lane);
        } finally {
          setIsStrictModeForDevtools(!1);
        }
      }
      workInProgress.flags |= 1;
      undefined !== current && state ? (workInProgress.child = reconcileChildFibers(workInProgress, current.child, undefined, renderLanes), workInProgress.child = reconcileChildFibers(workInProgress, undefined, Component, renderLanes)) : reconcileChildren(current, workInProgress, Component, renderLanes);
      workInProgress.memoizedState = lane.state;
      current = workInProgress.child;
    } else current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    renderLanes = workInProgress.stateNode;
    _instance && renderLanes.props !== nextProps && (didWarnAboutReassigningProps || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromFiber(workInProgress) || "a component"), didWarnAboutReassigningProps = !0);
    return current;
  }
  function mountHostRootWithoutHydrating(current, workInProgress, nextChildren, renderLanes) {
    resetHydrationState();
    workInProgress.flags |= 256;
    reconcileChildren(current, workInProgress, nextChildren, renderLanes);
    return workInProgress.child;
  }
  function validateFunctionComponentInDev(workInProgress, Component) {
    Component && Component.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", Component.displayName || Component.name || "Component");
    "function" === typeOfJS(Component.getDerivedStateFromProps) && (workInProgress = getComponentNameFromType(Component) || "Unknown", didWarnAboutGetDerivedStateOnFunctionComponent[workInProgress] || (console.error("%s: Function components do not support getDerivedStateFromProps.", workInProgress), didWarnAboutGetDerivedStateOnFunctionComponent[workInProgress] = !0));
    "object" === typeOfJS(Component.contextType) && undefined !== Component.contextType && (Component = getComponentNameFromType(Component) || "Unknown", didWarnAboutContextTypeOnFunctionComponent[Component] || (console.error("%s: Function components do not support contextType.", Component), didWarnAboutContextTypeOnFunctionComponent[Component] = !0));
  }
  function mountSuspenseOffscreenState(renderLanes) {
    return {
      baseLanes: renderLanes,
      cachePool: getSuspendedCache()
    };
  }
  function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes) {
    current = undefined !== current ? current.childLanes & ~renderLanes : 0;
    primaryTreeDidDefer && (current |= workInProgressDeferredLane);
    return current;
  }
  function updateSuspenseComponent(current, workInProgress, renderLanes) {
    let nextProps, showFallback, didSuspend, JSCompiler_temp, nextPrimaryChildren, prevState;
    nextProps = workInProgress.pendingProps;
    shouldSuspendImpl(workInProgress) && (workInProgress.flags |= 128);
    showFallback = !1;
    didSuspend = 0 !== (workInProgress.flags & 128);
    (JSCompiler_temp = didSuspend) || (JSCompiler_temp = undefined !== current && undefined === current.memoizedState ? !1 : 0 !== (suspenseStackCursor.current & ForceSuspenseFallback));
    JSCompiler_temp && (showFallback = !0, workInProgress.flags &= -129);
    JSCompiler_temp = 0 !== (workInProgress.flags & 32);
    workInProgress.flags &= -33;
    if (undefined === current) {
      if (isHydrating) {
        showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress) : reuseSuspenseHandlerOnStack(workInProgress);
        (current = nextHydratableInstance) ? (renderLanes = canHydrateSuspenseInstance(current, rootOrSingletonContext), undefined !== renderLanes && (JSCompiler_temp = {
          dehydrated: renderLanes,
          treeContext: getSuspendedTreeContext(),
          retryLane: 536870912,
          hydrationErrors: undefined
        }, workInProgress.memoizedState = JSCompiler_temp, JSCompiler_temp = createFiberFromDehydratedFragment(renderLanes), JSCompiler_temp.return = workInProgress, workInProgress.child = JSCompiler_temp, hydrationParentFiber = workInProgress, nextHydratableInstance = undefined)) : renderLanes = undefined;
        if (undefined === renderLanes) throw warnNonHydratedInstance(workInProgress, current), throwOnHydrationMismatch(workInProgress);
        isSuspenseInstanceFallback(renderLanes) ? workInProgress.lanes = 32 : workInProgress.lanes = 536870912;
        return undefined;
      }
      nextPrimaryChildren = nextProps.children;
      nextProps = nextProps.fallback;
      if (showFallback) return reuseSuspenseHandlerOnStack(workInProgress), showFallback = workInProgress.mode, nextPrimaryChildren = mountWorkInProgressOffscreenFiber({
        mode: "hidden",
        children: nextPrimaryChildren
      }, showFallback), nextProps = createFiberFromFragment(nextProps, showFallback, renderLanes, undefined), nextPrimaryChildren.return = workInProgress, nextProps.return = workInProgress, nextPrimaryChildren.sibling = nextProps, workInProgress.child = nextPrimaryChildren, nextProps = workInProgress.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes), nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(undefined, nextProps);
      pushPrimaryTreeSuspenseHandler(workInProgress);
      return mountSuspensePrimaryChildren(workInProgress, nextPrimaryChildren);
    }
    prevState = current.memoizedState;
    if (undefined !== prevState && (nextPrimaryChildren = prevState.dehydrated, undefined !== nextPrimaryChildren)) {
      if (didSuspend) workInProgress.flags & 256 ? (pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags &= -257, workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes)) : undefined !== workInProgress.memoizedState ? (reuseSuspenseHandlerOnStack(workInProgress), workInProgress.child = current.child, workInProgress.flags |= 128, workInProgress = undefined) : (reuseSuspenseHandlerOnStack(workInProgress), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress.mode, nextProps = mountWorkInProgressOffscreenFiber({
        mode: "visible",
        children: nextProps.children
      }, showFallback), nextPrimaryChildren = createFiberFromFragment(nextPrimaryChildren, showFallback, renderLanes, undefined), nextPrimaryChildren.flags |= 2, nextProps.return = workInProgress, nextPrimaryChildren.return = workInProgress, nextProps.sibling = nextPrimaryChildren, workInProgress.child = nextProps, reconcileChildFibers(workInProgress, current.child, undefined, renderLanes), nextProps = workInProgress.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes), nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, workInProgress = bailoutOffscreenComponent(undefined, nextProps));else if (pushPrimaryTreeSuspenseHandler(workInProgress), warnIfHydrating(), 0 !== (renderLanes & 536870912) && markRenderDerivedCause(workInProgress), isSuspenseInstanceFallback(nextPrimaryChildren)) showFallback = getSuspenseInstanceFallbackErrorDetails(nextPrimaryChildren), JSCompiler_temp = showFallback.digest, nextPrimaryChildren = showFallback.message, nextProps = showFallback.stack, showFallback = showFallback.componentStack, nextPrimaryChildren = nextPrimaryChildren ? Error(nextPrimaryChildren) : Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), nextPrimaryChildren.stack = nextProps || "", nextPrimaryChildren.digest = JSCompiler_temp, JSCompiler_temp = void 0 === showFallback ? undefined : showFallback, nextProps = {
        value: nextPrimaryChildren,
        source: undefined,
        stack: JSCompiler_temp
      }, "string" === typeOfJS(JSCompiler_temp) && CapturedStacks.set(nextPrimaryChildren, nextProps), queueHydrationError(nextProps), workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, !1), JSCompiler_temp = 0 !== (renderLanes & current.childLanes), didReceiveUpdate || JSCompiler_temp) {
        JSCompiler_temp = workInProgressRoot;
        if (undefined !== JSCompiler_temp && (nextProps = getBumpedLaneForHydration(JSCompiler_temp, renderLanes), 0 !== nextProps && nextProps !== prevState.retryLane)) throw prevState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), SelectiveHydrationException;
        isSuspenseInstancePending(nextPrimaryChildren) || renderDidSuspendDelayIfPossible();
        workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
      } else isSuspenseInstancePending(nextPrimaryChildren) ? (workInProgress.flags |= 192, workInProgress.child = current.child, workInProgress = undefined) : (current = prevState.treeContext, supportsHydration && (nextHydratableInstance = getFirstHydratableChildWithinSuspenseInstance(nextPrimaryChildren), hydrationParentFiber = workInProgress, isHydrating = !0, hydrationErrors = undefined, didSuspendOrErrorDEV = !1, hydrationDiffRootDEV = undefined, rootOrSingletonContext = !1, undefined !== current && restoreSuspendedTreeContext(workInProgress, current)), workInProgress = mountSuspensePrimaryChildren(workInProgress, nextProps.children), workInProgress.flags |= 4096);
      return workInProgress;
    }
    if (showFallback) return reuseSuspenseHandlerOnStack(workInProgress), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress.mode, prevState = current.child, didSuspend = prevState.sibling, nextProps = createWorkInProgress(prevState, {
      mode: "hidden",
      children: nextProps.children
    }), nextProps.subtreeFlags = prevState.subtreeFlags & 65011712, undefined !== didSuspend ? nextPrimaryChildren = createWorkInProgress(didSuspend, nextPrimaryChildren) : (nextPrimaryChildren = createFiberFromFragment(nextPrimaryChildren, showFallback, renderLanes, undefined), nextPrimaryChildren.flags |= 2), nextPrimaryChildren.return = workInProgress, nextProps.return = workInProgress, nextProps.sibling = nextPrimaryChildren, workInProgress.child = nextProps, bailoutOffscreenComponent(undefined, nextProps), nextProps = workInProgress.child, nextPrimaryChildren = current.child.memoizedState, undefined === nextPrimaryChildren ? nextPrimaryChildren = mountSuspenseOffscreenState(renderLanes) : (showFallback = nextPrimaryChildren.cachePool, undefined !== showFallback ? (prevState = isPrimaryRenderer ? CacheContext._currentValue : CacheContext._currentValue2, showFallback = showFallback.parent !== prevState ? {
      parent: prevState,
      pool: prevState
    } : showFallback) : showFallback = getSuspendedCache(), nextPrimaryChildren = {
      baseLanes: nextPrimaryChildren.baseLanes | renderLanes,
      cachePool: showFallback
    }), nextProps.memoizedState = nextPrimaryChildren, nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
    undefined !== prevState && (renderLanes & 62914560) === renderLanes && 0 !== (renderLanes & current.lanes) && markRenderDerivedCause(workInProgress);
    pushPrimaryTreeSuspenseHandler(workInProgress);
    renderLanes = current.child;
    current = renderLanes.sibling;
    renderLanes = createWorkInProgress(renderLanes, {
      mode: "visible",
      children: nextProps.children
    });
    renderLanes.return = workInProgress;
    renderLanes.sibling = undefined;
    undefined !== current && (JSCompiler_temp = workInProgress.deletions, undefined === JSCompiler_temp ? (workInProgress.deletions = __arrNew(current), workInProgress.flags |= 16) : __push(JSCompiler_temp, current));
    workInProgress.child = renderLanes;
    workInProgress.memoizedState = undefined;
    return renderLanes;
  }
  function mountSuspensePrimaryChildren(workInProgress, primaryChildren) {
    primaryChildren = mountWorkInProgressOffscreenFiber({
      mode: "visible",
      children: primaryChildren
    }, workInProgress.mode);
    primaryChildren.return = workInProgress;
    return workInProgress.child = primaryChildren;
  }
  function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
    offscreenProps = createFiber(22, offscreenProps, undefined, mode);
    offscreenProps.lanes = 0;
    return offscreenProps;
  }
  function retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes) {
    reconcileChildFibers(workInProgress, current.child, undefined, renderLanes);
    current = mountSuspensePrimaryChildren(workInProgress, workInProgress.pendingProps.children);
    current.flags |= 2;
    workInProgress.memoizedState = undefined;
    return current;
  }
  function scheduleSuspenseWorkOnFiber(fiber, renderLanes, propagationRoot) {
    let alternate;
    fiber.lanes |= renderLanes;
    alternate = fiber.alternate;
    undefined !== alternate && (alternate.lanes |= renderLanes);
    scheduleContextWorkOnParentPath(fiber.return, renderLanes, propagationRoot);
  }
  function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode, treeForkCount) {
    let renderState;
    renderState = workInProgress.memoizedState;
    undefined === renderState ? workInProgress.memoizedState = {
      isBackwards: isBackwards,
      rendering: undefined,
      renderingStartTime: 0,
      last: lastContentRow,
      tail: tail,
      tailMode: tailMode,
      treeForkCount: treeForkCount
    } : (renderState.isBackwards = isBackwards, renderState.rendering = undefined, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount);
  }
  function updateSuspenseListComponent(current, workInProgress, renderLanes) {
    let nextProps, revealOrder, tailMode, newChildren, suspenseContext, step, _i;
    nextProps = workInProgress.pendingProps;
    revealOrder = nextProps.revealOrder;
    tailMode = nextProps.tail;
    newChildren = nextProps.children;
    suspenseContext = suspenseStackCursor.current;
    (nextProps = 0 !== (suspenseContext & ForceSuspenseFallback)) ? (suspenseContext = suspenseContext & SubtreeSuspenseContextMask | ForceSuspenseFallback, workInProgress.flags |= 128) : suspenseContext &= SubtreeSuspenseContextMask;
    push(suspenseStackCursor, suspenseContext, workInProgress);
    suspenseContext = revealOrder === undefined ? "null" : revealOrder;
    if ("forwards" !== revealOrder && "unstable_legacy-backwards" !== revealOrder && "together" !== revealOrder && "independent" !== revealOrder && !didWarnAboutRevealOrder[suspenseContext]) if (didWarnAboutRevealOrder[suspenseContext] = !0, revealOrder === undefined) console.error('The default for the <SuspenseList revealOrder="..."> prop is changing. To be future compatible you must explictly specify either "independent" (the current default), "together", "forwards" or "legacy_unstable-backwards".');else if ("backwards" === revealOrder) console.error('The rendering order of <SuspenseList revealOrder="backwards"> is changing. To be future compatible you must specify revealOrder="legacy_unstable-backwards" instead.');else if ("string" === typeOfJS(revealOrder)) switch (__toLowerCase(revealOrder)) {
      case "together":
      case "forwards":
      case "backwards":
      case "independent":
        console.error('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', revealOrder, __toLowerCase(revealOrder));
        break;
      case "forward":
      case "backward":
        console.error('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', revealOrder, __toLowerCase(revealOrder));
        break;
      default:
        console.error('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "independent", "together", "forwards" or "backwards"?', revealOrder);
    } else console.error('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "independent", "together", "forwards" or "backwards"?', revealOrder);
    suspenseContext = tailMode === undefined ? "null" : tailMode;
    if (!didWarnAboutTailOptions[suspenseContext]) if (tailMode === undefined) {
      if ("forwards" === revealOrder || "backwards" === revealOrder || "unstable_legacy-backwards" === revealOrder) didWarnAboutTailOptions[suspenseContext] = !0, console.error('The default for the <SuspenseList tail="..."> prop is changing. To be future compatible you must explictly specify either "visible" (the current default), "collapsed" or "hidden".');
    } else "visible" !== tailMode && "collapsed" !== tailMode && "hidden" !== tailMode ? (didWarnAboutTailOptions[suspenseContext] = !0, console.error('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "visible", "collapsed" or "hidden"?', tailMode)) : "forwards" !== revealOrder && "backwards" !== revealOrder && "unstable_legacy-backwards" !== revealOrder && (didWarnAboutTailOptions[suspenseContext] = !0, console.error('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', tailMode));
    {
      let __lb_14 = false,
        __lc_14 = false;
      while (!__lb_14) {
        if (("forwards" === revealOrder || "backwards" === revealOrder || "unstable_legacy-backwards" === revealOrder) && void 0 !== newChildren && undefined !== newChildren && !1 !== newChildren) if (isArrayImpl(newChildren)) for (suspenseContext = 0; suspenseContext < __len(newChildren); suspenseContext++) {
          if (!validateSuspenseListNestedChild(newChildren[suspenseContext], suspenseContext)) {
            __lb_14 = true;
            break;
          }
        } else if (suspenseContext = getIteratorFn(newChildren), "function" === typeOfJS(suspenseContext)) {
          if (suspenseContext = __callFn(suspenseContext, newChildren)) for (step = suspenseContext.next(), _i = 0; !step.done; step = suspenseContext.next()) {
            if (!validateSuspenseListNestedChild(step.value, _i)) {
              __lb_14 = true;
              break;
            }
            _i++;
          }
          if (__lb_14 || __lc_14) {
            break;
          }
        } else console.error('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', revealOrder);
        break;
      }
    }
    reconcileChildren(current, workInProgress, newChildren, renderLanes);
    isHydrating ? (warnIfNotHydrating(), newChildren = treeForkCount) : newChildren = 0;
    if (!nextProps && undefined !== current && 0 !== (current.flags & 128)) {
      current = workInProgress.child;
      let __lb_13 = false,
        __lc_13 = false;
      while (!__lb_13) {
        __lc_13 = false;
        while (undefined !== current) {
          {
            if (13 === current.tag) undefined !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);else if (19 === current.tag) scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);else if (undefined !== current.child) {
              current.child.return = current;
              current = current.child;
              continue;
            }
            if (current === workInProgress) {
              __lb_13 = true;
              break;
            }
            for (; undefined === current.sibling;) {
              if (undefined === current.return || current.return === workInProgress) {
                __lb_13 = true;
                break;
              }
              current = current.return;
            }
            if (__lb_13 || __lc_13) {
              break;
            }
            current.sibling.return = current.return;
            current = current.sibling;
          }
          ;
        }
        if (__lc_13) {
          __lc_13 = false;
          ;
          continue;
        }
        break;
      }
    }
    switch (revealOrder) {
      case "forwards":
        renderLanes = workInProgress.child;
        for (revealOrder = undefined; undefined !== renderLanes;) current = renderLanes.alternate, undefined !== current && undefined === findFirstSuspended(current) && (revealOrder = renderLanes), renderLanes = renderLanes.sibling;
        renderLanes = revealOrder;
        undefined === renderLanes ? (revealOrder = workInProgress.child, workInProgress.child = undefined) : (revealOrder = renderLanes.sibling, renderLanes.sibling = undefined);
        initSuspenseListRenderState(workInProgress, !1, revealOrder, renderLanes, tailMode, newChildren);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        renderLanes = undefined;
        revealOrder = workInProgress.child;
        for (workInProgress.child = undefined; undefined !== revealOrder;) {
          current = revealOrder.alternate;
          if (undefined !== current && undefined === findFirstSuspended(current)) {
            workInProgress.child = revealOrder;
            break;
          }
          current = revealOrder.sibling;
          revealOrder.sibling = renderLanes;
          renderLanes = revealOrder;
          revealOrder = current;
        }
        initSuspenseListRenderState(workInProgress, !0, renderLanes, undefined, tailMode, newChildren);
        break;
      case "together":
        initSuspenseListRenderState(workInProgress, !1, undefined, undefined, void 0, newChildren);
        break;
      default:
        workInProgress.memoizedState = undefined;
    }
    return workInProgress.child;
  }
  function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
    undefined !== current && (workInProgress.dependencies = current.dependencies);
    profilerStartTime = -1;
    workInProgressRootSkippedLanes |= workInProgress.lanes;
    if (0 === (renderLanes & workInProgress.childLanes)) if (undefined !== current) {
      if (propagateParentContextChanges(current, workInProgress, renderLanes, !1), 0 === (renderLanes & workInProgress.childLanes)) return undefined;
    } else return undefined;
    if (undefined !== current && workInProgress.child !== current.child) {
      workInProgress.child = current.child;
      workInProgress.subtreeFlags = 0;
      workInProgress.deletions = undefined;
    }
    if (undefined !== workInProgress.child) {
      current = workInProgress.child;
      renderLanes = createWorkInProgress(current, current.pendingProps);
      workInProgress.child = renderLanes;
      for (renderLanes.return = workInProgress; undefined !== current.sibling;) current = current.sibling, renderLanes = renderLanes.sibling = createWorkInProgress(current, current.pendingProps), renderLanes.return = workInProgress;
      renderLanes.sibling = undefined;
    }
    return workInProgress.child;
  }
  function checkScheduledUpdateOrContext(current, renderLanes) {
    if (0 !== (current.lanes & renderLanes)) return !0;
    current = current.dependencies;
    return undefined !== current && checkIfContextChanged(current) ? !0 : !1;
  }
  function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes) {
    let stateNode, didSuspendBefore;
    switch (workInProgress.tag) {
      case 3:
        pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
        pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
        resetHydrationState();
        break;
      case 27:
      case 5:
        pushHostContext(workInProgress);
        break;
      case 4:
        pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
        break;
      case 10:
        pushProvider(workInProgress, workInProgress.type, workInProgress.memoizedProps.value);
        break;
      case 12:
        0 !== (renderLanes & workInProgress.childLanes) && (workInProgress.flags |= 4);
        workInProgress.flags |= 2048;
        stateNode = workInProgress.stateNode;
        stateNode.effectDuration = -0;
        stateNode.passiveEffectDuration = -0;
        break;
      case 31:
        if (undefined !== workInProgress.memoizedState) return workInProgress.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress), undefined;
        break;
      case 13:
        stateNode = workInProgress.memoizedState;
        if (undefined !== stateNode) {
          if (undefined !== stateNode.dehydrated) return pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags |= 128, undefined;
          if (0 !== (renderLanes & workInProgress.child.childLanes)) return updateSuspenseComponent(current, workInProgress, renderLanes);
          pushPrimaryTreeSuspenseHandler(workInProgress);
          current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
          return undefined !== current ? current.sibling : undefined;
        }
        pushPrimaryTreeSuspenseHandler(workInProgress);
        break;
      case 19:
        didSuspendBefore = 0 !== (current.flags & 128);
        stateNode = 0 !== (renderLanes & workInProgress.childLanes);
        stateNode || (propagateParentContextChanges(current, workInProgress, renderLanes, !1), stateNode = 0 !== (renderLanes & workInProgress.childLanes));
        if (didSuspendBefore) {
          if (stateNode) return updateSuspenseListComponent(current, workInProgress, renderLanes);
          workInProgress.flags |= 128;
        }
        didSuspendBefore = workInProgress.memoizedState;
        undefined !== didSuspendBefore && (didSuspendBefore.rendering = undefined, didSuspendBefore.tail = undefined, didSuspendBefore.lastEffect = undefined);
        push(suspenseStackCursor, suspenseStackCursor.current, workInProgress);
        if (stateNode) break;else return undefined;
      case 22:
        return workInProgress.lanes = 0, updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
      case 24:
        pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
    }
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }
  function beginWork(current, workInProgress, renderLanes) {
    let returnFiber, prevSibling, nextProps, nextState;
    if (workInProgress._debugNeedsRemount && undefined !== current) {
      renderLanes = createFiberFromTypeAndProps(workInProgress.type, workInProgress.key, workInProgress.pendingProps, workInProgress._debugOwner || undefined, workInProgress.mode, workInProgress.lanes);
      renderLanes._debugStack = workInProgress._debugStack;
      renderLanes._debugTask = workInProgress._debugTask;
      returnFiber = workInProgress.return;
      if (undefined === returnFiber) throw Error("Cannot swap the root fiber.");
      current.alternate = undefined;
      workInProgress.alternate = undefined;
      renderLanes.index = workInProgress.index;
      renderLanes.sibling = workInProgress.sibling;
      renderLanes.return = workInProgress.return;
      renderLanes.ref = workInProgress.ref;
      renderLanes._debugInfo = workInProgress._debugInfo;
      if (workInProgress === returnFiber.child) returnFiber.child = renderLanes;else {
        prevSibling = returnFiber.child;
        if (undefined === prevSibling) throw Error("Expected parent to have a child.");
        for (; prevSibling.sibling !== workInProgress;) if (prevSibling = prevSibling.sibling, undefined === prevSibling) throw Error("Expected to find the previous sibling.");
        prevSibling.sibling = renderLanes;
      }
      workInProgress = returnFiber.deletions;
      undefined === workInProgress ? (returnFiber.deletions = __arrNew(current), returnFiber.flags |= 16) : __push(workInProgress, current);
      renderLanes.flags |= 2;
      return renderLanes;
    }
    if (undefined !== current) {
      if (current.memoizedProps !== workInProgress.pendingProps || workInProgress.type !== current.type) didReceiveUpdate = !0;else {
        if (!checkScheduledUpdateOrContext(current, renderLanes) && 0 === (workInProgress.flags & 128)) return didReceiveUpdate = !1, attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes);
        didReceiveUpdate = 0 !== (current.flags & 131072) ? !0 : !1;
      }
    } else {
      didReceiveUpdate = !1;
      if (returnFiber = isHydrating) warnIfNotHydrating(), returnFiber = 0 !== (workInProgress.flags & 1048576);
      returnFiber && (returnFiber = workInProgress.index, warnIfNotHydrating(), pushTreeId(workInProgress, treeForkCount, returnFiber));
    }
    workInProgress.lanes = 0;
    switch (workInProgress.tag) {
      case 16:
        {
          let __lb_12 = false,
            __lc_12 = false;
          while (!__lb_12) {
            if (returnFiber = workInProgress.pendingProps, current = resolveLazy(workInProgress.elementType), workInProgress.type = current, "function" === typeOfJS(current)) shouldConstruct(current) ? (returnFiber = resolveClassComponentProps(current, returnFiber), workInProgress.tag = 1, workInProgress.type = current = resolveFunctionForHotReloading(current), workInProgress = updateClassComponent(undefined, workInProgress, current, returnFiber, renderLanes)) : (workInProgress.tag = 0, validateFunctionComponentInDev(workInProgress, current), workInProgress.type = current = resolveFunctionForHotReloading(current), workInProgress = updateFunctionComponent(undefined, workInProgress, current, returnFiber, renderLanes));else {
              if (void 0 !== current && undefined !== current) if (prevSibling = current.$$typeof, prevSibling === REACT_FORWARD_REF_TYPE) {
                workInProgress.tag = 11;
                workInProgress.type = current = resolveForwardRefForHotReloading(current);
                workInProgress = updateForwardRef(undefined, workInProgress, current, returnFiber, renderLanes);
                {
                  __lb_12 = true;
                  break;
                }
              } else if (prevSibling === REACT_MEMO_TYPE) {
                workInProgress.tag = 14;
                workInProgress = updateMemoComponent(undefined, workInProgress, current, returnFiber, renderLanes);
                {
                  __lb_12 = true;
                  break;
                }
              }
              workInProgress = "";
              undefined !== current && "object" === typeOfJS(current) && current.$$typeof === REACT_LAZY_TYPE && (workInProgress = " Did you wrap a component in React.lazy() more than once?");
              current = getComponentNameFromType(current) || current;
              throw Error(__cat(__cat(__cat("Element type is invalid. Received a promise that resolves to: ", current), ". Lazy element type must resolve to a class or function."), workInProgress));
            }
            break;
          }
        }
        return workInProgress;
      case 0:
        return updateFunctionComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
      case 1:
        return returnFiber = workInProgress.type, prevSibling = resolveClassComponentProps(returnFiber, workInProgress.pendingProps), updateClassComponent(current, workInProgress, returnFiber, prevSibling, renderLanes);
      case 3:
        {
          let __lb_11 = false,
            __lc_11 = false;
          while (!__lb_11) {
            {
              pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
              if (undefined === current) throw Error("Should have a current fiber. This is a bug in React.");
              nextProps = workInProgress.pendingProps;
              prevSibling = workInProgress.memoizedState;
              returnFiber = prevSibling.element;
              cloneUpdateQueue(current, workInProgress);
              processUpdateQueue(workInProgress, nextProps, undefined, renderLanes);
              nextState = workInProgress.memoizedState;
              nextProps = nextState.cache;
              pushProvider(workInProgress, CacheContext, nextProps);
              nextProps !== prevSibling.cache && propagateContextChanges(workInProgress, __arrNew(CacheContext), renderLanes, !0);
              suspendIfUpdateReadFromEntangledAsyncAction();
              nextProps = nextState.element;
              if (supportsHydration && prevSibling.isDehydrated) {
                if (prevSibling = {
                  element: nextProps,
                  isDehydrated: !1,
                  cache: nextState.cache
                }, workInProgress.updateQueue.baseState = prevSibling, workInProgress.memoizedState = prevSibling, workInProgress.flags & 256) {
                  workInProgress = mountHostRootWithoutHydrating(current, workInProgress, nextProps, renderLanes);
                  {
                    __lb_11 = true;
                    break;
                  }
                } else if (nextProps !== returnFiber) {
                  returnFiber = createCapturedValueAtFiber(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), workInProgress);
                  queueHydrationError(returnFiber);
                  workInProgress = mountHostRootWithoutHydrating(current, workInProgress, nextProps, renderLanes);
                  {
                    __lb_11 = true;
                    break;
                  }
                } else for (supportsHydration && (nextHydratableInstance = getFirstHydratableChildWithinContainer(workInProgress.stateNode.containerInfo), hydrationParentFiber = workInProgress, isHydrating = !0, hydrationErrors = undefined, didSuspendOrErrorDEV = !1, hydrationDiffRootDEV = undefined, rootOrSingletonContext = !0), current = mountChildFibers(workInProgress, undefined, nextProps, renderLanes), workInProgress.child = current; current;) current.flags = current.flags & -3 | 4096, current = current.sibling;
              } else {
                resetHydrationState();
                if (nextProps === returnFiber) {
                  workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
                  {
                    __lb_11 = true;
                    break;
                  }
                }
                reconcileChildren(current, workInProgress, nextProps, renderLanes);
              }
              workInProgress = workInProgress.child;
            }
            break;
          }
        }
        return workInProgress;
      case 26:
        if (supportsResources) return markRef(current, workInProgress), undefined === current ? (current = getResource(workInProgress.type, undefined, workInProgress.pendingProps, undefined)) ? workInProgress.memoizedState = current : isHydrating || (workInProgress.stateNode = createHoistableInstance(workInProgress.type, workInProgress.pendingProps, requiredContext(rootInstanceStackCursor.current), workInProgress)) : workInProgress.memoizedState = getResource(workInProgress.type, current.memoizedProps, workInProgress.pendingProps, current.memoizedState), undefined;
      case 27:
        if (supportsSingletons) return pushHostContext(workInProgress), undefined === current && supportsSingletons && isHydrating && (prevSibling = requiredContext(rootInstanceStackCursor.current), returnFiber = getHostContext(), prevSibling = workInProgress.stateNode = resolveSingletonInstance(workInProgress.type, workInProgress.pendingProps, prevSibling, returnFiber, !1), didSuspendOrErrorDEV || (returnFiber = diffHydratedPropsForDevWarnings(prevSibling, workInProgress.type, workInProgress.pendingProps, returnFiber), undefined !== returnFiber && (buildHydrationDiffNode(workInProgress, 0).serverProps = returnFiber)), hydrationParentFiber = workInProgress, rootOrSingletonContext = !0, nextHydratableInstance = getFirstHydratableChildWithinSingleton(workInProgress.type, prevSibling, nextHydratableInstance)), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), markRef(current, workInProgress), undefined === current && (workInProgress.flags |= 4194304), workInProgress.child;
      case 5:
        return undefined === current && isHydrating && (nextProps = getHostContext(), returnFiber = validateHydratableInstance(workInProgress.type, workInProgress.pendingProps, nextProps), prevSibling = nextHydratableInstance, (nextState = !prevSibling) || (nextState = canHydrateInstance(prevSibling, workInProgress.type, workInProgress.pendingProps, rootOrSingletonContext), undefined !== nextState ? (workInProgress.stateNode = nextState, didSuspendOrErrorDEV || (nextProps = diffHydratedPropsForDevWarnings(nextState, workInProgress.type, workInProgress.pendingProps, nextProps), undefined !== nextProps && (buildHydrationDiffNode(workInProgress, 0).serverProps = nextProps)), hydrationParentFiber = workInProgress, nextHydratableInstance = getFirstHydratableChild(nextState), rootOrSingletonContext = !1, nextProps = !0) : nextProps = !1, nextState = !nextProps), nextState && (returnFiber && warnNonHydratedInstance(workInProgress, prevSibling), throwOnHydrationMismatch(workInProgress))), pushHostContext(workInProgress), prevSibling = workInProgress.type, nextProps = workInProgress.pendingProps, nextState = undefined !== current ? current.memoizedProps : undefined, returnFiber = nextProps.children, shouldSetTextContent(prevSibling, nextProps) ? returnFiber = undefined : undefined !== nextState && shouldSetTextContent(prevSibling, nextState) && (workInProgress.flags |= 32), undefined !== workInProgress.memoizedState && (prevSibling = renderWithHooks(current, workInProgress, TransitionAwareHostComponent, undefined, undefined, renderLanes), isPrimaryRenderer ? HostTransitionContext._currentValue = prevSibling : HostTransitionContext._currentValue2 = prevSibling), markRef(current, workInProgress), reconcileChildren(current, workInProgress, returnFiber, renderLanes), workInProgress.child;
      case 6:
        return undefined === current && isHydrating && (current = workInProgress.pendingProps, renderLanes = getHostContext(), current = validateHydratableTextInstance(current, renderLanes), renderLanes = nextHydratableInstance, (returnFiber = !renderLanes) || (returnFiber = canHydrateTextInstance(renderLanes, workInProgress.pendingProps, rootOrSingletonContext), undefined !== returnFiber ? (workInProgress.stateNode = returnFiber, hydrationParentFiber = workInProgress, nextHydratableInstance = undefined, returnFiber = !0) : returnFiber = !1, returnFiber = !returnFiber), returnFiber && (current && warnNonHydratedInstance(workInProgress, renderLanes), throwOnHydrationMismatch(workInProgress))), undefined;
      case 13:
        return updateSuspenseComponent(current, workInProgress, renderLanes);
      case 4:
        return pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), returnFiber = workInProgress.pendingProps, undefined === current ? workInProgress.child = reconcileChildFibers(workInProgress, undefined, returnFiber, renderLanes) : reconcileChildren(current, workInProgress, returnFiber, renderLanes), workInProgress.child;
      case 11:
        return updateForwardRef(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
      case 7:
        return reconcileChildren(current, workInProgress, workInProgress.pendingProps, renderLanes), workInProgress.child;
      case 8:
        return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
      case 12:
        return workInProgress.flags |= 4, workInProgress.flags |= 2048, returnFiber = workInProgress.stateNode, returnFiber.effectDuration = -0, returnFiber.passiveEffectDuration = -0, reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
      case 10:
        return returnFiber = workInProgress.type, prevSibling = workInProgress.pendingProps, nextProps = prevSibling.value, __in("value", prevSibling) || hasWarnedAboutUsingNoValuePropOnContextProvider || (hasWarnedAboutUsingNoValuePropOnContextProvider = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), pushProvider(workInProgress, returnFiber, nextProps), reconcileChildren(current, workInProgress, prevSibling.children, renderLanes), workInProgress.child;
      case 9:
        return prevSibling = workInProgress.type._context, returnFiber = workInProgress.pendingProps.children, "function" !== typeOfJS(returnFiber) && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), prepareToReadContext(workInProgress), prevSibling = readContext(prevSibling), returnFiber = callComponentInDEV(returnFiber, prevSibling, void 0), workInProgress.flags |= 1, reconcileChildren(current, workInProgress, returnFiber, renderLanes), workInProgress.child;
      case 14:
        return updateMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
      case 15:
        return updateSimpleMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
      case 19:
        return updateSuspenseListComponent(current, workInProgress, renderLanes);
      case 31:
        return updateActivityComponent(current, workInProgress, renderLanes);
      case 22:
        return updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
      case 24:
        return prepareToReadContext(workInProgress), returnFiber = readContext(CacheContext), undefined === current ? (prevSibling = peekCacheFromPool(), undefined === prevSibling && (prevSibling = workInProgressRoot, nextProps = createCache(), prevSibling.pooledCache = nextProps, retainCache(nextProps), undefined !== nextProps && (prevSibling.pooledCacheLanes |= renderLanes), prevSibling = nextProps), workInProgress.memoizedState = {
          parent: returnFiber,
          cache: prevSibling
        }, initializeUpdateQueue(workInProgress), pushProvider(workInProgress, CacheContext, prevSibling)) : (0 !== (current.lanes & renderLanes) && (cloneUpdateQueue(current, workInProgress), processUpdateQueue(workInProgress, undefined, undefined, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction()), prevSibling = current.memoizedState, nextProps = workInProgress.memoizedState, prevSibling.parent !== returnFiber ? (prevSibling = {
          parent: returnFiber,
          cache: returnFiber
        }, workInProgress.memoizedState = prevSibling, 0 === workInProgress.lanes && (workInProgress.memoizedState = workInProgress.updateQueue.baseState = prevSibling), pushProvider(workInProgress, CacheContext, returnFiber)) : (returnFiber = nextProps.cache, pushProvider(workInProgress, CacheContext, returnFiber), returnFiber !== prevSibling.cache && propagateContextChanges(workInProgress, __arrNew(CacheContext), renderLanes, !0))), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
      case 29:
        throw workInProgress.pendingProps;
    }
    throw Error(__cat(__cat("Unknown unit of work tag (", workInProgress.tag), "). This error is likely caused by a bug in React. Please file an issue."));
  }
  function markUpdate(workInProgress) {
    workInProgress.flags |= 4;
  }
  function markCloned(workInProgress) {
    supportsPersistence && (workInProgress.flags |= 8);
  }
  function doesRequireClone(current, completedWork) {
    if (undefined !== current && current.child === completedWork.child) return !1;
    if (0 !== (completedWork.flags & 16)) return !0;
    for (current = completedWork.child; undefined !== current;) {
      if (0 !== (current.flags & 8218) || 0 !== (current.subtreeFlags & 8218)) return !0;
      current = current.sibling;
    }
    return !1;
  }
  function appendAllChildren(parent, workInProgress, needsVisibilityToggle, isHidden) {
    let _node, instance;
    if (supportsMutation) for (needsVisibilityToggle = workInProgress.child; undefined !== needsVisibilityToggle;) {
      if (5 === needsVisibilityToggle.tag || 6 === needsVisibilityToggle.tag) appendInitialChild(parent, needsVisibilityToggle.stateNode);else if (!(4 === needsVisibilityToggle.tag || supportsSingletons && 27 === needsVisibilityToggle.tag) && undefined !== needsVisibilityToggle.child) {
        needsVisibilityToggle.child.return = needsVisibilityToggle;
        needsVisibilityToggle = needsVisibilityToggle.child;
        continue;
      }
      if (needsVisibilityToggle === workInProgress) break;
      for (; undefined === needsVisibilityToggle.sibling;) {
        if (undefined === needsVisibilityToggle.return || needsVisibilityToggle.return === workInProgress) return;
        needsVisibilityToggle = needsVisibilityToggle.return;
      }
      needsVisibilityToggle.sibling.return = needsVisibilityToggle.return;
      needsVisibilityToggle = needsVisibilityToggle.sibling;
    } else if (supportsPersistence) for (_node = workInProgress.child; undefined !== _node;) {
      if (5 === _node.tag) {
        instance = _node.stateNode;
        needsVisibilityToggle && isHidden && (instance = cloneHiddenInstance(instance, _node.type, _node.memoizedProps));
        appendInitialChild(parent, instance);
      } else if (6 === _node.tag) instance = _node.stateNode, needsVisibilityToggle && isHidden && (instance = cloneHiddenTextInstance(instance, _node.memoizedProps)), appendInitialChild(parent, instance);else if (4 !== _node.tag) if (22 === _node.tag && undefined !== _node.memoizedState) instance = _node.child, undefined !== instance && (instance.return = _node), appendAllChildren(parent, _node, !0, !0);else if (undefined !== _node.child) {
        _node.child.return = _node;
        _node = _node.child;
        continue;
      }
      if (_node === workInProgress) break;
      for (; undefined === _node.sibling;) {
        if (undefined === _node.return || _node.return === workInProgress) return;
        _node = _node.return;
      }
      _node.sibling.return = _node.return;
      _node = _node.sibling;
    }
  }
  function appendAllChildrenToContainer(containerChildSet, workInProgress, needsVisibilityToggle, isHidden) {
    let hasOffscreenComponentChild, node, instance;
    hasOffscreenComponentChild = !1;
    if (supportsPersistence) for (node = workInProgress.child; undefined !== node;) {
      if (5 === node.tag) {
        instance = node.stateNode;
        needsVisibilityToggle && isHidden && (instance = cloneHiddenInstance(instance, node.type, node.memoizedProps));
        appendChildToContainerChildSet(containerChildSet, instance);
      } else if (6 === node.tag) instance = node.stateNode, needsVisibilityToggle && isHidden && (instance = cloneHiddenTextInstance(instance, node.memoizedProps)), appendChildToContainerChildSet(containerChildSet, instance);else if (4 !== node.tag) if (22 === node.tag && undefined !== node.memoizedState) hasOffscreenComponentChild = node.child, undefined !== hasOffscreenComponentChild && (hasOffscreenComponentChild.return = node), appendAllChildrenToContainer(containerChildSet, node, !0, !0), hasOffscreenComponentChild = !0;else if (undefined !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === workInProgress) break;
      for (; undefined === node.sibling;) {
        if (undefined === node.return || node.return === workInProgress) return hasOffscreenComponentChild;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
    return hasOffscreenComponentChild;
  }
  function updateHostContainer(current, workInProgress) {
    let container, newChildSet;
    if (supportsPersistence && doesRequireClone(current, workInProgress)) {
      current = workInProgress.stateNode;
      container = current.containerInfo;
      newChildSet = createContainerChildSet();
      appendAllChildrenToContainer(newChildSet, workInProgress, !1, !1);
      current.pendingChildren = newChildSet;
      markUpdate(workInProgress);
      finalizeContainerChildren(container, newChildSet);
    }
  }
  function updateHostComponent(current, workInProgress, __type, newProps) {
    let currentInstance, _oldProps, currentHostContext;
    if (supportsMutation) current.memoizedProps !== newProps && markUpdate(workInProgress);else if (supportsPersistence) {
      currentInstance = current.stateNode;
      _oldProps = current.memoizedProps;
      if ((current = doesRequireClone(current, workInProgress)) || _oldProps !== newProps) {
        currentHostContext = getHostContext();
        _oldProps = cloneInstance(currentInstance, __type, _oldProps, newProps, !current, undefined);
        _oldProps === currentInstance ? workInProgress.stateNode = currentInstance : (markCloned(workInProgress), finalizeInitialChildren(_oldProps, __type, newProps, currentHostContext) && markUpdate(workInProgress), workInProgress.stateNode = _oldProps, current && appendAllChildren(_oldProps, workInProgress, !1, !1));
      } else workInProgress.stateNode = currentInstance;
    }
  }
  function preloadInstanceAndSuspendIfNeeded(workInProgress, __type, oldProps, newProps, renderLanes) {
    if ((workInProgress.mode & 32) !== NoMode && (undefined === oldProps ? maySuspendCommit(__type, newProps) : maySuspendCommitOnUpdate(__type, oldProps, newProps))) {
      if (workInProgress.flags |= 16777216, (renderLanes & 335544128) === renderLanes || maySuspendCommitInSyncRender(__type, newProps)) if (preloadInstance(workInProgress.stateNode, __type, newProps)) workInProgress.flags |= 8192;else if (shouldRemainOnPreviousScreen()) workInProgress.flags |= 8192;else throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
    } else workInProgress.flags &= -16777217;
  }
  function preloadResourceAndSuspendIfNeeded(workInProgress, resource) {
    if (mayResourceSuspendCommit(resource)) {
      if (workInProgress.flags |= 16777216, !preloadResource(resource)) if (shouldRemainOnPreviousScreen()) workInProgress.flags |= 8192;else throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
    } else workInProgress.flags &= -16777217;
  }
  function scheduleRetryEffect(workInProgress, retryQueue) {
    undefined !== retryQueue && (workInProgress.flags |= 4);
    workInProgress.flags & 16384 && (retryQueue = 22 !== workInProgress.tag ? claimNextRetryLane() : 536870912, workInProgress.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
  }
  function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
    let lastTailNode, _lastTailNode;
    if (!isHydrating) switch (renderState.tailMode) {
      case "hidden":
        hasRenderedATailFallback = renderState.tail;
        for (lastTailNode = undefined; undefined !== hasRenderedATailFallback;) undefined !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
        undefined === lastTailNode ? renderState.tail = undefined : lastTailNode.sibling = undefined;
        break;
      case "collapsed":
        lastTailNode = renderState.tail;
        for (_lastTailNode = undefined; undefined !== lastTailNode;) undefined !== lastTailNode.alternate && (_lastTailNode = lastTailNode), lastTailNode = lastTailNode.sibling;
        undefined === _lastTailNode ? hasRenderedATailFallback || undefined === renderState.tail ? renderState.tail = undefined : renderState.tail.sibling = undefined : _lastTailNode.sibling = undefined;
    }
  }
  function bubbleProperties(completedWork) {
    let didBailout, newChildLanes, subtreeFlags, _treeBaseDuration, _child2, child;
    didBailout = undefined !== completedWork.alternate && completedWork.alternate.child === completedWork.child;
    newChildLanes = 0;
    subtreeFlags = 0;
    if (didBailout) {
      if ((completedWork.mode & 2) !== NoMode) {
        for (_treeBaseDuration = completedWork.selfBaseDuration, _child2 = completedWork.child; undefined !== _child2;) newChildLanes |= _child2.lanes | _child2.childLanes, subtreeFlags |= _child2.subtreeFlags & 65011712, subtreeFlags |= _child2.flags & 65011712, _treeBaseDuration += _child2.treeBaseDuration, _child2 = _child2.sibling;
        completedWork.treeBaseDuration = _treeBaseDuration;
      } else for (_treeBaseDuration = completedWork.child; undefined !== _treeBaseDuration;) newChildLanes |= _treeBaseDuration.lanes | _treeBaseDuration.childLanes, subtreeFlags |= _treeBaseDuration.subtreeFlags & 65011712, subtreeFlags |= _treeBaseDuration.flags & 65011712, _treeBaseDuration.return = completedWork, _treeBaseDuration = _treeBaseDuration.sibling;
    } else if ((completedWork.mode & 2) !== NoMode) {
      _treeBaseDuration = completedWork.actualDuration;
      _child2 = completedWork.selfBaseDuration;
      for (child = completedWork.child; undefined !== child;) newChildLanes |= child.lanes | child.childLanes, subtreeFlags |= child.subtreeFlags, subtreeFlags |= child.flags, _treeBaseDuration += child.actualDuration, _child2 += child.treeBaseDuration, child = child.sibling;
      completedWork.actualDuration = _treeBaseDuration;
      completedWork.treeBaseDuration = _child2;
    } else for (_treeBaseDuration = completedWork.child; undefined !== _treeBaseDuration;) newChildLanes |= _treeBaseDuration.lanes | _treeBaseDuration.childLanes, subtreeFlags |= _treeBaseDuration.subtreeFlags, subtreeFlags |= _treeBaseDuration.flags, _treeBaseDuration.return = completedWork, _treeBaseDuration = _treeBaseDuration.sibling;
    completedWork.subtreeFlags |= subtreeFlags;
    completedWork.childLanes = newChildLanes;
    return didBailout;
  }
  function completeWork(current, workInProgress, renderLanes) {
    let newProps, __type, nextResource, _rootContainerInstance;
    newProps = workInProgress.pendingProps;
    popTreeContext(workInProgress);
    switch (workInProgress.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return bubbleProperties(workInProgress), undefined;
      case 1:
        return bubbleProperties(workInProgress), undefined;
      case 3:
        renderLanes = workInProgress.stateNode;
        newProps = undefined;
        undefined !== current && (newProps = current.memoizedState.cache);
        workInProgress.memoizedState.cache !== newProps && (workInProgress.flags |= 2048);
        popProvider(CacheContext, workInProgress);
        popHostContainer(workInProgress);
        renderLanes.pendingContext && (renderLanes.context = renderLanes.pendingContext, renderLanes.pendingContext = undefined);
        if (undefined === current || undefined === current.child) popHydrationState(workInProgress) ? (emitPendingHydrationWarnings(), markUpdate(workInProgress)) : undefined === current || current.memoizedState.isDehydrated && 0 === (workInProgress.flags & 256) || (workInProgress.flags |= 1024, upgradeHydrationErrorsToRecoverable());
        updateHostContainer(current, workInProgress);
        bubbleProperties(workInProgress);
        return undefined;
      case 26:
        if (supportsResources) {
          __type = workInProgress.type;
          nextResource = workInProgress.memoizedState;
          undefined === current ? (markUpdate(workInProgress), undefined !== nextResource ? (bubbleProperties(workInProgress), preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (bubbleProperties(workInProgress), preloadInstanceAndSuspendIfNeeded(workInProgress, __type, undefined, newProps, renderLanes))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress), bubbleProperties(workInProgress), preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (bubbleProperties(workInProgress), workInProgress.flags &= -16777217) : (nextResource = current.memoizedProps, supportsMutation ? nextResource !== newProps && markUpdate(workInProgress) : updateHostComponent(current, workInProgress, __type, newProps), bubbleProperties(workInProgress), preloadInstanceAndSuspendIfNeeded(workInProgress, __type, nextResource, newProps, renderLanes));
          return undefined;
        }
      case 27:
        if (supportsSingletons) {
          popHostContext(workInProgress);
          renderLanes = requiredContext(rootInstanceStackCursor.current);
          __type = workInProgress.type;
          if (undefined !== current && workInProgress.stateNode !== undefined) supportsMutation ? current.memoizedProps !== newProps && markUpdate(workInProgress) : updateHostComponent(current, workInProgress, __type, newProps);else {
            if (!newProps) {
              if (undefined === workInProgress.stateNode) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              bubbleProperties(workInProgress);
              return undefined;
            }
            current = getHostContext();
            popHydrationState(workInProgress) ? prepareToHydrateHostInstance(workInProgress, current) : (current = resolveSingletonInstance(__type, newProps, renderLanes, current, !0), workInProgress.stateNode = current, markUpdate(workInProgress));
          }
          bubbleProperties(workInProgress);
          return undefined;
        }
      case 5:
        popHostContext(workInProgress);
        __type = workInProgress.type;
        if (undefined !== current && workInProgress.stateNode !== undefined) updateHostComponent(current, workInProgress, __type, newProps);else {
          if (!newProps) {
            if (undefined === workInProgress.stateNode) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            bubbleProperties(workInProgress);
            return undefined;
          }
          nextResource = getHostContext();
          if (popHydrationState(workInProgress)) prepareToHydrateHostInstance(workInProgress, nextResource), finalizeHydratedChildren(workInProgress.stateNode, __type, newProps, nextResource) && (workInProgress.flags |= 64);else {
            _rootContainerInstance = requiredContext(rootInstanceStackCursor.current);
            _rootContainerInstance = createInstance(__type, newProps, _rootContainerInstance, nextResource, workInProgress);
            markCloned(workInProgress);
            appendAllChildren(_rootContainerInstance, workInProgress, !1, !1);
            workInProgress.stateNode = _rootContainerInstance;
            finalizeInitialChildren(_rootContainerInstance, __type, newProps, nextResource) && markUpdate(workInProgress);
          }
        }
        bubbleProperties(workInProgress);
        preloadInstanceAndSuspendIfNeeded(workInProgress, workInProgress.type, undefined === current ? undefined : current.memoizedProps, workInProgress.pendingProps, renderLanes);
        return undefined;
      case 6:
        if (current && workInProgress.stateNode !== undefined) renderLanes = current.memoizedProps, supportsMutation ? renderLanes !== newProps && markUpdate(workInProgress) : supportsPersistence && (renderLanes !== newProps ? (current = requiredContext(rootInstanceStackCursor.current), renderLanes = getHostContext(), markCloned(workInProgress), workInProgress.stateNode = createTextInstance(newProps, current, renderLanes, workInProgress)) : workInProgress.stateNode = current.stateNode);else {
          if ("string" !== typeOfJS(newProps) && undefined === workInProgress.stateNode) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          current = requiredContext(rootInstanceStackCursor.current);
          renderLanes = getHostContext();
          if (popHydrationState(workInProgress)) {
            if (!supportsHydration) throw Error("Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
            current = workInProgress.stateNode;
            renderLanes = workInProgress.memoizedProps;
            __type = !didSuspendOrErrorDEV;
            newProps = undefined;
            nextResource = hydrationParentFiber;
            if (undefined !== nextResource) switch (nextResource.tag) {
              case 3:
                __type && (__type = diffHydratedTextForDevWarnings(current, renderLanes, newProps), undefined !== __type && (buildHydrationDiffNode(workInProgress, 0).serverProps = __type));
                break;
              case 27:
              case 5:
                newProps = nextResource.memoizedProps, __type && (__type = diffHydratedTextForDevWarnings(current, renderLanes, newProps), undefined !== __type && (buildHydrationDiffNode(workInProgress, 0).serverProps = __type));
            }
            hydrateTextInstance(current, renderLanes, workInProgress, newProps) || throwOnHydrationMismatch(workInProgress, !0);
          } else markCloned(workInProgress), workInProgress.stateNode = createTextInstance(newProps, current, renderLanes, workInProgress);
        }
        bubbleProperties(workInProgress);
        return undefined;
      case 31:
        renderLanes = workInProgress.memoizedState;
        if (undefined === current || undefined !== current.memoizedState) {
          newProps = popHydrationState(workInProgress);
          if (undefined !== renderLanes) {
            if (undefined === current) {
              if (!newProps) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
              if (!supportsHydration) throw Error("Expected prepareToHydrateHostActivityInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
              current = workInProgress.memoizedState;
              current = undefined !== current ? current.dehydrated : undefined;
              if (!current) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
              hydrateActivityInstance(current, workInProgress);
              bubbleProperties(workInProgress);
              (workInProgress.mode & 2) !== NoMode && undefined !== renderLanes && (current = workInProgress.child, undefined !== current && (workInProgress.treeBaseDuration -= current.treeBaseDuration));
            } else emitPendingHydrationWarnings(), resetHydrationState(), 0 === (workInProgress.flags & 128) && (renderLanes = workInProgress.memoizedState = undefined), workInProgress.flags |= 4, bubbleProperties(workInProgress), (workInProgress.mode & 2) !== NoMode && undefined !== renderLanes && (current = workInProgress.child, undefined !== current && (workInProgress.treeBaseDuration -= current.treeBaseDuration));
            current = !1;
          } else renderLanes = upgradeHydrationErrorsToRecoverable(), undefined !== current && undefined !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes), current = !0;
          if (!current) {
            if (workInProgress.flags & 256) return popSuspenseHandler(workInProgress), workInProgress;
            popSuspenseHandler(workInProgress);
            return undefined;
          }
          if (0 !== (workInProgress.flags & 128)) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
        }
        bubbleProperties(workInProgress);
        return undefined;
      case 13:
        newProps = workInProgress.memoizedState;
        if (undefined === current || undefined !== current.memoizedState && undefined !== current.memoizedState.dehydrated) {
          __type = newProps;
          nextResource = popHydrationState(workInProgress);
          if (undefined !== __type && undefined !== __type.dehydrated) {
            if (undefined === current) {
              if (!nextResource) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
              if (!supportsHydration) throw Error("Expected prepareToHydrateHostSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
              nextResource = workInProgress.memoizedState;
              nextResource = undefined !== nextResource ? nextResource.dehydrated : undefined;
              if (!nextResource) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
              hydrateSuspenseInstance(nextResource, workInProgress);
              bubbleProperties(workInProgress);
              (workInProgress.mode & 2) !== NoMode && undefined !== __type && (__type = workInProgress.child, undefined !== __type && (workInProgress.treeBaseDuration -= __type.treeBaseDuration));
            } else emitPendingHydrationWarnings(), resetHydrationState(), 0 === (workInProgress.flags & 128) && (__type = workInProgress.memoizedState = undefined), workInProgress.flags |= 4, bubbleProperties(workInProgress), (workInProgress.mode & 2) !== NoMode && undefined !== __type && (__type = workInProgress.child, undefined !== __type && (workInProgress.treeBaseDuration -= __type.treeBaseDuration));
            __type = !1;
          } else __type = upgradeHydrationErrorsToRecoverable(), undefined !== current && undefined !== current.memoizedState && (current.memoizedState.hydrationErrors = __type), __type = !0;
          if (!__type) {
            if (workInProgress.flags & 256) return popSuspenseHandler(workInProgress), workInProgress;
            popSuspenseHandler(workInProgress);
            return undefined;
          }
        }
        popSuspenseHandler(workInProgress);
        if (0 !== (workInProgress.flags & 128)) return workInProgress.lanes = renderLanes, (workInProgress.mode & 2) !== NoMode && transferActualDuration(workInProgress), workInProgress;
        renderLanes = undefined !== newProps;
        current = undefined !== current && undefined !== current.memoizedState;
        renderLanes && (newProps = workInProgress.child, __type = undefined, undefined !== newProps.alternate && undefined !== newProps.alternate.memoizedState && undefined !== newProps.alternate.memoizedState.cachePool && (__type = newProps.alternate.memoizedState.cachePool.pool), nextResource = undefined, undefined !== newProps.memoizedState && undefined !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== __type && (newProps.flags |= 2048));
        renderLanes !== current && renderLanes && (workInProgress.child.flags |= 8192);
        scheduleRetryEffect(workInProgress, workInProgress.updateQueue);
        bubbleProperties(workInProgress);
        (workInProgress.mode & 2) !== NoMode && renderLanes && (current = workInProgress.child, undefined !== current && (workInProgress.treeBaseDuration -= current.treeBaseDuration));
        return undefined;
      case 4:
        return popHostContainer(workInProgress), updateHostContainer(current, workInProgress), undefined === current && preparePortalMount(workInProgress.stateNode.containerInfo), bubbleProperties(workInProgress), undefined;
      case 10:
        return popProvider(workInProgress.type, workInProgress), bubbleProperties(workInProgress), undefined;
      case 19:
        pop(suspenseStackCursor, workInProgress);
        newProps = workInProgress.memoizedState;
        if (undefined === newProps) return bubbleProperties(workInProgress), undefined;
        __type = 0 !== (workInProgress.flags & 128);
        nextResource = newProps.rendering;
        if (undefined === nextResource) {
          if (__type) cutOffTailIfNeeded(newProps, !1);else {
            if (workInProgressRootExitStatus !== RootInProgress || undefined !== current && 0 !== (current.flags & 128)) for (current = workInProgress.child; undefined !== current;) {
              nextResource = findFirstSuspended(current);
              if (undefined !== nextResource) {
                workInProgress.flags |= 128;
                cutOffTailIfNeeded(newProps, !1);
                current = nextResource.updateQueue;
                workInProgress.updateQueue = current;
                scheduleRetryEffect(workInProgress, current);
                workInProgress.subtreeFlags = 0;
                current = renderLanes;
                for (renderLanes = workInProgress.child; undefined !== renderLanes;) resetWorkInProgress(renderLanes, current), renderLanes = renderLanes.sibling;
                push(suspenseStackCursor, suspenseStackCursor.current & SubtreeSuspenseContextMask | ForceSuspenseFallback, workInProgress);
                isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount);
                return workInProgress.child;
              }
              current = current.sibling;
            }
            undefined !== newProps.tail && now_1() > workInProgressRootRenderTargetTime && (workInProgress.flags |= 128, __type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
          }
        } else {
          if (!__type) if (current = findFirstSuspended(nextResource), undefined !== current) {
            if (workInProgress.flags |= 128, __type = !0, current = current.updateQueue, workInProgress.updateQueue = current, scheduleRetryEffect(workInProgress, current), cutOffTailIfNeeded(newProps, !0), undefined === newProps.tail && "hidden" === newProps.tailMode && !nextResource.alternate && !isHydrating) return bubbleProperties(workInProgress), undefined;
          } else 2 * now_1() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes && (workInProgress.flags |= 128, __type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
          newProps.isBackwards ? (nextResource.sibling = workInProgress.child, workInProgress.child = nextResource) : (current = newProps.last, undefined !== current ? current.sibling = nextResource : workInProgress.child = nextResource, newProps.last = nextResource);
        }
        if (undefined !== newProps.tail) return current = newProps.tail, newProps.rendering = current, newProps.tail = current.sibling, newProps.renderingStartTime = now_1(), current.sibling = undefined, renderLanes = suspenseStackCursor.current, renderLanes = __type ? renderLanes & SubtreeSuspenseContextMask | ForceSuspenseFallback : renderLanes & SubtreeSuspenseContextMask, push(suspenseStackCursor, renderLanes, workInProgress), isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount), current;
        bubbleProperties(workInProgress);
        return undefined;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress), popHiddenContext(workInProgress), newProps = undefined !== workInProgress.memoizedState, undefined !== current ? undefined !== current.memoizedState !== newProps && (workInProgress.flags |= 8192) : newProps && (workInProgress.flags |= 8192), newProps ? 0 !== (renderLanes & 536870912) && 0 === (workInProgress.flags & 128) && (bubbleProperties(workInProgress), workInProgress.subtreeFlags & 6 && (workInProgress.flags |= 8192)) : bubbleProperties(workInProgress), renderLanes = workInProgress.updateQueue, undefined !== renderLanes && scheduleRetryEffect(workInProgress, renderLanes.retryQueue), renderLanes = undefined, undefined !== current && undefined !== current.memoizedState && undefined !== current.memoizedState.cachePool && (renderLanes = current.memoizedState.cachePool.pool), newProps = undefined, undefined !== workInProgress.memoizedState && undefined !== workInProgress.memoizedState.cachePool && (newProps = workInProgress.memoizedState.cachePool.pool), newProps !== renderLanes && (workInProgress.flags |= 2048), undefined !== current && pop(resumedCache, workInProgress), undefined;
      case 24:
        return renderLanes = undefined, undefined !== current && (renderLanes = current.memoizedState.cache), workInProgress.memoizedState.cache !== renderLanes && (workInProgress.flags |= 2048), popProvider(CacheContext, workInProgress), bubbleProperties(workInProgress), undefined;
      case 25:
        return undefined;
      case 30:
        return undefined;
    }
    throw Error(__cat(__cat("Unknown unit of work tag (", workInProgress.tag), "). This error is likely caused by a bug in React. Please file an issue."));
  }
  function unwindWork(current, workInProgress) {
    popTreeContext(workInProgress);
    switch (workInProgress.tag) {
      case 1:
        return current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, (workInProgress.mode & 2) !== NoMode && transferActualDuration(workInProgress), workInProgress) : undefined;
      case 3:
        return popProvider(CacheContext, workInProgress), popHostContainer(workInProgress), current = workInProgress.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress.flags = current & -65537 | 128, workInProgress) : undefined;
      case 26:
      case 27:
      case 5:
        return popHostContext(workInProgress), undefined;
      case 31:
        if (undefined !== workInProgress.memoizedState) {
          popSuspenseHandler(workInProgress);
          if (undefined === workInProgress.alternate) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          resetHydrationState();
        }
        current = workInProgress.flags;
        return current & 65536 ? (workInProgress.flags = current & -65537 | 128, (workInProgress.mode & 2) !== NoMode && transferActualDuration(workInProgress), workInProgress) : undefined;
      case 13:
        popSuspenseHandler(workInProgress);
        current = workInProgress.memoizedState;
        if (undefined !== current && undefined !== current.dehydrated) {
          if (undefined === workInProgress.alternate) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          resetHydrationState();
        }
        current = workInProgress.flags;
        return current & 65536 ? (workInProgress.flags = current & -65537 | 128, (workInProgress.mode & 2) !== NoMode && transferActualDuration(workInProgress), workInProgress) : undefined;
      case 19:
        return pop(suspenseStackCursor, workInProgress), undefined;
      case 4:
        return popHostContainer(workInProgress), undefined;
      case 10:
        return popProvider(workInProgress.type, workInProgress), undefined;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress), popHiddenContext(workInProgress), undefined !== current && pop(resumedCache, workInProgress), current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, (workInProgress.mode & 2) !== NoMode && transferActualDuration(workInProgress), workInProgress) : undefined;
      case 24:
        return popProvider(CacheContext, workInProgress), undefined;
      case 25:
        return undefined;
      default:
        return undefined;
    }
  }
  function unwindInterruptedWork(current, interruptedWork) {
    popTreeContext(interruptedWork);
    switch (interruptedWork.tag) {
      case 3:
        popProvider(CacheContext, interruptedWork);
        popHostContainer(interruptedWork);
        break;
      case 26:
      case 27:
      case 5:
        popHostContext(interruptedWork);
        break;
      case 4:
        popHostContainer(interruptedWork);
        break;
      case 31:
        undefined !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
        break;
      case 13:
        popSuspenseHandler(interruptedWork);
        break;
      case 19:
        pop(suspenseStackCursor, interruptedWork);
        break;
      case 10:
        popProvider(interruptedWork.type, interruptedWork);
        break;
      case 22:
      case 23:
        popSuspenseHandler(interruptedWork);
        popHiddenContext(interruptedWork);
        undefined !== current && pop(resumedCache, interruptedWork);
        break;
      case 24:
        popProvider(CacheContext, interruptedWork);
    }
  }
  function shouldProfile(current) {
    return (current.mode & 2) !== NoMode;
  }
  function commitHookLayoutEffects(finishedWork, hookFlags) {
    shouldProfile(finishedWork) ? (startEffectTimer(), commitHookEffectListMount(hookFlags, finishedWork), recordEffectDuration()) : commitHookEffectListMount(hookFlags, finishedWork);
  }
  function commitHookLayoutUnmountEffects(finishedWork, nearestMountedAncestor, hookFlags) {
    shouldProfile(finishedWork) ? (startEffectTimer(), commitHookEffectListUnmount(hookFlags, finishedWork, nearestMountedAncestor), recordEffectDuration()) : commitHookEffectListUnmount(hookFlags, finishedWork, nearestMountedAncestor);
  }
  function commitHookEffectListMount(flags, finishedWork) {
    let updateQueue, lastEffect, firstEffect, hookName, addendum;
    try {
      updateQueue = finishedWork.updateQueue;
      lastEffect = undefined !== updateQueue ? updateQueue.lastEffect : undefined;
      if (undefined !== lastEffect) {
        firstEffect = lastEffect.next;
        updateQueue = firstEffect;
        do {
          if ((updateQueue.tag & flags) === flags && (lastEffect = void 0, (flags & Insertion) !== NoFlags && (isRunningInsertionEffect = !0), lastEffect = runWithFiberInDEV(finishedWork, callCreateInDEV, updateQueue), (flags & Insertion) !== NoFlags && (isRunningInsertionEffect = !1), void 0 !== lastEffect && "function" !== typeOfJS(lastEffect))) {
            hookName = void 0;
            hookName = 0 !== (updateQueue.tag & Layout) ? "useLayoutEffect" : 0 !== (updateQueue.tag & Insertion) ? "useInsertionEffect" : "useEffect";
            addendum = void 0;
            addendum = undefined === lastEffect ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : "function" === typeOfJS(lastEffect.then) ? __cat(__cat(__cat(__cat("\n\nIt looks like you wrote ", hookName), "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n"), hookName), "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching") : __cat(" You returned: ", lastEffect);
            runWithFiberInDEV(finishedWork, function (n, a) {
              console.error("%s must not return anything besides a function, which is used for clean-up.%s", n, a);
            }, hookName, addendum);
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor) {
    let updateQueue, lastEffect, firstEffect, inst, destroy;
    try {
      updateQueue = finishedWork.updateQueue;
      lastEffect = undefined !== updateQueue ? updateQueue.lastEffect : undefined;
      if (undefined !== lastEffect) {
        firstEffect = lastEffect.next;
        updateQueue = firstEffect;
        do {
          if ((updateQueue.tag & flags) === flags) {
            inst = updateQueue.inst;
            destroy = inst.destroy;
            void 0 !== destroy && (inst.destroy = void 0, (flags & Insertion) !== NoFlags && (isRunningInsertionEffect = !0), lastEffect = finishedWork, runWithFiberInDEV(lastEffect, callDestroyInDEV, lastEffect, nearestMountedAncestor, destroy), (flags & Insertion) !== NoFlags && (isRunningInsertionEffect = !1));
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function commitHookPassiveMountEffects(finishedWork, hookFlags) {
    shouldProfile(finishedWork) ? (startEffectTimer(), commitHookEffectListMount(hookFlags, finishedWork), recordEffectDuration()) : commitHookEffectListMount(hookFlags, finishedWork);
  }
  function commitHookPassiveUnmountEffects(finishedWork, nearestMountedAncestor, hookFlags) {
    shouldProfile(finishedWork) ? (startEffectTimer(), commitHookEffectListUnmount(hookFlags, finishedWork, nearestMountedAncestor), recordEffectDuration()) : commitHookEffectListUnmount(hookFlags, finishedWork, nearestMountedAncestor);
  }
  function commitClassCallbacks(finishedWork) {
    let updateQueue, instance;
    updateQueue = finishedWork.updateQueue;
    if (undefined !== updateQueue) {
      instance = finishedWork.stateNode;
      finishedWork.type.defaultProps || __in("ref", finishedWork.memoizedProps) || didWarnAboutReassigningProps || (instance.props !== finishedWork.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance"), instance.state !== finishedWork.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance"));
      try {
        runWithFiberInDEV(finishedWork, commitCallbacks, updateQueue, instance);
      } catch (__error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }
  }
  function callGetSnapshotBeforeUpdates(instance, prevProps, prevState) {
    return instance.getSnapshotBeforeUpdate(prevProps, prevState);
  }
  function commitClassSnapshot(finishedWork, current) {
    let prevProps, prevState, resolvedPrevProps, snapshot;
    prevProps = current.memoizedProps;
    prevState = current.memoizedState;
    current = finishedWork.stateNode;
    finishedWork.type.defaultProps || __in("ref", finishedWork.memoizedProps) || didWarnAboutReassigningProps || (current.props !== finishedWork.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance"), current.state !== finishedWork.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance"));
    try {
      resolvedPrevProps = resolveClassComponentProps(finishedWork.type, prevProps);
      snapshot = runWithFiberInDEV(finishedWork, callGetSnapshotBeforeUpdates, current, resolvedPrevProps, prevState);
      prevProps = didWarnAboutUndefinedSnapshotBeforeUpdate;
      void 0 !== snapshot || prevProps.has(finishedWork.type) || (prevProps.add(finishedWork.type), runWithFiberInDEV(finishedWork, function () {
        console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", getComponentNameFromFiber(finishedWork));
      }));
      current.__reactInternalSnapshotBeforeUpdate = snapshot;
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
    instance.props = resolveClassComponentProps(current.type, current.memoizedProps);
    instance.state = current.memoizedState;
    shouldProfile(current) ? (startEffectTimer(), runWithFiberInDEV(current, callComponentWillUnmountInDEV, current, nearestMountedAncestor, instance), recordEffectDuration()) : runWithFiberInDEV(current, callComponentWillUnmountInDEV, current, nearestMountedAncestor, instance);
  }
  function commitAttachRef(finishedWork) {
    let ref, instanceToUse;
    ref = finishedWork.ref;
    if (undefined !== ref) {
      switch (finishedWork.tag) {
        case 26:
        case 27:
        case 5:
          instanceToUse = getPublicInstance(finishedWork.stateNode);
          break;
        case 30:
          instanceToUse = finishedWork.stateNode;
          break;
        default:
          instanceToUse = finishedWork.stateNode;
      }
      if ("function" === typeOfJS(ref)) {
        if (shouldProfile(finishedWork)) try {
          startEffectTimer(), finishedWork.refCleanup = ref(instanceToUse);
        } finally {
          recordEffectDuration();
        } else finishedWork.refCleanup = ref(instanceToUse);
      } else "string" === typeOfJS(ref) ? console.error("String refs are no longer supported.") : Object.hasOwnProperty(ref, "current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", getComponentNameFromFiber(finishedWork)), ref.current = instanceToUse;
    }
  }
  function safelyAttachRef(current, nearestMountedAncestor) {
    try {
      runWithFiberInDEV(current, commitAttachRef, current);
    } catch (__error) {
      captureCommitPhaseError(current, nearestMountedAncestor, __error);
    }
  }
  function safelyDetachRef(current, nearestMountedAncestor) {
    let ref, refCleanup;
    ref = current.ref;
    refCleanup = current.refCleanup;
    if (undefined !== ref) if ("function" === typeOfJS(refCleanup)) try {
      if (shouldProfile(current)) try {
        startEffectTimer(), runWithFiberInDEV(current, refCleanup);
      } finally {
        recordEffectDuration(current);
      } else runWithFiberInDEV(current, refCleanup);
    } catch (__error) {
      captureCommitPhaseError(current, nearestMountedAncestor, __error);
    } finally {
      current.refCleanup = undefined, current = current.alternate, current !== undefined && (current.refCleanup = undefined);
    } else if ("function" === typeOfJS(ref)) try {
      if (shouldProfile(current)) try {
        startEffectTimer(), runWithFiberInDEV(current, ref, undefined);
      } finally {
        recordEffectDuration(current);
      } else runWithFiberInDEV(current, ref, undefined);
    } catch (error_3) {
      captureCommitPhaseError(current, nearestMountedAncestor, error_3);
    } else ref.current = undefined;
  }
  function commitProfiler(finishedWork, current, commitStartTime, effectDuration) {
    let _finishedWork_memoize, id, onCommit;
    _finishedWork_memoize = finishedWork.memoizedProps;
    id = _finishedWork_memoize.id;
    onCommit = _finishedWork_memoize.onCommit;
    _finishedWork_memoize = _finishedWork_memoize.onRender;
    current = undefined === current ? "mount" : "update";
    currentUpdateIsNested && (current = "nested-update");
    "function" === typeOfJS(_finishedWork_memoize) && _finishedWork_memoize(id, current, finishedWork.actualDuration, finishedWork.treeBaseDuration, finishedWork.actualStartTime, commitStartTime);
    "function" === typeOfJS(onCommit) && onCommit(id, current, effectDuration, commitStartTime);
  }
  function commitProfilerPostCommitImpl(finishedWork, current, commitStartTime, passiveEffectDuration) {
    let _finishedWork_memoize2;
    _finishedWork_memoize2 = finishedWork.memoizedProps;
    finishedWork = _finishedWork_memoize2.id;
    _finishedWork_memoize2 = _finishedWork_memoize2.onPostCommit;
    current = undefined === current ? "mount" : "update";
    currentUpdateIsNested && (current = "nested-update");
    "function" === typeOfJS(_finishedWork_memoize2) && _finishedWork_memoize2(finishedWork, current, passiveEffectDuration, commitStartTime);
  }
  function commitHostMount(finishedWork) {
    let __type, props, instance;
    __type = finishedWork.type;
    props = finishedWork.memoizedProps;
    instance = finishedWork.stateNode;
    try {
      runWithFiberInDEV(finishedWork, commitMount, instance, __type, props, finishedWork);
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function commitHostUpdate(finishedWork, newProps, oldProps) {
    try {
      runWithFiberInDEV(finishedWork, commitUpdate, finishedWork.stateNode, finishedWork.type, oldProps, newProps, finishedWork);
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function isHostParent(fiber) {
    return 5 === fiber.tag || 3 === fiber.tag || (supportsResources ? 26 === fiber.tag : !1) || (supportsSingletons ? 27 === fiber.tag && isSingletonScope(fiber.type) : !1) || 4 === fiber.tag;
  }
  function getHostSibling(fiber) {
    {
      let __lb_10 = false,
        __lc_10 = false;
      while (!__lb_10) {
        __lc_10 = false;
        while (true) {
          {
            for (; undefined === fiber.sibling;) {
              if (undefined === fiber.return || isHostParent(fiber.return)) return undefined;
              fiber = fiber.return;
            }
            fiber.sibling.return = fiber.return;
            for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag;) {
              if (supportsSingletons && 27 === fiber.tag && isSingletonScope(fiber.type)) {
                __lc_10 = true;
                break;
              }
              if (fiber.flags & 2) {
                __lc_10 = true;
                break;
              }
              if (undefined === fiber.child || 4 === fiber.tag) {
                __lc_10 = true;
                break;
              } else fiber.child.return = fiber, fiber = fiber.child;
            }
            if (__lb_10 || __lc_10) {
              break;
            }
            if (!(fiber.flags & 2)) return fiber.stateNode;
          }
          ;
        }
        if (__lc_10) {
          __lc_10 = false;
          ;
          continue;
        }
        break;
      }
    }
  }
  function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
    let tag;
    tag = node.tag;
    if (5 === tag || 6 === tag) node = node.stateNode, before ? insertInContainerBefore(parent, node, before) : appendChildToContainer(parent, node);else if (4 !== tag && (supportsSingletons && 27 === tag && isSingletonScope(node.type) && (parent = node.stateNode, before = undefined), node = node.child, undefined !== node)) for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; undefined !== node;) insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
  }
  function insertOrAppendPlacementNode(node, before, parent) {
    let tag;
    tag = node.tag;
    if (5 === tag || 6 === tag) node = node.stateNode, before ? insertBefore(parent, node, before) : appendChild(parent, node);else if (4 !== tag && (supportsSingletons && 27 === tag && isSingletonScope(node.type) && (parent = node.stateNode), node = node.child, undefined !== node)) for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; undefined !== node;) insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
  }
  function commitPlacement(finishedWork) {
    let hostParentFiber, parentFiber;
    for (parentFiber = finishedWork.return; undefined !== parentFiber;) {
      if (isHostParent(parentFiber)) {
        hostParentFiber = parentFiber;
        break;
      }
      parentFiber = parentFiber.return;
    }
    if (supportsMutation) {
      if (hostParentFiber === undefined) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      switch (hostParentFiber.tag) {
        case 27:
          if (supportsSingletons) {
            hostParentFiber = hostParentFiber.stateNode;
            parentFiber = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(finishedWork, parentFiber, hostParentFiber);
            break;
          }
        case 5:
          parentFiber = hostParentFiber.stateNode;
          hostParentFiber.flags & 32 && (resetTextContent(parentFiber), hostParentFiber.flags &= -33);
          hostParentFiber = getHostSibling(finishedWork);
          insertOrAppendPlacementNode(finishedWork, hostParentFiber, parentFiber);
          break;
        case 3:
        case 4:
          hostParentFiber = hostParentFiber.stateNode.containerInfo;
          parentFiber = getHostSibling(finishedWork);
          insertOrAppendPlacementNodeIntoContainer(finishedWork, parentFiber, hostParentFiber);
          break;
        default:
          throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
  }
  function commitHostPortalContainerChildren(portal, finishedWork, pendingChildren) {
    portal = portal.containerInfo;
    try {
      runWithFiberInDEV(finishedWork, replaceContainerChildren, portal, pendingChildren);
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function commitHostSingletonAcquisition(finishedWork) {
    let singleton, props;
    singleton = finishedWork.stateNode;
    props = finishedWork.memoizedProps;
    try {
      runWithFiberInDEV(finishedWork, acquireSingletonInstance, finishedWork.type, props, singleton, finishedWork);
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function isHydratingParent(current, finishedWork) {
    return 31 === finishedWork.tag ? (finishedWork = finishedWork.memoizedState, undefined !== current.memoizedState && undefined === finishedWork) : 13 === finishedWork.tag ? (current = current.memoizedState, finishedWork = finishedWork.memoizedState, undefined !== current && undefined !== current.dehydrated && (undefined === finishedWork || undefined === finishedWork.dehydrated)) : 3 === finishedWork.tag ? current.memoizedState.isDehydrated && 0 === (finishedWork.flags & 256) : !1;
  }
  function commitBeforeMutationEffects(root, firstChild) {
    let current, flags;
    prepareForCommit(root.containerInfo);
    for (nextEffect = firstChild; undefined !== nextEffect;) if (root = nextEffect, firstChild = root.child, 0 !== (root.subtreeFlags & 1028) && undefined !== firstChild) firstChild.return = root, nextEffect = firstChild;else for (; undefined !== nextEffect;) {
      firstChild = root = nextEffect;
      current = firstChild.alternate;
      flags = firstChild.flags;
      switch (firstChild.tag) {
        case 0:
          if (0 !== (flags & 4) && (firstChild = firstChild.updateQueue, firstChild = undefined !== firstChild ? firstChild.events : undefined, undefined !== firstChild)) for (current = 0; current < __len(firstChild); current++) flags = firstChild[current], flags.ref.impl = flags.nextImpl;
          break;
        case 11:
        case 15:
          break;
        case 1:
          0 !== (flags & 1024) && undefined !== current && commitClassSnapshot(firstChild, current);
          break;
        case 3:
          0 !== (flags & 1024) && supportsMutation && clearContainer(firstChild.stateNode.containerInfo);
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        default:
          if (0 !== (flags & 1024)) throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      firstChild = root.sibling;
      if (undefined !== firstChild) {
        firstChild.return = root.return;
        nextEffect = firstChild;
        break;
      }
      nextEffect = root.return;
    }
  }
  function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
    let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, flags, prevProps, prevOffscreenSubtreeWasHidden;
    prevEffectStart = pushComponentEffectStart();
    prevEffectDuration = pushComponentEffectDuration();
    prevEffectErrors = pushComponentEffectErrors();
    prevEffectDidSpawnUpdate = pushComponentEffectDidSpawnUpdate();
    flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitHookLayoutEffects(finishedWork, Layout | HasEffect);
        break;
      case 1:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 4) if (finishedRoot = finishedWork.stateNode, undefined === current) finishedWork.type.defaultProps || __in("ref", finishedWork.memoizedProps) || didWarnAboutReassigningProps || (finishedRoot.props !== finishedWork.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance"), finishedRoot.state !== finishedWork.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance")), shouldProfile(finishedWork) ? (startEffectTimer(), runWithFiberInDEV(finishedWork, callComponentDidMountInDEV, finishedWork, finishedRoot), recordEffectDuration()) : runWithFiberInDEV(finishedWork, callComponentDidMountInDEV, finishedWork, finishedRoot);else {
          prevProps = resolveClassComponentProps(finishedWork.type, current.memoizedProps);
          current = current.memoizedState;
          finishedWork.type.defaultProps || __in("ref", finishedWork.memoizedProps) || didWarnAboutReassigningProps || (finishedRoot.props !== finishedWork.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance"), finishedRoot.state !== finishedWork.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", getComponentNameFromFiber(finishedWork) || "instance"));
          shouldProfile(finishedWork) ? (startEffectTimer(), runWithFiberInDEV(finishedWork, callComponentDidUpdateInDEV, finishedWork, finishedRoot, prevProps, current, finishedRoot.__reactInternalSnapshotBeforeUpdate), recordEffectDuration()) : runWithFiberInDEV(finishedWork, callComponentDidUpdateInDEV, finishedWork, finishedRoot, prevProps, current, finishedRoot.__reactInternalSnapshotBeforeUpdate);
        }
        flags & 64 && commitClassCallbacks(finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 3:
        current = pushNestedEffectDurations();
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 64 && (flags = finishedWork.updateQueue, undefined !== flags)) {
          prevProps = undefined;
          if (undefined !== finishedWork.child) switch (finishedWork.child.tag) {
            case 27:
            case 5:
              prevProps = getPublicInstance(finishedWork.child.stateNode);
              break;
            case 1:
              prevProps = finishedWork.child.stateNode;
          }
          try {
            runWithFiberInDEV(finishedWork, commitCallbacks, flags, prevProps);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
        }
        finishedRoot.effectDuration += popNestedEffectDurations(current);
        break;
      case 27:
        supportsSingletons && undefined === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
      case 26:
      case 5:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (undefined === current) if (flags & 4) commitHostMount(finishedWork);else if (flags & 64) {
          finishedRoot = finishedWork.type;
          current = finishedWork.memoizedProps;
          prevProps = finishedWork.stateNode;
          try {
            runWithFiberInDEV(finishedWork, commitHydratedInstance, prevProps, finishedRoot, current, finishedWork);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
        }
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 12:
        if (flags & 4) {
          flags = pushNestedEffectDurations();
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          finishedRoot = finishedWork.stateNode;
          finishedRoot.effectDuration += bubbleNestedEffectDurations(flags);
          try {
            runWithFiberInDEV(finishedWork, commitProfiler, finishedWork, current, commitStartTime, finishedRoot.effectDuration);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
        } else recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        break;
      case 31:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
        break;
      case 13:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        flags & 64 && (finishedRoot = finishedWork.memoizedState, undefined !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, undefined !== finishedRoot && (flags = __partial((..._bindArgs33) => __applyFn(retryDehydratedSuspenseBoundary, ..._bindArgs33), undefined, finishedWork), registerSuspenseInstanceRetry(finishedRoot, flags))));
        break;
      case 22:
        flags = undefined !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
        if (!flags) {
          current = undefined !== current && undefined !== current.memoizedState || offscreenSubtreeWasHidden;
          prevProps = offscreenSubtreeIsHidden;
          prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = flags;
          (offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? (recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, 0 !== (finishedWork.subtreeFlags & 8772)), (finishedWork.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && 0.05 < componentEffectEndTime - componentEffectStartTime && logComponentReappeared(finishedWork, componentEffectStartTime, componentEffectEndTime)) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          offscreenSubtreeIsHidden = prevProps;
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
        }
        break;
      case 30:
        break;
      default:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
    }
    (finishedWork.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && ((componentEffectSpawnedUpdate || 0.05 < componentEffectDuration) && logComponentEffect(finishedWork, componentEffectStartTime, componentEffectEndTime, componentEffectDuration, componentEffectErrors), undefined === finishedWork.alternate && undefined !== finishedWork.return && undefined !== finishedWork.return.alternate && 0.05 < componentEffectEndTime - componentEffectStartTime && (isHydratingParent(finishedWork.return.alternate, finishedWork.return) || logComponentTrigger(finishedWork, componentEffectStartTime, componentEffectEndTime, "Mount")));
    popComponentEffectStart(prevEffectStart);
    popComponentEffectDuration(prevEffectDuration);
    componentEffectErrors = prevEffectErrors;
    componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
  }
  function detachFiberAfterEffects(fiber) {
    let alternate;
    alternate = fiber.alternate;
    undefined !== alternate && (fiber.alternate = undefined, detachFiberAfterEffects(alternate));
    fiber.child = undefined;
    fiber.deletions = undefined;
    fiber.sibling = undefined;
    5 === fiber.tag && (alternate = fiber.stateNode, undefined !== alternate && detachDeletedInstance(alternate));
    fiber.stateNode = undefined;
    fiber._debugOwner = undefined;
    fiber.return = undefined;
    fiber.dependencies = undefined;
    fiber.memoizedProps = undefined;
    fiber.memoizedState = undefined;
    fiber.pendingProps = undefined;
    fiber.stateNode = undefined;
    fiber.updateQueue = undefined;
  }
  function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
    for (parent = parent.child; undefined !== parent;) commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
  }
  function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
    let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, prevHostParent, prevHostParentIsContainer;
    if (injectedHook && "function" === typeOfJS(injectedHook.onCommitFiberUnmount)) try {
      injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
    } catch (err) {
      hasLoggedError || (hasLoggedError = !0, console.error("React instrumentation encountered an error: %o", err));
    }
    prevEffectStart = pushComponentEffectStart();
    prevEffectDuration = pushComponentEffectDuration();
    prevEffectErrors = pushComponentEffectErrors();
    prevEffectDidSpawnUpdate = pushComponentEffectDidSpawnUpdate();
    switch (deletedFiber.tag) {
      case 26:
        if (supportsResources) {
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          deletedFiber.memoizedState ? releaseResource(deletedFiber.memoizedState) : deletedFiber.stateNode && unmountHoistable(deletedFiber.stateNode);
          break;
        }
      case 27:
        if (supportsSingletons) {
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          prevHostParent = hostParent;
          prevHostParentIsContainer = hostParentIsContainer;
          isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = !1);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          runWithFiberInDEV(deletedFiber, releaseSingletonInstance, deletedFiber.stateNode);
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          break;
        }
      case 5:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
      case 6:
        if (supportsMutation) {
          if (prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer, hostParent = undefined, recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber), hostParent = prevHostParent, hostParentIsContainer = prevHostParentIsContainer, undefined !== hostParent) if (hostParentIsContainer) try {
            runWithFiberInDEV(deletedFiber, removeChildFromContainer, hostParent, deletedFiber.stateNode);
          } catch (__error) {
            captureCommitPhaseError(deletedFiber, nearestMountedAncestor, __error);
          } else try {
            runWithFiberInDEV(deletedFiber, removeChild, hostParent, deletedFiber.stateNode);
          } catch (__error) {
            captureCommitPhaseError(deletedFiber, nearestMountedAncestor, __error);
          }
        } else recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        break;
      case 18:
        supportsMutation && undefined !== hostParent && (hostParentIsContainer ? clearSuspenseBoundaryFromContainer(hostParent, deletedFiber.stateNode) : clearSuspenseBoundary(hostParent, deletedFiber.stateNode));
        break;
      case 4:
        supportsMutation ? (prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer, hostParent = deletedFiber.stateNode.containerInfo, hostParentIsContainer = !0, recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber), hostParent = prevHostParent, hostParentIsContainer = prevHostParentIsContainer) : (supportsPersistence && commitHostPortalContainerChildren(deletedFiber.stateNode, deletedFiber, createContainerChildSet()), recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        commitHookEffectListUnmount(Insertion, deletedFiber, nearestMountedAncestor);
        offscreenSubtreeWasHidden || commitHookLayoutUnmountEffects(deletedFiber, nearestMountedAncestor, Layout);
        recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        break;
      case 1:
        offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeOfJS(prevHostParent.componentWillUnmount) && safelyCallComponentWillUnmount(deletedFiber, nearestMountedAncestor, prevHostParent));
        recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        break;
      case 21:
        recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        break;
      case 22:
        offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || undefined !== deletedFiber.memoizedState;
        recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
        offscreenSubtreeWasHidden = prevHostParent;
        break;
      default:
        recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
    }
    (deletedFiber.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && (componentEffectSpawnedUpdate || 0.05 < componentEffectDuration) && logComponentEffect(deletedFiber, componentEffectStartTime, componentEffectEndTime, componentEffectDuration, componentEffectErrors);
    popComponentEffectStart(prevEffectStart);
    popComponentEffectDuration(prevEffectDuration);
    componentEffectErrors = prevEffectErrors;
    componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
  }
  function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
    if (supportsHydration && undefined === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, undefined !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, undefined !== finishedRoot))) {
      finishedRoot = finishedRoot.dehydrated;
      try {
        runWithFiberInDEV(finishedWork, commitHydratedActivityInstance, finishedRoot);
      } catch (__error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }
  }
  function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
    if (supportsHydration && undefined === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, undefined !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, undefined !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, undefined !== finishedRoot)))) try {
      runWithFiberInDEV(finishedWork, commitHydratedSuspenseInstance, finishedRoot);
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function getRetryCache(finishedWork) {
    let retryCache;
    switch (finishedWork.tag) {
      case 31:
      case 13:
      case 19:
        retryCache = finishedWork.stateNode;
        undefined === retryCache && (retryCache = finishedWork.stateNode = __new(PossiblyWeakSet));
        return retryCache;
      case 22:
        return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, undefined === retryCache && (retryCache = finishedWork._retryCache = __new(PossiblyWeakSet)), retryCache;
      default:
        throw Error(__cat(__cat("Unexpected Suspense handler tag (", finishedWork.tag), "). This is a bug in React."));
    }
  }
  function attachSuspenseRetryListeners(finishedWork, wakeables) {
    let retryCache;
    retryCache = getRetryCache(finishedWork);
    __forEach(wakeables, function (wakeable) {
      let retry;
      if (!retryCache.has(wakeable)) {
        retryCache.add(wakeable);
        if (isDevToolsPresent) if (undefined !== inProgressLanes && undefined !== inProgressRoot) restorePendingUpdaters(inProgressRoot, inProgressLanes);else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
        retry = __partial((..._bindArgs34) => __applyFn(resolveRetryWakeable, ..._bindArgs34), undefined, finishedWork, wakeable);
        wakeable.then(retry, retry);
      }
    });
  }
  function recursivelyTraverseMutationEffects(root_jscomp_0, parentFiber) {
    let deletions, i, root, returnFiber, deletedFiber, prevEffectStart, parent;
    deletions = parentFiber.deletions;
    if (undefined !== deletions) for (i = 0; i < __len(deletions); i++) {
      root = root_jscomp_0;
      returnFiber = parentFiber;
      deletedFiber = deletions[i];
      prevEffectStart = pushComponentEffectStart();
      if (supportsMutation) {
        parent = returnFiber;
        {
          let __lb_9 = false,
            __lc_9 = false;
          while (!__lb_9) {
            __lc_9 = false;
            while (undefined !== parent) {
              {
                switch (parent.tag) {
                  case 27:
                    if (supportsSingletons) {
                      if (isSingletonScope(parent.type)) {
                        hostParent = parent.stateNode;
                        hostParentIsContainer = !1;
                        {
                          __lb_9 = true;
                          break;
                        }
                      }
                      break;
                    }
                  case 5:
                    hostParent = parent.stateNode;
                    hostParentIsContainer = !1;
                    {
                      __lb_9 = true;
                      break;
                    }
                  case 3:
                  case 4:
                    hostParent = parent.stateNode.containerInfo;
                    hostParentIsContainer = !0;
                    {
                      __lb_9 = true;
                      break;
                    }
                }
                parent = parent.return;
              }
              ;
            }
            if (__lc_9) {
              __lc_9 = false;
              ;
              continue;
            }
            break;
          }
        }
        if (undefined === hostParent) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        commitDeletionEffectsOnFiber(root, returnFiber, deletedFiber);
        hostParent = undefined;
        hostParentIsContainer = !1;
      } else commitDeletionEffectsOnFiber(root, returnFiber, deletedFiber);
      (deletedFiber.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && 0.05 < componentEffectEndTime - componentEffectStartTime && logComponentTrigger(deletedFiber, componentEffectStartTime, componentEffectEndTime, "Unmount");
      popComponentEffectStart(prevEffectStart);
      root = deletedFiber;
      returnFiber = root.alternate;
      undefined !== returnFiber && (returnFiber.return = undefined);
      root.return = undefined;
    }
    if (parentFiber.subtreeFlags & 13886) for (parentFiber = parentFiber.child; undefined !== parentFiber;) commitMutationEffectsOnFiber(parentFiber, root_jscomp_0), parentFiber = parentFiber.sibling;
  }
  function commitMutationEffectsOnFiber(finishedWork, root) {
    let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, current, flags, hoistableRoot, previousHoistableRoot, wasHidden, prevOffscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden, instance, instance_jscomp_0;
    prevEffectStart = pushComponentEffectStart();
    prevEffectDuration = pushComponentEffectDuration();
    prevEffectErrors = pushComponentEffectErrors();
    prevEffectDidSpawnUpdate = pushComponentEffectDidSpawnUpdate();
    current = finishedWork.alternate;
    flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (commitHookEffectListUnmount(Insertion | HasEffect, finishedWork, finishedWork.return), commitHookEffectListMount(Insertion | HasEffect, finishedWork), commitHookLayoutUnmountEffects(finishedWork, finishedWork.return, Layout | HasEffect));
        break;
      case 1:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || undefined === current || safelyDetachRef(current, current.return));
        flags & 64 && offscreenSubtreeIsHidden && (flags = finishedWork.updateQueue, undefined !== flags && (current = flags.callbacks, undefined !== current && (root = flags.shared.hiddenCallbacks, flags.shared.hiddenCallbacks = undefined === root ? current : __concat(root, current))));
        break;
      case 26:
        if (supportsResources) {
          hoistableRoot = currentHoistableRoot;
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || undefined === current || safelyDetachRef(current, current.return));
          flags & 4 && (flags = undefined !== current ? current.memoizedState : undefined, root = finishedWork.memoizedState, undefined === current ? undefined === root ? undefined === finishedWork.stateNode ? finishedWork.stateNode = hydrateHoistable(hoistableRoot, finishedWork.type, finishedWork.memoizedProps, finishedWork) : mountHoistable(hoistableRoot, finishedWork.type, finishedWork.stateNode) : finishedWork.stateNode = acquireResource(hoistableRoot, root, finishedWork.memoizedProps) : flags !== root ? (undefined === flags ? undefined !== current.stateNode && unmountHoistable(current.stateNode) : releaseResource(flags), undefined === root ? mountHoistable(hoistableRoot, finishedWork.type, finishedWork.stateNode) : acquireResource(hoistableRoot, root, finishedWork.memoizedProps)) : undefined === root && undefined !== finishedWork.stateNode && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps));
          break;
        }
      case 27:
        if (supportsSingletons) {
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || undefined === current || safelyDetachRef(current, current.return));
          undefined !== current && flags & 4 && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
          break;
        }
      case 5:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || undefined === current || safelyDetachRef(current, current.return));
        if (supportsMutation) {
          if (finishedWork.flags & 32) {
            root = finishedWork.stateNode;
            try {
              runWithFiberInDEV(finishedWork, resetTextContent, root);
            } catch (__error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
          }
          flags & 4 && finishedWork.stateNode !== undefined && (root = finishedWork.memoizedProps, commitHostUpdate(finishedWork, root, undefined !== current ? current.memoizedProps : root));
          flags & 1024 && (needsFormReset = !0, "form" !== finishedWork.type && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
        } else supportsPersistence && undefined !== finishedWork.alternate && (finishedWork.alternate.stateNode = finishedWork.stateNode);
        break;
      case 6:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        if (flags & 4 && supportsMutation) {
          if (undefined === finishedWork.stateNode) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          flags = finishedWork.memoizedProps;
          current = undefined !== current ? current.memoizedProps : flags;
          root = finishedWork.stateNode;
          try {
            runWithFiberInDEV(finishedWork, commitTextUpdate, root, current, flags);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
        }
        break;
      case 3:
        hoistableRoot = pushNestedEffectDurations();
        if (supportsResources) {
          prepareToCommitHoistables();
          previousHoistableRoot = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(root.containerInfo);
          recursivelyTraverseMutationEffects(root, finishedWork);
          currentHoistableRoot = previousHoistableRoot;
        } else recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        if (flags & 4) {
          if (supportsMutation && supportsHydration && undefined !== current && current.memoizedState.isDehydrated) try {
            runWithFiberInDEV(finishedWork, commitHydratedContainer, root.containerInfo);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
          if (supportsPersistence) {
            flags = root.containerInfo;
            current = root.pendingChildren;
            try {
              runWithFiberInDEV(finishedWork, replaceContainerChildren, flags, current);
            } catch (__error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
          }
        }
        needsFormReset && (needsFormReset = !1, recursivelyResetForms(finishedWork));
        root.effectDuration += popNestedEffectDurations(hoistableRoot);
        break;
      case 4:
        supportsResources ? (current = currentHoistableRoot, currentHoistableRoot = getHoistableRoot(finishedWork.stateNode.containerInfo), recursivelyTraverseMutationEffects(root, finishedWork), commitReconciliationEffects(finishedWork), currentHoistableRoot = current) : (recursivelyTraverseMutationEffects(root, finishedWork), commitReconciliationEffects(finishedWork));
        flags & 4 && supportsPersistence && commitHostPortalContainerChildren(finishedWork.stateNode, finishedWork, finishedWork.stateNode.pendingChildren);
        break;
      case 12:
        flags = pushNestedEffectDurations();
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        finishedWork.stateNode.effectDuration += bubbleNestedEffectDurations(flags);
        break;
      case 31:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (flags = finishedWork.updateQueue, undefined !== flags && (finishedWork.updateQueue = undefined, attachSuspenseRetryListeners(finishedWork, flags)));
        break;
      case 13:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        finishedWork.child.flags & 8192 && undefined !== finishedWork.memoizedState !== (undefined !== current && undefined !== current.memoizedState) && (globalMostRecentFallbackTime = now_1());
        flags & 4 && (flags = finishedWork.updateQueue, undefined !== flags && (finishedWork.updateQueue = undefined, attachSuspenseRetryListeners(finishedWork, flags)));
        break;
      case 22:
        hoistableRoot = undefined !== finishedWork.memoizedState;
        wasHidden = undefined !== current && undefined !== current.memoizedState;
        prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden;
        prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
        offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || hoistableRoot;
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || wasHidden;
        recursivelyTraverseMutationEffects(root, finishedWork);
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
        offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
        wasHidden && !hoistableRoot && !prevOffscreenSubtreeIsHidden && !prevOffscreenSubtreeWasHidden && (finishedWork.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && 0.05 < componentEffectEndTime - componentEffectStartTime && logComponentReappeared(finishedWork, componentEffectStartTime, componentEffectEndTime);
        commitReconciliationEffects(finishedWork);
        if (flags & 8192 && (root = finishedWork.stateNode, root._visibility = hoistableRoot ? root._visibility & ~OffscreenVisible : root._visibility | OffscreenVisible, !hoistableRoot || undefined === current || wasHidden || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || (recursivelyTraverseDisappearLayoutEffects(finishedWork), (finishedWork.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && 0.05 < componentEffectEndTime - componentEffectStartTime && logComponentTrigger(finishedWork, componentEffectStartTime, componentEffectEndTime, "Disconnect")), supportsMutation)) {
          let __lb_8 = false,
            __lc_8 = false;
          while (!__lb_8) {
            if (current = undefined, supportsMutation) for (root = finishedWork;;) {
              if (5 === root.tag || supportsResources && 26 === root.tag) {
                if (undefined === current) {
                  wasHidden = current = root;
                  try {
                    previousHoistableRoot = wasHidden.stateNode, hoistableRoot ? runWithFiberInDEV(wasHidden, hideInstance, previousHoistableRoot) : runWithFiberInDEV(wasHidden, unhideInstance, wasHidden.stateNode, wasHidden.memoizedProps);
                  } catch (__error) {
                    captureCommitPhaseError(wasHidden, wasHidden.return, __error);
                  }
                }
              } else if (6 === root.tag) {
                if (undefined === current) {
                  wasHidden = root;
                  try {
                    instance = wasHidden.stateNode;
                    hoistableRoot ? runWithFiberInDEV(wasHidden, hideTextInstance, instance) : runWithFiberInDEV(wasHidden, unhideTextInstance, instance, wasHidden.memoizedProps);
                  } catch (__error) {
                    captureCommitPhaseError(wasHidden, wasHidden.return, __error);
                  }
                }
              } else if (18 === root.tag) {
                if (undefined === current) {
                  wasHidden = root;
                  try {
                    instance_jscomp_0 = wasHidden.stateNode;
                    hoistableRoot ? runWithFiberInDEV(wasHidden, hideDehydratedBoundary, instance_jscomp_0) : runWithFiberInDEV(wasHidden, unhideDehydratedBoundary, wasHidden.stateNode);
                  } catch (__error) {
                    captureCommitPhaseError(wasHidden, wasHidden.return, __error);
                  }
                }
              } else if ((22 !== root.tag && 23 !== root.tag || undefined === root.memoizedState || root === finishedWork) && undefined !== root.child) {
                root.child.return = root;
                root = root.child;
                continue;
              }
              if (root === finishedWork) {
                __lb_8 = true;
                break;
              }
              for (; undefined === root.sibling;) {
                if (undefined === root.return || root.return === finishedWork) {
                  __lb_8 = true;
                  break;
                }
                current === root && (current = undefined);
                root = root.return;
              }
              if (__lb_8 || __lc_8) {
                break;
              }
              current === root && (current = undefined);
              root.sibling.return = root.return;
              root = root.sibling;
            }
            break;
          }
        }
        flags & 4 && (flags = finishedWork.updateQueue, undefined !== flags && (current = flags.retryQueue, undefined !== current && (flags.retryQueue = undefined, attachSuspenseRetryListeners(finishedWork, current))));
        break;
      case 19:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (flags = finishedWork.updateQueue, undefined !== flags && (finishedWork.updateQueue = undefined, attachSuspenseRetryListeners(finishedWork, flags)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        recursivelyTraverseMutationEffects(root, finishedWork), commitReconciliationEffects(finishedWork);
    }
    (finishedWork.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && ((componentEffectSpawnedUpdate || 0.05 < componentEffectDuration) && logComponentEffect(finishedWork, componentEffectStartTime, componentEffectEndTime, componentEffectDuration, componentEffectErrors), undefined === finishedWork.alternate && undefined !== finishedWork.return && undefined !== finishedWork.return.alternate && 0.05 < componentEffectEndTime - componentEffectStartTime && (isHydratingParent(finishedWork.return.alternate, finishedWork.return) || logComponentTrigger(finishedWork, componentEffectStartTime, componentEffectEndTime, "Mount")));
    popComponentEffectStart(prevEffectStart);
    popComponentEffectDuration(prevEffectDuration);
    componentEffectErrors = prevEffectErrors;
    componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
  }
  function commitReconciliationEffects(finishedWork) {
    let flags;
    flags = finishedWork.flags;
    if (flags & 2) {
      try {
        runWithFiberInDEV(finishedWork, commitPlacement, finishedWork);
      } catch (__error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
      finishedWork.flags &= -3;
    }
    flags & 4096 && (finishedWork.flags &= -4097);
  }
  function recursivelyResetForms(parentFiber) {
    let fiber;
    if (parentFiber.subtreeFlags & 1024) for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
      fiber = parentFiber;
      recursivelyResetForms(fiber);
      5 === fiber.tag && fiber.flags & 1024 && resetFormInstance(fiber.stateNode);
      parentFiber = parentFiber.sibling;
    }
  }
  function recursivelyTraverseLayoutEffects(root, parentFiber) {
    if (parentFiber.subtreeFlags & 8772) for (parentFiber = parentFiber.child; undefined !== parentFiber;) commitLayoutEffectOnFiber(root, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
  }
  function disappearLayoutEffects(finishedWork) {
    let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, instance;
    prevEffectStart = pushComponentEffectStart();
    prevEffectDuration = pushComponentEffectDuration();
    prevEffectErrors = pushComponentEffectErrors();
    prevEffectDidSpawnUpdate = pushComponentEffectDidSpawnUpdate();
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        commitHookLayoutUnmountEffects(finishedWork, finishedWork.return, Layout);
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      case 1:
        safelyDetachRef(finishedWork, finishedWork.return);
        instance = finishedWork.stateNode;
        "function" === typeOfJS(instance.componentWillUnmount) && safelyCallComponentWillUnmount(finishedWork, finishedWork.return, instance);
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      case 27:
        supportsSingletons && runWithFiberInDEV(finishedWork, releaseSingletonInstance, finishedWork.stateNode);
      case 26:
      case 5:
        safelyDetachRef(finishedWork, finishedWork.return);
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      case 22:
        undefined === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      case 30:
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      default:
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
    }
    (finishedWork.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && (componentEffectSpawnedUpdate || 0.05 < componentEffectDuration) && logComponentEffect(finishedWork, componentEffectStartTime, componentEffectEndTime, componentEffectDuration, componentEffectErrors);
    popComponentEffectStart(prevEffectStart);
    popComponentEffectDuration(prevEffectDuration);
    componentEffectErrors = prevEffectErrors;
    componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
  }
  function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
    for (parentFiber = parentFiber.child; undefined !== parentFiber;) disappearLayoutEffects(parentFiber), parentFiber = parentFiber.sibling;
  }
  function reappearLayoutEffects(finishedRoot, current, finishedWork, includeWorkInProgressEffects) {
    let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, flags;
    prevEffectStart = pushComponentEffectStart();
    prevEffectDuration = pushComponentEffectDuration();
    prevEffectErrors = pushComponentEffectErrors();
    prevEffectDidSpawnUpdate = pushComponentEffectDidSpawnUpdate();
    flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
        commitHookLayoutEffects(finishedWork, Layout);
        break;
      case 1:
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
        current = finishedWork.stateNode;
        "function" === typeOfJS(current.componentDidMount) && runWithFiberInDEV(finishedWork, callComponentDidMountInDEV, finishedWork, current);
        current = finishedWork.updateQueue;
        if (undefined !== current) {
          finishedRoot = finishedWork.stateNode;
          try {
            runWithFiberInDEV(finishedWork, commitHiddenCallbacks, current, finishedRoot);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
        }
        includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 27:
        supportsSingletons && commitHostSingletonAcquisition(finishedWork);
      case 26:
      case 5:
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
        includeWorkInProgressEffects && undefined === current && flags & 4 && commitHostMount(finishedWork);
        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 12:
        if (includeWorkInProgressEffects && flags & 4) {
          flags = pushNestedEffectDurations();
          recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
          includeWorkInProgressEffects = finishedWork.stateNode;
          includeWorkInProgressEffects.effectDuration += bubbleNestedEffectDurations(flags);
          try {
            runWithFiberInDEV(finishedWork, commitProfiler, finishedWork, current, commitStartTime, includeWorkInProgressEffects.effectDuration);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
        } else recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
        break;
      case 31:
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
        includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
        break;
      case 13:
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
        includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        break;
      case 22:
        undefined === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 30:
        break;
      default:
        recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
    }
    (finishedWork.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && (componentEffectSpawnedUpdate || 0.05 < componentEffectDuration) && logComponentEffect(finishedWork, componentEffectStartTime, componentEffectEndTime, componentEffectDuration, componentEffectErrors);
    popComponentEffectStart(prevEffectStart);
    popComponentEffectDuration(prevEffectDuration);
    componentEffectErrors = prevEffectErrors;
    componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
  }
  function recursivelyTraverseReappearLayoutEffects(finishedRoot, parentFiber, includeWorkInProgressEffects) {
    includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
    for (parentFiber = parentFiber.child; undefined !== parentFiber;) reappearLayoutEffects(finishedRoot, parentFiber.alternate, parentFiber, includeWorkInProgressEffects), parentFiber = parentFiber.sibling;
  }
  function commitOffscreenPassiveMountEffects(current, finishedWork) {
    let previousCache;
    previousCache = undefined;
    undefined !== current && undefined !== current.memoizedState && undefined !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
    current = undefined;
    undefined !== finishedWork.memoizedState && undefined !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
    current !== previousCache && (current !== undefined && retainCache(current), previousCache !== undefined && releaseCache(previousCache));
  }
  function commitCachePassiveMountEffect(current, finishedWork) {
    current = undefined;
    undefined !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
    finishedWork = finishedWork.memoizedState.cache;
    finishedWork !== current && (retainCache(finishedWork), current !== undefined && releaseCache(current));
  }
  function recursivelyTraversePassiveMountEffects(root, parentFiber, committedLanes, committedTransitions, endTime) {
    let nextSibling;
    if (parentFiber.subtreeFlags & 10256 || 0 !== parentFiber.actualDuration && (undefined === parentFiber.alternate || parentFiber.alternate.child !== parentFiber.child)) for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
      nextSibling = parentFiber.sibling;
      commitPassiveMountOnFiber(root, parentFiber, committedLanes, committedTransitions, undefined !== nextSibling ? nextSibling.actualStartTime : endTime);
      parentFiber = nextSibling;
    }
  }
  function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime) {
    let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, prevDeepEquality, flags, prevProfilerEffectDuration, wasInHydratedSubtree;
    prevEffectStart = pushComponentEffectStart();
    prevEffectDuration = pushComponentEffectDuration();
    prevEffectErrors = pushComponentEffectErrors();
    prevEffectDidSpawnUpdate = pushComponentEffectDidSpawnUpdate();
    prevDeepEquality = alreadyWarnedForDeepEquality;
    flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        (finishedWork.mode & 2) !== NoMode && 0 < finishedWork.actualStartTime && 0 !== (finishedWork.flags & 1) && logComponentRender(finishedWork, finishedWork.actualStartTime, endTime, inHydratedSubtree, committedLanes);
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
        flags & 2048 && commitHookPassiveMountEffects(finishedWork, Passive | HasEffect);
        break;
      case 1:
        (finishedWork.mode & 2) !== NoMode && 0 < finishedWork.actualStartTime && (0 !== (finishedWork.flags & 128) ? logComponentErrored(finishedWork, finishedWork.actualStartTime, endTime, __arrNew()) : 0 !== (finishedWork.flags & 1) && logComponentRender(finishedWork, finishedWork.actualStartTime, endTime, inHydratedSubtree, committedLanes));
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
        break;
      case 3:
        prevProfilerEffectDuration = pushNestedEffectDurations();
        wasInHydratedSubtree = inHydratedSubtree;
        inHydratedSubtree = undefined !== finishedWork.alternate && finishedWork.alternate.memoizedState.isDehydrated && 0 === (finishedWork.flags & 256);
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
        inHydratedSubtree = wasInHydratedSubtree;
        flags & 2048 && (committedLanes = undefined, undefined !== finishedWork.alternate && (committedLanes = finishedWork.alternate.memoizedState.cache), committedTransitions = finishedWork.memoizedState.cache, committedTransitions !== committedLanes && (retainCache(committedTransitions), committedLanes !== undefined && releaseCache(committedLanes)));
        finishedRoot.passiveEffectDuration += popNestedEffectDurations(prevProfilerEffectDuration);
        break;
      case 12:
        if (flags & 2048) {
          flags = pushNestedEffectDurations();
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
          finishedRoot = finishedWork.stateNode;
          finishedRoot.passiveEffectDuration += bubbleNestedEffectDurations(flags);
          try {
            runWithFiberInDEV(finishedWork, commitProfilerPostCommitImpl, finishedWork, finishedWork.alternate, commitStartTime, finishedRoot.passiveEffectDuration);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
        } else recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
        break;
      case 31:
        flags = inHydratedSubtree;
        prevProfilerEffectDuration = undefined !== finishedWork.alternate ? finishedWork.alternate.memoizedState : undefined;
        wasInHydratedSubtree = finishedWork.memoizedState;
        undefined !== prevProfilerEffectDuration && undefined === wasInHydratedSubtree ? (wasInHydratedSubtree = finishedWork.deletions, undefined !== wasInHydratedSubtree && 0 < __len(wasInHydratedSubtree) && 18 === wasInHydratedSubtree[0].tag ? (inHydratedSubtree = !1, prevProfilerEffectDuration = prevProfilerEffectDuration.hydrationErrors, undefined !== prevProfilerEffectDuration && logComponentErrored(finishedWork, finishedWork.actualStartTime, endTime, prevProfilerEffectDuration)) : inHydratedSubtree = !0) : inHydratedSubtree = !1;
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
        inHydratedSubtree = flags;
        break;
      case 13:
        flags = inHydratedSubtree;
        prevProfilerEffectDuration = undefined !== finishedWork.alternate ? finishedWork.alternate.memoizedState : undefined;
        wasInHydratedSubtree = finishedWork.memoizedState;
        undefined === prevProfilerEffectDuration || undefined === prevProfilerEffectDuration.dehydrated || undefined !== wasInHydratedSubtree && undefined !== wasInHydratedSubtree.dehydrated ? inHydratedSubtree = !1 : (wasInHydratedSubtree = finishedWork.deletions, undefined !== wasInHydratedSubtree && 0 < __len(wasInHydratedSubtree) && 18 === wasInHydratedSubtree[0].tag ? (inHydratedSubtree = !1, prevProfilerEffectDuration = prevProfilerEffectDuration.hydrationErrors, undefined !== prevProfilerEffectDuration && logComponentErrored(finishedWork, finishedWork.actualStartTime, endTime, prevProfilerEffectDuration)) : inHydratedSubtree = !0);
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
        inHydratedSubtree = flags;
        break;
      case 23:
        break;
      case 22:
        wasInHydratedSubtree = finishedWork.stateNode;
        prevProfilerEffectDuration = finishedWork.alternate;
        undefined !== finishedWork.memoizedState ? wasInHydratedSubtree._visibility & OffscreenPassiveEffectsConnected ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime) : wasInHydratedSubtree._visibility & OffscreenPassiveEffectsConnected ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime) : (wasInHydratedSubtree._visibility |= OffscreenPassiveEffectsConnected, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, 0 !== (finishedWork.subtreeFlags & 10256) || 0 !== finishedWork.actualDuration && (undefined === finishedWork.alternate || finishedWork.alternate.child !== finishedWork.child), endTime), (finishedWork.mode & 2) === NoMode || inHydratedSubtree || (finishedRoot = finishedWork.actualStartTime, 0 <= finishedRoot && 0.05 < endTime - finishedRoot && logComponentReappeared(finishedWork, finishedRoot, endTime), 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && 0.05 < componentEffectEndTime - componentEffectStartTime && logComponentReappeared(finishedWork, componentEffectStartTime, componentEffectEndTime)));
        flags & 2048 && commitOffscreenPassiveMountEffects(prevProfilerEffectDuration, finishedWork);
        break;
      case 24:
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
        flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
        break;
      default:
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
    }
    if ((finishedWork.mode & 2) !== NoMode) {
      if (finishedRoot = !inHydratedSubtree && undefined === finishedWork.alternate && undefined !== finishedWork.return && undefined !== finishedWork.return.alternate) committedLanes = finishedWork.actualStartTime, 0 <= committedLanes && 0.05 < endTime - committedLanes && logComponentTrigger(finishedWork, committedLanes, endTime, "Mount");
      0 <= componentEffectStartTime && 0 <= componentEffectEndTime && ((componentEffectSpawnedUpdate || 0.05 < componentEffectDuration) && logComponentEffect(finishedWork, componentEffectStartTime, componentEffectEndTime, componentEffectDuration, componentEffectErrors), finishedRoot && 0.05 < componentEffectEndTime - componentEffectStartTime && logComponentTrigger(finishedWork, componentEffectStartTime, componentEffectEndTime, "Mount"));
    }
    popComponentEffectStart(prevEffectStart);
    popComponentEffectDuration(prevEffectDuration);
    componentEffectErrors = prevEffectErrors;
    componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
    alreadyWarnedForDeepEquality = prevDeepEquality;
  }
  function recursivelyTraverseReconnectPassiveEffects(finishedRoot, parentFiber, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime) {
    let nextSibling;
    includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || 0 !== parentFiber.actualDuration && (undefined === parentFiber.alternate || parentFiber.alternate.child !== parentFiber.child));
    for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
      nextSibling = parentFiber.sibling;
      reconnectPassiveEffects(finishedRoot, parentFiber, committedLanes, committedTransitions, includeWorkInProgressEffects, undefined !== nextSibling ? nextSibling.actualStartTime : endTime);
      parentFiber = nextSibling;
    }
  }
  function reconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime) {
    let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, prevDeepEquality, flags, _instance2;
    prevEffectStart = pushComponentEffectStart();
    prevEffectDuration = pushComponentEffectDuration();
    prevEffectErrors = pushComponentEffectErrors();
    prevEffectDidSpawnUpdate = pushComponentEffectDidSpawnUpdate();
    prevDeepEquality = alreadyWarnedForDeepEquality;
    includeWorkInProgressEffects && (finishedWork.mode & 2) !== NoMode && 0 < finishedWork.actualStartTime && 0 !== (finishedWork.flags & 1) && logComponentRender(finishedWork, finishedWork.actualStartTime, endTime, inHydratedSubtree, committedLanes);
    flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime);
        commitHookPassiveMountEffects(finishedWork, Passive);
        break;
      case 23:
        break;
      case 22:
        _instance2 = finishedWork.stateNode;
        undefined !== finishedWork.memoizedState ? _instance2._visibility & OffscreenPassiveEffectsConnected ? recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime) : (_instance2._visibility |= OffscreenPassiveEffectsConnected, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime));
        includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
        break;
      case 24:
        recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime);
        includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
        break;
      default:
        recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime);
    }
    (finishedWork.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && (componentEffectSpawnedUpdate || 0.05 < componentEffectDuration) && logComponentEffect(finishedWork, componentEffectStartTime, componentEffectEndTime, componentEffectDuration, componentEffectErrors);
    popComponentEffectStart(prevEffectStart);
    popComponentEffectDuration(prevEffectDuration);
    componentEffectErrors = prevEffectErrors;
    componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
    alreadyWarnedForDeepEquality = prevDeepEquality;
  }
  function recursivelyTraverseAtomicPassiveEffects(finishedRoot_jscomp_0, parentFiber, committedLanes_jscomp_0, committedTransitions_jscomp_0, endTime_jscomp_0) {
    let child, finishedRoot, committedLanes, committedTransitions, endTime, prevDeepEquality, flags;
    if (parentFiber.subtreeFlags & 10256 || 0 !== parentFiber.actualDuration && (undefined === parentFiber.alternate || parentFiber.alternate.child !== parentFiber.child)) for (child = parentFiber.child; undefined !== child;) {
      parentFiber = child.sibling;
      finishedRoot = finishedRoot_jscomp_0;
      committedLanes = committedLanes_jscomp_0;
      committedTransitions = committedTransitions_jscomp_0;
      endTime = undefined !== parentFiber ? parentFiber.actualStartTime : endTime_jscomp_0;
      prevDeepEquality = alreadyWarnedForDeepEquality;
      (child.mode & 2) !== NoMode && 0 < child.actualStartTime && 0 !== (child.flags & 1) && logComponentRender(child, child.actualStartTime, endTime, inHydratedSubtree, committedLanes);
      flags = child.flags;
      switch (child.tag) {
        case 22:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, child, committedLanes, committedTransitions, endTime);
          flags & 2048 && commitOffscreenPassiveMountEffects(child.alternate, child);
          break;
        case 24:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, child, committedLanes, committedTransitions, endTime);
          flags & 2048 && commitCachePassiveMountEffect(child.alternate, child);
          break;
        default:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, child, committedLanes, committedTransitions, endTime);
      }
      alreadyWarnedForDeepEquality = prevDeepEquality;
      child = parentFiber;
    }
  }
  function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
    if (parentFiber.subtreeFlags & suspenseyCommitFlag) for (parentFiber = parentFiber.child; undefined !== parentFiber;) accumulateSuspenseyCommitOnFiber(parentFiber, committedLanes, suspendedState), parentFiber = parentFiber.sibling;
  }
  function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
    let instance, __type;
    switch (fiber.tag) {
      case 26:
        recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
        if (fiber.flags & suspenseyCommitFlag) if (undefined !== fiber.memoizedState) suspendResource(suspendedState, currentHoistableRoot, fiber.memoizedState, fiber.memoizedProps);else {
          instance = fiber.stateNode;
          __type = fiber.type;
          fiber = fiber.memoizedProps;
          ((committedLanes & 335544128) === committedLanes || maySuspendCommitInSyncRender(__type, fiber)) && suspendInstance(suspendedState, instance, __type, fiber);
        }
        break;
      case 5:
        recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
        fiber.flags & suspenseyCommitFlag && (instance = fiber.stateNode, __type = fiber.type, fiber = fiber.memoizedProps, ((committedLanes & 335544128) === committedLanes || maySuspendCommitInSyncRender(__type, fiber)) && suspendInstance(suspendedState, instance, __type, fiber));
        break;
      case 3:
      case 4:
        supportsResources ? (instance = currentHoistableRoot, currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo), recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState), currentHoistableRoot = instance) : recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
        break;
      case 22:
        undefined === fiber.memoizedState && (instance = fiber.alternate, undefined !== instance && undefined !== instance.memoizedState ? (instance = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState), suspenseyCommitFlag = instance) : recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState));
        break;
      default:
        recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
    }
  }
  function detachAlternateSiblings(parentFiber) {
    let previousFiber;
    previousFiber = parentFiber.alternate;
    if (undefined !== previousFiber && (parentFiber = previousFiber.child, undefined !== parentFiber)) {
      previousFiber.child = undefined;
      do previousFiber = parentFiber.sibling, parentFiber.sibling = undefined, parentFiber = previousFiber; while (undefined !== parentFiber);
    }
  }
  function recursivelyTraversePassiveUnmountEffects(parentFiber) {
    let deletions, i, childToDelete, prevEffectStart;
    deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (undefined !== deletions) for (i = 0; i < __len(deletions); i++) {
        childToDelete = deletions[i];
        prevEffectStart = pushComponentEffectStart();
        nextEffect = childToDelete;
        commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
        (childToDelete.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && 0.05 < componentEffectEndTime - componentEffectStartTime && logComponentTrigger(childToDelete, componentEffectStartTime, componentEffectEndTime, "Unmount");
        popComponentEffectStart(prevEffectStart);
      }
      detachAlternateSiblings(parentFiber);
    }
    if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; undefined !== parentFiber;) commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
  }
  function commitPassiveUnmountOnFiber(finishedWork) {
    let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, prevProfilerEffectDuration;
    prevEffectStart = pushComponentEffectStart();
    prevEffectDuration = pushComponentEffectDuration();
    prevEffectErrors = pushComponentEffectErrors();
    prevEffectDidSpawnUpdate = pushComponentEffectDidSpawnUpdate();
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        finishedWork.flags & 2048 && commitHookPassiveUnmountEffects(finishedWork, finishedWork.return, Passive | HasEffect);
        break;
      case 3:
        prevProfilerEffectDuration = pushNestedEffectDurations();
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        finishedWork.stateNode.passiveEffectDuration += popNestedEffectDurations(prevProfilerEffectDuration);
        break;
      case 12:
        prevProfilerEffectDuration = pushNestedEffectDurations();
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        finishedWork.stateNode.passiveEffectDuration += bubbleNestedEffectDurations(prevProfilerEffectDuration);
        break;
      case 22:
        prevProfilerEffectDuration = finishedWork.stateNode;
        undefined !== finishedWork.memoizedState && prevProfilerEffectDuration._visibility & OffscreenPassiveEffectsConnected && (undefined === finishedWork.return || 13 !== finishedWork.return.tag) ? (prevProfilerEffectDuration._visibility &= ~OffscreenPassiveEffectsConnected, recursivelyTraverseDisconnectPassiveEffects(finishedWork), (finishedWork.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && 0.05 < componentEffectEndTime - componentEffectStartTime && logComponentTrigger(finishedWork, componentEffectStartTime, componentEffectEndTime, "Disconnect")) : recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      default:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
    }
    (finishedWork.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && (componentEffectSpawnedUpdate || 0.05 < componentEffectDuration) && logComponentEffect(finishedWork, componentEffectStartTime, componentEffectEndTime, componentEffectDuration, componentEffectErrors);
    popComponentEffectStart(prevEffectStart);
    popComponentEffectDuration(prevEffectDuration);
    componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
    componentEffectErrors = prevEffectErrors;
  }
  function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
    let deletions, i, childToDelete, prevEffectStart;
    deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (undefined !== deletions) for (i = 0; i < __len(deletions); i++) {
        childToDelete = deletions[i];
        prevEffectStart = pushComponentEffectStart();
        nextEffect = childToDelete;
        commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
        (childToDelete.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && 0.05 < componentEffectEndTime - componentEffectStartTime && logComponentTrigger(childToDelete, componentEffectStartTime, componentEffectEndTime, "Unmount");
        popComponentEffectStart(prevEffectStart);
      }
      detachAlternateSiblings(parentFiber);
    }
    for (parentFiber = parentFiber.child; undefined !== parentFiber;) disconnectPassiveEffect(parentFiber), parentFiber = parentFiber.sibling;
  }
  function disconnectPassiveEffect(finishedWork) {
    let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, instance;
    prevEffectStart = pushComponentEffectStart();
    prevEffectDuration = pushComponentEffectDuration();
    prevEffectErrors = pushComponentEffectErrors();
    prevEffectDidSpawnUpdate = pushComponentEffectDidSpawnUpdate();
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        commitHookPassiveUnmountEffects(finishedWork, finishedWork.return, Passive);
        recursivelyTraverseDisconnectPassiveEffects(finishedWork);
        break;
      case 22:
        instance = finishedWork.stateNode;
        instance._visibility & OffscreenPassiveEffectsConnected && (instance._visibility &= ~OffscreenPassiveEffectsConnected, recursivelyTraverseDisconnectPassiveEffects(finishedWork));
        break;
      default:
        recursivelyTraverseDisconnectPassiveEffects(finishedWork);
    }
    (finishedWork.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && (componentEffectSpawnedUpdate || 0.05 < componentEffectDuration) && logComponentEffect(finishedWork, componentEffectStartTime, componentEffectEndTime, componentEffectDuration, componentEffectErrors);
    popComponentEffectStart(prevEffectStart);
    popComponentEffectDuration(prevEffectDuration);
    componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
    componentEffectErrors = prevEffectErrors;
  }
  function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor_jscomp_0) {
    let fiber, current, nearestMountedAncestor, prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate;
    for (; undefined !== nextEffect;) {
      fiber = nextEffect;
      current = fiber;
      nearestMountedAncestor = nearestMountedAncestor_jscomp_0;
      prevEffectStart = pushComponentEffectStart();
      prevEffectDuration = pushComponentEffectDuration();
      prevEffectErrors = pushComponentEffectErrors();
      prevEffectDidSpawnUpdate = pushComponentEffectDidSpawnUpdate();
      switch (current.tag) {
        case 0:
        case 11:
        case 15:
          commitHookPassiveUnmountEffects(current, nearestMountedAncestor, Passive);
          break;
        case 23:
        case 22:
          undefined !== current.memoizedState && undefined !== current.memoizedState.cachePool && (nearestMountedAncestor = current.memoizedState.cachePool.pool, nearestMountedAncestor !== undefined && retainCache(nearestMountedAncestor));
          break;
        case 24:
          releaseCache(current.memoizedState.cache);
      }
      (current.mode & 2) !== NoMode && 0 <= componentEffectStartTime && 0 <= componentEffectEndTime && (componentEffectSpawnedUpdate || 0.05 < componentEffectDuration) && logComponentEffect(current, componentEffectStartTime, componentEffectEndTime, componentEffectDuration, componentEffectErrors);
      popComponentEffectStart(prevEffectStart);
      popComponentEffectDuration(prevEffectDuration);
      componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
      componentEffectErrors = prevEffectErrors;
      current = fiber.child;
      if (undefined !== current) current.return = fiber, nextEffect = current;else {
        fiber = deletedSubtreeRoot;
        let __lb_7 = false,
          __lc_7 = false;
        while (!__lb_7) {
          __lc_7 = false;
          while (undefined !== nextEffect) {
            {
              current = nextEffect;
              prevEffectStart = current.sibling;
              prevEffectDuration = current.return;
              detachFiberAfterEffects(current);
              if (current === fiber) {
                nextEffect = undefined;
                {
                  __lb_7 = true;
                  break;
                }
              }
              if (undefined !== prevEffectStart) {
                prevEffectStart.return = prevEffectDuration;
                nextEffect = prevEffectStart;
                {
                  __lb_7 = true;
                  break;
                }
              }
              nextEffect = prevEffectDuration;
            }
            ;
          }
          if (__lc_7) {
            __lc_7 = false;
            ;
            continue;
          }
          break;
        }
      }
    }
  }
  function findFiberRootForHostRoot(hostRoot) {
    let maybeFiber;
    maybeFiber = getInstanceFromNode(hostRoot);
    if (maybeFiber !== undefined) {
      if ("string" !== typeOfJS(maybeFiber.memoizedProps["data-testname"])) throw Error("Invalid host root specified. Should be either a React container or a node with a testname attribute.");
      return maybeFiber;
    }
    hostRoot = findFiberRoot(hostRoot);
    if (undefined === hostRoot) throw Error("Could not find React container within specified host subtree.");
    return hostRoot.stateNode.current;
  }
  function matchSelector(fiber_jscomp_0, selector) {
    let tag, fiber, tag_jscomp_0, selectorIndex, selector_jscomp_0;
    tag = fiber_jscomp_0.tag;
    switch (selector.$$typeof) {
      case COMPONENT_TYPE:
        if (fiber_jscomp_0.type === selector.value) return !0;
        break;
      case HAS_PSEUDO_CLASS_TYPE:
        {
          let __lb_6 = false,
            __lc_6 = false;
          while (!__lb_6) {
            {
              selector = selector.value;
              fiber_jscomp_0 = __arrNew(fiber_jscomp_0, 0);
              for (tag = 0; tag < __len(fiber_jscomp_0);) {
                fiber = fiber_jscomp_0[tag++];
                tag_jscomp_0 = fiber.tag;
                selectorIndex = fiber_jscomp_0[tag++];
                selector_jscomp_0 = selector[selectorIndex];
                if (5 !== tag_jscomp_0 && 26 !== tag_jscomp_0 && 27 !== tag_jscomp_0 || !isHiddenSubtree(fiber)) {
                  for (; selector_jscomp_0 !== undefined && matchSelector(fiber, selector_jscomp_0);) selectorIndex++, selector_jscomp_0 = selector[selectorIndex];
                  if (selectorIndex === __len(selector)) {
                    selector = !0;
                    {
                      __lb_6 = true;
                      break;
                    }
                  } else for (fiber = fiber.child; undefined !== fiber;) __push(fiber_jscomp_0, fiber, selectorIndex), fiber = fiber.sibling;
                }
              }
              if (__lb_6 || __lc_6) {
                break;
              }
              selector = !1;
            }
            break;
          }
        }
        return selector;
      case ROLE_TYPE:
        if ((5 === tag || 26 === tag || 27 === tag) && matchAccessibilityRole(fiber_jscomp_0.stateNode, selector.value)) return !0;
        break;
      case TEXT_TYPE:
        if (5 === tag || 6 === tag || 26 === tag || 27 === tag) if (fiber_jscomp_0 = getTextContent(fiber_jscomp_0), undefined !== fiber_jscomp_0 && 0 <= __indexOf(fiber_jscomp_0, selector.value)) return !0;
        break;
      case TEST_NAME_TYPE:
        if (5 === tag || 26 === tag || 27 === tag) if (fiber_jscomp_0 = fiber_jscomp_0.memoizedProps["data-testname"], "string" === typeOfJS(fiber_jscomp_0) && __toLowerCase(fiber_jscomp_0) === __toLowerCase(selector.value)) return !0;
        break;
      default:
        throw Error("Invalid selector type specified.");
    }
    return !1;
  }
  function selectorToString(selector) {
    switch (selector.$$typeof) {
      case COMPONENT_TYPE:
        return __cat(__cat("<", getComponentNameFromType(selector.value) || "Unknown"), ">");
      case HAS_PSEUDO_CLASS_TYPE:
        return __cat(__cat(":has(", selectorToString(selector) || ""), ")");
      case ROLE_TYPE:
        return __cat(__cat('[role="', selector.value), '"]');
      case TEXT_TYPE:
        return __cat(__cat('"', selector.value), '"');
      case TEST_NAME_TYPE:
        return __cat(__cat('[data-testname="', selector.value), '"]');
      default:
        throw Error("Invalid selector type specified.");
    }
  }
  function findPaths(root, selectors) {
    let matchingFibers, index, fiber, tag, selectorIndex, selector;
    matchingFibers = __arrNew();
    root = __arrNew(root, 0);
    for (index = 0; index < __len(root);) {
      fiber = root[index++];
      tag = fiber.tag;
      selectorIndex = root[index++];
      selector = selectors[selectorIndex];
      if (5 !== tag && 26 !== tag && 27 !== tag || !isHiddenSubtree(fiber)) {
        for (; selector !== undefined && matchSelector(fiber, selector);) selectorIndex++, selector = selectors[selectorIndex];
        if (selectorIndex === __len(selectors)) __push(matchingFibers, fiber);else for (fiber = fiber.child; undefined !== fiber;) __push(root, fiber, selectorIndex), fiber = fiber.sibling;
      }
    }
    return matchingFibers;
  }
  function findAllNodes(hostRoot, selectors) {
    let index, node, tag;
    if (!supportsTestSelectors) throw Error("Test selector API is not supported by this renderer.");
    hostRoot = findFiberRootForHostRoot(hostRoot);
    hostRoot = findPaths(hostRoot, selectors);
    selectors = __arrNew();
    hostRoot = __arrFrom(hostRoot);
    for (index = 0; index < __len(hostRoot);) {
      node = hostRoot[index++];
      tag = node.tag;
      if (5 === tag || 26 === tag || 27 === tag) isHiddenSubtree(node) || __push(selectors, node.stateNode);else for (node = node.child; undefined !== node;) __push(hostRoot, node), node = node.sibling;
    }
    return selectors;
  }
  function onCommitRoot() {
    supportsTestSelectors && __forEach(commitHooks, function (commitHook) {
      return commitHook();
    });
  }
  function isConcurrentActEnvironment() {
    let isReactActEnvironmentGlobal;
    isReactActEnvironmentGlobal = "undefined" !== typeOfJS(IS_REACT_ACT_ENVIRONMENT) ? IS_REACT_ACT_ENVIRONMENT : void 0;
    isReactActEnvironmentGlobal || undefined === ReactSharedInternals.actQueue || console.error("The current testing environment is not configured to support act(...)");
    return isReactActEnvironmentGlobal;
  }
  function requestUpdateLane(fiber) {
    let transition;
    if ((executionContext & RenderContext) !== NoContext && 0 !== workInProgressRootRenderLanes) return workInProgressRootRenderLanes & -workInProgressRootRenderLanes;
    transition = ReactSharedInternals.T;
    return undefined !== transition ? (transition._updatedFibers || (transition._updatedFibers = __new(Set)), transition._updatedFibers.add(fiber), requestTransitionLane()) : resolveUpdatePriority();
  }
  function requestDeferredLane() {
    let lane;
    if (0 === workInProgressDeferredLane) if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
      lane = nextTransitionDeferredLane;
      nextTransitionDeferredLane <<= 1;
      0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
      workInProgressDeferredLane = lane;
    } else workInProgressDeferredLane = 536870912;
    lane = suspenseHandlerStackCursor.current;
    undefined !== lane && (lane.flags |= 32);
    return workInProgressDeferredLane;
  }
  function scheduleUpdateOnFiber(root, fiber, lane) {
    isRunningInsertionEffect && console.error("useInsertionEffect must not schedule updates.");
    isFlushingPassiveEffects && (didScheduleUpdateDuringPassiveEffects = !0);
    if (root === workInProgressRoot && (workInProgressSuspendedReason === SuspendedOnData || workInProgressSuspendedReason === SuspendedOnAction) || undefined !== root.cancelPendingCommit) prepareFreshStack(root, 0), markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, !1);
    markRootUpdated_1(root, lane);
    if ((executionContext & RenderContext) !== NoContext && root === workInProgressRoot) {
      if (isRendering) switch (fiber.tag) {
        case 0:
        case 11:
        case 15:
          root = workInProgress && getComponentNameFromFiber(workInProgress) || "Unknown";
          didWarnAboutUpdateInRenderForAnotherComponent.has(root) || (didWarnAboutUpdateInRenderForAnotherComponent.add(root), fiber = getComponentNameFromFiber(fiber) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", fiber, root, root));
          break;
        case 1:
          didWarnAboutUpdateInRender || (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), didWarnAboutUpdateInRender = !0);
      }
    } else isDevToolsPresent && addFiberToLanesMap(root, fiber, lane), warnIfUpdatesNotWrappedWithActDEV(fiber), root === workInProgressRoot && ((executionContext & RenderContext) === NoContext && (workInProgressRootInterleavedUpdatedLanes |= lane), workInProgressRootExitStatus === RootSuspendedWithDelay && markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, !1)), ensureRootIsScheduled(root);
  }
  function performWorkOnRoot(root, lanes, forceSync) {
    let yieldedFiber, yieldEndTime, startTime, renderWasConcurrent, errorRetryLanes, wasRootDehydrated;
    if ((executionContext & (RenderContext | CommitContext)) !== NoContext) throw Error("Should not already be working.");
    if (0 !== workInProgressRootRenderLanes && undefined !== workInProgress) {
      yieldedFiber = workInProgress;
      yieldEndTime = now_1();
      switch (yieldReason) {
        case SuspendedOnImmediate:
        case SuspendedOnData:
          startTime = yieldStartTime;
          supportsUserTiming && ((yieldedFiber = yieldedFiber._debugTask) ? yieldedFiber.run(__partial((..._bindArgs35) => __applyFn(console.timeStamp, ..._bindArgs35), console, "Suspended", startTime, yieldEndTime, "Components \u269b", void 0, "primary-light")) : console.timeStamp("Suspended", startTime, yieldEndTime, "Components \u269b", void 0, "primary-light"));
          break;
        case SuspendedOnAction:
          startTime = yieldStartTime;
          supportsUserTiming && ((yieldedFiber = yieldedFiber._debugTask) ? yieldedFiber.run(__partial((..._bindArgs36) => __applyFn(console.timeStamp, ..._bindArgs36), console, "Action", startTime, yieldEndTime, "Components \u269b", void 0, "primary-light")) : console.timeStamp("Action", startTime, yieldEndTime, "Components \u269b", void 0, "primary-light"));
          break;
        default:
          supportsUserTiming && (yieldedFiber = yieldEndTime - yieldStartTime, 3 > yieldedFiber || console.timeStamp("Blocked", yieldStartTime, yieldEndTime, "Components \u269b", void 0, 5 > yieldedFiber ? "primary-light" : 10 > yieldedFiber ? "primary" : 100 > yieldedFiber ? "primary-dark" : "error"));
      }
    }
    startTime = (forceSync = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root.expiredLanes) || checkIfRootIsPrerendering(root, lanes)) ? renderRootConcurrent(root, lanes) : renderRootSync(root, lanes, !0);
    renderWasConcurrent = forceSync;
    do {
      if (startTime === RootInProgress) {
        workInProgressRootIsPrerendering && !forceSync && markRootSuspended(root, lanes, 0, !1);
        lanes = workInProgressSuspendedReason;
        yieldStartTime = now();
        yieldReason = lanes;
        break;
      } else {
        yieldedFiber = now_1();
        yieldEndTime = root.current.alternate;
        if (renderWasConcurrent && !isRenderConsistentWithExternalStores(yieldEndTime)) {
          setCurrentTrackFromLanes(lanes);
          yieldEndTime = renderStartTime;
          startTime = yieldedFiber;
          !supportsUserTiming || startTime <= yieldEndTime || (workInProgressUpdateTask ? workInProgressUpdateTask.run(__partial((..._bindArgs37) => __applyFn(console.timeStamp, ..._bindArgs37), console, "Teared Render", yieldEndTime, startTime, currentTrack, "Scheduler \u269b", "error")) : console.timeStamp("Teared Render", yieldEndTime, startTime, currentTrack, "Scheduler \u269b", "error"));
          finalizeRender(lanes, yieldedFiber);
          startTime = renderRootSync(root, lanes, !1);
          renderWasConcurrent = !1;
          continue;
        }
        if (startTime === RootErrored) {
          renderWasConcurrent = lanes;
          if (root.errorRecoveryDisabledLanes & renderWasConcurrent) {
            errorRetryLanes = 0;
          } else errorRetryLanes = root.pendingLanes & -536870913, errorRetryLanes = 0 !== errorRetryLanes ? errorRetryLanes : errorRetryLanes & 536870912 ? 536870912 : 0;
          if (0 !== errorRetryLanes) {
            setCurrentTrackFromLanes(lanes);
            logErroredRenderPhase(renderStartTime, yieldedFiber, lanes, workInProgressUpdateTask);
            finalizeRender(lanes, yieldedFiber);
            lanes = errorRetryLanes;
            {
              let __lb_5 = false,
                __lc_5 = false;
              while (!__lb_5) {
                {
                  yieldedFiber = root;
                  startTime = renderWasConcurrent;
                  renderWasConcurrent = workInProgressRootConcurrentErrors;
                  wasRootDehydrated = supportsHydration && yieldedFiber.current.memoizedState.isDehydrated;
                  wasRootDehydrated && (prepareFreshStack(yieldedFiber, errorRetryLanes).flags |= 256);
                  errorRetryLanes = renderRootSync(yieldedFiber, errorRetryLanes, !1);
                  if (errorRetryLanes !== RootErrored) {
                    if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                      yieldedFiber.errorRecoveryDisabledLanes |= startTime;
                      workInProgressRootInterleavedUpdatedLanes |= startTime;
                      startTime = RootSuspendedWithDelay;
                      {
                        __lb_5 = true;
                        break;
                      }
                    }
                    yieldedFiber = workInProgressRootRecoverableErrors;
                    workInProgressRootRecoverableErrors = renderWasConcurrent;
                    undefined !== yieldedFiber && (undefined === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = yieldedFiber : __applyFn(workInProgressRootRecoverableErrors.push, workInProgressRootRecoverableErrors, yieldedFiber));
                  }
                  startTime = errorRetryLanes;
                }
                break;
              }
            }
            renderWasConcurrent = !1;
            if (startTime !== RootErrored) continue;else yieldedFiber = now_1();
          }
        }
        if (startTime === RootFatalErrored) {
          setCurrentTrackFromLanes(lanes);
          logErroredRenderPhase(renderStartTime, yieldedFiber, lanes, workInProgressUpdateTask);
          finalizeRender(lanes, yieldedFiber);
          prepareFreshStack(root, 0);
          markRootSuspended(root, lanes, 0, !0);
          break;
        }
        {
          let __lb_4 = false,
            __lc_4 = false;
          while (!__lb_4) {
            {
              forceSync = root;
              switch (startTime) {
                case RootInProgress:
                case RootFatalErrored:
                  throw Error("Root did not complete. This is a bug in React.");
                case RootSuspendedWithDelay:
                  if ((lanes & 4194048) !== lanes) break;
                case RootSuspendedAtTheShell:
                  setCurrentTrackFromLanes(lanes);
                  logSuspendedRenderPhase(renderStartTime, yieldedFiber, lanes, workInProgressUpdateTask);
                  finalizeRender(lanes, yieldedFiber);
                  yieldEndTime = lanes;
                  0 !== (yieldEndTime & 127) ? blockingSuspendedTime = yieldedFiber : 0 !== (yieldEndTime & 4194048) && (transitionSuspendedTime = yieldedFiber);
                  markRootSuspended(forceSync, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
                  {
                    __lb_4 = true;
                    break;
                  }
                case RootErrored:
                  workInProgressRootRecoverableErrors = undefined;
                  break;
                case RootSuspended:
                case RootCompleted:
                  break;
                default:
                  throw Error("Unknown root exit status.");
              }
              if (undefined !== ReactSharedInternals.actQueue) commitRoot(forceSync, yieldEndTime, lanes, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, startTime, undefined, undefined, renderStartTime, yieldedFiber);else {
                if ((lanes & 62914560) === lanes && (renderWasConcurrent = __cat(globalMostRecentFallbackTime, FALLBACK_THROTTLE_MS) - now_1(), 10 < renderWasConcurrent)) {
                  markRootSuspended(forceSync, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
                  if (0 !== getNextLanes(forceSync, 0, !0)) {
                    __lb_4 = true;
                    break;
                  }
                  pendingEffectsLanes = lanes;
                  forceSync.timeoutHandle = scheduleTimeout(__partial((..._bindArgs38) => __applyFn(commitRootWhenReady, ..._bindArgs38), undefined, forceSync, yieldEndTime, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, startTime, "Throttled", renderStartTime, yieldedFiber), renderWasConcurrent);
                  {
                    __lb_4 = true;
                    break;
                  }
                }
                commitRootWhenReady(forceSync, yieldEndTime, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, startTime, undefined, renderStartTime, yieldedFiber);
              }
            }
            break;
          }
        }
      }
      break;
    } while (1);
    ensureRootIsScheduled(root);
  }
  function commitRootWhenReady(root, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
    let subtreeFlags, suspendedState;
    root.timeoutHandle = noTimeout;
    subtreeFlags = finishedWork.subtreeFlags;
    suspendedState = undefined;
    if (subtreeFlags & 8192 || 16785408 === (subtreeFlags & 16785408)) if (suspendedState = startSuspendingCommit(), accumulateSuspenseyCommitOnFiber(finishedWork, lanes, suspendedState), subtreeFlags = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now_1() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now_1() : 0, subtreeFlags = waitForCommitToBeReady(suspendedState, subtreeFlags), undefined !== subtreeFlags) {
      pendingEffectsLanes = lanes;
      root.cancelPendingCommit = subtreeFlags(__partial((..._bindArgs39) => __applyFn(commitRoot, ..._bindArgs39), undefined, root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, exitStatus, suspendedState, getSuspendedCommitReason(suspendedState, root.containerInfo), completedRenderStartTime, completedRenderEndTime));
      markRootSuspended(root, lanes, spawnedLane, !didSkipSuspendedSiblings);
      return;
    }
    commitRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, exitStatus, suspendedState, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime);
  }
  function isRenderConsistentWithExternalStores(finishedWork) {
    let node, tag, i, check, getSnapshot;
    for (node = finishedWork;;) {
      tag = node.tag;
      if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, undefined !== tag && (tag = tag.stores, undefined !== tag))) for (i = 0; i < __len(tag); i++) {
        check = tag[i];
        getSnapshot = check.getSnapshot;
        check = check.value;
        try {
          if (!objectIs(getSnapshot(), check)) return !1;
        } catch (__error) {
          return !1;
        }
      }
      tag = node.child;
      if (node.subtreeFlags & 16384 && undefined !== tag) tag.return = node, node = tag;else {
        if (node === finishedWork) break;
        for (; undefined === node.sibling;) {
          if (undefined === node.return || node.return === finishedWork) return !0;
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }
    return !0;
  }
  function markRootSuspended(root, suspendedLanes, spawnedLane, didAttemptEntireTree) {
    let lanes, index, lane;
    suspendedLanes &= ~workInProgressRootPingedLanes;
    suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
    root.suspendedLanes |= suspendedLanes;
    root.pingedLanes &= ~suspendedLanes;
    didAttemptEntireTree && (root.warmLanes |= suspendedLanes);
    didAttemptEntireTree = root.expirationTimes;
    for (lanes = suspendedLanes; 0 < lanes;) {
      index = 31 - clz32(lanes);
      lane = 1 << index;
      didAttemptEntireTree[index] = -1;
      lanes &= ~lane;
    }
    0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, suspendedLanes);
  }
  function flushSyncWork() {
    return (executionContext & (RenderContext | CommitContext)) === NoContext ? (flushSyncWorkAcrossRoots_impl(0, !1), !1) : !0;
  }
  function isAlreadyRendering() {
    return (executionContext & (RenderContext | CommitContext)) !== NoContext;
  }
  function resetWorkInProgressStack() {
    let interruptedWork;
    if (undefined !== workInProgress) {
      if (workInProgressSuspendedReason === NotSuspended) {
        interruptedWork = workInProgress.return;
      } else interruptedWork = workInProgress, resetContextDependencies(), resetHooksOnUnwind(interruptedWork), thenableState_1 = undefined, thenableIndexCounter_1 = 0, interruptedWork = workInProgress;
      for (; undefined !== interruptedWork;) unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
      workInProgress = undefined;
    }
  }
  function finalizeRender(lanes, finalizationTime) {
    0 !== (lanes & 127) && (blockingClampTime = finalizationTime);
    0 !== (lanes & 4194048) && (transitionClampTime = finalizationTime);
  }
  function prepareFreshStack(root, lanes) {
    let previousRenderStartTime, endTime, debugTask, color, label, eventTime, eventType, eventIsRepeat, isSpawnedUpdate, isPingedUpdate, color_jscomp_0;
    supportsUserTiming && (console.timeStamp("Blocking Track", 0.003, 0.003, "Blocking", "Scheduler \u269b", "primary-light"), console.timeStamp("Transition Track", 0.003, 0.003, "Transition", "Scheduler \u269b", "primary-light"), console.timeStamp("Suspense Track", 0.003, 0.003, "Suspense", "Scheduler \u269b", "primary-light"), console.timeStamp("Idle Track", 0.003, 0.003, "Idle", "Scheduler \u269b", "primary-light"));
    previousRenderStartTime = renderStartTime;
    renderStartTime = now();
    if (0 !== workInProgressRootRenderLanes && 0 < previousRenderStartTime) {
      setCurrentTrackFromLanes(workInProgressRootRenderLanes);
      if (workInProgressRootExitStatus === RootSuspended || workInProgressRootExitStatus === RootSuspendedWithDelay) logSuspendedRenderPhase(previousRenderStartTime, renderStartTime, lanes, workInProgressUpdateTask);else {
        endTime = renderStartTime;
        debugTask = workInProgressUpdateTask;
        if (supportsUserTiming && !(endTime <= previousRenderStartTime)) {
          color = (lanes & 738197653) === lanes ? "tertiary-dark" : "primary-dark";
          label = (lanes & 536870912) === lanes ? "Prewarm" : (lanes & 201326741) === lanes ? "Interrupted Hydration" : "Interrupted Render";
          debugTask ? debugTask.run(__partial((..._bindArgs40) => __applyFn(console.timeStamp, ..._bindArgs40), console, label, previousRenderStartTime, endTime, currentTrack, "Scheduler \u269b", color)) : console.timeStamp(label, previousRenderStartTime, endTime, currentTrack, "Scheduler \u269b", color);
        }
      }
      finalizeRender(workInProgressRootRenderLanes, renderStartTime);
    }
    previousRenderStartTime = workInProgressUpdateTask;
    workInProgressUpdateTask = undefined;
    if (0 !== (lanes & 127)) {
      workInProgressUpdateTask = blockingUpdateTask;
      debugTask = 0 <= blockingUpdateTime && blockingUpdateTime < blockingClampTime ? blockingClampTime : blockingUpdateTime;
      endTime = 0 <= blockingEventTime && blockingEventTime < blockingClampTime ? blockingClampTime : blockingEventTime;
      color = 0 <= endTime ? endTime : 0 <= debugTask ? debugTask : renderStartTime;
      0 <= blockingSuspendedTime && (setCurrentTrackFromLanes(2), logSuspendedWithDelayPhase(blockingSuspendedTime, color, lanes, previousRenderStartTime));
      previousRenderStartTime = debugTask;
      eventTime = endTime;
      eventType = blockingEventType;
      eventIsRepeat = 0 < blockingEventRepeatTime;
      isSpawnedUpdate = 1 === blockingUpdateType;
      isPingedUpdate = 2 === blockingUpdateType;
      debugTask = renderStartTime;
      endTime = blockingUpdateTask;
      color = blockingUpdateMethodName;
      label = blockingUpdateComponentName;
      if (supportsUserTiming) {
        currentTrack = "Blocking";
        0 < previousRenderStartTime ? previousRenderStartTime > debugTask && (previousRenderStartTime = debugTask) : previousRenderStartTime = debugTask;
        0 < eventTime ? eventTime > previousRenderStartTime && (eventTime = previousRenderStartTime) : eventTime = previousRenderStartTime;
        if (undefined !== eventType && previousRenderStartTime > eventTime) {
          color_jscomp_0 = eventIsRepeat ? "secondary-light" : "warning";
          endTime ? endTime.run(__partial((..._bindArgs41) => __applyFn(console.timeStamp, ..._bindArgs41), console, eventIsRepeat ? "Consecutive" : __cat("Event: ", eventType), eventTime, previousRenderStartTime, currentTrack, "Scheduler \u269b", color_jscomp_0)) : console.timeStamp(eventIsRepeat ? "Consecutive" : __cat("Event: ", eventType), eventTime, previousRenderStartTime, currentTrack, "Scheduler \u269b", color_jscomp_0);
        }
        debugTask > previousRenderStartTime && (eventTime = isSpawnedUpdate ? "error" : (lanes & 738197653) === lanes ? "tertiary-light" : "primary-light", isSpawnedUpdate = isPingedUpdate ? "Promise Resolved" : isSpawnedUpdate ? "Cascading Update" : 5 < debugTask - previousRenderStartTime ? "Update Blocked" : "Update", isPingedUpdate = __arrNew(), label !== undefined && __push(isPingedUpdate, __arrNew("Component name", label)), color !== undefined && __push(isPingedUpdate, __arrNew("Method name", color)), previousRenderStartTime = {
          start: previousRenderStartTime,
          end: debugTask,
          detail: {
            devtools: {
              properties: isPingedUpdate,
              track: currentTrack,
              trackGroup: "Scheduler \u269b",
              color: eventTime
            }
          }
        }, endTime ? endTime.run(__partial((..._bindArgs42) => __applyFn(performance.measure, ..._bindArgs42), performance, isSpawnedUpdate, previousRenderStartTime)) : performance.measure(isSpawnedUpdate, previousRenderStartTime));
      }
      blockingUpdateTime = -1.1;
      blockingUpdateType = 0;
      blockingUpdateComponentName = blockingUpdateMethodName = undefined;
      blockingSuspendedTime = -1.1;
      blockingEventRepeatTime = blockingEventTime;
      blockingEventTime = -1.1;
      blockingClampTime = now();
    }
    0 !== (lanes & 4194048) && (workInProgressUpdateTask = transitionUpdateTask, debugTask = 0 <= transitionStartTime && transitionStartTime < transitionClampTime ? transitionClampTime : transitionStartTime, previousRenderStartTime = 0 <= transitionUpdateTime && transitionUpdateTime < transitionClampTime ? transitionClampTime : transitionUpdateTime, endTime = 0 <= transitionEventTime && transitionEventTime < transitionClampTime ? transitionClampTime : transitionEventTime, color = 0 <= endTime ? endTime : 0 <= previousRenderStartTime ? previousRenderStartTime : renderStartTime, 0 <= transitionSuspendedTime && (setCurrentTrackFromLanes(256), logSuspendedWithDelayPhase(transitionSuspendedTime, color, lanes, workInProgressUpdateTask)), isPingedUpdate = endTime, eventTime = transitionEventType, eventType = 0 < transitionEventRepeatTime, eventIsRepeat = 2 === transitionUpdateType, color = renderStartTime, endTime = transitionUpdateTask, label = transitionUpdateMethodName, isSpawnedUpdate = transitionUpdateComponentName, supportsUserTiming && (currentTrack = "Transition", 0 < previousRenderStartTime ? previousRenderStartTime > color && (previousRenderStartTime = color) : previousRenderStartTime = color, 0 < debugTask ? debugTask > previousRenderStartTime && (debugTask = previousRenderStartTime) : debugTask = previousRenderStartTime, 0 < isPingedUpdate ? isPingedUpdate > debugTask && (isPingedUpdate = debugTask) : isPingedUpdate = debugTask, debugTask > isPingedUpdate && undefined !== eventTime && (color_jscomp_0 = eventType ? "secondary-light" : "warning", endTime ? endTime.run(__partial((..._bindArgs43) => __applyFn(console.timeStamp, ..._bindArgs43), console, eventType ? "Consecutive" : __cat("Event: ", eventTime), isPingedUpdate, debugTask, currentTrack, "Scheduler \u269b", color_jscomp_0)) : console.timeStamp(eventType ? "Consecutive" : __cat("Event: ", eventTime), isPingedUpdate, debugTask, currentTrack, "Scheduler \u269b", color_jscomp_0)), previousRenderStartTime > debugTask && (endTime ? endTime.run(__partial((..._bindArgs44) => __applyFn(console.timeStamp, ..._bindArgs44), console, "Action", debugTask, previousRenderStartTime, currentTrack, "Scheduler \u269b", "primary-dark")) : console.timeStamp("Action", debugTask, previousRenderStartTime, currentTrack, "Scheduler \u269b", "primary-dark")), color > previousRenderStartTime && (debugTask = eventIsRepeat ? "Promise Resolved" : 5 < color - previousRenderStartTime ? "Update Blocked" : "Update", isPingedUpdate = __arrNew(), isSpawnedUpdate !== undefined && __push(isPingedUpdate, __arrNew("Component name", isSpawnedUpdate)), label !== undefined && __push(isPingedUpdate, __arrNew("Method name", label)), previousRenderStartTime = {
      start: previousRenderStartTime,
      end: color,
      detail: {
        devtools: {
          properties: isPingedUpdate,
          track: currentTrack,
          trackGroup: "Scheduler \u269b",
          color: "primary-light"
        }
      }
    }, endTime ? endTime.run(__partial((..._bindArgs45) => __applyFn(performance.measure, ..._bindArgs45), performance, debugTask, previousRenderStartTime)) : performance.measure(debugTask, previousRenderStartTime))), transitionUpdateTime = transitionStartTime = -1.1, transitionUpdateType = 0, transitionSuspendedTime = -1.1, transitionEventRepeatTime = transitionEventTime, transitionEventTime = -1.1, transitionClampTime = now());
    previousRenderStartTime = root.timeoutHandle;
    previousRenderStartTime !== noTimeout && (root.timeoutHandle = noTimeout, cancelTimeout(previousRenderStartTime));
    previousRenderStartTime = root.cancelPendingCommit;
    undefined !== previousRenderStartTime && (root.cancelPendingCommit = undefined, previousRenderStartTime());
    pendingEffectsLanes = 0;
    resetWorkInProgressStack();
    workInProgressRoot = root;
    workInProgress = previousRenderStartTime = createWorkInProgress(root.current, undefined);
    workInProgressRootRenderLanes = lanes;
    workInProgressSuspendedReason = NotSuspended;
    workInProgressThrownValue = undefined;
    workInProgressRootDidSkipSuspendedSiblings = !1;
    workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
    workInProgressRootDidAttachPingListener = !1;
    workInProgressRootExitStatus = RootInProgress;
    workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = 0;
    workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = undefined;
    workInProgressRootDidIncludeRecursiveRenderUpdate = !1;
    0 !== (lanes & 8) && (lanes |= lanes & 32);
    endTime = root.entangledLanes;
    if (0 !== endTime) for (root = root.entanglements, endTime &= lanes; 0 < endTime;) debugTask = 31 - clz32(endTime), color = 1 << debugTask, lanes |= root[debugTask], endTime &= ~color;
    entangledRenderLanes = lanes;
    finishQueueingConcurrentUpdates();
    root = getCurrentTime();
    1e3 < root - lastResetTime && (ReactSharedInternals.recentlyCreatedOwnerStacks = 0, lastResetTime = root);
    ReactStrictModeWarnings.discardPendingWarnings();
    return previousRenderStartTime;
  }
  function handleThrow(root, thrownValue) {
    let erroredWork;
    currentlyRenderingFiber = undefined;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    ReactSharedInternals.getCurrentStack = undefined;
    isRendering = !1;
    current = undefined;
    thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = SuspendedOnImmediate) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = SuspendedOnInstance) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? SuspendedOnHydration : undefined !== thrownValue && "object" === typeOfJS(thrownValue) && "function" === typeOfJS(thrownValue.then) ? SuspendedOnDeprecatedThrowPromise : SuspendedOnError;
    workInProgressThrownValue = thrownValue;
    erroredWork = workInProgress;
    undefined === erroredWork ? (workInProgressRootExitStatus = RootFatalErrored, logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current))) : erroredWork.mode & 2 && stopProfilerTimerIfRunningAndRecordDuration(erroredWork);
  }
  function shouldRemainOnPreviousScreen() {
    let handler;
    handler = suspenseHandlerStackCursor.current;
    return undefined === handler ? !0 : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? undefined === shellBoundary ? !0 : !1 : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : !1;
  }
  function pushDispatcher() {
    let prevDispatcher;
    prevDispatcher = ReactSharedInternals.H;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    return undefined === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
  }
  function pushAsyncDispatcher() {
    let prevAsyncDispatcher;
    prevAsyncDispatcher = ReactSharedInternals.A;
    ReactSharedInternals.A = DefaultAsyncDispatcher;
    return prevAsyncDispatcher;
  }
  function markRenderDerivedCause(fiber) {
    undefined === workInProgressUpdateTask && (workInProgressUpdateTask = fiber._debugTask === undefined ? undefined : fiber._debugTask);
  }
  function renderDidSuspendDelayIfPossible() {
    workInProgressRootExitStatus = RootSuspendedWithDelay;
    workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && undefined !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = !0);
    0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || undefined === workInProgressRoot || markRootSuspended(workInProgressRoot, workInProgressRootRenderLanes, workInProgressDeferredLane, !1);
  }
  function renderRootSync(root, lanes, shouldYieldForPrerendering) {
    let prevExecutionContext, prevDispatcher, prevAsyncDispatcher, memoizedUpdaters, unitOfWork, thrownValue, reason;
    prevExecutionContext = executionContext;
    executionContext |= RenderContext;
    prevDispatcher = pushDispatcher();
    prevAsyncDispatcher = pushAsyncDispatcher();
    if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
      if (isDevToolsPresent) {
        memoizedUpdaters = root.memoizedUpdaters;
        0 < memoizedUpdaters.size && (restorePendingUpdaters(root, workInProgressRootRenderLanes), memoizedUpdaters.clear());
        movePendingFibersToMemoized(root, lanes);
      }
      workInProgressTransitions = undefined;
      prepareFreshStack(root, lanes);
    }
    lanes = !1;
    memoizedUpdaters = workInProgressRootExitStatus;
    {
      let __lb_3 = false,
        __lc_3 = false;
      while (!__lb_3) {
        __lc_3 = false;
        do {
          try {
            if (workInProgressSuspendedReason !== NotSuspended && undefined !== workInProgress) {
              unitOfWork = workInProgress;
              thrownValue = workInProgressThrownValue;
              switch (workInProgressSuspendedReason) {
                case SuspendedOnHydration:
                  resetWorkInProgressStack();
                  memoizedUpdaters = RootSuspendedAtTheShell;
                  {
                    __lb_3 = true;
                    break;
                  }
                case SuspendedOnImmediate:
                case SuspendedOnData:
                case SuspendedOnAction:
                case SuspendedOnDeprecatedThrowPromise:
                  undefined === suspenseHandlerStackCursor.current && (lanes = !0);
                  reason = workInProgressSuspendedReason;
                  workInProgressSuspendedReason = NotSuspended;
                  workInProgressThrownValue = undefined;
                  throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
                  if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                    memoizedUpdaters = RootInProgress;
                    {
                      __lb_3 = true;
                      break;
                    }
                  }
                  break;
                default:
                  reason = workInProgressSuspendedReason, workInProgressSuspendedReason = NotSuspended, workInProgressThrownValue = undefined, throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
              }
            }
            workLoopSync();
            memoizedUpdaters = workInProgressRootExitStatus;
            break;
          } catch (thrownValue_4) {
            handleThrow(root, thrownValue_4);
          }
        } while (1);
        if (__lc_3) {
          __lc_3 = false;
          if (1) {
            continue;
          }
          break;
        }
        break;
      }
    }
    lanes && root.shellSuspendCounter++;
    resetContextDependencies();
    executionContext = prevExecutionContext;
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    undefined === workInProgress && (workInProgressRoot = undefined, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
    return memoizedUpdaters;
  }
  function workLoopSync() {
    for (; undefined !== workInProgress;) performUnitOfWork(workInProgress);
  }
  function renderRootConcurrent(root, lanes) {
    let prevExecutionContext, prevDispatcher, prevAsyncDispatcher, memoizedUpdaters, resource, hostFiber, __type, props, sibling, returnFiber;
    prevExecutionContext = executionContext;
    executionContext |= RenderContext;
    prevDispatcher = pushDispatcher();
    prevAsyncDispatcher = pushAsyncDispatcher();
    if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
      if (isDevToolsPresent) {
        memoizedUpdaters = root.memoizedUpdaters;
        0 < memoizedUpdaters.size && (restorePendingUpdaters(root, workInProgressRootRenderLanes), memoizedUpdaters.clear());
        movePendingFibersToMemoized(root, lanes);
      }
      workInProgressTransitions = undefined;
      workInProgressRootRenderTargetTime = __cat(now_1(), RENDER_TIMEOUT_MS);
      prepareFreshStack(root, lanes);
    } else workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
    {
      let __lb_2 = false,
        __lc_2 = false;
      while (!__lb_2) {
        __lc_2 = false;
        do {
          try {
            if (workInProgressSuspendedReason !== NotSuspended && undefined !== workInProgress) {
              let __lb_1 = false,
                __lc_1 = false;
              while (!__lb_1) {
                switch (lanes = workInProgress, memoizedUpdaters = workInProgressThrownValue, workInProgressSuspendedReason) {
                  case SuspendedOnError:
                    workInProgressSuspendedReason = NotSuspended;
                    workInProgressThrownValue = undefined;
                    throwAndUnwindWorkLoop(root, lanes, memoizedUpdaters, SuspendedOnError);
                    break;
                  case SuspendedOnData:
                  case SuspendedOnAction:
                    if (isThenableResolved(memoizedUpdaters)) {
                      workInProgressSuspendedReason = NotSuspended;
                      workInProgressThrownValue = undefined;
                      replaySuspendedUnitOfWork(lanes);
                      break;
                    }
                    lanes = function () {
                      workInProgressSuspendedReason !== SuspendedOnData && workInProgressSuspendedReason !== SuspendedOnAction || workInProgressRoot !== root || (workInProgressSuspendedReason = SuspendedAndReadyToContinue);
                      ensureRootIsScheduled(root);
                    };
                    memoizedUpdaters.then(lanes, lanes);
                    {
                      __lb_2 = true;
                      break;
                    }
                  case SuspendedOnImmediate:
                    workInProgressSuspendedReason = SuspendedAndReadyToContinue;
                    {
                      __lb_2 = true;
                      break;
                    }
                  case SuspendedOnInstance:
                    workInProgressSuspendedReason = SuspendedOnInstanceAndReadyToContinue;
                    {
                      __lb_2 = true;
                      break;
                    }
                  case SuspendedAndReadyToContinue:
                    isThenableResolved(memoizedUpdaters) ? (workInProgressSuspendedReason = NotSuspended, workInProgressThrownValue = undefined, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = NotSuspended, workInProgressThrownValue = undefined, throwAndUnwindWorkLoop(root, lanes, memoizedUpdaters, SuspendedAndReadyToContinue));
                    break;
                  case SuspendedOnInstanceAndReadyToContinue:
                    resource = undefined;
                    switch (workInProgress.tag) {
                      case 26:
                        resource = workInProgress.memoizedState;
                      case 5:
                      case 27:
                        hostFiber = workInProgress;
                        __type = hostFiber.type;
                        props = hostFiber.pendingProps;
                        if (resource ? preloadResource(resource) : preloadInstance(hostFiber.stateNode, __type, props)) {
                          workInProgressSuspendedReason = NotSuspended;
                          workInProgressThrownValue = undefined;
                          sibling = hostFiber.sibling;
                          if (undefined !== sibling) workInProgress = sibling;else {
                            returnFiber = hostFiber.return;
                            undefined !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = undefined;
                          }
                          {
                            __lb_1 = true;
                            break;
                          }
                        }
                        break;
                      default:
                        console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.");
                    }
                    workInProgressSuspendedReason = NotSuspended;
                    workInProgressThrownValue = undefined;
                    throwAndUnwindWorkLoop(root, lanes, memoizedUpdaters, SuspendedOnInstanceAndReadyToContinue);
                    break;
                  case SuspendedOnDeprecatedThrowPromise:
                    workInProgressSuspendedReason = NotSuspended;
                    workInProgressThrownValue = undefined;
                    throwAndUnwindWorkLoop(root, lanes, memoizedUpdaters, SuspendedOnDeprecatedThrowPromise);
                    break;
                  case SuspendedOnHydration:
                    resetWorkInProgressStack();
                    workInProgressRootExitStatus = RootSuspendedAtTheShell;
                    {
                      __lb_2 = true;
                      break;
                    }
                  default:
                    throw Error("Unexpected SuspendedReason. This is a bug in React.");
                }
                break;
              }
              if (__lb_2 || __lc_2) {
                break;
              }
            }
            if (__lb_2 || __lc_2) {
              break;
            }
            undefined !== ReactSharedInternals.actQueue ? workLoopSync() : workLoopConcurrentByScheduler();
            break;
          } catch (thrownValue_5) {
            handleThrow(root, thrownValue_5);
          }
        } while (1);
        if (__lc_2) {
          __lc_2 = false;
          if (1) {
            continue;
          }
          break;
        }
        break;
      }
    }
    resetContextDependencies();
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    executionContext = prevExecutionContext;
    if (undefined !== workInProgress) return RootInProgress;
    workInProgressRoot = undefined;
    workInProgressRootRenderLanes = 0;
    finishQueueingConcurrentUpdates();
    return workInProgressRootExitStatus;
  }
  function workLoopConcurrentByScheduler() {
    for (; undefined !== workInProgress && !shouldYield();) performUnitOfWork(workInProgress);
  }
  function performUnitOfWork(unitOfWork) {
    let current;
    current = unitOfWork.alternate;
    (unitOfWork.mode & 2) !== NoMode ? (startProfilerTimer(unitOfWork), current = runWithFiberInDEV(unitOfWork, beginWork, current, unitOfWork, entangledRenderLanes), stopProfilerTimerIfRunningAndRecordDuration(unitOfWork)) : current = runWithFiberInDEV(unitOfWork, beginWork, current, unitOfWork, entangledRenderLanes);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    undefined === current ? completeUnitOfWork(unitOfWork) : workInProgress = current;
  }
  function replaySuspendedUnitOfWork(unitOfWork) {
    let __next;
    __next = runWithFiberInDEV(unitOfWork, replayBeginWork, unitOfWork);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    undefined === __next ? completeUnitOfWork(unitOfWork) : workInProgress = __next;
  }
  function replayBeginWork(unitOfWork) {
    let current, isProfilingMode;
    current = unitOfWork.alternate;
    isProfilingMode = (unitOfWork.mode & 2) !== NoMode;
    isProfilingMode && startProfilerTimer(unitOfWork);
    switch (unitOfWork.tag) {
      case 15:
      case 0:
        current = replayFunctionComponent(current, unitOfWork, unitOfWork.pendingProps, unitOfWork.type, void 0, workInProgressRootRenderLanes);
        break;
      case 11:
        current = replayFunctionComponent(current, unitOfWork, unitOfWork.pendingProps, unitOfWork.type.render, unitOfWork.ref, workInProgressRootRenderLanes);
        break;
      case 5:
        resetHooksOnUnwind(unitOfWork);
      default:
        unwindInterruptedWork(current, unitOfWork), unitOfWork = workInProgress = resetWorkInProgress(unitOfWork, entangledRenderLanes), current = beginWork(current, unitOfWork, entangledRenderLanes);
    }
    isProfilingMode && stopProfilerTimerIfRunningAndRecordDuration(unitOfWork);
    return current;
  }
  function throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, suspendedReason) {
    let returnFiber;
    resetContextDependencies();
    resetHooksOnUnwind(unitOfWork);
    thenableState_1 = undefined;
    thenableIndexCounter_1 = 0;
    returnFiber = unitOfWork.return;
    try {
      if (throwException(root, returnFiber, unitOfWork, thrownValue, workInProgressRootRenderLanes)) {
        workInProgressRootExitStatus = RootFatalErrored;
        logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
        workInProgress = undefined;
        return;
      }
    } catch (__error) {
      if (undefined !== returnFiber) throw workInProgress = returnFiber, __error;
      workInProgressRootExitStatus = RootFatalErrored;
      logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
      workInProgress = undefined;
      return;
    }
    if (unitOfWork.flags & 32768) {
      if (isHydrating || suspendedReason === SuspendedOnError) root = !0;else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912)) root = !1;else if (workInProgressRootDidSkipSuspendedSiblings = root = !0, suspendedReason === SuspendedOnData || suspendedReason === SuspendedOnAction || suspendedReason === SuspendedOnImmediate || suspendedReason === SuspendedOnDeprecatedThrowPromise) suspendedReason = suspenseHandlerStackCursor.current, undefined !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
      unwindUnitOfWork(unitOfWork, root);
    } else completeUnitOfWork(unitOfWork);
  }
  function completeUnitOfWork(unitOfWork) {
    let completedWork, current;
    completedWork = unitOfWork;
    do {
      if (0 !== (completedWork.flags & 32768)) {
        unwindUnitOfWork(completedWork, workInProgressRootDidSkipSuspendedSiblings);
        return;
      }
      current = completedWork.alternate;
      unitOfWork = completedWork.return;
      startProfilerTimer(completedWork);
      current = runWithFiberInDEV(completedWork, completeWork, current, completedWork, entangledRenderLanes);
      (completedWork.mode & 2) !== NoMode && stopProfilerTimerIfRunningAndRecordIncompleteDuration(completedWork);
      if (undefined !== current) {
        workInProgress = current;
        return;
      }
      completedWork = completedWork.sibling;
      if (undefined !== completedWork) {
        workInProgress = completedWork;
        return;
      }
      workInProgress = completedWork = unitOfWork;
    } while (undefined !== completedWork);
    workInProgressRootExitStatus === RootInProgress && (workInProgressRootExitStatus = RootCompleted);
  }
  function unwindUnitOfWork(unitOfWork, skipSiblings) {
    let __next, child;
    do {
      __next = unwindWork(unitOfWork.alternate, unitOfWork);
      if (undefined !== __next) {
        __next.flags &= 32767;
        workInProgress = __next;
        return;
      }
      if ((unitOfWork.mode & 2) !== NoMode) {
        stopProfilerTimerIfRunningAndRecordIncompleteDuration(unitOfWork);
        __next = unitOfWork.actualDuration;
        for (child = unitOfWork.child; undefined !== child;) __next += child.actualDuration, child = child.sibling;
        unitOfWork.actualDuration = __next;
      }
      __next = unitOfWork.return;
      undefined !== __next && (__next.flags |= 32768, __next.subtreeFlags = 0, __next.deletions = undefined);
      if (!skipSiblings && (unitOfWork = unitOfWork.sibling, undefined !== unitOfWork)) {
        workInProgress = unitOfWork;
        return;
      }
      workInProgress = unitOfWork = __next;
    } while (undefined !== unitOfWork);
    workInProgressRootExitStatus = RootSuspendedAtTheShell;
    workInProgress = undefined;
  }
  function commitRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, exitStatus, suspendedState, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
    root.cancelPendingCommit = undefined;
    do flushPendingEffects(); while (pendingEffectsStatus !== NO_PENDING_EFFECTS);
    ReactStrictModeWarnings.flushLegacyContextWarning();
    ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();
    if ((executionContext & (RenderContext | CommitContext)) !== NoContext) throw Error("Should not already be working.");
    setCurrentTrackFromLanes(lanes);
    exitStatus === RootErrored ? logErroredRenderPhase(completedRenderStartTime, completedRenderEndTime, lanes, workInProgressUpdateTask) : undefined !== recoverableErrors ? logRecoveredRenderPhase(completedRenderStartTime, completedRenderEndTime, lanes, recoverableErrors, undefined !== finishedWork && undefined !== finishedWork.alternate && finishedWork.alternate.memoizedState.isDehydrated && 0 !== (finishedWork.flags & 256), workInProgressUpdateTask) : logRenderPhase(completedRenderStartTime, completedRenderEndTime, lanes, workInProgressUpdateTask);
    if (undefined !== finishedWork) {
      0 === lanes && console.error("finishedLanes should not be empty during a commit. This is a bug in React.");
      if (finishedWork === root.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      didIncludeRenderPhaseUpdate = finishedWork.lanes | finishedWork.childLanes;
      didIncludeRenderPhaseUpdate |= concurrentlyUpdatedLanes;
      markRootFinished(root, lanes, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes);
      root === workInProgressRoot && (workInProgress = workInProgressRoot = undefined, workInProgressRootRenderLanes = 0);
      pendingFinishedWork = finishedWork;
      pendingEffectsRoot = root;
      pendingEffectsLanes = lanes;
      pendingEffectsRemainingLanes = didIncludeRenderPhaseUpdate;
      pendingPassiveTransitions = transitions;
      pendingRecoverableErrors = recoverableErrors;
      pendingEffectsRenderEndTime = completedRenderEndTime;
      pendingSuspendedCommitReason = suspendedCommitReason;
      pendingDelayedCommitReason = IMMEDIATE_COMMIT;
      pendingSuspendedViewTransitionReason = undefined;
      0 !== finishedWork.actualDuration || 0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? (root.callbackNode = undefined, root.callbackPriority = 0, scheduleCallback(NormalPriority_1, function () {
        trackSchedulerEvent();
        pendingDelayedCommitReason === IMMEDIATE_COMMIT && (pendingDelayedCommitReason = DELAYED_PASSIVE_COMMIT);
        flushPassiveEffects();
        return undefined;
      })) : (root.callbackNode = undefined, root.callbackPriority = 0);
      commitErrors = undefined;
      commitStartTime = now();
      undefined !== suspendedCommitReason && logSuspendedCommitPhase(completedRenderEndTime, commitStartTime, suspendedCommitReason, workInProgressUpdateTask);
      recoverableErrors = 0 !== (finishedWork.flags & 13878);
      if (0 !== (finishedWork.subtreeFlags & 13878) || recoverableErrors) {
        recoverableErrors = ReactSharedInternals.T;
        ReactSharedInternals.T = undefined;
        transitions = getCurrentUpdatePriority();
        setCurrentUpdatePriority(2);
        spawnedLane = executionContext;
        executionContext |= CommitContext;
        try {
          commitBeforeMutationEffects(root, finishedWork, lanes);
        } finally {
          executionContext = spawnedLane, setCurrentUpdatePriority(transitions), ReactSharedInternals.T = recoverableErrors;
        }
      }
      pendingEffectsStatus = PENDING_MUTATION_PHASE;
      flushMutationEffects();
      flushLayoutEffects();
      flushSpawnedWork();
    }
  }
  function flushMutationEffects() {
    let root, finishedWork, lanes, rootMutationHasEffect, previousPriority, prevExecutionContext;
    if (pendingEffectsStatus === PENDING_MUTATION_PHASE) {
      pendingEffectsStatus = NO_PENDING_EFFECTS;
      root = pendingEffectsRoot;
      finishedWork = pendingFinishedWork;
      lanes = pendingEffectsLanes;
      rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
      if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
        rootMutationHasEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = undefined;
        previousPriority = getCurrentUpdatePriority();
        setCurrentUpdatePriority(2);
        prevExecutionContext = executionContext;
        executionContext |= CommitContext;
        try {
          inProgressLanes = lanes, inProgressRoot = root, resetComponentEffectTimers(), commitMutationEffectsOnFiber(finishedWork, root), inProgressRoot = inProgressLanes = undefined, resetAfterCommit(root.containerInfo);
        } finally {
          executionContext = prevExecutionContext, setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = rootMutationHasEffect;
        }
      }
      root.current = finishedWork;
      pendingEffectsStatus = PENDING_LAYOUT_PHASE;
    }
  }
  function flushLayoutEffects() {
    let suspendedViewTransitionReason, startTime, endTime, rootHasLayoutEffect, _previousPriority, _prevExecutionContext;
    if (pendingEffectsStatus === PENDING_LAYOUT_PHASE) {
      pendingEffectsStatus = NO_PENDING_EFFECTS;
      suspendedViewTransitionReason = pendingSuspendedViewTransitionReason;
      if (undefined !== suspendedViewTransitionReason) {
        commitStartTime = now();
        startTime = commitEndTime;
        endTime = commitStartTime;
        !supportsUserTiming || endTime <= startTime || (animatingTask ? animatingTask.run(__partial((..._bindArgs46) => __applyFn(console.timeStamp, ..._bindArgs46), console, suspendedViewTransitionReason, startTime, endTime, currentTrack, "Scheduler \u269b", "secondary-light")) : console.timeStamp(suspendedViewTransitionReason, startTime, endTime, currentTrack, "Scheduler \u269b", "secondary-light"));
      }
      suspendedViewTransitionReason = pendingEffectsRoot;
      startTime = pendingFinishedWork;
      endTime = pendingEffectsLanes;
      rootHasLayoutEffect = 0 !== (startTime.flags & 8772);
      if (0 !== (startTime.subtreeFlags & 8772) || rootHasLayoutEffect) {
        rootHasLayoutEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = undefined;
        _previousPriority = getCurrentUpdatePriority();
        setCurrentUpdatePriority(2);
        _prevExecutionContext = executionContext;
        executionContext |= CommitContext;
        try {
          inProgressLanes = endTime, inProgressRoot = suspendedViewTransitionReason, resetComponentEffectTimers(), commitLayoutEffectOnFiber(suspendedViewTransitionReason, startTime.alternate, startTime), inProgressRoot = inProgressLanes = undefined;
        } finally {
          executionContext = _prevExecutionContext, setCurrentUpdatePriority(_previousPriority), ReactSharedInternals.T = rootHasLayoutEffect;
        }
      }
      suspendedViewTransitionReason = pendingEffectsRenderEndTime;
      startTime = pendingSuspendedCommitReason;
      commitEndTime = now();
      suspendedViewTransitionReason = undefined === startTime ? suspendedViewTransitionReason : commitStartTime;
      startTime = commitEndTime;
      endTime = pendingDelayedCommitReason === ABORTED_VIEW_TRANSITION_COMMIT;
      rootHasLayoutEffect = workInProgressUpdateTask;
      undefined !== commitErrors ? logCommitErrored(suspendedViewTransitionReason, startTime, commitErrors, !1, rootHasLayoutEffect) : !supportsUserTiming || startTime <= suspendedViewTransitionReason || (rootHasLayoutEffect ? rootHasLayoutEffect.run(__partial((..._bindArgs47) => __applyFn(console.timeStamp, ..._bindArgs47), console, endTime ? "Commit Interrupted View Transition" : "Commit", suspendedViewTransitionReason, startTime, currentTrack, "Scheduler \u269b", endTime ? "error" : "secondary-dark")) : console.timeStamp(endTime ? "Commit Interrupted View Transition" : "Commit", suspendedViewTransitionReason, startTime, currentTrack, "Scheduler \u269b", endTime ? "error" : "secondary-dark"));
      pendingEffectsStatus = PENDING_AFTER_MUTATION_PHASE;
    }
  }
  function flushSpawnedWork() {
    let startViewTransitionStartTime, endTime, abortedViewTransition, finishedWork, rootDidHavePassiveEffects, remainingLanes, didError, schedulerPriority, onRecoverableError, recoverableError, errorInfo;
    if (pendingEffectsStatus === PENDING_SPAWNED_WORK || pendingEffectsStatus === PENDING_AFTER_MUTATION_PHASE) {
      if (pendingEffectsStatus === PENDING_SPAWNED_WORK) {
        startViewTransitionStartTime = commitEndTime;
        commitEndTime = now();
        endTime = commitEndTime;
        abortedViewTransition = pendingDelayedCommitReason === ABORTED_VIEW_TRANSITION_COMMIT;
        !supportsUserTiming || endTime <= startViewTransitionStartTime || (animatingTask ? animatingTask.run(__partial((..._bindArgs48) => __applyFn(console.timeStamp, ..._bindArgs48), console, abortedViewTransition ? "Interrupted View Transition" : "Starting Animation", startViewTransitionStartTime, endTime, currentTrack, "Scheduler \u269b", abortedViewTransition ? "error" : "secondary-light")) : console.timeStamp(abortedViewTransition ? "Interrupted View Transition" : "Starting Animation", startViewTransitionStartTime, endTime, currentTrack, "Scheduler \u269b", abortedViewTransition ? " error" : "secondary-light"));
        pendingDelayedCommitReason !== ABORTED_VIEW_TRANSITION_COMMIT && (pendingDelayedCommitReason = ANIMATION_STARTED_COMMIT);
      }
      pendingEffectsStatus = NO_PENDING_EFFECTS;
      requestPaint();
      startViewTransitionStartTime = pendingEffectsRoot;
      finishedWork = pendingFinishedWork;
      endTime = pendingEffectsLanes;
      abortedViewTransition = pendingRecoverableErrors;
      rootDidHavePassiveEffects = 0 !== finishedWork.actualDuration || 0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256);
      rootDidHavePassiveEffects ? pendingEffectsStatus = PENDING_PASSIVE_PHASE : (pendingEffectsStatus = NO_PENDING_EFFECTS, pendingFinishedWork = pendingEffectsRoot = undefined, releaseRootPooledCache(startViewTransitionStartTime, startViewTransitionStartTime.pendingLanes), nestedPassiveUpdateCount = 0, rootWithPassiveNestedUpdates = undefined);
      remainingLanes = startViewTransitionStartTime.pendingLanes;
      0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = undefined);
      rootDidHavePassiveEffects || commitDoubleInvokeEffectsInDEV(startViewTransitionStartTime);
      remainingLanes = lanesToEventPriority(endTime);
      finishedWork = finishedWork.stateNode;
      if (injectedHook && "function" === typeOfJS(injectedHook.onCommitFiberRoot)) try {
        didError = 128 === (finishedWork.current.flags & 128);
        switch (remainingLanes) {
          case 2:
            schedulerPriority = ImmediatePriority;
            break;
          case 8:
            schedulerPriority = UserBlockingPriority;
            break;
          case 32:
            schedulerPriority = NormalPriority_1;
            break;
          case 268435456:
            schedulerPriority = IdlePriority;
            break;
          default:
            schedulerPriority = NormalPriority_1;
        }
        injectedHook.onCommitFiberRoot(rendererID, finishedWork, schedulerPriority, didError);
      } catch (err) {
        hasLoggedError || (hasLoggedError = !0, console.error("React instrumentation encountered an error: %o", err));
      }
      isDevToolsPresent && startViewTransitionStartTime.memoizedUpdaters.clear();
      onCommitRoot();
      if (undefined !== abortedViewTransition) {
        didError = ReactSharedInternals.T;
        schedulerPriority = getCurrentUpdatePriority();
        setCurrentUpdatePriority(2);
        ReactSharedInternals.T = undefined;
        try {
          onRecoverableError = startViewTransitionStartTime.onRecoverableError;
          for (finishedWork = 0; finishedWork < __len(abortedViewTransition); finishedWork++) {
            recoverableError = abortedViewTransition[finishedWork];
            errorInfo = makeErrorInfo(recoverableError.stack);
            runWithFiberInDEV(recoverableError.source, onRecoverableError, recoverableError.value, errorInfo);
          }
        } finally {
          ReactSharedInternals.T = didError, setCurrentUpdatePriority(schedulerPriority);
        }
      }
      0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
      ensureRootIsScheduled(startViewTransitionStartTime);
      remainingLanes = startViewTransitionStartTime.pendingLanes;
      0 !== (endTime & 261930) && 0 !== (remainingLanes & 42) ? (nestedUpdateScheduled = !0, startViewTransitionStartTime === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = startViewTransitionStartTime)) : nestedUpdateCount = 0;
      rootDidHavePassiveEffects || finalizeRender(endTime, commitEndTime);
      supportsHydration && flushHydrationEvents();
      flushSyncWorkAcrossRoots_impl(0, !1);
    }
  }
  function makeErrorInfo(componentStack) {
    componentStack = {
      componentStack: componentStack
    };
    Object.defineProperty(componentStack, "digest", {
      get: function () {
        console.error('You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.');
      }
    });
    return componentStack;
  }
  function releaseRootPooledCache(root, remainingLanes) {
    0 === (root.pooledCacheLanes &= remainingLanes) && (remainingLanes = root.pooledCache, remainingLanes !== undefined && (root.pooledCache = undefined, releaseCache(remainingLanes)));
  }
  function flushPendingEffects() {
    flushMutationEffects();
    flushLayoutEffects();
    flushSpawnedWork();
    return flushPassiveEffects();
  }
  function flushPassiveEffects() {
    let root, remainingLanes, renderPriority, priority, previousPriority, transitions, lanes, passiveEffectStartTime, startTime, endTime, delayedUntilPaint, finishedWork, finishedWork_jscomp_0, passiveEffectsEndTime, stateNode;
    if (pendingEffectsStatus !== PENDING_PASSIVE_PHASE) return !1;
    root = pendingEffectsRoot;
    remainingLanes = pendingEffectsRemainingLanes;
    pendingEffectsRemainingLanes = 0;
    renderPriority = lanesToEventPriority(pendingEffectsLanes);
    priority = 32 > renderPriority ? 32 : renderPriority;
    renderPriority = ReactSharedInternals.T;
    previousPriority = getCurrentUpdatePriority();
    try {
      setCurrentUpdatePriority(priority);
      ReactSharedInternals.T = undefined;
      transitions = pendingPassiveTransitions;
      pendingPassiveTransitions = undefined;
      priority = pendingEffectsRoot;
      lanes = pendingEffectsLanes;
      pendingEffectsStatus = NO_PENDING_EFFECTS;
      pendingFinishedWork = pendingEffectsRoot = undefined;
      pendingEffectsLanes = 0;
      if ((executionContext & (RenderContext | CommitContext)) !== NoContext) throw Error("Cannot flush passive effects while already rendering.");
      setCurrentTrackFromLanes(lanes);
      isFlushingPassiveEffects = !0;
      didScheduleUpdateDuringPassiveEffects = !1;
      passiveEffectStartTime = 0;
      commitErrors = undefined;
      passiveEffectStartTime = now_1();
      if (pendingDelayedCommitReason === ANIMATION_STARTED_COMMIT) {
        startTime = commitEndTime;
        endTime = passiveEffectStartTime;
        !supportsUserTiming || endTime <= startTime || (animatingTask ? animatingTask.run(__partial((..._bindArgs49) => __applyFn(console.timeStamp, ..._bindArgs49), console, "Animating", startTime, endTime, currentTrack, "Scheduler \u269b", "secondary-dark")) : console.timeStamp("Animating", startTime, endTime, currentTrack, "Scheduler \u269b", "secondary-dark"));
      } else {
        startTime = commitEndTime;
        endTime = passiveEffectStartTime;
        delayedUntilPaint = pendingDelayedCommitReason === DELAYED_PASSIVE_COMMIT;
        !supportsUserTiming || endTime <= startTime || (workInProgressUpdateTask ? workInProgressUpdateTask.run(__partial((..._bindArgs50) => __applyFn(console.timeStamp, ..._bindArgs50), console, delayedUntilPaint ? "Waiting for Paint" : "Waiting", startTime, endTime, currentTrack, "Scheduler \u269b", "secondary-light")) : console.timeStamp(delayedUntilPaint ? "Waiting for Paint" : "Waiting", startTime, endTime, currentTrack, "Scheduler \u269b", "secondary-light"));
      }
      startTime = executionContext;
      executionContext |= CommitContext;
      finishedWork = priority.current;
      resetComponentEffectTimers();
      commitPassiveUnmountOnFiber(finishedWork);
      finishedWork_jscomp_0 = priority.current;
      finishedWork = pendingEffectsRenderEndTime;
      resetComponentEffectTimers();
      commitPassiveMountOnFiber(priority, finishedWork_jscomp_0, lanes, transitions, finishedWork);
      commitDoubleInvokeEffectsInDEV(priority);
      executionContext = startTime;
      passiveEffectsEndTime = now_1();
      finishedWork_jscomp_0 = passiveEffectStartTime;
      finishedWork = workInProgressUpdateTask;
      undefined !== commitErrors ? logCommitErrored(finishedWork_jscomp_0, passiveEffectsEndTime, commitErrors, !0, finishedWork) : !supportsUserTiming || passiveEffectsEndTime <= finishedWork_jscomp_0 || (finishedWork ? finishedWork.run(__partial((..._bindArgs51) => __applyFn(console.timeStamp, ..._bindArgs51), console, "Remaining Effects", finishedWork_jscomp_0, passiveEffectsEndTime, currentTrack, "Scheduler \u269b", "secondary-dark")) : console.timeStamp("Remaining Effects", finishedWork_jscomp_0, passiveEffectsEndTime, currentTrack, "Scheduler \u269b", "secondary-dark"));
      finalizeRender(lanes, passiveEffectsEndTime);
      flushSyncWorkAcrossRoots_impl(0, !1);
      didScheduleUpdateDuringPassiveEffects ? priority === rootWithPassiveNestedUpdates ? nestedPassiveUpdateCount++ : (nestedPassiveUpdateCount = 0, rootWithPassiveNestedUpdates = priority) : nestedPassiveUpdateCount = 0;
      didScheduleUpdateDuringPassiveEffects = isFlushingPassiveEffects = !1;
      if (injectedHook && "function" === typeOfJS(injectedHook.onPostCommitFiberRoot)) try {
        injectedHook.onPostCommitFiberRoot(rendererID, priority);
      } catch (err) {
        hasLoggedError || (hasLoggedError = !0, console.error("React instrumentation encountered an error: %o", err));
      }
      stateNode = priority.current.stateNode;
      stateNode.effectDuration = 0;
      stateNode.passiveEffectDuration = 0;
      return !0;
    } finally {
      setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = renderPriority, releaseRootPooledCache(root, remainingLanes);
    }
  }
  function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, __error) {
    sourceFiber = createCapturedValueAtFiber(__error, sourceFiber);
    recordEffectError(sourceFiber);
    sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
    rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
    undefined !== rootFiber && (markRootUpdated_1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
  }
  function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, __error) {
    let instance;
    isRunningInsertionEffect = !1;
    if (3 === sourceFiber.tag) captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, __error);else {
      for (; undefined !== nearestMountedAncestor;) {
        if (3 === nearestMountedAncestor.tag) {
          captureCommitPhaseErrorOnRoot(nearestMountedAncestor, sourceFiber, __error);
          return;
        }
        if (1 === nearestMountedAncestor.tag) {
          instance = nearestMountedAncestor.stateNode;
          if ("function" === typeOfJS(nearestMountedAncestor.type.getDerivedStateFromError) || "function" === typeOfJS(instance.componentDidCatch) && (undefined === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
            sourceFiber = createCapturedValueAtFiber(__error, sourceFiber);
            recordEffectError(sourceFiber);
            __error = createClassErrorUpdate(2);
            instance = enqueueUpdate(nearestMountedAncestor, __error, 2);
            undefined !== instance && (initializeClassErrorUpdate(__error, instance, nearestMountedAncestor, sourceFiber), markRootUpdated_1(instance, 2), ensureRootIsScheduled(instance));
            return;
          }
        }
        nearestMountedAncestor = nearestMountedAncestor.return;
      }
      console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", __error);
    }
  }
  function attachPingListener(root, wakeable, lanes) {
    let pingCache, threadIDs;
    pingCache = root.pingCache;
    if (undefined === pingCache) {
      pingCache = root.pingCache = __new(PossiblyWeakMap);
      threadIDs = __new(Set);
      pingCache.set(wakeable, threadIDs);
    } else threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = __new(Set), pingCache.set(wakeable, threadIDs));
    threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = !0, threadIDs.add(lanes), pingCache = __partial((..._bindArgs52) => __applyFn(pingSuspendedRoot, ..._bindArgs52), undefined, root, wakeable, lanes), isDevToolsPresent && restorePendingUpdaters(root, lanes), wakeable.then(pingCache, pingCache));
  }
  function pingSuspendedRoot(root, wakeable, pingedLanes) {
    let pingCache;
    pingCache = root.pingCache;
    undefined !== pingCache && pingCache.delete(wakeable);
    root.pingedLanes |= root.suspendedLanes & pingedLanes;
    root.warmLanes &= ~pingedLanes;
    0 !== (pingedLanes & 127) ? 0 > blockingUpdateTime && (blockingClampTime = blockingUpdateTime = now(), blockingUpdateTask = createTask("Promise Resolved"), blockingUpdateType = 2) : 0 !== (pingedLanes & 4194048) && 0 > transitionUpdateTime && (transitionClampTime = transitionUpdateTime = now(), transitionUpdateTask = createTask("Promise Resolved"), transitionUpdateType = 2);
    isConcurrentActEnvironment() && undefined === ReactSharedInternals.actQueue && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act");
    workInProgressRoot === root && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (workInProgressRootExitStatus === RootSuspendedWithDelay || workInProgressRootExitStatus === RootSuspended && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && now_1() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS ? (executionContext & RenderContext) === NoContext && prepareFreshStack(root, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
    ensureRootIsScheduled(root);
  }
  function retryTimedOutBoundary(boundaryFiber, retryLane) {
    0 === retryLane && (retryLane = claimNextRetryLane());
    boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
    undefined !== boundaryFiber && (markRootUpdated_1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
  }
  function retryDehydratedSuspenseBoundary(boundaryFiber) {
    let suspenseState, retryLane;
    suspenseState = boundaryFiber.memoizedState;
    retryLane = 0;
    undefined !== suspenseState && (retryLane = suspenseState.retryLane);
    retryTimedOutBoundary(boundaryFiber, retryLane);
  }
  function resolveRetryWakeable(boundaryFiber, wakeable) {
    let retryLane, retryCache, suspenseState;
    retryLane = 0;
    switch (boundaryFiber.tag) {
      case 31:
      case 13:
        retryCache = boundaryFiber.stateNode;
        suspenseState = boundaryFiber.memoizedState;
        undefined !== suspenseState && (retryLane = suspenseState.retryLane);
        break;
      case 19:
        retryCache = boundaryFiber.stateNode;
        break;
      case 22:
        retryCache = boundaryFiber.stateNode._retryCache;
        break;
      default:
        throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    undefined !== retryCache && retryCache.delete(wakeable);
    retryTimedOutBoundary(boundaryFiber, retryLane);
  }
  function recursivelyTraverseAndDoubleInvokeEffectsInDEV(root_jscomp_0, parentFiber, isInStrictMode) {
    let root, fiber, isStrictModeFiber;
    if (0 !== (parentFiber.subtreeFlags & 67117056)) for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
      root = root_jscomp_0;
      fiber = parentFiber;
      isStrictModeFiber = fiber.type === REACT_STRICT_MODE_TYPE;
      isStrictModeFiber = isInStrictMode || isStrictModeFiber;
      22 !== fiber.tag ? fiber.flags & 67108864 ? isStrictModeFiber && runWithFiberInDEV(fiber, doubleInvokeEffectsOnFiber, root, fiber) : recursivelyTraverseAndDoubleInvokeEffectsInDEV(root, fiber, isStrictModeFiber) : undefined === fiber.memoizedState && (isStrictModeFiber && fiber.flags & 8192 ? runWithFiberInDEV(fiber, doubleInvokeEffectsOnFiber, root, fiber) : fiber.subtreeFlags & 67108864 && runWithFiberInDEV(fiber, recursivelyTraverseAndDoubleInvokeEffectsInDEV, root, fiber, isStrictModeFiber));
      parentFiber = parentFiber.sibling;
    }
  }
  function doubleInvokeEffectsOnFiber(root, fiber) {
    setIsStrictModeForDevtools(!0);
    try {
      disappearLayoutEffects(fiber), disconnectPassiveEffect(fiber), reappearLayoutEffects(root, fiber.alternate, fiber, !1), reconnectPassiveEffects(root, fiber, 0, undefined, !1, 0);
    } finally {
      setIsStrictModeForDevtools(!1);
    }
  }
  function commitDoubleInvokeEffectsInDEV(root) {
    let doubleInvokeEffects;
    doubleInvokeEffects = !0;
    root.current.mode & 24 || (doubleInvokeEffects = !1);
    recursivelyTraverseAndDoubleInvokeEffectsInDEV(root, root.current, doubleInvokeEffects);
  }
  function warnAboutUpdateOnNotYetMountedFiberInDEV(fiber) {
    let tag;
    if ((executionContext & RenderContext) === NoContext) {
      tag = fiber.tag;
      if (3 === tag || 1 === tag || 0 === tag || 11 === tag || 14 === tag || 15 === tag) {
        tag = getComponentNameFromFiber(fiber) || "ReactComponent";
        if (undefined !== didWarnStateUpdateForNotYetMountedComponent) {
          if (didWarnStateUpdateForNotYetMountedComponent.has(tag)) return;
          didWarnStateUpdateForNotYetMountedComponent.add(tag);
        } else didWarnStateUpdateForNotYetMountedComponent = __new(Set, __arrNew(tag));
        runWithFiberInDEV(fiber, function () {
          console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
        });
      }
    }
  }
  function restorePendingUpdaters(root, lanes) {
    isDevToolsPresent && __forEach(root.memoizedUpdaters, function (schedulingFiber) {
      addFiberToLanesMap(root, schedulingFiber, lanes);
    });
  }
  function scheduleCallback(priorityLevel, callback) {
    let actQueue;
    actQueue = ReactSharedInternals.actQueue;
    return undefined !== actQueue ? (__push(actQueue, callback), fakeActCallbackNode) : scheduleCallback_3(priorityLevel, callback);
  }
  function warnIfUpdatesNotWrappedWithActDEV(fiber) {
    isConcurrentActEnvironment() && undefined === ReactSharedInternals.actQueue && runWithFiberInDEV(fiber, function () {
      console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", getComponentNameFromFiber(fiber));
    });
  }
  function resolveFunctionForHotReloading(__type) {
    let family;
    if (undefined === resolveFamily) return __type;
    family = resolveFamily(__type);
    return void 0 === family ? __type : family.current;
  }
  function resolveForwardRefForHotReloading(__type) {
    let family;
    if (undefined === resolveFamily) return __type;
    family = resolveFamily(__type);
    return void 0 === family ? undefined !== __type && void 0 !== __type && "function" === typeOfJS(__type.render) && (family = resolveFunctionForHotReloading(__type.render), __type.render !== family) ? (family = {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: family
    }, void 0 !== __type.displayName && (family.displayName = __type.displayName), family) : __type : family.current;
  }
  function isCompatibleFamilyForHotReloading(fiber, element) {
    let prevType, needsCompareFamilies, __typeofNextType;
    if (undefined === resolveFamily) return !1;
    prevType = fiber.elementType;
    element = element.type;
    needsCompareFamilies = !1;
    __typeofNextType = "object" === typeOfJS(element) && undefined !== element ? element.$$typeof : undefined;
    switch (fiber.tag) {
      case 1:
        "function" === typeOfJS(element) && (needsCompareFamilies = !0);
        break;
      case 0:
        "function" === typeOfJS(element) ? needsCompareFamilies = !0 : __typeofNextType === REACT_LAZY_TYPE && (needsCompareFamilies = !0);
        break;
      case 11:
        __typeofNextType === REACT_FORWARD_REF_TYPE ? needsCompareFamilies = !0 : __typeofNextType === REACT_LAZY_TYPE && (needsCompareFamilies = !0);
        break;
      case 14:
      case 15:
        __typeofNextType === REACT_MEMO_TYPE ? needsCompareFamilies = !0 : __typeofNextType === REACT_LAZY_TYPE && (needsCompareFamilies = !0);
        break;
      default:
        return !1;
    }
    return needsCompareFamilies && (fiber = resolveFamily(prevType), void 0 !== fiber && fiber === resolveFamily(element)) ? !0 : !1;
  }
  function markFailedErrorBoundaryForHotReloading(fiber) {
    undefined !== resolveFamily && "function" === typeOfJS(WeakSet) && (undefined === failedBoundaries && (failedBoundaries = __new(WeakSet)), failedBoundaries.add(fiber));
  }
  function scheduleFibersWithFamiliesRecursively(fiber, updatedFamilies, staleFamilies) {
    let _fiber, alternate, child, sibling, tag, candidateType, needsRender;
    do {
      _fiber = fiber;
      alternate = _fiber.alternate;
      child = _fiber.child;
      sibling = _fiber.sibling;
      tag = _fiber.tag;
      _fiber = _fiber.type;
      candidateType = undefined;
      switch (tag) {
        case 0:
        case 15:
        case 1:
          candidateType = _fiber;
          break;
        case 11:
          candidateType = _fiber.render;
      }
      if (undefined === resolveFamily) throw Error("Expected resolveFamily to be set during hot reload.");
      needsRender = !1;
      _fiber = !1;
      undefined !== candidateType && (candidateType = resolveFamily(candidateType), void 0 !== candidateType && (staleFamilies.has(candidateType) ? _fiber = !0 : updatedFamilies.has(candidateType) && (1 === tag ? _fiber = !0 : needsRender = !0)));
      undefined !== failedBoundaries && (failedBoundaries.has(fiber) || undefined !== alternate && failedBoundaries.has(alternate)) && (_fiber = !0);
      _fiber && (fiber._debugNeedsRemount = !0);
      if (_fiber || needsRender) alternate = enqueueConcurrentRenderForLane(fiber, 2), undefined !== alternate && scheduleUpdateOnFiber(alternate, fiber, 2);
      undefined === child || _fiber || scheduleFibersWithFamiliesRecursively(child, updatedFamilies, staleFamilies);
      if (undefined === sibling) break;
      fiber = sibling;
    } while (1);
  }
  function FiberNode(tag, pendingProps, key, mode) {
    this.tag = tag;
    this.key = key;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = undefined;
    this.index = 0;
    this.refCleanup = this.ref = undefined;
    this.pendingProps = pendingProps;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = undefined;
    this.mode = mode;
    this.subtreeFlags = this.flags = 0;
    this.deletions = undefined;
    this.childLanes = this.lanes = 0;
    this.alternate = undefined;
    this.actualDuration = -0;
    this.actualStartTime = -1.1;
    this.treeBaseDuration = this.selfBaseDuration = -0;
    this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = undefined;
    this._debugNeedsRemount = !1;
    this._debugHookTypes = undefined;
    hasBadMapPolyfill || "function" !== typeOfJS(Object.preventExtensions) || Object.preventExtensions(this);
  }
  function shouldConstruct(Component) {
    Component = __protoOf(Component);
    return !(!Component || !Component.isReactComponent);
  }
  function createWorkInProgress(current, pendingProps) {
    let workInProgress;
    workInProgress = current.alternate;
    undefined === workInProgress ? (workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress._debugOwner = current._debugOwner, workInProgress._debugStack = current._debugStack, workInProgress._debugTask = current._debugTask, workInProgress._debugHookTypes = current._debugHookTypes, workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, workInProgress.type = current.type, workInProgress.flags = 0, workInProgress.subtreeFlags = 0, workInProgress.deletions = undefined, workInProgress.actualDuration = -0, workInProgress.actualStartTime = -1.1);
    workInProgress.flags = current.flags & 65011712;
    workInProgress.childLanes = current.childLanes;
    workInProgress.lanes = current.lanes;
    workInProgress.child = current.child;
    workInProgress.memoizedProps = current.memoizedProps;
    workInProgress.memoizedState = current.memoizedState;
    workInProgress.updateQueue = current.updateQueue;
    pendingProps = current.dependencies;
    workInProgress.dependencies = undefined === pendingProps ? undefined : {
      lanes: pendingProps.lanes,
      firstContext: pendingProps.firstContext,
      _debugThenableState: pendingProps._debugThenableState
    };
    workInProgress.sibling = current.sibling;
    workInProgress.index = current.index;
    workInProgress.ref = current.ref;
    workInProgress.refCleanup = current.refCleanup;
    workInProgress.selfBaseDuration = current.selfBaseDuration;
    workInProgress.treeBaseDuration = current.treeBaseDuration;
    workInProgress._debugInfo = current._debugInfo;
    workInProgress._debugNeedsRemount = current._debugNeedsRemount;
    switch (workInProgress.tag) {
      case 0:
      case 15:
        workInProgress.type = resolveFunctionForHotReloading(current.type);
        break;
      case 1:
        workInProgress.type = resolveFunctionForHotReloading(current.type);
        break;
      case 11:
        workInProgress.type = resolveForwardRefForHotReloading(current.type);
    }
    return workInProgress;
  }
  function resetWorkInProgress(workInProgress, renderLanes) {
    let current;
    workInProgress.flags &= 65011714;
    current = workInProgress.alternate;
    undefined === current ? (workInProgress.childLanes = 0, workInProgress.lanes = renderLanes, workInProgress.child = undefined, workInProgress.subtreeFlags = 0, workInProgress.memoizedProps = undefined, workInProgress.memoizedState = undefined, workInProgress.updateQueue = undefined, workInProgress.dependencies = undefined, workInProgress.stateNode = undefined, workInProgress.selfBaseDuration = 0, workInProgress.treeBaseDuration = 0) : (workInProgress.childLanes = current.childLanes, workInProgress.lanes = current.lanes, workInProgress.child = current.child, workInProgress.subtreeFlags = 0, workInProgress.deletions = undefined, workInProgress.memoizedProps = current.memoizedProps, workInProgress.memoizedState = current.memoizedState, workInProgress.updateQueue = current.updateQueue, workInProgress.type = current.type, renderLanes = current.dependencies, workInProgress.dependencies = undefined === renderLanes ? undefined : {
      lanes: renderLanes.lanes,
      firstContext: renderLanes.firstContext,
      _debugThenableState: renderLanes._debugThenableState
    }, workInProgress.selfBaseDuration = current.selfBaseDuration, workInProgress.treeBaseDuration = current.treeBaseDuration);
    return workInProgress;
  }
  function createFiberFromTypeAndProps(__type, key, pendingProps, owner, mode, lanes) {
    let fiberTag, resolvedType;
    fiberTag = 0;
    resolvedType = __type;
    if ("function" === typeOfJS(__type)) shouldConstruct(__type) && (fiberTag = 1), resolvedType = resolveFunctionForHotReloading(resolvedType);else if ("string" === typeOfJS(__type)) supportsResources && supportsSingletons ? (fiberTag = getHostContext(), fiberTag = isHostHoistableType(__type, pendingProps, fiberTag) ? 26 : isHostSingletonType(__type) ? 27 : 5) : supportsResources ? (fiberTag = getHostContext(), fiberTag = isHostHoistableType(__type, pendingProps, fiberTag) ? 26 : 5) : fiberTag = supportsSingletons ? isHostSingletonType(__type) ? 27 : 5 : 5;else {
      let __lb_0 = false,
        __lc_0 = false;
      while (!__lb_0) {
        switch (__type) {
          case REACT_ACTIVITY_TYPE:
            return key = createFiber(31, pendingProps, key, mode), key.elementType = REACT_ACTIVITY_TYPE, key.lanes = lanes, key;
          case REACT_FRAGMENT_TYPE:
            return createFiberFromFragment(pendingProps.children, mode, lanes, key);
          case REACT_STRICT_MODE_TYPE:
            fiberTag = 8;
            mode |= 24;
            break;
          case REACT_PROFILER_TYPE:
            return __type = pendingProps, owner = mode, "string" !== typeOfJS(__type.id) && console.error('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeOfJS(__type.id)), key = createFiber(12, __type, key, owner | 2), key.elementType = REACT_PROFILER_TYPE, key.lanes = lanes, key.stateNode = {
              effectDuration: 0,
              passiveEffectDuration: 0
            }, key;
          case REACT_SUSPENSE_TYPE:
            return key = createFiber(13, pendingProps, key, mode), key.elementType = REACT_SUSPENSE_TYPE, key.lanes = lanes, key;
          case REACT_SUSPENSE_LIST_TYPE:
            return key = createFiber(19, pendingProps, key, mode), key.elementType = REACT_SUSPENSE_LIST_TYPE, key.lanes = lanes, key;
          default:
            if ("object" === typeOfJS(__type) && undefined !== __type) switch (__type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                fiberTag = 10;
                {
                  __lb_0 = true;
                  break;
                }
              case REACT_CONSUMER_TYPE:
                fiberTag = 9;
                {
                  __lb_0 = true;
                  break;
                }
              case REACT_FORWARD_REF_TYPE:
                fiberTag = 11;
                resolvedType = resolveForwardRefForHotReloading(resolvedType);
                {
                  __lb_0 = true;
                  break;
                }
              case REACT_MEMO_TYPE:
                fiberTag = 14;
                {
                  __lb_0 = true;
                  break;
                }
              case REACT_LAZY_TYPE:
                fiberTag = 16;
                resolvedType = undefined;
                {
                  __lb_0 = true;
                  break;
                }
            }
            resolvedType = "";
            if (void 0 === __type || "object" === typeOfJS(__type) && undefined !== __type && 0 === __len(Object.keys(__type))) resolvedType += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            undefined === __type ? pendingProps = "null" : isArrayImpl(__type) ? pendingProps = "array" : void 0 !== __type && __type.$$typeof === REACT_ELEMENT_TYPE ? (pendingProps = __cat(__cat("<", getComponentNameFromType(__type.type) || "Unknown"), " />"), resolvedType = " Did you accidentally export a JSX literal instead of a component?") : pendingProps = typeOfJS(__type);
            fiberTag = owner ? "number" === typeOfJS(owner.tag) ? getComponentNameFromFiber(owner) : "string" === typeOfJS(owner.name) ? owner.name : undefined : undefined;
            fiberTag && (resolvedType += __cat(__cat("\n\nCheck the render method of `", fiberTag), "`."));
            fiberTag = 29;
            pendingProps = Error(__cat("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: ", __cat(__cat(pendingProps, "."), resolvedType)));
            resolvedType = undefined;
        }
        break;
      }
    }
    key = createFiber(fiberTag, pendingProps, key, mode);
    key.elementType = __type;
    key.type = resolvedType;
    key.lanes = lanes;
    key._debugOwner = owner;
    return key;
  }
  function createFiberFromElement(element, mode, lanes) {
    mode = createFiberFromTypeAndProps(element.type, element.key, element.props, element._owner, mode, lanes);
    mode._debugOwner = element._owner;
    mode._debugStack = element._debugStack;
    mode._debugTask = element._debugTask;
    return mode;
  }
  function createFiberFromFragment(elements, mode, lanes, key) {
    elements = createFiber(7, elements, key, mode);
    elements.lanes = lanes;
    return elements;
  }
  function createFiberFromText(content, mode, lanes) {
    content = createFiber(6, content, undefined, mode);
    content.lanes = lanes;
    return content;
  }
  function createFiberFromDehydratedFragment(dehydratedNode) {
    let fiber;
    fiber = createFiber(18, undefined, undefined, NoMode);
    fiber.stateNode = dehydratedNode;
    return fiber;
  }
  function createFiberFromPortal(portal, mode, lanes) {
    mode = createFiber(4, undefined !== portal.children ? portal.children : __arrNew(), portal.key, mode);
    mode.lanes = lanes;
    mode.stateNode = {
      containerInfo: portal.containerInfo,
      pendingChildren: undefined,
      implementation: portal.implementation
    };
    return mode;
  }
  function FiberRootNode(containerInfo, _tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
    this.tag = 1;
    this.containerInfo = containerInfo;
    this.pingCache = this.current = this.pendingChildren = undefined;
    this.timeoutHandle = noTimeout;
    this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = undefined;
    this.callbackPriority = 0;
    this.expirationTimes = createLaneMap(-1);
    this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = createLaneMap(0);
    this.hiddenUpdates = createLaneMap(undefined);
    this.identifierPrefix = identifierPrefix;
    this.onUncaughtError = onUncaughtError;
    this.onCaughtError = onCaughtError;
    this.onRecoverableError = onRecoverableError;
    this.pooledCache = undefined;
    this.pooledCacheLanes = 0;
    this.formState = formState;
    this.incompleteTransitions = __new(Map);
    this.passiveEffectDuration = this.effectDuration = -0;
    this.memoizedUpdaters = __new(Set);
    containerInfo = this.pendingUpdatersLaneMap = __arrNew();
    for (let _tag = 0; 31 > _tag; _tag++) __push(containerInfo, __new(Set));
    this._debugRootType = hydrate ? "hydrateRoot()" : "createRoot()";
  }
  function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
    containerInfo = __new(FiberRootNode, containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState);
    tag = 1;
    !0 === isStrictMode && (tag |= 24);
    isStrictMode = createFiber(3, undefined, undefined, tag | 2);
    containerInfo.current = isStrictMode;
    isStrictMode.stateNode = containerInfo;
    tag = createCache();
    retainCache(tag);
    containerInfo.pooledCache = tag;
    retainCache(tag);
    isStrictMode.memoizedState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: tag
    };
    initializeUpdateQueue(isStrictMode);
    return containerInfo;
  }
  function testStringCoercion(value) {
    return __cat("", value);
  }
  function getContextForSubtree(parentComponent) {
    if (!parentComponent) return emptyContextObject;
    parentComponent = emptyContextObject;
    return parentComponent;
  }
  function updateContainerSync(element, container, parentComponent, callback) {
    updateContainerImpl(container.current, 2, element, container, parentComponent, callback);
    return 2;
  }
  function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
    if (injectedHook && "function" === typeOfJS(injectedHook.onScheduleFiberRoot)) try {
      injectedHook.onScheduleFiberRoot(rendererID, container, element);
    } catch (err) {
      hasLoggedError || (hasLoggedError = !0, console.error("React instrumentation encountered an error: %o", err));
    }
    parentComponent = getContextForSubtree(parentComponent);
    undefined === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
    isRendering && undefined !== current && !didWarnAboutNestedUpdates && (didWarnAboutNestedUpdates = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", getComponentNameFromFiber(current) || "Unknown"));
    container = createUpdate(lane);
    container.payload = {
      element: element
    };
    callback = void 0 === callback ? undefined : callback;
    undefined !== callback && ("function" !== typeOfJS(callback) && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", callback), container.callback = callback);
    element = enqueueUpdate(rootFiber, container, lane);
    undefined !== element && (startUpdateTimerByLane(lane, "root.render()", undefined), scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
  }
  function markRetryLaneImpl(fiber, retryLane) {
    let a;
    fiber = fiber.memoizedState;
    if (undefined !== fiber && undefined !== fiber.dehydrated) {
      a = fiber.retryLane;
      fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
    }
  }
  function markRetryLaneIfNotHydrated(fiber, retryLane) {
    markRetryLaneImpl(fiber, retryLane);
    (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
  }
  function getCurrentFiberForDevTools() {
    return current;
  }
  __exports = {};
  "use strict";
  assign = Object.assign;
  REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element");
  REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
  REACT_PORTAL_TYPE = Symbol.for("react.portal");
  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
  REACT_PROFILER_TYPE = Symbol.for("react.profiler");
  REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
  REACT_CONTEXT_TYPE = Symbol.for("react.context");
  REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
  REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
  REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
  REACT_MEMO_TYPE = Symbol.for("react.memo");
  REACT_LAZY_TYPE = Symbol.for("react.lazy");
  Symbol.for("react.scope");
  REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
  Symbol.for("react.legacy_hidden");
  Symbol.for("react.tracing_marker");
  REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
  Symbol.for("react.view_transition");
  MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
  isArrayImpl = isArray;
  ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  rendererVersion = ___config.rendererVersion;
  rendererPackageName = ___config.rendererPackageName;
  extraDevToolsConfig = ___config.extraDevToolsConfig;
  getPublicInstance = ___config.getPublicInstance;
  getRootHostContext = ___config.getRootHostContext;
  getChildHostContext = ___config.getChildHostContext;
  prepareForCommit = ___config.prepareForCommit;
  resetAfterCommit = ___config.resetAfterCommit;
  createInstance = ___config.createInstance;
  ___config.cloneMutableInstance;
  appendInitialChild = ___config.appendInitialChild;
  finalizeInitialChildren = ___config.finalizeInitialChildren;
  shouldSetTextContent = ___config.shouldSetTextContent;
  createTextInstance = ___config.createTextInstance;
  ___config.cloneMutableTextInstance;
  scheduleTimeout = ___config.scheduleTimeout;
  cancelTimeout = ___config.cancelTimeout;
  noTimeout = ___config.noTimeout;
  isPrimaryRenderer = ___config.isPrimaryRenderer;
  ___config.warnsIfNotActing;
  supportsMutation = ___config.supportsMutation;
  supportsPersistence = ___config.supportsPersistence;
  supportsHydration = ___config.supportsHydration;
  getInstanceFromNode = ___config.getInstanceFromNode;
  ___config.beforeActiveInstanceBlur;
  preparePortalMount = ___config.preparePortalMount;
  ___config.prepareScopeUpdate;
  ___config.getInstanceFromScope;
  setCurrentUpdatePriority = ___config.setCurrentUpdatePriority;
  getCurrentUpdatePriority = ___config.getCurrentUpdatePriority;
  resolveUpdatePriority = ___config.resolveUpdatePriority;
  trackSchedulerEvent = ___config.trackSchedulerEvent;
  resolveEventType = ___config.resolveEventType;
  resolveEventTimeStamp = ___config.resolveEventTimeStamp;
  shouldAttemptEagerTransition = ___config.shouldAttemptEagerTransition;
  detachDeletedInstance = ___config.detachDeletedInstance;
  ___config.requestPostPaintCallback;
  maySuspendCommit = ___config.maySuspendCommit;
  maySuspendCommitOnUpdate = ___config.maySuspendCommitOnUpdate;
  maySuspendCommitInSyncRender = ___config.maySuspendCommitInSyncRender;
  preloadInstance = ___config.preloadInstance;
  startSuspendingCommit = ___config.startSuspendingCommit;
  suspendInstance = ___config.suspendInstance;
  ___config.suspendOnActiveViewTransition;
  waitForCommitToBeReady = ___config.waitForCommitToBeReady;
  getSuspendedCommitReason = ___config.getSuspendedCommitReason;
  NotPendingTransition = ___config.NotPendingTransition;
  HostTransitionContext = ___config.HostTransitionContext;
  resetFormInstance = ___config.resetFormInstance;
  bindToConsole = ___config.bindToConsole;
  supportsMicrotasks = ___config.supportsMicrotasks;
  scheduleMicrotask = ___config.scheduleMicrotask;
  supportsTestSelectors = ___config.supportsTestSelectors;
  findFiberRoot = ___config.findFiberRoot;
  getBoundingRect = ___config.getBoundingRect;
  getTextContent = ___config.getTextContent;
  isHiddenSubtree = ___config.isHiddenSubtree;
  matchAccessibilityRole = ___config.matchAccessibilityRole;
  setFocusIfFocusable = ___config.setFocusIfFocusable;
  setupIntersectionObserver = ___config.setupIntersectionObserver;
  appendChild = ___config.appendChild;
  appendChildToContainer = ___config.appendChildToContainer;
  commitTextUpdate = ___config.commitTextUpdate;
  commitMount = ___config.commitMount;
  commitUpdate = ___config.commitUpdate;
  insertBefore = ___config.insertBefore;
  insertInContainerBefore = ___config.insertInContainerBefore;
  removeChild = ___config.removeChild;
  removeChildFromContainer = ___config.removeChildFromContainer;
  resetTextContent = ___config.resetTextContent;
  hideInstance = ___config.hideInstance;
  hideTextInstance = ___config.hideTextInstance;
  unhideInstance = ___config.unhideInstance;
  unhideTextInstance = ___config.unhideTextInstance;
  ___config.cancelViewTransitionName;
  ___config.cancelRootViewTransitionName;
  ___config.restoreRootViewTransitionName;
  ___config.cloneRootViewTransitionContainer;
  ___config.removeRootViewTransitionClone;
  ___config.measureClonedInstance;
  ___config.hasInstanceChanged;
  ___config.hasInstanceAffectedParent;
  ___config.startViewTransition;
  ___config.startGestureTransition;
  ___config.stopViewTransition;
  ___config.getCurrentGestureOffset;
  ___config.createViewTransitionInstance;
  clearContainer = ___config.clearContainer;
  ___config.createFragmentInstance;
  ___config.updateFragmentInstanceFiber;
  ___config.commitNewChildToFragmentInstance;
  ___config.deleteChildFromFragmentInstance;
  cloneInstance = ___config.cloneInstance;
  createContainerChildSet = ___config.createContainerChildSet;
  appendChildToContainerChildSet = ___config.appendChildToContainerChildSet;
  finalizeContainerChildren = ___config.finalizeContainerChildren;
  replaceContainerChildren = ___config.replaceContainerChildren;
  cloneHiddenInstance = ___config.cloneHiddenInstance;
  cloneHiddenTextInstance = ___config.cloneHiddenTextInstance;
  isSuspenseInstancePending = ___config.isSuspenseInstancePending;
  isSuspenseInstanceFallback = ___config.isSuspenseInstanceFallback;
  getSuspenseInstanceFallbackErrorDetails = ___config.getSuspenseInstanceFallbackErrorDetails;
  registerSuspenseInstanceRetry = ___config.registerSuspenseInstanceRetry;
  canHydrateFormStateMarker = ___config.canHydrateFormStateMarker;
  isFormStateMarkerMatching = ___config.isFormStateMarkerMatching;
  getNextHydratableSibling = ___config.getNextHydratableSibling;
  getNextHydratableSiblingAfterSingleton = ___config.getNextHydratableSiblingAfterSingleton;
  getFirstHydratableChild = ___config.getFirstHydratableChild;
  getFirstHydratableChildWithinContainer = ___config.getFirstHydratableChildWithinContainer;
  getFirstHydratableChildWithinActivityInstance = ___config.getFirstHydratableChildWithinActivityInstance;
  getFirstHydratableChildWithinSuspenseInstance = ___config.getFirstHydratableChildWithinSuspenseInstance;
  getFirstHydratableChildWithinSingleton = ___config.getFirstHydratableChildWithinSingleton;
  canHydrateInstance = ___config.canHydrateInstance;
  canHydrateTextInstance = ___config.canHydrateTextInstance;
  canHydrateActivityInstance = ___config.canHydrateActivityInstance;
  canHydrateSuspenseInstance = ___config.canHydrateSuspenseInstance;
  hydrateInstance = ___config.hydrateInstance;
  hydrateTextInstance = ___config.hydrateTextInstance;
  hydrateActivityInstance = ___config.hydrateActivityInstance;
  hydrateSuspenseInstance = ___config.hydrateSuspenseInstance;
  getNextHydratableInstanceAfterActivityInstance = ___config.getNextHydratableInstanceAfterActivityInstance;
  getNextHydratableInstanceAfterSuspenseInstance = ___config.getNextHydratableInstanceAfterSuspenseInstance;
  commitHydratedInstance = ___config.commitHydratedInstance;
  commitHydratedContainer = ___config.commitHydratedContainer;
  commitHydratedActivityInstance = ___config.commitHydratedActivityInstance;
  commitHydratedSuspenseInstance = ___config.commitHydratedSuspenseInstance;
  finalizeHydratedChildren = ___config.finalizeHydratedChildren;
  flushHydrationEvents = ___config.flushHydrationEvents;
  ___config.clearActivityBoundary;
  clearSuspenseBoundary = ___config.clearSuspenseBoundary;
  ___config.clearActivityBoundaryFromContainer;
  clearSuspenseBoundaryFromContainer = ___config.clearSuspenseBoundaryFromContainer;
  hideDehydratedBoundary = ___config.hideDehydratedBoundary;
  unhideDehydratedBoundary = ___config.unhideDehydratedBoundary;
  shouldDeleteUnhydratedTailInstances = ___config.shouldDeleteUnhydratedTailInstances;
  diffHydratedPropsForDevWarnings = ___config.diffHydratedPropsForDevWarnings;
  diffHydratedTextForDevWarnings = ___config.diffHydratedTextForDevWarnings;
  describeHydratableInstanceForDevWarnings = ___config.describeHydratableInstanceForDevWarnings;
  validateHydratableInstance = ___config.validateHydratableInstance;
  validateHydratableTextInstance = ___config.validateHydratableTextInstance;
  supportsResources = ___config.supportsResources;
  isHostHoistableType = ___config.isHostHoistableType;
  getHoistableRoot = ___config.getHoistableRoot;
  getResource = ___config.getResource;
  acquireResource = ___config.acquireResource;
  releaseResource = ___config.releaseResource;
  hydrateHoistable = ___config.hydrateHoistable;
  mountHoistable = ___config.mountHoistable;
  unmountHoistable = ___config.unmountHoistable;
  createHoistableInstance = ___config.createHoistableInstance;
  prepareToCommitHoistables = ___config.prepareToCommitHoistables;
  mayResourceSuspendCommit = ___config.mayResourceSuspendCommit;
  preloadResource = ___config.preloadResource;
  suspendResource = ___config.suspendResource;
  supportsSingletons = ___config.supportsSingletons;
  resolveSingletonInstance = ___config.resolveSingletonInstance;
  acquireSingletonInstance = ___config.acquireSingletonInstance;
  releaseSingletonInstance = ___config.releaseSingletonInstance;
  isHostSingletonType = ___config.isHostSingletonType;
  isSingletonScope = ___config.isSingletonScope;
  valueStack = __arrNew();
  fiberStack = __arrNew();
  index_jscomp_0 = -1;
  emptyContextObject = {};
  Object.freeze(emptyContextObject);
  clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
  log_1 = Math.log;
  LN2 = Math.LN2;
  nextTransitionUpdateLane = 256;
  nextTransitionDeferredLane = 262144;
  nextRetryLane = 4194304;
  scheduleCallback_3 = Scheduler.unstable_scheduleCallback;
  cancelCallback_1 = Scheduler.unstable_cancelCallback;
  shouldYield = Scheduler.unstable_shouldYield;
  requestPaint = Scheduler.unstable_requestPaint;
  now_1 = Scheduler.unstable_now;
  ImmediatePriority = Scheduler.unstable_ImmediatePriority;
  UserBlockingPriority = Scheduler.unstable_UserBlockingPriority;
  NormalPriority_1 = Scheduler.unstable_NormalPriority;
  IdlePriority = Scheduler.unstable_IdlePriority;
  log = Scheduler.log;
  unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue;
  rendererID = undefined;
  injectedHook = undefined;
  hasLoggedError = !1;
  isDevToolsPresent = "undefined" !== typeOfJS(__REACT_DEVTOOLS_GLOBAL_HOOK__);
  lastResetTime = 0;
  if ("object" === typeOfJS(performance) && "function" === typeOfJS(performance.now)) {
    localPerformance = performance;
    getCurrentTime = function () {
      return localPerformance.now();
    };
  } else {
    localDate = Date;
    getCurrentTime = function () {
      return localDate.now();
    };
  }
  objectIs = "function" === typeOfJS(Object.is) ? Object.is : is;
  reportGlobalError = "function" === typeOfJS(reportError) ? reportError : function (__error) {
    let event;
    if ("object" === typeOfJS(window) && "function" === typeOfJS(window.ErrorEvent)) {
      event = __new(window.ErrorEvent, "error", {
        bubbles: !0,
        cancelable: !0,
        message: "object" === typeOfJS(__error) && undefined !== __error && "string" === typeOfJS(__error.message) ? String(__error.message) : String(__error),
        error: __error
      });
      if (!window.dispatchEvent(event)) return;
    } else if ("object" === typeOfJS(process) && "function" === typeOfJS(process.emit)) {
      process.emit("uncaughtException", __error);
      return;
    }
    console.error(__error);
  };
  hasOwnProperty = __protoOf(Object).hasOwnProperty;
  supportsUserTiming = "undefined" !== typeOfJS(console) && "function" === typeOfJS(console.timeStamp) && "undefined" !== typeOfJS(performance) && "function" === typeOfJS(performance.measure);
  currentTrack = "Blocking";
  alreadyWarnedForDeepEquality = !1;
  reusableComponentDevToolDetails = {
    color: "primary",
    properties: undefined,
    tooltipText: "",
    track: "Components \u269b"
  };
  reusableComponentOptions = {
    start: -0,
    end: -0,
    detail: {
      devtools: reusableComponentDevToolDetails
    }
  };
  resuableChangedPropsEntry = __arrNew("Changed Props", "");
  reusableDeeplyEqualPropsEntry = __arrNew("Changed Props", "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.");
  disabledDepth = 0;
  disabledLog.__reactDisabledLog = !0;
  reentry = !1;
  componentFrameCache = __new("function" === typeOfJS(WeakMap) ? WeakMap : Map);
  CapturedStacks = __new(WeakMap);
  forkStack = __arrNew();
  forkStackIndex = 0;
  treeForkProvider = undefined;
  treeForkCount = 0;
  idStack = __arrNew();
  idStackIndex = 0;
  treeContextProvider = undefined;
  treeContextId = 1;
  treeContextOverflow = "";
  contextStackCursor = createCursor(undefined);
  contextFiberStackCursor = createCursor(undefined);
  rootInstanceStackCursor = createCursor(undefined);
  hostTransitionProviderCursor = createCursor(undefined);
  needsEscaping = __re("[\"'&<>\\n\\t]|^\\s|\\s$", "");
  current = undefined;
  isRendering = !1;
  hydrationParentFiber = undefined;
  nextHydratableInstance = undefined;
  isHydrating = !1;
  didSuspendOrErrorDEV = !1;
  hydrationDiffRootDEV = undefined;
  hydrationErrors = undefined;
  rootOrSingletonContext = !1;
  HydrationMismatchException = Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React.");
  NoMode = 0;
  valueCursor = createCursor(undefined);
  rendererCursorDEV = createCursor(undefined);
  renderer2CursorDEV = createCursor(undefined);
  rendererSigil = {};
  currentlyRenderingFiber_1 = undefined;
  lastContextDependency = undefined;
  isDisallowedContextReadInDEV = !1;
  AbortControllerLocal = "undefined" !== typeOfJS(AbortController) ? AbortController : function () {
    let listeners, signal;
    listeners = __arrNew();
    signal = this.signal = {
      aborted: !1,
      addEventListener: function (__type, listener) {
        __push(listeners, listener);
      }
    };
    this.abort = function () {
      signal.aborted = !0;
      __forEach(listeners, function (listener) {
        return listener();
      });
    };
  };
  scheduleCallback_2 = Scheduler.unstable_scheduleCallback;
  NormalPriority = Scheduler.unstable_NormalPriority;
  CacheContext = {
    $$typeof: REACT_CONTEXT_TYPE,
    Consumer: undefined,
    Provider: undefined,
    _currentValue: undefined,
    _currentValue2: undefined,
    _threadCount: 0,
    _currentRenderer: undefined,
    _currentRenderer2: undefined
  };
  now = Scheduler.unstable_now;
  createTask = console.createTask ? console.createTask : function () {
    return undefined;
  };
  renderStartTime = -0;
  commitStartTime = -0;
  commitEndTime = -0;
  commitErrors = undefined;
  profilerStartTime = -1.1;
  profilerEffectDuration = -0;
  componentEffectDuration = -0;
  componentEffectStartTime = -1.1;
  componentEffectEndTime = -1.1;
  componentEffectErrors = undefined;
  componentEffectSpawnedUpdate = !1;
  blockingClampTime = -0;
  blockingUpdateTime = -1.1;
  blockingUpdateTask = undefined;
  blockingUpdateType = 0;
  blockingUpdateMethodName = undefined;
  blockingUpdateComponentName = undefined;
  blockingEventTime = -1.1;
  blockingEventType = undefined;
  blockingEventRepeatTime = -1.1;
  blockingSuspendedTime = -1.1;
  transitionClampTime = -0;
  transitionStartTime = -1.1;
  transitionUpdateTime = -1.1;
  transitionUpdateType = 0;
  transitionUpdateTask = undefined;
  transitionUpdateMethodName = undefined;
  transitionUpdateComponentName = undefined;
  transitionEventTime = -1.1;
  transitionEventType = undefined;
  transitionEventRepeatTime = -1.1;
  transitionSuspendedTime = -1.1;
  animatingTask = undefined;
  yieldReason = 0;
  yieldStartTime = -1.1;
  currentUpdateIsNested = !1;
  nestedUpdateScheduled = !1;
  firstScheduledRoot = undefined;
  lastScheduledRoot = undefined;
  didScheduleMicrotask = !1;
  didScheduleMicrotask_act = !1;
  mightHavePendingSyncWork = !1;
  isFlushingWork = !1;
  currentEventTransitionLane = 0;
  fakeActCallbackNode_1 = {};
  currentEntangledListeners = undefined;
  currentEntangledPendingCount = 0;
  currentEntangledLane = 0;
  currentEntangledActionThenable = undefined;
  prevOnStartTransitionFinish = ReactSharedInternals.S;
  ReactSharedInternals.S = function (transition, returnValue) {
    let newEventTime, newEventType;
    globalMostRecentTransitionTime = now_1();
    if ("object" === typeOfJS(returnValue) && undefined !== returnValue && "function" === typeOfJS(returnValue.then)) {
      if (0 > transitionStartTime && 0 > transitionUpdateTime) {
        transitionStartTime = now();
        newEventTime = resolveEventTimeStamp();
        newEventType = resolveEventType();
        if (newEventTime !== transitionEventRepeatTime || newEventType !== transitionEventType) transitionEventRepeatTime = -1.1;
        transitionEventTime = newEventTime;
        transitionEventType = newEventType;
      }
      entangleAsyncAction(transition, returnValue);
    }
    undefined !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
  };
  resumedCache = createCursor(undefined);
  ReactStrictModeWarnings = {
    recordUnsafeLifecycleWarnings: function () {},
    flushPendingUnsafeLifecycleWarnings: function () {},
    recordLegacyContextWarning: function () {},
    flushLegacyContextWarning: function () {},
    discardPendingWarnings: function () {}
  };
  pendingComponentWillMountWarnings = __arrNew();
  pendingUNSAFE_ComponentWillMountWarnings = __arrNew();
  pendingComponentWillReceivePropsWarnings = __arrNew();
  pendingUNSAFE_ComponentWillReceivePropsWarnings = __arrNew();
  pendingComponentWillUpdateWarnings = __arrNew();
  pendingUNSAFE_ComponentWillUpdateWarnings = __arrNew();
  didWarnAboutUnsafeLifecycles = __new(Set);
  ReactStrictModeWarnings.recordUnsafeLifecycleWarnings = function (fiber, instance) {
    didWarnAboutUnsafeLifecycles.has(fiber.type) || ("function" === typeOfJS(instance.componentWillMount) && !0 !== instance.componentWillMount.__suppressDeprecationWarning && __push(pendingComponentWillMountWarnings, fiber), fiber.mode & 8 && "function" === typeOfJS(instance.UNSAFE_componentWillMount) && __push(pendingUNSAFE_ComponentWillMountWarnings, fiber), "function" === typeOfJS(instance.componentWillReceiveProps) && !0 !== instance.componentWillReceiveProps.__suppressDeprecationWarning && __push(pendingComponentWillReceivePropsWarnings, fiber), fiber.mode & 8 && "function" === typeOfJS(instance.UNSAFE_componentWillReceiveProps) && __push(pendingUNSAFE_ComponentWillReceivePropsWarnings, fiber), "function" === typeOfJS(instance.componentWillUpdate) && !0 !== instance.componentWillUpdate.__suppressDeprecationWarning && __push(pendingComponentWillUpdateWarnings, fiber), fiber.mode & 8 && "function" === typeOfJS(instance.UNSAFE_componentWillUpdate) && __push(pendingUNSAFE_ComponentWillUpdateWarnings, fiber));
  };
  ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings = function () {
    let componentWillMountUniqueNames, UNSAFE_componentWillMountUniqueNames, componentWillReceivePropsUniqueNames, UNSAFE_componentWillReceivePropsUniqueNames, componentWillUpdateUniqueNames, UNSAFE_componentWillUpdateUniqueNames, sortedNames;
    componentWillMountUniqueNames = __new(Set);
    0 < __len(pendingComponentWillMountWarnings) && (__forEach(pendingComponentWillMountWarnings, function (fiber) {
      componentWillMountUniqueNames.add(getComponentNameFromFiber(fiber) || "Component");
      didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), pendingComponentWillMountWarnings = __arrNew());
    UNSAFE_componentWillMountUniqueNames = __new(Set);
    0 < __len(pendingUNSAFE_ComponentWillMountWarnings) && (__forEach(pendingUNSAFE_ComponentWillMountWarnings, function (fiber) {
      UNSAFE_componentWillMountUniqueNames.add(getComponentNameFromFiber(fiber) || "Component");
      didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), pendingUNSAFE_ComponentWillMountWarnings = __arrNew());
    componentWillReceivePropsUniqueNames = __new(Set);
    0 < __len(pendingComponentWillReceivePropsWarnings) && (__forEach(pendingComponentWillReceivePropsWarnings, function (fiber) {
      componentWillReceivePropsUniqueNames.add(getComponentNameFromFiber(fiber) || "Component");
      didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), pendingComponentWillReceivePropsWarnings = __arrNew());
    UNSAFE_componentWillReceivePropsUniqueNames = __new(Set);
    0 < __len(pendingUNSAFE_ComponentWillReceivePropsWarnings) && (__forEach(pendingUNSAFE_ComponentWillReceivePropsWarnings, function (fiber) {
      UNSAFE_componentWillReceivePropsUniqueNames.add(getComponentNameFromFiber(fiber) || "Component");
      didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), pendingUNSAFE_ComponentWillReceivePropsWarnings = __arrNew());
    componentWillUpdateUniqueNames = __new(Set);
    0 < __len(pendingComponentWillUpdateWarnings) && (__forEach(pendingComponentWillUpdateWarnings, function (fiber) {
      componentWillUpdateUniqueNames.add(getComponentNameFromFiber(fiber) || "Component");
      didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), pendingComponentWillUpdateWarnings = __arrNew());
    UNSAFE_componentWillUpdateUniqueNames = __new(Set);
    0 < __len(pendingUNSAFE_ComponentWillUpdateWarnings) && (__forEach(pendingUNSAFE_ComponentWillUpdateWarnings, function (fiber) {
      UNSAFE_componentWillUpdateUniqueNames.add(getComponentNameFromFiber(fiber) || "Component");
      didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), pendingUNSAFE_ComponentWillUpdateWarnings = __arrNew());
    if (0 < UNSAFE_componentWillMountUniqueNames.size) {
      sortedNames = setToSortedString(UNSAFE_componentWillMountUniqueNames);
      console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", sortedNames);
    }
    0 < UNSAFE_componentWillReceivePropsUniqueNames.size && (sortedNames = setToSortedString(UNSAFE_componentWillReceivePropsUniqueNames), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", sortedNames));
    0 < UNSAFE_componentWillUpdateUniqueNames.size && (sortedNames = setToSortedString(UNSAFE_componentWillUpdateUniqueNames), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", sortedNames));
    0 < componentWillMountUniqueNames.size && (sortedNames = setToSortedString(componentWillMountUniqueNames), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", sortedNames));
    0 < componentWillReceivePropsUniqueNames.size && (sortedNames = setToSortedString(componentWillReceivePropsUniqueNames), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", sortedNames));
    0 < componentWillUpdateUniqueNames.size && (sortedNames = setToSortedString(componentWillUpdateUniqueNames), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", sortedNames));
  };
  pendingLegacyContextWarning = __new(Map);
  didWarnAboutLegacyContext = __new(Set);
  ReactStrictModeWarnings.recordLegacyContextWarning = function (fiber, instance) {
    let strictRoot, node;
    strictRoot = undefined;
    for (node = fiber; undefined !== node;) node.mode & 8 && (strictRoot = node), node = node.return;
    undefined === strictRoot ? console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.") : !didWarnAboutLegacyContext.has(fiber.type) && (node = pendingLegacyContextWarning.get(strictRoot), fiber.type.contextTypes !== undefined || fiber.type.childContextTypes !== undefined || undefined !== instance && "function" === typeOfJS(instance.getChildContext)) && (void 0 === node && (node = __arrNew(), pendingLegacyContextWarning.set(strictRoot, node)), __push(node, fiber));
  };
  ReactStrictModeWarnings.flushLegacyContextWarning = function () {
    __forEach(pendingLegacyContextWarning, function (fiberArray) {
      let firstFiber, uniqueNames, sortedNames;
      if (0 !== __len(fiberArray)) {
        firstFiber = fiberArray[0];
        uniqueNames = __new(Set);
        __forEach(fiberArray, function (fiber) {
          uniqueNames.add(getComponentNameFromFiber(fiber) || "Component");
          didWarnAboutLegacyContext.add(fiber.type);
        });
        sortedNames = setToSortedString(uniqueNames);
        runWithFiberInDEV(firstFiber, function () {
          console.error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context", sortedNames);
        });
      }
    });
  };
  ReactStrictModeWarnings.discardPendingWarnings = function () {
    pendingComponentWillMountWarnings = __arrNew();
    pendingUNSAFE_ComponentWillMountWarnings = __arrNew();
    pendingComponentWillReceivePropsWarnings = __arrNew();
    pendingUNSAFE_ComponentWillReceivePropsWarnings = __arrNew();
    pendingComponentWillUpdateWarnings = __arrNew();
    pendingUNSAFE_ComponentWillUpdateWarnings = __arrNew();
    pendingLegacyContextWarning = __new(Map);
  };
  callComponent = {
    react_stack_bottom_frame: function (Component, props, secondArg) {
      let wasRendering;
      wasRendering = isRendering;
      isRendering = !0;
      try {
        return Component(props, secondArg);
      } finally {
        isRendering = wasRendering;
      }
    }
  };
  callComponentInDEV = __partial((..._bindArgs53) => __applyFn(callComponent.react_stack_bottom_frame, ..._bindArgs53), callComponent);
  callRender = {
    react_stack_bottom_frame: function (instance) {
      let wasRendering;
      wasRendering = isRendering;
      isRendering = !0;
      try {
        return instance.render();
      } finally {
        isRendering = wasRendering;
      }
    }
  };
  callRenderInDEV = __partial((..._bindArgs54) => __applyFn(callRender.react_stack_bottom_frame, ..._bindArgs54), callRender);
  callComponentDidMount = {
    react_stack_bottom_frame: function (finishedWork, instance) {
      try {
        instance.componentDidMount();
      } catch (__error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }
  };
  callComponentDidMountInDEV = __partial((..._bindArgs55) => __applyFn(callComponentDidMount.react_stack_bottom_frame, ..._bindArgs55), callComponentDidMount);
  callComponentDidUpdate = {
    react_stack_bottom_frame: function (finishedWork, instance, prevProps, prevState, snapshot) {
      try {
        instance.componentDidUpdate(prevProps, prevState, snapshot);
      } catch (__error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }
  };
  callComponentDidUpdateInDEV = __partial((..._bindArgs56) => __applyFn(callComponentDidUpdate.react_stack_bottom_frame, ..._bindArgs56), callComponentDidUpdate);
  callComponentDidCatch = {
    react_stack_bottom_frame: function (instance, errorInfo) {
      let stack;
      stack = errorInfo.stack;
      instance.componentDidCatch(errorInfo.value, {
        componentStack: undefined !== stack ? stack : ""
      });
    }
  };
  callComponentDidCatchInDEV = __partial((..._bindArgs57) => __applyFn(callComponentDidCatch.react_stack_bottom_frame, ..._bindArgs57), callComponentDidCatch);
  callComponentWillUnmount = {
    react_stack_bottom_frame: function (current, nearestMountedAncestor, instance) {
      try {
        instance.componentWillUnmount();
      } catch (__error) {
        captureCommitPhaseError(current, nearestMountedAncestor, __error);
      }
    }
  };
  callComponentWillUnmountInDEV = __partial((..._bindArgs58) => __applyFn(callComponentWillUnmount.react_stack_bottom_frame, ..._bindArgs58), callComponentWillUnmount);
  callCreate = {
    react_stack_bottom_frame: function (effect) {
      let create;
      create = effect.create;
      effect = effect.inst;
      create = create();
      return effect.destroy = create;
    }
  };
  callCreateInDEV = __partial((..._bindArgs59) => __applyFn(callCreate.react_stack_bottom_frame, ..._bindArgs59), callCreate);
  callDestroy = {
    react_stack_bottom_frame: function (current, nearestMountedAncestor, destroy) {
      try {
        destroy();
      } catch (__error) {
        captureCommitPhaseError(current, nearestMountedAncestor, __error);
      }
    }
  };
  callDestroyInDEV = __partial((..._bindArgs60) => __applyFn(callDestroy.react_stack_bottom_frame, ..._bindArgs60), callDestroy);
  callLazyInit = {
    react_stack_bottom_frame: function (lazy) {
      let init;
      init = lazy._init;
      return init(lazy._payload);
    }
  };
  callLazyInitInDEV = __partial((..._bindArgs61) => __applyFn(callLazyInit.react_stack_bottom_frame, ..._bindArgs61), callLazyInit);
  SuspenseException = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`.");
  SuspenseyCommitException = Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React.");
  SuspenseActionException = Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary.");
  noopSuspenseyCommitThenable = {
    then: function () {
      console.error('Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.');
    }
  };
  suspendedThenable = undefined;
  needsToResetSuspendedThenableDEV = !1;
  thenableState_1 = undefined;
  thenableIndexCounter_1 = 0;
  currentDebugInfo = undefined;
  didWarnAboutGenerators = didWarnAboutMaps = !1;
  ownerHasKeyUseWarning = {};
  ownerHasFunctionTypeWarning = {};
  ownerHasSymbolTypeWarning = {};
  warnForMissingKey = function (returnFiber, workInProgress, child) {
    let componentName, componentKey, currentComponentErrorInfo, childOwnerAppendix;
    if (undefined !== child && "object" === typeOfJS(child) && child._store && (!child._store.validated && child.key === undefined || 2 === child._store.validated)) {
      if ("object" !== typeOfJS(child._store)) throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      child._store.validated = 1;
      componentName = getComponentNameFromFiber(returnFiber);
      componentKey = componentName || "null";
      if (!ownerHasKeyUseWarning[componentKey]) {
        ownerHasKeyUseWarning[componentKey] = !0;
        child = child._owner;
        returnFiber = returnFiber._debugOwner;
        currentComponentErrorInfo = "";
        returnFiber && "number" === typeOfJS(returnFiber.tag) && (componentKey = getComponentNameFromFiber(returnFiber)) && (currentComponentErrorInfo = __cat(__cat("\n\nCheck the render method of `", componentKey), "`."));
        currentComponentErrorInfo || componentName && (currentComponentErrorInfo = __cat(__cat("\n\nCheck the top-level render call using <", componentName), ">."));
        childOwnerAppendix = "";
        child !== undefined && returnFiber !== child && (componentName = undefined, "number" === typeOfJS(child.tag) ? componentName = getComponentNameFromFiber(child) : "string" === typeOfJS(child.name) && (componentName = child.name), componentName && (childOwnerAppendix = __cat(__cat(" It was passed a child from ", componentName), ".")));
        runWithFiberInDEV(workInProgress, function () {
          console.error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.', currentComponentErrorInfo, childOwnerAppendix);
        });
      }
    }
  };
  reconcileChildFibers = createChildReconciler(!0);
  mountChildFibers = createChildReconciler(!1);
  OffscreenVisible = 1;
  OffscreenPassiveEffectsConnected = 2;
  concurrentQueues = __arrNew();
  concurrentQueuesIndex = 0;
  concurrentlyUpdatedLanes = 0;
  UpdateState = 0;
  ReplaceState = 1;
  ForceUpdate = 2;
  CaptureUpdate = 3;
  hasForceUpdate = !1;
  didWarnUpdateInsideUpdate = !1;
  currentlyProcessingQueue = undefined;
  didReadFromEntangledAsyncAction = !1;
  currentTreeHiddenStackCursor = createCursor(undefined);
  prevEntangledRenderLanesCursor = createCursor(0);
  suspenseHandlerStackCursor = createCursor(undefined);
  shellBoundary = undefined;
  SubtreeSuspenseContextMask = 1;
  ForceSuspenseFallback = 2;
  suspenseStackCursor = createCursor(0);
  NoFlags = 0;
  HasEffect = 1;
  Insertion = 2;
  Layout = 4;
  Passive = 8;
  didWarnAboutMismatchedHooksForComponent = __new(Set);
  didWarnAboutUseWrappedInTryCatch = __new(Set);
  didWarnAboutAsyncClientComponent = __new(Set);
  didWarnAboutUseFormState = __new(Set);
  renderLanes = 0;
  currentlyRenderingFiber = undefined;
  currentHook = undefined;
  workInProgressHook = undefined;
  didScheduleRenderPhaseUpdate = !1;
  didScheduleRenderPhaseUpdateDuringThisPass = !1;
  shouldDoubleInvokeUserFnsInHooksDEV = !1;
  localIdCounter = 0;
  thenableIndexCounter = 0;
  thenableState = undefined;
  globalClientIdCounter = 0;
  RE_RENDER_LIMIT = 25;
  currentHookNameInDev = undefined;
  hookTypesDev = undefined;
  hookTypesUpdateIndexDev = -1;
  ignorePreviousDependencies = !1;
  ContextOnlyDispatcher = {
    readContext: readContext,
    use: use,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useInsertionEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError,
    useDeferredValue: throwInvalidHookError,
    useTransition: throwInvalidHookError,
    useSyncExternalStore: throwInvalidHookError,
    useId: throwInvalidHookError,
    useHostTransitionStatus: throwInvalidHookError,
    useFormState: throwInvalidHookError,
    useActionState: throwInvalidHookError,
    useOptimistic: throwInvalidHookError,
    useMemoCache: throwInvalidHookError,
    useCacheRefresh: throwInvalidHookError
  };
  ContextOnlyDispatcher.useEffectEvent = throwInvalidHookError;
  HooksDispatcherOnMountInDEV = undefined;
  HooksDispatcherOnMountWithHookTypesInDEV = undefined;
  HooksDispatcherOnUpdateInDEV = undefined;
  HooksDispatcherOnRerenderInDEV = undefined;
  InvalidNestedHooksDispatcherOnMountInDEV = undefined;
  InvalidNestedHooksDispatcherOnUpdateInDEV = undefined;
  InvalidNestedHooksDispatcherOnRerenderInDEV = undefined;
  HooksDispatcherOnMountInDEV = {
    readContext: function (context) {
      return readContext(context);
    },
    use: use,
    useCallback: function (callback, deps) {
      currentHookNameInDev = "useCallback";
      mountHookTypesDev();
      checkDepsAreArrayDev(deps);
      return mountCallback(callback, deps);
    },
    useContext: function (context) {
      currentHookNameInDev = "useContext";
      mountHookTypesDev();
      return readContext(context);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = "useEffect";
      mountHookTypesDev();
      checkDepsAreArrayDev(deps);
      return mountEffect(create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = "useImperativeHandle";
      mountHookTypesDev();
      checkDepsAreArrayDev(deps);
      return mountImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      currentHookNameInDev = "useInsertionEffect";
      mountHookTypesDev();
      checkDepsAreArrayDev(deps);
      mountEffectImpl(4, Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = "useLayoutEffect";
      mountHookTypesDev();
      checkDepsAreArrayDev(deps);
      return mountLayoutEffect(create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      currentHookNameInDev = "useMemo";
      mountHookTypesDev();
      checkDepsAreArrayDev(deps);
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountMemo(create, deps);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      currentHookNameInDev = "useReducer";
      mountHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountReducer(reducer, initialArg, init);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function (initialValue) {
      currentHookNameInDev = "useRef";
      mountHookTypesDev();
      return mountRef(initialValue);
    },
    useState: function (initialState) {
      let prevDispatcher;
      currentHookNameInDev = "useState";
      mountHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountState(initialState);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      currentHookNameInDev = "useDebugValue";
      mountHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      currentHookNameInDev = "useDeferredValue";
      mountHookTypesDev();
      return mountDeferredValue(value, initialValue);
    },
    useTransition: function () {
      currentHookNameInDev = "useTransition";
      mountHookTypesDev();
      return mountTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      currentHookNameInDev = "useSyncExternalStore";
      mountHookTypesDev();
      return mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      currentHookNameInDev = "useId";
      mountHookTypesDev();
      return mountId();
    },
    useFormState: function (action, initialState) {
      currentHookNameInDev = "useFormState";
      mountHookTypesDev();
      warnOnUseFormStateInDev();
      return mountActionState(action, initialState);
    },
    useActionState: function (action, initialState) {
      currentHookNameInDev = "useActionState";
      mountHookTypesDev();
      return mountActionState(action, initialState);
    },
    useOptimistic: function (passthrough) {
      currentHookNameInDev = "useOptimistic";
      mountHookTypesDev();
      return mountOptimistic(passthrough);
    },
    useHostTransitionStatus: useHostTransitionStatus,
    useMemoCache: useMemoCache,
    useCacheRefresh: function () {
      currentHookNameInDev = "useCacheRefresh";
      mountHookTypesDev();
      return mountRefresh();
    },
    useEffectEvent: function (callback) {
      currentHookNameInDev = "useEffectEvent";
      mountHookTypesDev();
      return mountEvent(callback);
    }
  };
  HooksDispatcherOnMountWithHookTypesInDEV = {
    readContext: function (context) {
      return readContext(context);
    },
    use: use,
    useCallback: function (callback, deps) {
      currentHookNameInDev = "useCallback";
      updateHookTypesDev();
      return mountCallback(callback, deps);
    },
    useContext: function (context) {
      currentHookNameInDev = "useContext";
      updateHookTypesDev();
      return readContext(context);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = "useEffect";
      updateHookTypesDev();
      return mountEffect(create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = "useImperativeHandle";
      updateHookTypesDev();
      return mountImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      currentHookNameInDev = "useInsertionEffect";
      updateHookTypesDev();
      mountEffectImpl(4, Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = "useLayoutEffect";
      updateHookTypesDev();
      return mountLayoutEffect(create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      currentHookNameInDev = "useMemo";
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountMemo(create, deps);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      currentHookNameInDev = "useReducer";
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountReducer(reducer, initialArg, init);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function (initialValue) {
      currentHookNameInDev = "useRef";
      updateHookTypesDev();
      return mountRef(initialValue);
    },
    useState: function (initialState) {
      let prevDispatcher;
      currentHookNameInDev = "useState";
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountState(initialState);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      currentHookNameInDev = "useDebugValue";
      updateHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      currentHookNameInDev = "useDeferredValue";
      updateHookTypesDev();
      return mountDeferredValue(value, initialValue);
    },
    useTransition: function () {
      currentHookNameInDev = "useTransition";
      updateHookTypesDev();
      return mountTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      currentHookNameInDev = "useSyncExternalStore";
      updateHookTypesDev();
      return mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      currentHookNameInDev = "useId";
      updateHookTypesDev();
      return mountId();
    },
    useActionState: function (action, initialState) {
      currentHookNameInDev = "useActionState";
      updateHookTypesDev();
      return mountActionState(action, initialState);
    },
    useFormState: function (action, initialState) {
      currentHookNameInDev = "useFormState";
      updateHookTypesDev();
      warnOnUseFormStateInDev();
      return mountActionState(action, initialState);
    },
    useOptimistic: function (passthrough) {
      currentHookNameInDev = "useOptimistic";
      updateHookTypesDev();
      return mountOptimistic(passthrough);
    },
    useHostTransitionStatus: useHostTransitionStatus,
    useMemoCache: useMemoCache,
    useCacheRefresh: function () {
      currentHookNameInDev = "useCacheRefresh";
      updateHookTypesDev();
      return mountRefresh();
    },
    useEffectEvent: function (callback) {
      currentHookNameInDev = "useEffectEvent";
      updateHookTypesDev();
      return mountEvent(callback);
    }
  };
  HooksDispatcherOnUpdateInDEV = {
    readContext: function (context) {
      return readContext(context);
    },
    use: use,
    useCallback: function (callback, deps) {
      currentHookNameInDev = "useCallback";
      updateHookTypesDev();
      return updateCallback(callback, deps);
    },
    useContext: function (context) {
      currentHookNameInDev = "useContext";
      updateHookTypesDev();
      return readContext(context);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = "useEffect";
      updateHookTypesDev();
      updateEffectImpl(2048, Passive, create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = "useImperativeHandle";
      updateHookTypesDev();
      return updateImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      currentHookNameInDev = "useInsertionEffect";
      updateHookTypesDev();
      return updateEffectImpl(4, Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = "useLayoutEffect";
      updateHookTypesDev();
      return updateEffectImpl(4, Layout, create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      currentHookNameInDev = "useMemo";
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateMemo(create, deps);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      currentHookNameInDev = "useReducer";
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateReducer(reducer, initialArg, init);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function () {
      currentHookNameInDev = "useRef";
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useState: function () {
      let prevDispatcher;
      currentHookNameInDev = "useState";
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateReducer(basicStateReducer);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      currentHookNameInDev = "useDebugValue";
      updateHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      currentHookNameInDev = "useDeferredValue";
      updateHookTypesDev();
      return updateDeferredValue(value, initialValue);
    },
    useTransition: function () {
      currentHookNameInDev = "useTransition";
      updateHookTypesDev();
      return updateTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      currentHookNameInDev = "useSyncExternalStore";
      updateHookTypesDev();
      return updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      currentHookNameInDev = "useId";
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useFormState: function (action) {
      currentHookNameInDev = "useFormState";
      updateHookTypesDev();
      warnOnUseFormStateInDev();
      return updateActionState(action);
    },
    useActionState: function (action) {
      currentHookNameInDev = "useActionState";
      updateHookTypesDev();
      return updateActionState(action);
    },
    useOptimistic: function (passthrough, reducer) {
      currentHookNameInDev = "useOptimistic";
      updateHookTypesDev();
      return updateOptimistic(passthrough, reducer);
    },
    useHostTransitionStatus: useHostTransitionStatus,
    useMemoCache: useMemoCache,
    useCacheRefresh: function () {
      currentHookNameInDev = "useCacheRefresh";
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useEffectEvent: function (callback) {
      currentHookNameInDev = "useEffectEvent";
      updateHookTypesDev();
      return updateEvent(callback);
    }
  };
  HooksDispatcherOnRerenderInDEV = {
    readContext: function (context) {
      return readContext(context);
    },
    use: use,
    useCallback: function (callback, deps) {
      currentHookNameInDev = "useCallback";
      updateHookTypesDev();
      return updateCallback(callback, deps);
    },
    useContext: function (context) {
      currentHookNameInDev = "useContext";
      updateHookTypesDev();
      return readContext(context);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = "useEffect";
      updateHookTypesDev();
      updateEffectImpl(2048, Passive, create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = "useImperativeHandle";
      updateHookTypesDev();
      return updateImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      currentHookNameInDev = "useInsertionEffect";
      updateHookTypesDev();
      return updateEffectImpl(4, Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = "useLayoutEffect";
      updateHookTypesDev();
      return updateEffectImpl(4, Layout, create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      currentHookNameInDev = "useMemo";
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnRerenderInDEV;
      try {
        return updateMemo(create, deps);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      currentHookNameInDev = "useReducer";
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnRerenderInDEV;
      try {
        return rerenderReducer(reducer, initialArg, init);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function () {
      currentHookNameInDev = "useRef";
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useState: function () {
      let prevDispatcher;
      currentHookNameInDev = "useState";
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnRerenderInDEV;
      try {
        return rerenderReducer(basicStateReducer);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      currentHookNameInDev = "useDebugValue";
      updateHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      currentHookNameInDev = "useDeferredValue";
      updateHookTypesDev();
      return rerenderDeferredValue(value, initialValue);
    },
    useTransition: function () {
      currentHookNameInDev = "useTransition";
      updateHookTypesDev();
      return rerenderTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      currentHookNameInDev = "useSyncExternalStore";
      updateHookTypesDev();
      return updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      currentHookNameInDev = "useId";
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useFormState: function (action) {
      currentHookNameInDev = "useFormState";
      updateHookTypesDev();
      warnOnUseFormStateInDev();
      return rerenderActionState(action);
    },
    useActionState: function (action) {
      currentHookNameInDev = "useActionState";
      updateHookTypesDev();
      return rerenderActionState(action);
    },
    useOptimistic: function (passthrough, reducer) {
      currentHookNameInDev = "useOptimistic";
      updateHookTypesDev();
      return rerenderOptimistic(passthrough, reducer);
    },
    useHostTransitionStatus: useHostTransitionStatus,
    useMemoCache: useMemoCache,
    useCacheRefresh: function () {
      currentHookNameInDev = "useCacheRefresh";
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useEffectEvent: function (callback) {
      currentHookNameInDev = "useEffectEvent";
      updateHookTypesDev();
      return updateEvent(callback);
    }
  };
  InvalidNestedHooksDispatcherOnMountInDEV = {
    readContext: function (context) {
      warnInvalidContextAccess();
      return readContext(context);
    },
    use: function (usable) {
      warnInvalidHookAccess();
      return use(usable);
    },
    useCallback: function (callback, deps) {
      currentHookNameInDev = "useCallback";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountCallback(callback, deps);
    },
    useContext: function (context) {
      currentHookNameInDev = "useContext";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return readContext(context);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = "useEffect";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountEffect(create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = "useImperativeHandle";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      currentHookNameInDev = "useInsertionEffect";
      warnInvalidHookAccess();
      mountHookTypesDev();
      mountEffectImpl(4, Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = "useLayoutEffect";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountLayoutEffect(create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      currentHookNameInDev = "useMemo";
      warnInvalidHookAccess();
      mountHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountMemo(create, deps);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      currentHookNameInDev = "useReducer";
      warnInvalidHookAccess();
      mountHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountReducer(reducer, initialArg, init);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function (initialValue) {
      currentHookNameInDev = "useRef";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountRef(initialValue);
    },
    useState: function (initialState) {
      let prevDispatcher;
      currentHookNameInDev = "useState";
      warnInvalidHookAccess();
      mountHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountState(initialState);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      currentHookNameInDev = "useDebugValue";
      warnInvalidHookAccess();
      mountHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      currentHookNameInDev = "useDeferredValue";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountDeferredValue(value, initialValue);
    },
    useTransition: function () {
      currentHookNameInDev = "useTransition";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      currentHookNameInDev = "useSyncExternalStore";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      currentHookNameInDev = "useId";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountId();
    },
    useFormState: function (action, initialState) {
      currentHookNameInDev = "useFormState";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountActionState(action, initialState);
    },
    useActionState: function (action, initialState) {
      currentHookNameInDev = "useActionState";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountActionState(action, initialState);
    },
    useOptimistic: function (passthrough) {
      currentHookNameInDev = "useOptimistic";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountOptimistic(passthrough);
    },
    useMemoCache: function (size) {
      warnInvalidHookAccess();
      return useMemoCache(size);
    },
    useHostTransitionStatus: useHostTransitionStatus,
    useCacheRefresh: function () {
      currentHookNameInDev = "useCacheRefresh";
      mountHookTypesDev();
      return mountRefresh();
    },
    useEffectEvent: function (callback) {
      currentHookNameInDev = "useEffectEvent";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountEvent(callback);
    }
  };
  InvalidNestedHooksDispatcherOnUpdateInDEV = {
    readContext: function (context) {
      warnInvalidContextAccess();
      return readContext(context);
    },
    use: function (usable) {
      warnInvalidHookAccess();
      return use(usable);
    },
    useCallback: function (callback, deps) {
      currentHookNameInDev = "useCallback";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateCallback(callback, deps);
    },
    useContext: function (context) {
      currentHookNameInDev = "useContext";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return readContext(context);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = "useEffect";
      warnInvalidHookAccess();
      updateHookTypesDev();
      updateEffectImpl(2048, Passive, create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = "useImperativeHandle";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      currentHookNameInDev = "useInsertionEffect";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateEffectImpl(4, Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = "useLayoutEffect";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateEffectImpl(4, Layout, create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      currentHookNameInDev = "useMemo";
      warnInvalidHookAccess();
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateMemo(create, deps);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      currentHookNameInDev = "useReducer";
      warnInvalidHookAccess();
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateReducer(reducer, initialArg, init);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function () {
      currentHookNameInDev = "useRef";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useState: function () {
      let prevDispatcher;
      currentHookNameInDev = "useState";
      warnInvalidHookAccess();
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateReducer(basicStateReducer);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      currentHookNameInDev = "useDebugValue";
      warnInvalidHookAccess();
      updateHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      currentHookNameInDev = "useDeferredValue";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateDeferredValue(value, initialValue);
    },
    useTransition: function () {
      currentHookNameInDev = "useTransition";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      currentHookNameInDev = "useSyncExternalStore";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      currentHookNameInDev = "useId";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useFormState: function (action) {
      currentHookNameInDev = "useFormState";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateActionState(action);
    },
    useActionState: function (action) {
      currentHookNameInDev = "useActionState";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateActionState(action);
    },
    useOptimistic: function (passthrough, reducer) {
      currentHookNameInDev = "useOptimistic";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateOptimistic(passthrough, reducer);
    },
    useMemoCache: function (size) {
      warnInvalidHookAccess();
      return useMemoCache(size);
    },
    useHostTransitionStatus: useHostTransitionStatus,
    useCacheRefresh: function () {
      currentHookNameInDev = "useCacheRefresh";
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useEffectEvent: function (callback) {
      currentHookNameInDev = "useEffectEvent";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateEvent(callback);
    }
  };
  InvalidNestedHooksDispatcherOnRerenderInDEV = {
    readContext: function (context) {
      warnInvalidContextAccess();
      return readContext(context);
    },
    use: function (usable) {
      warnInvalidHookAccess();
      return use(usable);
    },
    useCallback: function (callback, deps) {
      currentHookNameInDev = "useCallback";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateCallback(callback, deps);
    },
    useContext: function (context) {
      currentHookNameInDev = "useContext";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return readContext(context);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = "useEffect";
      warnInvalidHookAccess();
      updateHookTypesDev();
      updateEffectImpl(2048, Passive, create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = "useImperativeHandle";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      currentHookNameInDev = "useInsertionEffect";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateEffectImpl(4, Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = "useLayoutEffect";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateEffectImpl(4, Layout, create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      currentHookNameInDev = "useMemo";
      warnInvalidHookAccess();
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateMemo(create, deps);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      currentHookNameInDev = "useReducer";
      warnInvalidHookAccess();
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return rerenderReducer(reducer, initialArg, init);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function () {
      currentHookNameInDev = "useRef";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useState: function () {
      let prevDispatcher;
      currentHookNameInDev = "useState";
      warnInvalidHookAccess();
      updateHookTypesDev();
      prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return rerenderReducer(basicStateReducer);
      } finally {
        ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      currentHookNameInDev = "useDebugValue";
      warnInvalidHookAccess();
      updateHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      currentHookNameInDev = "useDeferredValue";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return rerenderDeferredValue(value, initialValue);
    },
    useTransition: function () {
      currentHookNameInDev = "useTransition";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return rerenderTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      currentHookNameInDev = "useSyncExternalStore";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      currentHookNameInDev = "useId";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useFormState: function (action) {
      currentHookNameInDev = "useFormState";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return rerenderActionState(action);
    },
    useActionState: function (action) {
      currentHookNameInDev = "useActionState";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return rerenderActionState(action);
    },
    useOptimistic: function (passthrough, reducer) {
      currentHookNameInDev = "useOptimistic";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return rerenderOptimistic(passthrough, reducer);
    },
    useMemoCache: function (size) {
      warnInvalidHookAccess();
      return useMemoCache(size);
    },
    useHostTransitionStatus: useHostTransitionStatus,
    useCacheRefresh: function () {
      currentHookNameInDev = "useCacheRefresh";
      updateHookTypesDev();
      return updateWorkInProgressHook().memoizedState;
    },
    useEffectEvent: function (callback) {
      currentHookNameInDev = "useEffectEvent";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateEvent(callback);
    }
  };
  fakeInternalInstance = {};
  didWarnAboutStateAssignmentForComponent = __new(Set);
  didWarnAboutUninitializedState = __new(Set);
  didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = __new(Set);
  didWarnAboutLegacyLifecyclesAndDerivedState = __new(Set);
  didWarnAboutDirectlyAssigningPropsToState = __new(Set);
  didWarnAboutUndefinedDerivedState = __new(Set);
  didWarnAboutContextTypes_1 = __new(Set);
  didWarnAboutChildContextTypes = __new(Set);
  didWarnAboutInvalidateContextType = __new(Set);
  didWarnOnInvalidCallback = __new(Set);
  Object.freeze(fakeInternalInstance);
  classComponentUpdater = {
    enqueueSetState: function (inst, payload, callback) {
      let lane, update;
      inst = inst._reactInternals;
      lane = requestUpdateLane(inst);
      update = createUpdate(lane);
      update.payload = payload;
      void 0 !== callback && undefined !== callback && (warnOnInvalidCallback(callback), update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      undefined !== payload && (startUpdateTimerByLane(lane, "this.setState()", inst), scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueReplaceState: function (inst, payload, callback) {
      let lane, update;
      inst = inst._reactInternals;
      lane = requestUpdateLane(inst);
      update = createUpdate(lane);
      update.tag = ReplaceState;
      update.payload = payload;
      void 0 !== callback && undefined !== callback && (warnOnInvalidCallback(callback), update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      undefined !== payload && (startUpdateTimerByLane(lane, "this.replaceState()", inst), scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueForceUpdate: function (inst, callback) {
      let lane, update;
      inst = inst._reactInternals;
      lane = requestUpdateLane(inst);
      update = createUpdate(lane);
      update.tag = ForceUpdate;
      void 0 !== callback && undefined !== callback && (warnOnInvalidCallback(callback), update.callback = callback);
      callback = enqueueUpdate(inst, update, lane);
      undefined !== callback && (startUpdateTimerByLane(lane, "this.forceUpdate()", inst), scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
    }
  };
  componentName = undefined;
  errorBoundaryName = undefined;
  SelectiveHydrationException = Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue.");
  didReceiveUpdate = !1;
  didWarnAboutBadClass = {};
  didWarnAboutContextTypeOnFunctionComponent = {};
  didWarnAboutContextTypes = {};
  didWarnAboutGetDerivedStateOnFunctionComponent = {};
  didWarnAboutReassigningProps = !1;
  didWarnAboutRevealOrder = {};
  didWarnAboutTailOptions = {};
  SUSPENDED_MARKER = {
    dehydrated: undefined,
    treeContext: undefined,
    retryLane: 0,
    hydrationErrors: undefined
  };
  hasWarnedAboutUsingNoValuePropOnContextProvider = !1;
  didWarnAboutUndefinedSnapshotBeforeUpdate = undefined;
  didWarnAboutUndefinedSnapshotBeforeUpdate = __new(Set);
  offscreenSubtreeIsHidden = !1;
  offscreenSubtreeWasHidden = !1;
  needsFormReset = !1;
  PossiblyWeakSet = "function" === typeOfJS(WeakSet) ? WeakSet : Set;
  nextEffect = undefined;
  inProgressLanes = undefined;
  inProgressRoot = undefined;
  hostParent = undefined;
  hostParentIsContainer = !1;
  currentHoistableRoot = undefined;
  inHydratedSubtree = !1;
  suspenseyCommitFlag = 8192;
  DefaultAsyncDispatcher = {
    getCacheForType: function (resourceType) {
      let cache, cacheForType;
      cache = readContext(CacheContext);
      cacheForType = cache.data.get(resourceType);
      void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
      return cacheForType;
    },
    cacheSignal: function () {
      return readContext(CacheContext).controller.signal;
    },
    getOwner: function () {
      return current;
    }
  };
  COMPONENT_TYPE = 0;
  HAS_PSEUDO_CLASS_TYPE = 1;
  ROLE_TYPE = 2;
  TEST_NAME_TYPE = 3;
  TEXT_TYPE = 4;
  if ("function" === typeOfJS(Symbol) && Symbol.for) {
    symbolFor = Symbol.for;
    COMPONENT_TYPE = symbolFor("selector.component");
    HAS_PSEUDO_CLASS_TYPE = symbolFor("selector.has_pseudo_class");
    ROLE_TYPE = symbolFor("selector.role");
    TEST_NAME_TYPE = symbolFor("selector.test_id");
    TEXT_TYPE = symbolFor("selector.text");
  }
  commitHooks = __arrNew();
  PossiblyWeakMap = "function" === typeOfJS(WeakMap) ? WeakMap : Map;
  NoContext = 0;
  RenderContext = 2;
  CommitContext = 4;
  RootInProgress = 0;
  RootFatalErrored = 1;
  RootErrored = 2;
  RootSuspended = 3;
  RootSuspendedWithDelay = 4;
  RootSuspendedAtTheShell = 6;
  RootCompleted = 5;
  executionContext = NoContext;
  workInProgressRoot = undefined;
  workInProgress = undefined;
  workInProgressRootRenderLanes = 0;
  NotSuspended = 0;
  SuspendedOnError = 1;
  SuspendedOnData = 2;
  SuspendedOnImmediate = 3;
  SuspendedOnInstance = 4;
  SuspendedOnInstanceAndReadyToContinue = 5;
  SuspendedOnDeprecatedThrowPromise = 6;
  SuspendedAndReadyToContinue = 7;
  SuspendedOnHydration = 8;
  SuspendedOnAction = 9;
  workInProgressSuspendedReason = NotSuspended;
  workInProgressThrownValue = undefined;
  workInProgressRootDidSkipSuspendedSiblings = !1;
  workInProgressRootIsPrerendering = !1;
  workInProgressRootDidAttachPingListener = !1;
  entangledRenderLanes = 0;
  workInProgressRootExitStatus = RootInProgress;
  workInProgressRootSkippedLanes = 0;
  workInProgressRootInterleavedUpdatedLanes = 0;
  workInProgressRootPingedLanes = 0;
  workInProgressDeferredLane = 0;
  workInProgressSuspendedRetryLanes = 0;
  workInProgressRootConcurrentErrors = undefined;
  workInProgressRootRecoverableErrors = undefined;
  workInProgressRootDidIncludeRecursiveRenderUpdate = !1;
  globalMostRecentFallbackTime = 0;
  globalMostRecentTransitionTime = 0;
  FALLBACK_THROTTLE_MS = 300;
  workInProgressRootRenderTargetTime = Infinity;
  RENDER_TIMEOUT_MS = 500;
  workInProgressTransitions = undefined;
  workInProgressUpdateTask = undefined;
  legacyErrorBoundariesThatAlreadyFailed = undefined;
  IMMEDIATE_COMMIT = 0;
  ABORTED_VIEW_TRANSITION_COMMIT = 1;
  DELAYED_PASSIVE_COMMIT = 2;
  ANIMATION_STARTED_COMMIT = 3;
  NO_PENDING_EFFECTS = 0;
  PENDING_MUTATION_PHASE = 1;
  PENDING_LAYOUT_PHASE = 2;
  PENDING_AFTER_MUTATION_PHASE = 3;
  PENDING_SPAWNED_WORK = 4;
  PENDING_PASSIVE_PHASE = 5;
  pendingEffectsStatus = 0;
  pendingEffectsRoot = undefined;
  pendingFinishedWork = undefined;
  pendingEffectsLanes = 0;
  pendingEffectsRemainingLanes = 0;
  pendingEffectsRenderEndTime = -0;
  pendingPassiveTransitions = undefined;
  pendingRecoverableErrors = undefined;
  pendingSuspendedCommitReason = undefined;
  pendingDelayedCommitReason = IMMEDIATE_COMMIT;
  pendingSuspendedViewTransitionReason = undefined;
  NESTED_UPDATE_LIMIT = 50;
  nestedUpdateCount = 0;
  rootWithNestedUpdates = undefined;
  isFlushingPassiveEffects = !1;
  didScheduleUpdateDuringPassiveEffects = !1;
  NESTED_PASSIVE_UPDATE_LIMIT = 50;
  nestedPassiveUpdateCount = 0;
  rootWithPassiveNestedUpdates = undefined;
  isRunningInsertionEffect = !1;
  didWarnStateUpdateForNotYetMountedComponent = undefined;
  didWarnAboutUpdateInRender = !1;
  didWarnAboutUpdateInRenderForAnotherComponent = __new(Set);
  fakeActCallbackNode = {};
  resolveFamily = undefined;
  failedBoundaries = undefined;
  hasBadMapPolyfill = !1;
  try {
    nonExtensibleObject = Object.preventExtensions({});
    __new(Map, __arrNew(__arrNew(nonExtensibleObject, undefined)));
    __new(Set, __arrNew(nonExtensibleObject));
  } catch (e) {
    hasBadMapPolyfill = !0;
  }
  didWarnAboutNestedUpdates = !1;
  didWarnAboutFindNodeInStrictMode = {};
  overrideHookState = undefined;
  overrideHookStateDeletePath = undefined;
  overrideHookStateRenamePath = undefined;
  overrideProps = undefined;
  overridePropsDeletePath = undefined;
  overridePropsRenamePath = undefined;
  scheduleUpdate = undefined;
  scheduleRetry = undefined;
  setErrorHandler = undefined;
  setSuspenseHandler = undefined;
  overrideHookState = function (fiber, id, path, value) {
    id = findHook(fiber, id);
    undefined !== id && (path = copyWithSetImpl(id.memoizedState, path, 0, value), id.memoizedState = path, id.baseState = path, fiber.memoizedProps = assign({}, fiber.memoizedProps), path = enqueueConcurrentRenderForLane(fiber, 2), undefined !== path && scheduleUpdateOnFiber(path, fiber, 2));
  };
  overrideHookStateDeletePath = function (fiber, id, path) {
    id = findHook(fiber, id);
    undefined !== id && (path = copyWithDeleteImpl(id.memoizedState, path, 0), id.memoizedState = path, id.baseState = path, fiber.memoizedProps = assign({}, fiber.memoizedProps), path = enqueueConcurrentRenderForLane(fiber, 2), undefined !== path && scheduleUpdateOnFiber(path, fiber, 2));
  };
  overrideHookStateRenamePath = function (fiber, id, oldPath, newPath) {
    id = findHook(fiber, id);
    undefined !== id && (oldPath = copyWithRename(id.memoizedState, oldPath, newPath), id.memoizedState = oldPath, id.baseState = oldPath, fiber.memoizedProps = assign({}, fiber.memoizedProps), oldPath = enqueueConcurrentRenderForLane(fiber, 2), undefined !== oldPath && scheduleUpdateOnFiber(oldPath, fiber, 2));
  };
  overrideProps = function (fiber, path, value) {
    fiber.pendingProps = copyWithSetImpl(fiber.memoizedProps, path, 0, value);
    fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
    path = enqueueConcurrentRenderForLane(fiber, 2);
    undefined !== path && scheduleUpdateOnFiber(path, fiber, 2);
  };
  overridePropsDeletePath = function (fiber, path) {
    fiber.pendingProps = copyWithDeleteImpl(fiber.memoizedProps, path, 0);
    fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
    path = enqueueConcurrentRenderForLane(fiber, 2);
    undefined !== path && scheduleUpdateOnFiber(path, fiber, 2);
  };
  overridePropsRenamePath = function (fiber, oldPath, newPath) {
    fiber.pendingProps = copyWithRename(fiber.memoizedProps, oldPath, newPath);
    fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
    oldPath = enqueueConcurrentRenderForLane(fiber, 2);
    undefined !== oldPath && scheduleUpdateOnFiber(oldPath, fiber, 2);
  };
  scheduleUpdate = function (fiber) {
    let root;
    root = enqueueConcurrentRenderForLane(fiber, 2);
    undefined !== root && scheduleUpdateOnFiber(root, fiber, 2);
  };
  scheduleRetry = function (fiber) {
    let lane, root;
    lane = claimNextRetryLane();
    root = enqueueConcurrentRenderForLane(fiber, lane);
    undefined !== root && scheduleUpdateOnFiber(root, fiber, lane);
  };
  setErrorHandler = function (newShouldErrorImpl) {
    shouldErrorImpl = newShouldErrorImpl;
  };
  setSuspenseHandler = function (newShouldSuspendImpl) {
    shouldSuspendImpl = newShouldSuspendImpl;
  };
  __exports.attemptContinuousHydration = function (fiber) {
    let root;
    if (13 === fiber.tag || 31 === fiber.tag) {
      root = enqueueConcurrentRenderForLane(fiber, 67108864);
      undefined !== root && scheduleUpdateOnFiber(root, fiber, 67108864);
      markRetryLaneIfNotHydrated(fiber, 67108864);
    }
  };
  __exports.attemptHydrationAtCurrentPriority = function (fiber) {
    let lane, root;
    if (13 === fiber.tag || 31 === fiber.tag) {
      lane = requestUpdateLane(fiber);
      lane = getBumpedLaneForHydrationByLane(lane);
      root = enqueueConcurrentRenderForLane(fiber, lane);
      undefined !== root && scheduleUpdateOnFiber(root, fiber, lane);
      markRetryLaneIfNotHydrated(fiber, lane);
    }
  };
  __exports.attemptSynchronousHydration = function (fiber) {
    let lanes, lane;
    switch (fiber.tag) {
      case 3:
        fiber = fiber.stateNode;
        if (fiber.current.memoizedState.isDehydrated) {
          lanes = getHighestPriorityLanes(fiber.pendingLanes);
          if (0 !== lanes) {
            fiber.pendingLanes |= 2;
            for (fiber.entangledLanes |= 2; lanes;) {
              lane = 1 << 31 - clz32(lanes);
              fiber.entanglements[1] |= lane;
              lanes &= ~lane;
            }
            ensureRootIsScheduled(fiber);
            (executionContext & (RenderContext | CommitContext)) === NoContext && (workInProgressRootRenderTargetTime = __cat(now_1(), RENDER_TIMEOUT_MS), flushSyncWorkAcrossRoots_impl(0, !1));
          }
        }
        break;
      case 31:
      case 13:
        lanes = enqueueConcurrentRenderForLane(fiber, 2), undefined !== lanes && scheduleUpdateOnFiber(lanes, fiber, 2), flushSyncWork(), markRetryLaneIfNotHydrated(fiber, 2);
    }
  };
  __exports.batchedUpdates = function (fn, a) {
    return fn(a);
  };
  __exports.createComponentSelector = function (component) {
    return {
      $$typeof: COMPONENT_TYPE,
      value: component
    };
  };
  __exports.createContainer = function (containerInfo, tag, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
    return createFiberRoot(containerInfo, tag, !1, undefined, hydrationCallbacks, isStrictMode, identifierPrefix, undefined, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator);
  };
  __exports.createHasPseudoClassSelector = function (selectors) {
    return {
      $$typeof: HAS_PSEUDO_CLASS_TYPE,
      value: selectors
    };
  };
  __exports.createHydrationContainer = function (initialChildren, callback, containerInfo, tag, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, transitionCallbacks, formState) {
    initialChildren = createFiberRoot(containerInfo, tag, !0, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator);
    initialChildren.context = getContextForSubtree(undefined);
    containerInfo = initialChildren.current;
    tag = requestUpdateLane(containerInfo);
    tag = getBumpedLaneForHydrationByLane(tag);
    hydrationCallbacks = createUpdate(tag);
    hydrationCallbacks.callback = void 0 !== callback && undefined !== callback ? callback : undefined;
    enqueueUpdate(containerInfo, hydrationCallbacks, tag);
    startUpdateTimerByLane(tag, "hydrateRoot()", undefined);
    callback = tag;
    initialChildren.current.lanes = callback;
    markRootUpdated_1(initialChildren, callback);
    ensureRootIsScheduled(initialChildren);
    return initialChildren;
  };
  __exports.createPortal = function (children, containerInfo, implementation, ...__args) {
    let __allArgs = __arrNew(children, containerInfo, implementation, ...__args);
    let key, JSCompiler_inline_result;
    key = 3 < __len(__allArgs) && void 0 !== __argAt(__allArgs, 3) ? __argAt(__allArgs, 3) : undefined;
    try {
      testStringCoercion(key);
      JSCompiler_inline_result = !1;
    } catch (e_6) {
      JSCompiler_inline_result = !0;
    }
    JSCompiler_inline_result && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", "function" === typeOfJS(Symbol) && Symbol.toStringTag && key[Symbol.toStringTag] || key.constructor.name || "Object"), testStringCoercion(key));
    return {
      $$typeof: REACT_PORTAL_TYPE,
      key: key === undefined ? undefined : __cat("", key),
      children: children,
      containerInfo: containerInfo,
      implementation: implementation
    };
  };
  __exports.createRoleSelector = function (role) {
    return {
      $$typeof: ROLE_TYPE,
      value: role
    };
  };
  __exports.createTestNameSelector = function (id) {
    return {
      $$typeof: TEST_NAME_TYPE,
      value: id
    };
  };
  __exports.createTextSelector = function (text) {
    return {
      $$typeof: TEXT_TYPE,
      value: text
    };
  };
  __exports.defaultOnCaughtError = function (__error) {
    let componentNameMessage, recreateMessage;
    componentNameMessage = componentName ? __cat(__cat("The above error occurred in the <", componentName), "> component.") : "The above error occurred in one of your React components.";
    recreateMessage = __cat("React will try to recreate this component tree from scratch using the error boundary you provided, ", __cat(errorBoundaryName || "Anonymous", "."));
    "object" === typeOfJS(__error) && undefined !== __error && "string" === typeOfJS(__error.environmentName) ? bindToConsole("error", __arrNew("%o\n\n%s\n\n%s\n", __error, componentNameMessage, recreateMessage), __error.environmentName)() : console.error("%o\n\n%s\n\n%s\n", __error, componentNameMessage, recreateMessage);
  };
  __exports.defaultOnRecoverableError = function (__error) {
    reportGlobalError(__error);
  };
  __exports.defaultOnUncaughtError = function (__error) {
    reportGlobalError(__error);
    console.warn("%s\n\n%s\n", componentName ? __cat(__cat("An error occurred in the <", componentName), "> component.") : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
  };
  __exports.deferredUpdates = function (fn) {
    let prevTransition, previousPriority;
    prevTransition = ReactSharedInternals.T;
    previousPriority = getCurrentUpdatePriority();
    try {
      return setCurrentUpdatePriority(32), ReactSharedInternals.T = undefined, fn();
    } finally {
      setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = prevTransition;
    }
  };
  __exports.discreteUpdates = function (fn, a, b, c, d) {
    let prevTransition, previousPriority;
    prevTransition = ReactSharedInternals.T;
    previousPriority = getCurrentUpdatePriority();
    try {
      return setCurrentUpdatePriority(2), ReactSharedInternals.T = undefined, fn(a, b, c, d);
    } finally {
      setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = prevTransition, executionContext === NoContext && (workInProgressRootRenderTargetTime = __cat(now_1(), RENDER_TIMEOUT_MS));
    }
  };
  __exports.findAllNodes = findAllNodes;
  __exports.findBoundingRects = function (hostRoot, selectors) {
    let i, targetLeft, targetRight, targetTop, targetBottom, j, otherRect, otherLeft, otherRight, otherTop, otherBottom;
    if (!supportsTestSelectors) throw Error("Test selector API is not supported by this renderer.");
    selectors = findAllNodes(hostRoot, selectors);
    hostRoot = __arrNew();
    for (i = 0; i < __len(selectors); i++) __push(hostRoot, getBoundingRect(selectors[i]));
    for (selectors = __len(hostRoot) - 1; 0 < selectors; selectors--) {
      i = hostRoot[selectors];
      for (targetLeft = i.x, targetRight = __cat(targetLeft, i.width), targetTop = i.y, targetBottom = __cat(targetTop, i.height), j = selectors - 1; 0 <= j; j--) if (selectors !== j) {
        otherRect = hostRoot[j];
        otherLeft = otherRect.x;
        otherRight = __cat(otherLeft, otherRect.width);
        otherTop = otherRect.y;
        otherBottom = __cat(otherTop, otherRect.height);
        if (targetLeft >= otherLeft && targetTop >= otherTop && targetRight <= otherRight && targetBottom <= otherBottom) {
          __splice(hostRoot, selectors, 1);
          break;
        } else if (!(targetLeft !== otherLeft || i.width !== otherRect.width || otherBottom < targetTop || otherTop > targetBottom)) {
          otherTop > targetTop && (otherRect.height += otherTop - targetTop, otherRect.y = targetTop);
          otherBottom < targetBottom && (otherRect.height = targetBottom - otherTop);
          __splice(hostRoot, selectors, 1);
          break;
        } else if (!(targetTop !== otherTop || i.height !== otherRect.height || otherRight < targetLeft || otherLeft > targetRight)) {
          otherLeft > targetLeft && (otherRect.width += otherLeft - targetLeft, otherRect.x = targetLeft);
          otherRight < targetRight && (otherRect.width = targetRight - otherLeft);
          __splice(hostRoot, selectors, 1);
          break;
        }
      }
    }
    return hostRoot;
  };
  __exports.findHostInstance = function (component) {
    let fiber;
    fiber = component._reactInternals;
    if (void 0 === fiber) {
      if ("function" === typeOfJS(component.render)) throw Error("Unable to find node on an unmounted component.");
      component = __join(Object.keys(component), ",");
      throw Error(__cat("Argument appears to not be a ReactComponent. Keys: ", component));
    }
    component = findCurrentHostFiber(fiber);
    return undefined === component ? undefined : getPublicInstance(component.stateNode);
  };
  __exports.findHostInstanceWithNoPortals = function (fiber) {
    fiber = findCurrentFiberUsingSlowPath(fiber);
    fiber = undefined !== fiber ? findCurrentHostFiberWithNoPortalsImpl(fiber) : undefined;
    return undefined === fiber ? undefined : getPublicInstance(fiber.stateNode);
  };
  __exports.findHostInstanceWithWarning = function (component, methodName) {
    let fiber, componentName;
    fiber = component._reactInternals;
    if (void 0 === fiber) {
      if ("function" === typeOfJS(component.render)) throw Error("Unable to find node on an unmounted component.");
      component = __join(Object.keys(component), ",");
      throw Error(__cat("Argument appears to not be a ReactComponent. Keys: ", component));
    }
    component = findCurrentHostFiber(fiber);
    if (undefined === component) return undefined;
    if (component.mode & 8) {
      componentName = getComponentNameFromFiber(fiber) || "Component";
      didWarnAboutFindNodeInStrictMode[componentName] || (didWarnAboutFindNodeInStrictMode[componentName] = !0, runWithFiberInDEV(component, function () {
        fiber.mode & 8 ? console.error("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://react.dev/link/strict-mode-find-node", methodName, methodName, componentName) : console.error("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://react.dev/link/strict-mode-find-node", methodName, methodName, componentName);
      }));
    }
    return getPublicInstance(component.stateNode);
  };
  __exports.flushPassiveEffects = flushPendingEffects;
  __exports.flushSyncFromReconciler = function (fn) {
    let prevExecutionContext, prevTransition, previousPriority;
    prevExecutionContext = executionContext;
    executionContext |= 1;
    prevTransition = ReactSharedInternals.T;
    previousPriority = getCurrentUpdatePriority();
    try {
      if (setCurrentUpdatePriority(2), ReactSharedInternals.T = undefined, fn) return fn();
    } finally {
      setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = prevTransition, executionContext = prevExecutionContext, (executionContext & (RenderContext | CommitContext)) === NoContext && flushSyncWorkAcrossRoots_impl(0, !1);
    }
  };
  __exports.flushSyncWork = flushSyncWork;
  __exports.focusWithin = function (_hostRoot, selectors) {
    let fiber, tag;
    if (!supportsTestSelectors) throw Error("Test selector API is not supported by this renderer.");
    _hostRoot = findFiberRootForHostRoot(_hostRoot);
    selectors = findPaths(_hostRoot, selectors);
    selectors = __arrFrom(selectors);
    for (let _hostRoot = 0; _hostRoot < __len(selectors);) {
      fiber = selectors[_hostRoot++];
      tag = fiber.tag;
      if (!isHiddenSubtree(fiber)) {
        if ((5 === tag || 26 === tag || 27 === tag) && setFocusIfFocusable(fiber.stateNode)) return !0;
        for (fiber = fiber.child; undefined !== fiber;) __push(selectors, fiber), fiber = fiber.sibling;
      }
    }
    return !1;
  };
  __exports.getFindAllNodesFailureDescription = function (hostRoot, selectors) {
    let maxSelectorIndex, matchedNames, index, fiber, tag, selectorIndex, selector;
    if (!supportsTestSelectors) throw Error("Test selector API is not supported by this renderer.");
    maxSelectorIndex = 0;
    matchedNames = __arrNew();
    hostRoot = __arrNew(findFiberRootForHostRoot(hostRoot), 0);
    for (index = 0; index < __len(hostRoot);) {
      fiber = hostRoot[index++];
      tag = fiber.tag;
      selectorIndex = hostRoot[index++];
      selector = selectors[selectorIndex];
      if (5 !== tag && 26 !== tag && 27 !== tag || !isHiddenSubtree(fiber)) if (matchSelector(fiber, selector) && (__push(matchedNames, selectorToString(selector)), selectorIndex++, selectorIndex > maxSelectorIndex && (maxSelectorIndex = selectorIndex)), selectorIndex < __len(selectors)) for (fiber = fiber.child; undefined !== fiber;) __push(hostRoot, fiber, selectorIndex), fiber = fiber.sibling;
    }
    if (maxSelectorIndex < __len(selectors)) {
      for (hostRoot = __arrNew(); maxSelectorIndex < __len(selectors); maxSelectorIndex++) __push(hostRoot, selectorToString(selectors[maxSelectorIndex]));
      return __cat(__cat("findAllNodes was able to match part of the selector:\n  ", __cat(__join(matchedNames, " > "), "\n\nNo matching component was found for:\n  ")), __join(hostRoot, " > "));
    }
    return undefined;
  };
  __exports.getPublicRootInstance = function (container) {
    container = container.current;
    if (!container.child) return undefined;
    switch (container.child.tag) {
      case 27:
      case 5:
        return getPublicInstance(container.child.stateNode);
      default:
        return container.child.stateNode;
    }
  };
  __exports.injectIntoDevTools = function () {
    let internals;
    internals = {
      bundleType: 1,
      version: rendererVersion,
      rendererPackageName: rendererPackageName,
      currentDispatcherRef: ReactSharedInternals,
      reconcilerVersion: "19.2.0"
    };
    undefined !== extraDevToolsConfig && (internals.rendererConfig = extraDevToolsConfig);
    internals.overrideHookState = overrideHookState;
    internals.overrideHookStateDeletePath = overrideHookStateDeletePath;
    internals.overrideHookStateRenamePath = overrideHookStateRenamePath;
    internals.overrideProps = overrideProps;
    internals.overridePropsDeletePath = overridePropsDeletePath;
    internals.overridePropsRenamePath = overridePropsRenamePath;
    internals.scheduleUpdate = scheduleUpdate;
    internals.scheduleRetry = scheduleRetry;
    internals.setErrorHandler = setErrorHandler;
    internals.setSuspenseHandler = setSuspenseHandler;
    internals.scheduleRefresh = scheduleRefresh;
    internals.scheduleRoot = scheduleRoot;
    internals.setRefreshHandler = setRefreshHandler;
    internals.getCurrentFiber = getCurrentFiberForDevTools;
    return injectInternals(internals);
  };
  __exports.isAlreadyRendering = isAlreadyRendering;
  __exports.observeVisibleRects = function (hostRoot, selectors, callback, options) {
    let instanceRoots, disconnect, observe, unobserve;
    function commitHook() {
      let nextInstanceRoots;
      nextInstanceRoots = findAllNodes(hostRoot, selectors);
      __forEach(instanceRoots, function (target) {
        0 > __indexOf(nextInstanceRoots, target) && unobserve(target);
      });
      __forEach(nextInstanceRoots, function (target) {
        0 > __indexOf(instanceRoots, target) && observe(target);
      });
    }
    if (!supportsTestSelectors) throw Error("Test selector API is not supported by this renderer.");
    instanceRoots = findAllNodes(hostRoot, selectors);
    callback = setupIntersectionObserver(instanceRoots, callback, options);
    disconnect = callback.disconnect;
    observe = callback.observe;
    unobserve = callback.unobserve;
    __push(commitHooks, commitHook);
    return {
      disconnect: function () {
        let index;
        index = __indexOf(commitHooks, commitHook);
        0 <= index && __splice(commitHooks, index, 1);
        disconnect();
      }
    };
  };
  __exports.shouldError = function (fiber) {
    return shouldErrorImpl(fiber);
  };
  __exports.shouldSuspend = function (fiber) {
    return shouldSuspendImpl(fiber);
  };
  __exports.startHostTransition = function (formFiber, pendingState, action, formData) {
    let queue;
    if (5 !== formFiber.tag) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
    queue = ensureFormComponentIsStateful(formFiber).queue;
    startHostActionTimer(formFiber);
    startTransition(formFiber, queue, pendingState, NotPendingTransition, undefined === action ? noop : function () {
      let stateHook;
      undefined === ReactSharedInternals.T && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
      stateHook = ensureFormComponentIsStateful(formFiber);
      undefined === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
      dispatchSetStateInternal(formFiber, stateHook.next.queue, {}, requestUpdateLane(formFiber));
      return action(formData);
    });
  };
  __exports.updateContainer = function (element, container, parentComponent, callback) {
    let current, lane;
    current = container.current;
    lane = requestUpdateLane(current);
    updateContainerImpl(current, lane, element, container, parentComponent, callback);
    return lane;
  };
  __exports.updateContainerSync = updateContainerSync;
  return __exports;
}, __exports.default = __exports, Object.defineProperty(__exports, "__esModule", {
  value: !0
}));
const __default = __exports,
  __n_attemptContinuousHydration = __exports.attemptContinuousHydration,
  __n_attemptHydrationAtCurrentPriority = __exports.attemptHydrationAtCurrentPriority,
  __n_attemptSynchronousHydration = __exports.attemptSynchronousHydration,
  __n_batchedUpdates = __exports.batchedUpdates,
  __n_createComponentSelector = __exports.createComponentSelector,
  __n_createContainer = __exports.createContainer,
  __n_createHasPseudoClassSelector = __exports.createHasPseudoClassSelector,
  __n_createHydrationContainer = __exports.createHydrationContainer,
  __n_createPortal = __exports.createPortal,
  __n_createRoleSelector = __exports.createRoleSelector,
  __n_createTestNameSelector = __exports.createTestNameSelector,
  __n_createTextSelector = __exports.createTextSelector,
  __n_defaultOnCaughtError = __exports.defaultOnCaughtError,
  __n_defaultOnRecoverableError = __exports.defaultOnRecoverableError,
  __n_defaultOnUncaughtError = __exports.defaultOnUncaughtError,
  __n_deferredUpdates = __exports.deferredUpdates,
  __n_discreteUpdates = __exports.discreteUpdates,
  __n_findAllNodes = __exports.findAllNodes,
  __n_findBoundingRects = __exports.findBoundingRects,
  __n_findHostInstance = __exports.findHostInstance,
  __n_findHostInstanceWithNoPortals = __exports.findHostInstanceWithNoPortals,
  __n_findHostInstanceWithWarning = __exports.findHostInstanceWithWarning,
  __n_flushPassiveEffects = __exports.flushPassiveEffects,
  __n_flushSyncFromReconciler = __exports.flushSyncFromReconciler,
  __n_flushSyncWork = __exports.flushSyncWork,
  __n_focusWithin = __exports.focusWithin,
  __n_getFindAllNodesFailureDescription = __exports.getFindAllNodesFailureDescription,
  __n_getPublicRootInstance = __exports.getPublicRootInstance,
  __n_injectIntoDevTools = __exports.injectIntoDevTools,
  __n_isAlreadyRendering = __exports.isAlreadyRendering,
  __n_observeVisibleRects = __exports.observeVisibleRects,
  __n_shouldError = __exports.shouldError,
  __n_shouldSuspend = __exports.shouldSuspend,
  __n_startHostTransition = __exports.startHostTransition,
  __n_updateContainer = __exports.updateContainer,
  __n_updateContainerSync = __exports.updateContainerSync;
export { __n_attemptContinuousHydration as attemptContinuousHydration, __n_attemptHydrationAtCurrentPriority as attemptHydrationAtCurrentPriority, __n_attemptSynchronousHydration as attemptSynchronousHydration, __n_batchedUpdates as batchedUpdates, __n_createComponentSelector as createComponentSelector, __n_createContainer as createContainer, __n_createHasPseudoClassSelector as createHasPseudoClassSelector, __n_createHydrationContainer as createHydrationContainer, __n_createPortal as createPortal, __n_createRoleSelector as createRoleSelector, __n_createTestNameSelector as createTestNameSelector, __n_createTextSelector as createTextSelector, __n_defaultOnCaughtError as defaultOnCaughtError, __n_defaultOnRecoverableError as defaultOnRecoverableError, __n_defaultOnUncaughtError as defaultOnUncaughtError, __n_deferredUpdates as deferredUpdates, __n_discreteUpdates as discreteUpdates, __n_findAllNodes as findAllNodes, __n_findBoundingRects as findBoundingRects, __n_findHostInstance as findHostInstance, __n_findHostInstanceWithNoPortals as findHostInstanceWithNoPortals, __n_findHostInstanceWithWarning as findHostInstanceWithWarning, __n_flushPassiveEffects as flushPassiveEffects, __n_flushSyncFromReconciler as flushSyncFromReconciler, __n_flushSyncWork as flushSyncWork, __n_focusWithin as focusWithin, __n_getFindAllNodesFailureDescription as getFindAllNodesFailureDescription, __n_getPublicRootInstance as getPublicRootInstance, __n_injectIntoDevTools as injectIntoDevTools, __n_isAlreadyRendering as isAlreadyRendering, __n_observeVisibleRects as observeVisibleRects, __n_shouldError as shouldError, __n_shouldSuspend as shouldSuspend, __n_startHostTransition as startHostTransition, __n_updateContainer as updateContainer, __n_updateContainerSync as updateContainerSync };
export default __default;
