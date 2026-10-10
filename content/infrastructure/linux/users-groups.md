---
title: "Users and Groups"
summary: "How Linux controls who can do what."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["users and groups", "uid gid", "useradd usermod"]
prereqs: ["linux", "file-permissions"]
related: ["ownership", "sudo-root", "least-privilege", "non-root-containers", "server-hardening"]
---

Linux decides who can do what using **users** and **groups**. Every process runs as a user (a numeric **UID**) and one or more groups (a **GID**); root is UID 0 and can do almost anything. Each file has an owner, a group, and permission bits for reading, writing and executing — so "Permission denied" almost always comes down to identity plus permissions.

```sh
id                 # who am I: uid, gid, groups
whoami             # just the username
ls -l file.txt     # owner, group, bits
chmod 640 file.txt      # owner rw, group r, others none
chown app:app file.txt  # change owner and group
sudo -u app whoami      # run as another user
```

Creating and managing accounts:

```sh
useradd -m alice        # create a user with a home directory
passwd alice            # set a password
groupadd dev
usermod -aG dev alice   # add to a group (-a, or you replace the list)
groups alice
```

The `-a` in `usermod -aG` matters: without it you overwrite every group the user had.

The classic mistake is reaching for `chmod 777` to make a permission error go away. It grants everyone full access and hides the real problem — usually the wrong owner. Fix the ownership or the group instead, and avoid running services as root; use a dedicated user and `sudo` only when needed (see [sudo and root](/t/sudo-root) and [least privilege](/t/least-privilege)).

Two details that bite: changing groups takes effect only after a fresh login, because the shell keeps its old membership; and a recursive `chown -R` on the wrong directory can break a system. Containers use the same model — a process runs as some UID, often root unless you say otherwise (see [non-root containers](/t/non-root-containers)). See [file permissions](/t/file-permissions).
