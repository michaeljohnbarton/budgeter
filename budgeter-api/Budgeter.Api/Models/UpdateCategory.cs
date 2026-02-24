using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Budgeter.Api.Models
{
	public class UpdateCategory
	{
		[Required, MaxLength(100)]
		public string Name { get; set; } = string.Empty;
		[Required]
		public bool? IsCredit { get; set; }
	}
}