---
title: Material Swap
layout: component
description: Replaces materials on renderers while a boolean value is true.
nav_order: 20
since: 0.1.0
kinds: [local, synchronized, persisted]
keywords: [material, swap, replace, renderer]
components:
  - name: Simple Material Swap Applicator
    class: VRCTools.World.Values.Applicators.SimpleMaterialSwapApplicator
    menu: Values/Applicators/Simple Material Swap Applicator
    file: Runtime/UdonScripts/Values/Applicators/SimpleMaterialSwapApplicator.cs
redirect_from:
  - /packages/world-utils/components/value/applicators/simple-material-swap.html
---

Swaps one material slot per entry: while the boolean is `true` the slot uses the replacement material, while it is
`false` the slot uses the material it had when the world started.

Use material swaps when the two looks need *different shaders* or are easier to author as separate materials. If you
only need to change a color or a number on the same shader, the
[Material Property applicator]({{ site.baseurl }}/docs/world-utils/applicators/material-property/) is cheaper and smoother.

## Parameters

| Parameter | Default | Description                                                                                  |
|-----------|---------|----------------------------------------------------------------------------------------------|
| Type      | `LOCAL` | Kind of the source value.                                                                    |
| Source    | *None*  | The boolean value to follow. **Required.**                                                   |
| Swaps     | *empty* | List of `Renderer`, material `Slot` index and `Replacement` material.                         |
| Invert    | `false` | *Advanced.* Use the replacement while the value is `false` instead.                          |

The original material of each slot is captured when the applicator starts, so assign the "off" material on the
renderer itself.

> In v0.7.0 an entry only works correctly when its **slot index equals its position** in the `Swaps` list (the first
> entry must target slot `0`, the second slot `1`, and so on). To swap slot `2` of a renderer, fill positions `0` and
> `1` with entries that "replace" those slots with the material they already use.
{: .danger }
