using System;
using System.Data.SqlClient;
using budgeter_repository.Models;

namespace budgeter_sql_server.Queries
{
	public static class GetWeatherForecast
	{
        public static IEnumerable<WeatherForecast> Execute() {
			string sql = "SELECT * FROM WeatherForecast";
			List<WeatherForecast> results = new List<WeatherForecast>();

            string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";
            using (var connection = new SqlConnection(connectionString))
			{
				connection.Open();
                using (var command = new SqlCommand(sql, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        while(reader.Read())
                        {
                            results.Add(new WeatherForecast
                            {
                                Date = reader.GetDateTime(reader.GetOrdinal("Date")),
                                Summary = reader.GetString(reader.GetOrdinal("Summary"))
                            });
                        }
                    }
                }
            }
            return results;
		}
	}
}

