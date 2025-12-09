using System;
using Budgeter.Api.Services.Models;
namespace Budgeter.Api.Services
{
	public interface IWeatherForecastService
	{
		IEnumerable<WeatherForecast> Get();
	}
}

