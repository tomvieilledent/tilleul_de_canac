#!/usr/bin/env bash
# Régénère les dérivés des photos : public/photos/tcN.jpg -> tcN-{400,800,1024}.webp
# + recompression du JPEG de repli (max 1024 px).
# Prérequis : cwebp (libwebp) et magick (ImageMagick).
set -euo pipefail

DIR="$(cd "$(dirname "$0")/../public/photos" && pwd)"
WIDTHS=(400 800 1024)

command -v cwebp >/dev/null || { echo "cwebp introuvable (brew install webp)"; exit 1; }
command -v magick >/dev/null || { echo "magick introuvable (brew install imagemagick)"; exit 1; }

shopt -s nullglob
for src in "$DIR"/tc[0-9]*.jpg; do
  base="$(basename "${src%.jpg}")"
  # ignore les fichiers déjà dérivés (tcN-800.jpg par ex.)
  [[ "$base" == *-* ]] && continue
  for w in "${WIDTHS[@]}"; do
    cwebp -quiet -q 72 -m 6 -resize "$w" 0 "$src" -o "$DIR/${base}-${w}.webp"
  done
  magick "$src" -resize '1024x1024>' -strip -quality 74 -interlace Plane "$DIR/.tmp.jpg"
  mv "$DIR/.tmp.jpg" "$src"
  echo "ok  $base"
done
