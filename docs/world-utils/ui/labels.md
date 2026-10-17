---
title: Labels
layout: component
description: Display float, int, string and URL values in TextMeshPro texts using format strings.
nav_order: 40
since: 0.1.0
kinds: [local, synchronized, persisted]
keywords: [label, text, display, format, string.Format, percentage, TextMeshPro]
components:
  - name: Local Float Label
    class: VRCTools.World.LocalValues.UI.LocalFloatLabel
    menu: Local Values/UI/Local Float Label
    prefab: Local Values/UI/Percentage Label.prefab
    file: Runtime/UdonScripts/Local Values/UI/LocalFloatLabel.cs
  - name: Local Int Label
    class: VRCTools.World.LocalValues.UI.LocalIntLabel
    menu: Local Values/UI/Local Int Label
    prefab: Local Values/UI/Int Label.prefab
    file: Runtime/UdonScripts/Local Values/UI/LocalIntLabel.cs
  - name: Synchronized Float Label
    class: VRCTools.World.SynchronizedValues.UI.SynchronizedFloatLabel
    menu: Synchronized Values/UI/Synchronized Float Label
    prefab: Synchronized Values/UI/Percentage Label.prefab
    file: Runtime/UdonScripts/Synchronized Values/UI/SynchronizedFloatLabel.cs
  - name: Synchronized Int Label
    class: VRCTools.World.SynchronizedValues.UI.SynchronizedIntLabel
    menu: Synchronized Values/UI/Synchronized Int Label
    prefab: Synchronized Values/UI/Int Label.prefab
    file: Runtime/UdonScripts/Synchronized Values/UI/SynchronizedIntLabel.cs
  - name: String Label
    class: VRCTools.World.Values.UI.StringLabel
    menu: Values/UI/String Label
    prefab: Local Values/UI/String Label.prefab
    file: Runtime/UdonScripts/Values/UI/StringLabel.cs
  - name: Value URL Label
    class: VRCTools.World.Values.UI.ValueUrlLabel
    menu: Values/UI/Value URL Label
    prefab: Local Values/UI/URL Label.prefab
    file: Runtime/UdonScripts/Values/UI/ValueUrlLabel.cs
redirect_from:
  - /packages/world-utils/components/local-value/ui/float-label.html
  - /packages/world-utils/components/local-value/ui/int-label.html
  - /packages/world-utils/components/synchronized-value/ui/float-label.html
  - /packages/world-utils/components/synchronized-value/ui/int-label.html
  - /packages/world-utils/components/value/ui/string-label.html
  - /packages/world-utils/components/value/ui/url-label.html
---

Labels write the current state of a value into a `TextMeshProUGUI` text on the same game object and update it whenever
the value changes.

## Format strings

The text you type into the TextMeshPro component **is the template**. When the label starts, it remembers that text
and from then on renders it with C#'s [`string.Format`][string-format], passing the value as the only argument `{0}`:

| Template                 | Value      | Result                  |
|--------------------------|------------|-------------------------|
| `{0}`                    | `42`       | `42`                    |
| `Players: {0}`           | `12`       | `Players: 12`           |
| `Volume {0:0}%`          | `57.3`     | `Volume 57%`            |
| `Brightness: {0:000}%`   | `7`        | `Brightness: 007%`      |
| `{0:0.00}`               | `0.4567`   | `0.46`                  |
| `MOTD: {0}`              | `"Hi!"`    | `MOTD: Hi!`             |

> Put the template into the TextMeshPro text before entering play mode or uploading. Changing the text at runtime does
> not change the template.
{: .note }

## Float & int labels

There is one component per type and kind: use the *Local* labels for local and persisted values and the
*Synchronized* labels for synchronized values.

| Parameter                        | Default (float / int) | Description                                                       |
|----------------------------------|-----------------------|-------------------------------------------------------------------|
| Local Value / Synchronized Value | *None*                | The value to display. **Required.**                               |
| Enable Mapping                   | `false`               | *Advanced.* Map the value's restricted range onto `Range`.         |
| Range                            | `0 .. 100`            | *Advanced.* Display range for `Minimum Value .. Maximum Value`.    |
| Multiplier                       | `100` / `1`           | *Advanced.* Factor applied after mapping.                         |

The displayed number is calculated exactly like a [slider's]({{ site.baseurl }}/docs/world-utils/ui/slider/#how-values-map-to-the-slider):
mapping applies only when `Enable Mapping` is ticked **and** the value is restricted; the multiplier is always applied.

> Float labels default to a multiplier of `100` - perfect for showing a `0 .. 1` value as a percentage (`{0:0}%`).
> Set it to `1` to show the raw number.
{: .tip }

## String label

Displays a [string value]({{ site.baseurl }}/docs/world-utils/values/string/).

| Parameter | Default | Description                                       |
|-----------|---------|---------------------------------------------------|
| Type      | `LOCAL` | Kind of the value.                                |
| Source    | *None*  | The string value to display. **Required.**        |

## URL label

Displays a [URL value]({{ site.baseurl }}/docs/world-utils/values/url/) - for example to show which image or video is
currently loaded.

| Parameter | Default | Description                                       |
|-----------|---------|---------------------------------------------------|
| Type      | `LOCAL` | Kind of the value.                                |
| Source    | *None*  | The URL value to display. **Required.**           |

[string-format]: https://learn.microsoft.com/en-us/dotnet/api/system.string.format
