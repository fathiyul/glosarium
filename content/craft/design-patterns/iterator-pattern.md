---
title: "Iterator Pattern"
summary: "Traversing a collection without exposing its internals."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["iterator design pattern"]
prereqs: ["iterator"]
related: ["iterator", "generator", "composite-pattern", "lazy-evaluation"]
---

The iterator pattern gives a way to walk through the items of a collection without exposing how the collection stores them. The caller asks for the next item and never needs to know whether the items are in a list, a tree, a database cursor or a file.

```python
class Playlist:
    def __init__(self, songs):
        self._songs = list(songs)        # internal storage, hidden from callers

    def __iter__(self):
        return iter(self._songs)         # hand out an iterator, not the list

playlist = Playlist(["intro", "verse", "outro"])
for song in playlist:
    print(song)
```

The caller uses `for song in playlist` and doesn't touch `_songs`. The playlist can switch to a linked list or a database query later without changing the loop.

The trade-off is that the iterator is usually one-pass, so the caller can't go back, and an iterator over a collection that changes while being walked can give confusing results. Some designs add a way to move backwards or to jump, which costs extra code.

The classic mistake is returning the internal list from an iterator method, so callers can modify it while iterating. Return an iterator instead, or a copy, as this example does with `iter`. In Python the pattern is built into the language through `__iter__` and [generators](/t/generator), which is why most code rarely writes an iterator class by hand. Trees are a common case, usually walked with the [composite pattern](/t/composite-pattern).
