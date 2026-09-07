---
applyTo: "budgeter-api/Budgeter.Repository/**"
---

# Budgeter Repository Contracts

## Scope and dependency direction

- `Budgeter.Repository` is a dependency-free `net10.0` class library. It defines persistence-facing models, repository interfaces, shared exceptions, and the monthly-balance propagation enum.
- Keep provider-specific SQL, Dapper usage, connection strings, and `SqlConnection` creation in `Budgeter.SqlServer`. The API services consume the interfaces and models from this project; they should not depend on SQL implementation details.
- `Budgeter.Api/IoC/SqlServerRepositoryIoC.cs` maps each interface to its SQL Server implementation. Adding a repository requires updating that registration and the corresponding provider implementation.

## Repository interfaces

- Standard CRUD interfaces use mutable models and expose `Create`, `Get`, `Update`, and `Delete` operations. `IMonthRepository` additionally exposes `CreateDefaultMonth`; `IMonthlyBalanceRepository` exposes `GetById` and `UpdateForTransaction`; transaction and monthly-balance operations return models when the caller needs the previous/deleted row.
- `ITransactionRepository.Create`, `Update`, and `Delete`, plus `IMonthlyBalanceRepository.UpdateForTransaction`, accept both `IDbConnection` and `IDbTransaction`. These methods are part of the API service transaction boundary and must execute using the supplied connection and transaction rather than opening an unrelated connection.
- Repository methods use `IEnumerable<T>` for reads and return persistence models, not API request/response DTOs. Mapping between API models and repository models belongs in `Budgeter.Api/Services/`.

## Models and data conventions

- Monetary values are represented as integer cents (`AmountCents`, `BudgetedAmountCents`, and `ActualAmountCents`); preserve this convention at the repository boundary.
- `Transaction.EnteredDateUtc` is persisted as UTC. The SQL Server transaction repository assigns `DateTime.UtcNow` when creating a transaction.
- `Month` maps the database month column to the `MonthNumber` property. Month ID `0` is a reserved default/configuration month and is intentionally excluded from normal month reads; preserve that distinction when changing month queries.
- `BankAccount.MonthlyBalancePropagationType` is an enum backed by the string property `MonthlyBalancePropagationTypeString`. SQL persistence uses the string property, while API services translate between the API and repository enum types. Unknown stored values currently fall back to `BankAccount` when read.
- `Subcategory.HasTransactions` and `Subcategory.RecalculateFutureBalances` are persisted state, not computed repository-layer values. Do not silently change their meaning in SQL mappings.

## Missing records and SQL behavior

- Use `Budgeter.Repository.Infrastructure.NotFoundException` when an update, delete, or lookup targets a missing record. The API controllers translate this exception into HTTP 404 responses.
- Preserve the existing resource-specific exception messages where possible, because they are returned by the API. Current messages follow the pattern `"<Resource> does not exist"`.
- SQL Server implementations use Dapper parameter binding and explicit column lists/aliases. Keep aliases synchronized with model property names when database column names differ, and use parameterized SQL rather than string interpolation.
- The repository layer does not own API validation or HTTP response behavior. Required-field and range validation belongs to API request models/services; foreign-key and other database errors should remain available to the API's error handling unless a deliberate contract change is made.

## Verification

- There is no repository test project currently present under `budgeter-api`. Changes should be checked by building the solution and, for SQL behavior, exercising the affected API operation against the initialized `budgeter` SQL Server database.
- When changing a contract, update the SQL Server implementation, API dependency registration, and any API service mappings together. Search for all interface implementations and call sites before changing method signatures or model properties.
