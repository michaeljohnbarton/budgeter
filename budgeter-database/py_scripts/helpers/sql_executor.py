import pyodbc
import helpers.settings_loader as settings_loader

def execute(sql_file_path: str):
    connection_string = settings_loader.get_connection_string()

    try:
        cnxn = pyodbc.connect(connection_string, autocommit=True)
        cursor = cnxn.cursor()

        with open(sql_file_path, 'r') as f:
            sql_script = f.read()

        cursor.execute(sql_script)
        while cursor.nextset(): # Check all results to see if any errors occurred
            pass
        cnxn.commit()

        print(f"SQL file '{sql_file_path}' executed successfully.")

    except pyodbc.Error as ex:
        print(f"An error occurred while executing '{sql_file_path}'.")
        print(ex)

    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'cnxn' in locals() and cnxn:
            cnxn.close()
