---
title: Utilities
description: Logging, ownership, array and animator helpers that work within Udon's limitations.
nav_order: 20
keywords: [array, list, add, remove, find, animator, parameter, hash, log, debug, UdonDebug, ownership, owner, extension]
---

Udon does not support `List<T>` or LINQ, so even simple collection handling means copying arrays by hand, and the
built-in logging and networking calls leave a lot of repetition behind. These static helpers do the work for you and
compile with UdonSharp.

## UdonDebug

`VRCTools.Common.Utils.UdonDebug` - *since v0.3.1.* Writes log messages prefixed with the type and game object name of
the behaviour that wrote them, so it is always clear where an entry came from. The behaviour is also passed as the log
context: clicking an entry in the Unity console selects its game object.

| Method                                                              | Description                                    |
|---------------------------------------------------------------------|------------------------------------------------|
| `void Info(UdonSharpBehaviour behaviour, string message)`           | Logs an informative message (`Debug.Log`).     |
| `void Warn(UdonSharpBehaviour behaviour, string message)`           | Logs a warning (`Debug.LogWarning`).           |
| `void Error(UdonSharpBehaviour behaviour, string message)`          | Logs an error (`Debug.LogError`).              |

Each method also has an overload taking `params object[] args`, which formats `message` with `string.Format`. Without
arguments, the message is logged as is and may contain braces.

```csharp
using VRCTools.Common.Utils;

UdonDebug.Info(this, "Ready");
UdonDebug.Warn(this, "Received {0} of {1} entries", received, expected);
// [Scoreboard#Scoreboard (Lobby)] Ready
```

The prefix uses the short type name (without namespace) followed by `#` and the game object name. In the editor, both
names are color coded - each type and each object name always gets the same color, which makes entries of the same
source easy to spot.

## Ownership extensions

`VRCTools.Common.Utils.GameObjectExtensions` and `VRCTools.Common.Utils.UdonSharpBehaviourExtensions` - *since
v0.3.1.* Extension methods which shorten the usual `Networking` ownership calls. They are available on every
`GameObject` and `UdonSharpBehaviour` once you add `using VRCTools.Common.Utils;`.

| Method                                  | Description                                                                         |
|-----------------------------------------|-------------------------------------------------------------------------------------|
| `bool IsLocallyOwned()`                 | `true` if the local player owns the object (`Networking.IsOwner(gameObject)`).      |
| `bool HasOwnership(VRCPlayerApi player)` | `true` if `player` owns the object (`Networking.IsOwner(player, gameObject)`).     |
| `void SetOwnership(VRCPlayerApi player)` | Transfers ownership to `player` (`Networking.SetOwner(player, gameObject)`).       |
| `void TakeOwnership()`                  | Transfers ownership to the local player, unless it already owns the object.         |

The `UdonSharpBehaviour` variants act on the behaviour's game object and check that the behaviour is still valid
first: for a behaviour that has already been destroyed, `IsLocallyOwned()` and `HasOwnership()` return `false` and
`SetOwnership()` and `TakeOwnership()` do nothing. The `GameObject` variants do not perform this check.

```csharp
using VRCTools.Common.Utils;

public void _Grab() {
  this.TakeOwnership(); // same as: if (!Networking.IsOwner(gameObject)) Networking.SetOwner(Networking.LocalPlayer, gameObject);
}

public void _Toggle() {
  if (!this.IsLocallyOwned()) return;
  // ...
}
```

> Extension methods always need a receiver: inside your behaviour, write `this.TakeOwnership()` - `TakeOwnership()` on
> its own does not compile.
{: .note }

## ArrayUtils

`VRCTools.Common.Utils.ArrayUtils` - every mutating method returns a **new** array; the source array is left untouched.

| Method                                                   | Description                                                                  |
|----------------------------------------------------------|------------------------------------------------------------------------------|
| `int FindElement<T>(T[] source, T element, int offset = 0)` | Index of the first element equal to `element` at or after `offset`; `-1` if not found, `source` is `null` or `offset` is out of range. Pass `null` to find the first `null` element. |
| `T[] AddElement<T>(T[] source, T element)`               | Copy of `source` with `element` appended. `source` must not be `null` - use `AddElementOrCreate` otherwise. |
| `T[] AddElementOrCreate<T>(T[] source, T element)`       | Like `AddElement`, but creates a single element array when `source` is `null`. |
| `T[] RemoveElement<T>(T[] source, int i)`                | Copy of `source` without the element at index `i`. Returns `source` unchanged for `null`, empty arrays or out of range (including negative) indices. |

```csharp
using VRCTools.Common.Utils;

private VRCPlayerApi[] _players = new VRCPlayerApi[0];

public override void OnPlayerJoined(VRCPlayerApi player) {
  this._players = ArrayUtils.AddElement(this._players, player);
}
```

> Before v0.2.1, `RemoveElement` only works correctly when removing the last element: v0.1.0 fills the resulting array
> with the removed element, and v0.2.0 leaves the last slot empty (`null` or the type's default value). Before v0.2.1,
> `FindElement` also cannot find `null` elements, and a negative index or out of range offset throws an exception,
> halting the behaviour. Update to v0.2.1 or later.
{: .danger }

## AnimatorUtilities

`VRCTools.Common.Utils.AnimatorUtilities`

| Method                                               | Description                                                                                  |
|------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `int[] ResolveParameterIds(string[] parameterNames)` | Converts parameter names to ids with `Animator.StringToHash`. Empty names map to `-1`. Returns an empty array for `null` or empty arrays. |

Resolving names once at start-up and using the ids afterwards (`animator.SetFloat(id, value)`) avoids hashing the
parameter name on every call:

```csharp
using VRCTools.Common.Utils;

public Animator animator;
public string[] parameterNames;
private int[] _parameterIds;

private void Start() {
  this._parameterIds = AnimatorUtilities.ResolveParameterIds(this.parameterNames);
}
```

> Before v0.3.1, passing `null` to `ResolveParameterIds` throws an exception, halting the behaviour.
{: .danger }
