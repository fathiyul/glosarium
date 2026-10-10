---
title: "MTU"
summary: "The largest packet size a network link can carry."
levels: { backend: senior }
aliases: ["mtu", "maximum transmission unit", "packet size limit"]
prereqs: ["packet", "icmp"]
related: ["packet", "vpn", "udp"]
---

The **MTU** is the largest packet a link accepts — 1500 bytes on standard Ethernet, 9000 on jumbo-frame networks, smaller on tunnels and VPNs (which steal bytes for headers). Oversized packets must fragment (IPv4) or are dropped with an ICMP "too big" message (IPv6, and IPv4 with don't-fragment set) so the sender can learn the path's limit (PMTUD).

```text
1500B Ethernet ─▶ 1400B VPN tunnel: 1500B packet → fragment or drop+ICMP
```

MTU trouble presents as *selective* breakage: small requests work, large transfers hang — the classic "some sites load, big downloads stall" signature. Tunnels, PPPoE and VPNs lowering the effective MTU while ICMP blackholes eat the "too big" signals are the usual cause.

The classic mistakes:

- Blocking all ICMP. "Too big" messages *are* path MTU discovery. Firewalls eating them produce exactly the selective-hang symptom. Allow the error types.
- Forgetting tunnel overhead. Every encapsulation (VPN, GRE, VXLAN, PPPoE) shrinks payload room. Size endpoints' MTU/MSS for the *encapsulated* path, not the raw link.
- Jumbo frames halfway. Enabling 9000-byte frames on hosts but not on every switch in the path creates a network that works until it doesn't. All-or-nothing per L2 domain.
- UDP past the MTU. Fragmented datagrams die entirely if one fragment is lost. Keep datagrams small or implement your own fragmentation awareness.
- MSS clamping ignorance. TCP MSS clamping at the tunnel ingress is the standard fix for TCP-over-tunnel hangs — know it exists before debugging packet by packet.
- Assuming 1500 everywhere. Cloud overlays, tunnels and mobile paths routinely offer less. Discover, don't assume.

**The symptom to remember:** small works, big hangs — think MTU and missing ICMP. Clamp MSS at tunnels, allow discovery messages, and keep datagrams comfortably under the path limit.
