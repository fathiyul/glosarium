---
title: "Invitations"
summary: "Inviting people into an organization or team with expiring, single-use links."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["invitations", "invites", "user invitations"]
prereqs: ["organizations-teams", "rbac"]
related: ["organizations-teams", "rbac", "sending-email", "idempotence"]
---

An **invitation** is how you add someone to an organisation, team or workspace: you create an invite (often emailed), the recipient accepts, and they become a member with a role. It's the standard multi-user onboarding flow.

```text
invite(email, role) → create token → send email with link → user accepts → membership created
```

The pieces: an invitation record (email, role, inviter, org), a secure **token** in the link (so only the invited person can accept), an expiry, and acceptance logic that creates the membership. It ties into [organisations/teams](/t/organizations-teams) (where they're joining) and [RBAC](/t/rbac) (with what role).

The classic mistakes:

- Guessable invite tokens. An invite link grants access; if the token is predictable or reusable forever, anyone can join. Use a random, single-use, expiring token.
- Not expiring invites. An old invite link still works months later, even if the role or org changed. Expire invites.
- Ignoring the invited email. Letting anyone with the link (matched to any email) accept bypasses the intent to invite a *specific* person. Bind the token to the invited email.
- Duplicate invitations and races. Two invites for the same email, or accepting twice, can create duplicate memberships or errors. Enforce uniqueness and make acceptance idempotent (see [idempotence](/t/idempotence)).
- Existing user vs new user. The invitee may already have an account (join directly) or not (sign up then join). Handle both paths, and don't create duplicate accounts.
- Role escalation. An invitation that lets the inviter grant a role higher than their own is a privilege-escalation hole; restrict who can invite and to which roles (see [RBAC](/t/rbac) and [least privilege](/t/least-privilege)).
- No audit or visibility. Who invited whom, and pending invites, are important for admins; surface and record them.
- Email deliverability ignored. The invite is useless if it lands in spam; the email path matters (see [email deliverability](/t/email-deliverability)).

**How to build it:** create an invitation with a random expiring single-use token bound to the email and role; email the link; on accept, verify the token and email, create the membership idempotently, and invalidate the invite. It's a small flow with real security implications — get the token and the role rules right. See [organizations and teams](/t/organizations-teams).
