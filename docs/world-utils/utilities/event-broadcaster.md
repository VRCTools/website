---
title: Event Broadcaster
layout: component
description: Calls a list of Udon events with a single call - optionally delayed by frames or seconds.
nav_order: 10
since: 0.7.0
keywords: [event, broadcast, fan out, SendCustomEvent, delay, relay]
components:
  - name: Event Broadcaster
    class: VRCTools.World.Utils.EventBroadcaster
    menu: Utilities/Event Broadcaster
    file: Runtime/UdonScripts/Utils/EventBroadcaster.cs
---

Unity UI buttons, interact triggers and other components can usually call only a limited set of events, and offer no
delay. The Event Broadcaster bundles any number of event calls behind a single `_Trigger()`, optionally after a delay.

## Parameters

| Section | Parameter     | Default  | Description                                                                 |
|---------|---------------|----------|-----------------------------------------------------------------------------|
| Targets | Events        | *empty*  | Behaviour + event name pairs called on `_Trigger()`, in order.              |
| Delay   | Delay Mode    | `NONE`   | `NONE`, `FRAMES` or `SECONDS`.                                              |
|         | Delay Frames  | `0`      | Frames to wait before calling the events (`FRAMES`).                        |
|         | Delay Seconds | `0`      | Seconds to wait before calling the events (`SECONDS`).                      |
|         | Delay Timing  | `Update` | When delayed events are executed: `Update` or `LateUpdate`.                 |

Event names must refer to `public` methods. Invalid entries are skipped and logged.

## Functions

| Function      | Description                                          |
|---------------|------------------------------------------------------|
| `_Trigger()`  | Calls all configured events (after the delay).       |

## Usage

A "reset room" button that restores several values at once:

1. Add an `Event Broadcaster` and list `_Reset` on each local value (and `_Apply` on any presets) you want to restore.
2. Point the button's **On Click** at the broadcaster: `SendCustomEvent("_Trigger")`.

A delay of one frame is useful when the events depend on state that is updated by the same click.
