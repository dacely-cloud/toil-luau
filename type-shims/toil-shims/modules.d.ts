/**
 * Ambient module declarations for the vendored @toil/* packages.
 *
 * NOTE: these are intentionally NOT declared here anymore. Each vendored
 * package now ships its own `types` field pointing at an `index.d.ts`
 * (see each src/vendor/toil package's index.d.ts), which mirrors the canonical
 * @types/react and @types/react-reconciler surfaces. Declaring the same
 * modules here too would create a second, conflicting source of types.
 *
 * This file is kept (as a global script) so the `toil-shims` type package
 * still resolves; the JSX augmentation lives in jsx-augment.d.ts.
 */
export {};
