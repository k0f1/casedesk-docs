---
sidebar_position: 4
---

# Routing Requests

CaseDesk routes a request only to an approved connection for the requested
model and service policy. It never selects a different provider or CaseDesk
capacity when the intended connection is unavailable.

Use the account-level base URL shown in **Settings**. Send the target model in
the request and use the credential for the relevant sandbox, trial, or
production service.

Before adding another model, submit and verify a connection that supports it.
Each connected runtime retains its own payer, region, data boundary, and health
status.
