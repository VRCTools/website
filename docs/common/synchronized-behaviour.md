---
title: AbstractSynchronizedBehaviour
nav_title: Synchronized Behaviour
layout: component
description: A base class for manually synchronized UdonSharp behaviours that copes with network congestion, failed serializations, late joiners and ownership changes.
nav_order: 10
since: 0.1.0
networked: true
keywords: [network, sync, RequestSerialization, ownership, backoff, retry, late joiner]
components:
  - name: AbstractSynchronizedBehaviour
    class: VRCTools.Common.Network.AbstractSynchronizedBehaviour
    file: Runtime/Network/AbstractSynchronizedBehaviour.cs
---

Calling `RequestSerialization()` is easy; making sure the state actually arrives is not. Serializations can fail, the
network can be clogged, players join after the last change, and ownership moves around. `AbstractSynchronizedBehaviour`
wraps all of that in a single call - `_TrySynchronize()` - and is the foundation of World Utilities'
[synchronized values]({{ site.baseurl }}/docs/world-utils/concepts/value-kinds/#synchronized).

## What it does for you

| Situation                                    | Behaviour                                                                          |
|----------------------------------------------|------------------------------------------------------------------------------------|
| Instance starts and the local player owns it | Synchronizes immediately so already connected clients receive the default state.   |
| Network is clogged (`Networking.IsClogged`)  | Skips the attempt and retries after `synchronizationBackoff` seconds.              |
| Serialization fails                          | Retries after `synchronizationBackoff` seconds.                                    |
| Sync requested while another is in flight    | Queues one follow-up synchronization once the current one succeeds.                |
| A player joins or leaves                     | The owner re-synchronizes.                                                         |
| Local player gains ownership                 | Synchronizes to resolve any divergence.                                            |
| Local player loses ownership                 | Cancels all pending synchronizations.                                              |

## Fields

| Field                       | Default | Description                                                                         |
|-----------------------------|---------|-------------------------------------------------------------------------------------|
| `synchronizationBackoff`    | `2`     | Seconds to wait before retrying a failed or congested synchronization. Values `<= 0` fall back to `1`. |
| `synchronizationDebugging`  | `false` | Log every synchronization step (and configuration errors) to the game log.          |

## Members for implementers

| Member                               | Description                                                                              |
|--------------------------------------|------------------------------------------------------------------------------------------|
| `protected _TrySynchronize()`        | Request synchronization of the current state. Only has an effect on the owner.          |
| `protected _EnsureOwnership()`       | Transfers ownership of the game object to the local player if necessary.                |
| `protected bool HasOngoingSynchronization` | `true` while a synchronization is in flight, scheduled for retry or queued.        |

The class implements `Start`, `Update`, `OnPlayerJoined`, `OnPlayerLeft`, `OnOwnershipTransferred` and
`OnPostSerialization`. If you override any of them, **call the base implementation**.

## Example

```csharp
using UdonSharp;
using VRC.SDKBase;
using VRCTools.Common.Network;

[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class Scoreboard : AbstractSynchronizedBehaviour {
  [UdonSynced] private int _score;

  public int Score => this._score;

  public void _AddPoint() {
    this._EnsureOwnership();   // writer becomes owner
    this._score++;
    this._TrySynchronize();    // reliably delivered, even when the network is busy
    this._OnScoreChanged();
  }

  public override void OnDeserialization() {
    this._OnScoreChanged();    // remote players receive the new state here
  }

  protected override void Start() {
    base.Start();              // required - schedules the initial synchronization
    this._OnScoreChanged();
  }

  private void _OnScoreChanged() { /* update UI, ... */ }
}
```

> Implementations must use **Manual** synchronization (`[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]`). The base
> class does not set a sync mode itself.
{: .warning }

> Every synchronized object needs a unique hierarchy path to receive a stable network id - see
> [naming networked objects]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#name-networked-objects-uniquely).
{: .note }

Need events on top of synchronization? Extend `AbstractSynchronizedEventEmitter` from the
[Event System]({{ site.baseurl }}/docs/event/#synchronized-emitters), which builds on this class.
