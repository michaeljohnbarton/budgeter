using System;
using budgeter_api.Services.Models;
namespace budgeter_api.Services
{
	public interface IWeatherForecastService
	{
		IEnumerable<WeatherForecast> Get();
	}
}

