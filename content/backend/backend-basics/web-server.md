---
title: "Web Server"
summary: "Software that accepts HTTP requests and returns responses."
levels: { backend: junior, frontend: junior }
prereqs: ["http-request"]
related: ["nginx-apache-caddy", "http-proxy", "request-lifecycle", "static-assets"]
---

A web server is software that listens for HTTP requests and sends back responses. Some web servers serve files straight from disk, such as HTML, CSS, images and JavaScript. Others pass each request to an application, which generates the response and hands it back.

```
browser --HTTP request--> web server --> application
browser <--HTTP response-- web server <-- application
```

The web server handles the connection side of things: accepting connections, reading the request, and writing the response. Your application handles what the response should contain. The terms get mixed up because many tools do both jobs.

Frontend developers meet web servers when they serve a built site or run a dev server. Backend developers meet them as the front door to an app. A simple command-line server, such as Python's `http.server` module, is useful for quick tests, but it isn't designed for production traffic.

The classic mistake is treating the web server and the application framework as the same thing. If a request reaches your app with the wrong path, host or protocol, the cause is often in the web server's configuration, not in your code. Check which layer produced the response. See [request lifecycle](/t/request-lifecycle) for the steps a request goes through inside the app, and [Nginx, Apache and Caddy](/t/nginx-apache-caddy) for common production servers.
