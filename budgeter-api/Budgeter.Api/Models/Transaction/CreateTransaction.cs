using System.ComponentModel.DataAnnotations;

namespace Budgeter.Api.Models.Transaction
{
	public class CreateTransaction
	{
		[Required, Length(1, 255)]
		public string Description { get; set; } = string.Empty;
		[Required]
		public bool? IsCredit { get; set; }
		[Required, Range(1, int.MaxValue)]
		public int? AmountCents { get; set; }
		[Required, Range(1, int.MaxValue)]
		public int? MonthId { get; set; }
		[Required, Range(1, int.MaxValue)]
		public int? SubcategoryId { get; set; }
	}
}