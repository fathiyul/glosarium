---
title: "Composite"
summary: "Treating individual objects and groups of them uniformly, as a tree."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["composite pattern", "tree structure"]
prereqs: ["design-pattern"]
related: ["decorator-pattern", "iterator-pattern", "recursion", "tree"]
---

The composite pattern builds a tree of objects where a single item and a group of items share one interface. A folder can contain files and other folders, and code that asks for a size doesn't need to know which one it's holding. Each leaf answers for itself, and each group answers by asking its children.

```python
class File:
    def __init__(self, name, size):
        self.name, self.size = name, size

    def total_size(self):
        return self.size

class Folder:
    def __init__(self, name, children):
        self.name, self.children = name, children

    def total_size(self):
        return sum(child.total_size() for child in self.children)

root = Folder("project", [
    File("README.md", 2),
    Folder("src", [File("app.py", 10), File("util.py", 5)]),
])
root.total_size()   # 17
```

Callers treat `root` and `File("README.md", 2)` the same way. Adding a new kind of node means implementing the same method, and the code that walks the tree doesn't change.

The trade-off is that a shared interface can force leaves to offer operations that only make sense for groups, such as adding a child. Those operations either do nothing or raise an error on a leaf, and that's a small lie in the design. Deep trees also need care with recursion depth.

The classic mistake is a composite whose leaves and groups behave differently in ways callers have to check for, which defeats the purpose. Keep the shared interface to operations that truly apply to both, such as size or rendering, and put group-only operations on the group. Walking a composite is often done with an [iterator](/t/iterator-pattern), and the tree itself is a common [recursive](/t/recursion) structure.
