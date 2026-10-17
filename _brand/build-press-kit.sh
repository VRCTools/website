#!/usr/bin/env bash
# Builds assets/brand/vrctools-press-kit.zip from the brand assets and the files in this directory.
# Run from anywhere: ./_brand/build-press-kit.sh
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
brand="$root/assets/brand"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

kit="$work/vrctools-press-kit"
mkdir -p "$kit/social"
cp "$root/_brand/README.md" "$brand/guidelines.png" "$kit/"
cp -R "$brand/svg" "$brand/png" "$kit/"
cp "$brand/og-image.png" "$kit/social/vrctools-social-1200x630.png"

rm -f "$brand/vrctools-press-kit.zip"
(cd "$work" && zip -qr -X "$brand/vrctools-press-kit.zip" vrctools-press-kit)
echo "wrote $brand/vrctools-press-kit.zip ($(du -h "$brand/vrctools-press-kit.zip" | cut -f1))"
