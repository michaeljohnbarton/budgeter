using System.Data;
using Budgeter.Repository.Infrastructure;
using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Budgeter.SqlServer.Repositories
{
	public class TransactionRepository : ITransactionRepository
	{
		private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";

		public void Create(Transaction transactionToCreate, IDbConnection connection, IDbTransaction dbTransaction)
		{
			transactionToCreate.EnteredDateUtc = DateTime.UtcNow;
			string sql =
@"INSERT INTO [Transaction] (Description, IsCredit, AmountCents, EnteredDateUtc, MonthId, SubcategoryId)
VALUES (@Description, @IsCredit, @AmountCents, @EnteredDateUtc, @MonthId, @SubcategoryId);";

			connection.Execute(sql, transactionToCreate, dbTransaction);
		}

		public IEnumerable<Transaction> Get()
		{
			string sql =
@"SELECT ID, Description, IsCredit, AmountCents, EnteredDateUtc, MonthId, SubcategoryId
FROM [Transaction]
ORDER BY EnteredDateUtc, ID";

			using var connection = new SqlConnection(connectionString);
			return connection.Query<Transaction>(sql);
		}

		public void Update(Transaction transactionToUpdate)
		{
			string sql =
@"UPDATE [Transaction]
SET Description = @Description, IsCredit = @IsCredit, AmountCents = @AmountCents
WHERE ID = @ID";

			using var connection = new SqlConnection(connectionString);
			int rowsAffected = connection.Execute(sql, transactionToUpdate);
			if (rowsAffected == 0)
			{
				throw new NotFoundException("Transaction does not exist");
			}
		}

		public Transaction Delete(int transactionId)
		{
			string sql =
@"DELETE FROM [Transaction]
OUTPUT
	DELETED.ID,
	DELETED.Description,
	DELETED.IsCredit,
	DELETED.AmountCents,
	DELETED.EnteredDateUtc,
	DELETED.MonthId,
	DELETED.SubcategoryId
WHERE ID = @ID";

			using var connection = new SqlConnection(connectionString);
			return
				connection.QuerySingleOrDefault<Transaction>(sql, new { ID = transactionId })
				?? throw new NotFoundException("Transaction does not exist");
		}
	}
}