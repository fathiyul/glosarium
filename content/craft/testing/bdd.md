---
title: "Behavior-Driven Development"
summary: "Specifying behavior as plain-language scenarios shared with non-developers."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["BDD", "Gherkin", "Given When Then"]
prereqs: ["acceptance-test"]
related: ["acceptance-test", "user-story", "requirements", "deterministic-tests"]
---

Behavior-driven development (BDD) is a practice where the team writes the expected behaviour of a feature as plain-language scenarios before or while building it. The scenarios are written so that product owners, testers and developers can all read them. Many teams use the Gherkin format, with the keywords `Given`, `When` and `Then`:

```gherkin
Feature: Saved cards

  Scenario: Customer removes a saved card
    Given a customer with one saved card
    When they remove that card
    Then the payment page shows no saved cards
```

Each step is connected to code that performs the action and checks the result. The scenario is both the agreement and the test.

The trade-off is overhead. Writing scenarios well takes time, and they need someone to keep the step definitions tidy. If the scenarios aren't read by anyone outside development, the extra layer adds little over a plain [acceptance test](/t/acceptance-test). Scenarios can also drift from the code if the step definitions are not maintained.

The classic mistake is writing scenarios that describe screens and clicks rather than behaviour, such as "When I click the third button and type into the field". They become a fragile script, and nobody outside development reads them. Describe what the user is trying to do and what they should see. The scenarios should come from the [requirements](/t/requirements) and [user stories](/t/user-story), not from the implementation.
