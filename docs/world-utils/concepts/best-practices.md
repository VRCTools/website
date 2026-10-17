---
title: Best Practices
description: How to organize, name and wire values so your world stays readable, networks reliably and scales as it grows.
nav_order: 40
keywords: [best practice, hierarchy, naming, organize, network id, fully qualified name, structure, conventions]
---

None of these rules are enforced by World Utilities, but following them avoids the most common problems we see -
especially the hard-to-debug networking ones.

## Group values by kind

Keep your values together and sort them into one parent object per [kind]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/):

```text
World
├── Local Settings           # per player, gone when they leave
│   ├── Post Processing Enabled
│   └── UI Scale
├── Persisted Settings       # per player, remembered across visits
│   ├── Mirror Enabled
│   ├── Music Volume
│   └── Accent Color
├── Global Settings          # synchronized, shared by the whole instance
│   ├── Lobby Lights Enabled
│   ├── Game Running
│   └── Announcement
└── Environment
    ├── Mirror
    └── Lobby
```

This pays off in several ways:

- **You see the kind at a glance.** Whether a setting is shared with everybody or saved for the player is obvious
  from the hierarchy - no need to click each object.
- **Networked objects are in one place.** Everything below `Global Settings` (and `Persisted Settings`, see
  [below](#name-networked-objects-uniquely)) carries a networked behaviour, so that is where you look when debugging
  synchronization.
- **Switching kinds is a move, not a rebuild.** Turning a local setting into a persisted one means swapping the
  component and dragging the object into the other group; consumers only need their **Type** updated.
- **Name clashes become unlikely.** Each group gives its values a distinct path (see the next section).

For bigger worlds, add one level per area or feature below each group:

```text
Global Settings
├── Lobby
│   ├── Lights Enabled
│   └── Music Track
└── Game
    ├── Running
    ├── Round
    └── Score Limit
```

> Values whose state is computed by a [converter]({{ site.baseurl }}/docs/world-utils/converters/) are best kept in their own
> `Derived` group (e.g. `Local Settings/Derived/Show On`). That makes it clear they shouldn't be wired to UI - the
> converter would overwrite any change immediately.
{: .tip }

## Name networked objects uniquely

The VRChat SDK assigns every networked object a **network id** based on its *fully qualified name* - the path of
game object names from the scene root down to the object. If two networked objects share the same path, network id
generation can fail and the affected objects will not synchronize reliably.

| Objects                                                        | Result                                       |
|----------------------------------------------------------------|----------------------------------------------|
| `Settings/My Boolean` and `Settings/My Boolean`                | ✗ conflict - identical paths                 |
| `Global Settings/My Boolean` and `Settings/My Boolean`         | ✓ fine - the parents differ                  |
| `Settings/Mirror Enabled` and `Settings/Music Enabled`         | ✓ fine - the names differ                    |
| `Room A/Door/Locked` and `Room B/Door/Locked`                  | ✓ fine - the paths differ further up         |
| `Room/Door/Locked` and `Room/Door/Locked` (duplicated room)    | ✗ conflict - the whole path is identical     |

The rule applies to every game object with a networked Udon behaviour. In World Utilities that means:

- [synchronized values]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#synchronized)
- [persisted values]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#persisted)
- [presets]({{ site.baseurl }}/docs/world-utils/values/presets/)
- the [Color Adjustment]({{ site.baseurl }}/docs/world-utils/converters/color-adjustment/) and
  [Color Component]({{ site.baseurl }}/docs/world-utils/converters/color-component/) converters
- your own scripts based on [`AbstractSynchronizedBehaviour`]({{ site.baseurl }}/docs/common/synchronized-behaviour/)

### Common ways to get it wrong

- **Dragging a prefab into the same parent twice.** Both instances are called `Synchronized Boolean`. Rename them
  right away.
- **Copying a group between scenes or areas.** Duplicating `Room` (with the doors, values and all) and placing the copy
  next to the original produces identical paths for everything inside. Rename the copy's root (`Room A`, `Room B`) and
  the paths become unique again.
- **Prefabs containing synchronized values.** A prefab like `Arcade Machine` with a `Synchronized Int` named `Score`
  inside is fine for one instance, but every additional instance under the same parent repeats the path. Give each
  instance a unique name (`Arcade Machine 1`, `Arcade Machine 2`, ...).

> Make it a habit: whenever you add a networked object, **rename it immediately** after the setting it represents.
{: .tip }

## Use descriptive names

Name values after *what they mean*, not after their type. The hierarchy, search and every inspector reference become
self-explanatory:

| Instead of                     | Use                              |
|--------------------------------|----------------------------------|
| `Synchronized Boolean`         | `Lobby Lights Enabled`           |
| `Local Float (2)`              | `Bloom Intensity`                |
| `Persisted Color`              | `Accent Color`                   |
| `Bool A`, `Bool B`, `Result`   | `Show Allowed`, `Show Wanted`, `Show On` |

Booleans read best as statements that are either true or false: `Mirror Enabled`, `Game Running`, `Door Locked`.

## Mirror the hierarchy in persisted keys

Persisted values need a [key]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#choosing-keys) that never changes.
A simple convention is to derive it from the object's place in the hierarchy - lower case, dot separated:

| Object                                   | Key                            |
|------------------------------------------|--------------------------------|
| `Persisted Settings/Mirror Enabled`      | `settings.mirror_enabled`      |
| `Persisted Settings/Audio/Music Volume`  | `settings.audio.music_volume`  |
| `Persisted Settings/Lobby/Welcome Seen`  | `settings.lobby.welcome_seen`  |

Unlike object names, keys must stay the same forever: renaming a key silently resets every player's saved value. It's
fine to rename or move the object later - just keep its key.

## Keep network traffic low

- **Filter slider noise.** Enable `Prevent Nuisance Updates` on synchronized floats bound to a
  [slider]({{ site.baseurl }}/docs/world-utils/ui/slider/); otherwise every frame of dragging is sent to everybody.
- **Write converter results into local values.** Converters run on every client anyway - a synchronized target would
  make all players fight over its ownership. See [Converters]({{ site.baseurl }}/docs/world-utils/converters/).
- **Don't bind synchronized strings directly to input fields** for long texts - each keystroke is a network update.
  Edit a local string and copy it over on *Submit* instead.
- **Synchronize inputs, not results.** Synchronize the owner's switch and derive everything else locally, as shown in
  [Owner-controlled features]({{ site.baseurl }}/docs/world-utils/guides/owner-feature-gate/).

## Wire things defensively

- **Restrict ranges.** Give floats and ints that come from UI a `Minimum Value` / `Maximum Value`; it protects
  everything downstream (and enables [slider mapping]({{ site.baseurl }}/docs/world-utils/ui/slider/#how-values-map-to-the-slider)).
- **Never let a divisor reach zero** in [Int Math]({{ site.baseurl }}/docs/world-utils/converters/int-math/) - an integer
  division by zero halts the converter.
- **Keep applicators outside of their targets.** An [Object Toggle]({{ site.baseurl }}/docs/world-utils/applicators/object-toggle/)
  that deactivates its own parent can never turn it back on. Placing applicators next to the values they read (or in
  a separate `Wiring` group) avoids this entirely.
- **Invert once.** If several applicators need the opposite of a boolean, add one `NOT`
  [Boolean Operation]({{ site.baseurl }}/docs/world-utils/converters/boolean-operation/) instead of ticking `Invert` on each -
  there is only one place to change later.

## Test with more than one player

Networking problems - including network id conflicts - only show up with several clients. Use
**Build & Test** in the VRChat SDK control panel with *Number of Clients* set to `2` or more, change synchronized values
on one client and check that the others follow. Rejoin to check that persisted values were restored.
