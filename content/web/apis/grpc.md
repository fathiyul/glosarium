---
title: "gRPC"
summary: "A fast RPC framework built on HTTP/2 and Protocol Buffers."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["grpc", "grpc api", "grpc service"]
prereqs: ["protocol-buffers", "http-2"]
related: ["protocol-buffers", "rest-vs-graphql-vs-grpc", "http-2"]
---

**gRPC** is a contract-first RPC framework: services defined in `.proto`, binary [protobuf](/t/protocol-buffers) payloads, transported over HTTP/2 with first-class streaming (unary, server-streaming, client-streaming, bidirectional). It brings typed clients, codegen and efficient binary transport to service-to-service calls.

```proto
service Orders {
  rpc Get (GetRequest) returns (Order);
  rpc Watch (WatchRequest) returns (stream OrderEvent);
}
```

The streaming and efficiency story is strongest inside the datacenter: multiplexed connections, small binary messages, deadlines and cancellation propagated natively. Tooling (health checks, reflection, load balancing) assumes this environment.

The classic mistakes:

- Exposing it directly to browsers. Browsers can't speak gRPC natively — it needs gRPC-web plus a proxy, losing much of the benefit. Serve browsers JSON/REST or GraphQL; keep gRPC internal.
- No deadlines. RPC without deadlines inherits infinite patience. Set and propagate them; a missing deadline is the common cascading-failure vector.
- Ignoring load-balancer behaviour. HTTP/2 multiplexing pins connections, defeating per-request L7 balancing. Use client-side balancing, sticky-aware proxies, or connection management designed for long-lived multiplexed streams.
- Binary opacity in debugging. No curl-and-eyeball; invest in reflection, grpcurl and logging, or every incident starts blind.
- Breaking proto evolution. Reused field numbers and type changes corrupt silently. Same discipline as protobuf generally, enforced harder because many services share the contracts.
- Using it for cacheable CRUD. gRPC bypasses HTTP caching semantics entirely. Resource reads that intermediaries could cache belong on REST.
- Error model mismatch. gRPC status codes aren't HTTP statuses; gateways translating between them need an explicit mapping, not assumptions.

**When to choose it:** typed, high-volume service-to-service communication with streaming needs. For browser-facing or cacheable resource APIs, REST or GraphQL fit better — see the [three-way comparison](/t/rest-vs-graphql-vs-grpc).
