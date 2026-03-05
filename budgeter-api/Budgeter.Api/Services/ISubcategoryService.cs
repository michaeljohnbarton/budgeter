using Budgeter.Api.Models;

namespace Budgeter.Api.Services
{
	public interface ISubcategoryService
	{
		Subcategory Create(CreateSubcategory subcategoryToCreate);
		IEnumerable<Subcategory> Get();
		void Update(int subcategoryId, UpdateSubcategory subcategoryToUpdate);
		void Delete(int subcategoryId);
	}
}