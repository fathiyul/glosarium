---
title: "Data Structure"
summary: "A way of organizing data so certain operations are efficient."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["data structures", "DS", "ADT", "abstract data type"]
prereqs: ["array", "dictionary"]
related: ["array", "list", "hash-table", "tree", "big-o-notation", "stack"]
---

A data structure is a way of organizing data in memory so that certain operations on it are efficient. Choosing the right one is often the difference between a program that's instant and one that crawls.

| Structure | Good at | Weak at |
|---|---|---|
| [Array / dynamic array](/t/array) | access by position, appending | inserting in the middle, searching by value |
| [Linked list](/t/linked-list) | cheap inserts and removals when you hold the node | access by position |
| [Hash table](/t/hash-table) (dictionary, set) | lookup, insert and delete by key, on average constant time | ordered traversal |
| [Stack](/t/stack) | last-in, first-out (undo, call stack) | anything else |
| [Queue](/t/queue) | first-in, first-out (task lines) | |
| [Tree](/t/tree), [binary search tree](/t/binary-search-tree) | ordered data, hierarchy, searching in log time | |
| [Heap / priority queue](/t/priority-queue) | quickly getting the smallest or largest | arbitrary lookup |
| [Graph](/t/graph) | relationships and networks | |

## How to choose

Ask what you'll do most:

- Look things up by key? A dictionary.
- Keep things ordered, or find ranges? A sorted structure or a tree.
- Process in arrival order? A queue.
- Check "have I seen this?" A set.
- Always grab the next-most-urgent item? A priority queue.

```python
seen = set()                 # O(1) membership instead of scanning a list
for item in items:
    if item in seen: ...
```

This is what [Big O notation](/t/big-o-notation) helps you compare.

## Abstract vs concrete

A **stack** or **queue** is an abstract idea (what operations it supports). It can be built on top of an array or a linked list. Languages give you ready-made versions, so you rarely implement them yourself, but you must know their costs.

## Practical advice

- Learn what your language's built-in types are good at.
- Measure before worrying about tiny differences ([premature optimization](/t/premature-optimization)).
- Interviews love these, and real code uses them constantly, mostly lists, dictionaries and sets.
