using System.Data.SqlClient;
using budgeter_repository.Models;
using budgeter_repository.Repositories;
using Dapper;

namespace budgeter_sql_server.Repositories
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

