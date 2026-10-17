---
title: Boolean
layout: component
description: An on/off value - the workhorse behind toggles, feature switches and material swaps.
nav_order: 10
since: 0.1.0
kinds: [local, synchronized, persisted]
networked: true
keywords: [bool, toggle, switch]
components:
  - name: Local Boolean
    class: VRCTools.World.LocalValues.LocalBoolean
    menu: Local Values/Local Boolean
    prefab: Local Values/Local Boolean.prefab
    file: Runtime/UdonScripts/Local Values/LocalBoolean.cs
  - name: Synchronized Boolean
    class: VRCTools.World.SynchronizedValues.SynchronizedBoolean
    menu: Synchronized Values/Synchronized Boolean
    prefab: Synchronized Values/Synchronized Boolean.prefab
    file: Runtime/UdonScripts/Synchronized Values/SynchronizedBoolean.cs
  - name: Persisted Boolean
    class: VRCTools.World.PersistedValues.PersistedBoolean
    menu: Persisted Values/Persisted Boolean
    prefab: Persisted Values/Persisted Boolean.prefab
    file: Runtime/UdonScripts/Persisted Values/PersistedBoolean.cs
redirect_from:
  - /packages/world-utils/components/local-value/boolean-value.html
  - /packages/world-utils/components/synchronized-value/boolean-value.html
---

A boolean value stores `true` or `false`. It is most commonly connected to an
[Object Toggle]({{ site.baseurl }}/docs/world-utils/applicators/object-toggle/) or
[Material Swap]({{ site.baseurl }}/docs/world-utils/applicators/material-swap/) applicator and controlled by a
[Toggle]({{ site.baseurl }}/docs/world-utils/ui/toggle/) or [Toggle Button]({{ site.baseurl }}/docs/world-utils/ui/toggle-button/).

## Parameters

| Parameter     | Default | Description                                  |
|---------------|---------|----------------------------------------------|
| Default Value | `false` | The state the value is initialized with.     |
| Key *(persisted only)* | | `PlayerData` key used to store the value. Required - see [choosing keys]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#choosing-keys). |

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
| `_SetTrue()`    | all              | Sets the state to `true`.                                                  |
| `_SetFalse()`   | all              | Sets the state to `false`.                                                 |
| `_Toggle()`     | all              | Inverts the state.                                                         |
| `_Reset()`       | local, persisted | Restores `Default Value`.                                                  |

## Usage

Need a mirror toggle that remembers the player's choice?

1. Drag the `Persisted Boolean` prefab into your scene and give it a key such as `settings.mirror`.
2. Add an [Object Toggle Applicator]({{ site.baseurl }}/docs/world-utils/applicators/object-toggle/), set **Type** to
   `LOCAL`, reference the persisted boolean and add the mirror object to **Targets**.
3. Add a [Toggle Button]({{ site.baseurl }}/docs/world-utils/ui/toggle-button/) to your menu and reference the same value.

To combine several booleans (for example *owner allows it* **and** *player wants it*), use a
[Boolean Operation]({{ site.baseurl }}/docs/world-utils/converters/boolean-operation/) converter. To run your own
logic when the state flips, use a [Boolean Event Applicator]({{ site.baseurl }}/docs/world-utils/applicators/boolean-event/).
