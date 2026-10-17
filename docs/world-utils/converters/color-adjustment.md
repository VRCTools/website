---
title: Color Adjustment
layout: component
description: Derives a new color by offsetting the hue, saturation and value (brightness) of another color.
nav_order: 20
since: 0.5.0
kinds: [local, synchronized, persisted]
keywords: [hsv, hue, saturation, brightness, complementary, palette]
components:
  - name: Color Adjustment Converter
    class: VRCTools.World.Values.Converters.ColorAdjustmentConverter
    menu: Values/Converters/Color Adjustment Converter
    prefab: Values/Converters/Color Adjustment Converter.prefab
    file: Runtime/UdonScripts/Values/Converters/ColorAdjustmentConverter.cs
---

Let players pick a single accent color and derive the rest of your palette from it. The converter converts the source
color to HSV, applies the configured offsets and writes the result into the target color.

<div class="diagram" markdown="1">
```text
[ Persisted Color ] ──▶ [ Color Adjustment  hue +0.5 ] ──▶ [ Local Color ] ──▶ trim material
   "accent"         └─▶ [ Color Adjustment  value -0.4 ] ─▶ [ Local Color ] ──▶ shadow material
```
</div>

## Parameters

| Section      | Parameter          | Default | Range      | Description                                                         |
|--------------|--------------------|---------|------------|---------------------------------------------------------------------|
| Source Value | Type / Source      | `LOCAL` |            | The color to read from. **Required.**                               |
| Target Value | Type / Target      | `LOCAL` |            | The color receiving the result. **Required.**                       |
| Adjustment   | Hue Offset         | `0`     | `-1 .. 1`  | Added to the hue (`0.5` ≈ complementary color).                     |
|              | Saturation Offset  | `0`     | `-1 .. 1`  | Added to the saturation; the result is clamped to `0 .. 1`.         |
|              | Value Offset       | `0`     | `-1 .. 1`  | Added to the value (brightness); the result is clamped to `0 .. 1`. |

## Notes

- The result is always fully opaque - the source color's alpha channel is not carried over.
- Saturation and value are clamped, but the hue is **not** wrapped around. Large hue offsets can push the hue outside
  `0 .. 1`; if you see unexpected colors, use a smaller offset in the opposite direction (e.g. `-0.5` instead of `0.5`).
- HDR intensity is lost since saturation and value are clamped to `1`.
