# Accessify — Monorepo

Source for [`@glitchlab/accessify`](https://www.npmjs.com/package/@glitchlab/accessify) — a lightweight, framework-agnostic accessibility widget for the web with first-class React, Vue 3, and Svelte bindings.

🔗 **Live demo:** https://accessify-playground.vercel.app
📦 **Package README:** [`packages/accessify/README.md`](./packages/accessify/README.md) — full API docs, all examples, every config option

---

## Repo structure

```
accessify/
├── packages/
│   └── accessify/         # @glitchlab/accessify — the published package
├── playground/
│   ├── nextjs/            # Local playground — uses workspace:* (test unpublished changes)
│   └── vercel/            # Live demo source — uses npm dep, mirrored to a public repo
├── scripts/
│   ├── push-package.sh    # Syncs packages/accessify → im-fahad/accessify (public source repo)
│   └── sync-playground.sh # Syncs playground/vercel → im-fahad/accessify-playground (Vercel deploys)
└── .vscode/
    └── launch.json        # Debug configs for both playgrounds + package watcher
```

---

## Why two playgrounds?

| | `playground/nextjs` | `playground/vercel` |
|---|---|---|
| Purpose | Test unpublished changes | Public live demo |
| Package source | `workspace:*` (symlinked) | `^0.2.2` from npm |
| In pnpm workspace? | Yes | No (excluded) |
| Install | `pnpm install` (root) | `cd playground/vercel && npm install` |
| Dev port | 3000 | 3001 |

When you edit the package, `playground/nextjs` picks up the next `pnpm --filter @glitchlab/accessify build`. `playground/vercel` only sees what's published to npm — exactly what end users get.

---

## Setup

```bash
pnpm install
```

This installs root deps, the package, and the local playground. The vercel playground installs separately:

```bash
cd playground/vercel && npm install
```

---

## Daily workflow

**Editing the package:**

```bash
# Terminal 1 — package watch build
pnpm --filter @glitchlab/accessify dev

# Terminal 2 — local playground
cd playground/nextjs && pnpm dev   # http://localhost:3000
```

VSCode shortcut: run the **Dev: Local + Package Watch** compound launch config.

**Testing:**

```bash
pnpm --filter @glitchlab/accessify test          # one-shot
pnpm --filter @glitchlab/accessify test:watch    # watch mode
pnpm --filter @glitchlab/accessify test:coverage # with v8 coverage
```

**Checking the live playground locally** (e.g. before publishing):

```bash
cd playground/vercel && npm run dev   # http://localhost:3001
```

---

## Release flow

After local testing in `playground/nextjs/` looks good:

1. **Bump version** in `packages/accessify/package.json`
2. **Build** — `pnpm --filter @glitchlab/accessify build`
3. **Publish** — `cd packages/accessify && npm publish --access public`
4. **Sync source repo** — `bash scripts/push-package.sh "release: vX.Y.Z"`
   (force-pushes `packages/accessify/` content to `im-fahad/accessify`)
5. **Sync live playground** — `bash scripts/sync-playground.sh "sync: vX.Y.Z"`
   (bumps `playground/vercel/package.json` to the new version, force-pushes to `im-fahad/accessify-playground`, Vercel auto-redeploys)
6. **Commit + push** the monorepo to record the version bump

Steps 4–5 use force-push because the standalone repos are pure mirrors of `packages/accessify/` and `playground/vercel/` respectively — they have no independent history.

---

## Remotes

| Repo | What it is |
|---|---|
| [im-fahad/accessify-workplace](https://github.com/im-fahad/accessify-workplace) | This monorepo (`origin/master`) |
| [im-fahad/accessify](https://github.com/im-fahad/accessify) | Public source repo for the npm package — mirror of `packages/accessify/` |
| [im-fahad/accessify-playground](https://github.com/im-fahad/accessify-playground) | Vercel deployment repo — mirror of `playground/vercel/` |

---

## License

MIT © [GlitchLab](https://github.com/im-fahad)
