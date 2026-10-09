---
title: "localStorage"
summary: "Simple, persistent key-value storage in the browser."
levels: { frontend: junior }
aliases: ["localStorage", "Web Storage", "window.localStorage"]
prereqs: ["dom", "browser-storage"]
related: ["session-storage", "browser-storage", "indexeddb", "same-origin-policy", "cookie"]
core: [frontend]
---

`localStorage` is a small key-value store built into the browser. Data you save stays after the
tab is closed, and is still there next time the user visits.

```js
localStorage.setItem("theme", "dark");
localStorage.getItem("theme");        // "dark"
localStorage.removeItem("theme");
localStorage.clear();                 // remove everything for this origin
```

## What to know

- **Strings only.** Convert other values yourself:

```js
localStorage.setItem("cart", JSON.stringify({ items: [7, 9] }));
const cart = JSON.parse(localStorage.getItem("cart") ?? "{}");
```

- **Per origin.** `https://a.example.com` and `https://b.example.com` have separate storage (see
  [same-origin policy](/t/same-origin-policy)).
- **No expiry.** It stays until your code or the user clears it.
- **Small.** Browsers allow a few megabytes per origin; the exact limit varies.
- **Synchronous.** Reads and writes block the main thread, so don't store or loop over big data.
- **Visible to the user and to any script on your page.** Treat it as untrusted: don't rely on it for
  security, and **don't store secrets** such as passwords or long-lived tokens. Any
  script injected into the page (XSS) can read them.
- **It can fail.** Writes may throw when the quota is full, or when the browser blocks storage
  (some private modes). Wrap access in `try/catch` and have a fallback.

## Good uses

UI preferences (theme, language), unsent form drafts, "don't show this tip again" flags. Things where
losing the data is a minor annoyance.

## Alternatives

| Need | Use |
|---|---|
| Data for one tab only | `sessionStorage` ([session storage](/t/session-storage)) |
| Sent automatically to the server | Cookies |
| Large or structured data, offline apps | [IndexedDB](/t/indexeddb) |

See [browser storage](/t/browser-storage) for choosing between them.
