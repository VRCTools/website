---
title: Slider
layout: component
description: Binds a Unity UI Slider to a float or int value, with optional range mapping.
nav_order: 30
since: 0.1.0
kinds: [local, synchronized, persisted]
keywords: [slider, range, volume, mapping, percentage]
components:
  - name: Local Slider
    class: VRCTools.World.LocalValues.UI.LocalSlider
    menu: Local Values/UI/Local Slider
    prefab: Local Values/UI/Slider.prefab
    file: Runtime/UdonScripts/Local Values/UI/LocalSlider.cs
  - name: Local Int Slider
    class: VRCTools.World.LocalValues.UI.LocalIntSlider
    menu: Local Values/UI/Local Int Slider
    prefab: Local Values/UI/Int Slider.prefab
    file: Runtime/UdonScripts/Local Values/UI/LocalIntSlider.cs
  - name: Synchronized Slider
    class: VRCTools.World.SynchronizedValues.UI.SynchronizedSlider
    menu: Synchronized Values/UI/Synchronized Slider
    prefab: Synchronized Values/UI/Slider.prefab
    file: Runtime/UdonScripts/Synchronized Values/UI/SynchronizedSlider.cs
  - name: Synchronized Int Slider
    class: VRCTools.World.SynchronizedValues.UI.SynchronizedIntSlider
    menu: Synchronized Values/UI/Synchronized Int Slider
    prefab: Synchronized Values/UI/Int Slider.prefab
    file: Runtime/UdonScripts/Synchronized Values/UI/SynchronizedIntSlider.cs
redirect_from:
  - /packages/world-utils/components/local-value/ui/slider.html
  - /packages/world-utils/components/synchronized-value/ui/slider.html
---

Keeps a `Slider` in sync with a [float]({{ site.baseurl }}/docs/world-utils/values/float/) or [int]({{ site.baseurl }}/docs/world-utils/values/int/)
value. There is one component per value type and kind: use the *Local* sliders for local and persisted values and the
*Synchronized* sliders for synchronized values.

## Parameters

| Parameter                     | Default    | Description                                                                 |
|-------------------------------|------------|-----------------------------------------------------------------------------|
| Local Value / Synchronized Value | *None*  | The value to bind. **Required.**                                            |
| Enable Mapping                | `false`    | *Advanced.* Map the value's restricted range onto `Range`.                  |
| Range                         | `0 .. 100` | *Advanced.* The slider range the value's `Minimum Value .. Maximum Value` maps to. |
| Multiplier                    | `1`        | *Advanced.* Factor applied after mapping.                                   |

Requires a `Slider` on the same game object whose **On Value Changed** calls `_OnValueChanged`.

## How values map to the slider

```text
slider value = remap(state, Minimum Value .. Maximum Value → Range) × Multiplier     (when mapping applies)
slider value = state × Multiplier                                                      (otherwise)
```

Mapping only applies when `Enable Mapping` is ticked **and** the bound value has `Restrict Value` enabled. Moving the
slider runs the formula in reverse. Make sure the `Slider` component's own *Min Value* / *Max Value* cover the same
range, otherwise Unity clamps the slider before the value ever sees it.

**Example:** a volume stored as `0 .. 1` but shown as `0 .. 100`. Restrict the float to `0 .. 1`, enable mapping with
range `0 .. 100` and set the Unity slider to `0 .. 100` - or skip mapping and use a multiplier of `100`.

> In v0.7.0 the mapping formula is only exact when the value's `Minimum Value` equals the lower `Range` bound (as in
> `0 .. 1` → `0 .. 100`). For other ranges, prefer a `Multiplier` or keep both lower bounds equal.
{: .danger }

### Int sliders

Int sliders round the slider position to the nearest integer when the Unity slider does not have *Whole Numbers*
enabled. With a multiplier other than `1`, the slider value is divided using integer division.

> For synchronized sliders, enable `Prevent Nuisance Updates` on the float value. Dragging a slider writes on every
> frame; without the filter each tiny movement is sent over the network.
{: .tip }
