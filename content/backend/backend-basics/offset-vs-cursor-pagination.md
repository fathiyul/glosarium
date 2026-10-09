---
title: "Offset vs Cursor Pagination"
summary: "Simple page numbers vs stable, scalable cursors."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["offset pagination", "cursor pagination", "keyset pagination", "LIMIT OFFSET", "seek method"]
prereqs: ["pagination", "db-index"]
related: ["pagination", "unbounded-result-sets", "filtering-sorting", "db-index", "rest", "api-design"]
core: [backend]
also: [api-design, sql]
---

Two ways for an API to return "the next page" of results.

## Offset (page-number) pagination

```sql
SELECT * FROM orders ORDER BY created_at DESC, id DESC LIMIT 20 OFFSET 40;     -- page 3
```

```
GET /orders?limit=20&offset=40        or        GET /orders?page=3&per_page=20
```

Simple, and it lets users **jump to any page**. Problems:

- **Slow on deep pages.** `OFFSET 1000000` makes the database find and then discard a million rows before returning 20. The cost grows with the offset.
- **Unstable when data changes.** If a new order is inserted while someone's reading, every item shifts by one, so a row appears twice (end of page 2 and start of page 3), or one is skipped when something is deleted.

## Cursor (keyset) pagination

Instead of "skip N rows", say "give me the rows **after this one**":

```sql
SELECT * FROM orders
WHERE (created_at, id) < (:last_created_at, :last_id)      -- the last item of the previous page
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

```
GET /orders?limit=20&after=eyJjcmVhdGVkX2F0IjoiMjAyNC0wNi0wMVQwOTozMDowMFoiLCJpZCI6OTE3fQ
```

The cursor is an **opaque token** encoding the position (here, the last row's sort values), returned with each page:

```json
{ "items": [ ... ], "next_cursor": "eyJ...", "has_more": true }
```

Benefits: **fast at any depth** (with an index on the sort columns, the database jumps straight to the position), and **stable** under inserts and deletes.

## Comparison

| | Offset | Cursor |
|---|---|---|
| Jump to page N | Yes | No (only next and previous) |
| Speed on deep pages | Degrades | Constant |
| Consistent when data changes | No | Yes |
| Implementation | Trivial | More work |
| Total count and "page 3 of 50" | Natural (but counting is costly) | Awkward |
| Good for | Small data, admin tables, numbered pages | Feeds, infinite scroll, large or fast-changing data, APIs |

## Details to get right

- **Always sort by a unique, indexed combination.** If you sort by a non-unique column (`created_at`), add a tie-breaker (`id`), or rows with equal values get skipped or duplicated.
- **Make the cursor opaque** (encoded). Clients shouldn't parse or build it, so you can change the internals ([API design](/t/api-design)).
- **Validate and cap `limit`** ([unbounded result sets](/t/unbounded-result-sets)).
- **Index the sort columns** ([database indexes](/t/db-index)).
- **Filters must be consistent** between pages. A cursor is only valid for the same filters and sort order.
- Offer both when you need to: a cursor for iterating through everything, and offset for small UI tables.

General concepts and rules are in [pagination](/t/pagination).
