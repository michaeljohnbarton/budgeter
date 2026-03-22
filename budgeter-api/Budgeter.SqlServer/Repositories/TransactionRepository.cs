using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Budgeter.SqlServer.Repositories
{
	public class TransactionRepository : ITransactionRepository
	{
		private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";

		public void Create(Transaction transactionToCreate)
		{
			transactionToCreate.EnteredDateUtc = DateTime.UtcNow;
			string sql =
@"INSERT INTO [Transaction] (Description, IsCredit, AmountCents, EnteredDateUtc, MonthId, SubcategoryId)
VALUES (@Description, @IsCredit, @AmountCents, @EnteredDateUtc, @MonthId, @SubcategoryId);";

			using var connection = new SqlConnection(connectionString);
			connection.Execute(sql, transactionToCreate);
		}
	}
}