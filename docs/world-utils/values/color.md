---
title: Color
layout: component
description: An RGBA color value (optionally HDR) for lights, materials and UI.
nav_order: 20
since: 0.1.0
kinds: [local, synchronized, persisted]
networked: true
keywords: [rgb, rgba, hdr]
components:
  - name: Local Color
    class: VRCTools.World.LocalValues.LocalColor
    menu: Local Values/Local Color
    prefab: Local Values/Local Color.prefab
    file: Runtime/UdonScripts/Local Values/LocalColor.cs
  - name: Synchronized Color
    class: VRCTools.World.SynchronizedValues.SynchronizedColor
    menu: Synchronized Values/Synchronized Color
    prefab: Synchronized Values/Synchronized Color.prefab
    file: Runtime/UdonScripts/Synchronized Values/SynchronizedColor.cs
  - name: Persisted Color
    class: VRCTools.World.PersistedValues.PersistedColor
    menu: Persisted Values/Persisted Color
    prefab: Persisted Values/Persisted Color.prefab
    file: Runtime/UdonScripts/Persisted Values/PersistedColor.cs
redirect_from:
  - /packages/world-utils/components/local-value/color-value.html
  - /packages/world-utils/components/synchronized-value/color-value.html
---

A color value stores a Unity `Color`. Feed it into a
[Material Property]({{ site.baseurl }}/docs/world-utils/applicators/material-property/) applicator to recolor
materials, let players pick it with the [Color Picker]({{ site.baseurl }}/docs/world-utils/ui/color-picker/) or derive
complementary colors with a [Color Adjustment]({{ site.baseurl }}/docs/world-utils/converters/color-adjustment/)
converter.

## Parameters

| Parameter     | Default        | Description                                                                         |
|---------------|----------------|-------------------------------------------------------------------------------------|
| Default Value | `(0, 0, 0, 0)` | The state the value is initialized with.                                            |
| Permit Alpha  | `true`         | Whether the inspector's color field allows editing the alpha channel.               |
| Permit HDR    | `false`        | Whether the inspector's color field allows HDR (intensity above `1`) colors.        |
| Key *(persisted only)* | | `PlayerData` key used to store the value. Required - see [choosing keys]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#choosing-keys). |

`Permit Alpha` and `Permit HDR` only affect the inspector - they are not enforced when the value is changed at runtime.

Synchronized variants additionally expose the [networking settings]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#synchronized).

> Networked values need a unique hierarchy path - see
> [naming networked objects]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#name-networked-objects-uniquely).
{: .warning }

## Events

| Event                  | Kinds                        | Description                                              |
|------------------------|------------------------------|----------------------------------------------------------|
| `EVENT_STATE_UPDATED`  | all                          | The state changed (also emitted once with the initial state). |
| `EVENT_STATE_RESET`    | local, persisted             | `_Reset()` restored the default value.                   |
| `EVENT_LOADED`         | persisted                    | Stored data has been restored - see [loading]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#loading). |
| `EVENT_PERSIST`        | persisted                    | The state has been written to player data.              |

## Functions

| Function        | Kinds            | Description                                                                |
|-----------------|------------------|----------------------------------------------------------------------------|
| `_Reset()`       | local, persisted | Restores `Default Value`.                                                  |

Use a [Color Preset]({{ site.baseurl }}/docs/world-utils/values/presets/) to set a specific color from a button, or a
[Color Component Converter]({{ site.baseurl }}/docs/world-utils/converters/color-component/) to build a color from
individual float values (e.g. three sliders).
