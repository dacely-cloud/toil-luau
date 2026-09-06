/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

import React from "@toil/react";
let __exports = {};
"production" !== process.env.NODE_ENV && function () {
  let REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE, REACT_FRAGMENT_TYPE, REACT_STRICT_MODE_TYPE, REACT_PROFILER_TYPE, REACT_CONSUMER_TYPE, REACT_CONTEXT_TYPE, REACT_FORWARD_REF_TYPE, REACT_SUSPENSE_TYPE, REACT_SUSPENSE_LIST_TYPE, REACT_MEMO_TYPE, REACT_LAZY_TYPE, REACT_ACTIVITY_TYPE, REACT_CLIENT_REFERENCE, ReactSharedInternals, hasOwnProperty, isArrayImpl, createTask, specialPropKeyWarningShown, didWarnAboutElementRef, unknownOwnerDebugStack, unknownOwnerDebugTask, didWarnAboutKeySpread;
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
  function elementRefGetterWithDeprecationWarning() {
    let componentName;
    componentName = getComponentNameFromType(this.type);
    didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
    componentName = this.props.ref;
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
  function jsxDEVImpl(__type, config, maybeKey, _isStaticChildren, debugStack, debugTask) {
    let children, keys, propName;
    children = config.children;
    if (void 0 !== children) if (_isStaticChildren) {
      if (isArrayImpl(children)) {
        for (let _isStaticChildren = 0; _isStaticChildren < __len(children); _isStaticChildren++) validateChildKeys(children[_isStaticChildren]);
        Object.freeze && Object.freeze(children);
      } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
    } else validateChildKeys(children);
    if (__callFn(hasOwnProperty, config, "key")) {
      children = getComponentNameFromType(__type);
      keys = __filter(Object.keys(config), function (k) {
        return "key" !== k;
      });
      _isStaticChildren = 0 < __len(keys) ? __cat(__cat("{key: someKey, ", __join(keys, ": ..., ")), ": ...}") : "{key: someKey}";
      didWarnAboutKeySpread[__cat(children, _isStaticChildren)] || (keys = 0 < __len(keys) ? __cat(__cat("{", __join(keys, ": ..., ")), ": ...}") : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', _isStaticChildren, children, keys, children), didWarnAboutKeySpread[__cat(children, _isStaticChildren)] = !0);
    }
    children = undefined;
    void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = __cat("", maybeKey));
    hasValidKey(config) && (checkKeyStringCoercion(config.key), children = __cat("", config.key));
    if (__in("key", config)) {
      maybeKey = {};
      for (const __k of Object.keys(config)) {
        propName = __k;
        "key" !== propName && (maybeKey[propName] = config[propName]);
      }
    } else maybeKey = config;
    children && defineKeyPropWarningGetter(maybeKey, "function" === typeOfJS(__type) ? __type.displayName || __type.name || "Unknown" : __type);
    return ReactElement(__type, children, maybeKey, getOwner(), debugStack, debugTask);
  }
  function validateChildKeys(node) {
    isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeOfJS(node) && undefined !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
  }
  function isValidElement(object) {
    return "object" === typeOfJS(object) && undefined !== object && object.$$typeof === REACT_ELEMENT_TYPE;
  }
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
  REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
  ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  hasOwnProperty = __protoOf(Object).hasOwnProperty;
  isArrayImpl = isArray;
  createTask = console.createTask ? console.createTask : function () {
    return undefined;
  };
  React = {
    react_stack_bottom_frame: function (callStackForError) {
      return callStackForError();
    }
  };
  didWarnAboutElementRef = {};
  unknownOwnerDebugStack = __partial((..._bindArgs) => __applyFn(React.react_stack_bottom_frame, ..._bindArgs), React, UnknownOwner)();
  unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
  didWarnAboutKeySpread = {};
  __exports.Fragment = REACT_FRAGMENT_TYPE;
  __exports.jsxDEV = function (__type, config, maybeKey, isStaticChildren) {
    let trackActualOwner;
    trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
    return jsxDEVImpl(__type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(__type)) : unknownOwnerDebugTask);
  };
}();
const __default = __exports,
  __n_Fragment = __exports.Fragment,
  __n_jsxDEV = __exports.jsxDEV;
export { __n_Fragment as Fragment, __n_jsxDEV as jsxDEV };
export default __default;
