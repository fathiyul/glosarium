---
title: "Novelty Effect"
summary: "A temporary lift that comes from something being new, not from being better."
core: [data-scientist]
levels: { data-analyst: mid-level , data-scientist: senior }
aliases: ["novelty effect", "primacy effect", "change aversion"]
prereqs: ["ab-testing", "test-duration", "segmentation"]
related: ["ab-testing", "test-duration", "retention-analysis", "cohort-analysis", "holdback-group"]
---

A novelty effect is a lift that comes from **something being new rather than better**. Existing users notice the change, click it out of curiosity, and try it. The number rises for a while and then falls back as the change becomes ordinary.

Concretely: a redesigned navigation gets a spike in clicks on the new menu for a fortnight. Three months later the click rate has settled back near the old value and task completion was never affected. Ship on the fortnight's number and you have a redesign that moved where people clicked and nothing else.

## The reverse happens too

Change aversion — sometimes called the primacy effect — is the same mechanism in the other direction. Regulars who had learned the old interface stall for a while: they look for the button that used to be there, abandon, and gradually adapt. A test that stops during that dip records a loss that is also temporary.

## What to do about it

- Run long enough to cover the window. That means full weekly cycles plus enough time for the change to stop being new ([test duration](/t/test-duration)). How long that is depends on the change and on how often your users come back; there is no universal number.
- Split new from returning users. A novelty effect lives almost entirely in the returning cohort ([segmentation](/t/segmentation), [cohort analysis](/t/cohort-analysis)). A lift concentrated in users who saw the old version is a curiosity signal, not a product win.
- Measure the outcome, not the interaction. Clicks on a new element are a curiosity signal; task completion, retention and repeat use are what you wanted to move ([retention analysis](/t/retention-analysis)).
- Keep looking after the ship. A [holdback group](/t/holdback-group) is the clean way to see whether the effect held once the change stopped being new.

The trap in both directions is **reading a temporary number as a permanent one**. Neither the spike nor the dip is evidence about the steady state, and a short test cannot tell you which of the two you measured.
