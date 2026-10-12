---
title: "Standardizing Values"
summary: "Making country codes, casing, units and currencies consistent."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["standardizing values", "data standardization", "value normalization"]
prereqs: ["data-cleaning"]
related: ["data-cleaning", "reference-data", "master-data-management", "data-profiling", "data-quality-dimensions", "deduplication"]
---

Standardizing values means making the same thing look the same everywhere, so that grouping, joining and counting work. If one system says `US`, another `USA` and a third `United States`, a report grouped by country shows three countries.

(Not to be confused with "normalizing" a numeric column to a 0 to 1 range for machine learning, or with database normalization. Here it just means consistent representation.)

Common cases:

| Issue | Example | Fix |
|---|---|---|
| Casing and whitespace | `" Berlin"`, `"BERLIN"` | trim and lower-case |
| Codes vs names | `US`, `USA`, `United States` | map to one standard such as ISO country codes |
| Units | 5 kg vs 5000 g, miles vs km | convert to one unit |
| Currency | `19.99` USD vs `19,99` EUR | store amount and currency; convert with a dated rate |
| Dates and time zones | `03/04/26`, local times | parse to ISO 8601, store in UTC |
| Booleans | `Y`, `yes`, `1`, `true` | map to a real boolean |

```sql
select
    lower(trim(email))                                  as email,
    case upper(trim(country))
        when 'US' then 'US' when 'USA' then 'US'
        when 'UNITED STATES' then 'US'
        else upper(trim(country))
    end                                                 as country_code
from stg_signups
```

## Practical advice

- **Do it in one place**, early (see [staging layers](/t/staging-intermediate-marts)), so every downstream model gets the clean value.
- **Keep the original value** next to the cleaned one when you can, so you can audit a mapping.
- **Use a mapping table** (see [reference data](/t/reference-data)) instead of long `case` statements.
- **Handle unknowns visibly.** Map unrecognized values to something like `other` or flag them, instead of silently dropping them.
- Check ambiguous dates such as `03/04/26`: it is March 4th or April 3rd depending on the source's locale.
- Profile first. See what values exist before deciding on rules. See [data profiling](/t/data-profiling).
