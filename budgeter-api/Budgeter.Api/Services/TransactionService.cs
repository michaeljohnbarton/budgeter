using Budgeter.Api.Models.Transaction;
using Budgeter.Repository.Repositories;
using TransactionRepositoryModel = Budgeter.Repository.Models.Transaction;

namespace Budgeter.Api.Services
{
	public interface ITransactionService
	{
		void Create(CreateTransaction transactionToCreate);
		IEnumerable<Transaction> Get();
		void Update(int transactionId, UpdateTransaction transactionToUpdate);
		void Delete(int transactionId);
	}

	public class TransactionService : ITransactionService
	{
		private readonly ITransactionRepository _transactionRepository;

		public TransactionService(ITransactionRepository transactionRepository)
		{
			_transactionRepository = transactionRepository;
		}

		public void Create(CreateTransaction transactionToCreate)
		{
			_transactionRepository.Create(new TransactionRepositoryModel
			{
				Description = transactionToCreate.Description,
				IsCredit = transactionToCreate.IsCredit!.Value,
				AmountCents = transactionToCreate.AmountCents!.Value,
				MonthId = transactionToCreate.MonthId!.Value,
				SubcategoryId = transactionToCreate.SubcategoryId!.Value
			});
		}

		public IEnumerable<Transaction> Get()
		{
			IEnumerable<TransactionRepositoryModel> results = _transactionRepository.Get();
			return results.Select(x => new Transaction
			{
				ID = x.ID,
				Description = x.Description,
				IsCredit = x.IsCredit,
				AmountCents = x.AmountCents,
				EnteredDateUtc = x.EnteredDateUtc,
				MonthId = x.MonthId,
				SubcategoryId = x.SubcategoryId
			});
		}

		public void Update(int transactionId, UpdateTransaction transactionToUpdate)
		{
			_transactionRepository.Update(new TransactionRepositoryModel
			{
				ID = transactionId,
				Description = transactionToUpdate.Description,
				IsCredit = transactionToUpdate.IsCredit!.Value,
				AmountCents = transactionToUpdate.AmountCents!.Value
			});
		}

		public void Delete(int transactionId)
		{
			_transactionRepository.Delete(transactionId);
		}
	}
}