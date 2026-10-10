---
title: "Inode"
summary: "The file system record that holds a file's metadata."
levels: { backend: senior, data-engineer: senior }
aliases: ["inode", "index node", "inode number"]
prereqs: ["file-system", "hard-link"]
related: ["symlink", "disk-usage", "file-permissions", "ownership"]
---

An **inode** (index node) is the file system's record for a file. It holds the file's **metadata** — its type, size, permissions, owner, timestamps, link count, and pointers to where its data lives on disk. Crucially, it does *not* hold the file's name. Names live in directories, which map a name to an inode number.

```text
directory entry:  "report.txt" → inode 4021
inode 4021:       type=file, size=2KB, perms=644, links=1, blocks→[...]
```

This separation is why [hard links](/t/hard-link) work: two names can point to the same inode, so "the same file" has two paths. It's also why renaming a file within a file system is instant — you change a directory entry, not the data. And it's why moving a file *between* file systems copies it — the inode is local to one file system.

The classic mistakes:

- Running out of inodes, not space. A file system reserves a fixed number of inodes at creation. Millions of tiny files can exhaust inodes while gigabytes of space remain — a surprising "disk full" that `df -i` (not `df -h`) reveals.
- Confusing inodes with filenames. The name is a pointer. Deleting a name decrements the link count; the data is freed only when the count reaches zero.
- Expecting metadata changes to touch data. `chmod`, `chown` and `touch` change the inode, not the file contents. (This is why they're fast, and why their timestamps differ.)
- Assuming inode numbers are meaningful across systems. They're unique only within one file system.
- Forgetting symlinks have their own inode. A [symbolic link](/t/symlink) is a small separate file whose content is a path; its target's inode is elsewhere.

Inodes are a core piece of how Unix file systems organize storage: metadata separate from names, data referenced by block pointers. They explain [disk usage](/t/disk-usage) inode limits, [hard links](/t/hard-link), and why some file operations are instant while others copy gigabytes.
