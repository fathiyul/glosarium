---
title: "Pagination"
summary: "Returning large result sets one page at a time."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["paging", "paginate", "limit and offset", "page size"]
prereqs: ["select-query"]
related: ["offset-vs-cursor-pagination", "unbounded-result-sets", "filtering-sorting", "rest", "api-design"]
core: [backend]
also: [api-design]
---

**Pagination** means returning a big list in **pages** instead of all at once. It protects your server, database and the
client from huge responses, and gives users something fast to look at.

```
GET /orders?limit=20&offset=40       →  items 41-60
GET /orders?page=3&per_page=20       →  the same, by page number
GET /orders?limit=20&after=ord_917   →  the 20 items after one ID (cursor)
```

```sql
SELECT * FROM orders ORDER BY id DESC LIMIT 20 OFFSET 40;
```

A typical response includes the items and what's needed to get the next page:

```json
{
  "items": [ ... ],
  "next_cursor": "ord_897",
  "has_more": true
}
```

## Two styles

| | Offset / page number | Cursor (keyset) |
|---|---|---|
| Request | `offset=40` or `page=3` | `after=<last item's id>` |
| Jump to page N | Yes | No |
| Stable while data changes | No: new rows shift pages, so items repeat or get skipped | Yes |
| Speed on deep pages | Slower: the database scans past all skipped rows | Constant |

See [offset vs cursor pagination](/t/offset-vs-cursor-pagination) for the trade-offs.

## Rules

- **Always paginate lists** that can grow, and set a **default and a maximum page size** (clients can ask for
  `limit=1000000`). See [unbounded result sets](/t/unbounded-result-sets).
- **Use a stable `ORDER BY`**, ideally with a unique tie-breaker such as `id`. Without one, rows can appear on two pages
  or none.
- **Tell the client how to get more** (`next` link, cursor or `has_more`).
- **Counting everything is expensive** on big tables. Return a total only if you need it, or an approximate one.
- Combine with [filtering and sorting](/t/filtering-sorting), and keep the parameter names consistent
  across your API.

Pagination also applies to reading from other APIs: loop until there's no next page, and don't assume everything
comes in one response.
