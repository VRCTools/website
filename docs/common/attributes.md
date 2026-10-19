---
title: Attributes
description: Attributes which document how a method is meant to be used and which the editor checks for common scripting mistakes.
nav_order: 30
keywords: [attribute, EventHook, MustCallBase, CustomEvent, NetworkEvent, SendCustomEvent, SendCustomNetworkEvent, NetworkCallable, validation, override, base]
---

*Since v0.3.1.* Udon calls many methods by name - `SendCustomEvent`, `SendCustomNetworkEvent` or the base class
expecting its overrides to call back. Getting one of those details wrong rarely causes a compile error; the method is
simply never invoked or the behaviour breaks at runtime. The attributes in `VRCTools.Common.Attributes` state how a
method is meant to be used, and the editor checks them for you.

| Attribute                         | Applies to                                                                 |
|-----------------------------------|----------------------------------------------------------------------------|
| [`[EventHook]`](#eventhook)       | Overridable hooks with an empty body. Overrides need not call the base.    |
| [`[MustCallBase]`](#mustcallbase) | Methods whose overrides must call the base implementation.                 |
| [`[CustomEvent]`](#customevent)   | Methods invoked via `SendCustomEvent` or `SendCustomEventDelayedSeconds`.  |
| [`[NetworkEvent]`](#networkevent) | Methods invoked via `SendCustomNetworkEvent`.                              |

The attributes have no effect at runtime.

## EventHook

Marks a `virtual` method with an empty body that subclasses may override to react to something - for example
[`AbstractSynchronizedBehaviour._OnStateInitialized()`]({{ site.baseurl }}/docs/common/synchronized-behaviour/#state-initialization).
Since the base implementation does nothing, overrides do not need to call it.

The editor reports a violation when the annotated method

- is an override rather than the original declaration (annotate the root definition only),
- is declared in a `sealed` class, is not `virtual` or is `sealed` itself,
- is `abstract`, which would force every subclass to implement it, or
- has a non-empty body.

## MustCallBase

Marks a method whose overrides must call the base implementation, such as the lifecycle methods of
[`AbstractSynchronizedBehaviour`]({{ site.baseurl }}/docs/common/synchronized-behaviour/#members-for-implementers).

The editor reports a violation when the annotated method cannot be overridden (it is neither `virtual` nor `abstract`,
or it is `sealed`).

> The editor does not check whether overrides actually call the base implementation. That remains up to you.
{: .warning }

## CustomEvent

Marks a method invoked by name via `SendCustomEvent` or `SendCustomEventDelayedSeconds`.

The editor reports a violation when the annotated method

- is not `public` or is `static` - Udon never invokes it,
- declares parameters - custom events cannot pass arguments, or
- does not start with an underscore. Udon lets other players invoke any public method without a leading underscore via
  `SendCustomNetworkEvent`; the underscore prevents that. Pass `[CustomEvent(true)]` (`permitNetworkCalls`) to
  allow network calls intentionally and skip this check.

```csharp
using VRCTools.Common.Attributes;

public void _StartTimer() {
  this.SendCustomEventDelayedSeconds(nameof(this._Tick), 1);
}

[CustomEvent]
public void _Tick() {
  // ...
  this.SendCustomEventDelayedSeconds(nameof(this._Tick), 1);
}
```

## NetworkEvent

Marks a method invoked via `SendCustomNetworkEvent`.

The editor reports a violation when the annotated method

- is not `public` or is `static` - Udon never invokes it,
- starts with an underscore - Udon refuses to invoke such methods over the network,
- declares more than 8 parameters - the maximum for network events, or
- is not marked `[NetworkCallable]` (`VRC.SDK3.UdonNetworkCalling`).

```csharp
using VRC.SDK3.UdonNetworkCalling;
using VRC.Udon.Common.Interfaces;
using VRCTools.Common.Attributes;

public void _Celebrate() {
  this.SendCustomNetworkEvent(NetworkEventTarget.All, nameof(this.Celebrate));
}

[NetworkEvent, NetworkCallable]
public void Celebrate() {
  // runs on every client
}
```

## Editor validation

Whenever Unity reloads scripts (for example after they have been recompiled), the editor checks every method in the
project that carries one of these attributes - including your own scripts. Each violation is logged as a warning
prefixed with `[Attribute Validator]`, naming the attribute, type and method; clicking the warning selects the
offending script. Each check that found problems also logs how many violations it reported.

The checks live in the editor only `VRCTools.Common.Editor` assembly and are not part of your world build.
