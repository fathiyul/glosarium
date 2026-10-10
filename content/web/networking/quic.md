---
title: "QUIC"
summary: "A UDP-based transport behind HTTP/3, with faster handshakes."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["quic", "quick udp internet connections", "quic protocol"]
prereqs: ["udp", "tls-handshake"]
related: ["http-3", "head-of-line-blocking", "tls-handshake"]
---

**QUIC** rebuilds transport in userspace over UDP: independent **streams** (no cross-stream head-of-line blocking), integrated TLS 1.3 (handshake in ~1 RTT, ~0 on resumption), connection migration (survive IP changes — hello, mobile), and per-stream flow control. It's the transport under HTTP/3 and a growing share of the web's bytes.

```text
TCP+TLS:  handshake(s) → single ordered stream (loss stalls all)
QUIC:     fused handshake → independent streams (loss stalls one) + migration
```

Implementing transport above UDP lets it evolve without kernel or middlebox upgrades — the deployment trick that made a new transport possible at all. Encryption covers nearly everything (even most headers), which both protects privacy and blinds legacy inspection.

The classic mistakes:

- Assuming UDP passes freely. Networks that block, throttle or mishandle UDP break QUIC while TCP sails through. Fallback to TCP-based transports must work, not just exist.
- 0-RTT on unsafe methods. Replayable early data suits idempotent requests only. Enabling it broadly replays mutations.
- Legacy inspection blindness. Firewalls and monitors built for TCP/TLS headers can't see into QUIC. Update tooling and policy for an encrypted-transport world.
- Treating it as "UDP, so unthrottled." QUIC runs full congestion control — it shares fairly and backs off like TCP. Capacity assumptions transfer.
- Connection migration as identity. Migration proves nothing about the peer — authentication still lives in TLS. Don't mistake continuity for trust.
- Tuning TCP habits onto QUIC. Buffer sizes, timeout heuristics and loss assumptions tuned for TCP need revalidation. Similar principles, different constants.
- Ignoring CPU cost. Userspace encryption and packet processing cost more CPU per byte than kernel TCP on some paths. Measure at your scale.

**Its place:** the modern transport for lossy, mobile, latency-sensitive traffic — and the foundation HTTP/3 stands on. Deploy with fallback, mind the UDP path, and measure tails where QUIC's independence pays.
