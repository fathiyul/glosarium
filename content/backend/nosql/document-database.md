---
title: "Document Database"
summary: "Storing JSON-like documents, as in MongoDB."
levels: { backend: junior, data-engineer: junior }
aliases: ["document store", "document DB"]
prereqs: ["nosql"]
related: ["nosql", "key-value-store", "relationship-types", "schema"]
---

A document database stores each record as a self-contained document, usually JSON-like, that can hold nested objects and lists. MongoDB is the best-known example. Documents in the same collection don't need identical fields.

```js
// Illustrative MongoDB-style shell syntax
db.orders.insertOne({
  customer: "Ada",
  items: [
    { sku: "A1", qty: 2 },
    { sku: "B7", qty: 1 }
  ],
  placed_at: "2026-03-04T10:00:00Z"
});
```

The main design decision is whether to nest related data inside a document or to store it separately and link it by ID. Nesting suits data that's always read and written together, such as an order and its line items. Linking suits data shared across many records, such as a product that appears in thousands of orders, because updating it in one place is simpler.

The classic mistake is assuming "no schema" means no design. The database won't check your fields, so the application has to, and documents written by different versions of the code can end up with different shapes. Decide the shape you expect, and validate it when you write. Also, a document that grows without limit, such as one holding every event a user ever had, gets slow to update and read.
