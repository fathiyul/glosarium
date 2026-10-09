---
title: "Islands Architecture"
summary: "Static pages with small interactive islands."
levels: { frontend: senior }
aliases: ["islands", "island architecture", "partial hydration", "Astro islands", "selective hydration"]
prereqs: ["hydration", "server-side-rendering"]
related: ["hydration", "server-components", "meta-framework", "lazy-loading", "core-web-vitals", "csr-vs-ssr-vs-ssg"]
core: [frontend]
---

**Islands architecture** builds a page as **mostly static HTML with small, isolated interactive components ("islands")**. Only the islands receive JavaScript and get hydrated, while the rest of the page, which is usually most of it, ships as plain HTML with no JavaScript at all.

```
┌──────────────── page: static HTML (header, article text, footer) ────────────────┐
│                                                                                    │
│   [ island: search box ]        text text text text                                │
│   (hydrated, interactive)       text text text text    [ island: image carousel ]  │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

## The problem it addresses

In a traditional SPA or full-page [hydration](/t/hydration) approach, the whole page is a JavaScript application. Even a mostly static content page downloads and runs a large bundle to attach event handlers to elements that don't need any. That costs loading time, CPU and battery, and hurts interactivity on slower devices ([Core Web Vitals](/t/core-web-vitals)).

With islands, you pay the JavaScript cost **only where interactivity exists**.

## How it looks in code

Frameworks such as Astro popularized this model:

```astro
---
import Header from "../components/Header.astro";      // static: renders to HTML, no JS
import SearchBox from "../components/SearchBox.jsx";    // interactive component
---
<Header />
<article> ...long static content... </article>
<SearchBox client:visible />       <!-- hydrate this island only when it scrolls into view -->
```

Directives control **when** an island hydrates: immediately on load, when the browser is idle, when visible, or on media query. Islands can even use different UI frameworks side by side (a framework-specific feature, not a requirement of the idea).

## Where it fits best

- **Content-heavy sites**: blogs, docs, marketing sites, e-commerce listing pages, where interactivity is the exception.
- Pages where most components are display-only.

## Trade-offs

- **Less suitable for highly interactive, app-like UIs** where nearly everything is dynamic and shares state. There, the whole page *is* the app.
- **Sharing state between islands** takes explicit mechanisms (stores, events, URLs), since they're independent roots ([lifting state up](/t/lifting-state-up), [URL as state](/t/url-as-state)).
- **Slightly different mental model**: you must decide what's static and what's an island.
- **Related approaches**: [React Server Components](/t/server-components) take a different route to shipping less JavaScript, by marking which components run only on the server. Both reflect the idea that **not everything needs to run in the browser**.

Combine with [lazy loading](/t/lazy-loading) of island code, and measure the real effect on load and interaction metrics.
