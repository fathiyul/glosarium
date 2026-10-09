---
title: "Bundler"
summary: "A tool that combines modules into files browsers can load, like Vite, webpack or esbuild."
levels: { frontend: junior }
aliases: ["module bundler", "Vite", "webpack", "esbuild", "Rollup", "Parcel"]
prereqs: ["js-modules", "package-manager"]
related: ["vite", "webpack", "source-map", "tree-shaking", "code-splitting", "minification", "hot-module-replacement"]
core: [frontend]
---

A **bundler** takes your source code, with its many files, imports, TypeScript, JSX, CSS and images, and
produces optimized files the browser can load. Well-known ones: **Vite**, **webpack**, **esbuild**,
**Rollup**, **Parcel**.

Your project might have hundreds of modules and a hundred npm packages. Shipping those as-is would mean hundreds of
requests and code browsers can't run (TypeScript, JSX). A bundler works out what depends on what, and builds output
that's small and fast.

## What a bundler does

- **Follows imports** from your entry file and bundles the modules into a few files ([ES modules](/t/js-modules)).
- **Transforms code**: TypeScript and JSX to JavaScript, newer syntax to what your target browsers
  support ([Babel/SWC](/t/babel-swc)).
- **Minifies** to reduce size ([minification](/t/minification)).
- **Tree-shakes**: drops exports nobody uses ([tree shaking](/t/tree-shaking)).
- **Splits code** into chunks loaded on demand ([code splitting](/t/code-splitting)).
- **Handles assets**: CSS, images, fonts, with hashed file names for long-term caching
  ([asset hashing](/t/asset-hashing)).
- **Generates [source maps](/t/source-map)** so you can debug the original code.
- **Replaces build-time variables** ([frontend env vars](/t/frontend-env-vars)).

## In development and production

In development, a **dev server** with [hot module replacement](/t/hot-module-replacement) updates the page as you edit,
in milliseconds. For production, you run a build command (`npm run build`) that writes the optimized output
(often to `dist/`).

```sh
npm run dev      # start the dev server
npm run build    # produce the production bundle
```

## Practical points

- Frameworks and meta-frameworks usually configure the bundler for you. You often don't touch it directly.
- A bigger bundle means slower loading, so watch its size ([bundle size](/t/bundle-size)).
- Don't commit the output (add `dist/` to [.gitignore](/t/gitignore)).
- Bundlers aren't magic: debugging a failed build starts with reading the error message and the
  file it names.
