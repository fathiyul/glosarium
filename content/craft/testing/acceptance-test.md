---
title: "Acceptance Test"
summary: "Verifying a feature meets the agreed requirements."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["acceptance testing", "UAT"]
prereqs: ["requirements"]
related: ["bdd", "requirements", "integration-test", "user-story"]
---

An acceptance test checks that a feature does what was agreed, from the point of view of the user or the person who asked for it. Where a unit test checks one function, an acceptance test checks a behaviour: a customer can save a card and use it at checkout.

```
Acceptance criteria:
- A customer with a saved card sees it on the payment page.
- Removing the card removes it from the next checkout.
```

Each criterion can become a test that drives the feature through its public interface, such as the UI or the API, and asserts the outcome the requirement describes. The tests reflect what the business cares about, so product and QA people can read them and agree.

The trade-off is cost and speed. Acceptance tests run through more of the system, so they are slower, and they can be brittle when screens change. They also cover fewer cases than unit tests, since each one covers a whole behaviour. They complement unit and [integration tests](/t/integration-test) rather than replacing them.

The classic mistake is writing acceptance tests that check implementation details, such as which CSS class a button has. Those break on every refactor without showing whether the feature works. Test the behaviour the requirement names, and keep the number of end-to-end checks small enough to run often. The criteria usually come from a [user story](/t/user-story) and its [requirements](/t/requirements).
