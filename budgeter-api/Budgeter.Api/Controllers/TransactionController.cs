using Budgeter.Api.Models.Transaction;
using Budgeter.Api.Services;
using Budgeter.Repository.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Budgeter.Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TransactionController : Controller
	{
		private readonly ITransactionService _transactionService;

		public TransactionController(ITransactionService transactionService)
		{
			_transactionService = transactionService;
		}

		[HttpPost]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public IActionResult Create([FromBody] CreateTransaction transactionToCreate)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				_transactionService.Create(transactionToCreate);
				return Ok();
			}
			catch (SqlException e)
			{
				if (e.Number == 547)
				{
					return BadRequest("Month or subcategory does not exist");
				}
				throw;
			}
		}

		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public IEnumerable<Transaction> Get()
		{
			return _transactionService.Get();
		}

		[HttpPut("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Update([FromRoute] int id, [FromBody] UpdateTransaction transactionToUpdate)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				_transactionService.Update(id, transactionToUpdate);
				return Ok();
			}
			catch (NotFoundException e)
			{
				return NotFound(e.Message);
			}
		}

		[HttpDelete("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Delete([FromRoute] int id)
		{
			try
			{
				_transactionService.Delete(id);
				return Ok();
			}
			catch (NotFoundException e)
			{
				return NotFound(e.Message);
			}
		}
	}
}