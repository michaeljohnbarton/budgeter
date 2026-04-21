using System.Data;
using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface IMonthlyBalanceRepository
	{
		void Create(MonthlyBalance monthlyBalanceToCreate);
		IEnumerable<MonthlyBalance> Get();
		MonthlyBalance GetById(int monthlyBalanceId);
		void Update(MonthlyBalance monthlyBalanceToUpdate);
		void UpdateForTransaction(int monthId, int subcategoryId, int actualAmountCents, IDbConnection connection, IDbTransaction dbTransaction);
	}
}