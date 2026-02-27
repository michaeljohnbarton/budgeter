using System.Data.SqlClient;
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
	}
}