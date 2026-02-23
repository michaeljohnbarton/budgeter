using System.Data.SqlClient;
using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;

namespace Budgeter.SqlServer.Repositories
{
	public class CategoryRepository : ICategoryRepository
	{
		private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";

		public void Create(Category categoryToCreate)
		{
			string sql =
@"INSERT INTO Category ([Name], BankAccountId, IsCredit)
VALUES (@Name, @BankAccountId, @IsCredit)";

			using (var connection = new SqlConnection(connectionString))
			{
				connection.Execute(sql, categoryToCreate);
			}
		}

		public IEnumerable<Category> Get()
		{
			string sql = "SELECT ID, [Name], BankAccountId, IsCredit FROM Category ORDER BY [Name]";

			using (var connection = new SqlConnection(connectionString))
			{
				return connection.Query<Category>(sql);
			}
		}
	}
}