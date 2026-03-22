using Budgeter.Api.Models.Transaction;
using Budgeter.Repository.Repositories;
using TransactionRepositoryModel = Budgeter.Repository.Models.Transaction;

namespace Budgeter.Api.Services
{
	public interface ITransactionService
	{
		void Create(CreateTransaction transactionToCreate);
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
	}
}