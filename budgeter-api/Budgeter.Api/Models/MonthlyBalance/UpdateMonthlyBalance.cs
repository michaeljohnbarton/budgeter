using System.ComponentModel.DataAnnotations;

namespace Budgeter.Api.Models.MonthlyBalance
{
	public class UpdateMonthlyBalance
	{
		public int? BudgetedAmountCents { get; set; }
		[Required]
		public int? ActualAmountCents { get; set; }
	}
}
