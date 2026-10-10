---
title: "Git LFS"
summary: "Storing large binary files outside normal Git history."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["Git Large File Storage", "git lfs"]
prereqs: ["commit"]
related: ["monorepo", "git-hooks", "rewriting-history", "object-storage"]
---

Git LFS (Large File Storage) keeps large binary files, such as images, videos or design files, out of the normal Git history. Git stores a small pointer file in the commit, and the real file goes to a separate LFS store. The repository stays small and fast to clone, while the large files are still versioned.

You tell LFS which files to handle with `track`:

```sh
git lfs track "*.psd"        # writes a rule to .gitattributes
git add .gitattributes logo.psd
git commit -m "add logo"
git lfs ls-files             # lists the tracked files and their object IDs
```

The committed `logo.psd` is a short pointer, beginning with `version https://git-lfs.github.com/spec/v1`, and the content lives in the LFS store. Each clone needs the LFS client installed to download the real files.

The trade-off is that LFS adds a second storage system to depend on. Hosting providers often have storage and bandwidth limits for LFS, and a machine without the client gets pointer files instead of the content. Turning LFS on for files that were already committed doesn't shrink history on its own, because the big blobs remain in older commits.

The classic mistake is committing large binaries before setting up LFS, then discovering the history is already heavy. Track the file types first, before the first large commit. Removing existing big files from history means [rewriting history](/t/rewriting-history), which is disruptive for a shared repository. For the storage concept behind the large files, see [object storage](/t/object-storage).
