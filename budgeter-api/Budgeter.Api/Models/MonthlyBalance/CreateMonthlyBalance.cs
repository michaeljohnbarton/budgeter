using System.ComponentModel.DataAnnotations;

namespace Budgeter.Api.Models.MonthlyBalance
{
	public class CreateMonthlyBalance
	{
		[Required, Range(0, int.MaxValue)]
		public int? MonthId { get; set; }
		[Required, Range(1, int.MaxValue)]
		public int? SubcategoryId { get; set; }
		public int? BudgetedAmountCents { get; set; }
		[Required]
		public int? ActualAmountCents { get; set; }
	}
}