---
title: String
layout: component
description: A piece of text - announcements, names and messages.
nav_order: 50
since: 0.1.0
kinds: [local, synchronized, persisted]
networked: true
keywords: [text, message]
components:
  - name: Local String
    class: VRCTools.World.LocalValues.LocalString
    menu: Local Values/Local String
    prefab: Local Values/Local String.prefab
    file: Runtime/UdonScripts/Local Values/LocalString.cs
  - name: Synchronized String
    class: VRCTools.World.SynchronizedValues.SynchronizedString
    menu: Synchronized Values/Synchronized String
    prefab: Synchronized Values/Synchronized String.prefab
    file: Runtime/UdonScripts/Synchronized Values/SynchronizedString.cs
  - name: Persisted String
    class: VRCTools.World.PersistedValues.PersistedString
    menu: Persisted Values/Persisted String
    prefab: Persisted Values/Persisted String.prefab
    file: Runtime/UdonScripts/Persisted Values/PersistedString.cs
redirect_from:
  - /packages/world-utils/components/local-value/string-value.html
  - /packages/world-utils/components/synchronized-value/string-value.html
---

String values hold free text. Show them with a [String Label]({{ site.baseurl }}/docs/world-utils/ui/labels/#string-label),
edit them with an [Input Field]({{ site.baseurl }}/docs/world-utils/ui/input-field/) and set them from buttons with a
[String Preset]({{ site.baseurl }}/docs/world-utils/values/presets/). A *Synchronized String* behind an input field
makes an instant announcement board ("Welcome! We're celebrating Kim's birthday today!").

## Parameters

| Parameter     | Default | Description                                  |
|---------------|---------|----------------------------------------------|
| Default Value | `""`    | The state the value is initialized with.     |
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
| `_Clear()`      | all              | Sets the state to an empty string.                                         |
| `_Reset()`       | local, persisted | Restores `Default Value`.                                                  |

> Synchronized strings are sent in full on every change. They are perfect for short messages, but avoid binding them to
> input fields that players type long texts into.
{: .note }
