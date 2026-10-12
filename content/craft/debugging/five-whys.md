---
title: "Five Whys"
summary: "Asking \"why\" repeatedly to get from a symptom to its root cause."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["5 whys", "root cause analysis"]
prereqs: ["debugger"]
related: ["incident-response", "conditional-breakpoint", "heisenbug"]
---

Five whys is a method for finding the root cause of a problem by asking "why" repeatedly. Each answer becomes the next question, until you reach something the team can change. The number five is a rule of thumb: sometimes you need fewer steps, and sometimes more.

```
Symptom:  The site was down for 40 minutes.
Why?      The database ran out of disk space.
Why?      Log files grew without being rotated.
Why?      The logrotate config was left out of the new server image.
Why?      The image checklist doesn't include log configuration.
Root:     Add log rotation to the checklist and verify it in the image build.
```

The method works because the first answer is usually a symptom, and the fix for a symptom tends to come back. Asking further gets you to the process or system that let it happen.

The trade-off is that the method looks like one straight chain of causes, while real failures usually have several causes that combine. Tracing only one branch can miss the others. It can also turn into a search for a person to blame, which stops people reporting problems honestly.

The classic mistake is stopping at "human error" or at a person's name. Ask why the system let the error happen and what would have caught it. Five whys is one tool within [root cause analysis](/t/root-cause-analysis), and it fits naturally into a [blameless postmortem](/t/blameless-postmortem) after an incident.
