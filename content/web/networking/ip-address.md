---
title: "IP Address"
summary: "A numeric address identifying a device on a network."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["IP", "internet protocol address", "IPv4 address", "IPv6 address"]
related: ["port", "dns", "private-ip", "ipv4-vs-ipv6", "localhost", "subnet"]
core: [backend]
---

An **IP address** is a number that identifies a device on a network, so other devices know
where to send data. It works like a postal address for packets.

Two versions are in use:

| | Looks like | Notes |
|---|---|---|
| **IPv4** | `192.168.1.20` | Four numbers from 0 to 255. About 4.3 billion possible addresses |
| **IPv6** | `2001:db8::1` | Eight groups of hex digits (zeros can be shortened with `::`). Vastly more addresses |

See [IPv4 vs IPv6](/t/ipv4-vs-ipv6).

## Public vs private

- A **public** address is reachable across the internet. Your servers have these.
- A **private** address only works inside a local network. IPv4 reserves ranges such as
  `10.x.x.x`, `172.16.x.x`-`172.31.x.x` and `192.168.x.x` for this. Your laptop at home likely
  has one (see [private IPs](/t/private-ip)).
- `127.0.0.1` is **localhost**: this very machine, used for connecting to services you run
  locally ([localhost](/t/localhost)).

Many devices can share one public address via NAT, which is why your home address list isn't
your computer's internet identity.

## What it means for developers

- You usually reach services by name; [DNS](/t/dns) finds the IP.
- An address alone isn't enough to reach a program. You also need a [port](/t/port):
  `192.168.1.20:5432`.
- `0.0.0.0` in a server's settings means "listen on all network interfaces", while
  `127.0.0.1` means "only this machine". A server that works locally but not from
  another device often listens on the wrong one.
- Don't hard-code IP addresses; they change. Don't treat an IP as proof of identity either,
  since it can be shared or spoofed.

Check yours with `ip addr` (Linux), `ifconfig` or `ipconfig`.
