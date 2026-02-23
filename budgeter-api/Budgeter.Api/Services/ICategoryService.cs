using System;
using Budgeter.Api.Models;

namespace Budgeter.Api.Services
{
	public interface ICategoryService
	{
		void Create(CreateCategory categoryToCreate);
		IEnumerable<Category> Get();
	}
}