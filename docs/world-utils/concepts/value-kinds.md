---
title: Local, Synchronized & Persisted
nav_title: Value kinds
description: Every value type comes in up to three kinds which decide who sees the state and how long it lives.
nav_order: 20
keywords: [local, synchronized, synced, persisted, persistence, network, ownership, PlayerData]
redirect_from:
  - /packages/world-utils/components/local-value/
  - /packages/world-utils/components/synchronized-value/
---

|                        | Local                        | Synchronized                          | Persisted                                  |
|------------------------|------------------------------|---------------------------------------|--------------------------------------------|
| Who sees the state     | only the local player        | everyone in the instance              | only the local player                      |
| Survives leaving       | no                           | while the instance exists             | **yes**, across instances & visits         |
| Network traffic        | none                         | on every change                       | none (stored by VRChat)                    |
| Available from         | `Start()`                    | `Start()`, then updated by the owner  | after VRChat restores player data          |
| Typical use            | graphics & audio settings    | instance owner settings, shared state | preferences players expect to keep         |
| Namespace              | `VRCTools.World.LocalValues` | `VRCTools.World.SynchronizedValues`   | `VRCTools.World.PersistedValues`           |

<div class="diagram" markdown="1">
```text
 Player A                     Player B                     Player A (next visit)
 ┌───────────────────┐        ┌───────────────────┐        ┌───────────────────┐
 │ Local Float  0.4  │   ✗    │ Local Float  1.0  │        │ Local Float  1.0  │  ← default again
 │ Synced Bool  true │ ─────▶ │ Synced Bool  true │        │ (new instance)    │
 │ Persisted    0.4  │   ✗    │ Persisted    0.8  │        │ Persisted    0.4  │  ← restored
 └───────────────────┘        └───────────────────┘        └───────────────────┘
```
</div>

## Local

Local values live entirely on the client of the player looking at them. Use them for anything that is a matter of
personal taste or comfort: mirror toggles, music volume, post processing intensity, a chosen color scheme.

Local values never touch the network, which makes them the cheapest kind - you can update them every frame if you
need to.

## Synchronized

Synchronized values keep their state identical for everyone in the instance using Udon's manual synchronization.

- **Ownership follows the writer.** When a player changes a synchronized value, they automatically take ownership of
  the game object and broadcast the new state. Everybody else receives it and emits `EVENT_STATE_UPDATED` locally.
- **Late joiners are covered.** The current owner re-sends the state when players join or leave, and when ownership
  changes hands.
- **Congestion aware.** If the network is clogged or a serialization fails, the value retries after
  `Synchronization Backoff` seconds (default `2`). Changes made in the meantime are folded into the next attempt.

Every synchronized value shows a **Networking** section in its inspector:

| Parameter               | Default | Description                                                                                   |
|-------------------------|---------|-----------------------------------------------------------------------------------------------|
| Synchronization Backoff | `2`     | Seconds to wait before retrying a failed or congested synchronization. Must be above zero.    |
| Enable Debug Logging    | off     | *Advanced.* Logs every synchronization step to the game log - handy when debugging networking. |

> Synchronized values use **Manual** synchronization. Udon requires all behaviours on the same game object to share a
> sync mode, so keep synchronized values on their own game objects (the provided prefabs already do) instead of adding
> them next to continuously synced behaviours. The inspector warns you when it detects a conflict.
{: .warning }

> Every synchronized value needs a **unique hierarchy path** (e.g. `Global Settings/Lights Enabled`). Two networked
> objects with the same path can break VRChat's network id generation - see
> [Best Practices]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#name-networked-objects-uniquely).
{: .warning }

> Anyone can change a synchronized value. If only the instance owner (or a list of moderators) should be allowed to
> change it, restrict access to the UI that writes to it - for example by only enabling the controls for the owner.
{: .note }

## Persisted

Persisted values behave exactly like local values, but additionally save their state using VRChat's
[persistence](https://creators.vrchat.com/worlds/udon/persistence/) (`PlayerData`) whenever it changes. When the player
returns to your world - even in a different instance - the last saved state is restored.

Persisted values **extend their local counterpart** (`PersistedFloat` is a `LocalFloat`). That means you can plug a
persisted value into any field that accepts a local value: sliders, labels, applicators and converters with `Source`
set to `LOCAL` all work unchanged.

Persisted values are networked objects as well, so the same
[naming rules]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#name-networked-objects-uniquely) as for synchronized values
apply.

| Parameter | Description                                                                                                  |
|-----------|--------------------------------------------------------------------------------------------------------------|
| Key       | The `PlayerData` key the value is stored under. **Required** and must be unique within your world.           |

Persisted values add two events and one property on top of the local value API:

| Member          | Description                                                                                       |
|-----------------|---------------------------------------------------------------------------------------------------|
| `EVENT_LOADED`  | Emitted once the stored state (or the default value) has been restored.                           |
| `EVENT_PERSIST` | Emitted whenever the state has been written to player data.                                       |
| `Loaded`        | `true` once the stored state is available.                                                        |
| `_Persist()`    | Writes the current state to player data. Called automatically on every change.                    |

### Loading

VRChat restores player data shortly after the local player joins (`OnPlayerRestored`). Until then the value holds its
`Default Value` but is **not loaded**: assignments and `_Reset()` calls made before that point are ignored and log a
warning. Once data is restored the value emits `EVENT_LOADED` followed by `EVENT_STATE_UPDATED`, so consumers update
automatically.

If your script needs to change a persisted value right at start-up, wait for `EVENT_LOADED` (or check `Loaded`)
first.

### Choosing keys

Keys share a single namespace per world and player. Pick descriptive, stable names - renaming a key later effectively
resets everybody's saved preference:

```text
settings.audio.music_volume
settings.graphics.bloom_enabled
settings.lobby.welcome_seen
```

See [Best Practices]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#mirror-the-hierarchy-in-persisted-keys) for a convention
that derives keys from the hierarchy.

> VRChat limits how much data a world can store per player. Prefer a handful of meaningful values over persisting
> everything. See VRChat's [persistence limits](https://creators.vrchat.com/worlds/udon/persistence/player-data/) for
> details.
{: .note }

## Mixing kinds

Most converters, applicators, presets and generic UI components work with every kind. They expose a `Source`
(or `Target`) drop-down which decides which reference field is used:

| Option         | Uses                                                                                       |
|----------------|--------------------------------------------------------------------------------------------|
| `LOCAL`        | the *Local Value* field - also accepts **persisted** values                                |
| `SYNCHRONIZED` | the *Synchronized Value* field                                                             |
| `STATIC`       | a constant typed into the inspector (converter inputs only)                                |

A few components are specific to one kind because they need to reference several values at once (for example the
[Material Property]({{ site.baseurl }}/docs/world-utils/applicators/material-property/) and
[Animator Parameter]({{ site.baseurl }}/docs/world-utils/applicators/animator-parameter/) applicators). Those come in a
*Local* and a *Synchronized* flavor.

A classic pattern combines kinds with a converter: let the instance owner enable a feature for everyone with a
*Synchronized Boolean*, let each player opt out with a *Persisted Boolean*, and combine both with an `AND`
[Boolean Operation]({{ site.baseurl }}/docs/world-utils/converters/boolean-operation/) into a *Local Boolean* that drives the
feature. The [owner-controlled features guide]({{ site.baseurl }}/docs/world-utils/guides/owner-feature-gate/) walks through
it step by step.
