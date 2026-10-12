---
title: "CODEOWNERS"
summary: "A file that assigns required reviewers by path."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["CODEOWNERS file", "code owners"]
prereqs: ["pull-request"]
related: ["pull-request", "protected-branch", "review-turnaround", "contributing-guide"]
---

A CODEOWNERS file maps paths in a repository to the people or teams responsible for them. When a pull request changes files under a path, the listed owners are requested as reviewers, and some hosts can require their approval before merging.

The file format below is GitHub's. GitLab uses a CODEOWNERS file with a similar purpose and syntax, so check your host's documentation for the details that differ. On GitHub, the file lives at `.github/CODEOWNERS`, the repository root, or `docs/CODEOWNERS`:

```
# .github/CODEOWNERS (GitHub syntax)
/docs/                @acme/docs-team
/services/billing/    @ada @grace
*.sql                 @acme/data-team
```

On GitHub, the last matching pattern wins, so put broad rules first and specific ones after them.

The trade-off is control against bottlenecks. Owners who are the only reviewers for a busy area become a queue, and the file goes stale when people move teams. Requiring owner approval only works if [branch protection](/t/protected-branch) enforces it.

The classic mistake is listing owners who don't actually review, or listing a single person for a large area. Pull requests then wait indefinitely. Use team handles where possible, review the file when teams change, and keep a fallback reviewer for areas with one owner. Good [review turnaround](/t/review-turnaround) depends on this.
