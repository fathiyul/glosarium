---
title: "Server Components"
summary: "Components that render on the server and ship no JavaScript."
levels: { frontend: senior }
aliases: ["React Server Components", "RSC", "server component", "Next.js server components", "use client"]
prereqs: ["hydration", "component"]
related: ["hydration", "islands-architecture", "meta-framework", "server-side-rendering", "streaming-ssr", "suspense"]
core: [frontend]
---

**Server components** are components that **render only on the server** and send their result to the browser, and **their code never ships to the client**. They can fetch data directly (from a database or internal API) and keep heavy dependencies (a markdown parser, a database client) out of the client bundle. React Server Components (RSC), used in frameworks such as Next.js, popularized the model.

```tsx
// ProductPage.tsx: a server component (no 'use client'), runs only on the server
import { db } from "@/lib/db";
import AddToCart from "./AddToCart";             // a client component

export default async function ProductPage({ id }: { id: string }) {
  const product = await db.products.find(id);   // direct data access, no API layer needed
  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCart productId={product.id} />      {/* interactive part runs in the browser */}
    </main>
  );
}
```

```tsx
// AddToCart.tsx
"use client";                                    // marks a client component: ships JS, can use state and effects
import { useState } from "react";
export default function AddToCart({ productId }) { ... }
```

## What the split means

| | Server component | Client component |
|---|---|---|
| Runs | Only on the server (build time or request time) | In the browser (and is also pre-rendered on the server) |
| Can use state, effects, event handlers, browser APIs | **No** | Yes |
| Can access databases, secrets, the filesystem | **Yes** | No |
| JavaScript sent to the browser | **None** for itself | Yes |
| Can import the other kind | Can render client components | Can't import server components (but can receive them as children) |

## Benefits

- **Smaller bundles**: heavy libraries used only for rendering stay on the server.
- **Simpler data fetching**: fetch next to where the data is used, close to the data source, avoiding client-side waterfalls.
- **Better security for server-only logic**: secrets stay on the server (just be careful what you pass as props to client components, since those *are* sent).
- Works with [streaming](/t/streaming-ssr) and [Suspense](/t/suspense), so parts of the page appear as their data arrives.

## Costs and cautions

- **A new mental model**: you must track what runs where, and what can be passed across the boundary (props must be serializable: no functions, class instances, etc.).
- **Framework-dependent**: details vary by framework and version, and the ecosystem is still adapting. Libraries that use client features need `"use client"`.
- **Interactivity requires client components**, so you still decide where to draw the boundary. Push it as far down the tree as possible, to keep most of the page on the server.
- **Caching and revalidation** become part of how you think about data on the server.
- **Debugging** crosses two environments.
- Not every app benefits. A highly interactive dashboard may see little gain.

Server components reduce JavaScript, like [islands](/t/islands-architecture), but they work within a component tree rather than at the page level. Together with [hydration](/t/hydration) and [meta-frameworks](/t/meta-framework), they're part of the move to do more work on the server.
