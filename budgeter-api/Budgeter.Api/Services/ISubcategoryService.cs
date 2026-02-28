using Budgeter.Api.Models;

namespace Budgeter.Api.Services
{
    public interface ISubcategoryService
	{
		void Create(CreateSubcategory subcategoryToCreate);
		IEnumerable<Subcategory> Get();
		void Update(int subcategoryId, UpdateSubcategory subcategoryToUpdate);
	}
}