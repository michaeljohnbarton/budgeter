using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface IMonthRepository
	{
		void Create(Month monthToCreate);
		void CreateDefaultMonth();
		IEnumerable<Month> Get();
		void Update(Month monthToUpdate);
		void Delete(int monthId);
	}
}