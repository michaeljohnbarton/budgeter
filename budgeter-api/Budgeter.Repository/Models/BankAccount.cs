using System;
using Budgeter.Repository.Enums;

namespace Budgeter.Repository.Models
{
	public class BankAccount
	{
		public int ID { get; set; }
		public string Name { get; set; } = string.Empty;
 
		public MonthlyBalancePropagationType MonthlyBalancePropagationType {
			get
			{
				return _monthlyBalancePropagationTypeString switch
				{
					"BankAccount" => MonthlyBalancePropagationType.BankAccount,
					"Subcategory" => MonthlyBalancePropagationType.Subcategory,
					_ => MonthlyBalancePropagationType.BankAccount
				};
			}
			set
			{
				_monthlyBalancePropagationTypeString = value.ToString();
			}
		}

		private string _monthlyBalancePropagationTypeString = string.Empty;
		public string MonthlyBalancePropagationTypeString
		{
			get => _monthlyBalancePropagationTypeString;
			set => _monthlyBalancePropagationTypeString = value;
		}

		public bool HasBudgetedAmounts { get; set; }
	}
}