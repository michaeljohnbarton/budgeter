using System;
namespace budgeter_api.Services
{
	public class WeatherForecastService : IWeatherForecastService
	{
		public WeatherForecastService()
		{
		}

		public IEnumerable<WeatherForecast> Get()
		{
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = "test"
            })
            .ToArray();
        }
	}
}

