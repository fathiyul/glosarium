---
title: "Packet Capture (tcpdump, Wireshark)"
summary: "Recording and inspecting raw network traffic."
levels: { backend: senior, data-engineer: senior }
aliases: ["packet capture", "tcpdump", "wireshark", "pcap"]
prereqs: ["packet", "tcp"]
related: ["inspecting-connections", "tls", "packet"]
---

**Packet capture** records the actual bytes crossing an interface — `tcpdump` on servers (command-line, scriptable, ubiquitous) and Wireshark for deep interactive analysis. When logs disagree and theories multiply, a capture shows what *really* happened: retransmits, resets, handshake failures, malformed requests, timing gaps.

```text
tcpdump -i eth0 -w out.pcap 'tcp port 5432'   # capture now, analyse later
wireshark out.pcap                            # follow streams, graph timing
```

Capture with a tight filter (host, port) to keep files small, analyse offline, and mind the privacy: captures contain credentials, tokens and personal data in whatever wasn't encrypted.

The classic mistakes:

- Capturing everything. An unfiltered capture on a busy host fills disks in minutes and buries the signal. Filter to the flow in question; snapshot small.
- Expecting to read TLS. Encrypted payloads are opaque by design — captures show handshakes, sizes and timing, not bodies. For content, log at the endpoints (with key logging only in lab conditions, never production keys).
- Capturing in only one place. Client-side and server-side captures together prove where packets vanish; one side alone invites wrong conclusions about the middle.
- Ignoring timestamps and flags. Retransmissions, duplicate ACKs, RSTs and window sizes *are* the diagnosis. Learn to read TCP behaviour, not just payloads.
- Production captures without care. Full capture is surveillance and a compliance event. Minimise scope and duration, restrict access, and prefer metadata (flow logs) for routine monitoring.
- Clock skew between captures. Correlating two captures needs aligned clocks; NTP-synced hosts or a common reference event make comparison possible.
- Analysing on the sick host. Heavy dissection competes with the struggling service. Copy the pcap elsewhere for analysis.

**When to reach for it:** after socket state and logs narrow the suspect flow — captures settle wire-level disputes definitively. It's the ground truth beneath every higher abstraction, used sparingly and precisely.
