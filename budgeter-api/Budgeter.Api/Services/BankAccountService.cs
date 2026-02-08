using Budgeter.Api.Enums;
using Budgeter.Api.Models;
using Budgeter.Repository.Repositories;
using BankAccountRepositoryModel = Budgeter.Repository.Models.BankAccount;
using MonthlyBalancePropagationTypeRepositoryEnum = Budgeter.Repository.Enums.MonthlyBalancePropagationType;

namespace Budgeter.Api.Services
{
	public class BankAccountService : IBankAccountService
	{
		private readonly IBankAccountRepository _bankAccountRepository;

		public BankAccountService(IBankAccountRepository bankAccountRepository)
		{
			_bankAccountRepository = bankAccountRepository;
		}

		public void Create(CreateBankAccount bankAccountToCreate)
		{
			MonthlyBalancePropagationTypeRepositoryEnum monthlyBalancePropagationType = bankAccountToCreate.MonthlyBalancePropagationType switch
			{
				MonthlyBalancePropagationType.BankAccount => MonthlyBalancePropagationTypeRepositoryEnum.BankAccount,
				MonthlyBalancePropagationType.Subcategory => MonthlyBalancePropagationTypeRepositoryEnum.Subcategory,
				_ => MonthlyBalancePropagationTypeRepositoryEnum.BankAccount
			};

			_bankAccountRepository.Create(new BankAccountRepositoryModel
			{
				Name = bankAccountToCreate.Name,
				MonthlyBalancePropagationType = monthlyBalancePropagationType,
				HasBudgetedAmounts = bankAccountToCreate.HasBudgetedAmounts ?? false
			});
		}

		public IEnumerable<BankAccount> Get()
		{
			IEnumerable<BankAccountRepositoryModel> results = _bankAccountRepository.Get();
			return results.Select(result =>
			{
				MonthlyBalancePropagationType monthlyBalancePropagationType = result.MonthlyBalancePropagationType switch
				{
					MonthlyBalancePropagationTypeRepositoryEnum.BankAccount => MonthlyBalancePropagationType.BankAccount,
					MonthlyBalancePropagationTypeRepositoryEnum.Subcategory => MonthlyBalancePropagationType.Subcategory,
					_ => MonthlyBalancePropagationType.BankAccount
				};

				return new BankAccount
				{
					ID = result.ID,
					Name = result.Name,
					MonthlyBalancePropagationType = monthlyBalancePropagationType,
					HasBudgetedAmounts = result.HasBudgetedAmounts
				};
			});
		}
	}
}

