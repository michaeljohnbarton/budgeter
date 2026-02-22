using System;

namespace Budgeter.Repository.Models
{
	public class Category
	{
		public int ID { get; set; }
		public string Name { get; set; } = string.Empty;
		public int BankAccountId { get; set; }
		public bool IsCredit { get; set; }
	}
}