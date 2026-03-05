using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface ISubcategoryRepository
	{
		Subcategory Create(Subcategory subcategoryToCreate);
		IEnumerable<Subcategory> Get();
		void Update(Subcategory subcategoryToUpdate);
		void Delete(int subcategoryId);
	}
}