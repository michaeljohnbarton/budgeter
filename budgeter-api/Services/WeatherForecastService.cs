using System;
using budgeter_api.Services.Models;
using budgeter_repository.Repositories;
using WeatherForecastRepositoryModel = budgeter_repository.Models.WeatherForecast;
namespace budgeter_api.Services
{
	public class WeatherForecastService : IWeatherForecastService
	{
        private readonly IWeatherForecastRepository _weatherForecastRepository;

        public WeatherForecastService(IWeatherForecastRepository weatherForecastRepository)
		{
            _weatherForecastRepository = weatherForecastRepository;
		}

		public IEnumerable<WeatherForecast> Get()
		{
            IEnumerable<WeatherForecastRepositoryModel> results = _weatherForecastRepository.Get();
            return results.Select(result => new WeatherForecast
            {
                Date = result.Date,
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = result.Summary
            });
        }
	}
}

