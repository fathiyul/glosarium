---
title: "Request and Response Body"
summary: "The payload sent with a request or returned in a response, usually JSON."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["request body", "response body", "payload", "HTTP body"]
prereqs: ["http", "json"]
related: ["http-headers", "http-methods", "json", "content-type", "multipart-form-data", "endpoint"]
core: [backend, frontend]
---

The **body** is the data part of an HTTP message: what you're actually sending or receiving. The
[headers](/t/http-headers) and URL describe and address it; the body *is* the content.

```http
POST /orders HTTP/1.1
Content-Type: application/json

{"item_id": 7, "quantity": 2}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"id": 917, "item_id": 7, "quantity": 2, "status": "pending"}
```

The first is the **request body**: what the client sends. The second is the **response body**:
what the server returns.

## Which requests have one

| | Request body | Response body |
|---|---|---|
| GET, HEAD | Normally none | GET: yes |
| POST, PUT, PATCH | Yes: the data to create or change | Often (the created or updated thing) |
| DELETE | Usually none | Often none (`204 No Content`) |

Use the URL's path and query to say *what* you want; use the body to carry the *data*.

## The format must match the header

`Content-Type` tells the receiver how to read the body: `application/json`, `multipart/form-data`
for file uploads ([multipart](/t/multipart-form-data)) or `application/x-www-form-urlencoded`
for classic HTML forms. If the header and the body don't match, the server will usually reject or
mis-parse it.

```js
await fetch("/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ item_id: 7, quantity: 2 }),
});
```

## Good practice

- **Validate incoming bodies**: never trust the shape or types.
- **Return a consistent error body** with a clear message when a request fails (with the right
  [status code](/t/http-status-codes)).
- **Keep bodies reasonable in size**, and paginate big lists.
- **Don't log full bodies** that may contain passwords or personal data.
- Reading a response body in a browser consumes it once (`res.json()`), so don't read it twice.
