using Budgeter.Repository.Infrastructure;
using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Budgeter.SqlServer.Repositories
{
	public class CategoryRepository : ICategoryRepository
	{
		private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";

		public void Create(Category categoryToCreate)
		{
			string sql = "INSERT INTO Category ([Name], [Rank], BankAccountId, IsCredit) VALUES (@Name, @Rank, @BankAccountId, @IsCredit)";

			using var connection = new SqlConnection(connectionString);
			connection.Execute(sql, categoryToCreate);
		}

		public IEnumerable<Category> Get()
		{
			string sql = "SELECT ID, [Name], [Rank], BankAccountId, IsCredit FROM Category ORDER BY [Rank], [Name]";

			using var connection = new SqlConnection(connectionString);
			return connection.Query<Category>(sql);
		}

		public void Update(Category categoryToUpdate)
		{
			string sql = "UPDATE Category SET [Name] = @Name, [Rank] = @Rank, IsCredit = @IsCredit WHERE ID = @ID";

			using var connection = new SqlConnection(connectionString);
			int rowsAffected = connection.Execute(sql, categoryToUpdate);
			if (rowsAffected == 0)
			{
				throw new NotFoundException("Category does not exist");
			}
		}

		public void Delete(int categoryId)
		{
			string sql = "DELETE FROM Category WHERE ID = @ID";

			using var connection = new SqlConnection(connectionString);
			int rowsAffected = connection.Execute(sql, new { id = categoryId });
			if (rowsAffected == 0)
			{
				throw new NotFoundException("Category does not exist");
			}
		}
	}
}