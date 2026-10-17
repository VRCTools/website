---
title: Scripting with Values
nav_title: Scripting
description: Read, write and subscribe to World Utilities values from your own UdonSharp behaviours.
nav_order: 30
keywords: [UdonSharp, C#, _RegisterHandler, events, API, namespace]
---

Every component in World Utilities is a plain UdonSharp behaviour, so your own scripts can use values just like the
built-in applicators do. This lets designers keep tweaking values and UI in the inspector while your code reacts to
them.

## Namespaces

| Namespace                                   | Contents                                                        |
|---------------------------------------------|-----------------------------------------------------------------|
| `VRCTools.World.LocalValues`                | `LocalBoolean`, `LocalColor`, `LocalFloat`, `LocalInt`, ...     |
| `VRCTools.World.SynchronizedValues`         | `SynchronizedBoolean`, `SynchronizedFloat`, ...                 |
| `VRCTools.World.PersistedValues`            | `PersistedBoolean`, `PersistedFloat`, ...                       |
| `VRCTools.World.Values`                     | `ValueType`, `ValueSource`, `ValueEvents`, math operation enums |
| `VRCTools.World.Values.Converters`          | Generic converters & `BooleanOperation`                         |
| `VRCTools.World.Values.Applicators`         | Generic applicators & `MaterialPropertyTarget`                  |
| `VRCTools.World.Player`                     | Interact trigger, teleport target, trigger volume, `PlayerType` |
| `VRCTools.World.Utils`                      | `EventBroadcaster`, `DelayMode`, `ValueUtility`                 |
| `VRCTools.Event`                            | `AbstractEventEmitter` (see [Event System]({{ site.baseurl }}/docs/event/)) |

Your script's assembly needs to reference the `VRCTools.World` assembly definition (and `VRCTools.Event` when you
subscribe to events). If your scripts live in the default `Assembly-CSharp`, no setup is needed.

## Reading & writing

```csharp
using UdonSharp;
using VRCTools.World.LocalValues;
using VRCTools.World.SynchronizedValues;

public class Scoreboard : UdonSharpBehaviour {
  public SynchronizedInt score;        // shared by everyone
  public LocalBoolean showDebugInfo;   // per player

  public void _AddPoint() {
    // writing State notifies all listeners - and, for synchronized values, every player in the instance
    this.score.State = this.score.State + 1;
    // or simply: this.score._Increment();
  }

  public void _ToggleDebug() {
    this.showDebugInfo._Toggle();
  }
}
```

## Subscribing to changes

Values emit events through the [VRCTools Event System]({{ site.baseurl }}/docs/event/). Register a handler with
`_RegisterHandler(eventId, behaviour, methodName)`:

```csharp
using UdonSharp;
using UnityEngine;
using VRCTools.World.LocalValues;

public class MusicVolume : UdonSharpBehaviour {
  public LocalFloat volume;
  public AudioSource music;

  private void Start() {
    this.volume._RegisterHandler(LocalFloat.EVENT_STATE_UPDATED, this, nameof(this._OnVolumeChanged));

    // values publish their initial state from their own Start() which may have run already - apply it explicitly
    this._OnVolumeChanged();
  }

  private void OnDestroy() {
    // optional for objects which live as long as the world, but good practice
    this.volume._UnregisterHandler(this);
  }

  // handlers are invoked via SendCustomEvent and therefore MUST be public
  public void _OnVolumeChanged() {
    this.music.volume = this.volume.State;
  }
}
```

> Handlers are invoked by name using `SendCustomEvent`. A `private` handler compiles fine but is never called. Prefix
> handler names with an underscore to keep them from being triggered over the network by other players.
{: .warning }

### Events by kind

| Constant                 | Local | Synchronized | Persisted | Emitted when                                         |
|--------------------------|:-----:|:------------:|:---------:|------------------------------------------------------|
| `EVENT_STATE_UPDATED`    |   ✓   |      ✓       |     ✓     | the state changed (locally or received from network) |
| `EVENT_STATE_RESET`      |   ✓   |              |     ✓     | `_Reset()` was called                                |
| `EVENT_LOADED`           |       |              |     ✓     | stored data has been restored                        |
| `EVENT_PERSIST`          |       |              |     ✓     | the state has been written to player data            |

Always use the constants of the class you reference (`PersistedFloat.EVENT_LOADED`, not a literal number) - their
numeric ids differ between kinds.

### Handling several values with one handler

Inside a handler, `IsUpdatingHandlers` is `true` on the value that is currently emitting. This lets one handler serve
many values without registering a separate method for each:

```csharp
public LocalBoolean[] switches;

public void _OnAnySwitchChanged() {
  for (var i = 0; i < this.switches.Length; i++) {
    if (!this.switches[i].IsUpdatingHandlers) continue;
    Debug.Log($"Switch #{i} is now {this.switches[i].State}");
  }
}
```

> Handlers cannot be registered while an emitter is notifying its handlers. Register in `Start()` (or later, from
> outside a handler of the same value).
{: .note }

## Generic code: local *or* synchronized

If you want your own component to support both kinds like the built-in ones do, follow the same pattern: expose a
`ValueType` plus one field per kind and let `ValueUtility` pick the right one.

```csharp
using UdonSharp;
using VRCTools.World.LocalValues;
using VRCTools.World.SynchronizedValues;
using VRCTools.World.Utils;
using ValueType = VRCTools.World.Values.ValueType;

public class FeatureFlag : UdonSharpBehaviour {
  public ValueType source;
  public LocalBoolean localValue;            // also accepts persisted booleans
  public SynchronizedBoolean synchronizedValue;

  private void Start() {
    ValueUtility.RegisterUpdateHandler(this.source, this.localValue, this.synchronizedValue, this,
      nameof(this._OnStateUpdated));
    this._OnStateUpdated();
  }

  public void _OnStateUpdated() {
    var enabled = ValueUtility.GetValue(this.source, this.localValue, this.synchronizedValue);
    // ...
  }
}
```

> `ValueType` collides with `System.ValueType`. Alias it as shown above or use its fully qualified name.
{: .tip }
