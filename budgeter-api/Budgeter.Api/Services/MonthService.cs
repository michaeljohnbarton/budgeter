using System;
using Budgeter.Api.Models;
using Budgeter.Repository.Repositories;
using Budgeter.SqlServer.Repositories;
using MonthRepositoryModel = Budgeter.Repository.Models.Month;


namespace Budgeter.Api.Services
{
	public class MonthService : IMonthService
	{
		private readonly IMonthRepository _monthRepository;

		public MonthService(IMonthRepository monthRepository)
		{
			_monthRepository = monthRepository;
		}

		public void Create(CreateMonth monthToCreate)
		{
			_monthRepository.Create(new MonthRepositoryModel
			{
				MonthNumber = monthToCreate.MonthNumber!.Value,
				Year = monthToCreate.Year!.Value
			});
		}

		public IEnumerable<Month> Get()
		{
			IEnumerable<MonthRepositoryModel> results = _monthRepository.Get();
			return results.Select(result => new Month
			{
				ID = result.ID,
				MonthNumber = result.MonthNumber,
				Year = result.Year
			});
		}

		public void Update(int monthId, UpdateMonth monthToUpdate)
		{
			_monthRepository.Update(new MonthRepositoryModel
			{
				ID = monthId,
				MonthNumber = monthToUpdate.MonthNumber!.Value,
				Year = monthToUpdate.Year!.Value
			});
		}

		public void Delete(int monthId)
		{
			_monthRepository.Delete(monthId);
		}
	}
}