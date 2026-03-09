using System.ComponentModel.DataAnnotations;

namespace Budgeter.Api.Models.Category
{
	public class CreateCategory
	{
		[Required, MaxLength(100)]
		public string Name { get; set; } = string.Empty;
		[Required, Range(1, int.MaxValue)]
		public int? BankAccountId { get; set; }
		[Required]
		public bool? IsCredit { get; set; }
	}
}