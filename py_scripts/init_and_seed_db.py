import helpers.dependency_list_generator as dependency_list_generator
import helpers.directory_creator as directory_creator
import helpers.sql_executor as sql_executor

tables = dependency_list_generator.generate()

directory_creator.create_generated_if_not_exists()
SQL_FILE_PATH = 'generated/init_and_seed_db.sql'

with open(SQL_FILE_PATH, 'w') as init_and_seed_db_file:
    for table in tables:
        with open(f"../sql_scripts/tables/{table}/create.sql", 'r') as table_file:
            init_and_seed_db_file.write(f"-- Creating table {table}\n")
            init_and_seed_db_file.write(table_file.read())
            init_and_seed_db_file.write("\n\n")
    for table in tables:
        with open(f"../sql_scripts/tables/{table}/seed.sql", 'r') as table_file:
            init_and_seed_db_file.write(f"-- Seeding table {table}\n")
            init_and_seed_db_file.write(table_file.read())
            init_and_seed_db_file.write("\n\n")

sql_executor.execute(SQL_FILE_PATH)