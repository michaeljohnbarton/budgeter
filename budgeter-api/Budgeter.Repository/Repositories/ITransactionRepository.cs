using System.Data;
using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface ITransactionRepository
	{
		void Create(Transaction transactionToCreate, IDbConnection connection, IDbTransaction dbTransaction);
		IEnumerable<Transaction> Get();
		void Update(Transaction transactionToUpdate);
		Transaction Delete(int transactionId);
	}
}