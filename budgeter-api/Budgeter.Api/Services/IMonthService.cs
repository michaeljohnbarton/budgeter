using System;
using Budgeter.Api.Models;

namespace Budgeter.Api.Services
{
	public interface IMonthService
	{
		void Create(CreateMonth monthToCreate);
		IEnumerable<Month> Get();
		void Update(int monthId, UpdateMonth monthToUpdate);
		void Delete(int monthId);
	}
}