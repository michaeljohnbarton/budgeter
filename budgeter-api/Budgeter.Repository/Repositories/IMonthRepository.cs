
using System;
using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface IMonthRepository
	{
		IEnumerable<Month> Get();
		void Create(AddMonth monthToAdd);
	}
}