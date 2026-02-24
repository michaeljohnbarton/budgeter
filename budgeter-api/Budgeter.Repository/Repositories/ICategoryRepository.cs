using System;
using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface ICategoryRepository
	{
		void Create(Category categoryToCreate);
		IEnumerable<Category> Get();
		void Update(Category categoryToUpdate);
		void Delete(int categoryId);
	}
}