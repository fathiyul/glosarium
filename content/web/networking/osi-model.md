---
title: "OSI Model"
summary: "A seven-layer model of how network communication is structured."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["osi model", "osi layers", "seven layer model"]
prereqs: ["tcp", "packet"]
related: ["tcp-ip-model", "tls-handshake", "firewall"]
---

The **OSI model** splits networking into seven layers — physical, data link, network, transport, session, presentation, application. Almost nobody implements it literally (the real internet runs the simpler TCP/IP model), but it survives as *vocabulary*: saying "that's a layer-3 problem" (routing) versus "a layer-7 problem" (the app or a WAF rule) locates a fault instantly.

```text
7 application   HTTP, DNS, your API      ← "the site returns 500"
4 transport     TCP/UDP                  ← "connection refused"
3 network       IP, routing              ← "host unreachable"
2 data link     Ethernet, Wi-Fi          ← "no link"
```

The model's value is diagnostic: start at the bottom and move up. No link? Layers 1–2. Host unreachable? Layer 3. Connection refused or hanging? Layer 4. Connected but wrong answers? Layers 5–7. Half of network debugging is just checking the layers in order instead of guessing.

The classic mistakes:

- Treating it as architecture. Designing systems around seven strict layers leads to over-abstraction. Use it as a map, not a blueprint; the [TCP/IP model](/t/tcp-ip-model) is closer to reality.
- Debugging top-down. Starting with application logs when the route is down wastes an hour. Physical → link → network → transport → application, in order.
- Misplacing TLS. TLS sits around layer 5–6 (session/presentation) — above TCP, below HTTP. "Is the handshake failing or is the app failing?" is a layer question with different fixes.
- Confusing VLANs, VPNs and subnets. All "separate networks" at different layers with different properties. Name the layer to avoid talking past each other.
- Forgetting layer 8. The running joke — layer 8 is the user, politics, the expired certificate nobody renewed. Real outages live there too.
- Over-specifying in interviews and docs. Reciting all seven layers proves little; locating a real fault in the right layer proves understanding.

**How to use it:** as a shared coordinate system for faults and designs. When something breaks, name the lowest layer that's broken; when something's designed, name which layer provides each guarantee. Precision here saves hours everywhere else.
