---
title: Event System
nav_title: Overview
description: >-
  `io.vrctools.event` - a tiny publish/subscribe event system for UdonSharp behaviours.
nav_order: 1
keywords: [VRCTEvent, io.vrctools.event, AbstractEventEmitter, events, subscribe, debugging]
redirect_from:
  - /packages/event/
---

The VRCTools Event System lets UdonSharp behaviours publish events that other behaviours subscribe to at runtime.
Handlers can be added and removed dynamically as objects are created or destroyed - something Udon does not offer
out of the box.

> You rarely install this package yourself. It is a dependency of [World Utilities]({{ site.baseurl }}/docs/world-utils/)
> and other VRCTools packages and is installed automatically by Creator Companion. Read on if you want to emit or
> consume events from your own scripts.
{: .note }

## Requirements

| Package                                                  | Version   | Description                                  |
|----------------------------------------------------------|-----------|----------------------------------------------|
| `com.vrchat.worlds`                                      | `^3.8.1`  | VRChat Worlds SDK                            |
| [`io.vrctools.common`]({{ site.baseurl }}/docs/common/)  | `^0.3.1`  | Shared helpers, installed automatically      |

Before v0.4.0, VRChat Worlds SDK 3.7.0 and `io.vrctools.common` 0.2.1 or newer are sufficient.

## Concepts

- An **emitter** extends `AbstractEventEmitter` (or `AbstractSynchronizedEventEmitter` for networked behaviours) and
  declares a fixed number of event slots, identified by integer constants.
- A **handler** is any `UdonSharpBehaviour` plus the name of one of its `public` methods. Handlers register for a
  specific event slot.
- **Emitting** an event calls every registered handler via `SendCustomEvent`, in registration order.

## Emitting events

```csharp
using UdonSharp;
using VRC.SDKBase;
using VRCTools.Event;

public class Doorbell : AbstractEventEmitter {
  public const int EVENT_RUNG = 0;
  public const int EVENT_COUNT = 1;

  public override int EventCount => EVENT_COUNT;

  public override void Interact() {
    this._EmitEvent(EVENT_RUNG);
  }
}
```

Event ids must be in the range `0 .. EventCount - 1`.

## Subscribing to events

```csharp
using UdonSharp;
using UnityEngine;
using VRC.SDKBase;
using VRCTools.Common.Attributes;

public class DoorbellSpeaker : UdonSharpBehaviour {
  public Doorbell doorbell;
  public AudioSource chime;

  private void Start() {
    this.doorbell._RegisterHandler(Doorbell.EVENT_RUNG, this, nameof(this._OnRung));
  }

  private void OnDestroy() {
    // the emitter may have been destroyed first (e.g. during scene teardown)
    if (!Utilities.IsValid(this.doorbell)) return;

    // remove this handler from every event of the emitter...
    this.doorbell._UnregisterHandler(this);
    // ...or from a single event:
    // this.doorbell._UnregisterHandler(Doorbell.EVENT_RUNG, this, nameof(this._OnRung));
  }

  // handlers are invoked via SendCustomEvent and therefore must be public
  [CustomEvent]
  public void _OnRung() {
    this.chime.Play();
  }
}
```

Marking handler functions with [`[CustomEvent]`]({{ site.baseurl }}/docs/common/attributes/#customevent) from the
[Common Library]({{ site.baseurl }}/docs/common/) is optional, but lets the editor warn you when a handler cannot be
invoked - for example because it is not `public` or declares parameters.

## API

| Member                                                        | Description                                                                    |
|---------------------------------------------------------------|--------------------------------------------------------------------------------|
| `abstract int EventCount`                                     | Number of event slots the emitter provides.                                    |
| `bool eventEmitterDebugging`                                  | Inspector field - writes registrations and emissions to the game log. See [debugging](#debugging). *Since v0.4.0.* |
| `_RegisterHandler(int eventId, UdonSharpBehaviour handler, string eventName)` | Subscribes `handler.eventName` to an event. The same handler may register multiple times. |
| `_UnregisterHandler(UdonSharpBehaviour handler)`              | Removes the handler from all events.                                           |
| `_UnregisterHandler(int eventId, UdonSharpBehaviour handler, string eventName)` | Removes one specific registration. Since v0.4.0, logs an error when there is no matching registration. |
| `protected _EmitEvent(int eventId)`                           | Calls all handlers registered for the event. May be called from within a handler function. |
| `bool IsUpdatingHandlers`                                     | `true` while the emitter is calling its handlers.                              |
| `protected _CleanupHandlers()`                                | Removes registrations of destroyed handlers. Called automatically when registering or unregistering for a single event. |

## Rules & gotchas

- **Handlers must be `public`.** They are invoked by name through `SendCustomEvent`.
- **No registration changes during emission.** While an emitter is calling its handlers (e.g. from within a handler
  function), `_RegisterHandler`, both `_UnregisterHandler` overloads and `_CleanupHandlers` are rejected with an error.
  Check `IsUpdatingHandlers` if necessary, and register in `Start()` or defer the change with
  `SendCustomEventDelayedFrames`. *Before v0.3.0, unregistering was not rejected and could cause other handlers to be
  skipped or invoked twice.*
- **Emitting from a handler is fine.** A handler may emit further events, on the same or another emitter; the outer
  emission continues with its remaining handlers afterwards. Avoid unconditionally re-emitting the event a handler is
  reacting to - that recursion never ends. *Before v0.4.0, emitting from within a handler function
  could cause the outer emission's remaining handlers to be skipped or invoked incorrectly.*
- **Events before registration are lost.** Emitters don't queue events. If the emitter publishes an initial state from
  its own `Start()`, read that state yourself after registering.
- **Unregister when you go away.** Handlers belonging to destroyed objects are skipped with a warning, but explicitly
  unregistering in `OnDestroy()` keeps the handler lists clean. Check that the emitter still exists first - it may
  have been destroyed before your handler.
- **Emitters are `UdonSharpBehaviour`s.** Udon# cannot compile interfaces, so emitting requires extending one of the
  abstract base classes.

## Debugging

Turn on **Event Emitter Debugging** (`eventEmitterDebugging`) in the emitter's inspector to write its activity to the
game log: handler registrations and unregistrations, the cleanup of stale handlers and every emission, including each
handler call and the current nesting depth. *Since v0.4.0.*

Errors - such as invalid event ids or registration changes during emission - are always logged, regardless of this
option. Since v0.4.0 all messages are written via [`UdonDebug`]({{ site.baseurl }}/docs/common/utilities/#udondebug)
and start with the emitter's type and object name (`[Doorbell#Front Door] ...`) instead of `[Event Emitter]`.

## Synchronized emitters

`AbstractSynchronizedEventEmitter` offers the same API on top of the
[`AbstractSynchronizedBehaviour`]({{ site.baseurl }}/docs/common/synchronized-behaviour/) base class from the
[Common Library]({{ site.baseurl }}/docs/common/), which adds congestion aware manual synchronization with automatic retries. World Utilities'
[synchronized values]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#synchronized) are built on it.

- **Events are not networked.** Only the emitter's own synced state is synchronized. Handlers are invoked only on
  the client that calls `_EmitEvent`; to notify handlers on remote clients too, emit the event from
  `OnDeserialization` (or a similar callback) as well.
- **Call the base implementation** of every lifecycle method you override (`Start`, `Update`, `OnDeserialization`,
  `OnPostSerialization`, ...), as required by
  [`AbstractSynchronizedBehaviour`]({{ site.baseurl }}/docs/common/synchronized-behaviour/#members-for-implementers).

> In v0.4.0, `AbstractSynchronizedEventEmitter` fails to compile: its internal log methods clash with those of
> `AbstractSynchronizedBehaviour`, and Udon# does not support hiding methods. Update to v0.4.1 or later.
{: .danger }

## Changelog

See the [release history]({{ site.baseurl }}/docs/event/changelog/).
