# Studio source snapshot

Pulled from **Idle Cookie Game**, place **85138609584604**, in Edit mode on
September 9, 2026. All 72 LuaSourceContainer sources matched a second Studio read
by UTF-8 byte length and Adler-32 checksum. `manifest.json` includes SHA-256 hashes
for the local files and their original instance paths/classes.

Studio is authoritative for this import. Existing game files in `cookie-clicker/`,
the `sync/` mirror and `.studio-stage/` were updated from this snapshot. This tree
also includes newly discovered scripts and the Ripple package. The local backup
is `tmp/studio-pull-20260909-180017/`; its `changed-files.json` lists written paths.

This is a script-source export, not a full place/world-property export. Tests and
audit reports describe the previous implementation and were not rewritten to
claim the imported code passes them. No gameplay fixes were applied during import.

Studio contains compiled Luau for the Toil engine, not its original TypeScript or
JavaScript. The exact engine sources are preserved here and in `.studio-stage/`;
`src/` and native-test `out/` were not reverse-transpiled. Before rebuilding the
engine, reconcile any Studio edits with those compiler inputs. A full build or
`stage-studio.mjs` can otherwise replace the imported runtime with older code.

New scripts outside the original project mapping are preserved here and under
`.studio-stage/`. Include them in the project mapping before generating a new
place. The existing `.rbxlx` is not a full snapshot of the current Studio world.
