using System;
using System.Data.SqlClient;
using Budgeter.Repository.Infrastructure;
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
			string sql = "SELECT ID, [Month] as MonthNumber, [Year] FROM [Month] WHERE ID > 0 ORDER BY [Year], [Month]";

			using (var connection = new SqlConnection(connectionString))
			{
				return connection.Query<Month>(sql).ToList();
			}
		}

		public void Create(Month monthToAdd)
		{
			string sql = "INSERT INTO [Month] ([Month], [Year]) VALUES (@MonthNumber, @Year)";

			using (var connection = new SqlConnection(connectionString))
			{
				connection.Execute(sql, monthToAdd);
			}
		}

		public void Update(Month monthToUpdate)
		{
			string sql = "UPDATE [Month] SET [Month] = @MonthNumber, [Year] = @Year WHERE ID = @ID";

			using (var connection = new SqlConnection(connectionString))
			{
				int rowsAffected = connection.Execute(sql, monthToUpdate);
				if (rowsAffected == 0)
				{
					throw new NotFoundException("Month does not exist");
				}
			}
		}
	}
}