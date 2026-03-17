using System.ComponentModel.DataAnnotations;
using Budgeter.Api.Infrastructure;

namespace Budgeter.Api.Models.Subcategory
{
	public class CreateSubcategory
	{
		[Required, MaxLength(100)]
		public string Name { get; set; } = string.Empty;
		[Range(1, Constants.MaxRank)]
		public int? Rank { get; set; }
		[Required, Range(1, int.MaxValue)]
		public int? CategoryId { get; set; }
		[Required]
		public bool? RecalculateFutureBalances { get; set; }
		[Required]
		public bool? HasTransactions { get; set; }
	}
}