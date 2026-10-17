---
title: Event System
nav_title: Overview
description: >-
  `io.vrctools.event` - a tiny publish/subscribe event system for UdonSharp behaviours.
nav_order: 1
keywords: [VRCTEvent, io.vrctools.event, AbstractEventEmitter, events, subscribe]
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

public class DoorbellSpeaker : UdonSharpBehaviour {
  public Doorbell doorbell;
  public AudioSource chime;

  private void Start() {
    this.doorbell._RegisterHandler(Doorbell.EVENT_RUNG, this, nameof(this._OnRung));
  }

  private void OnDestroy() {
    // remove this handler from every event of the emitter...
    this.doorbell._UnregisterHandler(this);
    // ...or from a single event:
    // this.doorbell._UnregisterHandler(Doorbell.EVENT_RUNG, this, nameof(this._OnRung));
  }

  // handlers are invoked via SendCustomEvent and therefore must be public
  public void _OnRung() {
    this.chime.Play();
  }
}
```

## API

| Member                                                        | Description                                                                    |
|---------------------------------------------------------------|--------------------------------------------------------------------------------|
| `abstract int EventCount`                                     | Number of event slots the emitter provides.                                    |
| `_RegisterHandler(int eventId, UdonSharpBehaviour handler, string eventName)` | Subscribes `handler.eventName` to an event. The same handler may register multiple times. |
| `_UnregisterHandler(UdonSharpBehaviour handler)`              | Removes the handler from all events.                                           |
| `_UnregisterHandler(int eventId, UdonSharpBehaviour handler, string eventName)` | Removes one specific registration.                         |
| `protected _EmitEvent(int eventId)`                           | Calls all handlers registered for the event.                                   |
| `bool IsUpdatingHandlers`                                     | `true` while the emitter is calling its handlers.                              |

## Rules & gotchas

- **Handlers must be `public`.** They are invoked by name through `SendCustomEvent`.
- **No registration during emission.** Calling `_RegisterHandler` on an emitter while it is emitting is rejected with
  an error. Register in `Start()` or defer with `SendCustomEventDelayedFrames`.
- **Events before registration are lost.** Emitters don't queue events. If the emitter publishes an initial state from
  its own `Start()`, read that state yourself after registering.
- **Unregister when you go away.** Handlers belonging to destroyed objects are skipped with a warning, but explicitly
  unregistering in `OnDestroy()` keeps the handler lists clean.
- **Emitters are `UdonSharpBehaviour`s.** Udon# cannot compile interfaces, so emitting requires extending one of the
  abstract base classes.

## Synchronized emitters

`AbstractSynchronizedEventEmitter` offers the same API on top of the
[`AbstractSynchronizedBehaviour`]({{ site.baseurl }}/docs/common/synchronized-behaviour/) base class from the
[Common Library]({{ site.baseurl }}/docs/common/), which adds congestion aware manual synchronization with automatic retries. World Utilities'
[synchronized values]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#synchronized) are built on it.

## Changelog

See the [release history]({{ site.baseurl }}/docs/event/changelog/).
