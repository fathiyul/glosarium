---
title: "URL as State"
summary: "Keeping filters, tabs and pagination in the URL so it can be shared."
levels: { frontend: mid-level }
aliases: ["state in the URL", "query string state", "URL state", "shareable state", "deep linking state"]
prereqs: ["client-side-routing", "path-vs-query-parameters"]
related: ["query-string", "history-api", "client-side-routing", "server-state-vs-client-state", "local-vs-global-state", "form-state"]
core: [frontend]
---

Some UI state **belongs in the URL**: the current filters, sort order, search text, selected tab and page number. Putting it there makes the page **shareable, bookmarkable and refresh-safe**, and makes the browser's back button behave the way people expect.

```
/products?category=kettles&sort=price&page=2&q=steel
```

Copy that link and send it: your colleague sees exactly the same list. Refresh the page, and nothing resets. Press Back, and you return to the previous filter instead of leaving the site.

Compare with keeping the same state in `useState`: reload, and the filters vanish. Share the link, and the recipient sees defaults.

## What to put in the URL

| In the URL | Not in the URL |
|---|---|
| Search text, filters, sorting | Open/closed dropdowns and tooltips |
| Pagination or cursor | Hover and focus state |
| Selected tab or view mode | Transient form input before submission |
| Which item is selected or open | Sensitive data and secrets |
| Date ranges, map position/zoom | Large or fast-changing data |

Rule of thumb: **if someone would want to link to this exact view, it belongs in the URL.**

## Implementing it

```tsx
// React Router style
const [params, setParams] = useSearchParams();
const category = params.get("category") ?? "all";
const page = Number(params.get("page") ?? 1);

function setCategory(next: string) {
  setParams((p) => { p.set("category", next); p.set("page", "1"); return p; });   // reset the page
}
```

The URL becomes the **single source of truth**: components read from it, and update it, and the data fetch is keyed by the params ([data fetching libraries](/t/data-fetching-library)).

## Details that matter

- **Parse and validate.** URLs are user-editable input. Handle missing, malformed or out-of-range values by falling back to defaults ([runtime validation](/t/runtime-validation)).
- **Omit defaults** to keep URLs short and clean.
- **Reset dependent state** (page number) when a filter changes.
- **Debounce typed text** before updating the URL ([debounce](/t/debounce)).
- **Choose push vs replace**: `pushState` adds a history entry (good for navigation-like changes). `replaceState` doesn't (good for every keystroke in a search box). See the [History API](/t/history-api).
- **Encode values** properly ([URL encoding](/t/url-encoding)).
- **Don't put secrets or personal data** in URLs, since they end up in logs and history.

A decent default when choosing where state lives: URL first for view state that matters, then local component state, then context or a store.
