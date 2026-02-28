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

		public IEnumerable<Subcategory> Get()
		{
			IEnumerable<SubcategoryRepositoryModel> results = _subcategoryRepository.Get();
			return results.Select(x => new Subcategory
			{
				ID = x.ID,
				Name = x.Name,
				CategoryId = x.CategoryId,
				RecalculateFutureBalances = x.RecalculateFutureBalances,
				HasTransactions = x.HasTransactions
			});
		}

		public void Update(int subcategoryId, UpdateSubcategory subcategoryToUpdate)
		{
			_subcategoryRepository.Update(new SubcategoryRepositoryModel
			{
				ID = subcategoryId,
				Name = subcategoryToUpdate.Name,
				RecalculateFutureBalances = subcategoryToUpdate.RecalculateFutureBalances!.Value,
				HasTransactions = subcategoryToUpdate.HasTransactions!.Value
			});
		}

		public void Delete(int subcategoryId)
		{
			_subcategoryRepository.Delete(subcategoryId);
		}
	}
}