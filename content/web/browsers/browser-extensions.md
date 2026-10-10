---
title: "Browser Extensions"
summary: "Add-ons that change browser behavior, and how they can break your site."
levels: { frontend: mid-level }
aliases: ["browser extensions", "extensions", "web extensions"]
prereqs: ["javascript-engine", "same-origin-policy"]
related: ["content-security-policy", "service-worker", "same-origin-policy"]
---

**Browser extensions** customise the browser: blockers, password managers, devtools, integrations. They run with elevated **permissions** — reading page content, intercepting requests, storing data — declared in a manifest and granted at install. That privilege is the whole story: an extension sees everything its permissions cover, across every site matching them.

```text
manifest: name, permissions [tabs, storage, host access…]
contexts: background/service worker, content scripts, popup UI
```

The extension model differs by browser in details (manifest versions, API namespaces) but shares the shape: least-privilege permissions, review processes, and content scripts isolated from page scripts yet able to read the DOM.

The classic mistakes:

- Overbroad permissions. "Read and change all your data on all websites" for a theme extension is a standing compromise of every account. Request the minimum, scoped to the sites needed.
- Trusting extensions implicitly. A malicious or sold extension with broad host permissions is a keylogger with a logo. Audit what's installed, especially in organisations.
- Content-script collisions. Extensions mutating shared pages break each other and the page — namespaces, defensive checks, no globals.
- Manifest migration lag. Manifest versions deprecate background pages and blocking APIs; extensions that ignore migration windows die on update day. Track the platform roadmap.
- Storing secrets in extension storage. Sync storage and local extension data aren't vaults; tokens there need the same care as anywhere client-side.
- Assuming review equals safety. Store review catches classes of abuse, not all of it — delayed malicious updates are a known pattern. Permissions remain the real boundary.
- Enterprise blind spots. Unmanaged extension installs in a company bypass DLP and policy. Manage allowlists for sensitive environments.

**The posture:** extensions are installed software with sweeping access — grant minimally, audit regularly, and build them with the same least-privilege discipline as any privileged code.
