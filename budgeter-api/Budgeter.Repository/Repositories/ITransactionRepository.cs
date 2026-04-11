using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface ITransactionRepository
	{
		void Create(Transaction transactionToCreate);
		IEnumerable<Transaction> Get();
		void Update(Transaction transactionToUpdate);
	}
}