# Budgeter Repository Guidance

## Repository shape

Budgeter is a local-first budgeting application split into three cooperating projects:

- `budgeter-database` owns SQL Server database creation, seed data, schema updates, and the dependency-aware script generation used to apply them.
- `budgeter-api` is a .NET solution composed of the HTTP host, provider-independent repository contracts/models, and the SQL Server persistence provider.
- `budgeter-ui` is the React browser application that presents configuration workflows and the monthly budgeting screen.

The normal dependency order is database -> API -> UI. The database must be available and initialized before meaningful API or end-to-end UI verification is possible. Each area has more specific guidance in `.github/instructions/`; read the matching scoped file when editing files beneath its `applyTo` path. This file describes only the relationships between those areas.

## End-to-end data flow

The UI follows a layered flow:

`pages/common components -> React contexts -> service wrappers -> HTTP API -> API services/controllers -> repository interfaces -> SQL Server repositories -> database`

Keep responsibilities at their current boundary. Pages and reusable controls handle presentation and interaction. Contexts coordinate client state, loading, refreshes, and mutation propagation. Services describe browser-to-API transport. API controllers adapt HTTP requests and responses, API services apply business rules and coordinate work, repository contracts define persistence capabilities, and the SQL Server project performs database access.

A change should move through this flow deliberately. Do not make pages call the API directly, put React state in service wrappers, put SQL in API services, or make the provider-specific project the source of API DTOs. When a contract changes, trace both directions from the changed symbol and update every consumer and implementation together.

## Domain boundaries and consistency

The main domain resources are months, bank accounts, categories, subcategories, monthly balances, and transactions. Their names and relationships are shared across database tables, repository models, API models, endpoint paths, and UI state; preserve the existing naming and relationship shape when extending the system.

Money crosses every boundary as integer cents. Currency formatting and dollar-input conversion belong at the UI control boundary, not in contexts, transport, API, or persistence code. A transaction can affect a monthly balance, so transaction mutations and their balance adjustments must remain one atomic unit of work in the backend. Client state must refresh the related data after such mutations so the screen reflects the same source of truth as the database.

The backend uses dependency injection to connect API services to repository implementations. New services or repositories are incomplete until their registrations, contracts, implementations, and call sites agree. The UI provider nesting is also a dependency graph: a context may consume only providers above it in `App.jsx`. Preserve that ordering when introducing cross-context behavior.

## Database and generated artifacts

Table-level SQL is organized by table and separated into creation, seed, and update scripts. Dependency metadata determines generation order. Initialization and update Python entry points generate SQL under `budgeter-database/py_scripts/generated/`; generated files are outputs, not hand-maintained sources.

When changing persistence behavior, compare the database scripts, repository model/property mapping, SQL queries, API contract, and UI payload/state assumptions. Account for constraints, foreign keys, reserved records, and database column aliases at the owning layer. Do not silently change stored meanings while only updating a display or DTO.

## Change workflow

1. Start at the narrowest owning symbol, route, query, script, or failing behavior and read its neighboring implementation plus the applicable scoped guidance.
2. Trace any cross-boundary contract before editing: endpoint and payload shape, repository interface, model property, database column/constraint, or context hook.
3. Make the smallest coherent change in the owning layer, then update the directly required adapters, registrations, mappings, or consumers.
4. Validate from the changed layer outward. Build the API solution for backend changes, regenerate and execute the relevant database entry point for database changes, and build/test the UI for frontend changes. For cross-project work, perform all applicable checks.
5. For behavior that depends on SQL Server, CORS, routing, or browser interaction, supplement builds with a local manual check through the API and affected UI workflow. Existing scoped guidance documents the relevant commands and known test coverage.

There are currently no established API, repository, provider, or UI test suites covering the full application. Treat a successful compile/build as structural verification, not proof that database state, HTTP contracts, transactions, or browser workflows are correct.

## Active code and local conventions

Use the active entry points and source directories described by the scoped instructions. `budgeter-ui/src/oldFiles` and legacy styling are retained examples rather than active application code. Keep feature styles colocated with their components/pages and avoid broad, unrelated refactors while changing a workflow.

The application is configured for local development: the API and UI communicate over their existing local origins, and the API persists to the local `budgeter` SQL Server database. Do not introduce environment/configuration changes casually; a base URL, connection strategy, route, or CORS change affects multiple projects and must be reviewed end to end.

Never edit generated build output or generated database SQL as the primary source. Preserve existing public contracts, error behavior, transaction boundaries, and naming unless the task explicitly changes them, and update documentation when a setup or workflow contract changes.
