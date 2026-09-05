/**
 * Types for the vendored @toil/react package.
 *
 * Mirrors the canonical `react` module exactly (which is `export = React`),
 * so `import * as React` and named imports (`useState`, `useEffect`) and the
 * `React.JSX` namespace all resolve identically to the real react types.
 */
import React = require("react");
export = React;