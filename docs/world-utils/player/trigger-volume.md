---
title: Trigger Volume
layout: component
description: Calls Udon events when players enter or leave an area.
nav_order: 30
since: 0.2.0
keywords: [trigger, collider, area, zone, enter, exit, OnPlayerTriggerEnter]
components:
  - name: Player Trigger Volume
    class: VRCTools.World.Player.PlayerTriggerVolume
    menu: Player/Trigger Volume
    file: Runtime/UdonScripts/Player/PlayerTriggerVolume.cs
redirect_from:
  - /packages/world-utils/components/player/trigger-volume.html
---

Turns a trigger collider into a zone that reacts to players entering and leaving it - ideal for room specific audio,
lighting changes, teleport pads or "you are now entering..." signs.

## Parameters

| Parameter             | Default | Description                                                                         |
|-----------------------|---------|-------------------------------------------------------------------------------------|
| Enter Events          | *empty* | Behaviour + event name pairs called when a player enters.                           |
| Exit Events           | *empty* | Behaviour + event name pairs called when a player leaves.                           |
| Accepted Player Types | `All`   | *Advanced.* Which players trigger the volume: `None`, `LOCAL`, `REMOTE` or `All`.   |

Requires a `Collider` on the same game object with **Is Trigger** enabled.

## Events

| Event                 | Description                                  |
|-----------------------|----------------------------------------------|
| `EVENT_PLAYER_ENTER`  | An accepted player entered the volume.       |
| `EVENT_PLAYER_EXIT`   | An accepted player left the volume.          |

Scripts can read `LastPlayer` (a `VRCPlayerApi`) to find out who caused the most recent event.

> Trigger events run on **every** client for every player that enters. With `Accepted Player Types` set to `All`,
> one player walking in calls your events on everybody's client. Use `LOCAL` for anything that should only affect the
> player who entered (teleports, local audio, UI) - that is what you want most of the time.
{: .warning }
