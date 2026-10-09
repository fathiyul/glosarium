---
title: "Tag"
summary: "A named pointer to a commit, usually marking a release."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["git tag", "release tag", "version tag"]
prereqs: ["commit"]
related: ["semantic-versioning", "changelog", "branch", "push-pull-fetch", "deployment"]
---

A tag is a name permanently attached to a specific commit, usually to mark a release such as `v1.4.0`. Unlike a branch, it doesn't move when you make new commits.

```sh
git tag v1.4.0                         # lightweight tag on the current commit
git tag -a v1.4.0 -m "Release 1.4.0"   # annotated tag: stores author, date, message
git tag v1.3.2 3f9c2a1                 # tag an older commit
git tag                                # list tags
git show v1.4.0

git push origin v1.4.0                 # tags aren't pushed by default
git push origin --tags                 # push all tags
git checkout v1.4.0                    # look at that exact version (detached HEAD)
git tag -d v1.4.0                      # delete locally
```

## Lightweight vs annotated

- **Lightweight**: just a name pointing at a commit.
- **Annotated** (`-a`): a full object with tagger, date and message (and it can be signed). Use these for releases.

## Why tag

- **Mark releases** so you can find exactly what shipped, and rebuild it ([deployment](/t/deployment)).
- **Version numbers** that follow [semantic versioning](/t/semantic-versioning): `v2.1.3`.
- **Trigger automation**: many CI pipelines build and publish when a tag matching `v*` is pushed.
- **Compare releases**: `git log v1.3.0..v1.4.0` lists what changed ([changelog](/t/changelog)).

## Cautions

- **Tags are local until pushed.**
- **Don't move or reuse published tags.** People and build systems rely on `v1.4.0` meaning one specific commit. Make a new tag (`v1.4.1`) instead.
- Tag the commit that was **actually released**, after the tests pass.
- Don't confuse tags with **release** pages on GitHub, which are built from them and add notes and attachments.
