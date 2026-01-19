using System;
namespace Budgeter.Repository.Infrastructure
{
	public class NotFoundException : Exception
	{
		public NotFoundException() { }
		public NotFoundException(string message) : base(message) { }
	}
}

