# Native Path2D

Toil's `path2d` intrinsic renders a Roblox `Path2D`. It supports all public writable Path2D properties through `closed`, `color` (Color3 or CSS color), `thickness`, `visible`, and `zIndex`. `controlPoints` accepts native `Path2DControlPoint` values, including left and right Bezier tangents. Omitted properties reset to native defaults; omitted points clear the curve. Identical points do not trigger another `SetControlPoints` call.

```tsx
const path = React.createRef<Path2D>();
const points = [
  new Path2DControlPoint(UDim2.fromOffset(0, 100)),
  new Path2DControlPoint(
    UDim2.fromOffset(100, 50),
    UDim2.fromOffset(-40, 0),
    UDim2.fromOffset(40, 0),
  ),
  new Path2DControlPoint(UDim2.fromOffset(200, 100)),
];

<div style={{ width: "200px", height: "150px" }}>
  <path2d ref={path} controlPoints={points} color="#faf5e8" thickness={6}
    onControlPointChanged={({ target }) => print(target.GetLength())} />
</div>;
```

The ref is the real native instance: `GetBoundingRect`, `GetControlPoint(s)`, `GetLength`, `GetMaxControlPoints`, both position sampling methods, both tangent sampling methods, `InsertControlPoint`, `RemoveControlPoint`, `SetControlPoints`, and `UpdateControlPoint` are available directly. Avoid mixing imperative edits with declarative point updates unless you intend the next changed `controlPoints` prop to replace those edits.

Path styles support `stroke`/`color`, `stroke-width`, `visibility`, `display`, and `z-index`, including numeric/color animation. Position, size, rotation, and input belong on the surrounding GUI element: Path2D inherits GuiBase, not GuiObject. This is native stroked-curve support, with no SVG `d` parser or filled-path emulation. Roblox's editor-only selected-control-point properties are restricted by the engine.

The Cookie Clicker milk edge uses this intrinsic. See the [Roblox Path2D reference](https://create.roblox.com/docs/reference/engine/classes/Path2D).
