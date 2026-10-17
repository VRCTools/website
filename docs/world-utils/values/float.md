---
title: Float
layout: component
description: A floating point number - volume, brightness, intensity and everything else on a slider.
nav_order: 30
since: 0.1.0
kinds: [local, synchronized, persisted]
networked: true
keywords: [number, decimal, slider, volume]
components:
  - name: Local Float
    class: VRCTools.World.LocalValues.LocalFloat
    menu: Local Values/Local Float
    prefab: Local Values/Local Float.prefab
    file: Runtime/UdonScripts/Local Values/LocalFloat.cs
  - name: Synchronized Float
    class: VRCTools.World.SynchronizedValues.SynchronizedFloat
    menu: Synchronized Values/Synchronized Float
    prefab: Synchronized Values/Synchronized Float.prefab
    file: Runtime/UdonScripts/Synchronized Values/SynchronizedFloat.cs
  - name: Persisted Float
    class: VRCTools.World.PersistedValues.PersistedFloat
    menu: Persisted Values/Persisted Float
    prefab: Persisted Values/Persisted Float.prefab
    file: Runtime/UdonScripts/Persisted Values/PersistedFloat.cs
redirect_from:
  - /packages/world-utils/components/local-value/float-value.html
  - /packages/world-utils/components/synchronized-value/float-value.html
---

Float values are typically driven by a [Slider]({{ site.baseurl }}/docs/world-utils/ui/slider/), displayed with a
[Label]({{ site.baseurl }}/docs/world-utils/ui/labels/) and applied to
[materials]({{ site.baseurl }}/docs/world-utils/applicators/material-property/) or
[animators]({{ site.baseurl }}/docs/world-utils/applicators/animator-parameter/).

## Parameters

| Parameter                  | Default        | Description                                                                                       |
|----------------------------|----------------|---------------------------------------------------------------------------------------------------|
| Default Value              | `0`            | The state the value is initialized with.                                                          |
| Restrict Value             | `false`        | Clamp the state between `Minimum Value` and `Maximum Value`.                                      |
| Minimum Value              | `0`            | Lower bound when restricted.                                                                      |
| Maximum Value              | `1`            | Upper bound when restricted.                                                                      |
| Prevent Nuisance Updates   | `false`        | Ignore changes smaller than `Minimal Update Difference`.                                          |
| Minimal Update Difference  | `Mathf.Epsilon`| Smallest change that is propagated when nuisance updates are prevented.                           |
| Key *(persisted only)* | | `PlayerData` key used to store the value. Required - see [choosing keys]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#choosing-keys). |

Synchronized variants additionally expose the [networking settings]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#synchronized).

> Networked values need a unique hierarchy path - see
> [naming networked objects]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#name-networked-objects-uniquely).
{: .warning }

### Restrictions

When `Minimum Value` exceeds `Maximum Value`, the restriction is disabled at runtime and an error is logged. Restricting
a value also enables **mapping** on [sliders]({{ site.baseurl }}/docs/world-utils/ui/slider/) and
[labels]({{ site.baseurl }}/docs/world-utils/ui/labels/), which translate the restricted range into a display range
(e.g. `0..1` shown as `0..100%`).

> As of v0.7.0, **persisted** floats do not apply `Restrict Value` when their state changes; only the inspector shows
> the restriction settings. Clamp the value before assigning it, or restrict the UI that writes to it (e.g. the
> slider's min/max).
{: .danger }

### Nuisance updates

Without `Prevent Nuisance Updates`, **every** assignment emits `EVENT_STATE_UPDATED` - even when the new number equals
the old one. Sliders write on every frame they are dragged, so for synchronized floats this would mean a network update
per frame. Enable the option and pick a sensible `Minimal Update Difference` (e.g. `0.001` for a `0..1` volume) to keep
traffic and work down.

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
| `_Zero()`       | all              | Sets the state to `0`.                                                     |
| `_Reset()`       | local, persisted | Restores `Default Value`.                                                  |
