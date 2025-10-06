using System;
using budgeter_api.Services;

namespace budgeter_api.IoC
{
	public static class ServiceIoC
	{
		public static void AddServices(IServiceCollection services)
		{
			services.AddScoped<IWeatherForecastService, WeatherForecastService>();
		}
	}
}

