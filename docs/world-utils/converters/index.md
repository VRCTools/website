---
title: Converters
nav_title: Overview
description: Converters listen to one or more values and write a derived result into another value.
nav_order: 0
redirect_from:
  - /packages/world-utils/components/value/converters/
  - /packages/world-utils/components/local-value/converters/
  - /packages/world-utils/components/synchronized-value/converters/
---

A converter sits between values. Whenever one of its inputs changes, it recomputes its result and writes it into a
**target value**, which in turn notifies its own subscribers. Because the result is just another value, converters can
be chained and their output can be used by anything that accepts a value: applicators, UI, other converters or your
scripts.

<div class="diagram" markdown="1">
```text
[ Synchronized Boolean ] ─┐
  "owner enabled music"   ├─▶ [ Boolean Operation: AND ] ──▶ [ Local Boolean ] ──▶ [ Object Toggle ]
[ Persisted Boolean    ] ─┘                                     "music on"          Music Player
  "player wants music"
```
</div>

Most inputs offer three source **types**:

| Type           | Reads from                                                        |
|----------------|-------------------------------------------------------------------|
| `STATIC`       | a constant entered in the inspector                               |
| `LOCAL`        | a local value - persisted values work here too                    |
| `SYNCHRONIZED` | a synchronized value                                              |

> Write converter results into a **local** value whenever possible. Every client runs the converter itself, so a
> synchronized target would make every player fight over ownership of the same value.
{: .tip }

{% include section-index.html %}
