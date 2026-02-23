using System;
using Budgeter.Api.Models;
using CategoryRepositoryModel = Budgeter.Repository.Models.Category;
using Budgeter.Repository.Repositories;

namespace Budgeter.Api.Services
{
	public class CategoryService : ICategoryService
	{
		private readonly ICategoryRepository _categoryRepository;

		public CategoryService(ICategoryRepository categoryRepository)
		{
			_categoryRepository = categoryRepository;
		}

		public void Create(CreateCategory categoryToCreate)
		{
			_categoryRepository.Create(new CategoryRepositoryModel
			{
				Name = categoryToCreate.Name,
				BankAccountId = categoryToCreate.BankAccountId!.Value,
				IsCredit = categoryToCreate.IsCredit!.Value
			});
		}

		public IEnumerable<Category> Get()
		{
			IEnumerable<CategoryRepositoryModel> results = _categoryRepository.Get();
			return results.Select(x => new Category
			{
				ID = x.ID,
				Name = x.Name,
				BankAccountId = x.BankAccountId,
				IsCredit = x.IsCredit
			});
		}
	}
}