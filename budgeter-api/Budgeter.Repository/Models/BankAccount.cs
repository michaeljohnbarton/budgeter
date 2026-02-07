using System;
using Budgeter.Repository.Enums;

namespace Budgeter.Repository.Models
{
	public class BankAccount
	{
		public string Name { get; set; } = string.Empty;
		public MonthlyBalancePropagationType MonthlyBalancePropagationType { get; set; }
		public string MonthlyBalancePropagationTypeString => MonthlyBalancePropagationType.ToString();
		public bool HasBudgetedAmounts { get; set; }
	}
}