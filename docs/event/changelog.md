---
title: Changelog
description: Release history of the Event System, newest first.
nav_order: 2
search_exclude: true
---
{%- assign pkg = site.data.packages | where: "id", page.package | first -%}
{%- assign posts = site.posts | where_exp: "p", "p.tags contains pkg.tag" -%}
{% for post in posts %}
<section class="release">
<h2 id="v{{ post.version | replace: '.', '-' }}"><a href="{{ post.url | relative_url }}">v{{ post.version }}</a> <small class="dim">{{ post.date | date: "%Y-%m-%d" }}</small></h2>
{{ post.content }}
</section>
{% endfor %}
