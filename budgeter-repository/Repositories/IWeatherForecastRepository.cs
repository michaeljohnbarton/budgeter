using System;
using budgeter_repository.Models;
namespace budgeter_repository.Repositories
{
	public interface IWeatherForecastRepository
	{
		IEnumerable<WeatherForecast> Get();
	}
}

