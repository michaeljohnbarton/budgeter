namespace Budgeter.Repository.Models
{
	public class MonthlyBalance
	{
		public int ID { get; set; }
		public int MonthId { get; set; }
		public int SubcategoryId { get; set; }
		public int? BudgetedAmountCents { get; set; }
		public int ActualAmountCents { get; set; }
	}
}