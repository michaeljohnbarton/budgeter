using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface ISubcategoryRepository
	{
		void Create(Subcategory subcategoryToCreate);
		IEnumerable<Subcategory> Get();
		void Update(Subcategory subcategoryToUpdate);
	}
}