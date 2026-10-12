---
title: "API"
summary: "An interface that lets programs talk to each other."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["application programming interface", "web API", "REST API"]
prereqs: ["function"]
related: ["endpoint", "rest", "api-design", "json", "http-methods", "openapi"]
---

An API (application programming interface) is a defined way for one piece of software to ask another to do something, without knowing how it works inside. You use the interface, and the provider handles the details.

You use APIs all the time:

- **A library's functions**: `Math.round(2.5)` or `requests.get(url)`.
- **The operating system's calls**: open a file, create a thread.
- **A web API**: send an HTTP request to a service, and get data back.

```js
const res = await fetch("https://api.example.com/users/42");
const user = await res.json();
```

## Web APIs

When people say "API" in backend and frontend work, they usually mean a web API: a set of [endpoints](/t/endpoint) a program can call over HTTP, exchanging [JSON](/t/json).

| Style | Idea |
|---|---|
| [REST](/t/rest) | resources at URLs, with HTTP methods |
| [GraphQL](/t/graphql) | the client asks for exactly the fields it wants |
| [gRPC](/t/grpc) | fast, typed calls between services |

## What an API promises

An API is a contract: what you send, what you get back, what errors can happen. As long as the contract holds, the provider can change the internals freely, and consumers don't break ([API design](/t/api-design), [backward compatibility](/t/backward-compatibility)).

## Working with one

- **Read the documentation**, and the reference for each endpoint ([reading docs](/t/reading-docs), [OpenAPI](/t/openapi)).
- **Authenticate** as required (keys, tokens) and keep credentials secret ([API keys](/t/api-key)).
- **Respect rate limits** ([rate limiting](/t/rate-limiting)).
- **Handle errors and timeouts**, since the network and the other side can fail ([timeouts](/t/timeouts)).
- **Expect change** and versions ([API versioning](/t/api-versioning)).
- Try it by hand first ([curl](/t/curl), [HTTP client tools](/t/http-client-tools)).

Your own services are APIs too, and designing them well is a core backend skill.
