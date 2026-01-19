using System;
using Budgeter.Api.Models;

namespace Budgeter.Api.Services
{
	public interface IMonthService
	{
		IEnumerable<Month> Get();
		void Create(AddMonth monthToAdd);
		void Update(int monthId, UpdateMonth monthToUpdate);
	}
}