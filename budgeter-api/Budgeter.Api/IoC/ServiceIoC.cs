using System;
using Budgeter.Api.Services;

namespace Budgeter.Api.IoC
{
	public static class ServiceIoC
	{
		public static void AddServices(IServiceCollection services)
		{
			services.AddScoped<IMonthService, MonthService>();
			services.AddScoped<IBankAccountService, BankAccountService>();
			services.AddScoped<ICategoryService, CategoryService>();
			services.AddScoped<ISubcategoryService, SubcategoryService>();
		}
	}
}