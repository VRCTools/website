---
title: UI
nav_title: Overview
description: Connect Unity UI controls to values - in both directions.
nav_order: 0
redirect_from:
  - /packages/world-utils/components/value/ui/
  - /packages/world-utils/components/local-value/ui/
  - /packages/world-utils/components/synchronized-value/ui/
---

UI components keep a Unity UI control and a value in sync. Interactive controls (toggles, sliders, input fields, the
color picker) **write** to the value when the player uses them and **follow** the value when something else changes
it - so two menus bound to the same value always agree, and a synchronized value updates everybody's UI.

## Use the prefabs

Every UI component ships as a ready-made prefab under `Runtime/Prefabs/Local Values/UI` and
`Runtime/Prefabs/Synchronized Values/UI`. Drop one onto a world space canvas, reference your value and you are done.

Building a control yourself? Interactive controls need the Unity UI event wired back to the component, because Udon
cannot subscribe to UI events at runtime:

| Control                      | Unity event          | Call                                               |
|------------------------------|----------------------|----------------------------------------------------|
| Toggle                       | `On Value Changed`   | `UdonBehaviour.SendCustomEvent("_OnValueChanged")` |
| Slider                       | `On Value Changed`   | `UdonBehaviour.SendCustomEvent("_OnValueChanged")` |
| TMP Input Field              | `On Value Changed`   | `UdonBehaviour.SendCustomEvent("_OnValueChanged")` |
| VRC URL Input Field          | `On Value Changed`   | `UdonBehaviour.SendCustomEvent("_OnValueChanged")` |
| Button (Toggle Button)       | `On Click`           | `UdonBehaviour.SendCustomEvent("_Toggle")`         |

> Your canvas needs a `VRC Ui Shape` component and must be on a layer players can interact with (e.g. `Default`),
> otherwise the controls won't respond to VRChat's laser pointer.
{: .note }

{% include section-index.html %}
