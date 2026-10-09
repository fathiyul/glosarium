---
title: "Web Framework"
summary: "Libraries like Express, Django, Spring or FastAPI for building web apps."
levels: { backend: junior, frontend: junior }
aliases: ["backend framework", "web framework", "Django", "Flask", "FastAPI", "Express", "Spring Boot", "Rails", "Laravel"]
prereqs: ["http", "backend-routing"]
related: ["web-server", "wsgi-asgi", "request-lifecycle", "orm", "middleware-pattern", "backend-language-choice"]
core: [backend]
---

A **web framework** is a library that handles the repetitive parts of building a web application, so you
write the parts specific to your product.

```python
# FastAPI
from fastapi import FastAPI
app = FastAPI()

@app.get("/hello/{name}")
def hello(name: str):
    return {"message": f"Hello, {name}"}
```

```js
// Express
import express from "express";
const app = express();
app.get("/hello/:name", (req, res) => res.json({ message: `Hello, ${req.params.name}` }));
app.listen(3000);
```

Both do the same work: listen for requests, route them, read parameters, return JSON.

## What frameworks typically provide

- [Routing](/t/backend-routing) from URLs to handlers.
- Parsing of requests: headers, query strings, JSON bodies, forms.
- Building responses with status codes and headers.
- **Middleware** for shared concerns such as logging, authentication and CORS
  ([middleware](/t/middleware-pattern)).
- Often: templating, [ORM](/t/orm), migrations, sessions, validation, an admin interface, testing tools.

## Spectrum

| Style | Examples | Trade-off |
|---|---|---|
| Minimal ("micro") | Flask, Express, Sinatra | Flexible: you choose the other pieces |
| Batteries-included | Django, Rails, Laravel, Spring Boot | Fast to start and consistent, more conventions to learn |

Frameworks exist for most languages (Python, JavaScript/TypeScript, Java, Ruby, PHP, Go, C#...).

## Notes

- A framework doesn't serve traffic by itself. It runs inside a [web server or application server](/t/web-server)
  (often via an interface such as [WSGI/ASGI](/t/wsgi-asgi) in Python).
- **Learn how requests flow** through it ([request lifecycle](/t/request-lifecycle)) because most debugging
  is about that.
- **Pick based on your language, team and ecosystem**, and prefer mature, maintained, well-documented ones. Don't rewrite in a
  new framework just because it's fashionable.
- Learn the underlying ideas (HTTP, routing, validation, persistence), and a second framework becomes easy.
