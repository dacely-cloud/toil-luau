/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

let REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE, REACT_FRAGMENT_TYPE, REACT_STRICT_MODE_TYPE, REACT_PROFILER_TYPE, REACT_CONSUMER_TYPE, REACT_CONTEXT_TYPE, REACT_FORWARD_REF_TYPE, REACT_SUSPENSE_TYPE, REACT_MEMO_TYPE, REACT_LAZY_TYPE, REACT_ACTIVITY_TYPE, MAYBE_ITERATOR_SYMBOL, ReactNoopUpdateQueue, assign, emptyObject, pureComponentPrototype, isArrayImpl, ReactSharedInternals, hasOwnProperty, userProvidedKeyEscapeRegex, reportGlobalError, Children;
let __exports = {};
REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
REACT_PORTAL_TYPE = Symbol.for("react.portal");
REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
REACT_PROFILER_TYPE = Symbol.for("react.profiler");
REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
REACT_CONTEXT_TYPE = Symbol.for("react.context");
REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
REACT_MEMO_TYPE = Symbol.for("react.memo");
REACT_LAZY_TYPE = Symbol.for("react.lazy");
REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (undefined === maybeIterable || "object" !== typeOfJS(maybeIterable)) return undefined;
  maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
  return "function" === typeOfJS(maybeIterable) ? maybeIterable : undefined;
}
ReactNoopUpdateQueue = {
  isMounted: function () {
    return !1;
  },
  enqueueForceUpdate: function () {},
  enqueueReplaceState: function () {},
  enqueueSetState: function () {}
};
assign = Object.assign;
emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
__protoOf(Component).isReactComponent = {};
__protoOf(Component).setState = function (partialState, callback) {
  if ("object" !== typeOfJS(partialState) && "function" !== typeOfJS(partialState) && partialState !== undefined) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
__protoOf(Component).forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
function ComponentDummy() {}
__protoSet(ComponentDummy, __protoOf(Component));
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
pureComponentPrototype = __protoSet(PureComponent, __new(ComponentDummy));
pureComponentPrototype.constructor = PureComponent;
assign(pureComponentPrototype, __protoOf(Component));
pureComponentPrototype.isPureReactComponent = !0;
isArrayImpl = isArray;
function noop() {}
ReactSharedInternals = {
  H: undefined,
  A: undefined,
  T: undefined,
  S: undefined
};
hasOwnProperty = __protoOf(Object).hasOwnProperty;
function ReactElement(__type, key, props) {
  let refProp;
  refProp = props.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: __type,
    key: key,
    ref: void 0 !== refProp ? refProp : undefined,
    props: props
  };
}
function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(oldElement.type, newKey, oldElement.props);
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
userProvidedKeyEscapeRegex = __re("\\/+", "g");
function getElementKey(element, index) {
  return "object" === typeOfJS(element) && undefined !== element && element.key !== undefined ? escape(__cat("", element.key)) : __numToBase(index, 36);
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
  let __type, invokeCallback, nextNamePrefix, i;
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
  if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? __cat(".", getElementKey(children, 0)) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", invokeCallback !== undefined && (escapedPrefix = __cat(__replace(invokeCallback, userProvidedKeyEscapeRegex, "$&/"), "/")), mapIntoArray(callback, array, escapedPrefix, "", function (c) {
    return c;
  })) : callback !== undefined && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, __cat(__cat(escapedPrefix, callback.key === undefined || children && children.key === callback.key ? "" : __cat(__replace(__cat("", callback.key), userProvidedKeyEscapeRegex, "$&/"), "/")), invokeCallback))), __push(array, callback)), 1;
  invokeCallback = 0;
  nextNamePrefix = "" === nameSoFar ? "." : __cat(nameSoFar, ":");
  if (isArrayImpl(children)) for (i = 0; i < __len(children); i++) nameSoFar = children[i], __type = __cat(nextNamePrefix, getElementKey(nameSoFar, i)), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, __type, callback);else if (i = getIteratorFn(children), "function" === typeOfJS(i)) for (children = __callFn(i, children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, __type = __cat(nextNamePrefix, getElementKey(nameSoFar, i++)), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, __type, callback);else if ("object" === __type) {
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
  let ctor;
  if (-1 === payload._status) {
    ctor = payload._result;
    ctor = ctor();
    ctor.then(function (moduleObject) {
      if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
    }, function (__error) {
      if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = __error;
    });
    -1 === payload._status && (payload._status = 0, payload._result = ctor);
  }
  if (1 === payload._status) return payload._result.default;
  throw payload._result;
}
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
Children = {
  map: mapChildren,
  forEach: function (children, forEachFunc, forEachContext) {
    mapChildren(children, function (...__args) {
      let __allArgs = __arrNew(...__args);
      __applyFn(forEachFunc, this, __allArgs);
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
__exports.Children = Children;
__exports.Component = Component;
__exports.Fragment = REACT_FRAGMENT_TYPE;
__exports.Profiler = REACT_PROFILER_TYPE;
__exports.PureComponent = PureComponent;
__exports.StrictMode = REACT_STRICT_MODE_TYPE;
__exports.Suspense = REACT_SUSPENSE_TYPE;
__exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
__exports.__COMPILER_RUNTIME = {
  __proto__: undefined,
  c: function (size) {
    return ReactSharedInternals.H.useMemoCache(size);
  }
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
__exports.cloneElement = function (element, config, children, ...__args) {
  let __allArgs = __arrNew(element, config, children, ...__args);
  let props, key, propName, childArray, i;
  if (undefined === element || void 0 === element) throw Error(__cat(__cat("The argument must be a React element, but you passed ", element), "."));
  props = assign({}, element.props);
  key = element.key;
  if (config !== undefined) for (const __k of Object.keys((void 0 !== config.key && (key = __cat("", config.key)), config))) {
    propName = __k;
    !__callFn(hasOwnProperty, config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
  }
  propName = __len(__allArgs) - 2;
  if (1 === propName) props.children = children;else if (1 < propName) {
    for (childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = __argAt(__allArgs, __cat(i, 2));
    props.children = childArray;
  }
  return ReactElement(element.type, key, props);
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
  return defaultValue;
};
__exports.createElement = function (__type, config, children, ...__args) {
  let __allArgs = __arrNew(__type, config, children, ...__args);
  let propName, props, key, childrenLength, childArray, i;
  props = {};
  key = undefined;
  if (config !== undefined) for (const __k of Object.keys((void 0 !== config.key && (key = __cat("", config.key)), config))) {
    propName = __k;
    __callFn(hasOwnProperty, config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
  }
  childrenLength = __len(__allArgs) - 2;
  if (1 === childrenLength) props.children = children;else if (1 < childrenLength) {
    for (childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = __argAt(__allArgs, __cat(i, 2));
    props.children = childArray;
  }
  if (__type && __type.defaultProps) for (const __k of Object.keys((childrenLength = __type.defaultProps, childrenLength))) {
    propName = __k;
    void 0 === props[propName] && (props[propName] = childrenLength[propName]);
  }
  return ReactElement(__type, key, props);
};
__exports.createRef = function () {
  return {
    current: undefined
  };
};
__exports.forwardRef = function (render) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
};
__exports.isValidElement = isValidElement;
__exports.lazy = function (ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: {
      _status: -1,
      _result: ctor
    },
    _init: lazyInitializer
  };
};
__exports.memo = function (__type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: __type,
    compare: void 0 === compare ? undefined : compare
  };
};
__exports.startTransition = function (scope) {
  let prevTransition, currentTransition, returnValue, onStartTransitionFinish;
  prevTransition = ReactSharedInternals.T;
  currentTransition = {};
  ReactSharedInternals.T = currentTransition;
  try {
    returnValue = scope();
    onStartTransitionFinish = ReactSharedInternals.S;
    undefined !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
    "object" === typeOfJS(returnValue) && undefined !== returnValue && "function" === typeOfJS(returnValue.then) && returnValue.then(noop, reportGlobalError);
  } catch (__error) {
    reportGlobalError(__error);
  } finally {
    undefined !== prevTransition && undefined !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
  }
};
__exports.unstable_useCacheRefresh = function () {
  return ReactSharedInternals.H.useCacheRefresh();
};
__exports.use = function (usable) {
  return ReactSharedInternals.H.use(usable);
};
__exports.useActionState = function (action, initialState, permalink) {
  return ReactSharedInternals.H.useActionState(action, initialState, permalink);
};
__exports.useCallback = function (callback, deps) {
  return ReactSharedInternals.H.useCallback(callback, deps);
};
__exports.useContext = function (Context) {
  return ReactSharedInternals.H.useContext(Context);
};
__exports.useDebugValue = function () {};
__exports.useDeferredValue = function (value, initialValue) {
  return ReactSharedInternals.H.useDeferredValue(value, initialValue);
};
__exports.useEffect = function (create, deps) {
  return ReactSharedInternals.H.useEffect(create, deps);
};
__exports.useEffectEvent = function (callback) {
  return ReactSharedInternals.H.useEffectEvent(callback);
};
__exports.useId = function () {
  return ReactSharedInternals.H.useId();
};
__exports.useImperativeHandle = function (ref, create, deps) {
  return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
};
__exports.useInsertionEffect = function (create, deps) {
  return ReactSharedInternals.H.useInsertionEffect(create, deps);
};
__exports.useLayoutEffect = function (create, deps) {
  return ReactSharedInternals.H.useLayoutEffect(create, deps);
};
__exports.useMemo = function (create, deps) {
  return ReactSharedInternals.H.useMemo(create, deps);
};
__exports.useOptimistic = function (passthrough, reducer) {
  return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
};
__exports.useReducer = function (reducer, initialArg, init) {
  return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
};
__exports.useRef = function (initialValue) {
  return ReactSharedInternals.H.useRef(initialValue);
};
__exports.useState = function (initialState) {
  return ReactSharedInternals.H.useState(initialState);
};
__exports.useSyncExternalStore = function (subscribe, getSnapshot, getServerSnapshot) {
  return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
__exports.useTransition = function () {
  return ReactSharedInternals.H.useTransition();
};
__exports.version = "19.2.8";
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
  __n_cache = __exports.cache,
  __n_cacheSignal = __exports.cacheSignal,
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
export { __n_Activity as Activity, __n_Children as Children, __n_Component as Component, __n_Fragment as Fragment, __n_Profiler as Profiler, __n_PureComponent as PureComponent, __n_StrictMode as StrictMode, __n_Suspense as Suspense, __n___CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE as __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, __n___COMPILER_RUNTIME as __COMPILER_RUNTIME, __n_cache as cache, __n_cacheSignal as cacheSignal, __n_cloneElement as cloneElement, __n_createContext as createContext, __n_createElement as createElement, __n_createRef as createRef, __n_forwardRef as forwardRef, __n_isValidElement as isValidElement, __n_lazy as lazy, __n_memo as memo, __n_startTransition as startTransition, __n_unstable_useCacheRefresh as unstable_useCacheRefresh, __n_use as use, __n_useActionState as useActionState, __n_useCallback as useCallback, __n_useContext as useContext, __n_useDebugValue as useDebugValue, __n_useDeferredValue as useDeferredValue, __n_useEffect as useEffect, __n_useEffectEvent as useEffectEvent, __n_useId as useId, __n_useImperativeHandle as useImperativeHandle, __n_useInsertionEffect as useInsertionEffect, __n_useLayoutEffect as useLayoutEffect, __n_useMemo as useMemo, __n_useOptimistic as useOptimistic, __n_useReducer as useReducer, __n_useRef as useRef, __n_useState as useState, __n_useSyncExternalStore as useSyncExternalStore, __n_useTransition as useTransition, __n_version as version };
export default __default;
