using System;
using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface IBankAccountRepository
	{
		void Create(BankAccount bankAccountToCreate);
		IEnumerable<BankAccount> Get();
		void Update(BankAccount bankAccountToUpdate);
		void Delete(int bankAccountId);
	}
}

