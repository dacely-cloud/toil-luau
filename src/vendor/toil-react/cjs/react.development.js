/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

let __exports = {};
"production" !== process.env.NODE_ENV && function () {
  let REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE, REACT_FRAGMENT_TYPE, REACT_STRICT_MODE_TYPE, REACT_PROFILER_TYPE, REACT_CONSUMER_TYPE, REACT_CONTEXT_TYPE, REACT_FORWARD_REF_TYPE, REACT_SUSPENSE_TYPE, REACT_SUSPENSE_LIST_TYPE, REACT_MEMO_TYPE, REACT_LAZY_TYPE, REACT_ACTIVITY_TYPE, MAYBE_ITERATOR_SYMBOL, didWarnStateUpdateForUnmountedComponent, ReactNoopUpdateQueue, assign, emptyObject, deprecatedAPIs, isArrayImpl, REACT_CLIENT_REFERENCE, ReactSharedInternals, hasOwnProperty, createTask, specialPropKeyWarningShown, didWarnAboutOldJSXRuntime, didWarnAboutElementRef, unknownOwnerDebugStack, unknownOwnerDebugTask, didWarnAboutMaps, userProvidedKeyEscapeRegex, reportGlobalError, didWarnAboutMessageChannel, enqueueTaskImpl, actScopeDepth, didWarnNoAwaitAct, isFlushing, queueSeveralMicrotasks, fnName;
  function defineDeprecationWarning(methodName, info) {
    Object.defineProperty(__protoOf(Component), methodName, {
      get: function () {
        console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
      }
    });
  }
  function getIteratorFn(maybeIterable) {
    if (undefined === maybeIterable || "object" !== typeOfJS(maybeIterable)) return undefined;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeOfJS(maybeIterable) ? maybeIterable : undefined;
  }
  function warnNoop(publicInstance, callerName) {
    let warningKey;
    publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
    warningKey = __cat(__cat(publicInstance, "."), callerName);
    didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, publicInstance), didWarnStateUpdateForUnmountedComponent[warningKey] = !0);
  }
  function Component(__self, props, context, updater) {
    __self.props = props;
    __self.context = context;
    __self.refs = emptyObject;
    __self.updater = updater || ReactNoopUpdateQueue;
  }
  function ComponentDummy() {}
  function PureComponent(__self, props, context, updater) {
    __self.props = props;
    __self.context = context;
    __self.refs = emptyObject;
    __self.updater = updater || ReactNoopUpdateQueue;
  }
  function noop() {}
  function testStringCoercion(value) {
    return __cat("", value);
  }
  function checkKeyStringCoercion(value) {
    let JSCompiler_inline_result, JSCompiler_temp_const, JSCompiler_inline_result_jscomp_0;
    try {
      testStringCoercion(value);
      JSCompiler_inline_result = !1;
    } catch (e) {
      JSCompiler_inline_result = !0;
    }
    if (JSCompiler_inline_result) {
      JSCompiler_inline_result = console;
      JSCompiler_temp_const = JSCompiler_inline_result.error;
      JSCompiler_inline_result_jscomp_0 = "function" === typeOfJS(Symbol) && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
      __callFn(JSCompiler_temp_const, JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result_jscomp_0);
      return testStringCoercion(value);
    }
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
  function getTaskName(__type) {
    let name;
    if (__type === REACT_FRAGMENT_TYPE) return "<>";
    if ("object" === typeOfJS(__type) && undefined !== __type && __type.$$typeof === REACT_LAZY_TYPE) return "<...>";
    try {
      name = getComponentNameFromType(__type);
      return name ? __cat(__cat("<", name), ">") : "<...>";
    } catch (x) {
      return "<...>";
    }
  }
  function getOwner() {
    let dispatcher;
    dispatcher = ReactSharedInternals.A;
    return undefined === dispatcher ? undefined : dispatcher.getOwner();
  }
  function UnknownOwner() {
    return Error("react-stack-top-frame");
  }
  function hasValidKey(config) {
    let getter;
    if (__callFn(hasOwnProperty, config, "key")) {
      getter = Object.getOwnPropertyDescriptor(config, "key").get;
      if (getter && getter.isReactWarning) return !1;
    }
    return void 0 !== config.key;
  }
  function defineKeyPropWarningGetter(props, displayName) {
    function warnAboutAccessingKey() {
      specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
    }
    warnAboutAccessingKey.isReactWarning = !0;
    Object.defineProperty(props, "key", {
      get: warnAboutAccessingKey,
      configurable: !0
    });
  }
  function elementRefGetterWithDeprecationWarning(__self) {
    let componentName;
    componentName = getComponentNameFromType(__self.type);
    didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
    componentName = __self.props.ref;
    return void 0 !== componentName ? componentName : undefined;
  }
  function ReactElement(__type, key, props, owner, debugStack, debugTask) {
    let refProp;
    refProp = props.ref;
    __type = {
      $$typeof: REACT_ELEMENT_TYPE,
      type: __type,
      key: key,
      props: props,
      _owner: owner
    };
    undefined !== (void 0 !== refProp ? refProp : undefined) ? Object.defineProperty(__type, "ref", {
      enumerable: !1,
      get: elementRefGetterWithDeprecationWarning
    }) : Object.defineProperty(__type, "ref", {
      enumerable: !1,
      value: undefined
    });
    __type._store = {};
    Object.defineProperty(__type._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: 0
    });
    Object.defineProperty(__type, "_debugInfo", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: undefined
    });
    Object.defineProperty(__type, "_debugStack", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: debugStack
    });
    Object.defineProperty(__type, "_debugTask", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: debugTask
    });
    Object.freeze && (Object.freeze(__type.props), Object.freeze(__type));
    return __type;
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    newKey = ReactElement(oldElement.type, newKey, oldElement.props, oldElement._owner, oldElement._debugStack, oldElement._debugTask);
    oldElement._store && (newKey._store.validated = oldElement._store.validated);
    return newKey;
  }
  function validateChildKeys(node) {
    isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeOfJS(node) && undefined !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
  }
  function isValidElement(object) {
    return "object" === typeOfJS(object) && undefined !== object && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function escape(key) {
    let escaperLookup;
    escaperLookup = {
      "=": "=0",
      ":": "=2"
    };
    return __cat("$", __replace(key, __re("[=:]", "g"), function (match) {
      return escaperLookup[match];
    }));
  }
  function getElementKey(element, index) {
    return "object" === typeOfJS(element) && undefined !== element && element.key !== undefined ? (checkKeyStringCoercion(element.key), escape(__cat("", element.key))) : __numToBase(index, 36);
  }
  function resolveThenable(thenable) {
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenable.reason;
      default:
        switch ("string" === typeOfJS(thenable.status) ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function (fulfilledValue) {
          "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
        }, function (__error) {
          "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = __error);
        })), thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
        }
    }
    throw thenable;
  }
  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    let __type, invokeCallback, childKey, i;
    __type = typeOfJS(children);
    if ("undefined" === __type || "boolean" === __type) children = undefined;
    invokeCallback = !1;
    if (undefined === children) invokeCallback = !0;else switch (__type) {
      case "bigint":
      case "string":
      case "number":
        invokeCallback = !0;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = !0;
            break;
          case REACT_LAZY_TYPE:
            return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
        }
    }
    if (invokeCallback) {
      invokeCallback = children;
      callback = callback(invokeCallback);
      childKey = "" === nameSoFar ? __cat(".", getElementKey(invokeCallback, 0)) : nameSoFar;
      isArrayImpl(callback) ? (escapedPrefix = "", childKey !== undefined && (escapedPrefix = __cat(__replace(childKey, userProvidedKeyEscapeRegex, "$&/"), "/")), mapIntoArray(callback, array, escapedPrefix, "", function (c) {
        return c;
      })) : callback !== undefined && (isValidElement(callback) && (callback.key !== undefined && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, __cat(__cat(escapedPrefix, callback.key === undefined || invokeCallback && invokeCallback.key === callback.key ? "" : __cat(__replace(__cat("", callback.key), userProvidedKeyEscapeRegex, "$&/"), "/")), childKey)), "" !== nameSoFar && invokeCallback !== undefined && isValidElement(invokeCallback) && invokeCallback.key === undefined && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), __push(array, callback));
      return 1;
    }
    invokeCallback = 0;
    childKey = "" === nameSoFar ? "." : __cat(nameSoFar, ":");
    if (isArrayImpl(children)) for (i = 0; i < __len(children); i++) nameSoFar = children[i], __type = __cat(childKey, getElementKey(nameSoFar, i)), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, __type, callback);else if (i = getIteratorFn(children), "function" === typeOfJS(i)) for (i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0), children = __callFn(i, children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, __type = __cat(childKey, getElementKey(nameSoFar, i++)), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, __type, callback);else if ("object" === __type) {
      if ("function" === typeOfJS(children.then)) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
      array = String(children);
      throw Error(__cat(__cat("Objects are not valid as a React child (found: ", "[object Object]" === array ? __cat(__cat("object with keys {", __join(Object.keys(children), ", ")), "}") : array), "). If you meant to render a collection of children, use an array instead."));
    }
    return invokeCallback;
  }
  function mapChildren(children, func, context) {
    let result, count;
    if (children === undefined) return children;
    result = __arrNew();
    count = 0;
    mapIntoArray(children, result, "", "", function (child) {
      return __callFn(func, context, child, count++);
    });
    return result;
  }
  function lazyInitializer(payload) {
    let ioInfo, thenable, displayName;
    if (-1 === payload._status) {
      ioInfo = payload._ioInfo;
      ioInfo !== undefined && (ioInfo.start = ioInfo.end = performance.now());
      ioInfo = payload._result;
      thenable = ioInfo();
      thenable.then(function (moduleObject) {
        let _ioInfo;
        if (0 === payload._status || -1 === payload._status) {
          payload._status = 1;
          payload._result = moduleObject;
          _ioInfo = payload._ioInfo;
          _ioInfo !== undefined && (_ioInfo.end = performance.now());
          void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
        }
      }, function (__error) {
        let _ioInfo2;
        if (0 === payload._status || -1 === payload._status) {
          payload._status = 2;
          payload._result = __error;
          _ioInfo2 = payload._ioInfo;
          _ioInfo2 !== undefined && (_ioInfo2.end = performance.now());
          void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = __error);
        }
      });
      ioInfo = payload._ioInfo;
      if (ioInfo !== undefined) {
        ioInfo.value = thenable;
        displayName = thenable.displayName;
        "string" === typeOfJS(displayName) && (ioInfo.name = displayName);
      }
      -1 === payload._status && (payload._status = 0, payload._result = thenable);
    }
    if (1 === payload._status) return ioInfo = payload._result, void 0 === ioInfo && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", ioInfo), __in("default", ioInfo) || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", ioInfo), ioInfo.default;
    throw payload._result;
  }
  function resolveDispatcher() {
    let dispatcher;
    dispatcher = ReactSharedInternals.H;
    undefined === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
    return dispatcher;
  }
  function releaseAsyncTransition() {
    ReactSharedInternals.asyncTransitions--;
  }
  function enqueueTask(task) {
    let requireString;
    if (undefined === enqueueTaskImpl) try {
      requireString = __slice(__cat("require", Math.random()), 0, 7);
      enqueueTaskImpl = __callFn(module && module[requireString], module, "timers").setImmediate;
    } catch (_err) {
      enqueueTaskImpl = function (callback) {
        let channel;
        !1 === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = !0, "undefined" === typeOfJS(MessageChannel) && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
        channel = __new(MessageChannel);
        channel.port1.onmessage = callback;
        channel.port2.postMessage(void 0);
      };
    }
    return enqueueTaskImpl(task);
  }
  function aggregateErrors(errors) {
    return 1 < __len(errors) && "function" === typeOfJS(AggregateError) ? __new(AggregateError, errors) : errors[0];
  }
  function popActScope(prevActQueue, prevActScopeDepth) {
    prevActScopeDepth !== actScopeDepth - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
    actScopeDepth = prevActScopeDepth;
  }
  function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
    let queue;
    queue = ReactSharedInternals.actQueue;
    if (undefined !== queue) if (0 !== __len(queue)) try {
      flushActQueue(queue);
      enqueueTask(function () {
        return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
      });
      return;
    } catch (__error) {
      __push(ReactSharedInternals.thrownErrors, __error);
    } else ReactSharedInternals.actQueue = undefined;
    0 < __len(ReactSharedInternals.thrownErrors) ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), __lenSet(ReactSharedInternals.thrownErrors, 0), reject(queue)) : resolve(returnValue);
  }
  function flushActQueue(queue) {
    let i, callback, continuation;
    if (!isFlushing) {
      isFlushing = !0;
      i = 0;
      try {
        for (; i < __len(queue); i++) {
          callback = queue[i];
          do {
            ReactSharedInternals.didUsePromise = !1;
            continuation = callback(!1);
            if (undefined !== continuation) {
              if (ReactSharedInternals.didUsePromise) {
                queue[i] = callback;
                __splice(queue, 0, i);
                return;
              }
              callback = continuation;
            } else break;
          } while (1);
        }
        __lenSet(queue, 0);
      } catch (__error) {
        __splice(queue, 0, __cat(i, 1)), __push(ReactSharedInternals.thrownErrors, __error);
      } finally {
        isFlushing = !1;
      }
    }
  }
  "undefined" !== typeOfJS(__REACT_DEVTOOLS_GLOBAL_HOOK__) && "function" === typeOfJS(__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart) && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
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
  REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
  MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  didWarnStateUpdateForUnmountedComponent = {};
  ReactNoopUpdateQueue = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function (publicInstance) {
      warnNoop(publicInstance, "forceUpdate");
    },
    enqueueReplaceState: function (publicInstance) {
      warnNoop(publicInstance, "replaceState");
    },
    enqueueSetState: function (publicInstance) {
      warnNoop(publicInstance, "setState");
    }
  };
  assign = Object.assign;
  emptyObject = {};
  Object.freeze(emptyObject);
  __protoOf(Component).isReactComponent = {};
  __protoOf(Component).setState = function (__self, partialState, callback) {
    if ("object" !== typeOfJS(partialState) && "function" !== typeOfJS(partialState) && partialState !== undefined) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    __self.updater.enqueueSetState(__self, partialState, callback, "setState");
  };
  __protoOf(Component).forceUpdate = function (__self, callback) {
    __self.updater.enqueueForceUpdate(__self, callback, "forceUpdate");
  };
  deprecatedAPIs = {
    isMounted: __arrNew("isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."),
    replaceState: __arrNew("replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236).")
  };
  for (const __k of Object.keys(deprecatedAPIs)) {
    fnName = __k;
    Object.hasOwnProperty(deprecatedAPIs, fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
  }
  __protoSet(ComponentDummy, __protoOf(Component));
  deprecatedAPIs = __protoSet(PureComponent, __new(ComponentDummy));
  deprecatedAPIs.constructor = PureComponent;
  assign(deprecatedAPIs, __protoOf(Component));
  deprecatedAPIs.isPureReactComponent = !0;
  isArrayImpl = isArray;
  REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
  ReactSharedInternals = {
    H: undefined,
    A: undefined,
    T: undefined,
    S: undefined,
    actQueue: undefined,
    asyncTransitions: 0,
    isBatchingLegacy: !1,
    didScheduleLegacyUpdate: !1,
    didUsePromise: !1,
    thrownErrors: __arrNew(),
    getCurrentStack: undefined,
    recentlyCreatedOwnerStacks: 0
  };
  hasOwnProperty = __protoOf(Object).hasOwnProperty;
  createTask = console.createTask ? console.createTask : function () {
    return undefined;
  };
  deprecatedAPIs = {
    react_stack_bottom_frame: function (callStackForError) {
      return callStackForError();
    }
  };
  didWarnAboutElementRef = {};
  unknownOwnerDebugStack = __partial((..._bindArgs) => __applyFn(deprecatedAPIs.react_stack_bottom_frame, ..._bindArgs), deprecatedAPIs, UnknownOwner)();
  unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
  didWarnAboutMaps = !1;
  userProvidedKeyEscapeRegex = __re("\\/+", "g");
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
  didWarnAboutMessageChannel = !1;
  enqueueTaskImpl = undefined;
  actScopeDepth = 0;
  didWarnNoAwaitAct = !1;
  isFlushing = !1;
  queueSeveralMicrotasks = "function" === typeOfJS(queueMicrotask) ? function (callback) {
    queueMicrotask(function () {
      return queueMicrotask(callback);
    });
  } : enqueueTask;
  deprecatedAPIs = Object.freeze({
    __proto__: undefined,
    c: function (size) {
      return resolveDispatcher().useMemoCache(size);
    }
  });
  fnName = {
    map: mapChildren,
    forEach: function (children, forEachFunc, forEachContext) {
      mapChildren(children, function (__self, ...__args) {
        let __allArgs = __arrNew(...__args);
        __applyFn(forEachFunc, __self, __allArgs);
      }, forEachContext);
    },
    count: function (children) {
      let n;
      n = 0;
      mapChildren(children, function () {
        n++;
      });
      return n;
    },
    toArray: function (children) {
      return mapChildren(children, function (child) {
        return child;
      }) || __arrNew();
    },
    only: function (children) {
      if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
      return children;
    }
  };
  __exports.Activity = REACT_ACTIVITY_TYPE;
  __exports.Children = fnName;
  __exports.Component = Component;
  __exports.Fragment = REACT_FRAGMENT_TYPE;
  __exports.Profiler = REACT_PROFILER_TYPE;
  __exports.PureComponent = PureComponent;
  __exports.StrictMode = REACT_STRICT_MODE_TYPE;
  __exports.Suspense = REACT_SUSPENSE_TYPE;
  __exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
  __exports.__COMPILER_RUNTIME = deprecatedAPIs;
  __exports.act = function (callback) {
    let prevActQueue, prevActScopeDepth, queue, didAwaitActCall, result, thenable, returnValue_jscomp_0;
    prevActQueue = ReactSharedInternals.actQueue;
    prevActScopeDepth = actScopeDepth;
    actScopeDepth++;
    queue = ReactSharedInternals.actQueue = undefined !== prevActQueue ? prevActQueue : __arrNew();
    didAwaitActCall = !1;
    try {
      result = callback();
    } catch (__error) {
      __push(ReactSharedInternals.thrownErrors, __error);
    }
    if (0 < __len(ReactSharedInternals.thrownErrors)) throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), __lenSet(ReactSharedInternals.thrownErrors, 0), callback;
    if (undefined !== result && "object" === typeOfJS(result) && "function" === typeOfJS(result.then)) {
      thenable = result;
      queueSeveralMicrotasks(function () {
        didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
      });
      return {
        then: function (resolve, reject) {
          didAwaitActCall = !0;
          thenable.then(function (returnValue) {
            let _thrownError;
            popActScope(prevActQueue, prevActScopeDepth);
            if (0 === prevActScopeDepth) {
              try {
                flushActQueue(queue), enqueueTask(function () {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
              } catch (error_0) {
                __push(ReactSharedInternals.thrownErrors, error_0);
              }
              if (0 < __len(ReactSharedInternals.thrownErrors)) {
                _thrownError = aggregateErrors(ReactSharedInternals.thrownErrors);
                __lenSet(ReactSharedInternals.thrownErrors, 0);
                reject(_thrownError);
              }
            } else resolve(returnValue);
          }, function (__error) {
            popActScope(prevActQueue, prevActScopeDepth);
            0 < __len(ReactSharedInternals.thrownErrors) ? (__error = aggregateErrors(ReactSharedInternals.thrownErrors), __lenSet(ReactSharedInternals.thrownErrors, 0), reject(__error)) : reject(__error);
          });
        }
      };
    }
    returnValue_jscomp_0 = result;
    popActScope(prevActQueue, prevActScopeDepth);
    0 === prevActScopeDepth && (flushActQueue(queue), 0 !== __len(queue) && queueSeveralMicrotasks(function () {
      didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
    }), ReactSharedInternals.actQueue = undefined);
    if (0 < __len(ReactSharedInternals.thrownErrors)) throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), __lenSet(ReactSharedInternals.thrownErrors, 0), callback;
    return {
      then: function (resolve, reject) {
        didAwaitActCall = !0;
        0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function () {
          return recursivelyFlushAsyncActWork(returnValue_jscomp_0, resolve, reject);
        })) : resolve(returnValue_jscomp_0);
      }
    };
  };
  __exports.cache = function (fn) {
    return function (...__args) {
      let __allArgs = __arrNew(...__args);
      return __applyFn(fn, undefined, __allArgs);
    };
  };
  __exports.cacheSignal = function () {
    return undefined;
  };
  __exports.captureOwnerStack = function () {
    let getCurrentStack;
    getCurrentStack = ReactSharedInternals.getCurrentStack;
    return undefined === getCurrentStack ? undefined : getCurrentStack();
  };
  __exports.cloneElement = function (element, config, children, ...__args) {
    let __allArgs = __arrNew(element, config, children, ...__args);
    let props, key, owner, JSCompiler_inline_result, propName, i;
    if (undefined === element || void 0 === element) throw Error(__cat(__cat("The argument must be a React element, but you passed ", element), "."));
    props = assign({}, element.props);
    key = element.key;
    owner = element._owner;
    if (config !== undefined) {
      {
        let __lb_0 = false,
          __lc_0 = false;
        while (!__lb_0) {
          {
            if (__callFn(hasOwnProperty, config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
              JSCompiler_inline_result = !1;
              {
                __lb_0 = true;
                break;
              }
            }
            JSCompiler_inline_result = void 0 !== config.ref;
          }
          break;
        }
      }
      JSCompiler_inline_result && (owner = getOwner());
      hasValidKey(config) && (checkKeyStringCoercion(config.key), key = __cat("", config.key));
      for (const __k of Object.keys(config)) {
        propName = __k;
        !__callFn(hasOwnProperty, config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
      }
    }
    propName = __len(__allArgs) - 2;
    if (1 === propName) props.children = children;else if (1 < propName) {
      JSCompiler_inline_result = Array(propName);
      for (i = 0; i < propName; i++) JSCompiler_inline_result[i] = __argAt(__allArgs, __cat(i, 2));
      props.children = JSCompiler_inline_result;
    }
    props = ReactElement(element.type, key, props, owner, element._debugStack, element._debugTask);
    for (key = 2; key < __len(__allArgs); key++) validateChildKeys(__argAt(__allArgs, key));
    return props;
  };
  __exports.createContext = function (defaultValue) {
    defaultValue = {
      $$typeof: REACT_CONTEXT_TYPE,
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      _threadCount: 0,
      Provider: undefined,
      Consumer: undefined
    };
    defaultValue.Provider = defaultValue;
    defaultValue.Consumer = {
      $$typeof: REACT_CONSUMER_TYPE,
      _context: defaultValue
    };
    defaultValue._currentRenderer = undefined;
    defaultValue._currentRenderer2 = undefined;
    return defaultValue;
  };
  __exports.createElement = function (__type, config, children, ...__args) {
    let __allArgs = __arrNew(__type, config, children, ...__args);
    let i, key, childrenLength, childArray, _i, propName;
    for (i = 2; i < __len(__allArgs); i++) validateChildKeys(__argAt(__allArgs, i));
    i = {};
    key = undefined;
    if (config !== undefined) for (const __k of Object.keys((didWarnAboutOldJSXRuntime || !__in("__self", config) || __in("key", config) || (didWarnAboutOldJSXRuntime = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = __cat("", config.key)), config))) {
      propName = __k;
      __callFn(hasOwnProperty, config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
    }
    childrenLength = __len(__allArgs) - 2;
    if (1 === childrenLength) i.children = children;else if (1 < childrenLength) {
      for (childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++) childArray[_i] = __argAt(__allArgs, __cat(_i, 2));
      Object.freeze && Object.freeze(childArray);
      i.children = childArray;
    }
    if (__type && __type.defaultProps) for (const __k of Object.keys((childrenLength = __type.defaultProps, childrenLength))) {
      propName = __k;
      void 0 === i[propName] && (i[propName] = childrenLength[propName]);
    }
    key && defineKeyPropWarningGetter(i, "function" === typeOfJS(__type) ? __type.displayName || __type.name || "Unknown" : __type);
    propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
    return ReactElement(__type, key, i, getOwner(), propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack, propName ? createTask(getTaskName(__type)) : unknownOwnerDebugTask);
  };
  __exports.createRef = function () {
    let refObject;
    refObject = {
      current: undefined
    };
    Object.seal(refObject);
    return refObject;
  };
  __exports.forwardRef = function (render) {
    let elementType, ownName;
    render !== undefined && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : "function" !== typeOfJS(render) ? console.error("forwardRef requires a render function but was given %s.", undefined === render ? "null" : typeOfJS(render)) : 0 !== __len(render) && 2 !== __len(render) && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", 1 === __len(render) ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
    render !== undefined && render.defaultProps !== undefined && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
    elementType = {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render
    };
    Object.defineProperty(elementType, "displayName", {
      enumerable: !1,
      configurable: !0,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name;
        render.name || render.displayName || (Object.defineProperty(render, "name", {
          value: name
        }), render.displayName = name);
      }
    });
    return elementType;
  };
  __exports.isValidElement = isValidElement;
  __exports.lazy = function (ctor) {
    let lazyType, ioInfo;
    ctor = {
      _status: -1,
      _result: ctor
    };
    lazyType = {
      $$typeof: REACT_LAZY_TYPE,
      _payload: ctor,
      _init: lazyInitializer
    };
    ioInfo = {
      name: "lazy",
      start: -1,
      end: -1,
      value: undefined,
      owner: undefined,
      debugStack: Error("react-stack-top-frame"),
      debugTask: console.createTask ? console.createTask("lazy()") : undefined
    };
    ctor._ioInfo = ioInfo;
    lazyType._debugInfo = __arrNew({
      awaited: ioInfo
    });
    return lazyType;
  };
  __exports.memo = function (__type, compare) {
    let ownName;
    __type === undefined && console.error("memo: The first argument must be a component. Instead received: %s", undefined === __type ? "null" : typeOfJS(__type));
    compare = {
      $$typeof: REACT_MEMO_TYPE,
      type: __type,
      compare: void 0 === compare ? undefined : compare
    };
    Object.defineProperty(compare, "displayName", {
      enumerable: !1,
      configurable: !0,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name;
        __type.name || __type.displayName || (Object.defineProperty(__type, "name", {
          value: name
        }), __type.displayName = name);
      }
    });
    return compare;
  };
  __exports.startTransition = function (scope) {
    let prevTransition, currentTransition, returnValue, onStartTransitionFinish;
    prevTransition = ReactSharedInternals.T;
    currentTransition = {};
    currentTransition._updatedFibers = __new(Set);
    ReactSharedInternals.T = currentTransition;
    try {
      returnValue = scope();
      onStartTransitionFinish = ReactSharedInternals.S;
      undefined !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      "object" === typeOfJS(returnValue) && undefined !== returnValue && "function" === typeOfJS(returnValue.then) && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
    } catch (__error) {
      reportGlobalError(__error);
    } finally {
      undefined === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), undefined !== prevTransition && undefined !== currentTransition.types && (undefined !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
    }
  };
  __exports.unstable_useCacheRefresh = function () {
    return resolveDispatcher().useCacheRefresh();
  };
  __exports.use = function (usable) {
    return resolveDispatcher().use(usable);
  };
  __exports.useActionState = function (action, initialState, permalink) {
    return resolveDispatcher().useActionState(action, initialState, permalink);
  };
  __exports.useCallback = function (callback, deps) {
    return resolveDispatcher().useCallback(callback, deps);
  };
  __exports.useContext = function (Context) {
    let dispatcher;
    dispatcher = resolveDispatcher();
    Context.$$typeof === REACT_CONSUMER_TYPE && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?");
    return dispatcher.useContext(Context);
  };
  __exports.useDebugValue = function (value, formatterFn) {
    return resolveDispatcher().useDebugValue(value, formatterFn);
  };
  __exports.useDeferredValue = function (value, initialValue) {
    return resolveDispatcher().useDeferredValue(value, initialValue);
  };
  __exports.useEffect = function (create, deps) {
    create === undefined && console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?");
    return resolveDispatcher().useEffect(create, deps);
  };
  __exports.useEffectEvent = function (callback) {
    return resolveDispatcher().useEffectEvent(callback);
  };
  __exports.useId = function () {
    return resolveDispatcher().useId();
  };
  __exports.useImperativeHandle = function (ref, create, deps) {
    return resolveDispatcher().useImperativeHandle(ref, create, deps);
  };
  __exports.useInsertionEffect = function (create, deps) {
    create === undefined && console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?");
    return resolveDispatcher().useInsertionEffect(create, deps);
  };
  __exports.useLayoutEffect = function (create, deps) {
    create === undefined && console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?");
    return resolveDispatcher().useLayoutEffect(create, deps);
  };
  __exports.useMemo = function (create, deps) {
    return resolveDispatcher().useMemo(create, deps);
  };
  __exports.useOptimistic = function (passthrough, reducer) {
    return resolveDispatcher().useOptimistic(passthrough, reducer);
  };
  __exports.useReducer = function (reducer, initialArg, init) {
    return resolveDispatcher().useReducer(reducer, initialArg, init);
  };
  __exports.useRef = function (initialValue) {
    return resolveDispatcher().useRef(initialValue);
  };
  __exports.useState = function (initialState) {
    return resolveDispatcher().useState(initialState);
  };
  __exports.useSyncExternalStore = function (subscribe, getSnapshot, getServerSnapshot) {
    return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  };
  __exports.useTransition = function () {
    return resolveDispatcher().useTransition();
  };
  __exports.version = "19.2.8";
  "undefined" !== typeOfJS(__REACT_DEVTOOLS_GLOBAL_HOOK__) && "function" === typeOfJS(__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop) && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
const __default = __exports,
  __n_Activity = __exports.Activity,
  __n_Children = __exports.Children,
  __n_Component = __exports.Component,
  __n_Fragment = __exports.Fragment,
  __n_Profiler = __exports.Profiler,
  __n_PureComponent = __exports.PureComponent,
  __n_StrictMode = __exports.StrictMode,
  __n_Suspense = __exports.Suspense,
  __n___CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = __exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  __n___COMPILER_RUNTIME = __exports.__COMPILER_RUNTIME,
  __n_act = __exports.act,
  __n_cache = __exports.cache,
  __n_cacheSignal = __exports.cacheSignal,
  __n_captureOwnerStack = __exports.captureOwnerStack,
  __n_cloneElement = __exports.cloneElement,
  __n_createContext = __exports.createContext,
  __n_createElement = __exports.createElement,
  __n_createRef = __exports.createRef,
  __n_forwardRef = __exports.forwardRef,
  __n_isValidElement = __exports.isValidElement,
  __n_lazy = __exports.lazy,
  __n_memo = __exports.memo,
  __n_startTransition = __exports.startTransition,
  __n_unstable_useCacheRefresh = __exports.unstable_useCacheRefresh,
  __n_use = __exports.use,
  __n_useActionState = __exports.useActionState,
  __n_useCallback = __exports.useCallback,
  __n_useContext = __exports.useContext,
  __n_useDebugValue = __exports.useDebugValue,
  __n_useDeferredValue = __exports.useDeferredValue,
  __n_useEffect = __exports.useEffect,
  __n_useEffectEvent = __exports.useEffectEvent,
  __n_useId = __exports.useId,
  __n_useImperativeHandle = __exports.useImperativeHandle,
  __n_useInsertionEffect = __exports.useInsertionEffect,
  __n_useLayoutEffect = __exports.useLayoutEffect,
  __n_useMemo = __exports.useMemo,
  __n_useOptimistic = __exports.useOptimistic,
  __n_useReducer = __exports.useReducer,
  __n_useRef = __exports.useRef,
  __n_useState = __exports.useState,
  __n_useSyncExternalStore = __exports.useSyncExternalStore,
  __n_useTransition = __exports.useTransition,
  __n_version = __exports.version;
export { __n_Activity as Activity, __n_Children as Children, __n_Component as Component, __n_Fragment as Fragment, __n_Profiler as Profiler, __n_PureComponent as PureComponent, __n_StrictMode as StrictMode, __n_Suspense as Suspense, __n___CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE as __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, __n___COMPILER_RUNTIME as __COMPILER_RUNTIME, __n_act as act, __n_cache as cache, __n_cacheSignal as cacheSignal, __n_captureOwnerStack as captureOwnerStack, __n_cloneElement as cloneElement, __n_createContext as createContext, __n_createElement as createElement, __n_createRef as createRef, __n_forwardRef as forwardRef, __n_isValidElement as isValidElement, __n_lazy as lazy, __n_memo as memo, __n_startTransition as startTransition, __n_unstable_useCacheRefresh as unstable_useCacheRefresh, __n_use as use, __n_useActionState as useActionState, __n_useCallback as useCallback, __n_useContext as useContext, __n_useDebugValue as useDebugValue, __n_useDeferredValue as useDeferredValue, __n_useEffect as useEffect, __n_useEffectEvent as useEffectEvent, __n_useId as useId, __n_useImperativeHandle as useImperativeHandle, __n_useInsertionEffect as useInsertionEffect, __n_useLayoutEffect as useLayoutEffect, __n_useMemo as useMemo, __n_useOptimistic as useOptimistic, __n_useReducer as useReducer, __n_useRef as useRef, __n_useState as useState, __n_useSyncExternalStore as useSyncExternalStore, __n_useTransition as useTransition, __n_version as version };
export default __default;