---
title: "Diff Algorithms"
summary: "Computing the minimal set of changes between two sequences."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["diff algorithm", "diffing", "text diff"]
prereqs: ["dynamic-programming", "string-algorithms"]
related: ["git", "version-control", "merge"]
---

A **diff algorithm** takes two sequences — usually lines of text — and computes the smallest set of insertions and deletions that turns one into the other. The output is the familiar red/green diff. Underneath, it's a version of the **longest common subsequence** problem: find the longest sequence of items that appears in both, then everything not in it is a change.

```text
A: the quick brown fox
B: the quick red fox
diff: - brown      (deleted)
      + red        (inserted)
```

The classic textbook approach is dynamic programming over LCS, which is O(n·m) in the lengths. Real diff tools use faster methods (Myers' algorithm) to handle large files and to refine the output to be *readable* — grouping changes sensibly rather than producing a technically minimal but confusing edit list.

It's the engine behind `diff`, `git diff`, merge tools, and editors that highlight changes. Git uses it to compute patches and to perform three-way merges; code review tools use it to show what a pull request changed. Comparing sequences shows up outside text too — genome alignment, document comparison, and data reconciliation.

The classic mistakes:

- Assuming "minimal" means "most readable". A technically smallest diff can be confusing (shuffling a block looks like huge changes). Good tools balance minimality against human readability.
- Ignoring line-ending and whitespace noise. Diffs are sensitive to trailing whitespace and CRLF/LF, which produce changes that look meaningless. Configure or normalise.
- Confusing diff with merge. Diff *compares*; merge *combines* three versions and decides conflicts. Merging uses diffs but is a harder problem.
- Treating a big diff as a big change in meaning. Renaming a variable or reformatting shows as many changed lines. That's why whole-file reformatting and feature changes should be separate commits.
- Implementing it naively for large inputs. The straightforward O(n·m) approach is too slow and memory-hungry for big files; use a proven algorithm or library.

Diff algorithms turn "what changed between these two versions?" into a concrete edit list. That's why [Git](/t/git) can store history compactly and compute patches, and why review tools can show a change. It's an everyday application of sequence comparison, and a case where the practical algorithm is about readability as much as optimality.
