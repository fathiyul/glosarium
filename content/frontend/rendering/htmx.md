---
title: "Hypermedia-Driven Apps (htmx)"
summary: "Swapping server-rendered HTML fragments instead of building a SPA."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["htmx", "hypermedia-driven applications", "hateoas frontend"]
prereqs: ["single-page-application", "progressive-enhancement"]
related: ["progressive-enhancement", "rendering-strategies", "server-sent-events"]
---

**htmx** builds interactive apps the hypermedia way: the server renders HTML (fragments, not JSON), and declarative attributes (`hx-get`, `hx-post`, `hx-target`, `hx-swap`) fetch and swap pieces into the page. Clicks and forms become AJAX without client state, routers, or build steps — the server stays the source of truth for both data *and* markup.

```html
<button hx-get="/items?page=2" hx-target="#list" hx-swap="beforeend">More</button>
```

It inverts the SPA bargain: instead of shipping application logic to the client, interactions stay small server round trips of markup. Multisearch, infinite scroll, inline validation and live updates collapse to attributes plus endpoints returning fragments.

The classic mistakes:

- SPA habits in hypermedia. Client-side stores duplicating server state reintroduce the sync problems hypermedia avoids. Keep state server-side; the DOM is the store.
- Full-page endpoints for fragments. Returning whole layouts for `hx-` requests wastes bytes and breaks swaps. Serve fragments for hypermedia requests (detect via headers), pages for navigation.
- Ignoring the no-JS story. Hypermedia degrades gracefully *if* endpoints serve real pages and forms work natively. Design `hx-` as enhancement over working forms/links, not the only path.
- Chatty micro-requests. Per-keystroke server round trips need debouncing and response caching like any remote call. Attributes don't exempt latency thinking.
- No loading/error states. Swaps without indicators feel broken on slow networks. Use request classes, indicators and response-error handling deliberately.
- Security as an afterthought. Fragment endpoints are API surface: authorise, validate and CSRF-protect them exactly like JSON endpoints.
- Using it where client state dominates. Offline-first apps, complex local interactions (drag editors, games) and highly dynamic UIs still suit client frameworks. Hypermedia serves server-centred interaction best.

**When to choose it:** content and form-heavy apps where server rendering already wins — admin tools, CRUD, catalogues, dashboards. Less JavaScript, fewer states, same interactivity where it counts.
