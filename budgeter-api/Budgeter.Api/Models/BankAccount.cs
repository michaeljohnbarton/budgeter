using System;
using Budgeter.Api.Enums;

namespace Budgeter.Api.Models
{
	public class BankAccount
	{
		public int ID { get; set; }
		public string Name { get; set; } = string.Empty;
		public MonthlyBalancePropagationType MonthlyBalancePropagationType { get; set; }
		public bool HasBudgetedAmounts { get; set; }
	}
}

