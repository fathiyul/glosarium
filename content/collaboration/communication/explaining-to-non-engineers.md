---
title: "Explaining to Non-Engineers"
summary: "Translating technical trade-offs into business terms."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-analyst: mid-level }
aliases: ["communicating with non-technical stakeholders", "explaining technical concepts", "translating tech to business", "technical communication for non-technical people"]
prereqs: ["status-updates"]
related: ["stakeholder-management", "writing-clearly", "saying-no", "technical-debt", "presenting", "giving-a-demo"]
core: [backend]
---

Product managers, designers, executives, customers and support staff aren't less intelligent. They just care about different things and don't share your vocabulary. Being able to **translate technical trade-offs into business terms** is a core skill, and the reason engineers get trusted with bigger decisions.

## Principles

**1. Start with what matters to them, not how it works.** Lead with the outcome, the risk or the decision needed.

> ❌ "The queries are doing sequential scans because we lack a composite index on the orders table."
>
> ✅ "The orders page is slow for large customers (up to 12 seconds). I can fix it in about two days. After that, it should load in under a second."

**2. Answer their real questions**: What's the impact? How long will it take? What does it cost? What are the options? What do you recommend? What happens if we don't?

**3. Use few terms, and define any you need.** Replace jargon with plain words, or explain once. Don't use acronyms they haven't met.

**4. Use analogies carefully.** A good analogy ("a cache is like keeping the popular books at the front desk") builds understanding. A stretched one confuses or misleads. Check that it holds for the point you're making.

**5. Quantify.** "A few users" and "soon" are vague. "About 2% of checkouts fail, roughly 40 orders a day" and "two weeks, with a risk of one more" are useful.

**6. Give options with trade-offs**, and a recommendation:

> "Option A: fix it properly in 3 weeks. Option B: a workaround in 3 days that will need redoing later. I recommend A because the workaround would slow every future change in this area."

**7. Be honest about uncertainty.** Say what you know, what you don't, and how you'll find out ("I'll have a firmer estimate Thursday after I look at the data").

**8. Check understanding.** Ask them to say it back, or "does that match what you expected?" Watch for glazed looks. Don't just ask "any questions?".

## Translating common engineering topics

| You say | They need to hear |
|---|---|
| "We need to refactor" | "This area slows every change. Spending N days now saves M days over the next quarter" ([technical debt](/t/technical-debt)) |
| "It's a race condition" | "Under certain timing, two actions conflict and the result is wrong. It's rare but real" |
| "We need more tests" | "Right now each release has a real chance of breaking something. Tests reduce that risk" |
| "That's not possible" | "Here's what's possible instead, and what each costs" |

## Habits

- **Write it down** after a conversation, so there's a shared record ([writing clearly](/t/writing-clearly)).
- **Be respectful.** Never imply they should have known.
- **Don't hide bad news**, and bring it early ([status updates](/t/status-updates)).
- **Adapt to the audience**: an executive wants the headline, a support agent wants steps they can follow.

See [stakeholder management](/t/stakeholder-management) and [saying no](/t/saying-no).
