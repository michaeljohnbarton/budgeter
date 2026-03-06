using Budgeter.Api.Models;

namespace Budgeter.Api.Services
{
	public interface IMonthlyBalanceService
	{
		void Create(CreateMonthlyBalance monthlyBalanceToCreate);
	}
}