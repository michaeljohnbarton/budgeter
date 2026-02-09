using System.Data.SqlClient;
using Budgeter.Repository.Infrastructure;
using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;

namespace Budgeter.SqlServer.Repositories
{
	public class BankAccountRepository : IBankAccountRepository
	{
		private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";

		public void Create(BankAccount bankAccountToCreate)
		{
			string sql =
@"INSERT INTO [BankAccount] ([Name], MonthlyBalancePropagationType, HasBudgetedAmounts)
VALUES (@Name, @MonthlyBalancePropagationTypeString, @HasBudgetedAmounts)";

			using (var connection = new SqlConnection(connectionString))
			{
				connection.Execute(sql, bankAccountToCreate);
			}
		}

		public IEnumerable<BankAccount> Get()
		{
			string sql =
@"SELECT ID, [Name], MonthlyBalancePropagationType AS MonthlyBalancePropagationTypeString, HasBudgetedAmounts
FROM [BankAccount] ORDER BY [Name]";

			using (var connection = new SqlConnection(connectionString))
			{
				return connection.Query<BankAccount>(sql).ToList();
			}
		}

		public void Update(BankAccount bankAccountToUpdate)
		{
			string sql =
@"UPDATE [BankAccount]
SET [Name] = @Name, MonthlyBalancePropagationType = @MonthlyBalancePropagationTypeString, [HasBudgetedAmounts] = @HasBudgetedAmounts
WHERE ID = @ID";

			using (var connection = new SqlConnection(connectionString))
			{
				int rowsAffected = connection.Execute(sql, bankAccountToUpdate);
				if (rowsAffected == 0)
				{
					throw new NotFoundException("Bank account does not exist");
				}
			}
		}

		public void Delete(int bankAccountId)
		{
			string sql = "DELETE FROM [BankAccount] WHERE ID = @ID";

			using (var connection = new SqlConnection(connectionString))
			{
				int rowsAffected = connection.Execute(sql, new { id = bankAccountId });
				if (rowsAffected == 0)
				{
					throw new NotFoundException("Bank account does not exist");
				}
			}
		}
	}
}

