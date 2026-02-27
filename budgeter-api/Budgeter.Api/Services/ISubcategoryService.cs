using Budgeter.Api.Models;

namespace Budgeter.Api.Services
{
    public interface ISubcategoryService
	{
		void Create(CreateSubcategory subcategoryToCreate);
	}
}