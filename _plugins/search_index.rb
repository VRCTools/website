# frozen_string_literal: true

# Builds /search.json from the *rendered* output of every page and changelog post so that search results never contain
# raw Liquid or Markdown. Pages can opt out using `search_exclude: true` and provide extra terms via `keywords: [...]`.
require "json"
require "cgi"

module VRCTools
  module SearchIndex
    BODY_PATTERN = %r{<div class="doc-body">(.*?)</div>\s*<footer class="doc-footer">}m

    module_function

    def text_of(html)
      body = html[BODY_PATTERN, 1] || html
      body = body.gsub(%r{<(script|style)[^>]*>.*?</\1>}m, " ")
      # ASCII diagrams make for poor search snippets
      body = body.gsub(%r{<div class="diagram">.*?</pre>\s*</div>\s*</div>\s*</div>}m, " ")
      CGI.unescapeHTML(body.gsub(/<[^>]+>/, " ")).gsub(/\s+/, " ").strip
    end

    def section_for(site, doc)
      return "changelog" if doc.respond_to?(:collection) && doc.collection&.label == "posts"

      pkg = (site.data["packages"] || []).find { |p| p["id"] == doc.data["package"] }
      return "vrctools" unless pkg

      sec = (pkg["sections"] || []).find { |s| s["id"] == doc.data["section"] }
      sec && sec["id"] != "start" ? "#{pkg['id']} / #{sec['title'].downcase}" : pkg["id"]
    end

    def entries(site)
      docs = site.pages.select { |p| p.output_ext == ".html" } + site.posts.docs
      docs.filter_map do |doc|
        next if doc.data["title"].to_s.empty? || doc.data["search_exclude"] || doc.data["redirect_to"]
        next if doc.output.nil?

        {
          "title" => doc.data["title"],
          "url" => "#{site.baseurl}#{doc.url}",
          "section" => section_for(site, doc),
          "keywords" => [Array(doc.data["keywords"]).join(" "), doc.data["description"]].compact.join(" ").strip,
          "content" => text_of(doc.output)[0, 6000]
        }
      end
    end
  end
end

Jekyll::Hooks.register :site, :post_write do |site|
  path = File.join(site.dest, "search.json")
  File.write(path, JSON.generate(VRCTools::SearchIndex.entries(site)))
end
