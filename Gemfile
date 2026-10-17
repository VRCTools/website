source "https://rubygems.org"

# The site is built by GitHub Actions (see .github/workflows/pages.yml), which means we are not limited to the
# plugins whitelisted by GitHub Pages. Run `bundle exec jekyll serve --livereload` to preview locally.
gem "jekyll", "~> 4.4"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"              # Atom feed of changelog posts
  gem "jekyll-last-modified-at", "~> 1.3"   # "Last updated" stamp based on git history
  gem "jekyll-redirect-from", "~> 0.16"     # Keeps links to the previous documentation structure working
  gem "jekyll-seo-tag", "~> 2.8"            # Meta tags, OpenGraph & JSON-LD
  gem "jekyll-sitemap", "~> 1.4"            # sitemap.xml
end

# Required by `jekyll serve` on Ruby 3.0+
gem "webrick", "~> 1.8"

# Windows and JRuby do not include zoneinfo files
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
gem "wdm", "~> 0.2", platforms: [:windows]
