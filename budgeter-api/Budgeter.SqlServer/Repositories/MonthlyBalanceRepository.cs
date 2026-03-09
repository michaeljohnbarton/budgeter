using Budgeter.Repository.Infrastructure;
using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Budgeter.SqlServer.Repositories
{
	public class MonthlyBalanceRepository : IMonthlyBalanceRepository
	{
		private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";

		public void Create(MonthlyBalance monthlyBalanceToCreate)
		{
			string sql =
@"INSERT INTO MonthlyBalance (MonthId, SubcategoryId, BudgetedAmountCents, ActualAmountCents)
VALUES (@MonthId, @SubcategoryId, @BudgetedAmountCents, @ActualAmountCents)";

			using var connection = new SqlConnection(connectionString);
			connection.Execute(sql, monthlyBalanceToCreate);
		}

		public IEnumerable<MonthlyBalance> Get()
		{
			string sql = "SELECT ID, MonthId, SubcategoryId, BudgetedAmountCents, ActualAmountCents FROM MonthlyBalance";

			using var connection = new SqlConnection(connectionString);
			return connection.Query<MonthlyBalance>(sql);
		}

		public void Update(MonthlyBalance monthlyBalanceToUpdate)
		{
			string sql =
@"UPDATE MonthlyBalance
SET BudgetedAmountCents = @BudgetedAmountCents, ActualAmountCents = @ActualAmountCents
WHERE ID = @ID";

			using var connection = new SqlConnection(connectionString);
			int rowsAffected = connection.Execute(sql, monthlyBalanceToUpdate);
			if (rowsAffected == 0)
			{
				throw new NotFoundException("Monthly balance does not exist");
			}
		}
	}
}
