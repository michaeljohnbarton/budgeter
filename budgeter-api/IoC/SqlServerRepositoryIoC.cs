using System;
using budgeter_repository.Repositories;
using budgeter_sql_server.Repositories;

namespace budgeter_api.IoC
{
	public class SqlServerRepositoryIoC
	{
        public static void AddServices(IServiceCollection services)
        {
            services.AddScoped<IWeatherForecastRepository, WeatherForecastRepository>();
        }
    }
}

