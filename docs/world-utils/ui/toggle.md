---
title: Toggle
layout: component
description: Binds a Unity UI Toggle (checkbox) to a boolean value.
nav_order: 10
since: 0.1.0
kinds: [local, synchronized, persisted]
keywords: [checkbox, toggle, switch, ui]
components:
  - name: Value Toggle
    class: VRCTools.World.Values.UI.ValueToggle
    menu: Values/UI/Value Toggle
    prefab: Local Values/UI/Toggle.prefab
    file: Runtime/UdonScripts/Values/UI/ValueToggle.cs
redirect_from:
  - /packages/world-utils/components/value/ui/toggle.html
---

Keeps a `Toggle` in sync with a [boolean value]({{ site.baseurl }}/docs/world-utils/values/boolean/). Ticking the toggle
writes the value; changing the value from anywhere else updates the checkmark.

## Parameters

| Parameter          | Default | Description                                                                       |
|--------------------|---------|-----------------------------------------------------------------------------------|
| Type               | `LOCAL` | Kind of the bound value.                                                          |
| Source/Target      | *None*  | The boolean value. **Required.**                                                  |
| Invert             | `false` | *Advanced.* Show the toggle as checked while the value is `false` (and vice versa). |

Requires a `Toggle` on the same game object whose **On Value Changed** calls `_OnValueChanged` (see [UI]({{ site.baseurl }}/docs/world-utils/ui/)).

> `Invert` is handy for "Disable post processing" style options backed by a value that means *enabled*.
{: .tip }
