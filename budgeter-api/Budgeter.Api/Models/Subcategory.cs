using System;
namespace Budgeter.Api.Models
{
	public class Subcategory
	{
		public int ID { get; set; }
		public string Name { get; set; } = string.Empty;
		public int CategoryId { get; set; }
		public bool RecalculateFutureBalances { get; set; }
		public bool HasTransactions { get; set; }
	}
}