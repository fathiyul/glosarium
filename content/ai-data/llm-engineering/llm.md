---
title: "Large Language Model"
summary: "A model trained on huge amounts of text to understand and generate language."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["LLM", "language model"]
prereqs: ["api-design"]
related: ["prompt-engineering", "hallucination", "rag", "llm-token"]
---

A large language model (LLM) is a neural network trained on very large amounts of text. It learns to predict what text comes next, and that ability lets it summarize, classify, rewrite, answer questions and write code. You use it by sending text, called a prompt, and receiving generated text back, usually through an API.

```
prompt:   "Summarize this support ticket in one sentence: ..."
response: "The customer was charged twice for the same order and wants a refund."
```

The same request can produce different wording each time, and the output is generated, not looked up. Models also have a training cutoff, so they don't know about events after it unless you give them that information.

The classic mistake is trusting the output as if it were verified. A model can state something false with confidence, which is called [hallucination](/t/hallucination). Check results against a source of truth for anything that matters, such as prices, legal text or user records. Also consider cost and latency, which both scale with the size of the input and output, measured in [tokens](/t/llm-token).
