using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Budgeter.Api.Models
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