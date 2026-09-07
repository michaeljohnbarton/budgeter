---
applyTo: "budgeter-api/Budgeter.Api/**"
---

# Budgeter API

## Scope and ownership

- `Budgeter.Api` is the ASP.NET Core web entry point for the budgeter backend. It targets `net10.0` and references `Budgeter.Repository` for interfaces/models and `Budgeter.SqlServer` for concrete persistence implementations.
- `Program.cs` owns application startup and middleware order: CORS, exception handling, controllers, dependency registration, Swagger, HTTPS redirection, authorization, and controller mapping.
- Controllers are thin HTTP adapters. Business rules and persistence coordination belong in `Services/`; SQL access belongs in the repository projects.

## Dependency wiring

- Register API services and the unit of work in `IoC/ServiceIoC.cs`. All current registrations are scoped.
- Register SQL Server repository implementations in `IoC/SqlServerRepositoryIoC.cs`; keep controllers and services dependent on repository interfaces from `Budgeter.Repository`.
- Services commonly coordinate multiple repositories through `IUnitOfWork`. Transactional mutations should begin a unit of work, perform all related updates, commit on success, roll back on any exception, and rethrow the original exception.
- Transaction changes update the corresponding monthly balance in the same database transaction. Preserve this atomicity when changing create, update, patch, or delete behavior.

## Controllers and contracts

- Controllers use `[Route("api/[controller]")]`, `[ApiController]`, and action attributes such as `[HttpGet]`, `[HttpPost]`, `[HttpPut("{id}")]`, `[HttpPatch("{id}")]`, and `[HttpDelete("{id}")]`.
- Request models live under `Models/<Resource>/` and use data annotations. Existing actions explicitly return `BadRequest(ModelState)` when model state is invalid, even though `[ApiController]` is also present; follow the local pattern unless intentionally standardizing it across controllers.
- Repository `NotFoundException` is translated by controllers into HTTP 404 with the exception message. Foreign-key SQL error 547 is translated to a domain-specific 400 message in transaction creation; do not expose unrelated database exceptions from individual actions.
- `GlobalExceptionHandler` returns HTTP 500 JSON with an `ApiErrorResponse`. It currently exposes `exception.Message` and does not log exceptions; treat changes to that behavior as an API contract/security decision.

## Configuration and local run

- `appsettings.json` and `appsettings.Development.json` currently contain logging configuration only. `UnitOfWork` currently constructs the SQL Server connection string directly, so connection changes require reviewing `Budgeter.Api/Infrastructure/UnitOfWork.cs` and the database setup documentation together.
- The expected local SQL Server database is `budgeter`; database initialization is documented under `budgeter-database`.
- The `Budgeter.Api` launch profile uses `ASPNETCORE_ENVIRONMENT=Development`, listens on `http://localhost:60060`, and opens `/swagger`. Swagger is enabled only in Development.
- CORS currently allows only `http://localhost:3000`; update this deliberately if the UI origin changes.

## Verification

- Build/run the solution or launch the `Budgeter.Api` profile from VS Code after API changes. Confirm Swagger loads at `http://localhost:60060/swagger` and exercise the affected endpoint against an initialized database.
- No API test project was found under `budgeter-api`; endpoint and transactional behavior currently require manual verification unless tests are added.
