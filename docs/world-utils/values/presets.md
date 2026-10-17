---
title: Presets
layout: component
description: Write a fixed value into a local or synchronized value at the press of a button.
nav_order: 90
since: 0.2.0
kinds: [local, synchronized, persisted]
keywords: [preset, button, set value, apply]
components:
  - name: Color Preset
    class: VRCTools.World.Values.Presets.ColorPreset
    menu: Values/Presets/Color Preset
    prefab: Values/Presets/Color Preset.prefab
    file: Runtime/UdonScripts/Values/Presets/ColorPreset.cs
  - name: Float Preset
    class: VRCTools.World.Values.Presets.FloatPreset
    menu: Values/Presets/Float Preset
    prefab: Values/Presets/Float Preset.prefab
    file: Runtime/UdonScripts/Values/Presets/FloatPreset.cs
  - name: Int Preset
    class: VRCTools.World.Values.Presets.IntPreset
    menu: Values/Presets/Int Preset
    prefab: Values/Presets/Int Preset.prefab
    file: Runtime/UdonScripts/Values/Presets/IntPreset.cs
  - name: String Preset
    class: VRCTools.World.Values.Presets.StringPreset
    menu: Values/Presets/String Preset
    prefab: Values/Presets/String Preset.prefab
    file: Runtime/UdonScripts/Values/Presets/StringPreset.cs
  - name: URL Preset
    class: VRCTools.World.Values.Presets.UrlPreset
    menu: Values/Presets/URL Preset
    prefab: Values/Presets/URL Preset.prefab
    file: Runtime/UdonScripts/Values/Presets/UrlPreset.cs
  - name: Vector3 Preset
    class: VRCTools.World.Values.Presets.Vector3Preset
    menu: Values/Presets/Vector3 Preset
    prefab: Values/Presets/Vector3 Preset.prefab
    file: Runtime/UdonScripts/Values/Presets/Vector3Preset.cs
redirect_from:
  - /packages/world-utils/components/value/presets/
  - /packages/world-utils/components/value/presets/color.html
  - /packages/world-utils/components/value/presets/float.html
  - /packages/world-utils/components/value/presets/int.html
  - /packages/world-utils/components/value/presets/string.html
  - /packages/world-utils/components/value/presets/url.html
  - /packages/world-utils/components/value/presets/vector3.html
---

A preset stores one fixed value and writes it into a target value whenever `_Apply()` is called. Use presets for
"pick a theme" buttons, quick-select volume levels, predefined announcement texts or a list of known image URLs.

Presets exist for every value type that has a meaningful constant: Color, Float, Int, String, URL and Vector3. Boolean
values don't need one - call `_SetTrue()` / `_SetFalse()` on the value directly.

## Parameters

| Parameter | Default                        | Description                                                                    |
|-----------|--------------------------------|--------------------------------------------------------------------------------|
| Type      | `LOCAL`                        | Kind of the target value: `LOCAL` (also accepts persisted values) or `SYNCHRONIZED`. |
| Target    | *None*                         | The value to write to.                                                         |
| Preset    | type default (`0`, `""`, ...)  | The value that is written when the preset is applied.                          |

## Functions

| Function    | Description                                 |
|-------------|---------------------------------------------|
| `_Apply()`  | Writes `Preset` into the target value.      |

## Usage

Three buttons that switch the lobby lighting between *day*, *sunset* and *night* colors for everyone:

1. Create a `Synchronized Color` and connect it to your lights' material with a
   [Material Property applicator]({{ site.baseurl }}/docs/world-utils/applicators/material-property/).
2. Add three `Color Preset` prefabs, set **Type** to `SYNCHRONIZED`, reference the color and pick a preset color for
   each.
3. On each UI button, add an **On Click** entry targeting the matching preset's `UdonBehaviour` →
   `SendCustomEvent` → `_Apply`.

> Presets can also be triggered without UI: from an
> [Interact Trigger]({{ site.baseurl }}/docs/world-utils/player/interact-trigger/) (click an object in the world), a
> [Trigger Volume]({{ site.baseurl }}/docs/world-utils/player/trigger-volume/) (walk into an area) or an
> [Event Broadcaster]({{ site.baseurl }}/docs/world-utils/utilities/event-broadcaster/).
{: .tip }
