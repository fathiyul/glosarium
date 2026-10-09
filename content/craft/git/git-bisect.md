---
title: "Bisect"
summary: "Binary-searching history to find the commit that introduced a bug."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["git bisect", "bisecting", "bisect a bug", "finding the commit that broke it"]
prereqs: ["git-log", "reproduce-bug"]
related: ["binary-search-debugging", "git-log", "regression-test", "git-blame", "git-revert", "debugging"]
core: [backend]
---

`git bisect` finds **which commit introduced a bug**, using binary search through your history. When you know "it worked last month, and it's broken now" but there are 300 commits in
between, it narrows them down in a handful of steps, because each test halves the range.

```sh
git bisect start
git bisect bad                 # the current commit is broken
git bisect good v2.3.0         # this older commit was fine (a tag, hash or branch)
```

Git checks out a commit in the middle. You test it and tell Git:

```sh
git bisect good     # or:  git bisect bad
```

and it picks the next midpoint. After about log₂(N) steps (300 commits take roughly 9), it announces:

```
3f9c2a1 is the first bad commit
```

Then finish and return to where you started:

```sh
git bisect reset
```

## Automate it

If you can write a command that exits 0 when things are good and non-zero when bad (a test, or a script), Git can run the whole search itself:

```sh
git bisect start HEAD v2.3.0
git bisect run npm test -- --grep "checkout total"
```

## Tips

- **You need a reliable test.** If the bug is intermittent or the check is flaky, the bisect points to the wrong commit. First [reproduce it](/t/reproduce-bug) consistently.
- **Choose the good commit carefully**, and confirm it really is good.
- **Skip commits that don't build**: `git bisect skip`.
- **Small, atomic commits make it work best.** A giant commit that mixes ten changes only tells you "somewhere in here".
- Once found, read the commit and its message ([git log](/t/git-log)), then understand *why* before fixing ([understand before you change](/t/understand-before-changing)).
- It's the same idea as [binary search debugging](/t/binary-search-debugging) applied to time.

After the fix, add a [regression test](/t/regression-test).
