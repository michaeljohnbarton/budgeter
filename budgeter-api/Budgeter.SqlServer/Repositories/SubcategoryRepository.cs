using Budgeter.Repository.Infrastructure;
using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Budgeter.SqlServer.Repositories
{
	public class SubcategoryRepository : ISubcategoryRepository
	{
		private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";

		public Subcategory Create(Subcategory subcategoryToCreate)
		{
			string sql =
@"INSERT INTO Subcategory ([Name], [Rank], CategoryId, RecalculateFutureBalances, HasTransactions)
VALUES (@Name, @Rank, @CategoryId, @RecalculateFutureBalances, @HasTransactions);

SELECT SCOPE_IDENTITY() AS NewID";

			using var connection = new SqlConnection(connectionString);
			int newId = connection.QuerySingle<int>(sql, subcategoryToCreate);

			return new Subcategory
			{
				ID = newId,
				Name = subcategoryToCreate.Name,
				Rank = subcategoryToCreate.Rank,
				CategoryId = subcategoryToCreate.CategoryId,
				RecalculateFutureBalances = subcategoryToCreate.RecalculateFutureBalances,
				HasTransactions = subcategoryToCreate.HasTransactions
			};
		}

		public IEnumerable<Subcategory> Get()
		{
			string sql = "SELECT ID, [Name], [Rank], CategoryId, RecalculateFutureBalances, HasTransactions FROM Subcategory ORDER BY [Rank], [Name]";

			using var connection = new SqlConnection(connectionString);
			return connection.Query<Subcategory>(sql);
		}

		public void Update(Subcategory subcategoryToUpdate)
		{
			string sql =
@"UPDATE Subcategory
SET [Name] = @Name, [Rank] = @Rank, RecalculateFutureBalances = @RecalculateFutureBalances, HasTransactions = @HasTransactions
WHERE ID = @ID";

			using var connection = new SqlConnection(connectionString);
			int rowsAffected = connection.Execute(sql, subcategoryToUpdate);
			if (rowsAffected == 0)
			{
				throw new NotFoundException("Subcategory does not exist");
			}
		}

		public void Delete(int subcategoryId)
		{
			string sql = "DELETE FROM Subcategory WHERE ID = @ID";

			using var connection = new SqlConnection(connectionString);
			int rowsAffected = connection.Execute(sql, new { id = subcategoryId });
			if (rowsAffected == 0)
			{
				throw new NotFoundException("Subcategory does not exist");
			}
		}
	}
}