---
title: "Retrieval-Augmented Generation (RAG)"
summary: "Giving a model relevant documents so it answers from your data."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["RAG", "retrieval-augmented generation", "retrieval augmented generation"]
prereqs: ["embeddings", "chunking"]
related: ["semantic-search", "reranking", "chunking"]
---
**Retrieval-augmented generation (RAG)** supplies a language model with relevant material from your own sources at the moment of answering. The system retrieves passages that match the question, places them in the prompt, and asks the model to answer using them. The model then reasons over current, specific content instead of relying only on what it learned in training.

```text
question → retrieve relevant passages → prompt = passages + question → answer with citations
```

RAG is usually the first thing to reach for when a model must answer from private or changing information, because it avoids retraining and lets you update knowledge by updating the index. Its quality is limited by the retriever: if the right passage is not retrieved, no amount of prompting fixes the answer.

The classic mistakes:

- Blaming the model when retrieval fails. Measure retrieval separately: does the correct passage appear in the top results for real questions?
- Poor chunking. Passages cut mid-thought or huge blocks dilute relevance. Chunk to match how questions are asked (see [chunking](/t/chunking)).
- No citations or source checks. Users cannot tell whether an answer is grounded. Return sources and check that the answer is supported by them.
- Stale index. Updated source documents that are not re-indexed produce confident answers from old content.
- Context flooding. Retrieving many loosely related passages makes answers vaguer. Retrieve fewer, better passages and rerank (see [reranking](/t/reranking)).
- Treating RAG as a fix for everything. It addresses missing knowledge, not weak reasoning or poor instructions.

**The discipline:** evaluate retrieval and generation separately, cite sources, and keep the index in step with the content it serves.
