using System.Data.SqlClient;
using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;

namespace Budgeter.SqlServer.Repositories
{
	public class BankAccountRepository : IBankAccountRepository
	{
		public BankAccountRepository()
		{
		}

		private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";

		public void Create(BankAccount bankAccountToCreate)
		{
			string sql = "INSERT INTO [BankAccount] ([Name], MonthlyBalancePropagationType, HasBudgetedAmounts) VALUES (@Name, @MonthlyBalancePropagationTypeString, @HasBudgetedAmounts)";

			using (var connection = new SqlConnection(connectionString))
			{
				connection.Execute(sql, bankAccountToCreate);
			}
		}

		public IEnumerable<BankAccount> Get()
		{
			string sql = "SELECT ID, [Name], MonthlyBalancePropagationType AS MonthlyBalancePropagationTypeString, HasBudgetedAmounts FROM [BankAccount] ORDER BY [Name]";

			using (var connection = new SqlConnection(connectionString))
			{
				return connection.Query<BankAccount>(sql).ToList();
			}
		}
	}
}

