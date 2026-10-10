---
title: "HTTP/1.1"
summary: "The text-based HTTP version with one request at a time per connection."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["http/1.1", "http1", "http 1.1"]
prereqs: ["http", "tcp"]
related: ["http-2", "keep-alive", "http-proxy"]
---

**HTTP/1.1** is the long-lived version of HTTP: textual request/response messages over TCP, with the semantics everything later kept — methods, status codes, headers, content negotiation, caching. Its defining mechanics are one-request-at-a-time per connection (with keep-alive reuse, and historically parallel connections to fake concurrency) and human-readable messages.

```text
GET /page HTTP/1.1
Host: example.com
Accept: text/html
```

It persists because it's simple, universal and debuggable: curl, logs and proxies all speak it fluently. HTTP/2 and HTTP/3 keep its semantics exactly and change only the transport — multiplexing, header compression, QUIC — so understanding 1.1 is understanding the web's vocabulary.

The classic mistakes:

- Chatty APIs on 1.1. Sequential requests each pay full round trips; dozens of tiny calls make pages slow regardless of bandwidth. Batch, parallelise, or move to multiplexed transports.
- Too many parallel connections. The old "6 per origin" workaround becomes connection-churn overhead through load balancers. It's a hack, not an architecture.
- Head-of-line blocking. One slow response stalls everything behind it on that connection — the flaw multiplexing was invented to fix (see [head-of-line blocking](/t/head-of-line-blocking)).
- Assuming plaintext. 1.1 needs TLS for privacy (HTTPS); "HTTP/1.1" alone says nothing about encryption. Always layer TLS outside trusted networks.
- Ignoring connection reuse. Fresh 1.1 connections without keep-alive repay TCP+TLS setup per request. Pool and persist.
- Pipelining. 1.1's attempt at in-order pipelining was buggy across implementations and is effectively dead. Don't use it; use concurrent connections or a newer version.

**Its place:** the semantic foundation every HTTP version shares. Know its messages cold; reach for newer versions when transport efficiency (multiplexing, push elimination, loss resilience) is the bottleneck.
