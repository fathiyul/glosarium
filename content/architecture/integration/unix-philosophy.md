---
title: "Unix Philosophy"
summary: "Small tools that do one thing well and compose through pipes."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["unix philosophy", "do one thing well", "unix pipes"]
prereqs: ["shell", "modular-monolith"]
related: ["microservices", "pipes-and-filters", "modular-monolith"]
---
The **Unix philosophy** — small sharp tools, composing through universal interfaces (text streams), doing one thing well — remains the best argument for modularity ever shipped: `grep | sort | uniq -c` assembles pipelines no single program imagined, because byte-stream interfaces compose universally.

```text
small programs + text streams + composition > monolithic features
```

Its principles transfer directly: programs doing one thing (services with bounded responsibilities), expecting each other's output (contracts over internals), universal interfaces enabling unforeseen composition (HTTP/JSON/events as today's text streams), and economy of mechanism (boring technology composed cleverly beats clever technology composed hopefully).

The classic mistakes:

- Microservices without composability. Dozens of services with bespoke binary protocols and no uniform interface recreate silos, not pipelines. Standardise the seams (events, HTTP, schemas).
- Text-stream nostalgia. Byte streams suit logs and lines; structured data needs schemas (JSON, protobuf) — the philosophy is composability, not literal text.
- "One thing" atomised. Splitting past coherence (a service per function) multiplies operational cost beyond composition benefit. Size modules by bounded context, not by minimalism.
- Ignoring failure composition. Unix pipelines fail visibly and locally; distributed compositions fail partially and confusingly. Add the error handling pipes never needed (timeouts, retries, dead letters).
- Worse-is-better misread. Simplicity winning doesn't bless sloppiness — Unix tools are exact about their contracts. Simple interfaces, rigorous semantics.
- Reinventing pipes expensively. Service meshes, workflow engines and ETL frameworks reimplement composition with ceremony where pipes-plus-contracts would do. Reach for platforms when composition outgrows scripts, not before.

**What endures:** compose small exact things through universal interfaces. Microservices, pipes-and-filters and serverless all rhyme with it — the philosophy names the pattern they approximate.
