<div align="center">

# toilluau

**React 19 for Roblox.**

The *real* React 19 reconciler, compiled to Luau and rendered onto Roblox GUI instances.

<br/>

![React 19](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=000)
![Roblox](https://img.shields.io/badge/Roblox-Luau-00A2FF?logo=roblox&logoColor=fff)
![roblox-ts](https://img.shields.io/badge/roblox--ts-3.x-9B59B6)
![Node](https://img.shields.io/badge/Node-%3E%3D24-43853D?logo=node.js&logoColor=fff)
![License](https://img.shields.io/badge/License-Apache--2.0-blue)

<br/>

Write ordinary React with JSX in TypeScript, build with [roblox-ts](https://roblox-ts.com), and the emitted Luau runs on Roblox (or on a native Lest runtime for fast local tests). No DOM, no shims to maintain: the reconciler talks to a host config that maps React elements to Roblox GUI instances.

</div>

---

<br/>

## Contents

| | |
| --- | --- |
| [Quick start](#-quick-start) | [Prerequisites](#-prerequisites) |
| [How it works](#-how-it-works) | [The example](#-the-example) |
| [Build pipeline](#-build-pipeline) | [Testing](#-testing) |
| [Windows](#-windows) | [Public API](#-public-api) |
| [JSX to Roblox map](#-jsx-to-roblox-map) | [Project layout](#-project-layout) |
| [Why this package is scoped](#-why-this-package-is-scoped) | [Notes](#-notes) |

<br/>

## Quick start

```bash
git clone git@github.com:dacely-cloud/toil-luau.git
cd toil-luau
npm install          # installs roblox-ts, @rbxts/*, and the react 19 packages
npm run build        # full pipeline -> out/ (compiled Luau)
npm test             # run the native Lest suites (spike + host + css)
```

`npm install` is required before the build, because the pipeline patches `roblox-ts` inside `node_modules` and reads the pristine React CJS builds from there.

<br/>

## Prerequisites

- **Node.js >= 24** (tested on Node 26) and **npm**.
- **roblox-ts**, installed as a devDependency and run via `npx roblox-ts`.
- For the native test runner (optional but recommended): a **Luau** binary. The runner looks for `LUAU_BIN` or `/tmp/luau-bin/luau`.

The `@toil/*` vendor is **regenerated from pristine npm packages** during the build (`restore-vendor.mjs`), so you never hand-edit it. It is committed, so the tree is self-documenting, but the canonical build is always:

```bash
npm install && npm run build
```

`npm install` pulls:

| package | version | role |
| --- | --- | --- |
| `react` | `19.2.8` | vendored React runtime source |
| `react-reconciler` | `0.33.0` | vendored reconciler source |
| `scheduler` | `0.27.0` | vendored scheduler source |
| `roblox-ts` | `^3.0.0` | TS to Luau compiler (patched by the build) |
| `@rbxts/compiler-types` | `3.0.0-types.0` | roblox-ts compiler types (pinned) |
| `@rbxts/types` | `1.0.946` | Roblox API type definitions (pinned) |

`@rbxts/*` are pinned to exact versions. A fresh `^`-range install floats to a newer `@rbxts/types` that types parts of the vendored React as `any`, which roblox-ts rejects. `package-lock.json` pins the whole tree for a reproducible install.

<br/>

## How it works

```
React 19 (real reconciler)
        |
        v
 toilluau host config  ->  Roblox Instance tree (Frame / TextLabel / TextButton / ...)
        |
        + CSS engine (selectors, cascade, computed style)
        + animation/transition driver (driven off RunService.Heartbeat)
```

The reconciler is the unmodified React 19 runtime (vendored as a single-copy `@toil/*` graph). toilluau supplies the **host config**: each React element tag is mapped to a Roblox GUI class (see [JSX to Roblox map](#-jsx-to-roblox-map)). Styling is resolved by a CSS engine (selectors, cascade, computed style) and applied per node; animations and transitions run off a clock driven by `RunService.Heartbeat`.

<br/>

## The example

`example/` is a standalone roblox-ts project that uses toilluau and builds on its own. It renders a styled, clickable counter panel onto a `ScreenGui`.

```bash
cd example
npm run build               # prebuild (prepare.mjs) links the toolchain and
                            # builds the @toilluau/core shim, then
                            # roblox-ts -p . -> example/out/main.luau
```

The example's `prebuild` step (run automatically before the build) links `roblox-ts` / `@rbxts` / the `@toil` vendor from the parent `node_modules`, and builds the `@toilluau/core` runtime shim from the package's compiled `out/`. Run `npm install` in the parent first (see [Quick start](#-quick-start)) so those exist.

It imports the vendored React for JSX and `@toilluau/core` for the host:

```tsx
import * as React from "@toil/react";
import { mountReactRoot } from "@toilluau/core";
import type { StyleRule } from "@toilluau/core";

// CSS rules fed to the engine. `declarations` are plain CSS property -> value.
const cssRules: Array<StyleRule> = [
	{ selector: "section", declarations: { background: "rgba(20, 24, 33, 0.92)", padding: "16px", borderRadius: "12px" } },
	{ selector: "h1",      declarations: { color: "#8ab4ff", fontSize: "22px" } },
	{ selector: "span",    declarations: { color: "#e6eefc", fontSize: "16px" } },
	{ selector: "button",  declarations: { background: "#2563ff", color: "#ffffff", fontSize: "15px", padding: "8px 14px" } },
];

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
	undefined,                 // parent container (ScreenGui host); pass a Gui for a real game
	cssRules,                  // Array<StyleRule>
	React.createElement(App),  // the React tree
	undefined,                 // default (real) CSS engine
	undefined,                 // real Roblox engine env
);
```

In a real game you mount on the player's `PlayerGui` from a LocalScript:

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

<br/>

## Build pipeline

`npm run build` runs `scripts/build.mjs`, the full pipeline:

| # | step | what it does |
| --- | --- | --- |
| 1 | `restore-vendor.mjs` | copy pristine `react` / `react-reconciler` / `scheduler` CJS builds into `src/vendor/@toil/*`, rewrite cross-requires to the single `@toil` graph, and copy the vendored type surface |
| 2 | `patch-roblox-ts.mjs` | patch the just-installed `roblox-ts` so the tamed vendor `.js` graph compiles (relax the `any` / type-guard diagnostics for `.js`; keep `.ts` strict). Idempotent, so it re-runs on every install |
| 3 | `tame-vendor.mjs` | desugar the vendor JS into Luau-parseable JS (labels, `var`, loose equality, `#` length, etc.) |
| 4 | `this-to-self-param.mjs` | fix `this` in arrow methods the VM needs |
| 5 | `scope-to-table.mjs` | move the reconciler dev factory's ~1000 scope bindings onto a `__ST` table (Luau caps a function at 200 live locals) |
| 6 | `npx roblox-ts --type game` | compile `src/` (the app + host + polyfills) to Luau in `out/` in *game* project type, so the emitted runtime headers point at `ReplicatedStorage/rbxts_include`. The tamed vendor `.js` files pass through verbatim (they are Luau) |
| 7 | `patch-runtime-lib.mjs` | re-patch `include/RuntimeLib.lua` (restored from upstream by roblox-ts) so the native Lest runner can resolve modules |
| 8 | `postbuild-fixup.mjs` | escape fixes, `.js` to `.luau` renames, runtime headers, dispatcher self-strip, hook tuples |

Output lands in `out/` (Luau), rooted at the DataModel tree described by `default.project.json` for Rojo.

<br/>

## Testing

The test suite runs the compiled Luau on a **native Lest runtime** (no Roblox VM required):

```bash
npm test                    # spike + host + css suites
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

<br/>

## Windows

The build pipeline is **Node-only** (no `bash`, no `sed` / `ln`), so it runs on Windows with just Node.js and the Git-for-Windows / `luau` toolchain. All three platform paths work:

- **Native Windows** (PowerShell or cmd): `npm install` then `npm run build`. `npm run restore` and the example's `prebuild` call `node` directly, no shell required.
- **Git-Bash**: also works, and the committed `*.sh` wrappers still run (`bash scripts/build.sh`) by delegating to the same Node scripts.
- **WSL / a Linux container**: works exactly as on Linux.

Notes for Windows:

- **Line endings** are forced to LF by `.gitattributes`, so the build's literal string rewrites do not break when your editor or `core.autocrlf` would inject CRLF. If you edit on Windows, `git config core.autocrlf input` (or the `.gitattributes` as-is) keeps the tree LF.
- **Native test runner** (`npm test`): needs a Luau binary. Set `LUAU_BIN` to your `luau.exe` (or put it on `PATH`). The runner resolves `LUAU_BIN`, then `luau.exe` on `PATH`, then common install locations. Symlinks are created with a **copy fallback**, so the runner works even without Windows Developer Mode or admin rights.
- **roblox-ts** is invoked as `npx roblox-ts --type game`; npm handles the `.cmd` shim on Windows, so no path adjustment is needed.

<br/>

## Public API

The public entry is `@toilluau/core` (the compiled `src/host/index.ts`).

**Mounting**

- `mountReactRoot(container, rules, element, engine?, envOverride?)` to `MountHandle`. Creates a `ScreenGui`, builds the host config, mounts the React element tree, drains tasks, starts any animations found in the initial computed styles, and (when a real `RunService` is present) drives the animation tick off `Heartbeat`.
- `MountHandle` = `{ gui, unmount(), tick(now) }`. `gui` is the `ScreenGui` instance, `unmount()` disconnects the heartbeat and destroys the tree, and `tick(now)` advances animations / transitions to a given clock time.

**CSS engine**

- `makeDefaultEngine(rules)` to an `Engine` built from the rules (used as the default when `engine` is omitted).
- `Engine` exposes `computedStyle(identity, ancestors, siblingIndex, siblingCount, inline)`, `parseAnimation(spec)`, and `keyframes(name)`.
- `StyleRule` = `{ selector: string; declarations?: Record<string, string> }`.

**Host config**

- `buildHostConfig(env, resolver)` to the React reconciler `HostConfig`.
- `applyStyle(...)`, `makeEngineEnv()` (the real Roblox API adapter), and the `HostEnv` / `HostNode` / `RobloxInstance` types.

**Animation driver**

- `createDriver(clock, engine, env)`, `startAnimation(driver, node, spec, keyframes)`, `startTransition(...)`, `tick(driver)`, `makeRealClock()`, `makeFakeClock()`, and the `Clock` / `AnimationDriver` types.

**React**

- `@toil/react` is the vendored React 19 runtime (a single shared copy). Consumers import it directly (`import * as React from "@toil/react"`) for hooks, `createElement`, and the JSX runtime. `@toil/react-reconciler` and `@toil/scheduler` are the other two vendored pieces of the graph.

**Polyfills / test globals**

- `drainTasks()`, `log(...)`, `taskLog` (from `src/polyfills.ts`) - the microtask / task pump and task log used by the runtime and the native tests.

<br/>

## JSX to Roblox map

The host maps React element tags to Roblox GUI instances (`src/host/roblox-host.ts`):

| React tag | Roblox class |
| --- | --- |
| `div` / `section` / `article` / `aside` / `nav` / `main` / `header` / `footer` / `ul` / `ol` / `li` / `svg` | `Frame` |
| `span` / `label` / `p` / `h1` to `h6` / `b` / `strong` / `i` / `em` / `small` | `TextLabel` |
| `a` / `button` | `TextButton` |
| `img` | `ImageLabel` |
| `input` | `TextBox` |

Styling comes from the CSS rules you pass to `mountReactRoot` (selectors, cascade, and computed style are resolved per node and applied to the instances).

<br/>

## Project layout

```
toilluau/
  src/
    host/            public host: mountReactRoot, host config, animations
    css/             CSS engine (selectors, cascade, keyframes)
    polyfills.ts     task pump + task log
    main.tsx         the React 19 counter demo (also a smoke test)
    index.ts         package entry (re-exports the public surface)
    vendor/@toil/*   vendored React 19 (regenerated by restore-vendor.mjs)
  include/           rbxts_include (Promise.lua, RuntimeLib.lua)
  type-shims/        TS type surface (rbxts, toil-shims, vendor types)
  .lest/core/        Lest test framework (Luau)
  specs/             native Lest suites (spike, host, css, globals)
  scripts/           build + native-runner pipeline
  example/           standalone roblox-ts example project
  default.project.json   Rojo project (DataModel tree)
  tsconfig.json      roblox-ts compiler config
  restore-vendor.mjs regenerate the @toil vendor from npm react
```

<br/>

## Why this package is scoped

The package is published as **`@toilluau/core`** (scoped). roblox-ts only allows `@`-scoped modules under `node_modules`, so the scope is not a style choice: an unscoped name cannot be imported from a roblox-ts project.

<br/>

## Notes

- The native runner (`scripts/run-native.mjs`) requires a Luau binary at `LUAU_BIN` or `/tmp/luau-bin/luau`.
- The `@toil` vendor is build-derived; do not commit hand edits. Run `npm run restore` to regenerate it.
- The `main.tsx` counter is the reference integration test: it renders through the real reconciler, clicks the button, and asserts the label and effect counts.

<br/>

## License

[Apache-2.0](LICENSE)