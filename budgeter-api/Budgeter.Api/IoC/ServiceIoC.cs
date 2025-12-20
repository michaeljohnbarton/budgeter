using System;
using Budgeter.Api.Services;

namespace Budgeter.Api.IoC
{
	public static class ServiceIoC
	{
		public static void AddServices(IServiceCollection services)
		{
			services.AddScoped<IWeatherForecastService, WeatherForecastService>();
			services.AddScoped<IMonthService, MonthService>();
		}
	}
}