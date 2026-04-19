using System.ComponentModel.DataAnnotations;

namespace Budgeter.Api.Models.Transaction
{
	public class PatchTransaction
	{
		[Length(1, 255)]
		public string? Description { get; set; }
		public bool? IsCredit { get; set; }
		[Range(1, int.MaxValue)]
		public int? AmountCents { get; set; }
	}
}
