/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

let REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE;
let __exports = {};
REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
function jsxProd(__type, config, maybeKey) {
  let key, propName;
  key = undefined;
  void 0 !== maybeKey && (key = __cat("", maybeKey));
  void 0 !== config.key && (key = __cat("", config.key));
  if (__in("key", config)) {
    maybeKey = {};
    for (const __k of Object.keys(config)) {
      propName = __k;
      "key" !== propName && (maybeKey[propName] = config[propName]);
    }
  } else maybeKey = config;
  config = maybeKey.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: __type,
    key: key,
    ref: void 0 !== config ? config : undefined,
    props: maybeKey
  };
}
__exports.Fragment = REACT_FRAGMENT_TYPE;
__exports.jsx = jsxProd;
__exports.jsxs = jsxProd;
const __default = __exports,
  __n_Fragment = __exports.Fragment,
  __n_jsx = __exports.jsx,
  __n_jsxs = __exports.jsxs;
export { __n_Fragment as Fragment, __n_jsx as jsx, __n_jsxs as jsxs };
export default __default;
