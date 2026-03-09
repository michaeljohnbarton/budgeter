using System.ComponentModel.DataAnnotations;

namespace Budgeter.Api.Models.Category
{
	public class UpdateCategory
	{
		[Required, MaxLength(100)]
		public string Name { get; set; } = string.Empty;
		[Required]
		public bool? IsCredit { get; set; }
	}
}