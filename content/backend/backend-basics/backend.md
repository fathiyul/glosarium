---
title: "Backend"
summary: "The server side: business logic, data and integrations."
levels: { backend: junior, frontend: junior }
prereqs: ["http-request"]
related: ["business-logic", "api-design", "request-lifecycle", "mvc"]
---

The backend is the part of an application that runs on the server, out of the user's sight. It enforces the business rules, stores and retrieves data, talks to other services, and returns responses to the browser or other clients.

```
browser --HTTP request--> backend --> database
                             |----> payment provider
                             |----> email service
```

Frontend developers depend on the backend even if they never write server code. You need to know what each endpoint returns, what its status codes mean (see [HTTP status codes](/t/http-status-codes)), and how errors are shaped. A good [API design](/t/api-design) makes that predictable.

Backend developers have the same concern from the other side: the code they write has to be correct without relying on the frontend. The classic mistake is putting rules only in the frontend. Anyone can send their own requests, skipping the browser entirely, so validate input and enforce rules on the server. The rules themselves are covered in [business logic](/t/business-logic).
