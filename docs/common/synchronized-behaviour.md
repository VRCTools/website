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
| `synchronizationBackoff`    | `2`     | Seconds to wait before retrying a failed or congested synchronization. The inspector enforces a minimum of `0.1`; values `<= 0` set from scripts fall back to `1` and log an error. |
| `synchronizationDebugging`  | `false` | Log every synchronization step to the game log. Since v0.3.1, messages are written via [`UdonDebug`]({{ site.baseurl }}/docs/common/utilities/#udondebug) and prefixed with the behaviour's type and object name. |

## Members for implementers

| Member                               | Description                                                                              |
|--------------------------------------|------------------------------------------------------------------------------------------|
| `protected _TrySynchronize()`        | Request synchronization of the current state. Only has an effect on the owner.          |
| `protected _EnsureOwnership()`       | Transfers ownership of the game object to the local player if necessary.                |
| `protected bool HasOngoingSynchronization` | `true` while a synchronization is in flight, scheduled for retry or queued.        |
| `public bool IsStateInitialized`     | `true` once the local state is authoritative - see [state initialization](#state-initialization). *Since v0.2.0, public since v0.3.1.* |
| `protected virtual _OnStateInitialized()` | `[EventHook]` - called once when `IsStateInitialized` becomes `true`. Its base implementation is empty, so overrides do not need to call it. *Since v0.2.0.* |

The class implements `Start`, `Update`, `OnPlayerJoined`, `OnPlayerLeft`, `OnOwnershipTransferred`,
`OnPostSerialization` and - since v0.2.0 - `OnDeserialization`. If you override any of them, **call the base
implementation**; skipping it may cause undefined behaviour. Since v0.3.1 these methods are marked
[`[MustCallBase]`]({{ site.baseurl }}/docs/common/attributes/#mustcallbase).

> v0.3.1 renamed two members. Update your subclasses when upgrading from v0.2.x:
>
> - `StateInitialized` is now `IsStateInitialized` (and public instead of protected).
> - `OnStateInitialized()` is now `_OnStateInitialized()`. Overrides using the old name no longer compile.
{: .warning }

## State initialization

A freshly joined client starts with the default values of its synced fields until the owner's state arrives.
`IsStateInitialized` tells you when that phase is over. It becomes `true` - and `_OnStateInitialized()` is called - the
first time either of the following happens:

- the local player, as owner, calls `_TrySynchronize()` (including the automatic call from `Start()` in a new
  instance), making the local state authoritative, or
- remote state is received through `OnDeserialization`.

Since `IsStateInitialized` is public, other scripts - a UI showing the synchronized state, for example - can check it
as well.

> Taking ownership with `_EnsureOwnership()` and changing values before `IsStateInitialized` is `true` may reset the
> state of the whole instance to its defaults, because the local player then synchronizes values that never received
> the previous owner's state. Guard user interactions with `IsStateInitialized` where this matters.
{: .warning }

## Example

```csharp
using UdonSharp;
using VRC.SDKBase;
using VRCTools.Common.Network;

[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)] // optional since v0.3.1
public class Scoreboard : AbstractSynchronizedBehaviour {
  [UdonSynced] private int _score;

  public int Score => this._score;

  public void _AddPoint() {
    if (!this.IsStateInitialized) return; // don't overwrite state we haven't received yet

    this._EnsureOwnership();   // writer becomes owner
    this._score++;
    this._TrySynchronize();    // reliably delivered, even when the network is busy
    this._OnScoreChanged();
  }

  public override void OnDeserialization() {
    base.OnDeserialization();  // required since v0.2.0 - tracks IsStateInitialized
    this._OnScoreChanged();    // remote players receive the new state here
  }

  protected override void Start() {
    base.Start();              // required - schedules the initial synchronization
  }

  protected override void _OnStateInitialized() {
    this._OnScoreChanged();    // state is now known - safe to show it - no base call needed
  }

  private void _OnScoreChanged() { /* update UI, ... */ }
}
```

> Implementations must use **Manual** synchronization. Since v0.3.1 the base class declares
> `[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]` itself, so subclasses use it unless they declare a sync mode of
> their own - don't. Before v0.3.1 the base class does not set a sync mode, and every implementation must declare it.
{: .warning }

> Every synchronized object needs a unique hierarchy path to receive a stable network id - see
> [naming networked objects]({{ site.baseurl }}/docs/world-utils/concepts/best-practices/#name-networked-objects-uniquely).
{: .note }

Need events on top of synchronization? Extend `AbstractSynchronizedEventEmitter` from the
[Event System]({{ site.baseurl }}/docs/event/#synchronized-emitters), which builds on this class.
