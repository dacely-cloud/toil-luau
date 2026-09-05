/**
 * Type surface for the vendored @toil/* React 19 runtime.
 *
 * The runtime ships as plain JavaScript (no bundled types), so the TS
 * program needs ambient module declarations. We re-export the canonical
 * DefinitelyTyped packages that match the vendored versions:
 *   @toil/react              -> @types/react@19
 *   @toil/react/jsx-runtime  -> react/jsx-runtime (re-exports React.JSX)
 *   @toil/react/jsx-dev-runtime -> react/jsx-dev-runtime
 *   @toil/react-reconciler   -> @types/react-reconciler
 */
/// <reference path="./modules.d.ts" />
/// <reference path="./jsx-augment.d.ts" />