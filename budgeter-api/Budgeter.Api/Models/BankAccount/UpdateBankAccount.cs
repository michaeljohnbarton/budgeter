using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Budgeter.Api.Enums;
using Budgeter.Api.Infrastructure;

namespace Budgeter.Api.Models.BankAccount
{
	public class UpdateBankAccount
	{
		[Required, MaxLength(100)]
		public string Name { get; set; } = string.Empty;
		[Range(1, Constants.MaxRank)]
		public int? Rank { get; set; }
		[Required, JsonConverter(typeof(JsonStringEnumConverter))]
		public MonthlyBalancePropagationType? MonthlyBalancePropagationType { get; set; }
		[Required]
		public bool? ShowBudgetedAmounts { get; set; }
	}
}

