using System.ComponentModel.DataAnnotations;
using Budgeter.Api.Infrastructure;

namespace Budgeter.Api.Models.Category
{
	public class UpdateCategory
	{
		[Required, MaxLength(100)]
		public string Name { get; set; } = string.Empty;
		[Range(1, Constants.MaxRank)]
		public int? Rank { get; set; }
		[Required]
		public bool? IsCredit { get; set; }
	}
}