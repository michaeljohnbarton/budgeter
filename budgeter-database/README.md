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

