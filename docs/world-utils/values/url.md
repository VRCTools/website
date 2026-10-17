---
title: URL
layout: component
description: A `VRCUrl` for images, videos and remote text.
nav_order: 60
since: 0.1.0
kinds: [local, synchronized]
networked: true
keywords: [VRCUrl, link, image, video]
components:
  - name: Local URL
    class: VRCTools.World.LocalValues.LocalUrl
    menu: Local Values/Local URL
    prefab: Local Values/Local URL.prefab
    file: Runtime/UdonScripts/Local Values/LocalUrl.cs
  - name: Synchronized URL
    class: VRCTools.World.SynchronizedValues.SynchronizedUrl
    menu: Synchronized Values/Synchronized URL
    prefab: Synchronized Values/Synchronized URL.prefab
    file: Runtime/UdonScripts/Synchronized Values/SynchronizedUrl.cs
redirect_from:
  - /packages/world-utils/components/local-value/url-value.html
  - /packages/world-utils/components/synchronized-value/url-value.html
---

URL values store a `VRCUrl`, the only URL type VRChat allows you to load content from. Pair them with a
[Texture2D Loader]({{ site.baseurl }}/docs/world-utils/converters/texture2d-loader/) to display remote images, or hand the
state to your video player script.

## Parameters

| Parameter     | Default  | Description                                  |
|---------------|----------|----------------------------------------------|
| Default Value | *(empty)*| The state the value is initialized with.     |

Synchronized variants additionally expose the [networking settings]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#synchronized).

> Networked values need a unique hierarchy path - see
> [naming networked objects]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#name-networked-objects-uniquely).
{: .warning }

## Events

| Event                  | Kinds   | Description                                                    |
|------------------------|---------|----------------------------------------------------------------|
| `EVENT_STATE_UPDATED`  | all     | The state changed (also emitted once with the initial state).  |
| `EVENT_STATE_RESET`    | local   | `_Reset()` restored the default value.                         |

## Functions

| Function        | Kinds  | Description                                                                |
|-----------------|--------|----------------------------------------------------------------------------|
| `_Clear()`      | all    | Sets the state to `VRCUrl.Empty`.                                          |
| `_Reset()`      | local  | Restores `Default Value`.                                                  |

## Where URLs come from

For security reasons, Udon cannot build a `VRCUrl` from a string at runtime. A URL value can therefore only receive
URLs that already exist as `VRCUrl`:

- typed by a player into a `VRCUrlInputField` - see [URL Input Field]({{ site.baseurl }}/docs/world-utils/ui/input-field/#url-input-field)
- authored in the inspector - as `Default Value` or in a [URL Preset]({{ site.baseurl }}/docs/world-utils/values/presets/)
- received from another URL value (synchronized URLs are re-created by VRChat on every client)

> There is no persisted URL value - VRChat's player data does not support storing `VRCUrl`.
{: .note }
