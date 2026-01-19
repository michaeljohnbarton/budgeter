
using System;
using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface IMonthRepository
	{
		void Create(Month monthToCreate);
		IEnumerable<Month> Get();
		void Update(Month monthToUpdate);
		void Delete(int monthId);
	}
}