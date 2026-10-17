---
title: Applicators
nav_title: Overview
description: Applicators take the state of one or more values and apply it to your world.
nav_order: 0
redirect_from:
  - /packages/world-utils/components/value/applicators/
  - /packages/world-utils/components/local-value/applicators/
  - /packages/world-utils/components/synchronized-value/applicators/
---

Applicators are the last link in the chain: they subscribe to values and push the state into Unity - activating
objects, setting shader properties, driving animators or calling your own Udon events. Every applicator re-applies
the current state shortly after start-up, so the world always matches the values' initial state.

| Applicator                                                                          | Value types                                   | Kinds                       |
|-------------------------------------------------------------------------------------|-----------------------------------------------|-----------------------------|
| [Object Toggle]({{ site.baseurl }}/docs/world-utils/applicators/object-toggle/)           | Boolean                                       | local, synchronized         |
| [Material Swap]({{ site.baseurl }}/docs/world-utils/applicators/material-swap/)           | Boolean                                       | local, synchronized         |
| [Boolean Event]({{ site.baseurl }}/docs/world-utils/applicators/boolean-event/)           | Boolean                                       | local, synchronized         |
| [Material Property]({{ site.baseurl }}/docs/world-utils/applicators/material-property/)   | Boolean, Color, Float, Int, Vector3, Texture2D | separate local & synced component |
| [Animator Parameter]({{ site.baseurl }}/docs/world-utils/applicators/animator-parameter/) | Boolean, Float, Int                           | separate local & synced component |
| [Raw Image]({{ site.baseurl }}/docs/world-utils/applicators/raw-image/)                   | Texture2D                                     | local                       |

Wherever a *local* value is accepted, a *persisted* value works as well.

{% include section-index.html %}
