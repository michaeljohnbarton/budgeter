using System.Data.SqlClient;
using Budgeter.Repository.Infrastructure;
using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;

namespace Budgeter.SqlServer.Repositories
{
	public class SubcategoryRepository : ISubcategoryRepository
	{
		private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";

		public void Create(Subcategory subcategoryToCreate)
		{
			string sql =
@"INSERT INTO Subcategory ([Name], CategoryId, RecalculateFutureBalances, HasTransactions)
VALUES (@Name, @CategoryId, @RecalculateFutureBalances, @HasTransactions)";

			using (var connection = new SqlConnection(connectionString))
			{
				connection.Execute(sql, subcategoryToCreate);
			}
		}

		public IEnumerable<Subcategory> Get()
		{
			string sql = "SELECT ID, [Name], CategoryId, RecalculateFutureBalances, HasTransactions FROM Subcategory ORDER BY [Name]";

			using (var connection = new SqlConnection(connectionString))
			{
				return connection.Query<Subcategory>(sql);
			}
		}

		public void Update(Subcategory subcategoryToUpdate)
		{
			string sql =
@"UPDATE Subcategory
SET [Name] = @Name, RecalculateFutureBalances = @RecalculateFutureBalances, HasTransactions = @HasTransactions
WHERE ID = @ID";

			using (var connection = new SqlConnection(connectionString))
			{
				int rowsAffected = connection.Execute(sql, subcategoryToUpdate);
				if (rowsAffected == 0)
				{
					throw new NotFoundException("Subcategory does not exist");
				}
			}
		}
	}
}