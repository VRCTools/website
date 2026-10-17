---
title: Common Library
nav_title: Overview
description: >-
  `io.vrctools.common` - shared building blocks for UdonSharp scripts used throughout the VRCTools packages.
section: start
nav_order: 1
keywords: [VRCTCommon, io.vrctools.common, utilities, networking]
---

The Common Library collects scripting helpers that several VRCTools packages need: a base class for reliably
synchronized behaviours and a handful of array and animator utilities. It contains no components you would place in a
scene yourself.

> You rarely install this package yourself. It is a dependency of [World Utilities]({{ site.baseurl }}/docs/world-utils/)
> and the [Event System]({{ site.baseurl }}/docs/event/) and is installed automatically by Creator Companion. It is
> documented here for script authors who want to build on the same foundations.
{: .note }

## Contents

| Type                                                                                     | Namespace                 | Purpose                                                              |
|------------------------------------------------------------------------------------------|---------------------------|----------------------------------------------------------------------|
| [`AbstractSynchronizedBehaviour`]({{ site.baseurl }}/docs/common/synchronized-behaviour/)     | `VRCTools.Common.Network` | Base class for manually synced behaviours with retries & late joiner support |
| [`ArrayUtils`]({{ site.baseurl }}/docs/common/utilities/#arrayutils)                           | `VRCTools.Common.Utils`   | Find, append and remove array elements in Udon                       |
| [`AnimatorUtilities`]({{ site.baseurl }}/docs/common/utilities/#animatorutilities)             | `VRCTools.Common.Utils`   | Resolve animator parameter names to ids                              |

## Using it from your scripts

All types live in the `VRCTools.Common` assembly definition. Scripts in the default `Assembly-CSharp` can use them right
away; scripts inside your own assembly definition need a reference to `VRCTools.Common`.

```csharp
using VRCTools.Common.Network;
using VRCTools.Common.Utils;
```

## Changelog

See the [release history]({{ site.baseurl }}/docs/common/changelog/).
