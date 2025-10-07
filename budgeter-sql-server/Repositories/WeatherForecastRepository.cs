using System;
using budgeter_repository.Repositories;
using budgeter_repository.Models;
using budgeter_sql_server.Queries;

namespace budgeter_sql_server.Repositories
{
	public class WeatherForecastRepository : IWeatherForecastRepository
	{
		public IEnumerable<WeatherForecast> Get()
		{
            return GetWeatherForecast.Execute();
        }
	}
}

