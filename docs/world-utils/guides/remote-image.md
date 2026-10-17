---
title: Remote image board
description: Show an image from a URL that one player enters and everybody sees.
nav_order: 30
keywords: [image, url, download, poster, board, synchronized url]
---

A poster board where any player can paste an image link and the picture appears for everyone in the instance.

<div class="diagram" markdown="1">
```text
[ URL Input Field ] ─▶ [ Synchronized URL ] ─▶ [ Synchronized Texture2D Loader ] ─▶ [ Local Texture2D ] ─▶ [ Raw Image ]
       player types        shared by all          runs on every client                 per client           on the canvas
```
</div>

Only the URL travels over the network; every client downloads the image itself.

## Steps

1. Add a `Synchronized URL` (`Runtime/Prefabs/Synchronized Values`) to your `Global Settings` group and give it a
   [unique name]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#name-networked-objects-uniquely) such as `Poster URL`. Optionally set a **Default Value** - e.g. your
   world's logo - so the board isn't empty.
2. Add a `Local Texture2D` named `Poster Image` to `Local Settings/Derived` - its state is computed by the loader.
3. Add the `Synchronized Values/Converters/Image Loader` prefab and reference both values. The prefab already uses the
   package's loading and error placeholder textures.
4. On your canvas add `Local Values/UI/Raw Image` and reference the `Local Texture2D`.
5. Add `Synchronized Values/UI/URL Input Field` and reference the `Synchronized URL`.

Players can now paste a link into the input field; the image appears on everybody's board.

## Polish

- **Clear button:** a UI button calling `SendCustomEvent("_Clear")` on the synchronized URL resets the board to the
  loader's `Default Texture`.
- **Curated images:** replace the free input with a few [URL Presets]({{ site.baseurl }}/docs/world-utils/values/presets/) -
  one button per image.
- **Show the link:** add a [URL label]({{ site.baseurl }}/docs/world-utils/ui/labels/#url-label) under the picture.

> VRChat only loads images from trusted hosts unless a player enabled *Allow Untrusted URLs*, and limits how often
> images can be downloaded. Set an `Access Denied Error Texture` on the loader that tells players what went wrong.
> See VRChat's [image loading documentation](https://creators.vrchat.com/worlds/udon/image-loading/).
{: .note }
