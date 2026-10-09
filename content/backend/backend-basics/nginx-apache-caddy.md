---
title: "Web Servers (Nginx, Apache, Caddy)"
summary: "The common servers that sit in front of applications."
levels: { backend: junior, frontend: junior }
aliases: ["Nginx", "Apache HTTP Server", "Caddy"]
prereqs: ["web-server"]
related: ["web-server", "http-proxy", "https", "reverse-proxy"]
---

Nginx, Apache HTTP Server and Caddy are widely used web servers. They usually sit in front of an application and take care of the work around it: serving static files, handling HTTPS, compressing responses, and forwarding requests to the app. When they forward requests, they act as a [reverse proxy](/t/reverse-proxy).

A common Nginx setup forwards everything to an app listening on a local port:

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
    }
}
```

The app then sees requests coming from the proxy, not from the user's browser. Proxies normally add headers such as `X-Forwarded-For` and `X-Forwarded-Proto` to pass along the original client address and protocol. Your app needs to be configured to trust those headers only from your own proxy.

The classic mistake is letting the app trust forwarded headers from anyone. A client can send its own `X-Forwarded-For` value directly, so only trust those headers when the request came through your proxy. Also, the choice between these servers matters less than keeping its configuration in version control and testing changes before you reload the server.
