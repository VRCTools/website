---
title: Common Library
nav_title: Overview
description: >-
  `io.vrctools.common` - shared building blocks for UdonSharp scripts used throughout the VRCTools packages.
section: start
nav_order: 1
keywords: [VRCTCommon, io.vrctools.common, utilities, networking, logging, ownership, attributes]
---

The Common Library collects scripting helpers that several VRCTools packages need: a base class for reliably
synchronized behaviours, logging and ownership helpers, a handful of array and animator utilities and attributes which
the editor checks for common scripting mistakes. It contains no components you would place in a scene yourself.

> You rarely install this package yourself. It is a dependency of [World Utilities]({{ site.baseurl }}/docs/world-utils/)
> and the [Event System]({{ site.baseurl }}/docs/event/) and is installed automatically by Creator Companion. It is
> documented here for script authors who want to build on the same foundations.
{: .note }

## Requirements

| Package             | Version   | Description       |
|---------------------|-----------|-------------------|
| `com.vrchat.worlds` | `^3.8.1`  | VRChat Worlds SDK |

Before v0.3.1, VRChat Worlds SDK 3.7.0 or newer is sufficient.

## Contents

| Type                                                                                     | Namespace                    | Purpose                                                              |
|------------------------------------------------------------------------------------------|------------------------------|----------------------------------------------------------------------|
| [`AbstractSynchronizedBehaviour`]({{ site.baseurl }}/docs/common/synchronized-behaviour/)     | `VRCTools.Common.Network`    | Base class for manually synced behaviours with retries & late joiner support |
| [`UdonDebug`]({{ site.baseurl }}/docs/common/utilities/#udondebug)                             | `VRCTools.Common.Utils`      | Log messages prefixed with the behaviour that wrote them             |
| [`GameObjectExtensions`, `UdonSharpBehaviourExtensions`]({{ site.baseurl }}/docs/common/utilities/#ownership-extensions) | `VRCTools.Common.Utils` | Check, set and take ownership                     |
| [`ArrayUtils`]({{ site.baseurl }}/docs/common/utilities/#arrayutils)                           | `VRCTools.Common.Utils`      | Find, append and remove array elements in Udon                       |
| [`AnimatorUtilities`]({{ site.baseurl }}/docs/common/utilities/#animatorutilities)             | `VRCTools.Common.Utils`      | Resolve animator parameter names to ids                              |
| [`[EventHook]`, `[MustCallBase]`, `[CustomEvent]`, `[NetworkEvent]`]({{ site.baseurl }}/docs/common/attributes/) | `VRCTools.Common.Attributes` | Document intent; checked by the editor |

## Using it from your scripts

All types live in the `VRCTools.Common` assembly definition. Scripts in the default `Assembly-CSharp` can use them right
away; scripts inside your own assembly definition need a reference to `VRCTools.Common`.

```csharp
using VRCTools.Common.Attributes;
using VRCTools.Common.Network;
using VRCTools.Common.Utils;
```

The [attribute checks]({{ site.baseurl }}/docs/common/attributes/#editor-validation) live in the editor only
`VRCTools.Common.Editor` assembly. You do not need to reference it - it runs on its own.

## Changelog

See the [release history]({{ site.baseurl }}/docs/common/changelog/).
