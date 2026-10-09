---
title: "Indexing"
summary: "Accessing elements by position, usually starting at zero."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["array index", "zero-based indexing", "subscript"]
prereqs: ["array"]
related: ["array", "slicing", "off-by-one-error", "list", "string"]
---

Indexing is accessing an element by its position in an ordered collection. In most languages, positions start at 0.

```python
letters = ["a", "b", "c", "d"]
letters[0]       # "a"   first
letters[3]       # "d"   last
letters[-1]      # "d"   Python counts back from the end
letters[4]       # IndexError: past the end
```

```js
letters[0];          // "a"
letters[4];          // undefined: no error, just nothing
letters.at(-1);      // "d"
```

## Why zero?

The index is an offset from the start: element 0 is at the start, with no offset. A list of length n has valid indexes 0 to n − 1, which is the source of many [off-by-one errors](/t/off-by-one-error).

## Works on more than arrays

Strings (`"hello"[1]` is `"e"`), tuples and dictionaries (indexed by key instead of position).

## Common problems

- **Out of range.** Check the length first, or use a safe accessor. Empty lists have no `[0]`.
- **Negative indexes** work in Python, and mean "from the end". In JavaScript, `a[-1]` is `undefined`, so use `.at(-1)`.
- **Wrong type.** An index must be an integer: `items["1"]` isn't `items[1]`.
- **Changing the list while indexing** shifts positions.
- **One-based languages** exist (Lua, R, MATLAB, SQL's `SUBSTRING`). Check yours.

To get a range of elements, use [slicing](/t/slicing). To go through all of them, prefer looping over items instead of indexes ([iteration](/t/iteration)).
