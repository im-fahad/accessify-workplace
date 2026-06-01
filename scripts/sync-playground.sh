#!/usr/bin/env bash
# Sync playground/vercel/ to the standalone accessify-playground repo.
# Bumps the @glitchlab/accessify dep to the version in packages/accessify/package.json,
# then force-pushes to git@github.com:im-fahad/accessify-playground.git so Vercel redeploys.
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PG_DIR="$ROOT/playground/vercel"
TMP_DIR="/tmp/accessify-playground"
REMOTE="git@github.com:im-fahad/accessify-playground.git"

VERSION="$(node -p "require('$ROOT/packages/accessify/package.json').version")"
echo "→ Targeting @glitchlab/accessify@^$VERSION"

# Update the dep in playground/vercel/package.json
node -e "
  const fs = require('fs');
  const p = '$PG_DIR/package.json';
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  j.dependencies['@glitchlab/accessify'] = '^$VERSION';
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
"

echo "→ Syncing $PG_DIR to $TMP_DIR"
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
cp -R "$PG_DIR/app" "$PG_DIR/public" "$TMP_DIR/"
cp "$PG_DIR/package.json" "$PG_DIR/tsconfig.json" "$PG_DIR/next.config.js" "$PG_DIR/next-env.d.ts" "$TMP_DIR/"

cat > "$TMP_DIR/.gitignore" <<'EOF'
node_modules
.next
out
build
.DS_Store
*.log
.env*.local
.env
.vercel
*.tsbuildinfo
EOF

# Restore the dev port to 3000 for the public-facing repo
node -e "
  const fs = require('fs');
  const p = '$TMP_DIR/package.json';
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  j.scripts.dev = 'next dev';
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
"

cd "$TMP_DIR"
git init -b master >/dev/null
git remote add origin "$REMOTE"
git add .
MSG="${1:-"sync: refresh playground for v$VERSION"}"
git -c user.email="abdullahalfahad.bd@gmail.com" -c user.name="im-fahad" commit -m "$MSG

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>" >/dev/null
git push -f origin master
echo "→ Pushed v$VERSION to $REMOTE — Vercel will redeploy"
