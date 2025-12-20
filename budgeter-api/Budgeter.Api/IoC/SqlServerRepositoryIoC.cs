using System;
using Budgeter.Repository.Repositories;
using Budgeter.SqlServer.Repositories;

namespace Budgeter.Api.IoC
{
	public class SqlServerRepositoryIoC
	{
        public static void AddServices(IServiceCollection services)
        {
            services.AddScoped<IWeatherForecastRepository, WeatherForecastRepository>();
            services.AddScoped<IMonthRepository, MonthRepository>();
        }
    }
}