---
title: "Token"
summary: "The unit of text a model reads and writes, and what you pay for."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["token", "tokens", "LLM token"]
prereqs: ["how-llms-work", "embeddings"]
related: ["how-llms-work", "llm-cost-latency", "context-window"]
---
A **token** is the unit a language model reads and writes: a chunk of text, often a common word, part of a longer word, or a punctuation mark. Models do not see characters or words directly; a tokenizer splits text into tokens and maps each to an identifier. Input and output are both measured in tokens, and most costs and limits are counted that way.

```text
"unbelievably" → ["un", "believ", "ably"]   (illustrative split)
```

Because tokenization is model-specific, the same text can have different token counts across models. Estimates from character length are rough; measure with the tokenizer of the model you use.

The classic mistakes:

- Estimating cost from word count. Non-English text, code, and unusual names often use more tokens than expected. Count with the actual tokenizer.
- Ignoring output tokens. Generated text is billed and takes time per token. Constrain length where it matters.
- Forgetting hidden tokens. System prompts, tool definitions and history all count toward input. Budget the whole request.
- Splitting text at arbitrary character positions. Cutting mid-word or mid-token loses meaning in retrieval and chunking. Split on structure.
- Assuming token counts are stable. Tokenizer changes can shift counts for the same text, which affects budgets and truncation.

**The practical habit:** know your token budget per request, count with the real tokenizer, and treat length as a resource to manage like memory or time.

Budget tokens per feature and per request type, then alert when the average drifts upward. Growth usually comes from longer retrieved context or accumulated conversation history, and it is far easier to catch in a dashboard than in an invoice.
