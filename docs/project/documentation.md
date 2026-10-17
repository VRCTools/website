---
title: Writing Documentation
description: How these docs are built, how pages are structured and how to write and preview changes.
nav_exclude: true
---

This page covers the specifics of the website repository, which contains these docs. For bug reports, code contributions and our general
rules - including our policy on AI-generated contributions - see the [contribution guide]({{ site.baseurl }}/docs/project/contributing/).

Every page on this site is a Markdown file in the [{{ site.repository }}](https://github.com/{{ site.repository }})
repository. Spotted a mistake? Use the **Edit this page on GitHub** link at the bottom of any page and open a pull
request - no local setup required.

## Local preview

You need Ruby 3.1+ and Bundler.

```shell
$ git clone https://github.com/{{ site.repository }}.git && cd website
$ bundle install
$ bundle exec jekyll serve --livereload
```

The site is now available at `http://localhost:4000`. Pushes to `main` are built and deployed by GitHub Actions
(`.github/workflows/pages.yml`); pull requests are built (but not deployed) so broken pages are caught early.

## Where pages live

```text
.
├── _data/packages.yml        packages, versions & sidebar sections
├── _data/navigation.yml      sidebar links & the project/ section
├── _data/showcase.yml        worlds listed under "used by" on the landing page
├── _posts/                   changelog entries (one per release)
├── CONTRIBUTING.md           contribution guide (GitHub + /docs/project/contributing/)
└── docs/                     everything published below /docs/
    ├── getting-started.md
    ├── project/              writing guide, brand page, Discord rules
    └── world-utils/
        ├── index.md          package overview
        ├── concepts/         mental model, scripting & best practices
        ├── values/           one page per value type
        ├── converters/
        ├── applicators/
        ├── ui/
        ├── player/
        ├── utilities/
        └── guides/           task oriented walkthroughs
    (event/ and common/ follow the same pattern)
```

The folder a page lives in decides which package and sidebar section it belongs to (see `defaults` in
`_config.yml`). Within a section, pages are ordered by `nav_order`.

## Front matter

A regular page only needs a title and an order:

```yaml
---
title: Owner-only features
description: One sentence shown below the title and in search results.
nav_order: 30
---
```

| Key              | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `title`          | Page title, also used in the sidebar                                        |
| `nav_title`      | Optional shorter label for the sidebar                                      |
| `description`    | Lede shown below the title; used for search and social previews             |
| `nav_order`      | Sort order within the sidebar section (lower comes first)                   |
| `nav_exclude`    | Hide the page from the sidebar                                              |
| `keywords`       | Extra search terms, e.g. `[toggle, switch]`                                 |
| `redirect_from`  | Old URLs that should redirect to this page                                  |
| `edit_path`      | File opened by *Edit this page* when it differs from the page itself        |

### Component pages

Pages documenting Udon behaviours use `layout: component`, which renders version badges and a listing of the concrete
components (with their *Add Component* menu path, prefab and a link to the source):

```yaml
---
title: Boolean
layout: component
nav_order: 10
since: 0.1.0
kinds: [local, synchronized, persisted]
networked: true
components:
  - name: Local Boolean
    class: VRCTools.World.LocalValues.LocalBoolean
    menu: Local Values/Local Boolean
    prefab: Local Values/Local Boolean.prefab
    file: Runtime/UdonScripts/Local Values/LocalBoolean.cs
---
```

Please keep the body of component pages consistent: a short introduction, then `## Parameters`, `## Events`,
`## Functions` (each as a table, in this order and only when applicable), followed by `## Usage` and any caveats.

## Writing style

- Name inspector fields exactly as they appear in Unity (`Default Value`, `Restrict Value`)
- Refer to the Unity version with `{% raw %}{{ site.unity_version }}{% endraw %}` (set in `_config.yml`) instead of hard-coding it
- Use `code` for function names (`_Toggle()`), event constants (`EVENT_STATE_UPDATED`) and file paths
- Prefer short, task oriented sentences - readers are usually in the middle of building something
- Verify behaviour against the [source code](https://github.com/VRCTools) when in doubt

### Callouts

Add a class to a block quote to turn it into a callout:

```markdown
> Synchronized values transfer ownership to whoever changes them.
{: .note }
```

> `.note` for background information.
{: .note }

> `.tip` for shortcuts and best practice.
{: .tip }

> `.warning` for things that will bite you if ignored.
{: .warning }

> `.danger` for known issues in the current release.
{: .danger }

### Diagrams

Use plain text diagrams in a `text` code block wrapped in a `diagram` div:

~~~markdown
<div class="diagram" markdown="1">
```text
[ Local Float ] ──▶ [ Slider ]
```
</div>
~~~

## Changelog entries

Add a file to `_posts/` named `YYYY-MM-DD-<package tag>-<version without dots>.md`:

```yaml
---
title: VRCTWorldUtils v0.8.0
version: 0.8.0
package: world-utils
tags: [VRCTWorldUtils]
---

- Added ...
```

Remember to bump `version` in `_data/packages.yml` as well.

## Branding

Logo files live in `assets/brand/`; the usage guide and press kit build script live in `_brand/`. The interface icons
(including the theme aware logo used in the header) live in `assets/icons/` and are referenced with
`{% raw %}{% include icon.html name="github" %}{% endraw %}`. See also the public
[Brand & Press Kit]({{ site.baseurl }}/docs/project/brand/) page.
