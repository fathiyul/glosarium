---
title: "Symbolic Link"
summary: "A file that points to another path."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["symbolic link", "soft link", "symlink", "ln -s"]
prereqs: ["file-system"]
related: ["file-system", "inode", "hard-link", "file-permissions", "linux-directory-structure"]
---

A symbolic link (symlink) is a special file that points to another file or directory by its path. Opening the link works as if you opened the target.

```sh
ln -s /var/www/releases/2026-10-10 /var/www/current
ls -l /var/www/current
# lrwxrwxrwx ... current -> /var/www/releases/2026-10-10
```

```sh
ln -s target link_name      # note the order: target first, then the new link
readlink -f current         # show where it ultimately points
rm current                  # removes the link only, not the target
```

## Common uses

- **Switching versions**: a `current` link points at the live release, and a deploy re-points it, which makes releases and rollbacks nearly instant.
- **Shortcuts**: access a deep folder from a convenient place.
- **Compatibility**: let software find a file at an old path.
- **Alternatives**: `/usr/bin/python` linked to `python3.12` ([version managers](/t/version-manager) use similar tricks).

## Symlink vs hard link

| | Symbolic link | [Hard link](/t/hard-link) |
|---|---|---|
| Points to | a path (name) | the file's data (inode) |
| Can cross file systems | yes | no |
| Can link a directory | yes | generally no |
| If the target is deleted | the link **breaks** (dangling) | the data survives while any link remains |

## Gotchas

- **Dangling links** point to something that no longer exists, and give "No such file or directory".
- **Relative links** are relative to the link's location, not where you run the command.
- **Deleting vs following**: `rm link` removes the link, but `rm link/` or `rm -r link/*` may act on the target. Be careful.
- **Tools differ** in whether they follow links (backup tools, `cp -r`, `find`, Docker `COPY`). Check the flags.
- **Security**: following links in untrusted locations can be abused ([path traversal](/t/path-traversal)).
- Windows has symlinks too, but they need privileges, and Git on Windows may handle them differently.
