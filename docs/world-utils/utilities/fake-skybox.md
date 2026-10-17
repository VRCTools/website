---
title: Fake Skybox Shader
layout: doc
description: Render a cubemap on a mesh - for skyboxes that can be rotated, tinted and animated per object.
nav_order: 20
since: 0.3.0
keywords: [skybox, shader, cubemap, sky, background]
---

<div class="badges"><span class="badge badge-since">since v0.3.0</span></div>

`.start/World Utilities/Fake Skybox` is a shader that renders a cubemap onto any mesh as if it were the skybox. Put it
on a large inverted sphere or cube around your scene (or around a single room) and you get a "skybox" that can be
swapped, rotated and tinted at runtime like any other material - for example with the
[Material Property applicator]({{ site.baseurl }}/docs/world-utils/applicators/material-property/).

The sample scene uses it with `Samples/Materials/M_Skybox.mat`.

## Properties

| Property         | Name         | Default        | Description                                                     |
|------------------|--------------|----------------|-----------------------------------------------------------------|
| Cubemap (HDR)    | `_MainTex`   | grey           | The cubemap to display.                                         |
| Tint             | `_Tint`      | `(0.5, 0.5, 0.5, 1)` | Color multiplied with the cubemap.                        |
| Exposure         | `_Exposure`  | `1`            | Brightness multiplier (`0 .. 8`).                               |
| Rotation         | `_Rotation`  | `0`            | Rotation around the Y axis in degrees (`0 .. 360`).             |
| Z-Write          | `_ZWrite`    | `On`           | Whether the mesh writes to the depth buffer.                    |
| Z-Test           | `_ZTest`     | `LessEqual`    | Depth comparison function.                                      |
| Culling          | `_Culling`   | `Off`          | Which faces are culled - `Off` renders both sides.              |

> Lighting and reflection probes still use the scene's real skybox. Bake your lighting with a matching skybox
> material, or use this shader only for areas where the difference does not matter.
{: .note }
