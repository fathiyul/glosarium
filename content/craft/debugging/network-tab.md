---
title: "Network Tab"
summary: "Inspecting every HTTP request a page makes."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["Network panel", "network inspector", "DevTools network"]
prereqs: ["browser-devtools", "http-request"]
related: ["browser-devtools", "http-status-codes", "http-headers", "cors", "fetch-api", "http-caching"]
core: [frontend]
---

The **Network** tab in [browser DevTools](/t/browser-devtools) records every request the page
makes (HTML, scripts, images, API calls) as it happens. It answers "what was actually sent, and
what came back?"

Open DevTools, choose **Network**, then reload or trigger the action. It only records while
open, so open it *before* the thing you want to see.

## What each request shows

- **Method and URL** (`GET /api/orders?page=2`).
- **Status code**: 200 OK, 404, 500... (see [status codes](/t/http-status-codes)).
- **Request headers**: cookies, `Authorization`, `Content-Type`.
- **Payload**: the body or query you sent.
- **Response**: headers and the body, such as the JSON returned.
- **Timing**: how long each phase took, and a waterfall of everything on the page.

## Common uses

| Question | Look at |
|---|---|
| Did the request fire at all? | The list; filter by **Fetch/XHR** |
| Why did I get an error? | Status, then the response body, which often has the message |
| Was the right data sent? | Payload tab |
| Why is it slow? | Timing and size; large images and slow endpoints stand out |
| CORS failure? | Red request with a [CORS](/t/cors) error in the Console; compare headers |
| Is it cached? | Size column ("disk cache") and caching headers ([HTTP caching](/t/http-caching)) |

## Handy features

- **Filter** by type or text; **Preserve log** keeps requests across page navigations.
- **Disable cache** while DevTools is open, to see fresh loads.
- **Throttling** simulates slow connections.
- **Copy as cURL** turns a request into a command you can run and share with backend
  developers.

Tokens and cookies show up in headers here, so don't share screenshots without hiding them.
