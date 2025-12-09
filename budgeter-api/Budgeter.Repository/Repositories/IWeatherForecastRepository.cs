using System;
using Budgeter.Repository.Models;
namespace Budgeter.Repository.Repositories
{
	public interface IWeatherForecastRepository
	{
		IEnumerable<WeatherForecast> Get();
	}
}

