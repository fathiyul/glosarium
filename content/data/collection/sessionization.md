---
title: "Sessionization"
summary: "Grouping events into sessions by user and inactivity gaps."
levels: { data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["sessionizing events", "session grouping", "session boundaries"]
prereqs: ["analytics-event-tracking"]
related: ["analytics-event-tracking", "stream-windowing", "gaps-and-islands", "event-time-vs-processing-time", "late-arriving-data", "product-analytics"]
---

Sessionization is grouping a user's events into sessions: a session is a run of activity followed by a period of inactivity. When the gap between two events exceeds a threshold, commonly 30 minutes but it is a choice you make, a new session starts. Other boundaries can apply too: a change of campaign, a new day, or an explicit login or logout.

Sessions let you answer questions like "how long do people stay?", "how many sessions does it take to convert?" and "which pages are viewed together?".

The classic mistake is assuming each event already carries a `session_id`, or letting each tool define sessions differently. Then the analytics tool, the warehouse and the marketing platform report different session counts for the same traffic.

## How it is computed

Sort a user's events by time, measure the gap to the previous event, and start a new session whenever the gap is too large. That is a [gaps-and-islands](/t/gaps-and-islands) problem, and window functions make it short in SQL:

```sql
-- e.g. in PostgreSQL and many warehouses
with marked as (
  select user_id, ts,
         case when ts - lag(ts) over (partition by user_id order by ts)
                   > interval '30 minutes'
              then 1 else 0 end as is_new
  from events
)
select user_id, ts,
       sum(is_new) over (partition by user_id order by ts) as session_no
from marked;
```

## Trade-offs

- The threshold is arbitrary and changes the answer. Mobile apps that are backgrounded can create many short sessions; a long threshold hides them.
- Out-of-order and [late-arriving events](/t/late-arriving-data) can move session boundaries, so you may need to recompute sessions for a time range.
- Some product analytics tools define sessions for you; if you also compute them, match the definition.
- Sessionization groups by time; it is not the same as a logged-in server [session](/t/session). See [analytics event tracking](/t/analytics-event-tracking) and [stream windowing](/t/stream-windowing).
