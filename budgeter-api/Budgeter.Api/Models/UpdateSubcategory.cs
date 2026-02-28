using System;
using System.ComponentModel.DataAnnotations;

namespace Budgeter.Api.Models
{
	public class UpdateSubcategory
	{
		[Required, MaxLength(100)]
		public string Name { get; set; } = string.Empty;
		[Required]
		public bool? RecalculateFutureBalances { get; set; }
		[Required]
		public bool? HasTransactions { get; set; }
	}
}

