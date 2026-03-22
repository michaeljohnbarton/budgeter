namespace Budgeter.Repository.Models
{
	public class Transaction
	{
		public int ID { get; set; }
		public string Description { get; set; } = string.Empty;
		public bool IsCredit { get; set; }
		public int AmountCents { get; set; }
		public DateTime EnteredDateUtc { get; set; }
		public int MonthId { get; set; }
		public int SubcategoryId { get; set; }
	}
}