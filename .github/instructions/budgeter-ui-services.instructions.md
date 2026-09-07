---
applyTo: "budgeter-ui/src/services/**"
---

# UI Services

## Scope and ownership

- This directory is the browser-to-API transport layer. `apiService.js` owns fetch configuration, URL construction, response parsing, and transport errors; each resource module owns only its endpoint path and method mapping.
- Context providers in `src/contexts` are the normal consumers. Pages and reusable components should not import service modules directly, and service modules should not contain React state, toast calls, loading state, or UI validation.
- Keep the existing named-object export pattern, such as `monthService` and `transactionService`. There is no service index or class abstraction.

## API helper contract

- `apiService` uses the hard-coded base URL `http://localhost:60060/api`. Resource paths are appended to this base URL. The API project enables CORS for `http://localhost:3000`.
- Every request sends `Content-Type: application/json`. JSON request bodies are serialized with `JSON.stringify`.
- `get(endpoint)` and `postWithResponse(endpoint, body)` require a JSON response. They verify the response content type before calling `response.json()` and throw `JSON response expected but not received` otherwise.
- `post`, `put`, `patch`, and `delete` do not parse a response body. They resolve after any successful HTTP status, including an empty `200 OK` body.
- Any non-2xx response is converted to an `Error`. HTTP 500 responses attempt to read `{ message }` and produce `An unexpected error occurred: <message>` when available; other failures use the response text or `Request failed`.
- Browser/network `TypeError` failures are normalized to `API_CONNECTION_FAILED_MESSAGE` (`Failed to fetch`). Contexts translate that sentinel to the user-facing connection message; do not duplicate UI translation in a service wrapper.
- The helper does not add authentication headers, cancellation, retries, query-string helpers, or environment-based base URL selection. Preserve this contract unless configuration support is intentionally introduced across the application.

## Resource wrappers

- `monthService` maps CRUD to `/Month`: `create(payload)`, `getAll()`, `update(id, payload)`, and `delete(id)`.
- `bankAccountService` maps CRUD to `/BankAccount`: `create(payload)`, `getAll()`, `update(id, payload)`, and `delete(id)`.
- `categoryService` maps CRUD to `/Category`: `create(payload)`, `getAll()`, `update(id, payload)`, and `delete(id)`.
- `subcategoryService` maps CRUD to `/Subcategory`: `create(payload)`, `getAll()`, `update(id, payload)`, and `delete(id)`. Its `create` uses `postWithResponse` because the API returns the created subcategory, including its ID.
- `monthlyBalanceService` maps `create` and `getAll` to `/MonthlyBalance` and maps `update(id, payload, patch = false)` to either `PUT /MonthlyBalance/{id}` or `PATCH /MonthlyBalance/{id}`.
- `transactionService` maps CRUD to `/Transaction` and maps `update(id, payload, patch = false)` to either `PUT /Transaction/{id}` or `PATCH /Transaction/{id}`.

## HTTP and payload conventions

- Use the existing resource path casing exactly. It matches ASP.NET controller routes and is not a pluralized REST convention.
- Keep IDs in URL segments and request data in JSON bodies. Do not add body data to delete calls unless the backend contract changes.
- Preserve the `patch` boolean API on monthly balance and transaction updates. Inline edits use PATCH for partial fields; full-form updates use PUT.
- Keep integer-cent fields as integer cents in payloads, including monthly balance budgeted/actual amounts and transaction amounts. Currency display conversion belongs in `CurrencyField`, not this layer.
- Do not parse or reshape domain records in the transport wrapper. Sorting, selection defaults, cross-resource refreshes, and domain-specific follow-up requests belong in contexts.

## Backend alignment

- The corresponding API controllers are in `budgeter-api/Budgeter.Api/Controllers`. They expose the resource routes above and generally return `200 OK` with no body for writes.
- Backend validation and relationship errors may arrive as response text; preserve them through `apiService` so context mutation callers can display the message.
- Subcategory creation is the intentional exception to empty write responses: the backend returns the created `Subcategory`, and the context uses its `id` to create a default monthly balance.
- Monthly balance and transaction partial-update payloads must match the backend PATCH models. If adding a new partial field, update both the client service call path and the API model/controller contract.

## Validation and change workflow

- Run `npm run build` from `budgeter-ui` after service changes to catch imports and integration errors. The package also defines `npm test -- --watchAll=false`, but there are currently no service test files under `src`.
- For endpoint or payload changes, verify the matching API controller and model before editing the wrapper, then exercise the consuming context's success, HTTP error, and network-failure paths.
- Keep service changes narrow. A new endpoint should normally require a resource-wrapper method plus the consuming context change; avoid moving context behavior into the service layer.

## Known constraints

- The base URL is local-only and duplicated nowhere else in the UI service layer. Changing it affects every resource and should be treated as an application configuration change.
- `apiService` spreads `options` after the default headers, so a caller can replace headers entirely. Existing wrappers do not do this; preserve the default JSON headers for new JSON endpoints.
- HTTP 204 responses are accepted for non-JSON methods because no body is parsed, but a 204 from `get` or `postWithResponse` is an error because JSON is required.
