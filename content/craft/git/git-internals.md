---
title: "Git Internals"
summary: "Blobs, trees, commits and refs: what Git actually stores."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["git internals", "git objects", "content-addressable store"]
prereqs: ["git", "commit"]
related: ["branch", "rebase", "detached-head", "merge", "version-control"]
---

Under the commands, Git is a **content-addressable** key-value store. You give it content; it gives back a hash (the object's ID); you can retrieve the content by that hash. Everything Git does is built from four kinds of objects:

- blob — the contents of a file (no name, just bytes).
- tree — a directory listing: names, modes, and the hashes of the blobs and subtrees it contains.
- commit — a snapshot: the hash of one root tree, the hash(es) of its parent commit(s), author/committer and message.
- tag — a named pointer to an object, often a commit.

A **branch** is just a file containing the hash of a commit; **HEAD** says which branch you're on; the **index** (staging area) is the draft of the next commit. When you commit, Git writes the new trees and commit, then moves your branch ref to the new commit. Nothing about the old commits changes — that's why history is immutable and hashes are stable.

```text
commit ──▶ tree ──▶ blob (file.txt)
   │         └────▶ tree (subdir/) ──▶ blob
   └──▶ parent commit
```

The classic mistakes:

- Thinking Git stores diffs. It stores whole snapshots, content-addressed; identical content is stored once across snapshots. Diffs are *computed* on the fly for display.
- Thinking a branch is a copy of the code. A branch is a tiny pointer to a commit. Copies of the working files are a separate concern (your working directory).
- Confusing the index with a commit. Staging (`git add`) writes to the index; the commit is made from the index, not from your working directory directly. That's why `git add` matters.
- Being scared of hashes. They're just names. Understanding `blob`/`tree`/`commit`/`ref` turns confusing Git errors ("detached HEAD", "unrelated histories") into something explainable.

This model explains [rebasing](/t/rebase): it creates *new* commits (new hashes) with the same trees. It explains why [branch](/t/branch) operations are instant, and why content is only really deleted by garbage collection. Learning the objects makes the rest of Git predictable.
