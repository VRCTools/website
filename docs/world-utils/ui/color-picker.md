---
title: Color Picker
layout: component
description: A hue/brightness color field players can point at to pick a color.
nav_order: 60
since: 0.1.0
kinds: [local, synchronized, persisted]
keywords: [color, picker, hue, palette, ui]
components:
  - name: Color Picker
    class: VRCTools.World.Values.UI.ColorPicker
    menu: Values/UI/Color Picker
    prefab: Local Values/UI/Color Picker.prefab
    file: Runtime/UdonScripts/Values/UI/ColorPicker.cs
redirect_from:
  - /packages/world-utils/components/value/ui/color-picker.html
---

A two dimensional color field: the horizontal axis selects the **hue**, the vertical axis the **brightness** (value);
saturation is always full. The picked color is written to a [color value]({{ site.baseurl }}/docs/world-utils/values/color/)
and shown in an optional crosshair image.

> The color picker consists of several cooperating objects (field, cursor, crosshair). Always start from the
> `Color Picker` prefab instead of adding the component by hand.
{: .warning }

## Parameters

| Section     | Parameter     | Default | Description                                                         |
|-------------|---------------|---------|---------------------------------------------------------------------|
|             | Type          | `LOCAL` | Kind of the bound value.                                            |
|             | Source        | *None*  | The color value to write to. **Required.**                          |
| UI Elements | Cursor        | *None*  | The internal cursor behaviour tracking the pointer. **Required.**   |
|             | Crosshair     | *None*  | Optional `RawImage` tinted with the currently picked color.         |

Because saturation is fixed, pastel and gray tones can't be picked directly. Derive them with a
[Color Adjustment]({{ site.baseurl }}/docs/world-utils/converters/color-adjustment/) converter (negative saturation offset)
or combine sliders with a [Color Component]({{ site.baseurl }}/docs/world-utils/converters/color-component/) converter.
