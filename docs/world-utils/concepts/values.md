---
title: Values
description: A value is a component that holds a single piece of state and tells everyone who is interested when it changes.
nav_order: 10
keywords: [state, default value, STATE_UPDATED, reset]
redirect_from:
  - /packages/world-utils/components/value/
---

Values are the heart of World Utilities. A value is a small Udon behaviour that stores exactly one piece of state - a
boolean, a color, a number, a piece of text - and notifies its subscribers whenever that state changes. Everything else
in the package either **writes** to a value (UI, presets, converters, your scripts) or **reacts** to it (applicators,
labels, converters, your scripts).

Keeping state in a dedicated component has a few nice properties:

- **One source of truth.** A volume slider, a percentage label and an audio applicator all look at the same value
  instead of keeping their own copies in sync.
- **No scripting for common wiring.** Components find out about changes through events, so you connect things by
  dragging references in the inspector.
- **Swap behaviour without rewiring.** Turning a per-player setting into an instance wide one is a matter of replacing
  a *Local* value with a *Synchronized* one and flipping the `Source` drop-down on its consumers.

## Anatomy of a value

Every value component, regardless of its type, has the same basic shape:

| Member                    | Description                                                                                         |
|---------------------------|-----------------------------------------------------------------------------------------------------|
| `Default Value`           | Inspector field. The state the value starts with (and returns to when reset).                       |
| `State`                   | The current state. Reading it is free; assigning it notifies subscribers.                           |
| `_Reset()`                | Reverts `State` to `Default Value` (local & persisted values).                                      |
| `EVENT_STATE_UPDATED`     | Event emitted whenever `State` changes - also once during `Start()` with the initial state.         |
| `EVENT_STATE_RESET`       | Event emitted by `_Reset()` (local & persisted values).                                             |

Value types add helpers that make sense for them - booleans have `_Toggle()`, numbers have `_Increment()`, strings
have `_Clear()` and so on. These are listed on each [value type page]({{ site.baseurl }}/docs/world-utils/values/).

> Functions prefixed with an underscore (`_Toggle`, `_Reset`, ...) are regular public Udon events. You can call them
> from a Unity UI `Button` (**On Click → UdonBehaviour.SendCustomEvent**), from an
> [Interact Trigger]({{ site.baseurl }}/docs/world-utils/player/interact-trigger/), an
> [Event Broadcaster]({{ site.baseurl }}/docs/world-utils/utilities/event-broadcaster/) or from your own scripts.
{: .tip }

## Change detection

Assigning a value that is equal to the current state is a no-op: no event is emitted and synchronized values do not
send anything over the network. Two exceptions are worth knowing:

- **Float** values compare with a tolerance only when `Prevent Nuisance Updates` is enabled. Without it, every
  assignment emits `EVENT_STATE_UPDATED`. Enable it for values driven by sliders or smooth animations to avoid flooding
  listeners (and the network) with insignificant changes.
- **Int** and **Float** values with `Restrict Value` enabled clamp the new state to `Minimum Value` /
  `Maximum Value` before storing it.

## Value types

| Type                                                              | Udon type   | Local | Synchronized | Persisted |
|-------------------------------------------------------------------|-------------|:-----:|:------------:|:---------:|
| [Boolean]({{ site.baseurl }}/docs/world-utils/values/boolean/)         | `bool`      |   ✓   |      ✓       |     ✓     |
| [Color]({{ site.baseurl }}/docs/world-utils/values/color/)             | `Color`     |   ✓   |      ✓       |     ✓     |
| [Float]({{ site.baseurl }}/docs/world-utils/values/float/)             | `float`     |   ✓   |      ✓       |     ✓     |
| [Int]({{ site.baseurl }}/docs/world-utils/values/int/)                 | `int`       |   ✓   |      ✓       |     ✓     |
| [String]({{ site.baseurl }}/docs/world-utils/values/string/)           | `string`    |   ✓   |      ✓       |     ✓     |
| [URL]({{ site.baseurl }}/docs/world-utils/values/url/)                 | `VRCUrl`    |   ✓   |      ✓       |           |
| [Vector3]({{ site.baseurl }}/docs/world-utils/values/vector3/)         | `Vector3`   |   ✓   |      ✓       |     ✓     |
| [Texture2D]({{ site.baseurl }}/docs/world-utils/values/texture2d/)     | `Texture2D` |   ✓   |              |           |

URLs cannot be persisted because VRChat's player data storage does not support `VRCUrl`. Textures exist only as local
values: they are usually the *result* of something else - for example a
[Texture2D Loader]({{ site.baseurl }}/docs/world-utils/converters/texture2d-loader/) that downloads an image from a
(synchronized) URL value on every client.

## Initialization order

Values publish their initial state from `Start()`. Since Unity does not guarantee the order in which `Start()` runs
across behaviours, consumers in World Utilities read the current state themselves after subscribing - usually one
frame after start-up - instead of relying on that first event. Do the same in your own scripts (see
[Scripting]({{ site.baseurl }}/docs/world-utils/concepts/scripting/)).

Persisted values are a special case: their state is only available once VRChat has restored the player's data.
See [Value kinds]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#persisted).
