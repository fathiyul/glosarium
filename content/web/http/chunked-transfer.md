---
title: "Chunked Transfer Encoding"
summary: "Streaming a response in pieces without knowing its total size."
levels: { backend: senior, frontend: senior }
aliases: ["chunked transfer", "chunked encoding", "transfer-encoding chunked"]
prereqs: ["http-1-1", "http"]
related: ["http-1-1", "server-sent-events", "compression"]
---

**Chunked transfer encoding** sends an HTTP/1.1 response as a series of sized chunks instead of one `Content-Length` body — letting the server start streaming before it knows the total size. Dynamic pages, SSE streams, proxied responses and generated downloads all use it: first bytes flow immediately, the terminating zero-length chunk ends the stream.

```text
HTTP/1.1 200 OK
Transfer-Encoding: chunked

7\r\nMozilla\r\n  9\r\nDeveloper\r\n  0\r\n\r\n   (stream, then terminator)
```

Each chunk carries its own length, so framing stays intact without a total. (HTTP/2+ replace chunking with native framing — DATA frames stream by design — but the pattern of "start before you know the end" persists everywhere.)

The classic mistakes:

- Buffering what could stream. Waiting for the full report before sending byte one wastes time-to-first-byte. Flush early; stream rows, tokens, events as ready.
- Chunked with no flush discipline. Frameworks buffer by default; without explicit flushes, "streaming" code still sends one giant chunk at the end. Flush deliberately.
- Assuming length from chunks. Clients see arrival order, not totals — progress bars need out-of-band totals. Don't infer completion from chunk counts.
- Compression interaction. Compressed streams must flush the compressor too, or chunks sit uncompressed in buffers. Coordinate both layers.
- Proxy buffering. An intermediary that de-chunks and buffers defeats streaming silently. Disable buffering on streaming routes through the whole chain.
- Using it for framing messages. Chunks are transport framing, not application messages — coalescing and splitting happen freely. Frame messages yourself above.
- HTTP/2 assumptions on 1.1 paths. Code written against h2 streaming still needs chunking behaviour where 1.1 survives (older proxies, direct TCP). Test both.

**When to use it:** any response better started than finished first — streaming UIs, event streams, large generated files. Time-to-first-byte is user time; chunking spends it wisely.
