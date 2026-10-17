---
title: Interact Trigger
layout: component
description: Calls Udon events when the local player interacts with (clicks) an object.
nav_order: 10
since: 0.2.0
keywords: [interact, click, use, button, pickup]
components:
  - name: Player Interact Trigger
    class: VRCTools.World.Player.PlayerInteractTrigger
    menu: Player/Player Interact Trigger
    prefab: Player/Interact Trigger.prefab
    file: Runtime/UdonScripts/Player/PlayerInteractTrigger.cs
redirect_from:
  - /packages/world-utils/components/player/interact-trigger.html
---

Makes an object interactable. When the local player clicks it (desktop) or uses it (VR), every configured event is
called and `EVENT_INTERACT` is emitted.

## Parameters

| Parameter | Default | Description                                                                     |
|-----------|---------|---------------------------------------------------------------------------------|
| Events    | *empty* | Behaviour + event name pairs to call on interaction.                            |

The object needs a `Collider` for players to be able to interact with it. The interaction text shown to players is
configured on the Udon behaviour itself (**Interaction Text**, **Proximity**).

## Events

| Event              | Description                                        |
|--------------------|----------------------------------------------------|
| `EVENT_INTERACT`   | The local player interacted with the object.       |

## Usage

A physical light switch on a wall that controls the lights for everyone:

1. Add the `Interact Trigger` prefab to your switch mesh (or add the component to an object with a collider).
2. Add an event targeting your `Synchronized Boolean` with event name `_Toggle`.
3. Connect the boolean to the lights with an [Object Toggle applicator]({{ site.baseurl }}/docs/world-utils/applicators/object-toggle/).
