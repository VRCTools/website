---
title: Build a settings menu
description: A world settings panel with a mirror toggle, a music volume slider and a saved accent color - no scripts.
nav_order: 10
keywords: [menu, settings, tutorial, mirror, volume, persisted]
---

By the end of this guide your world has a small settings panel that remembers each player's choices between visits:

```text
┌─ Settings ─────────────────────────────┐
│  Mirror         [ ON  ]                │
│  Music volume   ━━━━━━━━━●━━━━   65%   │
│  Accent color   [ color picker ]       │
└────────────────────────────────────────┘
```

**You need:** a world project with World Utilities installed, a canvas set up for VRChat (world space, `VRC Ui Shape`
component), a mirror object and an `AudioSource` playing music.

## 1. Create the values

Persisted values are the right kind here - settings are personal, and players expect them to stick.

1. Create an empty game object `Persisted Settings` - following the
   [best practice]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#group-values-by-kind) of grouping values by kind.
2. From `Packages/VRCTools - World Utilities/Runtime/Prefabs/Persisted Values` drag the following into it and
   **rename each one right away** (persisted values are networked objects and need
   [unique paths]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#name-networked-objects-uniquely)):
   - `Persisted Boolean` → rename to `Mirror Enabled`, set **Key** to `settings.mirror_enabled`
   - `Persisted Float` → rename to `Music Volume`, set **Key** to `settings.music_volume`, **Default Value** `0.65`,
     enable **Restrict Value** (`0 .. 1`) and **Prevent Nuisance Updates** with a difference of `0.001`
   - `Persisted Color` → rename to `Accent Color`, set **Key** to `settings.accent_color` and pick a default color

> Keys are how VRChat finds the stored data next time. Choose them once and don't rename them later.
{: .tip }

## 2. Connect the mirror

1. Drag in `Local Values/Applicators/Object Toggle Applicator`.
2. Leave **Type** on `LOCAL` and reference the `Mirror Enabled` value - persisted values plug into local fields.
3. Add the mirror game object to **Targets**.

On your canvas, add `Local Values/UI/Button Toggle`, reference `Mirror Enabled` and enable **Alternate Label** if you'd like
"On"/"Off" texts.

## 3. Connect the music volume

1. Add `Local Values/UI/Slider` to the canvas and reference `Music Volume`. Set the Unity `Slider` to `0 .. 1`.
2. Add `Local Values/UI/Percentage Label` next to it and reference the same value. With a text template of `{0:0}%`
   and the default multiplier of `100`, it shows `65%`.
3. Apply the volume to the `AudioSource`. World Utilities has no audio applicator, so either:
   - drive the volume with an animation via the
     [Animator Parameter applicator]({{ site.baseurl }}/docs/world-utils/applicators/animator-parameter/), or
   - use a tiny script like the `MusicVolume` example in [Scripting]({{ site.baseurl }}/docs/world-utils/concepts/scripting/#subscribing-to-changes).

## 4. Connect the accent color

1. Add `Local Values/UI/Color Picker` to the canvas and reference `Accent Color`.
2. Add `Local Values/Applicators/Material Property Applicator`:
   - **Target** `PROPERTY_BLOCK`, **Renderer** = the object to recolor
   - Add a **Color Property** entry: value `Accent Color`, property `_Color` (or `_EmissionColor` for glowing trims)

## 5. Test

Enter play mode (or use [ClientSim](https://clientsim.docs.vrchat.com/)): flip the toggle, drag the slider, pick a color.
Persisted values only load once VRChat restores player data, which ClientSim simulates at start-up. Upload and rejoin
the world to verify the settings persist.

## Where to go from here

- Let the instance owner override the mirror for everyone: [Owner-controlled features]({{ site.baseurl }}/docs/world-utils/guides/owner-feature-gate/)
- Derive secondary colors from the accent: [Color Adjustment]({{ site.baseurl }}/docs/world-utils/converters/color-adjustment/)
- Add a "reset to defaults" button: [Event Broadcaster]({{ site.baseurl }}/docs/world-utils/utilities/event-broadcaster/) calling `_Reset` on each value
