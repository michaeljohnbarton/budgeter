using System.Data.SqlClient;
using Budgeter.Repository.Models;
using Budgeter.Repository.Repositories;
using Dapper;

namespace Budgeter.SqlServer.Repositories
{
    public class WeatherForecastRepository : IWeatherForecastRepository
	{
        private const string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";
        public IEnumerable<WeatherForecast> Get()
		{
            string sql = "SELECT * FROM WeatherForecast";
            List<WeatherForecast> results = new List<WeatherForecast>();

            using (var connection = new SqlConnection(connectionString))
            {
                return connection.Query<WeatherForecast>(sql).ToList();
            }
        }
	}
}

