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
  let __ST = {};
  __ST.getCurrentFiberForDevTools = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      return __ST.current;
    }(...__args);
  };
  __ST.markRetryLaneIfNotHydrated = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, retryLane) {
      __ST.markRetryLaneImpl(fiber, retryLane);
      (fiber = fiber.alternate) && __ST.markRetryLaneImpl(fiber, retryLane);
    }(...__args);
  };
  __ST.markRetryLaneImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, retryLane) {
      let a;
      fiber = fiber.memoizedState;
      if (undefined !== fiber && undefined !== fiber.dehydrated) {
        a = fiber.retryLane;
        fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
      }
    }(...__args);
  };
  __ST.updateContainerImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (rootFiber, lane, element, container, parentComponent, callback) {
      if (__ST.injectedHook && "function" === typeOfJS(__ST.injectedHook.onScheduleFiberRoot)) try {
        __ST.injectedHook.onScheduleFiberRoot(__ST.rendererID, container, element);
      } catch (err) {
        __ST.hasLoggedError || (__ST.hasLoggedError = !0, console.error("React instrumentation encountered an error: %o", err));
      }
      parentComponent = __ST.getContextForSubtree(parentComponent);
      undefined === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
      __ST.isRendering && undefined !== __ST.current && !__ST.didWarnAboutNestedUpdates && (__ST.didWarnAboutNestedUpdates = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", __ST.getComponentNameFromFiber(__ST.current) || "Unknown"));
      container = __ST.createUpdate(lane);
      container.payload = {
        element: element
      };
      callback = void 0 === callback ? undefined : callback;
      undefined !== callback && ("function" !== typeOfJS(callback) && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", callback), container.callback = callback);
      element = __ST.enqueueUpdate(rootFiber, container, lane);
      undefined !== element && (__ST.startUpdateTimerByLane(lane, "root.render()", undefined), __ST.scheduleUpdateOnFiber(element, rootFiber, lane), __ST.entangleTransitions(element, rootFiber, lane));
    }(...__args);
  };
  __ST.updateContainerSync = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (element, container, parentComponent, callback) {
      __ST.updateContainerImpl(container.current, 2, element, container, parentComponent, callback);
      return 2;
    }(...__args);
  };
  __ST.getContextForSubtree = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (parentComponent) {
      if (!parentComponent) return __ST.emptyContextObject;
      parentComponent = __ST.emptyContextObject;
      return parentComponent;
    }(...__args);
  };
  __ST.testStringCoercion = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (value) {
      return __cat("", value);
    }(...__args);
  };
  __ST.createFiberRoot = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
      containerInfo = __new(__ST.FiberRootNode, containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState);
      tag = 1;
      !0 === isStrictMode && (tag |= 24);
      isStrictMode = __ST.createFiber(3, undefined, undefined, tag | 2);
      containerInfo.current = isStrictMode;
      isStrictMode.stateNode = containerInfo;
      tag = __ST.createCache();
      __ST.retainCache(tag);
      containerInfo.pooledCache = tag;
      __ST.retainCache(tag);
      isStrictMode.memoizedState = {
        element: initialChildren,
        isDehydrated: hydrate,
        cache: tag
      };
      __ST.initializeUpdateQueue(isStrictMode);
      return containerInfo;
    }(...__args);
  };
  __ST.FiberRootNode = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (__self, containerInfo, _tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
      __self.tag = 1;
      __self.containerInfo = containerInfo;
      __self.pingCache = __self.current = __self.pendingChildren = undefined;
      __self.timeoutHandle = __ST.noTimeout;
      __self.callbackNode = __self.next = __self.pendingContext = __self.context = __self.cancelPendingCommit = undefined;
      __self.callbackPriority = 0;
      __self.expirationTimes = __ST.createLaneMap(-1);
      __self.entangledLanes = __self.shellSuspendCounter = __self.errorRecoveryDisabledLanes = __self.expiredLanes = __self.warmLanes = __self.pingedLanes = __self.suspendedLanes = __self.pendingLanes = 0;
      __self.entanglements = __ST.createLaneMap(0);
      __self.hiddenUpdates = __ST.createLaneMap(undefined);
      __self.identifierPrefix = identifierPrefix;
      __self.onUncaughtError = onUncaughtError;
      __self.onCaughtError = onCaughtError;
      __self.onRecoverableError = onRecoverableError;
      __self.pooledCache = undefined;
      __self.pooledCacheLanes = 0;
      __self.formState = formState;
      __self.incompleteTransitions = __new(Map);
      __self.passiveEffectDuration = __self.effectDuration = -0;
      __self.memoizedUpdaters = __new(Set);
      containerInfo = __self.pendingUpdatersLaneMap = __arrNew();
      for (let _tag = 0; 31 > _tag; _tag++) __push(containerInfo, __new(Set));
      __self._debugRootType = hydrate ? "hydrateRoot()" : "createRoot()";
    }(...__args);
  };
  __ST.createFiberFromPortal = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (portal, mode, lanes) {
      mode = __ST.createFiber(4, undefined !== portal.children ? portal.children : __arrNew(), portal.key, mode);
      mode.lanes = lanes;
      mode.stateNode = {
        containerInfo: portal.containerInfo,
        pendingChildren: undefined,
        implementation: portal.implementation
      };
      return mode;
    }(...__args);
  };
  __ST.createFiberFromDehydratedFragment = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (dehydratedNode) {
      let fiber;
      fiber = __ST.createFiber(18, undefined, undefined, __ST.NoMode);
      fiber.stateNode = dehydratedNode;
      return fiber;
    }(...__args);
  };
  __ST.createFiberFromText = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (content, mode, lanes) {
      content = __ST.createFiber(6, content, undefined, mode);
      content.lanes = lanes;
      return content;
    }(...__args);
  };
  __ST.createFiberFromFragment = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (elements, mode, lanes, key) {
      elements = __ST.createFiber(7, elements, key, mode);
      elements.lanes = lanes;
      return elements;
    }(...__args);
  };
  __ST.createFiberFromElement = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (element, mode, lanes) {
      mode = __ST.createFiberFromTypeAndProps(element.type, element.key, element.props, element._owner, mode, lanes);
      mode._debugOwner = element._owner;
      mode._debugStack = element._debugStack;
      mode._debugTask = element._debugTask;
      return mode;
    }(...__args);
  };
  __ST.createFiberFromTypeAndProps = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (__type, key, pendingProps, owner, mode, lanes) {
      let fiberTag, resolvedType;
      fiberTag = 0;
      resolvedType = __type;
      if ("function" === typeOfJS(__type)) __ST.shouldConstruct(__type) && (fiberTag = 1), resolvedType = __ST.resolveFunctionForHotReloading(resolvedType);else if ("string" === typeOfJS(__type)) __ST.supportsResources && __ST.supportsSingletons ? (fiberTag = __ST.getHostContext(), fiberTag = __ST.isHostHoistableType(__type, pendingProps, fiberTag) ? 26 : __ST.isHostSingletonType(__type) ? 27 : 5) : __ST.supportsResources ? (fiberTag = __ST.getHostContext(), fiberTag = __ST.isHostHoistableType(__type, pendingProps, fiberTag) ? 26 : 5) : fiberTag = __ST.supportsSingletons ? __ST.isHostSingletonType(__type) ? 27 : 5 : 5;else {
        let __lb_0 = false,
          __lc_0 = false;
        while (!__lb_0) {
          switch (__type) {
            case __ST.REACT_ACTIVITY_TYPE:
              return key = __ST.createFiber(31, pendingProps, key, mode), key.elementType = __ST.REACT_ACTIVITY_TYPE, key.lanes = lanes, key;
            case __ST.REACT_FRAGMENT_TYPE:
              return __ST.createFiberFromFragment(pendingProps.children, mode, lanes, key);
            case __ST.REACT_STRICT_MODE_TYPE:
              fiberTag = 8;
              mode |= 24;
              break;
            case __ST.REACT_PROFILER_TYPE:
              return __type = pendingProps, owner = mode, "string" !== typeOfJS(__type.id) && console.error('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeOfJS(__type.id)), key = __ST.createFiber(12, __type, key, owner | 2), key.elementType = __ST.REACT_PROFILER_TYPE, key.lanes = lanes, key.stateNode = {
                effectDuration: 0,
                passiveEffectDuration: 0
              }, key;
            case __ST.REACT_SUSPENSE_TYPE:
              return key = __ST.createFiber(13, pendingProps, key, mode), key.elementType = __ST.REACT_SUSPENSE_TYPE, key.lanes = lanes, key;
            case __ST.REACT_SUSPENSE_LIST_TYPE:
              return key = __ST.createFiber(19, pendingProps, key, mode), key.elementType = __ST.REACT_SUSPENSE_LIST_TYPE, key.lanes = lanes, key;
            default:
              if ("object" === typeOfJS(__type) && undefined !== __type) switch (__type.$$typeof) {
                case __ST.REACT_CONTEXT_TYPE:
                  fiberTag = 10;
                  {
                    __lb_0 = true;
                    break;
                  }
                case __ST.REACT_CONSUMER_TYPE:
                  fiberTag = 9;
                  {
                    __lb_0 = true;
                    break;
                  }
                case __ST.REACT_FORWARD_REF_TYPE:
                  fiberTag = 11;
                  resolvedType = __ST.resolveForwardRefForHotReloading(resolvedType);
                  {
                    __lb_0 = true;
                    break;
                  }
                case __ST.REACT_MEMO_TYPE:
                  fiberTag = 14;
                  {
                    __lb_0 = true;
                    break;
                  }
                case __ST.REACT_LAZY_TYPE:
                  fiberTag = 16;
                  resolvedType = undefined;
                  {
                    __lb_0 = true;
                    break;
                  }
              }
              resolvedType = "";
              if (void 0 === __type || "object" === typeOfJS(__type) && undefined !== __type && 0 === __len(Object.keys(__type))) resolvedType += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              undefined === __type ? pendingProps = "null" : __ST.isArrayImpl(__type) ? pendingProps = "array" : void 0 !== __type && __type.$$typeof === __ST.REACT_ELEMENT_TYPE ? (pendingProps = __cat(__cat("<", __ST.getComponentNameFromType(__type.type) || "Unknown"), " />"), resolvedType = " Did you accidentally export a JSX literal instead of a component?") : pendingProps = typeOfJS(__type);
              fiberTag = owner ? "number" === typeOfJS(owner.tag) ? __ST.getComponentNameFromFiber(owner) : "string" === typeOfJS(owner.name) ? owner.name : undefined : undefined;
              fiberTag && (resolvedType += __cat(__cat("\n\nCheck the render method of `", fiberTag), "`."));
              fiberTag = 29;
              pendingProps = Error(__cat("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: ", __cat(__cat(pendingProps, "."), resolvedType)));
              resolvedType = undefined;
          }
          break;
        }
      }
      key = __ST.createFiber(fiberTag, pendingProps, key, mode);
      key.elementType = __type;
      key.type = resolvedType;
      key.lanes = lanes;
      key._debugOwner = owner;
      return key;
    }(...__args);
  };
  __ST.resetWorkInProgress = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, renderLanes) {
      let current;
      workInProgress.flags &= 65011714;
      current = workInProgress.alternate;
      undefined === current ? (workInProgress.childLanes = 0, workInProgress.lanes = renderLanes, workInProgress.child = undefined, workInProgress.subtreeFlags = 0, workInProgress.memoizedProps = undefined, workInProgress.memoizedState = undefined, workInProgress.updateQueue = undefined, workInProgress.dependencies = undefined, workInProgress.stateNode = undefined, workInProgress.selfBaseDuration = 0, workInProgress.treeBaseDuration = 0) : (workInProgress.childLanes = current.childLanes, workInProgress.lanes = current.lanes, workInProgress.child = current.child, workInProgress.subtreeFlags = 0, workInProgress.deletions = undefined, workInProgress.memoizedProps = current.memoizedProps, workInProgress.memoizedState = current.memoizedState, workInProgress.updateQueue = current.updateQueue, workInProgress.type = current.type, renderLanes = current.dependencies, workInProgress.dependencies = undefined === renderLanes ? undefined : {
        lanes: renderLanes.lanes,
        firstContext: renderLanes.firstContext,
        _debugThenableState: renderLanes._debugThenableState
      }, workInProgress.selfBaseDuration = current.selfBaseDuration, workInProgress.treeBaseDuration = current.treeBaseDuration);
      return workInProgress;
    }(...__args);
  };
  __ST.createWorkInProgress = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, pendingProps) {
      let workInProgress;
      workInProgress = current.alternate;
      undefined === workInProgress ? (workInProgress = __ST.createFiber(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress._debugOwner = current._debugOwner, workInProgress._debugStack = current._debugStack, workInProgress._debugTask = current._debugTask, workInProgress._debugHookTypes = current._debugHookTypes, workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, workInProgress.type = current.type, workInProgress.flags = 0, workInProgress.subtreeFlags = 0, workInProgress.deletions = undefined, workInProgress.actualDuration = -0, workInProgress.actualStartTime = -1.1);
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
          workInProgress.type = __ST.resolveFunctionForHotReloading(current.type);
          break;
        case 1:
          workInProgress.type = __ST.resolveFunctionForHotReloading(current.type);
          break;
        case 11:
          workInProgress.type = __ST.resolveForwardRefForHotReloading(current.type);
      }
      return workInProgress;
    }(...__args);
  };
  __ST.shouldConstruct = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (Component) {
      Component = __protoOf(Component);
      return !(!Component || !Component.isReactComponent);
    }(...__args);
  };
  __ST.FiberNode = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (__self, tag, pendingProps, key, mode) {
      __self.tag = tag;
      __self.key = key;
      __self.sibling = __self.child = __self.return = __self.stateNode = __self.type = __self.elementType = undefined;
      __self.index = 0;
      __self.refCleanup = __self.ref = undefined;
      __self.pendingProps = pendingProps;
      __self.dependencies = __self.memoizedState = __self.updateQueue = __self.memoizedProps = undefined;
      __self.mode = mode;
      __self.subtreeFlags = __self.flags = 0;
      __self.deletions = undefined;
      __self.childLanes = __self.lanes = 0;
      __self.alternate = undefined;
      __self.actualDuration = -0;
      __self.actualStartTime = -1.1;
      __self.treeBaseDuration = __self.selfBaseDuration = -0;
      __self._debugTask = __self._debugStack = __self._debugOwner = __self._debugInfo = undefined;
      __self._debugNeedsRemount = !1;
      __self._debugHookTypes = undefined;
      __ST.hasBadMapPolyfill || "function" !== typeOfJS(Object.preventExtensions) || Object.preventExtensions(__self);
    }(...__args);
  };
  __ST.scheduleFibersWithFamiliesRecursively = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, updatedFamilies, staleFamilies) {
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
        if (undefined === __ST.resolveFamily) throw Error("Expected resolveFamily to be set during hot reload.");
        needsRender = !1;
        _fiber = !1;
        undefined !== candidateType && (candidateType = __ST.resolveFamily(candidateType), void 0 !== candidateType && (staleFamilies.has(candidateType) ? _fiber = !0 : updatedFamilies.has(candidateType) && (1 === tag ? _fiber = !0 : needsRender = !0)));
        undefined !== __ST.failedBoundaries && (__ST.failedBoundaries.has(fiber) || undefined !== alternate && __ST.failedBoundaries.has(alternate)) && (_fiber = !0);
        _fiber && (fiber._debugNeedsRemount = !0);
        if (_fiber || needsRender) alternate = __ST.enqueueConcurrentRenderForLane(fiber, 2), undefined !== alternate && __ST.scheduleUpdateOnFiber(alternate, fiber, 2);
        undefined === child || _fiber || __ST.scheduleFibersWithFamiliesRecursively(child, updatedFamilies, staleFamilies);
        if (undefined === sibling) break;
        fiber = sibling;
      } while (1);
    }(...__args);
  };
  __ST.markFailedErrorBoundaryForHotReloading = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      undefined !== __ST.resolveFamily && "function" === typeOfJS(WeakSet) && (undefined === __ST.failedBoundaries && (__ST.failedBoundaries = __new(WeakSet)), __ST.failedBoundaries.add(fiber));
    }(...__args);
  };
  __ST.isCompatibleFamilyForHotReloading = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, element) {
      let prevType, needsCompareFamilies, __typeofNextType;
      if (undefined === __ST.resolveFamily) return !1;
      prevType = fiber.elementType;
      element = element.type;
      needsCompareFamilies = !1;
      __typeofNextType = "object" === typeOfJS(element) && undefined !== element ? element.$$typeof : undefined;
      switch (fiber.tag) {
        case 1:
          "function" === typeOfJS(element) && (needsCompareFamilies = !0);
          break;
        case 0:
          "function" === typeOfJS(element) ? needsCompareFamilies = !0 : __typeofNextType === __ST.REACT_LAZY_TYPE && (needsCompareFamilies = !0);
          break;
        case 11:
          __typeofNextType === __ST.REACT_FORWARD_REF_TYPE ? needsCompareFamilies = !0 : __typeofNextType === __ST.REACT_LAZY_TYPE && (needsCompareFamilies = !0);
          break;
        case 14:
        case 15:
          __typeofNextType === __ST.REACT_MEMO_TYPE ? needsCompareFamilies = !0 : __typeofNextType === __ST.REACT_LAZY_TYPE && (needsCompareFamilies = !0);
          break;
        default:
          return !1;
      }
      return needsCompareFamilies && (fiber = __ST.resolveFamily(prevType), void 0 !== fiber && fiber === __ST.resolveFamily(element)) ? !0 : !1;
    }(...__args);
  };
  __ST.resolveForwardRefForHotReloading = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (__type) {
      let family;
      if (undefined === __ST.resolveFamily) return __type;
      family = __ST.resolveFamily(__type);
      return void 0 === family ? undefined !== __type && void 0 !== __type && "function" === typeOfJS(__type.render) && (family = __ST.resolveFunctionForHotReloading(__type.render), __type.render !== family) ? (family = {
        $$typeof: __ST.REACT_FORWARD_REF_TYPE,
        render: family
      }, void 0 !== __type.displayName && (family.displayName = __type.displayName), family) : __type : family.current;
    }(...__args);
  };
  __ST.resolveFunctionForHotReloading = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (__type) {
      let family;
      if (undefined === __ST.resolveFamily) return __type;
      family = __ST.resolveFamily(__type);
      return void 0 === family ? __type : family.current;
    }(...__args);
  };
  __ST.warnIfUpdatesNotWrappedWithActDEV = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      __ST.isConcurrentActEnvironment() && undefined === __ST.ReactSharedInternals.actQueue && __ST.runWithFiberInDEV(fiber, function () {
        console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", __ST.getComponentNameFromFiber(fiber));
      });
    }(...__args);
  };
  __ST.scheduleCallback = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (priorityLevel, callback) {
      let actQueue;
      actQueue = __ST.ReactSharedInternals.actQueue;
      return undefined !== actQueue ? (__push(actQueue, callback), __ST.fakeActCallbackNode) : __ST.scheduleCallback_3(priorityLevel, callback);
    }(...__args);
  };
  __ST.restorePendingUpdaters = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, lanes) {
      __ST.isDevToolsPresent && __forEach(root.memoizedUpdaters, function (schedulingFiber) {
        __ST.addFiberToLanesMap(root, schedulingFiber, lanes);
      });
    }(...__args);
  };
  __ST.warnAboutUpdateOnNotYetMountedFiberInDEV = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let tag;
      if ((__ST.executionContext & __ST.RenderContext) === __ST.NoContext) {
        tag = fiber.tag;
        if (3 === tag || 1 === tag || 0 === tag || 11 === tag || 14 === tag || 15 === tag) {
          tag = __ST.getComponentNameFromFiber(fiber) || "ReactComponent";
          if (undefined !== __ST.didWarnStateUpdateForNotYetMountedComponent) {
            if (__ST.didWarnStateUpdateForNotYetMountedComponent.has(tag)) return;
            __ST.didWarnStateUpdateForNotYetMountedComponent.add(tag);
          } else __ST.didWarnStateUpdateForNotYetMountedComponent = __new(Set, __arrNew(tag));
          __ST.runWithFiberInDEV(fiber, function () {
            console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
          });
        }
      }
    }(...__args);
  };
  __ST.commitDoubleInvokeEffectsInDEV = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root) {
      let doubleInvokeEffects;
      doubleInvokeEffects = !0;
      root.current.mode & 24 || (doubleInvokeEffects = !1);
      __ST.recursivelyTraverseAndDoubleInvokeEffectsInDEV(root, root.current, doubleInvokeEffects);
    }(...__args);
  };
  __ST.doubleInvokeEffectsOnFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, fiber) {
      __ST.setIsStrictModeForDevtools(!0);
      try {
        __ST.disappearLayoutEffects(fiber), __ST.disconnectPassiveEffect(fiber), __ST.reappearLayoutEffects(root, fiber.alternate, fiber, !1), __ST.reconnectPassiveEffects(root, fiber, 0, undefined, !1, 0);
      } finally {
        __ST.setIsStrictModeForDevtools(!1);
      }
    }(...__args);
  };
  __ST.recursivelyTraverseAndDoubleInvokeEffectsInDEV = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root_jscomp_0, parentFiber, isInStrictMode) {
      let root, fiber, isStrictModeFiber;
      if (0 !== (parentFiber.subtreeFlags & 67117056)) for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
        root = root_jscomp_0;
        fiber = parentFiber;
        isStrictModeFiber = fiber.type === __ST.REACT_STRICT_MODE_TYPE;
        isStrictModeFiber = isInStrictMode || isStrictModeFiber;
        22 !== fiber.tag ? fiber.flags & 67108864 ? isStrictModeFiber && __ST.runWithFiberInDEV(fiber, __ST.doubleInvokeEffectsOnFiber, root, fiber) : __ST.recursivelyTraverseAndDoubleInvokeEffectsInDEV(root, fiber, isStrictModeFiber) : undefined === fiber.memoizedState && (isStrictModeFiber && fiber.flags & 8192 ? __ST.runWithFiberInDEV(fiber, __ST.doubleInvokeEffectsOnFiber, root, fiber) : fiber.subtreeFlags & 67108864 && __ST.runWithFiberInDEV(fiber, __ST.recursivelyTraverseAndDoubleInvokeEffectsInDEV, root, fiber, isStrictModeFiber));
        parentFiber = parentFiber.sibling;
      }
    }(...__args);
  };
  __ST.resolveRetryWakeable = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (boundaryFiber, wakeable) {
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
      __ST.retryTimedOutBoundary(boundaryFiber, retryLane);
    }(...__args);
  };
  __ST.retryDehydratedSuspenseBoundary = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (boundaryFiber) {
      let suspenseState, retryLane;
      suspenseState = boundaryFiber.memoizedState;
      retryLane = 0;
      undefined !== suspenseState && (retryLane = suspenseState.retryLane);
      __ST.retryTimedOutBoundary(boundaryFiber, retryLane);
    }(...__args);
  };
  __ST.retryTimedOutBoundary = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (boundaryFiber, retryLane) {
      0 === retryLane && (retryLane = __ST.claimNextRetryLane());
      boundaryFiber = __ST.enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
      undefined !== boundaryFiber && (__ST.markRootUpdated_1(boundaryFiber, retryLane), __ST.ensureRootIsScheduled(boundaryFiber));
    }(...__args);
  };
  __ST.pingSuspendedRoot = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, wakeable, pingedLanes) {
      let pingCache;
      pingCache = root.pingCache;
      undefined !== pingCache && pingCache.delete(wakeable);
      root.pingedLanes |= root.suspendedLanes & pingedLanes;
      root.warmLanes &= ~pingedLanes;
      0 !== (pingedLanes & 127) ? 0 > __ST.blockingUpdateTime && (__ST.blockingClampTime = __ST.blockingUpdateTime = __ST.now(), __ST.blockingUpdateTask = __ST.createTask("Promise Resolved"), __ST.blockingUpdateType = 2) : 0 !== (pingedLanes & 4194048) && 0 > __ST.transitionUpdateTime && (__ST.transitionClampTime = __ST.transitionUpdateTime = __ST.now(), __ST.transitionUpdateTask = __ST.createTask("Promise Resolved"), __ST.transitionUpdateType = 2);
      __ST.isConcurrentActEnvironment() && undefined === __ST.ReactSharedInternals.actQueue && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act");
      __ST.workInProgressRoot === root && (__ST.workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (__ST.workInProgressRootExitStatus === __ST.RootSuspendedWithDelay || __ST.workInProgressRootExitStatus === __ST.RootSuspended && (__ST.workInProgressRootRenderLanes & 62914560) === __ST.workInProgressRootRenderLanes && __ST.now_1() - __ST.globalMostRecentFallbackTime < __ST.FALLBACK_THROTTLE_MS ? (__ST.executionContext & __ST.RenderContext) === __ST.NoContext && __ST.prepareFreshStack(root, 0) : __ST.workInProgressRootPingedLanes |= pingedLanes, __ST.workInProgressSuspendedRetryLanes === __ST.workInProgressRootRenderLanes && (__ST.workInProgressSuspendedRetryLanes = 0));
      __ST.ensureRootIsScheduled(root);
    }(...__args);
  };
  __ST.attachPingListener = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, wakeable, lanes) {
      let pingCache, threadIDs;
      pingCache = root.pingCache;
      if (undefined === pingCache) {
        pingCache = root.pingCache = __new(__ST.PossiblyWeakMap);
        threadIDs = __new(Set);
        pingCache.set(wakeable, threadIDs);
      } else threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = __new(Set), pingCache.set(wakeable, threadIDs));
      threadIDs.has(lanes) || (__ST.workInProgressRootDidAttachPingListener = !0, threadIDs.add(lanes), pingCache = __partial((..._bindArgs52) => __applyFn(__ST.pingSuspendedRoot, ..._bindArgs52), undefined, root, wakeable, lanes), __ST.isDevToolsPresent && __ST.restorePendingUpdaters(root, lanes), wakeable.then(pingCache, pingCache));
    }(...__args);
  };
  __ST.captureCommitPhaseError = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (sourceFiber, nearestMountedAncestor, __error) {
      let instance;
      __ST.isRunningInsertionEffect = !1;
      if (3 === sourceFiber.tag) __ST.captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, __error);else {
        for (; undefined !== nearestMountedAncestor;) {
          if (3 === nearestMountedAncestor.tag) {
            __ST.captureCommitPhaseErrorOnRoot(nearestMountedAncestor, sourceFiber, __error);
            return;
          }
          if (1 === nearestMountedAncestor.tag) {
            instance = nearestMountedAncestor.stateNode;
            if ("function" === typeOfJS(nearestMountedAncestor.type.getDerivedStateFromError) || "function" === typeOfJS(instance.componentDidCatch) && (undefined === __ST.legacyErrorBoundariesThatAlreadyFailed || !__ST.legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
              sourceFiber = __ST.createCapturedValueAtFiber(__error, sourceFiber);
              __ST.recordEffectError(sourceFiber);
              __error = __ST.createClassErrorUpdate(2);
              instance = __ST.enqueueUpdate(nearestMountedAncestor, __error, 2);
              undefined !== instance && (__ST.initializeClassErrorUpdate(__error, instance, nearestMountedAncestor, sourceFiber), __ST.markRootUpdated_1(instance, 2), __ST.ensureRootIsScheduled(instance));
              return;
            }
          }
          nearestMountedAncestor = nearestMountedAncestor.return;
        }
        console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", __error);
      }
    }(...__args);
  };
  __ST.captureCommitPhaseErrorOnRoot = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (rootFiber, sourceFiber, __error) {
      sourceFiber = __ST.createCapturedValueAtFiber(__error, sourceFiber);
      __ST.recordEffectError(sourceFiber);
      sourceFiber = __ST.createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
      rootFiber = __ST.enqueueUpdate(rootFiber, sourceFiber, 2);
      undefined !== rootFiber && (__ST.markRootUpdated_1(rootFiber, 2), __ST.ensureRootIsScheduled(rootFiber));
    }(...__args);
  };
  __ST.flushPassiveEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let root, remainingLanes, renderPriority, priority, previousPriority, transitions, lanes, passiveEffectStartTime, startTime, endTime, delayedUntilPaint, finishedWork, finishedWork_jscomp_0, passiveEffectsEndTime, stateNode;
      if (__ST.pendingEffectsStatus !== __ST.PENDING_PASSIVE_PHASE) return !1;
      root = __ST.pendingEffectsRoot;
      remainingLanes = __ST.pendingEffectsRemainingLanes;
      __ST.pendingEffectsRemainingLanes = 0;
      renderPriority = __ST.lanesToEventPriority(__ST.pendingEffectsLanes);
      priority = 32 > renderPriority ? 32 : renderPriority;
      renderPriority = __ST.ReactSharedInternals.T;
      previousPriority = __ST.getCurrentUpdatePriority();
      try {
        __ST.setCurrentUpdatePriority(priority);
        __ST.ReactSharedInternals.T = undefined;
        transitions = __ST.pendingPassiveTransitions;
        __ST.pendingPassiveTransitions = undefined;
        priority = __ST.pendingEffectsRoot;
        lanes = __ST.pendingEffectsLanes;
        __ST.pendingEffectsStatus = __ST.NO_PENDING_EFFECTS;
        __ST.pendingFinishedWork = __ST.pendingEffectsRoot = undefined;
        __ST.pendingEffectsLanes = 0;
        if ((__ST.executionContext & (__ST.RenderContext | __ST.CommitContext)) !== __ST.NoContext) throw Error("Cannot flush passive effects while already rendering.");
        __ST.setCurrentTrackFromLanes(lanes);
        __ST.isFlushingPassiveEffects = !0;
        __ST.didScheduleUpdateDuringPassiveEffects = !1;
        passiveEffectStartTime = 0;
        __ST.commitErrors = undefined;
        passiveEffectStartTime = __ST.now_1();
        if (__ST.pendingDelayedCommitReason === __ST.ANIMATION_STARTED_COMMIT) {
          startTime = __ST.commitEndTime;
          endTime = passiveEffectStartTime;
          !__ST.supportsUserTiming || endTime <= startTime || (__ST.animatingTask ? __ST.animatingTask.run(__partial((..._bindArgs49) => __applyFn(console.timeStamp, ..._bindArgs49), console, "Animating", startTime, endTime, __ST.currentTrack, "Scheduler \u269b", "secondary-dark")) : console.timeStamp("Animating", startTime, endTime, __ST.currentTrack, "Scheduler \u269b", "secondary-dark"));
        } else {
          startTime = __ST.commitEndTime;
          endTime = passiveEffectStartTime;
          delayedUntilPaint = __ST.pendingDelayedCommitReason === __ST.DELAYED_PASSIVE_COMMIT;
          !__ST.supportsUserTiming || endTime <= startTime || (__ST.workInProgressUpdateTask ? __ST.workInProgressUpdateTask.run(__partial((..._bindArgs50) => __applyFn(console.timeStamp, ..._bindArgs50), console, delayedUntilPaint ? "Waiting for Paint" : "Waiting", startTime, endTime, __ST.currentTrack, "Scheduler \u269b", "secondary-light")) : console.timeStamp(delayedUntilPaint ? "Waiting for Paint" : "Waiting", startTime, endTime, __ST.currentTrack, "Scheduler \u269b", "secondary-light"));
        }
        startTime = __ST.executionContext;
        __ST.executionContext |= __ST.CommitContext;
        finishedWork = priority.current;
        __ST.resetComponentEffectTimers();
        __ST.commitPassiveUnmountOnFiber(finishedWork);
        finishedWork_jscomp_0 = priority.current;
        finishedWork = __ST.pendingEffectsRenderEndTime;
        __ST.resetComponentEffectTimers();
        __ST.commitPassiveMountOnFiber(priority, finishedWork_jscomp_0, lanes, transitions, finishedWork);
        __ST.commitDoubleInvokeEffectsInDEV(priority);
        __ST.executionContext = startTime;
        passiveEffectsEndTime = __ST.now_1();
        finishedWork_jscomp_0 = passiveEffectStartTime;
        finishedWork = __ST.workInProgressUpdateTask;
        undefined !== __ST.commitErrors ? __ST.logCommitErrored(finishedWork_jscomp_0, passiveEffectsEndTime, __ST.commitErrors, !0, finishedWork) : !__ST.supportsUserTiming || passiveEffectsEndTime <= finishedWork_jscomp_0 || (finishedWork ? finishedWork.run(__partial((..._bindArgs51) => __applyFn(console.timeStamp, ..._bindArgs51), console, "Remaining Effects", finishedWork_jscomp_0, passiveEffectsEndTime, __ST.currentTrack, "Scheduler \u269b", "secondary-dark")) : console.timeStamp("Remaining Effects", finishedWork_jscomp_0, passiveEffectsEndTime, __ST.currentTrack, "Scheduler \u269b", "secondary-dark"));
        __ST.finalizeRender(lanes, passiveEffectsEndTime);
        __ST.flushSyncWorkAcrossRoots_impl(0, !1);
        __ST.didScheduleUpdateDuringPassiveEffects ? priority === __ST.rootWithPassiveNestedUpdates ? __ST.nestedPassiveUpdateCount++ : (__ST.nestedPassiveUpdateCount = 0, __ST.rootWithPassiveNestedUpdates = priority) : __ST.nestedPassiveUpdateCount = 0;
        __ST.didScheduleUpdateDuringPassiveEffects = __ST.isFlushingPassiveEffects = !1;
        if (__ST.injectedHook && "function" === typeOfJS(__ST.injectedHook.onPostCommitFiberRoot)) try {
          __ST.injectedHook.onPostCommitFiberRoot(__ST.rendererID, priority);
        } catch (err) {
          __ST.hasLoggedError || (__ST.hasLoggedError = !0, console.error("React instrumentation encountered an error: %o", err));
        }
        stateNode = priority.current.stateNode;
        stateNode.effectDuration = 0;
        stateNode.passiveEffectDuration = 0;
        return !0;
      } finally {
        __ST.setCurrentUpdatePriority(previousPriority), __ST.ReactSharedInternals.T = renderPriority, __ST.releaseRootPooledCache(root, remainingLanes);
      }
    }(...__args);
  };
  __ST.flushPendingEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.flushMutationEffects();
      __ST.flushLayoutEffects();
      __ST.flushSpawnedWork();
      return __ST.flushPassiveEffects();
    }(...__args);
  };
  __ST.releaseRootPooledCache = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, remainingLanes) {
      0 === (root.pooledCacheLanes &= remainingLanes) && (remainingLanes = root.pooledCache, remainingLanes !== undefined && (root.pooledCache = undefined, __ST.releaseCache(remainingLanes)));
    }(...__args);
  };
  __ST.makeErrorInfo = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (componentStack) {
      componentStack = {
        componentStack: componentStack
      };
      Object.defineProperty(componentStack, "digest", {
        get: function () {
          console.error('You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.');
        }
      });
      return componentStack;
    }(...__args);
  };
  __ST.flushSpawnedWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let startViewTransitionStartTime, endTime, abortedViewTransition, finishedWork, rootDidHavePassiveEffects, remainingLanes, didError, schedulerPriority, onRecoverableError, recoverableError, errorInfo;
      if (__ST.pendingEffectsStatus === __ST.PENDING_SPAWNED_WORK || __ST.pendingEffectsStatus === __ST.PENDING_AFTER_MUTATION_PHASE) {
        if (__ST.pendingEffectsStatus === __ST.PENDING_SPAWNED_WORK) {
          startViewTransitionStartTime = __ST.commitEndTime;
          __ST.commitEndTime = __ST.now();
          endTime = __ST.commitEndTime;
          abortedViewTransition = __ST.pendingDelayedCommitReason === __ST.ABORTED_VIEW_TRANSITION_COMMIT;
          !__ST.supportsUserTiming || endTime <= startViewTransitionStartTime || (__ST.animatingTask ? __ST.animatingTask.run(__partial((..._bindArgs48) => __applyFn(console.timeStamp, ..._bindArgs48), console, abortedViewTransition ? "Interrupted View Transition" : "Starting Animation", startViewTransitionStartTime, endTime, __ST.currentTrack, "Scheduler \u269b", abortedViewTransition ? "error" : "secondary-light")) : console.timeStamp(abortedViewTransition ? "Interrupted View Transition" : "Starting Animation", startViewTransitionStartTime, endTime, __ST.currentTrack, "Scheduler \u269b", abortedViewTransition ? " error" : "secondary-light"));
          __ST.pendingDelayedCommitReason !== __ST.ABORTED_VIEW_TRANSITION_COMMIT && (__ST.pendingDelayedCommitReason = __ST.ANIMATION_STARTED_COMMIT);
        }
        __ST.pendingEffectsStatus = __ST.NO_PENDING_EFFECTS;
        __ST.requestPaint();
        startViewTransitionStartTime = __ST.pendingEffectsRoot;
        finishedWork = __ST.pendingFinishedWork;
        endTime = __ST.pendingEffectsLanes;
        abortedViewTransition = __ST.pendingRecoverableErrors;
        rootDidHavePassiveEffects = 0 !== finishedWork.actualDuration || 0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256);
        rootDidHavePassiveEffects ? __ST.pendingEffectsStatus = __ST.PENDING_PASSIVE_PHASE : (__ST.pendingEffectsStatus = __ST.NO_PENDING_EFFECTS, __ST.pendingFinishedWork = __ST.pendingEffectsRoot = undefined, __ST.releaseRootPooledCache(startViewTransitionStartTime, startViewTransitionStartTime.pendingLanes), __ST.nestedPassiveUpdateCount = 0, __ST.rootWithPassiveNestedUpdates = undefined);
        remainingLanes = startViewTransitionStartTime.pendingLanes;
        0 === remainingLanes && (__ST.legacyErrorBoundariesThatAlreadyFailed = undefined);
        rootDidHavePassiveEffects || __ST.commitDoubleInvokeEffectsInDEV(startViewTransitionStartTime);
        remainingLanes = __ST.lanesToEventPriority(endTime);
        finishedWork = finishedWork.stateNode;
        if (__ST.injectedHook && "function" === typeOfJS(__ST.injectedHook.onCommitFiberRoot)) try {
          didError = 128 === (finishedWork.current.flags & 128);
          switch (remainingLanes) {
            case 2:
              schedulerPriority = __ST.ImmediatePriority;
              break;
            case 8:
              schedulerPriority = __ST.UserBlockingPriority;
              break;
            case 32:
              schedulerPriority = __ST.NormalPriority_1;
              break;
            case 268435456:
              schedulerPriority = __ST.IdlePriority;
              break;
            default:
              schedulerPriority = __ST.NormalPriority_1;
          }
          __ST.injectedHook.onCommitFiberRoot(__ST.rendererID, finishedWork, schedulerPriority, didError);
        } catch (err) {
          __ST.hasLoggedError || (__ST.hasLoggedError = !0, console.error("React instrumentation encountered an error: %o", err));
        }
        __ST.isDevToolsPresent && startViewTransitionStartTime.memoizedUpdaters.clear();
        __ST.onCommitRoot();
        if (undefined !== abortedViewTransition) {
          didError = __ST.ReactSharedInternals.T;
          schedulerPriority = __ST.getCurrentUpdatePriority();
          __ST.setCurrentUpdatePriority(2);
          __ST.ReactSharedInternals.T = undefined;
          try {
            onRecoverableError = startViewTransitionStartTime.onRecoverableError;
            for (finishedWork = 0; finishedWork < __len(abortedViewTransition); finishedWork++) {
              recoverableError = abortedViewTransition[finishedWork];
              errorInfo = __ST.makeErrorInfo(recoverableError.stack);
              __ST.runWithFiberInDEV(recoverableError.source, onRecoverableError, recoverableError.value, errorInfo);
            }
          } finally {
            __ST.ReactSharedInternals.T = didError, __ST.setCurrentUpdatePriority(schedulerPriority);
          }
        }
        0 !== (__ST.pendingEffectsLanes & 3) && __ST.flushPendingEffects();
        __ST.ensureRootIsScheduled(startViewTransitionStartTime);
        remainingLanes = startViewTransitionStartTime.pendingLanes;
        0 !== (endTime & 261930) && 0 !== (remainingLanes & 42) ? (__ST.nestedUpdateScheduled = !0, startViewTransitionStartTime === __ST.rootWithNestedUpdates ? __ST.nestedUpdateCount++ : (__ST.nestedUpdateCount = 0, __ST.rootWithNestedUpdates = startViewTransitionStartTime)) : __ST.nestedUpdateCount = 0;
        rootDidHavePassiveEffects || __ST.finalizeRender(endTime, __ST.commitEndTime);
        __ST.supportsHydration && __ST.flushHydrationEvents();
        __ST.flushSyncWorkAcrossRoots_impl(0, !1);
      }
    }(...__args);
  };
  __ST.flushLayoutEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let suspendedViewTransitionReason, startTime, endTime, rootHasLayoutEffect, _previousPriority, _prevExecutionContext;
      if (__ST.pendingEffectsStatus === __ST.PENDING_LAYOUT_PHASE) {
        __ST.pendingEffectsStatus = __ST.NO_PENDING_EFFECTS;
        suspendedViewTransitionReason = __ST.pendingSuspendedViewTransitionReason;
        if (undefined !== suspendedViewTransitionReason) {
          __ST.commitStartTime = __ST.now();
          startTime = __ST.commitEndTime;
          endTime = __ST.commitStartTime;
          !__ST.supportsUserTiming || endTime <= startTime || (__ST.animatingTask ? __ST.animatingTask.run(__partial((..._bindArgs46) => __applyFn(console.timeStamp, ..._bindArgs46), console, suspendedViewTransitionReason, startTime, endTime, __ST.currentTrack, "Scheduler \u269b", "secondary-light")) : console.timeStamp(suspendedViewTransitionReason, startTime, endTime, __ST.currentTrack, "Scheduler \u269b", "secondary-light"));
        }
        suspendedViewTransitionReason = __ST.pendingEffectsRoot;
        startTime = __ST.pendingFinishedWork;
        endTime = __ST.pendingEffectsLanes;
        rootHasLayoutEffect = 0 !== (startTime.flags & 8772);
        if (0 !== (startTime.subtreeFlags & 8772) || rootHasLayoutEffect) {
          rootHasLayoutEffect = __ST.ReactSharedInternals.T;
          __ST.ReactSharedInternals.T = undefined;
          _previousPriority = __ST.getCurrentUpdatePriority();
          __ST.setCurrentUpdatePriority(2);
          _prevExecutionContext = __ST.executionContext;
          __ST.executionContext |= __ST.CommitContext;
          try {
            __ST.inProgressLanes = endTime, __ST.inProgressRoot = suspendedViewTransitionReason, __ST.resetComponentEffectTimers(), __ST.commitLayoutEffectOnFiber(suspendedViewTransitionReason, startTime.alternate, startTime), __ST.inProgressRoot = __ST.inProgressLanes = undefined;
          } finally {
            __ST.executionContext = _prevExecutionContext, __ST.setCurrentUpdatePriority(_previousPriority), __ST.ReactSharedInternals.T = rootHasLayoutEffect;
          }
        }
        suspendedViewTransitionReason = __ST.pendingEffectsRenderEndTime;
        startTime = __ST.pendingSuspendedCommitReason;
        __ST.commitEndTime = __ST.now();
        suspendedViewTransitionReason = undefined === startTime ? suspendedViewTransitionReason : __ST.commitStartTime;
        startTime = __ST.commitEndTime;
        endTime = __ST.pendingDelayedCommitReason === __ST.ABORTED_VIEW_TRANSITION_COMMIT;
        rootHasLayoutEffect = __ST.workInProgressUpdateTask;
        undefined !== __ST.commitErrors ? __ST.logCommitErrored(suspendedViewTransitionReason, startTime, __ST.commitErrors, !1, rootHasLayoutEffect) : !__ST.supportsUserTiming || startTime <= suspendedViewTransitionReason || (rootHasLayoutEffect ? rootHasLayoutEffect.run(__partial((..._bindArgs47) => __applyFn(console.timeStamp, ..._bindArgs47), console, endTime ? "Commit Interrupted View Transition" : "Commit", suspendedViewTransitionReason, startTime, __ST.currentTrack, "Scheduler \u269b", endTime ? "error" : "secondary-dark")) : console.timeStamp(endTime ? "Commit Interrupted View Transition" : "Commit", suspendedViewTransitionReason, startTime, __ST.currentTrack, "Scheduler \u269b", endTime ? "error" : "secondary-dark"));
        __ST.pendingEffectsStatus = __ST.PENDING_AFTER_MUTATION_PHASE;
      }
    }(...__args);
  };
  __ST.flushMutationEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let root, finishedWork, lanes, rootMutationHasEffect, previousPriority, prevExecutionContext;
      if (__ST.pendingEffectsStatus === __ST.PENDING_MUTATION_PHASE) {
        __ST.pendingEffectsStatus = __ST.NO_PENDING_EFFECTS;
        root = __ST.pendingEffectsRoot;
        finishedWork = __ST.pendingFinishedWork;
        lanes = __ST.pendingEffectsLanes;
        rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
        if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
          rootMutationHasEffect = __ST.ReactSharedInternals.T;
          __ST.ReactSharedInternals.T = undefined;
          previousPriority = __ST.getCurrentUpdatePriority();
          __ST.setCurrentUpdatePriority(2);
          prevExecutionContext = __ST.executionContext;
          __ST.executionContext |= __ST.CommitContext;
          try {
            __ST.inProgressLanes = lanes, __ST.inProgressRoot = root, __ST.resetComponentEffectTimers(), __ST.commitMutationEffectsOnFiber(finishedWork, root), __ST.inProgressRoot = __ST.inProgressLanes = undefined, __ST.resetAfterCommit(root.containerInfo);
          } finally {
            __ST.executionContext = prevExecutionContext, __ST.setCurrentUpdatePriority(previousPriority), __ST.ReactSharedInternals.T = rootMutationHasEffect;
          }
        }
        root.current = finishedWork;
        __ST.pendingEffectsStatus = __ST.PENDING_LAYOUT_PHASE;
      }
    }(...__args);
  };
  __ST.commitRoot = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, exitStatus, suspendedState, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
      root.cancelPendingCommit = undefined;
      do __ST.flushPendingEffects(); while (__ST.pendingEffectsStatus !== __ST.NO_PENDING_EFFECTS);
      __ST.ReactStrictModeWarnings.flushLegacyContextWarning();
      __ST.ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();
      if ((__ST.executionContext & (__ST.RenderContext | __ST.CommitContext)) !== __ST.NoContext) throw Error("Should not already be working.");
      __ST.setCurrentTrackFromLanes(lanes);
      exitStatus === __ST.RootErrored ? __ST.logErroredRenderPhase(completedRenderStartTime, completedRenderEndTime, lanes, __ST.workInProgressUpdateTask) : undefined !== recoverableErrors ? __ST.logRecoveredRenderPhase(completedRenderStartTime, completedRenderEndTime, lanes, recoverableErrors, undefined !== finishedWork && undefined !== finishedWork.alternate && finishedWork.alternate.memoizedState.isDehydrated && 0 !== (finishedWork.flags & 256), __ST.workInProgressUpdateTask) : __ST.logRenderPhase(completedRenderStartTime, completedRenderEndTime, lanes, __ST.workInProgressUpdateTask);
      if (undefined !== finishedWork) {
        0 === lanes && console.error("finishedLanes should not be empty during a commit. This is a bug in React.");
        if (finishedWork === root.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
        didIncludeRenderPhaseUpdate = finishedWork.lanes | finishedWork.childLanes;
        didIncludeRenderPhaseUpdate |= __ST.concurrentlyUpdatedLanes;
        __ST.markRootFinished(root, lanes, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes);
        root === __ST.workInProgressRoot && (__ST.workInProgress = __ST.workInProgressRoot = undefined, __ST.workInProgressRootRenderLanes = 0);
        __ST.pendingFinishedWork = finishedWork;
        __ST.pendingEffectsRoot = root;
        __ST.pendingEffectsLanes = lanes;
        __ST.pendingEffectsRemainingLanes = didIncludeRenderPhaseUpdate;
        __ST.pendingPassiveTransitions = transitions;
        __ST.pendingRecoverableErrors = recoverableErrors;
        __ST.pendingEffectsRenderEndTime = completedRenderEndTime;
        __ST.pendingSuspendedCommitReason = suspendedCommitReason;
        __ST.pendingDelayedCommitReason = __ST.IMMEDIATE_COMMIT;
        __ST.pendingSuspendedViewTransitionReason = undefined;
        0 !== finishedWork.actualDuration || 0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? (root.callbackNode = undefined, root.callbackPriority = 0, __ST.scheduleCallback(__ST.NormalPriority_1, function () {
          __ST.trackSchedulerEvent();
          __ST.pendingDelayedCommitReason === __ST.IMMEDIATE_COMMIT && (__ST.pendingDelayedCommitReason = __ST.DELAYED_PASSIVE_COMMIT);
          __ST.flushPassiveEffects();
          return undefined;
        })) : (root.callbackNode = undefined, root.callbackPriority = 0);
        __ST.commitErrors = undefined;
        __ST.commitStartTime = __ST.now();
        undefined !== suspendedCommitReason && __ST.logSuspendedCommitPhase(completedRenderEndTime, __ST.commitStartTime, suspendedCommitReason, __ST.workInProgressUpdateTask);
        recoverableErrors = 0 !== (finishedWork.flags & 13878);
        if (0 !== (finishedWork.subtreeFlags & 13878) || recoverableErrors) {
          recoverableErrors = __ST.ReactSharedInternals.T;
          __ST.ReactSharedInternals.T = undefined;
          transitions = __ST.getCurrentUpdatePriority();
          __ST.setCurrentUpdatePriority(2);
          spawnedLane = __ST.executionContext;
          __ST.executionContext |= __ST.CommitContext;
          try {
            __ST.commitBeforeMutationEffects(root, finishedWork, lanes);
          } finally {
            __ST.executionContext = spawnedLane, __ST.setCurrentUpdatePriority(transitions), __ST.ReactSharedInternals.T = recoverableErrors;
          }
        }
        __ST.pendingEffectsStatus = __ST.PENDING_MUTATION_PHASE;
        __ST.flushMutationEffects();
        __ST.flushLayoutEffects();
        __ST.flushSpawnedWork();
      }
    }(...__args);
  };
  __ST.unwindUnitOfWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (unitOfWork, skipSiblings) {
      let __next, child;
      do {
        __next = __ST.unwindWork(unitOfWork.alternate, unitOfWork);
        if (undefined !== __next) {
          __next.flags &= 32767;
          __ST.workInProgress = __next;
          return;
        }
        if ((unitOfWork.mode & 2) !== __ST.NoMode) {
          __ST.stopProfilerTimerIfRunningAndRecordIncompleteDuration(unitOfWork);
          __next = unitOfWork.actualDuration;
          for (child = unitOfWork.child; undefined !== child;) __next += child.actualDuration, child = child.sibling;
          unitOfWork.actualDuration = __next;
        }
        __next = unitOfWork.return;
        undefined !== __next && (__next.flags |= 32768, __next.subtreeFlags = 0, __next.deletions = undefined);
        if (!skipSiblings && (unitOfWork = unitOfWork.sibling, undefined !== unitOfWork)) {
          __ST.workInProgress = unitOfWork;
          return;
        }
        __ST.workInProgress = unitOfWork = __next;
      } while (undefined !== unitOfWork);
      __ST.workInProgressRootExitStatus = __ST.RootSuspendedAtTheShell;
      __ST.workInProgress = undefined;
    }(...__args);
  };
  __ST.completeUnitOfWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (unitOfWork) {
      let completedWork, current;
      completedWork = unitOfWork;
      do {
        if (0 !== (completedWork.flags & 32768)) {
          __ST.unwindUnitOfWork(completedWork, __ST.workInProgressRootDidSkipSuspendedSiblings);
          return;
        }
        current = completedWork.alternate;
        unitOfWork = completedWork.return;
        __ST.startProfilerTimer(completedWork);
        current = __ST.runWithFiberInDEV(completedWork, __ST.completeWork, current, completedWork, __ST.entangledRenderLanes);
        (completedWork.mode & 2) !== __ST.NoMode && __ST.stopProfilerTimerIfRunningAndRecordIncompleteDuration(completedWork);
        if (undefined !== current) {
          __ST.workInProgress = current;
          return;
        }
        completedWork = completedWork.sibling;
        if (undefined !== completedWork) {
          __ST.workInProgress = completedWork;
          return;
        }
        __ST.workInProgress = completedWork = unitOfWork;
      } while (undefined !== completedWork);
      __ST.workInProgressRootExitStatus === __ST.RootInProgress && (__ST.workInProgressRootExitStatus = __ST.RootCompleted);
    }(...__args);
  };
  __ST.throwAndUnwindWorkLoop = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, unitOfWork, thrownValue, suspendedReason) {
      let returnFiber;
      __ST.resetContextDependencies();
      __ST.resetHooksOnUnwind(unitOfWork);
      __ST.thenableState_1 = undefined;
      __ST.thenableIndexCounter_1 = 0;
      returnFiber = unitOfWork.return;
      try {
        if (__ST.throwException(root, returnFiber, unitOfWork, thrownValue, __ST.workInProgressRootRenderLanes)) {
          __ST.workInProgressRootExitStatus = __ST.RootFatalErrored;
          __ST.logUncaughtError(root, __ST.createCapturedValueAtFiber(thrownValue, root.current));
          __ST.workInProgress = undefined;
          return;
        }
      } catch (__error) {
        if (undefined !== returnFiber) throw __ST.workInProgress = returnFiber, __error;
        __ST.workInProgressRootExitStatus = __ST.RootFatalErrored;
        __ST.logUncaughtError(root, __ST.createCapturedValueAtFiber(thrownValue, root.current));
        __ST.workInProgress = undefined;
        return;
      }
      if (unitOfWork.flags & 32768) {
        if (__ST.isHydrating || suspendedReason === __ST.SuspendedOnError) root = !0;else if (__ST.workInProgressRootIsPrerendering || 0 !== (__ST.workInProgressRootRenderLanes & 536870912)) root = !1;else if (__ST.workInProgressRootDidSkipSuspendedSiblings = root = !0, suspendedReason === __ST.SuspendedOnData || suspendedReason === __ST.SuspendedOnAction || suspendedReason === __ST.SuspendedOnImmediate || suspendedReason === __ST.SuspendedOnDeprecatedThrowPromise) suspendedReason = __ST.suspenseHandlerStackCursor.current, undefined !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
        __ST.unwindUnitOfWork(unitOfWork, root);
      } else __ST.completeUnitOfWork(unitOfWork);
    }(...__args);
  };
  __ST.replayBeginWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (unitOfWork) {
      let current, isProfilingMode;
      current = unitOfWork.alternate;
      isProfilingMode = (unitOfWork.mode & 2) !== __ST.NoMode;
      isProfilingMode && __ST.startProfilerTimer(unitOfWork);
      switch (unitOfWork.tag) {
        case 15:
        case 0:
          current = __ST.replayFunctionComponent(current, unitOfWork, unitOfWork.pendingProps, unitOfWork.type, void 0, __ST.workInProgressRootRenderLanes);
          break;
        case 11:
          current = __ST.replayFunctionComponent(current, unitOfWork, unitOfWork.pendingProps, unitOfWork.type.render, unitOfWork.ref, __ST.workInProgressRootRenderLanes);
          break;
        case 5:
          __ST.resetHooksOnUnwind(unitOfWork);
        default:
          __ST.unwindInterruptedWork(current, unitOfWork), unitOfWork = __ST.workInProgress = __ST.resetWorkInProgress(unitOfWork, __ST.entangledRenderLanes), current = __ST.beginWork(current, unitOfWork, __ST.entangledRenderLanes);
      }
      isProfilingMode && __ST.stopProfilerTimerIfRunningAndRecordDuration(unitOfWork);
      return current;
    }(...__args);
  };
  __ST.replaySuspendedUnitOfWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (unitOfWork) {
      let __next;
      __next = __ST.runWithFiberInDEV(unitOfWork, __ST.replayBeginWork, unitOfWork);
      unitOfWork.memoizedProps = unitOfWork.pendingProps;
      undefined === __next ? __ST.completeUnitOfWork(unitOfWork) : __ST.workInProgress = __next;
    }(...__args);
  };
  __ST.performUnitOfWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (unitOfWork) {
      let current;
      current = unitOfWork.alternate;
      (unitOfWork.mode & 2) !== __ST.NoMode ? (__ST.startProfilerTimer(unitOfWork), current = __ST.runWithFiberInDEV(unitOfWork, __ST.beginWork, current, unitOfWork, __ST.entangledRenderLanes), __ST.stopProfilerTimerIfRunningAndRecordDuration(unitOfWork)) : current = __ST.runWithFiberInDEV(unitOfWork, __ST.beginWork, current, unitOfWork, __ST.entangledRenderLanes);
      unitOfWork.memoizedProps = unitOfWork.pendingProps;
      undefined === current ? __ST.completeUnitOfWork(unitOfWork) : __ST.workInProgress = current;
    }(...__args);
  };
  __ST.workLoopConcurrentByScheduler = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      for (; undefined !== __ST.workInProgress && !__ST.shouldYield();) __ST.performUnitOfWork(__ST.workInProgress);
    }(...__args);
  };
  __ST.renderRootConcurrent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, lanes) {
      let prevExecutionContext, prevDispatcher, prevAsyncDispatcher, memoizedUpdaters, resource, hostFiber, __type, props, sibling, returnFiber;
      prevExecutionContext = __ST.executionContext;
      __ST.executionContext |= __ST.RenderContext;
      prevDispatcher = __ST.pushDispatcher();
      prevAsyncDispatcher = __ST.pushAsyncDispatcher();
      if (__ST.workInProgressRoot !== root || __ST.workInProgressRootRenderLanes !== lanes) {
        if (__ST.isDevToolsPresent) {
          memoizedUpdaters = root.memoizedUpdaters;
          0 < memoizedUpdaters.size && (__ST.restorePendingUpdaters(root, __ST.workInProgressRootRenderLanes), memoizedUpdaters.clear());
          __ST.movePendingFibersToMemoized(root, lanes);
        }
        __ST.workInProgressTransitions = undefined;
        __ST.workInProgressRootRenderTargetTime = __cat(__ST.now_1(), __ST.RENDER_TIMEOUT_MS);
        __ST.prepareFreshStack(root, lanes);
      } else __ST.workInProgressRootIsPrerendering = __ST.checkIfRootIsPrerendering(root, lanes);
      {
        let __lb_2 = false,
          __lc_2 = false;
        while (!__lb_2) {
          __lc_2 = false;
          do {
            try {
              if (__ST.workInProgressSuspendedReason !== __ST.NotSuspended && undefined !== __ST.workInProgress) {
                let __lb_1 = false,
                  __lc_1 = false;
                while (!__lb_1) {
                  switch (lanes = __ST.workInProgress, memoizedUpdaters = __ST.workInProgressThrownValue, __ST.workInProgressSuspendedReason) {
                    case __ST.SuspendedOnError:
                      __ST.workInProgressSuspendedReason = __ST.NotSuspended;
                      __ST.workInProgressThrownValue = undefined;
                      __ST.throwAndUnwindWorkLoop(root, lanes, memoizedUpdaters, __ST.SuspendedOnError);
                      break;
                    case __ST.SuspendedOnData:
                    case __ST.SuspendedOnAction:
                      if (__ST.isThenableResolved(memoizedUpdaters)) {
                        __ST.workInProgressSuspendedReason = __ST.NotSuspended;
                        __ST.workInProgressThrownValue = undefined;
                        __ST.replaySuspendedUnitOfWork(lanes);
                        break;
                      }
                      lanes = function () {
                        __ST.workInProgressSuspendedReason !== __ST.SuspendedOnData && __ST.workInProgressSuspendedReason !== __ST.SuspendedOnAction || __ST.workInProgressRoot !== root || (__ST.workInProgressSuspendedReason = __ST.SuspendedAndReadyToContinue);
                        __ST.ensureRootIsScheduled(root);
                      };
                      memoizedUpdaters.then(lanes, lanes);
                      {
                        __lb_2 = true;
                        break;
                      }
                    case __ST.SuspendedOnImmediate:
                      __ST.workInProgressSuspendedReason = __ST.SuspendedAndReadyToContinue;
                      {
                        __lb_2 = true;
                        break;
                      }
                    case __ST.SuspendedOnInstance:
                      __ST.workInProgressSuspendedReason = __ST.SuspendedOnInstanceAndReadyToContinue;
                      {
                        __lb_2 = true;
                        break;
                      }
                    case __ST.SuspendedAndReadyToContinue:
                      __ST.isThenableResolved(memoizedUpdaters) ? (__ST.workInProgressSuspendedReason = __ST.NotSuspended, __ST.workInProgressThrownValue = undefined, __ST.replaySuspendedUnitOfWork(lanes)) : (__ST.workInProgressSuspendedReason = __ST.NotSuspended, __ST.workInProgressThrownValue = undefined, __ST.throwAndUnwindWorkLoop(root, lanes, memoizedUpdaters, __ST.SuspendedAndReadyToContinue));
                      break;
                    case __ST.SuspendedOnInstanceAndReadyToContinue:
                      resource = undefined;
                      switch (__ST.workInProgress.tag) {
                        case 26:
                          resource = __ST.workInProgress.memoizedState;
                        case 5:
                        case 27:
                          hostFiber = __ST.workInProgress;
                          __type = hostFiber.type;
                          props = hostFiber.pendingProps;
                          if (resource ? __ST.preloadResource(resource) : __ST.preloadInstance(hostFiber.stateNode, __type, props)) {
                            __ST.workInProgressSuspendedReason = __ST.NotSuspended;
                            __ST.workInProgressThrownValue = undefined;
                            sibling = hostFiber.sibling;
                            if (undefined !== sibling) __ST.workInProgress = sibling;else {
                              returnFiber = hostFiber.return;
                              undefined !== returnFiber ? (__ST.workInProgress = returnFiber, __ST.completeUnitOfWork(returnFiber)) : __ST.workInProgress = undefined;
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
                      __ST.workInProgressSuspendedReason = __ST.NotSuspended;
                      __ST.workInProgressThrownValue = undefined;
                      __ST.throwAndUnwindWorkLoop(root, lanes, memoizedUpdaters, __ST.SuspendedOnInstanceAndReadyToContinue);
                      break;
                    case __ST.SuspendedOnDeprecatedThrowPromise:
                      __ST.workInProgressSuspendedReason = __ST.NotSuspended;
                      __ST.workInProgressThrownValue = undefined;
                      __ST.throwAndUnwindWorkLoop(root, lanes, memoizedUpdaters, __ST.SuspendedOnDeprecatedThrowPromise);
                      break;
                    case __ST.SuspendedOnHydration:
                      __ST.resetWorkInProgressStack();
                      __ST.workInProgressRootExitStatus = __ST.RootSuspendedAtTheShell;
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
              undefined !== __ST.ReactSharedInternals.actQueue ? __ST.workLoopSync() : __ST.workLoopConcurrentByScheduler();
              break;
            } catch (thrownValue_5) {
              __ST.handleThrow(root, thrownValue_5);
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
      __ST.resetContextDependencies();
      __ST.ReactSharedInternals.H = prevDispatcher;
      __ST.ReactSharedInternals.A = prevAsyncDispatcher;
      __ST.executionContext = prevExecutionContext;
      if (undefined !== __ST.workInProgress) return __ST.RootInProgress;
      __ST.workInProgressRoot = undefined;
      __ST.workInProgressRootRenderLanes = 0;
      __ST.finishQueueingConcurrentUpdates();
      return __ST.workInProgressRootExitStatus;
    }(...__args);
  };
  __ST.workLoopSync = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      for (; undefined !== __ST.workInProgress;) __ST.performUnitOfWork(__ST.workInProgress);
    }(...__args);
  };
  __ST.renderRootSync = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, lanes, shouldYieldForPrerendering) {
      let prevExecutionContext, prevDispatcher, prevAsyncDispatcher, memoizedUpdaters, unitOfWork, thrownValue, reason;
      prevExecutionContext = __ST.executionContext;
      __ST.executionContext |= __ST.RenderContext;
      prevDispatcher = __ST.pushDispatcher();
      prevAsyncDispatcher = __ST.pushAsyncDispatcher();
      if (__ST.workInProgressRoot !== root || __ST.workInProgressRootRenderLanes !== lanes) {
        if (__ST.isDevToolsPresent) {
          memoizedUpdaters = root.memoizedUpdaters;
          0 < memoizedUpdaters.size && (__ST.restorePendingUpdaters(root, __ST.workInProgressRootRenderLanes), memoizedUpdaters.clear());
          __ST.movePendingFibersToMemoized(root, lanes);
        }
        __ST.workInProgressTransitions = undefined;
        __ST.prepareFreshStack(root, lanes);
      }
      lanes = !1;
      memoizedUpdaters = __ST.workInProgressRootExitStatus;
      {
        let __lb_3 = false,
          __lc_3 = false;
        while (!__lb_3) {
          __lc_3 = false;
          do {
            try {
              if (__ST.workInProgressSuspendedReason !== __ST.NotSuspended && undefined !== __ST.workInProgress) {
                unitOfWork = __ST.workInProgress;
                thrownValue = __ST.workInProgressThrownValue;
                switch (__ST.workInProgressSuspendedReason) {
                  case __ST.SuspendedOnHydration:
                    __ST.resetWorkInProgressStack();
                    memoizedUpdaters = __ST.RootSuspendedAtTheShell;
                    {
                      __lb_3 = true;
                      break;
                    }
                  case __ST.SuspendedOnImmediate:
                  case __ST.SuspendedOnData:
                  case __ST.SuspendedOnAction:
                  case __ST.SuspendedOnDeprecatedThrowPromise:
                    undefined === __ST.suspenseHandlerStackCursor.current && (lanes = !0);
                    reason = __ST.workInProgressSuspendedReason;
                    __ST.workInProgressSuspendedReason = __ST.NotSuspended;
                    __ST.workInProgressThrownValue = undefined;
                    __ST.throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
                    if (shouldYieldForPrerendering && __ST.workInProgressRootIsPrerendering) {
                      memoizedUpdaters = __ST.RootInProgress;
                      {
                        __lb_3 = true;
                        break;
                      }
                    }
                    break;
                  default:
                    reason = __ST.workInProgressSuspendedReason, __ST.workInProgressSuspendedReason = __ST.NotSuspended, __ST.workInProgressThrownValue = undefined, __ST.throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
                }
              }
              __ST.workLoopSync();
              memoizedUpdaters = __ST.workInProgressRootExitStatus;
              break;
            } catch (thrownValue_4) {
              __ST.handleThrow(root, thrownValue_4);
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
      __ST.resetContextDependencies();
      __ST.executionContext = prevExecutionContext;
      __ST.ReactSharedInternals.H = prevDispatcher;
      __ST.ReactSharedInternals.A = prevAsyncDispatcher;
      undefined === __ST.workInProgress && (__ST.workInProgressRoot = undefined, __ST.workInProgressRootRenderLanes = 0, __ST.finishQueueingConcurrentUpdates());
      return memoizedUpdaters;
    }(...__args);
  };
  __ST.renderDidSuspendDelayIfPossible = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.workInProgressRootExitStatus = __ST.RootSuspendedWithDelay;
      __ST.workInProgressRootDidSkipSuspendedSiblings || (__ST.workInProgressRootRenderLanes & 4194048) !== __ST.workInProgressRootRenderLanes && undefined !== __ST.suspenseHandlerStackCursor.current || (__ST.workInProgressRootIsPrerendering = !0);
      0 === (__ST.workInProgressRootSkippedLanes & 134217727) && 0 === (__ST.workInProgressRootInterleavedUpdatedLanes & 134217727) || undefined === __ST.workInProgressRoot || __ST.markRootSuspended(__ST.workInProgressRoot, __ST.workInProgressRootRenderLanes, __ST.workInProgressDeferredLane, !1);
    }(...__args);
  };
  __ST.markRenderDerivedCause = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      undefined === __ST.workInProgressUpdateTask && (__ST.workInProgressUpdateTask = fiber._debugTask === undefined ? undefined : fiber._debugTask);
    }(...__args);
  };
  __ST.pushAsyncDispatcher = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let prevAsyncDispatcher;
      prevAsyncDispatcher = __ST.ReactSharedInternals.A;
      __ST.ReactSharedInternals.A = __ST.DefaultAsyncDispatcher;
      return prevAsyncDispatcher;
    }(...__args);
  };
  __ST.pushDispatcher = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let prevDispatcher;
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.ContextOnlyDispatcher;
      return undefined === prevDispatcher ? __ST.ContextOnlyDispatcher : prevDispatcher;
    }(...__args);
  };
  __ST.shouldRemainOnPreviousScreen = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let handler;
      handler = __ST.suspenseHandlerStackCursor.current;
      return undefined === handler ? !0 : (__ST.workInProgressRootRenderLanes & 4194048) === __ST.workInProgressRootRenderLanes ? undefined === __ST.shellBoundary ? !0 : !1 : (__ST.workInProgressRootRenderLanes & 62914560) === __ST.workInProgressRootRenderLanes || 0 !== (__ST.workInProgressRootRenderLanes & 536870912) ? handler === __ST.shellBoundary : !1;
    }(...__args);
  };
  __ST.handleThrow = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, thrownValue) {
      let erroredWork;
      __ST.currentlyRenderingFiber = undefined;
      __ST.ReactSharedInternals.H = __ST.ContextOnlyDispatcher;
      __ST.ReactSharedInternals.getCurrentStack = undefined;
      __ST.isRendering = !1;
      __ST.current = undefined;
      thrownValue === __ST.SuspenseException || thrownValue === __ST.SuspenseActionException ? (thrownValue = __ST.getSuspendedThenable(), __ST.workInProgressSuspendedReason = __ST.SuspendedOnImmediate) : thrownValue === __ST.SuspenseyCommitException ? (thrownValue = __ST.getSuspendedThenable(), __ST.workInProgressSuspendedReason = __ST.SuspendedOnInstance) : __ST.workInProgressSuspendedReason = thrownValue === __ST.SelectiveHydrationException ? __ST.SuspendedOnHydration : undefined !== thrownValue && "object" === typeOfJS(thrownValue) && "function" === typeOfJS(thrownValue.then) ? __ST.SuspendedOnDeprecatedThrowPromise : __ST.SuspendedOnError;
      __ST.workInProgressThrownValue = thrownValue;
      erroredWork = __ST.workInProgress;
      undefined === erroredWork ? (__ST.workInProgressRootExitStatus = __ST.RootFatalErrored, __ST.logUncaughtError(root, __ST.createCapturedValueAtFiber(thrownValue, root.current))) : erroredWork.mode & 2 && __ST.stopProfilerTimerIfRunningAndRecordDuration(erroredWork);
    }(...__args);
  };
  __ST.prepareFreshStack = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, lanes) {
      let previousRenderStartTime, endTime, debugTask, color, label, eventTime, eventType, eventIsRepeat, isSpawnedUpdate, isPingedUpdate, color_jscomp_0;
      __ST.supportsUserTiming && (console.timeStamp("Blocking Track", 0.003, 0.003, "Blocking", "Scheduler \u269b", "primary-light"), console.timeStamp("Transition Track", 0.003, 0.003, "Transition", "Scheduler \u269b", "primary-light"), console.timeStamp("Suspense Track", 0.003, 0.003, "Suspense", "Scheduler \u269b", "primary-light"), console.timeStamp("Idle Track", 0.003, 0.003, "Idle", "Scheduler \u269b", "primary-light"));
      previousRenderStartTime = __ST.renderStartTime;
      __ST.renderStartTime = __ST.now();
      if (0 !== __ST.workInProgressRootRenderLanes && 0 < previousRenderStartTime) {
        __ST.setCurrentTrackFromLanes(__ST.workInProgressRootRenderLanes);
        if (__ST.workInProgressRootExitStatus === __ST.RootSuspended || __ST.workInProgressRootExitStatus === __ST.RootSuspendedWithDelay) __ST.logSuspendedRenderPhase(previousRenderStartTime, __ST.renderStartTime, lanes, __ST.workInProgressUpdateTask);else {
          endTime = __ST.renderStartTime;
          debugTask = __ST.workInProgressUpdateTask;
          if (__ST.supportsUserTiming && !(endTime <= previousRenderStartTime)) {
            color = (lanes & 738197653) === lanes ? "tertiary-dark" : "primary-dark";
            label = (lanes & 536870912) === lanes ? "Prewarm" : (lanes & 201326741) === lanes ? "Interrupted Hydration" : "Interrupted Render";
            debugTask ? debugTask.run(__partial((..._bindArgs40) => __applyFn(console.timeStamp, ..._bindArgs40), console, label, previousRenderStartTime, endTime, __ST.currentTrack, "Scheduler \u269b", color)) : console.timeStamp(label, previousRenderStartTime, endTime, __ST.currentTrack, "Scheduler \u269b", color);
          }
        }
        __ST.finalizeRender(__ST.workInProgressRootRenderLanes, __ST.renderStartTime);
      }
      previousRenderStartTime = __ST.workInProgressUpdateTask;
      __ST.workInProgressUpdateTask = undefined;
      if (0 !== (lanes & 127)) {
        __ST.workInProgressUpdateTask = __ST.blockingUpdateTask;
        debugTask = 0 <= __ST.blockingUpdateTime && __ST.blockingUpdateTime < __ST.blockingClampTime ? __ST.blockingClampTime : __ST.blockingUpdateTime;
        endTime = 0 <= __ST.blockingEventTime && __ST.blockingEventTime < __ST.blockingClampTime ? __ST.blockingClampTime : __ST.blockingEventTime;
        color = 0 <= endTime ? endTime : 0 <= debugTask ? debugTask : __ST.renderStartTime;
        0 <= __ST.blockingSuspendedTime && (__ST.setCurrentTrackFromLanes(2), __ST.logSuspendedWithDelayPhase(__ST.blockingSuspendedTime, color, lanes, previousRenderStartTime));
        previousRenderStartTime = debugTask;
        eventTime = endTime;
        eventType = __ST.blockingEventType;
        eventIsRepeat = 0 < __ST.blockingEventRepeatTime;
        isSpawnedUpdate = 1 === __ST.blockingUpdateType;
        isPingedUpdate = 2 === __ST.blockingUpdateType;
        debugTask = __ST.renderStartTime;
        endTime = __ST.blockingUpdateTask;
        color = __ST.blockingUpdateMethodName;
        label = __ST.blockingUpdateComponentName;
        if (__ST.supportsUserTiming) {
          __ST.currentTrack = "Blocking";
          0 < previousRenderStartTime ? previousRenderStartTime > debugTask && (previousRenderStartTime = debugTask) : previousRenderStartTime = debugTask;
          0 < eventTime ? eventTime > previousRenderStartTime && (eventTime = previousRenderStartTime) : eventTime = previousRenderStartTime;
          if (undefined !== eventType && previousRenderStartTime > eventTime) {
            color_jscomp_0 = eventIsRepeat ? "secondary-light" : "warning";
            endTime ? endTime.run(__partial((..._bindArgs41) => __applyFn(console.timeStamp, ..._bindArgs41), console, eventIsRepeat ? "Consecutive" : __cat("Event: ", eventType), eventTime, previousRenderStartTime, __ST.currentTrack, "Scheduler \u269b", color_jscomp_0)) : console.timeStamp(eventIsRepeat ? "Consecutive" : __cat("Event: ", eventType), eventTime, previousRenderStartTime, __ST.currentTrack, "Scheduler \u269b", color_jscomp_0);
          }
          debugTask > previousRenderStartTime && (eventTime = isSpawnedUpdate ? "error" : (lanes & 738197653) === lanes ? "tertiary-light" : "primary-light", isSpawnedUpdate = isPingedUpdate ? "Promise Resolved" : isSpawnedUpdate ? "Cascading Update" : 5 < debugTask - previousRenderStartTime ? "Update Blocked" : "Update", isPingedUpdate = __arrNew(), label !== undefined && __push(isPingedUpdate, __arrNew("Component name", label)), color !== undefined && __push(isPingedUpdate, __arrNew("Method name", color)), previousRenderStartTime = {
            start: previousRenderStartTime,
            end: debugTask,
            detail: {
              devtools: {
                properties: isPingedUpdate,
                track: __ST.currentTrack,
                trackGroup: "Scheduler \u269b",
                color: eventTime
              }
            }
          }, endTime ? endTime.run(__partial((..._bindArgs42) => __applyFn(performance.measure, ..._bindArgs42), performance, isSpawnedUpdate, previousRenderStartTime)) : performance.measure(isSpawnedUpdate, previousRenderStartTime));
        }
        __ST.blockingUpdateTime = -1.1;
        __ST.blockingUpdateType = 0;
        __ST.blockingUpdateComponentName = __ST.blockingUpdateMethodName = undefined;
        __ST.blockingSuspendedTime = -1.1;
        __ST.blockingEventRepeatTime = __ST.blockingEventTime;
        __ST.blockingEventTime = -1.1;
        __ST.blockingClampTime = __ST.now();
      }
      0 !== (lanes & 4194048) && (__ST.workInProgressUpdateTask = __ST.transitionUpdateTask, debugTask = 0 <= __ST.transitionStartTime && __ST.transitionStartTime < __ST.transitionClampTime ? __ST.transitionClampTime : __ST.transitionStartTime, previousRenderStartTime = 0 <= __ST.transitionUpdateTime && __ST.transitionUpdateTime < __ST.transitionClampTime ? __ST.transitionClampTime : __ST.transitionUpdateTime, endTime = 0 <= __ST.transitionEventTime && __ST.transitionEventTime < __ST.transitionClampTime ? __ST.transitionClampTime : __ST.transitionEventTime, color = 0 <= endTime ? endTime : 0 <= previousRenderStartTime ? previousRenderStartTime : __ST.renderStartTime, 0 <= __ST.transitionSuspendedTime && (__ST.setCurrentTrackFromLanes(256), __ST.logSuspendedWithDelayPhase(__ST.transitionSuspendedTime, color, lanes, __ST.workInProgressUpdateTask)), isPingedUpdate = endTime, eventTime = __ST.transitionEventType, eventType = 0 < __ST.transitionEventRepeatTime, eventIsRepeat = 2 === __ST.transitionUpdateType, color = __ST.renderStartTime, endTime = __ST.transitionUpdateTask, label = __ST.transitionUpdateMethodName, isSpawnedUpdate = __ST.transitionUpdateComponentName, __ST.supportsUserTiming && (__ST.currentTrack = "Transition", 0 < previousRenderStartTime ? previousRenderStartTime > color && (previousRenderStartTime = color) : previousRenderStartTime = color, 0 < debugTask ? debugTask > previousRenderStartTime && (debugTask = previousRenderStartTime) : debugTask = previousRenderStartTime, 0 < isPingedUpdate ? isPingedUpdate > debugTask && (isPingedUpdate = debugTask) : isPingedUpdate = debugTask, debugTask > isPingedUpdate && undefined !== eventTime && (color_jscomp_0 = eventType ? "secondary-light" : "warning", endTime ? endTime.run(__partial((..._bindArgs43) => __applyFn(console.timeStamp, ..._bindArgs43), console, eventType ? "Consecutive" : __cat("Event: ", eventTime), isPingedUpdate, debugTask, __ST.currentTrack, "Scheduler \u269b", color_jscomp_0)) : console.timeStamp(eventType ? "Consecutive" : __cat("Event: ", eventTime), isPingedUpdate, debugTask, __ST.currentTrack, "Scheduler \u269b", color_jscomp_0)), previousRenderStartTime > debugTask && (endTime ? endTime.run(__partial((..._bindArgs44) => __applyFn(console.timeStamp, ..._bindArgs44), console, "Action", debugTask, previousRenderStartTime, __ST.currentTrack, "Scheduler \u269b", "primary-dark")) : console.timeStamp("Action", debugTask, previousRenderStartTime, __ST.currentTrack, "Scheduler \u269b", "primary-dark")), color > previousRenderStartTime && (debugTask = eventIsRepeat ? "Promise Resolved" : 5 < color - previousRenderStartTime ? "Update Blocked" : "Update", isPingedUpdate = __arrNew(), isSpawnedUpdate !== undefined && __push(isPingedUpdate, __arrNew("Component name", isSpawnedUpdate)), label !== undefined && __push(isPingedUpdate, __arrNew("Method name", label)), previousRenderStartTime = {
        start: previousRenderStartTime,
        end: color,
        detail: {
          devtools: {
            properties: isPingedUpdate,
            track: __ST.currentTrack,
            trackGroup: "Scheduler \u269b",
            color: "primary-light"
          }
        }
      }, endTime ? endTime.run(__partial((..._bindArgs45) => __applyFn(performance.measure, ..._bindArgs45), performance, debugTask, previousRenderStartTime)) : performance.measure(debugTask, previousRenderStartTime))), __ST.transitionUpdateTime = __ST.transitionStartTime = -1.1, __ST.transitionUpdateType = 0, __ST.transitionSuspendedTime = -1.1, __ST.transitionEventRepeatTime = __ST.transitionEventTime, __ST.transitionEventTime = -1.1, __ST.transitionClampTime = __ST.now());
      previousRenderStartTime = root.timeoutHandle;
      previousRenderStartTime !== __ST.noTimeout && (root.timeoutHandle = __ST.noTimeout, __ST.cancelTimeout(previousRenderStartTime));
      previousRenderStartTime = root.cancelPendingCommit;
      undefined !== previousRenderStartTime && (root.cancelPendingCommit = undefined, previousRenderStartTime());
      __ST.pendingEffectsLanes = 0;
      __ST.resetWorkInProgressStack();
      __ST.workInProgressRoot = root;
      __ST.workInProgress = previousRenderStartTime = __ST.createWorkInProgress(root.current, undefined);
      __ST.workInProgressRootRenderLanes = lanes;
      __ST.workInProgressSuspendedReason = __ST.NotSuspended;
      __ST.workInProgressThrownValue = undefined;
      __ST.workInProgressRootDidSkipSuspendedSiblings = !1;
      __ST.workInProgressRootIsPrerendering = __ST.checkIfRootIsPrerendering(root, lanes);
      __ST.workInProgressRootDidAttachPingListener = !1;
      __ST.workInProgressRootExitStatus = __ST.RootInProgress;
      __ST.workInProgressSuspendedRetryLanes = __ST.workInProgressDeferredLane = __ST.workInProgressRootPingedLanes = __ST.workInProgressRootInterleavedUpdatedLanes = __ST.workInProgressRootSkippedLanes = 0;
      __ST.workInProgressRootRecoverableErrors = __ST.workInProgressRootConcurrentErrors = undefined;
      __ST.workInProgressRootDidIncludeRecursiveRenderUpdate = !1;
      0 !== (lanes & 8) && (lanes |= lanes & 32);
      endTime = root.entangledLanes;
      if (0 !== endTime) for (root = root.entanglements, endTime &= lanes; 0 < endTime;) debugTask = 31 - __ST.clz32(endTime), color = 1 << debugTask, lanes |= root[debugTask], endTime &= ~color;
      __ST.entangledRenderLanes = lanes;
      __ST.finishQueueingConcurrentUpdates();
      root = __ST.getCurrentTime();
      1e3 < root - __ST.lastResetTime && (__ST.ReactSharedInternals.recentlyCreatedOwnerStacks = 0, __ST.lastResetTime = root);
      __ST.ReactStrictModeWarnings.discardPendingWarnings();
      return previousRenderStartTime;
    }(...__args);
  };
  __ST.finalizeRender = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (lanes, finalizationTime) {
      0 !== (lanes & 127) && (__ST.blockingClampTime = finalizationTime);
      0 !== (lanes & 4194048) && (__ST.transitionClampTime = finalizationTime);
    }(...__args);
  };
  __ST.resetWorkInProgressStack = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let interruptedWork;
      if (undefined !== __ST.workInProgress) {
        if (__ST.workInProgressSuspendedReason === __ST.NotSuspended) {
          interruptedWork = __ST.workInProgress.return;
        } else interruptedWork = __ST.workInProgress, __ST.resetContextDependencies(), __ST.resetHooksOnUnwind(interruptedWork), __ST.thenableState_1 = undefined, __ST.thenableIndexCounter_1 = 0, interruptedWork = __ST.workInProgress;
        for (; undefined !== interruptedWork;) __ST.unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
        __ST.workInProgress = undefined;
      }
    }(...__args);
  };
  __ST.isAlreadyRendering = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      return (__ST.executionContext & (__ST.RenderContext | __ST.CommitContext)) !== __ST.NoContext;
    }(...__args);
  };
  __ST.flushSyncWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      return (__ST.executionContext & (__ST.RenderContext | __ST.CommitContext)) === __ST.NoContext ? (__ST.flushSyncWorkAcrossRoots_impl(0, !1), !1) : !0;
    }(...__args);
  };
  __ST.markRootSuspended = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, suspendedLanes, spawnedLane, didAttemptEntireTree) {
      let lanes, index, lane;
      suspendedLanes &= ~__ST.workInProgressRootPingedLanes;
      suspendedLanes &= ~__ST.workInProgressRootInterleavedUpdatedLanes;
      root.suspendedLanes |= suspendedLanes;
      root.pingedLanes &= ~suspendedLanes;
      didAttemptEntireTree && (root.warmLanes |= suspendedLanes);
      didAttemptEntireTree = root.expirationTimes;
      for (lanes = suspendedLanes; 0 < lanes;) {
        index = 31 - __ST.clz32(lanes);
        lane = 1 << index;
        didAttemptEntireTree[index] = -1;
        lanes &= ~lane;
      }
      0 !== spawnedLane && __ST.markSpawnedDeferredLane(root, spawnedLane, suspendedLanes);
    }(...__args);
  };
  __ST.isRenderConsistentWithExternalStores = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork) {
      let node, tag, i, check, getSnapshot;
      for (node = finishedWork;;) {
        tag = node.tag;
        if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, undefined !== tag && (tag = tag.stores, undefined !== tag))) for (i = 0; i < __len(tag); i++) {
          check = tag[i];
          getSnapshot = check.getSnapshot;
          check = check.value;
          try {
            if (!__ST.objectIs(getSnapshot(), check)) return !1;
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
    }(...__args);
  };
  __ST.commitRootWhenReady = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
      let subtreeFlags, suspendedState;
      root.timeoutHandle = __ST.noTimeout;
      subtreeFlags = finishedWork.subtreeFlags;
      suspendedState = undefined;
      if (subtreeFlags & 8192 || 16785408 === (subtreeFlags & 16785408)) if (suspendedState = __ST.startSuspendingCommit(), __ST.accumulateSuspenseyCommitOnFiber(finishedWork, lanes, suspendedState), subtreeFlags = (lanes & 62914560) === lanes ? __ST.globalMostRecentFallbackTime - __ST.now_1() : (lanes & 4194048) === lanes ? __ST.globalMostRecentTransitionTime - __ST.now_1() : 0, subtreeFlags = __ST.waitForCommitToBeReady(suspendedState, subtreeFlags), undefined !== subtreeFlags) {
        __ST.pendingEffectsLanes = lanes;
        root.cancelPendingCommit = subtreeFlags(__partial((..._bindArgs39) => __applyFn(__ST.commitRoot, ..._bindArgs39), undefined, root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, exitStatus, suspendedState, __ST.getSuspendedCommitReason(suspendedState, root.containerInfo), completedRenderStartTime, completedRenderEndTime));
        __ST.markRootSuspended(root, lanes, spawnedLane, !didSkipSuspendedSiblings);
        return;
      }
      __ST.commitRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, exitStatus, suspendedState, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime);
    }(...__args);
  };
  __ST.performWorkOnRoot = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, lanes, forceSync) {
      let yieldedFiber, yieldEndTime, startTime, renderWasConcurrent, errorRetryLanes, wasRootDehydrated;
      if ((__ST.executionContext & (__ST.RenderContext | __ST.CommitContext)) !== __ST.NoContext) throw Error("Should not already be working.");
      if (0 !== __ST.workInProgressRootRenderLanes && undefined !== __ST.workInProgress) {
        yieldedFiber = __ST.workInProgress;
        yieldEndTime = __ST.now_1();
        switch (__ST.yieldReason) {
          case __ST.SuspendedOnImmediate:
          case __ST.SuspendedOnData:
            startTime = __ST.yieldStartTime;
            __ST.supportsUserTiming && ((yieldedFiber = yieldedFiber._debugTask) ? yieldedFiber.run(__partial((..._bindArgs35) => __applyFn(console.timeStamp, ..._bindArgs35), console, "Suspended", startTime, yieldEndTime, "Components \u269b", void 0, "primary-light")) : console.timeStamp("Suspended", startTime, yieldEndTime, "Components \u269b", void 0, "primary-light"));
            break;
          case __ST.SuspendedOnAction:
            startTime = __ST.yieldStartTime;
            __ST.supportsUserTiming && ((yieldedFiber = yieldedFiber._debugTask) ? yieldedFiber.run(__partial((..._bindArgs36) => __applyFn(console.timeStamp, ..._bindArgs36), console, "Action", startTime, yieldEndTime, "Components \u269b", void 0, "primary-light")) : console.timeStamp("Action", startTime, yieldEndTime, "Components \u269b", void 0, "primary-light"));
            break;
          default:
            __ST.supportsUserTiming && (yieldedFiber = yieldEndTime - __ST.yieldStartTime, 3 > yieldedFiber || console.timeStamp("Blocked", __ST.yieldStartTime, yieldEndTime, "Components \u269b", void 0, 5 > yieldedFiber ? "primary-light" : 10 > yieldedFiber ? "primary" : 100 > yieldedFiber ? "primary-dark" : "error"));
        }
      }
      startTime = (forceSync = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root.expiredLanes) || __ST.checkIfRootIsPrerendering(root, lanes)) ? __ST.renderRootConcurrent(root, lanes) : __ST.renderRootSync(root, lanes, !0);
      renderWasConcurrent = forceSync;
      do {
        if (startTime === __ST.RootInProgress) {
          __ST.workInProgressRootIsPrerendering && !forceSync && __ST.markRootSuspended(root, lanes, 0, !1);
          lanes = __ST.workInProgressSuspendedReason;
          __ST.yieldStartTime = __ST.now();
          __ST.yieldReason = lanes;
          break;
        } else {
          yieldedFiber = __ST.now_1();
          yieldEndTime = root.current.alternate;
          if (renderWasConcurrent && !__ST.isRenderConsistentWithExternalStores(yieldEndTime)) {
            __ST.setCurrentTrackFromLanes(lanes);
            yieldEndTime = __ST.renderStartTime;
            startTime = yieldedFiber;
            !__ST.supportsUserTiming || startTime <= yieldEndTime || (__ST.workInProgressUpdateTask ? __ST.workInProgressUpdateTask.run(__partial((..._bindArgs37) => __applyFn(console.timeStamp, ..._bindArgs37), console, "Teared Render", yieldEndTime, startTime, __ST.currentTrack, "Scheduler \u269b", "error")) : console.timeStamp("Teared Render", yieldEndTime, startTime, __ST.currentTrack, "Scheduler \u269b", "error"));
            __ST.finalizeRender(lanes, yieldedFiber);
            startTime = __ST.renderRootSync(root, lanes, !1);
            renderWasConcurrent = !1;
            continue;
          }
          if (startTime === __ST.RootErrored) {
            renderWasConcurrent = lanes;
            if (root.errorRecoveryDisabledLanes & renderWasConcurrent) {
              errorRetryLanes = 0;
            } else errorRetryLanes = root.pendingLanes & -536870913, errorRetryLanes = 0 !== errorRetryLanes ? errorRetryLanes : errorRetryLanes & 536870912 ? 536870912 : 0;
            if (0 !== errorRetryLanes) {
              __ST.setCurrentTrackFromLanes(lanes);
              __ST.logErroredRenderPhase(__ST.renderStartTime, yieldedFiber, lanes, __ST.workInProgressUpdateTask);
              __ST.finalizeRender(lanes, yieldedFiber);
              lanes = errorRetryLanes;
              {
                let __lb_5 = false,
                  __lc_5 = false;
                while (!__lb_5) {
                  {
                    yieldedFiber = root;
                    startTime = renderWasConcurrent;
                    renderWasConcurrent = __ST.workInProgressRootConcurrentErrors;
                    wasRootDehydrated = __ST.supportsHydration && yieldedFiber.current.memoizedState.isDehydrated;
                    wasRootDehydrated && (__ST.prepareFreshStack(yieldedFiber, errorRetryLanes).flags |= 256);
                    errorRetryLanes = __ST.renderRootSync(yieldedFiber, errorRetryLanes, !1);
                    if (errorRetryLanes !== __ST.RootErrored) {
                      if (__ST.workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                        yieldedFiber.errorRecoveryDisabledLanes |= startTime;
                        __ST.workInProgressRootInterleavedUpdatedLanes |= startTime;
                        startTime = __ST.RootSuspendedWithDelay;
                        {
                          __lb_5 = true;
                          break;
                        }
                      }
                      yieldedFiber = __ST.workInProgressRootRecoverableErrors;
                      __ST.workInProgressRootRecoverableErrors = renderWasConcurrent;
                      undefined !== yieldedFiber && (undefined === __ST.workInProgressRootRecoverableErrors ? __ST.workInProgressRootRecoverableErrors = yieldedFiber : __applyFn(__ST.workInProgressRootRecoverableErrors.push, __ST.workInProgressRootRecoverableErrors, yieldedFiber));
                    }
                    startTime = errorRetryLanes;
                  }
                  break;
                }
              }
              renderWasConcurrent = !1;
              if (startTime !== __ST.RootErrored) continue;else yieldedFiber = __ST.now_1();
            }
          }
          if (startTime === __ST.RootFatalErrored) {
            __ST.setCurrentTrackFromLanes(lanes);
            __ST.logErroredRenderPhase(__ST.renderStartTime, yieldedFiber, lanes, __ST.workInProgressUpdateTask);
            __ST.finalizeRender(lanes, yieldedFiber);
            __ST.prepareFreshStack(root, 0);
            __ST.markRootSuspended(root, lanes, 0, !0);
            break;
          }
          {
            let __lb_4 = false,
              __lc_4 = false;
            while (!__lb_4) {
              {
                forceSync = root;
                switch (startTime) {
                  case __ST.RootInProgress:
                  case __ST.RootFatalErrored:
                    throw Error("Root did not complete. This is a bug in React.");
                  case __ST.RootSuspendedWithDelay:
                    if ((lanes & 4194048) !== lanes) break;
                  case __ST.RootSuspendedAtTheShell:
                    __ST.setCurrentTrackFromLanes(lanes);
                    __ST.logSuspendedRenderPhase(__ST.renderStartTime, yieldedFiber, lanes, __ST.workInProgressUpdateTask);
                    __ST.finalizeRender(lanes, yieldedFiber);
                    yieldEndTime = lanes;
                    0 !== (yieldEndTime & 127) ? __ST.blockingSuspendedTime = yieldedFiber : 0 !== (yieldEndTime & 4194048) && (__ST.transitionSuspendedTime = yieldedFiber);
                    __ST.markRootSuspended(forceSync, lanes, __ST.workInProgressDeferredLane, !__ST.workInProgressRootDidSkipSuspendedSiblings);
                    {
                      __lb_4 = true;
                      break;
                    }
                  case __ST.RootErrored:
                    __ST.workInProgressRootRecoverableErrors = undefined;
                    break;
                  case __ST.RootSuspended:
                  case __ST.RootCompleted:
                    break;
                  default:
                    throw Error("Unknown root exit status.");
                }
                if (undefined !== __ST.ReactSharedInternals.actQueue) __ST.commitRoot(forceSync, yieldEndTime, lanes, __ST.workInProgressRootRecoverableErrors, __ST.workInProgressTransitions, __ST.workInProgressRootDidIncludeRecursiveRenderUpdate, __ST.workInProgressDeferredLane, __ST.workInProgressRootInterleavedUpdatedLanes, __ST.workInProgressSuspendedRetryLanes, startTime, undefined, undefined, __ST.renderStartTime, yieldedFiber);else {
                  if ((lanes & 62914560) === lanes && (renderWasConcurrent = __cat(__ST.globalMostRecentFallbackTime, __ST.FALLBACK_THROTTLE_MS) - __ST.now_1(), 10 < renderWasConcurrent)) {
                    __ST.markRootSuspended(forceSync, lanes, __ST.workInProgressDeferredLane, !__ST.workInProgressRootDidSkipSuspendedSiblings);
                    if (0 !== __ST.getNextLanes(forceSync, 0, !0)) {
                      __lb_4 = true;
                      break;
                    }
                    __ST.pendingEffectsLanes = lanes;
                    forceSync.timeoutHandle = __ST.scheduleTimeout(__partial((..._bindArgs38) => __applyFn(__ST.commitRootWhenReady, ..._bindArgs38), undefined, forceSync, yieldEndTime, __ST.workInProgressRootRecoverableErrors, __ST.workInProgressTransitions, __ST.workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, __ST.workInProgressDeferredLane, __ST.workInProgressRootInterleavedUpdatedLanes, __ST.workInProgressSuspendedRetryLanes, __ST.workInProgressRootDidSkipSuspendedSiblings, startTime, "Throttled", __ST.renderStartTime, yieldedFiber), renderWasConcurrent);
                    {
                      __lb_4 = true;
                      break;
                    }
                  }
                  __ST.commitRootWhenReady(forceSync, yieldEndTime, __ST.workInProgressRootRecoverableErrors, __ST.workInProgressTransitions, __ST.workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, __ST.workInProgressDeferredLane, __ST.workInProgressRootInterleavedUpdatedLanes, __ST.workInProgressSuspendedRetryLanes, __ST.workInProgressRootDidSkipSuspendedSiblings, startTime, undefined, __ST.renderStartTime, yieldedFiber);
                }
              }
              break;
            }
          }
        }
        break;
      } while (1);
      __ST.ensureRootIsScheduled(root);
    }(...__args);
  };
  __ST.scheduleUpdateOnFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, fiber, lane) {
      __ST.isRunningInsertionEffect && console.error("useInsertionEffect must not schedule updates.");
      __ST.isFlushingPassiveEffects && (__ST.didScheduleUpdateDuringPassiveEffects = !0);
      if (root === __ST.workInProgressRoot && (__ST.workInProgressSuspendedReason === __ST.SuspendedOnData || __ST.workInProgressSuspendedReason === __ST.SuspendedOnAction) || undefined !== root.cancelPendingCommit) __ST.prepareFreshStack(root, 0), __ST.markRootSuspended(root, __ST.workInProgressRootRenderLanes, __ST.workInProgressDeferredLane, !1);
      __ST.markRootUpdated_1(root, lane);
      if ((__ST.executionContext & __ST.RenderContext) !== __ST.NoContext && root === __ST.workInProgressRoot) {
        if (__ST.isRendering) switch (fiber.tag) {
          case 0:
          case 11:
          case 15:
            root = __ST.workInProgress && __ST.getComponentNameFromFiber(__ST.workInProgress) || "Unknown";
            __ST.didWarnAboutUpdateInRenderForAnotherComponent.has(root) || (__ST.didWarnAboutUpdateInRenderForAnotherComponent.add(root), fiber = __ST.getComponentNameFromFiber(fiber) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", fiber, root, root));
            break;
          case 1:
            __ST.didWarnAboutUpdateInRender || (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), __ST.didWarnAboutUpdateInRender = !0);
        }
      } else __ST.isDevToolsPresent && __ST.addFiberToLanesMap(root, fiber, lane), __ST.warnIfUpdatesNotWrappedWithActDEV(fiber), root === __ST.workInProgressRoot && ((__ST.executionContext & __ST.RenderContext) === __ST.NoContext && (__ST.workInProgressRootInterleavedUpdatedLanes |= lane), __ST.workInProgressRootExitStatus === __ST.RootSuspendedWithDelay && __ST.markRootSuspended(root, __ST.workInProgressRootRenderLanes, __ST.workInProgressDeferredLane, !1)), __ST.ensureRootIsScheduled(root);
    }(...__args);
  };
  __ST.requestDeferredLane = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let lane;
      if (0 === __ST.workInProgressDeferredLane) if (0 === (__ST.workInProgressRootRenderLanes & 536870912) || __ST.isHydrating) {
        lane = __ST.nextTransitionDeferredLane;
        __ST.nextTransitionDeferredLane <<= 1;
        0 === (__ST.nextTransitionDeferredLane & 3932160) && (__ST.nextTransitionDeferredLane = 262144);
        __ST.workInProgressDeferredLane = lane;
      } else __ST.workInProgressDeferredLane = 536870912;
      lane = __ST.suspenseHandlerStackCursor.current;
      undefined !== lane && (lane.flags |= 32);
      return __ST.workInProgressDeferredLane;
    }(...__args);
  };
  __ST.requestUpdateLane = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let transition;
      if ((__ST.executionContext & __ST.RenderContext) !== __ST.NoContext && 0 !== __ST.workInProgressRootRenderLanes) return __ST.workInProgressRootRenderLanes & -__ST.workInProgressRootRenderLanes;
      transition = __ST.ReactSharedInternals.T;
      return undefined !== transition ? (transition._updatedFibers || (transition._updatedFibers = __new(Set)), transition._updatedFibers.add(fiber), __ST.requestTransitionLane()) : __ST.resolveUpdatePriority();
    }(...__args);
  };
  __ST.isConcurrentActEnvironment = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let isReactActEnvironmentGlobal;
      isReactActEnvironmentGlobal = "undefined" !== typeOfJS(IS_REACT_ACT_ENVIRONMENT) ? IS_REACT_ACT_ENVIRONMENT : void 0;
      isReactActEnvironmentGlobal || undefined === __ST.ReactSharedInternals.actQueue || console.error("The current testing environment is not configured to support act(...)");
      return isReactActEnvironmentGlobal;
    }(...__args);
  };
  __ST.onCommitRoot = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.supportsTestSelectors && __forEach(__ST.commitHooks, function (commitHook) {
        return commitHook();
      });
    }(...__args);
  };
  __ST.findAllNodes = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (hostRoot, selectors) {
      let index, node, tag;
      if (!__ST.supportsTestSelectors) throw Error("Test selector API is not supported by this renderer.");
      hostRoot = __ST.findFiberRootForHostRoot(hostRoot);
      hostRoot = __ST.findPaths(hostRoot, selectors);
      selectors = __arrNew();
      hostRoot = __arrFrom(hostRoot);
      for (index = 0; index < __len(hostRoot);) {
        node = hostRoot[index++];
        tag = node.tag;
        if (5 === tag || 26 === tag || 27 === tag) __ST.isHiddenSubtree(node) || __push(selectors, node.stateNode);else for (node = node.child; undefined !== node;) __push(hostRoot, node), node = node.sibling;
      }
      return selectors;
    }(...__args);
  };
  __ST.findPaths = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, selectors) {
      let matchingFibers, index, fiber, tag, selectorIndex, selector;
      matchingFibers = __arrNew();
      root = __arrNew(root, 0);
      for (index = 0; index < __len(root);) {
        fiber = root[index++];
        tag = fiber.tag;
        selectorIndex = root[index++];
        selector = selectors[selectorIndex];
        if (5 !== tag && 26 !== tag && 27 !== tag || !__ST.isHiddenSubtree(fiber)) {
          for (; selector !== undefined && __ST.matchSelector(fiber, selector);) selectorIndex++, selector = selectors[selectorIndex];
          if (selectorIndex === __len(selectors)) __push(matchingFibers, fiber);else for (fiber = fiber.child; undefined !== fiber;) __push(root, fiber, selectorIndex), fiber = fiber.sibling;
        }
      }
      return matchingFibers;
    }(...__args);
  };
  __ST.selectorToString = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (selector) {
      switch (selector.$$typeof) {
        case __ST.COMPONENT_TYPE:
          return __cat(__cat("<", __ST.getComponentNameFromType(selector.value) || "Unknown"), ">");
        case __ST.HAS_PSEUDO_CLASS_TYPE:
          return __cat(__cat(":has(", __ST.selectorToString(selector) || ""), ")");
        case __ST.ROLE_TYPE:
          return __cat(__cat('[role="', selector.value), '"]');
        case __ST.TEXT_TYPE:
          return __cat(__cat('"', selector.value), '"');
        case __ST.TEST_NAME_TYPE:
          return __cat(__cat('[data-testname="', selector.value), '"]');
        default:
          throw Error("Invalid selector type specified.");
      }
    }(...__args);
  };
  __ST.matchSelector = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber_jscomp_0, selector) {
      let tag, fiber, tag_jscomp_0, selectorIndex, selector_jscomp_0;
      tag = fiber_jscomp_0.tag;
      switch (selector.$$typeof) {
        case __ST.COMPONENT_TYPE:
          if (fiber_jscomp_0.type === selector.value) return !0;
          break;
        case __ST.HAS_PSEUDO_CLASS_TYPE:
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
                  if (5 !== tag_jscomp_0 && 26 !== tag_jscomp_0 && 27 !== tag_jscomp_0 || !__ST.isHiddenSubtree(fiber)) {
                    for (; selector_jscomp_0 !== undefined && __ST.matchSelector(fiber, selector_jscomp_0);) selectorIndex++, selector_jscomp_0 = selector[selectorIndex];
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
        case __ST.ROLE_TYPE:
          if ((5 === tag || 26 === tag || 27 === tag) && __ST.matchAccessibilityRole(fiber_jscomp_0.stateNode, selector.value)) return !0;
          break;
        case __ST.TEXT_TYPE:
          if (5 === tag || 6 === tag || 26 === tag || 27 === tag) if (fiber_jscomp_0 = __ST.getTextContent(fiber_jscomp_0), undefined !== fiber_jscomp_0 && 0 <= __indexOf(fiber_jscomp_0, selector.value)) return !0;
          break;
        case __ST.TEST_NAME_TYPE:
          if (5 === tag || 26 === tag || 27 === tag) if (fiber_jscomp_0 = fiber_jscomp_0.memoizedProps["data-testname"], "string" === typeOfJS(fiber_jscomp_0) && __toLowerCase(fiber_jscomp_0) === __toLowerCase(selector.value)) return !0;
          break;
        default:
          throw Error("Invalid selector type specified.");
      }
      return !1;
    }(...__args);
  };
  __ST.findFiberRootForHostRoot = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (hostRoot) {
      let maybeFiber;
      maybeFiber = __ST.getInstanceFromNode(hostRoot);
      if (maybeFiber !== undefined) {
        if ("string" !== typeOfJS(maybeFiber.memoizedProps["data-testname"])) throw Error("Invalid host root specified. Should be either a React container or a node with a testname attribute.");
        return maybeFiber;
      }
      hostRoot = __ST.findFiberRoot(hostRoot);
      if (undefined === hostRoot) throw Error("Could not find React container within specified host subtree.");
      return hostRoot.stateNode.current;
    }(...__args);
  };
  __ST.commitPassiveUnmountEffectsInsideOfDeletedTree_begin = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (deletedSubtreeRoot, nearestMountedAncestor_jscomp_0) {
      let fiber, current, nearestMountedAncestor, prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate;
      for (; undefined !== __ST.nextEffect;) {
        fiber = __ST.nextEffect;
        current = fiber;
        nearestMountedAncestor = nearestMountedAncestor_jscomp_0;
        prevEffectStart = __ST.pushComponentEffectStart();
        prevEffectDuration = __ST.pushComponentEffectDuration();
        prevEffectErrors = __ST.pushComponentEffectErrors();
        prevEffectDidSpawnUpdate = __ST.pushComponentEffectDidSpawnUpdate();
        switch (current.tag) {
          case 0:
          case 11:
          case 15:
            __ST.commitHookPassiveUnmountEffects(current, nearestMountedAncestor, __ST.Passive);
            break;
          case 23:
          case 22:
            undefined !== current.memoizedState && undefined !== current.memoizedState.cachePool && (nearestMountedAncestor = current.memoizedState.cachePool.pool, nearestMountedAncestor !== undefined && __ST.retainCache(nearestMountedAncestor));
            break;
          case 24:
            __ST.releaseCache(current.memoizedState.cache);
        }
        (current.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && (__ST.componentEffectSpawnedUpdate || 0.05 < __ST.componentEffectDuration) && __ST.logComponentEffect(current, __ST.componentEffectStartTime, __ST.componentEffectEndTime, __ST.componentEffectDuration, __ST.componentEffectErrors);
        __ST.popComponentEffectStart(prevEffectStart);
        __ST.popComponentEffectDuration(prevEffectDuration);
        __ST.componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
        __ST.componentEffectErrors = prevEffectErrors;
        current = fiber.child;
        if (undefined !== current) current.return = fiber, __ST.nextEffect = current;else {
          fiber = deletedSubtreeRoot;
          let __lb_7 = false,
            __lc_7 = false;
          while (!__lb_7) {
            __lc_7 = false;
            while (undefined !== __ST.nextEffect) {
              {
                current = __ST.nextEffect;
                prevEffectStart = current.sibling;
                prevEffectDuration = current.return;
                __ST.detachFiberAfterEffects(current);
                if (current === fiber) {
                  __ST.nextEffect = undefined;
                  {
                    __lb_7 = true;
                    break;
                  }
                }
                if (undefined !== prevEffectStart) {
                  prevEffectStart.return = prevEffectDuration;
                  __ST.nextEffect = prevEffectStart;
                  {
                    __lb_7 = true;
                    break;
                  }
                }
                __ST.nextEffect = prevEffectDuration;
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
    }(...__args);
  };
  __ST.disconnectPassiveEffect = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork) {
      let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, instance;
      prevEffectStart = __ST.pushComponentEffectStart();
      prevEffectDuration = __ST.pushComponentEffectDuration();
      prevEffectErrors = __ST.pushComponentEffectErrors();
      prevEffectDidSpawnUpdate = __ST.pushComponentEffectDidSpawnUpdate();
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          __ST.commitHookPassiveUnmountEffects(finishedWork, finishedWork.return, __ST.Passive);
          __ST.recursivelyTraverseDisconnectPassiveEffects(finishedWork);
          break;
        case 22:
          instance = finishedWork.stateNode;
          instance._visibility & __ST.OffscreenPassiveEffectsConnected && (instance._visibility &= ~__ST.OffscreenPassiveEffectsConnected, __ST.recursivelyTraverseDisconnectPassiveEffects(finishedWork));
          break;
        default:
          __ST.recursivelyTraverseDisconnectPassiveEffects(finishedWork);
      }
      (finishedWork.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && (__ST.componentEffectSpawnedUpdate || 0.05 < __ST.componentEffectDuration) && __ST.logComponentEffect(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, __ST.componentEffectDuration, __ST.componentEffectErrors);
      __ST.popComponentEffectStart(prevEffectStart);
      __ST.popComponentEffectDuration(prevEffectDuration);
      __ST.componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
      __ST.componentEffectErrors = prevEffectErrors;
    }(...__args);
  };
  __ST.recursivelyTraverseDisconnectPassiveEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (parentFiber) {
      let deletions, i, childToDelete, prevEffectStart;
      deletions = parentFiber.deletions;
      if (0 !== (parentFiber.flags & 16)) {
        if (undefined !== deletions) for (i = 0; i < __len(deletions); i++) {
          childToDelete = deletions[i];
          prevEffectStart = __ST.pushComponentEffectStart();
          __ST.nextEffect = childToDelete;
          __ST.commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
          (childToDelete.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && 0.05 < __ST.componentEffectEndTime - __ST.componentEffectStartTime && __ST.logComponentTrigger(childToDelete, __ST.componentEffectStartTime, __ST.componentEffectEndTime, "Unmount");
          __ST.popComponentEffectStart(prevEffectStart);
        }
        __ST.detachAlternateSiblings(parentFiber);
      }
      for (parentFiber = parentFiber.child; undefined !== parentFiber;) __ST.disconnectPassiveEffect(parentFiber), parentFiber = parentFiber.sibling;
    }(...__args);
  };
  __ST.commitPassiveUnmountOnFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork) {
      let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, prevProfilerEffectDuration;
      prevEffectStart = __ST.pushComponentEffectStart();
      prevEffectDuration = __ST.pushComponentEffectDuration();
      prevEffectErrors = __ST.pushComponentEffectErrors();
      prevEffectDidSpawnUpdate = __ST.pushComponentEffectDidSpawnUpdate();
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          __ST.recursivelyTraversePassiveUnmountEffects(finishedWork);
          finishedWork.flags & 2048 && __ST.commitHookPassiveUnmountEffects(finishedWork, finishedWork.return, __ST.Passive | __ST.HasEffect);
          break;
        case 3:
          prevProfilerEffectDuration = __ST.pushNestedEffectDurations();
          __ST.recursivelyTraversePassiveUnmountEffects(finishedWork);
          finishedWork.stateNode.passiveEffectDuration += __ST.popNestedEffectDurations(prevProfilerEffectDuration);
          break;
        case 12:
          prevProfilerEffectDuration = __ST.pushNestedEffectDurations();
          __ST.recursivelyTraversePassiveUnmountEffects(finishedWork);
          finishedWork.stateNode.passiveEffectDuration += __ST.bubbleNestedEffectDurations(prevProfilerEffectDuration);
          break;
        case 22:
          prevProfilerEffectDuration = finishedWork.stateNode;
          undefined !== finishedWork.memoizedState && prevProfilerEffectDuration._visibility & __ST.OffscreenPassiveEffectsConnected && (undefined === finishedWork.return || 13 !== finishedWork.return.tag) ? (prevProfilerEffectDuration._visibility &= ~__ST.OffscreenPassiveEffectsConnected, __ST.recursivelyTraverseDisconnectPassiveEffects(finishedWork), (finishedWork.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && 0.05 < __ST.componentEffectEndTime - __ST.componentEffectStartTime && __ST.logComponentTrigger(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, "Disconnect")) : __ST.recursivelyTraversePassiveUnmountEffects(finishedWork);
          break;
        default:
          __ST.recursivelyTraversePassiveUnmountEffects(finishedWork);
      }
      (finishedWork.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && (__ST.componentEffectSpawnedUpdate || 0.05 < __ST.componentEffectDuration) && __ST.logComponentEffect(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, __ST.componentEffectDuration, __ST.componentEffectErrors);
      __ST.popComponentEffectStart(prevEffectStart);
      __ST.popComponentEffectDuration(prevEffectDuration);
      __ST.componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
      __ST.componentEffectErrors = prevEffectErrors;
    }(...__args);
  };
  __ST.recursivelyTraversePassiveUnmountEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (parentFiber) {
      let deletions, i, childToDelete, prevEffectStart;
      deletions = parentFiber.deletions;
      if (0 !== (parentFiber.flags & 16)) {
        if (undefined !== deletions) for (i = 0; i < __len(deletions); i++) {
          childToDelete = deletions[i];
          prevEffectStart = __ST.pushComponentEffectStart();
          __ST.nextEffect = childToDelete;
          __ST.commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
          (childToDelete.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && 0.05 < __ST.componentEffectEndTime - __ST.componentEffectStartTime && __ST.logComponentTrigger(childToDelete, __ST.componentEffectStartTime, __ST.componentEffectEndTime, "Unmount");
          __ST.popComponentEffectStart(prevEffectStart);
        }
        __ST.detachAlternateSiblings(parentFiber);
      }
      if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; undefined !== parentFiber;) __ST.commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
    }(...__args);
  };
  __ST.detachAlternateSiblings = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (parentFiber) {
      let previousFiber;
      previousFiber = parentFiber.alternate;
      if (undefined !== previousFiber && (parentFiber = previousFiber.child, undefined !== parentFiber)) {
        previousFiber.child = undefined;
        do previousFiber = parentFiber.sibling, parentFiber.sibling = undefined, parentFiber = previousFiber; while (undefined !== parentFiber);
      }
    }(...__args);
  };
  __ST.accumulateSuspenseyCommitOnFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, committedLanes, suspendedState) {
      let instance, __type;
      switch (fiber.tag) {
        case 26:
          __ST.recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
          if (fiber.flags & __ST.suspenseyCommitFlag) if (undefined !== fiber.memoizedState) __ST.suspendResource(suspendedState, __ST.currentHoistableRoot, fiber.memoizedState, fiber.memoizedProps);else {
            instance = fiber.stateNode;
            __type = fiber.type;
            fiber = fiber.memoizedProps;
            ((committedLanes & 335544128) === committedLanes || __ST.maySuspendCommitInSyncRender(__type, fiber)) && __ST.suspendInstance(suspendedState, instance, __type, fiber);
          }
          break;
        case 5:
          __ST.recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
          fiber.flags & __ST.suspenseyCommitFlag && (instance = fiber.stateNode, __type = fiber.type, fiber = fiber.memoizedProps, ((committedLanes & 335544128) === committedLanes || __ST.maySuspendCommitInSyncRender(__type, fiber)) && __ST.suspendInstance(suspendedState, instance, __type, fiber));
          break;
        case 3:
        case 4:
          __ST.supportsResources ? (instance = __ST.currentHoistableRoot, __ST.currentHoistableRoot = __ST.getHoistableRoot(fiber.stateNode.containerInfo), __ST.recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState), __ST.currentHoistableRoot = instance) : __ST.recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
          break;
        case 22:
          undefined === fiber.memoizedState && (instance = fiber.alternate, undefined !== instance && undefined !== instance.memoizedState ? (instance = __ST.suspenseyCommitFlag, __ST.suspenseyCommitFlag = 16777216, __ST.recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState), __ST.suspenseyCommitFlag = instance) : __ST.recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState));
          break;
        default:
          __ST.recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
      }
    }(...__args);
  };
  __ST.recursivelyAccumulateSuspenseyCommit = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (parentFiber, committedLanes, suspendedState) {
      if (parentFiber.subtreeFlags & __ST.suspenseyCommitFlag) for (parentFiber = parentFiber.child; undefined !== parentFiber;) __ST.accumulateSuspenseyCommitOnFiber(parentFiber, committedLanes, suspendedState), parentFiber = parentFiber.sibling;
    }(...__args);
  };
  __ST.recursivelyTraverseAtomicPassiveEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedRoot_jscomp_0, parentFiber, committedLanes_jscomp_0, committedTransitions_jscomp_0, endTime_jscomp_0) {
      let child, finishedRoot, committedLanes, committedTransitions, endTime, prevDeepEquality, flags;
      if (parentFiber.subtreeFlags & 10256 || 0 !== parentFiber.actualDuration && (undefined === parentFiber.alternate || parentFiber.alternate.child !== parentFiber.child)) for (child = parentFiber.child; undefined !== child;) {
        parentFiber = child.sibling;
        finishedRoot = finishedRoot_jscomp_0;
        committedLanes = committedLanes_jscomp_0;
        committedTransitions = committedTransitions_jscomp_0;
        endTime = undefined !== parentFiber ? parentFiber.actualStartTime : endTime_jscomp_0;
        prevDeepEquality = __ST.alreadyWarnedForDeepEquality;
        (child.mode & 2) !== __ST.NoMode && 0 < child.actualStartTime && 0 !== (child.flags & 1) && __ST.logComponentRender(child, child.actualStartTime, endTime, __ST.inHydratedSubtree, committedLanes);
        flags = child.flags;
        switch (child.tag) {
          case 22:
            __ST.recursivelyTraverseAtomicPassiveEffects(finishedRoot, child, committedLanes, committedTransitions, endTime);
            flags & 2048 && __ST.commitOffscreenPassiveMountEffects(child.alternate, child);
            break;
          case 24:
            __ST.recursivelyTraverseAtomicPassiveEffects(finishedRoot, child, committedLanes, committedTransitions, endTime);
            flags & 2048 && __ST.commitCachePassiveMountEffect(child.alternate, child);
            break;
          default:
            __ST.recursivelyTraverseAtomicPassiveEffects(finishedRoot, child, committedLanes, committedTransitions, endTime);
        }
        __ST.alreadyWarnedForDeepEquality = prevDeepEquality;
        child = parentFiber;
      }
    }(...__args);
  };
  __ST.reconnectPassiveEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime) {
      let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, prevDeepEquality, flags, _instance2;
      prevEffectStart = __ST.pushComponentEffectStart();
      prevEffectDuration = __ST.pushComponentEffectDuration();
      prevEffectErrors = __ST.pushComponentEffectErrors();
      prevEffectDidSpawnUpdate = __ST.pushComponentEffectDidSpawnUpdate();
      prevDeepEquality = __ST.alreadyWarnedForDeepEquality;
      includeWorkInProgressEffects && (finishedWork.mode & 2) !== __ST.NoMode && 0 < finishedWork.actualStartTime && 0 !== (finishedWork.flags & 1) && __ST.logComponentRender(finishedWork, finishedWork.actualStartTime, endTime, __ST.inHydratedSubtree, committedLanes);
      flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          __ST.recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime);
          __ST.commitHookPassiveMountEffects(finishedWork, __ST.Passive);
          break;
        case 23:
          break;
        case 22:
          _instance2 = finishedWork.stateNode;
          undefined !== finishedWork.memoizedState ? _instance2._visibility & __ST.OffscreenPassiveEffectsConnected ? __ST.recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime) : __ST.recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime) : (_instance2._visibility |= __ST.OffscreenPassiveEffectsConnected, __ST.recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime));
          includeWorkInProgressEffects && flags & 2048 && __ST.commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
          break;
        case 24:
          __ST.recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime);
          includeWorkInProgressEffects && flags & 2048 && __ST.commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          __ST.recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime);
      }
      (finishedWork.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && (__ST.componentEffectSpawnedUpdate || 0.05 < __ST.componentEffectDuration) && __ST.logComponentEffect(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, __ST.componentEffectDuration, __ST.componentEffectErrors);
      __ST.popComponentEffectStart(prevEffectStart);
      __ST.popComponentEffectDuration(prevEffectDuration);
      __ST.componentEffectErrors = prevEffectErrors;
      __ST.componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
      __ST.alreadyWarnedForDeepEquality = prevDeepEquality;
    }(...__args);
  };
  __ST.recursivelyTraverseReconnectPassiveEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedRoot, parentFiber, committedLanes, committedTransitions, includeWorkInProgressEffects, endTime) {
      let nextSibling;
      includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || 0 !== parentFiber.actualDuration && (undefined === parentFiber.alternate || parentFiber.alternate.child !== parentFiber.child));
      for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
        nextSibling = parentFiber.sibling;
        __ST.reconnectPassiveEffects(finishedRoot, parentFiber, committedLanes, committedTransitions, includeWorkInProgressEffects, undefined !== nextSibling ? nextSibling.actualStartTime : endTime);
        parentFiber = nextSibling;
      }
    }(...__args);
  };
  __ST.commitPassiveMountOnFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedRoot, finishedWork, committedLanes, committedTransitions, endTime) {
      let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, prevDeepEquality, flags, prevProfilerEffectDuration, wasInHydratedSubtree;
      prevEffectStart = __ST.pushComponentEffectStart();
      prevEffectDuration = __ST.pushComponentEffectDuration();
      prevEffectErrors = __ST.pushComponentEffectErrors();
      prevEffectDidSpawnUpdate = __ST.pushComponentEffectDidSpawnUpdate();
      prevDeepEquality = __ST.alreadyWarnedForDeepEquality;
      flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          (finishedWork.mode & 2) !== __ST.NoMode && 0 < finishedWork.actualStartTime && 0 !== (finishedWork.flags & 1) && __ST.logComponentRender(finishedWork, finishedWork.actualStartTime, endTime, __ST.inHydratedSubtree, committedLanes);
          __ST.recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
          flags & 2048 && __ST.commitHookPassiveMountEffects(finishedWork, __ST.Passive | __ST.HasEffect);
          break;
        case 1:
          (finishedWork.mode & 2) !== __ST.NoMode && 0 < finishedWork.actualStartTime && (0 !== (finishedWork.flags & 128) ? __ST.logComponentErrored(finishedWork, finishedWork.actualStartTime, endTime, __arrNew()) : 0 !== (finishedWork.flags & 1) && __ST.logComponentRender(finishedWork, finishedWork.actualStartTime, endTime, __ST.inHydratedSubtree, committedLanes));
          __ST.recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
          break;
        case 3:
          prevProfilerEffectDuration = __ST.pushNestedEffectDurations();
          wasInHydratedSubtree = __ST.inHydratedSubtree;
          __ST.inHydratedSubtree = undefined !== finishedWork.alternate && finishedWork.alternate.memoizedState.isDehydrated && 0 === (finishedWork.flags & 256);
          __ST.recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
          __ST.inHydratedSubtree = wasInHydratedSubtree;
          flags & 2048 && (committedLanes = undefined, undefined !== finishedWork.alternate && (committedLanes = finishedWork.alternate.memoizedState.cache), committedTransitions = finishedWork.memoizedState.cache, committedTransitions !== committedLanes && (__ST.retainCache(committedTransitions), committedLanes !== undefined && __ST.releaseCache(committedLanes)));
          finishedRoot.passiveEffectDuration += __ST.popNestedEffectDurations(prevProfilerEffectDuration);
          break;
        case 12:
          if (flags & 2048) {
            flags = __ST.pushNestedEffectDurations();
            __ST.recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
            finishedRoot = finishedWork.stateNode;
            finishedRoot.passiveEffectDuration += __ST.bubbleNestedEffectDurations(flags);
            try {
              __ST.runWithFiberInDEV(finishedWork, __ST.commitProfilerPostCommitImpl, finishedWork, finishedWork.alternate, __ST.commitStartTime, finishedRoot.passiveEffectDuration);
            } catch (__error) {
              __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
          } else __ST.recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
          break;
        case 31:
          flags = __ST.inHydratedSubtree;
          prevProfilerEffectDuration = undefined !== finishedWork.alternate ? finishedWork.alternate.memoizedState : undefined;
          wasInHydratedSubtree = finishedWork.memoizedState;
          undefined !== prevProfilerEffectDuration && undefined === wasInHydratedSubtree ? (wasInHydratedSubtree = finishedWork.deletions, undefined !== wasInHydratedSubtree && 0 < __len(wasInHydratedSubtree) && 18 === wasInHydratedSubtree[0].tag ? (__ST.inHydratedSubtree = !1, prevProfilerEffectDuration = prevProfilerEffectDuration.hydrationErrors, undefined !== prevProfilerEffectDuration && __ST.logComponentErrored(finishedWork, finishedWork.actualStartTime, endTime, prevProfilerEffectDuration)) : __ST.inHydratedSubtree = !0) : __ST.inHydratedSubtree = !1;
          __ST.recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
          __ST.inHydratedSubtree = flags;
          break;
        case 13:
          flags = __ST.inHydratedSubtree;
          prevProfilerEffectDuration = undefined !== finishedWork.alternate ? finishedWork.alternate.memoizedState : undefined;
          wasInHydratedSubtree = finishedWork.memoizedState;
          undefined === prevProfilerEffectDuration || undefined === prevProfilerEffectDuration.dehydrated || undefined !== wasInHydratedSubtree && undefined !== wasInHydratedSubtree.dehydrated ? __ST.inHydratedSubtree = !1 : (wasInHydratedSubtree = finishedWork.deletions, undefined !== wasInHydratedSubtree && 0 < __len(wasInHydratedSubtree) && 18 === wasInHydratedSubtree[0].tag ? (__ST.inHydratedSubtree = !1, prevProfilerEffectDuration = prevProfilerEffectDuration.hydrationErrors, undefined !== prevProfilerEffectDuration && __ST.logComponentErrored(finishedWork, finishedWork.actualStartTime, endTime, prevProfilerEffectDuration)) : __ST.inHydratedSubtree = !0);
          __ST.recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
          __ST.inHydratedSubtree = flags;
          break;
        case 23:
          break;
        case 22:
          wasInHydratedSubtree = finishedWork.stateNode;
          prevProfilerEffectDuration = finishedWork.alternate;
          undefined !== finishedWork.memoizedState ? wasInHydratedSubtree._visibility & __ST.OffscreenPassiveEffectsConnected ? __ST.recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime) : __ST.recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime) : wasInHydratedSubtree._visibility & __ST.OffscreenPassiveEffectsConnected ? __ST.recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime) : (wasInHydratedSubtree._visibility |= __ST.OffscreenPassiveEffectsConnected, __ST.recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, 0 !== (finishedWork.subtreeFlags & 10256) || 0 !== finishedWork.actualDuration && (undefined === finishedWork.alternate || finishedWork.alternate.child !== finishedWork.child), endTime), (finishedWork.mode & 2) === __ST.NoMode || __ST.inHydratedSubtree || (finishedRoot = finishedWork.actualStartTime, 0 <= finishedRoot && 0.05 < endTime - finishedRoot && __ST.logComponentReappeared(finishedWork, finishedRoot, endTime), 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && 0.05 < __ST.componentEffectEndTime - __ST.componentEffectStartTime && __ST.logComponentReappeared(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime)));
          flags & 2048 && __ST.commitOffscreenPassiveMountEffects(prevProfilerEffectDuration, finishedWork);
          break;
        case 24:
          __ST.recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
          flags & 2048 && __ST.commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          __ST.recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, endTime);
      }
      if ((finishedWork.mode & 2) !== __ST.NoMode) {
        if (finishedRoot = !__ST.inHydratedSubtree && undefined === finishedWork.alternate && undefined !== finishedWork.return && undefined !== finishedWork.return.alternate) committedLanes = finishedWork.actualStartTime, 0 <= committedLanes && 0.05 < endTime - committedLanes && __ST.logComponentTrigger(finishedWork, committedLanes, endTime, "Mount");
        0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && ((__ST.componentEffectSpawnedUpdate || 0.05 < __ST.componentEffectDuration) && __ST.logComponentEffect(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, __ST.componentEffectDuration, __ST.componentEffectErrors), finishedRoot && 0.05 < __ST.componentEffectEndTime - __ST.componentEffectStartTime && __ST.logComponentTrigger(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, "Mount"));
      }
      __ST.popComponentEffectStart(prevEffectStart);
      __ST.popComponentEffectDuration(prevEffectDuration);
      __ST.componentEffectErrors = prevEffectErrors;
      __ST.componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
      __ST.alreadyWarnedForDeepEquality = prevDeepEquality;
    }(...__args);
  };
  __ST.recursivelyTraversePassiveMountEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, parentFiber, committedLanes, committedTransitions, endTime) {
      let nextSibling;
      if (parentFiber.subtreeFlags & 10256 || 0 !== parentFiber.actualDuration && (undefined === parentFiber.alternate || parentFiber.alternate.child !== parentFiber.child)) for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
        nextSibling = parentFiber.sibling;
        __ST.commitPassiveMountOnFiber(root, parentFiber, committedLanes, committedTransitions, undefined !== nextSibling ? nextSibling.actualStartTime : endTime);
        parentFiber = nextSibling;
      }
    }(...__args);
  };
  __ST.commitCachePassiveMountEffect = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, finishedWork) {
      current = undefined;
      undefined !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
      finishedWork = finishedWork.memoizedState.cache;
      finishedWork !== current && (__ST.retainCache(finishedWork), current !== undefined && __ST.releaseCache(current));
    }(...__args);
  };
  __ST.commitOffscreenPassiveMountEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, finishedWork) {
      let previousCache;
      previousCache = undefined;
      undefined !== current && undefined !== current.memoizedState && undefined !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
      current = undefined;
      undefined !== finishedWork.memoizedState && undefined !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
      current !== previousCache && (current !== undefined && __ST.retainCache(current), previousCache !== undefined && __ST.releaseCache(previousCache));
    }(...__args);
  };
  __ST.recursivelyTraverseReappearLayoutEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedRoot, parentFiber, includeWorkInProgressEffects) {
      includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
      for (parentFiber = parentFiber.child; undefined !== parentFiber;) __ST.reappearLayoutEffects(finishedRoot, parentFiber.alternate, parentFiber, includeWorkInProgressEffects), parentFiber = parentFiber.sibling;
    }(...__args);
  };
  __ST.reappearLayoutEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedRoot, current, finishedWork, includeWorkInProgressEffects) {
      let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, flags;
      prevEffectStart = __ST.pushComponentEffectStart();
      prevEffectDuration = __ST.pushComponentEffectDuration();
      prevEffectErrors = __ST.pushComponentEffectErrors();
      prevEffectDidSpawnUpdate = __ST.pushComponentEffectDidSpawnUpdate();
      flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          __ST.recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
          __ST.commitHookLayoutEffects(finishedWork, __ST.Layout);
          break;
        case 1:
          __ST.recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
          current = finishedWork.stateNode;
          "function" === typeOfJS(current.componentDidMount) && __ST.runWithFiberInDEV(finishedWork, __ST.callComponentDidMountInDEV, finishedWork, current);
          current = finishedWork.updateQueue;
          if (undefined !== current) {
            finishedRoot = finishedWork.stateNode;
            try {
              __ST.runWithFiberInDEV(finishedWork, __ST.commitHiddenCallbacks, current, finishedRoot);
            } catch (__error) {
              __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
          }
          includeWorkInProgressEffects && flags & 64 && __ST.commitClassCallbacks(finishedWork);
          __ST.safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 27:
          __ST.supportsSingletons && __ST.commitHostSingletonAcquisition(finishedWork);
        case 26:
        case 5:
          __ST.recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
          includeWorkInProgressEffects && undefined === current && flags & 4 && __ST.commitHostMount(finishedWork);
          __ST.safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 12:
          if (includeWorkInProgressEffects && flags & 4) {
            flags = __ST.pushNestedEffectDurations();
            __ST.recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
            includeWorkInProgressEffects = finishedWork.stateNode;
            includeWorkInProgressEffects.effectDuration += __ST.bubbleNestedEffectDurations(flags);
            try {
              __ST.runWithFiberInDEV(finishedWork, __ST.commitProfiler, finishedWork, current, __ST.commitStartTime, includeWorkInProgressEffects.effectDuration);
            } catch (__error) {
              __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
          } else __ST.recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
          break;
        case 31:
          __ST.recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
          includeWorkInProgressEffects && flags & 4 && __ST.commitActivityHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 13:
          __ST.recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
          includeWorkInProgressEffects && flags & 4 && __ST.commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 22:
          undefined === finishedWork.memoizedState && __ST.recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
          __ST.safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 30:
          break;
        default:
          __ST.recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
      }
      (finishedWork.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && (__ST.componentEffectSpawnedUpdate || 0.05 < __ST.componentEffectDuration) && __ST.logComponentEffect(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, __ST.componentEffectDuration, __ST.componentEffectErrors);
      __ST.popComponentEffectStart(prevEffectStart);
      __ST.popComponentEffectDuration(prevEffectDuration);
      __ST.componentEffectErrors = prevEffectErrors;
      __ST.componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
    }(...__args);
  };
  __ST.recursivelyTraverseDisappearLayoutEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (parentFiber) {
      for (parentFiber = parentFiber.child; undefined !== parentFiber;) __ST.disappearLayoutEffects(parentFiber), parentFiber = parentFiber.sibling;
    }(...__args);
  };
  __ST.disappearLayoutEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork) {
      let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, instance;
      prevEffectStart = __ST.pushComponentEffectStart();
      prevEffectDuration = __ST.pushComponentEffectDuration();
      prevEffectErrors = __ST.pushComponentEffectErrors();
      prevEffectDidSpawnUpdate = __ST.pushComponentEffectDidSpawnUpdate();
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          __ST.commitHookLayoutUnmountEffects(finishedWork, finishedWork.return, __ST.Layout);
          __ST.recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 1:
          __ST.safelyDetachRef(finishedWork, finishedWork.return);
          instance = finishedWork.stateNode;
          "function" === typeOfJS(instance.componentWillUnmount) && __ST.safelyCallComponentWillUnmount(finishedWork, finishedWork.return, instance);
          __ST.recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 27:
          __ST.supportsSingletons && __ST.runWithFiberInDEV(finishedWork, __ST.releaseSingletonInstance, finishedWork.stateNode);
        case 26:
        case 5:
          __ST.safelyDetachRef(finishedWork, finishedWork.return);
          __ST.recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 22:
          undefined === finishedWork.memoizedState && __ST.recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 30:
          __ST.recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        default:
          __ST.recursivelyTraverseDisappearLayoutEffects(finishedWork);
      }
      (finishedWork.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && (__ST.componentEffectSpawnedUpdate || 0.05 < __ST.componentEffectDuration) && __ST.logComponentEffect(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, __ST.componentEffectDuration, __ST.componentEffectErrors);
      __ST.popComponentEffectStart(prevEffectStart);
      __ST.popComponentEffectDuration(prevEffectDuration);
      __ST.componentEffectErrors = prevEffectErrors;
      __ST.componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
    }(...__args);
  };
  __ST.recursivelyTraverseLayoutEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, parentFiber) {
      if (parentFiber.subtreeFlags & 8772) for (parentFiber = parentFiber.child; undefined !== parentFiber;) __ST.commitLayoutEffectOnFiber(root, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
    }(...__args);
  };
  __ST.recursivelyResetForms = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (parentFiber) {
      let fiber;
      if (parentFiber.subtreeFlags & 1024) for (parentFiber = parentFiber.child; undefined !== parentFiber;) {
        fiber = parentFiber;
        __ST.recursivelyResetForms(fiber);
        5 === fiber.tag && fiber.flags & 1024 && __ST.resetFormInstance(fiber.stateNode);
        parentFiber = parentFiber.sibling;
      }
    }(...__args);
  };
  __ST.commitReconciliationEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork) {
      let flags;
      flags = finishedWork.flags;
      if (flags & 2) {
        try {
          __ST.runWithFiberInDEV(finishedWork, __ST.commitPlacement, finishedWork);
        } catch (__error) {
          __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
        }
        finishedWork.flags &= -3;
      }
      flags & 4096 && (finishedWork.flags &= -4097);
    }(...__args);
  };
  __ST.commitMutationEffectsOnFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork, root) {
      let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, current, flags, hoistableRoot, previousHoistableRoot, wasHidden, prevOffscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden, instance, instance_jscomp_0;
      prevEffectStart = __ST.pushComponentEffectStart();
      prevEffectDuration = __ST.pushComponentEffectDuration();
      prevEffectErrors = __ST.pushComponentEffectErrors();
      prevEffectDidSpawnUpdate = __ST.pushComponentEffectDidSpawnUpdate();
      current = finishedWork.alternate;
      flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          __ST.recursivelyTraverseMutationEffects(root, finishedWork);
          __ST.commitReconciliationEffects(finishedWork);
          flags & 4 && (__ST.commitHookEffectListUnmount(__ST.Insertion | __ST.HasEffect, finishedWork, finishedWork.return), __ST.commitHookEffectListMount(__ST.Insertion | __ST.HasEffect, finishedWork), __ST.commitHookLayoutUnmountEffects(finishedWork, finishedWork.return, __ST.Layout | __ST.HasEffect));
          break;
        case 1:
          __ST.recursivelyTraverseMutationEffects(root, finishedWork);
          __ST.commitReconciliationEffects(finishedWork);
          flags & 512 && (__ST.offscreenSubtreeWasHidden || undefined === current || __ST.safelyDetachRef(current, current.return));
          flags & 64 && __ST.offscreenSubtreeIsHidden && (flags = finishedWork.updateQueue, undefined !== flags && (current = flags.callbacks, undefined !== current && (root = flags.shared.hiddenCallbacks, flags.shared.hiddenCallbacks = undefined === root ? current : __concat(root, current))));
          break;
        case 26:
          if (__ST.supportsResources) {
            hoistableRoot = __ST.currentHoistableRoot;
            __ST.recursivelyTraverseMutationEffects(root, finishedWork);
            __ST.commitReconciliationEffects(finishedWork);
            flags & 512 && (__ST.offscreenSubtreeWasHidden || undefined === current || __ST.safelyDetachRef(current, current.return));
            flags & 4 && (flags = undefined !== current ? current.memoizedState : undefined, root = finishedWork.memoizedState, undefined === current ? undefined === root ? undefined === finishedWork.stateNode ? finishedWork.stateNode = __ST.hydrateHoistable(hoistableRoot, finishedWork.type, finishedWork.memoizedProps, finishedWork) : __ST.mountHoistable(hoistableRoot, finishedWork.type, finishedWork.stateNode) : finishedWork.stateNode = __ST.acquireResource(hoistableRoot, root, finishedWork.memoizedProps) : flags !== root ? (undefined === flags ? undefined !== current.stateNode && __ST.unmountHoistable(current.stateNode) : __ST.releaseResource(flags), undefined === root ? __ST.mountHoistable(hoistableRoot, finishedWork.type, finishedWork.stateNode) : __ST.acquireResource(hoistableRoot, root, finishedWork.memoizedProps)) : undefined === root && undefined !== finishedWork.stateNode && __ST.commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps));
            break;
          }
        case 27:
          if (__ST.supportsSingletons) {
            __ST.recursivelyTraverseMutationEffects(root, finishedWork);
            __ST.commitReconciliationEffects(finishedWork);
            flags & 512 && (__ST.offscreenSubtreeWasHidden || undefined === current || __ST.safelyDetachRef(current, current.return));
            undefined !== current && flags & 4 && __ST.commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
            break;
          }
        case 5:
          __ST.recursivelyTraverseMutationEffects(root, finishedWork);
          __ST.commitReconciliationEffects(finishedWork);
          flags & 512 && (__ST.offscreenSubtreeWasHidden || undefined === current || __ST.safelyDetachRef(current, current.return));
          if (__ST.supportsMutation) {
            if (finishedWork.flags & 32) {
              root = finishedWork.stateNode;
              try {
                __ST.runWithFiberInDEV(finishedWork, __ST.resetTextContent, root);
              } catch (__error) {
                __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
              }
            }
            flags & 4 && finishedWork.stateNode !== undefined && (root = finishedWork.memoizedProps, __ST.commitHostUpdate(finishedWork, root, undefined !== current ? current.memoizedProps : root));
            flags & 1024 && (__ST.needsFormReset = !0, "form" !== finishedWork.type && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
          } else __ST.supportsPersistence && undefined !== finishedWork.alternate && (finishedWork.alternate.stateNode = finishedWork.stateNode);
          break;
        case 6:
          __ST.recursivelyTraverseMutationEffects(root, finishedWork);
          __ST.commitReconciliationEffects(finishedWork);
          if (flags & 4 && __ST.supportsMutation) {
            if (undefined === finishedWork.stateNode) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            flags = finishedWork.memoizedProps;
            current = undefined !== current ? current.memoizedProps : flags;
            root = finishedWork.stateNode;
            try {
              __ST.runWithFiberInDEV(finishedWork, __ST.commitTextUpdate, root, current, flags);
            } catch (__error) {
              __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
          }
          break;
        case 3:
          hoistableRoot = __ST.pushNestedEffectDurations();
          if (__ST.supportsResources) {
            __ST.prepareToCommitHoistables();
            previousHoistableRoot = __ST.currentHoistableRoot;
            __ST.currentHoistableRoot = __ST.getHoistableRoot(root.containerInfo);
            __ST.recursivelyTraverseMutationEffects(root, finishedWork);
            __ST.currentHoistableRoot = previousHoistableRoot;
          } else __ST.recursivelyTraverseMutationEffects(root, finishedWork);
          __ST.commitReconciliationEffects(finishedWork);
          if (flags & 4) {
            if (__ST.supportsMutation && __ST.supportsHydration && undefined !== current && current.memoizedState.isDehydrated) try {
              __ST.runWithFiberInDEV(finishedWork, __ST.commitHydratedContainer, root.containerInfo);
            } catch (__error) {
              __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
            if (__ST.supportsPersistence) {
              flags = root.containerInfo;
              current = root.pendingChildren;
              try {
                __ST.runWithFiberInDEV(finishedWork, __ST.replaceContainerChildren, flags, current);
              } catch (__error) {
                __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
              }
            }
          }
          __ST.needsFormReset && (__ST.needsFormReset = !1, __ST.recursivelyResetForms(finishedWork));
          root.effectDuration += __ST.popNestedEffectDurations(hoistableRoot);
          break;
        case 4:
          __ST.supportsResources ? (current = __ST.currentHoistableRoot, __ST.currentHoistableRoot = __ST.getHoistableRoot(finishedWork.stateNode.containerInfo), __ST.recursivelyTraverseMutationEffects(root, finishedWork), __ST.commitReconciliationEffects(finishedWork), __ST.currentHoistableRoot = current) : (__ST.recursivelyTraverseMutationEffects(root, finishedWork), __ST.commitReconciliationEffects(finishedWork));
          flags & 4 && __ST.supportsPersistence && __ST.commitHostPortalContainerChildren(finishedWork.stateNode, finishedWork, finishedWork.stateNode.pendingChildren);
          break;
        case 12:
          flags = __ST.pushNestedEffectDurations();
          __ST.recursivelyTraverseMutationEffects(root, finishedWork);
          __ST.commitReconciliationEffects(finishedWork);
          finishedWork.stateNode.effectDuration += __ST.bubbleNestedEffectDurations(flags);
          break;
        case 31:
          __ST.recursivelyTraverseMutationEffects(root, finishedWork);
          __ST.commitReconciliationEffects(finishedWork);
          flags & 4 && (flags = finishedWork.updateQueue, undefined !== flags && (finishedWork.updateQueue = undefined, __ST.attachSuspenseRetryListeners(finishedWork, flags)));
          break;
        case 13:
          __ST.recursivelyTraverseMutationEffects(root, finishedWork);
          __ST.commitReconciliationEffects(finishedWork);
          finishedWork.child.flags & 8192 && undefined !== finishedWork.memoizedState !== (undefined !== current && undefined !== current.memoizedState) && (__ST.globalMostRecentFallbackTime = __ST.now_1());
          flags & 4 && (flags = finishedWork.updateQueue, undefined !== flags && (finishedWork.updateQueue = undefined, __ST.attachSuspenseRetryListeners(finishedWork, flags)));
          break;
        case 22:
          hoistableRoot = undefined !== finishedWork.memoizedState;
          wasHidden = undefined !== current && undefined !== current.memoizedState;
          prevOffscreenSubtreeIsHidden = __ST.offscreenSubtreeIsHidden;
          prevOffscreenSubtreeWasHidden = __ST.offscreenSubtreeWasHidden;
          __ST.offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || hoistableRoot;
          __ST.offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || wasHidden;
          __ST.recursivelyTraverseMutationEffects(root, finishedWork);
          __ST.offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
          __ST.offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
          wasHidden && !hoistableRoot && !prevOffscreenSubtreeIsHidden && !prevOffscreenSubtreeWasHidden && (finishedWork.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && 0.05 < __ST.componentEffectEndTime - __ST.componentEffectStartTime && __ST.logComponentReappeared(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime);
          __ST.commitReconciliationEffects(finishedWork);
          if (flags & 8192 && (root = finishedWork.stateNode, root._visibility = hoistableRoot ? root._visibility & ~__ST.OffscreenVisible : root._visibility | __ST.OffscreenVisible, !hoistableRoot || undefined === current || wasHidden || __ST.offscreenSubtreeIsHidden || __ST.offscreenSubtreeWasHidden || (__ST.recursivelyTraverseDisappearLayoutEffects(finishedWork), (finishedWork.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && 0.05 < __ST.componentEffectEndTime - __ST.componentEffectStartTime && __ST.logComponentTrigger(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, "Disconnect")), __ST.supportsMutation)) {
            let __lb_8 = false,
              __lc_8 = false;
            while (!__lb_8) {
              if (current = undefined, __ST.supportsMutation) for (root = finishedWork;;) {
                if (5 === root.tag || __ST.supportsResources && 26 === root.tag) {
                  if (undefined === current) {
                    wasHidden = current = root;
                    try {
                      previousHoistableRoot = wasHidden.stateNode, hoistableRoot ? __ST.runWithFiberInDEV(wasHidden, __ST.hideInstance, previousHoistableRoot) : __ST.runWithFiberInDEV(wasHidden, __ST.unhideInstance, wasHidden.stateNode, wasHidden.memoizedProps);
                    } catch (__error) {
                      __ST.captureCommitPhaseError(wasHidden, wasHidden.return, __error);
                    }
                  }
                } else if (6 === root.tag) {
                  if (undefined === current) {
                    wasHidden = root;
                    try {
                      instance = wasHidden.stateNode;
                      hoistableRoot ? __ST.runWithFiberInDEV(wasHidden, __ST.hideTextInstance, instance) : __ST.runWithFiberInDEV(wasHidden, __ST.unhideTextInstance, instance, wasHidden.memoizedProps);
                    } catch (__error) {
                      __ST.captureCommitPhaseError(wasHidden, wasHidden.return, __error);
                    }
                  }
                } else if (18 === root.tag) {
                  if (undefined === current) {
                    wasHidden = root;
                    try {
                      instance_jscomp_0 = wasHidden.stateNode;
                      hoistableRoot ? __ST.runWithFiberInDEV(wasHidden, __ST.hideDehydratedBoundary, instance_jscomp_0) : __ST.runWithFiberInDEV(wasHidden, __ST.unhideDehydratedBoundary, wasHidden.stateNode);
                    } catch (__error) {
                      __ST.captureCommitPhaseError(wasHidden, wasHidden.return, __error);
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
          flags & 4 && (flags = finishedWork.updateQueue, undefined !== flags && (current = flags.retryQueue, undefined !== current && (flags.retryQueue = undefined, __ST.attachSuspenseRetryListeners(finishedWork, current))));
          break;
        case 19:
          __ST.recursivelyTraverseMutationEffects(root, finishedWork);
          __ST.commitReconciliationEffects(finishedWork);
          flags & 4 && (flags = finishedWork.updateQueue, undefined !== flags && (finishedWork.updateQueue = undefined, __ST.attachSuspenseRetryListeners(finishedWork, flags)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          __ST.recursivelyTraverseMutationEffects(root, finishedWork), __ST.commitReconciliationEffects(finishedWork);
      }
      (finishedWork.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && ((__ST.componentEffectSpawnedUpdate || 0.05 < __ST.componentEffectDuration) && __ST.logComponentEffect(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, __ST.componentEffectDuration, __ST.componentEffectErrors), undefined === finishedWork.alternate && undefined !== finishedWork.return && undefined !== finishedWork.return.alternate && 0.05 < __ST.componentEffectEndTime - __ST.componentEffectStartTime && (__ST.isHydratingParent(finishedWork.return.alternate, finishedWork.return) || __ST.logComponentTrigger(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, "Mount")));
      __ST.popComponentEffectStart(prevEffectStart);
      __ST.popComponentEffectDuration(prevEffectDuration);
      __ST.componentEffectErrors = prevEffectErrors;
      __ST.componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
    }(...__args);
  };
  __ST.recursivelyTraverseMutationEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root_jscomp_0, parentFiber) {
      let deletions, i, root, returnFiber, deletedFiber, prevEffectStart, parent;
      deletions = parentFiber.deletions;
      if (undefined !== deletions) for (i = 0; i < __len(deletions); i++) {
        root = root_jscomp_0;
        returnFiber = parentFiber;
        deletedFiber = deletions[i];
        prevEffectStart = __ST.pushComponentEffectStart();
        if (__ST.supportsMutation) {
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
                      if (__ST.supportsSingletons) {
                        if (__ST.isSingletonScope(parent.type)) {
                          __ST.hostParent = parent.stateNode;
                          __ST.hostParentIsContainer = !1;
                          {
                            __lb_9 = true;
                            break;
                          }
                        }
                        break;
                      }
                    case 5:
                      __ST.hostParent = parent.stateNode;
                      __ST.hostParentIsContainer = !1;
                      {
                        __lb_9 = true;
                        break;
                      }
                    case 3:
                    case 4:
                      __ST.hostParent = parent.stateNode.containerInfo;
                      __ST.hostParentIsContainer = !0;
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
          if (undefined === __ST.hostParent) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
          __ST.commitDeletionEffectsOnFiber(root, returnFiber, deletedFiber);
          __ST.hostParent = undefined;
          __ST.hostParentIsContainer = !1;
        } else __ST.commitDeletionEffectsOnFiber(root, returnFiber, deletedFiber);
        (deletedFiber.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && 0.05 < __ST.componentEffectEndTime - __ST.componentEffectStartTime && __ST.logComponentTrigger(deletedFiber, __ST.componentEffectStartTime, __ST.componentEffectEndTime, "Unmount");
        __ST.popComponentEffectStart(prevEffectStart);
        root = deletedFiber;
        returnFiber = root.alternate;
        undefined !== returnFiber && (returnFiber.return = undefined);
        root.return = undefined;
      }
      if (parentFiber.subtreeFlags & 13886) for (parentFiber = parentFiber.child; undefined !== parentFiber;) __ST.commitMutationEffectsOnFiber(parentFiber, root_jscomp_0), parentFiber = parentFiber.sibling;
    }(...__args);
  };
  __ST.attachSuspenseRetryListeners = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork, wakeables) {
      let retryCache;
      retryCache = __ST.getRetryCache(finishedWork);
      __forEach(wakeables, function (wakeable) {
        let retry;
        if (!retryCache.has(wakeable)) {
          retryCache.add(wakeable);
          if (__ST.isDevToolsPresent) if (undefined !== __ST.inProgressLanes && undefined !== __ST.inProgressRoot) __ST.restorePendingUpdaters(__ST.inProgressRoot, __ST.inProgressLanes);else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          retry = __partial((..._bindArgs34) => __applyFn(__ST.resolveRetryWakeable, ..._bindArgs34), undefined, finishedWork, wakeable);
          wakeable.then(retry, retry);
        }
      });
    }(...__args);
  };
  __ST.getRetryCache = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork) {
      let retryCache;
      switch (finishedWork.tag) {
        case 31:
        case 13:
        case 19:
          retryCache = finishedWork.stateNode;
          undefined === retryCache && (retryCache = finishedWork.stateNode = __new(__ST.PossiblyWeakSet));
          return retryCache;
        case 22:
          return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, undefined === retryCache && (retryCache = finishedWork._retryCache = __new(__ST.PossiblyWeakSet)), retryCache;
        default:
          throw Error(__cat(__cat("Unexpected Suspense handler tag (", finishedWork.tag), "). This is a bug in React."));
      }
    }(...__args);
  };
  __ST.commitSuspenseHydrationCallbacks = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedRoot, finishedWork) {
      if (__ST.supportsHydration && undefined === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, undefined !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, undefined !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, undefined !== finishedRoot)))) try {
        __ST.runWithFiberInDEV(finishedWork, __ST.commitHydratedSuspenseInstance, finishedRoot);
      } catch (__error) {
        __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }(...__args);
  };
  __ST.commitActivityHydrationCallbacks = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedRoot, finishedWork) {
      if (__ST.supportsHydration && undefined === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, undefined !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, undefined !== finishedRoot))) {
        finishedRoot = finishedRoot.dehydrated;
        try {
          __ST.runWithFiberInDEV(finishedWork, __ST.commitHydratedActivityInstance, finishedRoot);
        } catch (__error) {
          __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
        }
      }
    }(...__args);
  };
  __ST.commitDeletionEffectsOnFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedRoot, nearestMountedAncestor, deletedFiber) {
      let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, prevHostParent, prevHostParentIsContainer;
      if (__ST.injectedHook && "function" === typeOfJS(__ST.injectedHook.onCommitFiberUnmount)) try {
        __ST.injectedHook.onCommitFiberUnmount(__ST.rendererID, deletedFiber);
      } catch (err) {
        __ST.hasLoggedError || (__ST.hasLoggedError = !0, console.error("React instrumentation encountered an error: %o", err));
      }
      prevEffectStart = __ST.pushComponentEffectStart();
      prevEffectDuration = __ST.pushComponentEffectDuration();
      prevEffectErrors = __ST.pushComponentEffectErrors();
      prevEffectDidSpawnUpdate = __ST.pushComponentEffectDidSpawnUpdate();
      switch (deletedFiber.tag) {
        case 26:
          if (__ST.supportsResources) {
            __ST.offscreenSubtreeWasHidden || __ST.safelyDetachRef(deletedFiber, nearestMountedAncestor);
            __ST.recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
            deletedFiber.memoizedState ? __ST.releaseResource(deletedFiber.memoizedState) : deletedFiber.stateNode && __ST.unmountHoistable(deletedFiber.stateNode);
            break;
          }
        case 27:
          if (__ST.supportsSingletons) {
            __ST.offscreenSubtreeWasHidden || __ST.safelyDetachRef(deletedFiber, nearestMountedAncestor);
            prevHostParent = __ST.hostParent;
            prevHostParentIsContainer = __ST.hostParentIsContainer;
            __ST.isSingletonScope(deletedFiber.type) && (__ST.hostParent = deletedFiber.stateNode, __ST.hostParentIsContainer = !1);
            __ST.recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
            __ST.runWithFiberInDEV(deletedFiber, __ST.releaseSingletonInstance, deletedFiber.stateNode);
            __ST.hostParent = prevHostParent;
            __ST.hostParentIsContainer = prevHostParentIsContainer;
            break;
          }
        case 5:
          __ST.offscreenSubtreeWasHidden || __ST.safelyDetachRef(deletedFiber, nearestMountedAncestor);
        case 6:
          if (__ST.supportsMutation) {
            if (prevHostParent = __ST.hostParent, prevHostParentIsContainer = __ST.hostParentIsContainer, __ST.hostParent = undefined, __ST.recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber), __ST.hostParent = prevHostParent, __ST.hostParentIsContainer = prevHostParentIsContainer, undefined !== __ST.hostParent) if (__ST.hostParentIsContainer) try {
              __ST.runWithFiberInDEV(deletedFiber, __ST.removeChildFromContainer, __ST.hostParent, deletedFiber.stateNode);
            } catch (__error) {
              __ST.captureCommitPhaseError(deletedFiber, nearestMountedAncestor, __error);
            } else try {
              __ST.runWithFiberInDEV(deletedFiber, __ST.removeChild, __ST.hostParent, deletedFiber.stateNode);
            } catch (__error) {
              __ST.captureCommitPhaseError(deletedFiber, nearestMountedAncestor, __error);
            }
          } else __ST.recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 18:
          __ST.supportsMutation && undefined !== __ST.hostParent && (__ST.hostParentIsContainer ? __ST.clearSuspenseBoundaryFromContainer(__ST.hostParent, deletedFiber.stateNode) : __ST.clearSuspenseBoundary(__ST.hostParent, deletedFiber.stateNode));
          break;
        case 4:
          __ST.supportsMutation ? (prevHostParent = __ST.hostParent, prevHostParentIsContainer = __ST.hostParentIsContainer, __ST.hostParent = deletedFiber.stateNode.containerInfo, __ST.hostParentIsContainer = !0, __ST.recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber), __ST.hostParent = prevHostParent, __ST.hostParentIsContainer = prevHostParentIsContainer) : (__ST.supportsPersistence && __ST.commitHostPortalContainerChildren(deletedFiber.stateNode, deletedFiber, __ST.createContainerChildSet()), __ST.recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          __ST.commitHookEffectListUnmount(__ST.Insertion, deletedFiber, nearestMountedAncestor);
          __ST.offscreenSubtreeWasHidden || __ST.commitHookLayoutUnmountEffects(deletedFiber, nearestMountedAncestor, __ST.Layout);
          __ST.recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 1:
          __ST.offscreenSubtreeWasHidden || (__ST.safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeOfJS(prevHostParent.componentWillUnmount) && __ST.safelyCallComponentWillUnmount(deletedFiber, nearestMountedAncestor, prevHostParent));
          __ST.recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 21:
          __ST.recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 22:
          __ST.offscreenSubtreeWasHidden = (prevHostParent = __ST.offscreenSubtreeWasHidden) || undefined !== deletedFiber.memoizedState;
          __ST.recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          __ST.offscreenSubtreeWasHidden = prevHostParent;
          break;
        default:
          __ST.recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
      }
      (deletedFiber.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && (__ST.componentEffectSpawnedUpdate || 0.05 < __ST.componentEffectDuration) && __ST.logComponentEffect(deletedFiber, __ST.componentEffectStartTime, __ST.componentEffectEndTime, __ST.componentEffectDuration, __ST.componentEffectErrors);
      __ST.popComponentEffectStart(prevEffectStart);
      __ST.popComponentEffectDuration(prevEffectDuration);
      __ST.componentEffectErrors = prevEffectErrors;
      __ST.componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
    }(...__args);
  };
  __ST.recursivelyTraverseDeletionEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedRoot, nearestMountedAncestor, parent) {
      for (parent = parent.child; undefined !== parent;) __ST.commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
    }(...__args);
  };
  __ST.detachFiberAfterEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let alternate;
      alternate = fiber.alternate;
      undefined !== alternate && (fiber.alternate = undefined, __ST.detachFiberAfterEffects(alternate));
      fiber.child = undefined;
      fiber.deletions = undefined;
      fiber.sibling = undefined;
      5 === fiber.tag && (alternate = fiber.stateNode, undefined !== alternate && __ST.detachDeletedInstance(alternate));
      fiber.stateNode = undefined;
      fiber._debugOwner = undefined;
      fiber.return = undefined;
      fiber.dependencies = undefined;
      fiber.memoizedProps = undefined;
      fiber.memoizedState = undefined;
      fiber.pendingProps = undefined;
      fiber.stateNode = undefined;
      fiber.updateQueue = undefined;
    }(...__args);
  };
  __ST.commitLayoutEffectOnFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedRoot, current, finishedWork) {
      let prevEffectStart, prevEffectDuration, prevEffectErrors, prevEffectDidSpawnUpdate, flags, prevProps, prevOffscreenSubtreeWasHidden;
      prevEffectStart = __ST.pushComponentEffectStart();
      prevEffectDuration = __ST.pushComponentEffectDuration();
      prevEffectErrors = __ST.pushComponentEffectErrors();
      prevEffectDidSpawnUpdate = __ST.pushComponentEffectDidSpawnUpdate();
      flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          __ST.recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && __ST.commitHookLayoutEffects(finishedWork, __ST.Layout | __ST.HasEffect);
          break;
        case 1:
          __ST.recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          if (flags & 4) if (finishedRoot = finishedWork.stateNode, undefined === current) finishedWork.type.defaultProps || __in("ref", finishedWork.memoizedProps) || __ST.didWarnAboutReassigningProps || (finishedRoot.props !== finishedWork.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", __ST.getComponentNameFromFiber(finishedWork) || "instance"), finishedRoot.state !== finishedWork.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", __ST.getComponentNameFromFiber(finishedWork) || "instance")), __ST.shouldProfile(finishedWork) ? (__ST.startEffectTimer(), __ST.runWithFiberInDEV(finishedWork, __ST.callComponentDidMountInDEV, finishedWork, finishedRoot), __ST.recordEffectDuration()) : __ST.runWithFiberInDEV(finishedWork, __ST.callComponentDidMountInDEV, finishedWork, finishedRoot);else {
            prevProps = __ST.resolveClassComponentProps(finishedWork.type, current.memoizedProps);
            current = current.memoizedState;
            finishedWork.type.defaultProps || __in("ref", finishedWork.memoizedProps) || __ST.didWarnAboutReassigningProps || (finishedRoot.props !== finishedWork.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", __ST.getComponentNameFromFiber(finishedWork) || "instance"), finishedRoot.state !== finishedWork.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", __ST.getComponentNameFromFiber(finishedWork) || "instance"));
            __ST.shouldProfile(finishedWork) ? (__ST.startEffectTimer(), __ST.runWithFiberInDEV(finishedWork, __ST.callComponentDidUpdateInDEV, finishedWork, finishedRoot, prevProps, current, finishedRoot.__reactInternalSnapshotBeforeUpdate), __ST.recordEffectDuration()) : __ST.runWithFiberInDEV(finishedWork, __ST.callComponentDidUpdateInDEV, finishedWork, finishedRoot, prevProps, current, finishedRoot.__reactInternalSnapshotBeforeUpdate);
          }
          flags & 64 && __ST.commitClassCallbacks(finishedWork);
          flags & 512 && __ST.safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 3:
          current = __ST.pushNestedEffectDurations();
          __ST.recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          if (flags & 64 && (flags = finishedWork.updateQueue, undefined !== flags)) {
            prevProps = undefined;
            if (undefined !== finishedWork.child) switch (finishedWork.child.tag) {
              case 27:
              case 5:
                prevProps = __ST.getPublicInstance(finishedWork.child.stateNode);
                break;
              case 1:
                prevProps = finishedWork.child.stateNode;
            }
            try {
              __ST.runWithFiberInDEV(finishedWork, __ST.commitCallbacks, flags, prevProps);
            } catch (__error) {
              __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
          }
          finishedRoot.effectDuration += __ST.popNestedEffectDurations(current);
          break;
        case 27:
          __ST.supportsSingletons && undefined === current && flags & 4 && __ST.commitHostSingletonAcquisition(finishedWork);
        case 26:
        case 5:
          __ST.recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          if (undefined === current) if (flags & 4) __ST.commitHostMount(finishedWork);else if (flags & 64) {
            finishedRoot = finishedWork.type;
            current = finishedWork.memoizedProps;
            prevProps = finishedWork.stateNode;
            try {
              __ST.runWithFiberInDEV(finishedWork, __ST.commitHydratedInstance, prevProps, finishedRoot, current, finishedWork);
            } catch (__error) {
              __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
          }
          flags & 512 && __ST.safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 12:
          if (flags & 4) {
            flags = __ST.pushNestedEffectDurations();
            __ST.recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            finishedRoot = finishedWork.stateNode;
            finishedRoot.effectDuration += __ST.bubbleNestedEffectDurations(flags);
            try {
              __ST.runWithFiberInDEV(finishedWork, __ST.commitProfiler, finishedWork, current, __ST.commitStartTime, finishedRoot.effectDuration);
            } catch (__error) {
              __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
            }
          } else __ST.recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          break;
        case 31:
          __ST.recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && __ST.commitActivityHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 13:
          __ST.recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && __ST.commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
          flags & 64 && (finishedRoot = finishedWork.memoizedState, undefined !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, undefined !== finishedRoot && (flags = __partial((..._bindArgs33) => __applyFn(__ST.retryDehydratedSuspenseBoundary, ..._bindArgs33), undefined, finishedWork), __ST.registerSuspenseInstanceRetry(finishedRoot, flags))));
          break;
        case 22:
          flags = undefined !== finishedWork.memoizedState || __ST.offscreenSubtreeIsHidden;
          if (!flags) {
            current = undefined !== current && undefined !== current.memoizedState || __ST.offscreenSubtreeWasHidden;
            prevProps = __ST.offscreenSubtreeIsHidden;
            prevOffscreenSubtreeWasHidden = __ST.offscreenSubtreeWasHidden;
            __ST.offscreenSubtreeIsHidden = flags;
            (__ST.offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? (__ST.recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, 0 !== (finishedWork.subtreeFlags & 8772)), (finishedWork.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && 0.05 < __ST.componentEffectEndTime - __ST.componentEffectStartTime && __ST.logComponentReappeared(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime)) : __ST.recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            __ST.offscreenSubtreeIsHidden = prevProps;
            __ST.offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
          }
          break;
        case 30:
          break;
        default:
          __ST.recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      }
      (finishedWork.mode & 2) !== __ST.NoMode && 0 <= __ST.componentEffectStartTime && 0 <= __ST.componentEffectEndTime && ((__ST.componentEffectSpawnedUpdate || 0.05 < __ST.componentEffectDuration) && __ST.logComponentEffect(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, __ST.componentEffectDuration, __ST.componentEffectErrors), undefined === finishedWork.alternate && undefined !== finishedWork.return && undefined !== finishedWork.return.alternate && 0.05 < __ST.componentEffectEndTime - __ST.componentEffectStartTime && (__ST.isHydratingParent(finishedWork.return.alternate, finishedWork.return) || __ST.logComponentTrigger(finishedWork, __ST.componentEffectStartTime, __ST.componentEffectEndTime, "Mount")));
      __ST.popComponentEffectStart(prevEffectStart);
      __ST.popComponentEffectDuration(prevEffectDuration);
      __ST.componentEffectErrors = prevEffectErrors;
      __ST.componentEffectSpawnedUpdate = prevEffectDidSpawnUpdate;
    }(...__args);
  };
  __ST.commitBeforeMutationEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, firstChild) {
      let current, flags;
      __ST.prepareForCommit(root.containerInfo);
      for (__ST.nextEffect = firstChild; undefined !== __ST.nextEffect;) if (root = __ST.nextEffect, firstChild = root.child, 0 !== (root.subtreeFlags & 1028) && undefined !== firstChild) firstChild.return = root, __ST.nextEffect = firstChild;else for (; undefined !== __ST.nextEffect;) {
        firstChild = root = __ST.nextEffect;
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
            0 !== (flags & 1024) && undefined !== current && __ST.commitClassSnapshot(firstChild, current);
            break;
          case 3:
            0 !== (flags & 1024) && __ST.supportsMutation && __ST.clearContainer(firstChild.stateNode.containerInfo);
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
          __ST.nextEffect = firstChild;
          break;
        }
        __ST.nextEffect = root.return;
      }
    }(...__args);
  };
  __ST.isHydratingParent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, finishedWork) {
      return 31 === finishedWork.tag ? (finishedWork = finishedWork.memoizedState, undefined !== current.memoizedState && undefined === finishedWork) : 13 === finishedWork.tag ? (current = current.memoizedState, finishedWork = finishedWork.memoizedState, undefined !== current && undefined !== current.dehydrated && (undefined === finishedWork || undefined === finishedWork.dehydrated)) : 3 === finishedWork.tag ? current.memoizedState.isDehydrated && 0 === (finishedWork.flags & 256) : !1;
    }(...__args);
  };
  __ST.commitHostSingletonAcquisition = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork) {
      let singleton, props;
      singleton = finishedWork.stateNode;
      props = finishedWork.memoizedProps;
      try {
        __ST.runWithFiberInDEV(finishedWork, __ST.acquireSingletonInstance, finishedWork.type, props, singleton, finishedWork);
      } catch (__error) {
        __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }(...__args);
  };
  __ST.commitHostPortalContainerChildren = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (portal, finishedWork, pendingChildren) {
      portal = portal.containerInfo;
      try {
        __ST.runWithFiberInDEV(finishedWork, __ST.replaceContainerChildren, portal, pendingChildren);
      } catch (__error) {
        __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }(...__args);
  };
  __ST.commitPlacement = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork) {
      let hostParentFiber, parentFiber;
      for (parentFiber = finishedWork.return; undefined !== parentFiber;) {
        if (__ST.isHostParent(parentFiber)) {
          hostParentFiber = parentFiber;
          break;
        }
        parentFiber = parentFiber.return;
      }
      if (__ST.supportsMutation) {
        if (hostParentFiber === undefined) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        switch (hostParentFiber.tag) {
          case 27:
            if (__ST.supportsSingletons) {
              hostParentFiber = hostParentFiber.stateNode;
              parentFiber = __ST.getHostSibling(finishedWork);
              __ST.insertOrAppendPlacementNode(finishedWork, parentFiber, hostParentFiber);
              break;
            }
          case 5:
            parentFiber = hostParentFiber.stateNode;
            hostParentFiber.flags & 32 && (__ST.resetTextContent(parentFiber), hostParentFiber.flags &= -33);
            hostParentFiber = __ST.getHostSibling(finishedWork);
            __ST.insertOrAppendPlacementNode(finishedWork, hostParentFiber, parentFiber);
            break;
          case 3:
          case 4:
            hostParentFiber = hostParentFiber.stateNode.containerInfo;
            parentFiber = __ST.getHostSibling(finishedWork);
            __ST.insertOrAppendPlacementNodeIntoContainer(finishedWork, parentFiber, hostParentFiber);
            break;
          default:
            throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
        }
      }
    }(...__args);
  };
  __ST.insertOrAppendPlacementNode = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (node, before, parent) {
      let tag;
      tag = node.tag;
      if (5 === tag || 6 === tag) node = node.stateNode, before ? __ST.insertBefore(parent, node, before) : __ST.appendChild(parent, node);else if (4 !== tag && (__ST.supportsSingletons && 27 === tag && __ST.isSingletonScope(node.type) && (parent = node.stateNode), node = node.child, undefined !== node)) for (__ST.insertOrAppendPlacementNode(node, before, parent), node = node.sibling; undefined !== node;) __ST.insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
    }(...__args);
  };
  __ST.insertOrAppendPlacementNodeIntoContainer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (node, before, parent) {
      let tag;
      tag = node.tag;
      if (5 === tag || 6 === tag) node = node.stateNode, before ? __ST.insertInContainerBefore(parent, node, before) : __ST.appendChildToContainer(parent, node);else if (4 !== tag && (__ST.supportsSingletons && 27 === tag && __ST.isSingletonScope(node.type) && (parent = node.stateNode, before = undefined), node = node.child, undefined !== node)) for (__ST.insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; undefined !== node;) __ST.insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
    }(...__args);
  };
  __ST.getHostSibling = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      {
        let __lb_10 = false,
          __lc_10 = false;
        while (!__lb_10) {
          __lc_10 = false;
          while (true) {
            {
              for (; undefined === fiber.sibling;) {
                if (undefined === fiber.return || __ST.isHostParent(fiber.return)) return undefined;
                fiber = fiber.return;
              }
              fiber.sibling.return = fiber.return;
              for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag;) {
                if (__ST.supportsSingletons && 27 === fiber.tag && __ST.isSingletonScope(fiber.type)) {
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
    }(...__args);
  };
  __ST.isHostParent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      return 5 === fiber.tag || 3 === fiber.tag || (__ST.supportsResources ? 26 === fiber.tag : !1) || (__ST.supportsSingletons ? 27 === fiber.tag && __ST.isSingletonScope(fiber.type) : !1) || 4 === fiber.tag;
    }(...__args);
  };
  __ST.commitHostUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork, newProps, oldProps) {
      try {
        __ST.runWithFiberInDEV(finishedWork, __ST.commitUpdate, finishedWork.stateNode, finishedWork.type, oldProps, newProps, finishedWork);
      } catch (__error) {
        __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }(...__args);
  };
  __ST.commitHostMount = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork) {
      let __type, props, instance;
      __type = finishedWork.type;
      props = finishedWork.memoizedProps;
      instance = finishedWork.stateNode;
      try {
        __ST.runWithFiberInDEV(finishedWork, __ST.commitMount, instance, __type, props, finishedWork);
      } catch (__error) {
        __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }(...__args);
  };
  __ST.commitProfilerPostCommitImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork, current, commitStartTime, passiveEffectDuration) {
      let _finishedWork_memoize2;
      _finishedWork_memoize2 = finishedWork.memoizedProps;
      finishedWork = _finishedWork_memoize2.id;
      _finishedWork_memoize2 = _finishedWork_memoize2.onPostCommit;
      current = undefined === current ? "mount" : "update";
      __ST.currentUpdateIsNested && (current = "nested-update");
      "function" === typeOfJS(_finishedWork_memoize2) && _finishedWork_memoize2(finishedWork, current, passiveEffectDuration, commitStartTime);
    }(...__args);
  };
  __ST.commitProfiler = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork, current, commitStartTime, effectDuration) {
      let _finishedWork_memoize, id, onCommit;
      _finishedWork_memoize = finishedWork.memoizedProps;
      id = _finishedWork_memoize.id;
      onCommit = _finishedWork_memoize.onCommit;
      _finishedWork_memoize = _finishedWork_memoize.onRender;
      current = undefined === current ? "mount" : "update";
      __ST.currentUpdateIsNested && (current = "nested-update");
      "function" === typeOfJS(_finishedWork_memoize) && _finishedWork_memoize(id, current, finishedWork.actualDuration, finishedWork.treeBaseDuration, finishedWork.actualStartTime, commitStartTime);
      "function" === typeOfJS(onCommit) && onCommit(id, current, effectDuration, commitStartTime);
    }(...__args);
  };
  __ST.safelyDetachRef = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, nearestMountedAncestor) {
      let ref, refCleanup;
      ref = current.ref;
      refCleanup = current.refCleanup;
      if (undefined !== ref) if ("function" === typeOfJS(refCleanup)) try {
        if (__ST.shouldProfile(current)) try {
          __ST.startEffectTimer(), __ST.runWithFiberInDEV(current, refCleanup);
        } finally {
          __ST.recordEffectDuration(current);
        } else __ST.runWithFiberInDEV(current, refCleanup);
      } catch (__error) {
        __ST.captureCommitPhaseError(current, nearestMountedAncestor, __error);
      } finally {
        current.refCleanup = undefined, current = current.alternate, current !== undefined && (current.refCleanup = undefined);
      } else if ("function" === typeOfJS(ref)) try {
        if (__ST.shouldProfile(current)) try {
          __ST.startEffectTimer(), __ST.runWithFiberInDEV(current, ref, undefined);
        } finally {
          __ST.recordEffectDuration(current);
        } else __ST.runWithFiberInDEV(current, ref, undefined);
      } catch (error_3) {
        __ST.captureCommitPhaseError(current, nearestMountedAncestor, error_3);
      } else ref.current = undefined;
    }(...__args);
  };
  __ST.safelyAttachRef = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, nearestMountedAncestor) {
      try {
        __ST.runWithFiberInDEV(current, __ST.commitAttachRef, current);
      } catch (__error) {
        __ST.captureCommitPhaseError(current, nearestMountedAncestor, __error);
      }
    }(...__args);
  };
  __ST.commitAttachRef = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork) {
      let ref, instanceToUse;
      ref = finishedWork.ref;
      if (undefined !== ref) {
        switch (finishedWork.tag) {
          case 26:
          case 27:
          case 5:
            instanceToUse = __ST.getPublicInstance(finishedWork.stateNode);
            break;
          case 30:
            instanceToUse = finishedWork.stateNode;
            break;
          default:
            instanceToUse = finishedWork.stateNode;
        }
        if ("function" === typeOfJS(ref)) {
          if (__ST.shouldProfile(finishedWork)) try {
            __ST.startEffectTimer(), finishedWork.refCleanup = ref(instanceToUse);
          } finally {
            __ST.recordEffectDuration();
          } else finishedWork.refCleanup = ref(instanceToUse);
        } else "string" === typeOfJS(ref) ? console.error("String refs are no longer supported.") : Object.hasOwnProperty(ref, "current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", __ST.getComponentNameFromFiber(finishedWork)), ref.current = instanceToUse;
      }
    }(...__args);
  };
  __ST.safelyCallComponentWillUnmount = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, nearestMountedAncestor, instance) {
      instance.props = __ST.resolveClassComponentProps(current.type, current.memoizedProps);
      instance.state = current.memoizedState;
      __ST.shouldProfile(current) ? (__ST.startEffectTimer(), __ST.runWithFiberInDEV(current, __ST.callComponentWillUnmountInDEV, current, nearestMountedAncestor, instance), __ST.recordEffectDuration()) : __ST.runWithFiberInDEV(current, __ST.callComponentWillUnmountInDEV, current, nearestMountedAncestor, instance);
    }(...__args);
  };
  __ST.commitClassSnapshot = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork, current) {
      let prevProps, prevState, resolvedPrevProps, snapshot;
      prevProps = current.memoizedProps;
      prevState = current.memoizedState;
      current = finishedWork.stateNode;
      finishedWork.type.defaultProps || __in("ref", finishedWork.memoizedProps) || __ST.didWarnAboutReassigningProps || (current.props !== finishedWork.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", __ST.getComponentNameFromFiber(finishedWork) || "instance"), current.state !== finishedWork.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", __ST.getComponentNameFromFiber(finishedWork) || "instance"));
      try {
        resolvedPrevProps = __ST.resolveClassComponentProps(finishedWork.type, prevProps);
        snapshot = __ST.runWithFiberInDEV(finishedWork, __ST.callGetSnapshotBeforeUpdates, current, resolvedPrevProps, prevState);
        prevProps = __ST.didWarnAboutUndefinedSnapshotBeforeUpdate;
        void 0 !== snapshot || prevProps.has(finishedWork.type) || (prevProps.add(finishedWork.type), __ST.runWithFiberInDEV(finishedWork, function () {
          console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", __ST.getComponentNameFromFiber(finishedWork));
        }));
        current.__reactInternalSnapshotBeforeUpdate = snapshot;
      } catch (__error) {
        __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }(...__args);
  };
  __ST.callGetSnapshotBeforeUpdates = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (instance, prevProps, prevState) {
      return instance.getSnapshotBeforeUpdate(prevProps, prevState);
    }(...__args);
  };
  __ST.commitClassCallbacks = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork) {
      let updateQueue, instance;
      updateQueue = finishedWork.updateQueue;
      if (undefined !== updateQueue) {
        instance = finishedWork.stateNode;
        finishedWork.type.defaultProps || __in("ref", finishedWork.memoizedProps) || __ST.didWarnAboutReassigningProps || (instance.props !== finishedWork.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", __ST.getComponentNameFromFiber(finishedWork) || "instance"), instance.state !== finishedWork.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", __ST.getComponentNameFromFiber(finishedWork) || "instance"));
        try {
          __ST.runWithFiberInDEV(finishedWork, __ST.commitCallbacks, updateQueue, instance);
        } catch (__error) {
          __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
        }
      }
    }(...__args);
  };
  __ST.commitHookPassiveUnmountEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork, nearestMountedAncestor, hookFlags) {
      __ST.shouldProfile(finishedWork) ? (__ST.startEffectTimer(), __ST.commitHookEffectListUnmount(hookFlags, finishedWork, nearestMountedAncestor), __ST.recordEffectDuration()) : __ST.commitHookEffectListUnmount(hookFlags, finishedWork, nearestMountedAncestor);
    }(...__args);
  };
  __ST.commitHookPassiveMountEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork, hookFlags) {
      __ST.shouldProfile(finishedWork) ? (__ST.startEffectTimer(), __ST.commitHookEffectListMount(hookFlags, finishedWork), __ST.recordEffectDuration()) : __ST.commitHookEffectListMount(hookFlags, finishedWork);
    }(...__args);
  };
  __ST.commitHookEffectListUnmount = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (flags, finishedWork, nearestMountedAncestor) {
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
              void 0 !== destroy && (inst.destroy = void 0, (flags & __ST.Insertion) !== __ST.NoFlags && (__ST.isRunningInsertionEffect = !0), lastEffect = finishedWork, __ST.runWithFiberInDEV(lastEffect, __ST.callDestroyInDEV, lastEffect, nearestMountedAncestor, destroy), (flags & __ST.Insertion) !== __ST.NoFlags && (__ST.isRunningInsertionEffect = !1));
            }
            updateQueue = updateQueue.next;
          } while (updateQueue !== firstEffect);
        }
      } catch (__error) {
        __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }(...__args);
  };
  __ST.commitHookEffectListMount = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (flags, finishedWork) {
      let updateQueue, lastEffect, firstEffect, hookName, addendum;
      try {
        updateQueue = finishedWork.updateQueue;
        lastEffect = undefined !== updateQueue ? updateQueue.lastEffect : undefined;
        if (undefined !== lastEffect) {
          firstEffect = lastEffect.next;
          updateQueue = firstEffect;
          do {
            if ((updateQueue.tag & flags) === flags && (lastEffect = void 0, (flags & __ST.Insertion) !== __ST.NoFlags && (__ST.isRunningInsertionEffect = !0), lastEffect = __ST.runWithFiberInDEV(finishedWork, __ST.callCreateInDEV, updateQueue), (flags & __ST.Insertion) !== __ST.NoFlags && (__ST.isRunningInsertionEffect = !1), void 0 !== lastEffect && "function" !== typeOfJS(lastEffect))) {
              hookName = void 0;
              hookName = 0 !== (updateQueue.tag & __ST.Layout) ? "useLayoutEffect" : 0 !== (updateQueue.tag & __ST.Insertion) ? "useInsertionEffect" : "useEffect";
              addendum = void 0;
              addendum = undefined === lastEffect ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : "function" === typeOfJS(lastEffect.then) ? __cat(__cat(__cat(__cat("\n\nIt looks like you wrote ", hookName), "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n"), hookName), "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching") : __cat(" You returned: ", lastEffect);
              __ST.runWithFiberInDEV(finishedWork, function (n, a) {
                console.error("%s must not return anything besides a function, which is used for clean-up.%s", n, a);
              }, hookName, addendum);
            }
            updateQueue = updateQueue.next;
          } while (updateQueue !== firstEffect);
        }
      } catch (__error) {
        __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }(...__args);
  };
  __ST.commitHookLayoutUnmountEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork, nearestMountedAncestor, hookFlags) {
      __ST.shouldProfile(finishedWork) ? (__ST.startEffectTimer(), __ST.commitHookEffectListUnmount(hookFlags, finishedWork, nearestMountedAncestor), __ST.recordEffectDuration()) : __ST.commitHookEffectListUnmount(hookFlags, finishedWork, nearestMountedAncestor);
    }(...__args);
  };
  __ST.commitHookLayoutEffects = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (finishedWork, hookFlags) {
      __ST.shouldProfile(finishedWork) ? (__ST.startEffectTimer(), __ST.commitHookEffectListMount(hookFlags, finishedWork), __ST.recordEffectDuration()) : __ST.commitHookEffectListMount(hookFlags, finishedWork);
    }(...__args);
  };
  __ST.shouldProfile = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current) {
      return (current.mode & 2) !== __ST.NoMode;
    }(...__args);
  };
  __ST.unwindInterruptedWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, interruptedWork) {
      __ST.popTreeContext(interruptedWork);
      switch (interruptedWork.tag) {
        case 3:
          __ST.popProvider(__ST.CacheContext, interruptedWork);
          __ST.popHostContainer(interruptedWork);
          break;
        case 26:
        case 27:
        case 5:
          __ST.popHostContext(interruptedWork);
          break;
        case 4:
          __ST.popHostContainer(interruptedWork);
          break;
        case 31:
          undefined !== interruptedWork.memoizedState && __ST.popSuspenseHandler(interruptedWork);
          break;
        case 13:
          __ST.popSuspenseHandler(interruptedWork);
          break;
        case 19:
          __ST.pop(__ST.suspenseStackCursor, interruptedWork);
          break;
        case 10:
          __ST.popProvider(interruptedWork.type, interruptedWork);
          break;
        case 22:
        case 23:
          __ST.popSuspenseHandler(interruptedWork);
          __ST.popHiddenContext(interruptedWork);
          undefined !== current && __ST.pop(__ST.resumedCache, interruptedWork);
          break;
        case 24:
          __ST.popProvider(__ST.CacheContext, interruptedWork);
      }
    }(...__args);
  };
  __ST.unwindWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress) {
      __ST.popTreeContext(workInProgress);
      switch (workInProgress.tag) {
        case 1:
          return current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, (workInProgress.mode & 2) !== __ST.NoMode && __ST.transferActualDuration(workInProgress), workInProgress) : undefined;
        case 3:
          return __ST.popProvider(__ST.CacheContext, workInProgress), __ST.popHostContainer(workInProgress), current = workInProgress.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress.flags = current & -65537 | 128, workInProgress) : undefined;
        case 26:
        case 27:
        case 5:
          return __ST.popHostContext(workInProgress), undefined;
        case 31:
          if (undefined !== workInProgress.memoizedState) {
            __ST.popSuspenseHandler(workInProgress);
            if (undefined === workInProgress.alternate) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            __ST.resetHydrationState();
          }
          current = workInProgress.flags;
          return current & 65536 ? (workInProgress.flags = current & -65537 | 128, (workInProgress.mode & 2) !== __ST.NoMode && __ST.transferActualDuration(workInProgress), workInProgress) : undefined;
        case 13:
          __ST.popSuspenseHandler(workInProgress);
          current = workInProgress.memoizedState;
          if (undefined !== current && undefined !== current.dehydrated) {
            if (undefined === workInProgress.alternate) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            __ST.resetHydrationState();
          }
          current = workInProgress.flags;
          return current & 65536 ? (workInProgress.flags = current & -65537 | 128, (workInProgress.mode & 2) !== __ST.NoMode && __ST.transferActualDuration(workInProgress), workInProgress) : undefined;
        case 19:
          return __ST.pop(__ST.suspenseStackCursor, workInProgress), undefined;
        case 4:
          return __ST.popHostContainer(workInProgress), undefined;
        case 10:
          return __ST.popProvider(workInProgress.type, workInProgress), undefined;
        case 22:
        case 23:
          return __ST.popSuspenseHandler(workInProgress), __ST.popHiddenContext(workInProgress), undefined !== current && __ST.pop(__ST.resumedCache, workInProgress), current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, (workInProgress.mode & 2) !== __ST.NoMode && __ST.transferActualDuration(workInProgress), workInProgress) : undefined;
        case 24:
          return __ST.popProvider(__ST.CacheContext, workInProgress), undefined;
        case 25:
          return undefined;
        default:
          return undefined;
      }
    }(...__args);
  };
  __ST.completeWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, renderLanes) {
      let newProps, __type, nextResource, _rootContainerInstance;
      newProps = workInProgress.pendingProps;
      __ST.popTreeContext(workInProgress);
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
          return __ST.bubbleProperties(workInProgress), undefined;
        case 1:
          return __ST.bubbleProperties(workInProgress), undefined;
        case 3:
          renderLanes = workInProgress.stateNode;
          newProps = undefined;
          undefined !== current && (newProps = current.memoizedState.cache);
          workInProgress.memoizedState.cache !== newProps && (workInProgress.flags |= 2048);
          __ST.popProvider(__ST.CacheContext, workInProgress);
          __ST.popHostContainer(workInProgress);
          renderLanes.pendingContext && (renderLanes.context = renderLanes.pendingContext, renderLanes.pendingContext = undefined);
          if (undefined === current || undefined === current.child) __ST.popHydrationState(workInProgress) ? (__ST.emitPendingHydrationWarnings(), __ST.markUpdate(workInProgress)) : undefined === current || current.memoizedState.isDehydrated && 0 === (workInProgress.flags & 256) || (workInProgress.flags |= 1024, __ST.upgradeHydrationErrorsToRecoverable());
          __ST.updateHostContainer(current, workInProgress);
          __ST.bubbleProperties(workInProgress);
          return undefined;
        case 26:
          if (__ST.supportsResources) {
            __type = workInProgress.type;
            nextResource = workInProgress.memoizedState;
            undefined === current ? (__ST.markUpdate(workInProgress), undefined !== nextResource ? (__ST.bubbleProperties(workInProgress), __ST.preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (__ST.bubbleProperties(workInProgress), __ST.preloadInstanceAndSuspendIfNeeded(workInProgress, __type, undefined, newProps, renderLanes))) : nextResource ? nextResource !== current.memoizedState ? (__ST.markUpdate(workInProgress), __ST.bubbleProperties(workInProgress), __ST.preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (__ST.bubbleProperties(workInProgress), workInProgress.flags &= -16777217) : (nextResource = current.memoizedProps, __ST.supportsMutation ? nextResource !== newProps && __ST.markUpdate(workInProgress) : __ST.updateHostComponent(current, workInProgress, __type, newProps), __ST.bubbleProperties(workInProgress), __ST.preloadInstanceAndSuspendIfNeeded(workInProgress, __type, nextResource, newProps, renderLanes));
            return undefined;
          }
        case 27:
          if (__ST.supportsSingletons) {
            __ST.popHostContext(workInProgress);
            renderLanes = __ST.requiredContext(__ST.rootInstanceStackCursor.current);
            __type = workInProgress.type;
            if (undefined !== current && workInProgress.stateNode !== undefined) __ST.supportsMutation ? current.memoizedProps !== newProps && __ST.markUpdate(workInProgress) : __ST.updateHostComponent(current, workInProgress, __type, newProps);else {
              if (!newProps) {
                if (undefined === workInProgress.stateNode) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
                __ST.bubbleProperties(workInProgress);
                return undefined;
              }
              current = __ST.getHostContext();
              __ST.popHydrationState(workInProgress) ? __ST.prepareToHydrateHostInstance(workInProgress, current) : (current = __ST.resolveSingletonInstance(__type, newProps, renderLanes, current, !0), workInProgress.stateNode = current, __ST.markUpdate(workInProgress));
            }
            __ST.bubbleProperties(workInProgress);
            return undefined;
          }
        case 5:
          __ST.popHostContext(workInProgress);
          __type = workInProgress.type;
          if (undefined !== current && workInProgress.stateNode !== undefined) __ST.updateHostComponent(current, workInProgress, __type, newProps);else {
            if (!newProps) {
              if (undefined === workInProgress.stateNode) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              __ST.bubbleProperties(workInProgress);
              return undefined;
            }
            nextResource = __ST.getHostContext();
            if (__ST.popHydrationState(workInProgress)) __ST.prepareToHydrateHostInstance(workInProgress, nextResource), __ST.finalizeHydratedChildren(workInProgress.stateNode, __type, newProps, nextResource) && (workInProgress.flags |= 64);else {
              _rootContainerInstance = __ST.requiredContext(__ST.rootInstanceStackCursor.current);
              _rootContainerInstance = __ST.createInstance(__type, newProps, _rootContainerInstance, nextResource, workInProgress);
              __ST.markCloned(workInProgress);
              __ST.appendAllChildren(_rootContainerInstance, workInProgress, !1, !1);
              workInProgress.stateNode = _rootContainerInstance;
              __ST.finalizeInitialChildren(_rootContainerInstance, __type, newProps, nextResource) && __ST.markUpdate(workInProgress);
            }
          }
          __ST.bubbleProperties(workInProgress);
          __ST.preloadInstanceAndSuspendIfNeeded(workInProgress, workInProgress.type, undefined === current ? undefined : current.memoizedProps, workInProgress.pendingProps, renderLanes);
          return undefined;
        case 6:
          if (current && workInProgress.stateNode !== undefined) renderLanes = current.memoizedProps, __ST.supportsMutation ? renderLanes !== newProps && __ST.markUpdate(workInProgress) : __ST.supportsPersistence && (renderLanes !== newProps ? (current = __ST.requiredContext(__ST.rootInstanceStackCursor.current), renderLanes = __ST.getHostContext(), __ST.markCloned(workInProgress), workInProgress.stateNode = __ST.createTextInstance(newProps, current, renderLanes, workInProgress)) : workInProgress.stateNode = current.stateNode);else {
            if ("string" !== typeOfJS(newProps) && undefined === workInProgress.stateNode) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            current = __ST.requiredContext(__ST.rootInstanceStackCursor.current);
            renderLanes = __ST.getHostContext();
            if (__ST.popHydrationState(workInProgress)) {
              if (!__ST.supportsHydration) throw Error("Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
              current = workInProgress.stateNode;
              renderLanes = workInProgress.memoizedProps;
              __type = !__ST.didSuspendOrErrorDEV;
              newProps = undefined;
              nextResource = __ST.hydrationParentFiber;
              if (undefined !== nextResource) switch (nextResource.tag) {
                case 3:
                  __type && (__type = __ST.diffHydratedTextForDevWarnings(current, renderLanes, newProps), undefined !== __type && (__ST.buildHydrationDiffNode(workInProgress, 0).serverProps = __type));
                  break;
                case 27:
                case 5:
                  newProps = nextResource.memoizedProps, __type && (__type = __ST.diffHydratedTextForDevWarnings(current, renderLanes, newProps), undefined !== __type && (__ST.buildHydrationDiffNode(workInProgress, 0).serverProps = __type));
              }
              __ST.hydrateTextInstance(current, renderLanes, workInProgress, newProps) || __ST.throwOnHydrationMismatch(workInProgress, !0);
            } else __ST.markCloned(workInProgress), workInProgress.stateNode = __ST.createTextInstance(newProps, current, renderLanes, workInProgress);
          }
          __ST.bubbleProperties(workInProgress);
          return undefined;
        case 31:
          renderLanes = workInProgress.memoizedState;
          if (undefined === current || undefined !== current.memoizedState) {
            newProps = __ST.popHydrationState(workInProgress);
            if (undefined !== renderLanes) {
              if (undefined === current) {
                if (!newProps) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
                if (!__ST.supportsHydration) throw Error("Expected prepareToHydrateHostActivityInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
                current = workInProgress.memoizedState;
                current = undefined !== current ? current.dehydrated : undefined;
                if (!current) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
                __ST.hydrateActivityInstance(current, workInProgress);
                __ST.bubbleProperties(workInProgress);
                (workInProgress.mode & 2) !== __ST.NoMode && undefined !== renderLanes && (current = workInProgress.child, undefined !== current && (workInProgress.treeBaseDuration -= current.treeBaseDuration));
              } else __ST.emitPendingHydrationWarnings(), __ST.resetHydrationState(), 0 === (workInProgress.flags & 128) && (renderLanes = workInProgress.memoizedState = undefined), workInProgress.flags |= 4, __ST.bubbleProperties(workInProgress), (workInProgress.mode & 2) !== __ST.NoMode && undefined !== renderLanes && (current = workInProgress.child, undefined !== current && (workInProgress.treeBaseDuration -= current.treeBaseDuration));
              current = !1;
            } else renderLanes = __ST.upgradeHydrationErrorsToRecoverable(), undefined !== current && undefined !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes), current = !0;
            if (!current) {
              if (workInProgress.flags & 256) return __ST.popSuspenseHandler(workInProgress), workInProgress;
              __ST.popSuspenseHandler(workInProgress);
              return undefined;
            }
            if (0 !== (workInProgress.flags & 128)) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
          }
          __ST.bubbleProperties(workInProgress);
          return undefined;
        case 13:
          newProps = workInProgress.memoizedState;
          if (undefined === current || undefined !== current.memoizedState && undefined !== current.memoizedState.dehydrated) {
            __type = newProps;
            nextResource = __ST.popHydrationState(workInProgress);
            if (undefined !== __type && undefined !== __type.dehydrated) {
              if (undefined === current) {
                if (!nextResource) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
                if (!__ST.supportsHydration) throw Error("Expected prepareToHydrateHostSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
                nextResource = workInProgress.memoizedState;
                nextResource = undefined !== nextResource ? nextResource.dehydrated : undefined;
                if (!nextResource) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
                __ST.hydrateSuspenseInstance(nextResource, workInProgress);
                __ST.bubbleProperties(workInProgress);
                (workInProgress.mode & 2) !== __ST.NoMode && undefined !== __type && (__type = workInProgress.child, undefined !== __type && (workInProgress.treeBaseDuration -= __type.treeBaseDuration));
              } else __ST.emitPendingHydrationWarnings(), __ST.resetHydrationState(), 0 === (workInProgress.flags & 128) && (__type = workInProgress.memoizedState = undefined), workInProgress.flags |= 4, __ST.bubbleProperties(workInProgress), (workInProgress.mode & 2) !== __ST.NoMode && undefined !== __type && (__type = workInProgress.child, undefined !== __type && (workInProgress.treeBaseDuration -= __type.treeBaseDuration));
              __type = !1;
            } else __type = __ST.upgradeHydrationErrorsToRecoverable(), undefined !== current && undefined !== current.memoizedState && (current.memoizedState.hydrationErrors = __type), __type = !0;
            if (!__type) {
              if (workInProgress.flags & 256) return __ST.popSuspenseHandler(workInProgress), workInProgress;
              __ST.popSuspenseHandler(workInProgress);
              return undefined;
            }
          }
          __ST.popSuspenseHandler(workInProgress);
          if (0 !== (workInProgress.flags & 128)) return workInProgress.lanes = renderLanes, (workInProgress.mode & 2) !== __ST.NoMode && __ST.transferActualDuration(workInProgress), workInProgress;
          renderLanes = undefined !== newProps;
          current = undefined !== current && undefined !== current.memoizedState;
          renderLanes && (newProps = workInProgress.child, __type = undefined, undefined !== newProps.alternate && undefined !== newProps.alternate.memoizedState && undefined !== newProps.alternate.memoizedState.cachePool && (__type = newProps.alternate.memoizedState.cachePool.pool), nextResource = undefined, undefined !== newProps.memoizedState && undefined !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== __type && (newProps.flags |= 2048));
          renderLanes !== current && renderLanes && (workInProgress.child.flags |= 8192);
          __ST.scheduleRetryEffect(workInProgress, workInProgress.updateQueue);
          __ST.bubbleProperties(workInProgress);
          (workInProgress.mode & 2) !== __ST.NoMode && renderLanes && (current = workInProgress.child, undefined !== current && (workInProgress.treeBaseDuration -= current.treeBaseDuration));
          return undefined;
        case 4:
          return __ST.popHostContainer(workInProgress), __ST.updateHostContainer(current, workInProgress), undefined === current && __ST.preparePortalMount(workInProgress.stateNode.containerInfo), __ST.bubbleProperties(workInProgress), undefined;
        case 10:
          return __ST.popProvider(workInProgress.type, workInProgress), __ST.bubbleProperties(workInProgress), undefined;
        case 19:
          __ST.pop(__ST.suspenseStackCursor, workInProgress);
          newProps = workInProgress.memoizedState;
          if (undefined === newProps) return __ST.bubbleProperties(workInProgress), undefined;
          __type = 0 !== (workInProgress.flags & 128);
          nextResource = newProps.rendering;
          if (undefined === nextResource) {
            if (__type) __ST.cutOffTailIfNeeded(newProps, !1);else {
              if (__ST.workInProgressRootExitStatus !== __ST.RootInProgress || undefined !== current && 0 !== (current.flags & 128)) for (current = workInProgress.child; undefined !== current;) {
                nextResource = __ST.findFirstSuspended(current);
                if (undefined !== nextResource) {
                  workInProgress.flags |= 128;
                  __ST.cutOffTailIfNeeded(newProps, !1);
                  current = nextResource.updateQueue;
                  workInProgress.updateQueue = current;
                  __ST.scheduleRetryEffect(workInProgress, current);
                  workInProgress.subtreeFlags = 0;
                  current = renderLanes;
                  for (renderLanes = workInProgress.child; undefined !== renderLanes;) __ST.resetWorkInProgress(renderLanes, current), renderLanes = renderLanes.sibling;
                  __ST.push(__ST.suspenseStackCursor, __ST.suspenseStackCursor.current & __ST.SubtreeSuspenseContextMask | __ST.ForceSuspenseFallback, workInProgress);
                  __ST.isHydrating && __ST.pushTreeFork(workInProgress, newProps.treeForkCount);
                  return workInProgress.child;
                }
                current = current.sibling;
              }
              undefined !== newProps.tail && __ST.now_1() > __ST.workInProgressRootRenderTargetTime && (workInProgress.flags |= 128, __type = !0, __ST.cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
            }
          } else {
            if (!__type) if (current = __ST.findFirstSuspended(nextResource), undefined !== current) {
              if (workInProgress.flags |= 128, __type = !0, current = current.updateQueue, workInProgress.updateQueue = current, __ST.scheduleRetryEffect(workInProgress, current), __ST.cutOffTailIfNeeded(newProps, !0), undefined === newProps.tail && "hidden" === newProps.tailMode && !nextResource.alternate && !__ST.isHydrating) return __ST.bubbleProperties(workInProgress), undefined;
            } else 2 * __ST.now_1() - newProps.renderingStartTime > __ST.workInProgressRootRenderTargetTime && 536870912 !== renderLanes && (workInProgress.flags |= 128, __type = !0, __ST.cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
            newProps.isBackwards ? (nextResource.sibling = workInProgress.child, workInProgress.child = nextResource) : (current = newProps.last, undefined !== current ? current.sibling = nextResource : workInProgress.child = nextResource, newProps.last = nextResource);
          }
          if (undefined !== newProps.tail) return current = newProps.tail, newProps.rendering = current, newProps.tail = current.sibling, newProps.renderingStartTime = __ST.now_1(), current.sibling = undefined, renderLanes = __ST.suspenseStackCursor.current, renderLanes = __type ? renderLanes & __ST.SubtreeSuspenseContextMask | __ST.ForceSuspenseFallback : renderLanes & __ST.SubtreeSuspenseContextMask, __ST.push(__ST.suspenseStackCursor, renderLanes, workInProgress), __ST.isHydrating && __ST.pushTreeFork(workInProgress, newProps.treeForkCount), current;
          __ST.bubbleProperties(workInProgress);
          return undefined;
        case 22:
        case 23:
          return __ST.popSuspenseHandler(workInProgress), __ST.popHiddenContext(workInProgress), newProps = undefined !== workInProgress.memoizedState, undefined !== current ? undefined !== current.memoizedState !== newProps && (workInProgress.flags |= 8192) : newProps && (workInProgress.flags |= 8192), newProps ? 0 !== (renderLanes & 536870912) && 0 === (workInProgress.flags & 128) && (__ST.bubbleProperties(workInProgress), workInProgress.subtreeFlags & 6 && (workInProgress.flags |= 8192)) : __ST.bubbleProperties(workInProgress), renderLanes = workInProgress.updateQueue, undefined !== renderLanes && __ST.scheduleRetryEffect(workInProgress, renderLanes.retryQueue), renderLanes = undefined, undefined !== current && undefined !== current.memoizedState && undefined !== current.memoizedState.cachePool && (renderLanes = current.memoizedState.cachePool.pool), newProps = undefined, undefined !== workInProgress.memoizedState && undefined !== workInProgress.memoizedState.cachePool && (newProps = workInProgress.memoizedState.cachePool.pool), newProps !== renderLanes && (workInProgress.flags |= 2048), undefined !== current && __ST.pop(__ST.resumedCache, workInProgress), undefined;
        case 24:
          return renderLanes = undefined, undefined !== current && (renderLanes = current.memoizedState.cache), workInProgress.memoizedState.cache !== renderLanes && (workInProgress.flags |= 2048), __ST.popProvider(__ST.CacheContext, workInProgress), __ST.bubbleProperties(workInProgress), undefined;
        case 25:
          return undefined;
        case 30:
          return undefined;
      }
      throw Error(__cat(__cat("Unknown unit of work tag (", workInProgress.tag), "). This error is likely caused by a bug in React. Please file an issue."));
    }(...__args);
  };
  __ST.bubbleProperties = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (completedWork) {
      let didBailout, newChildLanes, subtreeFlags, _treeBaseDuration, _child2, child;
      didBailout = undefined !== completedWork.alternate && completedWork.alternate.child === completedWork.child;
      newChildLanes = 0;
      subtreeFlags = 0;
      if (didBailout) {
        if ((completedWork.mode & 2) !== __ST.NoMode) {
          for (_treeBaseDuration = completedWork.selfBaseDuration, _child2 = completedWork.child; undefined !== _child2;) newChildLanes |= _child2.lanes | _child2.childLanes, subtreeFlags |= _child2.subtreeFlags & 65011712, subtreeFlags |= _child2.flags & 65011712, _treeBaseDuration += _child2.treeBaseDuration, _child2 = _child2.sibling;
          completedWork.treeBaseDuration = _treeBaseDuration;
        } else for (_treeBaseDuration = completedWork.child; undefined !== _treeBaseDuration;) newChildLanes |= _treeBaseDuration.lanes | _treeBaseDuration.childLanes, subtreeFlags |= _treeBaseDuration.subtreeFlags & 65011712, subtreeFlags |= _treeBaseDuration.flags & 65011712, _treeBaseDuration.return = completedWork, _treeBaseDuration = _treeBaseDuration.sibling;
      } else if ((completedWork.mode & 2) !== __ST.NoMode) {
        _treeBaseDuration = completedWork.actualDuration;
        _child2 = completedWork.selfBaseDuration;
        for (child = completedWork.child; undefined !== child;) newChildLanes |= child.lanes | child.childLanes, subtreeFlags |= child.subtreeFlags, subtreeFlags |= child.flags, _treeBaseDuration += child.actualDuration, _child2 += child.treeBaseDuration, child = child.sibling;
        completedWork.actualDuration = _treeBaseDuration;
        completedWork.treeBaseDuration = _child2;
      } else for (_treeBaseDuration = completedWork.child; undefined !== _treeBaseDuration;) newChildLanes |= _treeBaseDuration.lanes | _treeBaseDuration.childLanes, subtreeFlags |= _treeBaseDuration.subtreeFlags, subtreeFlags |= _treeBaseDuration.flags, _treeBaseDuration.return = completedWork, _treeBaseDuration = _treeBaseDuration.sibling;
      completedWork.subtreeFlags |= subtreeFlags;
      completedWork.childLanes = newChildLanes;
      return didBailout;
    }(...__args);
  };
  __ST.cutOffTailIfNeeded = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (renderState, hasRenderedATailFallback) {
      let lastTailNode, _lastTailNode;
      if (!__ST.isHydrating) switch (renderState.tailMode) {
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
    }(...__args);
  };
  __ST.scheduleRetryEffect = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, retryQueue) {
      undefined !== retryQueue && (workInProgress.flags |= 4);
      workInProgress.flags & 16384 && (retryQueue = 22 !== workInProgress.tag ? __ST.claimNextRetryLane() : 536870912, workInProgress.lanes |= retryQueue, __ST.workInProgressSuspendedRetryLanes |= retryQueue);
    }(...__args);
  };
  __ST.preloadResourceAndSuspendIfNeeded = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, resource) {
      if (__ST.mayResourceSuspendCommit(resource)) {
        if (workInProgress.flags |= 16777216, !__ST.preloadResource(resource)) if (__ST.shouldRemainOnPreviousScreen()) workInProgress.flags |= 8192;else throw __ST.suspendedThenable = __ST.noopSuspenseyCommitThenable, __ST.SuspenseyCommitException;
      } else workInProgress.flags &= -16777217;
    }(...__args);
  };
  __ST.preloadInstanceAndSuspendIfNeeded = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, __type, oldProps, newProps, renderLanes) {
      if ((workInProgress.mode & 32) !== __ST.NoMode && (undefined === oldProps ? __ST.maySuspendCommit(__type, newProps) : __ST.maySuspendCommitOnUpdate(__type, oldProps, newProps))) {
        if (workInProgress.flags |= 16777216, (renderLanes & 335544128) === renderLanes || __ST.maySuspendCommitInSyncRender(__type, newProps)) if (__ST.preloadInstance(workInProgress.stateNode, __type, newProps)) workInProgress.flags |= 8192;else if (__ST.shouldRemainOnPreviousScreen()) workInProgress.flags |= 8192;else throw __ST.suspendedThenable = __ST.noopSuspenseyCommitThenable, __ST.SuspenseyCommitException;
      } else workInProgress.flags &= -16777217;
    }(...__args);
  };
  __ST.updateHostComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, __type, newProps) {
      let currentInstance, _oldProps, currentHostContext;
      if (__ST.supportsMutation) current.memoizedProps !== newProps && __ST.markUpdate(workInProgress);else if (__ST.supportsPersistence) {
        currentInstance = current.stateNode;
        _oldProps = current.memoizedProps;
        if ((current = __ST.doesRequireClone(current, workInProgress)) || _oldProps !== newProps) {
          currentHostContext = __ST.getHostContext();
          _oldProps = __ST.cloneInstance(currentInstance, __type, _oldProps, newProps, !current, undefined);
          _oldProps === currentInstance ? workInProgress.stateNode = currentInstance : (__ST.markCloned(workInProgress), __ST.finalizeInitialChildren(_oldProps, __type, newProps, currentHostContext) && __ST.markUpdate(workInProgress), workInProgress.stateNode = _oldProps, current && __ST.appendAllChildren(_oldProps, workInProgress, !1, !1));
        } else workInProgress.stateNode = currentInstance;
      }
    }(...__args);
  };
  __ST.updateHostContainer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress) {
      let container, newChildSet;
      if (__ST.supportsPersistence && __ST.doesRequireClone(current, workInProgress)) {
        current = workInProgress.stateNode;
        container = current.containerInfo;
        newChildSet = __ST.createContainerChildSet();
        __ST.appendAllChildrenToContainer(newChildSet, workInProgress, !1, !1);
        current.pendingChildren = newChildSet;
        __ST.markUpdate(workInProgress);
        __ST.finalizeContainerChildren(container, newChildSet);
      }
    }(...__args);
  };
  __ST.appendAllChildrenToContainer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (containerChildSet, workInProgress, needsVisibilityToggle, isHidden) {
      let hasOffscreenComponentChild, node, instance;
      hasOffscreenComponentChild = !1;
      if (__ST.supportsPersistence) for (node = workInProgress.child; undefined !== node;) {
        if (5 === node.tag) {
          instance = node.stateNode;
          needsVisibilityToggle && isHidden && (instance = __ST.cloneHiddenInstance(instance, node.type, node.memoizedProps));
          __ST.appendChildToContainerChildSet(containerChildSet, instance);
        } else if (6 === node.tag) instance = node.stateNode, needsVisibilityToggle && isHidden && (instance = __ST.cloneHiddenTextInstance(instance, node.memoizedProps)), __ST.appendChildToContainerChildSet(containerChildSet, instance);else if (4 !== node.tag) if (22 === node.tag && undefined !== node.memoizedState) hasOffscreenComponentChild = node.child, undefined !== hasOffscreenComponentChild && (hasOffscreenComponentChild.return = node), __ST.appendAllChildrenToContainer(containerChildSet, node, !0, !0), hasOffscreenComponentChild = !0;else if (undefined !== node.child) {
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
    }(...__args);
  };
  __ST.appendAllChildren = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (parent, workInProgress, needsVisibilityToggle, isHidden) {
      let _node, instance;
      if (__ST.supportsMutation) for (needsVisibilityToggle = workInProgress.child; undefined !== needsVisibilityToggle;) {
        if (5 === needsVisibilityToggle.tag || 6 === needsVisibilityToggle.tag) __ST.appendInitialChild(parent, needsVisibilityToggle.stateNode);else if (!(4 === needsVisibilityToggle.tag || __ST.supportsSingletons && 27 === needsVisibilityToggle.tag) && undefined !== needsVisibilityToggle.child) {
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
      } else if (__ST.supportsPersistence) for (_node = workInProgress.child; undefined !== _node;) {
        if (5 === _node.tag) {
          instance = _node.stateNode;
          needsVisibilityToggle && isHidden && (instance = __ST.cloneHiddenInstance(instance, _node.type, _node.memoizedProps));
          __ST.appendInitialChild(parent, instance);
        } else if (6 === _node.tag) instance = _node.stateNode, needsVisibilityToggle && isHidden && (instance = __ST.cloneHiddenTextInstance(instance, _node.memoizedProps)), __ST.appendInitialChild(parent, instance);else if (4 !== _node.tag) if (22 === _node.tag && undefined !== _node.memoizedState) instance = _node.child, undefined !== instance && (instance.return = _node), __ST.appendAllChildren(parent, _node, !0, !0);else if (undefined !== _node.child) {
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
    }(...__args);
  };
  __ST.doesRequireClone = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, completedWork) {
      if (undefined !== current && current.child === completedWork.child) return !1;
      if (0 !== (completedWork.flags & 16)) return !0;
      for (current = completedWork.child; undefined !== current;) {
        if (0 !== (current.flags & 8218) || 0 !== (current.subtreeFlags & 8218)) return !0;
        current = current.sibling;
      }
      return !1;
    }(...__args);
  };
  __ST.markCloned = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress) {
      __ST.supportsPersistence && (workInProgress.flags |= 8);
    }(...__args);
  };
  __ST.markUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress) {
      workInProgress.flags |= 4;
    }(...__args);
  };
  __ST.beginWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, renderLanes) {
      let returnFiber, prevSibling, nextProps, nextState;
      if (workInProgress._debugNeedsRemount && undefined !== current) {
        renderLanes = __ST.createFiberFromTypeAndProps(workInProgress.type, workInProgress.key, workInProgress.pendingProps, workInProgress._debugOwner || undefined, workInProgress.mode, workInProgress.lanes);
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
        if (current.memoizedProps !== workInProgress.pendingProps || workInProgress.type !== current.type) __ST.didReceiveUpdate = !0;else {
          if (!__ST.checkScheduledUpdateOrContext(current, renderLanes) && 0 === (workInProgress.flags & 128)) return __ST.didReceiveUpdate = !1, __ST.attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes);
          __ST.didReceiveUpdate = 0 !== (current.flags & 131072) ? !0 : !1;
        }
      } else {
        __ST.didReceiveUpdate = !1;
        if (returnFiber = __ST.isHydrating) __ST.warnIfNotHydrating(), returnFiber = 0 !== (workInProgress.flags & 1048576);
        returnFiber && (returnFiber = workInProgress.index, __ST.warnIfNotHydrating(), __ST.pushTreeId(workInProgress, __ST.treeForkCount, returnFiber));
      }
      workInProgress.lanes = 0;
      switch (workInProgress.tag) {
        case 16:
          {
            let __lb_12 = false,
              __lc_12 = false;
            while (!__lb_12) {
              if (returnFiber = workInProgress.pendingProps, current = __ST.resolveLazy(workInProgress.elementType), workInProgress.type = current, "function" === typeOfJS(current)) __ST.shouldConstruct(current) ? (returnFiber = __ST.resolveClassComponentProps(current, returnFiber), workInProgress.tag = 1, workInProgress.type = current = __ST.resolveFunctionForHotReloading(current), workInProgress = __ST.updateClassComponent(undefined, workInProgress, current, returnFiber, renderLanes)) : (workInProgress.tag = 0, __ST.validateFunctionComponentInDev(workInProgress, current), workInProgress.type = current = __ST.resolveFunctionForHotReloading(current), workInProgress = __ST.updateFunctionComponent(undefined, workInProgress, current, returnFiber, renderLanes));else {
                if (void 0 !== current && undefined !== current) if (prevSibling = current.$$typeof, prevSibling === __ST.REACT_FORWARD_REF_TYPE) {
                  workInProgress.tag = 11;
                  workInProgress.type = current = __ST.resolveForwardRefForHotReloading(current);
                  workInProgress = __ST.updateForwardRef(undefined, workInProgress, current, returnFiber, renderLanes);
                  {
                    __lb_12 = true;
                    break;
                  }
                } else if (prevSibling === __ST.REACT_MEMO_TYPE) {
                  workInProgress.tag = 14;
                  workInProgress = __ST.updateMemoComponent(undefined, workInProgress, current, returnFiber, renderLanes);
                  {
                    __lb_12 = true;
                    break;
                  }
                }
                workInProgress = "";
                undefined !== current && "object" === typeOfJS(current) && current.$$typeof === __ST.REACT_LAZY_TYPE && (workInProgress = " Did you wrap a component in React.lazy() more than once?");
                current = __ST.getComponentNameFromType(current) || current;
                throw Error(__cat(__cat(__cat("Element type is invalid. Received a promise that resolves to: ", current), ". Lazy element type must resolve to a class or function."), workInProgress));
              }
              break;
            }
          }
          return workInProgress;
        case 0:
          return __ST.updateFunctionComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
        case 1:
          return returnFiber = workInProgress.type, prevSibling = __ST.resolveClassComponentProps(returnFiber, workInProgress.pendingProps), __ST.updateClassComponent(current, workInProgress, returnFiber, prevSibling, renderLanes);
        case 3:
          {
            let __lb_11 = false,
              __lc_11 = false;
            while (!__lb_11) {
              {
                __ST.pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
                if (undefined === current) throw Error("Should have a current fiber. This is a bug in React.");
                nextProps = workInProgress.pendingProps;
                prevSibling = workInProgress.memoizedState;
                returnFiber = prevSibling.element;
                __ST.cloneUpdateQueue(current, workInProgress);
                __ST.processUpdateQueue(workInProgress, nextProps, undefined, renderLanes);
                nextState = workInProgress.memoizedState;
                nextProps = nextState.cache;
                __ST.pushProvider(workInProgress, __ST.CacheContext, nextProps);
                nextProps !== prevSibling.cache && __ST.propagateContextChanges(workInProgress, __arrNew(__ST.CacheContext), renderLanes, !0);
                __ST.suspendIfUpdateReadFromEntangledAsyncAction();
                nextProps = nextState.element;
                if (__ST.supportsHydration && prevSibling.isDehydrated) {
                  if (prevSibling = {
                    element: nextProps,
                    isDehydrated: !1,
                    cache: nextState.cache
                  }, workInProgress.updateQueue.baseState = prevSibling, workInProgress.memoizedState = prevSibling, workInProgress.flags & 256) {
                    workInProgress = __ST.mountHostRootWithoutHydrating(current, workInProgress, nextProps, renderLanes);
                    {
                      __lb_11 = true;
                      break;
                    }
                  } else if (nextProps !== returnFiber) {
                    returnFiber = __ST.createCapturedValueAtFiber(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), workInProgress);
                    __ST.queueHydrationError(returnFiber);
                    workInProgress = __ST.mountHostRootWithoutHydrating(current, workInProgress, nextProps, renderLanes);
                    {
                      __lb_11 = true;
                      break;
                    }
                  } else for (__ST.supportsHydration && (__ST.nextHydratableInstance = __ST.getFirstHydratableChildWithinContainer(workInProgress.stateNode.containerInfo), __ST.hydrationParentFiber = workInProgress, __ST.isHydrating = !0, __ST.hydrationErrors = undefined, __ST.didSuspendOrErrorDEV = !1, __ST.hydrationDiffRootDEV = undefined, __ST.rootOrSingletonContext = !0), current = __ST.mountChildFibers(workInProgress, undefined, nextProps, renderLanes), workInProgress.child = current; current;) current.flags = current.flags & -3 | 4096, current = current.sibling;
                } else {
                  __ST.resetHydrationState();
                  if (nextProps === returnFiber) {
                    workInProgress = __ST.bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
                    {
                      __lb_11 = true;
                      break;
                    }
                  }
                  __ST.reconcileChildren(current, workInProgress, nextProps, renderLanes);
                }
                workInProgress = workInProgress.child;
              }
              break;
            }
          }
          return workInProgress;
        case 26:
          if (__ST.supportsResources) return __ST.markRef(current, workInProgress), undefined === current ? (current = __ST.getResource(workInProgress.type, undefined, workInProgress.pendingProps, undefined)) ? workInProgress.memoizedState = current : __ST.isHydrating || (workInProgress.stateNode = __ST.createHoistableInstance(workInProgress.type, workInProgress.pendingProps, __ST.requiredContext(__ST.rootInstanceStackCursor.current), workInProgress)) : workInProgress.memoizedState = __ST.getResource(workInProgress.type, current.memoizedProps, workInProgress.pendingProps, current.memoizedState), undefined;
        case 27:
          if (__ST.supportsSingletons) return __ST.pushHostContext(workInProgress), undefined === current && __ST.supportsSingletons && __ST.isHydrating && (prevSibling = __ST.requiredContext(__ST.rootInstanceStackCursor.current), returnFiber = __ST.getHostContext(), prevSibling = workInProgress.stateNode = __ST.resolveSingletonInstance(workInProgress.type, workInProgress.pendingProps, prevSibling, returnFiber, !1), __ST.didSuspendOrErrorDEV || (returnFiber = __ST.diffHydratedPropsForDevWarnings(prevSibling, workInProgress.type, workInProgress.pendingProps, returnFiber), undefined !== returnFiber && (__ST.buildHydrationDiffNode(workInProgress, 0).serverProps = returnFiber)), __ST.hydrationParentFiber = workInProgress, __ST.rootOrSingletonContext = !0, __ST.nextHydratableInstance = __ST.getFirstHydratableChildWithinSingleton(workInProgress.type, prevSibling, __ST.nextHydratableInstance)), __ST.reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), __ST.markRef(current, workInProgress), undefined === current && (workInProgress.flags |= 4194304), workInProgress.child;
        case 5:
          return undefined === current && __ST.isHydrating && (nextProps = __ST.getHostContext(), returnFiber = __ST.validateHydratableInstance(workInProgress.type, workInProgress.pendingProps, nextProps), prevSibling = __ST.nextHydratableInstance, (nextState = !prevSibling) || (nextState = __ST.canHydrateInstance(prevSibling, workInProgress.type, workInProgress.pendingProps, __ST.rootOrSingletonContext), undefined !== nextState ? (workInProgress.stateNode = nextState, __ST.didSuspendOrErrorDEV || (nextProps = __ST.diffHydratedPropsForDevWarnings(nextState, workInProgress.type, workInProgress.pendingProps, nextProps), undefined !== nextProps && (__ST.buildHydrationDiffNode(workInProgress, 0).serverProps = nextProps)), __ST.hydrationParentFiber = workInProgress, __ST.nextHydratableInstance = __ST.getFirstHydratableChild(nextState), __ST.rootOrSingletonContext = !1, nextProps = !0) : nextProps = !1, nextState = !nextProps), nextState && (returnFiber && __ST.warnNonHydratedInstance(workInProgress, prevSibling), __ST.throwOnHydrationMismatch(workInProgress))), __ST.pushHostContext(workInProgress), prevSibling = workInProgress.type, nextProps = workInProgress.pendingProps, nextState = undefined !== current ? current.memoizedProps : undefined, returnFiber = nextProps.children, __ST.shouldSetTextContent(prevSibling, nextProps) ? returnFiber = undefined : undefined !== nextState && __ST.shouldSetTextContent(prevSibling, nextState) && (workInProgress.flags |= 32), undefined !== workInProgress.memoizedState && (prevSibling = __ST.renderWithHooks(current, workInProgress, __ST.TransitionAwareHostComponent, undefined, undefined, renderLanes), __ST.isPrimaryRenderer ? __ST.HostTransitionContext._currentValue = prevSibling : __ST.HostTransitionContext._currentValue2 = prevSibling), __ST.markRef(current, workInProgress), __ST.reconcileChildren(current, workInProgress, returnFiber, renderLanes), workInProgress.child;
        case 6:
          return undefined === current && __ST.isHydrating && (current = workInProgress.pendingProps, renderLanes = __ST.getHostContext(), current = __ST.validateHydratableTextInstance(current, renderLanes), renderLanes = __ST.nextHydratableInstance, (returnFiber = !renderLanes) || (returnFiber = __ST.canHydrateTextInstance(renderLanes, workInProgress.pendingProps, __ST.rootOrSingletonContext), undefined !== returnFiber ? (workInProgress.stateNode = returnFiber, __ST.hydrationParentFiber = workInProgress, __ST.nextHydratableInstance = undefined, returnFiber = !0) : returnFiber = !1, returnFiber = !returnFiber), returnFiber && (current && __ST.warnNonHydratedInstance(workInProgress, renderLanes), __ST.throwOnHydrationMismatch(workInProgress))), undefined;
        case 13:
          return __ST.updateSuspenseComponent(current, workInProgress, renderLanes);
        case 4:
          return __ST.pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), returnFiber = workInProgress.pendingProps, undefined === current ? workInProgress.child = __ST.reconcileChildFibers(workInProgress, undefined, returnFiber, renderLanes) : __ST.reconcileChildren(current, workInProgress, returnFiber, renderLanes), workInProgress.child;
        case 11:
          return __ST.updateForwardRef(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
        case 7:
          return __ST.reconcileChildren(current, workInProgress, workInProgress.pendingProps, renderLanes), workInProgress.child;
        case 8:
          return __ST.reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
        case 12:
          return workInProgress.flags |= 4, workInProgress.flags |= 2048, returnFiber = workInProgress.stateNode, returnFiber.effectDuration = -0, returnFiber.passiveEffectDuration = -0, __ST.reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
        case 10:
          return returnFiber = workInProgress.type, prevSibling = workInProgress.pendingProps, nextProps = prevSibling.value, __in("value", prevSibling) || __ST.hasWarnedAboutUsingNoValuePropOnContextProvider || (__ST.hasWarnedAboutUsingNoValuePropOnContextProvider = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), __ST.pushProvider(workInProgress, returnFiber, nextProps), __ST.reconcileChildren(current, workInProgress, prevSibling.children, renderLanes), workInProgress.child;
        case 9:
          return prevSibling = workInProgress.type._context, returnFiber = workInProgress.pendingProps.children, "function" !== typeOfJS(returnFiber) && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), __ST.prepareToReadContext(workInProgress), prevSibling = __ST.readContext(prevSibling), returnFiber = __ST.callComponentInDEV(returnFiber, prevSibling, void 0), workInProgress.flags |= 1, __ST.reconcileChildren(current, workInProgress, returnFiber, renderLanes), workInProgress.child;
        case 14:
          return __ST.updateMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
        case 15:
          return __ST.updateSimpleMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
        case 19:
          return __ST.updateSuspenseListComponent(current, workInProgress, renderLanes);
        case 31:
          return __ST.updateActivityComponent(current, workInProgress, renderLanes);
        case 22:
          return __ST.updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
        case 24:
          return __ST.prepareToReadContext(workInProgress), returnFiber = __ST.readContext(__ST.CacheContext), undefined === current ? (prevSibling = __ST.peekCacheFromPool(), undefined === prevSibling && (prevSibling = __ST.workInProgressRoot, nextProps = __ST.createCache(), prevSibling.pooledCache = nextProps, __ST.retainCache(nextProps), undefined !== nextProps && (prevSibling.pooledCacheLanes |= renderLanes), prevSibling = nextProps), workInProgress.memoizedState = {
            parent: returnFiber,
            cache: prevSibling
          }, __ST.initializeUpdateQueue(workInProgress), __ST.pushProvider(workInProgress, __ST.CacheContext, prevSibling)) : (0 !== (current.lanes & renderLanes) && (__ST.cloneUpdateQueue(current, workInProgress), __ST.processUpdateQueue(workInProgress, undefined, undefined, renderLanes), __ST.suspendIfUpdateReadFromEntangledAsyncAction()), prevSibling = current.memoizedState, nextProps = workInProgress.memoizedState, prevSibling.parent !== returnFiber ? (prevSibling = {
            parent: returnFiber,
            cache: returnFiber
          }, workInProgress.memoizedState = prevSibling, 0 === workInProgress.lanes && (workInProgress.memoizedState = workInProgress.updateQueue.baseState = prevSibling), __ST.pushProvider(workInProgress, __ST.CacheContext, returnFiber)) : (returnFiber = nextProps.cache, __ST.pushProvider(workInProgress, __ST.CacheContext, returnFiber), returnFiber !== prevSibling.cache && __ST.propagateContextChanges(workInProgress, __arrNew(__ST.CacheContext), renderLanes, !0))), __ST.reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
        case 29:
          throw workInProgress.pendingProps;
      }
      throw Error(__cat(__cat("Unknown unit of work tag (", workInProgress.tag), "). This error is likely caused by a bug in React. Please file an issue."));
    }(...__args);
  };
  __ST.attemptEarlyBailoutIfNoScheduledUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, renderLanes) {
      let stateNode, didSuspendBefore;
      switch (workInProgress.tag) {
        case 3:
          __ST.pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
          __ST.pushProvider(workInProgress, __ST.CacheContext, current.memoizedState.cache);
          __ST.resetHydrationState();
          break;
        case 27:
        case 5:
          __ST.pushHostContext(workInProgress);
          break;
        case 4:
          __ST.pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
          break;
        case 10:
          __ST.pushProvider(workInProgress, workInProgress.type, workInProgress.memoizedProps.value);
          break;
        case 12:
          0 !== (renderLanes & workInProgress.childLanes) && (workInProgress.flags |= 4);
          workInProgress.flags |= 2048;
          stateNode = workInProgress.stateNode;
          stateNode.effectDuration = -0;
          stateNode.passiveEffectDuration = -0;
          break;
        case 31:
          if (undefined !== workInProgress.memoizedState) return workInProgress.flags |= 128, __ST.pushDehydratedActivitySuspenseHandler(workInProgress), undefined;
          break;
        case 13:
          stateNode = workInProgress.memoizedState;
          if (undefined !== stateNode) {
            if (undefined !== stateNode.dehydrated) return __ST.pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags |= 128, undefined;
            if (0 !== (renderLanes & workInProgress.child.childLanes)) return __ST.updateSuspenseComponent(current, workInProgress, renderLanes);
            __ST.pushPrimaryTreeSuspenseHandler(workInProgress);
            current = __ST.bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
            return undefined !== current ? current.sibling : undefined;
          }
          __ST.pushPrimaryTreeSuspenseHandler(workInProgress);
          break;
        case 19:
          didSuspendBefore = 0 !== (current.flags & 128);
          stateNode = 0 !== (renderLanes & workInProgress.childLanes);
          stateNode || (__ST.propagateParentContextChanges(current, workInProgress, renderLanes, !1), stateNode = 0 !== (renderLanes & workInProgress.childLanes));
          if (didSuspendBefore) {
            if (stateNode) return __ST.updateSuspenseListComponent(current, workInProgress, renderLanes);
            workInProgress.flags |= 128;
          }
          didSuspendBefore = workInProgress.memoizedState;
          undefined !== didSuspendBefore && (didSuspendBefore.rendering = undefined, didSuspendBefore.tail = undefined, didSuspendBefore.lastEffect = undefined);
          __ST.push(__ST.suspenseStackCursor, __ST.suspenseStackCursor.current, workInProgress);
          if (stateNode) break;else return undefined;
        case 22:
          return workInProgress.lanes = 0, __ST.updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
        case 24:
          __ST.pushProvider(workInProgress, __ST.CacheContext, current.memoizedState.cache);
      }
      return __ST.bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }(...__args);
  };
  __ST.checkScheduledUpdateOrContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, renderLanes) {
      if (0 !== (current.lanes & renderLanes)) return !0;
      current = current.dependencies;
      return undefined !== current && __ST.checkIfContextChanged(current) ? !0 : !1;
    }(...__args);
  };
  __ST.bailoutOnAlreadyFinishedWork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, renderLanes) {
      undefined !== current && (workInProgress.dependencies = current.dependencies);
      __ST.profilerStartTime = -1;
      __ST.workInProgressRootSkippedLanes |= workInProgress.lanes;
      if (0 === (renderLanes & workInProgress.childLanes)) if (undefined !== current) {
        if (__ST.propagateParentContextChanges(current, workInProgress, renderLanes, !1), 0 === (renderLanes & workInProgress.childLanes)) return undefined;
      } else return undefined;
      if (undefined !== current && workInProgress.child !== current.child) throw Error("Resuming work not yet implemented.");
      if (undefined !== workInProgress.child) {
        current = workInProgress.child;
        renderLanes = __ST.createWorkInProgress(current, current.pendingProps);
        workInProgress.child = renderLanes;
        for (renderLanes.return = workInProgress; undefined !== current.sibling;) current = current.sibling, renderLanes = renderLanes.sibling = __ST.createWorkInProgress(current, current.pendingProps), renderLanes.return = workInProgress;
        renderLanes.sibling = undefined;
      }
      return workInProgress.child;
    }(...__args);
  };
  __ST.updateSuspenseListComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, renderLanes) {
      let nextProps, revealOrder, tailMode, newChildren, suspenseContext, step, _i;
      nextProps = workInProgress.pendingProps;
      revealOrder = nextProps.revealOrder;
      tailMode = nextProps.tail;
      newChildren = nextProps.children;
      suspenseContext = __ST.suspenseStackCursor.current;
      (nextProps = 0 !== (suspenseContext & __ST.ForceSuspenseFallback)) ? (suspenseContext = suspenseContext & __ST.SubtreeSuspenseContextMask | __ST.ForceSuspenseFallback, workInProgress.flags |= 128) : suspenseContext &= __ST.SubtreeSuspenseContextMask;
      __ST.push(__ST.suspenseStackCursor, suspenseContext, workInProgress);
      suspenseContext = revealOrder === undefined ? "null" : revealOrder;
      if ("forwards" !== revealOrder && "unstable_legacy-backwards" !== revealOrder && "together" !== revealOrder && "independent" !== revealOrder && !__ST.didWarnAboutRevealOrder[suspenseContext]) if (__ST.didWarnAboutRevealOrder[suspenseContext] = !0, revealOrder === undefined) console.error('The default for the <SuspenseList revealOrder="..."> prop is changing. To be future compatible you must explictly specify either "independent" (the current default), "together", "forwards" or "legacy_unstable-backwards".');else if ("backwards" === revealOrder) console.error('The rendering order of <SuspenseList revealOrder="backwards"> is changing. To be future compatible you must specify revealOrder="legacy_unstable-backwards" instead.');else if ("string" === typeOfJS(revealOrder)) switch (__toLowerCase(revealOrder)) {
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
      if (!__ST.didWarnAboutTailOptions[suspenseContext]) if (tailMode === undefined) {
        if ("forwards" === revealOrder || "backwards" === revealOrder || "unstable_legacy-backwards" === revealOrder) __ST.didWarnAboutTailOptions[suspenseContext] = !0, console.error('The default for the <SuspenseList tail="..."> prop is changing. To be future compatible you must explictly specify either "visible" (the current default), "collapsed" or "hidden".');
      } else "visible" !== tailMode && "collapsed" !== tailMode && "hidden" !== tailMode ? (__ST.didWarnAboutTailOptions[suspenseContext] = !0, console.error('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "visible", "collapsed" or "hidden"?', tailMode)) : "forwards" !== revealOrder && "backwards" !== revealOrder && "unstable_legacy-backwards" !== revealOrder && (__ST.didWarnAboutTailOptions[suspenseContext] = !0, console.error('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', tailMode));
      {
        let __lb_14 = false,
          __lc_14 = false;
        while (!__lb_14) {
          if (("forwards" === revealOrder || "backwards" === revealOrder || "unstable_legacy-backwards" === revealOrder) && void 0 !== newChildren && undefined !== newChildren && !1 !== newChildren) if (__ST.isArrayImpl(newChildren)) for (suspenseContext = 0; suspenseContext < __len(newChildren); suspenseContext++) {
            if (!__ST.validateSuspenseListNestedChild(newChildren[suspenseContext], suspenseContext)) {
              __lb_14 = true;
              break;
            }
          } else if (suspenseContext = __ST.getIteratorFn(newChildren), "function" === typeOfJS(suspenseContext)) {
            if (suspenseContext = __callFn(suspenseContext, newChildren)) for (step = suspenseContext.next(), _i = 0; !step.done; step = suspenseContext.next()) {
              if (!__ST.validateSuspenseListNestedChild(step.value, _i)) {
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
      __ST.reconcileChildren(current, workInProgress, newChildren, renderLanes);
      __ST.isHydrating ? (__ST.warnIfNotHydrating(), newChildren = __ST.treeForkCount) : newChildren = 0;
      if (!nextProps && undefined !== current && 0 !== (current.flags & 128)) {
        current = workInProgress.child;
        let __lb_13 = false,
          __lc_13 = false;
        while (!__lb_13) {
          __lc_13 = false;
          while (undefined !== current) {
            {
              if (13 === current.tag) undefined !== current.memoizedState && __ST.scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);else if (19 === current.tag) __ST.scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);else if (undefined !== current.child) {
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
          for (revealOrder = undefined; undefined !== renderLanes;) current = renderLanes.alternate, undefined !== current && undefined === __ST.findFirstSuspended(current) && (revealOrder = renderLanes), renderLanes = renderLanes.sibling;
          renderLanes = revealOrder;
          undefined === renderLanes ? (revealOrder = workInProgress.child, workInProgress.child = undefined) : (revealOrder = renderLanes.sibling, renderLanes.sibling = undefined);
          __ST.initSuspenseListRenderState(workInProgress, !1, revealOrder, renderLanes, tailMode, newChildren);
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          renderLanes = undefined;
          revealOrder = workInProgress.child;
          for (workInProgress.child = undefined; undefined !== revealOrder;) {
            current = revealOrder.alternate;
            if (undefined !== current && undefined === __ST.findFirstSuspended(current)) {
              workInProgress.child = revealOrder;
              break;
            }
            current = revealOrder.sibling;
            revealOrder.sibling = renderLanes;
            renderLanes = revealOrder;
            revealOrder = current;
          }
          __ST.initSuspenseListRenderState(workInProgress, !0, renderLanes, undefined, tailMode, newChildren);
          break;
        case "together":
          __ST.initSuspenseListRenderState(workInProgress, !1, undefined, undefined, void 0, newChildren);
          break;
        default:
          workInProgress.memoizedState = undefined;
      }
      return workInProgress.child;
    }(...__args);
  };
  __ST.initSuspenseListRenderState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, isBackwards, tail, lastContentRow, tailMode, treeForkCount) {
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
    }(...__args);
  };
  __ST.scheduleSuspenseWorkOnFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, renderLanes, propagationRoot) {
      let alternate;
      fiber.lanes |= renderLanes;
      alternate = fiber.alternate;
      undefined !== alternate && (alternate.lanes |= renderLanes);
      __ST.scheduleContextWorkOnParentPath(fiber.return, renderLanes, propagationRoot);
    }(...__args);
  };
  __ST.retrySuspenseComponentWithoutHydrating = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, renderLanes) {
      __ST.reconcileChildFibers(workInProgress, current.child, undefined, renderLanes);
      current = __ST.mountSuspensePrimaryChildren(workInProgress, workInProgress.pendingProps.children);
      current.flags |= 2;
      workInProgress.memoizedState = undefined;
      return current;
    }(...__args);
  };
  __ST.mountWorkInProgressOffscreenFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (offscreenProps, mode) {
      offscreenProps = __ST.createFiber(22, offscreenProps, undefined, mode);
      offscreenProps.lanes = 0;
      return offscreenProps;
    }(...__args);
  };
  __ST.mountSuspensePrimaryChildren = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, primaryChildren) {
      primaryChildren = __ST.mountWorkInProgressOffscreenFiber({
        mode: "visible",
        children: primaryChildren
      }, workInProgress.mode);
      primaryChildren.return = workInProgress;
      return workInProgress.child = primaryChildren;
    }(...__args);
  };
  __ST.updateSuspenseComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, renderLanes) {
      let nextProps, showFallback, didSuspend, JSCompiler_temp, nextPrimaryChildren, prevState;
      nextProps = workInProgress.pendingProps;
      __ST.shouldSuspendImpl(workInProgress) && (workInProgress.flags |= 128);
      showFallback = !1;
      didSuspend = 0 !== (workInProgress.flags & 128);
      (JSCompiler_temp = didSuspend) || (JSCompiler_temp = undefined !== current && undefined === current.memoizedState ? !1 : 0 !== (__ST.suspenseStackCursor.current & __ST.ForceSuspenseFallback));
      JSCompiler_temp && (showFallback = !0, workInProgress.flags &= -129);
      JSCompiler_temp = 0 !== (workInProgress.flags & 32);
      workInProgress.flags &= -33;
      if (undefined === current) {
        if (__ST.isHydrating) {
          showFallback ? __ST.pushPrimaryTreeSuspenseHandler(workInProgress) : __ST.reuseSuspenseHandlerOnStack(workInProgress);
          (current = __ST.nextHydratableInstance) ? (renderLanes = __ST.canHydrateSuspenseInstance(current, __ST.rootOrSingletonContext), undefined !== renderLanes && (JSCompiler_temp = {
            dehydrated: renderLanes,
            treeContext: __ST.getSuspendedTreeContext(),
            retryLane: 536870912,
            hydrationErrors: undefined
          }, workInProgress.memoizedState = JSCompiler_temp, JSCompiler_temp = __ST.createFiberFromDehydratedFragment(renderLanes), JSCompiler_temp.return = workInProgress, workInProgress.child = JSCompiler_temp, __ST.hydrationParentFiber = workInProgress, __ST.nextHydratableInstance = undefined)) : renderLanes = undefined;
          if (undefined === renderLanes) throw __ST.warnNonHydratedInstance(workInProgress, current), __ST.throwOnHydrationMismatch(workInProgress);
          __ST.isSuspenseInstanceFallback(renderLanes) ? workInProgress.lanes = 32 : workInProgress.lanes = 536870912;
          return undefined;
        }
        nextPrimaryChildren = nextProps.children;
        nextProps = nextProps.fallback;
        if (showFallback) return __ST.reuseSuspenseHandlerOnStack(workInProgress), showFallback = workInProgress.mode, nextPrimaryChildren = __ST.mountWorkInProgressOffscreenFiber({
          mode: "hidden",
          children: nextPrimaryChildren
        }, showFallback), nextProps = __ST.createFiberFromFragment(nextProps, showFallback, renderLanes, undefined), nextPrimaryChildren.return = workInProgress, nextProps.return = workInProgress, nextPrimaryChildren.sibling = nextProps, workInProgress.child = nextPrimaryChildren, nextProps = workInProgress.child, nextProps.memoizedState = __ST.mountSuspenseOffscreenState(renderLanes), nextProps.childLanes = __ST.getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = __ST.SUSPENDED_MARKER, __ST.bailoutOffscreenComponent(undefined, nextProps);
        __ST.pushPrimaryTreeSuspenseHandler(workInProgress);
        return __ST.mountSuspensePrimaryChildren(workInProgress, nextPrimaryChildren);
      }
      prevState = current.memoizedState;
      if (undefined !== prevState && (nextPrimaryChildren = prevState.dehydrated, undefined !== nextPrimaryChildren)) {
        if (didSuspend) workInProgress.flags & 256 ? (__ST.pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags &= -257, workInProgress = __ST.retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes)) : undefined !== workInProgress.memoizedState ? (__ST.reuseSuspenseHandlerOnStack(workInProgress), workInProgress.child = current.child, workInProgress.flags |= 128, workInProgress = undefined) : (__ST.reuseSuspenseHandlerOnStack(workInProgress), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress.mode, nextProps = __ST.mountWorkInProgressOffscreenFiber({
          mode: "visible",
          children: nextProps.children
        }, showFallback), nextPrimaryChildren = __ST.createFiberFromFragment(nextPrimaryChildren, showFallback, renderLanes, undefined), nextPrimaryChildren.flags |= 2, nextProps.return = workInProgress, nextPrimaryChildren.return = workInProgress, nextProps.sibling = nextPrimaryChildren, workInProgress.child = nextProps, __ST.reconcileChildFibers(workInProgress, current.child, undefined, renderLanes), nextProps = workInProgress.child, nextProps.memoizedState = __ST.mountSuspenseOffscreenState(renderLanes), nextProps.childLanes = __ST.getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = __ST.SUSPENDED_MARKER, workInProgress = __ST.bailoutOffscreenComponent(undefined, nextProps));else if (__ST.pushPrimaryTreeSuspenseHandler(workInProgress), __ST.warnIfHydrating(), 0 !== (renderLanes & 536870912) && __ST.markRenderDerivedCause(workInProgress), __ST.isSuspenseInstanceFallback(nextPrimaryChildren)) showFallback = __ST.getSuspenseInstanceFallbackErrorDetails(nextPrimaryChildren), JSCompiler_temp = showFallback.digest, nextPrimaryChildren = showFallback.message, nextProps = showFallback.stack, showFallback = showFallback.componentStack, nextPrimaryChildren = nextPrimaryChildren ? Error(nextPrimaryChildren) : Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), nextPrimaryChildren.stack = nextProps || "", nextPrimaryChildren.digest = JSCompiler_temp, JSCompiler_temp = void 0 === showFallback ? undefined : showFallback, nextProps = {
          value: nextPrimaryChildren,
          source: undefined,
          stack: JSCompiler_temp
        }, "string" === typeOfJS(JSCompiler_temp) && __ST.CapturedStacks.set(nextPrimaryChildren, nextProps), __ST.queueHydrationError(nextProps), workInProgress = __ST.retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);else if (__ST.didReceiveUpdate || __ST.propagateParentContextChanges(current, workInProgress, renderLanes, !1), JSCompiler_temp = 0 !== (renderLanes & current.childLanes), __ST.didReceiveUpdate || JSCompiler_temp) {
          JSCompiler_temp = __ST.workInProgressRoot;
          if (undefined !== JSCompiler_temp && (nextProps = __ST.getBumpedLaneForHydration(JSCompiler_temp, renderLanes), 0 !== nextProps && nextProps !== prevState.retryLane)) throw prevState.retryLane = nextProps, __ST.enqueueConcurrentRenderForLane(current, nextProps), __ST.scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), __ST.SelectiveHydrationException;
          __ST.isSuspenseInstancePending(nextPrimaryChildren) || __ST.renderDidSuspendDelayIfPossible();
          workInProgress = __ST.retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
        } else __ST.isSuspenseInstancePending(nextPrimaryChildren) ? (workInProgress.flags |= 192, workInProgress.child = current.child, workInProgress = undefined) : (current = prevState.treeContext, __ST.supportsHydration && (__ST.nextHydratableInstance = __ST.getFirstHydratableChildWithinSuspenseInstance(nextPrimaryChildren), __ST.hydrationParentFiber = workInProgress, __ST.isHydrating = !0, __ST.hydrationErrors = undefined, __ST.didSuspendOrErrorDEV = !1, __ST.hydrationDiffRootDEV = undefined, __ST.rootOrSingletonContext = !1, undefined !== current && __ST.restoreSuspendedTreeContext(workInProgress, current)), workInProgress = __ST.mountSuspensePrimaryChildren(workInProgress, nextProps.children), workInProgress.flags |= 4096);
        return workInProgress;
      }
      if (showFallback) return __ST.reuseSuspenseHandlerOnStack(workInProgress), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress.mode, prevState = current.child, didSuspend = prevState.sibling, nextProps = __ST.createWorkInProgress(prevState, {
        mode: "hidden",
        children: nextProps.children
      }), nextProps.subtreeFlags = prevState.subtreeFlags & 65011712, undefined !== didSuspend ? nextPrimaryChildren = __ST.createWorkInProgress(didSuspend, nextPrimaryChildren) : (nextPrimaryChildren = __ST.createFiberFromFragment(nextPrimaryChildren, showFallback, renderLanes, undefined), nextPrimaryChildren.flags |= 2), nextPrimaryChildren.return = workInProgress, nextProps.return = workInProgress, nextProps.sibling = nextPrimaryChildren, workInProgress.child = nextProps, __ST.bailoutOffscreenComponent(undefined, nextProps), nextProps = workInProgress.child, nextPrimaryChildren = current.child.memoizedState, undefined === nextPrimaryChildren ? nextPrimaryChildren = __ST.mountSuspenseOffscreenState(renderLanes) : (showFallback = nextPrimaryChildren.cachePool, undefined !== showFallback ? (prevState = __ST.isPrimaryRenderer ? __ST.CacheContext._currentValue : __ST.CacheContext._currentValue2, showFallback = showFallback.parent !== prevState ? {
        parent: prevState,
        pool: prevState
      } : showFallback) : showFallback = __ST.getSuspendedCache(), nextPrimaryChildren = {
        baseLanes: nextPrimaryChildren.baseLanes | renderLanes,
        cachePool: showFallback
      }), nextProps.memoizedState = nextPrimaryChildren, nextProps.childLanes = __ST.getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = __ST.SUSPENDED_MARKER, __ST.bailoutOffscreenComponent(current.child, nextProps);
      undefined !== prevState && (renderLanes & 62914560) === renderLanes && 0 !== (renderLanes & current.lanes) && __ST.markRenderDerivedCause(workInProgress);
      __ST.pushPrimaryTreeSuspenseHandler(workInProgress);
      renderLanes = current.child;
      current = renderLanes.sibling;
      renderLanes = __ST.createWorkInProgress(renderLanes, {
        mode: "visible",
        children: nextProps.children
      });
      renderLanes.return = workInProgress;
      renderLanes.sibling = undefined;
      undefined !== current && (JSCompiler_temp = workInProgress.deletions, undefined === JSCompiler_temp ? (workInProgress.deletions = __arrNew(current), workInProgress.flags |= 16) : __push(JSCompiler_temp, current));
      workInProgress.child = renderLanes;
      workInProgress.memoizedState = undefined;
      return renderLanes;
    }(...__args);
  };
  __ST.getRemainingWorkInPrimaryTree = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, primaryTreeDidDefer, renderLanes) {
      current = undefined !== current ? current.childLanes & ~renderLanes : 0;
      primaryTreeDidDefer && (current |= __ST.workInProgressDeferredLane);
      return current;
    }(...__args);
  };
  __ST.mountSuspenseOffscreenState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (renderLanes) {
      return {
        baseLanes: renderLanes,
        cachePool: __ST.getSuspendedCache()
      };
    }(...__args);
  };
  __ST.validateFunctionComponentInDev = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, Component) {
      Component && Component.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", Component.displayName || Component.name || "Component");
      "function" === typeOfJS(Component.getDerivedStateFromProps) && (workInProgress = __ST.getComponentNameFromType(Component) || "Unknown", __ST.didWarnAboutGetDerivedStateOnFunctionComponent[workInProgress] || (console.error("%s: Function components do not support getDerivedStateFromProps.", workInProgress), __ST.didWarnAboutGetDerivedStateOnFunctionComponent[workInProgress] = !0));
      "object" === typeOfJS(Component.contextType) && undefined !== Component.contextType && (Component = __ST.getComponentNameFromType(Component) || "Unknown", __ST.didWarnAboutContextTypeOnFunctionComponent[Component] || (console.error("%s: Function components do not support contextType.", Component), __ST.didWarnAboutContextTypeOnFunctionComponent[Component] = !0));
    }(...__args);
  };
  __ST.mountHostRootWithoutHydrating = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, nextChildren, renderLanes) {
      __ST.resetHydrationState();
      workInProgress.flags |= 256;
      __ST.reconcileChildren(current, workInProgress, nextChildren, renderLanes);
      return workInProgress.child;
    }(...__args);
  };
  __ST.updateClassComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, Component, nextProps, renderLanes) {
      let _instance, state, lane, foundWillUpdateName, newApiName, unresolvedOldProps, oldContext, oldState, newState;
      switch (__ST.shouldErrorImpl(workInProgress)) {
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
          state = __ST.workInProgressRoot;
          if (undefined === state) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
          lane = __ST.createClassErrorUpdate(lane);
          __ST.initializeClassErrorUpdate(lane, state, workInProgress, __ST.createCapturedValueAtFiber(_instance, workInProgress));
          __ST.enqueueCapturedUpdate(workInProgress, lane);
      }
      __ST.prepareToReadContext(workInProgress);
      if (undefined === workInProgress.stateNode) {
        state = __ST.emptyContextObject;
        _instance = Component.contextType;
        __in("contextType", Component) && undefined !== _instance && (void 0 === _instance || _instance.$$typeof !== __ST.REACT_CONTEXT_TYPE) && !__ST.didWarnAboutInvalidateContextType.has(Component) && (__ST.didWarnAboutInvalidateContextType.add(Component), lane = void 0 === _instance ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : "object" !== typeOfJS(_instance) ? __cat(__cat(" However, it is set to a ", typeOfJS(_instance)), ".") : _instance.$$typeof === __ST.REACT_CONSUMER_TYPE ? " Did you accidentally pass the Context.Consumer instead?" : __cat(__cat(" However, it is set to an object with keys {", __join(Object.keys(_instance), ", ")), "}."), console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", __ST.getComponentNameFromType(Component) || "Component", lane));
        "object" === typeOfJS(_instance) && undefined !== _instance && (state = __ST.readContext(_instance));
        _instance = __new(Component, nextProps, state);
        if (workInProgress.mode & 8) {
          __ST.setIsStrictModeForDevtools(!0);
          try {
            _instance = __new(Component, nextProps, state);
          } finally {
            __ST.setIsStrictModeForDevtools(!1);
          }
        }
        state = workInProgress.memoizedState = undefined !== _instance.state && void 0 !== _instance.state ? _instance.state : undefined;
        _instance.updater = __ST.classComponentUpdater;
        workInProgress.stateNode = _instance;
        _instance._reactInternals = workInProgress;
        _instance._reactInternalInstance = __ST.fakeInternalInstance;
        "function" === typeOfJS(Component.getDerivedStateFromProps) && undefined === state && (state = __ST.getComponentNameFromType(Component) || "Component", __ST.didWarnAboutUninitializedState.has(state) || (__ST.didWarnAboutUninitializedState.add(state), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", state, undefined === _instance.state ? "null" : "undefined", state)));
        if ("function" === typeOfJS(Component.getDerivedStateFromProps) || "function" === typeOfJS(_instance.getSnapshotBeforeUpdate)) {
          foundWillUpdateName = lane = state = undefined;
          "function" === typeOfJS(_instance.componentWillMount) && !0 !== _instance.componentWillMount.__suppressDeprecationWarning ? state = "componentWillMount" : "function" === typeOfJS(_instance.UNSAFE_componentWillMount) && (state = "UNSAFE_componentWillMount");
          "function" === typeOfJS(_instance.componentWillReceiveProps) && !0 !== _instance.componentWillReceiveProps.__suppressDeprecationWarning ? lane = "componentWillReceiveProps" : "function" === typeOfJS(_instance.UNSAFE_componentWillReceiveProps) && (lane = "UNSAFE_componentWillReceiveProps");
          "function" === typeOfJS(_instance.componentWillUpdate) && !0 !== _instance.componentWillUpdate.__suppressDeprecationWarning ? foundWillUpdateName = "componentWillUpdate" : "function" === typeOfJS(_instance.UNSAFE_componentWillUpdate) && (foundWillUpdateName = "UNSAFE_componentWillUpdate");
          if (undefined !== state || undefined !== lane || undefined !== foundWillUpdateName) {
            _instance = __ST.getComponentNameFromType(Component) || "Component";
            newApiName = "function" === typeOfJS(Component.getDerivedStateFromProps) ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            __ST.didWarnAboutLegacyLifecyclesAndDerivedState.has(_instance) || (__ST.didWarnAboutLegacyLifecyclesAndDerivedState.add(_instance), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", _instance, newApiName, undefined !== state ? __cat("\n  ", state) : "", undefined !== lane ? __cat("\n  ", lane) : "", undefined !== foundWillUpdateName ? __cat("\n  ", foundWillUpdateName) : ""));
          }
        }
        _instance = workInProgress.stateNode;
        state = __ST.getComponentNameFromType(Component) || "Component";
        _instance.render || (__protoOf(Component) && "function" === typeOfJS(__protoOf(Component).render) ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", state) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", state));
        !_instance.getInitialState || _instance.getInitialState.isReactClassApproved || _instance.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", state);
        _instance.getDefaultProps && !_instance.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", state);
        _instance.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", state);
        Component.childContextTypes && !__ST.didWarnAboutChildContextTypes.has(Component) && (__ST.didWarnAboutChildContextTypes.add(Component), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", state));
        Component.contextTypes && !__ST.didWarnAboutContextTypes_1.has(Component) && (__ST.didWarnAboutContextTypes_1.add(Component), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", state));
        "function" === typeOfJS(_instance.componentShouldUpdate) && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", state);
        __protoOf(Component) && __protoOf(Component).isPureReactComponent && "undefined" !== typeOfJS(_instance.shouldComponentUpdate) && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", __ST.getComponentNameFromType(Component) || "A pure component");
        "function" === typeOfJS(_instance.componentDidUnmount) && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", state);
        "function" === typeOfJS(_instance.componentDidReceiveProps) && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", state);
        "function" === typeOfJS(_instance.componentWillRecieveProps) && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", state);
        "function" === typeOfJS(_instance.UNSAFE_componentWillRecieveProps) && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", state);
        lane = _instance.props !== nextProps;
        void 0 !== _instance.props && lane && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", state);
        _instance.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", state, state);
        "function" !== typeOfJS(_instance.getSnapshotBeforeUpdate) || "function" === typeOfJS(_instance.componentDidUpdate) || __ST.didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(Component) || (__ST.didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(Component), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", __ST.getComponentNameFromType(Component)));
        "function" === typeOfJS(_instance.getDerivedStateFromProps) && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", state);
        "function" === typeOfJS(_instance.getDerivedStateFromError) && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", state);
        "function" === typeOfJS(Component.getSnapshotBeforeUpdate) && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", state);
        (lane = _instance.state) && ("object" !== typeOfJS(lane) || __ST.isArrayImpl(lane)) && console.error("%s.state: must be set to an object or null", state);
        "function" === typeOfJS(_instance.getChildContext) && "object" !== typeOfJS(Component.childContextTypes) && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", state);
        _instance = workInProgress.stateNode;
        _instance.props = nextProps;
        _instance.state = workInProgress.memoizedState;
        _instance.refs = {};
        __ST.initializeUpdateQueue(workInProgress);
        state = Component.contextType;
        _instance.context = "object" === typeOfJS(state) && undefined !== state ? __ST.readContext(state) : __ST.emptyContextObject;
        _instance.state === nextProps && (state = __ST.getComponentNameFromType(Component) || "Component", __ST.didWarnAboutDirectlyAssigningPropsToState.has(state) || (__ST.didWarnAboutDirectlyAssigningPropsToState.add(state), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", state)));
        workInProgress.mode & 8 && __ST.ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, _instance);
        __ST.ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress, _instance);
        _instance.state = workInProgress.memoizedState;
        state = Component.getDerivedStateFromProps;
        "function" === typeOfJS(state) && (__ST.applyDerivedStateFromProps(workInProgress, Component, state, nextProps), _instance.state = workInProgress.memoizedState);
        "function" === typeOfJS(Component.getDerivedStateFromProps) || "function" === typeOfJS(_instance.getSnapshotBeforeUpdate) || "function" !== typeOfJS(_instance.UNSAFE_componentWillMount) && "function" !== typeOfJS(_instance.componentWillMount) || (state = _instance.state, "function" === typeOfJS(_instance.componentWillMount) && _instance.componentWillMount(), "function" === typeOfJS(_instance.UNSAFE_componentWillMount) && _instance.UNSAFE_componentWillMount(), state !== _instance.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", __ST.getComponentNameFromFiber(workInProgress) || "Component"), __ST.classComponentUpdater.enqueueReplaceState(_instance, _instance.state, undefined)), __ST.processUpdateQueue(workInProgress, nextProps, _instance, renderLanes), __ST.suspendIfUpdateReadFromEntangledAsyncAction(), _instance.state = workInProgress.memoizedState);
        "function" === typeOfJS(_instance.componentDidMount) && (workInProgress.flags |= 4194308);
        (workInProgress.mode & 16) !== __ST.NoMode && (workInProgress.flags |= 134217728);
        _instance = !0;
      } else if (undefined === current) {
        _instance = workInProgress.stateNode;
        unresolvedOldProps = workInProgress.memoizedProps;
        lane = __ST.resolveClassComponentProps(Component, unresolvedOldProps);
        _instance.props = lane;
        oldContext = _instance.context;
        foundWillUpdateName = Component.contextType;
        state = __ST.emptyContextObject;
        "object" === typeOfJS(foundWillUpdateName) && undefined !== foundWillUpdateName && (state = __ST.readContext(foundWillUpdateName));
        newApiName = Component.getDerivedStateFromProps;
        foundWillUpdateName = "function" === typeOfJS(newApiName) || "function" === typeOfJS(_instance.getSnapshotBeforeUpdate);
        unresolvedOldProps = workInProgress.pendingProps !== unresolvedOldProps;
        foundWillUpdateName || "function" !== typeOfJS(_instance.UNSAFE_componentWillReceiveProps) && "function" !== typeOfJS(_instance.componentWillReceiveProps) || (unresolvedOldProps || oldContext !== state) && __ST.callComponentWillReceiveProps(workInProgress, _instance, nextProps, state);
        __ST.hasForceUpdate = !1;
        oldState = workInProgress.memoizedState;
        _instance.state = oldState;
        __ST.processUpdateQueue(workInProgress, nextProps, _instance, renderLanes);
        __ST.suspendIfUpdateReadFromEntangledAsyncAction();
        oldContext = workInProgress.memoizedState;
        unresolvedOldProps || oldState !== oldContext || __ST.hasForceUpdate ? ("function" === typeOfJS(newApiName) && (__ST.applyDerivedStateFromProps(workInProgress, Component, newApiName, nextProps), oldContext = workInProgress.memoizedState), (lane = __ST.hasForceUpdate || __ST.checkShouldComponentUpdate(workInProgress, Component, lane, nextProps, oldState, oldContext, state)) ? (foundWillUpdateName || "function" !== typeOfJS(_instance.UNSAFE_componentWillMount) && "function" !== typeOfJS(_instance.componentWillMount) || ("function" === typeOfJS(_instance.componentWillMount) && _instance.componentWillMount(), "function" === typeOfJS(_instance.UNSAFE_componentWillMount) && _instance.UNSAFE_componentWillMount()), "function" === typeOfJS(_instance.componentDidMount) && (workInProgress.flags |= 4194308), (workInProgress.mode & 16) !== __ST.NoMode && (workInProgress.flags |= 134217728)) : ("function" === typeOfJS(_instance.componentDidMount) && (workInProgress.flags |= 4194308), (workInProgress.mode & 16) !== __ST.NoMode && (workInProgress.flags |= 134217728), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), _instance.props = nextProps, _instance.state = oldContext, _instance.context = state, _instance = lane) : ("function" === typeOfJS(_instance.componentDidMount) && (workInProgress.flags |= 4194308), (workInProgress.mode & 16) !== __ST.NoMode && (workInProgress.flags |= 134217728), _instance = !1);
      } else {
        _instance = workInProgress.stateNode;
        __ST.cloneUpdateQueue(current, workInProgress);
        state = workInProgress.memoizedProps;
        foundWillUpdateName = __ST.resolveClassComponentProps(Component, state);
        _instance.props = foundWillUpdateName;
        newApiName = workInProgress.pendingProps;
        oldState = _instance.context;
        oldContext = Component.contextType;
        lane = __ST.emptyContextObject;
        "object" === typeOfJS(oldContext) && undefined !== oldContext && (lane = __ST.readContext(oldContext));
        unresolvedOldProps = Component.getDerivedStateFromProps;
        (oldContext = "function" === typeOfJS(unresolvedOldProps) || "function" === typeOfJS(_instance.getSnapshotBeforeUpdate)) || "function" !== typeOfJS(_instance.UNSAFE_componentWillReceiveProps) && "function" !== typeOfJS(_instance.componentWillReceiveProps) || (state !== newApiName || oldState !== lane) && __ST.callComponentWillReceiveProps(workInProgress, _instance, nextProps, lane);
        __ST.hasForceUpdate = !1;
        oldState = workInProgress.memoizedState;
        _instance.state = oldState;
        __ST.processUpdateQueue(workInProgress, nextProps, _instance, renderLanes);
        __ST.suspendIfUpdateReadFromEntangledAsyncAction();
        newState = workInProgress.memoizedState;
        state !== newApiName || oldState !== newState || __ST.hasForceUpdate || undefined !== current && undefined !== current.dependencies && __ST.checkIfContextChanged(current.dependencies) ? ("function" === typeOfJS(unresolvedOldProps) && (__ST.applyDerivedStateFromProps(workInProgress, Component, unresolvedOldProps, nextProps), newState = workInProgress.memoizedState), (foundWillUpdateName = __ST.hasForceUpdate || __ST.checkShouldComponentUpdate(workInProgress, Component, foundWillUpdateName, nextProps, oldState, newState, lane) || undefined !== current && undefined !== current.dependencies && __ST.checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeOfJS(_instance.UNSAFE_componentWillUpdate) && "function" !== typeOfJS(_instance.componentWillUpdate) || ("function" === typeOfJS(_instance.componentWillUpdate) && _instance.componentWillUpdate(nextProps, newState, lane), "function" === typeOfJS(_instance.UNSAFE_componentWillUpdate) && _instance.UNSAFE_componentWillUpdate(nextProps, newState, lane)), "function" === typeOfJS(_instance.componentDidUpdate) && (workInProgress.flags |= 4), "function" === typeOfJS(_instance.getSnapshotBeforeUpdate) && (workInProgress.flags |= 1024)) : ("function" !== typeOfJS(_instance.componentDidUpdate) || state === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeOfJS(_instance.getSnapshotBeforeUpdate) || state === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = newState), _instance.props = nextProps, _instance.state = newState, _instance.context = lane, _instance = foundWillUpdateName) : ("function" !== typeOfJS(_instance.componentDidUpdate) || state === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeOfJS(_instance.getSnapshotBeforeUpdate) || state === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), _instance = !1);
      }
      lane = _instance;
      __ST.markRef(current, workInProgress);
      state = 0 !== (workInProgress.flags & 128);
      if (lane || state) {
        lane = workInProgress.stateNode;
        __ST.setCurrentFiber(workInProgress);
        if (state && "function" !== typeOfJS(Component.getDerivedStateFromError)) Component = undefined, __ST.profilerStartTime = -1;else if (Component = __ST.callRenderInDEV(lane), workInProgress.mode & 8) {
          __ST.setIsStrictModeForDevtools(!0);
          try {
            __ST.callRenderInDEV(lane);
          } finally {
            __ST.setIsStrictModeForDevtools(!1);
          }
        }
        workInProgress.flags |= 1;
        undefined !== current && state ? (workInProgress.child = __ST.reconcileChildFibers(workInProgress, current.child, undefined, renderLanes), workInProgress.child = __ST.reconcileChildFibers(workInProgress, undefined, Component, renderLanes)) : __ST.reconcileChildren(current, workInProgress, Component, renderLanes);
        workInProgress.memoizedState = lane.state;
        current = workInProgress.child;
      } else current = __ST.bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      renderLanes = workInProgress.stateNode;
      _instance && renderLanes.props !== nextProps && (__ST.didWarnAboutReassigningProps || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", __ST.getComponentNameFromFiber(workInProgress) || "a component"), __ST.didWarnAboutReassigningProps = !0);
      return current;
    }(...__args);
  };
  __ST.replayFunctionComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, nextProps, Component, secondArg, renderLanes) {
      __ST.prepareToReadContext(workInProgress);
      __ST.hookTypesUpdateIndexDev = -1;
      __ST.ignorePreviousDependencies = undefined !== current && current.type !== workInProgress.type;
      workInProgress.updateQueue = undefined;
      nextProps = __ST.renderWithHooksAgain(workInProgress, Component, nextProps, secondArg);
      __ST.finishRenderingHooks(current, workInProgress);
      Component = __ST.checkDidRenderIdHook();
      if (undefined !== current && !__ST.didReceiveUpdate) return __ST.bailoutHooks(current, workInProgress, renderLanes), __ST.bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      __ST.isHydrating && Component && __ST.pushMaterializedTreeId(workInProgress);
      workInProgress.flags |= 1;
      __ST.reconcileChildren(current, workInProgress, nextProps, renderLanes);
      return workInProgress.child;
    }(...__args);
  };
  __ST.updateFunctionComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, Component, nextProps, renderLanes) {
      let componentName;
      if (__protoOf(Component) && "function" === typeOfJS(__protoOf(Component).render)) {
        componentName = __ST.getComponentNameFromType(Component) || "Unknown";
        __ST.didWarnAboutBadClass[componentName] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName), __ST.didWarnAboutBadClass[componentName] = !0);
      }
      workInProgress.mode & 8 && __ST.ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, undefined);
      undefined === current && (__ST.validateFunctionComponentInDev(workInProgress, workInProgress.type), Component.contextTypes && (componentName = __ST.getComponentNameFromType(Component) || "Unknown", __ST.didWarnAboutContextTypes[componentName] || (__ST.didWarnAboutContextTypes[componentName] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", componentName))));
      __ST.prepareToReadContext(workInProgress);
      Component = __ST.renderWithHooks(current, workInProgress, Component, nextProps, void 0, renderLanes);
      nextProps = __ST.checkDidRenderIdHook();
      if (undefined !== current && !__ST.didReceiveUpdate) return __ST.bailoutHooks(current, workInProgress, renderLanes), __ST.bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      __ST.isHydrating && nextProps && __ST.pushMaterializedTreeId(workInProgress);
      workInProgress.flags |= 1;
      __ST.reconcileChildren(current, workInProgress, Component, renderLanes);
      return workInProgress.child;
    }(...__args);
  };
  __ST.markRef = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress) {
      let ref;
      ref = workInProgress.ref;
      if (undefined === ref) undefined !== current && undefined !== current.ref && (workInProgress.flags |= 4194816);else {
        if ("function" !== typeOfJS(ref) && "object" !== typeOfJS(ref)) throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
        if (undefined === current || current.ref !== ref) workInProgress.flags |= 4194816;
      }
    }(...__args);
  };
  __ST.updateActivityComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, renderLanes) {
      let nextProps, didSuspend, prevState, activityInstance;
      nextProps = workInProgress.pendingProps;
      didSuspend = 0 !== (workInProgress.flags & 128);
      workInProgress.flags &= -129;
      if (undefined === current) {
        if (__ST.isHydrating) {
          if ("hidden" === nextProps.mode) return current = __ST.mountActivityChildren(workInProgress, nextProps), workInProgress.lanes = 536870912, __ST.bailoutOffscreenComponent(undefined, current);
          __ST.pushDehydratedActivitySuspenseHandler(workInProgress);
          (current = __ST.nextHydratableInstance) ? (renderLanes = __ST.canHydrateActivityInstance(current, __ST.rootOrSingletonContext), undefined !== renderLanes && (nextProps = {
            dehydrated: renderLanes,
            treeContext: __ST.getSuspendedTreeContext(),
            retryLane: 536870912,
            hydrationErrors: undefined
          }, workInProgress.memoizedState = nextProps, nextProps = __ST.createFiberFromDehydratedFragment(renderLanes), nextProps.return = workInProgress, workInProgress.child = nextProps, __ST.hydrationParentFiber = workInProgress, __ST.nextHydratableInstance = undefined)) : renderLanes = undefined;
          if (undefined === renderLanes) throw __ST.warnNonHydratedInstance(workInProgress, current), __ST.throwOnHydrationMismatch(workInProgress);
          workInProgress.lanes = 536870912;
          return undefined;
        }
        return __ST.mountActivityChildren(workInProgress, nextProps);
      }
      prevState = current.memoizedState;
      if (undefined !== prevState) {
        activityInstance = prevState.dehydrated;
        __ST.pushDehydratedActivitySuspenseHandler(workInProgress);
        if (didSuspend) {
          if (workInProgress.flags & 256) workInProgress.flags &= -257, workInProgress = __ST.retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);else if (undefined !== workInProgress.memoizedState) workInProgress.child = current.child, workInProgress.flags |= 128, workInProgress = undefined;else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
        } else if (__ST.warnIfHydrating(), 0 !== (renderLanes & 536870912) && __ST.markRenderDerivedCause(workInProgress), __ST.didReceiveUpdate || __ST.propagateParentContextChanges(current, workInProgress, renderLanes, !1), didSuspend = 0 !== (renderLanes & current.childLanes), __ST.didReceiveUpdate || didSuspend) {
          nextProps = __ST.workInProgressRoot;
          if (undefined !== nextProps && (activityInstance = __ST.getBumpedLaneForHydration(nextProps, renderLanes), 0 !== activityInstance && activityInstance !== prevState.retryLane)) throw prevState.retryLane = activityInstance, __ST.enqueueConcurrentRenderForLane(current, activityInstance), __ST.scheduleUpdateOnFiber(nextProps, current, activityInstance), __ST.SelectiveHydrationException;
          __ST.renderDidSuspendDelayIfPossible();
          workInProgress = __ST.retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);
        } else current = prevState.treeContext, __ST.supportsHydration && (__ST.nextHydratableInstance = __ST.getFirstHydratableChildWithinActivityInstance(activityInstance), __ST.hydrationParentFiber = workInProgress, __ST.isHydrating = !0, __ST.hydrationErrors = undefined, __ST.didSuspendOrErrorDEV = !1, __ST.hydrationDiffRootDEV = undefined, __ST.rootOrSingletonContext = !1, undefined !== current && __ST.restoreSuspendedTreeContext(workInProgress, current)), workInProgress = __ST.mountActivityChildren(workInProgress, nextProps), workInProgress.flags |= 4096;
        return workInProgress;
      }
      prevState = current.child;
      nextProps = {
        mode: nextProps.mode,
        children: nextProps.children
      };
      0 !== (renderLanes & 536870912) && 0 !== (renderLanes & current.lanes) && __ST.markRenderDerivedCause(workInProgress);
      current = __ST.createWorkInProgress(prevState, nextProps);
      current.ref = workInProgress.ref;
      workInProgress.child = current;
      current.return = workInProgress;
      return current;
    }(...__args);
  };
  __ST.retryActivityComponentWithoutHydrating = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, renderLanes) {
      __ST.reconcileChildFibers(workInProgress, current.child, undefined, renderLanes);
      current = __ST.mountActivityChildren(workInProgress, workInProgress.pendingProps);
      current.flags |= 2;
      __ST.popSuspenseHandler(workInProgress);
      workInProgress.memoizedState = undefined;
      return current;
    }(...__args);
  };
  __ST.mountActivityChildren = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, nextProps) {
      let hiddenProp;
      hiddenProp = nextProps.hidden;
      void 0 !== hiddenProp && console.error('<Activity> doesn\'t accept a hidden prop. Use mode="hidden" instead.\n- <Activity %s>\n+ <Activity %s>', !0 === hiddenProp ? "hidden" : !1 === hiddenProp ? "hidden={false}" : "hidden={...}", hiddenProp ? 'mode="hidden"' : 'mode="visible"');
      nextProps = __ST.mountWorkInProgressOffscreenFiber({
        mode: nextProps.mode,
        children: nextProps.children
      }, workInProgress.mode);
      nextProps.ref = workInProgress.ref;
      workInProgress.child = nextProps;
      nextProps.return = workInProgress;
      return nextProps;
    }(...__args);
  };
  __ST.deferHiddenOffscreenComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, nextBaseLanes, renderLanes, remainingChildLanes) {
      let JSCompiler_inline_result;
      JSCompiler_inline_result = __ST.peekCacheFromPool();
      JSCompiler_inline_result = undefined === JSCompiler_inline_result ? undefined : {
        parent: __ST.isPrimaryRenderer ? __ST.CacheContext._currentValue : __ST.CacheContext._currentValue2,
        pool: JSCompiler_inline_result
      };
      workInProgress.memoizedState = {
        baseLanes: nextBaseLanes,
        cachePool: JSCompiler_inline_result
      };
      undefined !== current && __ST.pushTransition(workInProgress, undefined);
      __ST.reuseHiddenContextOnStack(workInProgress);
      __ST.pushOffscreenSuspenseHandler(workInProgress);
      undefined !== current && __ST.propagateParentContextChanges(current, workInProgress, renderLanes, !0);
      workInProgress.childLanes = remainingChildLanes;
      return undefined;
    }(...__args);
  };
  __ST.bailoutOffscreenComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress) {
      undefined !== current && 22 === current.tag || undefined !== workInProgress.stateNode || (workInProgress.stateNode = {
        _visibility: __ST.OffscreenVisible,
        _pendingMarkers: undefined,
        _retryCache: undefined,
        _transitions: undefined
      });
      return workInProgress.sibling;
    }(...__args);
  };
  __ST.updateOffscreenComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, renderLanes, nextProps) {
      let nextChildren, prevState;
      nextChildren = nextProps.children;
      prevState = undefined !== current ? current.memoizedState : undefined;
      undefined === current && undefined === workInProgress.stateNode && (workInProgress.stateNode = {
        _visibility: __ST.OffscreenVisible,
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
          return __ST.deferHiddenOffscreenComponent(current, workInProgress, prevState, renderLanes, nextProps);
        }
        if (0 !== (renderLanes & 536870912)) workInProgress.memoizedState = {
          baseLanes: 0,
          cachePool: undefined
        }, undefined !== current && __ST.pushTransition(workInProgress, undefined !== prevState ? prevState.cachePool : undefined), undefined !== prevState ? __ST.pushHiddenContext(workInProgress, prevState) : __ST.reuseHiddenContextOnStack(workInProgress), __ST.pushOffscreenSuspenseHandler(workInProgress);else return nextProps = workInProgress.lanes = 536870912, __ST.deferHiddenOffscreenComponent(current, workInProgress, undefined !== prevState ? prevState.baseLanes | renderLanes : renderLanes, renderLanes, nextProps);
      } else undefined !== prevState ? (__ST.pushTransition(workInProgress, prevState.cachePool), __ST.pushHiddenContext(workInProgress, prevState), __ST.reuseSuspenseHandlerOnStack(workInProgress), workInProgress.memoizedState = undefined) : (undefined !== current && __ST.pushTransition(workInProgress, undefined), __ST.reuseHiddenContextOnStack(workInProgress), __ST.reuseSuspenseHandlerOnStack(workInProgress));
      __ST.reconcileChildren(current, workInProgress, nextChildren, renderLanes);
      return workInProgress.child;
    }(...__args);
  };
  __ST.updateSimpleMemoComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, Component, nextProps, renderLanes) {
      let prevProps;
      if (undefined !== current) {
        prevProps = current.memoizedProps;
        if (__ST.shallowEqual(prevProps, nextProps) && current.ref === workInProgress.ref && workInProgress.type === current.type) if (__ST.didReceiveUpdate = !1, workInProgress.pendingProps = nextProps = prevProps, __ST.checkScheduledUpdateOrContext(current, renderLanes)) 0 !== (current.flags & 131072) && (__ST.didReceiveUpdate = !0);else return workInProgress.lanes = current.lanes, __ST.bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      }
      return __ST.updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes);
    }(...__args);
  };
  __ST.updateMemoComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, Component, nextProps, renderLanes) {
      let __type, prevProps;
      if (undefined === current) {
        __type = Component.type;
        if ("function" === typeOfJS(__type) && !__ST.shouldConstruct(__type) && void 0 === __type.defaultProps && undefined === Component.compare) return Component = __ST.resolveFunctionForHotReloading(__type), workInProgress.tag = 15, workInProgress.type = Component, __ST.validateFunctionComponentInDev(workInProgress, __type), __ST.updateSimpleMemoComponent(current, workInProgress, Component, nextProps, renderLanes);
        current = __ST.createFiberFromTypeAndProps(Component.type, undefined, nextProps, workInProgress, workInProgress.mode, renderLanes);
        current.ref = workInProgress.ref;
        current.return = workInProgress;
        return workInProgress.child = current;
      }
      __type = current.child;
      if (!__ST.checkScheduledUpdateOrContext(current, renderLanes)) {
        prevProps = __type.memoizedProps;
        Component = Component.compare;
        Component = undefined !== Component ? Component : __ST.shallowEqual;
        if (Component(prevProps, nextProps) && current.ref === workInProgress.ref) return __ST.bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      }
      workInProgress.flags |= 1;
      current = __ST.createWorkInProgress(__type, nextProps);
      current.ref = workInProgress.ref;
      current.return = workInProgress;
      return workInProgress.child = current;
    }(...__args);
  };
  __ST.updateForwardRef = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, Component, nextProps, renderLanes) {
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
      __ST.prepareToReadContext(workInProgress);
      nextProps = __ST.renderWithHooks(current, workInProgress, Component, propsWithoutRef, ref, renderLanes);
      key = __ST.checkDidRenderIdHook();
      if (undefined !== current && !__ST.didReceiveUpdate) return __ST.bailoutHooks(current, workInProgress, renderLanes), __ST.bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      __ST.isHydrating && key && __ST.pushMaterializedTreeId(workInProgress);
      workInProgress.flags |= 1;
      __ST.reconcileChildren(current, workInProgress, nextProps, renderLanes);
      return workInProgress.child;
    }(...__args);
  };
  __ST.reconcileChildren = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, nextChildren, renderLanes) {
      workInProgress.child = undefined === current ? __ST.mountChildFibers(workInProgress, undefined, nextChildren, renderLanes) : __ST.reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
    }(...__args);
  };
  __ST.throwException = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, returnFiber, sourceFiber, value, rootRenderLanes) {
      let __error;
      sourceFiber.flags |= 32768;
      __ST.isDevToolsPresent && __ST.restorePendingUpdaters(root, rootRenderLanes);
      if (undefined !== value && "object" === typeOfJS(value) && "function" === typeOfJS(value.then)) {
        returnFiber = sourceFiber.alternate;
        undefined !== returnFiber && __ST.propagateParentContextChanges(returnFiber, sourceFiber, rootRenderLanes, !0);
        __ST.isHydrating && (__ST.didSuspendOrErrorDEV = !0);
        sourceFiber = __ST.suspenseHandlerStackCursor.current;
        if (undefined !== sourceFiber) {
          switch (sourceFiber.tag) {
            case 31:
            case 13:
              return undefined === __ST.shellBoundary ? __ST.renderDidSuspendDelayIfPossible() : undefined === sourceFiber.alternate && __ST.workInProgressRootExitStatus === __ST.RootInProgress && (__ST.workInProgressRootExitStatus = __ST.RootSuspended), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === __ST.noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, undefined === returnFiber ? sourceFiber.updateQueue = __new(Set, __arrNew(value)) : returnFiber.add(value), __ST.attachPingListener(root, value, rootRenderLanes)), !1;
            case 22:
              return sourceFiber.flags |= 65536, value === __ST.noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, undefined === returnFiber ? (returnFiber = {
                transitions: undefined,
                markerInstances: undefined,
                retryQueue: __new(Set, __arrNew(value))
              }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, undefined === sourceFiber ? returnFiber.retryQueue = __new(Set, __arrNew(value)) : sourceFiber.add(value)), __ST.attachPingListener(root, value, rootRenderLanes)), !1;
          }
          throw Error(__cat(__cat("Unexpected Suspense handler tag (", sourceFiber.tag), "). This is a bug in React."));
        }
        __ST.attachPingListener(root, value, rootRenderLanes);
        __ST.renderDidSuspendDelayIfPossible();
        return !1;
      }
      if (__ST.isHydrating) return __ST.didSuspendOrErrorDEV = !0, returnFiber = __ST.suspenseHandlerStackCursor.current, undefined !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== __ST.HydrationMismatchException && __ST.queueHydrationError(__ST.createCapturedValueAtFiber(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", {
        cause: value
      }), sourceFiber))) : (value !== __ST.HydrationMismatchException && __ST.queueHydrationError(__ST.createCapturedValueAtFiber(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", {
        cause: value
      }), sourceFiber)), root = root.current.alternate, root.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root.lanes |= rootRenderLanes, value = __ST.createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = __ST.createRootErrorUpdate(root.stateNode, value, rootRenderLanes), __ST.enqueueCapturedUpdate(root, rootRenderLanes), __ST.workInProgressRootExitStatus !== __ST.RootSuspendedWithDelay && (__ST.workInProgressRootExitStatus = __ST.RootErrored)), !1;
      __error = __ST.createCapturedValueAtFiber(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", {
        cause: value
      }), sourceFiber);
      undefined === __ST.workInProgressRootConcurrentErrors ? __ST.workInProgressRootConcurrentErrors = __arrNew(__error) : __push(__ST.workInProgressRootConcurrentErrors, __error);
      __ST.workInProgressRootExitStatus !== __ST.RootSuspendedWithDelay && (__ST.workInProgressRootExitStatus = __ST.RootErrored);
      if (undefined === returnFiber) return !0;
      value = __ST.createCapturedValueAtFiber(value, sourceFiber);
      sourceFiber = returnFiber;
      do {
        switch (sourceFiber.tag) {
          case 3:
            return sourceFiber.flags |= 65536, root = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root, root = __ST.createRootErrorUpdate(sourceFiber.stateNode, value, root), __ST.enqueueCapturedUpdate(sourceFiber, root), !1;
          case 1:
            if (returnFiber = sourceFiber.type, __error = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeOfJS(returnFiber.getDerivedStateFromError) || undefined !== __error && "function" === typeOfJS(__error.componentDidCatch) && (undefined === __ST.legacyErrorBoundariesThatAlreadyFailed || !__ST.legacyErrorBoundariesThatAlreadyFailed.has(__error)))) return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = __ST.createClassErrorUpdate(rootRenderLanes), __ST.initializeClassErrorUpdate(rootRenderLanes, root, sourceFiber, value), __ST.enqueueCapturedUpdate(sourceFiber, rootRenderLanes), !1;
        }
        sourceFiber = sourceFiber.return;
      } while (undefined !== sourceFiber);
      return !1;
    }(...__args);
  };
  __ST.initializeClassErrorUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (update, root, fiber, errorInfo) {
      let getDerivedStateFromError, __error, inst;
      getDerivedStateFromError = fiber.type.getDerivedStateFromError;
      if ("function" === typeOfJS(getDerivedStateFromError)) {
        __error = errorInfo.value;
        update.payload = function () {
          return getDerivedStateFromError(__error);
        };
        update.callback = function () {
          __ST.markFailedErrorBoundaryForHotReloading(fiber);
          __ST.runWithFiberInDEV(errorInfo.source, __ST.logCaughtError, root, fiber, errorInfo);
        };
      }
      inst = fiber.stateNode;
      undefined !== inst && "function" === typeOfJS(inst.componentDidCatch) && (update.callback = function (__self) {
        __ST.markFailedErrorBoundaryForHotReloading(fiber);
        __ST.runWithFiberInDEV(errorInfo.source, __ST.logCaughtError, root, fiber, errorInfo);
        "function" !== typeOfJS(getDerivedStateFromError) && (undefined === __ST.legacyErrorBoundariesThatAlreadyFailed ? __ST.legacyErrorBoundariesThatAlreadyFailed = __new(Set, __arrNew(__self)) : __ST.legacyErrorBoundariesThatAlreadyFailed.add(__self));
        __ST.callComponentDidCatchInDEV(__self, errorInfo);
        "function" === typeOfJS(getDerivedStateFromError) || 0 === (fiber.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", __ST.getComponentNameFromFiber(fiber) || "Unknown");
      });
    }(...__args);
  };
  __ST.createClassErrorUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (lane) {
      lane = __ST.createUpdate(lane);
      lane.tag = __ST.CaptureUpdate;
      return lane;
    }(...__args);
  };
  __ST.createRootErrorUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, errorInfo, lane) {
      lane = __ST.createUpdate(lane);
      lane.tag = __ST.CaptureUpdate;
      lane.payload = {
        element: undefined
      };
      lane.callback = function () {
        __ST.runWithFiberInDEV(errorInfo.source, __ST.logUncaughtError, root, errorInfo);
      };
      return lane;
    }(...__args);
  };
  __ST.logCaughtError = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, boundary, errorInfo) {
      let onCaughtError;
      try {
        __ST.componentName = errorInfo.source ? __ST.getComponentNameFromFiber(errorInfo.source) : undefined;
        __ST.errorBoundaryName = __ST.getComponentNameFromFiber(boundary);
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
    }(...__args);
  };
  __ST.logUncaughtError = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, errorInfo) {
      let __error, onUncaughtError;
      try {
        __ST.componentName = errorInfo.source ? __ST.getComponentNameFromFiber(errorInfo.source) : undefined;
        __ST.errorBoundaryName = undefined;
        __error = errorInfo.value;
        if (undefined !== __ST.ReactSharedInternals.actQueue) __push(__ST.ReactSharedInternals.thrownErrors, __error);else {
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
    }(...__args);
  };
  __ST.resolveClassComponentProps = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (Component, baseProps) {
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
        newProps === baseProps && (newProps = __ST.assign({}, newProps));
        for (const __k of Object.keys(Component)) {
          _propName = __k;
          void 0 === newProps[_propName] && (newProps[_propName] = Component[_propName]);
        }
      }
      return newProps;
    }(...__args);
  };
  __ST.callComponentWillReceiveProps = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, instance, newProps, nextContext) {
      let oldState;
      oldState = instance.state;
      "function" === typeOfJS(instance.componentWillReceiveProps) && instance.componentWillReceiveProps(newProps, nextContext);
      "function" === typeOfJS(instance.UNSAFE_componentWillReceiveProps) && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
      instance.state !== oldState && (workInProgress = __ST.getComponentNameFromFiber(workInProgress) || "Component", __ST.didWarnAboutStateAssignmentForComponent.has(workInProgress) || (__ST.didWarnAboutStateAssignmentForComponent.add(workInProgress), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", workInProgress)), __ST.classComponentUpdater.enqueueReplaceState(instance, instance.state, undefined));
    }(...__args);
  };
  __ST.checkShouldComponentUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
      let instance;
      instance = workInProgress.stateNode;
      if ("function" === typeOfJS(instance.shouldComponentUpdate)) {
        oldProps = instance.shouldComponentUpdate(newProps, newState, nextContext);
        if (workInProgress.mode & 8) {
          __ST.setIsStrictModeForDevtools(!0);
          try {
            oldProps = instance.shouldComponentUpdate(newProps, newState, nextContext);
          } finally {
            __ST.setIsStrictModeForDevtools(!1);
          }
        }
        void 0 === oldProps && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", __ST.getComponentNameFromType(ctor) || "Component");
        return oldProps;
      }
      return __protoOf(ctor) && __protoOf(ctor).isPureReactComponent ? !__ST.shallowEqual(oldProps, newProps) || !__ST.shallowEqual(oldState, newState) : !0;
    }(...__args);
  };
  __ST.applyDerivedStateFromProps = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, ctor, getDerivedStateFromProps, nextProps) {
      let prevState, partialState;
      prevState = workInProgress.memoizedState;
      partialState = getDerivedStateFromProps(nextProps, prevState);
      if (workInProgress.mode & 8) {
        __ST.setIsStrictModeForDevtools(!0);
        try {
          partialState = getDerivedStateFromProps(nextProps, prevState);
        } finally {
          __ST.setIsStrictModeForDevtools(!1);
        }
      }
      void 0 === partialState && (ctor = __ST.getComponentNameFromType(ctor) || "Component", __ST.didWarnAboutUndefinedDerivedState.has(ctor) || (__ST.didWarnAboutUndefinedDerivedState.add(ctor), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", ctor)));
      prevState = undefined === partialState || void 0 === partialState ? prevState : __ST.assign({}, prevState, partialState);
      workInProgress.memoizedState = prevState;
      0 === workInProgress.lanes && (workInProgress.updateQueue.baseState = prevState);
    }(...__args);
  };
  __ST.warnOnInvalidCallback = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (callback) {
      let key;
      if (undefined !== callback && "function" !== typeOfJS(callback)) {
        key = String(callback);
        __ST.didWarnOnInvalidCallback.has(key) || (__ST.didWarnOnInvalidCallback.add(key), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", callback));
      }
    }(...__args);
  };
  __ST.entangleTransitionUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, queue, lane) {
      let queueLanes;
      if (0 !== (lane & 4194048)) {
        queueLanes = queue.lanes;
        queueLanes &= root.pendingLanes;
        lane |= queueLanes;
        queue.lanes = lane;
        __ST.markRootEntangled(root, lane);
      }
    }(...__args);
  };
  __ST.enqueueRenderPhaseUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (queue, update) {
      let pending;
      __ST.didScheduleRenderPhaseUpdateDuringThisPass = __ST.didScheduleRenderPhaseUpdate = !0;
      pending = queue.pending;
      undefined === pending ? update.next = update : (update.next = pending.next, pending.next = update);
      queue.pending = update;
    }(...__args);
  };
  __ST.isRenderPhaseUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let alternate;
      alternate = fiber.alternate;
      return fiber === __ST.currentlyRenderingFiber || undefined !== alternate && alternate === __ST.currentlyRenderingFiber;
    }(...__args);
  };
  __ST.dispatchOptimisticSetState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, throwIfDuringRender, queue, action) {
      undefined === __ST.ReactSharedInternals.T && 0 === __ST.currentEntangledLane && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition.");
      action = {
        lane: 2,
        revertLane: __ST.requestTransitionLane(),
        gesture: undefined,
        action: action,
        hasEagerState: !1,
        eagerState: undefined,
        next: undefined
      };
      if (__ST.isRenderPhaseUpdate(fiber)) {
        if (throwIfDuringRender) throw Error("Cannot update optimistic state while rendering.");
        console.error("Cannot call startTransition while rendering.");
      } else throwIfDuringRender = __ST.enqueueConcurrentHookUpdate(fiber, queue, action, 2), undefined !== throwIfDuringRender && (__ST.startUpdateTimerByLane(2, "setOptimistic()", fiber), __ST.scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2));
    }(...__args);
  };
  __ST.dispatchSetStateInternal = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, queue, action, lane) {
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
      if (__ST.isRenderPhaseUpdate(fiber)) __ST.enqueueRenderPhaseUpdate(queue, update);else {
        alternate = fiber.alternate;
        if (0 === fiber.lanes && (undefined === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, undefined !== alternate)) {
          prevDispatcher = __ST.ReactSharedInternals.H;
          __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnUpdateInDEV;
          try {
            currentState = queue.lastRenderedState;
            eagerState = alternate(currentState, action);
            update.hasEagerState = !0;
            update.eagerState = eagerState;
            if (__ST.objectIs(eagerState, currentState)) return __ST.enqueueUpdate_1(fiber, queue, update, 0), undefined === __ST.workInProgressRoot && __ST.finishQueueingConcurrentUpdates(), !1;
          } catch (__error) {} finally {
            __ST.ReactSharedInternals.H = prevDispatcher;
          }
        }
        action = __ST.enqueueConcurrentHookUpdate(fiber, queue, update, lane);
        if (undefined !== action) return __ST.scheduleUpdateOnFiber(action, fiber, lane), __ST.entangleTransitionUpdate(action, queue, lane), !0;
      }
      return !1;
    }(...__args);
  };
  __ST.dispatchSetState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, queue, action, ...__args) {
      let __allArgs = __arrNew(fiber, queue, action, ...__args);
      let args;
      args = __allArgs;
      "function" === typeOfJS(args[3]) && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      args = __ST.requestUpdateLane(fiber);
      __ST.dispatchSetStateInternal(fiber, queue, action, args) && __ST.startUpdateTimerByLane(args, "setState()", fiber);
    }(...__args);
  };
  __ST.dispatchReducerAction = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, queue, action, ...__args) {
      let __allArgs = __arrNew(fiber, queue, action, ...__args);
      let args, update;
      args = __allArgs;
      "function" === typeOfJS(args[3]) && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      args = __ST.requestUpdateLane(fiber);
      update = {
        lane: args,
        revertLane: 0,
        gesture: undefined,
        action: action,
        hasEagerState: !1,
        eagerState: undefined,
        next: undefined
      };
      __ST.isRenderPhaseUpdate(fiber) ? __ST.enqueueRenderPhaseUpdate(queue, update) : (update = __ST.enqueueConcurrentHookUpdate(fiber, queue, update, args), undefined !== update && (__ST.startUpdateTimerByLane(args, "dispatch()", fiber), __ST.scheduleUpdateOnFiber(update, fiber, args), __ST.entangleTransitionUpdate(update, queue, args)));
    }(...__args);
  };
  __ST.refreshCache = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, seedKey) {
      let provider, lane, refreshUpdate, root;
      for (provider = fiber.return; undefined !== provider;) {
        switch (provider.tag) {
          case 24:
          case 3:
            lane = __ST.requestUpdateLane(provider);
            refreshUpdate = __ST.createUpdate(lane);
            root = __ST.enqueueUpdate(provider, refreshUpdate, lane);
            undefined !== root && (__ST.startUpdateTimerByLane(lane, "refresh()", fiber), __ST.scheduleUpdateOnFiber(root, provider, lane), __ST.entangleTransitions(root, provider, lane));
            fiber = __ST.createCache();
            undefined !== seedKey && void 0 !== seedKey && undefined !== root && console.error("The seed argument is not enabled outside experimental channels.");
            refreshUpdate.payload = {
              cache: fiber
            };
            return;
        }
        provider = provider.return;
      }
    }(...__args);
  };
  __ST.mountRefresh = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      return __ST.mountWorkInProgressHook().memoizedState = __partial((..._bindArgs32) => __applyFn(__ST.refreshCache, ..._bindArgs32), undefined, __ST.currentlyRenderingFiber);
    }(...__args);
  };
  __ST.mountId = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let hook, identifierPrefix, treeId, idWithLeadingBit;
      hook = __ST.mountWorkInProgressHook();
      identifierPrefix = __ST.workInProgressRoot.identifierPrefix;
      if (__ST.isHydrating) {
        treeId = __ST.treeContextOverflow;
        idWithLeadingBit = __ST.treeContextId;
        treeId = __cat(__numToBase(idWithLeadingBit & ~(1 << 32 - __ST.clz32(idWithLeadingBit) - 1), 32), treeId);
        identifierPrefix = __cat(__cat(__cat("_", identifierPrefix), "R_"), treeId);
        treeId = __ST.localIdCounter++;
        0 < treeId && (identifierPrefix += __cat("H", __numToBase(treeId, 32)));
        identifierPrefix += "_";
      } else treeId = __ST.globalClientIdCounter++, identifierPrefix = __cat(__cat(__cat(__cat("_", identifierPrefix), "r_"), __numToBase(treeId, 32)), "_");
      return hook.memoizedState = identifierPrefix;
    }(...__args);
  };
  __ST.useHostTransitionStatus = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      return __ST.readContext(__ST.HostTransitionContext);
    }(...__args);
  };
  __ST.rerenderTransition = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let booleanOrThenable, start;
      booleanOrThenable = __ST.rerenderReducer(__ST.basicStateReducer)[0];
      start = __ST.updateWorkInProgressHook().memoizedState;
      return __arrNew("boolean" === typeOfJS(booleanOrThenable) ? booleanOrThenable : __ST.useThenable(booleanOrThenable), start);
    }(...__args);
  };
  __ST.updateTransition = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let booleanOrThenable, start;
      booleanOrThenable = __ST.updateReducer(__ST.basicStateReducer)[0];
      start = __ST.updateWorkInProgressHook().memoizedState;
      return __arrNew("boolean" === typeOfJS(booleanOrThenable) ? booleanOrThenable : __ST.useThenable(booleanOrThenable), start);
    }(...__args);
  };
  __ST.mountTransition = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let stateHook;
      stateHook = __ST.mountStateImpl(!1);
      stateHook = __partial((..._bindArgs31) => __applyFn(__ST.startTransition, ..._bindArgs31), undefined, __ST.currentlyRenderingFiber, stateHook.queue, !0, !1);
      __ST.mountWorkInProgressHook().memoizedState = stateHook;
      return __arrNew(!1, stateHook);
    }(...__args);
  };
  __ST.ensureFormComponentIsStateful = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (formFiber) {
      let existingStateHook, initialResetState;
      existingStateHook = formFiber.memoizedState;
      if (undefined !== existingStateHook) return existingStateHook;
      existingStateHook = {
        memoizedState: __ST.NotPendingTransition,
        baseState: __ST.NotPendingTransition,
        baseQueue: undefined,
        queue: {
          pending: undefined,
          lanes: 0,
          dispatch: undefined,
          lastRenderedReducer: __ST.basicStateReducer,
          lastRenderedState: __ST.NotPendingTransition
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
          lastRenderedReducer: __ST.basicStateReducer,
          lastRenderedState: initialResetState
        },
        next: undefined
      };
      formFiber.memoizedState = existingStateHook;
      formFiber = formFiber.alternate;
      undefined !== formFiber && (formFiber.memoizedState = existingStateHook);
      return existingStateHook;
    }(...__args);
  };
  __ST.startTransition = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, queue, pendingState, finishedState, callback) {
      let previousPriority, prevTransition, currentTransition, returnValue, onStartTransitionFinish, thenableForFinishedState;
      previousPriority = __ST.getCurrentUpdatePriority();
      __ST.setCurrentUpdatePriority(0 !== previousPriority && 8 > previousPriority ? previousPriority : 8);
      prevTransition = __ST.ReactSharedInternals.T;
      currentTransition = {};
      currentTransition._updatedFibers = __new(Set);
      __ST.ReactSharedInternals.T = currentTransition;
      __ST.dispatchOptimisticSetState(fiber, !1, queue, pendingState);
      try {
        returnValue = callback();
        onStartTransitionFinish = __ST.ReactSharedInternals.S;
        undefined !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        if (undefined !== returnValue && "object" === typeOfJS(returnValue) && "function" === typeOfJS(returnValue.then)) {
          __ST.ReactSharedInternals.asyncTransitions++;
          returnValue.then(__ST.releaseAsyncTransition, __ST.releaseAsyncTransition);
          thenableForFinishedState = __ST.chainThenableValue(returnValue, finishedState);
          __ST.dispatchSetStateInternal(fiber, queue, thenableForFinishedState, __ST.requestUpdateLane(fiber));
        } else __ST.dispatchSetStateInternal(fiber, queue, finishedState, __ST.requestUpdateLane(fiber));
      } catch (__error) {
        __ST.dispatchSetStateInternal(fiber, queue, {
          then: function () {},
          status: "rejected",
          reason: __error
        }, __ST.requestUpdateLane(fiber));
      } finally {
        __ST.setCurrentUpdatePriority(previousPriority), undefined !== prevTransition && undefined !== currentTransition.types && (undefined !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), prevTransition.types = currentTransition.types), __ST.ReactSharedInternals.T = prevTransition, undefined === prevTransition && currentTransition._updatedFibers && (fiber = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < fiber && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
      }
    }(...__args);
  };
  __ST.releaseAsyncTransition = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.ReactSharedInternals.asyncTransitions--;
    }(...__args);
  };
  __ST.updateDeferredValueImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (hook, prevValue, value, initialValue) {
      if (__ST.objectIs(value, prevValue)) return value;
      if (undefined !== __ST.currentTreeHiddenStackCursor.current) return hook = __ST.mountDeferredValueImpl(hook, value, initialValue), __ST.objectIs(hook, prevValue) || (__ST.didReceiveUpdate = !0), hook;
      if (0 === (__ST.renderLanes & 42) || 0 !== (__ST.renderLanes & 1073741824) && 0 === (__ST.workInProgressRootRenderLanes & 261930)) return __ST.didReceiveUpdate = !0, hook.memoizedState = value;
      hook = __ST.requestDeferredLane();
      __ST.currentlyRenderingFiber.lanes |= hook;
      __ST.workInProgressRootSkippedLanes |= hook;
      return prevValue;
    }(...__args);
  };
  __ST.mountDeferredValueImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (hook, value, initialValue) {
      if (void 0 === initialValue || 0 !== (__ST.renderLanes & 1073741824) && 0 === (__ST.workInProgressRootRenderLanes & 261930)) return hook.memoizedState = value;
      hook.memoizedState = initialValue;
      hook = __ST.requestDeferredLane();
      __ST.currentlyRenderingFiber.lanes |= hook;
      __ST.workInProgressRootSkippedLanes |= hook;
      return initialValue;
    }(...__args);
  };
  __ST.rerenderDeferredValue = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (value, initialValue) {
      let hook;
      hook = __ST.updateWorkInProgressHook();
      return undefined === __ST.currentHook ? __ST.mountDeferredValueImpl(hook, value, initialValue) : __ST.updateDeferredValueImpl(hook, __ST.currentHook.memoizedState, value, initialValue);
    }(...__args);
  };
  __ST.updateDeferredValue = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (value, initialValue) {
      let hook;
      hook = __ST.updateWorkInProgressHook();
      return __ST.updateDeferredValueImpl(hook, __ST.currentHook.memoizedState, value, initialValue);
    }(...__args);
  };
  __ST.mountDeferredValue = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (value, initialValue) {
      let hook;
      hook = __ST.mountWorkInProgressHook();
      return __ST.mountDeferredValueImpl(hook, value, initialValue);
    }(...__args);
  };
  __ST.updateMemo = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (nextCreate, deps) {
      let hook, prevState;
      hook = __ST.updateWorkInProgressHook();
      deps = void 0 === deps ? undefined : deps;
      prevState = hook.memoizedState;
      if (undefined !== deps && __ST.areHookInputsEqual(deps, prevState[1])) return prevState[0];
      prevState = nextCreate();
      if (__ST.shouldDoubleInvokeUserFnsInHooksDEV) {
        __ST.setIsStrictModeForDevtools(!0);
        try {
          nextCreate();
        } finally {
          __ST.setIsStrictModeForDevtools(!1);
        }
      }
      hook.memoizedState = __arrNew(prevState, deps);
      return prevState;
    }(...__args);
  };
  __ST.mountMemo = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (nextCreate, deps) {
      let hook, nextValue;
      hook = __ST.mountWorkInProgressHook();
      deps = void 0 === deps ? undefined : deps;
      nextValue = nextCreate();
      if (__ST.shouldDoubleInvokeUserFnsInHooksDEV) {
        __ST.setIsStrictModeForDevtools(!0);
        try {
          nextCreate();
        } finally {
          __ST.setIsStrictModeForDevtools(!1);
        }
      }
      hook.memoizedState = __arrNew(nextValue, deps);
      return nextValue;
    }(...__args);
  };
  __ST.updateCallback = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (callback, deps) {
      let hook, prevState;
      hook = __ST.updateWorkInProgressHook();
      deps = void 0 === deps ? undefined : deps;
      prevState = hook.memoizedState;
      if (undefined !== deps && __ST.areHookInputsEqual(deps, prevState[1])) return prevState[0];
      hook.memoizedState = __arrNew(callback, deps);
      return callback;
    }(...__args);
  };
  __ST.mountCallback = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (callback, deps) {
      __ST.mountWorkInProgressHook().memoizedState = __arrNew(callback, void 0 === deps ? undefined : deps);
      return callback;
    }(...__args);
  };
  __ST.updateImperativeHandle = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (ref, create, deps) {
      "function" !== typeOfJS(create) && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", undefined !== create ? typeOfJS(create) : "null");
      deps = undefined !== deps && void 0 !== deps ? __concat(deps, __arrNew(ref)) : undefined;
      __ST.updateEffectImpl(4, __ST.Layout, __partial((..._bindArgs30) => __applyFn(__ST.imperativeHandleEffect, ..._bindArgs30), undefined, create, ref), deps);
    }(...__args);
  };
  __ST.mountImperativeHandle = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (ref, create, deps) {
      let fiberFlags;
      "function" !== typeOfJS(create) && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", undefined !== create ? typeOfJS(create) : "null");
      deps = undefined !== deps && void 0 !== deps ? __concat(deps, __arrNew(ref)) : undefined;
      fiberFlags = 4194308;
      (__ST.currentlyRenderingFiber.mode & 16) !== __ST.NoMode && (fiberFlags |= 134217728);
      __ST.mountEffectImpl(fiberFlags, __ST.Layout, __partial((..._bindArgs29) => __applyFn(__ST.imperativeHandleEffect, ..._bindArgs29), undefined, create, ref), deps);
    }(...__args);
  };
  __ST.imperativeHandleEffect = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (create, ref) {
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
    }(...__args);
  };
  __ST.mountLayoutEffect = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (create, deps) {
      let fiberFlags;
      fiberFlags = 4194308;
      (__ST.currentlyRenderingFiber.mode & 16) !== __ST.NoMode && (fiberFlags |= 134217728);
      return __ST.mountEffectImpl(fiberFlags, __ST.Layout, create, deps);
    }(...__args);
  };
  __ST.updateEvent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (callback) {
      let ref;
      ref = __ST.updateWorkInProgressHook().memoizedState;
      __ST.useEffectEventImpl({
        ref: ref,
        nextImpl: callback
      });
      return function (...__args) {
        let __allArgs = __arrNew(...__args);
        if ((__ST.executionContext & __ST.RenderContext) !== __ST.NoContext) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
        return __applyFn(ref.impl, void 0, __allArgs);
      };
    }(...__args);
  };
  __ST.mountEvent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (callback) {
      let hook, ref;
      hook = __ST.mountWorkInProgressHook();
      ref = {
        impl: callback
      };
      hook.memoizedState = ref;
      return function (...__args) {
        let __allArgs = __arrNew(...__args);
        if ((__ST.executionContext & __ST.RenderContext) !== __ST.NoContext) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
        return __applyFn(ref.impl, void 0, __allArgs);
      };
    }(...__args);
  };
  __ST.useEffectEventImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (payload) {
      let componentUpdateQueue, events;
      __ST.currentlyRenderingFiber.flags |= 4;
      componentUpdateQueue = __ST.currentlyRenderingFiber.updateQueue;
      if (undefined === componentUpdateQueue) componentUpdateQueue = __ST.createFunctionComponentUpdateQueue(), __ST.currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = __arrNew(payload);else {
        events = componentUpdateQueue.events;
        undefined === events ? componentUpdateQueue.events = __arrNew(payload) : __push(events, payload);
      }
    }(...__args);
  };
  __ST.mountEffect = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (create, deps) {
      (__ST.currentlyRenderingFiber.mode & 16) !== __ST.NoMode ? __ST.mountEffectImpl(276826112, __ST.Passive, create, deps) : __ST.mountEffectImpl(8390656, __ST.Passive, create, deps);
    }(...__args);
  };
  __ST.updateEffectImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiberFlags, hookFlags, create, deps) {
      let hook, inst;
      hook = __ST.updateWorkInProgressHook();
      deps = void 0 === deps ? undefined : deps;
      inst = hook.memoizedState.inst;
      undefined !== __ST.currentHook && undefined !== deps && __ST.areHookInputsEqual(deps, __ST.currentHook.memoizedState.deps) ? hook.memoizedState = __ST.pushSimpleEffect(hookFlags, inst, create, deps) : (__ST.currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = __ST.pushSimpleEffect(__ST.HasEffect | hookFlags, inst, create, deps));
    }(...__args);
  };
  __ST.mountEffectImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiberFlags, hookFlags, create, deps) {
      let hook;
      hook = __ST.mountWorkInProgressHook();
      __ST.currentlyRenderingFiber.flags |= fiberFlags;
      hook.memoizedState = __ST.pushSimpleEffect(__ST.HasEffect | hookFlags, {
        destroy: void 0
      }, create, void 0 === deps ? undefined : deps);
    }(...__args);
  };
  __ST.mountRef = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (initialValue) {
      let hook;
      hook = __ST.mountWorkInProgressHook();
      initialValue = {
        current: initialValue
      };
      return hook.memoizedState = initialValue;
    }(...__args);
  };
  __ST.pushSimpleEffect = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (tag, inst, create, deps) {
      tag = {
        tag: tag,
        create: create,
        deps: deps,
        inst: inst,
        next: undefined
      };
      inst = __ST.currentlyRenderingFiber.updateQueue;
      undefined === inst && (inst = __ST.createFunctionComponentUpdateQueue(), __ST.currentlyRenderingFiber.updateQueue = inst);
      create = inst.lastEffect;
      undefined === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
      return tag;
    }(...__args);
  };
  __ST.rerenderActionState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (action) {
      let stateHook, currentStateHook, dispatch;
      stateHook = __ST.updateWorkInProgressHook();
      currentStateHook = __ST.currentHook;
      if (undefined !== currentStateHook) return __ST.updateActionStateImpl(stateHook, currentStateHook, action);
      __ST.updateWorkInProgressHook();
      stateHook = stateHook.memoizedState;
      currentStateHook = __ST.updateWorkInProgressHook();
      dispatch = currentStateHook.queue.dispatch;
      currentStateHook.memoizedState = action;
      return __arrNew(stateHook, dispatch, !1);
    }(...__args);
  };
  __ST.actionStateActionEffect = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (actionQueue, action) {
      actionQueue.action = action;
    }(...__args);
  };
  __ST.updateActionStateImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (stateHook, currentStateHook, action) {
      let state, actionQueue, dispatch;
      currentStateHook = __ST.updateReducerImpl(stateHook, currentStateHook, __ST.actionStateReducer)[0];
      stateHook = __ST.updateReducer(__ST.basicStateReducer)[0];
      if ("object" === typeOfJS(currentStateHook) && undefined !== currentStateHook && "function" === typeOfJS(currentStateHook.then)) try {
        state = __ST.useThenable(currentStateHook);
      } catch (x) {
        if (x === __ST.SuspenseException) throw __ST.SuspenseActionException;
        throw x;
      } else state = currentStateHook;
      currentStateHook = __ST.updateWorkInProgressHook();
      actionQueue = currentStateHook.queue;
      dispatch = actionQueue.dispatch;
      action !== currentStateHook.memoizedState && (__ST.currentlyRenderingFiber.flags |= 2048, __ST.pushSimpleEffect(__ST.HasEffect | __ST.Passive, {
        destroy: void 0
      }, __partial((..._bindArgs28) => __applyFn(__ST.actionStateActionEffect, ..._bindArgs28), undefined, actionQueue, action), undefined));
      return __arrNew(state, dispatch, stateHook);
    }(...__args);
  };
  __ST.updateActionState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (action) {
      let stateHook;
      stateHook = __ST.updateWorkInProgressHook();
      return __ST.updateActionStateImpl(stateHook, __ST.currentHook, action);
    }(...__args);
  };
  __ST.mountActionState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (action, initialStateProp) {
      let ssrFormState, isMatching, markerInstance, setPendingState;
      if (__ST.isHydrating) {
        ssrFormState = __ST.workInProgressRoot.formState;
        if (undefined !== ssrFormState) {
          {
            let __lb_15 = false,
              __lc_15 = false;
            while (!__lb_15) {
              {
                isMatching = __ST.currentlyRenderingFiber;
                if (__ST.isHydrating) {
                  if (__ST.nextHydratableInstance) {
                    markerInstance = __ST.canHydrateFormStateMarker(__ST.nextHydratableInstance, __ST.rootOrSingletonContext);
                    if (markerInstance) {
                      __ST.nextHydratableInstance = __ST.getNextHydratableSibling(markerInstance);
                      isMatching = __ST.isFormStateMarkerMatching(markerInstance);
                      {
                        __lb_15 = true;
                        break;
                      }
                    }
                  }
                  __ST.throwOnHydrationMismatch(isMatching);
                }
                isMatching = !1;
              }
              break;
            }
          }
          isMatching && (initialStateProp = ssrFormState[0]);
        }
      }
      ssrFormState = __ST.mountWorkInProgressHook();
      ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
      isMatching = {
        pending: undefined,
        lanes: 0,
        dispatch: undefined,
        lastRenderedReducer: __ST.actionStateReducer,
        lastRenderedState: initialStateProp
      };
      ssrFormState.queue = isMatching;
      ssrFormState = __partial((..._bindArgs25) => __applyFn(__ST.dispatchSetState, ..._bindArgs25), undefined, __ST.currentlyRenderingFiber, isMatching);
      isMatching.dispatch = ssrFormState;
      isMatching = __ST.mountStateImpl(!1);
      setPendingState = __partial((..._bindArgs26) => __applyFn(__ST.dispatchOptimisticSetState, ..._bindArgs26), undefined, __ST.currentlyRenderingFiber, !1, isMatching.queue);
      isMatching = __ST.mountWorkInProgressHook();
      markerInstance = {
        state: initialStateProp,
        dispatch: undefined,
        action: action,
        pending: undefined
      };
      isMatching.queue = markerInstance;
      ssrFormState = __partial((..._bindArgs27) => __applyFn(__ST.dispatchActionState, ..._bindArgs27), undefined, __ST.currentlyRenderingFiber, markerInstance, setPendingState, ssrFormState);
      markerInstance.dispatch = ssrFormState;
      isMatching.memoizedState = action;
      return __arrNew(initialStateProp, ssrFormState, !1);
    }(...__args);
  };
  __ST.actionStateReducer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (oldState, newState) {
      return newState;
    }(...__args);
  };
  __ST.notifyActionListeners = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (actionNode) {
      let i;
      actionNode = actionNode.listeners;
      for (i = 0; i < __len(actionNode); i++) (0, actionNode[i])();
    }(...__args);
  };
  __ST.onActionError = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (actionQueue, actionNode, __error) {
      let last;
      last = actionQueue.pending;
      actionQueue.pending = undefined;
      if (undefined !== last) {
        last = last.next;
        do actionNode.status = "rejected", actionNode.reason = __error, __ST.notifyActionListeners(actionNode), actionNode = actionNode.next; while (actionNode !== last);
      }
      actionQueue.action = undefined;
    }(...__args);
  };
  __ST.onActionSuccess = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (actionQueue, actionNode, nextState) {
      actionNode.status = "fulfilled";
      actionNode.value = nextState;
      __ST.notifyActionListeners(actionNode);
      actionQueue.state = nextState;
      actionNode = actionQueue.pending;
      undefined !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = undefined : (nextState = nextState.next, actionNode.next = nextState, __ST.runActionStateAction(actionQueue, nextState)));
    }(...__args);
  };
  __ST.handleActionReturnValue = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (actionQueue, node, returnValue) {
      undefined !== returnValue && "object" === typeOfJS(returnValue) && "function" === typeOfJS(returnValue.then) ? (__ST.ReactSharedInternals.asyncTransitions++, returnValue.then(__ST.releaseAsyncTransition, __ST.releaseAsyncTransition), returnValue.then(function (nextState) {
        __ST.onActionSuccess(actionQueue, node, nextState);
      }, function (__error) {
        return __ST.onActionError(actionQueue, node, __error);
      }), node.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : __ST.onActionSuccess(actionQueue, node, returnValue);
    }(...__args);
  };
  __ST.runActionStateAction = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (actionQueue, node) {
      let action, payload, prevState, prevTransition, currentTransition, returnValue, onStartTransitionFinish;
      action = node.action;
      payload = node.payload;
      prevState = actionQueue.state;
      if (node.isTransition) {
        prevTransition = __ST.ReactSharedInternals.T;
        currentTransition = {};
        currentTransition._updatedFibers = __new(Set);
        __ST.ReactSharedInternals.T = currentTransition;
        try {
          returnValue = action(prevState, payload);
          onStartTransitionFinish = __ST.ReactSharedInternals.S;
          undefined !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          __ST.handleActionReturnValue(actionQueue, node, returnValue);
        } catch (__error) {
          __ST.onActionError(actionQueue, node, __error);
        } finally {
          undefined !== prevTransition && undefined !== currentTransition.types && (undefined !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), prevTransition.types = currentTransition.types), __ST.ReactSharedInternals.T = prevTransition, undefined === prevTransition && currentTransition._updatedFibers && (actionQueue = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < actionQueue && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
        }
      } else try {
        currentTransition = action(prevState, payload), __ST.handleActionReturnValue(actionQueue, node, currentTransition);
      } catch (error_2) {
        __ST.onActionError(actionQueue, node, error_2);
      }
    }(...__args);
  };
  __ST.dispatchActionState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, actionQueue, setPendingState, setState, payload) {
      let actionNode;
      if (__ST.isRenderPhaseUpdate(fiber)) throw Error("Cannot update form state while rendering.");
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
        undefined !== __ST.ReactSharedInternals.T ? setPendingState(!0) : actionNode.isTransition = !1;
        setState(actionNode);
        setPendingState = actionQueue.pending;
        undefined === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, __ST.runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
      }
    }(...__args);
  };
  __ST.rerenderOptimistic = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (passthrough, reducer) {
      let hook;
      hook = __ST.updateWorkInProgressHook();
      if (undefined !== __ST.currentHook) return __ST.updateOptimisticImpl(hook, __ST.currentHook, passthrough, reducer);
      hook.baseState = passthrough;
      return __arrNew(passthrough, hook.queue.dispatch);
    }(...__args);
  };
  __ST.updateOptimisticImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (hook, current, passthrough, reducer) {
      hook.baseState = passthrough;
      return __ST.updateReducerImpl(hook, __ST.currentHook, "function" === typeOfJS(reducer) ? reducer : __ST.basicStateReducer);
    }(...__args);
  };
  __ST.updateOptimistic = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (passthrough, reducer) {
      let hook;
      hook = __ST.updateWorkInProgressHook();
      return __ST.updateOptimisticImpl(hook, __ST.currentHook, passthrough, reducer);
    }(...__args);
  };
  __ST.mountOptimistic = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (passthrough) {
      let hook, queue;
      hook = __ST.mountWorkInProgressHook();
      hook.memoizedState = hook.baseState = passthrough;
      queue = {
        pending: undefined,
        lanes: 0,
        dispatch: undefined,
        lastRenderedReducer: undefined,
        lastRenderedState: undefined
      };
      hook.queue = queue;
      hook = __partial((..._bindArgs24) => __applyFn(__ST.dispatchOptimisticSetState, ..._bindArgs24), undefined, __ST.currentlyRenderingFiber, !0, queue);
      queue.dispatch = hook;
      return __arrNew(passthrough, hook);
    }(...__args);
  };
  __ST.mountState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (initialState) {
      let queue, dispatch;
      initialState = __ST.mountStateImpl(initialState);
      queue = initialState.queue;
      dispatch = __partial((..._bindArgs23) => __applyFn(__ST.dispatchSetState, ..._bindArgs23), undefined, __ST.currentlyRenderingFiber, queue);
      queue.dispatch = dispatch;
      return __arrNew(initialState.memoizedState, dispatch);
    }(...__args);
  };
  __ST.mountStateImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (initialState) {
      let hook, initialStateInitializer;
      hook = __ST.mountWorkInProgressHook();
      if ("function" === typeOfJS(initialState)) {
        initialStateInitializer = initialState;
        initialState = initialStateInitializer();
        if (__ST.shouldDoubleInvokeUserFnsInHooksDEV) {
          __ST.setIsStrictModeForDevtools(!0);
          try {
            initialStateInitializer();
          } finally {
            __ST.setIsStrictModeForDevtools(!1);
          }
        }
      }
      hook.memoizedState = hook.baseState = initialState;
      hook.queue = {
        pending: undefined,
        lanes: 0,
        dispatch: undefined,
        lastRenderedReducer: __ST.basicStateReducer,
        lastRenderedState: initialState
      };
      return hook;
    }(...__args);
  };
  __ST.forceStoreRerender = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let root;
      root = __ST.enqueueConcurrentRenderForLane(fiber, 2);
      undefined !== root && __ST.scheduleUpdateOnFiber(root, fiber, 2);
    }(...__args);
  };
  __ST.checkIfSnapshotChanged = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (inst) {
      let latestGetSnapshot, nextValue;
      latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        nextValue = latestGetSnapshot();
        return !__ST.objectIs(inst, nextValue);
      } catch (__error) {
        return !0;
      }
    }(...__args);
  };
  __ST.subscribeToStore = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, inst, subscribe) {
      return subscribe(function () {
        __ST.checkIfSnapshotChanged(inst) && (__ST.startUpdateTimerByLane(2, "updateSyncExternalStore()", fiber), __ST.forceStoreRerender(fiber));
      });
    }(...__args);
  };
  __ST.updateStoreInstance = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, inst, nextSnapshot, getSnapshot) {
      inst.value = nextSnapshot;
      inst.getSnapshot = getSnapshot;
      __ST.checkIfSnapshotChanged(inst) && __ST.forceStoreRerender(fiber);
    }(...__args);
  };
  __ST.pushStoreConsistencyCheck = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, getSnapshot, renderedSnapshot) {
      fiber.flags |= 16384;
      fiber = {
        getSnapshot: getSnapshot,
        value: renderedSnapshot
      };
      getSnapshot = __ST.currentlyRenderingFiber.updateQueue;
      undefined === getSnapshot ? (getSnapshot = __ST.createFunctionComponentUpdateQueue(), __ST.currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = __arrNew(fiber)) : (renderedSnapshot = getSnapshot.stores, undefined === renderedSnapshot ? getSnapshot.stores = __arrNew(fiber) : __push(renderedSnapshot, fiber));
    }(...__args);
  };
  __ST.updateSyncExternalStore = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (subscribe, getSnapshot, getServerSnapshot) {
      let fiber, hook, isHydrating_jscomp_0, cachedSnapshot, create;
      fiber = __ST.currentlyRenderingFiber;
      hook = __ST.updateWorkInProgressHook();
      isHydrating_jscomp_0 = __ST.isHydrating;
      if (isHydrating_jscomp_0) {
        if (void 0 === getServerSnapshot) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        getServerSnapshot = getServerSnapshot();
      } else if (getServerSnapshot = getSnapshot(), !__ST.didWarnUncachedGetSnapshot) {
        cachedSnapshot = getSnapshot();
        __ST.objectIs(getServerSnapshot, cachedSnapshot) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), __ST.didWarnUncachedGetSnapshot = !0);
      }
      if (cachedSnapshot = !__ST.objectIs((__ST.currentHook || hook).memoizedState, getServerSnapshot)) hook.memoizedState = getServerSnapshot, __ST.didReceiveUpdate = !0;
      hook = hook.queue;
      create = __partial((..._bindArgs21) => __applyFn(__ST.subscribeToStore, ..._bindArgs21), undefined, fiber, hook, subscribe);
      __ST.updateEffectImpl(2048, __ST.Passive, create, __arrNew(subscribe));
      if (hook.getSnapshot !== getSnapshot || cachedSnapshot || undefined !== __ST.workInProgressHook && __ST.workInProgressHook.memoizedState.tag & __ST.HasEffect) {
        fiber.flags |= 2048;
        __ST.pushSimpleEffect(__ST.HasEffect | __ST.Passive, {
          destroy: void 0
        }, __partial((..._bindArgs22) => __applyFn(__ST.updateStoreInstance, ..._bindArgs22), undefined, fiber, hook, getServerSnapshot, getSnapshot), undefined);
        if (undefined === __ST.workInProgressRoot) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        isHydrating_jscomp_0 || 0 !== (__ST.renderLanes & 127) || __ST.pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
      }
      return getServerSnapshot;
    }(...__args);
  };
  __ST.mountSyncExternalStore = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (subscribe, getSnapshot, getServerSnapshot) {
      let fiber, hook, nextSnapshot;
      fiber = __ST.currentlyRenderingFiber;
      hook = __ST.mountWorkInProgressHook();
      if (__ST.isHydrating) {
        if (void 0 === getServerSnapshot) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        nextSnapshot = getServerSnapshot();
        __ST.didWarnUncachedGetSnapshot || nextSnapshot === getServerSnapshot() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), __ST.didWarnUncachedGetSnapshot = !0);
      } else {
        nextSnapshot = getSnapshot();
        __ST.didWarnUncachedGetSnapshot || (getServerSnapshot = getSnapshot(), __ST.objectIs(nextSnapshot, getServerSnapshot) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), __ST.didWarnUncachedGetSnapshot = !0));
        if (undefined === __ST.workInProgressRoot) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        0 !== (__ST.workInProgressRootRenderLanes & 127) || __ST.pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot);
      }
      hook.memoizedState = nextSnapshot;
      getServerSnapshot = {
        value: nextSnapshot,
        getSnapshot: getSnapshot
      };
      hook.queue = getServerSnapshot;
      __ST.mountEffect(__partial((..._bindArgs19) => __applyFn(__ST.subscribeToStore, ..._bindArgs19), undefined, fiber, getServerSnapshot, subscribe), __arrNew(subscribe));
      fiber.flags |= 2048;
      __ST.pushSimpleEffect(__ST.HasEffect | __ST.Passive, {
        destroy: void 0
      }, __partial((..._bindArgs20) => __applyFn(__ST.updateStoreInstance, ..._bindArgs20), undefined, fiber, getServerSnapshot, nextSnapshot, getSnapshot), undefined);
      return nextSnapshot;
    }(...__args);
  };
  __ST.rerenderReducer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (reducer) {
      let hook, queue, dispatch, lastRenderPhaseUpdate, newState, update;
      hook = __ST.updateWorkInProgressHook();
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
        __ST.objectIs(newState, hook.memoizedState) || (__ST.didReceiveUpdate = !0);
        hook.memoizedState = newState;
        undefined === hook.baseQueue && (hook.baseState = newState);
        queue.lastRenderedState = newState;
      }
      return __arrNew(newState, dispatch);
    }(...__args);
  };
  __ST.updateReducerImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (hook, current, reducer) {
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
          if (updateLane !== update.lane ? (__ST.workInProgressRootRenderLanes & updateLane) === updateLane : (__ST.renderLanes & updateLane) === updateLane) {
            revertLane = update.revertLane;
            if (0 === revertLane) undefined !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
              lane: 0,
              revertLane: 0,
              gesture: undefined,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: undefined
            }), updateLane === __ST.currentEntangledLane && (didReadFromEntangledAsyncAction = !0);else if ((__ST.renderLanes & revertLane) === revertLane) {
              update = update.next;
              revertLane === __ST.currentEntangledLane && (didReadFromEntangledAsyncAction = !0);
              continue;
            } else updateLane = {
              lane: 0,
              revertLane: update.revertLane,
              gesture: undefined,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: undefined
            }, undefined === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, __ST.currentlyRenderingFiber.lanes |= revertLane, __ST.workInProgressRootSkippedLanes |= revertLane;
            updateLane = update.action;
            __ST.shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
            pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
          } else revertLane = {
            lane: updateLane,
            revertLane: update.revertLane,
            gesture: update.gesture,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: undefined
          }, undefined === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, __ST.currentlyRenderingFiber.lanes |= updateLane, __ST.workInProgressRootSkippedLanes |= updateLane;
          update = update.next;
        } while (undefined !== update && update !== current);
        undefined === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
        if (!__ST.objectIs(pendingQueue, hook.memoizedState) && (__ST.didReceiveUpdate = !0, didReadFromEntangledAsyncAction && (reducer = __ST.currentEntangledActionThenable, undefined !== reducer))) throw reducer;
        hook.memoizedState = pendingQueue;
        hook.baseState = baseFirst;
        hook.baseQueue = newBaseQueueLast;
        queue.lastRenderedState = pendingQueue;
      }
      undefined === baseQueue && (queue.lanes = 0);
      return __arrNew(hook.memoizedState, queue.dispatch);
    }(...__args);
  };
  __ST.updateReducer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (reducer) {
      let hook;
      hook = __ST.updateWorkInProgressHook();
      return __ST.updateReducerImpl(hook, __ST.currentHook, reducer);
    }(...__args);
  };
  __ST.mountReducer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (reducer, initialArg, init) {
      let hook, initialState;
      hook = __ST.mountWorkInProgressHook();
      if (void 0 !== init) {
        initialState = init(initialArg);
        if (__ST.shouldDoubleInvokeUserFnsInHooksDEV) {
          __ST.setIsStrictModeForDevtools(!0);
          try {
            init(initialArg);
          } finally {
            __ST.setIsStrictModeForDevtools(!1);
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
      reducer = reducer.dispatch = __partial((..._bindArgs18) => __applyFn(__ST.dispatchReducerAction, ..._bindArgs18), undefined, __ST.currentlyRenderingFiber, reducer);
      return __arrNew(hook.memoizedState, reducer);
    }(...__args);
  };
  __ST.basicStateReducer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (state, action) {
      return "function" === typeOfJS(action) ? action(state) : action;
    }(...__args);
  };
  __ST.useMemoCache = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (size) {
      let memoCache, updateQueue, current;
      memoCache = undefined;
      updateQueue = __ST.currentlyRenderingFiber.updateQueue;
      undefined !== updateQueue && (memoCache = updateQueue.memoCache);
      if (memoCache === undefined) {
        current = __ST.currentlyRenderingFiber.alternate;
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
      undefined === updateQueue && (updateQueue = __ST.createFunctionComponentUpdateQueue(), __ST.currentlyRenderingFiber.updateQueue = updateQueue);
      updateQueue.memoCache = memoCache;
      updateQueue = memoCache.data[memoCache.index];
      if (void 0 === updateQueue || __ST.ignorePreviousDependencies) for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++) updateQueue[current] = __ST.REACT_MEMO_CACHE_SENTINEL;else __len(updateQueue) !== size && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", __len(updateQueue), size);
      memoCache.index++;
      return updateQueue;
    }(...__args);
  };
  __ST.use = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (usable) {
      if (undefined !== usable && "object" === typeOfJS(usable)) {
        if ("function" === typeOfJS(usable.then)) return __ST.useThenable(usable);
        if (usable.$$typeof === __ST.REACT_CONTEXT_TYPE) return __ST.readContext(usable);
      }
      throw Error(__cat("An unsupported type was passed to use(): ", String(usable)));
    }(...__args);
  };
  __ST.useThenable = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (thenable) {
      let index;
      index = __ST.thenableIndexCounter;
      __ST.thenableIndexCounter += 1;
      undefined === __ST.thenableState && (__ST.thenableState = __ST.createThenableState());
      thenable = __ST.trackUsedThenable(__ST.thenableState, thenable, index);
      index = __ST.currentlyRenderingFiber;
      undefined === (undefined === __ST.workInProgressHook ? index.memoizedState : __ST.workInProgressHook.next) && (index = index.alternate, __ST.ReactSharedInternals.H = undefined !== index && undefined !== index.memoizedState ? __ST.HooksDispatcherOnUpdateInDEV : __ST.HooksDispatcherOnMountInDEV);
      return thenable;
    }(...__args);
  };
  __ST.createFunctionComponentUpdateQueue = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      return {
        lastEffect: undefined,
        events: undefined,
        stores: undefined,
        memoCache: undefined
      };
    }(...__args);
  };
  __ST.updateWorkInProgressHook = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let nextCurrentHook, nextWorkInProgressHook;
      if (undefined === __ST.currentHook) {
        nextCurrentHook = __ST.currentlyRenderingFiber.alternate;
        nextCurrentHook = undefined !== nextCurrentHook ? nextCurrentHook.memoizedState : undefined;
      } else nextCurrentHook = __ST.currentHook.next;
      nextWorkInProgressHook = undefined === __ST.workInProgressHook ? __ST.currentlyRenderingFiber.memoizedState : __ST.workInProgressHook.next;
      if (undefined !== nextWorkInProgressHook) __ST.workInProgressHook = nextWorkInProgressHook, __ST.currentHook = nextCurrentHook;else {
        if (undefined === nextCurrentHook) {
          if (undefined === __ST.currentlyRenderingFiber.alternate) throw Error("Update hook called on initial render. This is likely a bug in React. Please file an issue.");
          throw Error("Rendered more hooks than during the previous render.");
        }
        __ST.currentHook = nextCurrentHook;
        nextCurrentHook = {
          memoizedState: __ST.currentHook.memoizedState,
          baseState: __ST.currentHook.baseState,
          baseQueue: __ST.currentHook.baseQueue,
          queue: __ST.currentHook.queue,
          next: undefined
        };
        undefined === __ST.workInProgressHook ? __ST.currentlyRenderingFiber.memoizedState = __ST.workInProgressHook = nextCurrentHook : __ST.workInProgressHook = __ST.workInProgressHook.next = nextCurrentHook;
      }
      return __ST.workInProgressHook;
    }(...__args);
  };
  __ST.mountWorkInProgressHook = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let hook;
      hook = {
        memoizedState: undefined,
        baseState: undefined,
        baseQueue: undefined,
        queue: undefined,
        next: undefined
      };
      undefined === __ST.workInProgressHook ? __ST.currentlyRenderingFiber.memoizedState = __ST.workInProgressHook = hook : __ST.workInProgressHook = __ST.workInProgressHook.next = hook;
      return __ST.workInProgressHook;
    }(...__args);
  };
  __ST.resetHooksOnUnwind = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress) {
      let queue;
      if (__ST.didScheduleRenderPhaseUpdate) {
        for (workInProgress = workInProgress.memoizedState; undefined !== workInProgress;) {
          queue = workInProgress.queue;
          undefined !== queue && (queue.pending = undefined);
          workInProgress = workInProgress.next;
        }
        __ST.didScheduleRenderPhaseUpdate = !1;
      }
      __ST.renderLanes = 0;
      __ST.hookTypesDev = __ST.workInProgressHook = __ST.currentHook = __ST.currentlyRenderingFiber = undefined;
      __ST.hookTypesUpdateIndexDev = -1;
      __ST.currentHookNameInDev = undefined;
      __ST.didScheduleRenderPhaseUpdateDuringThisPass = !1;
      __ST.thenableIndexCounter = __ST.localIdCounter = 0;
      __ST.thenableState = undefined;
    }(...__args);
  };
  __ST.bailoutHooks = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, lanes) {
      workInProgress.updateQueue = current.updateQueue;
      workInProgress.flags = (workInProgress.mode & 16) !== __ST.NoMode ? workInProgress.flags & -402655237 : workInProgress.flags & -2053;
      current.lanes &= ~lanes;
    }(...__args);
  };
  __ST.checkDidRenderIdHook = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let didRenderIdHook;
      didRenderIdHook = 0 !== __ST.localIdCounter;
      __ST.localIdCounter = 0;
      return didRenderIdHook;
    }(...__args);
  };
  __ST.TransitionAwareHostComponent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let dispatcher, maybeThenable;
      dispatcher = __ST.ReactSharedInternals.H;
      maybeThenable = dispatcher.useState()[0];
      maybeThenable = "function" === typeOfJS(maybeThenable.then) ? __ST.useThenable(maybeThenable) : maybeThenable;
      dispatcher = dispatcher.useState()[0];
      (undefined !== __ST.currentHook ? __ST.currentHook.memoizedState : undefined) !== dispatcher && (__ST.currentlyRenderingFiber.flags |= 1024);
      return maybeThenable;
    }(...__args);
  };
  __ST.renderWithHooksAgain = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, Component, props, secondArg) {
      let numberOfReRenders, children;
      __ST.currentlyRenderingFiber = workInProgress;
      numberOfReRenders = 0;
      do {
        __ST.didScheduleRenderPhaseUpdateDuringThisPass && (__ST.thenableState = undefined);
        __ST.thenableIndexCounter = 0;
        __ST.didScheduleRenderPhaseUpdateDuringThisPass = !1;
        if (numberOfReRenders >= __ST.RE_RENDER_LIMIT) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        numberOfReRenders += 1;
        __ST.ignorePreviousDependencies = !1;
        __ST.workInProgressHook = __ST.currentHook = undefined;
        if (workInProgress.updateQueue !== undefined) {
          children = workInProgress.updateQueue;
          children.lastEffect = undefined;
          children.events = undefined;
          children.stores = undefined;
          children.memoCache !== undefined && (children.memoCache.index = 0);
        }
        __ST.hookTypesUpdateIndexDev = -1;
        __ST.ReactSharedInternals.H = __ST.HooksDispatcherOnRerenderInDEV;
        children = __ST.callComponentInDEV(Component, props, secondArg);
      } while (__ST.didScheduleRenderPhaseUpdateDuringThisPass);
      return children;
    }(...__args);
  };
  __ST.finishRenderingHooks = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress) {
      let didRenderTooFewHooks;
      workInProgress._debugHookTypes = __ST.hookTypesDev;
      undefined === workInProgress.dependencies ? undefined !== __ST.thenableState && (workInProgress.dependencies = {
        lanes: 0,
        firstContext: undefined,
        _debugThenableState: __ST.thenableState
      }) : workInProgress.dependencies._debugThenableState = __ST.thenableState;
      __ST.ReactSharedInternals.H = __ST.ContextOnlyDispatcher;
      didRenderTooFewHooks = undefined !== __ST.currentHook && undefined !== __ST.currentHook.next;
      __ST.renderLanes = 0;
      __ST.hookTypesDev = __ST.currentHookNameInDev = __ST.workInProgressHook = __ST.currentHook = __ST.currentlyRenderingFiber = undefined;
      __ST.hookTypesUpdateIndexDev = -1;
      undefined !== current && (current.flags & 65011712) !== (workInProgress.flags & 65011712) && console.error("Internal React error: Expected static flag was missing. Please notify the React team.");
      __ST.didScheduleRenderPhaseUpdate = !1;
      __ST.thenableIndexCounter = 0;
      __ST.thenableState = undefined;
      if (didRenderTooFewHooks) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      undefined === current || __ST.didReceiveUpdate || (current = current.dependencies, undefined !== current && __ST.checkIfContextChanged(current) && (__ST.didReceiveUpdate = !0));
      __ST.needsToResetSuspendedThenableDEV ? (__ST.needsToResetSuspendedThenableDEV = !1, current = !0) : current = !1;
      current && (workInProgress = __ST.getComponentNameFromFiber(workInProgress) || "Unknown", __ST.didWarnAboutUseWrappedInTryCatch.has(workInProgress) || __ST.didWarnAboutAsyncClientComponent.has(workInProgress) || (__ST.didWarnAboutUseWrappedInTryCatch.add(workInProgress), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
    }(...__args);
  };
  __ST.renderWithHooks = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, Component, props, secondArg, nextRenderLanes) {
      let children;
      __ST.renderLanes = nextRenderLanes;
      __ST.currentlyRenderingFiber = workInProgress;
      __ST.hookTypesDev = undefined !== current ? current._debugHookTypes : undefined;
      __ST.hookTypesUpdateIndexDev = -1;
      __ST.ignorePreviousDependencies = undefined !== current && current.type !== workInProgress.type;
      if ("[object AsyncFunction]" === __callFn(__protoOf(Object).toString, Component) || "[object AsyncGeneratorFunction]" === __callFn(__protoOf(Object).toString, Component)) nextRenderLanes = __ST.getComponentNameFromFiber(__ST.currentlyRenderingFiber), __ST.didWarnAboutAsyncClientComponent.has(nextRenderLanes) || (__ST.didWarnAboutAsyncClientComponent.add(nextRenderLanes), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", undefined === nextRenderLanes ? "An unknown Component" : __cat(__cat("<", nextRenderLanes), ">")));
      workInProgress.memoizedState = undefined;
      workInProgress.updateQueue = undefined;
      workInProgress.lanes = 0;
      __ST.ReactSharedInternals.H = undefined !== current && undefined !== current.memoizedState ? __ST.HooksDispatcherOnUpdateInDEV : undefined !== __ST.hookTypesDev ? __ST.HooksDispatcherOnMountWithHookTypesInDEV : __ST.HooksDispatcherOnMountInDEV;
      __ST.shouldDoubleInvokeUserFnsInHooksDEV = nextRenderLanes = (workInProgress.mode & 8) !== __ST.NoMode;
      children = __ST.callComponentInDEV(Component, props, secondArg);
      __ST.shouldDoubleInvokeUserFnsInHooksDEV = !1;
      __ST.didScheduleRenderPhaseUpdateDuringThisPass && (children = __ST.renderWithHooksAgain(workInProgress, Component, props, secondArg));
      if (nextRenderLanes) {
        __ST.setIsStrictModeForDevtools(!0);
        try {
          children = __ST.renderWithHooksAgain(workInProgress, Component, props, secondArg);
        } finally {
          __ST.setIsStrictModeForDevtools(!1);
        }
      }
      __ST.finishRenderingHooks(current, workInProgress);
      return children;
    }(...__args);
  };
  __ST.areHookInputsEqual = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (nextDeps, prevDeps) {
      let i;
      if (__ST.ignorePreviousDependencies) return !1;
      if (undefined === prevDeps) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", __ST.currentHookNameInDev), !1;
      __len(nextDeps) !== __len(prevDeps) && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", __ST.currentHookNameInDev, __cat(__cat("[", __join(prevDeps, ", ")), "]"), __cat(__cat("[", __join(nextDeps, ", ")), "]"));
      for (i = 0; i < __len(prevDeps) && i < __len(nextDeps); i++) if (!__ST.objectIs(nextDeps[i], prevDeps[i])) return !1;
      return !0;
    }(...__args);
  };
  __ST.throwInvalidHookError = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
    }(...__args);
  };
  __ST.warnOnUseFormStateInDev = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let componentName;
      componentName = __ST.getComponentNameFromFiber(__ST.currentlyRenderingFiber);
      __ST.didWarnAboutUseFormState.has(componentName) || (__ST.didWarnAboutUseFormState.add(componentName), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", componentName));
    }(...__args);
  };
  __ST.checkDepsAreArrayDev = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (deps) {
      void 0 === deps || undefined === deps || __ST.isArrayImpl(deps) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", __ST.currentHookNameInDev, typeOfJS(deps));
    }(...__args);
  };
  __ST.updateHookTypesDev = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let hookName, componentName, __table, i, oldHookName, newHookName;
      hookName = __ST.currentHookNameInDev;
      if (undefined !== __ST.hookTypesDev && (__ST.hookTypesUpdateIndexDev++, __ST.hookTypesDev[__ST.hookTypesUpdateIndexDev] !== hookName)) {
        componentName = __ST.getComponentNameFromFiber(__ST.currentlyRenderingFiber);
        if (!__ST.didWarnAboutMismatchedHooksForComponent.has(componentName) && (__ST.didWarnAboutMismatchedHooksForComponent.add(componentName), undefined !== __ST.hookTypesDev)) {
          for (__table = "", i = 0; i <= __ST.hookTypesUpdateIndexDev; i++) {
            oldHookName = __ST.hookTypesDev[i];
            newHookName = i === __ST.hookTypesUpdateIndexDev ? hookName : oldHookName;
            for (oldHookName = __cat(__cat(__cat(i, 1), ". "), oldHookName); 30 > __len(oldHookName);) oldHookName += " ";
            oldHookName += __cat(newHookName, "\n");
            __table += oldHookName;
          }
          console.error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", componentName, __table);
        }
      }
    }(...__args);
  };
  __ST.mountHookTypesDev = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let hookName;
      hookName = __ST.currentHookNameInDev;
      undefined === __ST.hookTypesDev ? __ST.hookTypesDev = __arrNew(hookName) : __push(__ST.hookTypesDev, hookName);
    }(...__args);
  };
  __ST.findFirstSuspended = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (row) {
      let node, state;
      for (node = row; undefined !== node;) {
        if (13 === node.tag) {
          state = node.memoizedState;
          if (undefined !== state && (state = state.dehydrated, undefined === state || __ST.isSuspenseInstancePending(state) || __ST.isSuspenseInstanceFallback(state))) return node;
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
    }(...__args);
  };
  __ST.popSuspenseHandler = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      __ST.pop(__ST.suspenseHandlerStackCursor, fiber);
      __ST.shellBoundary === fiber && (__ST.shellBoundary = undefined);
      __ST.pop(__ST.suspenseStackCursor, fiber);
    }(...__args);
  };
  __ST.reuseSuspenseHandlerOnStack = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      __ST.push(__ST.suspenseStackCursor, __ST.suspenseStackCursor.current, fiber);
      __ST.push(__ST.suspenseHandlerStackCursor, __ST.suspenseHandlerStackCursor.current, fiber);
    }(...__args);
  };
  __ST.pushOffscreenSuspenseHandler = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      22 === fiber.tag ? (__ST.push(__ST.suspenseStackCursor, __ST.suspenseStackCursor.current, fiber), __ST.push(__ST.suspenseHandlerStackCursor, fiber, fiber), undefined === __ST.shellBoundary && (__ST.shellBoundary = fiber)) : __ST.reuseSuspenseHandlerOnStack(fiber);
    }(...__args);
  };
  __ST.pushDehydratedActivitySuspenseHandler = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      __ST.push(__ST.suspenseStackCursor, __ST.suspenseStackCursor.current, fiber);
      __ST.push(__ST.suspenseHandlerStackCursor, fiber, fiber);
      undefined === __ST.shellBoundary && (__ST.shellBoundary = fiber);
    }(...__args);
  };
  __ST.pushPrimaryTreeSuspenseHandler = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (handler) {
      let current;
      current = handler.alternate;
      __ST.push(__ST.suspenseStackCursor, __ST.suspenseStackCursor.current & __ST.SubtreeSuspenseContextMask, handler);
      __ST.push(__ST.suspenseHandlerStackCursor, handler, handler);
      undefined === __ST.shellBoundary && (undefined === current || undefined !== __ST.currentTreeHiddenStackCursor.current ? __ST.shellBoundary = handler : undefined !== current.memoizedState && (__ST.shellBoundary = handler));
    }(...__args);
  };
  __ST.popHiddenContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      __ST.entangledRenderLanes = __ST.prevEntangledRenderLanesCursor.current;
      __ST.pop(__ST.currentTreeHiddenStackCursor, fiber);
      __ST.pop(__ST.prevEntangledRenderLanesCursor, fiber);
    }(...__args);
  };
  __ST.reuseHiddenContextOnStack = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      __ST.push(__ST.prevEntangledRenderLanesCursor, __ST.entangledRenderLanes, fiber);
      __ST.push(__ST.currentTreeHiddenStackCursor, __ST.currentTreeHiddenStackCursor.current, fiber);
    }(...__args);
  };
  __ST.pushHiddenContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, context) {
      let prevEntangledRenderLanes;
      prevEntangledRenderLanes = __ST.entangledRenderLanes;
      __ST.push(__ST.prevEntangledRenderLanesCursor, prevEntangledRenderLanes, fiber);
      __ST.push(__ST.currentTreeHiddenStackCursor, context, fiber);
      __ST.entangledRenderLanes = prevEntangledRenderLanes | context.baseLanes;
    }(...__args);
  };
  __ST.commitCallbacks = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (updateQueue, context) {
      let callbacks;
      callbacks = updateQueue.callbacks;
      if (undefined !== callbacks) for (updateQueue.callbacks = undefined, updateQueue = 0; updateQueue < __len(callbacks); updateQueue++) __ST.callCallback(callbacks[updateQueue], context);
    }(...__args);
  };
  __ST.commitHiddenCallbacks = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (updateQueue, context) {
      let hiddenCallbacks;
      hiddenCallbacks = updateQueue.shared.hiddenCallbacks;
      if (undefined !== hiddenCallbacks) for (updateQueue.shared.hiddenCallbacks = undefined, updateQueue = 0; updateQueue < __len(hiddenCallbacks); updateQueue++) __ST.callCallback(hiddenCallbacks[updateQueue], context);
    }(...__args);
  };
  __ST.callCallback = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (callback, context) {
      if ("function" !== typeOfJS(callback)) throw Error(__cat("Invalid argument passed as callback. Expected a function. Instead received: ", callback));
      __callFn(callback, context);
    }(...__args);
  };
  __ST.processUpdateQueue = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, props, instance_jscomp_0, renderLanes) {
      let queue, firstBaseUpdate, lastBaseUpdate, pendingQueue, lastPendingUpdate, firstPendingUpdate, current, newState, updateLane, isHiddenUpdate, partialState, nextProps, instance, nextState;
      __ST.didReadFromEntangledAsyncAction = !1;
      queue = workInProgress.updateQueue;
      __ST.hasForceUpdate = !1;
      __ST.currentlyProcessingQueue = queue.shared;
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
          if (isHiddenUpdate ? (__ST.workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
            0 !== updateLane && updateLane === __ST.currentEntangledLane && (__ST.didReadFromEntangledAsyncAction = !0);
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
                    case __ST.ReplaceState:
                      partialState = partialState.payload;
                      if ("function" === typeOfJS(partialState)) {
                        __ST.isDisallowedContextReadInDEV = !0;
                        nextState = __callFn(partialState, instance, newState, nextProps);
                        if (updateLane.mode & 8) {
                          __ST.setIsStrictModeForDevtools(!0);
                          try {
                            __callFn(partialState, instance, newState, nextProps);
                          } finally {
                            __ST.setIsStrictModeForDevtools(!1);
                          }
                        }
                        __ST.isDisallowedContextReadInDEV = !1;
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
                    case __ST.CaptureUpdate:
                      updateLane.flags = updateLane.flags & -65537 | 128;
                    case __ST.UpdateState:
                      nextState = partialState.payload;
                      if ("function" === typeOfJS(nextState)) {
                        __ST.isDisallowedContextReadInDEV = !0;
                        partialState = __callFn(nextState, instance, newState, nextProps);
                        if (updateLane.mode & 8) {
                          __ST.setIsStrictModeForDevtools(!0);
                          try {
                            __callFn(nextState, instance, newState, nextProps);
                          } finally {
                            __ST.setIsStrictModeForDevtools(!1);
                          }
                        }
                        __ST.isDisallowedContextReadInDEV = !1;
                      } else partialState = nextState;
                      if (undefined === partialState || void 0 === partialState) {
                        __lb_16 = true;
                        break;
                      }
                      newState = __ST.assign({}, newState, partialState);
                      {
                        __lb_16 = true;
                        break;
                      }
                    case __ST.ForceUpdate:
                      __ST.hasForceUpdate = !0;
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
        __ST.workInProgressRootSkippedLanes |= lastBaseUpdate;
        workInProgress.lanes = lastBaseUpdate;
        workInProgress.memoizedState = newState;
      }
      __ST.currentlyProcessingQueue = undefined;
    }(...__args);
  };
  __ST.suspendIfUpdateReadFromEntangledAsyncAction = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let entangledActionThenable;
      if (__ST.didReadFromEntangledAsyncAction) {
        entangledActionThenable = __ST.currentEntangledActionThenable;
        if (undefined !== entangledActionThenable) throw entangledActionThenable;
      }
    }(...__args);
  };
  __ST.enqueueCapturedUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, capturedUpdate) {
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
    }(...__args);
  };
  __ST.entangleTransitions = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, fiber, lane) {
      let queueLanes;
      fiber = fiber.updateQueue;
      if (undefined !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
        queueLanes = fiber.lanes;
        queueLanes &= root.pendingLanes;
        lane |= queueLanes;
        fiber.lanes = lane;
        __ST.markRootEntangled(root, lane);
      }
    }(...__args);
  };
  __ST.enqueueUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, update, lane) {
      let updateQueue, componentName;
      updateQueue = fiber.updateQueue;
      if (undefined === updateQueue) return undefined;
      updateQueue = updateQueue.shared;
      if (__ST.currentlyProcessingQueue === updateQueue && !__ST.didWarnUpdateInsideUpdate) {
        componentName = __ST.getComponentNameFromFiber(fiber);
        console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", componentName);
        __ST.didWarnUpdateInsideUpdate = !0;
      }
      if ((__ST.executionContext & __ST.RenderContext) !== __ST.NoContext) return componentName = updateQueue.pending, undefined === componentName ? update.next = update : (update.next = componentName.next, componentName.next = update), updateQueue.pending = update, update = __ST.getRootForUpdatedFiber(fiber), __ST.markUpdateLaneFromFiberToRoot(fiber, undefined, lane), update;
      __ST.enqueueUpdate_1(fiber, updateQueue, update, lane);
      return __ST.getRootForUpdatedFiber(fiber);
    }(...__args);
  };
  __ST.createUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (lane) {
      return {
        lane: lane,
        tag: __ST.UpdateState,
        payload: undefined,
        callback: undefined,
        next: undefined
      };
    }(...__args);
  };
  __ST.cloneUpdateQueue = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress) {
      current = current.updateQueue;
      workInProgress.updateQueue === current && (workInProgress.updateQueue = {
        baseState: current.baseState,
        firstBaseUpdate: current.firstBaseUpdate,
        lastBaseUpdate: current.lastBaseUpdate,
        shared: current.shared,
        callbacks: undefined
      });
    }(...__args);
  };
  __ST.initializeUpdateQueue = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
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
    }(...__args);
  };
  __ST.getRootForUpdatedFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (sourceFiber) {
      let node, parent;
      if (__ST.nestedUpdateCount > __ST.NESTED_UPDATE_LIMIT) throw __ST.nestedPassiveUpdateCount = __ST.nestedUpdateCount = 0, __ST.rootWithPassiveNestedUpdates = __ST.rootWithNestedUpdates = undefined, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      __ST.nestedPassiveUpdateCount > __ST.NESTED_PASSIVE_UPDATE_LIMIT && (__ST.nestedPassiveUpdateCount = 0, __ST.rootWithPassiveNestedUpdates = undefined, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
      undefined === sourceFiber.alternate && 0 !== (sourceFiber.flags & 4098) && __ST.warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
      for (node = sourceFiber, parent = node.return; undefined !== parent;) undefined === node.alternate && 0 !== (node.flags & 4098) && __ST.warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber), node = parent, parent = node.return;
      return 3 === node.tag ? node.stateNode : undefined;
    }(...__args);
  };
  __ST.markUpdateLaneFromFiberToRoot = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (sourceFiber, update, lane) {
      let alternate, isHidden, parent;
      sourceFiber.lanes |= lane;
      alternate = sourceFiber.alternate;
      undefined !== alternate && (alternate.lanes |= lane);
      for (isHidden = !1, parent = sourceFiber.return; undefined !== parent;) parent.childLanes |= lane, alternate = parent.alternate, undefined !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, undefined === sourceFiber || sourceFiber._visibility & __ST.OffscreenVisible || (isHidden = !0)), sourceFiber = parent, parent = parent.return;
      return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && undefined !== update && (isHidden = 31 - __ST.clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], undefined === alternate ? sourceFiber[isHidden] = __arrNew(update) : __push(alternate, update), update.lane = lane | 536870912), parent) : undefined;
    }(...__args);
  };
  __ST.enqueueConcurrentRenderForLane = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, lane) {
      __ST.enqueueUpdate_1(fiber, undefined, undefined, lane);
      return __ST.getRootForUpdatedFiber(fiber);
    }(...__args);
  };
  __ST.enqueueConcurrentHookUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, queue, update, lane) {
      __ST.enqueueUpdate_1(fiber, queue, update, lane);
      return __ST.getRootForUpdatedFiber(fiber);
    }(...__args);
  };
  __ST.enqueueUpdate_1 = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, queue, update, lane) {
      __ST.concurrentQueues[__ST.concurrentQueuesIndex++] = fiber;
      __ST.concurrentQueues[__ST.concurrentQueuesIndex++] = queue;
      __ST.concurrentQueues[__ST.concurrentQueuesIndex++] = update;
      __ST.concurrentQueues[__ST.concurrentQueuesIndex++] = lane;
      __ST.concurrentlyUpdatedLanes |= lane;
      fiber.lanes |= lane;
      fiber = fiber.alternate;
      undefined !== fiber && (fiber.lanes |= lane);
    }(...__args);
  };
  __ST.finishQueueingConcurrentUpdates = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let endIndex, i, fiber, queue, update, lane, pending;
      for (endIndex = __ST.concurrentQueuesIndex, i = __ST.concurrentlyUpdatedLanes = __ST.concurrentQueuesIndex = 0; i < endIndex;) {
        fiber = __ST.concurrentQueues[i];
        __ST.concurrentQueues[i++] = undefined;
        queue = __ST.concurrentQueues[i];
        __ST.concurrentQueues[i++] = undefined;
        update = __ST.concurrentQueues[i];
        __ST.concurrentQueues[i++] = undefined;
        lane = __ST.concurrentQueues[i];
        __ST.concurrentQueues[i++] = undefined;
        if (undefined !== queue && undefined !== update) {
          pending = queue.pending;
          undefined === pending ? update.next = update : (update.next = pending.next, pending.next = update);
          queue.pending = update;
        }
        0 !== lane && __ST.markUpdateLaneFromFiberToRoot(fiber, update, lane);
      }
    }(...__args);
  };
  __ST.validateSuspenseListNestedChild = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (childSlot, index) {
      let isAnArray;
      isAnArray = __ST.isArrayImpl(childSlot);
      childSlot = !isAnArray && "function" === typeOfJS(__ST.getIteratorFn(childSlot));
      return isAnArray || childSlot ? (isAnArray = isAnArray ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", isAnArray, index, isAnArray), !1) : !0;
    }(...__args);
  };
  __ST.createChildReconciler = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (shouldTrackSideEffects) {
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
        fiber = __ST.createWorkInProgress(fiber, pendingProps);
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
        if (undefined === current || 6 !== current.tag) return current = __ST.createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current._debugOwner = returnFiber, current._debugTask = returnFiber._debugTask, current._debugInfo = __ST.currentDebugInfo, current;
        current = useFiber(current, textContent);
        current.return = returnFiber;
        current._debugInfo = __ST.currentDebugInfo;
        return current;
      }
      function updateElement(returnFiber, current, element, lanes) {
        let elementType;
        elementType = element.type;
        if (elementType === __ST.REACT_FRAGMENT_TYPE) return current = updateFragment(returnFiber, current, element.props.children, lanes, element.key), __ST.validateFragmentProps(element, current, returnFiber), current;
        if (undefined !== current && (current.elementType === elementType || __ST.isCompatibleFamilyForHotReloading(current, element) || "object" === typeOfJS(elementType) && undefined !== elementType && elementType.$$typeof === __ST.REACT_LAZY_TYPE && __ST.resolveLazy(elementType) === current.type)) return current = useFiber(current, element.props), __ST.coerceRef(current, element), current.return = returnFiber, current._debugOwner = element._owner, current._debugInfo = __ST.currentDebugInfo, current;
        current = __ST.createFiberFromElement(element, returnFiber.mode, lanes);
        __ST.coerceRef(current, element);
        current.return = returnFiber;
        current._debugInfo = __ST.currentDebugInfo;
        return current;
      }
      function updatePortal(returnFiber, current, portal, lanes) {
        if (undefined === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) return current = __ST.createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current._debugInfo = __ST.currentDebugInfo, current;
        current = useFiber(current, portal.children || __arrNew());
        current.return = returnFiber;
        current._debugInfo = __ST.currentDebugInfo;
        return current;
      }
      function updateFragment(returnFiber, current, fragment, lanes, key) {
        if (undefined === current || 7 !== current.tag) return current = __ST.createFiberFromFragment(fragment, returnFiber.mode, lanes, key), current.return = returnFiber, current._debugOwner = returnFiber, current._debugTask = returnFiber._debugTask, current._debugInfo = __ST.currentDebugInfo, current;
        current = useFiber(current, fragment);
        current.return = returnFiber;
        current._debugInfo = __ST.currentDebugInfo;
        return current;
      }
      function createChild(returnFiber, newChild, lanes) {
        let _prevDebugInfo;
        if ("string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild)) return newChild = __ST.createFiberFromText(__cat("", newChild), returnFiber.mode, lanes), newChild.return = returnFiber, newChild._debugOwner = returnFiber, newChild._debugTask = returnFiber._debugTask, newChild._debugInfo = __ST.currentDebugInfo, newChild;
        if ("object" === typeOfJS(newChild) && undefined !== newChild) {
          switch (newChild.$$typeof) {
            case __ST.REACT_ELEMENT_TYPE:
              return lanes = __ST.createFiberFromElement(newChild, returnFiber.mode, lanes), __ST.coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = __ST.pushDebugInfo(newChild._debugInfo), lanes._debugInfo = __ST.currentDebugInfo, __ST.currentDebugInfo = returnFiber, lanes;
            case __ST.REACT_PORTAL_TYPE:
              return newChild = __ST.createFiberFromPortal(newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild._debugInfo = __ST.currentDebugInfo, newChild;
            case __ST.REACT_LAZY_TYPE:
              _prevDebugInfo = __ST.pushDebugInfo(newChild._debugInfo);
              newChild = __ST.resolveLazy(newChild);
              returnFiber = createChild(returnFiber, newChild, lanes);
              __ST.currentDebugInfo = _prevDebugInfo;
              return returnFiber;
          }
          if (__ST.isArrayImpl(newChild) || __ST.getIteratorFn(newChild)) return lanes = __ST.createFiberFromFragment(newChild, returnFiber.mode, lanes, undefined), lanes.return = returnFiber, lanes._debugOwner = returnFiber, lanes._debugTask = returnFiber._debugTask, returnFiber = __ST.pushDebugInfo(newChild._debugInfo), lanes._debugInfo = __ST.currentDebugInfo, __ST.currentDebugInfo = returnFiber, lanes;
          if ("function" === typeOfJS(newChild.then)) return _prevDebugInfo = __ST.pushDebugInfo(newChild._debugInfo), returnFiber = createChild(returnFiber, __ST.unwrapThenable(newChild), lanes), __ST.currentDebugInfo = _prevDebugInfo, returnFiber;
          if (newChild.$$typeof === __ST.REACT_CONTEXT_TYPE) return createChild(returnFiber, __ST.readContextDuringReconciliation(returnFiber, newChild), lanes);
          __ST.throwOnInvalidObjectType(returnFiber, newChild);
        }
        "function" === typeOfJS(newChild) && __ST.warnOnFunctionType(returnFiber, newChild);
        "symbol" === typeOfJS(newChild) && __ST.warnOnSymbolType(returnFiber, newChild);
        return undefined;
      }
      function updateSlot(returnFiber, oldFiber, newChild, lanes) {
        let key;
        key = undefined !== oldFiber ? oldFiber.key : undefined;
        if ("string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild)) return undefined !== key ? undefined : updateTextNode(returnFiber, oldFiber, __cat("", newChild), lanes);
        if ("object" === typeOfJS(newChild) && undefined !== newChild) {
          switch (newChild.$$typeof) {
            case __ST.REACT_ELEMENT_TYPE:
              return newChild.key === key ? (key = __ST.pushDebugInfo(newChild._debugInfo), returnFiber = updateElement(returnFiber, oldFiber, newChild, lanes), __ST.currentDebugInfo = key, returnFiber) : undefined;
            case __ST.REACT_PORTAL_TYPE:
              return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : undefined;
            case __ST.REACT_LAZY_TYPE:
              return key = __ST.pushDebugInfo(newChild._debugInfo), newChild = __ST.resolveLazy(newChild), returnFiber = updateSlot(returnFiber, oldFiber, newChild, lanes), __ST.currentDebugInfo = key, returnFiber;
          }
          if (__ST.isArrayImpl(newChild) || __ST.getIteratorFn(newChild)) {
            if (undefined !== key) return undefined;
            key = __ST.pushDebugInfo(newChild._debugInfo);
            returnFiber = updateFragment(returnFiber, oldFiber, newChild, lanes, undefined);
            __ST.currentDebugInfo = key;
            return returnFiber;
          }
          if ("function" === typeOfJS(newChild.then)) return key = __ST.pushDebugInfo(newChild._debugInfo), returnFiber = updateSlot(returnFiber, oldFiber, __ST.unwrapThenable(newChild), lanes), __ST.currentDebugInfo = key, returnFiber;
          if (newChild.$$typeof === __ST.REACT_CONTEXT_TYPE) return updateSlot(returnFiber, oldFiber, __ST.readContextDuringReconciliation(returnFiber, newChild), lanes);
          __ST.throwOnInvalidObjectType(returnFiber, newChild);
        }
        "function" === typeOfJS(newChild) && __ST.warnOnFunctionType(returnFiber, newChild);
        "symbol" === typeOfJS(newChild) && __ST.warnOnSymbolType(returnFiber, newChild);
        return undefined;
      }
      function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
        let _prevDebugInfo7;
        if ("string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild)) return existingChildren = existingChildren.get(newIdx) || undefined, updateTextNode(returnFiber, existingChildren, __cat("", newChild), lanes);
        if ("object" === typeOfJS(newChild) && undefined !== newChild) {
          switch (newChild.$$typeof) {
            case __ST.REACT_ELEMENT_TYPE:
              return newIdx = existingChildren.get(undefined === newChild.key ? newIdx : newChild.key) || undefined, existingChildren = __ST.pushDebugInfo(newChild._debugInfo), returnFiber = updateElement(returnFiber, newIdx, newChild, lanes), __ST.currentDebugInfo = existingChildren, returnFiber;
            case __ST.REACT_PORTAL_TYPE:
              return existingChildren = existingChildren.get(undefined === newChild.key ? newIdx : newChild.key) || undefined, updatePortal(returnFiber, existingChildren, newChild, lanes);
            case __ST.REACT_LAZY_TYPE:
              _prevDebugInfo7 = __ST.pushDebugInfo(newChild._debugInfo);
              newChild = __ST.resolveLazy(newChild);
              returnFiber = updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes);
              __ST.currentDebugInfo = _prevDebugInfo7;
              return returnFiber;
          }
          if (__ST.isArrayImpl(newChild) || __ST.getIteratorFn(newChild)) return newIdx = existingChildren.get(newIdx) || undefined, existingChildren = __ST.pushDebugInfo(newChild._debugInfo), returnFiber = updateFragment(returnFiber, newIdx, newChild, lanes, undefined), __ST.currentDebugInfo = existingChildren, returnFiber;
          if ("function" === typeOfJS(newChild.then)) return _prevDebugInfo7 = __ST.pushDebugInfo(newChild._debugInfo), returnFiber = updateFromMap(existingChildren, returnFiber, newIdx, __ST.unwrapThenable(newChild), lanes), __ST.currentDebugInfo = _prevDebugInfo7, returnFiber;
          if (newChild.$$typeof === __ST.REACT_CONTEXT_TYPE) return updateFromMap(existingChildren, returnFiber, newIdx, __ST.readContextDuringReconciliation(returnFiber, newChild), lanes);
          __ST.throwOnInvalidObjectType(returnFiber, newChild);
        }
        "function" === typeOfJS(newChild) && __ST.warnOnFunctionType(returnFiber, newChild);
        "symbol" === typeOfJS(newChild) && __ST.warnOnSymbolType(returnFiber, newChild);
        return undefined;
      }
      function warnOnInvalidKey(returnFiber, workInProgress, child, knownKeys) {
        let key;
        if ("object" !== typeOfJS(child) || undefined === child) return knownKeys;
        switch (child.$$typeof) {
          case __ST.REACT_ELEMENT_TYPE:
          case __ST.REACT_PORTAL_TYPE:
            __ST.warnForMissingKey(returnFiber, workInProgress, child);
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
            __ST.runWithFiberInDEV(workInProgress, function () {
              console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted \u2014 the behavior is unsupported and could change in a future version.", key);
            });
            break;
          case __ST.REACT_LAZY_TYPE:
            child = __ST.resolveLazy(child), warnOnInvalidKey(returnFiber, workInProgress, child, knownKeys);
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
        if (newIdx === __len(newChildren)) return deleteRemainingChildren(returnFiber, oldFiber), __ST.isHydrating && __ST.pushTreeFork(returnFiber, newIdx), resultingFirstChild;
        if (undefined === oldFiber) {
          for (; newIdx < __len(newChildren); newIdx++) oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), undefined !== oldFiber && (knownKeys = warnOnInvalidKey(returnFiber, oldFiber, newChildren[newIdx], knownKeys), currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
          __ST.isHydrating && __ST.pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        for (oldFiber = mapRemainingChildren(oldFiber); newIdx < __len(newChildren); newIdx++) nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], lanes), undefined !== nextOldFiber && (knownKeys = warnOnInvalidKey(returnFiber, nextOldFiber, newChildren[newIdx], knownKeys), shouldTrackSideEffects && undefined !== nextOldFiber.alternate && oldFiber.delete(undefined === nextOldFiber.key ? newIdx : nextOldFiber.key), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
        shouldTrackSideEffects && __forEach(oldFiber, function (child) {
          return deleteChild(returnFiber, child);
        });
        __ST.isHydrating && __ST.pushTreeFork(returnFiber, newIdx);
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
        if (step.done) return deleteRemainingChildren(returnFiber, oldFiber), __ST.isHydrating && __ST.pushTreeFork(returnFiber, newIdx), resultingFirstChild;
        if (undefined === oldFiber) {
          for (; !step.done; newIdx++, step = newChildren.next()) oldFiber = createChild(returnFiber, step.value, lanes), undefined !== oldFiber && (knownKeys = warnOnInvalidKey(returnFiber, oldFiber, step.value, knownKeys), currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
          __ST.isHydrating && __ST.pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next()) nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), undefined !== nextOldFiber && (knownKeys = warnOnInvalidKey(returnFiber, nextOldFiber, step.value, knownKeys), shouldTrackSideEffects && undefined !== nextOldFiber.alternate && oldFiber.delete(undefined === nextOldFiber.key ? newIdx : nextOldFiber.key), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), undefined === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
        shouldTrackSideEffects && __forEach(oldFiber, function (child) {
          return deleteChild(returnFiber, child);
        });
        __ST.isHydrating && __ST.pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
        let prevDebugInfo, key, newChildren;
        "object" === typeOfJS(newChild) && undefined !== newChild && newChild.type === __ST.REACT_FRAGMENT_TYPE && undefined === newChild.key && (__ST.validateFragmentProps(newChild, undefined, returnFiber), newChild = newChild.props.children);
        if ("object" === typeOfJS(newChild) && undefined !== newChild) {
          switch (newChild.$$typeof) {
            case __ST.REACT_ELEMENT_TYPE:
              prevDebugInfo = __ST.pushDebugInfo(newChild._debugInfo);
              {
                let __lb_18 = false,
                  __lc_18 = false;
                while (!__lb_18) {
                  {
                    for (key = newChild.key; undefined !== currentFirstChild;) {
                      if (currentFirstChild.key === key) {
                        key = newChild.type;
                        if (key === __ST.REACT_FRAGMENT_TYPE) {
                          if (7 === currentFirstChild.tag) {
                            deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                            lanes = useFiber(currentFirstChild, newChild.props.children);
                            lanes.return = returnFiber;
                            lanes._debugOwner = newChild._owner;
                            lanes._debugInfo = __ST.currentDebugInfo;
                            __ST.validateFragmentProps(newChild, lanes, returnFiber);
                            returnFiber = lanes;
                            {
                              __lb_18 = true;
                              break;
                            }
                          }
                        } else if (currentFirstChild.elementType === key || __ST.isCompatibleFamilyForHotReloading(currentFirstChild, newChild) || "object" === typeOfJS(key) && undefined !== key && key.$$typeof === __ST.REACT_LAZY_TYPE && __ST.resolveLazy(key) === currentFirstChild.type) {
                          deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                          lanes = useFiber(currentFirstChild, newChild.props);
                          __ST.coerceRef(lanes, newChild);
                          lanes.return = returnFiber;
                          lanes._debugOwner = newChild._owner;
                          lanes._debugInfo = __ST.currentDebugInfo;
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
                    newChild.type === __ST.REACT_FRAGMENT_TYPE ? (lanes = __ST.createFiberFromFragment(newChild.props.children, returnFiber.mode, lanes, newChild.key), lanes.return = returnFiber, lanes._debugOwner = returnFiber, lanes._debugTask = returnFiber._debugTask, lanes._debugInfo = __ST.currentDebugInfo, __ST.validateFragmentProps(newChild, lanes, returnFiber), returnFiber = lanes) : (lanes = __ST.createFiberFromElement(newChild, returnFiber.mode, lanes), __ST.coerceRef(lanes, newChild), lanes.return = returnFiber, lanes._debugInfo = __ST.currentDebugInfo, returnFiber = lanes);
                  }
                  break;
                }
              }
              returnFiber = placeSingleChild(returnFiber);
              __ST.currentDebugInfo = prevDebugInfo;
              return returnFiber;
            case __ST.REACT_PORTAL_TYPE:
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
                    lanes = __ST.createFiberFromPortal(prevDebugInfo, returnFiber.mode, lanes);
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                  }
                  break;
                }
              }
              return placeSingleChild(returnFiber);
            case __ST.REACT_LAZY_TYPE:
              return prevDebugInfo = __ST.pushDebugInfo(newChild._debugInfo), newChild = __ST.resolveLazy(newChild), returnFiber = reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes), __ST.currentDebugInfo = prevDebugInfo, returnFiber;
          }
          if (__ST.isArrayImpl(newChild)) return prevDebugInfo = __ST.pushDebugInfo(newChild._debugInfo), returnFiber = reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes), __ST.currentDebugInfo = prevDebugInfo, returnFiber;
          if (__ST.getIteratorFn(newChild)) {
            prevDebugInfo = __ST.pushDebugInfo(newChild._debugInfo);
            key = __ST.getIteratorFn(newChild);
            if ("function" !== typeOfJS(key)) throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
            newChildren = __callFn(key, newChild);
            if (newChildren === newChild) {
              if (0 !== returnFiber.tag || "[object GeneratorFunction]" !== __callFn(__protoOf(Object).toString, returnFiber.type) || "[object Generator]" !== __callFn(__protoOf(Object).toString, newChildren)) __ST.didWarnAboutGenerators || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), __ST.didWarnAboutGenerators = !0;
            } else newChild.entries !== key || __ST.didWarnAboutMaps || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), __ST.didWarnAboutMaps = !0);
            returnFiber = reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes);
            __ST.currentDebugInfo = prevDebugInfo;
            return returnFiber;
          }
          if ("function" === typeOfJS(newChild.then)) return prevDebugInfo = __ST.pushDebugInfo(newChild._debugInfo), returnFiber = reconcileChildFibersImpl(returnFiber, currentFirstChild, __ST.unwrapThenable(newChild), lanes), __ST.currentDebugInfo = prevDebugInfo, returnFiber;
          if (newChild.$$typeof === __ST.REACT_CONTEXT_TYPE) return reconcileChildFibersImpl(returnFiber, currentFirstChild, __ST.readContextDuringReconciliation(returnFiber, newChild), lanes);
          __ST.throwOnInvalidObjectType(returnFiber, newChild);
        }
        if ("string" === typeOfJS(newChild) && "" !== newChild || "number" === typeOfJS(newChild) || "bigint" === typeOfJS(newChild)) return prevDebugInfo = __cat("", newChild), undefined !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, prevDebugInfo), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = __ST.createFiberFromText(prevDebugInfo, returnFiber.mode, lanes), lanes.return = returnFiber, lanes._debugOwner = returnFiber, lanes._debugTask = returnFiber._debugTask, lanes._debugInfo = __ST.currentDebugInfo, returnFiber = lanes), placeSingleChild(returnFiber);
        "function" === typeOfJS(newChild) && __ST.warnOnFunctionType(returnFiber, newChild);
        "symbol" === typeOfJS(newChild) && __ST.warnOnSymbolType(returnFiber, newChild);
        return deleteRemainingChildren(returnFiber, currentFirstChild);
      }
      return function (returnFiber, currentFirstChild, newChild, lanes) {
        let prevDebugInfo, firstChildFiber, fiber, debugInfo, i;
        prevDebugInfo = __ST.currentDebugInfo;
        __ST.currentDebugInfo = undefined;
        try {
          __ST.thenableIndexCounter_1 = 0;
          firstChildFiber = reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
          __ST.thenableState_1 = undefined;
          return firstChildFiber;
        } catch (x) {
          if (x === __ST.SuspenseException || x === __ST.SuspenseActionException) throw x;
          fiber = __ST.createFiber(29, x, undefined, returnFiber.mode);
          fiber.lanes = lanes;
          fiber.return = returnFiber;
          debugInfo = fiber._debugInfo = __ST.currentDebugInfo;
          fiber._debugOwner = returnFiber._debugOwner;
          fiber._debugTask = returnFiber._debugTask;
          if (debugInfo !== undefined) for (i = __len(debugInfo) - 1; 0 <= i; i--) if ("string" === typeOfJS(debugInfo[i].stack)) {
            fiber._debugOwner = debugInfo[i];
            fiber._debugTask = debugInfo[i].debugTask;
            break;
          }
          return fiber;
        } finally {
          __ST.currentDebugInfo = prevDebugInfo;
        }
      };
    }(...__args);
  };
  __ST.warnOnSymbolType = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (returnFiber, invalidChild) {
      let debugTask;
      debugTask = __ST.getCurrentDebugTask();
      undefined !== debugTask ? debugTask.run(__partial((..._bindArgs17) => __applyFn(__ST.warnOnSymbolTypeImpl, ..._bindArgs17), undefined, returnFiber, invalidChild)) : __ST.warnOnSymbolTypeImpl(returnFiber, invalidChild);
    }(...__args);
  };
  __ST.warnOnSymbolTypeImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (returnFiber, invalidChild) {
      let parentName;
      parentName = __ST.getComponentNameFromFiber(returnFiber) || "Component";
      __ST.ownerHasSymbolTypeWarning[parentName] || (__ST.ownerHasSymbolTypeWarning[parentName] = !0, invalidChild = String(invalidChild), 3 === returnFiber.tag ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", invalidChild) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", parentName, invalidChild, parentName));
    }(...__args);
  };
  __ST.warnOnFunctionType = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (returnFiber, invalidChild) {
      let debugTask;
      debugTask = __ST.getCurrentDebugTask();
      undefined !== debugTask ? debugTask.run(__partial((..._bindArgs16) => __applyFn(__ST.warnOnFunctionTypeImpl, ..._bindArgs16), undefined, returnFiber, invalidChild)) : __ST.warnOnFunctionTypeImpl(returnFiber, invalidChild);
    }(...__args);
  };
  __ST.warnOnFunctionTypeImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (returnFiber, invalidChild) {
      let parentName;
      parentName = __ST.getComponentNameFromFiber(returnFiber) || "Component";
      __ST.ownerHasFunctionTypeWarning[parentName] || (__ST.ownerHasFunctionTypeWarning[parentName] = !0, invalidChild = invalidChild.displayName || invalidChild.name || "Component", 3 === returnFiber.tag ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", invalidChild, invalidChild, invalidChild) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", invalidChild, invalidChild, parentName, invalidChild, parentName));
    }(...__args);
  };
  __ST.throwOnInvalidObjectType = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (returnFiber, newChild) {
      let debugTask;
      debugTask = __ST.getCurrentDebugTask();
      undefined !== debugTask ? debugTask.run(__partial((..._bindArgs15) => __applyFn(__ST.throwOnInvalidObjectTypeImpl, ..._bindArgs15), undefined, returnFiber, newChild)) : __ST.throwOnInvalidObjectTypeImpl(returnFiber, newChild);
    }(...__args);
  };
  __ST.throwOnInvalidObjectTypeImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (returnFiber, newChild) {
      if (newChild.$$typeof === __ST.REACT_LEGACY_ELEMENT_TYPE) throw Error('A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.');
      returnFiber = __callFn(__protoOf(Object).toString, newChild);
      throw Error(__cat(__cat("Objects are not valid as a React child (found: ", "[object Object]" === returnFiber ? __cat(__cat("object with keys {", __join(Object.keys(newChild), ", ")), "}") : returnFiber), "). If you meant to render a collection of children, use an array instead."));
    }(...__args);
  };
  __ST.coerceRef = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, element) {
      element = element.props.ref;
      workInProgress.ref = void 0 !== element ? element : undefined;
    }(...__args);
  };
  __ST.unwrapThenable = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (thenable) {
      let index;
      index = __ST.thenableIndexCounter_1;
      __ST.thenableIndexCounter_1 += 1;
      undefined === __ST.thenableState_1 && (__ST.thenableState_1 = __ST.createThenableState());
      return __ST.trackUsedThenable(__ST.thenableState_1, thenable, index);
    }(...__args);
  };
  __ST.validateFragmentProps = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (element, fiber, returnFiber) {
      let keys, i, key;
      for (keys = Object.keys(element.props), i = 0; i < __len(keys); i++) {
        key = keys[i];
        if ("children" !== key && "key" !== key) {
          undefined === fiber && (fiber = __ST.createFiberFromElement(element, returnFiber.mode, 0), fiber._debugInfo = __ST.currentDebugInfo, fiber.return = returnFiber);
          __ST.runWithFiberInDEV(fiber, function (erroredKey) {
            console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", erroredKey);
          }, key);
          break;
        }
      }
    }(...__args);
  };
  __ST.getCurrentDebugTask = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let debugInfo, i, debugTask;
      debugInfo = __ST.currentDebugInfo;
      if (debugInfo !== undefined) for (i = __len(debugInfo) - 1; 0 <= i; i--) if (debugInfo[i].name !== undefined) {
        debugTask = debugInfo[i].debugTask;
        if (debugTask !== undefined) return debugTask;
      }
      return undefined;
    }(...__args);
  };
  __ST.pushDebugInfo = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (debugInfo) {
      let previousDebugInfo;
      previousDebugInfo = __ST.currentDebugInfo;
      debugInfo !== undefined && (__ST.currentDebugInfo = undefined === previousDebugInfo ? debugInfo : __concat(previousDebugInfo, debugInfo));
      return previousDebugInfo;
    }(...__args);
  };
  __ST.checkIfUseWrappedInAsyncCatch = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (rejectedReason) {
      if (rejectedReason === __ST.SuspenseException || rejectedReason === __ST.SuspenseActionException) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
    }(...__args);
  };
  __ST.getSuspendedThenable = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let thenable;
      if (undefined === __ST.suspendedThenable) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
      thenable = __ST.suspendedThenable;
      __ST.suspendedThenable = undefined;
      __ST.needsToResetSuspendedThenableDEV = !1;
      return thenable;
    }(...__args);
  };
  __ST.resolveLazy = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (lazyType) {
      try {
        return __ST.callLazyInitInDEV(lazyType);
      } catch (x) {
        if (undefined !== x && "object" === typeOfJS(x) && "function" === typeOfJS(x.then)) throw __ST.suspendedThenable = x, __ST.needsToResetSuspendedThenableDEV = !0, __ST.SuspenseException;
        throw x;
      }
    }(...__args);
  };
  __ST.trackUsedThenable = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (thenableState, thenable, index) {
      let trackedThenables, ioInfo;
      undefined !== __ST.ReactSharedInternals.actQueue && (__ST.ReactSharedInternals.didUsePromise = !0);
      trackedThenables = thenableState.thenables;
      index = trackedThenables[index];
      void 0 === index ? __push(trackedThenables, thenable) : index !== thenable && (thenableState.didWarnAboutUncachedPromise || (thenableState.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), thenable.then(__ST.noop_1, __ST.noop_1), thenable = index);
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
          throw thenableState = thenable.reason, __ST.checkIfUseWrappedInAsyncCatch(thenableState), thenableState;
        default:
          if ("string" === typeOfJS(thenable.status)) thenable.then(__ST.noop_1, __ST.noop_1);else {
            thenableState = __ST.workInProgressRoot;
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
              throw thenableState = thenable.reason, __ST.checkIfUseWrappedInAsyncCatch(thenableState), thenableState;
          }
          __ST.suspendedThenable = thenable;
          __ST.needsToResetSuspendedThenableDEV = !0;
          throw __ST.SuspenseException;
      }
    }(...__args);
  };
  __ST.isThenableResolved = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (thenable) {
      thenable = thenable.status;
      return "fulfilled" === thenable || "rejected" === thenable;
    }(...__args);
  };
  __ST.createThenableState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      return {
        didWarnAboutUncachedPromise: !1,
        thenables: __arrNew()
      };
    }(...__args);
  };
  __ST.shallowEqual = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (objA, objB) {
      let keysA, keysB, currentKey;
      if (__ST.objectIs(objA, objB)) return !0;
      if ("object" !== typeOfJS(objA) || undefined === objA || "object" !== typeOfJS(objB) || undefined === objB) return !1;
      keysA = Object.keys(objA);
      keysB = Object.keys(objB);
      if (__len(keysA) !== __len(keysB)) return !1;
      for (keysB = 0; keysB < __len(keysA); keysB++) {
        currentKey = keysA[keysB];
        if (!__callFn(__ST.hasOwnProperty, objB, currentKey) || !__ST.objectIs(objA[currentKey], objB[currentKey])) return !1;
      }
      return !0;
    }(...__args);
  };
  __ST.getSuspendedCache = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let cacheFromPool;
      cacheFromPool = __ST.peekCacheFromPool();
      return undefined === cacheFromPool ? undefined : {
        parent: __ST.isPrimaryRenderer ? __ST.CacheContext._currentValue : __ST.CacheContext._currentValue2,
        pool: cacheFromPool
      };
    }(...__args);
  };
  __ST.pushTransition = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (offscreenWorkInProgress, prevCachePool) {
      undefined === prevCachePool ? __ST.push(__ST.resumedCache, __ST.resumedCache.current, offscreenWorkInProgress) : __ST.push(__ST.resumedCache, prevCachePool.pool, offscreenWorkInProgress);
    }(...__args);
  };
  __ST.peekCacheFromPool = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let cacheResumedFromPreviousRender;
      cacheResumedFromPreviousRender = __ST.resumedCache.current;
      return undefined !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : __ST.workInProgressRoot.pooledCache;
    }(...__args);
  };
  __ST.chainThenableValue = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (thenable, result) {
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
    }(...__args);
  };
  __ST.pingEngtangledActionScope = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let listeners, i;
      if (0 === --__ST.currentEntangledPendingCount && (-1 < __ST.transitionUpdateTime || (__ST.transitionStartTime = -1.1), undefined !== __ST.currentEntangledListeners)) {
        undefined !== __ST.currentEntangledActionThenable && (__ST.currentEntangledActionThenable.status = "fulfilled");
        listeners = __ST.currentEntangledListeners;
        __ST.currentEntangledListeners = undefined;
        __ST.currentEntangledLane = 0;
        __ST.currentEntangledActionThenable = undefined;
        for (i = 0; i < __len(listeners); i++) (0, listeners[i])();
      }
    }(...__args);
  };
  __ST.entangleAsyncAction = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (transition, thenable) {
      let entangledListeners;
      if (undefined === __ST.currentEntangledListeners) {
        entangledListeners = __ST.currentEntangledListeners = __arrNew();
        __ST.currentEntangledPendingCount = 0;
        __ST.currentEntangledLane = __ST.requestTransitionLane();
        __ST.currentEntangledActionThenable = {
          status: "pending",
          value: void 0,
          then: function (resolve) {
            __push(entangledListeners, resolve);
          }
        };
      }
      __ST.currentEntangledPendingCount++;
      thenable.then(__ST.pingEngtangledActionScope, __ST.pingEngtangledActionScope);
      return thenable;
    }(...__args);
  };
  __ST.requestTransitionLane = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let actionScopeLane;
      if (0 === __ST.currentEventTransitionLane) {
        actionScopeLane = __ST.currentEntangledLane;
        0 === actionScopeLane && (actionScopeLane = __ST.nextTransitionUpdateLane, __ST.nextTransitionUpdateLane <<= 1, 0 === (__ST.nextTransitionUpdateLane & 261888) && (__ST.nextTransitionUpdateLane = 256));
        __ST.currentEventTransitionLane = actionScopeLane;
      }
      return __ST.currentEventTransitionLane;
    }(...__args);
  };
  __ST.scheduleImmediateRootScheduleTask = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      undefined !== __ST.ReactSharedInternals.actQueue && __push(__ST.ReactSharedInternals.actQueue, function () {
        __ST.processRootScheduleInMicrotask();
        return undefined;
      });
      __ST.supportsMicrotasks ? __ST.scheduleMicrotask(function () {
        (__ST.executionContext & (__ST.RenderContext | __ST.CommitContext)) !== __ST.NoContext ? __ST.scheduleCallback_3(__ST.ImmediatePriority, __ST.processRootScheduleInImmediateTask) : __ST.processRootScheduleInMicrotask();
      }) : __ST.scheduleCallback_3(__ST.ImmediatePriority, __ST.processRootScheduleInImmediateTask);
    }(...__args);
  };
  __ST.cancelCallback = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (callbackNode) {
      callbackNode !== __ST.fakeActCallbackNode_1 && undefined !== callbackNode && __ST.cancelCallback_1(callbackNode);
    }(...__args);
  };
  __ST.performSyncWorkOnRoot = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, lanes) {
      if (__ST.flushPendingEffects()) return undefined;
      __ST.currentUpdateIsNested = __ST.nestedUpdateScheduled;
      __ST.nestedUpdateScheduled = !1;
      __ST.performWorkOnRoot(root, lanes, !0);
    }(...__args);
  };
  __ST.performWorkOnRootViaSchedulerTask = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, didTimeout) {
      let originalCallbackNode, workInProgressRootRenderLanes_jscomp_0;
      __ST.nestedUpdateScheduled = __ST.currentUpdateIsNested = !1;
      __ST.trackSchedulerEvent();
      if (__ST.pendingEffectsStatus !== __ST.NO_PENDING_EFFECTS && __ST.pendingEffectsStatus !== __ST.PENDING_PASSIVE_PHASE) return root.callbackNode = undefined, root.callbackPriority = 0, undefined;
      originalCallbackNode = root.callbackNode;
      __ST.pendingDelayedCommitReason === __ST.IMMEDIATE_COMMIT && (__ST.pendingDelayedCommitReason = __ST.DELAYED_PASSIVE_COMMIT);
      if (__ST.flushPendingEffects() && root.callbackNode !== originalCallbackNode) return undefined;
      workInProgressRootRenderLanes_jscomp_0 = __ST.workInProgressRootRenderLanes;
      workInProgressRootRenderLanes_jscomp_0 = __ST.getNextLanes(root, root === __ST.workInProgressRoot ? workInProgressRootRenderLanes_jscomp_0 : 0, undefined !== root.cancelPendingCommit || root.timeoutHandle !== __ST.noTimeout);
      if (0 === workInProgressRootRenderLanes_jscomp_0) return undefined;
      __ST.performWorkOnRoot(root, workInProgressRootRenderLanes_jscomp_0, didTimeout);
      __ST.scheduleTaskForRootDuringMicrotask(root, __ST.now_1());
      return root.callbackNode !== undefined && root.callbackNode === originalCallbackNode ? __partial((..._bindArgs14) => __applyFn(__ST.performWorkOnRootViaSchedulerTask, ..._bindArgs14), undefined, root) : undefined;
    }(...__args);
  };
  __ST.scheduleTaskForRootDuringMicrotask = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, currentTime) {
      let suspendedLanes, pingedLanes, expirationTimes, lanes, index, lane, expirationTime;
      for (suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes, expirationTimes = root.expirationTimes, lanes = root.pendingLanes & -62914561; 0 < lanes;) {
        index = 31 - __ST.clz32(lanes);
        lane = 1 << index;
        expirationTime = expirationTimes[index];
        if (-1 === expirationTime) {
          if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes)) expirationTimes[index] = __ST.computeExpirationTime(lane, currentTime);
        } else expirationTime <= currentTime && (root.expiredLanes |= lane);
        lanes &= ~lane;
      }
      currentTime = __ST.workInProgressRoot;
      suspendedLanes = __ST.workInProgressRootRenderLanes;
      suspendedLanes = __ST.getNextLanes(root, root === currentTime ? suspendedLanes : 0, undefined !== root.cancelPendingCommit || root.timeoutHandle !== __ST.noTimeout);
      pingedLanes = root.callbackNode;
      if (0 === suspendedLanes || root === currentTime && (__ST.workInProgressSuspendedReason === __ST.SuspendedOnData || __ST.workInProgressSuspendedReason === __ST.SuspendedOnAction) || undefined !== root.cancelPendingCommit) return undefined !== pingedLanes && __ST.cancelCallback(pingedLanes), root.callbackNode = undefined, root.callbackPriority = 0;
      if (0 === (suspendedLanes & 3) || __ST.checkIfRootIsPrerendering(root, suspendedLanes)) {
        currentTime = suspendedLanes & -suspendedLanes;
        if (currentTime !== root.callbackPriority || undefined !== __ST.ReactSharedInternals.actQueue && pingedLanes !== __ST.fakeActCallbackNode_1) __ST.cancelCallback(pingedLanes);else return currentTime;
        switch (__ST.lanesToEventPriority(suspendedLanes)) {
          case 2:
          case 8:
            suspendedLanes = __ST.UserBlockingPriority;
            break;
          case 32:
            suspendedLanes = __ST.NormalPriority_1;
            break;
          case 268435456:
            suspendedLanes = __ST.IdlePriority;
            break;
          default:
            suspendedLanes = __ST.NormalPriority_1;
        }
        pingedLanes = __partial((..._bindArgs13) => __applyFn(__ST.performWorkOnRootViaSchedulerTask, ..._bindArgs13), undefined, root);
        undefined !== __ST.ReactSharedInternals.actQueue ? (__push(__ST.ReactSharedInternals.actQueue, pingedLanes), suspendedLanes = __ST.fakeActCallbackNode_1) : suspendedLanes = __ST.scheduleCallback_3(suspendedLanes, pingedLanes);
        root.callbackPriority = currentTime;
        root.callbackNode = suspendedLanes;
        return currentTime;
      }
      undefined !== pingedLanes && __ST.cancelCallback(pingedLanes);
      root.callbackPriority = 2;
      root.callbackNode = undefined;
      return 2;
    }(...__args);
  };
  __ST.processRootScheduleInMicrotask = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let syncTransitionLanes, currentTime, prev, root, __next, nextLanes;
      __ST.mightHavePendingSyncWork = __ST.didScheduleMicrotask_act = __ST.didScheduleMicrotask = !1;
      syncTransitionLanes = 0;
      0 !== __ST.currentEventTransitionLane && __ST.shouldAttemptEagerTransition() && (syncTransitionLanes = __ST.currentEventTransitionLane);
      for (currentTime = __ST.now_1(), prev = undefined, root = __ST.firstScheduledRoot; undefined !== root;) {
        __next = root.next;
        nextLanes = __ST.scheduleTaskForRootDuringMicrotask(root, currentTime);
        if (0 === nextLanes) root.next = undefined, undefined === prev ? __ST.firstScheduledRoot = __next : prev.next = __next, undefined === __next && (__ST.lastScheduledRoot = prev);else if (prev = root, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3)) __ST.mightHavePendingSyncWork = !0;
        root = __next;
      }
      __ST.pendingEffectsStatus !== __ST.NO_PENDING_EFFECTS && __ST.pendingEffectsStatus !== __ST.PENDING_PASSIVE_PHASE || __ST.flushSyncWorkAcrossRoots_impl(syncTransitionLanes, !1);
      0 !== __ST.currentEventTransitionLane && (__ST.currentEventTransitionLane = 0);
    }(...__args);
  };
  __ST.processRootScheduleInImmediateTask = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.trackSchedulerEvent();
      __ST.processRootScheduleInMicrotask();
    }(...__args);
  };
  __ST.flushSyncWorkAcrossRoots_impl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (syncTransitionLanes, onlyLegacy) {
      let didPerformSomeWork, root, pendingLanes, nextLanes, suspendedLanes, pingedLanes;
      if (!__ST.isFlushingWork && __ST.mightHavePendingSyncWork) {
        __ST.isFlushingWork = !0;
        do {
          didPerformSomeWork = !1;
          for (root = __ST.firstScheduledRoot; undefined !== root;) {
            if (!onlyLegacy) if (0 !== syncTransitionLanes) {
              pendingLanes = root.pendingLanes;
              if (0 === pendingLanes) {
                nextLanes = 0;
              } else {
                suspendedLanes = root.suspendedLanes;
                pingedLanes = root.pingedLanes;
                nextLanes = (1 << __cat(31 - __ST.clz32(42 | syncTransitionLanes), 1)) - 1;
                nextLanes &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
                nextLanes = nextLanes & 201326741 ? nextLanes & 201326741 | 1 : nextLanes ? nextLanes | 2 : 0;
              }
              0 !== nextLanes && (didPerformSomeWork = !0, __ST.performSyncWorkOnRoot(root, nextLanes));
            } else nextLanes = __ST.workInProgressRootRenderLanes, nextLanes = __ST.getNextLanes(root, root === __ST.workInProgressRoot ? nextLanes : 0, undefined !== root.cancelPendingCommit || root.timeoutHandle !== __ST.noTimeout), 0 === (nextLanes & 3) || __ST.checkIfRootIsPrerendering(root, nextLanes) || (didPerformSomeWork = !0, __ST.performSyncWorkOnRoot(root, nextLanes));
            root = root.next;
          }
        } while (didPerformSomeWork);
        __ST.isFlushingWork = !1;
      }
    }(...__args);
  };
  __ST.ensureRootIsScheduled = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root) {
      root !== __ST.lastScheduledRoot && undefined === root.next && (undefined === __ST.lastScheduledRoot ? __ST.firstScheduledRoot = __ST.lastScheduledRoot = root : __ST.lastScheduledRoot = __ST.lastScheduledRoot.next = root);
      __ST.mightHavePendingSyncWork = !0;
      undefined !== __ST.ReactSharedInternals.actQueue ? __ST.didScheduleMicrotask_act || (__ST.didScheduleMicrotask_act = !0, __ST.scheduleImmediateRootScheduleTask()) : __ST.didScheduleMicrotask || (__ST.didScheduleMicrotask = !0, __ST.scheduleImmediateRootScheduleTask());
    }(...__args);
  };
  __ST.noop_1 = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {}(...__args);
  };
  __ST.transferActualDuration = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let child;
      for (child = fiber.child; child;) fiber.actualDuration += child.actualDuration, child = child.sibling;
    }(...__args);
  };
  __ST.startEffectTimer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.profilerStartTime = __ST.now();
      0 > __ST.componentEffectStartTime && (__ST.componentEffectStartTime = __ST.profilerStartTime);
    }(...__args);
  };
  __ST.recordEffectError = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (errorInfo) {
      undefined === __ST.componentEffectErrors && (__ST.componentEffectErrors = __arrNew());
      __push(__ST.componentEffectErrors, errorInfo);
      undefined === __ST.commitErrors && (__ST.commitErrors = __arrNew());
      __push(__ST.commitErrors, errorInfo);
    }(...__args);
  };
  __ST.recordEffectDuration = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let endTime, elapsedTime;
      if (0 <= __ST.profilerStartTime) {
        endTime = __ST.now();
        elapsedTime = endTime - __ST.profilerStartTime;
        __ST.profilerStartTime = -1;
        __ST.profilerEffectDuration += elapsedTime;
        __ST.componentEffectDuration += elapsedTime;
        __ST.componentEffectEndTime = endTime;
      }
    }(...__args);
  };
  __ST.stopProfilerTimerIfRunningAndRecordIncompleteDuration = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let elapsedTime;
      if (0 <= __ST.profilerStartTime) {
        elapsedTime = __ST.now() - __ST.profilerStartTime;
        fiber.actualDuration += elapsedTime;
        __ST.profilerStartTime = -1;
      }
    }(...__args);
  };
  __ST.stopProfilerTimerIfRunningAndRecordDuration = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let elapsedTime;
      if (0 <= __ST.profilerStartTime) {
        elapsedTime = __ST.now() - __ST.profilerStartTime;
        fiber.actualDuration += elapsedTime;
        fiber.selfBaseDuration = elapsedTime;
        __ST.profilerStartTime = -1;
      }
    }(...__args);
  };
  __ST.startProfilerTimer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      __ST.profilerStartTime = __ST.now();
      0 > fiber.actualStartTime && (fiber.actualStartTime = __ST.profilerStartTime);
    }(...__args);
  };
  __ST.pushComponentEffectDidSpawnUpdate = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let prev;
      prev = __ST.componentEffectSpawnedUpdate;
      __ST.componentEffectSpawnedUpdate = !1;
      return prev;
    }(...__args);
  };
  __ST.pushComponentEffectErrors = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let prevErrors;
      prevErrors = __ST.componentEffectErrors;
      __ST.componentEffectErrors = undefined;
      return prevErrors;
    }(...__args);
  };
  __ST.popComponentEffectDuration = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (prevEffectDuration) {
      0 <= prevEffectDuration && (__ST.componentEffectDuration = prevEffectDuration);
    }(...__args);
  };
  __ST.pushComponentEffectDuration = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let prevEffectDuration;
      prevEffectDuration = __ST.componentEffectDuration;
      __ST.componentEffectDuration = -0;
      return prevEffectDuration;
    }(...__args);
  };
  __ST.popComponentEffectStart = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (prevEffectStart) {
      0 <= prevEffectStart && (__ST.componentEffectStartTime = prevEffectStart);
    }(...__args);
  };
  __ST.pushComponentEffectStart = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let prevEffectStart;
      prevEffectStart = __ST.componentEffectStartTime;
      __ST.componentEffectStartTime = -1.1;
      return prevEffectStart;
    }(...__args);
  };
  __ST.resetComponentEffectTimers = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.componentEffectEndTime = __ST.componentEffectStartTime = -1.1;
    }(...__args);
  };
  __ST.bubbleNestedEffectDurations = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (prevEffectDuration) {
      let elapsedTime;
      elapsedTime = __ST.profilerEffectDuration;
      __ST.profilerEffectDuration += prevEffectDuration;
      return elapsedTime;
    }(...__args);
  };
  __ST.popNestedEffectDurations = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (prevEffectDuration) {
      let elapsedTime;
      elapsedTime = __ST.profilerEffectDuration;
      __ST.profilerEffectDuration = prevEffectDuration;
      return elapsedTime;
    }(...__args);
  };
  __ST.pushNestedEffectDurations = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let prevEffectDuration;
      prevEffectDuration = __ST.profilerEffectDuration;
      __ST.profilerEffectDuration = 0;
      return prevEffectDuration;
    }(...__args);
  };
  __ST.startHostActionTimer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let newEventTime, newEventType;
      if (0 > __ST.blockingUpdateTime) {
        __ST.blockingUpdateTime = __ST.now();
        __ST.blockingUpdateTask = fiber._debugTask !== undefined ? fiber._debugTask : undefined;
        __ST.isAlreadyRendering() && (__ST.blockingUpdateType = 1);
        newEventTime = __ST.resolveEventTimeStamp();
        newEventType = __ST.resolveEventType();
        newEventTime !== __ST.blockingEventRepeatTime || newEventType !== __ST.blockingEventType ? __ST.blockingEventRepeatTime = -1.1 : undefined !== newEventType && (__ST.blockingUpdateType = 1);
        __ST.blockingEventTime = newEventTime;
        __ST.blockingEventType = newEventType;
      }
      if (0 > __ST.transitionUpdateTime && (__ST.transitionUpdateTime = __ST.now(), __ST.transitionUpdateTask = fiber._debugTask !== undefined ? fiber._debugTask : undefined, 0 > __ST.transitionStartTime)) {
        fiber = __ST.resolveEventTimeStamp();
        newEventTime = __ST.resolveEventType();
        if (fiber !== __ST.transitionEventRepeatTime || newEventTime !== __ST.transitionEventType) __ST.transitionEventRepeatTime = -1.1;
        __ST.transitionEventTime = fiber;
        __ST.transitionEventType = newEventTime;
      }
    }(...__args);
  };
  __ST.startUpdateTimerByLane = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (lane, method, fiber) {
      if (0 !== (lane & 127)) 0 > __ST.blockingUpdateTime && (__ST.blockingUpdateTime = __ST.now(), __ST.blockingUpdateTask = __ST.createTask(method), __ST.blockingUpdateMethodName = method, fiber !== undefined && (__ST.blockingUpdateComponentName = __ST.getComponentNameFromFiber(fiber)), __ST.isAlreadyRendering() && (__ST.componentEffectSpawnedUpdate = !0, __ST.blockingUpdateType = 1), lane = __ST.resolveEventTimeStamp(), method = __ST.resolveEventType(), lane !== __ST.blockingEventRepeatTime || method !== __ST.blockingEventType ? __ST.blockingEventRepeatTime = -1.1 : undefined !== method && (__ST.blockingUpdateType = 1), __ST.blockingEventTime = lane, __ST.blockingEventType = method);else if (0 !== (lane & 4194048) && 0 > __ST.transitionUpdateTime && (__ST.transitionUpdateTime = __ST.now(), __ST.transitionUpdateTask = __ST.createTask(method), __ST.transitionUpdateMethodName = method, fiber !== undefined && (__ST.transitionUpdateComponentName = __ST.getComponentNameFromFiber(fiber)), 0 > __ST.transitionStartTime)) {
        lane = __ST.resolveEventTimeStamp();
        method = __ST.resolveEventType();
        if (lane !== __ST.transitionEventRepeatTime || method !== __ST.transitionEventType) __ST.transitionEventRepeatTime = -1.1;
        __ST.transitionEventTime = lane;
        __ST.transitionEventType = method;
      }
    }(...__args);
  };
  __ST.releaseCache = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (cache) {
      cache.refCount--;
      0 > cache.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React.");
      0 === cache.refCount && __ST.scheduleCallback_2(__ST.NormalPriority, function () {
        cache.controller.abort();
      });
    }(...__args);
  };
  __ST.retainCache = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (cache) {
      cache.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React.");
      cache.refCount++;
    }(...__args);
  };
  __ST.createCache = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      return {
        controller: __new(__ST.AbortControllerLocal),
        data: __new(Map),
        refCount: 0
      };
    }(...__args);
  };
  __ST.readContextForConsumer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (consumer, context) {
      let value;
      value = __ST.isPrimaryRenderer ? context._currentValue : context._currentValue2;
      context = {
        context: context,
        memoizedValue: value,
        next: undefined
      };
      if (undefined === __ST.lastContextDependency) {
        if (undefined === consumer) throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        __ST.lastContextDependency = context;
        consumer.dependencies = {
          lanes: 0,
          firstContext: context,
          _debugThenableState: undefined
        };
        consumer.flags |= 524288;
      } else __ST.lastContextDependency = __ST.lastContextDependency.next = context;
      return value;
    }(...__args);
  };
  __ST.readContextDuringReconciliation = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (consumer, context) {
      undefined === __ST.currentlyRenderingFiber_1 && __ST.prepareToReadContext(consumer);
      return __ST.readContextForConsumer(consumer, context);
    }(...__args);
  };
  __ST.readContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (context) {
      __ST.isDisallowedContextReadInDEV && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      return __ST.readContextForConsumer(__ST.currentlyRenderingFiber_1, context);
    }(...__args);
  };
  __ST.prepareToReadContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress) {
      __ST.currentlyRenderingFiber_1 = workInProgress;
      __ST.lastContextDependency = undefined;
      workInProgress = workInProgress.dependencies;
      undefined !== workInProgress && (workInProgress.firstContext = undefined);
    }(...__args);
  };
  __ST.checkIfContextChanged = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (currentDependencies) {
      let context;
      for (currentDependencies = currentDependencies.firstContext; undefined !== currentDependencies;) {
        context = currentDependencies.context;
        if (!__ST.objectIs(__ST.isPrimaryRenderer ? context._currentValue : context._currentValue2, currentDependencies.memoizedValue)) return !0;
        currentDependencies = currentDependencies.next;
      }
      return !1;
    }(...__args);
  };
  __ST.propagateParentContextChanges = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (current, workInProgress, renderLanes, forcePropagateEntireTree) {
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
            __ST.objectIs(parent.pendingProps.value, currentParent.value) || (undefined !== current ? __push(current, context) : current = __arrNew(context));
          }
        } else if (parent === __ST.hostTransitionProviderCursor.current) {
          currentParent = parent.alternate;
          if (undefined === currentParent) throw Error("Should have a current fiber. This is a bug in React.");
          currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (undefined !== current ? __push(current, __ST.HostTransitionContext) : current = __arrNew(__ST.HostTransitionContext));
        }
        parent = parent.return;
      }
      undefined !== current && __ST.propagateContextChanges(workInProgress, current, renderLanes, forcePropagateEntireTree);
      workInProgress.flags |= 262144;
    }(...__args);
  };
  __ST.propagateContextChanges = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, contexts, renderLanes, forcePropagateEntireTree) {
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
                    __ST.scheduleContextWorkOnParentPath(list.return, renderLanes, workInProgress);
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
          __ST.scheduleContextWorkOnParentPath(nextFiber, renderLanes, workInProgress);
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
    }(...__args);
  };
  __ST.scheduleContextWorkOnParentPath = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (parent, renderLanes, propagationRoot) {
      let alternate;
      for (; undefined !== parent;) {
        alternate = parent.alternate;
        (parent.childLanes & renderLanes) !== renderLanes ? (parent.childLanes |= renderLanes, undefined !== alternate && (alternate.childLanes |= renderLanes)) : undefined !== alternate && (alternate.childLanes & renderLanes) !== renderLanes && (alternate.childLanes |= renderLanes);
        if (parent === propagationRoot) break;
        parent = parent.return;
      }
      parent !== propagationRoot && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }(...__args);
  };
  __ST.popProvider = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (context, providerFiber) {
      let currentValue;
      currentValue = __ST.valueCursor.current;
      __ST.isPrimaryRenderer ? (context._currentValue = currentValue, currentValue = __ST.rendererCursorDEV.current, __ST.pop(__ST.rendererCursorDEV, providerFiber), context._currentRenderer = currentValue) : (context._currentValue2 = currentValue, currentValue = __ST.renderer2CursorDEV.current, __ST.pop(__ST.renderer2CursorDEV, providerFiber), context._currentRenderer2 = currentValue);
      __ST.pop(__ST.valueCursor, providerFiber);
    }(...__args);
  };
  __ST.pushProvider = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (providerFiber, context, nextValue) {
      __ST.isPrimaryRenderer ? (__ST.push(__ST.valueCursor, context._currentValue, providerFiber), context._currentValue = nextValue, __ST.push(__ST.rendererCursorDEV, context._currentRenderer, providerFiber), void 0 !== context._currentRenderer && undefined !== context._currentRenderer && context._currentRenderer !== __ST.rendererSigil && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer = __ST.rendererSigil) : (__ST.push(__ST.valueCursor, context._currentValue2, providerFiber), context._currentValue2 = nextValue, __ST.push(__ST.renderer2CursorDEV, context._currentRenderer2, providerFiber), void 0 !== context._currentRenderer2 && undefined !== context._currentRenderer2 && context._currentRenderer2 !== __ST.rendererSigil && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer2 = __ST.rendererSigil);
    }(...__args);
  };
  __ST.resetContextDependencies = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.lastContextDependency = __ST.currentlyRenderingFiber_1 = undefined;
      __ST.isDisallowedContextReadInDEV = !1;
    }(...__args);
  };
  __ST.emitPendingHydrationWarnings = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let diffRoot, diff;
      diffRoot = __ST.hydrationDiffRootDEV;
      if (undefined !== diffRoot) {
        __ST.hydrationDiffRootDEV = undefined;
        for (diff = __ST.describeDiff(diffRoot); 0 < __len(diffRoot.children);) diffRoot = diffRoot.children[0];
        __ST.runWithFiberInDEV(diffRoot.fiber, function () {
          console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", diff);
        });
      }
    }(...__args);
  };
  __ST.queueHydrationError = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (__error) {
      undefined === __ST.hydrationErrors ? __ST.hydrationErrors = __arrNew(__error) : __push(__ST.hydrationErrors, __error);
    }(...__args);
  };
  __ST.upgradeHydrationErrorsToRecoverable = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let queuedErrors;
      queuedErrors = __ST.hydrationErrors;
      undefined !== queuedErrors && (undefined === __ST.workInProgressRootRecoverableErrors ? __ST.workInProgressRootRecoverableErrors = queuedErrors : __applyFn(__ST.workInProgressRootRecoverableErrors.push, __ST.workInProgressRootRecoverableErrors, queuedErrors), __ST.hydrationErrors = undefined);
      return queuedErrors;
    }(...__args);
  };
  __ST.resetHydrationState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.supportsHydration && (__ST.nextHydratableInstance = __ST.hydrationParentFiber = undefined, __ST.didSuspendOrErrorDEV = __ST.isHydrating = !1);
    }(...__args);
  };
  __ST.warnIfUnhydratedTailNodes = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let nextInstance, diffNode, description;
      for (nextInstance = __ST.nextHydratableInstance; nextInstance;) {
        diffNode = __ST.buildHydrationDiffNode(fiber, 0);
        description = __ST.describeHydratableInstanceForDevWarnings(nextInstance);
        __push(diffNode.serverTail, description);
        nextInstance = "Suspense" === description.type ? __ST.getNextHydratableInstanceAfterSuspenseInstance(nextInstance) : __ST.getNextHydratableSibling(nextInstance);
      }
    }(...__args);
  };
  __ST.popHydrationState = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let tag;
      if (!__ST.supportsHydration || fiber !== __ST.hydrationParentFiber) return !1;
      if (!__ST.isHydrating) return __ST.popToNextHostParent(fiber), __ST.isHydrating = !0, !1;
      tag = fiber.tag;
      __ST.supportsSingletons ? 3 !== tag && 27 !== tag && (5 !== tag || __ST.shouldDeleteUnhydratedTailInstances(fiber.type) && !__ST.shouldSetTextContent(fiber.type, fiber.memoizedProps)) && __ST.nextHydratableInstance && (__ST.warnIfUnhydratedTailNodes(fiber), __ST.throwOnHydrationMismatch(fiber)) : 3 !== tag && (5 !== tag || __ST.shouldDeleteUnhydratedTailInstances(fiber.type) && !__ST.shouldSetTextContent(fiber.type, fiber.memoizedProps)) && __ST.nextHydratableInstance && (__ST.warnIfUnhydratedTailNodes(fiber), __ST.throwOnHydrationMismatch(fiber));
      __ST.popToNextHostParent(fiber);
      if (13 === tag) {
        if (!__ST.supportsHydration) throw Error("Expected skipPastDehydratedSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
        fiber = fiber.memoizedState;
        fiber = undefined !== fiber ? fiber.dehydrated : undefined;
        if (!fiber) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
        __ST.nextHydratableInstance = __ST.getNextHydratableInstanceAfterSuspenseInstance(fiber);
      } else if (31 === tag) {
        fiber = fiber.memoizedState;
        fiber = undefined !== fiber ? fiber.dehydrated : undefined;
        if (!fiber) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
        __ST.nextHydratableInstance = __ST.getNextHydratableInstanceAfterActivityInstance(fiber);
      } else __ST.nextHydratableInstance = __ST.supportsSingletons && 27 === tag ? __ST.getNextHydratableSiblingAfterSingleton(fiber.type, __ST.nextHydratableInstance) : __ST.hydrationParentFiber ? __ST.getNextHydratableSibling(fiber.stateNode) : undefined;
      return !0;
    }(...__args);
  };
  __ST.popToNextHostParent = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      for (__ST.hydrationParentFiber = fiber.return; __ST.hydrationParentFiber;) switch (__ST.hydrationParentFiber.tag) {
        case 5:
        case 31:
        case 13:
          __ST.rootOrSingletonContext = !1;
          return;
        case 27:
        case 3:
          __ST.rootOrSingletonContext = !0;
          return;
        default:
          __ST.hydrationParentFiber = __ST.hydrationParentFiber.return;
      }
    }(...__args);
  };
  __ST.prepareToHydrateHostInstance = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, hostContext) {
      if (!__ST.supportsHydration) throw Error("Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
      __ST.hydrateInstance(fiber.stateNode, fiber.type, fiber.memoizedProps, hostContext, fiber) || __ST.throwOnHydrationMismatch(fiber, !0);
    }(...__args);
  };
  __ST.throwOnHydrationMismatch = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, ...__args) {
      let __allArgs = __arrNew(fiber, ...__args);
      let fromText, diff, diffRoot;
      fromText = 1 < __len(__allArgs) && void 0 !== __argAt(__allArgs, 1) ? __argAt(__allArgs, 1) : !1;
      diff = "";
      diffRoot = __ST.hydrationDiffRootDEV;
      undefined !== diffRoot && (__ST.hydrationDiffRootDEV = undefined, diff = __ST.describeDiff(diffRoot));
      __ST.queueHydrationError(__ST.createCapturedValueAtFiber(Error(__cat(__cat(__cat("Hydration failed because the server rendered ", fromText ? "text" : "HTML"), " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch"), diff)), fiber));
      throw __ST.HydrationMismatchException;
    }(...__args);
  };
  __ST.warnNonHydratedInstance = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, rejectedCandidate) {
      __ST.didSuspendOrErrorDEV || (fiber = __ST.buildHydrationDiffNode(fiber, 0), fiber.serverProps = undefined, undefined !== rejectedCandidate && (rejectedCandidate = __ST.describeHydratableInstanceForDevWarnings(rejectedCandidate), __push(fiber.serverTail, rejectedCandidate)));
    }(...__args);
  };
  __ST.warnIfHydrating = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.isHydrating && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }(...__args);
  };
  __ST.buildHydrationDiffNode = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, distanceFromLeaf) {
      let siblings;
      if (undefined === fiber.return) {
        if (undefined === __ST.hydrationDiffRootDEV) __ST.hydrationDiffRootDEV = {
          fiber: fiber,
          children: __arrNew(),
          serverProps: void 0,
          serverTail: __arrNew(),
          distanceFromLeaf: distanceFromLeaf
        };else {
          if (__ST.hydrationDiffRootDEV.fiber !== fiber) throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");
          __ST.hydrationDiffRootDEV.distanceFromLeaf > distanceFromLeaf && (__ST.hydrationDiffRootDEV.distanceFromLeaf = distanceFromLeaf);
        }
        return __ST.hydrationDiffRootDEV;
      }
      siblings = __ST.buildHydrationDiffNode(fiber.return, __cat(distanceFromLeaf, 1)).children;
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
    }(...__args);
  };
  __ST.setCurrentFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      __ST.ReactSharedInternals.getCurrentStack = undefined === fiber ? undefined : __ST.getCurrentFiberStackInDev;
      __ST.isRendering = !1;
      __ST.current = fiber;
    }(...__args);
  };
  __ST.runWithFiberInDEV = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, callback, arg0, arg1, arg2, arg3, arg4) {
      let previousFiber;
      previousFiber = __ST.current;
      __ST.setCurrentFiber(fiber);
      try {
        return undefined !== fiber && fiber._debugTask ? fiber._debugTask.run(__partial((..._bindArgs12) => __applyFn(callback, ..._bindArgs12), undefined, arg0, arg1, arg2, arg3, arg4)) : callback(arg0, arg1, arg2, arg3, arg4);
      } finally {
        __ST.setCurrentFiber(previousFiber);
      }
      throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
    }(...__args);
  };
  __ST.getCurrentFiberStackInDev = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let workInProgress, info, fiber, debugStack, formattedStack, ownerStack, JSCompiler_inline_result;
      if (undefined === __ST.current) return "";
      workInProgress = __ST.current;
      try {
        info = "";
        6 === workInProgress.tag && (workInProgress = workInProgress.return);
        switch (workInProgress.tag) {
          case 26:
          case 27:
          case 5:
            info += __ST.describeBuiltInComponentFrame(workInProgress.type);
            break;
          case 13:
            info += __ST.describeBuiltInComponentFrame("Suspense");
            break;
          case 19:
            info += __ST.describeBuiltInComponentFrame("SuspenseList");
            break;
          case 31:
            info += __ST.describeBuiltInComponentFrame("Activity");
            break;
          case 30:
          case 0:
          case 15:
          case 1:
            workInProgress._debugOwner || "" !== info || (info += __ST.describeFunctionComponentFrameWithoutLineNumber(workInProgress.type));
            break;
          case 11:
            workInProgress._debugOwner || "" !== info || (info += __ST.describeFunctionComponentFrameWithoutLineNumber(workInProgress.type.render));
        }
        for (; workInProgress;) if ("number" === typeOfJS(workInProgress.tag)) {
          fiber = workInProgress;
          workInProgress = fiber._debugOwner;
          debugStack = fiber._debugStack;
          if (workInProgress && debugStack) {
            formattedStack = __ST.formatOwnerStack(debugStack);
            "" !== formattedStack && (info += __cat("\n", formattedStack));
          }
        } else if (workInProgress.debugStack !== undefined) {
          ownerStack = workInProgress.debugStack;
          (workInProgress = workInProgress.owner) && ownerStack && (info += __cat("\n", __ST.formatOwnerStack(ownerStack)));
        } else break;
        JSCompiler_inline_result = info;
      } catch (x) {
        JSCompiler_inline_result = __cat(__cat(__cat("\nError generating stack: ", x.message), "\n"), x.stack);
      }
      return JSCompiler_inline_result;
    }(...__args);
  };
  __ST.describeDiff = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (rootNode) {
      try {
        return __cat("\n\n", __ST.describeNode(rootNode, 0));
      } catch (x) {
        return "";
      }
    }(...__args);
  };
  __ST.describeNode = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (_node2, indent) {
      let skipToNode, debugInfo, i, serverComponentName, maxLength, content, propValue, propName;
      skipToNode = __ST.findNotableNode(_node2, indent);
      if (skipToNode !== _node2 && (1 !== __len(_node2.children) || _node2.children[0] !== skipToNode)) return __cat(__cat(__ST.indentation(indent), "...\n"), __ST.describeNode(skipToNode, __cat(indent, 1)));
      skipToNode = "";
      debugInfo = _node2.fiber._debugInfo;
      if (debugInfo) for (i = 0; i < __len(debugInfo); i++) {
        serverComponentName = debugInfo[i].name;
        "string" === typeOfJS(serverComponentName) && (skipToNode += __cat(__cat(__cat(__ST.indentation(indent), "<"), serverComponentName), ">\n"), indent++);
      }
      debugInfo = "";
      i = _node2.fiber.pendingProps;
      if (6 === _node2.fiber.tag) debugInfo = __ST.describeTextDiff(i, _node2.serverProps, indent), indent++;else if (serverComponentName = __ST.describeFiberType(_node2.fiber), undefined !== serverComponentName) if (void 0 === _node2.serverProps) {
        debugInfo = indent;
        maxLength = 120 - 2 * debugInfo - __len(serverComponentName) - 2;
        content = "";
        for (const __k of Object.keys(i)) {
          propName = __k;
          if (Object.hasOwnProperty(i, propName) && "children" !== propName) {
            propValue = __ST.describePropValue(i[propName], 15);
            maxLength -= __cat(__cat(__len(propName), __len(propValue)), 2);
            if (0 > maxLength) {
              content += " ...";
              break;
            }
            content += __cat(__cat(__cat(" ", propName), "="), propValue);
          }
        }
        debugInfo = __cat(__cat(__cat(__cat(__ST.indentation(debugInfo), "<"), serverComponentName), content), ">\n");
        indent++;
      } else undefined === _node2.serverProps ? (debugInfo = __ST.describeExpandedElement(serverComponentName, i, __ST.added(indent)), indent++) : "string" === typeOfJS(_node2.serverProps) ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (debugInfo = __ST.describeElementDiff(serverComponentName, i, _node2.serverProps, indent), indent++);
      propName = "";
      i = _node2.fiber.child;
      for (serverComponentName = 0; i && serverComponentName < __len(_node2.children);) maxLength = _node2.children[serverComponentName], maxLength.fiber === i ? (propName += __ST.describeNode(maxLength, indent), serverComponentName++) : propName += __ST.describeSiblingFiber(i, indent), i = i.sibling;
      i && 0 < __len(_node2.children) && (propName += __cat(__ST.indentation(indent), "...\n"));
      i = _node2.serverTail;
      undefined === _node2.serverProps && indent--;
      for (let _node2 = 0; _node2 < __len(i); _node2++) serverComponentName = i[_node2], propName = "string" === typeOfJS(serverComponentName) ? __cat(propName, __cat(__cat(__ST.removed(indent), __ST.describeTextNode(serverComponentName, 120 - 2 * indent)), "\n")) : __cat(propName, __ST.describeExpandedElement(serverComponentName.type, serverComponentName.props, __ST.removed(indent)));
      return __cat(__cat(skipToNode, debugInfo), propName);
    }(...__args);
  };
  __ST.describeSiblingFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, indent) {
      let __type;
      __type = __ST.describeFiberType(fiber);
      if (undefined === __type) {
        __type = "";
        for (fiber = fiber.child; fiber;) __type += __ST.describeSiblingFiber(fiber, indent), fiber = fiber.sibling;
        return __type;
      }
      return __cat(__cat(__cat(__ST.indentation(indent), "<"), __type), ">\n");
    }(...__args);
  };
  __ST.describeElementDiff = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (__type, clientProps, serverProps, indent) {
      let content, serverPropNames, _propName2, maxLength_jscomp_0, serverPropName, propName_jscomp_0, clientPropValue;
      content = "";
      serverPropNames = __new(Map);
      for (const __k of Object.keys(serverProps)) {
        propName_jscomp_0 = __k;
        Object.hasOwnProperty(serverProps, propName_jscomp_0) && serverPropNames.set(__toLowerCase(propName_jscomp_0), propName_jscomp_0);
      }
      if (1 === serverPropNames.size && serverPropNames.has("children")) content += __ST.describeExpandedElement(__type, clientProps, __ST.indentation(indent));else {
        for (const __k of Object.keys(clientProps)) {
          _propName2 = __k;
          if (Object.hasOwnProperty(clientProps, _propName2) && "children" !== _propName2) {
            maxLength_jscomp_0 = 120 - 2 * __cat(indent, 1) - __len(_propName2) - 1;
            serverPropName = serverPropNames.get(__toLowerCase(_propName2));
            if (void 0 !== serverPropName) {
              serverPropNames.delete(__toLowerCase(_propName2));
              propName_jscomp_0 = clientProps[_propName2];
              serverPropName = serverProps[serverPropName];
              clientPropValue = __ST.describePropValue(propName_jscomp_0, maxLength_jscomp_0);
              maxLength_jscomp_0 = __ST.describePropValue(serverPropName, maxLength_jscomp_0);
              "object" === typeOfJS(propName_jscomp_0) && undefined !== propName_jscomp_0 && "object" === typeOfJS(serverPropName) && undefined !== serverPropName && "Object" === __ST.objectName(propName_jscomp_0) && "Object" === __ST.objectName(serverPropName) && (2 < __len(Object.keys(propName_jscomp_0)) || 2 < __len(Object.keys(serverPropName)) || -1 < __indexOf(clientPropValue, "...") || -1 < __indexOf(maxLength_jscomp_0, "...")) ? content += __cat(__cat(__cat(__cat(__cat(__ST.indentation(__cat(indent, 1)), _propName2), "={{\n"), __ST.describePropertiesDiff(propName_jscomp_0, serverPropName, __cat(indent, 2))), __ST.indentation(__cat(indent, 1))), "}}\n") : (content += __cat(__cat(__cat(__cat(__ST.added(__cat(indent, 1)), _propName2), "="), clientPropValue), "\n"), content += __cat(__cat(__cat(__cat(__ST.removed(__cat(indent, 1)), _propName2), "="), maxLength_jscomp_0), "\n"));
            } else content += __cat(__cat(__cat(__cat(__ST.indentation(__cat(indent, 1)), _propName2), "="), __ST.describePropValue(clientProps[_propName2], maxLength_jscomp_0)), "\n");
          }
        }
        __forEach(serverPropNames, function (propName) {
          let maxLength;
          if ("children" !== propName) {
            maxLength = 120 - 2 * __cat(indent, 1) - __len(propName) - 1;
            content += __cat(__cat(__cat(__cat(__ST.removed(__cat(indent, 1)), propName), "="), __ST.describePropValue(serverProps[propName], maxLength)), "\n");
          }
        });
        content = "" === content ? __cat(__cat(__cat(__ST.indentation(indent), "<"), __type), ">\n") : __cat(__cat(__cat(__cat(__cat(__cat(__ST.indentation(indent), "<"), __type), "\n"), content), __ST.indentation(indent)), ">\n");
      }
      __type = serverProps.children;
      clientProps = clientProps.children;
      if ("string" === typeOfJS(__type) || "number" === typeOfJS(__type) || "bigint" === typeOfJS(__type)) {
        serverPropNames = "";
        if ("string" === typeOfJS(clientProps) || "number" === typeOfJS(clientProps) || "bigint" === typeOfJS(clientProps)) serverPropNames = __cat("", clientProps);
        content += __ST.describeTextDiff(serverPropNames, __cat("", __type), __cat(indent, 1));
      } else if ("string" === typeOfJS(clientProps) || "number" === typeOfJS(clientProps) || "bigint" === typeOfJS(clientProps)) content = __type === undefined ? __cat(content, __ST.describeTextDiff(__cat("", clientProps), undefined, __cat(indent, 1))) : __cat(content, __ST.describeTextDiff(__cat("", clientProps), void 0, __cat(indent, 1)));
      return content;
    }(...__args);
  };
  __ST.describePropertiesDiff = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (clientObject, serverObject, indent) {
      let properties, remainingServerProperties, propName, maxLength, clientPropValue, _propName;
      properties = "";
      remainingServerProperties = __ST.assign({}, serverObject);
      for (const __k of Object.keys(clientObject)) {
        propName = __k;
        if (Object.hasOwnProperty(clientObject, propName)) {
          delete remainingServerProperties[propName];
          maxLength = 120 - 2 * indent - __len(propName) - 2;
          clientPropValue = __ST.describeValue(clientObject[propName], maxLength);
          Object.hasOwnProperty(serverObject, propName) ? (maxLength = __ST.describeValue(serverObject[propName], maxLength), properties += __cat(__cat(__cat(__cat(__ST.added(indent), propName), ": "), clientPropValue), "\n"), properties += __cat(__cat(__cat(__cat(__ST.removed(indent), propName), ": "), maxLength), "\n")) : properties += __cat(__cat(__cat(__cat(__ST.added(indent), propName), ": "), clientPropValue), "\n");
        }
      }
      for (const __k of Object.keys(remainingServerProperties)) {
        _propName = __k;
        Object.hasOwnProperty(remainingServerProperties, _propName) && (clientObject = __ST.describeValue(remainingServerProperties[_propName], 120 - 2 * indent - __len(_propName) - 2), properties += __cat(__cat(__cat(__cat(__ST.removed(indent), _propName), ": "), clientObject), "\n"));
      }
      return properties;
    }(...__args);
  };
  __ST.describeExpandedElement = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (__type, props, rowPrefix) {
      let remainingRowLength, properties, propName, propValue;
      remainingRowLength = 120 - __len(rowPrefix) - __len(__type);
      properties = __arrNew();
      for (const __k of Object.keys(props)) {
        propName = __k;
        if (Object.hasOwnProperty(props, propName) && "children" !== propName) {
          propValue = __ST.describePropValue(props[propName], 120 - __len(rowPrefix) - __len(propName) - 1);
          remainingRowLength -= __cat(__cat(__len(propName), __len(propValue)), 2);
          __push(properties, __cat(__cat(propName, "="), propValue));
        }
      }
      return 0 === __len(properties) ? __cat(__cat(__cat(rowPrefix, "<"), __type), ">\n") : 0 < remainingRowLength ? __cat(__cat(__cat(__cat(__cat(rowPrefix, "<"), __type), " "), __join(properties, " ")), ">\n") : __cat(__cat(__cat(__cat(__cat(__cat(__cat(__cat(__cat(rowPrefix, "<"), __type), "\n"), rowPrefix), "  "), __join(properties, __cat(__cat("\n", rowPrefix), "  "))), "\n"), rowPrefix), ">\n");
    }(...__args);
  };
  __ST.describePropValue = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (value, maxLength) {
      return "string" !== typeOfJS(value) || __ST.needsEscaping.test(value) ? __cat(__cat("{", __ST.describeValue(value, maxLength - 2)), "}") : __len(value) > maxLength - 2 ? 5 > maxLength ? '"..."' : __cat(__cat('"', __slice(value, 0, maxLength - 5)), '..."') : __cat(__cat('"', value), '"');
    }(...__args);
  };
  __ST.describeValue = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (value, maxLength) {
      let name, propName, jsonPropName;
      switch (typeOfJS(value)) {
        case "string":
          return value = JSON.stringify(value), __len(value) > maxLength ? 5 > maxLength ? '"..."' : __cat(__slice(value, 0, maxLength - 4), '..."') : value;
        case "object":
          if (undefined === value) return "null";
          if (__ST.isArrayImpl(value)) return "[...]";
          if (value.$$typeof === __ST.REACT_ELEMENT_TYPE) return (maxLength = __ST.getComponentNameFromType(value.type)) ? __cat(__cat("<", maxLength), ">") : "<...>";
          name = __ST.objectName(value);
          if ("Object" === name) {
            name = "";
            maxLength -= 2;
            for (const __k of Object.keys(value)) {
              propName = __k;
              if (Object.hasOwnProperty(value, propName)) {
                jsonPropName = JSON.stringify(propName);
                jsonPropName !== __cat(__cat('"', propName), '"') && (propName = jsonPropName);
                maxLength -= __len(propName) - 2;
                jsonPropName = __ST.describeValue(value[propName], 15 > maxLength ? maxLength : 15);
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
    }(...__args);
  };
  __ST.objectName = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (object) {
      return __replace(__callFn(__protoOf(Object).toString, object), __re("^\\[object (.*)\\]$", ""), function (m, p0) {
        return p0;
      });
    }(...__args);
  };
  __ST.describeTextDiff = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (clientText, serverProps, indent) {
      let maxLength, firstDiff;
      maxLength = 120 - 2 * indent;
      if (undefined === serverProps) return __cat(__cat(__ST.added(indent), __ST.describeTextNode(clientText, maxLength)), "\n");
      if ("string" === typeOfJS(serverProps)) {
        for (firstDiff = 0; firstDiff < __len(serverProps) && firstDiff < __len(clientText) && __charCodeAt(serverProps, firstDiff) === __charCodeAt(clientText, firstDiff); firstDiff++);
        firstDiff > maxLength - 8 && 10 < firstDiff && (clientText = __cat("...", __slice(clientText, firstDiff - 8)), serverProps = __cat("...", __slice(serverProps, firstDiff - 8)));
        return __cat(__cat(__cat(__cat(__cat(__ST.added(indent), __ST.describeTextNode(clientText, maxLength)), "\n"), __ST.removed(indent)), __ST.describeTextNode(serverProps, maxLength)), "\n");
      }
      return __cat(__cat(__ST.indentation(indent), __ST.describeTextNode(clientText, maxLength)), "\n");
    }(...__args);
  };
  __ST.describeTextNode = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (content, maxLength) {
      return __ST.needsEscaping.test(content) ? (content = JSON.stringify(content), __len(content) > maxLength - 2 ? 8 > maxLength ? '{"..."}' : __cat(__cat("{", __slice(content, 0, maxLength - 7)), '..."}') : __cat(__cat("{", content), "}")) : __len(content) > maxLength ? 5 > maxLength ? '{"..."}' : __cat(__slice(content, 0, maxLength - 3), "...") : content;
    }(...__args);
  };
  __ST.describeFiberType = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
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
    }(...__args);
  };
  __ST.removed = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (indent) {
      return __cat("- ", __repeat("  ", indent));
    }(...__args);
  };
  __ST.added = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (indent) {
      return __cat("+ ", __repeat("  ", indent));
    }(...__args);
  };
  __ST.indentation = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (indent) {
      return __cat("  ", __repeat("  ", indent));
    }(...__args);
  };
  __ST.findNotableNode = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (node, indent) {
      return void 0 === node.serverProps && 0 === __len(node.serverTail) && 1 === __len(node.children) && 3 < node.distanceFromLeaf && node.distanceFromLeaf > 15 - indent ? __ST.findNotableNode(node.children[0], indent) : node;
    }(...__args);
  };
  __ST.popHostContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      __ST.contextFiberStackCursor.current === fiber && (__ST.pop(__ST.contextStackCursor, fiber), __ST.pop(__ST.contextFiberStackCursor, fiber));
      __ST.hostTransitionProviderCursor.current === fiber && (__ST.pop(__ST.hostTransitionProviderCursor, fiber), __ST.isPrimaryRenderer ? __ST.HostTransitionContext._currentValue = __ST.NotPendingTransition : __ST.HostTransitionContext._currentValue2 = __ST.NotPendingTransition);
    }(...__args);
  };
  __ST.pushHostContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let context, nextContext;
      undefined !== fiber.memoizedState && __ST.push(__ST.hostTransitionProviderCursor, fiber, fiber);
      context = __ST.requiredContext(__ST.contextStackCursor.current);
      nextContext = __ST.getChildHostContext(context, fiber.type);
      context !== nextContext && (__ST.push(__ST.contextFiberStackCursor, fiber, fiber), __ST.push(__ST.contextStackCursor, nextContext, fiber));
    }(...__args);
  };
  __ST.getHostContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      return __ST.requiredContext(__ST.contextStackCursor.current);
    }(...__args);
  };
  __ST.popHostContainer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      __ST.pop(__ST.contextStackCursor, fiber);
      __ST.pop(__ST.contextFiberStackCursor, fiber);
      __ST.pop(__ST.rootInstanceStackCursor, fiber);
    }(...__args);
  };
  __ST.pushHostContainer = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, nextRootInstance) {
      __ST.push(__ST.rootInstanceStackCursor, nextRootInstance, fiber);
      __ST.push(__ST.contextFiberStackCursor, fiber, fiber);
      __ST.push(__ST.contextStackCursor, undefined, fiber);
      nextRootInstance = __ST.getRootHostContext(nextRootInstance);
      __ST.pop(__ST.contextStackCursor, fiber);
      __ST.push(__ST.contextStackCursor, nextRootInstance, fiber);
    }(...__args);
  };
  __ST.requiredContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (c) {
      undefined === c && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return c;
    }(...__args);
  };
  __ST.warnIfNotHydrating = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.isHydrating || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }(...__args);
  };
  __ST.restoreSuspendedTreeContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, suspendedContext) {
      __ST.warnIfNotHydrating();
      __ST.idStack[__ST.idStackIndex++] = __ST.treeContextId;
      __ST.idStack[__ST.idStackIndex++] = __ST.treeContextOverflow;
      __ST.idStack[__ST.idStackIndex++] = __ST.treeContextProvider;
      __ST.treeContextId = suspendedContext.id;
      __ST.treeContextOverflow = suspendedContext.overflow;
      __ST.treeContextProvider = workInProgress;
    }(...__args);
  };
  __ST.getSuspendedTreeContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      __ST.warnIfNotHydrating();
      return undefined !== __ST.treeContextProvider ? {
        id: __ST.treeContextId,
        overflow: __ST.treeContextOverflow
      } : undefined;
    }(...__args);
  };
  __ST.popTreeContext = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress) {
      for (; workInProgress === __ST.treeForkProvider;) __ST.treeForkProvider = __ST.forkStack[--__ST.forkStackIndex], __ST.forkStack[__ST.forkStackIndex] = undefined, __ST.treeForkCount = __ST.forkStack[--__ST.forkStackIndex], __ST.forkStack[__ST.forkStackIndex] = undefined;
      for (; workInProgress === __ST.treeContextProvider;) __ST.treeContextProvider = __ST.idStack[--__ST.idStackIndex], __ST.idStack[__ST.idStackIndex] = undefined, __ST.treeContextOverflow = __ST.idStack[--__ST.idStackIndex], __ST.idStack[__ST.idStackIndex] = undefined, __ST.treeContextId = __ST.idStack[--__ST.idStackIndex], __ST.idStack[__ST.idStackIndex] = undefined;
    }(...__args);
  };
  __ST.pushMaterializedTreeId = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress) {
      __ST.warnIfNotHydrating();
      undefined !== workInProgress.return && (__ST.pushTreeFork(workInProgress, 1), __ST.pushTreeId(workInProgress, 1, 0));
    }(...__args);
  };
  __ST.pushTreeId = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, totalChildren, index) {
      let baseIdWithLeadingBit, baseLength, length, numberOfOverflowBits;
      __ST.warnIfNotHydrating();
      __ST.idStack[__ST.idStackIndex++] = __ST.treeContextId;
      __ST.idStack[__ST.idStackIndex++] = __ST.treeContextOverflow;
      __ST.idStack[__ST.idStackIndex++] = __ST.treeContextProvider;
      __ST.treeContextProvider = workInProgress;
      baseIdWithLeadingBit = __ST.treeContextId;
      workInProgress = __ST.treeContextOverflow;
      baseLength = 32 - __ST.clz32(baseIdWithLeadingBit) - 1;
      baseIdWithLeadingBit &= ~(1 << baseLength);
      index += 1;
      length = __cat(32 - __ST.clz32(totalChildren), baseLength);
      if (30 < length) {
        numberOfOverflowBits = baseLength - baseLength % 5;
        length = __numToBase(baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1, 32);
        baseIdWithLeadingBit >>= numberOfOverflowBits;
        baseLength -= numberOfOverflowBits;
        __ST.treeContextId = 1 << __cat(32 - __ST.clz32(totalChildren), baseLength) | index << baseLength | baseIdWithLeadingBit;
        __ST.treeContextOverflow = __cat(length, workInProgress);
      } else __ST.treeContextId = 1 << length | index << baseLength | baseIdWithLeadingBit, __ST.treeContextOverflow = workInProgress;
    }(...__args);
  };
  __ST.pushTreeFork = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress, totalChildren) {
      __ST.warnIfNotHydrating();
      __ST.forkStack[__ST.forkStackIndex++] = __ST.treeForkCount;
      __ST.forkStack[__ST.forkStackIndex++] = __ST.treeForkProvider;
      __ST.treeForkProvider = workInProgress;
      __ST.treeForkCount = totalChildren;
    }(...__args);
  };
  __ST.createCapturedValueAtFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (value, source) {
      let existing;
      if ("object" === typeOfJS(value) && undefined !== value) {
        existing = __ST.CapturedStacks.get(value);
        if (void 0 !== existing) return existing;
        source = {
          value: value,
          source: source,
          stack: __ST.getStackByFiberInDevAndProd(source)
        };
        __ST.CapturedStacks.set(value, source);
        return source;
      }
      return {
        value: value,
        source: source,
        stack: __ST.getStackByFiberInDevAndProd(source)
      };
    }(...__args);
  };
  __ST.describeFunctionComponentFrameWithoutLineNumber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fn) {
      return (fn = fn ? fn.displayName || fn.name : "") ? __ST.describeBuiltInComponentFrame(fn) : "";
    }(...__args);
  };
  __ST.getStackByFiberInDevAndProd = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (workInProgress) {
      let info, previous, debugInfo, i, entry, JSCompiler_temp_const, name, env, location, childStack, idx, lastLine, JSCompiler_inline_result;
      try {
        info = "";
        previous = undefined;
        do {
          info += __ST.describeFiber(workInProgress, previous);
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
                      childStack = __ST.formatOwnerStack(location);
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
                    JSCompiler_inline_result = __ST.describeBuiltInComponentFrame(__cat(name, env ? __cat(__cat(" [", env), "]") : ""));
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
    }(...__args);
  };
  __ST.describeFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, childFiber) {
      switch (fiber.tag) {
        case 26:
        case 27:
        case 5:
          return __ST.describeBuiltInComponentFrame(fiber.type);
        case 16:
          return __ST.describeBuiltInComponentFrame("Lazy");
        case 13:
          return fiber.child !== childFiber && undefined !== childFiber ? __ST.describeBuiltInComponentFrame("Suspense Fallback") : __ST.describeBuiltInComponentFrame("Suspense");
        case 19:
          return __ST.describeBuiltInComponentFrame("SuspenseList");
        case 0:
        case 15:
          return __ST.describeNativeComponentFrame(fiber.type, !1);
        case 11:
          return __ST.describeNativeComponentFrame(fiber.type.render, !1);
        case 1:
          return __ST.describeNativeComponentFrame(fiber.type, !0);
        case 31:
          return __ST.describeBuiltInComponentFrame("Activity");
        default:
          return "";
      }
    }(...__args);
  };
  __ST.describeNativeComponentFrame = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fn, construct) {
      let frame, previousDispatcher, RunInRootFrame, namePropDescriptor, _RunInRootFrame_Deter, sampleStack, controlStack, sampleLines, controlLines, _frame;
      if (!fn || __ST.reentry) return "";
      frame = __ST.componentFrameCache.get(fn);
      if (void 0 !== frame) return frame;
      __ST.reentry = !0;
      frame = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      previousDispatcher = undefined;
      previousDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = undefined;
      __ST.disableLogs();
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
                "function" === typeOfJS(fn) && __ST.componentFrameCache.set(fn, _frame);
                return _frame;
              } while (1 <= namePropDescriptor && 0 <= _RunInRootFrame_Deter);
            }
            break;
          }
        }
      } finally {
        __ST.reentry = !1, __ST.ReactSharedInternals.H = previousDispatcher, __ST.reenableLogs(), Error.prepareStackTrace = frame;
      }
      sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "") ? __ST.describeBuiltInComponentFrame(sampleLines) : "";
      "function" === typeOfJS(fn) && __ST.componentFrameCache.set(fn, sampleLines);
      return sampleLines;
    }(...__args);
  };
  __ST.describeBuiltInComponentFrame = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (name) {
      let match;
      if (void 0 === __ST.prefix) try {
        throw Error();
      } catch (x) {
        match = __match(__trim(x.stack), __re("\\n( *(at )?)", ""));
        __ST.prefix = match && match[1] || "";
        __ST.suffix = -1 < __indexOf(x.stack, "\n    at") ? " (<anonymous>)" : -1 < __indexOf(x.stack, "@") ? "@unknown:0:0" : "";
      }
      return __cat(__cat(__cat("\n", __ST.prefix), name), __ST.suffix);
    }(...__args);
  };
  __ST.formatOwnerStack = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (__error) {
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
    }(...__args);
  };
  __ST.reenableLogs = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let props;
      __ST.disabledDepth--;
      if (0 === __ST.disabledDepth) {
        props = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: __ST.assign({}, props, {
            value: __ST.prevLog
          }),
          info: __ST.assign({}, props, {
            value: __ST.prevInfo
          }),
          warn: __ST.assign({}, props, {
            value: __ST.prevWarn
          }),
          error: __ST.assign({}, props, {
            value: __ST.prevError
          }),
          group: __ST.assign({}, props, {
            value: __ST.prevGroup
          }),
          groupCollapsed: __ST.assign({}, props, {
            value: __ST.prevGroupCollapsed
          }),
          groupEnd: __ST.assign({}, props, {
            value: __ST.prevGroupEnd
          })
        });
      }
      0 > __ST.disabledDepth && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }(...__args);
  };
  __ST.disableLogs = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let props;
      if (0 === __ST.disabledDepth) {
        __ST.prevLog = console.log;
        __ST.prevInfo = console.info;
        __ST.prevWarn = console.warn;
        __ST.prevError = console.error;
        __ST.prevGroup = console.group;
        __ST.prevGroupCollapsed = console.groupCollapsed;
        __ST.prevGroupEnd = console.groupEnd;
        props = {
          configurable: !0,
          enumerable: !0,
          value: __ST.disabledLog,
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
      __ST.disabledDepth++;
    }(...__args);
  };
  __ST.disabledLog = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {}(...__args);
  };
  __ST.logCommitErrored = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (startTime, endTime, errors, passive, debugTask) {
      let properties, i, __error;
      if (__ST.supportsUserTiming && !(endTime <= startTime)) {
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
              track: __ST.currentTrack,
              trackGroup: "Scheduler \u269b",
              tooltipText: passive ? "Remaining Effects Errored" : "Commit Errored",
              properties: properties
            }
          }
        };
        debugTask ? debugTask.run(__partial((..._bindArgs11) => __applyFn(performance.measure, ..._bindArgs11), performance, "Errored", startTime)) : performance.measure("Errored", startTime);
      }
    }(...__args);
  };
  __ST.logSuspendedCommitPhase = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (startTime, endTime, reason, debugTask) {
      !__ST.supportsUserTiming || endTime <= startTime || (debugTask ? debugTask.run(__partial((..._bindArgs10) => __applyFn(console.timeStamp, ..._bindArgs10), console, reason, startTime, endTime, __ST.currentTrack, "Scheduler \u269b", "secondary-light")) : console.timeStamp(reason, startTime, endTime, __ST.currentTrack, "Scheduler \u269b", "secondary-light"));
    }(...__args);
  };
  __ST.logErroredRenderPhase = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (startTime, endTime, lanes, debugTask) {
      !__ST.supportsUserTiming || endTime <= startTime || (debugTask ? debugTask.run(__partial((..._bindArgs1) => __applyFn(console.timeStamp, ..._bindArgs1), console, "Errored", startTime, endTime, __ST.currentTrack, "Scheduler \u269b", "error")) : console.timeStamp("Errored", startTime, endTime, __ST.currentTrack, "Scheduler \u269b", "error"));
    }(...__args);
  };
  __ST.logRecoveredRenderPhase = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (startTime, endTime, lanes, recoverableErrors, hydrationFailed, debugTask) {
      let i, __error;
      if (__ST.supportsUserTiming && !(endTime <= startTime)) {
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
              track: __ST.currentTrack,
              trackGroup: "Scheduler \u269b",
              tooltipText: hydrationFailed ? "Hydration Failed" : "Recovered after Error",
              properties: lanes
            }
          }
        };
        debugTask ? debugTask.run(__partial((..._bindArgs0) => __applyFn(performance.measure, ..._bindArgs0), performance, "Recovered", startTime)) : performance.measure("Recovered", startTime);
      }
    }(...__args);
  };
  __ST.logSuspendedWithDelayPhase = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (startTime, endTime, lanes, debugTask) {
      !__ST.supportsUserTiming || endTime <= startTime || (lanes = (lanes & 738197653) === lanes ? "tertiary-dark" : "primary-dark", debugTask ? debugTask.run(__partial((..._bindArgs9) => __applyFn(console.timeStamp, ..._bindArgs9), console, "Suspended", startTime, endTime, __ST.currentTrack, "Scheduler \u269b", lanes)) : console.timeStamp("Suspended", startTime, endTime, __ST.currentTrack, "Scheduler \u269b", lanes));
    }(...__args);
  };
  __ST.logSuspendedRenderPhase = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (startTime, endTime, lanes, debugTask) {
      !__ST.supportsUserTiming || endTime <= startTime || (lanes = (lanes & 738197653) === lanes ? "tertiary-dark" : "primary-dark", debugTask ? debugTask.run(__partial((..._bindArgs8) => __applyFn(console.timeStamp, ..._bindArgs8), console, "Prewarm", startTime, endTime, __ST.currentTrack, "Scheduler \u269b", lanes)) : console.timeStamp("Prewarm", startTime, endTime, __ST.currentTrack, "Scheduler \u269b", lanes));
    }(...__args);
  };
  __ST.logRenderPhase = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (startTime, endTime, lanes, debugTask) {
      let color;
      if (__ST.supportsUserTiming && !(endTime <= startTime)) {
        color = (lanes & 738197653) === lanes ? "tertiary-dark" : "primary-dark";
        lanes = (lanes & 536870912) === lanes ? "Prepared" : (lanes & 201326741) === lanes ? "Hydrated" : "Render";
        debugTask ? debugTask.run(__partial((..._bindArgs7) => __applyFn(console.timeStamp, ..._bindArgs7), console, lanes, startTime, endTime, __ST.currentTrack, "Scheduler \u269b", color)) : console.timeStamp(lanes, startTime, endTime, __ST.currentTrack, "Scheduler \u269b", color);
      }
    }(...__args);
  };
  __ST.logComponentEffect = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, startTime, endTime, selfTime, errors) {
      let name, i, __error;
      if (undefined !== errors) {
        if (__ST.supportsUserTiming) {
          name = __ST.getComponentNameFromFiber(fiber);
          if (undefined !== name) {
            selfTime = __arrNew();
            for (i = 0; i < __len(errors); i++) {
              __error = errors[i].value;
              __push(selfTime, __arrNew("Error", "object" === typeOfJS(__error) && undefined !== __error && "string" === typeOfJS(__error.message) ? String(__error.message) : String(__error)));
            }
            undefined !== fiber.key && __ST.addValueToProperties("key", fiber.key, selfTime, 0, "");
            undefined !== fiber.memoizedProps && __ST.addObjectToProperties(fiber.memoizedProps, selfTime, 0, "");
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
      } else name = __ST.getComponentNameFromFiber(fiber), undefined !== name && __ST.supportsUserTiming && (errors = 1 > selfTime ? "secondary-light" : 100 > selfTime ? "secondary" : 500 > selfTime ? "secondary-dark" : "error", (fiber = fiber._debugTask) ? fiber.run(__partial((..._bindArgs6) => __applyFn(console.timeStamp, ..._bindArgs6), console, name, startTime, endTime, "Components \u269b", void 0, errors)) : console.timeStamp(name, startTime, endTime, "Components \u269b", void 0, errors));
    }(...__args);
  };
  __ST.logComponentErrored = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, startTime, endTime, errors) {
      let name, debugTask, properties, i, capturedValue;
      if (__ST.supportsUserTiming) {
        name = __ST.getComponentNameFromFiber(fiber);
        if (undefined !== name) {
          for (debugTask = undefined, properties = __arrNew(), i = 0; i < __len(errors); i++) {
            capturedValue = errors[i];
            debugTask === undefined && undefined !== capturedValue.source && (debugTask = capturedValue.source._debugTask);
            capturedValue = capturedValue.value;
            __push(properties, __arrNew("Error", "object" === typeOfJS(capturedValue) && undefined !== capturedValue && "string" === typeOfJS(capturedValue.message) ? String(capturedValue.message) : String(capturedValue)));
          }
          undefined !== fiber.key && __ST.addValueToProperties("key", fiber.key, properties, 0, "");
          undefined !== fiber.memoizedProps && __ST.addObjectToProperties(fiber.memoizedProps, properties, 0, "");
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
    }(...__args);
  };
  __ST.logComponentRender = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, startTime, endTime, wasHydrated, committedLanes) {
      let name, alternate, selfTime, child, props;
      name = __ST.getComponentNameFromFiber(fiber);
      if (undefined !== name && __ST.supportsUserTiming) {
        alternate = fiber.alternate;
        selfTime = fiber.actualDuration;
        if (undefined === alternate || alternate.child !== fiber.child) for (child = fiber.child; undefined !== child; child = child.sibling) selfTime -= child.actualDuration;
        wasHydrated = 0.5 > selfTime ? wasHydrated ? "tertiary-light" : "primary-light" : 10 > selfTime ? wasHydrated ? "tertiary" : "primary" : 100 > selfTime ? wasHydrated ? "tertiary-dark" : "primary-dark" : "error";
        props = fiber.memoizedProps;
        selfTime = fiber._debugTask;
        undefined !== props && undefined !== alternate && alternate.memoizedProps !== props ? (child = __arrNew(__ST.resuableChangedPropsEntry), props = __ST.addObjectDiffToProperties(alternate.memoizedProps, props, child, 0), 1 < __len(child) && (props && !__ST.alreadyWarnedForDeepEquality && 0 === (alternate.lanes & committedLanes) && 100 < fiber.actualDuration ? (__ST.alreadyWarnedForDeepEquality = !0, child[0] = __ST.reusableDeeplyEqualPropsEntry, __ST.reusableComponentDevToolDetails.color = "warning", __ST.reusableComponentDevToolDetails.tooltipText = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.") : (__ST.reusableComponentDevToolDetails.color = wasHydrated, __ST.reusableComponentDevToolDetails.tooltipText = name), __ST.reusableComponentDevToolDetails.properties = child, __ST.reusableComponentOptions.start = startTime, __ST.reusableComponentOptions.end = endTime, selfTime !== undefined ? selfTime.run(__partial((..._bindArgs2) => __applyFn(performance.measure, ..._bindArgs2), performance, __cat("\u200b", name), __ST.reusableComponentOptions)) : performance.measure(__cat("\u200b", name), __ST.reusableComponentOptions))) : selfTime !== undefined ? selfTime.run(__partial((..._bindArgs3) => __applyFn(console.timeStamp, ..._bindArgs3), console, name, startTime, endTime, "Components \u269b", void 0, wasHydrated)) : console.timeStamp(name, startTime, endTime, "Components \u269b", void 0, wasHydrated);
      }
    }(...__args);
  };
  __ST.logComponentReappeared = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, startTime, endTime) {
      __ST.logComponentTrigger(fiber, startTime, endTime, "Reconnect");
    }(...__args);
  };
  __ST.logComponentTrigger = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, startTime, endTime, trigger) {
      __ST.supportsUserTiming && (__ST.reusableComponentOptions.start = startTime, __ST.reusableComponentOptions.end = endTime, __ST.reusableComponentDevToolDetails.color = "warning", __ST.reusableComponentDevToolDetails.tooltipText = trigger, __ST.reusableComponentDevToolDetails.properties = undefined, (fiber = fiber._debugTask) ? fiber.run(__partial((..._bindArgs) => __applyFn(performance.measure, ..._bindArgs), performance, trigger, __ST.reusableComponentOptions)) : performance.measure(trigger, __ST.reusableComponentOptions));
    }(...__args);
  };
  __ST.setCurrentTrackFromLanes = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (lanes) {
      __ST.currentTrack = lanes & 63 ? "Blocking" : lanes & 64 ? "Gesture" : lanes & 4194176 ? "Transition" : lanes & 62914560 ? "Suspense" : lanes & 2080374784 ? "Idle" : "Other";
    }(...__args);
  };
  __ST.addObjectDiffToProperties = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (prev, __next, properties, indent) {
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
                if (nextValue.$$typeof === __ST.REACT_ELEMENT_TYPE) {
                  if (key.type === nextValue.type && key.key === nextValue.key) {
                    key = __ST.getComponentNameFromType(nextValue.type) || "\u2026";
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
                    __ST.addObjectDiffToProperties(key, nextValue, properties, __cat(indent, 1)) ? nextKind === __len(properties) && (prevKind[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : isDeeplyEqual = !1;
                    continue;
                  }
                }
              } else if ("function" === typeOfJS(key) && "function" === typeOfJS(nextValue) && key.name === nextValue.name && __len(key) === __len(nextValue) && (prevKind = __callFn(__protoOf(Function).toString, key), nextKind = __callFn(__protoOf(Function).toString, nextValue), prevKind === nextKind)) {
                key = "" === nextValue.name ? "() => {}" : __cat(nextValue.name, "() {}");
                __push(properties, __arrNew(__cat(__cat("\u2007\u00a0", __repeat("\u00a0\u00a0", indent)), _key), __cat(key, " Referentially unequal function closure. Consider memoization.")));
                continue;
              }
              __ST.addValueToProperties(_key, key, properties, indent, "\u2013\u00a0");
              __ST.addValueToProperties(_key, nextValue, properties, indent, "+\u00a0");
            }
            isDeeplyEqual = !1;
          }
        } else __push(properties, __arrNew(__cat(__cat("+\u00a0", __repeat("\u00a0\u00a0", indent)), _key), "\u2026")), isDeeplyEqual = !1;
      }
      return isDeeplyEqual;
    }(...__args);
  };
  __ST.addValueToProperties = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (_propertyName, value, properties, indent, prefix) {
      let typeName, key, propsKeys, propsLength, propKey;
      switch (typeOfJS(value)) {
        case "object":
          if (undefined === value) {
            value = "null";
            break;
          } else {
            if (value.$$typeof === __ST.REACT_ELEMENT_TYPE) {
              typeName = __ST.getComponentNameFromType(value.type) || "\u2026";
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
              undefined !== key && __ST.addValueToProperties("key", key, properties, __cat(indent, 1), prefix);
              _propertyName = !1;
              for (const __k of Object.keys(value)) {
                propKey = __k;
                "children" === propKey ? value.children !== undefined && (!__ST.isArrayImpl(value.children) || 0 < __len(value.children)) && (_propertyName = !0) : __callFn(__ST.hasOwnProperty, value, propKey) && "_" !== propKey[0] && __ST.addValueToProperties(propKey, value[propKey], properties, __cat(indent, 1), prefix);
              }
              __push(properties, __arrNew("", _propertyName ? __cat(__cat(">\u2026</", typeName), ">") : "/>"));
              return;
            }
            typeName = __callFn(__protoOf(Object).toString, value);
            typeName = __slice(typeName, 8, __len(typeName) - 1);
            if ("Array" === typeName) if (propKey = __ST.getArrayKind(value), 2 === propKey || 0 === propKey) {
              value = JSON.stringify(value);
              break;
            } else if (3 === propKey) {
              __push(properties, __arrNew(__cat(__cat(prefix, __repeat("\u00a0\u00a0", indent)), _propertyName), ""));
              for (let _propertyName = 0; _propertyName < __len(value); _propertyName++) typeName = value[_propertyName], __ST.addValueToProperties(typeName[0], typeName[1], properties, __cat(indent, 1), prefix);
              return;
            }
            if ("Promise" === typeName) {
              if ("fulfilled" === value.status) {
                if (typeName = __len(properties), __ST.addValueToProperties(_propertyName, value.value, properties, indent, prefix), __len(properties) > typeName) {
                  properties = properties[typeName];
                  properties[1] = __cat(__cat("Promise<", properties[1] || "Object"), ">");
                  return;
                }
              } else if ("rejected" === value.status && (typeName = __len(properties), __ST.addValueToProperties(_propertyName, value.reason, properties, indent, prefix), __len(properties) > typeName)) {
                properties = properties[typeName];
                properties[1] = __cat(__cat("Rejected Promise<", properties[1]), ">");
                return;
              }
              __push(properties, __arrNew(__cat(__repeat("\u00a0\u00a0", indent), _propertyName), "Promise"));
              return;
            }
            "Object" === typeName && (propKey = Object.getPrototypeOf(value)) && "function" === typeOfJS(propKey.constructor) && (typeName = propKey.constructor.name);
            __push(properties, __arrNew(__cat(__cat(prefix, __repeat("\u00a0\u00a0", indent)), _propertyName), "Object" === typeName ? 3 > indent ? "" : "\u2026" : typeName));
            3 > indent && __ST.addObjectToProperties(value, properties, __cat(indent, 1), prefix);
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
    }(...__args);
  };
  __ST.addObjectToProperties = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (object, properties, indent, prefix) {
      let key;
      for (const __k of Object.keys(object)) {
        key = __k;
        __callFn(__ST.hasOwnProperty, object, key) && "_" !== key[0] && __ST.addValueToProperties(key, object[key], properties, indent, prefix);
      }
    }(...__args);
  };
  __ST.getArrayKind = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (array) {
      let kind, i, value;
      for (kind = 0, i = 0; i < __len(array); i++) {
        value = array[i];
        if ("object" === typeOfJS(value) && undefined !== value) {
          if (__ST.isArrayImpl(value) && 2 === __len(value) && "string" === typeOfJS(value[0])) {
            if (0 !== kind && 3 !== kind) return 1;
            kind = 3;
          } else return 1;
        } else {
          if ("function" === typeOfJS(value) || "string" === typeOfJS(value) && 50 < __len(value) || 0 !== kind && 2 !== kind) return 1;
          kind = 2;
        }
      }
      return kind;
    }(...__args);
  };
  __ST.is = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }(...__args);
  };
  __ST.setIsStrictModeForDevtools = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (newIsStrictMode) {
      "function" === typeOfJS(__ST.log) && __ST.unstable_setDisableYieldValue(newIsStrictMode);
      if (__ST.injectedHook && "function" === typeOfJS(__ST.injectedHook.setStrictMode)) try {
        __ST.injectedHook.setStrictMode(__ST.rendererID, newIsStrictMode);
      } catch (err) {
        __ST.hasLoggedError || (__ST.hasLoggedError = !0, console.error("React instrumentation encountered an error: %o", err));
      }
    }(...__args);
  };
  __ST.injectInternals = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (internals) {
      let hook;
      if ("undefined" === typeOfJS(__REACT_DEVTOOLS_GLOBAL_HOOK__)) return !1;
      hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (hook.isDisabled) return !0;
      if (!hook.supportsFiber) return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"), !0;
      try {
        __ST.rendererID = hook.inject(internals), __ST.injectedHook = hook;
      } catch (err) {
        console.error("React instrumentation encountered an error: %o.", err);
      }
      return hook.checkDCE ? !0 : !1;
    }(...__args);
  };
  __ST.lanesToEventPriority = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (lanes) {
      lanes &= -lanes;
      return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
    }(...__args);
  };
  __ST.movePendingFibersToMemoized = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, lanes) {
      let pendingUpdatersLaneMap, memoizedUpdaters, index;
      if (__ST.isDevToolsPresent) for (pendingUpdatersLaneMap = root.pendingUpdatersLaneMap, memoizedUpdaters = root.memoizedUpdaters; 0 < lanes;) {
        index = 31 - __ST.clz32(lanes);
        root = 1 << index;
        index = pendingUpdatersLaneMap[index];
        0 < index.size && (__forEach(index, function (fiber) {
          let alternate;
          alternate = fiber.alternate;
          undefined !== alternate && memoizedUpdaters.has(alternate) || memoizedUpdaters.add(fiber);
        }), index.clear());
        lanes &= ~root;
      }
    }(...__args);
  };
  __ST.addFiberToLanesMap = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, fiber, lanes) {
      let index, lane;
      if (__ST.isDevToolsPresent) for (root = root.pendingUpdatersLaneMap; 0 < lanes;) {
        index = 31 - __ST.clz32(lanes);
        lane = 1 << index;
        root[index].add(fiber);
        lanes &= ~lane;
      }
    }(...__args);
  };
  __ST.getBumpedLaneForHydrationByLane = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (lane) {
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
    }(...__args);
  };
  __ST.getBumpedLaneForHydration = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, renderLanes) {
      let renderLane;
      renderLane = renderLanes & -renderLanes;
      renderLane = 0 !== (renderLane & 42) ? 1 : __ST.getBumpedLaneForHydrationByLane(renderLane);
      return 0 !== (renderLane & (root.suspendedLanes | renderLanes)) ? 0 : renderLane;
    }(...__args);
  };
  __ST.markRootEntangled = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, entangledLanes) {
      let rootEntangledLanes, index, lane;
      rootEntangledLanes = root.entangledLanes |= entangledLanes;
      for (root = root.entanglements; rootEntangledLanes;) {
        index = 31 - __ST.clz32(rootEntangledLanes);
        lane = 1 << index;
        lane & entangledLanes | root[index] & entangledLanes && (root[index] |= entangledLanes);
        rootEntangledLanes &= ~lane;
      }
    }(...__args);
  };
  __ST.markSpawnedDeferredLane = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, spawnedLane, entangledLanes) {
      let spawnedLaneIndex;
      root.pendingLanes |= spawnedLane;
      root.suspendedLanes &= ~spawnedLane;
      spawnedLaneIndex = 31 - __ST.clz32(spawnedLane);
      root.entangledLanes |= spawnedLane;
      root.entanglements[spawnedLaneIndex] = root.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
    }(...__args);
  };
  __ST.markRootFinished = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
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
        index = 31 - __ST.clz32(remainingLanes);
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
      0 !== spawnedLane && __ST.markSpawnedDeferredLane(root, spawnedLane, 0);
      0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root.tag && (root.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
    }(...__args);
  };
  __ST.markRootUpdated_1 = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, updateLane) {
      root.pendingLanes |= updateLane;
      268435456 !== updateLane && (root.suspendedLanes = 0, root.pingedLanes = 0, root.warmLanes = 0);
    }(...__args);
  };
  __ST.createLaneMap = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (initial) {
      let laneMap, i;
      for (laneMap = __arrNew(), i = 0; 31 > i; i++) __push(laneMap, initial);
      return laneMap;
    }(...__args);
  };
  __ST.claimNextRetryLane = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      let lane;
      lane = __ST.nextRetryLane;
      __ST.nextRetryLane <<= 1;
      0 === (__ST.nextRetryLane & 62914560) && (__ST.nextRetryLane = 4194304);
      return lane;
    }(...__args);
  };
  __ST.computeExpirationTime = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (lane, currentTime) {
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
    }(...__args);
  };
  __ST.checkIfRootIsPrerendering = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, renderLanes) {
      return 0 === (root.pendingLanes & ~(root.suspendedLanes & ~root.pingedLanes) & renderLanes);
    }(...__args);
  };
  __ST.getNextLanes = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, wipLanes, rootHasPendingCommit) {
      let pendingLanes, nextLanes, suspendedLanes, pingedLanes, nonIdlePendingLanes;
      pendingLanes = root.pendingLanes;
      if (0 === pendingLanes) return 0;
      nextLanes = 0;
      suspendedLanes = root.suspendedLanes;
      pingedLanes = root.pingedLanes;
      root = root.warmLanes;
      nonIdlePendingLanes = pendingLanes & 134217727;
      0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = __ST.getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = __ST.getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = __ST.getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = __ST.getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = __ST.getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = __ST.getHighestPriorityLanes(rootHasPendingCommit))));
      return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
    }(...__args);
  };
  __ST.getHighestPriorityLanes = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (lanes) {
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
    }(...__args);
  };
  __ST.clz32Fallback = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (x) {
      x >>>= 0;
      return 0 === x ? 32 : 31 - (__ST.log_1(x) / __ST.LN2 | 0) | 0;
    }(...__args);
  };
  __ST.push = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (cursor, value, fiber) {
      __ST.index_jscomp_0++;
      __ST.valueStack[__ST.index_jscomp_0] = cursor.current;
      __ST.fiberStack[__ST.index_jscomp_0] = fiber;
      cursor.current = value;
    }(...__args);
  };
  __ST.pop = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (cursor, fiber) {
      0 > __ST.index_jscomp_0 ? console.error("Unexpected pop.") : (fiber !== __ST.fiberStack[__ST.index_jscomp_0] && console.error("Unexpected Fiber popped."), cursor.current = __ST.valueStack[__ST.index_jscomp_0], __ST.valueStack[__ST.index_jscomp_0] = undefined, __ST.fiberStack[__ST.index_jscomp_0] = undefined, __ST.index_jscomp_0--);
    }(...__args);
  };
  __ST.createCursor = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (defaultValue) {
      return {
        current: defaultValue
      };
    }(...__args);
  };
  __ST.getComponentNameFromFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
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
          return __ST.getComponentNameFromType(__type);
        case 8:
          return __type === __ST.REACT_STRICT_MODE_TYPE ? "StrictMode" : "Mode";
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
          if (undefined !== fiber.return) return __ST.getComponentNameFromFiber(fiber.return);
      }
      return undefined;
    }(...__args);
  };
  __ST.getComponentNameFromType = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (__type) {
      let innerType;
      if (__type === undefined) return undefined;
      if ("function" === typeOfJS(__type)) return __type.$$typeof === __ST.REACT_CLIENT_REFERENCE ? undefined : __type.displayName || __type.name || undefined;
      if ("string" === typeOfJS(__type)) return __type;
      switch (__type) {
        case __ST.REACT_FRAGMENT_TYPE:
          return "Fragment";
        case __ST.REACT_PROFILER_TYPE:
          return "Profiler";
        case __ST.REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case __ST.REACT_SUSPENSE_TYPE:
          return "Suspense";
        case __ST.REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case __ST.REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeOfJS(__type)) switch ("number" === typeOfJS(__type.tag) && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), __type.$$typeof) {
        case __ST.REACT_PORTAL_TYPE:
          return "Portal";
        case __ST.REACT_CONTEXT_TYPE:
          return __type.displayName || "Context";
        case __ST.REACT_CONSUMER_TYPE:
          return __cat(__type._context.displayName || "Context", ".Consumer");
        case __ST.REACT_FORWARD_REF_TYPE:
          innerType = __type.render;
          __type = __type.displayName;
          __type || (__type = innerType.displayName || innerType.name || "", __type = "" !== __type ? __cat(__cat("ForwardRef(", __type), ")") : "ForwardRef");
          return __type;
        case __ST.REACT_MEMO_TYPE:
          return innerType = __type.displayName || undefined, undefined !== innerType ? innerType : __ST.getComponentNameFromType(__type.type) || "Memo";
        case __ST.REACT_LAZY_TYPE:
          innerType = __type._payload;
          __type = __type._init;
          try {
            return __ST.getComponentNameFromType(__type(innerType));
          } catch (x) {}
      }
      return undefined;
    }(...__args);
  };
  __ST.getIteratorFn = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (maybeIterable) {
      if (undefined === maybeIterable || "object" !== typeOfJS(maybeIterable)) return undefined;
      maybeIterable = __ST.MAYBE_ITERATOR_SYMBOL && maybeIterable[__ST.MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeOfJS(maybeIterable) ? maybeIterable : undefined;
    }(...__args);
  };
  __ST.findCurrentHostFiberWithNoPortalsImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (node) {
      let tag;
      tag = node.tag;
      if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
      for (node = node.child; undefined !== node;) {
        if (4 !== node.tag && (tag = __ST.findCurrentHostFiberWithNoPortalsImpl(node), undefined !== tag)) return tag;
        node = node.sibling;
      }
      return undefined;
    }(...__args);
  };
  __ST.findCurrentHostFiberImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (node) {
      let tag;
      tag = node.tag;
      if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
      for (node = node.child; undefined !== node;) {
        tag = __ST.findCurrentHostFiberImpl(node);
        if (undefined !== tag) return tag;
        node = node.sibling;
      }
      return undefined;
    }(...__args);
  };
  __ST.findCurrentHostFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (parent) {
      parent = __ST.findCurrentFiberUsingSlowPath(parent);
      return undefined !== parent ? __ST.findCurrentHostFiberImpl(parent) : undefined;
    }(...__args);
  };
  __ST.findCurrentFiberUsingSlowPath = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let alternate, a, b, parentA, parentB, didFindChild, _child;
      alternate = fiber.alternate;
      if (!alternate) {
        alternate = __ST.getNearestMountedFiber(fiber);
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
            if (parentB === a) return __ST.assertIsMounted(parentA), fiber;
            if (parentB === b) return __ST.assertIsMounted(parentA), alternate;
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
    }(...__args);
  };
  __ST.assertIsMounted = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      if (__ST.getNearestMountedFiber(fiber) !== fiber) throw Error("Unable to find node on an unmounted component.");
    }(...__args);
  };
  __ST.getNearestMountedFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber) {
      let node, nearestMounted;
      node = fiber;
      nearestMounted = fiber;
      if (fiber.alternate) for (; node.return;) node = node.return;else {
        fiber = node;
        do node = fiber, 0 !== (node.flags & 4098) && (nearestMounted = node.return), fiber = node.return; while (fiber);
      }
      return 3 === node.tag ? nearestMounted : undefined;
    }(...__args);
  };
  __ST.setToSortedString = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (set) {
      let array;
      array = __arrNew();
      __forEach(set, function (value) {
        __push(array, value);
      });
      return __join(__sort(array), ", ");
    }(...__args);
  };
  __ST.warnForMissingKey = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {}(...__args);
  };
  __ST.noop = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {}(...__args);
  };
  __ST.warnInvalidContextAccess = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }(...__args);
  };
  __ST.warnInvalidHookAccess = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks");
    }(...__args);
  };
  __ST.setRefreshHandler = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (handler) {
      __ST.resolveFamily = handler;
    }(...__args);
  };
  __ST.scheduleRefresh = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, update) {
      let staleFamilies;
      if (undefined !== __ST.resolveFamily) {
        staleFamilies = update.staleFamilies;
        update = update.updatedFamilies;
        __ST.flushPendingEffects();
        __ST.scheduleFibersWithFamiliesRecursively(root.current, update, staleFamilies);
        __ST.flushSyncWork();
      }
    }(...__args);
  };
  __ST.scheduleRoot = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (root, element) {
      root.context === __ST.emptyContextObject && (__ST.updateContainerSync(element, root, undefined, undefined), __ST.flushSyncWork());
    }(...__args);
  };
  __ST.createFiber = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (tag, pendingProps, key, mode) {
      return __new(__ST.FiberNode, tag, pendingProps, key, mode);
    }(...__args);
  };
  __ST.shouldErrorImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      return undefined;
    }(...__args);
  };
  __ST.shouldSuspendImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function () {
      return !1;
    }(...__args);
  };
  __ST.copyWithDeleteImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (obj, path, index) {
      let key, updated;
      key = path[index];
      updated = __ST.isArrayImpl(obj) ? __slice(obj) : __ST.assign({}, obj);
      if (__cat(index, 1) === __len(path)) return __ST.isArrayImpl(updated) ? __splice(updated, key, 1) : delete updated[key], updated;
      updated[key] = __ST.copyWithDeleteImpl(obj[key], path, __cat(index, 1));
      return updated;
    }(...__args);
  };
  __ST.copyWithRenameImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (obj, oldPath, newPath, index) {
      let oldKey, updated;
      oldKey = oldPath[index];
      updated = __ST.isArrayImpl(obj) ? __slice(obj) : __ST.assign({}, obj);
      __cat(index, 1) === __len(oldPath) ? (updated[newPath[index]] = updated[oldKey], __ST.isArrayImpl(updated) ? __splice(updated, oldKey, 1) : delete updated[oldKey]) : updated[oldKey] = __ST.copyWithRenameImpl(obj[oldKey], oldPath, newPath, __cat(index, 1));
      return updated;
    }(...__args);
  };
  __ST.copyWithRename = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (obj, oldPath, newPath) {
      let i;
      if (__len(oldPath) !== __len(newPath)) console.warn("copyWithRename() expects paths of the same length");else {
        for (i = 0; i < __len(newPath) - 1; i++) if (oldPath[i] !== newPath[i]) {
          console.warn("copyWithRename() expects paths to be the same except for the deepest key");
          return;
        }
        return __ST.copyWithRenameImpl(obj, oldPath, newPath, 0);
      }
    }(...__args);
  };
  __ST.copyWithSetImpl = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (obj, path, index, value) {
      let key, updated;
      if (index >= __len(path)) return value;
      key = path[index];
      updated = __ST.isArrayImpl(obj) ? __slice(obj) : __ST.assign({}, obj);
      updated[key] = __ST.copyWithSetImpl(obj[key], path, __cat(index, 1), value);
      return updated;
    }(...__args);
  };
  __ST.findHook = function (...__args) {
    if (__args[0] === __ST) {
      __args.shift();
    }
    return function (fiber, id) {
      for (fiber = fiber.memoizedState; undefined !== fiber && 0 < id;) fiber = fiber.next, id--;
      return fiber;
    }(...__args);
  };
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  ;
  __spikeSetST(__ST, "__exports", {});
  "use strict";
  __spikeSetST(__ST, "assign", Object.assign);
  __spikeSetST(__ST, "REACT_LEGACY_ELEMENT_TYPE", Symbol.for("react.element"));
  __spikeSetST(__ST, "REACT_ELEMENT_TYPE", Symbol.for("react.transitional.element"));
  __spikeSetST(__ST, "REACT_PORTAL_TYPE", Symbol.for("react.portal"));
  __spikeSetST(__ST, "REACT_FRAGMENT_TYPE", Symbol.for("react.fragment"));
  __spikeSetST(__ST, "REACT_STRICT_MODE_TYPE", Symbol.for("react.strict_mode"));
  __spikeSetST(__ST, "REACT_PROFILER_TYPE", Symbol.for("react.profiler"));
  __spikeSetST(__ST, "REACT_CONSUMER_TYPE", Symbol.for("react.consumer"));
  __spikeSetST(__ST, "REACT_CONTEXT_TYPE", Symbol.for("react.context"));
  __spikeSetST(__ST, "REACT_FORWARD_REF_TYPE", Symbol.for("react.forward_ref"));
  __spikeSetST(__ST, "REACT_SUSPENSE_TYPE", Symbol.for("react.suspense"));
  __spikeSetST(__ST, "REACT_SUSPENSE_LIST_TYPE", Symbol.for("react.suspense_list"));
  __spikeSetST(__ST, "REACT_MEMO_TYPE", Symbol.for("react.memo"));
  __spikeSetST(__ST, "REACT_LAZY_TYPE", Symbol.for("react.lazy"));
  Symbol.for("react.scope");
  __spikeSetST(__ST, "REACT_ACTIVITY_TYPE", Symbol.for("react.activity"));
  Symbol.for("react.legacy_hidden");
  Symbol.for("react.tracing_marker");
  __spikeSetST(__ST, "REACT_MEMO_CACHE_SENTINEL", Symbol.for("react.memo_cache_sentinel"));
  Symbol.for("react.view_transition");
  __spikeSetST(__ST, "MAYBE_ITERATOR_SYMBOL", Symbol.iterator);
  __spikeSetST(__ST, "REACT_CLIENT_REFERENCE", Symbol.for("react.client.reference"));
  __spikeSetST(__ST, "isArrayImpl", isArray);
  __spikeSetST(__ST, "ReactSharedInternals", React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE);
  __spikeSetST(__ST, "rendererVersion", ___config.rendererVersion);
  __spikeSetST(__ST, "rendererPackageName", ___config.rendererPackageName);
  __spikeSetST(__ST, "extraDevToolsConfig", ___config.extraDevToolsConfig);
  __spikeSetST(__ST, "getPublicInstance", ___config.getPublicInstance);
  __spikeSetST(__ST, "getRootHostContext", ___config.getRootHostContext);
  __spikeSetST(__ST, "getChildHostContext", ___config.getChildHostContext);
  __spikeSetST(__ST, "prepareForCommit", ___config.prepareForCommit);
  __spikeSetST(__ST, "resetAfterCommit", ___config.resetAfterCommit);
  __spikeSetST(__ST, "createInstance", ___config.createInstance);
  ___config.cloneMutableInstance;
  __spikeSetST(__ST, "appendInitialChild", ___config.appendInitialChild);
  __spikeSetST(__ST, "finalizeInitialChildren", ___config.finalizeInitialChildren);
  __spikeSetST(__ST, "shouldSetTextContent", ___config.shouldSetTextContent);
  __spikeSetST(__ST, "createTextInstance", ___config.createTextInstance);
  ___config.cloneMutableTextInstance;
  __spikeSetST(__ST, "scheduleTimeout", ___config.scheduleTimeout);
  __spikeSetST(__ST, "cancelTimeout", ___config.cancelTimeout);
  __spikeSetST(__ST, "noTimeout", ___config.noTimeout);
  __spikeSetST(__ST, "isPrimaryRenderer", ___config.isPrimaryRenderer);
  ___config.warnsIfNotActing;
  __spikeSetST(__ST, "supportsMutation", ___config.supportsMutation);
  __spikeSetST(__ST, "supportsPersistence", ___config.supportsPersistence);
  __spikeSetST(__ST, "supportsHydration", ___config.supportsHydration);
  __spikeSetST(__ST, "getInstanceFromNode", ___config.getInstanceFromNode);
  ___config.beforeActiveInstanceBlur;
  __spikeSetST(__ST, "preparePortalMount", ___config.preparePortalMount);
  ___config.prepareScopeUpdate;
  ___config.getInstanceFromScope;
  __spikeSetST(__ST, "setCurrentUpdatePriority", ___config.setCurrentUpdatePriority);
  __spikeSetST(__ST, "getCurrentUpdatePriority", ___config.getCurrentUpdatePriority);
  __spikeSetST(__ST, "resolveUpdatePriority", ___config.resolveUpdatePriority);
  __spikeSetST(__ST, "trackSchedulerEvent", ___config.trackSchedulerEvent);
  __spikeSetST(__ST, "resolveEventType", ___config.resolveEventType);
  __spikeSetST(__ST, "resolveEventTimeStamp", ___config.resolveEventTimeStamp);
  __spikeSetST(__ST, "shouldAttemptEagerTransition", ___config.shouldAttemptEagerTransition);
  __spikeSetST(__ST, "detachDeletedInstance", ___config.detachDeletedInstance);
  ___config.requestPostPaintCallback;
  __spikeSetST(__ST, "maySuspendCommit", ___config.maySuspendCommit);
  __spikeSetST(__ST, "maySuspendCommitOnUpdate", ___config.maySuspendCommitOnUpdate);
  __spikeSetST(__ST, "maySuspendCommitInSyncRender", ___config.maySuspendCommitInSyncRender);
  __spikeSetST(__ST, "preloadInstance", ___config.preloadInstance);
  __spikeSetST(__ST, "startSuspendingCommit", ___config.startSuspendingCommit);
  __spikeSetST(__ST, "suspendInstance", ___config.suspendInstance);
  ___config.suspendOnActiveViewTransition;
  __spikeSetST(__ST, "waitForCommitToBeReady", ___config.waitForCommitToBeReady);
  __spikeSetST(__ST, "getSuspendedCommitReason", ___config.getSuspendedCommitReason);
  __spikeSetST(__ST, "NotPendingTransition", ___config.NotPendingTransition);
  __spikeSetST(__ST, "HostTransitionContext", ___config.HostTransitionContext);
  __spikeSetST(__ST, "resetFormInstance", ___config.resetFormInstance);
  __spikeSetST(__ST, "bindToConsole", ___config.bindToConsole);
  __spikeSetST(__ST, "supportsMicrotasks", ___config.supportsMicrotasks);
  __spikeSetST(__ST, "scheduleMicrotask", ___config.scheduleMicrotask);
  __spikeSetST(__ST, "supportsTestSelectors", ___config.supportsTestSelectors);
  __spikeSetST(__ST, "findFiberRoot", ___config.findFiberRoot);
  __spikeSetST(__ST, "getBoundingRect", ___config.getBoundingRect);
  __spikeSetST(__ST, "getTextContent", ___config.getTextContent);
  __spikeSetST(__ST, "isHiddenSubtree", ___config.isHiddenSubtree);
  __spikeSetST(__ST, "matchAccessibilityRole", ___config.matchAccessibilityRole);
  __spikeSetST(__ST, "setFocusIfFocusable", ___config.setFocusIfFocusable);
  __spikeSetST(__ST, "setupIntersectionObserver", ___config.setupIntersectionObserver);
  __spikeSetST(__ST, "appendChild", ___config.appendChild);
  __spikeSetST(__ST, "appendChildToContainer", ___config.appendChildToContainer);
  __spikeSetST(__ST, "commitTextUpdate", ___config.commitTextUpdate);
  __spikeSetST(__ST, "commitMount", ___config.commitMount);
  __spikeSetST(__ST, "commitUpdate", ___config.commitUpdate);
  __spikeSetST(__ST, "insertBefore", ___config.insertBefore);
  __spikeSetST(__ST, "insertInContainerBefore", ___config.insertInContainerBefore);
  __spikeSetST(__ST, "removeChild", ___config.removeChild);
  __spikeSetST(__ST, "removeChildFromContainer", ___config.removeChildFromContainer);
  __spikeSetST(__ST, "resetTextContent", ___config.resetTextContent);
  __spikeSetST(__ST, "hideInstance", ___config.hideInstance);
  __spikeSetST(__ST, "hideTextInstance", ___config.hideTextInstance);
  __spikeSetST(__ST, "unhideInstance", ___config.unhideInstance);
  __spikeSetST(__ST, "unhideTextInstance", ___config.unhideTextInstance);
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
  __spikeSetST(__ST, "clearContainer", ___config.clearContainer);
  ___config.createFragmentInstance;
  ___config.updateFragmentInstanceFiber;
  ___config.commitNewChildToFragmentInstance;
  ___config.deleteChildFromFragmentInstance;
  __spikeSetST(__ST, "cloneInstance", ___config.cloneInstance);
  __spikeSetST(__ST, "createContainerChildSet", ___config.createContainerChildSet);
  __spikeSetST(__ST, "appendChildToContainerChildSet", ___config.appendChildToContainerChildSet);
  __spikeSetST(__ST, "finalizeContainerChildren", ___config.finalizeContainerChildren);
  __spikeSetST(__ST, "replaceContainerChildren", ___config.replaceContainerChildren);
  __spikeSetST(__ST, "cloneHiddenInstance", ___config.cloneHiddenInstance);
  __spikeSetST(__ST, "cloneHiddenTextInstance", ___config.cloneHiddenTextInstance);
  __spikeSetST(__ST, "isSuspenseInstancePending", ___config.isSuspenseInstancePending);
  __spikeSetST(__ST, "isSuspenseInstanceFallback", ___config.isSuspenseInstanceFallback);
  __spikeSetST(__ST, "getSuspenseInstanceFallbackErrorDetails", ___config.getSuspenseInstanceFallbackErrorDetails);
  __spikeSetST(__ST, "registerSuspenseInstanceRetry", ___config.registerSuspenseInstanceRetry);
  __spikeSetST(__ST, "canHydrateFormStateMarker", ___config.canHydrateFormStateMarker);
  __spikeSetST(__ST, "isFormStateMarkerMatching", ___config.isFormStateMarkerMatching);
  __spikeSetST(__ST, "getNextHydratableSibling", ___config.getNextHydratableSibling);
  __spikeSetST(__ST, "getNextHydratableSiblingAfterSingleton", ___config.getNextHydratableSiblingAfterSingleton);
  __spikeSetST(__ST, "getFirstHydratableChild", ___config.getFirstHydratableChild);
  __spikeSetST(__ST, "getFirstHydratableChildWithinContainer", ___config.getFirstHydratableChildWithinContainer);
  __spikeSetST(__ST, "getFirstHydratableChildWithinActivityInstance", ___config.getFirstHydratableChildWithinActivityInstance);
  __spikeSetST(__ST, "getFirstHydratableChildWithinSuspenseInstance", ___config.getFirstHydratableChildWithinSuspenseInstance);
  __spikeSetST(__ST, "getFirstHydratableChildWithinSingleton", ___config.getFirstHydratableChildWithinSingleton);
  __spikeSetST(__ST, "canHydrateInstance", ___config.canHydrateInstance);
  __spikeSetST(__ST, "canHydrateTextInstance", ___config.canHydrateTextInstance);
  __spikeSetST(__ST, "canHydrateActivityInstance", ___config.canHydrateActivityInstance);
  __spikeSetST(__ST, "canHydrateSuspenseInstance", ___config.canHydrateSuspenseInstance);
  __spikeSetST(__ST, "hydrateInstance", ___config.hydrateInstance);
  __spikeSetST(__ST, "hydrateTextInstance", ___config.hydrateTextInstance);
  __spikeSetST(__ST, "hydrateActivityInstance", ___config.hydrateActivityInstance);
  __spikeSetST(__ST, "hydrateSuspenseInstance", ___config.hydrateSuspenseInstance);
  __spikeSetST(__ST, "getNextHydratableInstanceAfterActivityInstance", ___config.getNextHydratableInstanceAfterActivityInstance);
  __spikeSetST(__ST, "getNextHydratableInstanceAfterSuspenseInstance", ___config.getNextHydratableInstanceAfterSuspenseInstance);
  __spikeSetST(__ST, "commitHydratedInstance", ___config.commitHydratedInstance);
  __spikeSetST(__ST, "commitHydratedContainer", ___config.commitHydratedContainer);
  __spikeSetST(__ST, "commitHydratedActivityInstance", ___config.commitHydratedActivityInstance);
  __spikeSetST(__ST, "commitHydratedSuspenseInstance", ___config.commitHydratedSuspenseInstance);
  __spikeSetST(__ST, "finalizeHydratedChildren", ___config.finalizeHydratedChildren);
  __spikeSetST(__ST, "flushHydrationEvents", ___config.flushHydrationEvents);
  ___config.clearActivityBoundary;
  __spikeSetST(__ST, "clearSuspenseBoundary", ___config.clearSuspenseBoundary);
  ___config.clearActivityBoundaryFromContainer;
  __spikeSetST(__ST, "clearSuspenseBoundaryFromContainer", ___config.clearSuspenseBoundaryFromContainer);
  __spikeSetST(__ST, "hideDehydratedBoundary", ___config.hideDehydratedBoundary);
  __spikeSetST(__ST, "unhideDehydratedBoundary", ___config.unhideDehydratedBoundary);
  __spikeSetST(__ST, "shouldDeleteUnhydratedTailInstances", ___config.shouldDeleteUnhydratedTailInstances);
  __spikeSetST(__ST, "diffHydratedPropsForDevWarnings", ___config.diffHydratedPropsForDevWarnings);
  __spikeSetST(__ST, "diffHydratedTextForDevWarnings", ___config.diffHydratedTextForDevWarnings);
  __spikeSetST(__ST, "describeHydratableInstanceForDevWarnings", ___config.describeHydratableInstanceForDevWarnings);
  __spikeSetST(__ST, "validateHydratableInstance", ___config.validateHydratableInstance);
  __spikeSetST(__ST, "validateHydratableTextInstance", ___config.validateHydratableTextInstance);
  __spikeSetST(__ST, "supportsResources", ___config.supportsResources);
  __spikeSetST(__ST, "isHostHoistableType", ___config.isHostHoistableType);
  __spikeSetST(__ST, "getHoistableRoot", ___config.getHoistableRoot);
  __spikeSetST(__ST, "getResource", ___config.getResource);
  __spikeSetST(__ST, "acquireResource", ___config.acquireResource);
  __spikeSetST(__ST, "releaseResource", ___config.releaseResource);
  __spikeSetST(__ST, "hydrateHoistable", ___config.hydrateHoistable);
  __spikeSetST(__ST, "mountHoistable", ___config.mountHoistable);
  __spikeSetST(__ST, "unmountHoistable", ___config.unmountHoistable);
  __spikeSetST(__ST, "createHoistableInstance", ___config.createHoistableInstance);
  __spikeSetST(__ST, "prepareToCommitHoistables", ___config.prepareToCommitHoistables);
  __spikeSetST(__ST, "mayResourceSuspendCommit", ___config.mayResourceSuspendCommit);
  __spikeSetST(__ST, "preloadResource", ___config.preloadResource);
  __spikeSetST(__ST, "suspendResource", ___config.suspendResource);
  __spikeSetST(__ST, "supportsSingletons", ___config.supportsSingletons);
  __spikeSetST(__ST, "resolveSingletonInstance", ___config.resolveSingletonInstance);
  __spikeSetST(__ST, "acquireSingletonInstance", ___config.acquireSingletonInstance);
  __spikeSetST(__ST, "releaseSingletonInstance", ___config.releaseSingletonInstance);
  __spikeSetST(__ST, "isHostSingletonType", ___config.isHostSingletonType);
  __spikeSetST(__ST, "isSingletonScope", ___config.isSingletonScope);
  __spikeSetST(__ST, "valueStack", __arrNew());
  __spikeSetST(__ST, "fiberStack", __arrNew());
  __spikeSetST(__ST, "index_jscomp_0", -1);
  __spikeSetST(__ST, "emptyContextObject", {});
  Object.freeze(__ST.emptyContextObject);
  __spikeSetST(__ST, "clz32", Math.clz32 ? Math.clz32 : __ST.clz32Fallback);
  __spikeSetST(__ST, "log_1", Math.log);
  __spikeSetST(__ST, "LN2", Math.LN2);
  __spikeSetST(__ST, "nextTransitionUpdateLane", 256);
  __spikeSetST(__ST, "nextTransitionDeferredLane", 262144);
  __spikeSetST(__ST, "nextRetryLane", 4194304);
  __spikeSetST(__ST, "scheduleCallback_3", Scheduler.unstable_scheduleCallback);
  __spikeSetST(__ST, "cancelCallback_1", Scheduler.unstable_cancelCallback);
  __spikeSetST(__ST, "shouldYield", Scheduler.unstable_shouldYield);
  __spikeSetST(__ST, "requestPaint", Scheduler.unstable_requestPaint);
  __spikeSetST(__ST, "now_1", Scheduler.unstable_now);
  __spikeSetST(__ST, "ImmediatePriority", Scheduler.unstable_ImmediatePriority);
  __spikeSetST(__ST, "UserBlockingPriority", Scheduler.unstable_UserBlockingPriority);
  __spikeSetST(__ST, "NormalPriority_1", Scheduler.unstable_NormalPriority);
  __spikeSetST(__ST, "IdlePriority", Scheduler.unstable_IdlePriority);
  __spikeSetST(__ST, "log", Scheduler.log);
  __spikeSetST(__ST, "unstable_setDisableYieldValue", Scheduler.unstable_setDisableYieldValue);
  __spikeSetST(__ST, "rendererID", undefined);
  __spikeSetST(__ST, "injectedHook", undefined);
  __spikeSetST(__ST, "hasLoggedError", !1);
  __spikeSetST(__ST, "isDevToolsPresent", "undefined" !== typeOfJS(__REACT_DEVTOOLS_GLOBAL_HOOK__));
  __spikeSetST(__ST, "lastResetTime", 0);
  if ("object" === typeOfJS(performance) && "function" === typeOfJS(performance.now)) {
    __spikeSetST(__ST, "localPerformance", performance);
    __spikeSetST(__ST, "getCurrentTime", function () {
      return __ST.localPerformance.now();
    });
  } else {
    __spikeSetST(__ST, "localDate", Date);
    __spikeSetST(__ST, "getCurrentTime", function () {
      return __ST.localDate.now();
    });
  }
  __spikeSetST(__ST, "objectIs", "function" === typeOfJS(Object.is) ? Object.is : __ST.is);
  __spikeSetST(__ST, "reportGlobalError", "function" === typeOfJS(reportError) ? reportError : function (__error) {
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
  });
  __spikeSetST(__ST, "hasOwnProperty", __protoOf(Object).hasOwnProperty);
  __spikeSetST(__ST, "supportsUserTiming", "undefined" !== typeOfJS(console) && "function" === typeOfJS(console.timeStamp) && "undefined" !== typeOfJS(performance) && "function" === typeOfJS(performance.measure));
  __spikeSetST(__ST, "currentTrack", "Blocking");
  __spikeSetST(__ST, "alreadyWarnedForDeepEquality", !1);
  __spikeSetST(__ST, "reusableComponentDevToolDetails", {
    color: "primary",
    properties: undefined,
    tooltipText: "",
    track: "Components \u269b"
  });
  __spikeSetST(__ST, "reusableComponentOptions", {
    start: -0,
    end: -0,
    detail: {
      devtools: __ST.reusableComponentDevToolDetails
    }
  });
  __spikeSetST(__ST, "resuableChangedPropsEntry", __arrNew("Changed Props", ""));
  __spikeSetST(__ST, "reusableDeeplyEqualPropsEntry", __arrNew("Changed Props", "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner."));
  __spikeSetST(__ST, "disabledDepth", 0);
  __ST.disabledLog.__reactDisabledLog = !0;
  __spikeSetST(__ST, "reentry", !1);
  __spikeSetST(__ST, "componentFrameCache", __new("function" === typeOfJS(WeakMap) ? WeakMap : Map));
  __spikeSetST(__ST, "CapturedStacks", __new(WeakMap));
  __spikeSetST(__ST, "forkStack", __arrNew());
  __spikeSetST(__ST, "forkStackIndex", 0);
  __spikeSetST(__ST, "treeForkProvider", undefined);
  __spikeSetST(__ST, "treeForkCount", 0);
  __spikeSetST(__ST, "idStack", __arrNew());
  __spikeSetST(__ST, "idStackIndex", 0);
  __spikeSetST(__ST, "treeContextProvider", undefined);
  __spikeSetST(__ST, "treeContextId", 1);
  __spikeSetST(__ST, "treeContextOverflow", "");
  __spikeSetST(__ST, "contextStackCursor", __ST.createCursor(undefined));
  __spikeSetST(__ST, "contextFiberStackCursor", __ST.createCursor(undefined));
  __spikeSetST(__ST, "rootInstanceStackCursor", __ST.createCursor(undefined));
  __spikeSetST(__ST, "hostTransitionProviderCursor", __ST.createCursor(undefined));
  __spikeSetST(__ST, "needsEscaping", __re("[\"'&<>\\n\\t]|^\\s|\\s$", ""));
  __spikeSetST(__ST, "current", undefined);
  __spikeSetST(__ST, "isRendering", !1);
  __spikeSetST(__ST, "hydrationParentFiber", undefined);
  __spikeSetST(__ST, "nextHydratableInstance", undefined);
  __spikeSetST(__ST, "isHydrating", !1);
  __spikeSetST(__ST, "didSuspendOrErrorDEV", !1);
  __spikeSetST(__ST, "hydrationDiffRootDEV", undefined);
  __spikeSetST(__ST, "hydrationErrors", undefined);
  __spikeSetST(__ST, "rootOrSingletonContext", !1);
  __spikeSetST(__ST, "HydrationMismatchException", Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."));
  __spikeSetST(__ST, "NoMode", 0);
  __spikeSetST(__ST, "valueCursor", __ST.createCursor(undefined));
  __spikeSetST(__ST, "rendererCursorDEV", __ST.createCursor(undefined));
  __spikeSetST(__ST, "renderer2CursorDEV", __ST.createCursor(undefined));
  __spikeSetST(__ST, "rendererSigil", {});
  __spikeSetST(__ST, "currentlyRenderingFiber_1", undefined);
  __spikeSetST(__ST, "lastContextDependency", undefined);
  __spikeSetST(__ST, "isDisallowedContextReadInDEV", !1);
  __spikeSetST(__ST, "AbortControllerLocal", "undefined" !== typeOfJS(AbortController) ? AbortController : function (__self) {
    let listeners, signal;
    listeners = __arrNew();
    signal = __self.signal = {
      aborted: !1,
      addEventListener: function (__type, listener) {
        __push(listeners, listener);
      }
    };
    __self.abort = function () {
      signal.aborted = !0;
      __forEach(listeners, function (listener) {
        return listener();
      });
    };
  });
  __spikeSetST(__ST, "scheduleCallback_2", Scheduler.unstable_scheduleCallback);
  __spikeSetST(__ST, "NormalPriority", Scheduler.unstable_NormalPriority);
  __spikeSetST(__ST, "CacheContext", {
    $$typeof: __ST.REACT_CONTEXT_TYPE,
    Consumer: undefined,
    Provider: undefined,
    _currentValue: undefined,
    _currentValue2: undefined,
    _threadCount: 0,
    _currentRenderer: undefined,
    _currentRenderer2: undefined
  });
  __spikeSetST(__ST, "now", Scheduler.unstable_now);
  __spikeSetST(__ST, "createTask", console.createTask ? console.createTask : function () {
    return undefined;
  });
  __spikeSetST(__ST, "renderStartTime", -0);
  __spikeSetST(__ST, "commitStartTime", -0);
  __spikeSetST(__ST, "commitEndTime", -0);
  __spikeSetST(__ST, "commitErrors", undefined);
  __spikeSetST(__ST, "profilerStartTime", -1.1);
  __spikeSetST(__ST, "profilerEffectDuration", -0);
  __spikeSetST(__ST, "componentEffectDuration", -0);
  __spikeSetST(__ST, "componentEffectStartTime", -1.1);
  __spikeSetST(__ST, "componentEffectEndTime", -1.1);
  __spikeSetST(__ST, "componentEffectErrors", undefined);
  __spikeSetST(__ST, "componentEffectSpawnedUpdate", !1);
  __spikeSetST(__ST, "blockingClampTime", -0);
  __spikeSetST(__ST, "blockingUpdateTime", -1.1);
  __spikeSetST(__ST, "blockingUpdateTask", undefined);
  __spikeSetST(__ST, "blockingUpdateType", 0);
  __spikeSetST(__ST, "blockingUpdateMethodName", undefined);
  __spikeSetST(__ST, "blockingUpdateComponentName", undefined);
  __spikeSetST(__ST, "blockingEventTime", -1.1);
  __spikeSetST(__ST, "blockingEventType", undefined);
  __spikeSetST(__ST, "blockingEventRepeatTime", -1.1);
  __spikeSetST(__ST, "blockingSuspendedTime", -1.1);
  __spikeSetST(__ST, "transitionClampTime", -0);
  __spikeSetST(__ST, "transitionStartTime", -1.1);
  __spikeSetST(__ST, "transitionUpdateTime", -1.1);
  __spikeSetST(__ST, "transitionUpdateType", 0);
  __spikeSetST(__ST, "transitionUpdateTask", undefined);
  __spikeSetST(__ST, "transitionUpdateMethodName", undefined);
  __spikeSetST(__ST, "transitionUpdateComponentName", undefined);
  __spikeSetST(__ST, "transitionEventTime", -1.1);
  __spikeSetST(__ST, "transitionEventType", undefined);
  __spikeSetST(__ST, "transitionEventRepeatTime", -1.1);
  __spikeSetST(__ST, "transitionSuspendedTime", -1.1);
  __spikeSetST(__ST, "animatingTask", undefined);
  __spikeSetST(__ST, "yieldReason", 0);
  __spikeSetST(__ST, "yieldStartTime", -1.1);
  __spikeSetST(__ST, "currentUpdateIsNested", !1);
  __spikeSetST(__ST, "nestedUpdateScheduled", !1);
  __spikeSetST(__ST, "firstScheduledRoot", undefined);
  __spikeSetST(__ST, "lastScheduledRoot", undefined);
  __spikeSetST(__ST, "didScheduleMicrotask", !1);
  __spikeSetST(__ST, "didScheduleMicrotask_act", !1);
  __spikeSetST(__ST, "mightHavePendingSyncWork", !1);
  __spikeSetST(__ST, "isFlushingWork", !1);
  __spikeSetST(__ST, "currentEventTransitionLane", 0);
  __spikeSetST(__ST, "fakeActCallbackNode_1", {});
  __spikeSetST(__ST, "currentEntangledListeners", undefined);
  __spikeSetST(__ST, "currentEntangledPendingCount", 0);
  __spikeSetST(__ST, "currentEntangledLane", 0);
  __spikeSetST(__ST, "currentEntangledActionThenable", undefined);
  __spikeSetST(__ST, "prevOnStartTransitionFinish", __ST.ReactSharedInternals.S);
  __ST.ReactSharedInternals.S = function (transition, returnValue) {
    let newEventTime, newEventType;
    __spikeSetST(__ST, "globalMostRecentTransitionTime", __ST.now_1());
    if ("object" === typeOfJS(returnValue) && undefined !== returnValue && "function" === typeOfJS(returnValue.then)) {
      if (0 > __ST.transitionStartTime && 0 > __ST.transitionUpdateTime) {
        __spikeSetST(__ST, "transitionStartTime", __ST.now());
        newEventTime = __ST.resolveEventTimeStamp();
        newEventType = __ST.resolveEventType();
        if (newEventTime !== __ST.transitionEventRepeatTime || newEventType !== __ST.transitionEventType) __spikeSetST(__ST, "transitionEventRepeatTime", -1.1);
        __spikeSetST(__ST, "transitionEventTime", newEventTime);
        __spikeSetST(__ST, "transitionEventType", newEventType);
      }
      __ST.entangleAsyncAction(transition, returnValue);
    }
    undefined !== __ST.prevOnStartTransitionFinish && __ST.prevOnStartTransitionFinish(transition, returnValue);
  };
  __spikeSetST(__ST, "resumedCache", __ST.createCursor(undefined));
  __spikeSetST(__ST, "ReactStrictModeWarnings", {
    recordUnsafeLifecycleWarnings: function () {},
    flushPendingUnsafeLifecycleWarnings: function () {},
    recordLegacyContextWarning: function () {},
    flushLegacyContextWarning: function () {},
    discardPendingWarnings: function () {}
  });
  __spikeSetST(__ST, "pendingComponentWillMountWarnings", __arrNew());
  __spikeSetST(__ST, "pendingUNSAFE_ComponentWillMountWarnings", __arrNew());
  __spikeSetST(__ST, "pendingComponentWillReceivePropsWarnings", __arrNew());
  __spikeSetST(__ST, "pendingUNSAFE_ComponentWillReceivePropsWarnings", __arrNew());
  __spikeSetST(__ST, "pendingComponentWillUpdateWarnings", __arrNew());
  __spikeSetST(__ST, "pendingUNSAFE_ComponentWillUpdateWarnings", __arrNew());
  __spikeSetST(__ST, "didWarnAboutUnsafeLifecycles", __new(Set));
  __ST.ReactStrictModeWarnings.recordUnsafeLifecycleWarnings = function (fiber, instance) {
    __ST.didWarnAboutUnsafeLifecycles.has(fiber.type) || ("function" === typeOfJS(instance.componentWillMount) && !0 !== instance.componentWillMount.__suppressDeprecationWarning && __push(__ST.pendingComponentWillMountWarnings, fiber), fiber.mode & 8 && "function" === typeOfJS(instance.UNSAFE_componentWillMount) && __push(__ST.pendingUNSAFE_ComponentWillMountWarnings, fiber), "function" === typeOfJS(instance.componentWillReceiveProps) && !0 !== instance.componentWillReceiveProps.__suppressDeprecationWarning && __push(__ST.pendingComponentWillReceivePropsWarnings, fiber), fiber.mode & 8 && "function" === typeOfJS(instance.UNSAFE_componentWillReceiveProps) && __push(__ST.pendingUNSAFE_ComponentWillReceivePropsWarnings, fiber), "function" === typeOfJS(instance.componentWillUpdate) && !0 !== instance.componentWillUpdate.__suppressDeprecationWarning && __push(__ST.pendingComponentWillUpdateWarnings, fiber), fiber.mode & 8 && "function" === typeOfJS(instance.UNSAFE_componentWillUpdate) && __push(__ST.pendingUNSAFE_ComponentWillUpdateWarnings, fiber));
  };
  __ST.ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings = function () {
    let componentWillMountUniqueNames, UNSAFE_componentWillMountUniqueNames, componentWillReceivePropsUniqueNames, UNSAFE_componentWillReceivePropsUniqueNames, componentWillUpdateUniqueNames, UNSAFE_componentWillUpdateUniqueNames, sortedNames;
    componentWillMountUniqueNames = __new(Set);
    0 < __len(__ST.pendingComponentWillMountWarnings) && (__forEach(__ST.pendingComponentWillMountWarnings, function (fiber) {
      componentWillMountUniqueNames.add(__ST.getComponentNameFromFiber(fiber) || "Component");
      __ST.didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), __ST.pendingComponentWillMountWarnings = __arrNew());
    UNSAFE_componentWillMountUniqueNames = __new(Set);
    0 < __len(__ST.pendingUNSAFE_ComponentWillMountWarnings) && (__forEach(__ST.pendingUNSAFE_ComponentWillMountWarnings, function (fiber) {
      UNSAFE_componentWillMountUniqueNames.add(__ST.getComponentNameFromFiber(fiber) || "Component");
      __ST.didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), __ST.pendingUNSAFE_ComponentWillMountWarnings = __arrNew());
    componentWillReceivePropsUniqueNames = __new(Set);
    0 < __len(__ST.pendingComponentWillReceivePropsWarnings) && (__forEach(__ST.pendingComponentWillReceivePropsWarnings, function (fiber) {
      componentWillReceivePropsUniqueNames.add(__ST.getComponentNameFromFiber(fiber) || "Component");
      __ST.didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), __ST.pendingComponentWillReceivePropsWarnings = __arrNew());
    UNSAFE_componentWillReceivePropsUniqueNames = __new(Set);
    0 < __len(__ST.pendingUNSAFE_ComponentWillReceivePropsWarnings) && (__forEach(__ST.pendingUNSAFE_ComponentWillReceivePropsWarnings, function (fiber) {
      UNSAFE_componentWillReceivePropsUniqueNames.add(__ST.getComponentNameFromFiber(fiber) || "Component");
      __ST.didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), __ST.pendingUNSAFE_ComponentWillReceivePropsWarnings = __arrNew());
    componentWillUpdateUniqueNames = __new(Set);
    0 < __len(__ST.pendingComponentWillUpdateWarnings) && (__forEach(__ST.pendingComponentWillUpdateWarnings, function (fiber) {
      componentWillUpdateUniqueNames.add(__ST.getComponentNameFromFiber(fiber) || "Component");
      __ST.didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), __ST.pendingComponentWillUpdateWarnings = __arrNew());
    UNSAFE_componentWillUpdateUniqueNames = __new(Set);
    0 < __len(__ST.pendingUNSAFE_ComponentWillUpdateWarnings) && (__forEach(__ST.pendingUNSAFE_ComponentWillUpdateWarnings, function (fiber) {
      UNSAFE_componentWillUpdateUniqueNames.add(__ST.getComponentNameFromFiber(fiber) || "Component");
      __ST.didWarnAboutUnsafeLifecycles.add(fiber.type);
    }), __ST.pendingUNSAFE_ComponentWillUpdateWarnings = __arrNew());
    if (0 < UNSAFE_componentWillMountUniqueNames.size) {
      sortedNames = __ST.setToSortedString(UNSAFE_componentWillMountUniqueNames);
      console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", sortedNames);
    }
    0 < UNSAFE_componentWillReceivePropsUniqueNames.size && (sortedNames = __ST.setToSortedString(UNSAFE_componentWillReceivePropsUniqueNames), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", sortedNames));
    0 < UNSAFE_componentWillUpdateUniqueNames.size && (sortedNames = __ST.setToSortedString(UNSAFE_componentWillUpdateUniqueNames), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", sortedNames));
    0 < componentWillMountUniqueNames.size && (sortedNames = __ST.setToSortedString(componentWillMountUniqueNames), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", sortedNames));
    0 < componentWillReceivePropsUniqueNames.size && (sortedNames = __ST.setToSortedString(componentWillReceivePropsUniqueNames), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", sortedNames));
    0 < componentWillUpdateUniqueNames.size && (sortedNames = __ST.setToSortedString(componentWillUpdateUniqueNames), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", sortedNames));
  };
  __spikeSetST(__ST, "pendingLegacyContextWarning", __new(Map));
  __spikeSetST(__ST, "didWarnAboutLegacyContext", __new(Set));
  __ST.ReactStrictModeWarnings.recordLegacyContextWarning = function (fiber, instance) {
    let strictRoot, node;
    strictRoot = undefined;
    for (node = fiber; undefined !== node;) node.mode & 8 && (strictRoot = node), node = node.return;
    undefined === strictRoot ? console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.") : !__ST.didWarnAboutLegacyContext.has(fiber.type) && (node = __ST.pendingLegacyContextWarning.get(strictRoot), fiber.type.contextTypes !== undefined || fiber.type.childContextTypes !== undefined || undefined !== instance && "function" === typeOfJS(instance.getChildContext)) && (void 0 === node && (node = __arrNew(), __ST.pendingLegacyContextWarning.set(strictRoot, node)), __push(node, fiber));
  };
  __ST.ReactStrictModeWarnings.flushLegacyContextWarning = function () {
    __forEach(__ST.pendingLegacyContextWarning, function (fiberArray) {
      let firstFiber, uniqueNames, sortedNames;
      if (0 !== __len(fiberArray)) {
        firstFiber = fiberArray[0];
        uniqueNames = __new(Set);
        __forEach(fiberArray, function (fiber) {
          uniqueNames.add(__ST.getComponentNameFromFiber(fiber) || "Component");
          __ST.didWarnAboutLegacyContext.add(fiber.type);
        });
        sortedNames = __ST.setToSortedString(uniqueNames);
        __ST.runWithFiberInDEV(firstFiber, function () {
          console.error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context", sortedNames);
        });
      }
    });
  };
  __ST.ReactStrictModeWarnings.discardPendingWarnings = function () {
    __spikeSetST(__ST, "pendingComponentWillMountWarnings", __arrNew());
    __spikeSetST(__ST, "pendingUNSAFE_ComponentWillMountWarnings", __arrNew());
    __spikeSetST(__ST, "pendingComponentWillReceivePropsWarnings", __arrNew());
    __spikeSetST(__ST, "pendingUNSAFE_ComponentWillReceivePropsWarnings", __arrNew());
    __spikeSetST(__ST, "pendingComponentWillUpdateWarnings", __arrNew());
    __spikeSetST(__ST, "pendingUNSAFE_ComponentWillUpdateWarnings", __arrNew());
    __spikeSetST(__ST, "pendingLegacyContextWarning", __new(Map));
  };
  __spikeSetST(__ST, "callComponent", {
    react_stack_bottom_frame: function (Component, props, secondArg) {
      let wasRendering;
      wasRendering = __ST.isRendering;
      __spikeSetST(__ST, "isRendering", !0);
      try {
        return Component(props, secondArg);
      } finally {
        __spikeSetST(__ST, "isRendering", wasRendering);
      }
    }
  });
  __spikeSetST(__ST, "callComponentInDEV", __partial((..._bindArgs53) => __applyFn(__ST.callComponent.react_stack_bottom_frame, ..._bindArgs53), __ST.callComponent));
  __spikeSetST(__ST, "callRender", {
    react_stack_bottom_frame: function (instance) {
      let wasRendering;
      wasRendering = __ST.isRendering;
      __spikeSetST(__ST, "isRendering", !0);
      try {
        return instance.render();
      } finally {
        __spikeSetST(__ST, "isRendering", wasRendering);
      }
    }
  });
  __spikeSetST(__ST, "callRenderInDEV", __partial((..._bindArgs54) => __applyFn(__ST.callRender.react_stack_bottom_frame, ..._bindArgs54), __ST.callRender));
  __spikeSetST(__ST, "callComponentDidMount", {
    react_stack_bottom_frame: function (finishedWork, instance) {
      try {
        instance.componentDidMount();
      } catch (__error) {
        __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }
  });
  __spikeSetST(__ST, "callComponentDidMountInDEV", __partial((..._bindArgs55) => __applyFn(__ST.callComponentDidMount.react_stack_bottom_frame, ..._bindArgs55), __ST.callComponentDidMount));
  __spikeSetST(__ST, "callComponentDidUpdate", {
    react_stack_bottom_frame: function (finishedWork, instance, prevProps, prevState, snapshot) {
      try {
        instance.componentDidUpdate(prevProps, prevState, snapshot);
      } catch (__error) {
        __ST.captureCommitPhaseError(finishedWork, finishedWork.return, __error);
      }
    }
  });
  __spikeSetST(__ST, "callComponentDidUpdateInDEV", __partial((..._bindArgs56) => __applyFn(__ST.callComponentDidUpdate.react_stack_bottom_frame, ..._bindArgs56), __ST.callComponentDidUpdate));
  __spikeSetST(__ST, "callComponentDidCatch", {
    react_stack_bottom_frame: function (instance, errorInfo) {
      let stack;
      stack = errorInfo.stack;
      instance.componentDidCatch(errorInfo.value, {
        componentStack: undefined !== stack ? stack : ""
      });
    }
  });
  __spikeSetST(__ST, "callComponentDidCatchInDEV", __partial((..._bindArgs57) => __applyFn(__ST.callComponentDidCatch.react_stack_bottom_frame, ..._bindArgs57), __ST.callComponentDidCatch));
  __spikeSetST(__ST, "callComponentWillUnmount", {
    react_stack_bottom_frame: function (current, nearestMountedAncestor, instance) {
      try {
        instance.componentWillUnmount();
      } catch (__error) {
        __ST.captureCommitPhaseError(current, nearestMountedAncestor, __error);
      }
    }
  });
  __spikeSetST(__ST, "callComponentWillUnmountInDEV", __partial((..._bindArgs58) => __applyFn(__ST.callComponentWillUnmount.react_stack_bottom_frame, ..._bindArgs58), __ST.callComponentWillUnmount));
  __spikeSetST(__ST, "callCreate", {
    react_stack_bottom_frame: function (effect) {
      let create;
      create = effect.create;
      effect = effect.inst;
      create = create();
      return effect.destroy = create;
    }
  });
  __spikeSetST(__ST, "callCreateInDEV", __partial((..._bindArgs59) => __applyFn(__ST.callCreate.react_stack_bottom_frame, ..._bindArgs59), __ST.callCreate));
  __spikeSetST(__ST, "callDestroy", {
    react_stack_bottom_frame: function (current, nearestMountedAncestor, destroy) {
      try {
        destroy();
      } catch (__error) {
        __ST.captureCommitPhaseError(current, nearestMountedAncestor, __error);
      }
    }
  });
  __spikeSetST(__ST, "callDestroyInDEV", __partial((..._bindArgs60) => __applyFn(__ST.callDestroy.react_stack_bottom_frame, ..._bindArgs60), __ST.callDestroy));
  __spikeSetST(__ST, "callLazyInit", {
    react_stack_bottom_frame: function (lazy) {
      let init;
      init = lazy._init;
      return init(lazy._payload);
    }
  });
  __spikeSetST(__ST, "callLazyInitInDEV", __partial((..._bindArgs61) => __applyFn(__ST.callLazyInit.react_stack_bottom_frame, ..._bindArgs61), __ST.callLazyInit));
  __spikeSetST(__ST, "SuspenseException", Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."));
  __spikeSetST(__ST, "SuspenseyCommitException", Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."));
  __spikeSetST(__ST, "SuspenseActionException", Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."));
  __spikeSetST(__ST, "noopSuspenseyCommitThenable", {
    then: function () {
      console.error('Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.');
    }
  });
  __spikeSetST(__ST, "suspendedThenable", undefined);
  __spikeSetST(__ST, "needsToResetSuspendedThenableDEV", !1);
  __spikeSetST(__ST, "thenableState_1", undefined);
  __spikeSetST(__ST, "thenableIndexCounter_1", 0);
  __spikeSetST(__ST, "currentDebugInfo", undefined);
  __spikeSetST(__ST, "didWarnAboutGenerators", __ST.didWarnAboutMaps = !1);
  __spikeSetST(__ST, "ownerHasKeyUseWarning", {});
  __spikeSetST(__ST, "ownerHasFunctionTypeWarning", {});
  __spikeSetST(__ST, "ownerHasSymbolTypeWarning", {});
  __ST.warnForMissingKey = function (returnFiber, workInProgress, child) {
    let componentName, componentKey, currentComponentErrorInfo, childOwnerAppendix;
    if (undefined !== child && "object" === typeOfJS(child) && child._store && (!child._store.validated && child.key === undefined || 2 === child._store.validated)) {
      if ("object" !== typeOfJS(child._store)) throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      child._store.validated = 1;
      componentName = __ST.getComponentNameFromFiber(returnFiber);
      componentKey = componentName || "null";
      if (!__ST.ownerHasKeyUseWarning[componentKey]) {
        __ST.ownerHasKeyUseWarning[componentKey] = !0;
        child = child._owner;
        returnFiber = returnFiber._debugOwner;
        currentComponentErrorInfo = "";
        returnFiber && "number" === typeOfJS(returnFiber.tag) && (componentKey = __ST.getComponentNameFromFiber(returnFiber)) && (currentComponentErrorInfo = __cat(__cat("\n\nCheck the render method of `", componentKey), "`."));
        currentComponentErrorInfo || componentName && (currentComponentErrorInfo = __cat(__cat("\n\nCheck the top-level render call using <", componentName), ">."));
        childOwnerAppendix = "";
        child !== undefined && returnFiber !== child && (componentName = undefined, "number" === typeOfJS(child.tag) ? componentName = __ST.getComponentNameFromFiber(child) : "string" === typeOfJS(child.name) && (componentName = child.name), componentName && (childOwnerAppendix = __cat(__cat(" It was passed a child from ", componentName), ".")));
        __ST.runWithFiberInDEV(workInProgress, function () {
          console.error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.', currentComponentErrorInfo, childOwnerAppendix);
        });
      }
    }
  };
  __spikeSetST(__ST, "reconcileChildFibers", __ST.createChildReconciler(!0));
  __spikeSetST(__ST, "mountChildFibers", __ST.createChildReconciler(!1));
  __spikeSetST(__ST, "OffscreenVisible", 1);
  __spikeSetST(__ST, "OffscreenPassiveEffectsConnected", 2);
  __spikeSetST(__ST, "concurrentQueues", __arrNew());
  __spikeSetST(__ST, "concurrentQueuesIndex", 0);
  __spikeSetST(__ST, "concurrentlyUpdatedLanes", 0);
  __spikeSetST(__ST, "UpdateState", 0);
  __spikeSetST(__ST, "ReplaceState", 1);
  __spikeSetST(__ST, "ForceUpdate", 2);
  __spikeSetST(__ST, "CaptureUpdate", 3);
  __spikeSetST(__ST, "hasForceUpdate", !1);
  __spikeSetST(__ST, "didWarnUpdateInsideUpdate", !1);
  __spikeSetST(__ST, "currentlyProcessingQueue", undefined);
  __spikeSetST(__ST, "didReadFromEntangledAsyncAction", !1);
  __spikeSetST(__ST, "currentTreeHiddenStackCursor", __ST.createCursor(undefined));
  __spikeSetST(__ST, "prevEntangledRenderLanesCursor", __ST.createCursor(0));
  __spikeSetST(__ST, "suspenseHandlerStackCursor", __ST.createCursor(undefined));
  __spikeSetST(__ST, "shellBoundary", undefined);
  __spikeSetST(__ST, "SubtreeSuspenseContextMask", 1);
  __spikeSetST(__ST, "ForceSuspenseFallback", 2);
  __spikeSetST(__ST, "suspenseStackCursor", __ST.createCursor(0));
  __spikeSetST(__ST, "NoFlags", 0);
  __spikeSetST(__ST, "HasEffect", 1);
  __spikeSetST(__ST, "Insertion", 2);
  __spikeSetST(__ST, "Layout", 4);
  __spikeSetST(__ST, "Passive", 8);
  __spikeSetST(__ST, "didWarnAboutMismatchedHooksForComponent", __new(Set));
  __spikeSetST(__ST, "didWarnAboutUseWrappedInTryCatch", __new(Set));
  __spikeSetST(__ST, "didWarnAboutAsyncClientComponent", __new(Set));
  __spikeSetST(__ST, "didWarnAboutUseFormState", __new(Set));
  __spikeSetST(__ST, "renderLanes", 0);
  __spikeSetST(__ST, "currentlyRenderingFiber", undefined);
  __spikeSetST(__ST, "currentHook", undefined);
  __spikeSetST(__ST, "workInProgressHook", undefined);
  __spikeSetST(__ST, "didScheduleRenderPhaseUpdate", !1);
  __spikeSetST(__ST, "didScheduleRenderPhaseUpdateDuringThisPass", !1);
  __spikeSetST(__ST, "shouldDoubleInvokeUserFnsInHooksDEV", !1);
  __spikeSetST(__ST, "localIdCounter", 0);
  __spikeSetST(__ST, "thenableIndexCounter", 0);
  __spikeSetST(__ST, "thenableState", undefined);
  __spikeSetST(__ST, "globalClientIdCounter", 0);
  __spikeSetST(__ST, "RE_RENDER_LIMIT", 25);
  __spikeSetST(__ST, "currentHookNameInDev", undefined);
  __spikeSetST(__ST, "hookTypesDev", undefined);
  __spikeSetST(__ST, "hookTypesUpdateIndexDev", -1);
  __spikeSetST(__ST, "ignorePreviousDependencies", !1);
  __spikeSetST(__ST, "ContextOnlyDispatcher", {
    readContext: __ST.readContext,
    use: __ST.use,
    useCallback: __ST.throwInvalidHookError,
    useContext: __ST.throwInvalidHookError,
    useEffect: __ST.throwInvalidHookError,
    useImperativeHandle: __ST.throwInvalidHookError,
    useLayoutEffect: __ST.throwInvalidHookError,
    useInsertionEffect: __ST.throwInvalidHookError,
    useMemo: __ST.throwInvalidHookError,
    useReducer: __ST.throwInvalidHookError,
    useRef: __ST.throwInvalidHookError,
    useState: __ST.throwInvalidHookError,
    useDebugValue: __ST.throwInvalidHookError,
    useDeferredValue: __ST.throwInvalidHookError,
    useTransition: __ST.throwInvalidHookError,
    useSyncExternalStore: __ST.throwInvalidHookError,
    useId: __ST.throwInvalidHookError,
    useHostTransitionStatus: __ST.throwInvalidHookError,
    useFormState: __ST.throwInvalidHookError,
    useActionState: __ST.throwInvalidHookError,
    useOptimistic: __ST.throwInvalidHookError,
    useMemoCache: __ST.throwInvalidHookError,
    useCacheRefresh: __ST.throwInvalidHookError
  });
  __ST.ContextOnlyDispatcher.useEffectEvent = __ST.throwInvalidHookError;
  __spikeSetST(__ST, "HooksDispatcherOnMountInDEV", undefined);
  __spikeSetST(__ST, "HooksDispatcherOnMountWithHookTypesInDEV", undefined);
  __spikeSetST(__ST, "HooksDispatcherOnUpdateInDEV", undefined);
  __spikeSetST(__ST, "HooksDispatcherOnRerenderInDEV", undefined);
  __spikeSetST(__ST, "InvalidNestedHooksDispatcherOnMountInDEV", undefined);
  __spikeSetST(__ST, "InvalidNestedHooksDispatcherOnUpdateInDEV", undefined);
  __spikeSetST(__ST, "InvalidNestedHooksDispatcherOnRerenderInDEV", undefined);
  __spikeSetST(__ST, "HooksDispatcherOnMountInDEV", {
    readContext: function (context) {
      return __ST.readContext(context);
    },
    use: __ST.use,
    useCallback: function (callback, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useCallback");
      __ST.mountHookTypesDev();
      __ST.checkDepsAreArrayDev(deps);
      return __ST.mountCallback(callback, deps);
    },
    useContext: function (context) {
      __spikeSetST(__ST, "currentHookNameInDev", "useContext");
      __ST.mountHookTypesDev();
      return __ST.readContext(context);
    },
    useEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffect");
      __ST.mountHookTypesDev();
      __ST.checkDepsAreArrayDev(deps);
      return __ST.mountEffect(create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useImperativeHandle");
      __ST.mountHookTypesDev();
      __ST.checkDepsAreArrayDev(deps);
      return __ST.mountImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useInsertionEffect");
      __ST.mountHookTypesDev();
      __ST.checkDepsAreArrayDev(deps);
      __ST.mountEffectImpl(4, __ST.Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useLayoutEffect");
      __ST.mountHookTypesDev();
      __ST.checkDepsAreArrayDev(deps);
      return __ST.mountLayoutEffect(create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useMemo");
      __ST.mountHookTypesDev();
      __ST.checkDepsAreArrayDev(deps);
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return __ST.mountMemo(create, deps);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useReducer");
      __ST.mountHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return __ST.mountReducer(reducer, initialArg, init);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function (initialValue) {
      __spikeSetST(__ST, "currentHookNameInDev", "useRef");
      __ST.mountHookTypesDev();
      return __ST.mountRef(initialValue);
    },
    useState: function (initialState) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useState");
      __ST.mountHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return __ST.mountState(initialState);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useDebugValue");
      __ST.mountHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      __spikeSetST(__ST, "currentHookNameInDev", "useDeferredValue");
      __ST.mountHookTypesDev();
      return __ST.mountDeferredValue(value, initialValue);
    },
    useTransition: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useTransition");
      __ST.mountHookTypesDev();
      return __ST.mountTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      __spikeSetST(__ST, "currentHookNameInDev", "useSyncExternalStore");
      __ST.mountHookTypesDev();
      return __ST.mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useId");
      __ST.mountHookTypesDev();
      return __ST.mountId();
    },
    useFormState: function (action, initialState) {
      __spikeSetST(__ST, "currentHookNameInDev", "useFormState");
      __ST.mountHookTypesDev();
      __ST.warnOnUseFormStateInDev();
      return __ST.mountActionState(action, initialState);
    },
    useActionState: function (action, initialState) {
      __spikeSetST(__ST, "currentHookNameInDev", "useActionState");
      __ST.mountHookTypesDev();
      return __ST.mountActionState(action, initialState);
    },
    useOptimistic: function (passthrough) {
      __spikeSetST(__ST, "currentHookNameInDev", "useOptimistic");
      __ST.mountHookTypesDev();
      return __ST.mountOptimistic(passthrough);
    },
    useHostTransitionStatus: __ST.useHostTransitionStatus,
    useMemoCache: __ST.useMemoCache,
    useCacheRefresh: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useCacheRefresh");
      __ST.mountHookTypesDev();
      return __ST.mountRefresh();
    },
    useEffectEvent: function (callback) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffectEvent");
      __ST.mountHookTypesDev();
      return __ST.mountEvent(callback);
    }
  });
  __spikeSetST(__ST, "HooksDispatcherOnMountWithHookTypesInDEV", {
    readContext: function (context) {
      return __ST.readContext(context);
    },
    use: __ST.use,
    useCallback: function (callback, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useCallback");
      __ST.updateHookTypesDev();
      return __ST.mountCallback(callback, deps);
    },
    useContext: function (context) {
      __spikeSetST(__ST, "currentHookNameInDev", "useContext");
      __ST.updateHookTypesDev();
      return __ST.readContext(context);
    },
    useEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffect");
      __ST.updateHookTypesDev();
      return __ST.mountEffect(create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useImperativeHandle");
      __ST.updateHookTypesDev();
      return __ST.mountImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useInsertionEffect");
      __ST.updateHookTypesDev();
      __ST.mountEffectImpl(4, __ST.Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useLayoutEffect");
      __ST.updateHookTypesDev();
      return __ST.mountLayoutEffect(create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useMemo");
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return __ST.mountMemo(create, deps);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useReducer");
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return __ST.mountReducer(reducer, initialArg, init);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function (initialValue) {
      __spikeSetST(__ST, "currentHookNameInDev", "useRef");
      __ST.updateHookTypesDev();
      return __ST.mountRef(initialValue);
    },
    useState: function (initialState) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useState");
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return __ST.mountState(initialState);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useDebugValue");
      __ST.updateHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      __spikeSetST(__ST, "currentHookNameInDev", "useDeferredValue");
      __ST.updateHookTypesDev();
      return __ST.mountDeferredValue(value, initialValue);
    },
    useTransition: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useTransition");
      __ST.updateHookTypesDev();
      return __ST.mountTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      __spikeSetST(__ST, "currentHookNameInDev", "useSyncExternalStore");
      __ST.updateHookTypesDev();
      return __ST.mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useId");
      __ST.updateHookTypesDev();
      return __ST.mountId();
    },
    useActionState: function (action, initialState) {
      __spikeSetST(__ST, "currentHookNameInDev", "useActionState");
      __ST.updateHookTypesDev();
      return __ST.mountActionState(action, initialState);
    },
    useFormState: function (action, initialState) {
      __spikeSetST(__ST, "currentHookNameInDev", "useFormState");
      __ST.updateHookTypesDev();
      __ST.warnOnUseFormStateInDev();
      return __ST.mountActionState(action, initialState);
    },
    useOptimistic: function (passthrough) {
      __spikeSetST(__ST, "currentHookNameInDev", "useOptimistic");
      __ST.updateHookTypesDev();
      return __ST.mountOptimistic(passthrough);
    },
    useHostTransitionStatus: __ST.useHostTransitionStatus,
    useMemoCache: __ST.useMemoCache,
    useCacheRefresh: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useCacheRefresh");
      __ST.updateHookTypesDev();
      return __ST.mountRefresh();
    },
    useEffectEvent: function (callback) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffectEvent");
      __ST.updateHookTypesDev();
      return __ST.mountEvent(callback);
    }
  });
  __spikeSetST(__ST, "HooksDispatcherOnUpdateInDEV", {
    readContext: function (context) {
      return __ST.readContext(context);
    },
    use: __ST.use,
    useCallback: function (callback, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useCallback");
      __ST.updateHookTypesDev();
      return __ST.updateCallback(callback, deps);
    },
    useContext: function (context) {
      __spikeSetST(__ST, "currentHookNameInDev", "useContext");
      __ST.updateHookTypesDev();
      return __ST.readContext(context);
    },
    useEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffect");
      __ST.updateHookTypesDev();
      __ST.updateEffectImpl(2048, __ST.Passive, create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useImperativeHandle");
      __ST.updateHookTypesDev();
      return __ST.updateImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useInsertionEffect");
      __ST.updateHookTypesDev();
      return __ST.updateEffectImpl(4, __ST.Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useLayoutEffect");
      __ST.updateHookTypesDev();
      return __ST.updateEffectImpl(4, __ST.Layout, create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useMemo");
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return __ST.updateMemo(create, deps);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useReducer");
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return __ST.updateReducer(reducer, initialArg, init);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useRef");
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useState: function () {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useState");
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return __ST.updateReducer(__ST.basicStateReducer);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useDebugValue");
      __ST.updateHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      __spikeSetST(__ST, "currentHookNameInDev", "useDeferredValue");
      __ST.updateHookTypesDev();
      return __ST.updateDeferredValue(value, initialValue);
    },
    useTransition: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useTransition");
      __ST.updateHookTypesDev();
      return __ST.updateTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      __spikeSetST(__ST, "currentHookNameInDev", "useSyncExternalStore");
      __ST.updateHookTypesDev();
      return __ST.updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useId");
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useFormState: function (action) {
      __spikeSetST(__ST, "currentHookNameInDev", "useFormState");
      __ST.updateHookTypesDev();
      __ST.warnOnUseFormStateInDev();
      return __ST.updateActionState(action);
    },
    useActionState: function (action) {
      __spikeSetST(__ST, "currentHookNameInDev", "useActionState");
      __ST.updateHookTypesDev();
      return __ST.updateActionState(action);
    },
    useOptimistic: function (passthrough, reducer) {
      __spikeSetST(__ST, "currentHookNameInDev", "useOptimistic");
      __ST.updateHookTypesDev();
      return __ST.updateOptimistic(passthrough, reducer);
    },
    useHostTransitionStatus: __ST.useHostTransitionStatus,
    useMemoCache: __ST.useMemoCache,
    useCacheRefresh: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useCacheRefresh");
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useEffectEvent: function (callback) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffectEvent");
      __ST.updateHookTypesDev();
      return __ST.updateEvent(callback);
    }
  });
  __spikeSetST(__ST, "HooksDispatcherOnRerenderInDEV", {
    readContext: function (context) {
      return __ST.readContext(context);
    },
    use: __ST.use,
    useCallback: function (callback, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useCallback");
      __ST.updateHookTypesDev();
      return __ST.updateCallback(callback, deps);
    },
    useContext: function (context) {
      __spikeSetST(__ST, "currentHookNameInDev", "useContext");
      __ST.updateHookTypesDev();
      return __ST.readContext(context);
    },
    useEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffect");
      __ST.updateHookTypesDev();
      __ST.updateEffectImpl(2048, __ST.Passive, create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useImperativeHandle");
      __ST.updateHookTypesDev();
      return __ST.updateImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useInsertionEffect");
      __ST.updateHookTypesDev();
      return __ST.updateEffectImpl(4, __ST.Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useLayoutEffect");
      __ST.updateHookTypesDev();
      return __ST.updateEffectImpl(4, __ST.Layout, create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useMemo");
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnRerenderInDEV;
      try {
        return __ST.updateMemo(create, deps);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useReducer");
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnRerenderInDEV;
      try {
        return __ST.rerenderReducer(reducer, initialArg, init);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useRef");
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useState: function () {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useState");
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnRerenderInDEV;
      try {
        return __ST.rerenderReducer(__ST.basicStateReducer);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useDebugValue");
      __ST.updateHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      __spikeSetST(__ST, "currentHookNameInDev", "useDeferredValue");
      __ST.updateHookTypesDev();
      return __ST.rerenderDeferredValue(value, initialValue);
    },
    useTransition: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useTransition");
      __ST.updateHookTypesDev();
      return __ST.rerenderTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      __spikeSetST(__ST, "currentHookNameInDev", "useSyncExternalStore");
      __ST.updateHookTypesDev();
      return __ST.updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useId");
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useFormState: function (action) {
      __spikeSetST(__ST, "currentHookNameInDev", "useFormState");
      __ST.updateHookTypesDev();
      __ST.warnOnUseFormStateInDev();
      return __ST.rerenderActionState(action);
    },
    useActionState: function (action) {
      __spikeSetST(__ST, "currentHookNameInDev", "useActionState");
      __ST.updateHookTypesDev();
      return __ST.rerenderActionState(action);
    },
    useOptimistic: function (passthrough, reducer) {
      __spikeSetST(__ST, "currentHookNameInDev", "useOptimistic");
      __ST.updateHookTypesDev();
      return __ST.rerenderOptimistic(passthrough, reducer);
    },
    useHostTransitionStatus: __ST.useHostTransitionStatus,
    useMemoCache: __ST.useMemoCache,
    useCacheRefresh: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useCacheRefresh");
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useEffectEvent: function (callback) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffectEvent");
      __ST.updateHookTypesDev();
      return __ST.updateEvent(callback);
    }
  });
  __spikeSetST(__ST, "InvalidNestedHooksDispatcherOnMountInDEV", {
    readContext: function (context) {
      __ST.warnInvalidContextAccess();
      return __ST.readContext(context);
    },
    use: function (usable) {
      __ST.warnInvalidHookAccess();
      return __ST.use(usable);
    },
    useCallback: function (callback, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useCallback");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountCallback(callback, deps);
    },
    useContext: function (context) {
      __spikeSetST(__ST, "currentHookNameInDev", "useContext");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.readContext(context);
    },
    useEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffect");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountEffect(create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useImperativeHandle");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useInsertionEffect");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      __ST.mountEffectImpl(4, __ST.Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useLayoutEffect");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountLayoutEffect(create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useMemo");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return __ST.mountMemo(create, deps);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useReducer");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return __ST.mountReducer(reducer, initialArg, init);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function (initialValue) {
      __spikeSetST(__ST, "currentHookNameInDev", "useRef");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountRef(initialValue);
    },
    useState: function (initialState) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useState");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return __ST.mountState(initialState);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useDebugValue");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      __spikeSetST(__ST, "currentHookNameInDev", "useDeferredValue");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountDeferredValue(value, initialValue);
    },
    useTransition: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useTransition");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      __spikeSetST(__ST, "currentHookNameInDev", "useSyncExternalStore");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useId");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountId();
    },
    useFormState: function (action, initialState) {
      __spikeSetST(__ST, "currentHookNameInDev", "useFormState");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountActionState(action, initialState);
    },
    useActionState: function (action, initialState) {
      __spikeSetST(__ST, "currentHookNameInDev", "useActionState");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountActionState(action, initialState);
    },
    useOptimistic: function (passthrough) {
      __spikeSetST(__ST, "currentHookNameInDev", "useOptimistic");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountOptimistic(passthrough);
    },
    useMemoCache: function (size) {
      __ST.warnInvalidHookAccess();
      return __ST.useMemoCache(size);
    },
    useHostTransitionStatus: __ST.useHostTransitionStatus,
    useCacheRefresh: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useCacheRefresh");
      __ST.mountHookTypesDev();
      return __ST.mountRefresh();
    },
    useEffectEvent: function (callback) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffectEvent");
      __ST.warnInvalidHookAccess();
      __ST.mountHookTypesDev();
      return __ST.mountEvent(callback);
    }
  });
  __spikeSetST(__ST, "InvalidNestedHooksDispatcherOnUpdateInDEV", {
    readContext: function (context) {
      __ST.warnInvalidContextAccess();
      return __ST.readContext(context);
    },
    use: function (usable) {
      __ST.warnInvalidHookAccess();
      return __ST.use(usable);
    },
    useCallback: function (callback, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useCallback");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateCallback(callback, deps);
    },
    useContext: function (context) {
      __spikeSetST(__ST, "currentHookNameInDev", "useContext");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.readContext(context);
    },
    useEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffect");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      __ST.updateEffectImpl(2048, __ST.Passive, create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useImperativeHandle");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useInsertionEffect");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateEffectImpl(4, __ST.Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useLayoutEffect");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateEffectImpl(4, __ST.Layout, create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useMemo");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return __ST.updateMemo(create, deps);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useReducer");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return __ST.updateReducer(reducer, initialArg, init);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useRef");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useState: function () {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useState");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return __ST.updateReducer(__ST.basicStateReducer);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useDebugValue");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      __spikeSetST(__ST, "currentHookNameInDev", "useDeferredValue");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateDeferredValue(value, initialValue);
    },
    useTransition: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useTransition");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      __spikeSetST(__ST, "currentHookNameInDev", "useSyncExternalStore");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useId");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useFormState: function (action) {
      __spikeSetST(__ST, "currentHookNameInDev", "useFormState");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateActionState(action);
    },
    useActionState: function (action) {
      __spikeSetST(__ST, "currentHookNameInDev", "useActionState");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateActionState(action);
    },
    useOptimistic: function (passthrough, reducer) {
      __spikeSetST(__ST, "currentHookNameInDev", "useOptimistic");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateOptimistic(passthrough, reducer);
    },
    useMemoCache: function (size) {
      __ST.warnInvalidHookAccess();
      return __ST.useMemoCache(size);
    },
    useHostTransitionStatus: __ST.useHostTransitionStatus,
    useCacheRefresh: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useCacheRefresh");
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useEffectEvent: function (callback) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffectEvent");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateEvent(callback);
    }
  });
  __spikeSetST(__ST, "InvalidNestedHooksDispatcherOnRerenderInDEV", {
    readContext: function (context) {
      __ST.warnInvalidContextAccess();
      return __ST.readContext(context);
    },
    use: function (usable) {
      __ST.warnInvalidHookAccess();
      return __ST.use(usable);
    },
    useCallback: function (callback, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useCallback");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateCallback(callback, deps);
    },
    useContext: function (context) {
      __spikeSetST(__ST, "currentHookNameInDev", "useContext");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.readContext(context);
    },
    useEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffect");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      __ST.updateEffectImpl(2048, __ST.Passive, create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useImperativeHandle");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateImperativeHandle(ref, create, deps);
    },
    useInsertionEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useInsertionEffect");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateEffectImpl(4, __ST.Insertion, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      __spikeSetST(__ST, "currentHookNameInDev", "useLayoutEffect");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateEffectImpl(4, __ST.Layout, create, deps);
    },
    useMemo: function (create, deps) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useMemo");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return __ST.updateMemo(create, deps);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useReducer");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return __ST.rerenderReducer(reducer, initialArg, init);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useRef: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useRef");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useState: function () {
      let prevDispatcher;
      __spikeSetST(__ST, "currentHookNameInDev", "useState");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      prevDispatcher = __ST.ReactSharedInternals.H;
      __ST.ReactSharedInternals.H = __ST.InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return __ST.rerenderReducer(__ST.basicStateReducer);
      } finally {
        __ST.ReactSharedInternals.H = prevDispatcher;
      }
    },
    useDebugValue: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useDebugValue");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
    },
    useDeferredValue: function (value, initialValue) {
      __spikeSetST(__ST, "currentHookNameInDev", "useDeferredValue");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.rerenderDeferredValue(value, initialValue);
    },
    useTransition: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useTransition");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.rerenderTransition();
    },
    useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
      __spikeSetST(__ST, "currentHookNameInDev", "useSyncExternalStore");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },
    useId: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useId");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useFormState: function (action) {
      __spikeSetST(__ST, "currentHookNameInDev", "useFormState");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.rerenderActionState(action);
    },
    useActionState: function (action) {
      __spikeSetST(__ST, "currentHookNameInDev", "useActionState");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.rerenderActionState(action);
    },
    useOptimistic: function (passthrough, reducer) {
      __spikeSetST(__ST, "currentHookNameInDev", "useOptimistic");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.rerenderOptimistic(passthrough, reducer);
    },
    useMemoCache: function (size) {
      __ST.warnInvalidHookAccess();
      return __ST.useMemoCache(size);
    },
    useHostTransitionStatus: __ST.useHostTransitionStatus,
    useCacheRefresh: function () {
      __spikeSetST(__ST, "currentHookNameInDev", "useCacheRefresh");
      __ST.updateHookTypesDev();
      return __ST.updateWorkInProgressHook().memoizedState;
    },
    useEffectEvent: function (callback) {
      __spikeSetST(__ST, "currentHookNameInDev", "useEffectEvent");
      __ST.warnInvalidHookAccess();
      __ST.updateHookTypesDev();
      return __ST.updateEvent(callback);
    }
  });
  __spikeSetST(__ST, "fakeInternalInstance", {});
  __spikeSetST(__ST, "didWarnAboutStateAssignmentForComponent", __new(Set));
  __spikeSetST(__ST, "didWarnAboutUninitializedState", __new(Set));
  __spikeSetST(__ST, "didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate", __new(Set));
  __spikeSetST(__ST, "didWarnAboutLegacyLifecyclesAndDerivedState", __new(Set));
  __spikeSetST(__ST, "didWarnAboutDirectlyAssigningPropsToState", __new(Set));
  __spikeSetST(__ST, "didWarnAboutUndefinedDerivedState", __new(Set));
  __spikeSetST(__ST, "didWarnAboutContextTypes_1", __new(Set));
  __spikeSetST(__ST, "didWarnAboutChildContextTypes", __new(Set));
  __spikeSetST(__ST, "didWarnAboutInvalidateContextType", __new(Set));
  __spikeSetST(__ST, "didWarnOnInvalidCallback", __new(Set));
  Object.freeze(__ST.fakeInternalInstance);
  __spikeSetST(__ST, "classComponentUpdater", {
    enqueueSetState: function (inst, payload, callback) {
      let lane, update;
      inst = inst._reactInternals;
      lane = __ST.requestUpdateLane(inst);
      update = __ST.createUpdate(lane);
      update.payload = payload;
      void 0 !== callback && undefined !== callback && (__ST.warnOnInvalidCallback(callback), update.callback = callback);
      payload = __ST.enqueueUpdate(inst, update, lane);
      undefined !== payload && (__ST.startUpdateTimerByLane(lane, "this.setState()", inst), __ST.scheduleUpdateOnFiber(payload, inst, lane), __ST.entangleTransitions(payload, inst, lane));
    },
    enqueueReplaceState: function (inst, payload, callback) {
      let lane, update;
      inst = inst._reactInternals;
      lane = __ST.requestUpdateLane(inst);
      update = __ST.createUpdate(lane);
      update.tag = __ST.ReplaceState;
      update.payload = payload;
      void 0 !== callback && undefined !== callback && (__ST.warnOnInvalidCallback(callback), update.callback = callback);
      payload = __ST.enqueueUpdate(inst, update, lane);
      undefined !== payload && (__ST.startUpdateTimerByLane(lane, "this.replaceState()", inst), __ST.scheduleUpdateOnFiber(payload, inst, lane), __ST.entangleTransitions(payload, inst, lane));
    },
    enqueueForceUpdate: function (inst, callback) {
      let lane, update;
      inst = inst._reactInternals;
      lane = __ST.requestUpdateLane(inst);
      update = __ST.createUpdate(lane);
      update.tag = __ST.ForceUpdate;
      void 0 !== callback && undefined !== callback && (__ST.warnOnInvalidCallback(callback), update.callback = callback);
      callback = __ST.enqueueUpdate(inst, update, lane);
      undefined !== callback && (__ST.startUpdateTimerByLane(lane, "this.forceUpdate()", inst), __ST.scheduleUpdateOnFiber(callback, inst, lane), __ST.entangleTransitions(callback, inst, lane));
    }
  });
  __spikeSetST(__ST, "componentName", undefined);
  __spikeSetST(__ST, "errorBoundaryName", undefined);
  __spikeSetST(__ST, "SelectiveHydrationException", Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."));
  __spikeSetST(__ST, "didReceiveUpdate", !1);
  __spikeSetST(__ST, "didWarnAboutBadClass", {});
  __spikeSetST(__ST, "didWarnAboutContextTypeOnFunctionComponent", {});
  __spikeSetST(__ST, "didWarnAboutContextTypes", {});
  __spikeSetST(__ST, "didWarnAboutGetDerivedStateOnFunctionComponent", {});
  __spikeSetST(__ST, "didWarnAboutReassigningProps", !1);
  __spikeSetST(__ST, "didWarnAboutRevealOrder", {});
  __spikeSetST(__ST, "didWarnAboutTailOptions", {});
  __spikeSetST(__ST, "SUSPENDED_MARKER", {
    dehydrated: undefined,
    treeContext: undefined,
    retryLane: 0,
    hydrationErrors: undefined
  });
  __spikeSetST(__ST, "hasWarnedAboutUsingNoValuePropOnContextProvider", !1);
  __spikeSetST(__ST, "didWarnAboutUndefinedSnapshotBeforeUpdate", undefined);
  __spikeSetST(__ST, "didWarnAboutUndefinedSnapshotBeforeUpdate", __new(Set));
  __spikeSetST(__ST, "offscreenSubtreeIsHidden", !1);
  __spikeSetST(__ST, "offscreenSubtreeWasHidden", !1);
  __spikeSetST(__ST, "needsFormReset", !1);
  __spikeSetST(__ST, "PossiblyWeakSet", "function" === typeOfJS(WeakSet) ? WeakSet : Set);
  __spikeSetST(__ST, "nextEffect", undefined);
  __spikeSetST(__ST, "inProgressLanes", undefined);
  __spikeSetST(__ST, "inProgressRoot", undefined);
  __spikeSetST(__ST, "hostParent", undefined);
  __spikeSetST(__ST, "hostParentIsContainer", !1);
  __spikeSetST(__ST, "currentHoistableRoot", undefined);
  __spikeSetST(__ST, "inHydratedSubtree", !1);
  __spikeSetST(__ST, "suspenseyCommitFlag", 8192);
  __spikeSetST(__ST, "DefaultAsyncDispatcher", {
    getCacheForType: function (resourceType) {
      let cache, cacheForType;
      cache = __ST.readContext(__ST.CacheContext);
      cacheForType = cache.data.get(resourceType);
      void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
      return cacheForType;
    },
    cacheSignal: function () {
      return __ST.readContext(__ST.CacheContext).controller.signal;
    },
    getOwner: function () {
      return __ST.current;
    }
  });
  __spikeSetST(__ST, "COMPONENT_TYPE", 0);
  __spikeSetST(__ST, "HAS_PSEUDO_CLASS_TYPE", 1);
  __spikeSetST(__ST, "ROLE_TYPE", 2);
  __spikeSetST(__ST, "TEST_NAME_TYPE", 3);
  __spikeSetST(__ST, "TEXT_TYPE", 4);
  if ("function" === typeOfJS(Symbol) && Symbol.for) {
    __spikeSetST(__ST, "symbolFor", Symbol.for);
    __spikeSetST(__ST, "COMPONENT_TYPE", __ST.symbolFor("selector.component"));
    __spikeSetST(__ST, "HAS_PSEUDO_CLASS_TYPE", __ST.symbolFor("selector.has_pseudo_class"));
    __spikeSetST(__ST, "ROLE_TYPE", __ST.symbolFor("selector.role"));
    __spikeSetST(__ST, "TEST_NAME_TYPE", __ST.symbolFor("selector.test_id"));
    __spikeSetST(__ST, "TEXT_TYPE", __ST.symbolFor("selector.text"));
  }
  __spikeSetST(__ST, "commitHooks", __arrNew());
  __spikeSetST(__ST, "PossiblyWeakMap", "function" === typeOfJS(WeakMap) ? WeakMap : Map);
  __spikeSetST(__ST, "NoContext", 0);
  __spikeSetST(__ST, "RenderContext", 2);
  __spikeSetST(__ST, "CommitContext", 4);
  __spikeSetST(__ST, "RootInProgress", 0);
  __spikeSetST(__ST, "RootFatalErrored", 1);
  __spikeSetST(__ST, "RootErrored", 2);
  __spikeSetST(__ST, "RootSuspended", 3);
  __spikeSetST(__ST, "RootSuspendedWithDelay", 4);
  __spikeSetST(__ST, "RootSuspendedAtTheShell", 6);
  __spikeSetST(__ST, "RootCompleted", 5);
  __spikeSetST(__ST, "executionContext", __ST.NoContext);
  __spikeSetST(__ST, "workInProgressRoot", undefined);
  __spikeSetST(__ST, "workInProgress", undefined);
  __spikeSetST(__ST, "workInProgressRootRenderLanes", 0);
  __spikeSetST(__ST, "NotSuspended", 0);
  __spikeSetST(__ST, "SuspendedOnError", 1);
  __spikeSetST(__ST, "SuspendedOnData", 2);
  __spikeSetST(__ST, "SuspendedOnImmediate", 3);
  __spikeSetST(__ST, "SuspendedOnInstance", 4);
  __spikeSetST(__ST, "SuspendedOnInstanceAndReadyToContinue", 5);
  __spikeSetST(__ST, "SuspendedOnDeprecatedThrowPromise", 6);
  __spikeSetST(__ST, "SuspendedAndReadyToContinue", 7);
  __spikeSetST(__ST, "SuspendedOnHydration", 8);
  __spikeSetST(__ST, "SuspendedOnAction", 9);
  __spikeSetST(__ST, "workInProgressSuspendedReason", __ST.NotSuspended);
  __spikeSetST(__ST, "workInProgressThrownValue", undefined);
  __spikeSetST(__ST, "workInProgressRootDidSkipSuspendedSiblings", !1);
  __spikeSetST(__ST, "workInProgressRootIsPrerendering", !1);
  __spikeSetST(__ST, "workInProgressRootDidAttachPingListener", !1);
  __spikeSetST(__ST, "entangledRenderLanes", 0);
  __spikeSetST(__ST, "workInProgressRootExitStatus", __ST.RootInProgress);
  __spikeSetST(__ST, "workInProgressRootSkippedLanes", 0);
  __spikeSetST(__ST, "workInProgressRootInterleavedUpdatedLanes", 0);
  __spikeSetST(__ST, "workInProgressRootPingedLanes", 0);
  __spikeSetST(__ST, "workInProgressDeferredLane", 0);
  __spikeSetST(__ST, "workInProgressSuspendedRetryLanes", 0);
  __spikeSetST(__ST, "workInProgressRootConcurrentErrors", undefined);
  __spikeSetST(__ST, "workInProgressRootRecoverableErrors", undefined);
  __spikeSetST(__ST, "workInProgressRootDidIncludeRecursiveRenderUpdate", !1);
  __spikeSetST(__ST, "globalMostRecentFallbackTime", 0);
  __spikeSetST(__ST, "globalMostRecentTransitionTime", 0);
  __spikeSetST(__ST, "FALLBACK_THROTTLE_MS", 300);
  __spikeSetST(__ST, "workInProgressRootRenderTargetTime", Infinity);
  __spikeSetST(__ST, "RENDER_TIMEOUT_MS", 500);
  __spikeSetST(__ST, "workInProgressTransitions", undefined);
  __spikeSetST(__ST, "workInProgressUpdateTask", undefined);
  __spikeSetST(__ST, "legacyErrorBoundariesThatAlreadyFailed", undefined);
  __spikeSetST(__ST, "IMMEDIATE_COMMIT", 0);
  __spikeSetST(__ST, "ABORTED_VIEW_TRANSITION_COMMIT", 1);
  __spikeSetST(__ST, "DELAYED_PASSIVE_COMMIT", 2);
  __spikeSetST(__ST, "ANIMATION_STARTED_COMMIT", 3);
  __spikeSetST(__ST, "NO_PENDING_EFFECTS", 0);
  __spikeSetST(__ST, "PENDING_MUTATION_PHASE", 1);
  __spikeSetST(__ST, "PENDING_LAYOUT_PHASE", 2);
  __spikeSetST(__ST, "PENDING_AFTER_MUTATION_PHASE", 3);
  __spikeSetST(__ST, "PENDING_SPAWNED_WORK", 4);
  __spikeSetST(__ST, "PENDING_PASSIVE_PHASE", 5);
  __spikeSetST(__ST, "pendingEffectsStatus", 0);
  __spikeSetST(__ST, "pendingEffectsRoot", undefined);
  __spikeSetST(__ST, "pendingFinishedWork", undefined);
  __spikeSetST(__ST, "pendingEffectsLanes", 0);
  __spikeSetST(__ST, "pendingEffectsRemainingLanes", 0);
  __spikeSetST(__ST, "pendingEffectsRenderEndTime", -0);
  __spikeSetST(__ST, "pendingPassiveTransitions", undefined);
  __spikeSetST(__ST, "pendingRecoverableErrors", undefined);
  __spikeSetST(__ST, "pendingSuspendedCommitReason", undefined);
  __spikeSetST(__ST, "pendingDelayedCommitReason", __ST.IMMEDIATE_COMMIT);
  __spikeSetST(__ST, "pendingSuspendedViewTransitionReason", undefined);
  __spikeSetST(__ST, "NESTED_UPDATE_LIMIT", 50);
  __spikeSetST(__ST, "nestedUpdateCount", 0);
  __spikeSetST(__ST, "rootWithNestedUpdates", undefined);
  __spikeSetST(__ST, "isFlushingPassiveEffects", !1);
  __spikeSetST(__ST, "didScheduleUpdateDuringPassiveEffects", !1);
  __spikeSetST(__ST, "NESTED_PASSIVE_UPDATE_LIMIT", 50);
  __spikeSetST(__ST, "nestedPassiveUpdateCount", 0);
  __spikeSetST(__ST, "rootWithPassiveNestedUpdates", undefined);
  __spikeSetST(__ST, "isRunningInsertionEffect", !1);
  __spikeSetST(__ST, "didWarnStateUpdateForNotYetMountedComponent", undefined);
  __spikeSetST(__ST, "didWarnAboutUpdateInRender", !1);
  __spikeSetST(__ST, "didWarnAboutUpdateInRenderForAnotherComponent", __new(Set));
  __spikeSetST(__ST, "fakeActCallbackNode", {});
  __spikeSetST(__ST, "resolveFamily", undefined);
  __spikeSetST(__ST, "failedBoundaries", undefined);
  __spikeSetST(__ST, "hasBadMapPolyfill", !1);
  try {
    __spikeSetST(__ST, "nonExtensibleObject", Object.preventExtensions({}));
    __new(Map, __arrNew(__arrNew(__ST.nonExtensibleObject, undefined)));
    __new(Set, __arrNew(__ST.nonExtensibleObject));
  } catch (e) {
    __spikeSetST(__ST, "hasBadMapPolyfill", !0);
  }
  __spikeSetST(__ST, "didWarnAboutNestedUpdates", !1);
  __spikeSetST(__ST, "didWarnAboutFindNodeInStrictMode", {});
  __spikeSetST(__ST, "overrideHookState", undefined);
  __spikeSetST(__ST, "overrideHookStateDeletePath", undefined);
  __spikeSetST(__ST, "overrideHookStateRenamePath", undefined);
  __spikeSetST(__ST, "overrideProps", undefined);
  __spikeSetST(__ST, "overridePropsDeletePath", undefined);
  __spikeSetST(__ST, "overridePropsRenamePath", undefined);
  __spikeSetST(__ST, "scheduleUpdate", undefined);
  __spikeSetST(__ST, "scheduleRetry", undefined);
  __spikeSetST(__ST, "setErrorHandler", undefined);
  __spikeSetST(__ST, "setSuspenseHandler", undefined);
  __spikeSetST(__ST, "overrideHookState", function (fiber, id, path, value) {
    id = __ST.findHook(fiber, id);
    undefined !== id && (path = __ST.copyWithSetImpl(id.memoizedState, path, 0, value), id.memoizedState = path, id.baseState = path, fiber.memoizedProps = __ST.assign({}, fiber.memoizedProps), path = __ST.enqueueConcurrentRenderForLane(fiber, 2), undefined !== path && __ST.scheduleUpdateOnFiber(path, fiber, 2));
  });
  __spikeSetST(__ST, "overrideHookStateDeletePath", function (fiber, id, path) {
    id = __ST.findHook(fiber, id);
    undefined !== id && (path = __ST.copyWithDeleteImpl(id.memoizedState, path, 0), id.memoizedState = path, id.baseState = path, fiber.memoizedProps = __ST.assign({}, fiber.memoizedProps), path = __ST.enqueueConcurrentRenderForLane(fiber, 2), undefined !== path && __ST.scheduleUpdateOnFiber(path, fiber, 2));
  });
  __spikeSetST(__ST, "overrideHookStateRenamePath", function (fiber, id, oldPath, newPath) {
    id = __ST.findHook(fiber, id);
    undefined !== id && (oldPath = __ST.copyWithRename(id.memoizedState, oldPath, newPath), id.memoizedState = oldPath, id.baseState = oldPath, fiber.memoizedProps = __ST.assign({}, fiber.memoizedProps), oldPath = __ST.enqueueConcurrentRenderForLane(fiber, 2), undefined !== oldPath && __ST.scheduleUpdateOnFiber(oldPath, fiber, 2));
  });
  __spikeSetST(__ST, "overrideProps", function (fiber, path, value) {
    fiber.pendingProps = __ST.copyWithSetImpl(fiber.memoizedProps, path, 0, value);
    fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
    path = __ST.enqueueConcurrentRenderForLane(fiber, 2);
    undefined !== path && __ST.scheduleUpdateOnFiber(path, fiber, 2);
  });
  __spikeSetST(__ST, "overridePropsDeletePath", function (fiber, path) {
    fiber.pendingProps = __ST.copyWithDeleteImpl(fiber.memoizedProps, path, 0);
    fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
    path = __ST.enqueueConcurrentRenderForLane(fiber, 2);
    undefined !== path && __ST.scheduleUpdateOnFiber(path, fiber, 2);
  });
  __spikeSetST(__ST, "overridePropsRenamePath", function (fiber, oldPath, newPath) {
    fiber.pendingProps = __ST.copyWithRename(fiber.memoizedProps, oldPath, newPath);
    fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
    oldPath = __ST.enqueueConcurrentRenderForLane(fiber, 2);
    undefined !== oldPath && __ST.scheduleUpdateOnFiber(oldPath, fiber, 2);
  });
  __spikeSetST(__ST, "scheduleUpdate", function (fiber) {
    let root;
    root = __ST.enqueueConcurrentRenderForLane(fiber, 2);
    undefined !== root && __ST.scheduleUpdateOnFiber(root, fiber, 2);
  });
  __spikeSetST(__ST, "scheduleRetry", function (fiber) {
    let lane, root;
    lane = __ST.claimNextRetryLane();
    root = __ST.enqueueConcurrentRenderForLane(fiber, lane);
    undefined !== root && __ST.scheduleUpdateOnFiber(root, fiber, lane);
  });
  __spikeSetST(__ST, "setErrorHandler", function (newShouldErrorImpl) {
    __ST.shouldErrorImpl = newShouldErrorImpl;
  });
  __spikeSetST(__ST, "setSuspenseHandler", function (newShouldSuspendImpl) {
    __ST.shouldSuspendImpl = newShouldSuspendImpl;
  });
  __ST.__exports.attemptContinuousHydration = function (fiber) {
    let root;
    if (13 === fiber.tag || 31 === fiber.tag) {
      root = __ST.enqueueConcurrentRenderForLane(fiber, 67108864);
      undefined !== root && __ST.scheduleUpdateOnFiber(root, fiber, 67108864);
      __ST.markRetryLaneIfNotHydrated(fiber, 67108864);
    }
  };
  __ST.__exports.attemptHydrationAtCurrentPriority = function (fiber) {
    let lane, root;
    if (13 === fiber.tag || 31 === fiber.tag) {
      lane = __ST.requestUpdateLane(fiber);
      lane = __ST.getBumpedLaneForHydrationByLane(lane);
      root = __ST.enqueueConcurrentRenderForLane(fiber, lane);
      undefined !== root && __ST.scheduleUpdateOnFiber(root, fiber, lane);
      __ST.markRetryLaneIfNotHydrated(fiber, lane);
    }
  };
  __ST.__exports.attemptSynchronousHydration = function (fiber) {
    let lanes, lane;
    switch (fiber.tag) {
      case 3:
        fiber = fiber.stateNode;
        if (fiber.current.memoizedState.isDehydrated) {
          lanes = __ST.getHighestPriorityLanes(fiber.pendingLanes);
          if (0 !== lanes) {
            fiber.pendingLanes |= 2;
            for (fiber.entangledLanes |= 2; lanes;) {
              lane = 1 << 31 - __ST.clz32(lanes);
              fiber.entanglements[1] |= lane;
              lanes &= ~lane;
            }
            __ST.ensureRootIsScheduled(fiber);
            (__ST.executionContext & (__ST.RenderContext | __ST.CommitContext)) === __ST.NoContext && (__ST.workInProgressRootRenderTargetTime = __cat(__ST.now_1(), __ST.RENDER_TIMEOUT_MS), __ST.flushSyncWorkAcrossRoots_impl(0, !1));
          }
        }
        break;
      case 31:
      case 13:
        lanes = __ST.enqueueConcurrentRenderForLane(fiber, 2), undefined !== lanes && __ST.scheduleUpdateOnFiber(lanes, fiber, 2), __ST.flushSyncWork(), __ST.markRetryLaneIfNotHydrated(fiber, 2);
    }
  };
  __ST.__exports.batchedUpdates = function (fn, a) {
    return fn(a);
  };
  __ST.__exports.createComponentSelector = function (component) {
    return {
      $$typeof: __ST.COMPONENT_TYPE,
      value: component
    };
  };
  __ST.__exports.createContainer = function (containerInfo, tag, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
    return __ST.createFiberRoot(containerInfo, tag, !1, undefined, hydrationCallbacks, isStrictMode, identifierPrefix, undefined, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator);
  };
  __ST.__exports.createHasPseudoClassSelector = function (selectors) {
    return {
      $$typeof: __ST.HAS_PSEUDO_CLASS_TYPE,
      value: selectors
    };
  };
  __ST.__exports.createHydrationContainer = function (initialChildren, callback, containerInfo, tag, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, transitionCallbacks, formState) {
    initialChildren = __ST.createFiberRoot(containerInfo, tag, !0, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator);
    initialChildren.context = __ST.getContextForSubtree(undefined);
    containerInfo = initialChildren.current;
    tag = __ST.requestUpdateLane(containerInfo);
    tag = __ST.getBumpedLaneForHydrationByLane(tag);
    hydrationCallbacks = __ST.createUpdate(tag);
    hydrationCallbacks.callback = void 0 !== callback && undefined !== callback ? callback : undefined;
    __ST.enqueueUpdate(containerInfo, hydrationCallbacks, tag);
    __ST.startUpdateTimerByLane(tag, "hydrateRoot()", undefined);
    callback = tag;
    initialChildren.current.lanes = callback;
    __ST.markRootUpdated_1(initialChildren, callback);
    __ST.ensureRootIsScheduled(initialChildren);
    return initialChildren;
  };
  __ST.__exports.createPortal = function (children, containerInfo, implementation, ...__args) {
    let __allArgs = __arrNew(children, containerInfo, implementation, ...__args);
    let key, JSCompiler_inline_result;
    key = 3 < __len(__allArgs) && void 0 !== __argAt(__allArgs, 3) ? __argAt(__allArgs, 3) : undefined;
    try {
      __ST.testStringCoercion(key);
      JSCompiler_inline_result = !1;
    } catch (e_6) {
      JSCompiler_inline_result = !0;
    }
    JSCompiler_inline_result && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", "function" === typeOfJS(Symbol) && Symbol.toStringTag && key[Symbol.toStringTag] || key.constructor.name || "Object"), __ST.testStringCoercion(key));
    return {
      $$typeof: __ST.REACT_PORTAL_TYPE,
      key: key === undefined ? undefined : __cat("", key),
      children: children,
      containerInfo: containerInfo,
      implementation: implementation
    };
  };
  __ST.__exports.createRoleSelector = function (role) {
    return {
      $$typeof: __ST.ROLE_TYPE,
      value: role
    };
  };
  __ST.__exports.createTestNameSelector = function (id) {
    return {
      $$typeof: __ST.TEST_NAME_TYPE,
      value: id
    };
  };
  __ST.__exports.createTextSelector = function (text) {
    return {
      $$typeof: __ST.TEXT_TYPE,
      value: text
    };
  };
  __ST.__exports.defaultOnCaughtError = function (__error) {
    let componentNameMessage, recreateMessage;
    componentNameMessage = __ST.componentName ? __cat(__cat("The above error occurred in the <", __ST.componentName), "> component.") : "The above error occurred in one of your React components.";
    recreateMessage = __cat("React will try to recreate this component tree from scratch using the error boundary you provided, ", __cat(__ST.errorBoundaryName || "Anonymous", "."));
    "object" === typeOfJS(__error) && undefined !== __error && "string" === typeOfJS(__error.environmentName) ? __ST.bindToConsole("error", __arrNew("%o\n\n%s\n\n%s\n", __error, componentNameMessage, recreateMessage), __error.environmentName)() : console.error("%o\n\n%s\n\n%s\n", __error, componentNameMessage, recreateMessage);
  };
  __ST.__exports.defaultOnRecoverableError = function (__error) {
    __ST.reportGlobalError(__error);
  };
  __ST.__exports.defaultOnUncaughtError = function (__error) {
    __ST.reportGlobalError(__error);
    console.warn("%s\n\n%s\n", __ST.componentName ? __cat(__cat("An error occurred in the <", __ST.componentName), "> component.") : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
  };
  __ST.__exports.deferredUpdates = function (fn) {
    let prevTransition, previousPriority;
    prevTransition = __ST.ReactSharedInternals.T;
    previousPriority = __ST.getCurrentUpdatePriority();
    try {
      return __ST.setCurrentUpdatePriority(32), __ST.ReactSharedInternals.T = undefined, fn();
    } finally {
      __ST.setCurrentUpdatePriority(previousPriority), __ST.ReactSharedInternals.T = prevTransition;
    }
  };
  __ST.__exports.discreteUpdates = function (fn, a, b, c, d) {
    let prevTransition, previousPriority;
    prevTransition = __ST.ReactSharedInternals.T;
    previousPriority = __ST.getCurrentUpdatePriority();
    try {
      return __ST.setCurrentUpdatePriority(2), __ST.ReactSharedInternals.T = undefined, fn(a, b, c, d);
    } finally {
      __ST.setCurrentUpdatePriority(previousPriority), __ST.ReactSharedInternals.T = prevTransition, __ST.executionContext === __ST.NoContext && (__ST.workInProgressRootRenderTargetTime = __cat(__ST.now_1(), __ST.RENDER_TIMEOUT_MS));
    }
  };
  __ST.__exports.findAllNodes = __ST.findAllNodes;
  __ST.__exports.findBoundingRects = function (hostRoot, selectors) {
    let i, targetLeft, targetRight, targetTop, targetBottom, j, otherRect, otherLeft, otherRight, otherTop, otherBottom;
    if (!__ST.supportsTestSelectors) throw Error("Test selector API is not supported by this renderer.");
    selectors = __ST.findAllNodes(hostRoot, selectors);
    hostRoot = __arrNew();
    for (i = 0; i < __len(selectors); i++) __push(hostRoot, __ST.getBoundingRect(selectors[i]));
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
  __ST.__exports.findHostInstance = function (component) {
    let fiber;
    fiber = component._reactInternals;
    if (void 0 === fiber) {
      if ("function" === typeOfJS(component.render)) throw Error("Unable to find node on an unmounted component.");
      component = __join(Object.keys(component), ",");
      throw Error(__cat("Argument appears to not be a ReactComponent. Keys: ", component));
    }
    component = __ST.findCurrentHostFiber(fiber);
    return undefined === component ? undefined : __ST.getPublicInstance(component.stateNode);
  };
  __ST.__exports.findHostInstanceWithNoPortals = function (fiber) {
    fiber = __ST.findCurrentFiberUsingSlowPath(fiber);
    fiber = undefined !== fiber ? __ST.findCurrentHostFiberWithNoPortalsImpl(fiber) : undefined;
    return undefined === fiber ? undefined : __ST.getPublicInstance(fiber.stateNode);
  };
  __ST.__exports.findHostInstanceWithWarning = function (component, methodName) {
    let fiber, componentName;
    fiber = component._reactInternals;
    if (void 0 === fiber) {
      if ("function" === typeOfJS(component.render)) throw Error("Unable to find node on an unmounted component.");
      component = __join(Object.keys(component), ",");
      throw Error(__cat("Argument appears to not be a ReactComponent. Keys: ", component));
    }
    component = __ST.findCurrentHostFiber(fiber);
    if (undefined === component) return undefined;
    if (component.mode & 8) {
      componentName = __ST.getComponentNameFromFiber(fiber) || "Component";
      __ST.didWarnAboutFindNodeInStrictMode[componentName] || (__ST.didWarnAboutFindNodeInStrictMode[componentName] = !0, __ST.runWithFiberInDEV(component, function () {
        fiber.mode & 8 ? console.error("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://react.dev/link/strict-mode-find-node", methodName, methodName, componentName) : console.error("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://react.dev/link/strict-mode-find-node", methodName, methodName, componentName);
      }));
    }
    return __ST.getPublicInstance(component.stateNode);
  };
  __ST.__exports.flushPassiveEffects = __ST.flushPendingEffects;
  __ST.__exports.flushSyncFromReconciler = function (fn) {
    let prevExecutionContext, prevTransition, previousPriority;
    prevExecutionContext = __ST.executionContext;
    __spikeSetST(__ST, "executionContext", 1);
    prevTransition = __ST.ReactSharedInternals.T;
    previousPriority = __ST.getCurrentUpdatePriority();
    try {
      if (__ST.setCurrentUpdatePriority(2), __ST.ReactSharedInternals.T = undefined, fn) return fn();
    } finally {
      __ST.setCurrentUpdatePriority(previousPriority), __ST.ReactSharedInternals.T = prevTransition, __ST.executionContext = prevExecutionContext, (__ST.executionContext & (__ST.RenderContext | __ST.CommitContext)) === __ST.NoContext && __ST.flushSyncWorkAcrossRoots_impl(0, !1);
    }
  };
  __ST.__exports.flushSyncWork = __ST.flushSyncWork;
  __ST.__exports.focusWithin = function (_hostRoot, selectors) {
    let fiber, tag;
    if (!__ST.supportsTestSelectors) throw Error("Test selector API is not supported by this renderer.");
    _hostRoot = __ST.findFiberRootForHostRoot(_hostRoot);
    selectors = __ST.findPaths(_hostRoot, selectors);
    selectors = __arrFrom(selectors);
    for (let _hostRoot = 0; _hostRoot < __len(selectors);) {
      fiber = selectors[_hostRoot++];
      tag = fiber.tag;
      if (!__ST.isHiddenSubtree(fiber)) {
        if ((5 === tag || 26 === tag || 27 === tag) && __ST.setFocusIfFocusable(fiber.stateNode)) return !0;
        for (fiber = fiber.child; undefined !== fiber;) __push(selectors, fiber), fiber = fiber.sibling;
      }
    }
    return !1;
  };
  __ST.__exports.getFindAllNodesFailureDescription = function (hostRoot, selectors) {
    let maxSelectorIndex, matchedNames, index, fiber, tag, selectorIndex, selector;
    if (!__ST.supportsTestSelectors) throw Error("Test selector API is not supported by this renderer.");
    maxSelectorIndex = 0;
    matchedNames = __arrNew();
    hostRoot = __arrNew(__ST.findFiberRootForHostRoot(hostRoot), 0);
    for (index = 0; index < __len(hostRoot);) {
      fiber = hostRoot[index++];
      tag = fiber.tag;
      selectorIndex = hostRoot[index++];
      selector = selectors[selectorIndex];
      if (5 !== tag && 26 !== tag && 27 !== tag || !__ST.isHiddenSubtree(fiber)) if (__ST.matchSelector(fiber, selector) && (__push(matchedNames, __ST.selectorToString(selector)), selectorIndex++, selectorIndex > maxSelectorIndex && (maxSelectorIndex = selectorIndex)), selectorIndex < __len(selectors)) for (fiber = fiber.child; undefined !== fiber;) __push(hostRoot, fiber, selectorIndex), fiber = fiber.sibling;
    }
    if (maxSelectorIndex < __len(selectors)) {
      for (hostRoot = __arrNew(); maxSelectorIndex < __len(selectors); maxSelectorIndex++) __push(hostRoot, __ST.selectorToString(selectors[maxSelectorIndex]));
      return __cat(__cat("findAllNodes was able to match part of the selector:\n  ", __cat(__join(matchedNames, " > "), "\n\nNo matching component was found for:\n  ")), __join(hostRoot, " > "));
    }
    return undefined;
  };
  __ST.__exports.getPublicRootInstance = function (container) {
    container = container.current;
    if (!container.child) return undefined;
    switch (container.child.tag) {
      case 27:
      case 5:
        return __ST.getPublicInstance(container.child.stateNode);
      default:
        return container.child.stateNode;
    }
  };
  __ST.__exports.injectIntoDevTools = function () {
    let internals;
    internals = {
      bundleType: 1,
      version: __ST.rendererVersion,
      rendererPackageName: __ST.rendererPackageName,
      currentDispatcherRef: __ST.ReactSharedInternals,
      reconcilerVersion: "19.2.0"
    };
    undefined !== __ST.extraDevToolsConfig && (internals.rendererConfig = __ST.extraDevToolsConfig);
    internals.overrideHookState = __ST.overrideHookState;
    internals.overrideHookStateDeletePath = __ST.overrideHookStateDeletePath;
    internals.overrideHookStateRenamePath = __ST.overrideHookStateRenamePath;
    internals.overrideProps = __ST.overrideProps;
    internals.overridePropsDeletePath = __ST.overridePropsDeletePath;
    internals.overridePropsRenamePath = __ST.overridePropsRenamePath;
    internals.scheduleUpdate = __ST.scheduleUpdate;
    internals.scheduleRetry = __ST.scheduleRetry;
    internals.setErrorHandler = __ST.setErrorHandler;
    internals.setSuspenseHandler = __ST.setSuspenseHandler;
    internals.scheduleRefresh = __ST.scheduleRefresh;
    internals.scheduleRoot = __ST.scheduleRoot;
    internals.setRefreshHandler = __ST.setRefreshHandler;
    internals.getCurrentFiber = __ST.getCurrentFiberForDevTools;
    return __ST.injectInternals(internals);
  };
  __ST.__exports.isAlreadyRendering = __ST.isAlreadyRendering;
  __ST.__exports.observeVisibleRects = function (hostRoot, selectors, callback, options) {
    let instanceRoots, disconnect, observe, unobserve;
    function commitHook() {
      let nextInstanceRoots;
      nextInstanceRoots = __ST.findAllNodes(hostRoot, selectors);
      __forEach(instanceRoots, function (target) {
        0 > __indexOf(nextInstanceRoots, target) && unobserve(target);
      });
      __forEach(nextInstanceRoots, function (target) {
        0 > __indexOf(instanceRoots, target) && observe(target);
      });
    }
    if (!__ST.supportsTestSelectors) throw Error("Test selector API is not supported by this renderer.");
    instanceRoots = __ST.findAllNodes(hostRoot, selectors);
    callback = __ST.setupIntersectionObserver(instanceRoots, callback, options);
    disconnect = callback.disconnect;
    observe = callback.observe;
    unobserve = callback.unobserve;
    __push(__ST.commitHooks, commitHook);
    return {
      disconnect: function () {
        let index;
        index = __indexOf(__ST.commitHooks, commitHook);
        0 <= index && __splice(__ST.commitHooks, index, 1);
        disconnect();
      }
    };
  };
  __ST.__exports.shouldError = function (fiber) {
    return __ST.shouldErrorImpl(fiber);
  };
  __ST.__exports.shouldSuspend = function (fiber) {
    return __ST.shouldSuspendImpl(fiber);
  };
  __ST.__exports.startHostTransition = function (formFiber, pendingState, action, formData) {
    let queue;
    if (5 !== formFiber.tag) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
    queue = __ST.ensureFormComponentIsStateful(formFiber).queue;
    __ST.startHostActionTimer(formFiber);
    __ST.startTransition(formFiber, queue, pendingState, __ST.NotPendingTransition, undefined === action ? __ST.noop : function () {
      let stateHook;
      undefined === __ST.ReactSharedInternals.T && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
      stateHook = __ST.ensureFormComponentIsStateful(formFiber);
      undefined === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
      __ST.dispatchSetStateInternal(formFiber, stateHook.next.queue, {}, __ST.requestUpdateLane(formFiber));
      return action(formData);
    });
  };
  __ST.__exports.updateContainer = function (element, container, parentComponent, callback) {
    let current, lane;
    current = container.current;
    lane = __ST.requestUpdateLane(current);
    __ST.updateContainerImpl(current, lane, element, container, parentComponent, callback);
    return lane;
  };
  __ST.__exports.updateContainerSync = __ST.updateContainerSync;
  return __ST.__exports;
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