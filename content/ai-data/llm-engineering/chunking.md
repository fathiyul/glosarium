---
title: "Chunking"
summary: "Splitting documents into pieces for embedding and retrieval."
levels: { backend: senior, data-engineer: senior }
aliases: ["chunking", "text chunking", "document splitting"]
prereqs: ["embeddings", "llm-token"]
related: ["rag", "embeddings", "semantic-search"]
---
**Chunking** splits source documents into smaller passages before they are embedded and indexed for retrieval. A good chunk is a self-contained unit of meaning, sized so it can be matched to a question and still fit comfortably in a model's input alongside other material.

```text
document → split at structure (headings, paragraphs) → chunks with overlap and metadata → index
```

Chunking decides what a retriever can find. Chunks that are too large blur several topics into one vector; chunks that are too small lose the context needed to answer. The right size depends on how users phrase questions and how documents are organised.

The classic mistakes:

- Fixed character windows. Splitting every N characters cuts sentences and tables mid-thought. Split on structural boundaries where possible.
- No overlap or context. A key fact at a chunk boundary can be separated from the term it refers to. Add modest overlap or carry the section heading into each chunk.
- Losing metadata. Without the source title, section and date, retrieved passages cannot be cited or filtered. Attach metadata to every chunk.
- Ignoring tables and code. Naive splitting destroys table structure and code blocks. Treat them as units.
- Never evaluating chunk size. Test retrieval with a few chunk sizes on real questions before settling.

**Practice:** split on structure, keep metadata, add small overlap, and choose the size by measuring retrieval quality.

Look at a sample of chunks by hand before indexing everything. Broken tables, orphaned headings and chunks that start mid-sentence are obvious to a reader and easy to miss in aggregate metrics, but they quietly degrade every answer built on them.
