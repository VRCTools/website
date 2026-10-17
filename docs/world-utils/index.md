---
title: World Utilities
nav_title: Overview
description: >-
  `io.vrctools.world` - values, converters, applicators and UI components that remove most of the boilerplate from
  VRChat world creation.
nav_order: 1
keywords: [VRCTWorldUtils, io.vrctools.world, overview]
redirect_from:
  - /packages/world-utils/
  - /packages/world-utils/components/
---

World Utilities is a toolbox of UdonSharp behaviours for the things nearly every world needs: settings menus,
toggles, sliders, synced switches, saved preferences, remote images, teleports and trigger zones. Everything is
configured from the inspector - no scripting required - but every piece is also a plain UdonSharp behaviour you can
talk to from your own code.

## The mental model

Almost everything in the package revolves around **values**: small components that hold a single piece of state
(a boolean, a color, a float, ...) and announce whenever it changes. Other components either *write* to values or
*react* to them:

<div class="diagram" markdown="1">
```text
  ┌──────────────┐ writes  ┌──────────────┐ notifies ┌──────────────┐ applies  ┌──────────────────┐
  │  UI / Preset │────────▶│    Value     │─────────▶│  Applicator  │─────────▶│ objects,         │
  │  Interaction │         │ local/sync/  │          │              │          │ materials,       │
  └──────────────┘         │  persisted   │          └──────────────┘          │ animators, UI... │
                           └──────┬───────┘                                    └──────────────────┘
                                  │ notifies   ┌──────────────┐ writes   ┌──────────────┐
                                  └───────────▶│  Converter   │─────────▶│ another Value│──▶ ...
                                               └──────────────┘          └──────────────┘
```
</div>

- **[Values]({{ '/docs/world-utils/concepts/values/' | relative_url }})** hold state. They come in three
  [kinds]({{ '/docs/world-utils/concepts/value-kinds/' | relative_url }}): *local* (per player), *synchronized* (shared by
  the instance) and *persisted* (per player, saved across visits).
- **[Converters]({{ '/docs/world-utils/converters/' | relative_url }})** derive new values from existing ones - combine two
  booleans, do math, shift a color, download an image from a URL.
- **[Applicators]({{ '/docs/world-utils/applicators/' | relative_url }})** push a value into the world: toggle objects,
  set material or animator parameters, swap materials, fire events.
- **[UI components]({{ '/docs/world-utils/ui/' | relative_url }})** connect Unity UI controls (toggles, sliders, input
  fields, labels, color pickers) to values in both directions.
- **[Player components]({{ '/docs/world-utils/player/' | relative_url }})** and
  **[utilities]({{ '/docs/world-utils/utilities/' | relative_url }})** cover interactions, teleports, trigger volumes and
  event fan-out.

Because each piece does one job, you can chain them freely: a *Persisted Float* driven by a *Slider* can feed a
*Float Math Converter* whose result is applied to a material **and** displayed by a *Label*.

## Installation

Add the VRCTools repository to Creator Companion as described in [Getting Started]({{ '/docs/getting-started/' | relative_url }})
and install **VRCTools - World Utilities**. The following dependencies are installed automatically:

| Package                                       | Version   | Purpose                                         |
|-----------------------------------------------|-----------|-------------------------------------------------|
| `com.vrchat.worlds`                           | `^3.7.0`  | VRChat Worlds SDK                               |
| [`io.vrctools.event`]({{ '/docs/event/' | relative_url }}) | `^0.2.0`  | Event system used by values to notify listeners |
| [`io.vrctools.common`]({{ '/docs/common/' | relative_url }}) | `^0.1.0`  | Shared helpers used by VRCTools packages        |

## Component catalog

### Values

| Type                                                         | Local | Synchronized | Persisted | Typical use                                  |
|--------------------------------------------------------------|:-----:|:------------:|:---------:|----------------------------------------------|
| [Boolean]({{ '/docs/world-utils/values/boolean/' | relative_url }})     |   ✓   |      ✓       |     ✓     | on/off switches, feature flags               |
| [Color]({{ '/docs/world-utils/values/color/' | relative_url }})         |   ✓   |      ✓       |     ✓     | light & material colors                      |
| [Float]({{ '/docs/world-utils/values/float/' | relative_url }})         |   ✓   |      ✓       |     ✓     | volume, brightness, intensities              |
| [Int]({{ '/docs/world-utils/values/int/' | relative_url }})             |   ✓   |      ✓       |     ✓     | option selection, counters, limits           |
| [String]({{ '/docs/world-utils/values/string/' | relative_url }})       |   ✓   |      ✓       |     ✓     | announcements, names, free text              |
| [URL]({{ '/docs/world-utils/values/url/' | relative_url }})             |   ✓   |      ✓       |           | image & video links                          |
| [Vector3]({{ '/docs/world-utils/values/vector3/' | relative_url }})     |   ✓   |      ✓       |     ✓     | positions, directions                        |
| [Texture2D]({{ '/docs/world-utils/values/texture2d/' | relative_url }}) |   ✓   |              |           | downloaded or assigned images                |

### Converters, applicators & UI

| Category    | Components                                                                                                    |
|-------------|---------------------------------------------------------------------------------------------------------------|
| Converters  | [Boolean Operation]({{ '/docs/world-utils/converters/boolean-operation/' | relative_url }}), [Color Adjustment]({{ '/docs/world-utils/converters/color-adjustment/' | relative_url }}), [Color Component]({{ '/docs/world-utils/converters/color-component/' | relative_url }}), [Float Math]({{ '/docs/world-utils/converters/float-math/' | relative_url }}), [Int Math]({{ '/docs/world-utils/converters/int-math/' | relative_url }}), [Texture2D Loader]({{ '/docs/world-utils/converters/texture2d-loader/' | relative_url }}) |
| Applicators | [Object Toggle]({{ '/docs/world-utils/applicators/object-toggle/' | relative_url }}), [Material Swap]({{ '/docs/world-utils/applicators/material-swap/' | relative_url }}), [Material Property]({{ '/docs/world-utils/applicators/material-property/' | relative_url }}), [Animator Parameter]({{ '/docs/world-utils/applicators/animator-parameter/' | relative_url }}), [Raw Image]({{ '/docs/world-utils/applicators/raw-image/' | relative_url }}), [Boolean Event]({{ '/docs/world-utils/applicators/boolean-event/' | relative_url }}) |
| Presets     | [Presets]({{ '/docs/world-utils/values/presets/' | relative_url }}) for Color, Float, Int, String, URL and Vector3 |
| UI          | [Toggle]({{ '/docs/world-utils/ui/toggle/' | relative_url }}), [Toggle Button]({{ '/docs/world-utils/ui/toggle-button/' | relative_url }}), [Slider]({{ '/docs/world-utils/ui/slider/' | relative_url }}), [Labels]({{ '/docs/world-utils/ui/labels/' | relative_url }}), [Input Fields]({{ '/docs/world-utils/ui/input-field/' | relative_url }}), [Color Picker]({{ '/docs/world-utils/ui/color-picker/' | relative_url }}) |
| Player      | [Interact Trigger]({{ '/docs/world-utils/player/interact-trigger/' | relative_url }}), [Teleport Target]({{ '/docs/world-utils/player/teleport-target/' | relative_url }}), [Trigger Volume]({{ '/docs/world-utils/player/trigger-volume/' | relative_url }}) |
| Utilities   | [Event Broadcaster]({{ '/docs/world-utils/utilities/event-broadcaster/' | relative_url }}), [Fake Skybox shader]({{ '/docs/world-utils/utilities/fake-skybox/' | relative_url }}) |

## Where to go next

<ul class="cards">
  <li><a href="{{ '/docs/world-utils/concepts/values/' | relative_url }}"><strong>Values</strong><span>How state, events and defaults work.</span></a></li>
  <li><a href="{{ '/docs/world-utils/concepts/value-kinds/' | relative_url }}"><strong>Local vs. synced vs. persisted</strong><span>Pick the right kind for your feature.</span></a></li>
  <li><a href="{{ '/docs/world-utils/guides/settings-menu/' | relative_url }}"><strong>Build a settings menu</strong><span>A complete walkthrough using prefabs.</span></a></li>
  <li><a href="{{ '/docs/world-utils/concepts/best-practices/' | relative_url }}"><strong>Best practices</strong><span>Organize, name and wire values the right way.</span></a></li>
  <li><a href="{{ '/docs/world-utils/concepts/scripting/' | relative_url }}"><strong>Scripting</strong><span>Read, write and subscribe from UdonSharp.</span></a></li>
</ul>
