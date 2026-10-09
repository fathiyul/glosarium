---
title: "HTTP Methods"
summary: "GET, POST, PUT, PATCH, DELETE and what each one means."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["HTTP verbs", "request methods", "GET POST PUT DELETE", "HTTP verbs"]
prereqs: ["http"]
related: ["safe-idempotent-methods", "rest", "endpoint", "http-status-codes", "cors"]
core: [backend, frontend]
---

The **method** (or "verb") at the start of a request says what you want to do with the
resource at that URL.

| Method | Meaning | Typical use |
|---|---|---|
| **GET** | Read | Fetch a page or `GET /users/42` |
| **POST** | Create / perform an action | `POST /orders` with the new order in the body |
| **PUT** | Replace | `PUT /users/42` with the complete new user |
| **PATCH** | Partially update | `PATCH /users/42` with only the changed fields |
| **DELETE** | Remove | `DELETE /orders/917` |
| HEAD | Like GET, headers only | Check existence or size |
| OPTIONS | Ask what's allowed | Used by browsers for [CORS preflight](/t/preflight-request) |

## Two properties that matter

- **Safe**: doesn't change anything on the server. `GET` and `HEAD` should be safe. This is why
  browsers, crawlers and caches feel free to call them freely. **Never make a `GET` that deletes or
  changes data**, because a link prefetcher could trigger it.
- **Idempotent**: doing it twice has the same effect as once. `GET`, `PUT` and `DELETE` are
  idempotent; **`POST` is not**, so two identical POSTs can create two orders. That's why
  retries need care (see [safe and idempotent methods](/t/safe-idempotent-methods)).

## Common confusion

- **PUT vs PATCH:** PUT sends the whole resource and replaces it; PATCH sends only what changes.
- **POST for everything** works but loses information (caching, retry rules). Pick the method that
  matches the meaning, as in [REST](/t/rest).
- Browsers' HTML forms only do GET and POST. Other methods come from JavaScript or API clients.

A method doesn't enforce anything by itself; the server's code decides what each one does.
Following the conventions makes your API predictable to everyone else.
