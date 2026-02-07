using System;
using System.Text.Json.Serialization;

namespace Budgeter.Api.Enums
{
	[JsonConverter(typeof(JsonStringEnumConverter))]
	public enum MonthlyBalancePropagationType
	{
		BankAccount,
		Subcategory
	}
}

