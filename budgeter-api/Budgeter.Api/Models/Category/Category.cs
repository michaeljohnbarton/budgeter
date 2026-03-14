namespace Budgeter.Api.Models.Category
{
	public class Category
	{
		public int ID { get; set; }
		public string Name { get; set; } = string.Empty;
		public int? Rank { get; set; }
		public int BankAccountId { get; set; }
		public bool IsCredit { get; set; }
	}
}