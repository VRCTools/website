---
title: Vector3
layout: component
description: A three component vector - positions, directions, scales or any three numbers.
nav_order: 70
since: 0.1.0
kinds: [local, synchronized, persisted]
networked: true
keywords: [vector, position, direction]
components:
  - name: Local Vector3
    class: VRCTools.World.LocalValues.LocalVector3
    menu: Local Values/Local Vector3
    prefab: Local Values/Local Vector3.prefab
    file: Runtime/UdonScripts/Local Values/LocalVector3.cs
  - name: Synchronized Vector3
    class: VRCTools.World.SynchronizedValues.SynchronizedVector3
    menu: Synchronized Values/Synchronized Vector3
    prefab: Synchronized Values/Synchronized Vector3.prefab
    file: Runtime/UdonScripts/Synchronized Values/SynchronizedVector3.cs
  - name: Persisted Vector3
    class: VRCTools.World.PersistedValues.PersistedVector3
    menu: Persisted Values/Persisted Vector3
    prefab: Persisted Values/Persisted Vector3.prefab
    file: Runtime/UdonScripts/Persisted Values/PersistedVector3.cs
redirect_from:
  - /packages/world-utils/components/local-value/vector3-value.html
  - /packages/world-utils/components/synchronized-value/vector3-value.html
---

Vector3 values can be applied to [material]({{ site.baseurl }}/docs/world-utils/applicators/material-property/)
vector properties or read from scripts, for example to remember where a player left an object.

## Parameters

| Parameter     | Default     | Description                                  |
|---------------|-------------|----------------------------------------------|
| Default Value | `(0, 0, 0)` | The state the value is initialized with.     |
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
| `_Reset()`       | local, persisted | Restores `Default Value`.                                                  |
