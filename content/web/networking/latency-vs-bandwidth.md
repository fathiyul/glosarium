---
title: "Latency vs Bandwidth"
summary: "How long data takes to arrive vs how much can flow at once."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["latency", "bandwidth", "throughput vs latency"]
prereqs: ["ip-address"]
related: ["latency", "throughput", "round-trip-time", "tcp", "cdn"]
---

Two different measures describe how well a network connection performs, and people often mix them up.

- **Latency**: how long it takes for data to get from A to B (or for a request to get a response). Measured in milliseconds.
- **Bandwidth**: how much data can be sent per unit of time. Measured in bits per second (Mbps, Gbps).

A useful picture: a pipe. **Latency** is how long a drop takes to travel through. **Bandwidth** is how wide the pipe is, and how many drops flow at once.

```
A fat pipe can still be slow to start:
  satellite link: 100 Mbps, but 600 ms latency
A thin pipe can be quick to respond:
  old fiber line: 10 Mbps, but 5 ms latency
```

## Which one matters

| Task | Limited by |
|---|---|
| Downloading a large file | bandwidth |
| Streaming video | bandwidth (and steady throughput) |
| Loading a web page with many small requests | latency, since each round trip adds up |
| An API call or database query | latency |
| Gaming, video calls | latency (and its variation, jitter) |

A page with 50 sequential requests over a 100 ms connection spends five seconds just waiting, however fast the link.

## What drives latency

- **Distance.** Light in fiber is not instant. A trip across an ocean takes around 100 ms or more round trip.
- **Number of round trips**: connection setup (TCP and TLS handshakes) takes several before any data flows ([TCP handshake](/t/tcp-handshake), [round-trip time](/t/round-trip-time)).
- **Congestion and queuing**, routing, and processing time.

## Practical consequences

- **Reduce round trips**: batch requests, use HTTP/2 or HTTP/3, keep connections alive ([keep-alive](/t/keep-alive)).
- **Move data closer to users** with CDNs and regional deployments ([CDN](/t/cdn)).
- **Avoid chatty designs**, such as one call per item.
- **Compress and send less** when bandwidth is the limit.
- Test on slow, high-latency connections, not just your office network ([throttling in DevTools](/t/browser-devtools)).
