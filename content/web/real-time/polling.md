---
title: "Polling"
summary: "Asking the server repeatedly whether something changed."
levels: { backend: junior, frontend: junior }
aliases: ["short polling", "long polling", "polling vs push"]
prereqs: ["http-request", "fetch-api"]
related: ["long-polling", "webhooks-vs-polling", "websocket", "server-sent-events", "rate-limiting"]
---

Polling means asking the server repeatedly whether something has changed, on a timer, instead of the server telling you.

```js
setInterval(async () => {
  const res = await fetch("/api/jobs/42");
  const job = await res.json();
  if (job.status === "done") showResult(job);
}, 3000);                       // ask every 3 seconds
```

Use cases: waiting for a background job, refreshing a dashboard, checking for new messages.

## Pros and cons

| Good | Bad |
|---|---|
| Simple, works over plain HTTP | Wasteful: most requests return "nothing new" |
| Easy to scale, cache and debug | Delay up to the polling interval |
| Works through any proxy or firewall | Many clients mean many requests, so server load adds up |

## Making it better

- **Pick a sensible interval**, and back off when nothing changes (3 s, then 5 s, then 10 s).
- **Stop when done**, or when the tab is hidden (`document.visibilityState`).
- **Use conditional requests** (`ETag` and `If-None-Match`) so unchanged answers are tiny ([HTTP caching](/t/http-caching)).
- **Add jitter** so thousands of clients don't hit at the same instant ([retry with backoff](/t/retry-with-backoff)).
- **Set an overall timeout**, and show the user an error instead of polling forever.
- **Respect rate limits** ([rate limiting](/t/rate-limiting)).

## Alternatives

- **[Long polling](/t/long-polling)**: the server holds the request open until something happens, then answers, and the client immediately asks again.
- **[Server-sent events](/t/server-sent-events)**: a one-way stream from the server.
- **[WebSockets](/t/websocket)**: a two-way persistent connection.
- **[Webhooks](/t/webhooks)**: for server-to-server notifications ([webhooks vs polling](/t/webhooks-vs-polling)).

Polling is fine for modest scale and slow-changing data. Move to push when you need low delay or have lots of clients.
