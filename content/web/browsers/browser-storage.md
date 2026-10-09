---
title: "Browser Storage"
summary: "Cookies, localStorage, sessionStorage and IndexedDB."
levels: { backend: mid-level, frontend: junior }
aliases: ["web storage", "client-side storage", "storing data in the browser"]
prereqs: ["dom"]
related: ["local-storage", "session-storage", "cookie", "indexeddb", "browser-cache", "service-worker"]
---

Browsers offer several places for a web page to keep data on the user's device. They differ in size, lifetime, and whether the data is sent to the server.

| Storage | Capacity | Lifetime | Sent to server? | Notes |
|---|---|---|---|---|
| [**Cookies**](/t/cookie) | small (about 4 KB each) | until expiry or session end | **yes**, on every matching request | sessions, preferences; can be `HttpOnly` |
| [**localStorage**](/t/local-storage) | a few MB | until cleared | no | simple key-value strings, synchronous |
| [**sessionStorage**](/t/session-storage) | a few MB | until the tab closes | no | per tab |
| [**IndexedDB**](/t/indexeddb) | large | until cleared | no | structured data, asynchronous, can store files |
| **Cache Storage** | large | until cleared | no | used by [service workers](/t/service-worker) for offline files |

```js
localStorage.setItem("theme", "dark");
sessionStorage.setItem("draft", text);
document.cookie;    // cookies are best set by the server with Set-Cookie
```

## Choosing

- **Needs to reach the server** (login session): a cookie, with `HttpOnly`, `Secure` and `SameSite` ([cookies](/t/cookie)).
- **Small UI preference** that persists: localStorage.
- **Temporary state for one tab**: sessionStorage.
- **Lots of structured data, offline apps**: IndexedDB ([offline-first](/t/offline-first)).

## Rules that apply to all

- **It's per origin**, and visible to your own scripts ([origin](/t/origin)).
- **Treat it as untrusted and temporary.** The user (or an extension) can read and edit it, clear it, or the browser can evict it. Quotas and private modes limit it.
- **Don't store secrets or sensitive personal data**, because any injected script can read it ([XSS](/t/xss)).
- **Wrap access in `try/catch`**, since it can throw.
- **Clear on logout** anything tied to the user.
- Don't use it as your database. Keep important data on the server.
- Consider privacy laws for cookies and similar tracking ([cookie consent](/t/cookie-consent)).
