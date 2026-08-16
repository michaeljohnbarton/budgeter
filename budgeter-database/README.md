# Installation/Run Steps
1. Install Docker Desktop
1. In a terminal, run `docker pull mcr.microsoft.com/mssql/server:2022-latest`
	1. TODO: Try to get a powershell script set up for this
	1. Run the image with...
		* Name of budgeter-database
		* Port of 1433
		* ENV variables
			* MSSQL_SA_PASSWORD = Mjbarton46
			* ACCEPT_EULA = Y
1. Install python
1. Restart VS Code to ensure pip is available
1. Run `pip install -r requirements.txt`
1. Install ODBC Driver 18 for SQL Server
1. Run `python init_and_seed_db.py`


# Repository information
* Python scripts
	* `dependency_list_generator.py`
		* takes entries from `dependencies.json` and generates a list of tables in an order that can be used to execute their corresponding scripts without error
		* Used by the below three scripts
	* `init_and_seed_db.py` - initializes a brand new database and seeds it with data using...
		* `create.sql` - creates table with assumption that it didn't exist before
		* `seed.sql` - inserts data into what is assumed to be a brand-new table
	* `init_db.py` - initializes a brand new database and creates all tables using...
		* `create.sql` - creates table with assumption that it didn't exist before
	* `updated_existing_db.py` - makes updates to the database without altering any existing data using...
		* `update.sql` - has initial table creation then any subsequent alterations
* More notes about SQL scripts
	* `create.sql` - can serve as source of most current table schema
	* `update.sql` - can serve as history of changes made to table
		* Git history from `create.sql` can also serve as this

