---
title: "Port"
summary: "A number identifying a specific service on a host."
levels: { backend: junior, frontend: junior }
aliases: ["port number", "network port", "TCP port", "listening port"]
prereqs: ["ip-address"]
related: ["ip-address", "localhost", "socket", "firewall", "tcp", "inspecting-connections"]
core: [backend]
---

A **port** is a number from 0 to 65535 that identifies a specific service on a machine. The IP
address gets traffic to the right computer; the port gets it to the right program on it.

```
192.168.1.20:5432      <- host : port  (here, a database)
https://example.com    <- port 443 is implied
http://localhost:3000  <- your dev server
```

## Well-known ports

| Port | Used for |
|---|---|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 5432 | PostgreSQL (default) |
| 3306 | MySQL (default) |
| 6379 | Redis (default) |
| 3000, 5173, 8000, 8080 | Common defaults for dev servers |

Defaults are conventions. Any service can be configured to use another port.

## Everyday use

- **A server *listens* on a port; a client connects to it.** Only one program can listen on a
  given port and address at a time.
- That gives the classic error: **"Address already in use"** (`EADDRINUSE` in Node). Something
  is already running there, often a forgotten dev server. Find it:

```sh
lsof -i :3000          # macOS/Linux: which process uses port 3000?
```

then stop it, or choose another port.

- **Firewalls and cloud security groups** allow or block traffic per port. "Connection refused"
  often means nothing is listening there. A *timeout* often means a firewall is dropping the
  traffic.
- On Linux and macOS, ports below 1024 typically need elevated privileges to listen on. That's why
  dev servers use ports like 3000 or 8080.
- Containers map ports: `docker run -p 8080:80` exposes the container's port 80 as 8080 on your
  machine.

See also [IP addresses](/t/ip-address) and [inspecting connections](/t/inspecting-connections).
