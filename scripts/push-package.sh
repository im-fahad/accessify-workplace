#!/usr/bin/env bash
# Sync packages/accessify changes to the standalone package repo (im-fahad/accessify).
set -e

PKG_DIR="$(cd "$(dirname "$0")/.." && pwd)/packages/accessify"
TMP_DIR="/tmp/accessify-pkg"
REMOTE="git@github.com:im-fahad/accessify.git"

echo "→ Syncing $PKG_DIR to $TMP_DIR"
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
cp -R "$PKG_DIR/." "$TMP_DIR/"
rm -rf "$TMP_DIR/node_modules" "$TMP_DIR/dist" "$TMP_DIR/.turbo"

if [ ! -f "$TMP_DIR/.gitignore" ]; then
  printf "node_modules\ndist\n.turbo\n*.log\n.DS_Store\n" > "$TMP_DIR/.gitignore"
fi

cd "$TMP_DIR"

if [ ! -d ".git" ]; then
  git init -b master
  git remote add origin "$REMOTE"
else
  git remote set-url origin "$REMOTE"
fi

git add -A

if git diff --cached --quiet; then
  echo "→ No changes to push"
  exit 0
fi

MSG="${1:-"sync: update package from monorepo"}"
git commit -m "$MSG

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push -u origin master
echo "→ Done. Pushed to $REMOTE"
