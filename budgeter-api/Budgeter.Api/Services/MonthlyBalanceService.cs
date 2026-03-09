using Budgeter.Api.Models.MonthlyBalance;
using Budgeter.Repository.Repositories;
using Microsoft.Data.SqlClient;
using MonthlyBalanceRepositoryModel = Budgeter.Repository.Models.MonthlyBalance;

namespace Budgeter.Api.Services
{
	public interface IMonthlyBalanceService
	{
		void Create(CreateMonthlyBalance monthlyBalanceToCreate);
	}

	public class MonthlyBalanceService : IMonthlyBalanceService
	{
		private readonly IMonthlyBalanceRepository _monthlyBalanceRepository;
		private readonly IMonthRepository _monthRepository;

		public MonthlyBalanceService(IMonthlyBalanceRepository monthlyBalanceRepository, IMonthRepository monthRepository)
		{
			_monthlyBalanceRepository = monthlyBalanceRepository;
			_monthRepository = monthRepository;
		}

		public void Create(CreateMonthlyBalance monthlyBalanceToCreate)
		{
			var repositoryModel = new MonthlyBalanceRepositoryModel
			{
				MonthId = monthlyBalanceToCreate.MonthId!.Value,
				SubcategoryId = monthlyBalanceToCreate.SubcategoryId!.Value,
				BudgetedAmountCents = monthlyBalanceToCreate.BudgetedAmountCents,
				ActualAmountCents = monthlyBalanceToCreate.ActualAmountCents!.Value
			};

			try {
				_monthlyBalanceRepository.Create(repositoryModel);
			}
			catch (SqlException e) when (e.Number == 547 && e.Message.Contains("dbo.Month") && monthlyBalanceToCreate.MonthId == 0)
			{
				_monthRepository.CreateDefaultMonth();
				_monthlyBalanceRepository.Create(repositoryModel);
			}
		}
	}
}
