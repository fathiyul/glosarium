---
title: "TCP/IP Model"
summary: "The practical four-layer model the internet actually runs on."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["tcp/ip model", "internet model", "dod model"]
prereqs: ["osi-model", "tcp"]
related: ["osi-model", "udp", "dns"]
---

Where OSI describes seven theoretical layers, the **TCP/IP model** describes the four the internet actually runs: link (get it across one hop), internet (IP — address and route across hops), transport (TCP/UDP — streams or datagrams between ports), and application (everything above: HTTP, DNS, your protocol). It won by being descriptive rather than prescriptive.

```text
application   HTTP, DNS, SSH, your API
transport     TCP (streams) / UDP (datagrams)
internet      IP (addressing, routing)
link          Ethernet, Wi-Fi (one hop)
```

Notice what's *missing*: no session or presentation layers — TLS, sessions and encoding live in the application space, implemented by libraries rather than the network. That placement explains endless confusion about "which layer is TLS on": in TCP/IP terms, it's simply part of the application stack, running over TCP.

The classic mistakes:

- Quoting OSI in a TCP/IP world. Seven-layer precision about session vs presentation layers describes nothing real. Four layers locate faults just as well.
- Putting guarantees in the wrong layer. Reliability belongs to transport (TCP) or the app — not to IP, which deliberately promises almost nothing. Design retries and acks accordingly.
- Forgetting the link layer. "The network is down" is sometimes Wi-Fi, a cable, or an MTU mismatch one hop away. Check the bottom.
- Treating ports as application concepts. Ports are transport-layer addressing (which socket), not URLs or APIs. "Connection refused" is transport telling you nobody's home.
- Assuming layers are strict. Real systems cheat constantly: middleboxes peek at application headers, applications implement transport features (QUIC in userspace). Layers are a map, not walls.
- Using the model to win arguments. Its job is locating faults and placing guarantees, not settling taxonomy debates.

**How to use it:** four layers, bottom-up debugging, guarantees placed where they're actually provided. It pairs with the [OSI model](/t/osi-model) as vocabulary — TCP/IP for how things are, OSI for how to talk about them.
