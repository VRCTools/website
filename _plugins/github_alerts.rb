# frozen_string_literal: true

# Renders GitHub style alerts (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`) as the
# site's callouts. This keeps files like CONTRIBUTING.md readable on GitHub *and* on the website.
module VRCTools
  module GitHubAlerts
    PATTERN = %r{<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(?:<br\s*/?>)?\s*}i

    def self.convert(html)
      html.gsub(PATTERN) { %(<blockquote class="#{Regexp.last_match(1).downcase}">\n  <p>) }
    end
  end
end

Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
  next unless doc.output_ext == ".html" && doc.output&.include?("[!")

  doc.output = VRCTools::GitHubAlerts.convert(doc.output)
end
