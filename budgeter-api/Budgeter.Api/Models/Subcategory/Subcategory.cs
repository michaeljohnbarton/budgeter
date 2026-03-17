namespace Budgeter.Api.Models.Subcategory
{
	public class Subcategory
	{
		public int ID { get; set; }
		public string Name { get; set; } = string.Empty;
		public int? Rank { get; set; }
		public int CategoryId { get; set; }
		public bool RecalculateFutureBalances { get; set; }
		public bool HasTransactions { get; set; }
	}
}