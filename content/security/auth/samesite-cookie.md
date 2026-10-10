---
title: "SameSite Cookies"
summary: "A cookie attribute controlling whether cookies are sent on cross-site requests."
levels: { backend: mid-level, frontend: mid-level }
related: [cookie, csrf]
---

`SameSite` is a cookie attribute that controls whether a browser sends that cookie on requests initiated from another site. It can reduce some cross-site request forgery risks by withholding cookies in cross-site contexts, but it is not a complete CSRF defense and its exact behavior depends on the browser and request type.

The common modes are `Strict`, `Lax`, and `None`. Strict is the most restrictive and can make a user appear signed out when arriving from an external link. Lax allows some top-level navigation while blocking many cross-site subrequests. None permits cross-site use and requires the cookie to be marked Secure in modern browser behavior. Check current browser and framework documentation rather than assuming every client behaves identically.

For example, a payment provider may redirect a user back to your site after authentication. A Strict session cookie may not accompany that navigation, while a Lax cookie often supports common top-level returns. But if a cookie must be sent in an embedded or cross-site request, you need an explicit design and additional CSRF protections.

Backend developers should set cookie attributes deliberately along with `Secure` and `HttpOnly` where appropriate. Frontend developers should test actual flows such as sign-in redirects and embedded views. See [CSRF](/t/csrf) and [cookies](/t/cookie).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
