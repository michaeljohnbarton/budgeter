using System.ComponentModel.DataAnnotations;
using Budgeter.Api.Infrastructure;

namespace Budgeter.Api.Models.Category
{
	public class CreateCategory
	{
		[Required, MaxLength(100)]
		public string Name { get; set; } = string.Empty;
		[Range(1, Constants.MaxRank)]
		public int? Rank { get; set; }
		[Required, Range(1, int.MaxValue)]
		public int? BankAccountId { get; set; }
		[Required]
		public bool? IsCredit { get; set; }
	}
}