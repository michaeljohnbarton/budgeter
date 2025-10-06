using System;
using budgeter_api.Services;

namespace budgeter_api.Services
{
	public static class ServiceIoC
	{
		public static void AddServices(this IServiceCollection services)
		{
			services.AddScoped<IWeatherForecastService, WeatherForecastService>();
		}
	}
}

