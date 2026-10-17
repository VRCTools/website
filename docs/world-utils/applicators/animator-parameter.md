---
title: Animator Parameter
layout: component
description: Drives Animator parameters from boolean, float and int values.
nav_order: 40
since: 0.4.0
kinds: [local, synchronized, persisted]
keywords: [animator, animation, parameter, mecanim, state machine]
components:
  - name: Local Animator Property Applicator
    class: VRCTools.World.LocalValues.Applicators.LocalAnimatorPropertyApplicator
    menu: Local Values/Applicators/Local Animator Property Applicator
    prefab: Local Values/Applicators/Animator Parameter.prefab
    file: Runtime/UdonScripts/Local Values/Applicators/LocalAnimatorPropertyApplicator.cs
  - name: Synchronized Animator Property Applicator
    class: VRCTools.World.SynchronizedValues.Applicators.SynchronizedAnimatorPropertyApplicator
    menu: Synchronized Values/Applicators/Synchronized Animator Property Applicator
    prefab: Synchronized Values/Applicators/Animator Parameter Applicator.prefab
    file: Runtime/UdonScripts/Synchronized Values/Applicators/SynchronizedAnimatorPropertyApplicator.cs
---

Animators are the most flexible way to turn a value into *anything* Unity can animate - light intensities, blend
shapes, post processing weights, transitions between whole lighting setups. This applicator copies values into
Animator parameters so your animation controller can react to them.

## Parameters

| Parameter          | Default | Description                                                         |
|--------------------|---------|---------------------------------------------------------------------|
| Target             | *None*  | The `Animator` to drive. **Required.**                              |
| Boolean Parameters | *empty* | Boolean values → `Bool` parameter names.                            |
| Float Parameters   | *empty* | Float values → `Float` parameter names.                             |
| Int Parameters     | *empty* | Int values → `Int` parameter names.                                 |

The parameter names must match the parameters defined in the Animator Controller exactly (they are case sensitive).
Entries with an empty name are skipped.

## Usage

A smooth "lights dim" effect controlled by a slider:

1. In your Animator Controller, add a `Float` parameter `Brightness` and a **1D Blend Tree** (or a state with
   *Motion Time* bound to the parameter) that blends between a *dark* and a *bright* clip.
2. Create a `Local Float` restricted to `0 .. 1` and connect a [Slider]({{ site.baseurl }}/docs/world-utils/ui/slider/).
3. Add a `Local Animator Property Applicator`, reference the animator and add the float with parameter name
   `Brightness`.

> Unity resets Animator parameters when the Animator's game object is disabled and re-enabled, and the applicator
> only writes parameters when a value changes. Keep animators driven by this applicator on objects that stay active.
{: .note }
