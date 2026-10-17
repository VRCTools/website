---
title: Player
nav_title: Overview
description: Components reacting to players - interactions, teleports and trigger zones.
nav_order: 0
redirect_from:
  - /packages/world-utils/components/player/
---

Player components connect what players *do* to the rest of your world. Each of them can call Udon events on other
behaviours directly from the inspector - for example `_Toggle` on a [boolean value]({{ site.baseurl }}/docs/world-utils/values/boolean/)
or `_Apply` on a [preset]({{ site.baseurl }}/docs/world-utils/values/presets/) - and also emits its own events for scripts.

All player components are local: they react on the client where something happens and do not synchronize anything by
themselves. Point them at a *synchronized* value to share the result with everybody.

{% include section-index.html %}
