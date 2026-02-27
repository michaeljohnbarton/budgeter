using System;
using Budgeter.Repository.Repositories;
using Budgeter.SqlServer.Repositories;

namespace Budgeter.Api.IoC
{
	public class SqlServerRepositoryIoC
	{
		public static void AddServices(IServiceCollection services)
		{
			services.AddScoped<IMonthRepository, MonthRepository>();
			services.AddScoped<IBankAccountRepository, BankAccountRepository>();
			services.AddScoped<ICategoryRepository, CategoryRepository>();
			services.AddScoped<ISubcategoryRepository, SubcategoryRepository>();
		}
	}
}