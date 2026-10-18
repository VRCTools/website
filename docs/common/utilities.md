---
title: Utilities
description: Array and animator helpers that work within Udon's limitations.
nav_order: 20
keywords: [array, list, add, remove, find, animator, parameter, hash]
---

Udon does not support `List<T>` or LINQ, so even simple collection handling means copying arrays by hand. These static
helpers do it for you and compile with UdonSharp.

## ArrayUtils

`VRCTools.Common.Utils.ArrayUtils` - every mutating method returns a **new** array; the source array is left untouched.

| Method                                                   | Description                                                                  |
|----------------------------------------------------------|------------------------------------------------------------------------------|
| `int FindElement<T>(T[] source, T element, int offset = 0)` | Index of the first element equal to `element` at or after `offset`; `-1` if not found or `source` is `null`. |
| `T[] AddElement<T>(T[] source, T element)`               | Copy of `source` with `element` appended. `source` must not be `null` - use `AddElementOrCreate` otherwise. |
| `T[] AddElementOrCreate<T>(T[] source, T element)`       | Like `AddElement`, but creates a single element array when `source` is `null`. |
| `T[] RemoveElement<T>(T[] source, int i)`                | Copy of `source` without the element at index `i`. Returns `source` unchanged for `null`, empty arrays or out of range indices. |

```csharp
using VRCTools.Common.Utils;

private VRCPlayerApi[] _players = new VRCPlayerApi[0];

public override void OnPlayerJoined(VRCPlayerApi player) {
  this._players = ArrayUtils.AddElement(this._players, player);
}
```

> In v0.1.0 `RemoveElement` does not copy the remaining elements correctly - the resulting array is filled with the
> removed element instead. This issue has been addressed in v0.2.0
{: .danger }

## AnimatorUtilities

`VRCTools.Common.Utils.AnimatorUtilities`

| Method                                               | Description                                                                                  |
|------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `int[] ResolveParameterIds(string[] parameterNames)` | Converts parameter names to ids with `Animator.StringToHash`. Empty names map to `-1`.       |

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
