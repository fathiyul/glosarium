---
title: "File-Based Routing"
summary: "Routes defined by the folder structure."
levels: { frontend: junior }
aliases: ["file system routing", "pages directory", "app router"]
prereqs: ["client-side-routing"]
related: ["client-side-routing", "server-side-rendering", "static-site-generation", "url"]
---

In file-based routing, the files and folders in your project define the app's URLs. You don't write a route table. You create a file, and the route exists.

```
pages/
  index.tsx            →  /
  about.tsx            →  /about
  blog/
    index.tsx          →  /blog
    [slug].tsx         →  /blog/hello-world   (dynamic segment)
  shop/
    [...path].tsx      →  /shop/a/b/c         (catch-all)
```

Frameworks that do this: Next.js, Nuxt, SvelteKit, Astro, Remix (with conventions), Expo Router. Newer layouts, such as Next.js's `app/` directory, use folders with special files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).

## Conventions you'll meet

| Pattern | Meaning |
|---|---|
| `[id]` | a dynamic parameter, available as `params.id` |
| `[...slug]` | catch-all segment |
| `(group)` | a folder for organization that doesn't add to the URL |
| `layout` files | shared wrappers around nested pages |
| `_`-prefixed or special files | not routes (API handlers, errors, middleware) |

```tsx
// app/blog/[slug]/page.tsx
export default function Post({ params }: { params: { slug: string } }) {
  return <h1>{params.slug}</h1>;
}
```

## Why it's popular

- **Discoverable**: the folder tree is the site map.
- **Less configuration** and boilerplate.
- **Enables optimizations**: the framework knows all routes at build time, so it can split code per page and prerender ([static generation](/t/static-site-generation), [server-side rendering](/t/server-side-rendering)).

## Watch out for

- **Renaming or moving a file changes the URL** (and breaks links and SEO). Add redirects.
- **Conventions differ per framework** and between versions. Read the docs for yours.
- **Complex rules** (custom patterns, permissions) still need code, in middleware or layouts.
- **Don't leave drafts or helper files in the routes folder**, or they become public pages.
- **Dynamic routes** must validate parameters, which are user input.

Compare with [client-side routing](/t/client-side-routing), where routes are listed in code.
