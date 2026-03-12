using Budgeter.Repository.Infrastructure;
using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Budgeter.SqlServer.Repositories
{
	public class BankAccountRepository : IBankAccountRepository
	{
		private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";

		public void Create(BankAccount bankAccountToCreate)
		{
			string sql =
@"INSERT INTO BankAccount ([Name], [Rank], MonthlyBalancePropagationType, ShowBudgetedAmounts)
VALUES (@Name, @Rank, @MonthlyBalancePropagationTypeString, @ShowBudgetedAmounts)";

			using var connection = new SqlConnection(connectionString);
			connection.Execute(sql, bankAccountToCreate);
		}

		public IEnumerable<BankAccount> Get()
		{
			string sql =
@"SELECT ID, [Name], [Rank], MonthlyBalancePropagationType AS MonthlyBalancePropagationTypeString, ShowBudgetedAmounts
FROM BankAccount ORDER BY [Rank], [Name]";

			using var connection = new SqlConnection(connectionString);
			return connection.Query<BankAccount>(sql);
		}

		public void Update(BankAccount bankAccountToUpdate)
		{
			string sql =
@"UPDATE BankAccount
SET [Name] = @Name, [Rank] = @Rank, MonthlyBalancePropagationType = @MonthlyBalancePropagationTypeString, ShowBudgetedAmounts = @ShowBudgetedAmounts
WHERE ID = @ID";

			using var connection = new SqlConnection(connectionString);
			int rowsAffected = connection.Execute(sql, bankAccountToUpdate);
			if (rowsAffected == 0)
			{
				throw new NotFoundException("Bank account does not exist");
			}
		}

		public void Delete(int bankAccountId)
		{
			string sql = "DELETE FROM BankAccount WHERE ID = @ID";

			using var connection = new SqlConnection(connectionString);
			int rowsAffected = connection.Execute(sql, new { id = bankAccountId });
			if (rowsAffected == 0)
			{
				throw new NotFoundException("Bank account does not exist");
			}
		}
	}
}

