using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface IMonthlyBalanceRepository
	{
		void Create(MonthlyBalance monthlyBalanceToCreate);
		IEnumerable<MonthlyBalance> Get();
	}
}