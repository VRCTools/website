---
title: Toggle Button
layout: component
description: A button that flips a boolean value and reflects its state through color and optional on/off labels.
nav_order: 20
since: 0.1.0
kinds: [local, synchronized, persisted]
keywords: [button, toggle, on, off, label]
components:
  - name: Value Toggle Button
    class: VRCTools.World.Values.UI.ValueToggleButton
    menu: Values/UI/Value Toggle Button
    prefab: Local Values/UI/Button Toggle.prefab
    file: Runtime/UdonScripts/Values/UI/ValueToggleButton.cs
redirect_from:
  - /packages/world-utils/components/value/ui/toggle-button.html
---

Turns a regular `Button` into an on/off switch. Clicking calls `_Toggle()`, which flips the bound boolean. The button's
`Image` is tinted with the active or inactive color, and - since v0.5.0 - separate *On* and *Off* label objects can be
shown depending on the state.

## Parameters

| Section     | Parameter        | Default             | Description                                                              |
|-------------|------------------|---------------------|--------------------------------------------------------------------------|
|             | Type             | `LOCAL`             | Kind of the bound value.                                                 |
|             | Source/Target    | *None*              | The boolean value. **Required.**                                         |
| Appearance  | Active Color     | white `(1, 1, 1, 1)`| Image color while the (possibly inverted) state is `true`.               |
|             | Inactive Color   | gray `(0.5, 0.5, 0.5, 1)` | Image color while the state is `false`.                            |
|             | Alternate Label  | `false`             | Show `On Label` / `Off Label` depending on the state.                    |
|             | On Label         | *None*              | Game object shown while the value is `true`.                             |
|             | Off Label        | *None*              | Game object shown while the value is `false`.                            |
| Advanced    | Invert           | `false`             | Swap active and inactive colors.                                         |

Requires an `Image` on the same game object. Wire the button's **On Click** to `SendCustomEvent("_Toggle")`.

## Functions

| Function     | Description                       |
|--------------|-----------------------------------|
| `_Toggle()`  | Flips the bound boolean value.    |

> `Invert` only affects the colors. The on/off labels always follow the value itself.
{: .note }
