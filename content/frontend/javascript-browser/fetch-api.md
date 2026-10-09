---
title: "Fetch API"
summary: "The built-in way to make HTTP requests from JavaScript."
levels: { backend: junior, frontend: junior }
aliases: ["fetch", "fetch()", "window.fetch", "Fetch API", "making HTTP requests in JavaScript"]
prereqs: ["promise", "async-await", "http-methods"]
related: ["json", "http-status-codes", "http-headers", "cors", "node-js", "request-response-body"]
core: [frontend]
---

`fetch` is the built-in way to make HTTP requests from JavaScript. Browsers have it, and so do recent
versions of Node.js. It returns a [promise](/t/promise).

```js
const res = await fetch("/api/users/42");
const user = await res.json();            // read the body as JSON
```

## Sending data

```js
const res = await fetch("/api/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ itemId: 7, quantity: 2 }),
});
```

## The gotcha: HTTP errors don't throw

`fetch` only rejects when the request *couldn't be made* (network failure, DNS, [CORS](/t/cors)
block). A `404` or `500` response is a **successful fetch** from its point of view. You have to check:

```js
async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) {                              // true for status 200-299
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}
```

Skipping `res.ok` is the most common mistake, and leads to code that tries to read an error page as
data.

## Other points

- **`res.json()` is itself async**, and the body can be read **once**. Use `res.clone()` if you need it twice.
- **Cookies** aren't sent to other origins unless you set `credentials: "include"` (and the server
  allows it).
- **Timeouts and cancelling** use an `AbortController`:

```js
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
await fetch(url, { signal: controller.signal });
```

- **Handle failure in the UI** with `try/catch`: show an error and offer a retry, not an endless spinner.
- Wrap it in a small helper (base URL, auth header, error handling) rather than repeating it everywhere, or use a
  library if you need more.

Look at your calls in the [network tab](/t/network-tab) when something goes wrong.
