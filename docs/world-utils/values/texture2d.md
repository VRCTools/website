---
title: Texture2D
layout: component
description: A texture reference - typically the result of downloading an image.
nav_order: 80
since: 0.1.0
kinds: [local]
keywords: [texture, image, picture]
components:
  - name: Local Texture2D
    class: VRCTools.World.LocalValues.LocalTexture2D
    menu: Local Values/Local Texture2D
    prefab: Local Values/Local Texture2D.prefab
    file: Runtime/UdonScripts/Local Values/LocalTexture2D.cs
redirect_from:
  - /packages/world-utils/components/local-value/local-texture2d.html
---

Texture2D values exist only as local values: textures cannot be synchronized or persisted. They usually hold the
output of a [Texture2D Loader]({{ site.baseurl }}/docs/world-utils/converters/texture2d-loader/) which downloads an image
from a (local or synchronized) [URL value]({{ site.baseurl }}/docs/world-utils/values/url/) on every client. Display the
result with a [Raw Image applicator]({{ site.baseurl }}/docs/world-utils/applicators/raw-image/) or a
[Material Property applicator]({{ site.baseurl }}/docs/world-utils/applicators/material-property/).

<div class="diagram" markdown="1">
```text
[ Synchronized URL ] ──▶ [ Texture2D Loader ] ──▶ [ Local Texture2D ] ──▶ [ Raw Image Applicator ]
```
</div>

## Parameters

| Parameter     | Default | Description                                  |
|---------------|---------|----------------------------------------------|
| Default Value | *None*  | The texture the value is initialized with.   |

## Events

| Event                  | Description                                                    |
|------------------------|----------------------------------------------------------------|
| `EVENT_STATE_UPDATED`  | The state changed (also emitted once with the initial state).  |
| `EVENT_STATE_RESET`    | `_Reset()` restored the default value.                         |

## Functions

| Function     | Description                 |
|--------------|-----------------------------|
| `_Reset()`   | Restores `Default Value`.   |
