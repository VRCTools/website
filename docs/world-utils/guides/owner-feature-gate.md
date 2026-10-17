---
title: Owner-controlled features
description: Let the instance owner switch a feature off for everyone while each player can still opt out.
nav_order: 20
keywords: [owner, master, moderation, AND, gate, global toggle, synchronized]
---

Some features need two switches: the instance owner decides whether a feature is available at all (say, a loud
particle show), and each player decides whether they personally want it. The feature should run only when **both**
agree.

<div class="diagram" markdown="1">
```text
[ Synchronized Boolean ] "show allowed"  (owner panel) ─┐
                                                        ├─▶ [ Boolean Operation: AND ] ─▶ [ Local Boolean ] "show on"
[ Persisted Boolean    ] "show wanted"   (settings)   ──┘                                       │
                                                                                                 ▼
                                                                              [ Object Toggle ] Particle Show
```
</div>

## Steps

Following the [best practices]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#group-values-by-kind), each value goes into
the group matching its kind.

1. **Global switch** - add a `Synchronized Boolean` named `Show Allowed` to `Global Settings`, default `true`. Put a
   [Toggle Button]({{ site.baseurl }}/docs/world-utils/ui/toggle-button/) for it on an owner-only panel (see below).
2. **Personal switch** - add a `Persisted Boolean` named `Show Wanted` to `Persisted Settings` with key
   `settings.show_wanted`, default `true`, and a
   Toggle Button in the regular settings menu.
3. **Result** - add a `Local Boolean` named `Show On` to `Local Settings/Derived`. Its default does not matter; the converter overwrites it.
4. **Combine** - add a [Boolean Operation]({{ site.baseurl }}/docs/world-utils/converters/boolean-operation/) converter:
   - Target: **Type** `LOCAL`, **Target** `Show On`, **Operation** `AND`
   - A: **Type** `SYNCHRONIZED`, **Component** `Show Allowed`
   - B: **Type** `LOCAL`, **Component** `Show Wanted`
5. **Apply** - add an [Object Toggle]({{ site.baseurl }}/docs/world-utils/applicators/object-toggle/) with source
   `Show On` and the particle system as target.

Why a *local* result? The converter runs on every client. Writing into a synchronized value would make every player
take ownership of it in turn - a local result costs nothing and is always correct.

## Restricting the owner panel

Anyone can write to a synchronized value, so the owner switch is only as protected as the UI that changes it. World
Utilities doesn't decide who counts as "owner" for you - instance owner, world author, a moderator list - but a tiny
script can show the panel to the right people:

```csharp
using UdonSharp;
using UnityEngine;
using VRC.SDKBase;

public class OwnerOnly : UdonSharpBehaviour {
  public GameObject panel;

  private void Start() { this._Refresh(); }

  public override void OnPlayerLeft(VRCPlayerApi player) {
    // mastership moves to another player when the master leaves - re-check once it has settled
    this.SendCustomEventDelayedSeconds(nameof(this._Refresh), 1f);
  }

  public void _Refresh() {
    // the instance master is usually the person who created the instance
    this.panel.SetActive(Networking.IsMaster);
  }
}
```

> `Networking.IsMaster` follows the *instance master*, which changes when that player leaves. If you need the actual
> instance creator, check `Networking.IsInstanceOwner` instead.
{: .note }
