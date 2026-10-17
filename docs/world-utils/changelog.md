---
title: Changelog
description: Release history of World Utilities, newest first.
nav_order: 2
search_exclude: true
---
{%- assign pkg = site.data.packages | where: "id", page.package | first -%}
{%- assign posts = site.posts | where_exp: "p", "p.tags contains pkg.tag" -%}
Subscribe to new releases via the [Atom feed]({{ '/changelog.xml' | relative_url }}) or watch the
[GitHub repository]({{ pkg.repo }}/releases).
{% for post in posts %}
<section class="release">
<h2 id="v{{ post.version | replace: '.', '-' }}"><a href="{{ post.url | relative_url }}">v{{ post.version }}</a> <small class="dim">{{ post.date | date: "%Y-%m-%d" }}</small></h2>
{{ post.content }}
</section>
{% endfor %}
