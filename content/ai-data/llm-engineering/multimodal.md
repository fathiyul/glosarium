---
title: "Multimodal Models"
summary: "Models that handle images, audio and text together."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["multimodal models", "multimodal", "vision language models"]
prereqs: ["how-llms-work", "embeddings"]
related: ["how-llms-work", "embeddings", "structured-output"]
---
**Multimodal models** accept more than one kind of input — typically text together with images, and sometimes audio or video — and reason across them in a single interaction. A user can ask a question about a photo, or a system can read a scanned invoice alongside its written instructions.

```text
text prompt + image → multimodal model → text answer (or structured output)
```

Under the hood, non-text inputs are converted into representations the model can attend to alongside text tokens. The practical effect for builders is that images and other media count against the same input budget as text and are subject to the same questions of accuracy, cost and latency.

The classic mistakes:

- Assuming perception is perfect. Small text in images, dense tables, and unusual layouts are misread. Test with the real documents your users send.
- Ignoring input cost. Images and other media consume substantial input budget; large or many attachments change latency and price.
- Trusting visual claims without checking. A model describing what it sees can invent details. For high-stakes extraction, verify against the source or a second method.
- Sending sensitive media without a policy. Photos and recordings can contain personal data; apply the same minimisation and retention rules as for text.
- Evaluating only on clean examples. Blur, glare, rotation and compression are the normal case in the field.

**When it's worth it:** when the information genuinely lives in non-text media. Otherwise, extracting text first is often cheaper and easier to test.
