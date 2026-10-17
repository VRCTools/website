---
title: Color Component
layout: component
description: Builds a color from four float values (red, green, blue, alpha) - for example three sliders.
nav_order: 30
since: 0.2.0
kinds: [local, synchronized, persisted]
keywords: [rgb, rgba, channels, sliders]
components:
  - name: Color Component Converter
    class: VRCTools.World.Values.Converters.ColorComponentConverter
    menu: Values/Converters/Color Component Converter
    prefab: Values/Converters/Color Component Converter.prefab
    file: Runtime/UdonScripts/Values/Converters/ColorComponentConverter.cs
redirect_from:
  - /packages/world-utils/components/value/converters/color-component.html
---

Combines four channels into a single color. Each channel can be a constant or a float value, so you can expose only
the channels you care about - e.g. a red, green and blue slider with a constant alpha of `1`.

## Parameters

| Section       | Parameter  | Default  | Description                                                                |
|---------------|------------|----------|----------------------------------------------------------------------------|
| Target        | Type       | `LOCAL`  | Kind of the target value.                                                  |
|               | Target     | *None*   | Color value receiving the result. **Required.**                            |
| Red Channel   | Type       | `STATIC` | `STATIC`, `LOCAL` or `SYNCHRONIZED`.                                       |
|               | Component  | `1`      | The constant (static) or float value providing the channel.               |
| Green Channel | Type / Component | `STATIC` / `1` | As above.                                                      |
| Blue Channel  | Type / Component | `STATIC` / `1` | As above.                                                      |
| Alpha Channel | Type / Component | `STATIC` / `1` | As above.                                                      |

Channels are used as-is - restrict your float values to `0 .. 1` (or higher for HDR colors). If a channel references
a missing value an error is logged at start-up.

## Usage

1. Create three `Local Float` values with `Restrict Value` enabled (`0 .. 1`), each driven by a
   [Slider]({{ site.baseurl }}/docs/world-utils/ui/slider/).
2. Add a `Color Component Converter`, point its target at a `Local Color` and set the red, green and blue channels
   to `LOCAL` with the matching floats. Leave alpha at `STATIC` / `1`.
3. Apply the resulting color with a [Material Property applicator]({{ site.baseurl }}/docs/world-utils/applicators/material-property/).

> For a single control that picks hue and brightness at once, the [Color Picker]({{ site.baseurl }}/docs/world-utils/ui/color-picker/)
> may be a better fit.
{: .tip }
