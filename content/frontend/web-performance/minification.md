---
title: "Minification"
summary: "Shrinking code by removing whitespace and shortening names."
levels: { frontend: junior }
aliases: ["minify", "uglify"]
prereqs: ["bundle-size"]
related: ["bundle-size", "web-performance", "source-map"]
---

Minification makes a JavaScript or CSS file smaller without changing what it does. It removes whitespace and comments, shortens local variable names, and simplifies some expressions. The browser runs the same code, just in a smaller file.

```js
// Before
function calculateTotal(prices) {
  let total = 0;
  for (const price of prices) {
    total += price;
  }
  return total;
}

// After (roughly)
function calculateTotal(e){let t=0;for(const n of e)t+=n;return t}
```

Your build tool usually does this for you when you make a production build. Compression on the server, such as gzip or Brotli, usually shrinks files further, and the two work well together. Check the exact output of your own tool rather than assuming.

The classic mistake is debugging the minified file. Errors then point at names like `e` and `t`. Use [source maps](/t/source-map), which map the minified code back to your original source, so stack traces stay readable. Also don't rely on minification to fix a big bundle. It shrinks code that's already there, so [bundle size](/t/bundle-size) still depends on what you import.
