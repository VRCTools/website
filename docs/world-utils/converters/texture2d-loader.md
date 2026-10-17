---
title: Texture2D Loader
layout: component
description: Downloads an image from a URL value and stores it in a Texture2D value, with placeholders for loading and errors.
nav_order: 60
since: 0.1.0
kinds: [local, synchronized]
keywords: [image, download, remote image, VRCImageDownloader, picture, url]
components:
  - name: Local Texture2D Loader Converter
    class: VRCTools.World.LocalValues.Converters.LocalTexture2DLoaderConverter
    menu: Local Values/Converter/Local Texture2D Loader Converter
    prefab: Local Values/Converters/Image Loader.prefab
    file: Runtime/UdonScripts/Local Values/Converter/LocalTexture2DLoaderConverter.cs
  - name: Synchronized Texture2D Loader Converter
    class: VRCTools.World.LocalValues.Converters.SynchronizedTexture2DLoaderConverter
    menu: Synchronized Values/Converter/Synchronized Texture2D Loader Converter
    prefab: Synchronized Values/Converters/Image Loader.prefab
    file: Runtime/UdonScripts/Synchronized Values/Converter/SynchronizedTexture2DLoaderConverter.cs
redirect_from:
  - /packages/world-utils/components/local-value/converters/texture2d-loader.html
  - /packages/world-utils/components/synchronized-value/converters/texture2d-loader.html
---

Watches a [URL value]({{ site.baseurl }}/docs/world-utils/values/url/) and downloads the image it points to using VRChat's
image downloader. The downloaded texture is written into a local [Texture2D value]({{ site.baseurl }}/docs/world-utils/values/texture2d/),
from where you can show it with a [Raw Image]({{ site.baseurl }}/docs/world-utils/applicators/raw-image/) or
[Material Property]({{ site.baseurl }}/docs/world-utils/applicators/material-property/) applicator.

The *Local* variant reads a local URL, the *Synchronized* variant reads a synchronized URL - in that case every player
downloads the image themselves, so everybody sees the same picture without textures ever being sent over the network.

## Parameters

| Parameter                     | Default | Description                                                                                 |
|-------------------------------|---------|---------------------------------------------------------------------------------------------|
| Local URL / Synchronized URL  | *None*  | The URL value to watch. **Required.**                                                       |
| Local Texture2D               | *None*  | The texture value receiving the image. **Required.**                                        |
| **Alternative Textures**      |         |                                                                                             |
| Default Texture               | *None*  | Shown while the URL is empty.                                                               |
| Loading Texture               | *None*  | Shown while a download is in progress (the previous image stays visible if unset).          |
| Error Texture                 | *None*  | Shown when a download fails and no more specific texture is set.                            |
| Access Denied Error Texture   | *None*  | The URL is not allowed (e.g. untrusted URLs are disabled by the player).                    |
| Download Error Texture        | *None*  | The download itself failed.                                                                 |
| Invalid Error Texture         | *None*  | The URL does not point to a supported image.                                                |
| Too Many Requests Error Texture | *None* | VRChat's image download rate limit was hit.                                                |
| Invalid URL Error Texture     | *None*  | The URL is malformed.                                                                       |
| **Error Handling**            |         |                                                                                             |
| Retry Period                  | `2`     | Seconds to wait before retrying after a *too many requests* error.                          |

The package ships ready-made loading and error textures in `Runtime/Textures` (`T_Texture_Loading`,
`T_Texture_Error`), which the *Image Loader* prefabs use by default.

## Behavior

1. When the URL changes to an empty value, the texture is set to `Default Texture`.
2. Otherwise `Loading Texture` is shown (if set) and the download starts.
3. On success the downloaded texture is written to the target value.
4. On failure the most specific error texture is used, falling back to `Error Texture`. Rate limited downloads are
   retried automatically after `Retry Period` seconds.

If the URL changes while a download is still running, the new URL is queued and downloaded as soon as the current
download finishes. When the loader is destroyed it resets the texture value to `Default Texture` and releases all
downloaded textures.

> VRChat only loads images from [trusted domains](https://creators.vrchat.com/worlds/udon/image-loading/) unless the
> player enabled *Allow Untrusted URLs*. Host your images on a trusted service (e.g. GitHub Pages, Imgur) so everybody
> can see them, and set an `Access Denied Error Texture` that explains what is going on.
{: .note }

See the [Remote image board guide]({{ site.baseurl }}/docs/world-utils/guides/remote-image/) for a complete setup.
