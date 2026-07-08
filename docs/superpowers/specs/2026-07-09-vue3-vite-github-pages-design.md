# Portfolio Migration: Vue 3 + Vite + GitHub Pages

## Goal

Migrate the existing Vue 2 + Vue CLI 4 portfolio (`Template_Vuejs`) to a modern Vue 3 + Vite stack, fix `npm run build`, and deploy automatically to `https://manueldilullo.github.io` from the `main` branch via GitHub Actions. The visual appearance and behavior of the site must remain unchanged.

## Current State

- Vue 2.6 + `@vue/cli-service` 4.3
- `npm run build` fails with OpenSSL/Node 24 incompatibility (`ERR_OSSL_EVP_UNSUPPORTED`)
- Node 24.15.0 / npm 11.12.1
- `main` branch with uncommitted local changes
- Several Vue 2-only plugins in use

## Design Decisions

### Tooling

- **Build tool**: Vite replaces Vue CLI.
- **Framework**: Vue 3 (latest stable) replaces Vue 2.
- **Router**: Vue Router 4.
- **Node target**: Node 20 in CI for stability; local development may use Node 24 with Vite (no OpenSSL issue).

### Plugin Replacements

| Old (Vue 2) | New (Vue 3 / native) | Rationale |
|---|---|---|
| `v-tooltip` | `floating-vue` | Official Vue 3 successor; keeps `v-tooltip` directive syntax. |
| `vue-nav-tabs` | Custom `<VueTabs>` / `<VTab>` components | No maintained Vue 3 port; custom implementation preserves exact styling. |
| `vue-parallax-js` | Removed / native CSS | Not visibly used; native CSS can cover the effect if needed. |
| `vue-scrollto` | Removed | Native `window.scrollTo` is already used throughout the app. |
| `vue-cookie` | Native cookie helper | Avoids a Vue 2-only dependency; trivial wrapper around `document.cookie`. |
| `vue-router@3` | `vue-router@4` | Required for Vue 3. |
| `vueperslides` | `vueperslides@3` | Supports Vue 3 natively. |

### Component/Code Changes

- `main.js`: migrate from `new Vue(...)` to `createApp(App)` and install plugins via `.use()`.
- `App.vue`: replace `$router.history.current.path` with `$route.path`; use native cookie helper instead of `this.$cookie`.
- `Portfolio.vue`: swap `vue-nav-tabs` imports for custom tab components; replace `/deep/` selectors with `:deep()`.
- `Home.vue` / `Footer.vue`: add safe fallbacks for `info.flat_picture` and `info.links.angellist`.
- `Contact.vue`: restore from git history and keep in `App.vue`.

### Data/Content Fixes

The working tree currently references data fields and a component that do not exist:

- `Contact.vue` was deleted but is still imported in `App.vue` — restore from git history.
- `info.js` lacks `flat_picture` and `links.angellist` — add safe fallbacks/defaults so the build succeeds without changing design intent.

### GitHub Pages Deployment & Branch Strategy

- `main` is the source branch.
- Feature work happens in short-lived feature branches that merge into `main` via pull request.
- `.github/workflows/deploy.yml` triggers on every push to `main`:
  1. Checkout source.
  2. Setup Node 20.
  3. `npm ci`
  4. `npm run build`
  5. Upload `dist/` artifact.
  6. Deploy to GitHub Pages using `actions/deploy-pages`.
- `vite.config.js` uses `base: '/'` because the site is served at the root of `manueldilullo.github.io`.
- Repository Pages settings must use “GitHub Actions” as the source.

## Verification

- `npm install` completes without errors.
- `npm run build` exits 0 and produces a `dist/` folder.
- `npm run preview` serves the production build locally.
- Pushing to `main` triggers a successful GitHub Actions run and the site is live at `https://manueldilullo.github.io`.
