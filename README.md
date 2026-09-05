# toilluau

**React 19 for Roblox/Luau.** toilluau runs the *real* React 19 runtime
(`react` + `react-reconciler` + `scheduler`, vendored as a single-copy
`@toil/*` graph) on Roblox Luau, and gives you a Roblox UI host, a CSS engine,
and an animation driver to mount a React element tree onto a `ScreenGui`.

You write ordinary React with JSX in TypeScript, build with
[roblox-ts](https://roblox-ts.com), and the emitted Luau runs on Roblox (or on
a native Lest runtime for fast local tests). No DOM, no shims to maintain: the
reconciler talks to a host config that maps React elements to Roblox GUI
instances.

```
React 19 (real reconciler)
        |
        v
 toilluau host config  ->  Roblox Instance tree (Frame / TextLabel / TextButton / ...)
        |
        + CSS engine (selectors, cascade, computed style)
        + animation/transition driver (driven off RunService.Heartbeat)
```

The package is published as **`@toilluau/core`** (scoped). roblox-ts only
allows `@`-scoped modules under `node_modules`, so the scope is not a style
choice: an unscoped name cannot be imported from a roblox-ts project.

---

## Prerequisites

- **Node.js >= 24** (tested on Node 26) and **npm**.
- **roblox-ts** (installed as a devDependency; run via `npx roblox-ts`).
- For the native test runner (optional but recommended): a **Luau** binary.
  The test runner looks for `LUAU_BIN` or `/tmp/luau-bin/luau`.

The `@toil/*` vendor is **regenerated from pristine npm packages** during the
build (`restore-vendor.sh`), so you do not hand-edit it. It is committed so the
package builds without a prior `npm install` of the React packages, but a clean
`npm install && npm run build` reproduces it exactly.

## Setup

```bash
git clone git@github.com:dacely-cloud/toilluau.git
cd toilluau
npm install          # installs roblox-ts, @rbxts/*, and the react 19 packages
npm run build        # full pipeline -> out/ (compiled Luau)
npm test             # run the native Lest suites (spike + host)
```

`npm install` pulls:

| package | version | role |
| --- | --- | --- |
| `react` | 19.2.8 | vendored React runtime source |
| `react-reconciler` | 0.33.0 | vendored reconciler source |
| `scheduler` | 0.27.0 | vendored scheduler source |
| `roblox-ts` | ^3.0.0 | TS -> Luau compiler |
| `@rbxts/compiler-types` | ^3.0.0-types.0 | roblox-ts compiler types |
| `@rbxts/types` | ^1.0.946 | Roblox API type definitions |

## Build

`npm run build` runs `scripts/build.sh`, the full pipeline:

1. `restore-vendor.sh` - copy pristine `react`/`react-reconciler`/`scheduler`
   CJS builds into `src/vendor/@toil/*`, rewrite cross-requires to the single
   `@toil` graph, and copy the vendored type surface.
2. `tame-vendor.mjs` - desugar the vendor JS into Luau-parseable JS
   (labels, `var`, loose equality, `#` length, etc.).
3. `this-to-self-param.mjs` - fix `this` in arrow methods the VM needs.
4. `scope-to-table.mjs` - move the reconciler dev factory's ~1000 scope
   bindings onto a `__ST` table (Luau caps a function at 200 live locals).
5. `npx roblox-ts` - compile `src/` (the app + host + polyfills) to Luau in
   `out/`. The tamed vendor `.js` files pass through verbatim (they are Luau).
6. `postbuild-fixup.mjs` - escape fixes, `.js` -> `.luau` renames, runtime
   headers, dispatcher self-strip, hook tuples.

Output lands in `out/` (Luau), rooted at the DataModel tree described by
`default.project.json` for Rojo.

## Run / test

The test suite runs the compiled Luau on a **native Lest runtime** (no Roblox
VM required):

```bash
npm test                    # spike + host suites
npm run test:spike          # React 19 counter through the real reconciler
npm run test:host           # roblox host mounts a React tree with CSS
npm run test:css            # CSS engine (selectors, cascade, nth-child)
```

You will see, for the spike:

```
PASS: react 19 spike renders the counter through the real reconciler
== run_end: 2 passed, 0 failed, 0 skipped ==
```

and for the host:

```
PASS: roblox host mounts a React tree with CSS styling onto a ScreenGui
PASS: roblox host exposes the public API
== run_end: 2 passed, 0 failed, 0 skipped ==
```

## The example

`example/` is a standalone roblox-ts project that uses toilluau and builds on
its own:

```bash
cd example
npm install                 # links roblox-ts / @rbxts and the @toil vendor
npm run build               # roblox-ts -p .  -> example/out/main.luau
```

It imports the vendored React for JSX and `@toilluau/core` for the host:

```tsx
import * as React from "@toil/react";
import { mountReactRoot } from "@toilluau/core";
import type { StyleRule } from "@toilluau/core";

function App(): React.JSX.Element {
    const [count, setCount] = React.useState<number>(0);
    return (
        <section>
            <h1>toilluau</h1>
            <span>{"React 19 on Roblox Luau. Clicks: " + count}</span>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </section>
    );
}

const handle = mountReactRoot(
    undefined,            // parent container (ScreenGui host); pass a Gui for a real game
    cssRules,             // Array<StyleRule>
    React.createElement(App),
    undefined,            // default (real) CSS engine
    undefined,            // real Roblox engine env
);
```

In a real game you mount on the player's `ScreenGui` from a LocalScript:

```lua
local toilluau = require(path.to.toilluau)
local handle = toilluau.mountReactRoot(
    game.Players.LocalPlayer:WaitForChild("PlayerGui"),
    cssRules,
    toilluau.React.createElement(App),
    nil,   -- real CSS engine
    nil    -- real Roblox engine env
)
```

## API

The public entry is `@toilluau/core` (the compiled `src/host/index.ts`). It
re-exports:

**Mounting**

- `mountReactRoot(container, rules, element, engine?, envOverride?)` ->
  `MountHandle`. Creates a `ScreenGui`, builds the host config, mounts the
  React element tree, drains tasks, starts any animations found in the initial
  computed styles, and (when a real `RunService` is present) drives the
  animation tick off `Heartbeat`.

- `MountHandle` = `{ gui, unmount(), tick(now) }`. `gui` is the `ScreenGui`
  instance, `unmount()` disconnects the heartbeat and destroys the tree, and
  `tick(now)` advances animations/transitions to a given clock time.

**CSS engine**

- `makeDefaultEngine(rules)` -> an `Engine` built from the rules (used as the
  default when `engine` is omitted).
- `Engine` exposes `computedStyle(identity, ancestors, siblingIndex,
  siblingCount, inline)`, `parseAnimation(spec)`, and `keyframes(name)`.
- `StyleRule` = `{ selector: string; declarations?: Record<string, string> }`.

**Host config**

- `buildHostConfig(env, resolver)` -> the React reconciler `HostConfig`.
- `applyStyle(...)`, `makeEngineEnv()` (the real Roblox API adapter), and the
  `HostEnv` / `HostNode` / `RobloxInstance` types.

**Animation driver**

- `createDriver(clock, engine, env)`, `startAnimation(driver, node, spec,
  keyframes)`, `startTransition(...)`, `tick(driver)`, `makeRealClock()`,
  `makeFakeClock()`, and the `Clock` / `AnimationDriver` types.

**React**

- `@toil/react` is the vendored React 19 runtime (a single shared copy).
  Consumers import it directly (`import * as React from "@toil/react"`) for
  hooks, `createElement`, and the JSX runtime. `@toil/react-reconciler` and
  `@toil/scheduler` are the other two vendored pieces of the graph.

**Polyfills / test globals**

- `drainTasks()`, `log(...)`, `taskLog` (from `src/polyfills.ts`) - the
  microtask/task pump and task log used by the runtime and the native tests.

## How JSX maps to Roblox

The host maps React element tags to Roblox GUI instances (`src/host/roblox-host.ts`):

- `div` / `section` / `article` / `aside` / `nav` / `main` / `header` / `footer` / `ul` / `ol` / `li` / `svg` -> `Frame`
- `span` / `label` / `p` / `h1`..`h6` / `b` / `strong` / `i` / `em` / `small` -> `TextLabel`
- `a` / `button` -> `TextButton`
- `img` -> `ImageLabel`
- `input` -> `TextBox`

Styling comes from the CSS rules you pass to `mountReactRoot` (selectors,
cascade, computed style are resolved per node and applied to the instances).

## Project layout

```
toilluau/
  src/
    host/            public host: mountReactRoot, host config, animations
    css/             CSS engine (selectors, cascade, keyframes)
    polyfills.ts     task pump + task log
    main.tsx         the React 19 counter demo (also a smoke test)
    index.ts         package entry (re-exports the public surface)
    vendor/@toil/*   vendored React 19 (regenerated by restore-vendor.sh)
  include/           rbxts_include (Promise.lua, RuntimeLib.lua)
  type-shims/        TS type surface (rbxts, toil-shims, vendor types)
  .lest/core/        Lest test framework (Luau)
  specs/             native Lest suites (spike, host, css, globals)
  scripts/           build + native-runner pipeline
  example/           standalone roblox-ts example project
  default.project.json   Rojo project (DataModel tree)
  tsconfig.json      roblox-ts compiler config
  restore-vendor.sh  regenerate the @toil vendor from npm react
```

## Notes

- The native runner (`scripts/run-native.mjs`) requires a Luau binary at
  `LUAU_BIN` or `/tmp/luau-bin/luau`.
- The `@toil` vendor is build-derived; do not commit hand edits. Run
  `npm run restore` to regenerate it.
- The `main.tsx` counter is the reference integration test: it renders
  through the real reconciler, clicks the button, and asserts the label and
  effect counts.

## License

Apache-2.0