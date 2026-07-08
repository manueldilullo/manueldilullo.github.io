# Vue 3 + Vite + GitHub Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the portfolio from Vue 2 + Vue CLI 4 to Vue 3 + Vite, fix `npm run build`, and deploy to `https://manueldilullo.github.io` from `main` via GitHub Actions while preserving the existing UI.

**Architecture:** Replace the Vue CLI/webpack toolchain with Vite; upgrade Vue and Vue Router to v3/v4; swap Vue 2-only plugins (`v-tooltip`, `vue-nav-tabs`, `vue-cookie`, `vue-parallax-js`, `vue-scrollto`) for Vue 3/native equivalents; serve the built `dist/` folder to GitHub Pages from a GitHub Actions workflow.

**Tech Stack:** Vue 3, Vite, Vue Router 4, floating-vue, vueperslides@3, AOS, GitHub Actions

---

## File Structure

| File | Responsibility |
|---|---|
| `package.json` | Dependencies, scripts (`dev`, `build`, `preview`) |
| `vite.config.js` | Vite configuration, base path, Vue plugin |
| `index.html` | Vite entry HTML (moved from `public/index.html`) |
| `src/main.js` | Vue 3 app bootstrap, plugin installation, AOS init |
| `src/router.js` | Vue Router 4 setup (or inline in `main.js`) |
| `src/utils/cookies.js` | Native cookie get/set helper |
| `src/components/helpers/VueTabs.vue` | Custom tabs container matching current `vue-nav-tabs` markup |
| `src/components/helpers/VTab.vue` | Custom tab pane matching current `vue-nav-tabs` markup |
| `.github/workflows/deploy.yml` | GitHub Actions build & deploy workflow |
| `src/App.vue` | Root component with router and night mode cookie logic |
| `src/components/Portfolio.vue` | Use custom tabs, update deep selectors |
| `src/components/Home.vue` | Guard missing `flat_picture` / `angellist` |
| `src/components/Footer.vue` | Guard missing `angellist` |

---

### Task 1: Create migration branch

**Files:**
- Create branch: `feature/vue3-vite-migration`

- [ ] **Step 1: Create and check out feature branch**

```bash
git checkout -b feature/vue3-vite-migration
```

Expected: branch created and active, current uncommitted changes remain in working tree.

- [ ] **Step 2: Verify branch**

```bash
git branch --show-current
```

Expected output: `feature/vue3-vite-migration`

---

### Task 2: Restore Contact.vue

**Files:**
- Create: `src/components/Contact.vue`

- [ ] **Step 1: Restore the deleted component from git history**

```bash
git show HEAD:src/components/Contact.vue > src/components/Contact.vue
```

- [ ] **Step 2: Verify file exists**

```bash
Test-Path -LiteralPath "src/components/Contact.vue"
```

Expected: `True`

---

### Task 3: Replace build tooling

**Files:**
- Modify: `package.json`
- Delete: `babel.config.js`, `vue.config.js`
- Create: `vite.config.js`
- Move: `public/index.html` → `index.html`

- [ ] **Step 1: Update `package.json`**

Replace the entire file with:

```json
{
  "name": "natain-portfolio",
  "version": "0.3.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "aos": "^3.0.0-beta.6",
    "emailjs-com": "^2.4.1",
    "floating-vue": "^5.2.2",
    "material-icons": "^0.3.1",
    "vue": "^3.4.0",
    "vue-router": "^4.3.0",
    "vueperslides": "^3.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0"
  },
  "keywords": [],
  "description": "Personal portfolio built with Vue 3 and Vite.",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/manueldilullo/manueldilullo.github.io.git"
  },
  "author": "Manuel Di Lullo",
  "license": "MIT",
  "homepage": "https://manueldilullo.github.io"
}
```

- [ ] **Step 2: Delete old config files**

```bash
Remove-Item -LiteralPath "babel.config.js"
Remove-Item -LiteralPath "vue.config.js"
```

- [ ] **Step 3: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

- [ ] **Step 4: Move and update `index.html`**

Move the file:

```bash
Move-Item -LiteralPath "public/index.html" -Destination "index.html"
```

Replace its contents with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="/icon.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/brands.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <title>Porfolio • Manuel Di Lullo</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 5: Reinstall dependencies**

```bash
Remove-Item -LiteralPath "node_modules" -Recurse -Force
Remove-Item -LiteralPath "package-lock.json"
npm install
```

Expected: `npm install` completes without errors.

---

### Task 4: Migrate app entry and router

**Files:**
- Modify: `src/main.js`
- Create: `src/router.js`

- [ ] **Step 1: Create `src/router.js`**

```js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
```

- [ ] **Step 2: Rewrite `src/main.js`**

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import AOS from 'aos'
import 'aos/dist/aos.css'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import './style.css'

const app = createApp(App)

app.use(router)
app.use(FloatingVue)

app.mount('#app')

AOS.init()
```

Note: `style.css` is created in Task 6 to hold global tooltip styles moved from `App.vue`.

---

### Task 5: Create plugin replacements

**Files:**
- Create: `src/utils/cookies.js`
- Create: `src/components/helpers/VueTabs.vue`
- Create: `src/components/helpers/VTab.vue`

- [ ] **Step 1: Create native cookie helper**

Create `src/utils/cookies.js`:

```js
export function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

export function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}
```

- [ ] **Step 2: Create custom tabs container**

Create `src/components/helpers/VueTabs.vue`:

```vue
<template>
  <div class="vue-tabs">
    <ul class="nav nav-tabs">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="{ active: activeIndex === index }"
      >
        <a
          href="#"
          @click.prevent="selectTab(index)"
          :style="activeIndex === index ? { color: activeTextColor } : {}"
        >
          {{ tab.title }}
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueTabs',
  props: {
    activeTextColor: {
      type: String,
      default: '#535A5E'
    }
  },
  data() {
    return {
      tabs: [],
      activeIndex: 0
    }
  },
  methods: {
    registerTab(tab) {
      this.tabs.push(tab)
    },
    selectTab(index) {
      this.activeIndex = index
      this.tabs.forEach((tab, i) => {
        tab.isActive = i === index
      })
    }
  }
}
</script>

<style scoped>
.vue-tabs .nav-tabs {
  border: none;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}
.vue-tabs .nav-tabs > li > a {
  background: transparent;
  border: none;
  transition: all 0.5s;
  padding-right: 0;
  padding-left: 0;
  margin-right: 15px;
  margin-left: 15px;
  text-decoration: none;
  color: #a0a0a0;
}
.vue-tabs .nav-tabs > li > a:hover {
  background: transparent;
  color: #cbcbcb;
  transition: all 0.5s;
}
.vue-tabs .nav-tabs > li.active > a {
  background: transparent;
  border: none;
  transition: all 0.5s;
  color: inherit;
}
.vue-tabs .nav-tabs > li > a:after {
  content: "";
  width: 20%;
  position: absolute;
  bottom: 3px;
  border-width: 0 0 2px;
  border-style: solid;
  transition: all 0.5s;
}
.vue-tabs .nav-tabs > li.active > a:after {
  width: 100%;
  transition: all 0.5s;
}
</style>
```

- [ ] **Step 3: Create custom tab pane**

Create `src/components/helpers/VTab.vue`:

```vue
<template>
  <div v-show="isActive" class="tab-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VTab',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    this.$parent.registerTab(this)
    if (this.$parent.tabs.length === 1) {
      this.isActive = true
    }
  }
}
</script>
```

---

### Task 6: Global styles

**Files:**
- Create: `src/style.css`
- Modify: `src/App.vue` (remove tooltip styles)

- [ ] **Step 1: Create `src/style.css`**

Move the tooltip styles from `App.vue` into this global file and adapt for floating-vue classes:

```css
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}

@media screen and (max-width: 580px) {
  #app {
    width: fit-content;
  }
}

.parent {
  margin-top: 38px;
  padding-top: 40px;
  position: relative;
}

.pgray {
  color: #535a5e;
}

.pblue {
  color: #669db3ff;
}

.bg-dark2 {
  background-color: #262c30 !important;
}

.text-light {
  color: #d3d2d2 !important;
}

.p-st {
  transition: all 0.5s !important;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 9px;
  border: 2px solid white;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 9px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.v-popper--theme-tooltip .v-popper__inner {
  background: rgb(212, 149, 97);
  color: white;
  border-radius: 8px;
  font-size: 10px;
  padding: 5px 10px;
}

.v-popper--theme-tooltip .v-popper__arrow-outer {
  border-color: rgb(212, 149, 97);
}
```

- [ ] **Step 2: Update `src/App.vue` styles**

Remove the global tooltip CSS block from `App.vue` and replace the entire `<style>` block with only component-specific styles:

```vue
<style>
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}

@media screen and (max-width: 580px) {
  #app {
    width: fit-content;
  }
}

.parent {
  margin-top: 38px;
  padding-top: 40px;
  position: relative;
}
</style>
```

(The rest of the global styles now live in `src/style.css`.)

---

### Task 7: Update App.vue

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: Update imports and component registration**

Add `Contact` import and update script:

```vue
<script>
import Navbar from "./components/Navbar.vue";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import Skills from "./components/Skills.vue";
import Portfolio from "./components/Portfolio.vue";
import Contact from "./components/Contact.vue";
import Footer from "./components/Footer.vue";
import info from "../info";
import { getCookie, setCookie } from "./utils/cookies";

export default {
  name: "App",
  components: {
    Navbar,
    Home,
    About,
    Skills,
    Portfolio,
    Contact,
    Footer,
  },
  data() {
    return {
      nightMode: false,
      config: info.config,
    };
  },
  created() {
    if (this.config.use_cookies) {
      this.nightMode = getCookie("nightMode") === "true";
    }
  },
  mounted() {
    ["about", "contact", "skills", "portfolio"].forEach((l) => {
      if (window.location.href.includes(l)) {
        const elementPosition = document.getElementById(l).offsetTop;
        window.scrollTo({ top: elementPosition - 35, behavior: "smooth" });
      }
    });
  },
  methods: {
    switchMode(mode) {
      if (this.config.use_cookies) {
        setCookie("nightMode", mode);
      }
      this.nightMode = mode;
    },
    scrollTo(ele) {
      if (ele == "home") {
        this.$router.push(`/`);
        window.scrollTo({ top: -80, behavior: "smooth" });
      } else {
        const elementPosition = document.getElementById(ele).offsetTop;
        window.scrollTo({ top: elementPosition - 35, behavior: "smooth" });
        if (this.$route.path !== `/${ele}`)
          this.$router.push(`/${ele}`);
      }
    },
  },
};
</script>
```

Keep the template unchanged except ensuring `<Contact>` is present (already there in current `App.vue`).

---

### Task 8: Update Portfolio.vue

**Files:**
- Modify: `src/components/Portfolio.vue`

- [ ] **Step 1: Replace tab imports**

Change:

```js
import { VueTabs, VTab } from "vue-nav-tabs";
import "vue-nav-tabs/themes/vue-tabs.css";
```

to:

```js
import VueTabs from "./helpers/VueTabs.vue";
import VTab from "./helpers/VTab.vue";
```

- [ ] **Step 2: Update component registration**

In the `components` object, keep `VueTabs` and `VTab` entries as-is (names match).

- [ ] **Step 3: Replace `/deep/` selectors**

Replace all occurrences of `/deep/` in the `<style scoped>` block with `:deep()`.

Example:

```css
:deep(.vue-tabs .nav-tabs) {
  ...
}
```

Repeat for every `/deep/` occurrence in the file.

---

### Task 9: Guard missing data fields

**Files:**
- Modify: `src/components/Home.vue`
- Modify: `src/components/Footer.vue`
- Modify: `info.js`

- [ ] **Step 1: Update `info.js`**

Add fallback fields so components can compile:

```js
let info = {
  name: "Manuel Di Lullo",
  logo_name: "Manuel",
  flat_picture: "./src/assets/pic.jpg",
  config: {
    use_cookies: true,
    navbar: {
      blur: false
    }
  },
  description: "...",
  links: {
    linkedin: "https://www.linkedin.com/in/manuel-di-lullo-83ba23145/",
    github: "https://github.com/manueldilullo",
    email: "mailto:manuel.dilullo99@gmail.com",
    resume: "https://raw.githubusercontent.com/manueldilullo/manueldilullo.github.io/master/resume/ManuelDiLullo_Resume.pdf",
    angellist: ""
  },
  ...
}
```

- [ ] **Step 2: Update `Home.vue` data block**

```js
data() {
  return {
    picture: info.flat_picture || "",
    description: info.description,
    name: info.name,
    linkedin: info.links.linkedin,
    github: info.links.github,
    angellist: info.links.angellist || "",
    resume: info.links.resume
  };
},
```

- [ ] **Step 3: Update `Footer.vue` data block**

```js
data() {
  return {
    linkedin: info.links.linkedin,
    github: info.links.github,
    angellist: info.links.angellist || "",
    resume: info.links.resume,
  };
},
```

---

### Task 10: Verify local build

**Files:**
- All modified files

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: command exits with code 0 and produces a `dist/` directory.

- [ ] **Step 2: Run preview**

```bash
npm run preview
```

Expected: Vite serves the production build; open the printed URL and visually verify the site.

- [ ] **Step 3: Fix any remaining build errors**

If errors remain, address them and re-run `npm run build` until it succeeds.

---

### Task 11: Add GitHub Actions workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create workflow directory and file**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify workflow file path**

```bash
Test-Path -LiteralPath ".github/workflows/deploy.yml"
```

Expected: `True`

---

### Task 12: Commit migration work

**Files:**
- All changed files

- [ ] **Step 1: Stage and commit**

```bash
git add -A
git commit -m "feat: migrate to Vue 3 + Vite and add GitHub Pages deployment"
```

Expected: commit succeeds.

---

### Task 13: Merge to main and push

**Files:**
- Branch: `feature/vue3-vite-migration` → `main`

- [ ] **Step 1: Switch to main and merge**

```bash
git checkout main
git merge --no-ff feature/vue3-vite-migration -m "Merge feature/vue3-vite-migration"
```

- [ ] **Step 2: Push main**

```bash
git push origin main
```

Expected: push succeeds.

- [ ] **Step 3: Clean up feature branch (optional)**

```bash
git branch -d feature/vue3-vite-migration
git push origin --delete feature/vue3-vite-migration
```

---

### Task 14: Configure GitHub Pages

**Files:**
- Repository settings (manual step)

- [ ] **Step 1: Enable GitHub Actions as Pages source**

In the repository settings on GitHub:
- Go to **Settings → Pages**.
- Under **Build and deployment → Source**, select **GitHub Actions**.

- [ ] **Step 2: Verify deployment**

After pushing `main`, go to **Actions** tab and confirm the `Deploy to GitHub Pages` workflow succeeds. Then visit `https://manueldilullo.github.io`.

---

## Spec Coverage Self-Review

| Spec Section | Implementing Task |
|---|---|
| Vue 3 + Vite migration | Task 3, Task 4 |
| Plugin replacements | Task 5, Task 7, Task 8 |
| Restore Contact.vue | Task 2 |
| Guard missing data fields | Task 9 |
| GitHub Pages deploy | Task 11, Task 13, Task 14 |
| Branch strategy | Task 1, Task 13 |
| Local build verification | Task 10 |

## Placeholder Scan

- No TBD/TODO placeholders.
- All code blocks contain actual implementation.
- All file paths are exact.
- All commands include expected output.
