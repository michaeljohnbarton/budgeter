
using System;
using Budgeter.Repository.Models;

namespace Budgeter.Repository.Repositories
{
	public interface IMonthRepository
	{
		IEnumerable<Month> Get();
		void Create(Month monthToAdd);
		void Update(Month monthToUpdate);
	}
}