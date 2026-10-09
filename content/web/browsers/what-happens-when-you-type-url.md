---
title: "What Happens When You Type a URL"
summary: "DNS, TCP, TLS, HTTP, parsing, rendering: the classic end-to-end question."
levels: { backend: junior, frontend: junior }
aliases: ["what happens when you type a URL in the browser", "what happens when you visit a website", "browser request lifecycle"]
prereqs: ["url", "http", "dns"]
related: ["dns", "tcp-handshake", "https", "http", "critical-rendering-path", "browser-cache", "dom"]
core: [backend, frontend]
---

A classic question because it ties the whole web together. Here is the journey from pressing Enter to seeing a page,
in broad strokes.

**1. Parse the URL.** The browser splits `https://example.com/products?id=7` into scheme, host,
path and query ([URL](/t/url)).

**2. Check caches.** It may already have the page, or part of it, in the [browser cache](/t/browser-cache),
and then no request is needed.

**3. Look up the IP address.** [DNS](/t/dns) turns `example.com` into an IP, using caches along the way.

**4. Open a connection.** A [TCP handshake](/t/tcp-handshake) establishes a reliable channel to that
IP and port (443 for HTTPS). (HTTP/3 uses QUIC instead.)

**5. Secure it.** For HTTPS, a TLS handshake verifies the server's certificate and sets up encryption
([HTTPS](/t/https)).

**6. Send the HTTP request.** `GET /products?id=7` with headers such as cookies and `Accept`
([HTTP](/t/http)).

**7. The server responds.** Perhaps through a load balancer, app server and database. It returns a
status code, headers and, usually, HTML.

**8. The browser renders.** It reads the HTML and builds the [DOM](/t/dom); it fetches CSS,
JavaScript, images and fonts, with further requests; builds the [CSSOM](/t/cssom);
combines them into a [render tree](/t/render-tree); works out sizes and positions (layout);
and paints pixels ([critical rendering path](/t/critical-rendering-path)).

**9. JavaScript runs**, which may fetch more data and change the page.

## Why it's useful

When something is slow or broken, this list tells you where to look:

| Symptom | Likely stage |
|---|---|
| "Could not resolve host" | DNS |
| Connection refused or timeout | TCP, firewall, server not running |
| Certificate warning | TLS |
| 4xx or 5xx | The server |
| Page loads but is blank or broken | Rendering or JavaScript errors |

The [network tab](/t/network-tab) shows many of these stages with their timings.
