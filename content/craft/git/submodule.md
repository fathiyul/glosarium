---
title: "Submodule"
summary: "A repository embedded inside another at a fixed commit."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["git submodule", "submodules"]
prereqs: ["repository"]
related: ["monorepo", "rewriting-history", "git-lfs"]
---

A submodule is another Git repository placed inside a folder of your repository, pinned to a specific commit. The parent repository records only which commit of the submodule it uses, so the parent always builds against a known version of the library.

Adding a submodule creates a `.gitmodules` file that maps the folder to the URL:

```sh
git submodule add https://example.com/shared/lib.git libs/lib
git commit -m "add shared lib as submodule"
```

```
[submodule "libs/lib"]
    path = libs/lib
    url = https://example.com/shared/lib.git
```

A fresh clone doesn't download submodule contents by default. Run `git submodule update --init --recursive`, or clone with `--recurse-submodules`.

The trade-off is explicit versioning against friction. Submodules keep each project's history separate and make the pinned version clear. They also add steps that people forget: initializing after a clone, updating the pointer after a change, and committing the submodule before the parent. A submodule checkout starts in a detached HEAD state, so local edits there are easy to lose.

The classic mistake is changing code inside a submodule, committing in the parent, and forgetting to push the submodule first. Everyone else then gets a pointer to a commit that doesn't exist on the remote. Push the submodule before the parent, and see the [monorepo](/t/monorepo) concept if the nesting keeps causing problems.
