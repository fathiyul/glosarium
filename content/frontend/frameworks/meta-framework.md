---
title: "Meta-Framework"
summary: "Frameworks like Next.js, Nuxt, SvelteKit and Remix that add routing and rendering."
levels: { frontend: mid-level }
aliases: ["Next.js", "Nuxt", "SvelteKit", "Remix", "full-stack framework", "web meta-framework", "Astro"]
prereqs: ["ui-framework", "client-side-routing"]
related: ["hydration", "file-based-routing", "server-components", "islands-architecture", "framework-choice", "client-side-routing"]
core: [frontend]
---

A **UI framework** like React, Vue or Svelte handles components and rendering. It deliberately leaves out routing, data loading, server rendering, bundling and deployment. A **meta-framework** is built on top of one and adds those, so you get a
complete way to build a whole web application.

| UI framework | Common meta-framework |
|---|---|
| React | Next.js, React Router (framework mode; the successor to Remix), others |
| Vue | Nuxt |
| Svelte | SvelteKit |
| Several (React, Vue, Svelte, ...) | Astro |

## What they usually add

- **[File-based routing](/t/file-based-routing)**: the folder structure defines URLs (`pages/orders/[id].tsx` is `/orders/:id`).
- **Server-side rendering (SSR)** and **static generation (SSG)**: HTML built on the server or at build time, for speed and SEO ([hydration](/t/hydration)).
- **Data loading** conventions: fetch on the server before rendering, with caching.
- **API routes / server functions**: backend code in the same project.
- **Bundling and optimization**: code splitting, image handling, fonts.
- **Layouts, nested routes, error pages.**
- Deployment adapters for different hosting platforms ([PaaS platforms](/t/paas-platforms)).
- Newer capabilities such as [server components](/t/server-components) and [islands](/t/islands-architecture).

## Why use one

Many apps need those pieces anyway. A meta-framework gives you conventions, saves assembling and maintaining a router, bundler config and rendering setup yourself, and makes it easier to onboard new teammates.

## Trade-offs

- **Opinionated**: you adopt its structure and mental model, and its upgrade path.
- **More concepts to learn**: where code runs (server, client or both), caching layers, rendering modes. A lot of bugs in these apps come from confusing the server and the client environments.
- **Coupling** to the framework and sometimes to a hosting provider's features ([vendor lock-in](/t/vendor-lock-in)).
- **Fast-moving**: major versions can change how things work.
- **Overkill** for a small single-page app or a mostly static site. A simple client-side app or a static site generator may be enough ([client-side routing](/t/client-side-routing)).

Choose by the needs of the app (SEO, performance, content vs interactivity), team skills and ecosystem ([choosing a framework](/t/framework-choice)).
