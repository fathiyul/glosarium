---
title: "Client-Server Model"
summary: "Clients make requests; servers respond."
levels: { backend: junior, frontend: junior }
aliases: ["client-server architecture"]
prereqs: ["http-request"]
related: ["web-server", "http-request", "backend", "request-lifecycle"]
---

In the client-server model, a client asks for something and a server provides it. Clients initiate requests and servers wait to respond. A web browser is a client, and the web application it talks to is a server. A mobile app calling an API works the same way.

```
client (browser, app)  --request-->  server (API, web app)
                       <--response--
```

The server usually holds the shared state, such as the database and the business rules. Each client holds only what it needs for its screen. That split lets many clients use the same server, and lets you change the server without changing every client at once.

The classic mistake is trusting the client. Anyone can modify a browser's JavaScript or send their own requests, so the server must check every input and enforce every rule. Validation in the client is for the user's convenience, and the server's checks are the ones that protect the system. See [backend](/t/backend) for the server's responsibilities.
