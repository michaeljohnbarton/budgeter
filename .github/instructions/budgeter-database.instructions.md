---
applyTo: "budgeter-database/**"
---
# Database project guidance

## Scope and entry points
- `budgeter-database/py_scripts` contains the Python database orchestration scripts.
- Run the scripts from `budgeter-database/py_scripts`; their relative paths assume that working directory.
- `init_and_seed_db.py` creates `py_scripts/generated/init_and_seed_db.sql` from table `create.sql` and `seed.sql` files, then executes `sql_scripts/create-database.sql` and the generated script.
- `init_db.py` creates `py_scripts/generated/init_db.sql` from table `create.sql` files, then executes the database-creation script and generated schema script.
- `update_existing_db.py` creates `py_scripts/generated/update_existing_db.sql` from table `update.sql` files and executes it without running the database-creation script.

## Dependency and SQL layout
- `py_scripts/dependencies.json` is the source for table dependency ordering.
- `py_scripts/helpers/dependency_list_generator.py` validates that every configured table has a directory and all three scripts, then resolves dependencies and rejects unresolved or circular dependencies.
- Table SQL is organized as `sql_scripts/tables/<TableName>/{create,seed,update}.sql`.
- `sql_scripts/create-database.sql` is the database-level script used by the two initialization entry points.
- Files under `py_scripts/generated/` are generated outputs. Change the source JSON or table SQL rather than editing generated SQL directly.

## Configuration and execution
- `py_scripts/settings.json` supplies the SQL Server connection string through `helpers/settings_loader.py`.
- `py_scripts/requirements.txt` pins the Python dependency (`pyodbc`). SQL execution uses ODBC Driver 18 and connects with autocommit enabled.
- The database must be reachable before running an entry point. Execution errors are printed by `helpers/sql_executor.py`; the helper closes the connection and cursor in its cleanup path.

## Validation and change constraints
- When adding or renaming a table, update `dependencies.json` and provide matching `create.sql`, `seed.sql`, and `update.sql` files in the table directory.
- Preserve dependency order semantics: referenced tables must be listed as dependencies before a dependent table can be emitted.
- Re-run the relevant Python entry point from `py_scripts` after SQL or dependency changes so generated output is refreshed and executable.
