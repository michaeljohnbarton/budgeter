using System.ComponentModel.DataAnnotations;

namespace Budgeter.Api.Models
{
    public class CreateSubcategory
	{
		[Required, MaxLength(100)]
		public string Name { get; set; } = string.Empty;
		[Required, Range(1, int.MaxValue)]
		public int? CategoryId { get; set; }
		[Required]
		public bool? RecalculateFutureBalances { get; set; }
		[Required]
		public bool? HasTransactions { get; set; }
	}
}