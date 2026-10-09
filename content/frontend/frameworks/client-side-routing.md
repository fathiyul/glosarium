---
title: "Client-Side Routing"
summary: "Changing pages without full reloads."
levels: { frontend: junior }
aliases: ["SPA routing", "client side routing", "single page app routing", "router"]
prereqs: ["url", "history-api"]
related: ["history-api", "file-based-routing", "component", "meta-framework", "prevent-default"]
core: [frontend]
---

In a traditional site, clicking a link makes the browser request a new HTML page from the server. With
**client-side routing**, JavaScript intercepts the navigation, changes the URL and swaps what's on screen,
**without a full page reload**. It's how single-page apps feel fast and keep state between "pages".

```
/orders        →  <OrdersPage />
/orders/917    →  <OrderDetailPage id="917" />
```

## How it works

1. Clicking a link is intercepted (`preventDefault()`).
2. The router updates the address bar with the [History API](/t/history-api)
   (`history.pushState`), without loading anything.
3. It figures out which component matches the new path and renders it, fetching any data it needs.
4. The back and forward buttons trigger an event, so the router keeps the screen in sync.

```jsx
<Link to="/orders/917">View order</Link>      // a router link, not a plain <a> that reloads
```

Routers (React Router, Vue Router, the routers built into meta-frameworks) do all this and add route
parameters (`/orders/:id`), nested layouts and navigation guards. Many frameworks derive routes from
the file structure ([file-based routing](/t/file-based-routing)).

## Things to get right

- **The server must still answer deep links.** If someone opens or refreshes `/orders/917`, the request
  goes to your server, which has no such file. Configure a **fallback to `index.html`** for the app, or you get a
  404.
- **Use real links** (`<a href>` or the router's `<Link>`) rather than click handlers on buttons, so
  open-in-new-tab, copy link and keyboard navigation work.
- **Handle unknown routes** with a "not found" page.
- **Move focus and update the page title** after navigating, and announce the change for screen reader
  users. A silent swap is confusing.
- **Search engines and first load.** Pure client-side apps send an empty shell first. Server-side rendering
  helps with speed and SEO (see [meta-frameworks](/t/meta-framework)).
- **Scroll position**: reset to the top on new pages, and restore it on back.
