---
applyTo: "budgeter-api/**"
---

# Budgeter API Solution

## Scope and architecture

- `budgeter-api` is a .NET solution containing three projects: `Budgeter.Api`, `Budgeter.Repository`, and `Budgeter.SqlServer`.
- Dependency direction is one-way: `Budgeter.Api` references both `Budgeter.Repository` and `Budgeter.SqlServer`; `Budgeter.SqlServer` references `Budgeter.Repository`; `Budgeter.Repository` has no project or package dependencies.
- `Budgeter.Api` is the executable web host. `Budgeter.Repository` defines the persistence contracts and shared models. `Budgeter.SqlServer` implements those contracts with SQL Server and Dapper.
- Detailed guidance is intentionally split by project in the sibling instruction files `budgeter-api.instructions.md`, `budgeter-repository.instructions.md`, and `budgeter-sqlserver.instructions.md`. Read the matching child guidance before changing files within those project directories.

## Cross-project changes

- Treat repository interfaces and models as contracts between the API services and the SQL Server provider. Changes to a method signature or model property require checking both its API service consumers and SQL Server implementation.
- API request/response models are distinct from repository models; service classes perform the mapping between them. Keep HTTP concerns in `Budgeter.Api`, persistence contracts in `Budgeter.Repository`, and SQL/Dapper concerns in `Budgeter.SqlServer`.
- Dependency registration is centralized in `Budgeter.Api/IoC/ServiceIoC.cs` for API services/unit of work and `Budgeter.Api/IoC/SqlServerRepositoryIoC.cs` for provider implementations. New services or repositories are not active until registered there.
- Transaction-sensitive behavior crosses the API service, unit-of-work, repository interface, and SQL provider boundaries. Preserve the shared connection/transaction flow when changing transaction or monthly-balance operations.
- Database schema and seed/update scripts live outside this solution under `budgeter-database/sql_scripts/`. SQL changes that alter columns, constraints, reserved default records, or stored values must be checked against those scripts and the repository models.

## Build and run

- The solution file is `budgeter-api.sln`; all three projects target `net10.0`, use nullable reference types, and enable implicit usings.
- Build the solution after cross-project changes. There is no test project under `budgeter-api`, so behavior changes require manual verification through the web API. Do not add automated tests unless the user explicitly requests test work.
- Local API startup uses the `Budgeter.Api` project launch profile, which listens on `http://localhost:60060` in Development and exposes Swagger at `/swagger`. A working local SQL Server `budgeter` database is required for persistence operations; setup is documented in `budgeter-database/README.md`.

## Change hygiene

- Keep edits within the owning project and update neighboring contracts/registrations only when the change requires it.
- Do not add provider-specific dependencies to `Budgeter.Repository`, and do not bypass repository interfaces from API services to call SQL implementations directly.
