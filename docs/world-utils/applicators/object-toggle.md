---
title: Object Toggle
layout: component
description: Activates or deactivates game objects based on a boolean value.
nav_order: 10
since: 0.1.0
kinds: [local, synchronized, persisted]
keywords: [toggle, enable, disable, SetActive, mirror]
components:
  - name: Object Toggle Applicator
    class: VRCTools.World.Values.Applicators.ObjectToggleApplicator
    menu: Values/Applicators/Object Toggle Applicator
    prefab: Local Values/Applicators/Object Toggle Applicator.prefab
    file: Runtime/UdonScripts/Values/Applicators/ObjectToggleApplicator.cs
redirect_from:
  - /packages/world-utils/components/value/applicators/object-toggle.html
---

The simplest applicator - and probably the one you will use most. While the boolean is `true`, every target is active;
while it is `false`, every target is inactive.

## Parameters

| Parameter         | Default | Description                                                                   |
|-------------------|---------|-------------------------------------------------------------------------------|
| Type              | `LOCAL` | Kind of the source value.                                                     |
| Source            | *None*  | The boolean value to follow. **Required.**                                    |
| Targets           | *empty* | Game objects to (de-)activate.                                                |
| Invert            | `false` | *Advanced.* Activate the targets while the value is `false` instead.          |

Prefabs for both kinds are available under `Runtime/Prefabs/Local Values/Applicators` and
`Runtime/Prefabs/Synchronized Values/Applicators`.

## Usage

Common setups:

- **Mirror toggle** - persisted boolean (each player decides) → mirror object.
- **Two-way switch** - two applicators on the same value, one with `Invert` ticked, to swap between a *day* and a
  *night* object group.
- **Owner controlled area** - synchronized boolean → door collider and door mesh.

> Do not add the applicator's own game object (or one of its parents) to `Targets`. A deactivated applicator stops
> receiving updates and cannot turn the objects back on.
{: .warning }
