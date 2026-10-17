---
title: Input Fields
layout: component
description: Let players edit string and URL values with text input fields.
nav_order: 50
since: 0.1.0
kinds: [local, synchronized, persisted]
keywords: [input, text field, keyboard, url input, VRCUrlInputField]
components:
  - name: Value Input Field
    class: VRCTools.World.Values.UI.ValueInputField
    menu: Values/UI/Value Input Field
    prefab: Local Values/UI/Input Field.prefab
    file: Runtime/UdonScripts/Values/UI/ValueInputField.cs
  - name: Value URL Input Field
    class: VRCTools.World.Values.UI.ValueUrlInputField
    menu: Values/UI/Value URL Input Field
    prefab: Local Values/UI/URL Input Field.prefab
    file: Runtime/UdonScripts/Values/UI/ValueUrlInputField.cs
redirect_from:
  - /packages/world-utils/components/value/ui/input-field.html
  - /packages/world-utils/components/value/ui/url-input-field.html
---

Two components bind text inputs to values. Both write to the value as the player types and show the current value
when it changes elsewhere.

## Input field

Binds a `TMP_InputField` to a [string value]({{ site.baseurl }}/docs/world-utils/values/string/).

| Parameter     | Default | Description                                   |
|---------------|---------|-----------------------------------------------|
| Type          | `LOCAL` | Kind of the bound value.                      |
| Source/Target | *None*  | The string value. **Required.**               |

## URL input field

Binds a `VRCUrlInputField` to a [URL value]({{ site.baseurl }}/docs/world-utils/values/url/). This is the only way for
players to enter new URLs at runtime.

| Parameter     | Default | Description                                   |
|---------------|---------|-----------------------------------------------|
| Type          | `LOCAL` | Kind of the bound value.                      |
| Source/Target | *None*  | The URL value. **Required.**                  |

Both components require their input component on the same game object, with **On Value Changed** calling
`_OnValueChanged`. The prefabs come pre-wired.

> Every keystroke updates the value. When binding a **synchronized** value, each change is sent to everybody in the
> instance. That is fine for short messages, but for longer texts consider binding a local value and copying it into
> the synchronized one from a "Submit" button in your own script.
{: .warning }
