---
applyTo: "budgeter-api/Budgeter.SqlServer/**"
---

# Budgeter SQL Server Provider

## Scope and dependencies

- `Budgeter.SqlServer` is the concrete persistence provider for the interfaces in `Budgeter.Repository`. It is a `net10.0` class library using Dapper and `Microsoft.Data.SqlClient`.
- Implementations live under `Repositories/` and use the models/interfaces from `Budgeter.Repository`; do not move API request/response mapping into this provider.
- `Budgeter.Api/IoC/SqlServerRepositoryIoC.cs` registers all six implementations as scoped services. Contract changes require coordinated updates to the repository interface, this provider, API service call sites, and DI registration.

## Connection and command patterns

- Current repositories use the same hardcoded local connection string for the `budgeter` database (`Server=localhost`, SQL user `sa`, `TrustServerCertificate=True`). Configuration is not read from `appsettings.json`; changing connection management is a cross-project decision involving `Budgeter.Api/Infrastructure/UnitOfWork.cs` and the database setup documentation.
- Ordinary operations create and dispose a fresh `SqlConnection` with `using var connection`. Dapper `Execute`, `Query`, `QuerySingle`, and `QuerySingleOrDefault` are the established data-access APIs.
- Use parameterized Dapper arguments and explicit SQL column lists. Keep SQL aliases synchronized with repository model properties when database columns differ, such as `[Month] AS MonthNumber` and `MonthlyBalancePropagationType AS MonthlyBalancePropagationTypeString`.
- SQL identifiers `[Month]` and `[Transaction]` are reserved-word table names and must remain bracketed in queries. Database schema and seed/update scripts under `budgeter-database/sql_scripts/` are the source of truth for table relationships and constraints.

## Transaction boundaries

- `TransactionRepository.Create`, `Update`, and `Delete`, and `MonthlyBalanceRepository.UpdateForTransaction`, receive an `IDbConnection` and `IDbTransaction` from the API unit of work. Execute these commands on the supplied objects and pass the transaction to Dapper; do not open a separate connection for these operations.
- Transaction service operations update both the transaction row and its monthly balance in one unit-of-work transaction. `Update` and `Delete` return the old/deleted transaction through SQL `OUTPUT DELETED...` so the service can calculate the monthly-balance adjustment.
- Transaction creation assigns `EnteredDateUtc = DateTime.UtcNow` before insertion. Preserve UTC semantics and integer-cents amount storage.

## Missing rows and result mapping

- Lookups that find no row and updates/deletes with zero affected rows throw `Budgeter.Repository.Infrastructure.NotFoundException` with the resource-specific message, for example `"Transaction does not exist"`. The API converts this exception into HTTP 404.
- `SubcategoryRepository.Create` returns the inserted model using `SCOPE_IDENTITY()`. Preserve the returned ID and all persisted fields when changing its insert logic.
- `MonthlyBalanceRepository.UpdateForTransaction` increments `ActualAmountCents` for the `(MonthId, SubcategoryId)` pair and throws if no matching balance exists.
- `MonthRepository.CreateDefaultMonth` inserts reserved ID `0` using `IDENTITY_INSERT`; ordinary month reads exclude ID `0` and order by year/month. Preserve this default-month behavior.
- `BankAccountRepository` persists the propagation enum through the model’s string property. The database constraint accepts only `BankAccount` and `Subcategory`; keep SQL values aligned with `Budgeter.Repository.Enums.MonthlyBalancePropagationType`.

## Verification and database prerequisites

- No provider test project exists under `budgeter-api`. Build the solution after provider changes, then exercise the affected API operation against an initialized SQL Server `budgeter` database.
- Local database setup is documented in `budgeter-database/README.md`: SQL Server 2022 runs in Docker on port 1433 and `init_and_seed_db.py` creates/seeds the database. Provider behavior that depends on foreign keys, default month ID `0`, or check constraints cannot be verified meaningfully without that database.
- When changing SQL, inspect the matching schema/seed/update scripts and search all consumers of the affected repository method or model property before editing.
