---
title: "Dev Server"
summary: "A local server that rebuilds as you edit."
levels: { backend: junior, frontend: junior }
aliases: ["development server"]
prereqs: ["node-modules"]
related: ["hot-module-replacement", "vite", "static-assets", "bundle-size"]
---

A dev server is a program that runs on your own machine while you work. It serves your project at a local address, watches your files, and rebuilds or refreshes what it serves when you save a change. For many frontend projects you start one with a command such as `npm run dev`.

```sh
npm run dev   # serves the app locally and reloads it when files change
```

Backend frameworks have the same idea. Django's `runserver` restarts itself when your Python files change, so you see the effect of an edit without stopping and starting the process by hand.

The dev server is built for convenience, not for real users. It usually sends unoptimized code, and it is not hardened for internet traffic. The classic mistake is deploying what the dev server serves, or running it on a network where other people can reach it. Build the production files with your build step, serve those, and check what address the dev server listens on before you share it. See [Vite](/t/vite) for a common example, and [hot module replacement](/t/hot-module-replacement) for how changes reach the page without a full reload.
