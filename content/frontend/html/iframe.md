---
title: "iframe"
summary: "Embedding one page inside another."
levels: { frontend: mid-level }
aliases: ["iframe", "inline frame", "embedding"]
prereqs: ["html", "same-origin-policy"]
related: ["same-origin-policy", "content-security-policy", "xss"]
---

An **iframe** embeds a whole separate page inside yours: third-party widgets, videos, maps, payment forms, legacy apps. The embedded page runs isolated — its own DOM, scripts and storage, governed by the **same-origin policy** — communicating with the parent only via `postMessage` (cross-origin) or direct DOM (same-origin).

```html
<iframe src="https://player.example/v/42" sandbox="allow-scripts allow-same-origin"
        loading="lazy" title="Product video"></iframe>
```

Isolation is the point (untrusted content can't touch your DOM) and the pain (sizing, styling, focus and performance all cross a boundary). The `sandbox` attribute tightens further, stripping capabilities unless explicitly re-granted.

The classic mistakes:

- Unsandboxed third-party iframes. An embedded page with full permissions and no sandbox runs scripts with access to its origin's storage and can navigate the top window (frame-busting in reverse: clickjacking your users). Sandbox by default, allow minimally.
- No `title`. Screen readers announce iframes by title; without one, embedded content is an unlabelled hole. Always label.
- postMessage without origin checks. Accepting messages from `*` lets any embedded or embedding page drive your handlers. Verify `event.origin` on receipt and specify target origins on send.
- Sizing hacks. Fixed heights clip content or leave voids; cross-origin auto-resize needs cooperating scripts. Design embeds with intrinsic ratios or explicit sizes.
- Performance blindness. Each iframe is a full document — its own scripts, rendering and network. A page of embeds loads like many pages. Lazy-load offscreen ones.
- Clickjacking exposure. Your own sensitive pages embeddable anywhere invite UI-redress attacks. Send `X-Frame-Options`/`frame-ancestors` to control who may embed you.
- Assuming seamless UX. Focus crossing, find-in-page, print and back-button all behave oddly across frame boundaries. Embed deliberately, not casually.

**How to use it:** sandbox tightly, title always, verify message origins, lazy-load, and control your own embeddability. Isolation makes iframes safe-ish; every attribute you skip makes them less so.
