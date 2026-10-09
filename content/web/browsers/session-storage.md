---
title: "sessionStorage"
summary: "Key-value storage that's cleared when the tab closes."
levels: { frontend: junior }
aliases: ["sessionStorage", "window.sessionStorage", "tab storage"]
prereqs: ["local-storage", "browser-storage"]
related: ["local-storage", "browser-storage", "cookie", "same-origin-policy", "indexeddb"]
---

`sessionStorage` is browser key-value storage that lasts only for the life of one tab. Close the tab, and the data is gone. It uses the same API as [localStorage](/t/local-storage).

```js
sessionStorage.setItem("checkoutStep", "2");
sessionStorage.getItem("checkoutStep");     // "2"
sessionStorage.removeItem("checkoutStep");
sessionStorage.clear();
```

## How it differs from localStorage

| | sessionStorage | localStorage |
|---|---|---|
| Lifetime | until the tab or window closes | until cleared |
| Shared between tabs of the same site | **no**, each tab has its own | yes |
| Survives a reload | yes | yes |
| Size | a few MB | a few MB |

Opening a link in a new tab starts with its own (empty, or in some cases copied) storage, so two tabs of the same site don't see each other's session data.

## Good uses

- **Temporary state for one flow**: a multi-step form's progress, a draft, a wizard step.
- **Restoring scroll position or UI state** after a refresh.
- **A one-time message** shown once per session (a dismissed banner).
- **Short-lived values** you don't want to leak into other tabs.

## Remember

- **Strings only.** Convert with `JSON.stringify` and `JSON.parse`.
- **Per origin** ([origin](/t/origin)).
- **Readable by any script on your page**, and editable by the user, so keep secrets out of it ([XSS](/t/xss)).
- **It can throw** when storage is disabled or full. Use `try/catch`.
- It's **synchronous**, so keep values small.
- A private or incognito window may behave differently.
- For data that must persist, use [localStorage](/t/local-storage), or the server.

See [browser storage](/t/browser-storage) for the whole menu.
