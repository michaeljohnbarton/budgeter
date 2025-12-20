using System;
namespace Budgeter.Api.Models
{
	public class Month
	{
        public int ID { get; set; }
        public int MonthNumber { get; set; }
        public int Year { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}