---
title: "Forward Proxy"
summary: "A proxy acting on behalf of clients."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["forward proxy", "egress proxy", "outbound proxy"]
prereqs: ["http-proxy", "firewall"]
related: ["reverse-proxy", "api-gateway", "nat"]
---
A **forward proxy** sits between internal clients and the internet, forwarding outbound requests on their behalf: filtering destinations, caching shared responses, logging egress, and presenting one external face (often with NAT). Where a reverse proxy serves the server's interests, the forward proxy serves the *clients'* — or rather, their organisation's.

```text
office hosts → forward proxy (allowlist? log? cache?) → internet
```

Uses cluster around control and efficiency: egress allowlisting (only approved APIs reachable), inspection and DLP, shared caching of common fetches, and anonymised external identity. Configuration rides on proxy env vars, PAC files or transparent interception — each with sharp edges.

The classic mistakes:

- Proxying everything, including internal. Sending intra-VPC traffic out through the proxy adds latency, cost and failure modes. Exempt internal ranges (`NO_PROXY`) precisely.
- TLS interception without trust. Decrypting outbound TLS needs a custom CA on every client — and trains users past certificate warnings. Intercept only with full device control and a documented reason.
- Allowlist drift. Egress lists nobody updates break new integrations mysteriously ("works locally, blocked in prod"). Manage lists as code with a request path.
- Single egress chokepoint. All outbound through one proxy cluster makes it a scaling and availability bottleneck — and a blast radius. Scale and multi-AZ it like production.
- Logging without retention policy. Full egress logs are a privacy and storage liability. Log what policy needs; expire the rest.
- Caching authenticated content. Shared forward caches storing per-user responses leak across users. Cache only safe, public, marked-cacheable responses.

**How to deploy it:** explicit proxy config (not "transparent" surprises), tight internal exemptions, allowlists as code, and TLS interception only where devices are managed. Egress control is real security — when it's deliberate rather than accidental.
