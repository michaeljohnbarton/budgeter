using System;
using budgeter_repository.Repositories;
using budgeter_repository.Models;

namespace budgeter_sql_server.Repositories
{
	public class WeatherForecastRepository : IWeatherForecastRepository
	{
		public IEnumerable<WeatherForecast> Get()
		{
            return Enumerable.Range(1, 10).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                Summary = "test"
            })
            .ToArray();
        }
	}
}

