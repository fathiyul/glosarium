---
title: "Progressive Web App"
summary: "A web app that can be installed and used offline like a native one."
levels: { frontend: mid-level }
aliases: ["progressive web app", "pwa", "installable web app"]
prereqs: ["service-worker", "https"]
related: ["service-worker", "indexeddb", "push-notifications"]
---

A **Progressive Web App (PWA)** is a website with app capabilities: installable (manifest with icons, name, display mode), offline-capable (service worker caching shell and data), and re-engageable (push notifications) — served over HTTPS with a registered worker meeting the installability criteria.

```text
manifest (identity) + service worker (offline) + HTTPS → installable, resilient
```

Installation adds a home-screen icon and standalone window without app stores; offline-first caching makes flaky networks survivable; push re-engages. Capabilities (file handling, sharing, device APIs) keep expanding the "progressive" envelope toward native parity.

The classic mistakes:

- Manifest-only "PWA." An install prompt with no offline story installs a bookmark that fails without network. Offline function is the substance; installability is packaging.
- Caching without strategy. Precaching everything bloats installs; caching nothing fails offline. Shell + runtime data with versioned invalidation (see [service worker](/t/service-worker)).
- Ignoring iOS gaps. Platform support differs (installation flows, push, background capabilities) — test the actual devices, design fallbacks, track convergence.
- App-store thinking. PWAs update on deploy (no review lag) but discover through the web (no store placement). Distribution and update models differ — plan both.
- Permission spam. Prompting notifications and installation on first paint burns trust. Earn placement: value first, prompts at meaningful moments.
- Offline as error page. A network-error fallback isn't an offline experience. Design cached content, queued actions and sync states as features.
- Assuming native parity. Hardware, background execution and OS integration still favour native for demanding cases. Choose PWA where web strengths (reach, linkability, instant updates) dominate.

**When to build one:** reach-first apps needing resilience and re-engagement without store friction. Manifest, worker, offline design, honest capability assessment — the web, progressively app-shaped.
