using System;
using Budgeter.Api.Models;
using Budgeter.Repository.Repositories;
using Budgeter.SqlServer.Repositories;
using MonthRepositoryModel = Budgeter.Repository.Models.Month;
using AddMonthRepositoryModel = Budgeter.Repository.Models.AddMonth;


namespace Budgeter.Api.Services
{
	public class MonthService : IMonthService
	{
		private readonly IMonthRepository _monthRepository;

		public MonthService(IMonthRepository monthRepository)
		{
			_monthRepository = monthRepository;
		}

		public IEnumerable<Month> Get()
		{
			IEnumerable<MonthRepositoryModel> results = _monthRepository.Get();
			return results.Select(result => new Month
			{
				ID = result.ID,
				MonthNumber = result.MonthNumber,
				Year = result.Year,
				Name = result.Name
			});
		}

		public void Create(AddMonth monthToAdd)
		{
			_monthRepository.Create(new AddMonthRepositoryModel
			{
				MonthNumber = monthToAdd.MonthNumber!.Value,
				Year = monthToAdd.Year!.Value,
				Name = monthToAdd.Name
			});
		}
	}
}