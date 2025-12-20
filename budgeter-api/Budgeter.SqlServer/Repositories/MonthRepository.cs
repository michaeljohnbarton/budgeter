using System;
using System.Data.SqlClient;
using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;

namespace Budgeter.SqlServer.Repositories
{
	public class MonthRepository : IMonthRepository
	{
        private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";

        public IEnumerable<Month> Get()
        {
            // Month with ID 0 is the Default month which is only used for Configuration and setting default budgeted values, etc.
            string sql = "SELECT ID, [Month] as MonthNumber, [Year], [Name] FROM [Month] WHERE ID > 0";

            using (var connection = new SqlConnection(connectionString))
            {
                return connection.Query<Month>(sql).ToList();
            }
        }
    }
}

