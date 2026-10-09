---
title: "Streaming SSR"
summary: "Sending HTML in chunks as it becomes ready."
levels: { frontend: senior }
aliases: ["streaming server-side rendering", "streaming HTML", "React streaming", "out-of-order streaming", "progressive rendering"]
prereqs: ["server-side-rendering", "suspense"]
related: ["server-side-rendering", "suspense", "hydration", "server-components", "ttfb", "lcp"]
core: [frontend]
---

With ordinary [server-side rendering](/t/server-side-rendering), the server must finish rendering the **entire page**, including waiting for the **slowest data fetch**, before it sends the first byte. **Streaming SSR** sends the HTML **in chunks as parts become ready**, so the browser can start showing content right away, while slower sections arrive later.

```
Traditional SSR:  [ wait for all data ........ ] ──► send full HTML ──► browser renders
Streaming SSR:    send shell immediately (header, layout, fast content) ──► browser renders it
                  ...later: chunk with the comments section ──► swapped in
                  ...later: chunk with recommendations   ──► swapped in
```

## How it works (in React)

You wrap slow sections in `Suspense` with a fallback. The server sends the shell with the fallback in place, then streams the real content when its data resolves, along with a tiny script that swaps it in ([Suspense](/t/suspense)).

```tsx
export default function Page() {
  return (
    <>
      <Header />                                       {/* ready immediately */}
      <ProductDetails />                               {/* fast */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews />                                    {/* slow: streams in when ready */}
      </Suspense>
    </>
  );
}
```

Other frameworks have equivalents, as the idea is implemented through HTTP chunked transfer, so the browser can parse and paint HTML progressively.

## Benefits

- **Faster time to first byte and first paint**: users see something quickly, even when one data source is slow ([TTFB](/t/ttfb), [LCP](/t/lcp)).
- **No single slow query blocking the whole page.**
- **Selective hydration**: parts of the page can become interactive as their code and HTML arrive, without waiting for everything ([hydration](/t/hydration)).
- Fits naturally with [server components](/t/server-components).

## Things to watch

- **Status code and headers must be sent first.** Once streaming has begun, you can't change the HTTP status. An error or redirect discovered later has to be handled in the page (an error boundary or client redirect), not with a `500` or `302`.
- **Layout shift**: a fallback of the wrong size causes jumps when content arrives. Size skeletons properly ([CLS](/t/cls)).
- **Proxies and CDNs** that buffer responses can defeat streaming. Check your infrastructure's support.
- **SEO and crawlers**: the final HTML eventually contains everything, but check how crawlers treat late-streamed content.
- **More moving parts to debug**, since partial pages and ordering can confuse monitoring and tests.
- **It doesn't make slow data fast.** It only prevents slow data from delaying fast content. Fix slow queries separately.

Start by identifying which parts of the page depend on slow data, and give those their own Suspense boundaries.
