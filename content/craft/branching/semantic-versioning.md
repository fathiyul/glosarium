---
title: "Semantic Versioning"
summary: "MAJOR.MINOR.PATCH, and what each number promises about compatibility."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["semver", "SemVer", "version numbers"]
prereqs: ["git-tag"]
related: ["changelog", "conventional-commits", "package-manager", "lockfile", "api-versioning", "breaking-change"]
---

Semantic versioning (SemVer) is a convention for version numbers of the form MAJOR.MINOR.PATCH, where each number promises something about compatibility.

| Part | Increase it when | Example |
|---|---|---|
| **MAJOR** | you make incompatible changes (users must change their code) | `1.4.2` → `2.0.0` |
| **MINOR** | you add functionality in a backward-compatible way | `1.4.2` → `1.5.0` |
| **PATCH** | you make backward-compatible bug fixes | `1.4.2` → `1.4.3` |

When a higher number goes up, the lower ones reset to zero. Extras go after a hyphen (`2.0.0-beta.1`) or a plus sign (`1.0.0+build.5`).

## Why it's useful

It lets you reason about upgrades without reading every change. A patch or minor update should be safe. A major update means "read the migration notes". Package managers use this when resolving versions ([package managers](/t/package-manager)):

```json
"express": "^4.18.0"      // any 4.x at or above 4.18.0 (no 5.0)
"lodash": "~4.17.21"      // only 4.17.x patches
```

## Details

- **Versions before 1.0.0** (`0.x`) mean "anything may change". Breaking changes can happen in minor releases.
- **The public API defines "compatible".** A library must say what counts, and users depend on that ([breaking changes](/t/breaking-change)).
- **Don't change a published version.** Once `1.4.2` is out, it stays exactly that. Fix by releasing `1.4.3`.
- **Tag releases** with the version ([tags](/t/git-tag)) and record the changes ([changelog](/t/changelog)).

## Honest limits

- It's a promise made by people, and people misjudge what is breaking. A "patch" can still break someone ([Hyrum's law](/t/hyrums-law)).
- Applications and websites don't always need it. Dates or build numbers can work.
- A [lockfile](/t/lockfile) is still needed to get the same versions every time.
