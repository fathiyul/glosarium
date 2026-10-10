---
title: "iptables / nftables"
summary: "Linux's built-in firewall."
levels: { backend: senior, data-engineer: senior }
aliases: ["iptables", "nftables", "linux firewall"]
prereqs: ["linux", "firewall"]
related: ["server-hardening", "port", "container-networking", "network-policy", "ssh"]
---

**iptables** and its successor **nftables** are the packet-filtering tools built into the Linux kernel. They decide which network traffic a machine accepts, rejects or forwards, based on rules you define. They're the firewall behind most [server hardening](/t/server-hardening), and they're also what container and orchestration tools use under the hood to wire up networking.

Rules are organised into **chains** (for example INPUT, OUTPUT and FORWARD) inside tables (filter for allowing/blocking, nat for address translation). A packet is matched against the chain's rules in order, and the first match wins.

```sh
# iptables-style: allow established, allow SSH, then drop the rest
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -j DROP
```

`nftables` expresses the same ideas with a unified syntax and better performance for large rule sets. On many distributions, the `iptables` command is now a compatibility front end over nftables — so the concepts transfer even if the syntax differs.

The classic mistakes:

- Locking yourself out. If you set a default-deny policy without first allowing established connections and your SSH port, you lose access. Always keep the "established/related" rule and add your rules before flipping the policy.
- Forgetting to persist. Rules set interactively are gone after a reboot unless saved by the firewall service or a config manager. The server comes back unfiltered.
- Misunderstanding ordering. Rules are first-match, so a broad `ACCEPT` above a specific `DROP` makes the drop dead. Put specific rules first.
- Fighting hidden rules. Docker and Kubernetes insert their own rules. Editing the firewall on a container host can break pod networking or get silently overridden. Understand what's managing your rules before changing them.

**When not to use it:** on hosts where a cloud [security group](/t/security-group) or a managed firewall already filters traffic, host rules are a second layer rather than the only one. For cluster traffic, [network policies](/t/network-policy) are the usual tool. Use both layers together — defence in depth — and be careful that neither surprises you.
