using Budgeter.Api.Models;
using Budgeter.Repository.Repositories;
using SubcategoryRepositoryModel = Budgeter.Repository.Models.Subcategory;

namespace Budgeter.Api.Services
{
    public class SubcategoryService : ISubcategoryService
	{
		private readonly ISubcategoryRepository _subcategoryRepository;

		public SubcategoryService(ISubcategoryRepository subcategoryRepository)
		{
			_subcategoryRepository = subcategoryRepository;
		}

		public void Create(CreateSubcategory subcategoryToCreate)
		{
			_subcategoryRepository.Create(new SubcategoryRepositoryModel
			{
				Name = subcategoryToCreate.Name,
				CategoryId = subcategoryToCreate.CategoryId!.Value,
				RecalculateFutureBalances = subcategoryToCreate.RecalculateFutureBalances!.Value,
				HasTransactions = subcategoryToCreate.HasTransactions!.Value
			});
		}
	}
}