---
title: "Inspecting Connections (ss, netstat, lsof)"
summary: "Seeing which ports and connections a machine has open."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["ss", "netstat", "lsof", "inspecting connections"]
prereqs: ["tcp", "socket"]
related: ["packet-capture", "firewall", "connection-pooling"]
---

When a service "can't connect," the fastest evidence is on the machine itself: which ports are listening, which connections exist and in what state, and which process holds each socket. The tools are **`ss`** (modern socket statistics), **`netstat`** (older, same idea), and **`lsof -i`** (which process has which network file open).

```text
ss -tlnp    # listening TCP sockets + owning processes
ss -tan     # all TCP sockets with states (ESTAB, TIME-WAIT, CLOSE-WAIT…)
lsof -i :5432   # what holds port 5432?
```

The states tell the story: lots of `TIME-WAIT` means rapid connect/disconnect churn (consider pooling or keep-alive); `CLOSE-WAIT` piling up means your code isn't closing sockets; `SYN-SENT` with nothing established means packets aren't getting through (firewall or routing).

The classic mistakes:

- Reaching for packet capture first. `tcpdump` is powerful but heavy; socket state usually answers "listening? connected? leaking?" in seconds. Start cheap.
- Forgetting `-p` / process attribution. Knowing *that* port 8080 is listening is half the answer; knowing *which* process holds it resolves "why is the old version still serving."
- Misreading TIME-WAIT. It's a normal post-close state, not an error — but thousands of them signal churn worth fixing with reuse.
- Ignoring CLOSE-WAIT. Unlike TIME-WAIT, a growing CLOSE-WAIT pile means the application never closed its side: a file-descriptor leak that eventually exhausts the process.
- Checking only localhost. A service listening on `127.0.0.1` is unreachable from other hosts by design; "connection refused remotely, works locally" is usually a bind address, not a firewall.
- Not checking both ends. Client says "timeout," server shows nothing arrived: the problem is the path (firewall, routing, DNS to the wrong host). Compare the two sides.

**The habit:** `ss`/`lsof` first for state and ownership, then firewall and routing, then packet capture for the truly strange. Most "network" problems are a wrong bind address, a closed port, or leaked sockets — all visible in seconds.
