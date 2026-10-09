---
title: "Same-Origin Policy"
summary: "The browser rule that isolates content from different origins."
levels: { backend: mid-level, frontend: junior }
aliases: ["SOP", "same origin policy", "origin policy", "same-origin"]
prereqs: ["origin", "url"]
related: ["cors", "origin", "preflight-request", "http-headers", "https"]
core: [frontend]
also: [web-security]
---

The **same-origin policy** is a browser rule: a page from one **origin** may not freely read
data belonging to another origin. It's why a random website can't read your email just
because you're logged in to it in another tab.

An **origin** is the combination of **scheme + host + port** (see [origin](/t/origin)). Two URLs
are the same origin only if all three match. Compared to `https://app.example.com`:

| URL | Same origin? | Why |
|---|---|---|
| `https://app.example.com/settings` | Yes | Path doesn't matter |
| `http://app.example.com` | No | Different scheme |
| `https://api.example.com` | No | Different host |
| `https://app.example.com:8443` | No | Different port |

## What it restricts

- JavaScript can't **read the response** of a `fetch` to another origin (unless that server allows it
  with [CORS](/t/cors)).
- A page can't read the DOM of a **frame** from another origin.
- `localStorage`, `sessionStorage` and IndexedDB are separated per origin.

## What it doesn't

- Pages can still **embed** images, scripts and stylesheets from other origins, and *send*
  requests such as form posts to other origins. The policy blocks *reading* results, not
  sending in every case. That's why protection against forged requests
  ([CSRF](/t/csrf)) is still needed.
- It doesn't affect non-browser clients like `curl` or server-to-server calls.

## Why you meet it

Your frontend on `localhost:5173` calling an API on `localhost:8000` is cross-origin, since the ports differ. The browser blocks the response until the API sends the right
CORS headers. The fix is on the server, or a dev proxy that makes both look like one origin. It
protects the user, not your server.
