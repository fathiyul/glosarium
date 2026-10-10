---
title: "Bus Matrix"
summary: "A planning grid of business processes and the dimensions they share."
levels: { data-engineer: staff }
aliases: ["enterprise bus matrix", "bus architecture", "business process matrix", "process-dimension matrix"]
prereqs: ["dimensional-modeling", "conformed-dimension"]
related: ["star-schema", "fact-table", "dimension-table", "inmon-vs-kimball", "data-vault", "data-mart"]
---

A **bus matrix** is a planning grid for a [Kimball-style warehouse](/t/dimensional-modeling). Each row is a business process — orders, shipments, returns, support tickets. Each column is a dimension — date, customer, product, store. A mark in a cell means that process needs that dimension.

```
                date  customer  product  store  employee
 orders          X      X         X        X
 shipments       X      X         X        X      X
 returns         X      X         X        X
```

Read **down a column** to see which processes share a dimension; those widely used dimensions are the ones worth making [conformed](/t/conformed-dimension) first. Read **across a row** to see what a single process needs before it can be delivered.

## Why it matters

The matrix is how you plan a warehouse incrementally without creating silos. Build one process at a time, but reuse the same customer, product and date dimensions across them, and the marts will combine later.

The classic mistake is building each [data mart](/t/data-mart) in isolation. Every team invents its own customer dimension and its own date logic, and when someone asks for "revenue and returns per customer segment per month", the numbers can't be joined. The matrix forces that conversation before the work starts.

## How to use it

1. List the business processes the organisation cares about.
2. List the dimensions each one needs.
3. Mark the grid.
4. Notice the columns with the most marks, and conform those dimensions first.
5. Deliver in an order that lets each new process reuse what already exists.

## What it does and doesn't do

- It's a communication and sequencing tool as much as a design document. It gives stakeholders and engineers one picture of scope, overlap and gaps.
- It captures which dimensions a process uses, not their attributes, their grain or their history rules. Those live in the detailed model.
- It should stay lightweight. A first pass is a whiteboard grid; refine it as the warehouse grows.

## When it's overkill

For a single small mart or a one-off analysis, a matrix is ceremony. It earns its place when you expect to build **many marts that must combine**, or when different teams are modeling the same entities and you need agreement up front. The same planning question — what is shared, and who owns it — shows up in other approaches too, such as a [data vault](/t/data-vault) with its hubs and links.
