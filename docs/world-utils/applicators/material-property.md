---
title: Material Property
layout: component
description: Writes values into shader properties of a material, a renderer's property block or global shader variables.
nav_order: 30
since: 0.1.0
kinds: [local, synchronized, persisted]
keywords: [shader, material, property block, global, uniform, _Color, emission]
components:
  - name: Local Material Property Applicator
    class: VRCTools.World.LocalValues.Applicators.LocalMaterialPropertyApplicator
    menu: Local Values/Applicators/Local Material Property Applicator
    prefab: Local Values/Applicators/Material Property Applicator.prefab
    file: Runtime/UdonScripts/Local Values/Applicators/LocalMaterialPropertyApplicator.cs
  - name: Synchronized Material Property Applicator
    class: VRCTools.World.SynchronizedValues.Applicators.SynchronizedMaterialPropertyApplicator
    menu: Synchronized Values/Applicators/Synchronized Material Property Applicator
    prefab: Synchronized Values/Applicators/Material Property Applicator.prefab
    file: Runtime/UdonScripts/Synchronized Values/Applicators/SynchronizedMaterialPropertyApplicator.cs
redirect_from:
  - /packages/world-utils/components/local-value/applicators/material-property.html
  - /packages/world-utils/components/synchronized-value/applicators/material-property.html
---

Maps any number of values to shader property names. Whenever one of the values changes, only the properties belonging
to that value are updated. A single applicator can drive colors, floats and toggles of the same material at once.

## Parameters

| Parameter           | Default    | Description                                                                         |
|---------------------|------------|-------------------------------------------------------------------------------------|
| Target              | `MATERIAL` | Where properties are written to - see [targets](#targets).                          |
| Renderer            | *None*     | The renderer to modify (`PROPERTY_BLOCK` only).                                     |
| Material            | *None*     | The material asset to modify (`MATERIAL` only).                                     |
| Boolean Properties  | *empty*    | Boolean values → property names. Written as int `0` / `1`.                          |
| Color Properties    | *empty*    | Color values → property names.                                                      |
| Float Properties    | *empty*    | Float values → property names.                                                      |
| Int Properties      | *empty*    | Int values → property names.                                                        |
| Texture Properties  | *empty*    | *Local only.* Texture2D values → property names.                                    |
| Vector Properties   | *empty*    | Vector3 values → property names (written as `Vector4` with `w = 0`).                |

The local applicator accepts local and persisted values; the synchronized applicator accepts synchronized values.

> In v0.7.0 **Texture Properties** are not applied as textures. To show a downloaded image, use a
> [Raw Image applicator]({{ site.baseurl }}/docs/world-utils/applicators/raw-image/) for UI or a small custom script for
> materials until this is fixed.
{: .danger }

## Targets

### `PROPERTY_BLOCK` (recommended)

Writes into a `MaterialPropertyBlock` on a single renderer. Other objects sharing the same material are **not**
affected and nothing is written to your material assets.

1. Make sure the material has **Enable GPU Instancing** ticked and its shader supports per-instance properties.
   Most standard and popular world shaders do; niche effect shaders (water, caustics, fake lighting) sometimes don't.
2. Set **Target** to `PROPERTY_BLOCK` and drag the renderer into **Renderer**.
3. Add an entry per property you want to drive.

Property blocks apply to *all* material slots of the renderer.

### `MATERIAL`

Writes directly into a material asset. **Every renderer using the material changes.** Use this when you want to recolor
many objects at once.

> Changes made in play mode may stick to the material asset after you exit play mode. Keep your materials under version
> control or reset them after testing.
{: .warning }

### `GLOBAL`

Sets a global shader property (via `VRCShader.SetGlobal*`) which every shader declaring that property picks up - ideal
for world wide effects such as a global tint, wind strength or a "night mode" factor used by many custom shaders.

> VRChat only allows global shader properties whose name starts with `_Udon`, e.g. `_UdonNightFactor`. Declare the
> property in your shaders as a regular (non-`Properties` block) uniform with that name.
{: .note }

## Finding property names

Shader property names rarely match the labels shown in the material inspector. To find the real names:

1. Select the material.
2. Click the shader name (or right click the material preview header) and choose **Select Shader**.
3. The shader inspector lists all properties with their actual names, e.g. `_EmissionColor`.

Some shaders use custom inspectors that hide or rename properties. When in doubt, ask the shader author.

| Displayed name (Standard shader) | Property name    |
|----------------------------------|------------------|
| Albedo color                     | `_Color`         |
| Alpha Cutoff                     | `_Cutoff`        |
| Metallic                         | `_Metallic`      |
| Smoothness                       | `_Glossiness`    |
| Emission color                   | `_EmissionColor` |
| Albedo texture                   | `_MainTex`       |

> Emission changes on lightmapped or baked-GI objects only update the material, not the baked lighting.
{: .note }
