using System.Data;
using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface ITransactionRepository
	{
		void Create(Transaction transactionToCreate, IDbConnection connection, IDbTransaction dbTransaction);
		IEnumerable<Transaction> Get();
		Transaction GetById(int transactionId);
		Transaction Update(Transaction transactionToUpdate, IDbConnection connection, IDbTransaction dbTransaction);
		Transaction Delete(int transactionId, IDbConnection connection, IDbTransaction dbTransaction);
	}
}