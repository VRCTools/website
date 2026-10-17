---
title: Raw Image
layout: component
description: Displays a Texture2D value in a Unity UI RawImage.
nav_order: 50
since: 0.1.0
kinds: [local]
keywords: [image, texture, ui, raw image, picture]
components:
  - name: Local Raw Image Texture2D Applicator
    class: VRCTools.World.LocalValues.Applicators.LocalRawImageTexture2DApplicator
    menu: Local Values/Applicators/Local Raw Image Texture2D Applicator
    prefab: Local Values/UI/Raw Image.prefab
    file: Runtime/UdonScripts/Local Values/Applicators/LocalRawImageTexture2DApplicator.cs
redirect_from:
  - /packages/world-utils/components/local-value/applicators/raw-image-texture2d.html
---

Assigns the state of a [Texture2D value]({{ site.baseurl }}/docs/world-utils/values/texture2d/) to the `RawImage`
component on the same game object, updating it whenever the texture changes. Together with a
[Texture2D Loader]({{ site.baseurl }}/docs/world-utils/converters/texture2d-loader/) this is all you need to show remote
images on a canvas.

## Parameters

| Parameter    | Default | Description                                            |
|--------------|---------|--------------------------------------------------------|
| Local Value  | *None*  | The Texture2D value to display. **Required.**          |

The component requires a `RawImage` on the same game object (Unity adds one automatically).

> Downloaded images keep their original aspect ratio. Add an **Aspect Ratio Fitter** to the RawImage, or design your
> frame around a fixed ratio and ask contributors to stick to it.
{: .tip }
