/**
 * @license React
 * react-reconciler.production.js
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
__exports = function (___config) {
  let __exports, assign, REACT_LEGACY_ELEMENT_TYPE, REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE, REACT_FRAGMENT_TYPE, REACT_STRICT_MODE_TYPE, REACT_PROFILER_TYPE, REACT_CONSUMER_TYPE, REACT_CONTEXT_TYPE, REACT_FORWARD_REF_TYPE, REACT_SUSPENSE_TYPE, REACT_SUSPENSE_LIST_TYPE, REACT_MEMO_TYPE, REACT_LAZY_TYPE, REACT_ACTIVITY_TYPE, REACT_MEMO_CACHE_SENTINEL, MAYBE_ITERATOR_SYMBOL, REACT_CLIENT_REFERENCE, isArrayImpl, ReactSharedInternals, rendererVersion, rendererPackageName, extraDevToolsConfig, getPublicInstance, getRootHostContext, getChildHostContext, prepareForCommit, resetAfterCommit, createInstance, appendInitialChild, finalizeInitialChildren, shouldSetTextContent, createTextInstance, scheduleTimeout, cancelTimeout, noTimeout, isPrimaryRenderer, supportsMutation, supportsPersistence, supportsHydration, getInstanceFromNode, preparePortalMount, setCurrentUpdatePriority, getCurrentUpdatePriority, resolveUpdatePriority, shouldAttemptEagerTransition, detachDeletedInstance, maySuspendCommit, maySuspendCommitOnUpdate, maySuspendCommitInSyncRender, preloadInstance, startSuspendingCommit, suspendInstance, waitForCommitToBeReady, NotPendingTransition, HostTransitionContext, resetFormInstance, supportsMicrotasks, scheduleMicrotask, supportsTestSelectors, findFiberRoot, getBoundingRect, getTextContent, isHiddenSubtree, matchAccessibilityRole, setFocusIfFocusable, setupIntersectionObserver, appendChild, appendChildToContainer, commitTextUpdate, commitMount, commitUpdate, insertBefore, insertInContainerBefore, removeChild, removeChildFromContainer, resetTextContent, hideInstance, hideTextInstance, unhideInstance, unhideTextInstance, clearContainer, cloneInstance, createContainerChildSet, appendChildToContainerChildSet, finalizeContainerChildren, replaceContainerChildren, cloneHiddenInstance, cloneHiddenTextInstance, isSuspenseInstancePending, isSuspenseInstanceFallback, getSuspenseInstanceFallbackErrorDetails, registerSuspenseInstanceRetry, canHydrateFormStateMarker, isFormStateMarkerMatching, getNextHydratableSibling, getNextHydratableSiblingAfterSingleton, getFirstHydratableChild, getFirstHydratableChildWithinContainer, getFirstHydratableChildWithinActivityInstance, getFirstHydratableChildWithinSuspenseInstance, getFirstHydratableChildWithinSingleton, canHydrateInstance, canHydrateTextInstance, canHydrateActivityInstance, canHydrateSuspenseInstance, hydrateInstance, hydrateTextInstance, hydrateActivityInstance, hydrateSuspenseInstance, getNextHydratableInstanceAfterActivityInstance, getNextHydratableInstanceAfterSuspenseInstance, commitHydratedInstance, commitHydratedContainer, commitHydratedActivityInstance, commitHydratedSuspenseInstance, finalizeHydratedChildren, flushHydrationEvents, clearSuspenseBoundary, clearSuspenseBoundaryFromContainer, hideDehydratedBoundary, unhideDehydratedBoundary, shouldDeleteUnhydratedTailInstances, validateHydratableInstance, validateHydratableTextInstance, supportsResources, isHostHoistableType, getHoistableRoot, getResource, acquireResource, releaseResource, hydrateHoistable, mountHoistable, unmountHoistable, createHoistableInstance, prepareToCommitHoistables, mayResourceSuspendCommit, preloadResource, suspendResource, supportsSingletons, resolveSingletonInstance, acquireSingletonInstance, releaseSingletonInstance, isHostSingletonType, isSingletonScope, valueStack, index_jscomp_0, emptyContextObject, clz32, log_1, LN2, nextTransitionUpdateLane, nextTransitionDeferredLane, nextRetryLane, scheduleCallback_3, cancelCallback_1, shouldYield, requestPaint, now, ImmediatePriority, UserBlockingPriority, NormalPriority_1, IdlePriority, log, unstable_setDisableYieldValue, rendererID, injectedHook, objectIs, reportGlobalError, hasOwnProperty, prefix, suffix, reentry, CapturedStacks, forkStack, forkStackIndex, treeForkProvider, treeForkCount, idStack, idStackIndex, treeContextProvider, treeContextId, treeContextOverflow, contextStackCursor, contextFiberStackCursor, rootInstanceStackCursor, hostTransitionProviderCursor, hydrationParentFiber, nextHydratableInstance, isHydrating, hydrationErrors, rootOrSingletonContext, HydrationMismatchException, valueCursor, currentlyRenderingFiber_1, lastContextDependency, AbortControllerLocal, scheduleCallback_2, NormalPriority, CacheContext, firstScheduledRoot, lastScheduledRoot, didScheduleMicrotask, mightHavePendingSyncWork, isFlushingWork, currentEventTransitionLane, currentEntangledListeners, currentEntangledPendingCount, currentEntangledLane, currentEntangledActionThenable, prevOnStartTransitionFinish, resumedCache, SuspenseException, SuspenseyCommitException, SuspenseActionException, noopSuspenseyCommitThenable, suspendedThenable, thenableState_1, thenableIndexCounter_1, reconcileChildFibers, mountChildFibers, concurrentQueues, concurrentQueuesIndex, concurrentlyUpdatedLanes, hasForceUpdate, didReadFromEntangledAsyncAction, currentTreeHiddenStackCursor, prevEntangledRenderLanesCursor, suspenseHandlerStackCursor, shellBoundary, suspenseStackCursor, renderLanes, currentlyRenderingFiber, currentHook, workInProgressHook, didScheduleRenderPhaseUpdate, didScheduleRenderPhaseUpdateDuringThisPass, shouldDoubleInvokeUserFnsInHooksDEV, localIdCounter, thenableIndexCounter, thenableState, globalClientIdCounter, ContextOnlyDispatcher, HooksDispatcherOnMount, HooksDispatcherOnUpdate, HooksDispatcherOnRerender, classComponentUpdater, SelectiveHydrationException, didReceiveUpdate, SUSPENDED_MARKER, offscreenSubtreeIsHidden, offscreenSubtreeWasHidden, needsFormReset, PossiblyWeakSet, nextEffect, hostParent, hostParentIsContainer, currentHoistableRoot, suspenseyCommitFlag, DefaultAsyncDispatcher, COMPONENT_TYPE, HAS_PSEUDO_CLASS_TYPE, ROLE_TYPE, TEST_NAME_TYPE, TEXT_TYPE, symbolFor, PossiblyWeakMap, executionContext, workInProgressRoot, workInProgress, workInProgressRootRenderLanes, workInProgressSuspendedReason, workInProgressThrownValue, workInProgressRootDidSkipSuspendedSiblings, workInProgressRootIsPrerendering, workInProgressRootDidAttachPingListener, entangledRenderLanes, workInProgressRootExitStatus, workInProgressRootSkippedLanes, workInProgressRootInterleavedUpdatedLanes, workInProgressRootPingedLanes, workInProgressDeferredLane, workInProgressSuspendedRetryLanes, workInProgressRootConcurrentErrors, workInProgressRootRecoverableErrors, workInProgressRootDidIncludeRecursiveRenderUpdate, globalMostRecentFallbackTime, globalMostRecentTransitionTime, workInProgressRootRenderTargetTime, workInProgressTransitions, legacyErrorBoundariesThatAlreadyFailed, pendingEffectsStatus, pendingEffectsRoot, pendingFinishedWork, pendingEffectsLanes, pendingEffectsRemainingLanes, pendingPassiveTransitions, pendingRecoverableErrors, nestedUpdateCount, rootWithNestedUpdates;
  function createFiber(tag, pendingProps, key, mode) {
    return __new(FiberNode, tag, pendingProps, key, mode);
  }
  function noop() {}
  function formatProdErrorMessage(code, ...__args) {
    let __allArgs = __arrNew(code, ...__args);
    let url, i;
    url = __cat("https://react.dev/errors/", code);
    if (1 < __len(__allArgs)) {
      url += __cat("?args[]=", encodeURIComponent(__argAt(__allArgs, 1)));
      for (i = 2; i < __len(__allArgs); i++) url += __cat("&args[]=", encodeURIComponent(__argAt(__allArgs, i)));
    }
    return __cat(__cat(__cat(__cat("Minified React error #", code), "; visit "), url), " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");
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
    if (getNearestMountedFiber(fiber) !== fiber) throw Error(formatProdErrorMessage(188));
  }
  function findCurrentFiberUsingSlowPath(fiber) {
    let alternate, a, b, parentA, parentB, didFindChild, child_0;
    alternate = fiber.alternate;
    if (!alternate) {
      alternate = getNearestMountedFiber(fiber);
      if (undefined === alternate) throw Error(formatProdErrorMessage(188));
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
        throw Error(formatProdErrorMessage(188));
      }
      if (a.return !== b.return) a = parentA, b = parentB;else {
        for (didFindChild = !1, child_0 = parentA.child; child_0;) {
          if (child_0 === a) {
            didFindChild = !0;
            a = parentA;
            b = parentB;
            break;
          }
          if (child_0 === b) {
            didFindChild = !0;
            b = parentA;
            a = parentB;
            break;
          }
          child_0 = child_0.sibling;
        }
        if (!didFindChild) {
          for (child_0 = parentB.child; child_0;) {
            if (child_0 === a) {
              didFindChild = !0;
              a = parentB;
              b = parentA;
              break;
            }
            if (child_0 === b) {
              didFindChild = !0;
              b = parentB;
              a = parentA;
              break;
            }
            child_0 = child_0.sibling;
          }
          if (!didFindChild) throw Error(formatProdErrorMessage(189));
        }
      }
      if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
    }
    if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
    return a.stateNode.current === a ? fiber : alternate;
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
    if ("object" === typeOfJS(__type)) switch (__type.$$typeof) {
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
  function createCursor(defaultValue) {
    return {
      current: defaultValue
    };
  }
  function pop(cursor) {
    0 > index_jscomp_0 || (cursor.current = valueStack[index_jscomp_0], valueStack[index_jscomp_0] = undefined, index_jscomp_0--);
  }
  function push(cursor, value) {
    index_jscomp_0++;
    valueStack[index_jscomp_0] = cursor.current;
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
        return lanes;
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
        return -1;
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
    let previouslyPendingLanes, entanglements, expirationTimes, hiddenUpdates, index_5, lane, hiddenUpdatesForLane, update;
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
      index_5 = 31 - clz32(remainingLanes);
      lane = 1 << index_5;
      entanglements[index_5] = 0;
      expirationTimes[index_5] = -1;
      hiddenUpdatesForLane = hiddenUpdates[index_5];
      if (undefined !== hiddenUpdatesForLane) for (hiddenUpdates[index_5] = undefined, index_5 = 0; index_5 < __len(hiddenUpdatesForLane); index_5++) {
        update = hiddenUpdatesForLane[index_5];
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
    let rootEntangledLanes, index_6, lane;
    rootEntangledLanes = root.entangledLanes |= entangledLanes;
    for (root = root.entanglements; rootEntangledLanes;) {
      index_6 = 31 - clz32(rootEntangledLanes);
      lane = 1 << index_6;
      lane & entangledLanes | root[index_6] & entangledLanes && (root[index_6] |= entangledLanes);
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
  function lanesToEventPriority(lanes) {
    lanes &= -lanes;
    return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
  }
  function setIsStrictModeForDevtools(newIsStrictMode) {
    "function" === typeOfJS(log) && unstable_setDisableYieldValue(newIsStrictMode);
    if (injectedHook && "function" === typeOfJS(injectedHook.setStrictMode)) try {
      injectedHook.setStrictMode(rendererID, newIsStrictMode);
    } catch (err) {}
  }
  function is(x, y) {
    return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
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
    let previousPrepareStackTrace, RunInRootFrame, namePropDescriptor, _RunInRootFrame_Deter, sampleStack, controlStack, sampleLines, controlLines, frame;
    if (!fn || reentry) return "";
    reentry = !0;
    previousPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
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
                } catch (x_8) {
                  control = x_8;
                }
                __callFn(fn, __protoOf(Fake));
              }
            } else {
              try {
                throw Error();
              } catch (x_9) {
                control = x_9;
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
        for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < __len(sampleLines) && !__includes(sampleLines[RunInRootFrame], "DetermineComponentFrameRoot");) RunInRootFrame++;
        for (; namePropDescriptor < __len(controlLines) && !__includes(controlLines[namePropDescriptor], "DetermineComponentFrameRoot");) namePropDescriptor++;
        if (RunInRootFrame === __len(sampleLines) || namePropDescriptor === __len(controlLines)) for (RunInRootFrame = __len(sampleLines) - 1, namePropDescriptor = __len(controlLines) - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor];) namePropDescriptor--;
        for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--) if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
          if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
            do if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
              frame = __cat("\n", __replace(sampleLines[RunInRootFrame], " at new ", " at "));
              fn.displayName && __includes(frame, "<anonymous>") && (frame = __replace(frame, "<anonymous>", fn.displayName));
              return frame;
            } while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
          }
          break;
        }
      }
    } finally {
      reentry = !1, Error.prepareStackTrace = previousPrepareStackTrace;
    }
    return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
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
    let info, previous;
    try {
      info = "";
      previous = undefined;
      do info += describeFiber(workInProgress, previous), previous = workInProgress, workInProgress = workInProgress.return; while (workInProgress);
      return info;
    } catch (x) {
      return __cat(__cat(__cat("\nError generating stack: ", x.message), "\n"), x.stack);
    }
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
    forkStack[forkStackIndex++] = treeForkCount;
    forkStack[forkStackIndex++] = treeForkProvider;
    treeForkProvider = workInProgress;
    treeForkCount = totalChildren;
  }
  function pushTreeId(workInProgress, totalChildren, index) {
    let baseIdWithLeadingBit, baseLength, length, numberOfOverflowBits;
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
    undefined !== workInProgress.return && (pushTreeFork(workInProgress, 1), pushTreeId(workInProgress, 1, 0));
  }
  function popTreeContext(workInProgress) {
    for (; workInProgress === treeForkProvider;) treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = undefined, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = undefined;
    for (; workInProgress === treeContextProvider;) treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = undefined, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = undefined, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = undefined;
  }
  function restoreSuspendedTreeContext(workInProgress, suspendedContext) {
    idStack[idStackIndex++] = treeContextId;
    idStack[idStackIndex++] = treeContextOverflow;
    idStack[idStackIndex++] = treeContextProvider;
    treeContextId = suspendedContext.id;
    treeContextOverflow = suspendedContext.overflow;
    treeContextProvider = workInProgress;
  }
  function pushHostContainer(fiber, nextRootInstance) {
    push(rootInstanceStackCursor, nextRootInstance);
    push(contextFiberStackCursor, fiber);
    push(contextStackCursor, undefined);
    fiber = getRootHostContext(nextRootInstance);
    pop(contextStackCursor);
    push(contextStackCursor, fiber);
  }
  function popHostContainer() {
    pop(contextStackCursor);
    pop(contextFiberStackCursor);
    pop(rootInstanceStackCursor);
  }
  function pushHostContext(fiber) {
    let context, nextContext;
    undefined !== fiber.memoizedState && push(hostTransitionProviderCursor, fiber);
    context = contextStackCursor.current;
    nextContext = getChildHostContext(context, fiber.type);
    context !== nextContext && (push(contextFiberStackCursor, fiber), push(contextStackCursor, nextContext));
  }
  function popHostContext(fiber) {
    contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
    hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), isPrimaryRenderer ? HostTransitionContext._currentValue = NotPendingTransition : HostTransitionContext._currentValue2 = NotPendingTransition);
  }
  function throwOnHydrationMismatch(fiber, ...__args) {
    let __allArgs = __arrNew(fiber, ...__args);
    let __error;
    __error = Error(formatProdErrorMessage(418, 1 < __len(__allArgs) && void 0 !== __argAt(__allArgs, 1) && __argAt(__allArgs, 1) ? "text" : "HTML", ""));
    queueHydrationError(createCapturedValueAtFiber(__error, fiber));
    throw HydrationMismatchException;
  }
  function prepareToHydrateHostInstance(fiber, hostContext) {
    if (!supportsHydration) throw Error(formatProdErrorMessage(175));
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
    supportsSingletons ? 3 !== tag && 27 !== tag && (5 !== tag || shouldDeleteUnhydratedTailInstances(fiber.type) && !shouldSetTextContent(fiber.type, fiber.memoizedProps)) && nextHydratableInstance && throwOnHydrationMismatch(fiber) : 3 !== tag && (5 !== tag || shouldDeleteUnhydratedTailInstances(fiber.type) && !shouldSetTextContent(fiber.type, fiber.memoizedProps)) && nextHydratableInstance && throwOnHydrationMismatch(fiber);
    popToNextHostParent(fiber);
    if (13 === tag) {
      if (!supportsHydration) throw Error(formatProdErrorMessage(316));
      fiber = fiber.memoizedState;
      fiber = undefined !== fiber ? fiber.dehydrated : undefined;
      if (!fiber) throw Error(formatProdErrorMessage(317));
      nextHydratableInstance = getNextHydratableInstanceAfterSuspenseInstance(fiber);
    } else if (31 === tag) {
      fiber = fiber.memoizedState;
      fiber = undefined !== fiber ? fiber.dehydrated : undefined;
      if (!fiber) throw Error(formatProdErrorMessage(317));
      nextHydratableInstance = getNextHydratableInstanceAfterActivityInstance(fiber);
    } else nextHydratableInstance = supportsSingletons && 27 === tag ? getNextHydratableSiblingAfterSingleton(fiber.type, nextHydratableInstance) : hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : undefined;
    return !0;
  }
  function resetHydrationState() {
    supportsHydration && (nextHydratableInstance = hydrationParentFiber = undefined, isHydrating = !1);
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
  function pushProvider(providerFiber, context, nextValue) {
    isPrimaryRenderer ? (push(valueCursor, context._currentValue), context._currentValue = nextValue) : (push(valueCursor, context._currentValue2), context._currentValue2 = nextValue);
  }
  function popProvider(context) {
    let currentValue;
    currentValue = valueCursor.current;
    isPrimaryRenderer ? context._currentValue = currentValue : context._currentValue2 = currentValue;
    pop(valueCursor);
  }
  function scheduleContextWorkOnParentPath(parent, renderLanes, propagationRoot) {
    let alternate;
    for (; undefined !== parent;) {
      alternate = parent.alternate;
      (parent.childLanes & renderLanes) !== renderLanes ? (parent.childLanes |= renderLanes, undefined !== alternate && (alternate.childLanes |= renderLanes)) : undefined !== alternate && (alternate.childLanes & renderLanes) !== renderLanes && (alternate.childLanes |= renderLanes);
      if (parent === propagationRoot) break;
      parent = parent.return;
    }
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
          let __lb_18 = false,
            __lc_18 = false;
          while (!__lb_18) {
            __lc_18 = false;
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
                    __lb_18 = true;
                    break;
                  }
                }
                if (__lb_18 || __lc_18) {
                  break;
                }
                list = dependency.next;
              }
              ;
            }
            if (__lc_18) {
              __lc_18 = false;
              ;
              continue;
            }
            break;
          }
        }
      } else if (18 === fiber.tag) {
        nextFiber = fiber.return;
        if (undefined === nextFiber) throw Error(formatProdErrorMessage(341));
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
        if (undefined === currentParent) throw Error(formatProdErrorMessage(387));
        currentParent = currentParent.memoizedProps;
        if (undefined !== currentParent) {
          context = parent.type;
          objectIs(parent.pendingProps.value, currentParent.value) || (undefined !== current ? __push(current, context) : current = __arrNew(context));
        }
      } else if (parent === hostTransitionProviderCursor.current) {
        currentParent = parent.alternate;
        if (undefined === currentParent) throw Error(formatProdErrorMessage(387));
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
      if (undefined === consumer) throw Error(formatProdErrorMessage(308));
      lastContextDependency = context;
      consumer.dependencies = {
        lanes: 0,
        firstContext: context
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
  function releaseCache(cache) {
    cache.refCount--;
    0 === cache.refCount && scheduleCallback_2(NormalPriority, function () {
      cache.controller.abort();
    });
  }
  function noop_1() {}
  function ensureRootIsScheduled(root) {
    root !== lastScheduledRoot && undefined === root.next && (undefined === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root : lastScheduledRoot = lastScheduledRoot.next = root);
    mightHavePendingSyncWork = !0;
    didScheduleMicrotask || (didScheduleMicrotask = !0, scheduleImmediateRootScheduleTask());
  }
  function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
    let didPerformSomeWork, root, pendingLanes, JSCompiler_inline_result, suspendedLanes, pingedLanes;
    if (!isFlushingWork && mightHavePendingSyncWork) {
      isFlushingWork = !0;
      do {
        didPerformSomeWork = !1;
        for (root = firstScheduledRoot; undefined !== root;) {
          if (!onlyLegacy) if (0 !== syncTransitionLanes) {
            pendingLanes = root.pendingLanes;
            if (0 === pendingLanes) {
              JSCompiler_inline_result = 0;
            } else {
              suspendedLanes = root.suspendedLanes;
              pingedLanes = root.pingedLanes;
              JSCompiler_inline_result = (1 << __cat(31 - clz32(42 | syncTransitionLanes), 1)) - 1;
              JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
              JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
            }
            0 !== JSCompiler_inline_result && (didPerformSomeWork = !0, performSyncWorkOnRoot(root, JSCompiler_inline_result));
          } else JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(root, root === workInProgressRoot ? JSCompiler_inline_result : 0, undefined !== root.cancelPendingCommit || root.timeoutHandle !== noTimeout), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root, JSCompiler_inline_result) || (didPerformSomeWork = !0, performSyncWorkOnRoot(root, JSCompiler_inline_result));
          root = root.next;
        }
      } while (didPerformSomeWork);
      isFlushingWork = !1;
    }
  }
  function processRootScheduleInImmediateTask() {
    processRootScheduleInMicrotask();
  }
  function processRootScheduleInMicrotask() {
    let syncTransitionLanes, currentTime, prev, root, __next, nextLanes;
    mightHavePendingSyncWork = didScheduleMicrotask = !1;
    syncTransitionLanes = 0;
    0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
    for (currentTime = now(), prev = undefined, root = firstScheduledRoot; undefined !== root;) {
      __next = root.next;
      nextLanes = scheduleTaskForRootDuringMicrotask(root, currentTime);
      if (0 === nextLanes) root.next = undefined, undefined === prev ? firstScheduledRoot = __next : prev.next = __next, undefined === __next && (lastScheduledRoot = prev);else if (prev = root, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3)) mightHavePendingSyncWork = !0;
      root = __next;
    }
    0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes, !1);
    0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
  }
  function scheduleTaskForRootDuringMicrotask(root, currentTime) {
    let suspendedLanes, pingedLanes, expirationTimes, lanes, index_3, lane, expirationTime;
    for (suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes, expirationTimes = root.expirationTimes, lanes = root.pendingLanes & -62914561; 0 < lanes;) {
      index_3 = 31 - clz32(lanes);
      lane = 1 << index_3;
      expirationTime = expirationTimes[index_3];
      if (-1 === expirationTime) {
        if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes)) expirationTimes[index_3] = computeExpirationTime(lane, currentTime);
      } else expirationTime <= currentTime && (root.expiredLanes |= lane);
      lanes &= ~lane;
    }
    currentTime = workInProgressRoot;
    suspendedLanes = workInProgressRootRenderLanes;
    suspendedLanes = getNextLanes(root, root === currentTime ? suspendedLanes : 0, undefined !== root.cancelPendingCommit || root.timeoutHandle !== noTimeout);
    pingedLanes = root.callbackNode;
    if (0 === suspendedLanes || root === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || undefined !== root.cancelPendingCommit) return undefined !== pingedLanes && undefined !== pingedLanes && cancelCallback_1(pingedLanes), root.callbackNode = undefined, root.callbackPriority = 0;
    if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root, suspendedLanes)) {
      currentTime = suspendedLanes & -suspendedLanes;
      if (currentTime === root.callbackPriority) return currentTime;
      undefined !== pingedLanes && cancelCallback_1(pingedLanes);
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
      pingedLanes = __partial((..._bindArgs) => __applyFn(performWorkOnRootViaSchedulerTask, ..._bindArgs), undefined, root);
      suspendedLanes = scheduleCallback_3(suspendedLanes, pingedLanes);
      root.callbackPriority = currentTime;
      root.callbackNode = suspendedLanes;
      return currentTime;
    }
    undefined !== pingedLanes && undefined !== pingedLanes && cancelCallback_1(pingedLanes);
    root.callbackPriority = 2;
    root.callbackNode = undefined;
    return 2;
  }
  function performWorkOnRootViaSchedulerTask(root, didTimeout) {
    let originalCallbackNode, workInProgressRootRenderLanes_jscomp_0;
    if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus) return root.callbackNode = undefined, root.callbackPriority = 0, undefined;
    originalCallbackNode = root.callbackNode;
    if (flushPendingEffects() && root.callbackNode !== originalCallbackNode) return undefined;
    workInProgressRootRenderLanes_jscomp_0 = workInProgressRootRenderLanes;
    workInProgressRootRenderLanes_jscomp_0 = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes_jscomp_0 : 0, undefined !== root.cancelPendingCommit || root.timeoutHandle !== noTimeout);
    if (0 === workInProgressRootRenderLanes_jscomp_0) return undefined;
    performWorkOnRoot(root, workInProgressRootRenderLanes_jscomp_0, didTimeout);
    scheduleTaskForRootDuringMicrotask(root, now());
    return root.callbackNode !== undefined && root.callbackNode === originalCallbackNode ? __partial((..._bindArgs2) => __applyFn(performWorkOnRootViaSchedulerTask, ..._bindArgs2), undefined, root) : undefined;
  }
  function performSyncWorkOnRoot(root, lanes) {
    if (flushPendingEffects()) return undefined;
    performWorkOnRoot(root, lanes, !0);
  }
  function scheduleImmediateRootScheduleTask() {
    supportsMicrotasks ? scheduleMicrotask(function () {
      0 !== (executionContext & 6) ? scheduleCallback_3(ImmediatePriority, processRootScheduleInImmediateTask) : processRootScheduleInMicrotask();
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
    if (0 === --currentEntangledPendingCount && undefined !== currentEntangledListeners) {
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
    undefined === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
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
  function isThenableResolved(thenable) {
    thenable = thenable.status;
    return "fulfilled" === thenable || "rejected" === thenable;
  }
  function trackUsedThenable(thenableState, thenable, index) {
    index = thenableState[index];
    void 0 === index ? __push(thenableState, thenable) : index !== thenable && (thenable.then(noop_1, noop_1), thenable = index);
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenableState = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState), thenableState;
      default:
        if ("string" === typeOfJS(thenable.status)) thenable.then(noop_1, noop_1);else {
          thenableState = workInProgressRoot;
          if (undefined !== thenableState && 100 < thenableState.shellSuspendCounter) throw Error(formatProdErrorMessage(482));
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
        throw SuspenseException;
    }
  }
  function resolveLazy(lazyType) {
    let init;
    try {
      init = lazyType._init;
      return init(lazyType._payload);
    } catch (x) {
      if (undefined !== x && "object" === typeOfJS(x) && "function" === typeOfJS(x.then)) throw suspendedThenable = x, SuspenseException;
      throw x;
    }
  }
  function getSuspendedThenable() {
    let thenable;
    if (undefined === suspendedThenable) throw Error(formatProdErrorMessage(459));
    thenable = suspendedThenable;
    suspendedThenable = undefined;
    return thenable;
  }
  function checkIfUseWrappedInAsyncCatch(rejectedReason) {
    if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException) throw Error(formatProdErrorMessage(483));
  }
  function unwrapThenable(thenable) {
    let index;
    index = thenableIndexCounter_1;
    thenableIndexCounter_1 += 1;
    undefined === thenableState_1 && (thenableState_1 = __arrNew());
    return trackUsedThenable(thenableState_1, thenable, index);
  }
  function coerceRef(workInProgress, element) {
    element = element.props.ref;
    workInProgress.ref = void 0 !== element ? element : undefined;
  }
  function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
    if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE) throw Error(formatProdErrorMessage(525));
    returnFiber = __callFn(__protoOf(Object).toString, newChild);
    throw Error(formatProdErrorMessage(31, "[object Object]" === returnFiber ? __cat(__cat("object with keys {", __join(Object.keys(newChild), ", ")), "}") : returnFiber));
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
      if (undefined === current || 6 !== current.tag) return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
      current = useFiber(current, textContent);
      current.return = returnFiber;
      return current;
    }
    function updateElement(returnFiber, current, element, lanes) {
      let elementType;
      elementType = element.type;
      if (elementType === REACT_FRAGMENT_TYPE) return updateFragment(returnFiber, current, element.props.children, lanes, element.key);
      if (undefined !== current && (current.elementType === elementType || "object" === typeOfJS(elementType) && undefined !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type)) return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
      current = createFiberFromTypeAndProps(element.type, element.key, element.props, undefined, returnFiber.mode, lanes);
      coerceRef(current, element);
      current.return = returnFiber;
      return current;
    }
    function updatePortal(returnFiber, current, portal, lanes) {
      if (undefined === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
      current = useFiber(current, portal.children || __arrNew());
      current.return = returnFiber;
      return current;
    }
    function updateFragment(returnFiber, current, fragment, lanes, key) {
      if (undefined === current || 7 !== current.tag) return current = createFiberFromFragment(fragment, returnFiber.mode, lanes, key), current.return = returnFiber, current;
      current = useFiber(current, fragment);
      current.return = returnFiber;
      return current;
    }
    function createChild(returnFiber, newChild, lanes) {
      if ("string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild)) return newChild = createFiberFromText(__cat("", newChild), returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
      if ("object" === typeOfJS(newChild) && undefined !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, undefined, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
          case REACT_PORTAL_TYPE:
            return newChild = createFiberFromPortal(newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild)) return newChild = createFiberFromFragment(newChild, returnFiber.mode, lanes, undefined), newChild.return = returnFiber, newChild;
        if ("function" === typeOfJS(newChild.then)) return createChild(returnFiber, unwrapThenable(newChild), lanes);
        if (newChild.$$typeof === REACT_CONTEXT_TYPE) return createChild(returnFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return undefined;
    }
    function updateSlot(returnFiber, oldFiber, newChild, lanes) {
      let key;
      key = undefined !== oldFiber ? oldFiber.key : undefined;
      if ("string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild)) return undefined !== key ? undefined : updateTextNode(returnFiber, oldFiber, __cat("", newChild), lanes);
      if ("object" === typeOfJS(newChild) && undefined !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : undefined;
          case REACT_PORTAL_TYPE:
            return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : undefined;
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild)) return undefined !== key ? undefined : updateFragment(returnFiber, oldFiber, newChild, lanes, undefined);
        if ("function" === typeOfJS(newChild.then)) return updateSlot(returnFiber, oldFiber, unwrapThenable(newChild), lanes);
        if (newChild.$$typeof === REACT_CONTEXT_TYPE) return updateSlot(returnFiber, oldFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return undefined;
    }
    function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
      if ("string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild)) return existingChildren = existingChildren.get(newIdx) || undefined, updateTextNode(returnFiber, existingChildren, __cat("", newChild), lanes);
      if ("object" === typeOfJS(newChild) && undefined !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return existingChildren = existingChildren.get(undefined === newChild.key ? newIdx : newChild.key) || undefined, updateElement(returnFiber, existingChildren, newChild, lanes);
          case REACT_PORTAL_TYPE:
            return existingChildren = existingChildren.get(undefined === newChild.key ? newIdx : newChild.key) || undefined, updatePortal(returnFiber, existingChildren, newChild, lanes);
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes);
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild)) return existingChildren = existingChildren.get(newIdx) || undefined, updateFragment(returnFiber, existingChildren, newChild, lanes, undefined);
        if ("function" === typeOfJS(newChild.then)) return updateFromMap(existingChildren, returnFiber, newIdx, unwrapThenable(newChild), lanes);
        if (newChild.$$typeof === REACT_CONTEXT_TYPE) return updateFromMap(existingChildren, returnFiber, newIdx, readContextDuringReconciliation(returnFiber, newChild), lanes);
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return undefined;
    }
    function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
      let resultingFirstChild, previousNewFiber, oldFiber, newIdx, nextOldFiber, newFiber;
      for (resultingFirstChild = undefined, previousNewFiber = undefined, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = undefined; undefined !== oldFiber && newIdx < __len(newChildren); newIdx++) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = undefined) : nextOldFiber = oldFiber.sibling;
        newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);
        if (undefined === newFiber) {
          undefined === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        shouldTrackSideEffects && oldFiber && undefined === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        undefined === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (newIdx === __len(newChildren)) return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (undefined === oldFiber) {
        for (; newIdx < __len(newChildren); newIdx++) oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), undefined !== oldFiber && (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); newIdx < __len(newChildren); newIdx++) nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], lanes), undefined !== nextOldFiber && (shouldTrackSideEffects && undefined !== nextOldFiber.alternate && oldFiber.delete(undefined === nextOldFiber.key ? newIdx : nextOldFiber.key), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
      shouldTrackSideEffects && __forEach(oldFiber, function (child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
      let resultingFirstChild, previousNewFiber, oldFiber, newIdx, nextOldFiber, step, newFiber;
      if (newChildren === undefined) throw Error(formatProdErrorMessage(151));
      for (resultingFirstChild = undefined, previousNewFiber = undefined, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = undefined, step = newChildren.next(); undefined !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = undefined) : nextOldFiber = oldFiber.sibling;
        newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
        if (undefined === newFiber) {
          undefined === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        shouldTrackSideEffects && oldFiber && undefined === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        undefined === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (step.done) return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (undefined === oldFiber) {
        for (; !step.done; newIdx++, step = newChildren.next()) step = createChild(returnFiber, step.value, lanes), undefined !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next()) step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), undefined !== step && (shouldTrackSideEffects && undefined !== step.alternate && oldFiber.delete(undefined === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
      shouldTrackSideEffects && __forEach(oldFiber, function (child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
      let key;
      "object" === typeOfJS(newChild) && undefined !== newChild && newChild.type === REACT_FRAGMENT_TYPE && undefined === newChild.key && (newChild = newChild.props.children);
      if ("object" === typeOfJS(newChild) && undefined !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            {
              let __lb_17 = false,
                __lc_17 = false;
              while (!__lb_17) {
                {
                  for (key = newChild.key; undefined !== currentFirstChild;) {
                    if (currentFirstChild.key === key) {
                      key = newChild.type;
                      if (key === REACT_FRAGMENT_TYPE) {
                        if (7 === currentFirstChild.tag) {
                          deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                          lanes = useFiber(currentFirstChild, newChild.props.children);
                          lanes.return = returnFiber;
                          returnFiber = lanes;
                          {
                            __lb_17 = true;
                            break;
                          }
                        }
                      } else if (currentFirstChild.elementType === key || "object" === typeOfJS(key) && undefined !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                        deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                        lanes = useFiber(currentFirstChild, newChild.props);
                        coerceRef(lanes, newChild);
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        {
                          __lb_17 = true;
                          break;
                        }
                      }
                      deleteRemainingChildren(returnFiber, currentFirstChild);
                      break;
                    } else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  if (__lb_17 || __lc_17) {
                    break;
                  }
                  newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(newChild.props.children, returnFiber.mode, lanes, newChild.key), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, undefined, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
                }
                break;
              }
            }
            return placeSingleChild(returnFiber);
          case REACT_PORTAL_TYPE:
            {
              let __lb_16 = false,
                __lc_16 = false;
              while (!__lb_16) {
                {
                  for (key = newChild.key; undefined !== currentFirstChild;) {
                    if (currentFirstChild.key === key) {
                      if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                        deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                        lanes = useFiber(currentFirstChild, newChild.children || __arrNew());
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        {
                          __lb_16 = true;
                          break;
                        }
                      } else {
                        deleteRemainingChildren(returnFiber, currentFirstChild);
                        break;
                      }
                    } else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  if (__lb_16 || __lc_16) {
                    break;
                  }
                  lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
                  lanes.return = returnFiber;
                  returnFiber = lanes;
                }
                break;
              }
            }
            return placeSingleChild(returnFiber);
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
        }
        if (isArrayImpl(newChild)) return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
        if (getIteratorFn(newChild)) {
          key = getIteratorFn(newChild);
          if ("function" !== typeOfJS(key)) throw Error(formatProdErrorMessage(150));
          newChild = __callFn(key, newChild);
          return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
        }
        if ("function" === typeOfJS(newChild.then)) return reconcileChildFibersImpl(returnFiber, currentFirstChild, unwrapThenable(newChild), lanes);
        if (newChild.$$typeof === REACT_CONTEXT_TYPE) return reconcileChildFibersImpl(returnFiber, currentFirstChild, readContextDuringReconciliation(returnFiber, newChild), lanes);
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return "string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild) ? (newChild = __cat("", newChild), undefined !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
    }
    return function (returnFiber, currentFirstChild, newChild, lanes) {
      let firstChildFiber, fiber;
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
        return fiber;
      } finally {}
    };
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
    for (isHidden = !1, parent = sourceFiber.return; undefined !== parent;) parent.childLanes |= lane, alternate = parent.alternate, undefined !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, undefined === sourceFiber || sourceFiber._visibility & 1 || (isHidden = !0)), sourceFiber = parent, parent = parent.return;
    return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && undefined !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], undefined === alternate ? sourceFiber[isHidden] = __arrNew(update) : __push(alternate, update), update.lane = lane | 536870912), parent) : undefined;
  }
  function getRootForUpdatedFiber(sourceFiber) {
    let parent;
    if (50 < nestedUpdateCount) throw nestedUpdateCount = 0, rootWithNestedUpdates = undefined, Error(formatProdErrorMessage(185));
    for (parent = sourceFiber.return; undefined !== parent;) sourceFiber = parent, parent = sourceFiber.return;
    return 3 === sourceFiber.tag ? sourceFiber.stateNode : undefined;
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
      tag: 0,
      payload: undefined,
      callback: undefined,
      next: undefined
    };
  }
  function enqueueUpdate(fiber, update, lane) {
    let updateQueue, pending;
    updateQueue = fiber.updateQueue;
    if (undefined === updateQueue) return undefined;
    updateQueue = updateQueue.shared;
    if (0 !== (executionContext & 2)) {
      pending = updateQueue.pending;
      undefined === pending ? update.next = update : (update.next = pending.next, pending.next = update);
      updateQueue.pending = update;
      update = getRootForUpdatedFiber(fiber);
      markUpdateLaneFromFiberToRoot(fiber, undefined, lane);
      return update;
    }
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
  function processUpdateQueue(workInProgress_jscomp_0, props, instance_jscomp_0, renderLanes) {
    let queue, firstBaseUpdate, lastBaseUpdate, pendingQueue, lastPendingUpdate, firstPendingUpdate, current, newState, updateLane, isHiddenUpdate, workInProgress, update, instance;
    didReadFromEntangledAsyncAction = !1;
    queue = workInProgress_jscomp_0.updateQueue;
    hasForceUpdate = !1;
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
      current = workInProgress_jscomp_0.alternate;
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
            let __lb_15 = false,
              __lc_15 = false;
            while (!__lb_15) {
              {
                workInProgress = workInProgress_jscomp_0;
                update = pendingQueue;
                updateLane = props;
                instance = instance_jscomp_0;
                switch (update.tag) {
                  case 1:
                    workInProgress = update.payload;
                    if ("function" === typeOfJS(workInProgress)) {
                      newState = __callFn(workInProgress, instance, newState, updateLane);
                      {
                        __lb_15 = true;
                        break;
                      }
                    }
                    newState = workInProgress;
                    {
                      __lb_15 = true;
                      break;
                    }
                  case 3:
                    workInProgress.flags = workInProgress.flags & -65537 | 128;
                  case 0:
                    workInProgress = update.payload;
                    updateLane = "function" === typeOfJS(workInProgress) ? __callFn(workInProgress, instance, newState, updateLane) : workInProgress;
                    if (undefined === updateLane || void 0 === updateLane) {
                      __lb_15 = true;
                      break;
                    }
                    newState = assign({}, newState, updateLane);
                    {
                      __lb_15 = true;
                      break;
                    }
                  case 2:
                    hasForceUpdate = !0;
                }
                if (__lb_15 || __lc_15) {
                  break;
                }
              }
              break;
            }
          }
          updateLane = pendingQueue.callback;
          undefined !== updateLane && (workInProgress_jscomp_0.flags |= 64, isHiddenUpdate && (workInProgress_jscomp_0.flags |= 8192), isHiddenUpdate = queue.callbacks, undefined === isHiddenUpdate ? queue.callbacks = __arrNew(updateLane) : __push(isHiddenUpdate, updateLane));
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
      workInProgress_jscomp_0.lanes = lastBaseUpdate;
      workInProgress_jscomp_0.memoizedState = newState;
    }
  }
  function callCallback(callback, context) {
    if ("function" !== typeOfJS(callback)) throw Error(formatProdErrorMessage(191, callback));
    __callFn(callback, context);
  }
  function commitCallbacks(updateQueue, context) {
    let callbacks;
    callbacks = updateQueue.callbacks;
    if (undefined !== callbacks) for (updateQueue.callbacks = undefined, updateQueue = 0; updateQueue < __len(callbacks); updateQueue++) callCallback(callbacks[updateQueue], context);
  }
  function pushHiddenContext(fiber, context) {
    fiber = entangledRenderLanes;
    push(prevEntangledRenderLanesCursor, fiber);
    push(currentTreeHiddenStackCursor, context);
    entangledRenderLanes = fiber | context.baseLanes;
  }
  function reuseHiddenContextOnStack() {
    push(prevEntangledRenderLanesCursor, entangledRenderLanes);
    push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
  }
  function popHiddenContext() {
    entangledRenderLanes = prevEntangledRenderLanesCursor.current;
    pop(currentTreeHiddenStackCursor);
    pop(prevEntangledRenderLanesCursor);
  }
  function pushPrimaryTreeSuspenseHandler(handler) {
    let current;
    current = handler.alternate;
    push(suspenseStackCursor, suspenseStackCursor.current & 1);
    push(suspenseHandlerStackCursor, handler);
    undefined === shellBoundary && (undefined === current || undefined !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : undefined !== current.memoizedState && (shellBoundary = handler));
  }
  function pushDehydratedActivitySuspenseHandler(fiber) {
    push(suspenseStackCursor, suspenseStackCursor.current);
    push(suspenseHandlerStackCursor, fiber);
    undefined === shellBoundary && (shellBoundary = fiber);
  }
  function pushOffscreenSuspenseHandler(fiber) {
    22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), undefined === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack(fiber);
  }
  function reuseSuspenseHandlerOnStack() {
    push(suspenseStackCursor, suspenseStackCursor.current);
    push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
  }
  function popSuspenseHandler(fiber) {
    pop(suspenseHandlerStackCursor);
    shellBoundary === fiber && (shellBoundary = undefined);
    pop(suspenseStackCursor);
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
  function throwInvalidHookError() {
    throw Error(formatProdErrorMessage(321));
  }
  function areHookInputsEqual(nextDeps, prevDeps) {
    let i;
    if (undefined === prevDeps) return !1;
    for (i = 0; i < __len(prevDeps) && i < __len(nextDeps); i++) if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
    return !0;
  }
  function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderLanes) {
    renderLanes = nextRenderLanes;
    currentlyRenderingFiber = workInProgress;
    workInProgress.memoizedState = undefined;
    workInProgress.updateQueue = undefined;
    workInProgress.lanes = 0;
    ReactSharedInternals.H = undefined === current || undefined === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
    shouldDoubleInvokeUserFnsInHooksDEV = !1;
    nextRenderLanes = Component(props, secondArg);
    shouldDoubleInvokeUserFnsInHooksDEV = !1;
    didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(workInProgress, Component, props, secondArg));
    finishRenderingHooks(current);
    return nextRenderLanes;
  }
  function finishRenderingHooks(current) {
    let didRenderTooFewHooks;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    didRenderTooFewHooks = undefined !== currentHook && undefined !== currentHook.next;
    renderLanes = 0;
    workInProgressHook = currentHook = currentlyRenderingFiber = undefined;
    didScheduleRenderPhaseUpdate = !1;
    thenableIndexCounter = 0;
    thenableState = undefined;
    if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
    undefined === current || didReceiveUpdate || (current = current.dependencies, undefined !== current && checkIfContextChanged(current) && (didReceiveUpdate = !0));
  }
  function renderWithHooksAgain(workInProgress, Component, props, secondArg) {
    let numberOfReRenders, children;
    currentlyRenderingFiber = workInProgress;
    numberOfReRenders = 0;
    do {
      didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = undefined);
      thenableIndexCounter = 0;
      didScheduleRenderPhaseUpdateDuringThisPass = !1;
      if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
      numberOfReRenders += 1;
      workInProgressHook = currentHook = undefined;
      if (workInProgress.updateQueue !== undefined) {
        children = workInProgress.updateQueue;
        children.lastEffect = undefined;
        children.events = undefined;
        children.stores = undefined;
        children.memoCache !== undefined && (children.memoCache.index = 0);
      }
      ReactSharedInternals.H = HooksDispatcherOnRerender;
      children = Component(props, secondArg);
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
    workInProgress.flags &= -2053;
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
    workInProgressHook = currentHook = currentlyRenderingFiber = undefined;
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
        if (undefined === currentlyRenderingFiber.alternate) throw Error(formatProdErrorMessage(467));
        throw Error(formatProdErrorMessage(310));
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
    undefined === thenableState && (thenableState = __arrNew());
    thenable = trackUsedThenable(thenableState, thenable, index);
    index = currentlyRenderingFiber;
    undefined === (undefined === workInProgressHook ? index.memoizedState : workInProgressHook.next) && (index = index.alternate, ReactSharedInternals.H = undefined === index || undefined === index.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
    return thenable;
  }
  function use(usable) {
    if (undefined !== usable && "object" === typeOfJS(usable)) {
      if ("function" === typeOfJS(usable.then)) return useThenable(usable);
      if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
    }
    throw Error(formatProdErrorMessage(438, String(usable)));
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
    if (void 0 === updateQueue) for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++) updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
    memoCache.index++;
    return updateQueue;
  }
  function basicStateReducer(state, action) {
    return "function" === typeOfJS(action) ? action(state) : action;
  }
  function updateReducer(reducer) {
    let hook;
    hook = updateWorkInProgressHook();
    return updateReducerImpl(hook, currentHook, reducer);
  }
  function updateReducerImpl(hook, current, reducer) {
    let queue, baseQueue, pendingQueue, baseFirst, newBaseQueueFirst, newBaseQueueLast, update, didReadFromEntangledAsyncAction_51, updateLane, revertLane;
    queue = hook.queue;
    if (undefined === queue) throw Error(formatProdErrorMessage(311));
    queue.lastRenderedReducer = reducer;
    baseQueue = hook.baseQueue;
    pendingQueue = queue.pending;
    if (undefined !== pendingQueue) {
      if (undefined !== baseQueue) {
        baseFirst = baseQueue.next;
        baseQueue.next = pendingQueue.next;
        pendingQueue.next = baseFirst;
      }
      current.baseQueue = baseQueue = pendingQueue;
      queue.pending = undefined;
    }
    pendingQueue = hook.baseState;
    if (undefined === baseQueue) hook.memoizedState = pendingQueue;else {
      current = baseQueue.next;
      newBaseQueueFirst = baseFirst = undefined;
      newBaseQueueLast = undefined;
      update = current;
      didReadFromEntangledAsyncAction_51 = !1;
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
          }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction_51 = !0);else if ((renderLanes & revertLane) === revertLane) {
            update = update.next;
            revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction_51 = !0);
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
      if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = !0, didReadFromEntangledAsyncAction_51 && (reducer = currentEntangledActionThenable, undefined !== reducer))) throw reducer;
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
    if (undefined === queue) throw Error(formatProdErrorMessage(311));
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
  function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
    let fiber, hook, isHydrating_jscomp_0, snapshotChanged;
    fiber = currentlyRenderingFiber;
    hook = updateWorkInProgressHook();
    isHydrating_jscomp_0 = isHydrating;
    if (isHydrating_jscomp_0) {
      if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
      getServerSnapshot = getServerSnapshot();
    } else getServerSnapshot = getSnapshot();
    snapshotChanged = !objectIs((currentHook || hook).memoizedState, getServerSnapshot);
    snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = !0);
    hook = hook.queue;
    updateEffect(__partial((..._bindArgs3) => __applyFn(subscribeToStore, ..._bindArgs3), undefined, fiber, hook, subscribe), __arrNew(subscribe));
    if (hook.getSnapshot !== getSnapshot || snapshotChanged || undefined !== workInProgressHook && workInProgressHook.memoizedState.tag & 1) {
      fiber.flags |= 2048;
      pushSimpleEffect(9, {
        destroy: void 0
      }, __partial((..._bindArgs4) => __applyFn(updateStoreInstance, ..._bindArgs4), undefined, fiber, hook, getServerSnapshot, getSnapshot), undefined);
      if (undefined === workInProgressRoot) throw Error(formatProdErrorMessage(349));
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
      checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
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
  function updateOptimisticImpl(hook, current, passthrough, reducer) {
    hook.baseState = passthrough;
    return updateReducerImpl(hook, currentHook, "function" === typeOfJS(reducer) ? reducer : basicStateReducer);
  }
  function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
    let actionNode;
    if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
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
      ReactSharedInternals.T = currentTransition;
      try {
        returnValue = action(prevState, payload);
        onStartTransitionFinish = ReactSharedInternals.S;
        undefined !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        handleActionReturnValue(actionQueue, node, returnValue);
      } catch (__error) {
        onActionError(actionQueue, node, __error);
      } finally {
        undefined !== prevTransition && undefined !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    } else try {
      prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
    } catch (error_55) {
      onActionError(actionQueue, node, error_55);
    }
  }
  function handleActionReturnValue(actionQueue, node, returnValue) {
    undefined !== returnValue && "object" === typeOfJS(returnValue) && "function" === typeOfJS(returnValue.then) ? returnValue.then(function (nextState) {
      onActionSuccess(actionQueue, node, nextState);
    }, function (__error) {
      return onActionError(actionQueue, node, __error);
    }) : onActionSuccess(actionQueue, node, returnValue);
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
    let ssrFormState, JSCompiler_inline_result, markerInstance, setPendingState;
    if (isHydrating) {
      ssrFormState = workInProgressRoot.formState;
      if (undefined !== ssrFormState) {
        {
          let __lb_14 = false,
            __lc_14 = false;
          while (!__lb_14) {
            {
              JSCompiler_inline_result = currentlyRenderingFiber;
              if (isHydrating) {
                if (nextHydratableInstance) {
                  markerInstance = canHydrateFormStateMarker(nextHydratableInstance, rootOrSingletonContext);
                  if (markerInstance) {
                    nextHydratableInstance = getNextHydratableSibling(markerInstance);
                    JSCompiler_inline_result = isFormStateMarkerMatching(markerInstance);
                    {
                      __lb_14 = true;
                      break;
                    }
                  }
                }
                throwOnHydrationMismatch(JSCompiler_inline_result);
              }
              JSCompiler_inline_result = !1;
            }
            break;
          }
        }
        JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
      }
    }
    ssrFormState = mountWorkInProgressHook();
    ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
    JSCompiler_inline_result = {
      pending: undefined,
      lanes: 0,
      dispatch: undefined,
      lastRenderedReducer: actionStateReducer,
      lastRenderedState: initialStateProp
    };
    ssrFormState.queue = JSCompiler_inline_result;
    ssrFormState = __partial((..._bindArgs5) => __applyFn(dispatchSetState, ..._bindArgs5), undefined, currentlyRenderingFiber, JSCompiler_inline_result);
    JSCompiler_inline_result.dispatch = ssrFormState;
    JSCompiler_inline_result = mountStateImpl(!1);
    setPendingState = __partial((..._bindArgs6) => __applyFn(dispatchOptimisticSetState, ..._bindArgs6), undefined, currentlyRenderingFiber, !1, JSCompiler_inline_result.queue);
    JSCompiler_inline_result = mountWorkInProgressHook();
    markerInstance = {
      state: initialStateProp,
      dispatch: undefined,
      action: action,
      pending: undefined
    };
    JSCompiler_inline_result.queue = markerInstance;
    ssrFormState = __partial((..._bindArgs7) => __applyFn(dispatchActionState, ..._bindArgs7), undefined, currentlyRenderingFiber, markerInstance, setPendingState, ssrFormState);
    markerInstance.dispatch = ssrFormState;
    JSCompiler_inline_result.memoizedState = action;
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
    action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(9, {
      destroy: void 0
    }, __partial((..._bindArgs8) => __applyFn(actionStateActionEffect, ..._bindArgs8), undefined, actionQueue, action), undefined));
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
  function updateRef() {
    return updateWorkInProgressHook().memoizedState;
  }
  function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
    let hook;
    hook = mountWorkInProgressHook();
    currentlyRenderingFiber.flags |= fiberFlags;
    hook.memoizedState = pushSimpleEffect(1 | hookFlags, {
      destroy: void 0
    }, create, void 0 === deps ? undefined : deps);
  }
  function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
    let hook, inst;
    hook = updateWorkInProgressHook();
    deps = void 0 === deps ? undefined : deps;
    inst = hook.memoizedState.inst;
    undefined !== currentHook && undefined !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(1 | hookFlags, inst, create, deps));
  }
  function mountEffect(create, deps) {
    mountEffectImpl(8390656, 8, create, deps);
  }
  function updateEffect(create, deps) {
    updateEffectImpl(2048, 8, create, deps);
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
  function updateEvent(callback) {
    let ref;
    ref = updateWorkInProgressHook().memoizedState;
    useEffectEventImpl({
      ref: ref,
      nextImpl: callback
    });
    return function (...__args) {
      let __allArgs = __arrNew(...__args);
      if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
      return __applyFn(ref.impl, void 0, __allArgs);
    };
  }
  function updateInsertionEffect(create, deps) {
    return updateEffectImpl(4, 2, create, deps);
  }
  function updateLayoutEffect(create, deps) {
    return updateEffectImpl(4, 4, create, deps);
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
    if (undefined !== ref && void 0 !== ref) return create = create(), ref.current = create, function () {
      ref.current = undefined;
    };
  }
  function updateImperativeHandle(ref, create, deps) {
    deps = undefined !== deps && void 0 !== deps ? __concat(deps, __arrNew(ref)) : undefined;
    updateEffectImpl(4, 4, __partial((..._bindArgs9) => __applyFn(imperativeHandleEffect, ..._bindArgs9), undefined, create, ref), deps);
  }
  function mountDebugValue() {}
  function updateCallback(callback, deps) {
    let hook, prevState;
    hook = updateWorkInProgressHook();
    deps = void 0 === deps ? undefined : deps;
    prevState = hook.memoizedState;
    if (undefined !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
    hook.memoizedState = __arrNew(callback, deps);
    return callback;
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
  function startTransition(fiber, queue, pendingState, finishedState, callback) {
    let previousPriority, prevTransition, currentTransition, returnValue, onStartTransitionFinish, thenableForFinishedState;
    previousPriority = getCurrentUpdatePriority();
    setCurrentUpdatePriority(0 !== previousPriority && 8 > previousPriority ? previousPriority : 8);
    prevTransition = ReactSharedInternals.T;
    currentTransition = {};
    ReactSharedInternals.T = currentTransition;
    dispatchOptimisticSetState(fiber, !1, queue, pendingState);
    try {
      returnValue = callback();
      onStartTransitionFinish = ReactSharedInternals.S;
      undefined !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      if (undefined !== returnValue && "object" === typeOfJS(returnValue) && "function" === typeOfJS(returnValue.then)) {
        thenableForFinishedState = chainThenableValue(returnValue, finishedState);
        dispatchSetStateInternal(fiber, queue, thenableForFinishedState, requestUpdateLane(fiber));
      } else dispatchSetStateInternal(fiber, queue, finishedState, requestUpdateLane(fiber));
    } catch (__error) {
      dispatchSetStateInternal(fiber, queue, {
        then: function () {},
        status: "rejected",
        reason: __error
      }, requestUpdateLane());
    } finally {
      setCurrentUpdatePriority(previousPriority), undefined !== prevTransition && undefined !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
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
  function useHostTransitionStatus() {
    return readContext(HostTransitionContext);
  }
  function updateId() {
    return updateWorkInProgressHook().memoizedState;
  }
  function updateRefresh() {
    return updateWorkInProgressHook().memoizedState;
  }
  function refreshCache(fiber) {
    let provider, lane, root;
    for (provider = fiber.return; undefined !== provider;) {
      switch (provider.tag) {
        case 24:
        case 3:
          lane = requestUpdateLane();
          fiber = createUpdate(lane);
          root = enqueueUpdate(provider, fiber, lane);
          undefined !== root && (scheduleUpdateOnFiber(root, provider, lane), entangleTransitions(root, provider, lane));
          provider = {
            cache: createCache()
          };
          fiber.payload = provider;
          return;
      }
      provider = provider.return;
    }
  }
  function dispatchReducerAction(fiber, queue, action) {
    let lane;
    lane = requestUpdateLane();
    action = {
      lane: lane,
      revertLane: 0,
      gesture: undefined,
      action: action,
      hasEagerState: !1,
      eagerState: undefined,
      next: undefined
    };
    isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), undefined !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
  }
  function dispatchSetState(fiber, queue, action) {
    let lane;
    lane = requestUpdateLane();
    dispatchSetStateInternal(fiber, queue, action, lane);
  }
  function dispatchSetStateInternal(fiber, queue, action, lane) {
    let update, alternate, currentState, eagerState;
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
      if (0 === fiber.lanes && (undefined === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, undefined !== alternate)) try {
        currentState = queue.lastRenderedState;
        eagerState = alternate(currentState, action);
        update.hasEagerState = !0;
        update.eagerState = eagerState;
        if (objectIs(eagerState, currentState)) return enqueueUpdate_1(fiber, queue, update, 0), undefined === workInProgressRoot && finishQueueingConcurrentUpdates(), !1;
      } catch (__error) {} finally {}
      action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
      if (undefined !== action) return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), !0;
    }
    return !1;
  }
  function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
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
      if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
    } else throwIfDuringRender = enqueueConcurrentHookUpdate(fiber, queue, action, 2), undefined !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
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
  function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
    ctor = workInProgress.memoizedState;
    getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
    getDerivedStateFromProps = undefined === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
    workInProgress.memoizedState = getDerivedStateFromProps;
    0 === workInProgress.lanes && (workInProgress.updateQueue.baseState = getDerivedStateFromProps);
  }
  function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
    workInProgress = workInProgress.stateNode;
    return "function" === typeOfJS(workInProgress.shouldComponentUpdate) ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext) : __protoOf(ctor) && __protoOf(ctor).isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : !0;
  }
  function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
    workInProgress = instance.state;
    "function" === typeOfJS(instance.componentWillReceiveProps) && instance.componentWillReceiveProps(newProps, nextContext);
    "function" === typeOfJS(instance.UNSAFE_componentWillReceiveProps) && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
    instance.state !== workInProgress && classComponentUpdater.enqueueReplaceState(instance, instance.state, undefined);
  }
  function resolveClassComponentProps(Component, baseProps) {
    let newProps, propName, propName_57;
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
        propName_57 = __k;
        void 0 === newProps[propName_57] && (newProps[propName_57] = Component[propName_57]);
      }
    }
    return newProps;
  }
  function logUncaughtError(root, errorInfo) {
    let onUncaughtError;
    try {
      onUncaughtError = root.onUncaughtError;
      onUncaughtError(errorInfo.value, {
        componentStack: errorInfo.stack
      });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function logCaughtError(root, boundary, errorInfo) {
    let onCaughtError;
    try {
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
    lane.tag = 3;
    lane.payload = {
      element: undefined
    };
    lane.callback = function () {
      logUncaughtError(root, errorInfo);
    };
    return lane;
  }
  function createClassErrorUpdate(lane) {
    lane = createUpdate(lane);
    lane.tag = 3;
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
        logCaughtError(root, fiber, errorInfo);
      };
    }
    inst = fiber.stateNode;
    undefined !== inst && "function" === typeOfJS(inst.componentDidCatch) && (update.callback = function () {
      let stack;
      logCaughtError(root, fiber, errorInfo);
      "function" !== typeOfJS(getDerivedStateFromError) && (undefined === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = __new(Set, __arrNew(this)) : legacyErrorBoundariesThatAlreadyFailed.add(this));
      stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: undefined !== stack ? stack : ""
      });
    });
  }
  function throwException(root, returnFiber, sourceFiber, value, rootRenderLanes) {
    let wrapperError;
    sourceFiber.flags |= 32768;
    if (undefined !== value && "object" === typeOfJS(value) && "function" === typeOfJS(value.then)) {
      returnFiber = sourceFiber.alternate;
      undefined !== returnFiber && propagateParentContextChanges(returnFiber, sourceFiber, rootRenderLanes, !0);
      sourceFiber = suspenseHandlerStackCursor.current;
      if (undefined !== sourceFiber) {
        switch (sourceFiber.tag) {
          case 31:
          case 13:
            return undefined === shellBoundary ? renderDidSuspendDelayIfPossible() : undefined === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, undefined === returnFiber ? sourceFiber.updateQueue = __new(Set, __arrNew(value)) : returnFiber.add(value), attachPingListener(root, value, rootRenderLanes)), !1;
          case 22:
            return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, undefined === returnFiber ? (returnFiber = {
              transitions: undefined,
              markerInstances: undefined,
              retryQueue: __new(Set, __arrNew(value))
            }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, undefined === sourceFiber ? returnFiber.retryQueue = __new(Set, __arrNew(value)) : sourceFiber.add(value)), attachPingListener(root, value, rootRenderLanes)), !1;
        }
        throw Error(formatProdErrorMessage(435, sourceFiber.tag));
      }
      attachPingListener(root, value, rootRenderLanes);
      renderDidSuspendDelayIfPossible();
      return !1;
    }
    if (isHydrating) return returnFiber = suspenseHandlerStackCursor.current, undefined !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root = Error(formatProdErrorMessage(422), {
      cause: value
    }), queueHydrationError(createCapturedValueAtFiber(root, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
      cause: value
    }), queueHydrationError(createCapturedValueAtFiber(returnFiber, sourceFiber))), root = root.current.alternate, root.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(root.stateNode, value, rootRenderLanes), enqueueCapturedUpdate(root, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), !1;
    wrapperError = Error(formatProdErrorMessage(520), {
      cause: value
    });
    wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
    undefined === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = __arrNew(wrapperError) : __push(workInProgressRootConcurrentErrors, wrapperError);
    4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
    if (undefined === returnFiber) return !0;
    value = createCapturedValueAtFiber(value, sourceFiber);
    sourceFiber = returnFiber;
    do {
      switch (sourceFiber.tag) {
        case 3:
          return sourceFiber.flags |= 65536, root = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root, root = createRootErrorUpdate(sourceFiber.stateNode, value, root), enqueueCapturedUpdate(sourceFiber, root), !1;
        case 1:
          if (returnFiber = sourceFiber.type, wrapperError = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeOfJS(returnFiber.getDerivedStateFromError) || undefined !== wrapperError && "function" === typeOfJS(wrapperError.componentDidCatch) && (undefined === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError)))) return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(rootRenderLanes, root, sourceFiber, value), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), !1;
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
      if ("function" === typeOfJS(__type) && !shouldConstruct(__type) && void 0 === __type.defaultProps && undefined === Component.compare) return workInProgress.tag = 15, workInProgress.type = __type, updateSimpleMemoComponent(current, workInProgress, __type, nextProps, renderLanes);
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
      if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress.ref) if (didReceiveUpdate = !1, workInProgress.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes)) 0 !== (current.flags & 131072) && (didReceiveUpdate = !0);else return workInProgress.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }
    return updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes);
  }
  function updateOffscreenComponent(current, workInProgress, renderLanes, nextProps) {
    let nextChildren, prevState;
    nextChildren = nextProps.children;
    prevState = undefined !== current ? current.memoizedState : undefined;
    undefined === current && undefined === workInProgress.stateNode && (workInProgress.stateNode = {
      _visibility: 1,
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
      }, undefined !== current && pushTransition(workInProgress, undefined !== prevState ? prevState.cachePool : undefined), undefined !== prevState ? pushHiddenContext(workInProgress, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress);else return nextProps = workInProgress.lanes = 536870912, deferHiddenOffscreenComponent(current, workInProgress, undefined !== prevState ? prevState.baseLanes | renderLanes : renderLanes, renderLanes, nextProps);
    } else undefined !== prevState ? (pushTransition(workInProgress, prevState.cachePool), pushHiddenContext(workInProgress, prevState), reuseSuspenseHandlerOnStack(workInProgress), workInProgress.memoizedState = undefined) : (undefined !== current && pushTransition(workInProgress, undefined), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack(workInProgress));
    reconcileChildren(current, workInProgress, nextChildren, renderLanes);
    return workInProgress.child;
  }
  function bailoutOffscreenComponent(current, workInProgress) {
    undefined !== current && 22 === current.tag || undefined !== workInProgress.stateNode || (workInProgress.stateNode = {
      _visibility: 1,
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
    reuseHiddenContextOnStack();
    pushOffscreenSuspenseHandler(workInProgress);
    undefined !== current && propagateParentContextChanges(current, workInProgress, renderLanes, !0);
    workInProgress.childLanes = remainingChildLanes;
    return undefined;
  }
  function mountActivityChildren(workInProgress, nextProps) {
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
    let nextProps, didSuspend, prevState, dehydrated;
    nextProps = workInProgress.pendingProps;
    didSuspend = 0 !== (workInProgress.flags & 128);
    workInProgress.flags &= -129;
    if (undefined === current) {
      if (isHydrating) {
        if ("hidden" === nextProps.mode) return current = mountActivityChildren(workInProgress, nextProps), workInProgress.lanes = 536870912, bailoutOffscreenComponent(undefined, current);
        pushDehydratedActivitySuspenseHandler(workInProgress);
        (current = nextHydratableInstance) ? (current = canHydrateActivityInstance(current, rootOrSingletonContext), undefined !== current && (workInProgress.memoizedState = {
          dehydrated: current,
          treeContext: undefined !== treeContextProvider ? {
            id: treeContextId,
            overflow: treeContextOverflow
          } : undefined,
          retryLane: 536870912,
          hydrationErrors: undefined
        }, renderLanes = createFiberFromDehydratedFragment(current), renderLanes.return = workInProgress, workInProgress.child = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = undefined)) : current = undefined;
        if (undefined === current) throw throwOnHydrationMismatch(workInProgress);
        workInProgress.lanes = 536870912;
        return undefined;
      }
      return mountActivityChildren(workInProgress, nextProps);
    }
    prevState = current.memoizedState;
    if (undefined !== prevState) {
      dehydrated = prevState.dehydrated;
      pushDehydratedActivitySuspenseHandler(workInProgress);
      if (didSuspend) {
        if (workInProgress.flags & 256) workInProgress.flags &= -257, workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);else if (undefined !== workInProgress.memoizedState) workInProgress.child = current.child, workInProgress.flags |= 128, workInProgress = undefined;else throw Error(formatProdErrorMessage(558));
      } else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, !1), didSuspend = 0 !== (renderLanes & current.childLanes), didReceiveUpdate || didSuspend) {
        nextProps = workInProgressRoot;
        if (undefined !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes), 0 !== dehydrated && dehydrated !== prevState.retryLane)) throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
        renderDidSuspendDelayIfPossible();
        workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);
      } else current = prevState.treeContext, supportsHydration && (nextHydratableInstance = getFirstHydratableChildWithinActivityInstance(dehydrated), hydrationParentFiber = workInProgress, isHydrating = !0, hydrationErrors = undefined, rootOrSingletonContext = !1, undefined !== current && restoreSuspendedTreeContext(workInProgress, current)), workInProgress = mountActivityChildren(workInProgress, nextProps), workInProgress.flags |= 4096;
      return workInProgress;
    }
    current = createWorkInProgress(current.child, {
      mode: nextProps.mode,
      children: nextProps.children
    });
    current.ref = workInProgress.ref;
    workInProgress.child = current;
    current.return = workInProgress;
    return current;
  }
  function markRef(current, workInProgress) {
    let ref;
    ref = workInProgress.ref;
    if (undefined === ref) undefined !== current && undefined !== current.ref && (workInProgress.flags |= 4194816);else {
      if ("function" !== typeOfJS(ref) && "object" !== typeOfJS(ref)) throw Error(formatProdErrorMessage(284));
      if (undefined === current || current.ref !== ref) workInProgress.flags |= 4194816;
    }
  }
  function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {
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
    workInProgress.updateQueue = undefined;
    nextProps = renderWithHooksAgain(workInProgress, Component, nextProps, secondArg);
    finishRenderingHooks(current);
    Component = checkDidRenderIdHook();
    if (undefined !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    isHydrating && Component && pushMaterializedTreeId(workInProgress);
    workInProgress.flags |= 1;
    reconcileChildren(current, workInProgress, nextProps, renderLanes);
    return workInProgress.child;
  }
  function updateClassComponent(current, workInProgress, Component, nextProps, renderLanes) {
    let context, contextType, unresolvedOldProps, oldProps, oldContext, contextType_jscomp_0, getDerivedStateFromProps, oldState, newState;
    prepareToReadContext(workInProgress);
    if (undefined === workInProgress.stateNode) {
      context = emptyContextObject;
      contextType = Component.contextType;
      "object" === typeOfJS(contextType) && undefined !== contextType && (context = readContext(contextType));
      context = __new(Component, nextProps, context);
      workInProgress.memoizedState = undefined !== context.state && void 0 !== context.state ? context.state : undefined;
      context.updater = classComponentUpdater;
      workInProgress.stateNode = context;
      context._reactInternals = workInProgress;
      context = workInProgress.stateNode;
      context.props = nextProps;
      context.state = workInProgress.memoizedState;
      context.refs = {};
      initializeUpdateQueue(workInProgress);
      contextType = Component.contextType;
      context.context = "object" === typeOfJS(contextType) && undefined !== contextType ? readContext(contextType) : emptyContextObject;
      context.state = workInProgress.memoizedState;
      contextType = Component.getDerivedStateFromProps;
      "function" === typeOfJS(contextType) && (applyDerivedStateFromProps(workInProgress, Component, contextType, nextProps), context.state = workInProgress.memoizedState);
      "function" === typeOfJS(Component.getDerivedStateFromProps) || "function" === typeOfJS(context.getSnapshotBeforeUpdate) || "function" !== typeOfJS(context.UNSAFE_componentWillMount) && "function" !== typeOfJS(context.componentWillMount) || (contextType = context.state, "function" === typeOfJS(context.componentWillMount) && context.componentWillMount(), "function" === typeOfJS(context.UNSAFE_componentWillMount) && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, undefined), processUpdateQueue(workInProgress, nextProps, context, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress.memoizedState);
      "function" === typeOfJS(context.componentDidMount) && (workInProgress.flags |= 4194308);
      nextProps = !0;
    } else if (undefined === current) {
      context = workInProgress.stateNode;
      unresolvedOldProps = workInProgress.memoizedProps;
      oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
      context.props = oldProps;
      oldContext = context.context;
      contextType_jscomp_0 = Component.contextType;
      contextType = emptyContextObject;
      "object" === typeOfJS(contextType_jscomp_0) && undefined !== contextType_jscomp_0 && (contextType = readContext(contextType_jscomp_0));
      getDerivedStateFromProps = Component.getDerivedStateFromProps;
      contextType_jscomp_0 = "function" === typeOfJS(getDerivedStateFromProps) || "function" === typeOfJS(context.getSnapshotBeforeUpdate);
      unresolvedOldProps = workInProgress.pendingProps !== unresolvedOldProps;
      contextType_jscomp_0 || "function" !== typeOfJS(context.UNSAFE_componentWillReceiveProps) && "function" !== typeOfJS(context.componentWillReceiveProps) || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress, context, nextProps, contextType);
      hasForceUpdate = !1;
      oldState = workInProgress.memoizedState;
      context.state = oldState;
      processUpdateQueue(workInProgress, nextProps, context, renderLanes);
      suspendIfUpdateReadFromEntangledAsyncAction();
      oldContext = workInProgress.memoizedState;
      unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeOfJS(getDerivedStateFromProps) && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldContext = workInProgress.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldState, oldContext, contextType)) ? (contextType_jscomp_0 || "function" !== typeOfJS(context.UNSAFE_componentWillMount) && "function" !== typeOfJS(context.componentWillMount) || ("function" === typeOfJS(context.componentWillMount) && context.componentWillMount(), "function" === typeOfJS(context.UNSAFE_componentWillMount) && context.UNSAFE_componentWillMount()), "function" === typeOfJS(context.componentDidMount) && (workInProgress.flags |= 4194308)) : ("function" === typeOfJS(context.componentDidMount) && (workInProgress.flags |= 4194308), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeOfJS(context.componentDidMount) && (workInProgress.flags |= 4194308), nextProps = !1);
    } else {
      context = workInProgress.stateNode;
      cloneUpdateQueue(current, workInProgress);
      contextType = workInProgress.memoizedProps;
      contextType_jscomp_0 = resolveClassComponentProps(Component, contextType);
      context.props = contextType_jscomp_0;
      getDerivedStateFromProps = workInProgress.pendingProps;
      oldState = context.context;
      oldContext = Component.contextType;
      oldProps = emptyContextObject;
      "object" === typeOfJS(oldContext) && undefined !== oldContext && (oldProps = readContext(oldContext));
      unresolvedOldProps = Component.getDerivedStateFromProps;
      (oldContext = "function" === typeOfJS(unresolvedOldProps) || "function" === typeOfJS(context.getSnapshotBeforeUpdate)) || "function" !== typeOfJS(context.UNSAFE_componentWillReceiveProps) && "function" !== typeOfJS(context.componentWillReceiveProps) || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(workInProgress, context, nextProps, oldProps);
      hasForceUpdate = !1;
      oldState = workInProgress.memoizedState;
      context.state = oldState;
      processUpdateQueue(workInProgress, nextProps, context, renderLanes);
      suspendIfUpdateReadFromEntangledAsyncAction();
      newState = workInProgress.memoizedState;
      contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || undefined !== current && undefined !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeOfJS(unresolvedOldProps) && (applyDerivedStateFromProps(workInProgress, Component, unresolvedOldProps, nextProps), newState = workInProgress.memoizedState), (contextType_jscomp_0 = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, contextType_jscomp_0, nextProps, oldState, newState, oldProps) || undefined !== current && undefined !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeOfJS(context.UNSAFE_componentWillUpdate) && "function" !== typeOfJS(context.componentWillUpdate) || ("function" === typeOfJS(context.componentWillUpdate) && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeOfJS(context.UNSAFE_componentWillUpdate) && context.UNSAFE_componentWillUpdate(nextProps, newState, oldProps)), "function" === typeOfJS(context.componentDidUpdate) && (workInProgress.flags |= 4), "function" === typeOfJS(context.getSnapshotBeforeUpdate) && (workInProgress.flags |= 1024)) : ("function" !== typeOfJS(context.componentDidUpdate) || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeOfJS(context.getSnapshotBeforeUpdate) || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType_jscomp_0) : ("function" !== typeOfJS(context.componentDidUpdate) || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeOfJS(context.getSnapshotBeforeUpdate) || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), nextProps = !1);
    }
    context = nextProps;
    markRef(current, workInProgress);
    nextProps = 0 !== (workInProgress.flags & 128);
    context || nextProps ? (context = workInProgress.stateNode, Component = nextProps && "function" !== typeOfJS(Component.getDerivedStateFromError) ? undefined : context.render(), workInProgress.flags |= 1, undefined !== current && nextProps ? (workInProgress.child = reconcileChildFibers(workInProgress, current.child, undefined, renderLanes), workInProgress.child = reconcileChildFibers(workInProgress, undefined, Component, renderLanes)) : reconcileChildren(current, workInProgress, Component, renderLanes), workInProgress.memoizedState = context.state, current = workInProgress.child) : current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    return current;
  }
  function mountHostRootWithoutHydrating(current, workInProgress, nextChildren, renderLanes) {
    resetHydrationState();
    workInProgress.flags |= 256;
    reconcileChildren(current, workInProgress, nextChildren, renderLanes);
    return workInProgress.child;
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
    showFallback = !1;
    didSuspend = 0 !== (workInProgress.flags & 128);
    (JSCompiler_temp = didSuspend) || (JSCompiler_temp = undefined !== current && undefined === current.memoizedState ? !1 : 0 !== (suspenseStackCursor.current & 2));
    JSCompiler_temp && (showFallback = !0, workInProgress.flags &= -129);
    JSCompiler_temp = 0 !== (workInProgress.flags & 32);
    workInProgress.flags &= -33;
    if (undefined === current) {
      if (isHydrating) {
        showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress) : reuseSuspenseHandlerOnStack(workInProgress);
        (current = nextHydratableInstance) ? (current = canHydrateSuspenseInstance(current, rootOrSingletonContext), undefined !== current && (workInProgress.memoizedState = {
          dehydrated: current,
          treeContext: undefined !== treeContextProvider ? {
            id: treeContextId,
            overflow: treeContextOverflow
          } : undefined,
          retryLane: 536870912,
          hydrationErrors: undefined
        }, renderLanes = createFiberFromDehydratedFragment(current), renderLanes.return = workInProgress, workInProgress.child = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = undefined)) : current = undefined;
        if (undefined === current) throw throwOnHydrationMismatch(workInProgress);
        isSuspenseInstanceFallback(current) ? workInProgress.lanes = 32 : workInProgress.lanes = 536870912;
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
      }, showFallback), nextPrimaryChildren = createFiberFromFragment(nextPrimaryChildren, showFallback, renderLanes, undefined), nextPrimaryChildren.flags |= 2, nextProps.return = workInProgress, nextPrimaryChildren.return = workInProgress, nextProps.sibling = nextPrimaryChildren, workInProgress.child = nextProps, reconcileChildFibers(workInProgress, current.child, undefined, renderLanes), nextProps = workInProgress.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes), nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, workInProgress = bailoutOffscreenComponent(undefined, nextProps));else if (pushPrimaryTreeSuspenseHandler(workInProgress), isSuspenseInstanceFallback(nextPrimaryChildren)) JSCompiler_temp = getSuspenseInstanceFallbackErrorDetails(nextPrimaryChildren).digest, nextProps = Error(formatProdErrorMessage(419)), nextProps.stack = "", nextProps.digest = JSCompiler_temp, queueHydrationError({
        value: nextProps,
        source: undefined,
        stack: undefined
      }), workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, !1), JSCompiler_temp = 0 !== (renderLanes & current.childLanes), didReceiveUpdate || JSCompiler_temp) {
        JSCompiler_temp = workInProgressRoot;
        if (undefined !== JSCompiler_temp && (nextProps = getBumpedLaneForHydration(JSCompiler_temp, renderLanes), 0 !== nextProps && nextProps !== prevState.retryLane)) throw prevState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), SelectiveHydrationException;
        isSuspenseInstancePending(nextPrimaryChildren) || renderDidSuspendDelayIfPossible();
        workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
      } else isSuspenseInstancePending(nextPrimaryChildren) ? (workInProgress.flags |= 192, workInProgress.child = current.child, workInProgress = undefined) : (current = prevState.treeContext, supportsHydration && (nextHydratableInstance = getFirstHydratableChildWithinSuspenseInstance(nextPrimaryChildren), hydrationParentFiber = workInProgress, isHydrating = !0, hydrationErrors = undefined, rootOrSingletonContext = !1, undefined !== current && restoreSuspendedTreeContext(workInProgress, current)), workInProgress = mountSuspensePrimaryChildren(workInProgress, nextProps.children), workInProgress.flags |= 4096);
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
    let nextProps, revealOrder, tailMode, suspenseContext, shouldForceFallback;
    nextProps = workInProgress.pendingProps;
    revealOrder = nextProps.revealOrder;
    tailMode = nextProps.tail;
    nextProps = nextProps.children;
    suspenseContext = suspenseStackCursor.current;
    shouldForceFallback = 0 !== (suspenseContext & 2);
    shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress.flags |= 128) : suspenseContext &= 1;
    push(suspenseStackCursor, suspenseContext);
    reconcileChildren(current, workInProgress, nextProps, renderLanes);
    nextProps = isHydrating ? treeForkCount : 0;
    if (!shouldForceFallback && undefined !== current && 0 !== (current.flags & 128)) {
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
        initSuspenseListRenderState(workInProgress, !1, revealOrder, renderLanes, tailMode, nextProps);
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
        initSuspenseListRenderState(workInProgress, !0, renderLanes, undefined, tailMode, nextProps);
        break;
      case "together":
        initSuspenseListRenderState(workInProgress, !1, undefined, undefined, void 0, nextProps);
        break;
      default:
        workInProgress.memoizedState = undefined;
    }
    return workInProgress.child;
  }
  function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
    undefined !== current && (workInProgress.dependencies = current.dependencies);
    workInProgressRootSkippedLanes |= workInProgress.lanes;
    if (0 === (renderLanes & workInProgress.childLanes)) if (undefined !== current) {
      if (propagateParentContextChanges(current, workInProgress, renderLanes, !1), 0 === (renderLanes & workInProgress.childLanes)) return undefined;
    } else return undefined;
    if (undefined !== current && workInProgress.child !== current.child) throw Error(formatProdErrorMessage(153));
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
    let state_82, didSuspendBefore;
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
      case 31:
        if (undefined !== workInProgress.memoizedState) return workInProgress.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress), undefined;
        break;
      case 13:
        state_82 = workInProgress.memoizedState;
        if (undefined !== state_82) {
          if (undefined !== state_82.dehydrated) return pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags |= 128, undefined;
          if (0 !== (renderLanes & workInProgress.child.childLanes)) return updateSuspenseComponent(current, workInProgress, renderLanes);
          pushPrimaryTreeSuspenseHandler(workInProgress);
          current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
          return undefined !== current ? current.sibling : undefined;
        }
        pushPrimaryTreeSuspenseHandler(workInProgress);
        break;
      case 19:
        didSuspendBefore = 0 !== (current.flags & 128);
        state_82 = 0 !== (renderLanes & workInProgress.childLanes);
        state_82 || (propagateParentContextChanges(current, workInProgress, renderLanes, !1), state_82 = 0 !== (renderLanes & workInProgress.childLanes));
        if (didSuspendBefore) {
          if (state_82) return updateSuspenseListComponent(current, workInProgress, renderLanes);
          workInProgress.flags |= 128;
        }
        didSuspendBefore = workInProgress.memoizedState;
        undefined !== didSuspendBefore && (didSuspendBefore.rendering = undefined, didSuspendBefore.tail = undefined, didSuspendBefore.lastEffect = undefined);
        push(suspenseStackCursor, suspenseStackCursor.current);
        if (state_82) break;else return undefined;
      case 22:
        return workInProgress.lanes = 0, updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
      case 24:
        pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
    }
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }
  function beginWork(current, workInProgress, renderLanes) {
    let props, __typeof, nextProps, nextState;
    if (undefined !== current) {
      if (current.memoizedProps !== workInProgress.pendingProps) didReceiveUpdate = !0;else {
        if (!checkScheduledUpdateOrContext(current, renderLanes) && 0 === (workInProgress.flags & 128)) return didReceiveUpdate = !1, attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes);
        didReceiveUpdate = 0 !== (current.flags & 131072) ? !0 : !1;
      }
    } else didReceiveUpdate = !1, isHydrating && 0 !== (workInProgress.flags & 1048576) && pushTreeId(workInProgress, treeForkCount, workInProgress.index);
    workInProgress.lanes = 0;
    switch (workInProgress.tag) {
      case 16:
        {
          let __lb_12 = false,
            __lc_12 = false;
          while (!__lb_12) {
            {
              props = workInProgress.pendingProps;
              current = resolveLazy(workInProgress.elementType);
              workInProgress.type = current;
              if ("function" === typeOfJS(current)) shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress.tag = 1, workInProgress = updateClassComponent(undefined, workInProgress, current, props, renderLanes)) : (workInProgress.tag = 0, workInProgress = updateFunctionComponent(undefined, workInProgress, current, props, renderLanes));else {
                if (void 0 !== current && undefined !== current) {
                  __typeof = current.$$typeof;
                  if (__typeof === REACT_FORWARD_REF_TYPE) {
                    workInProgress.tag = 11;
                    workInProgress = updateForwardRef(undefined, workInProgress, current, props, renderLanes);
                    {
                      __lb_12 = true;
                      break;
                    }
                  } else if (__typeof === REACT_MEMO_TYPE) {
                    workInProgress.tag = 14;
                    workInProgress = updateMemoComponent(undefined, workInProgress, current, props, renderLanes);
                    {
                      __lb_12 = true;
                      break;
                    }
                  }
                }
                workInProgress = getComponentNameFromType(current) || current;
                throw Error(formatProdErrorMessage(306, workInProgress, ""));
              }
            }
            break;
          }
        }
        return workInProgress;
      case 0:
        return updateFunctionComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
      case 1:
        return props = workInProgress.type, __typeof = resolveClassComponentProps(props, workInProgress.pendingProps), updateClassComponent(current, workInProgress, props, __typeof, renderLanes);
      case 3:
        {
          let __lb_11 = false,
            __lc_11 = false;
          while (!__lb_11) {
            {
              pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
              if (undefined === current) throw Error(formatProdErrorMessage(387));
              nextProps = workInProgress.pendingProps;
              __typeof = workInProgress.memoizedState;
              props = __typeof.element;
              cloneUpdateQueue(current, workInProgress);
              processUpdateQueue(workInProgress, nextProps, undefined, renderLanes);
              nextState = workInProgress.memoizedState;
              nextProps = nextState.cache;
              pushProvider(workInProgress, CacheContext, nextProps);
              nextProps !== __typeof.cache && propagateContextChanges(workInProgress, __arrNew(CacheContext), renderLanes, !0);
              suspendIfUpdateReadFromEntangledAsyncAction();
              nextProps = nextState.element;
              if (supportsHydration && __typeof.isDehydrated) {
                if (__typeof = {
                  element: nextProps,
                  isDehydrated: !1,
                  cache: nextState.cache
                }, workInProgress.updateQueue.baseState = __typeof, workInProgress.memoizedState = __typeof, workInProgress.flags & 256) {
                  workInProgress = mountHostRootWithoutHydrating(current, workInProgress, nextProps, renderLanes);
                  {
                    __lb_11 = true;
                    break;
                  }
                } else if (nextProps !== props) {
                  props = createCapturedValueAtFiber(Error(formatProdErrorMessage(424)), workInProgress);
                  queueHydrationError(props);
                  workInProgress = mountHostRootWithoutHydrating(current, workInProgress, nextProps, renderLanes);
                  {
                    __lb_11 = true;
                    break;
                  }
                } else for (supportsHydration && (nextHydratableInstance = getFirstHydratableChildWithinContainer(workInProgress.stateNode.containerInfo), hydrationParentFiber = workInProgress, isHydrating = !0, hydrationErrors = undefined, rootOrSingletonContext = !0), renderLanes = mountChildFibers(workInProgress, undefined, nextProps, renderLanes), workInProgress.child = renderLanes; renderLanes;) renderLanes.flags = renderLanes.flags & -3 | 4096, renderLanes = renderLanes.sibling;
              } else {
                resetHydrationState();
                if (nextProps === props) {
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
        if (supportsResources) return markRef(current, workInProgress), undefined === current ? (renderLanes = getResource(workInProgress.type, undefined, workInProgress.pendingProps, undefined)) ? workInProgress.memoizedState = renderLanes : isHydrating || (workInProgress.stateNode = createHoistableInstance(workInProgress.type, workInProgress.pendingProps, rootInstanceStackCursor.current, workInProgress)) : workInProgress.memoizedState = getResource(workInProgress.type, current.memoizedProps, workInProgress.pendingProps, current.memoizedState), undefined;
      case 27:
        if (supportsSingletons) return pushHostContext(workInProgress), undefined === current && supportsSingletons && isHydrating && (props = workInProgress.stateNode = resolveSingletonInstance(workInProgress.type, workInProgress.pendingProps, rootInstanceStackCursor.current, contextStackCursor.current, !1), hydrationParentFiber = workInProgress, rootOrSingletonContext = !0, nextHydratableInstance = getFirstHydratableChildWithinSingleton(workInProgress.type, props, nextHydratableInstance)), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), markRef(current, workInProgress), undefined === current && (workInProgress.flags |= 4194304), workInProgress.child;
      case 5:
        if (undefined === current && isHydrating) {
          validateHydratableInstance(workInProgress.type, workInProgress.pendingProps, contextStackCursor.current);
          if (__typeof = props = nextHydratableInstance) props = canHydrateInstance(props, workInProgress.type, workInProgress.pendingProps, rootOrSingletonContext), undefined !== props ? (workInProgress.stateNode = props, hydrationParentFiber = workInProgress, nextHydratableInstance = getFirstHydratableChild(props), rootOrSingletonContext = !1, __typeof = !0) : __typeof = !1;
          __typeof || throwOnHydrationMismatch(workInProgress);
        }
        pushHostContext(workInProgress);
        __typeof = workInProgress.type;
        nextProps = workInProgress.pendingProps;
        nextState = undefined !== current ? current.memoizedProps : undefined;
        props = nextProps.children;
        shouldSetTextContent(__typeof, nextProps) ? props = undefined : undefined !== nextState && shouldSetTextContent(__typeof, nextState) && (workInProgress.flags |= 32);
        undefined !== workInProgress.memoizedState && (__typeof = renderWithHooks(current, workInProgress, TransitionAwareHostComponent, undefined, undefined, renderLanes), isPrimaryRenderer ? HostTransitionContext._currentValue = __typeof : HostTransitionContext._currentValue2 = __typeof);
        markRef(current, workInProgress);
        reconcileChildren(current, workInProgress, props, renderLanes);
        return workInProgress.child;
      case 6:
        if (undefined === current && isHydrating) {
          validateHydratableTextInstance(workInProgress.pendingProps, contextStackCursor.current);
          if (current = renderLanes = nextHydratableInstance) renderLanes = canHydrateTextInstance(renderLanes, workInProgress.pendingProps, rootOrSingletonContext), undefined !== renderLanes ? (workInProgress.stateNode = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = undefined, current = !0) : current = !1;
          current || throwOnHydrationMismatch(workInProgress);
        }
        return undefined;
      case 13:
        return updateSuspenseComponent(current, workInProgress, renderLanes);
      case 4:
        return pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), props = workInProgress.pendingProps, undefined === current ? workInProgress.child = reconcileChildFibers(workInProgress, undefined, props, renderLanes) : reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
      case 11:
        return updateForwardRef(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
      case 7:
        return reconcileChildren(current, workInProgress, workInProgress.pendingProps, renderLanes), workInProgress.child;
      case 8:
        return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
      case 12:
        return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
      case 10:
        return props = workInProgress.pendingProps, pushProvider(workInProgress, workInProgress.type, props.value), reconcileChildren(current, workInProgress, props.children, renderLanes), workInProgress.child;
      case 9:
        return __typeof = workInProgress.type._context, props = workInProgress.pendingProps.children, prepareToReadContext(workInProgress), __typeof = readContext(__typeof), props = props(__typeof), workInProgress.flags |= 1, reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
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
        return prepareToReadContext(workInProgress), props = readContext(CacheContext), undefined === current ? (__typeof = peekCacheFromPool(), undefined === __typeof && (__typeof = workInProgressRoot, nextProps = createCache(), __typeof.pooledCache = nextProps, nextProps.refCount++, undefined !== nextProps && (__typeof.pooledCacheLanes |= renderLanes), __typeof = nextProps), workInProgress.memoizedState = {
          parent: props,
          cache: __typeof
        }, initializeUpdateQueue(workInProgress), pushProvider(workInProgress, CacheContext, __typeof)) : (0 !== (current.lanes & renderLanes) && (cloneUpdateQueue(current, workInProgress), processUpdateQueue(workInProgress, undefined, undefined, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction()), __typeof = current.memoizedState, nextProps = workInProgress.memoizedState, __typeof.parent !== props ? (__typeof = {
          parent: props,
          cache: props
        }, workInProgress.memoizedState = __typeof, 0 === workInProgress.lanes && (workInProgress.memoizedState = workInProgress.updateQueue.baseState = __typeof), pushProvider(workInProgress, CacheContext, props)) : (props = nextProps.cache, pushProvider(workInProgress, CacheContext, props), props !== __typeof.cache && propagateContextChanges(workInProgress, __arrNew(CacheContext), renderLanes, !0))), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
      case 29:
        throw workInProgress.pendingProps;
    }
    throw Error(formatProdErrorMessage(156, workInProgress.tag));
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
    let node_85, instance;
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
    } else if (supportsPersistence) for (node_85 = workInProgress.child; undefined !== node_85;) {
      if (5 === node_85.tag) {
        instance = node_85.stateNode;
        needsVisibilityToggle && isHidden && (instance = cloneHiddenInstance(instance, node_85.type, node_85.memoizedProps));
        appendInitialChild(parent, instance);
      } else if (6 === node_85.tag) instance = node_85.stateNode, needsVisibilityToggle && isHidden && (instance = cloneHiddenTextInstance(instance, node_85.memoizedProps)), appendInitialChild(parent, instance);else if (4 !== node_85.tag) if (22 === node_85.tag && undefined !== node_85.memoizedState) instance = node_85.child, undefined !== instance && (instance.return = node_85), appendAllChildren(parent, node_85, !0, !0);else if (undefined !== node_85.child) {
        node_85.child.return = node_85;
        node_85 = node_85.child;
        continue;
      }
      if (node_85 === workInProgress) break;
      for (; undefined === node_85.sibling;) {
        if (undefined === node_85.return || node_85.return === workInProgress) return;
        node_85 = node_85.return;
      }
      node_85.sibling.return = node_85.return;
      node_85 = node_85.sibling;
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
    let currentInstance, oldProps_88, currentHostContext;
    if (supportsMutation) current.memoizedProps !== newProps && markUpdate(workInProgress);else if (supportsPersistence) {
      currentInstance = current.stateNode;
      oldProps_88 = current.memoizedProps;
      if ((current = doesRequireClone(current, workInProgress)) || oldProps_88 !== newProps) {
        currentHostContext = contextStackCursor.current;
        oldProps_88 = cloneInstance(currentInstance, __type, oldProps_88, newProps, !current, undefined);
        oldProps_88 === currentInstance ? workInProgress.stateNode = currentInstance : (markCloned(workInProgress), finalizeInitialChildren(oldProps_88, __type, newProps, currentHostContext) && markUpdate(workInProgress), workInProgress.stateNode = oldProps_88, current && appendAllChildren(oldProps_88, workInProgress, !1, !1));
      } else workInProgress.stateNode = currentInstance;
    }
  }
  function preloadInstanceAndSuspendIfNeeded(workInProgress, __type, oldProps, newProps, renderLanes) {
    if (0 !== (workInProgress.mode & 32) && (undefined === oldProps ? maySuspendCommit(__type, newProps) : maySuspendCommitOnUpdate(__type, oldProps, newProps))) {
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
    let lastTailNode, lastTailNode_90;
    if (!isHydrating) switch (renderState.tailMode) {
      case "hidden":
        hasRenderedATailFallback = renderState.tail;
        for (lastTailNode = undefined; undefined !== hasRenderedATailFallback;) undefined !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
        undefined === lastTailNode ? renderState.tail = undefined : lastTailNode.sibling = undefined;
        break;
      case "collapsed":
        lastTailNode = renderState.tail;
        for (lastTailNode_90 = undefined; undefined !== lastTailNode;) undefined !== lastTailNode.alternate && (lastTailNode_90 = lastTailNode), lastTailNode = lastTailNode.sibling;
        undefined === lastTailNode_90 ? hasRenderedATailFallback || undefined === renderState.tail ? renderState.tail = undefined : renderState.tail.sibling = undefined : lastTailNode_90.sibling = undefined;
    }
  }
  function bubbleProperties(completedWork) {
    let didBailout, newChildLanes, subtreeFlags, child_91;
    didBailout = undefined !== completedWork.alternate && completedWork.alternate.child === completedWork.child;
    newChildLanes = 0;
    subtreeFlags = 0;
    if (didBailout) for (child_91 = completedWork.child; undefined !== child_91;) newChildLanes |= child_91.lanes | child_91.childLanes, subtreeFlags |= child_91.subtreeFlags & 65011712, subtreeFlags |= child_91.flags & 65011712, child_91.return = completedWork, child_91 = child_91.sibling;else for (child_91 = completedWork.child; undefined !== child_91;) newChildLanes |= child_91.lanes | child_91.childLanes, subtreeFlags |= child_91.subtreeFlags, subtreeFlags |= child_91.flags, child_91.return = completedWork, child_91 = child_91.sibling;
    completedWork.subtreeFlags |= subtreeFlags;
    completedWork.childLanes = newChildLanes;
    return didBailout;
  }
  function completeWork(current, workInProgress, renderLanes) {
    let newProps, __type, nextResource, instance_101;
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
        popProvider(CacheContext);
        popHostContainer();
        renderLanes.pendingContext && (renderLanes.context = renderLanes.pendingContext, renderLanes.pendingContext = undefined);
        if (undefined === current || undefined === current.child) popHydrationState(workInProgress) ? markUpdate(workInProgress) : undefined === current || current.memoizedState.isDehydrated && 0 === (workInProgress.flags & 256) || (workInProgress.flags |= 1024, upgradeHydrationErrorsToRecoverable());
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
          renderLanes = rootInstanceStackCursor.current;
          __type = workInProgress.type;
          if (undefined !== current && workInProgress.stateNode !== undefined) supportsMutation ? current.memoizedProps !== newProps && markUpdate(workInProgress) : updateHostComponent(current, workInProgress, __type, newProps);else {
            if (!newProps) {
              if (undefined === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
              bubbleProperties(workInProgress);
              return undefined;
            }
            current = contextStackCursor.current;
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
            if (undefined === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
            bubbleProperties(workInProgress);
            return undefined;
          }
          nextResource = contextStackCursor.current;
          if (popHydrationState(workInProgress)) prepareToHydrateHostInstance(workInProgress, nextResource), finalizeHydratedChildren(workInProgress.stateNode, __type, newProps, nextResource) && (workInProgress.flags |= 64);else {
            instance_101 = createInstance(__type, newProps, rootInstanceStackCursor.current, nextResource, workInProgress);
            markCloned(workInProgress);
            appendAllChildren(instance_101, workInProgress, !1, !1);
            workInProgress.stateNode = instance_101;
            finalizeInitialChildren(instance_101, __type, newProps, nextResource) && markUpdate(workInProgress);
          }
        }
        bubbleProperties(workInProgress);
        preloadInstanceAndSuspendIfNeeded(workInProgress, workInProgress.type, undefined === current ? undefined : current.memoizedProps, workInProgress.pendingProps, renderLanes);
        return undefined;
      case 6:
        if (current && workInProgress.stateNode !== undefined) renderLanes = current.memoizedProps, supportsMutation ? renderLanes !== newProps && markUpdate(workInProgress) : supportsPersistence && (renderLanes !== newProps ? (current = rootInstanceStackCursor.current, renderLanes = contextStackCursor.current, markCloned(workInProgress), workInProgress.stateNode = createTextInstance(newProps, current, renderLanes, workInProgress)) : workInProgress.stateNode = current.stateNode);else {
          if ("string" !== typeOfJS(newProps) && undefined === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
          current = rootInstanceStackCursor.current;
          renderLanes = contextStackCursor.current;
          if (popHydrationState(workInProgress)) {
            if (!supportsHydration) throw Error(formatProdErrorMessage(176));
            current = workInProgress.stateNode;
            renderLanes = workInProgress.memoizedProps;
            newProps = undefined;
            __type = hydrationParentFiber;
            if (undefined !== __type) switch (__type.tag) {
              case 27:
              case 5:
                newProps = __type.memoizedProps;
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
              if (!newProps) throw Error(formatProdErrorMessage(318));
              if (!supportsHydration) throw Error(formatProdErrorMessage(556));
              current = workInProgress.memoizedState;
              current = undefined !== current ? current.dehydrated : undefined;
              if (!current) throw Error(formatProdErrorMessage(557));
              hydrateActivityInstance(current, workInProgress);
            } else resetHydrationState(), 0 === (workInProgress.flags & 128) && (workInProgress.memoizedState = undefined), workInProgress.flags |= 4;
            bubbleProperties(workInProgress);
            current = !1;
          } else renderLanes = upgradeHydrationErrorsToRecoverable(), undefined !== current && undefined !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes), current = !0;
          if (!current) {
            if (workInProgress.flags & 256) return popSuspenseHandler(workInProgress), workInProgress;
            popSuspenseHandler(workInProgress);
            return undefined;
          }
          if (0 !== (workInProgress.flags & 128)) throw Error(formatProdErrorMessage(558));
        }
        bubbleProperties(workInProgress);
        return undefined;
      case 13:
        newProps = workInProgress.memoizedState;
        if (undefined === current || undefined !== current.memoizedState && undefined !== current.memoizedState.dehydrated) {
          __type = popHydrationState(workInProgress);
          if (undefined !== newProps && undefined !== newProps.dehydrated) {
            if (undefined === current) {
              if (!__type) throw Error(formatProdErrorMessage(318));
              if (!supportsHydration) throw Error(formatProdErrorMessage(344));
              __type = workInProgress.memoizedState;
              __type = undefined !== __type ? __type.dehydrated : undefined;
              if (!__type) throw Error(formatProdErrorMessage(317));
              hydrateSuspenseInstance(__type, workInProgress);
            } else resetHydrationState(), 0 === (workInProgress.flags & 128) && (workInProgress.memoizedState = undefined), workInProgress.flags |= 4;
            bubbleProperties(workInProgress);
            __type = !1;
          } else __type = upgradeHydrationErrorsToRecoverable(), undefined !== current && undefined !== current.memoizedState && (current.memoizedState.hydrationErrors = __type), __type = !0;
          if (!__type) {
            if (workInProgress.flags & 256) return popSuspenseHandler(workInProgress), workInProgress;
            popSuspenseHandler(workInProgress);
            return undefined;
          }
        }
        popSuspenseHandler(workInProgress);
        if (0 !== (workInProgress.flags & 128)) return workInProgress.lanes = renderLanes, workInProgress;
        renderLanes = undefined !== newProps;
        current = undefined !== current && undefined !== current.memoizedState;
        renderLanes && (newProps = workInProgress.child, __type = undefined, undefined !== newProps.alternate && undefined !== newProps.alternate.memoizedState && undefined !== newProps.alternate.memoizedState.cachePool && (__type = newProps.alternate.memoizedState.cachePool.pool), nextResource = undefined, undefined !== newProps.memoizedState && undefined !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== __type && (newProps.flags |= 2048));
        renderLanes !== current && renderLanes && (workInProgress.child.flags |= 8192);
        scheduleRetryEffect(workInProgress, workInProgress.updateQueue);
        bubbleProperties(workInProgress);
        return undefined;
      case 4:
        return popHostContainer(), updateHostContainer(current, workInProgress), undefined === current && preparePortalMount(workInProgress.stateNode.containerInfo), bubbleProperties(workInProgress), undefined;
      case 10:
        return popProvider(workInProgress.type), bubbleProperties(workInProgress), undefined;
      case 19:
        pop(suspenseStackCursor);
        newProps = workInProgress.memoizedState;
        if (undefined === newProps) return bubbleProperties(workInProgress), undefined;
        __type = 0 !== (workInProgress.flags & 128);
        nextResource = newProps.rendering;
        if (undefined === nextResource) {
          if (__type) cutOffTailIfNeeded(newProps, !1);else {
            if (0 !== workInProgressRootExitStatus || undefined !== current && 0 !== (current.flags & 128)) for (current = workInProgress.child; undefined !== current;) {
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
                push(suspenseStackCursor, suspenseStackCursor.current & 1 | 2);
                isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount);
                return workInProgress.child;
              }
              current = current.sibling;
            }
            undefined !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress.flags |= 128, __type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
          }
        } else {
          if (!__type) if (current = findFirstSuspended(nextResource), undefined !== current) {
            if (workInProgress.flags |= 128, __type = !0, current = current.updateQueue, workInProgress.updateQueue = current, scheduleRetryEffect(workInProgress, current), cutOffTailIfNeeded(newProps, !0), undefined === newProps.tail && "hidden" === newProps.tailMode && !nextResource.alternate && !isHydrating) return bubbleProperties(workInProgress), undefined;
          } else 2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes && (workInProgress.flags |= 128, __type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
          newProps.isBackwards ? (nextResource.sibling = workInProgress.child, workInProgress.child = nextResource) : (current = newProps.last, undefined !== current ? current.sibling = nextResource : workInProgress.child = nextResource, newProps.last = nextResource);
        }
        if (undefined !== newProps.tail) return current = newProps.tail, newProps.rendering = current, newProps.tail = current.sibling, newProps.renderingStartTime = now(), current.sibling = undefined, renderLanes = suspenseStackCursor.current, push(suspenseStackCursor, __type ? renderLanes & 1 | 2 : renderLanes & 1), isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount), current;
        bubbleProperties(workInProgress);
        return undefined;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress), popHiddenContext(), newProps = undefined !== workInProgress.memoizedState, undefined !== current ? undefined !== current.memoizedState !== newProps && (workInProgress.flags |= 8192) : newProps && (workInProgress.flags |= 8192), newProps ? 0 !== (renderLanes & 536870912) && 0 === (workInProgress.flags & 128) && (bubbleProperties(workInProgress), workInProgress.subtreeFlags & 6 && (workInProgress.flags |= 8192)) : bubbleProperties(workInProgress), renderLanes = workInProgress.updateQueue, undefined !== renderLanes && scheduleRetryEffect(workInProgress, renderLanes.retryQueue), renderLanes = undefined, undefined !== current && undefined !== current.memoizedState && undefined !== current.memoizedState.cachePool && (renderLanes = current.memoizedState.cachePool.pool), newProps = undefined, undefined !== workInProgress.memoizedState && undefined !== workInProgress.memoizedState.cachePool && (newProps = workInProgress.memoizedState.cachePool.pool), newProps !== renderLanes && (workInProgress.flags |= 2048), undefined !== current && pop(resumedCache), undefined;
      case 24:
        return renderLanes = undefined, undefined !== current && (renderLanes = current.memoizedState.cache), workInProgress.memoizedState.cache !== renderLanes && (workInProgress.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress), undefined;
      case 25:
        return undefined;
      case 30:
        return undefined;
    }
    throw Error(formatProdErrorMessage(156, workInProgress.tag));
  }
  function unwindWork(current, workInProgress) {
    popTreeContext(workInProgress);
    switch (workInProgress.tag) {
      case 1:
        return current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : undefined;
      case 3:
        return popProvider(CacheContext), popHostContainer(), current = workInProgress.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress.flags = current & -65537 | 128, workInProgress) : undefined;
      case 26:
      case 27:
      case 5:
        return popHostContext(workInProgress), undefined;
      case 31:
        if (undefined !== workInProgress.memoizedState) {
          popSuspenseHandler(workInProgress);
          if (undefined === workInProgress.alternate) throw Error(formatProdErrorMessage(340));
          resetHydrationState();
        }
        current = workInProgress.flags;
        return current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : undefined;
      case 13:
        popSuspenseHandler(workInProgress);
        current = workInProgress.memoizedState;
        if (undefined !== current && undefined !== current.dehydrated) {
          if (undefined === workInProgress.alternate) throw Error(formatProdErrorMessage(340));
          resetHydrationState();
        }
        current = workInProgress.flags;
        return current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : undefined;
      case 19:
        return pop(suspenseStackCursor), undefined;
      case 4:
        return popHostContainer(), undefined;
      case 10:
        return popProvider(workInProgress.type), undefined;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress), popHiddenContext(), undefined !== current && pop(resumedCache), current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : undefined;
      case 24:
        return popProvider(CacheContext), undefined;
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
        popProvider(CacheContext);
        popHostContainer();
        break;
      case 26:
      case 27:
      case 5:
        popHostContext(interruptedWork);
        break;
      case 4:
        popHostContainer();
        break;
      case 31:
        undefined !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
        break;
      case 13:
        popSuspenseHandler(interruptedWork);
        break;
      case 19:
        pop(suspenseStackCursor);
        break;
      case 10:
        popProvider(interruptedWork.type);
        break;
      case 22:
      case 23:
        popSuspenseHandler(interruptedWork);
        popHiddenContext();
        undefined !== current && pop(resumedCache);
        break;
      case 24:
        popProvider(CacheContext);
    }
  }
  function commitHookEffectListMount(flags, finishedWork) {
    let updateQueue, lastEffect, firstEffect, create, inst;
    try {
      updateQueue = finishedWork.updateQueue;
      lastEffect = undefined !== updateQueue ? updateQueue.lastEffect : undefined;
      if (undefined !== lastEffect) {
        firstEffect = lastEffect.next;
        updateQueue = firstEffect;
        do {
          if ((updateQueue.tag & flags) === flags) {
            lastEffect = void 0;
            create = updateQueue.create;
            inst = updateQueue.inst;
            lastEffect = create();
            inst.destroy = lastEffect;
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor_jscomp_0) {
    let updateQueue, lastEffect, firstEffect, inst, destroy, nearestMountedAncestor, destroy_;
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
            if (void 0 !== destroy) {
              inst.destroy = void 0;
              lastEffect = finishedWork;
              nearestMountedAncestor = nearestMountedAncestor_jscomp_0;
              destroy_ = destroy;
              try {
                destroy_();
              } catch (__error) {
                captureCommitPhaseError(lastEffect, nearestMountedAncestor, __error);
              }
            }
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function commitClassCallbacks(finishedWork) {
    let updateQueue, instance;
    updateQueue = finishedWork.updateQueue;
    if (undefined !== updateQueue) {
      instance = finishedWork.stateNode;
      try {
        commitCallbacks(updateQueue, instance);
      } catch (__error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }
  }
  function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
    instance.props = resolveClassComponentProps(current.type, current.memoizedProps);
    instance.state = current.memoizedState;
    try {
      instance.componentWillUnmount();
    } catch (__error) {
      captureCommitPhaseError(current, nearestMountedAncestor, __error);
    }
  }
  function safelyAttachRef(current, nearestMountedAncestor) {
    let ref, instanceToUse;
    try {
      ref = current.ref;
      if (undefined !== ref) {
        switch (current.tag) {
          case 26:
          case 27:
          case 5:
            instanceToUse = getPublicInstance(current.stateNode);
            break;
          case 30:
            instanceToUse = current.stateNode;
            break;
          default:
            instanceToUse = current.stateNode;
        }
        "function" === typeOfJS(ref) ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
      }
    } catch (__error) {
      captureCommitPhaseError(current, nearestMountedAncestor, __error);
    }
  }
  function safelyDetachRef(current, nearestMountedAncestor) {
    let ref, refCleanup;
    ref = current.ref;
    refCleanup = current.refCleanup;
    if (undefined !== ref) if ("function" === typeOfJS(refCleanup)) try {
      refCleanup();
    } catch (__error) {
      captureCommitPhaseError(current, nearestMountedAncestor, __error);
    } finally {
      current.refCleanup = undefined, current = current.alternate, current !== undefined && (current.refCleanup = undefined);
    } else if ("function" === typeOfJS(ref)) try {
      ref(undefined);
    } catch (error_124) {
      captureCommitPhaseError(current, nearestMountedAncestor, error_124);
    } else ref.current = undefined;
  }
  function commitHostMount(finishedWork) {
    let __type, props, instance;
    __type = finishedWork.type;
    props = finishedWork.memoizedProps;
    instance = finishedWork.stateNode;
    try {
      commitMount(instance, __type, props, finishedWork);
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function commitHostUpdate(finishedWork, newProps, oldProps) {
    try {
      commitUpdate(finishedWork.stateNode, finishedWork.type, oldProps, newProps, finishedWork);
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
  function commitHostPortalContainerChildren(portal, finishedWork, pendingChildren) {
    portal = portal.containerInfo;
    try {
      replaceContainerChildren(portal, pendingChildren);
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function commitHostSingletonAcquisition(finishedWork) {
    let singleton, props;
    singleton = finishedWork.stateNode;
    props = finishedWork.memoizedProps;
    try {
      acquireSingletonInstance(finishedWork.type, props, singleton, finishedWork);
    } catch (__error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, __error);
    }
  }
  function commitBeforeMutationEffects(root, firstChild) {
    let current, ii, _eventPayloads_ii, instance, resolvedPrevProps;
    prepareForCommit(root.containerInfo);
    for (nextEffect = firstChild; undefined !== nextEffect;) if (root = nextEffect, firstChild = root.child, 0 !== (root.subtreeFlags & 1028) && undefined !== firstChild) firstChild.return = root, nextEffect = firstChild;else for (; undefined !== nextEffect;) {
      root = nextEffect;
      current = root.alternate;
      firstChild = root.flags;
      switch (root.tag) {
        case 0:
          if (0 !== (firstChild & 4) && (firstChild = root.updateQueue, firstChild = undefined !== firstChild ? firstChild.events : undefined, undefined !== firstChild)) for (ii = 0; ii < __len(firstChild); ii++) {
            _eventPayloads_ii = firstChild[ii];
            _eventPayloads_ii.ref.impl = _eventPayloads_ii.nextImpl;
          }
          break;
        case 11:
        case 15:
          break;
        case 1:
          if (0 !== (firstChild & 1024) && undefined !== current) {
            firstChild = void 0;
            ii = root;
            _eventPayloads_ii = current.memoizedProps;
            current = current.memoizedState;
            instance = ii.stateNode;
            try {
              resolvedPrevProps = resolveClassComponentProps(ii.type, _eventPayloads_ii);
              firstChild = instance.getSnapshotBeforeUpdate(resolvedPrevProps, current);
              instance.__reactInternalSnapshotBeforeUpdate = firstChild;
            } catch (__error) {
              captureCommitPhaseError(ii, ii.return, __error);
            }
          }
          break;
        case 3:
          0 !== (firstChild & 1024) && supportsMutation && clearContainer(root.stateNode.containerInfo);
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        default:
          if (0 !== (firstChild & 1024)) throw Error(formatProdErrorMessage(163));
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
    let flags, prevProps, prevOffscreenSubtreeWasHidden;
    flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitHookEffectListMount(5, finishedWork);
        break;
      case 1:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 4) if (finishedRoot = finishedWork.stateNode, undefined === current) try {
          finishedRoot.componentDidMount();
        } catch (__error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, __error);
        } else {
          prevProps = resolveClassComponentProps(finishedWork.type, current.memoizedProps);
          current = current.memoizedState;
          try {
            finishedRoot.componentDidUpdate(prevProps, current, finishedRoot.__reactInternalSnapshotBeforeUpdate);
          } catch (error_123) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error_123);
          }
        }
        flags & 64 && commitClassCallbacks(finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 3:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 64 && (flags = finishedWork.updateQueue, undefined !== flags)) {
          finishedRoot = undefined;
          if (undefined !== finishedWork.child) switch (finishedWork.child.tag) {
            case 27:
            case 5:
              finishedRoot = getPublicInstance(finishedWork.child.stateNode);
              break;
            case 1:
              finishedRoot = finishedWork.child.stateNode;
          }
          try {
            commitCallbacks(flags, finishedRoot);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
        }
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
            commitHydratedInstance(prevProps, finishedRoot, current, finishedWork);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
        }
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 12:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        break;
      case 31:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
        break;
      case 13:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        flags & 64 && (flags = finishedWork.memoizedState, undefined !== flags && (flags = flags.dehydrated, undefined !== flags && (finishedWork = __partial((..._bindArgs0) => __applyFn(retryDehydratedSuspenseBoundary, ..._bindArgs0), undefined, finishedWork), registerSuspenseInstanceRetry(flags, finishedWork))));
        break;
      case 22:
        flags = undefined !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
        if (!flags) {
          current = undefined !== current && undefined !== current.memoizedState || offscreenSubtreeWasHidden;
          prevProps = offscreenSubtreeIsHidden;
          prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = flags;
          (offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, 0 !== (finishedWork.subtreeFlags & 8772)) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          offscreenSubtreeIsHidden = prevProps;
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
        }
        break;
      case 30:
        break;
      default:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
    }
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
    let prevHostParent, prevHostParentIsContainer;
    if (injectedHook && "function" === typeOfJS(injectedHook.onCommitFiberUnmount)) try {
      injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
    } catch (err) {}
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
          releaseSingletonInstance(deletedFiber.stateNode);
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          break;
        }
      case 5:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
      case 6:
        if (supportsMutation) {
          if (prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer, hostParent = undefined, recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber), hostParent = prevHostParent, hostParentIsContainer = prevHostParentIsContainer, undefined !== hostParent) if (hostParentIsContainer) try {
            removeChildFromContainer(hostParent, deletedFiber.stateNode);
          } catch (__error) {
            captureCommitPhaseError(deletedFiber, nearestMountedAncestor, __error);
          } else try {
            removeChild(hostParent, deletedFiber.stateNode);
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
        commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
        offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
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
  }
  function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
    if (supportsHydration && undefined === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, undefined !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, undefined !== finishedRoot))) {
      finishedRoot = finishedRoot.dehydrated;
      try {
        commitHydratedActivityInstance(finishedRoot);
      } catch (__error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }
  }
  function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
    if (supportsHydration && undefined === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, undefined !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, undefined !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, undefined !== finishedRoot)))) try {
      commitHydratedSuspenseInstance(finishedRoot);
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
        throw Error(formatProdErrorMessage(435, finishedWork.tag));
    }
  }
  function attachSuspenseRetryListeners(finishedWork, wakeables) {
    let retryCache;
    retryCache = getRetryCache(finishedWork);
    __forEach(wakeables, function (wakeable) {
      let retry;
      if (!retryCache.has(wakeable)) {
        retryCache.add(wakeable);
        retry = __partial((..._bindArgs1) => __applyFn(resolveRetryWakeable, ..._bindArgs1), undefined, finishedWork, wakeable);
        wakeable.then(retry, retry);
      }
    });
  }
  function recursivelyTraverseMutationEffects(root_jscomp_0, parentFiber) {
    let deletions, i, childToDelete, root, returnFiber, parent;
    deletions = parentFiber.deletions;
    if (undefined !== deletions) for (i = 0; i < __len(deletions); i++) {
      childToDelete = deletions[i];
      root = root_jscomp_0;
      returnFiber = parentFiber;
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
                if (__lb_9 || __lc_9) {
                  break;
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
        if (undefined === hostParent) throw Error(formatProdErrorMessage(160));
        commitDeletionEffectsOnFiber(root, returnFiber, childToDelete);
        hostParent = undefined;
        hostParentIsContainer = !1;
      } else commitDeletionEffectsOnFiber(root, returnFiber, childToDelete);
      root = childToDelete.alternate;
      undefined !== root && (root.return = undefined);
      childToDelete.return = undefined;
    }
    if (parentFiber.subtreeFlags & 13886) for (parentFiber = parentFiber.child; undefined !== parentFiber;) commitMutationEffectsOnFiber(parentFiber, root_jscomp_0), parentFiber = parentFiber.sibling;
  }
  function commitMutationEffectsOnFiber(finishedWork, root) {
    let current, flags, hoistableRoot, newResource, wasHidden, prevOffscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden, instance, instance_jscomp_0;
    current = finishedWork.alternate;
    flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
        break;
      case 1:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || undefined === current || safelyDetachRef(current, current.return));
        flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, undefined !== finishedWork && (flags = finishedWork.callbacks, undefined !== flags && (current = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = undefined === current ? flags : __concat(current, flags))));
        break;
      case 26:
        if (supportsResources) {
          hoistableRoot = currentHoistableRoot;
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || undefined === current || safelyDetachRef(current, current.return));
          if (flags & 4) {
            flags = undefined !== current ? current.memoizedState : undefined;
            newResource = finishedWork.memoizedState;
            undefined === current ? undefined === newResource ? undefined === finishedWork.stateNode ? finishedWork.stateNode = hydrateHoistable(hoistableRoot, finishedWork.type, finishedWork.memoizedProps, finishedWork) : mountHoistable(hoistableRoot, finishedWork.type, finishedWork.stateNode) : finishedWork.stateNode = acquireResource(hoistableRoot, newResource, finishedWork.memoizedProps) : flags !== newResource ? (undefined === flags ? undefined !== current.stateNode && unmountHoistable(current.stateNode) : releaseResource(flags), undefined === newResource ? mountHoistable(hoistableRoot, finishedWork.type, finishedWork.stateNode) : acquireResource(hoistableRoot, newResource, finishedWork.memoizedProps)) : undefined === newResource && undefined !== finishedWork.stateNode && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
          }
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
            hoistableRoot = finishedWork.stateNode;
            try {
              resetTextContent(hoistableRoot);
            } catch (__error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
          }
          flags & 4 && finishedWork.stateNode !== undefined && (hoistableRoot = finishedWork.memoizedProps, commitHostUpdate(finishedWork, hoistableRoot, undefined !== current ? current.memoizedProps : hoistableRoot));
          flags & 1024 && (needsFormReset = !0);
        } else supportsPersistence && undefined !== finishedWork.alternate && (finishedWork.alternate.stateNode = finishedWork.stateNode);
        break;
      case 6:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        if (flags & 4 && supportsMutation) {
          if (undefined === finishedWork.stateNode) throw Error(formatProdErrorMessage(162));
          flags = finishedWork.memoizedProps;
          current = undefined !== current ? current.memoizedProps : flags;
          hoistableRoot = finishedWork.stateNode;
          try {
            commitTextUpdate(hoistableRoot, current, flags);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
        }
        break;
      case 3:
        supportsResources ? (prepareToCommitHoistables(), hoistableRoot = currentHoistableRoot, currentHoistableRoot = getHoistableRoot(root.containerInfo), recursivelyTraverseMutationEffects(root, finishedWork), currentHoistableRoot = hoistableRoot) : recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        if (flags & 4) {
          if (supportsMutation && supportsHydration && undefined !== current && current.memoizedState.isDehydrated) try {
            commitHydratedContainer(root.containerInfo);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
          if (supportsPersistence) {
            flags = root.containerInfo;
            current = root.pendingChildren;
            try {
              replaceContainerChildren(flags, current);
            } catch (__error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
          }
        }
        needsFormReset && (needsFormReset = !1, recursivelyResetForms(finishedWork));
        break;
      case 4:
        supportsResources ? (current = currentHoistableRoot, currentHoistableRoot = getHoistableRoot(finishedWork.stateNode.containerInfo), recursivelyTraverseMutationEffects(root, finishedWork), commitReconciliationEffects(finishedWork), currentHoistableRoot = current) : (recursivelyTraverseMutationEffects(root, finishedWork), commitReconciliationEffects(finishedWork));
        flags & 4 && supportsPersistence && commitHostPortalContainerChildren(finishedWork.stateNode, finishedWork, finishedWork.stateNode.pendingChildren);
        break;
      case 12:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        break;
      case 31:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (flags = finishedWork.updateQueue, undefined !== flags && (finishedWork.updateQueue = undefined, attachSuspenseRetryListeners(finishedWork, flags)));
        break;
      case 13:
        recursivelyTraverseMutationEffects(root, finishedWork);
        commitReconciliationEffects(finishedWork);
        finishedWork.child.flags & 8192 && undefined !== finishedWork.memoizedState !== (undefined !== current && undefined !== current.memoizedState) && (globalMostRecentFallbackTime = now());
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
        commitReconciliationEffects(finishedWork);
        if (flags & 8192 && (root = finishedWork.stateNode, root._visibility = hoistableRoot ? root._visibility & -2 : root._visibility | 1, hoistableRoot && (undefined === current || wasHidden || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || recursivelyTraverseDisappearLayoutEffects(finishedWork)), supportsMutation)) {
          let __lb_8 = false,
            __lc_8 = false;
          while (!__lb_8) {
            if (current = undefined, supportsMutation) for (root = finishedWork;;) {
              if (5 === root.tag || supportsResources && 26 === root.tag) {
                if (undefined === current) {
                  wasHidden = current = root;
                  try {
                    newResource = wasHidden.stateNode, hoistableRoot ? hideInstance(newResource) : unhideInstance(wasHidden.stateNode, wasHidden.memoizedProps);
                  } catch (__error) {
                    captureCommitPhaseError(wasHidden, wasHidden.return, __error);
                  }
                }
              } else if (6 === root.tag) {
                if (undefined === current) {
                  wasHidden = root;
                  try {
                    instance = wasHidden.stateNode;
                    hoistableRoot ? hideTextInstance(instance) : unhideTextInstance(instance, wasHidden.memoizedProps);
                  } catch (__error) {
                    captureCommitPhaseError(wasHidden, wasHidden.return, __error);
                  }
                }
              } else if (18 === root.tag) {
                if (undefined === current) {
                  wasHidden = root;
                  try {
                    instance_jscomp_0 = wasHidden.stateNode;
                    hoistableRoot ? hideDehydratedBoundary(instance_jscomp_0) : unhideDehydratedBoundary(wasHidden.stateNode);
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
  }
  function commitReconciliationEffects(finishedWork) {
    let flags, hostParentFiber, parentFiber, parent, before, parent_125, before_126, parent_127, before_128;
    flags = finishedWork.flags;
    if (flags & 2) {
      try {
        for (parentFiber = finishedWork.return; undefined !== parentFiber;) {
          if (isHostParent(parentFiber)) {
            hostParentFiber = parentFiber;
            break;
          }
          parentFiber = parentFiber.return;
        }
        if (supportsMutation) {
          if (hostParentFiber === undefined) throw Error(formatProdErrorMessage(160));
          switch (hostParentFiber.tag) {
            case 27:
              if (supportsSingletons) {
                parent = hostParentFiber.stateNode;
                before = getHostSibling(finishedWork);
                insertOrAppendPlacementNode(finishedWork, before, parent);
                break;
              }
            case 5:
              parent_125 = hostParentFiber.stateNode;
              hostParentFiber.flags & 32 && (resetTextContent(parent_125), hostParentFiber.flags &= -33);
              before_126 = getHostSibling(finishedWork);
              insertOrAppendPlacementNode(finishedWork, before_126, parent_125);
              break;
            case 3:
            case 4:
              parent_127 = hostParentFiber.stateNode.containerInfo;
              before_128 = getHostSibling(finishedWork);
              insertOrAppendPlacementNodeIntoContainer(finishedWork, before_128, parent_127);
              break;
            default:
              throw Error(formatProdErrorMessage(161));
          }
        }
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
  function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
    let finishedWork, instance;
    for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
      finishedWork = parentFiber;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 1:
          safelyDetachRef(finishedWork, finishedWork.return);
          instance = finishedWork.stateNode;
          "function" === typeOfJS(instance.componentWillUnmount) && safelyCallComponentWillUnmount(finishedWork, finishedWork.return, instance);
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 27:
          supportsSingletons && releaseSingletonInstance(finishedWork.stateNode);
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
      parentFiber = parentFiber.sibling;
    }
  }
  function recursivelyTraverseReappearLayoutEffects(finishedRoot_jscomp_0, parentFiber, includeWorkInProgressEffects) {
    let current, finishedRoot, finishedWork, flags, instance, hiddenCallbacks;
    includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
    for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
      current = parentFiber.alternate;
      finishedRoot = finishedRoot_jscomp_0;
      finishedWork = parentFiber;
      flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
          commitHookEffectListMount(4, finishedWork);
          break;
        case 1:
          recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
          current = finishedWork;
          finishedRoot = current.stateNode;
          if ("function" === typeOfJS(finishedRoot.componentDidMount)) try {
            finishedRoot.componentDidMount();
          } catch (__error) {
            captureCommitPhaseError(current, current.return, __error);
          }
          current = finishedWork;
          finishedRoot = current.updateQueue;
          if (undefined !== finishedRoot) {
            instance = current.stateNode;
            try {
              hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
              if (undefined !== hiddenCallbacks) for (finishedRoot.shared.hiddenCallbacks = undefined, finishedRoot = 0; finishedRoot < __len(hiddenCallbacks); finishedRoot++) callCallback(hiddenCallbacks[finishedRoot], instance);
            } catch (__error) {
              captureCommitPhaseError(current, current.return, __error);
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
          recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
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
      parentFiber = parentFiber.sibling;
    }
  }
  function commitOffscreenPassiveMountEffects(current, finishedWork) {
    let previousCache;
    previousCache = undefined;
    undefined !== current && undefined !== current.memoizedState && undefined !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
    current = undefined;
    undefined !== finishedWork.memoizedState && undefined !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
    current !== previousCache && (current !== undefined && current.refCount++, previousCache !== undefined && releaseCache(previousCache));
  }
  function commitCachePassiveMountEffect(current, finishedWork) {
    current = undefined;
    undefined !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
    finishedWork = finishedWork.memoizedState.cache;
    finishedWork !== current && (finishedWork.refCount++, current !== undefined && releaseCache(current));
  }
  function recursivelyTraversePassiveMountEffects(root, parentFiber, committedLanes, committedTransitions) {
    if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; undefined !== parentFiber;) commitPassiveMountOnFiber(root, parentFiber, committedLanes, committedTransitions), parentFiber = parentFiber.sibling;
  }
  function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
    let flags, _finishedWork_memoize2, id, onPostCommit;
    flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
        flags & 2048 && commitHookEffectListMount(9, finishedWork);
        break;
      case 1:
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
        break;
      case 3:
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
        flags & 2048 && (finishedRoot = undefined, undefined !== finishedWork.alternate && (finishedRoot = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== finishedRoot && (finishedWork.refCount++, finishedRoot !== undefined && releaseCache(finishedRoot)));
        break;
      case 12:
        if (flags & 2048) {
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          finishedRoot = finishedWork.stateNode;
          try {
            _finishedWork_memoize2 = finishedWork.memoizedProps;
            id = _finishedWork_memoize2.id;
            onPostCommit = _finishedWork_memoize2.onPostCommit;
            "function" === typeOfJS(onPostCommit) && onPostCommit(id, undefined === finishedWork.alternate ? "mount" : "update", finishedRoot.passiveEffectDuration, -0);
          } catch (__error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, __error);
          }
        } else recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
        break;
      case 31:
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
        break;
      case 13:
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
        break;
      case 23:
        break;
      case 22:
        _finishedWork_memoize2 = finishedWork.stateNode;
        id = finishedWork.alternate;
        undefined !== finishedWork.memoizedState ? _finishedWork_memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : _finishedWork_memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : (_finishedWork_memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, 0 !== (finishedWork.subtreeFlags & 10256) || !1));
        flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
        break;
      case 24:
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
        flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
        break;
      default:
        recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
    }
  }
  function recursivelyTraverseReconnectPassiveEffects(finishedRoot_jscomp_0, parentFiber, committedLanes_jscomp_0, committedTransitions_jscomp_0, includeWorkInProgressEffects) {
    let finishedRoot, finishedWork, committedLanes, committedTransitions, flags, instance;
    includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || !1);
    for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
      finishedRoot = finishedRoot_jscomp_0;
      finishedWork = parentFiber;
      committedLanes = committedLanes_jscomp_0;
      committedTransitions = committedTransitions_jscomp_0;
      flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
          commitHookEffectListMount(8, finishedWork);
          break;
        case 23:
          break;
        case 22:
          instance = finishedWork.stateNode;
          undefined !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects));
          includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
          break;
        case 24:
          recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
          includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function recursivelyTraverseAtomicPassiveEffects(finishedRoot_jscomp_0, parentFiber) {
    let finishedRoot, finishedWork, flags;
    if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
      finishedRoot = finishedRoot_jscomp_0;
      finishedWork = parentFiber;
      flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 22:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
          flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
          break;
        case 24:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
          flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
      }
      parentFiber = parentFiber.sibling;
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
    let deletions, i, childToDelete;
    deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (undefined !== deletions) for (i = 0; i < __len(deletions); i++) {
        childToDelete = deletions[i];
        nextEffect = childToDelete;
        commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
      }
      detachAlternateSiblings(parentFiber);
    }
    if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; undefined !== parentFiber;) commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
  }
  function commitPassiveUnmountOnFiber(finishedWork) {
    let instance;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
        break;
      case 3:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      case 12:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      case 22:
        instance = finishedWork.stateNode;
        undefined !== finishedWork.memoizedState && instance._visibility & 2 && (undefined === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      default:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
    }
  }
  function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
    let deletions, i, childToDelete;
    deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (undefined !== deletions) for (i = 0; i < __len(deletions); i++) {
        childToDelete = deletions[i];
        nextEffect = childToDelete;
        commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
      }
      detachAlternateSiblings(parentFiber);
    }
    for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
      deletions = parentFiber;
      switch (deletions.tag) {
        case 0:
        case 11:
        case 15:
          commitHookEffectListUnmount(8, deletions, deletions.return);
          recursivelyTraverseDisconnectPassiveEffects(deletions);
          break;
        case 22:
          i = deletions.stateNode;
          i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
          break;
        default:
          recursivelyTraverseDisconnectPassiveEffects(deletions);
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
    let fiber, cache, sibling, returnFiber;
    for (; undefined !== nextEffect;) {
      fiber = nextEffect;
      switch (fiber.tag) {
        case 0:
        case 11:
        case 15:
          commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
          break;
        case 23:
        case 22:
          if (undefined !== fiber.memoizedState && undefined !== fiber.memoizedState.cachePool) {
            cache = fiber.memoizedState.cachePool.pool;
            cache !== undefined && cache.refCount++;
          }
          break;
        case 24:
          releaseCache(fiber.memoizedState.cache);
      }
      cache = fiber.child;
      if (undefined !== cache) cache.return = fiber, nextEffect = cache;else {
        fiber = deletedSubtreeRoot;
        let __lb_7 = false,
          __lc_7 = false;
        while (!__lb_7) {
          __lc_7 = false;
          while (undefined !== nextEffect) {
            {
              cache = nextEffect;
              sibling = cache.sibling;
              returnFiber = cache.return;
              detachFiberAfterEffects(cache);
              if (cache === fiber) {
                nextEffect = undefined;
                {
                  __lb_7 = true;
                  break;
                }
              }
              if (undefined !== sibling) {
                sibling.return = returnFiber;
                nextEffect = sibling;
                {
                  __lb_7 = true;
                  break;
                }
              }
              nextEffect = returnFiber;
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
      if ("string" !== typeOfJS(maybeFiber.memoizedProps["data-testname"])) throw Error(formatProdErrorMessage(364));
      return maybeFiber;
    }
    hostRoot = findFiberRoot(hostRoot);
    if (undefined === hostRoot) throw Error(formatProdErrorMessage(362));
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
        throw Error(formatProdErrorMessage(365));
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
        throw Error(formatProdErrorMessage(365));
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
    if (!supportsTestSelectors) throw Error(formatProdErrorMessage(363));
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
  function requestUpdateLane() {
    return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : undefined !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
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
    if (root === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || undefined !== root.cancelPendingCommit) prepareFreshStack(root, 0), markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, !1);
    markRootUpdated_1(root, lane);
    if (0 === (executionContext & 2) || root !== workInProgressRoot) root === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, !1)), ensureRootIsScheduled(root);
  }
  function performWorkOnRoot(root_jscomp_0, lanes, forceSync) {
    let shouldTimeSlice, exitStatus, renderWasConcurrent, JSCompiler_inline_result, root, wasRootDehydrated;
    if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
    shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root_jscomp_0.expiredLanes) || checkIfRootIsPrerendering(root_jscomp_0, lanes);
    exitStatus = shouldTimeSlice ? renderRootConcurrent(root_jscomp_0, lanes) : renderRootSync(root_jscomp_0, lanes, !0);
    renderWasConcurrent = shouldTimeSlice;
    do {
      if (0 === exitStatus) {
        workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root_jscomp_0, lanes, 0, !1);
        break;
      } else {
        forceSync = root_jscomp_0.current.alternate;
        if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
          exitStatus = renderRootSync(root_jscomp_0, lanes, !1);
          renderWasConcurrent = !1;
          continue;
        }
        if (2 === exitStatus) {
          renderWasConcurrent = lanes;
          if (root_jscomp_0.errorRecoveryDisabledLanes & renderWasConcurrent) {
            JSCompiler_inline_result = 0;
          } else JSCompiler_inline_result = root_jscomp_0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
          if (0 !== JSCompiler_inline_result) {
            lanes = JSCompiler_inline_result;
            {
              let __lb_5 = false,
                __lc_5 = false;
              while (!__lb_5) {
                {
                  root = root_jscomp_0;
                  exitStatus = workInProgressRootConcurrentErrors;
                  wasRootDehydrated = supportsHydration && root.current.memoizedState.isDehydrated;
                  wasRootDehydrated && (prepareFreshStack(root, JSCompiler_inline_result).flags |= 256);
                  JSCompiler_inline_result = renderRootSync(root, JSCompiler_inline_result, !1);
                  if (2 !== JSCompiler_inline_result) {
                    if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                      root.errorRecoveryDisabledLanes |= renderWasConcurrent;
                      workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                      exitStatus = 4;
                      {
                        __lb_5 = true;
                        break;
                      }
                    }
                    renderWasConcurrent = workInProgressRootRecoverableErrors;
                    workInProgressRootRecoverableErrors = exitStatus;
                    undefined !== renderWasConcurrent && (undefined === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : __applyFn(workInProgressRootRecoverableErrors.push, workInProgressRootRecoverableErrors, renderWasConcurrent));
                  }
                  exitStatus = JSCompiler_inline_result;
                }
                break;
              }
            }
            renderWasConcurrent = !1;
            if (2 !== exitStatus) continue;
          }
        }
        if (1 === exitStatus) {
          prepareFreshStack(root_jscomp_0, 0);
          markRootSuspended(root_jscomp_0, lanes, 0, !0);
          break;
        }
        {
          let __lb_4 = false,
            __lc_4 = false;
          while (!__lb_4) {
            {
              shouldTimeSlice = root_jscomp_0;
              renderWasConcurrent = exitStatus;
              switch (renderWasConcurrent) {
                case 0:
                case 1:
                  throw Error(formatProdErrorMessage(345));
                case 4:
                  if ((lanes & 4194048) !== lanes) break;
                case 6:
                  markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
                  {
                    __lb_4 = true;
                    break;
                  }
                case 2:
                  workInProgressRootRecoverableErrors = undefined;
                  break;
                case 3:
                case 5:
                  break;
                default:
                  throw Error(formatProdErrorMessage(329));
              }
              if (__lb_4 || __lc_4) {
                break;
              }
              if ((lanes & 62914560) === lanes && (exitStatus = __cat(globalMostRecentFallbackTime, 300) - now(), 10 < exitStatus)) {
                markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
                if (0 !== getNextLanes(shouldTimeSlice, 0, !0)) {
                  __lb_4 = true;
                  break;
                }
                pendingEffectsLanes = lanes;
                shouldTimeSlice.timeoutHandle = scheduleTimeout(__partial((..._bindArgs10) => __applyFn(commitRootWhenReady, ..._bindArgs10), undefined, shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, "Throttled", -0, 0), exitStatus);
                {
                  __lb_4 = true;
                  break;
                }
              }
              commitRootWhenReady(shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, undefined, -0, 0);
            }
            break;
          }
        }
      }
      break;
    } while (1);
    ensureRootIsScheduled(root_jscomp_0);
  }
  function commitRootWhenReady(root, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
    let timeoutOffset;
    root.timeoutHandle = noTimeout;
    suspendedCommitReason = finishedWork.subtreeFlags;
    if (suspendedCommitReason & 8192 || 16785408 === (suspendedCommitReason & 16785408)) {
      suspendedCommitReason = startSuspendingCommit();
      accumulateSuspenseyCommitOnFiber(finishedWork, lanes, suspendedCommitReason);
      timeoutOffset = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0;
      timeoutOffset = waitForCommitToBeReady(suspendedCommitReason, timeoutOffset);
      if (undefined !== timeoutOffset) {
        pendingEffectsLanes = lanes;
        root.cancelPendingCommit = timeoutOffset(__partial((..._bindArgs11) => __applyFn(commitRoot, ..._bindArgs11), undefined, root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, exitStatus, suspendedCommitReason, undefined, completedRenderStartTime, completedRenderEndTime));
        markRootSuspended(root, lanes, spawnedLane, !didSkipSuspendedSiblings);
        return;
      }
    }
    commitRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes);
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
    let lanes, index_4, lane;
    suspendedLanes &= ~workInProgressRootPingedLanes;
    suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
    root.suspendedLanes |= suspendedLanes;
    root.pingedLanes &= ~suspendedLanes;
    didAttemptEntireTree && (root.warmLanes |= suspendedLanes);
    didAttemptEntireTree = root.expirationTimes;
    for (lanes = suspendedLanes; 0 < lanes;) {
      index_4 = 31 - clz32(lanes);
      lane = 1 << index_4;
      didAttemptEntireTree[index_4] = -1;
      lanes &= ~lane;
    }
    0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, suspendedLanes);
  }
  function flushSyncWork() {
    return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0, !1), !1) : !0;
  }
  function resetWorkInProgressStack() {
    let interruptedWork;
    if (undefined !== workInProgress) {
      if (0 === workInProgressSuspendedReason) {
        interruptedWork = workInProgress.return;
      } else interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber_1 = undefined, resetHooksOnUnwind(interruptedWork), thenableState_1 = undefined, thenableIndexCounter_1 = 0, interruptedWork = workInProgress;
      for (; undefined !== interruptedWork;) unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
      workInProgress = undefined;
    }
  }
  function prepareFreshStack(root, lanes) {
    let timeoutHandle, allEntangledLanes, index_2, lane;
    timeoutHandle = root.timeoutHandle;
    timeoutHandle !== noTimeout && (root.timeoutHandle = noTimeout, cancelTimeout(timeoutHandle));
    timeoutHandle = root.cancelPendingCommit;
    undefined !== timeoutHandle && (root.cancelPendingCommit = undefined, timeoutHandle());
    pendingEffectsLanes = 0;
    resetWorkInProgressStack();
    workInProgressRoot = root;
    workInProgress = timeoutHandle = createWorkInProgress(root.current, undefined);
    workInProgressRootRenderLanes = lanes;
    workInProgressSuspendedReason = 0;
    workInProgressThrownValue = undefined;
    workInProgressRootDidSkipSuspendedSiblings = !1;
    workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
    workInProgressRootDidAttachPingListener = !1;
    workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
    workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = undefined;
    workInProgressRootDidIncludeRecursiveRenderUpdate = !1;
    0 !== (lanes & 8) && (lanes |= lanes & 32);
    allEntangledLanes = root.entangledLanes;
    if (0 !== allEntangledLanes) for (root = root.entanglements, allEntangledLanes &= lanes; 0 < allEntangledLanes;) {
      index_2 = 31 - clz32(allEntangledLanes);
      lane = 1 << index_2;
      lanes |= root[index_2];
      allEntangledLanes &= ~lane;
    }
    entangledRenderLanes = lanes;
    finishQueueingConcurrentUpdates();
    return timeoutHandle;
  }
  function handleThrow(root, thrownValue) {
    currentlyRenderingFiber = undefined;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : undefined !== thrownValue && "object" === typeOfJS(thrownValue) && "function" === typeOfJS(thrownValue.then) ? 6 : 1;
    workInProgressThrownValue = thrownValue;
    undefined === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current)));
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
  function renderDidSuspendDelayIfPossible() {
    workInProgressRootExitStatus = 4;
    workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && undefined !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = !0);
    0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || undefined === workInProgressRoot || markRootSuspended(workInProgressRoot, workInProgressRootRenderLanes, workInProgressDeferredLane, !1);
  }
  function renderRootSync(root, lanes, shouldYieldForPrerendering) {
    let prevExecutionContext, prevDispatcher, prevAsyncDispatcher, exitStatus, unitOfWork, thrownValue, reason;
    prevExecutionContext = executionContext;
    executionContext |= 2;
    prevDispatcher = pushDispatcher();
    prevAsyncDispatcher = pushAsyncDispatcher();
    if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) workInProgressTransitions = undefined, prepareFreshStack(root, lanes);
    lanes = !1;
    exitStatus = workInProgressRootExitStatus;
    {
      let __lb_3 = false,
        __lc_3 = false;
      while (!__lb_3) {
        __lc_3 = false;
        do {
          try {
            if (0 !== workInProgressSuspendedReason && undefined !== workInProgress) {
              unitOfWork = workInProgress;
              thrownValue = workInProgressThrownValue;
              switch (workInProgressSuspendedReason) {
                case 8:
                  resetWorkInProgressStack();
                  exitStatus = 6;
                  {
                    __lb_3 = true;
                    break;
                  }
                case 3:
                case 2:
                case 9:
                case 6:
                  undefined === suspenseHandlerStackCursor.current && (lanes = !0);
                  reason = workInProgressSuspendedReason;
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = undefined;
                  throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
                  if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                    exitStatus = 0;
                    {
                      __lb_3 = true;
                      break;
                    }
                  }
                  break;
                default:
                  reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = undefined, throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
              }
              if (__lb_3 || __lc_3) {
                break;
              }
            }
            if (__lb_3 || __lc_3) {
              break;
            }
            workLoopSync();
            exitStatus = workInProgressRootExitStatus;
            break;
          } catch (thrownValue_152) {
            handleThrow(root, thrownValue_152);
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
    lastContextDependency = currentlyRenderingFiber_1 = undefined;
    executionContext = prevExecutionContext;
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    undefined === workInProgress && (workInProgressRoot = undefined, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
    return exitStatus;
  }
  function workLoopSync() {
    for (; undefined !== workInProgress;) performUnitOfWork(workInProgress);
  }
  function renderRootConcurrent(root, lanes) {
    let prevExecutionContext, prevDispatcher, prevAsyncDispatcher, thrownValue, resource, hostFiber, __type, props, sibling, returnFiber;
    prevExecutionContext = executionContext;
    executionContext |= 2;
    prevDispatcher = pushDispatcher();
    prevAsyncDispatcher = pushAsyncDispatcher();
    workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = undefined, workInProgressRootRenderTargetTime = __cat(now(), 500), prepareFreshStack(root, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
    {
      let __lb_2 = false,
        __lc_2 = false;
      while (!__lb_2) {
        __lc_2 = false;
        do {
          try {
            if (0 !== workInProgressSuspendedReason && undefined !== workInProgress) {
              lanes = workInProgress;
              thrownValue = workInProgressThrownValue;
              {
                let __lb_1 = false,
                  __lc_1 = false;
                while (!__lb_1) {
                  switch (workInProgressSuspendedReason) {
                    case 1:
                      workInProgressSuspendedReason = 0;
                      workInProgressThrownValue = undefined;
                      throwAndUnwindWorkLoop(root, lanes, thrownValue, 1);
                      break;
                    case 2:
                    case 9:
                      if (isThenableResolved(thrownValue)) {
                        workInProgressSuspendedReason = 0;
                        workInProgressThrownValue = undefined;
                        replaySuspendedUnitOfWork(lanes);
                        break;
                      }
                      lanes = function () {
                        2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root || (workInProgressSuspendedReason = 7);
                        ensureRootIsScheduled(root);
                      };
                      thrownValue.then(lanes, lanes);
                      {
                        __lb_2 = true;
                        break;
                      }
                    case 3:
                      workInProgressSuspendedReason = 7;
                      {
                        __lb_2 = true;
                        break;
                      }
                    case 4:
                      workInProgressSuspendedReason = 5;
                      {
                        __lb_2 = true;
                        break;
                      }
                    case 7:
                      isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = undefined, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = undefined, throwAndUnwindWorkLoop(root, lanes, thrownValue, 7));
                      break;
                    case 5:
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
                            workInProgressSuspendedReason = 0;
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
                      }
                      if (__lb_1 || __lc_1) {
                        break;
                      }
                      workInProgressSuspendedReason = 0;
                      workInProgressThrownValue = undefined;
                      throwAndUnwindWorkLoop(root, lanes, thrownValue, 5);
                      break;
                    case 6:
                      workInProgressSuspendedReason = 0;
                      workInProgressThrownValue = undefined;
                      throwAndUnwindWorkLoop(root, lanes, thrownValue, 6);
                      break;
                    case 8:
                      resetWorkInProgressStack();
                      workInProgressRootExitStatus = 6;
                      {
                        __lb_2 = true;
                        break;
                      }
                    default:
                      throw Error(formatProdErrorMessage(462));
                  }
                  if (__lb_2 || __lc_2) {
                    break;
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
            }
            if (__lb_2 || __lc_2) {
              break;
            }
            workLoopConcurrentByScheduler();
            break;
          } catch (thrownValue_154) {
            handleThrow(root, thrownValue_154);
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
    lastContextDependency = currentlyRenderingFiber_1 = undefined;
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    executionContext = prevExecutionContext;
    if (undefined !== workInProgress) return 0;
    workInProgressRoot = undefined;
    workInProgressRootRenderLanes = 0;
    finishQueueingConcurrentUpdates();
    return workInProgressRootExitStatus;
  }
  function workLoopConcurrentByScheduler() {
    for (; undefined !== workInProgress && !shouldYield();) performUnitOfWork(workInProgress);
  }
  function performUnitOfWork(unitOfWork) {
    let __next;
    __next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    undefined === __next ? completeUnitOfWork(unitOfWork) : workInProgress = __next;
  }
  function replaySuspendedUnitOfWork(unitOfWork) {
    let __next, current;
    __next = unitOfWork;
    current = __next.alternate;
    switch (__next.tag) {
      case 15:
      case 0:
        __next = replayFunctionComponent(current, __next, __next.pendingProps, __next.type, void 0, workInProgressRootRenderLanes);
        break;
      case 11:
        __next = replayFunctionComponent(current, __next, __next.pendingProps, __next.type.render, __next.ref, workInProgressRootRenderLanes);
        break;
      case 5:
        resetHooksOnUnwind(__next);
      default:
        unwindInterruptedWork(current, __next), __next = workInProgress = resetWorkInProgress(__next, entangledRenderLanes), __next = beginWork(current, __next, entangledRenderLanes);
    }
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    undefined === __next ? completeUnitOfWork(unitOfWork) : workInProgress = __next;
  }
  function throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, suspendedReason) {
    let returnFiber;
    lastContextDependency = currentlyRenderingFiber_1 = undefined;
    resetHooksOnUnwind(unitOfWork);
    thenableState_1 = undefined;
    thenableIndexCounter_1 = 0;
    returnFiber = unitOfWork.return;
    try {
      if (throwException(root, returnFiber, unitOfWork, thrownValue, workInProgressRootRenderLanes)) {
        workInProgressRootExitStatus = 1;
        logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
        workInProgress = undefined;
        return;
      }
    } catch (__error) {
      if (undefined !== returnFiber) throw workInProgress = returnFiber, __error;
      workInProgressRootExitStatus = 1;
      logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
      workInProgress = undefined;
      return;
    }
    if (unitOfWork.flags & 32768) {
      if (isHydrating || 1 === suspendedReason) root = !0;else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912)) root = !1;else if (workInProgressRootDidSkipSuspendedSiblings = root = !0, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason) suspendedReason = suspenseHandlerStackCursor.current, undefined !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
      unwindUnitOfWork(unitOfWork, root);
    } else completeUnitOfWork(unitOfWork);
  }
  function completeUnitOfWork(unitOfWork) {
    let completedWork, __next;
    completedWork = unitOfWork;
    do {
      if (0 !== (completedWork.flags & 32768)) {
        unwindUnitOfWork(completedWork, workInProgressRootDidSkipSuspendedSiblings);
        return;
      }
      unitOfWork = completedWork.return;
      __next = completeWork(completedWork.alternate, completedWork, entangledRenderLanes);
      if (undefined !== __next) {
        workInProgress = __next;
        return;
      }
      completedWork = completedWork.sibling;
      if (undefined !== completedWork) {
        workInProgress = completedWork;
        return;
      }
      workInProgress = completedWork = unitOfWork;
    } while (undefined !== completedWork);
    0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
  }
  function unwindUnitOfWork(unitOfWork, skipSiblings) {
    let __next;
    do {
      __next = unwindWork(unitOfWork.alternate, unitOfWork);
      if (undefined !== __next) {
        __next.flags &= 32767;
        workInProgress = __next;
        return;
      }
      __next = unitOfWork.return;
      undefined !== __next && (__next.flags |= 32768, __next.subtreeFlags = 0, __next.deletions = undefined);
      if (!skipSiblings && (unitOfWork = unitOfWork.sibling, undefined !== unitOfWork)) {
        workInProgress = unitOfWork;
        return;
      }
      workInProgress = unitOfWork = __next;
    } while (undefined !== unitOfWork);
    workInProgressRootExitStatus = 6;
    workInProgress = undefined;
  }
  function commitRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes) {
    root.cancelPendingCommit = undefined;
    do flushPendingEffects(); while (0 !== pendingEffectsStatus);
    if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
    if (undefined !== finishedWork) {
      if (finishedWork === root.current) throw Error(formatProdErrorMessage(177));
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
      0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? (root.callbackNode = undefined, root.callbackPriority = 0, scheduleCallback(NormalPriority_1, function () {
        flushPassiveEffects();
        return undefined;
      })) : (root.callbackNode = undefined, root.callbackPriority = 0);
      recoverableErrors = 0 !== (finishedWork.flags & 13878);
      if (0 !== (finishedWork.subtreeFlags & 13878) || recoverableErrors) {
        recoverableErrors = ReactSharedInternals.T;
        ReactSharedInternals.T = undefined;
        transitions = getCurrentUpdatePriority();
        setCurrentUpdatePriority(2);
        spawnedLane = executionContext;
        executionContext |= 4;
        try {
          commitBeforeMutationEffects(root, finishedWork, lanes);
        } finally {
          executionContext = spawnedLane, setCurrentUpdatePriority(transitions), ReactSharedInternals.T = recoverableErrors;
        }
      }
      pendingEffectsStatus = 1;
      flushMutationEffects();
      flushLayoutEffects();
      flushSpawnedWork();
    }
  }
  function flushMutationEffects() {
    let root, finishedWork, rootMutationHasEffect, previousPriority, prevExecutionContext;
    if (1 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      root = pendingEffectsRoot;
      finishedWork = pendingFinishedWork;
      rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
      if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
        rootMutationHasEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = undefined;
        previousPriority = getCurrentUpdatePriority();
        setCurrentUpdatePriority(2);
        prevExecutionContext = executionContext;
        executionContext |= 4;
        try {
          commitMutationEffectsOnFiber(finishedWork, root), resetAfterCommit(root.containerInfo);
        } finally {
          executionContext = prevExecutionContext, setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = rootMutationHasEffect;
        }
      }
      root.current = finishedWork;
      pendingEffectsStatus = 2;
    }
  }
  function flushLayoutEffects() {
    let root, finishedWork, rootHasLayoutEffect, previousPriority, prevExecutionContext;
    if (2 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      root = pendingEffectsRoot;
      finishedWork = pendingFinishedWork;
      rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
      if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
        rootHasLayoutEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = undefined;
        previousPriority = getCurrentUpdatePriority();
        setCurrentUpdatePriority(2);
        prevExecutionContext = executionContext;
        executionContext |= 4;
        try {
          commitLayoutEffectOnFiber(root, finishedWork.alternate, finishedWork);
        } finally {
          executionContext = prevExecutionContext, setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = rootHasLayoutEffect;
        }
      }
      pendingEffectsStatus = 3;
    }
  }
  function flushSpawnedWork() {
    let root, finishedWork, lanes, recoverableErrors, remainingLanes, onRecoverableError, i, recoverableError;
    if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      requestPaint();
      root = pendingEffectsRoot;
      finishedWork = pendingFinishedWork;
      lanes = pendingEffectsLanes;
      recoverableErrors = pendingRecoverableErrors;
      0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = undefined, releaseRootPooledCache(root, root.pendingLanes));
      remainingLanes = root.pendingLanes;
      0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = undefined);
      lanesToEventPriority(lanes);
      finishedWork = finishedWork.stateNode;
      if (injectedHook && "function" === typeOfJS(injectedHook.onCommitFiberRoot)) try {
        injectedHook.onCommitFiberRoot(rendererID, finishedWork, void 0, 128 === (finishedWork.current.flags & 128));
      } catch (err) {}
      if (undefined !== recoverableErrors) {
        finishedWork = ReactSharedInternals.T;
        remainingLanes = getCurrentUpdatePriority();
        setCurrentUpdatePriority(2);
        ReactSharedInternals.T = undefined;
        try {
          for (onRecoverableError = root.onRecoverableError, i = 0; i < __len(recoverableErrors); i++) {
            recoverableError = recoverableErrors[i];
            onRecoverableError(recoverableError.value, {
              componentStack: recoverableError.stack
            });
          }
        } finally {
          ReactSharedInternals.T = finishedWork, setCurrentUpdatePriority(remainingLanes);
        }
      }
      0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
      ensureRootIsScheduled(root);
      remainingLanes = root.pendingLanes;
      0 !== (lanes & 261930) && 0 !== (remainingLanes & 42) ? root === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root) : nestedUpdateCount = 0;
      supportsHydration && flushHydrationEvents();
      flushSyncWorkAcrossRoots_impl(0, !1);
    }
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
    let root, remainingLanes, renderPriority, priority, previousPriority, root_jscomp_0, lanes, prevExecutionContext;
    if (5 !== pendingEffectsStatus) return !1;
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
      priority = pendingPassiveTransitions;
      pendingPassiveTransitions = undefined;
      root_jscomp_0 = pendingEffectsRoot;
      lanes = pendingEffectsLanes;
      pendingEffectsStatus = 0;
      pendingFinishedWork = pendingEffectsRoot = undefined;
      pendingEffectsLanes = 0;
      if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
      prevExecutionContext = executionContext;
      executionContext |= 4;
      commitPassiveUnmountOnFiber(root_jscomp_0.current);
      commitPassiveMountOnFiber(root_jscomp_0, root_jscomp_0.current, lanes, priority);
      executionContext = prevExecutionContext;
      flushSyncWorkAcrossRoots_impl(0, !1);
      if (injectedHook && "function" === typeOfJS(injectedHook.onPostCommitFiberRoot)) try {
        injectedHook.onPostCommitFiberRoot(rendererID, root_jscomp_0);
      } catch (err) {}
      return !0;
    } finally {
      setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = renderPriority, releaseRootPooledCache(root, remainingLanes);
    }
  }
  function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, __error) {
    sourceFiber = createCapturedValueAtFiber(__error, sourceFiber);
    sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
    rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
    undefined !== rootFiber && (markRootUpdated_1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
  }
  function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, __error) {
    let instance;
    if (3 === sourceFiber.tag) captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, __error);else for (; undefined !== nearestMountedAncestor;) {
      if (3 === nearestMountedAncestor.tag) {
        captureCommitPhaseErrorOnRoot(nearestMountedAncestor, sourceFiber, __error);
        break;
      } else if (1 === nearestMountedAncestor.tag) {
        instance = nearestMountedAncestor.stateNode;
        if ("function" === typeOfJS(nearestMountedAncestor.type.getDerivedStateFromError) || "function" === typeOfJS(instance.componentDidCatch) && (undefined === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
          sourceFiber = createCapturedValueAtFiber(__error, sourceFiber);
          __error = createClassErrorUpdate(2);
          instance = enqueueUpdate(nearestMountedAncestor, __error, 2);
          undefined !== instance && (initializeClassErrorUpdate(__error, instance, nearestMountedAncestor, sourceFiber), markRootUpdated_1(instance, 2), ensureRootIsScheduled(instance));
          break;
        }
      }
      nearestMountedAncestor = nearestMountedAncestor.return;
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
    threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = !0, threadIDs.add(lanes), root = __partial((..._bindArgs12) => __applyFn(pingSuspendedRoot, ..._bindArgs12), undefined, root, wakeable, lanes), wakeable.then(root, root));
  }
  function pingSuspendedRoot(root, wakeable, pingedLanes) {
    let pingCache;
    pingCache = root.pingCache;
    undefined !== pingCache && pingCache.delete(wakeable);
    root.pingedLanes |= root.suspendedLanes & pingedLanes;
    root.warmLanes &= ~pingedLanes;
    workInProgressRoot === root && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) && prepareFreshStack(root, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
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
        throw Error(formatProdErrorMessage(314));
    }
    undefined !== retryCache && retryCache.delete(wakeable);
    retryTimedOutBoundary(boundaryFiber, retryLane);
  }
  function scheduleCallback(priorityLevel, callback) {
    return scheduleCallback_3(priorityLevel, callback);
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
  }
  function shouldConstruct(Component) {
    Component = __protoOf(Component);
    return !(!Component || !Component.isReactComponent);
  }
  function createWorkInProgress(current, pendingProps) {
    let workInProgress;
    workInProgress = current.alternate;
    undefined === workInProgress ? (workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, workInProgress.type = current.type, workInProgress.flags = 0, workInProgress.subtreeFlags = 0, workInProgress.deletions = undefined);
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
      firstContext: pendingProps.firstContext
    };
    workInProgress.sibling = current.sibling;
    workInProgress.index = current.index;
    workInProgress.ref = current.ref;
    workInProgress.refCleanup = current.refCleanup;
    return workInProgress;
  }
  function resetWorkInProgress(workInProgress, renderLanes) {
    let current;
    workInProgress.flags &= 65011714;
    current = workInProgress.alternate;
    undefined === current ? (workInProgress.childLanes = 0, workInProgress.lanes = renderLanes, workInProgress.child = undefined, workInProgress.subtreeFlags = 0, workInProgress.memoizedProps = undefined, workInProgress.memoizedState = undefined, workInProgress.updateQueue = undefined, workInProgress.dependencies = undefined, workInProgress.stateNode = undefined) : (workInProgress.childLanes = current.childLanes, workInProgress.lanes = current.lanes, workInProgress.child = current.child, workInProgress.subtreeFlags = 0, workInProgress.deletions = undefined, workInProgress.memoizedProps = current.memoizedProps, workInProgress.memoizedState = current.memoizedState, workInProgress.updateQueue = current.updateQueue, workInProgress.type = current.type, renderLanes = current.dependencies, workInProgress.dependencies = undefined === renderLanes ? undefined : {
      lanes: renderLanes.lanes,
      firstContext: renderLanes.firstContext
    });
    return workInProgress;
  }
  function createFiberFromTypeAndProps(__type, key, pendingProps, owner, mode, lanes) {
    let fiberTag;
    fiberTag = 0;
    owner = __type;
    if ("function" === typeOfJS(__type)) shouldConstruct(__type) && (fiberTag = 1);else if ("string" === typeOfJS(__type)) fiberTag = supportsResources && supportsSingletons ? isHostHoistableType(__type, pendingProps, contextStackCursor.current) ? 26 : isHostSingletonType(__type) ? 27 : 5 : supportsResources ? isHostHoistableType(__type, pendingProps, contextStackCursor.current) ? 26 : 5 : supportsSingletons ? isHostSingletonType(__type) ? 27 : 5 : 5;else {
      let __lb_0 = false,
        __lc_0 = false;
      while (!__lb_0) {
        switch (__type) {
          case REACT_ACTIVITY_TYPE:
            return __type = createFiber(31, pendingProps, key, mode), __type.elementType = REACT_ACTIVITY_TYPE, __type.lanes = lanes, __type;
          case REACT_FRAGMENT_TYPE:
            return createFiberFromFragment(pendingProps.children, mode, lanes, key);
          case REACT_STRICT_MODE_TYPE:
            fiberTag = 8;
            mode |= 24;
            break;
          case REACT_PROFILER_TYPE:
            return __type = createFiber(12, pendingProps, key, mode | 2), __type.elementType = REACT_PROFILER_TYPE, __type.lanes = lanes, __type;
          case REACT_SUSPENSE_TYPE:
            return __type = createFiber(13, pendingProps, key, mode), __type.elementType = REACT_SUSPENSE_TYPE, __type.lanes = lanes, __type;
          case REACT_SUSPENSE_LIST_TYPE:
            return __type = createFiber(19, pendingProps, key, mode), __type.elementType = REACT_SUSPENSE_LIST_TYPE, __type.lanes = lanes, __type;
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
                owner = undefined;
                {
                  __lb_0 = true;
                  break;
                }
            }
            if (__lb_0 || __lc_0) {
              break;
            }
            fiberTag = 29;
            pendingProps = Error(formatProdErrorMessage(130, undefined === __type ? "null" : typeOfJS(__type), ""));
            owner = undefined;
        }
        break;
      }
    }
    key = createFiber(fiberTag, pendingProps, key, mode);
    key.elementType = __type;
    key.type = owner;
    key.lanes = lanes;
    return key;
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
    fiber = createFiber(18, undefined, undefined, 0);
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
  function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
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
  }
  function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
    containerInfo = __new(FiberRootNode, containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState);
    tag = 1;
    !0 === isStrictMode && (tag |= 24);
    isStrictMode = createFiber(3, undefined, undefined, tag);
    containerInfo.current = isStrictMode;
    isStrictMode.stateNode = containerInfo;
    tag = createCache();
    tag.refCount++;
    containerInfo.pooledCache = tag;
    tag.refCount++;
    isStrictMode.memoizedState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: tag
    };
    initializeUpdateQueue(isStrictMode);
    return containerInfo;
  }
  function getContextForSubtree(parentComponent) {
    if (!parentComponent) return emptyContextObject;
    parentComponent = emptyContextObject;
    return parentComponent;
  }
  function findHostInstance(component) {
    let fiber;
    fiber = component._reactInternals;
    if (void 0 === fiber) {
      if ("function" === typeOfJS(component.render)) throw Error(formatProdErrorMessage(188));
      component = __join(Object.keys(component), ",");
      throw Error(formatProdErrorMessage(268, component));
    }
    component = findCurrentFiberUsingSlowPath(fiber);
    component = undefined !== component ? findCurrentHostFiberImpl(component) : undefined;
    return undefined === component ? undefined : getPublicInstance(component.stateNode);
  }
  function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
    parentComponent = getContextForSubtree(parentComponent);
    undefined === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
    container = createUpdate(lane);
    container.payload = {
      element: element
    };
    callback = void 0 === callback ? undefined : callback;
    undefined !== callback && (container.callback = callback);
    element = enqueueUpdate(rootFiber, container, lane);
    undefined !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
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
  ___config.trackSchedulerEvent;
  ___config.resolveEventType;
  ___config.resolveEventTimeStamp;
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
  ___config.getSuspendedCommitReason;
  NotPendingTransition = ___config.NotPendingTransition;
  HostTransitionContext = ___config.HostTransitionContext;
  resetFormInstance = ___config.resetFormInstance;
  ___config.bindToConsole;
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
  ___config.diffHydratedPropsForDevWarnings;
  ___config.diffHydratedTextForDevWarnings;
  ___config.describeHydratableInstanceForDevWarnings;
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
  index_jscomp_0 = -1;
  emptyContextObject = {};
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
  now = Scheduler.unstable_now;
  ImmediatePriority = Scheduler.unstable_ImmediatePriority;
  UserBlockingPriority = Scheduler.unstable_UserBlockingPriority;
  NormalPriority_1 = Scheduler.unstable_NormalPriority;
  IdlePriority = Scheduler.unstable_IdlePriority;
  log = Scheduler.log;
  unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue;
  rendererID = undefined;
  injectedHook = undefined;
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
  reentry = !1;
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
  hydrationParentFiber = undefined;
  nextHydratableInstance = undefined;
  isHydrating = !1;
  hydrationErrors = undefined;
  rootOrSingletonContext = !1;
  HydrationMismatchException = Error(formatProdErrorMessage(519));
  valueCursor = createCursor(undefined);
  currentlyRenderingFiber_1 = undefined;
  lastContextDependency = undefined;
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
    _threadCount: 0
  };
  firstScheduledRoot = undefined;
  lastScheduledRoot = undefined;
  didScheduleMicrotask = !1;
  mightHavePendingSyncWork = !1;
  isFlushingWork = !1;
  currentEventTransitionLane = 0;
  currentEntangledListeners = undefined;
  currentEntangledPendingCount = 0;
  currentEntangledLane = 0;
  currentEntangledActionThenable = undefined;
  prevOnStartTransitionFinish = ReactSharedInternals.S;
  ReactSharedInternals.S = function (transition, returnValue) {
    globalMostRecentTransitionTime = now();
    "object" === typeOfJS(returnValue) && undefined !== returnValue && "function" === typeOfJS(returnValue.then) && entangleAsyncAction(transition, returnValue);
    undefined !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
  };
  resumedCache = createCursor(undefined);
  SuspenseException = Error(formatProdErrorMessage(460));
  SuspenseyCommitException = Error(formatProdErrorMessage(474));
  SuspenseActionException = Error(formatProdErrorMessage(542));
  noopSuspenseyCommitThenable = {
    then: function () {}
  };
  suspendedThenable = undefined;
  thenableState_1 = undefined;
  thenableIndexCounter_1 = 0;
  reconcileChildFibers = createChildReconciler(!0);
  mountChildFibers = createChildReconciler(!1);
  concurrentQueues = __arrNew();
  concurrentQueuesIndex = 0;
  concurrentlyUpdatedLanes = 0;
  hasForceUpdate = !1;
  didReadFromEntangledAsyncAction = !1;
  currentTreeHiddenStackCursor = createCursor(undefined);
  prevEntangledRenderLanesCursor = createCursor(0);
  suspenseHandlerStackCursor = createCursor(undefined);
  shellBoundary = undefined;
  suspenseStackCursor = createCursor(0);
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
  HooksDispatcherOnMount = {
    readContext: readContext,
    use: use,
    useCallback: function (callback, deps) {
      mountWorkInProgressHook().memoizedState = __arrNew(callback, void 0 === deps ? undefined : deps);
      return callback;
    },
    useContext: readContext,
    useEffect: mountEffect,
    useImperativeHandle: function (ref, create, deps) {
      deps = undefined !== deps && void 0 !== deps ? __concat(deps, __arrNew(ref)) : undefined;
      mountEffectImpl(4194308, 4, __partial((..._bindArgs13) => __applyFn(imperativeHandleEffect, ..._bindArgs13), undefined, create, ref), deps);
    },
    useLayoutEffect: function (create, deps) {
      return mountEffectImpl(4194308, 4, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      mountEffectImpl(4, 2, create, deps);
    },
    useMemo: function (nextCreate, deps) {
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
    },
    useReducer: function (reducer, initialArg, init) {
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
      reducer = reducer.dispatch = __partial((..._bindArgs14) => __applyFn(dispatchReducerAction, ..._bindArgs14), undefined, currentlyRenderingFiber, reducer);
      return __arrNew(hook.memoizedState, reducer);
    },
    useRef: function (initialValue) {
      let hook;
      hook = mountWorkInProgressHook();
      initialValue = {
        current: initialValue
      };
      return hook.memoizedState = initialValue;
    },
    useState: function (initialState) {
      let queue, dispatch;
      initialState = mountStateImpl(initialState);
      queue = initialState.queue;
      dispatch = __partial((..._bindArgs15) => __applyFn(dispatchSetState, ..._bindArgs15), undefined, currentlyRenderingFiber, queue);
      queue.dispatch = dispatch;
      return __arrNew(initialState.memoizedState, dispatch);
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function (value, initialValue) {
      let hook;
      hook = mountWorkInProgressHook();
      return mountDeferredValueImpl(hook, value, initialValue);
    },
    useTransition: function () {
      let stateHook;
      stateHook = mountStateImpl(!1);
      stateHook = __partial((..._bindArgs16) => __applyFn(startTransition, ..._bindArgs16), undefined, currentlyRenderingFiber, stateHook.queue, !0, !1);
      mountWorkInProgressHook().memoizedState = stateHook;
      return __arrNew(!1, stateHook);
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      let fiber, hook, inst;
      fiber = currentlyRenderingFiber;
      hook = mountWorkInProgressHook();
      if (isHydrating) {
        if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
        getServerSnapshot = getServerSnapshot();
      } else {
        getServerSnapshot = getSnapshot();
        if (undefined === workInProgressRoot) throw Error(formatProdErrorMessage(349));
        0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
      }
      hook.memoizedState = getServerSnapshot;
      inst = {
        value: getServerSnapshot,
        getSnapshot: getSnapshot
      };
      hook.queue = inst;
      mountEffect(__partial((..._bindArgs17) => __applyFn(subscribeToStore, ..._bindArgs17), undefined, fiber, inst, subscribe), __arrNew(subscribe));
      fiber.flags |= 2048;
      pushSimpleEffect(9, {
        destroy: void 0
      }, __partial((..._bindArgs18) => __applyFn(updateStoreInstance, ..._bindArgs18), undefined, fiber, inst, getServerSnapshot, getSnapshot), undefined);
      return getServerSnapshot;
    },
    useId: function () {
      let hook, identifierPrefix, JSCompiler_inline_result, idWithLeadingBit;
      hook = mountWorkInProgressHook();
      identifierPrefix = workInProgressRoot.identifierPrefix;
      if (isHydrating) {
        JSCompiler_inline_result = treeContextOverflow;
        idWithLeadingBit = treeContextId;
        JSCompiler_inline_result = __cat(__numToBase(idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1), 32), JSCompiler_inline_result);
        identifierPrefix = __cat(__cat(__cat("_", identifierPrefix), "R_"), JSCompiler_inline_result);
        JSCompiler_inline_result = localIdCounter++;
        0 < JSCompiler_inline_result && (identifierPrefix += __cat("H", __numToBase(JSCompiler_inline_result, 32)));
        identifierPrefix += "_";
      } else JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = __cat(__cat(__cat(__cat("_", identifierPrefix), "r_"), __numToBase(JSCompiler_inline_result, 32)), "_");
      return hook.memoizedState = identifierPrefix;
    },
    useHostTransitionStatus: useHostTransitionStatus,
    useFormState: mountActionState,
    useActionState: mountActionState,
    useOptimistic: function (passthrough) {
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
      hook = __partial((..._bindArgs19) => __applyFn(dispatchOptimisticSetState, ..._bindArgs19), undefined, currentlyRenderingFiber, !0, queue);
      queue.dispatch = hook;
      return __arrNew(passthrough, hook);
    },
    useMemoCache: useMemoCache,
    useCacheRefresh: function () {
      return mountWorkInProgressHook().memoizedState = __partial((..._bindArgs20) => __applyFn(refreshCache, ..._bindArgs20), undefined, currentlyRenderingFiber);
    },
    useEffectEvent: function (callback) {
      let hook, ref;
      hook = mountWorkInProgressHook();
      ref = {
        impl: callback
      };
      hook.memoizedState = ref;
      return function (...__args) {
        let __allArgs = __arrNew(...__args);
        if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
        return __applyFn(ref.impl, void 0, __allArgs);
      };
    }
  };
  HooksDispatcherOnUpdate = {
    readContext: readContext,
    use: use,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useInsertionEffect: updateInsertionEffect,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: updateReducer,
    useRef: updateRef,
    useState: function () {
      return updateReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function (value, initialValue) {
      let hook;
      hook = updateWorkInProgressHook();
      return updateDeferredValueImpl(hook, currentHook.memoizedState, value, initialValue);
    },
    useTransition: function () {
      let booleanOrThenable, start;
      booleanOrThenable = updateReducer(basicStateReducer)[0];
      start = updateWorkInProgressHook().memoizedState;
      return __arrNew("boolean" === typeOfJS(booleanOrThenable) ? booleanOrThenable : useThenable(booleanOrThenable), start);
    },
    useSyncExternalStore: updateSyncExternalStore,
    useId: updateId,
    useHostTransitionStatus: useHostTransitionStatus,
    useFormState: updateActionState,
    useActionState: updateActionState,
    useOptimistic: function (passthrough, reducer) {
      let hook;
      hook = updateWorkInProgressHook();
      return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
    },
    useMemoCache: useMemoCache,
    useCacheRefresh: updateRefresh
  };
  HooksDispatcherOnUpdate.useEffectEvent = updateEvent;
  HooksDispatcherOnRerender = {
    readContext: readContext,
    use: use,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useInsertionEffect: updateInsertionEffect,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: rerenderReducer,
    useRef: updateRef,
    useState: function () {
      return rerenderReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function (value, initialValue) {
      let hook;
      hook = updateWorkInProgressHook();
      return undefined === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(hook, currentHook.memoizedState, value, initialValue);
    },
    useTransition: function () {
      let booleanOrThenable, start;
      booleanOrThenable = rerenderReducer(basicStateReducer)[0];
      start = updateWorkInProgressHook().memoizedState;
      return __arrNew("boolean" === typeOfJS(booleanOrThenable) ? booleanOrThenable : useThenable(booleanOrThenable), start);
    },
    useSyncExternalStore: updateSyncExternalStore,
    useId: updateId,
    useHostTransitionStatus: useHostTransitionStatus,
    useFormState: rerenderActionState,
    useActionState: rerenderActionState,
    useOptimistic: function (passthrough, reducer) {
      let hook;
      hook = updateWorkInProgressHook();
      if (undefined !== currentHook) return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
      hook.baseState = passthrough;
      return __arrNew(passthrough, hook.queue.dispatch);
    },
    useMemoCache: useMemoCache,
    useCacheRefresh: updateRefresh
  };
  HooksDispatcherOnRerender.useEffectEvent = updateEvent;
  classComponentUpdater = {
    enqueueSetState: function (inst, payload, callback) {
      let lane, update;
      inst = inst._reactInternals;
      lane = requestUpdateLane();
      update = createUpdate(lane);
      update.payload = payload;
      void 0 !== callback && undefined !== callback && (update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      undefined !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueReplaceState: function (inst, payload, callback) {
      let lane, update;
      inst = inst._reactInternals;
      lane = requestUpdateLane();
      update = createUpdate(lane);
      update.tag = 1;
      update.payload = payload;
      void 0 !== callback && undefined !== callback && (update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      undefined !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueForceUpdate: function (inst, callback) {
      let lane, update;
      inst = inst._reactInternals;
      lane = requestUpdateLane();
      update = createUpdate(lane);
      update.tag = 2;
      void 0 !== callback && undefined !== callback && (update.callback = callback);
      callback = enqueueUpdate(inst, update, lane);
      undefined !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
    }
  };
  SelectiveHydrationException = Error(formatProdErrorMessage(461));
  didReceiveUpdate = !1;
  SUSPENDED_MARKER = {
    dehydrated: undefined,
    treeContext: undefined,
    retryLane: 0,
    hydrationErrors: undefined
  };
  offscreenSubtreeIsHidden = !1;
  offscreenSubtreeWasHidden = !1;
  needsFormReset = !1;
  PossiblyWeakSet = "function" === typeOfJS(WeakSet) ? WeakSet : Set;
  nextEffect = undefined;
  hostParent = undefined;
  hostParentIsContainer = !1;
  currentHoistableRoot = undefined;
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
  PossiblyWeakMap = "function" === typeOfJS(WeakMap) ? WeakMap : Map;
  executionContext = 0;
  workInProgressRoot = undefined;
  workInProgress = undefined;
  workInProgressRootRenderLanes = 0;
  workInProgressSuspendedReason = 0;
  workInProgressThrownValue = undefined;
  workInProgressRootDidSkipSuspendedSiblings = !1;
  workInProgressRootIsPrerendering = !1;
  workInProgressRootDidAttachPingListener = !1;
  entangledRenderLanes = 0;
  workInProgressRootExitStatus = 0;
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
  workInProgressRootRenderTargetTime = Infinity;
  workInProgressTransitions = undefined;
  legacyErrorBoundariesThatAlreadyFailed = undefined;
  pendingEffectsStatus = 0;
  pendingEffectsRoot = undefined;
  pendingFinishedWork = undefined;
  pendingEffectsLanes = 0;
  pendingEffectsRemainingLanes = 0;
  pendingPassiveTransitions = undefined;
  pendingRecoverableErrors = undefined;
  nestedUpdateCount = 0;
  rootWithNestedUpdates = undefined;
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
      lane = requestUpdateLane();
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
            0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = __cat(now(), 500), flushSyncWorkAcrossRoots_impl(0, !1));
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
    tag = requestUpdateLane();
    tag = getBumpedLaneForHydrationByLane(tag);
    hydrationCallbacks = createUpdate(tag);
    hydrationCallbacks.callback = void 0 !== callback && undefined !== callback ? callback : undefined;
    enqueueUpdate(containerInfo, hydrationCallbacks, tag);
    callback = tag;
    initialChildren.current.lanes = callback;
    markRootUpdated_1(initialChildren, callback);
    ensureRootIsScheduled(initialChildren);
    return initialChildren;
  };
  __exports.createPortal = function (children, containerInfo, implementation, ...__args) {
    let __allArgs = __arrNew(children, containerInfo, implementation, ...__args);
    let key;
    key = 3 < __len(__allArgs) && void 0 !== __argAt(__allArgs, 3) ? __argAt(__allArgs, 3) : undefined;
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
    console.error(__error);
  };
  __exports.defaultOnRecoverableError = function (__error) {
    reportGlobalError(__error);
  };
  __exports.defaultOnUncaughtError = function (__error) {
    reportGlobalError(__error);
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
      setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = prevTransition, 0 === executionContext && (workInProgressRootRenderTargetTime = __cat(now(), 500));
    }
  };
  __exports.findAllNodes = findAllNodes;
  __exports.findBoundingRects = function (hostRoot, selectors) {
    let i, targetLeft, targetRight, targetTop, targetBottom, j, otherRect, otherLeft, otherRight, otherTop, otherBottom;
    if (!supportsTestSelectors) throw Error(formatProdErrorMessage(363));
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
  __exports.findHostInstance = findHostInstance;
  __exports.findHostInstanceWithNoPortals = function (fiber) {
    fiber = findCurrentFiberUsingSlowPath(fiber);
    fiber = undefined !== fiber ? findCurrentHostFiberWithNoPortalsImpl(fiber) : undefined;
    return undefined === fiber ? undefined : getPublicInstance(fiber.stateNode);
  };
  __exports.findHostInstanceWithWarning = function (component) {
    return findHostInstance(component);
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
      setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = prevTransition, executionContext = prevExecutionContext, 0 === (executionContext & 6) && flushSyncWorkAcrossRoots_impl(0, !1);
    }
  };
  __exports.flushSyncWork = flushSyncWork;
  __exports.focusWithin = function (_hostRoot, selectors) {
    let fiber, tag;
    if (!supportsTestSelectors) throw Error(formatProdErrorMessage(363));
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
    if (!supportsTestSelectors) throw Error(formatProdErrorMessage(363));
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
    let internals, hook;
    internals = {
      bundleType: 0,
      version: rendererVersion,
      rendererPackageName: rendererPackageName,
      currentDispatcherRef: ReactSharedInternals,
      reconcilerVersion: "19.2.0"
    };
    undefined !== extraDevToolsConfig && (internals.rendererConfig = extraDevToolsConfig);
    if ("undefined" === typeOfJS(__REACT_DEVTOOLS_GLOBAL_HOOK__)) internals = !1;else {
      hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (hook.isDisabled || !hook.supportsFiber) internals = !0;else {
        try {
          rendererID = hook.inject(internals), injectedHook = hook;
        } catch (err) {}
        internals = hook.checkDCE ? !0 : !1;
      }
    }
    return internals;
  };
  __exports.isAlreadyRendering = function () {
    return 0 !== (executionContext & 6);
  };
  __exports.observeVisibleRects = function (hostRoot, selectors, callback, options) {
    let disconnect;
    if (!supportsTestSelectors) throw Error(formatProdErrorMessage(363));
    hostRoot = findAllNodes(hostRoot, selectors);
    disconnect = setupIntersectionObserver(hostRoot, callback, options).disconnect;
    return {
      disconnect: function () {
        disconnect();
      }
    };
  };
  __exports.shouldError = function () {
    return undefined;
  };
  __exports.shouldSuspend = function () {
    return !1;
  };
  __exports.startHostTransition = function (formFiber, pendingState, action, formData) {
    let queue;
    if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
    queue = ensureFormComponentIsStateful(formFiber).queue;
    startTransition(formFiber, queue, pendingState, NotPendingTransition, undefined === action ? noop : function () {
      let stateHook;
      stateHook = ensureFormComponentIsStateful(formFiber);
      undefined === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
      dispatchSetStateInternal(formFiber, stateHook.next.queue, {}, requestUpdateLane());
      return action(formData);
    });
  };
  __exports.updateContainer = function (element, container, parentComponent, callback) {
    let current, lane;
    current = container.current;
    lane = requestUpdateLane();
    updateContainerImpl(current, lane, element, container, parentComponent, callback);
    return lane;
  };
  __exports.updateContainerSync = function (element, container, parentComponent, callback) {
    updateContainerImpl(container.current, 2, element, container, parentComponent, callback);
    return 2;
  };
  return __exports;
};
__exports.default = __exports;
Object.defineProperty(__exports, "__esModule", {
  value: !0
});
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
