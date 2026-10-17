---
title: Teleport Target
layout: component
description: Teleports the local player to a configurable location.
nav_order: 20
since: 0.2.0
keywords: [teleport, spawn, move player, warp]
components:
  - name: Player Teleport Target
    class: VRCTools.World.Player.PlayerTeleportTarget
    menu: Player/Teleport Target
    prefab: Player/Teleport Target.prefab
    file: Runtime/UdonScripts/Player/PlayerTeleportTarget.cs
redirect_from:
  - /packages/world-utils/components/player/teleport-target.html
---

Marks a destination. Calling `_TeleportTo()` moves the **local** player to the target's position and rotation.

## Parameters

| Parameter | Default | Description                                                                                 |
|-----------|---------|---------------------------------------------------------------------------------------------|
| Target    | *None*  | Destination transform. When empty, the teleport target's own transform is used.             |

In the scene view the destination is drawn as a blue circle with a green line pointing in the direction the player
will face.

## Events

| Event                  | Description                                           |
|------------------------|-------------------------------------------------------|
| `EVENT_TELEPORTED_TO`  | The local player has been teleported to this target.  |

## Functions

| Function         | Description                                         |
|------------------|-----------------------------------------------------|
| `_TeleportTo()`  | Teleports the local player to the destination.      |

## Usage

- **Teleport pad:** add a [Trigger Volume]({{ site.baseurl }}/docs/world-utils/player/trigger-volume/) with
  *Accepted Player Types* set to `LOCAL` and an enter event calling `_TeleportTo` on the target.
- **Menu button:** wire a UI button's **On Click** to `SendCustomEvent("_TeleportTo")`.
