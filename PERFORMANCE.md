# Renderer verification

**Latest animation pass:** verified in an isolated Studio place after AzulService hung in the original session. With shine, milk, click numbers and crumbs enabled, 24 click actions sampled 2,119 frames: mean 5.01 ms, p95 6.30 ms, max 48.09 ms. Cookie press/hover scaling, cursor orbit and production rain were also verified. Fifteen additional clicks created zero particle instances after the 36-node pool filled. No script errors were logged. The earlier measurements below predate these effects.

The animation parser incorrectly accepted nonnumeric words ending in `s` (including `forwards`) as time values, leaving a nil delay. Numeric parsing now returns NaN on failure, handles fractional/signed values, and distinguishes repeat counts from times. A regression test covers the declarations that crashed Studio. Common motion/fade frames now update only motion/fade properties and leave static gradient resources intact. Latest local checks: 10 host, 39 CSS, 23 host-translator, 4 spike, and 10 economy tests passed.

Verified in Roblox Studio through MCP on September 7, 2026. These are local Studio measurements, not a guaranteed frame rate on other devices.

The click and hover paths previously updated the whole Cookie Clicker component. The renderer also normalized identical inline CSS and rewrote unchanged native styles on subsequent commits. Cookie press state, button hover state, and tooltip selection now live in separate components. Static decorations are reused, the tooltip stays mounted, inline-only style normalization is cached by value, and identical native styles skip property conversion/writes. Click snapshots are batched on the server's existing 250 ms snapshot interval; local press feedback is immediate.

Removed views are destroyed, releasing their native input connections. Root unmount goes through React before destroying the GUI, releasing refs and effect cleanup. An empty Fragment is used because a nil `element` field disappears from the translated JavaScript object payload.

Studio initially contained mismatched old/new modules after Azul reported updates. Source hashes exposed the mismatch. Updated modules were installed and Play restarted before final verification. Editing ModuleScript source during Play does not replace an already required module.

| Studio scenario | Frames | Mean frame time | 95th percentile | Maximum |
| --- | ---: | ---: | ---: | ---: |
| 30 hover changes across three store items | 2,558 | 4.76 ms | 6.22 ms | 42.07 ms |
| 12 cookie click actions | 1,336 | 4.78 ms | 5.83 ms | 37.87 ms |

The hover run created zero new UI instances and logged zero render errors. Options, Info, Legacy, and Stats switching left no duplicate GUI paths. Occasional approximately 40 ms spikes remain; these measurements do not establish their complete elimination.

Native regression coverage: 9 host, 38 CSS, 23 host-translator, 4 spike, and 10 economy tests passed. Host tests cover unchanged-style writes, local state updates, keyed removal/destruction, root ref cleanup, dynamic animations, pause/resume, transitions, and Path2D updates.

Studio also verified native Path2D references, all curve query/edit methods, change events, dynamic animation startup/removal, and a transition reaching approximately 50 halfway through a 0-to-100 change. See [PATH2D.md](PATH2D.md).

The attempted `React.memo` optimization exposed an error in the translated reconciler. Cookie Clicker uses ordinary components with local state; resolving that broader memo compatibility issue remains separate work.


## Click stalls and viewport sizing follow-up

Reproduced 30 rapid clicks at 20.03 ms average, 51.26 ms p95, 69.24 ms maximum; 48 frames exceeded 33 ms. Temporary Studio instrumentation isolated React task draining (up to 57.84 ms) from animation evaluation (under 3 ms). Removed the instrumentation after profiling.

Cookie bank/cps now update in a separate component. Full-page updates occur only when displayed structure, news, achievements or affordability changes (Stats/Legacy remain live). Unchanged store row elements and bulk price calculations are reused. The final 30-click test measured 4.34 ms average, 6.11 ms p95, 26.54 ms maximum, with zero frames over 33 ms across 2,763 samples. Buying a cursor updated the bank, owned count, tooltip and cps without console errors. These are isolated Studio measurements, not a guarantee for other hardware or the hung original session.

Viewport scaling now accounts for both width and height, caps scale at 1, and gives surplus width to the center column. The halo uses centered 310/286 pixel layers around the 270 pixel cookie and no thick outer stroke. Canonical App compiled successfully and the local test place was updated.


## Layout correction and Fragment validation

Restored the original width-based 1440px layout scale after height-based global scaling made text and controls too small. The cookie scene alone now scales to fit below the counters; the original column proportions are preserved. Verified visually in Studio; the counter advanced to 166 cookies during the live session. The automated click check was interrupted by a duplicate-button-state response, so it is not counted as a completed input test.

Fixed the translated Fragment validator's shifted Object.keys array index in postbuild-fixup.mjs. Valid children no longer produce repeated invalid-prop warnings. Added a regression checking both valid and invalid props with the Studio runtime's zero-based array convention; all 11 host tests pass. Studio log checks include printed `[error]` messages as well as native MessageError entries; none appeared in the final session.


## Ray rotation and background rain correction

Shine control points now use parent-relative scale coordinates, so their center remains aligned with the cookie under nested UIScale. Removed the extra clipping container that cut off rotating rays. In Studio the ray bounds center matched the cookie center exactly after converting GetBoundingRect screen coordinates by GuiService's inset; rotation advanced across samples.

Rain is a separate clipped child of the bakery panel, outside the shrinking cookie scene. Its bounds matched the full panel (728.29 by 794.18 pixels in the inspected viewport). Keyframes travel from -10% to 110% of that layer's height. This exposed missing percentage-unit interpolation in the CSS engine; fixed the unit parser and added regression coverage. Live production samples advanced continuously through Y scale 0.0984, 0.1293, 0.1594, 0.1896, 0.2192 at 150 ms intervals. No printed or native script errors in the final session. 40 CSS and 11 host tests pass.


## Continuous milk loop

Converted milk control points and tangents to parent-relative coordinates so the wave's 80px period scales identically to the animation's 80px translation. At the tested UI scale, both are 138.72222 screen pixels. Live sampling crossed three loop boundaries with zero stalled samples and no console errors. The UI displays v1 and no original-game credits; character spawning remains disabled after restarting the test place.
