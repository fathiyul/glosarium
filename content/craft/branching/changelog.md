---
title: "Changelog"
summary: "A human-readable list of notable changes per release."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["CHANGELOG.md", "release notes", "change log"]
prereqs: ["git-tag", "semantic-versioning"]
related: ["conventional-commits", "git-tag", "semantic-versioning", "readme", "pull-request"]
---

A changelog is a human-readable list of the notable changes in each release of a project. It tells users and teammates what's new, what's fixed and what might break, without making them read the commit history.

```markdown
# Changelog

## [1.4.0] - 2026-10-01
### Added
- Export orders as CSV.
### Changed
- Search now matches partial words.
### Fixed
- Checkout no longer fails when a coupon expires mid-session.

## [1.3.2] - 2026-09-12
### Security
- Updated the image library to fix a known vulnerability.
```

The usual file is `CHANGELOG.md` in the repository root, newest release first, with the common headings: Added, Changed, Deprecated, Removed, Fixed, Security. Release versions often follow [semantic versioning](/t/semantic-versioning).

## Why keep one

- **Users decide whether to upgrade**, and see what to test.
- **Breaking changes are called out** with how to migrate.
- **Support and teammates** can find when something changed.
- **It forces you to think** about what mattered in a release.

## Changelog vs git log

A commit log has everything, in developer language. A changelog is **curated for the reader**: grouped, filtered, explained.

## Writing and maintaining it

- **Write for the user**, about behavior, not code. "Fixed a crash when saving empty profiles" beats "fix NPE in ProfileService".
- **Mark breaking changes** clearly, with the upgrade steps.
- **Link** to pull requests or issues for details.
- **Update as you go**, perhaps with an "Unreleased" section, rather than reconstructing it at release time.
- **Automate if you can.** With [conventional commits](/t/conventional-commits), tools can draft entries, but still edit them.
- Don't paste raw commit messages and call it done.
