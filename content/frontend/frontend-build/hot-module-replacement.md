---
title: "Hot Module Replacement"
summary: "Swapping changed modules into the running app without a reload."
levels: { frontend: junior }
aliases: ["HMR"]
prereqs: ["dev-server"]
related: ["dev-server", "vite", "component-state"]
---

Hot module replacement (HMR) is a feature of a [dev server](/t/dev-server). When you edit a file, the changed code is sent into the running app, and only that part is updated. The page doesn't reload from scratch.

The benefit shows up when you're working on a screen. Suppose you've filled in a form and are tweaking its styling. With HMR, the form can keep what you typed while the new styles appear. Without it, every save would reset the page and you'd retype everything.

The classic mistake is assuming state always survives an update. HMR depends on the tool and the framework. When a change can't be applied safely in place, the tool falls back to a full reload, and the state in memory is lost. You won't always know from the code alone which case you're in, so check the terminal and the browser console when something resets unexpectedly.

HMR is a development-only feature. Production builds don't include it, so don't test state-preservation rules only in development. See [Vite](/t/vite), which provides HMR in its dev server.
