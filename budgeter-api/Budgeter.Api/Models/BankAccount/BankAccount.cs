using Budgeter.Api.Enums;

namespace Budgeter.Api.Models.BankAccount
{
	public class BankAccount
	{
		public int ID { get; set; }
		public string Name { get; set; } = string.Empty;
		public int? Rank { get; set; }
		public MonthlyBalancePropagationType MonthlyBalancePropagationType { get; set; }
		public bool ShowBudgetedAmounts { get; set; }
	}
}

