---
title: "Accessible Visualization"
summary: "Charts that survive color blindness, small screens, greyscale printing and screen readers."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["accessible charts", "chart accessibility", "colour-blind-safe charts"]
prereqs: ["data-visualization", "color-scales"]
related: ["accessibility", "wcag", "alt-text", "color-contrast", "chart-selection"]
---

An accessible chart gives the same answer to every reader: people who cannot rely on colour, people on a phone, people holding a greyscale printout, and people using a screen reader. A meaningful share of any audience cannot reliably separate two colours that look obviously different to you, so a chart that encodes everything in red-versus-green fails for them with no visible error anywhere.

## Encode more than once

The rule underneath all the others: **never let colour be the only encoding.** Colour is a good extra channel and a poor primary one.

| Encoding | Survives colour blindness | Survives greyscale |
|---|---|---|
| Colour alone | No | No |
| Position or length | Yes | Yes |
| Direct label on the mark | Yes | Yes |
| Shape or line style | Yes | Yes |

The cheapest fix is a label placed next to the mark instead of a legend, plus one more channel for anything that carries meaning: a signed number, an arrow for direction, a dashed line.

## Checks that catch most of it

- Preview it in greyscale, or print it. If two categories merge into one, colour was doing work nothing else was.
- Give every chart a **text alternative** — one sentence naming the takeaway, plus the numbers or a link to them. A screen reader user gets that, and so does the person skimming.
- Check contrast on the marks, not only on the text. Pale yellow on white, or a hairline light-grey stroke, fail in bright daylight too.
- Open it on a phone. A legend in six columns and twelve tick labels stop fitting.
- Put units and the time window in the title, not only in a tooltip. Tooltips do not exist on a printout or in a screen reader.
- Make sure hover is not the only way to get a value. Some readers never hover and some touch devices never fire it.

## The trade-off

Direct labels and annotations take room, and a palette that survives greyscale is rarely the prettiest one. The cost is real but small: you lose decoration, not information. For the general case see [data visualization](/t/data-visualization); for palettes that hold up, see [colour scales](/t/color-scales) and [colour contrast](/t/color-contrast). The underlying craft is [accessibility](/t/accessibility), and the same reasoning that puts words on an image applies here — see [alt text](/t/alt-text).
