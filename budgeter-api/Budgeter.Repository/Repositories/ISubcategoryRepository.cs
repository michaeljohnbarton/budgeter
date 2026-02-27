using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
    public interface ISubcategoryRepository
	{
		void Create(Subcategory subcategoryToCreate);
	}
}