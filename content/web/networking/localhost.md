---
title: "localhost / 127.0.0.1"
summary: "The address that always means \"this machine\"."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["127.0.0.1", "loopback", "local host"]
prereqs: ["ip-address", "port"]
related: ["ip-address", "port", "private-ip", "dns", "docker"]
---

`localhost` is a special name that always means "this machine". Connecting to it never leaves your computer. It uses the loopback address `127.0.0.1` (and `::1` in IPv6).

```sh
python -m http.server 8000
# now visit http://localhost:8000 in your browser
curl http://127.0.0.1:8000
```

The server and the client are both on your machine, so no network is involved.

## Why it matters for development

- **Run and test your app locally**, with a dev server on `localhost:3000`, a database on `localhost:5432`, and so on.
- **Safe by default.** A service bound to `127.0.0.1` accepts connections only from the same machine, so others on the network can't reach it.
- **Fast**, with no real network.

## Binding addresses

The address a server listens on decides who can connect:

| Bind to | Reachable from |
|---|---|
| `127.0.0.1` / `localhost` | this machine only |
| `0.0.0.0` | all network interfaces: other machines too |
| a specific LAN IP | that network only |

A common problem: a server works on your laptop but not from your phone, because it's bound to localhost. Bind to `0.0.0.0` for LAN testing (and be careful about what you expose). In Docker, a server inside a container must listen on `0.0.0.0` for published ports to work ([port mapping](/t/port-mapping)).

## Gotchas

- **`localhost` inside a container** means the container itself, not your host machine. To reach the host, use the platform's special name, or a Compose service name.
- **`localhost` on a server** means that server, not your laptop.
- **IPv4 vs IPv6**: `localhost` may resolve to `::1`, while the server listens only on `127.0.0.1`. If one works and the other doesn't, check both.
- **Browsers treat `http://localhost` as a secure context** for many features, so you often don't need HTTPS locally, but cookies and CORS still apply ([CORS](/t/cors)).
- The name comes from the hosts file, not the internet ([DNS](/t/dns)).
