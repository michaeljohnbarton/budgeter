using System.Data;
using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface IMonthlyBalanceRepository
	{
		void Create(MonthlyBalance monthlyBalanceToCreate);
		IEnumerable<MonthlyBalance> Get();
		void Update(MonthlyBalance monthlyBalanceToUpdate);
		void Update(int monthId, int subcategoryId, int actualAmountCents, IDbConnection connection, IDbTransaction dbTransaction);
	}
}