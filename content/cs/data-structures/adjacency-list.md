---
title: "Adjacency List vs Matrix"
summary: "Two ways to store a graph's edges."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["adjacency list", "adjacency matrix"]
prereqs: ["graph"]
related: ["graph", "directed-acyclic-graph", "tree-traversal", "big-o-notation"]
---

A graph can be stored in two common ways. An adjacency list keeps, for each vertex, a list of the vertices it connects to. An adjacency matrix keeps a grid of size V by V, with a mark wherever an edge exists.

```python
# Adjacency list: a dict from each vertex to its neighbours
graph = {"a": ["b", "c"], "b": ["c"], "c": []}

# Adjacency matrix: rows and columns indexed by vertex position
vertices = ["a", "b", "c"]
matrix = [
    [0, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
]
```

The list uses space proportional to the number of vertices plus the number of edges, which is O(V + E). The matrix uses O(V²) space whatever the number of edges. Listing a vertex's neighbours takes time proportional to how many it has in the list form, and checking whether one specific edge exists takes O(degree) in the list form and O(1) in the matrix form.

The trade-off depends on how dense the graph is. A sparse graph, such as a road network or a dependency graph, wastes most of a matrix on empty cells, so the list is the usual choice. A dense graph, where most pairs are connected, fits a matrix well, since the list then holds almost as much data.

The classic mistake is choosing a matrix by default for a large sparse graph, then running out of memory. The reverse mistake is using a list and then checking edge existence in a loop over a huge neighbour list, which is slow. Pick the representation from the graph's density and the operations you run most.
