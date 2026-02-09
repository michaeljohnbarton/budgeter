using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Budgeter.Api.Enums;

namespace Budgeter.Api.Models
{
	public class UpdateBankAccount
	{
		[Required, MaxLength(100)]
		public string Name { get; set; } = string.Empty;
		[Required, JsonConverter(typeof(JsonStringEnumConverter))]
		public MonthlyBalancePropagationType? MonthlyBalancePropagationType { get; set; }
		[Required]
		public bool? HasBudgetedAmounts { get; set; }
	}
}

