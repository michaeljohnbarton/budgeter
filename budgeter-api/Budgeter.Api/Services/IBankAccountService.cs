using System;
using Budgeter.Api.Models;

namespace Budgeter.Api.Services
{
	public interface IBankAccountService
	{
		void Create(CreateBankAccount bankAccountToCreate);
		IEnumerable<BankAccount> Get();
	}
}

