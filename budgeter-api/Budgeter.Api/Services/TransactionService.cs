using Budgeter.Api.Infrastructure;
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
		private readonly IUnitOfWork _unitOfWork;
		private readonly ITransactionRepository _transactionRepository;
		private readonly IMonthlyBalanceRepository _monthlyBalanceRepository;

		public TransactionService(IUnitOfWork unitOfWork, ITransactionRepository transactionRepository, IMonthlyBalanceRepository monthlyBalanceRepository)
		{
			_unitOfWork = unitOfWork;
			_transactionRepository = transactionRepository;
			_monthlyBalanceRepository = monthlyBalanceRepository;
		}

		public void Create(CreateTransaction transactionToCreate)
		{
			try
			{
				_unitOfWork.Begin();

				_transactionRepository.Create(
					new TransactionRepositoryModel
					{
						Description = transactionToCreate.Description,
						IsCredit = transactionToCreate.IsCredit!.Value,
						AmountCents = transactionToCreate.AmountCents!.Value,
						MonthId = transactionToCreate.MonthId!.Value,
						SubcategoryId = transactionToCreate.SubcategoryId!.Value
					},
					_unitOfWork.Connection,
					_unitOfWork.Transaction!
				);

				_monthlyBalanceRepository.Update(
					transactionToCreate.MonthId!.Value,
					transactionToCreate.SubcategoryId!.Value,
					transactionToCreate.IsCredit!.Value ? transactionToCreate.AmountCents!.Value : -transactionToCreate.AmountCents!.Value,
					_unitOfWork.Connection,
					_unitOfWork.Transaction!
				);

				// TODO: Update future months depending on monthly balance propagation type

				_unitOfWork.Commit();
			}
			catch
			{
				_unitOfWork.Rollback();
				throw;
			}
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