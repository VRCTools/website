---
title: Documentation
description: Guides and reference for all VRCTools packages.
nav_exclude: true
---

New here? Start with **[Getting Started]({{ site.baseurl }}/docs/getting-started/)** to add the VRCTools package
repository and install your first package.

## Packages

<ul class="cards">
{%- for pkg in site.data.packages %}
  <li><a href="{{ pkg.path | relative_url }}"><strong>{{ pkg.name }}</strong><span>{{ pkg.summary }}</span></a></li>
{%- endfor %}
</ul>

## Popular pages

<ul class="cards">
  <li><a href="{{ site.baseurl }}/docs/world-utils/concepts/values/"><strong>Values</strong><span>The building block every World Utilities component is wired to.</span></a></li>
  <li><a href="{{ site.baseurl }}/docs/world-utils/concepts/best-practices/"><strong>Best practices</strong><span>Organize, name and wire values the right way.</span></a></li>
  <li><a href="{{ site.baseurl }}/docs/world-utils/guides/settings-menu/"><strong>Build a settings menu</strong><span>A complete walkthrough using prefabs.</span></a></li>
</ul>

## Get involved

Questions? Ask on [Discord]({{ site.discord_url }}). Found a mistake in these docs? Every page has an *Edit this page*
link - see [Contributing]({{ site.baseurl }}/docs/project/contributing/).
