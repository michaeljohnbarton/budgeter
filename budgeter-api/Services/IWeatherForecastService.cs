using System;
namespace budgeter_api.Services
{
	public interface IWeatherForecastService
	{
		IEnumerable<WeatherForecast> Get();
	}
}

