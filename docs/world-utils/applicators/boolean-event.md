---
title: Boolean Event
layout: component
description: Calls Udon events on other behaviours whenever a boolean value turns true or false - optionally delayed.
nav_order: 60
since: 0.7.0
kinds: [local, synchronized, persisted]
keywords: [event, SendCustomEvent, trigger, callback, delay]
components:
  - name: Boolean Event Applicator
    class: VRCTools.World.Values.Applicators.BooleanEventApplicator
    menu: Values/Applicators/Boolean Event Applicator
    file: Runtime/UdonScripts/Values/Applicators/BooleanEventApplicator.cs
---

Bridges values and your own (or third party) Udon behaviours: whenever the boolean changes, the applicator calls a
list of custom events - one list for `true`, one for `false`. Use it to start and stop a video player, play a sound
when a door unlocks or reset a game when the instance owner flips a switch.

## Parameters

| Section | Parameter          | Default  | Description                                                                      |
|---------|--------------------|----------|----------------------------------------------------------------------------------|
|         | Type / Source      | `LOCAL`  | The boolean value to watch.                                                      |
| Targets | True State Events  | *empty*  | Behaviour + event name pairs called when the value becomes `true`.               |
|         | False State Events | *empty*  | Behaviour + event name pairs called when the value becomes `false`.              |
| Delay   | Delay Mode         | `NONE`   | `NONE`, `FRAMES` or `SECONDS`.                                                   |
|         | Delay Frames       | `0`      | Frames to wait before calling the events (`FRAMES`).                             |
|         | Delay Seconds      | `0`      | Seconds to wait before calling the events (`SECONDS`).                           |
|         | Delay Timing       | `Update` | When the delayed event is executed: `Update` or `LateUpdate`.                      |

Events are called with `SendCustomEvent`, so the target methods must be `public`. Entries with a missing behaviour or
an empty event name are skipped with a warning.

> Unlike other applicators, the Boolean Event Applicator does not explicitly re-apply the initial state after
> start-up. It may still receive a value's initial update (depending on the order in which Udon starts behaviours), and
> persisted values announce their restored state once loaded. Make sure your events are safe to run when a player
> joins.
{: .note }

> Events are not cancelled when the value changes again during the delay. Flipping a value quickly with a long delay
> results in both the `true` and `false` events firing (in order).
{: .warning }
