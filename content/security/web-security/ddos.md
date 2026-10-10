---
title: "DDoS"
summary: "Overwhelming a service with traffic from many sources."
levels: { backend: mid-level, frontend: mid-level }
---

A distributed denial-of-service (DDoS) attack sends traffic or expensive requests from many sources to exhaust a service's network capacity, connection slots, or application resources. A denial of service can also come from a small number of requests that trigger costly work; not every incident is a huge bandwidth flood.

Mitigation depends on the layer being saturated. Network providers and edge services can absorb or filter volumetric traffic before it reaches the origin. Application controls can limit expensive endpoints, cap request sizes, apply quotas, and shed nonessential work. A [WAF](/t/waf) may block some recognizable HTTP patterns, but it cannot by itself stop every attack or compensate for insufficient capacity upstream.

Design for failure: keep critical paths isolated, apply timeouts and bounded queues, and make overload behavior explicit. Rate limits based only on source IP can punish shared networks or miss distributed sources. During an incident, preserve logs and metrics that help identify which resources are failing while avoiding a response that amplifies load, such as aggressive retries.

Backend developers should protect costly operations and dependencies. Frontend developers can reduce unnecessary requests and use bounded retry behavior, but clients cannot defend the origin alone. Mitigation often depends on infrastructure providers and incident coordination; define contacts and escalation before an attack.

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
