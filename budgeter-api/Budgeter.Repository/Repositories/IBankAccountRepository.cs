using System;
using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface IBankAccountRepository
	{
		void Create(BankAccount bankAccountToCreate);
	}
}

