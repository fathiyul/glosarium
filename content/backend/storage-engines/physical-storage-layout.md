---
title: "Pages, Tuples and File Layout"
summary: "How rows are physically laid out on disk."
levels: { backend: principal, data-engineer: principal }
aliases: ["physical storage layout", "pages and tuples", "file layout"]
prereqs: ["storage-engine", "buffer-pool"]
related: ["storage-engine", "buffer-pool", "db-index", "inode"]
---

At the lowest level, a database stores data in fixed-size **pages** (often a few kilobytes) — the unit of reading from and writing to disk, and the unit held in the [buffer pool](/t/buffer-pool). A table's rows (`tuples` in database terms) live inside these pages, and the layout of pages and tuples is the **physical storage layout**.

A typical heap page contains:

- a **header** with metadata (page id, free-space pointers, checksums, visibility info)
- an array of **item pointers** to slots
- the tuple data itself, growing from the end
- free space in the middle

```text
page: [ header | item pointers → ... free ... ← tuple data ]
```

Rows are addressed by (page id, slot), which is what an index entry ultimately points to. Reading a row means reading its page; the buffer pool caches pages, so the physical layout directly affects I/O and cache efficiency.

The classic mistakes:

- Assuming rows are contiguous. Rows are scattered across pages, and a table is many pages possibly split into files. Sequential logical order rarely equals physical order.
- Ignoring row size and page fit. Very wide rows (big text/blobs, many columns) reduce rows per page, meaning more pages per scan and worse cache efficiency. Large values may be stored out-of-line (TOAST/overflow), adding indirection.
- Forgetting dead tuples (MVCC). In [MVCC](/t/mvcc) engines, updates leave dead tuples in pages until [vacuum](/t/vacuum) reclaims them, so a physical page scan touches versions you don't need. Layout and bloat interact.
- Assuming updates are cheap. An in-place update changes a page and requires a write; on a B-tree this can mean reading and rewriting a page (and dirtying it in the pool), not just changing a few bytes.
- Ignoring fill factor. Leaving space in pages (fill factor) affects whether updates fit in place or force new pages (splits), trading space for update performance.
- Treating storage as a flat file. Database files are structured (pages, segments, sometimes extents) with their own management; reasoning about "the file" misses this.
- Missing the connection to indexes. Index entries reference (page, slot); if the physical location changes (updates, splits, vacuum), indexes must be updated accordingly — a source of write cost.

Why it matters: the physical layout explains why databases read in pages, why row width and page fit affect scan speed, why bloat and vacuum exist, and why "read one row" still costs a page read. It's the ground floor under the [storage engine](/t/storage-engine) and [buffer pool](/t/buffer-pool) — see [write amplification](/t/write-amplification) for how this layout turns one logical write into several physical ones.
