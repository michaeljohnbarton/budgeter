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
			MonthlyBalancePropagationTypeRepositoryEnum monthlyBalancePropagationType;

			switch(bankAccountToCreate.MonthlyBalancePropagationType)
			{
				case MonthlyBalancePropagationType.BankAccount:
					monthlyBalancePropagationType = MonthlyBalancePropagationTypeRepositoryEnum.BankAccount;
					break;
				case MonthlyBalancePropagationType.Subcategory:
					monthlyBalancePropagationType = MonthlyBalancePropagationTypeRepositoryEnum.Subcategory;
					break;
				default:
					monthlyBalancePropagationType = MonthlyBalancePropagationTypeRepositoryEnum.BankAccount;
					break;
			}

			_bankAccountRepository.Create(new BankAccountRepositoryModel
			{
				Name = bankAccountToCreate.Name,
				MonthlyBalancePropagationType = monthlyBalancePropagationType,
				HasBudgetedAmounts = bankAccountToCreate.HasBudgetedAmounts ?? false
			});
		}
	}
}

