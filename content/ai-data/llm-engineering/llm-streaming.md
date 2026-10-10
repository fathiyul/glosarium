---
title: "Streaming Responses"
summary: "Showing model output token by token as it's generated."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["streaming responses", "LLM streaming", "token streaming"]
prereqs: ["how-llms-work", "server-sent-events"]
related: ["server-sent-events", "llm-cost-latency", "ai-product-ux"]
---
**Streaming responses** deliver a model's output as it is generated, token by token, instead of waiting for the full answer. The user sees the first words quickly and the rest arrives progressively, which shortens the time to something useful even when the total generation takes just as long.

```text
request → model generates → chunk → chunk → chunk → end-of-stream
```

Streaming is a transport and interface choice layered on top of generation. It usually runs over server-sent events or a similar long-lived connection. The model's total work is unchanged; what improves is perceived latency.

The classic mistakes:

- Streaming without handling interruption. Users close tabs or cancel. Propagate cancellation so generation stops and cost is not wasted.
- Rendering unsafe partial output. Partial text may contain half-formed markup or links. Sanitise on every chunk, not only at the end.
- Assuming the first token is representative. Early text can be a preamble that the final answer contradicts. Do not act on partial output.
- Losing errors mid-stream. A connection can fail after a partial answer. Show a clear error state and allow retry rather than leaving a silent half-answer.
- Buffering proxies defeating the stream. Intermediaries that collect the whole response negate the benefit. Disable buffering on streaming routes.

**When to stream:** interactive chat and drafting, where a visible start matters. For background jobs whose output is consumed as a whole, batch responses are simpler.

Measure what users actually feel: time to first token, time to a usable answer and the rate of cancelled requests. Those three numbers reveal far more about the experience than total generation time, which is what most dashboards report by default.
