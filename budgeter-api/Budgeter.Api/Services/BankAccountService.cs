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
			_bankAccountRepository.Create(new BankAccountRepositoryModel
			{
				Name = bankAccountToCreate.Name,
				MonthlyBalancePropagationType = ConvertToRepositoryEnum(bankAccountToCreate.MonthlyBalancePropagationType),
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

		public void Update(int bankAccountId, UpdateBankAccount bankAccountToUpdate)
		{
			_bankAccountRepository.Update(new BankAccountRepositoryModel
			{
				ID = bankAccountId,
				Name = bankAccountToUpdate.Name,
				MonthlyBalancePropagationType = ConvertToRepositoryEnum(bankAccountToUpdate.MonthlyBalancePropagationType),
				HasBudgetedAmounts = bankAccountToUpdate.HasBudgetedAmounts ?? false
			});
		}

		public void Delete(int bankAccountId)
		{
			_bankAccountRepository.Delete(bankAccountId);
		}

		private static MonthlyBalancePropagationTypeRepositoryEnum ConvertToRepositoryEnum(MonthlyBalancePropagationType? monthlyBalancePropagationType)
		{
			return monthlyBalancePropagationType switch
			{
				MonthlyBalancePropagationType.BankAccount => MonthlyBalancePropagationTypeRepositoryEnum.BankAccount,
				MonthlyBalancePropagationType.Subcategory => MonthlyBalancePropagationTypeRepositoryEnum.Subcategory,
				_ => MonthlyBalancePropagationTypeRepositoryEnum.BankAccount
			};
		}
	}
}

