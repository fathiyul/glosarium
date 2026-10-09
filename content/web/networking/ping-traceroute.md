---
title: "ping and traceroute"
summary: "Checking reachability and the path packets take."
levels: { backend: junior, data-engineer: junior }
aliases: ["ping", "traceroute", "tracert", "mtr"]
prereqs: ["ip-address", "shell"]
related: ["icmp", "dns", "round-trip-time", "firewall"]
---

Two basic tools for diagnosing network problems.

## ping: is it reachable, and how fast?

`ping` sends small test packets (ICMP echo requests) to a host and times the replies.

```sh
ping example.com
# 64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=12.3 ms
# 64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=11.9 ms
# --- 4 packets transmitted, 4 received, 0% packet loss
```

It tells you:

- **Is the host reachable?** Replies mean yes.
- **Round-trip time** (latency) in milliseconds ([round-trip time](/t/round-trip-time)).
- **Packet loss**, a sign of a poor connection.

Use `ping 8.8.8.8` to test internet connectivity without DNS, and `ping example.com` to test name resolution as well. If the IP works but the name doesn't, the problem is [DNS](/t/dns).

## traceroute: what path do packets take?

```sh
traceroute example.com        # (tracert on Windows)
#  1  192.168.1.1     1.2 ms
#  2  10.20.0.1       8.5 ms
#  3  * * *
#  4  93.184.216.34  12.0 ms
```

It lists each router ("hop") between you and the destination, with the time taken to reach each. It reveals **where** delay or failure begins. `mtr` combines ping and traceroute in a live view.

## Reading the results carefully

- **No reply doesn't always mean down.** Many hosts and firewalls block ICMP, so `ping` fails while the website works ([firewalls](/t/firewall)).
- **`* * *` lines** in traceroute are routers that don't answer, not necessarily problems. Look at whether later hops respond.
- **A single slow hop** that isn't followed by slower ones usually just means that router deprioritizes replies.
- **Ping measures the network, not your application.** A server can answer ping while the app is broken.

## When to use which tool

| Question | Tool |
|---|---|
| Can I reach this host? | `ping` |
| Is name resolution working? | `ping` by name, or `dig` ([DNS](/t/dns)) |
| Is the port open and the app responding? | `curl`, or `nc -vz host port` ([curl](/t/curl), [port](/t/port)) |
| Where is the connection slow or failing? | `traceroute`, `mtr` |
