using System;
using Budgeter.Api.Services.Models;
using Budgeter.Repository.Repositories;
using WeatherForecastRepositoryModel = Budgeter.Repository.Models.WeatherForecast;
namespace Budgeter.Api.Services
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

