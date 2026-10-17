---
title: Int
layout: component
description: A whole number - option indices, counters and limits.
nav_order: 40
since: 0.1.0
kinds: [local, synchronized, persisted]
networked: true
keywords: [integer, number, counter]
components:
  - name: Local Int
    class: VRCTools.World.LocalValues.LocalInt
    menu: Local Values/Local Int
    prefab: Local Values/Local Int.prefab
    file: Runtime/UdonScripts/Local Values/LocalInt.cs
  - name: Synchronized Int
    class: VRCTools.World.SynchronizedValues.SynchronizedInt
    menu: Synchronized Values/Synchronized Int
    prefab: Synchronized Values/Synchronized Int.prefab
    file: Runtime/UdonScripts/Synchronized Values/SynchronizedInt.cs
  - name: Persisted Int
    class: VRCTools.World.PersistedValues.PersistedInt
    menu: Persisted Values/Persisted Int
    prefab: Persisted Values/Persisted Int.prefab
    file: Runtime/UdonScripts/Persisted Values/PersistedInt.cs
redirect_from:
  - /packages/world-utils/components/local-value/int-value.html
  - /packages/world-utils/components/synchronized-value/int-value.html
---

Int values work well for anything you count or choose from a list: the selected music track, the number of players
in a game, the active lighting preset. Combine them with [Int Math]({{ site.baseurl }}/docs/world-utils/converters/int-math/)
for derived numbers or with [Presets]({{ site.baseurl }}/docs/world-utils/values/presets/) for "pick option N" buttons.

## Parameters

| Parameter       | Default | Description                                                    |
|-----------------|---------|----------------------------------------------------------------|
| Default Value   | `0`     | The state the value is initialized with.                       |
| Restrict Value  | `false` | Clamp the state between `Minimum Value` and `Maximum Value`.   |
| Minimum Value   | `0`     | Lower bound when restricted.                                   |
| Maximum Value   | `1`     | Upper bound when restricted.                                   |
| Key *(persisted only)* | | `PlayerData` key used to store the value. Required - see [choosing keys]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#choosing-keys). |

Synchronized variants additionally expose the [networking settings]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#synchronized).

> Networked values need a unique hierarchy path - see
> [naming networked objects]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#name-networked-objects-uniquely).
{: .warning }

With `Restrict Value` enabled, `_Increment()` and `_Decrement()` stop at the bounds instead of wrapping around.

> As of v0.7.0, **persisted** ints do not apply `Restrict Value` when their state changes; only the inspector shows
> the restriction settings. Clamp the value before assigning it, or restrict the UI that writes to it (e.g. the
> slider's min/max).
{: .danger }

## Events

| Event                  | Kinds                        | Description                                              |
|------------------------|------------------------------|----------------------------------------------------------|
| `EVENT_STATE_UPDATED`  | all                          | The state changed (also emitted once with the initial state). |
| `EVENT_STATE_RESET`    | local, persisted             | `_Reset()` restored the default value.                   |
| `EVENT_LOADED`         | persisted                    | Stored data has been restored - see [loading]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#loading). |
| `EVENT_PERSIST`        | persisted                    | The state has been written to player data.              |

## Functions

| Function         | Kinds            | Description                                                                |
|------------------|------------------|----------------------------------------------------------------------------|
| `_Zero()`        | all              | Sets the state to `0`.                                                     |
| `_Increment()`   | all              | Adds one.                                                                  |
| `_Decrement()`   | all              | Subtracts one.                                                             |
| `_Reset()`       | local, persisted | Restores `Default Value`.                                                  |

## Usage

A "next track" / "previous track" pair of buttons for a playlist with five entries:

1. Add a `Synchronized Int` with `Restrict Value` enabled, `Minimum Value` `0` and `Maximum Value` `4`.
2. Wire the buttons' **On Click** to `SendCustomEvent` with `_Increment` and `_Decrement` respectively.
3. Read the state from your player script, or drive an animator with an
   [Animator Parameter]({{ site.baseurl }}/docs/world-utils/applicators/animator-parameter/) applicator.
