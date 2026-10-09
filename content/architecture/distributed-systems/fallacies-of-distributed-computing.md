---
title: "Fallacies of Distributed Computing"
summary: "Eight false assumptions, starting with \"the network is reliable\"."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["eight fallacies of distributed computing", "fallacies of distributed systems", "network is reliable", "Deutsch fallacies"]
prereqs: ["distributed-system"]
related: ["distributed-system", "cap-theorem", "timeouts", "retry-with-backoff", "latency-vs-bandwidth", "two-generals-problem"]
core: [backend]
---

In the 1990s, engineers at Sun Microsystems (the list is credited to Peter Deutsch and colleagues) wrote down **eight false assumptions** that programmers new to distributed systems tend to make. They all start from treating the network like a local function call. They're still the best checklist for what to design against.

| # | The fallacy | The reality, and what to do |
|---|---|---|
| 1 | **The network is reliable** | Packets are lost, connections drop, services restart. Use **timeouts, retries with backoff, and idempotency**, and handle failure paths ([timeouts](/t/timeouts), [retry with backoff](/t/retry-with-backoff)) |
| 2 | **Latency is zero** | A network call is thousands to millions of times slower than a function call, and it varies. Avoid chatty designs (N+1 across services), batch, cache and use async ([latency vs bandwidth](/t/latency-vs-bandwidth)) |
| 3 | **Bandwidth is infinite** | Links have limits and cost. Don't ship huge payloads casually. Paginate, compress, send deltas |
| 4 | **The network is secure** | Traffic can be intercepted or spoofed, and internal networks get breached. Use TLS and authenticate between services ([mTLS](/t/mtls), [zero trust](/t/zero-trust)) |
| 5 | **Topology doesn't change** | Servers come and go, IPs change, routes shift, autoscaling happens. Use **service discovery** and DNS carefully, and don't hard-code addresses ([service discovery](/t/service-discovery)) |
| 6 | **There is one administrator** | Different teams, companies and clouds control different parts. Expect version skew, different policies and partial outages beyond your control |
| 7 | **Transport cost is zero** | Serialization, network and infrastructure cost CPU and money, including data egress. Count it ([egress costs](/t/egress-costs)) |
| 8 | **The network is homogeneous** | Different hardware, operating systems, protocols and versions interoperate. Use standard, versioned formats and be tolerant of differences ([schema evolution](/t/schema-evolution)) |

(Sources differ slightly on the exact wording, and the eighth fallacy was added later by another engineer, but the list as above is the common one.)

## How these show up in everyday bugs

- A service hangs forever because a call had **no timeout** (fallacy 1).
- A page makes 200 sequential API calls, and takes 20 seconds (fallacy 2).
- A retry creates duplicate charges, since the first request *did* succeed and only the response was lost (fallacy 1: see [idempotency keys](/t/idempotency-key)).
- A service works in staging and fails in production because of a firewall or a proxy (fallacies 4, 5, 6).
- A hard-coded IP breaks after a redeploy (fallacy 5).

## Using the list

- **Review designs against each item**: "What happens when this call is slow? Fails? Returns twice? Is blocked by a firewall?"
- **Make failure handling part of the definition of done**, not an afterthought.
- Remember the deeper problem: you often **can't tell whether a request that timed out was processed** ([two generals problem](/t/two-generals-problem)).

Local calls teach you habits that are wrong for remote ones. The fallacies are a reminder to unlearn them ([distributed systems](/t/distributed-system)).
