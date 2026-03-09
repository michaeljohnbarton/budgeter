using System.ComponentModel.DataAnnotations;

namespace Budgeter.Api.Models.Month
{
	public class UpdateMonth
	{
		[Required, Range(1, 12)]
		public int? MonthNumber { get; set; }
		[Required, Range(2000, 3000)]
		public int? Year { get; set; }
	}
}

