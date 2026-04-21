namespace Budgeter.Api.Models.MonthlyBalance
{
	public class PatchMonthlyBalance
	{
		public int? BudgetedAmountCents { get; set; }
		public int? ActualAmountCents { get; set; }
	}
}
