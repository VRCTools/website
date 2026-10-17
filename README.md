# VRCTools Website

Source of [vrctools.io](https://vrctools.io) - the VRCTools website and documentation, built with [Jekyll](https://jekyllrb.com/).

## Quick start

```shell
bundle install
bundle exec jekyll serve --livereload
```

Open <http://localhost:4000>. Requires Ruby 3.1+ and Bundler.

## How it works

- **Content** is plain Markdown below `docs/` (published at `/docs/`). Folder = package & sidebar section (`_config.yml` → `defaults`), `nav_order` = position.
- **Packages** and their versions are listed in `_data/packages.yml`.
- **Changelog** entries are posts in `_posts/`, tagged with the package (`VRCTWorldUtils`, `VRCTEvent`).
- **Theme** is custom (no gem theme): `_layouts/`, `_includes/`, `_sass/`, `assets/js/site.js`.
- **Search** is a client side index generated at build time by `_plugins/search_index.rb`.
- **Plugins** (not limited to the GitHub Pages whitelist since we build in Actions): `jekyll-feed`,
  `jekyll-last-modified-at`, `jekyll-redirect-from`, `jekyll-seo-tag`, `jekyll-sitemap`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute in general and the
[documentation writing guide](docs/project/documentation.md) for front matter, component pages, callouts and
writing style, and
[`_brand/README.md`](_brand/README.md) for logo and color usage.

## Deployment

`.github/workflows/pages.yml` builds every push and pull request; pushes to `main` are deployed.

## License

Documentation is licensed under the Apache License, Version 2.0. VRChat is a trademark of VRChat Inc. Unity is a
trademark or registered trademark of Unity Technologies or its affiliates in the U.S. and elsewhere. This project is not
affiliated with VRChat Inc. or Unity Technologies.
